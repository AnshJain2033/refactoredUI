import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Action } from './constants';
//import { uniq } from 'lodash';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() renderList: any[] = [];
  @Input() displayColumns: string[] = [];
  @Input() columnsList: any[] = [];
  @Input() showSerial: boolean = true;
  @Input() showActions: boolean = false;
  @Input() actionBtnList: Action[] = [];
  @Input() pageSize: number = 10;
  @Input() pageIndex = 0;
  currentRenderList: any[] = [];
  @Output() btnClickEvent: EventEmitter<any> = new EventEmitter<any>(); 

  constructor() {}

  ngOnInit(): void {
    if (this.showSerial) {
      this.displayColumns.splice(0, 0, 'serial');
    }
    if (this.showActions) {
      this.displayColumns.push('actions');
    }
    this.displayColumns = Array.from(new Set(this.displayColumns));
    //this.displayColumns = uniq(this.displayColumns);
    this.currentRenderList = this.renderList.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['renderList']) {
      this.currentRenderList = this.renderList.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
    }
  }
  actionBtnClickEvent(name: string, value: any) {
    this.btnClickEvent.emit({ name, value });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.currentRenderList = this.renderList.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

}
