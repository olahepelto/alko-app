import { Component, OnInit } from '@angular/core';
import { AlkoService } from '../alko.service';

@Component({
  selector: 'app-alkolist-beta',
  templateUrl: './alkolist-beta.component.html',
  styleUrls: ['./alkolist-beta.component.css']
})
export class AlkolistBetaComponent implements OnInit {

  constructor(public alkoService: AlkoService) { }

  ngOnInit() {
  }

}
