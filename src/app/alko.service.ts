import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlkoService {

  public alkoObj = [
    {
      "Numero": 0,
      "Nimi": "ERR",
      "Pullokoko": "0",
      "Hinta": "0",
      "Litrahinta": "0",
      "Tyyppi": "ERR",
      "Valmistusmaa": "ERR",
      "Rypaleet": "ERR,",
      "Luonnehdinta": "ERR",
      "Pakkaustyyppi": "ERR",
      "ProsAlkohol": "0",
      "LAlkohol": "0",
      "EurPerLAlkohol": "0"
    }
  ];

  constructor(private http: HttpClient) {
    this.generateAlkoData();
  }

  generateAlkoData(){

    this.getJSON().subscribe(data => {
      this.alkoObj = data.sort(function(a, b) {
          return parseFloat(a.EurPerLAlkohol.toString().replace(",","."))
            - parseFloat(b.EurPerLAlkohol.toString().replace(",","."));
      });
    }, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/alko.json");
  }
}
