import { Component, OnInit } from '@angular/core';
import { AlkoService } from '../alko.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(public alkoService: AlkoService) { }

  ngOnInit() {
  }

  searchChange(event: any) {
    this.alkoService.productSearchContent = event.target.value;
    this.alkoService.generatePageData();
  }

}
