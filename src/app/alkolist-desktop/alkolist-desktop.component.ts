import {Component, Input, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AlkoService} from '../alko.service';



@Component({
  selector: 'app-alkolist-desktop',
  templateUrl: './alkolist-desktop.component.html',
  styleUrls: ['./alkolist-desktop.component.css']
})
export class AlkolistDesktopComponent implements OnInit {

  public productHover = [];

  constructor(public alkoService: AlkoService) {
  }

  ngOnInit() {
  }

  public test() {
    console.log('Test');
  }

  public listContainsStore(store, list) {
    for (const availObj of list) {
      if (availObj.storeName === store) {
        return true;
      }
    }
    return false;
  }

}
