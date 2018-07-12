import {Component, Input, OnInit} from '@angular/core';
import {AlkoService} from '../alko.service';

@Component({
  selector: 'app-alkolist-mobile',
  templateUrl: './alkolist-mobile.component.html',
  styleUrls: ['./alkolist-mobile.component.css']
})
export class AlkolistMobileComponent implements OnInit {

  constructor(public alkoService: AlkoService) {
  }

  ngOnInit() {
  }

  public listContainsStore(store, list) {
    for (let availObj of list) {
      if (availObj.storeName == store) {
        return true;
      }
    }
    return false;
  }

}


