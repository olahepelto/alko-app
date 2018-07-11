import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AlkoService} from '../alko.service';


@Component({
  selector: 'app-alkolist',
  templateUrl: './alkolist.component.html',
  styleUrls: ['./alkolist.component.css']
})
export class AlkolistComponent implements OnInit {

  public screenWidth;
  public categories = [
    {name: 'Viinit', cat: ['punaviinit', 'roseeviinit', 'valkoviinit', 'Jälkiruokaviinit ja Muut viinit']},
    {name: 'Kuohuviinit', cat: ['kuohuviinit & samppanjat']},
    {name: 'Rommit', cat: ['rommit']},
    {name: 'konjakit', cat: ['konjakit']},
    {name: 'viskit', cat: ['viskit']},
    {name: 'oluet', cat: ['oluet']},
    {name: 'siiderit', cat: ['siiderit']},
    {name: 'juomasekoitukset', cat: ['juomasekoitukset']},
    {name: 'Brandyt, Armanjakit ja Calvadosit', cat: ['Brandyt, Armanjakit ja Calvadosit']},
    {name: 'Ginit ja maustetut viinat', cat: ['Ginit ja maustetut viinat']},
    {name: 'Liköörit ja Katkerot', cat: ['Liköörit ja Katkerot']},
    {name: 'vodkat ja viinat', cat: ['vodkat ja viinat']},
    {name: 'Puistokemisteille', cat: ['lasinpesuneste']},
  ];

  @ViewChild('myModal') myModal;

  public activePage = 0;

  constructor(public alkoService: AlkoService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {

  }

  public openAlkoSelectDialog() {
    this.myModal.nativeElement.className = 'modal fade show';
  }

  public closeAlkoSelectDialog() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  public getNearestPages() {
    let newPageList;
    if (this.activePage == 0 || this.activePage == 1) {
      newPageList = [0, 1, 2, 3, 4];
    }
    if (this.activePage >= 2 && this.activePage <= this.alkoService.pagesList.length - 3) {
      newPageList = [this.activePage - 2, this.activePage - 1, this.activePage, this.activePage + 1, this.activePage + 2];
    }
    if (this.activePage == this.alkoService.pagesList.length - 2 || this.activePage == this.alkoService.pagesList.length - 1) {
      newPageList = [this.alkoService.pagesList.length - 5, this.alkoService.pagesList.length - 4, this.alkoService.pagesList.length - 3, this.alkoService.pagesList.length - 2, this.alkoService.pagesList.length - 1];
    }
    return newPageList;
  }

  public selectPage(page: any, doIt: boolean) {
    if (doIt) {
      this.activePage = page;
    }
  }

  public categoryButtonClicked(categories: any) {
    categories.forEach((category) => {
      this.flipCategory(category);
    });

    this.alkoService.generatePageData();
  }

  public resetCategories(){
    this.alkoService.enabledCategories = [
      "punaviinit",
      "roseeviinit",
      "valkoviinit",
      "rommit",
      "konjakit",
      "viskit",
      "oluet",
      "siiderit",
      "juomasekoitukset",
      "kuohuviinit & samppanjat",
      'Jälkiruokaviinit ja Muut viinit',
      "Brandyt, Armanjakit ja Calvadosit",
      "Ginit ja maustetut viinat",
      "Liköörit ja Katkerot",
      "vodkat ja viinat"
    ];
  }

  private flipCategory(category) {
    const index = this.alkoService.enabledCategories.indexOf(category);
    if (index !== -1) {
      this.alkoService.enabledCategories.splice(index, 1);
    } else {
      this.alkoService.enabledCategories.push(category);
    }
  }

}
