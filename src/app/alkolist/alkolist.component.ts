import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AlkoService} from '../alko.service';
import { FormsModule } from '@angular/forms'; // supposed fix

@Component({
  selector: 'app-alkolist',
  templateUrl: './alkolist.component.html',
  styleUrls: ['./alkolist.component.css']
})
export class AlkolistComponent implements OnInit {

  public screenWidth;
  public categories = [
    {name: 'Viinit', cat: ['punaviinit', 'roseeviinit', 'valkoviinit', 'Jälkiruokaviinit, väkevöidyt ja muut viinit']},
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
    {name: 'Lasinpesunesteet', cat: ['lasinpesuneste']},
    {name: 'Kaikki', cat: ['kaikki_enabled_special']},
  ];

  @ViewChild('myModal') myModal;

  constructor(public alkoService: AlkoService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.alkoService.mobileEnabled = window.innerWidth < 1150 ? true : false;
  }

  ngOnInit() {

  }

  public searchChange(event: any) {
    this.alkoService.alkoSearchContent = event.target.value;
  }

  public openAlkoSelectDialog() {
    this.myModal.nativeElement.className = 'modal fade show';
  }

  public closeAlkoSelectDialog() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  public categoryButtonClicked(categories: any) {
    if(categories[0] === 'kaikki_enabled_special'){
      console.log("test")
      this.resetCategories();
    }else{
      this.alkoService.enabledCategories = categories;
    }
    
    this.alkoService.generatePageData();
  }

  public resetCategories() {
    console.log("test");
    this.alkoService.enabledCategories = []
    this.categories.forEach((category) => {
      category.cat.forEach(cat => {
        this.alkoService.enabledCategories.push(cat);
      });
    })
    console.log(this.alkoService.enabledCategories);
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
