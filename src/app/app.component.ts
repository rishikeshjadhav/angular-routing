import { Component } from '@angular/core';
// import { pdfjs } from '../../node_modules/pdfjs-dist/build/pdf';

declare var $: any;

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <div>
      <label>PDF src</label>
      <input id="abcd" type="text" placeholder="PDF src" [(ngModel)]="pdfSrc">
  </div>
  <pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              style="display: block;"
  ></pdf-viewer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pdfSrc: any = './assets/aa.pdf';
  // pdfSrc: any = './assets/pdf-test.pdf';

  title = 'app';
  constructor() {
    // $('body').css('zoom', '50%');
    const _this = this;
    console.log('aa');
    setTimeout(function () {
      console.log($('.canvasWrapper canvas').length);
      for (let ee = 0; ee < $('.canvasWrapper canvas').length; ee++) {
        _this.downloadCurrentFile($('.canvasWrapper canvas')[ee].toDataURL());
      }
      // console.log($('.canvasWrapper canvas')[0].toDataURL());
    }, 5000);
    // console.log(pdfjs);
  }

  //// Function to convert string to base 64 encoded form
  base64ToBlob(base64, type) {
    const binary = atob(base64);
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([view], { type: type });
    return blob;
  }

  //// Function to download file using browser's Save As method (Will work in case of IE browser)
  tryBrowserSaveAsDownload(file) {
    let result = false;
    //// Check browser configuration for blob
    navigator['saveBlob'] = navigator['saveBlob'] || navigator.msSaveBlob || navigator['mozSaveBlob'] || navigator['webkitSaveBlob'];
    window['saveAs'] = window['saveAs'] || window['webkitSaveAs'] || window['mozSaveAs'] || window['msSaveAs'];
    if (navigator['saveBlob']) {
      //// Get blob data for current file
      file.datatype ? file.datatype.indexOf('cbase64,') > -1 ? file.datatype = file.datatype.split(';base64,')[0] : 1 : 1;
      const blobData = this.base64ToBlob(file.url, file.datatype);
      if (window['saveAs']) {
        window['saveAs'](blobData, file.name);
      } else {
        navigator['saveBlob'](blobData, file.name);
      }
    } else {
      result = false;
    }
    return result;
  }

  //// Function to download file using anchor element creation (Will work in case of Chrome, Firefox)
  tryBrowserAnchorDownload(file) {
    let result = true;
    const anchorElement = document.createElement('a');
    let mouseEvent;
    if ('download' in anchorElement) {
      // anchorElement.setAttribute('download', 'test.jpg');
      anchorElement.setAttribute('download', 'test.png');
      //// anchorElement.href = "data:application/octet-stream;base64," + byteArrayToBase64(file.url);
      anchorElement.href = 'data:application/octet-stream;base64,' + file.split(';base64,')[1];
      // anchorElement.href = file;
      document.body.appendChild(anchorElement);
      mouseEvent = document.createEvent('MouseEvents');
      mouseEvent.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0,
        false, false, false, false, 0, null);
      anchorElement.dispatchEvent(mouseEvent);
      document.body.removeChild(anchorElement);
    } else {
      result = false;
    }
    return result;
  }

  //// Function to download current file
  downloadCurrentFile(file) {
    //// Try downloading file using Browser's Save as method else try using anchor element creation depending on current browser
    if (!this.tryBrowserSaveAsDownload(file)) {
      if (!this.tryBrowserAnchorDownload(file)) {
        $('.download-status').text('Error while downloading file, kindly try again...');
      }
    }
  }

}
