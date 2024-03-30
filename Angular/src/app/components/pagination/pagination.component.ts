import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent{

  @Input() page: number = 1
  @Input() TotalPages: number = 0

  @Output() NavigateTo: EventEmitter<any> = new EventEmitter<any>();

  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  GotoPage(Pnum: number): void {
    if (Pnum <= this.TotalPages && Pnum > 0) {
      this.page = Pnum;
    } else if (Pnum >= this.TotalPages) {
      this.page = this.TotalPages;
    } else {
      this.page = 1;
    }

    this.NavigateTo.emit(Pnum);
  }

  
}
