import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
