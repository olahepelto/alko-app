import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlkolistComponent} from './alkolist/alkolist.component';
import {HttpClientModule} from '@angular/common/http';
import {AlkoSelectionDialogComponent} from './alko-selection-dialog/alko-selection-dialog.component';
import {Ng2CacheModule} from 'ng2-cache';
import {AlkolistMobileComponent} from './alkolist-mobile/alkolist-mobile.component';
import {AlkolistDesktopComponent} from './alkolist-desktop/alkolist-desktop.component';
import { PaginationComponent } from './pagination/pagination.component';
import {PapaParseModule} from 'ngx-papaparse';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    AlkolistComponent,
    AlkoSelectionDialogComponent,
    AlkolistMobileComponent,
    AlkolistDesktopComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2CacheModule,
    PapaParseModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
