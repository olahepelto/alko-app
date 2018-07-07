import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlkolistComponent} from './alkolist/alkolist.component';
import {HttpClientModule} from '@angular/common/http';
import {AlkoSelectionDialogComponent} from './alko-selection-dialog/alko-selection-dialog.component';
import {Ng2CacheModule} from 'ng2-cache';

@NgModule({
  declarations: [
    AppComponent,
    AlkolistComponent,
    AlkoSelectionDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2CacheModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
