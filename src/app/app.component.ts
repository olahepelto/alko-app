import { Component } from '@angular/core';
import { AlkoService } from './alko.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public alkoService: AlkoService) {
  }

  title = 'app';
}
