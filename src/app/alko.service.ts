import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CacheService} from 'ng2-cache';
import { PapaParseService } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class AlkoService {

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
    'vodkat ja viinat'
  ];


  constructor(private http: HttpClient, private _cacheService: CacheService, public csvParser: PapaParseService) {
    this.generateAlkoData();
    if (document.cookie !== '') {
      this.selectedAlko = this.getCookie('selectedAlko');
    }
  }

  public getProductsOnPage(activePage: any) {
    return this.activeProducts.slice(activePage * this.ITEMS_PER_PAGE, (activePage + 1) * this.ITEMS_PER_PAGE);
  }

  setSelectedAlko(alko: any) {
    this.selectedAlko = alko;
    document.cookie = 'selectedAlko=' + alko;
    this.refreshAvailability();
  }

  getCookie(cookiename: string) {
    // Get name followed by anything except a semicolon
    const cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
  }

  generateAlkoData() {
    console.log(this);

    this.http.get('./assets/availability.csv').subscribe(data => {
    }, error => {
      this.csvParser.parse(error.error.text, {
        complete: (results, file) => {
          this.alko_stores = results.data[0];
          this.alko_stores.splice(0, 1); // Remove 'product_number'

          this.availabilityObject = results.data;
          this.refreshAvailability();
        }
      });
    });

    this.http.get('./assets/alko_products.csv').subscribe(data => {
    }, error => {
      this.csvParser.parse(error.error.text, {
        complete: (results, file) => {
          results.data.forEach((line) => {
            if (parseFloat(line[9]) > 30) {
              this.alkoObj.push({
                'Numero': line[0],
                'Nimi': line[1],
                'Pullokoko': parseFloat(line[2]),
                'Hinta': parseFloat(line[3]),
                'Litrahinta': parseFloat(line[4]),
                'Tyyppi': line[5],
                'Luonnehdinta': line[6],
                'Pakkaustyyppi': line[7],
                'ProsAlkohol': parseFloat(line[8]),
                'EurPerLAlkohol': parseFloat(line[9])
              });
            }
          });
          this.alkoObj.shift(); // Remove first row of csv
          this.alkoObj = this.insertionSort(this.alkoObj, 'EurPerLAlkohol');

          console.log(this.alkoObj);
          this.generatePageData();
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

  public generatePageData() {
    this.activeProducts = [];
    this.alkoObj.forEach((product) => {
      if (this.enabledCategories.indexOf(product.Tyyppi) !== -1) {
        this.activeProducts.push(product);
      }
    });

    this.pagesList = Array.apply(null, {length: Math.ceil(this.activeProducts.length / this.ITEMS_PER_PAGE)}).map(Number.call, Number);
  }

  public getStoreIndex(store: any) {
    return this.alko_stores.indexOf(store) + 1;
  }
}
