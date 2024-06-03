import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private spinnerService: SpinnerService, private router: Router) {}
  /**
     * 
     * @param rows data rows
     * @param fileName filename of the file be exported
     * @param columns key value pair for headers in the file `{"key1" :"Value 1", "key2" : "Value 2", ...}`
            Any value in rows wiith key `key1` will have header as `Value 1` and so on..
     * @returns 
     */
  public exportToCsv(rows: any[], fileName: string, columns?: any): any {
    if (!rows || !rows.length) {
      return;
    }

    let includeCol = columns ? Object.keys(columns) : [];
    let cols = columns ? Object.values(columns) : [];
    const separator = ',';
    if (includeCol.length == 0) {
      includeCol = Object.keys(rows[0]).filter((k) => {
        return true;
      });
      cols = includeCol;
    }
    const csvContent =
      cols.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return includeCol
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');
    this.saveAsFile(csvContent, `${fileName}.csv`, 'text/csv;charset=utf-8;');
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    saveAs(data, fileName);
  }
}
