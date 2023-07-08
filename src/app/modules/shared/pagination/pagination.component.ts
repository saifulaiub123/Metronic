import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [
  ]
})
export class PaginationComponent implements OnInit {

  @Input() pageNum : number = 1;
  @Input() pageSize : number = 10;
  @Input() totalRecords : number = 500;
  @Output() updatePagination  = new EventEmitter<number>();
  pageCount : number = 20;
  pageIndex : number = 0;
  defaultNumbers = [1,2,3,4,5];
  pageNumbers : number[];
  currentPage : number = 1;

  constructor() { }

  ngOnInit(): void {
    this.pageCount = this.totalRecords % this.pageSize == 0 ? this.totalRecords / this.pageSize : Math.round(this.totalRecords / this.pageSize);
    this.pageNumbers = this.defaultNumbers;
  }

  goToPage(pageNum : number)
  {
    this.currentPage = pageNum;
    this.updatePagination.emit(pageNum);
  }

  goToIndex(num : number)
  {
    this.pageIndex = this.pageIndex + num;
    this.pageNumbers = this.defaultNumbers.map(x => x + (5 *this.pageIndex));
    this.goToPage(this.pageNumbers[0]);
  }

}
