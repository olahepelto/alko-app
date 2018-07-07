import { Component, OnInit } from '@angular/core';
import {AlkoService} from '../alko.service';

@Component({
  selector: 'app-alkolist',
  templateUrl: './alkolist.component.html',
  styleUrls: ['./alkolist.component.css']
})
export class AlkolistComponent implements OnInit {

  public productRowLimit = 500;

  public categories = [
    "punaviinit",
    "roseeviinit",
    "valkoviinit",
    "rommit",
    "konjakit",
    "viskit",
    "oluet",
    "siiderit",
    "juomasekoitukset",
    "alkoholittomat",
    "lahja- ja juomatarvikkeet",
    "kuohuviinit & samppanjat",
    "Jälkiruokaviinit, väkevöidyt ja muut viinit",
    "Brandyt, Armanjakit ja Calvadosit",
    "Ginit ja maustetut viinat",
    "Liköörit ja Katkerot",
    "vodkat ja viinat"
  ];
  public enabledCategories = [
    "punaviinit",
    "roseeviinit",
    "valkoviinit",
    "rommit",
    "konjakit",
    "viskit",
    "oluet",
    "siiderit",
    "juomasekoitukset",
    "alkoholittomat",
    "lahja- ja juomatarvikkeet",
    "kuohuviinit & samppanjat",
    "Jälkiruokaviinit, väkevöidyt ja muut viinit",
    "Brandyt, Armanjakit ja Calvadosit",
    "Ginit ja maustetut viinat",
    "Liköörit ja Katkerot",
    "vodkat ja viinat"
  ];

  constructor(public alkoService : AlkoService) { }

  ngOnInit() {

  }

  public categoryButtonClicked(category : string){
    console.log(this.enabledCategories);
    const index = this.enabledCategories.indexOf(category);
    if(index !== -1){
      this.enabledCategories.splice(index, 1);
    }else{
      this.enabledCategories.push(category);
    }
    console.log(this.enabledCategories);
  }
  public resetCategories(){
    this.enabledCategories = [
      "punaviinit",
      "roseeviinit",
      "valkoviinit",
      "rommit",
      "konjakit",
      "viskit",
      "oluet",
      "siiderit",
      "juomasekoitukset",
      "alkoholittomat",
      "lahja- ja juomatarvikkeet",
      "kuohuviinit & samppanjat",
      "Jälkiruokaviinit, väkevöidyt ja muut viinit",
      "Brandyt, Armanjakit ja Calvadosit",
      "Ginit ja maustetut viinat",
      "Liköörit ja Katkerot",
      "vodkat ja viinat"
    ];
  }

}
