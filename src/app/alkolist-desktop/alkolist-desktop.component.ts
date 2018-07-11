import {Component, Input, OnInit} from '@angular/core';
import {AlkoService} from '../alko.service';


@Component({
  selector: 'app-alkolist-desktop',
  templateUrl: './alkolist-desktop.component.html',
  styleUrls: ['./alkolist-desktop.component.css']
})
export class AlkolistDesktopComponent implements OnInit {

  @Input() activePage: string;

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
