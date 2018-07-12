import {Component, Input, OnInit} from '@angular/core';
import {AlkoService} from '../alko.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor(public alkoService: AlkoService) { }

  ngOnInit() {
  }


  public getNearestPages() {
    let newPageList;
    if (this.alkoService.activePage == 0 || this.alkoService.activePage == 1) {
      newPageList = [0, 1, 2, 3, 4];
    }
    if (this.alkoService.activePage >= 2 && this.alkoService.activePage <= this.alkoService.pagesList.length - 3) {
      newPageList = [this.alkoService.activePage - 2, this.alkoService.activePage - 1, this.alkoService.activePage, this.alkoService.activePage + 1, this.alkoService.activePage + 2];
    }
    if (this.alkoService.activePage == this.alkoService.pagesList.length - 2 || this.alkoService.activePage == this.alkoService.pagesList.length - 1) {
      newPageList = [this.alkoService.pagesList.length - 5, this.alkoService.pagesList.length - 4, this.alkoService.pagesList.length - 3, this.alkoService.pagesList.length - 2, this.alkoService.pagesList.length - 1];
    }
    return newPageList;
  }
  public selectPage(page: any, doIt: boolean) {
    if (doIt) {
      this.alkoService.activePage = page;
    }
  }
}
