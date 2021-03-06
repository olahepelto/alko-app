import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CacheService} from 'ng2-cache';
import { PapaParseService } from 'ngx-papaparse';

let alkoService = null;

@Injectable({
  providedIn: 'root'
})
export class AlkoService {

  public alkoSearchContent = '';
  public productSearchContent = '';

  public mobileEnabled;
  public betaEnabled = false;

  public superAlkoEnabled = false;

  public alko_stores = [];

  public activePage = 0;

  public selectedAlko;

  public ITEMS_PER_PAGE = 200;
  public pagesList = [0];

  public activeProducts = [];

  public alkoObj = [];

  public availabilityObject; // This is the whole availability object
  public availabilityObj = {}; // This is the current availability

  public currentSortType = 'EurPerLAlkohol';
  public sortSmallestToBiggest = true;

  public lastFileUpdate = 'ei koskaan';

  public enabledCategories = [
    'punaviinit',
    'roseeviinit',
    'valkoviinit',
    'rommit',
    'konjakit',
    'viskit',
    'oluet',
    'siiderit',
    'juomasekoitukset',
    'kuohuviinit & samppanjat',
    'Jälkiruokaviinit, väkevöidyt ja muut viinit',
    'Brandyt, Armanjakit ja Calvadosit',
    'Ginit ja maustetut viinat',
    'Liköörit ja Katkerot',
    'vodkat ja viinat',
    'lasinpesuneste'
  ];

  constructor(private http: HttpClient, private _cacheService: CacheService, public csvParser: PapaParseService) {
    alkoService = this;
    if (document.cookie !== '') {
      this.selectedAlko = this.getCookie('selectedAlko');
      this.betaEnabled = this.getCookie('betaEnabled') === '1';
      this.superAlkoEnabled = this.getCookie('superAlkoEnabled') === '1';
    }
    this.generateAlkoData();
  }

  public getProductsOnPage(activePage: any) {
    return this.activeProducts.slice(activePage * this.ITEMS_PER_PAGE, (activePage + 1) * this.ITEMS_PER_PAGE);
  }

  setSelectedAlko(alko: any) {
    this.selectedAlko = alko;
    document.cookie = 'selectedAlko=' + alko;
    this.refreshAvailability();
  }
  toggleBetaMode() {
    alkoService.betaEnabled = !alkoService.betaEnabled;

    document.cookie = alkoService.betaEnabled ? 'betaEnabled=1' : 'betaEnabled=0';
    this.refreshAvailability();
  }
  toggleAlkoMode() {
    alkoService.superAlkoEnabled = !alkoService.superAlkoEnabled;

    document.cookie = alkoService.superAlkoEnabled ? 'superAlkoEnabled=1' : 'superAlkoEnabled=0';
    this.generateAlkoData();
    this.refreshAvailability();
  }

  getCookie(cookiename: string) {
    // Get name followed by anything except a semicolon
    const cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
  }

  generateAlkoData() {
    fetch('./assets/availability.csv')
    .then(function(response) {
      return response.text();
    }).then(function(body) {
      alkoService.csvParser.parse(body, {
        complete: (results, file) => {
          alkoService.alko_stores = results.data[0];
          alkoService.lastFileUpdate = alkoService.alko_stores[0];
          alkoService.alko_stores.splice(0, 1); // Remove 'product_number'

          alkoService.availabilityObject = results.data;
          alkoService.refreshAvailability();
        }
      });
    });


    fetch(this.superAlkoEnabled ? './assets/super_alko_products.csv' : './assets/alko_products.csv')
    .then(function(response) {
      return response.text();
    }).then(function(body) {
      alkoService.alkoObj = [];
      alkoService.csvParser.parse(body, {
        complete: (results, file) => {
          results.data.forEach((line) => {

            if (parseFloat(line[9]) > 28) {
              alkoService.alkoObj.push({
                'Numero': line[0],
                'Nimi': line[1],
                'Pullokoko': Math.round(parseFloat(line[2]) * 100) / 100,
                'Hinta': Math.round(parseFloat(line[3].replace(',', '.')) * 100) / 100,
                'Litrahinta': Math.round(parseFloat(line[4].replace(',', '.')) * 100) / 100,
                'Tyyppi': line[5],
                'Luonnehdinta': line[6],
                'Pakkaustyyppi': line[7],
                'ProsAlkohol': Math.round(parseFloat(line[8].replace(',', '.')) * 100) / 100,
                'EurPerLAlkohol': Math.round(parseFloat(line[9].replace(',', '.')) * 100) / 100
              });
            }
          });
          alkoService.alkoObj.shift(); // Remove first row of csv
          alkoService.alkoObj = alkoService.insertionSort(alkoService.alkoObj, 'EurPerLAlkohol');
          alkoService.generatePageData();
        }
      });
    });
  }

  public changeSort(sortType: string) {
    if (this.currentSortType === sortType) {
      this.sortSmallestToBiggest = !this.sortSmallestToBiggest;
      this.alkoObj = this.alkoObj.reverse();
      this.generatePageData();
      return;
    }

    this.currentSortType = sortType;
    this.alkoObj = this.insertionSort(this.alkoObj, sortType);
    this.generatePageData();
  }

  refreshAvailability() {
    const ID = 0;

    this.availabilityObject.forEach((product) => {
      this.availabilityObj[product[ID]] = product[this.getStoreIndex(this.selectedAlko)] === '1';
    });
  }

  public insertionSort(array: any, sortingCriterion: string) {
    for (let i = 0; i < array.length; i++) {
      const temp = array[i];
      let j = i - 1;
      while (j >= 0 && array[j][sortingCriterion] > temp[sortingCriterion]) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
    return array;
  }

  public async generatePageData() {
    this.activeProducts = [];
    let searchTermsList = this.productSearchContent.split(' ');
    searchTermsList.forEach(string => {
      if (string === '') {
        searchTermsList = searchTermsList.splice(searchTermsList.indexOf(string), 1);
      }
    });

    this.alkoObj.forEach((product) => {
      if (this.enabledCategories.indexOf(product.Tyyppi) !== -1 || product.Tyyppi === '-') {
        if (searchTermsList.length !== 0) {
          for (const a of searchTermsList) {
            if (product.Nimi.toLowerCase().indexOf(a.toLowerCase()) === -1) {
              return;
            }
          }
        }
        this.activeProducts.push(product);
      }
    });

    this.pagesList = Array.apply(null, {length: Math.ceil(this.activeProducts.length / this.ITEMS_PER_PAGE)}).map(Number.call, Number);
  }

  public getStoreIndex(store: any) {
    return this.alko_stores.indexOf(store) + 1;
  }
}
