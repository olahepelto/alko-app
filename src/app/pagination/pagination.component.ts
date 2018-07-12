import {Component, Input, OnInit} from '@angular/core';
import {AlkoService} from '../alko.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() activePage: string;

  constructor(public alkoService: AlkoService) { }

  ngOnInit() {
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
}
