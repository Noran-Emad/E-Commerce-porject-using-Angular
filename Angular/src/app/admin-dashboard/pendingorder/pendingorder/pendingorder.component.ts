import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServicesService } from './../../services/admin-service';
import { Iproduct } from './../../../components/products/model';
@Component({
  selector: 'app-pendingorder',
  templateUrl: './pendingorder.component.html',
  styleUrl: './pendingorder.component.css'
})
@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss'],
})
export class PendingorderComponent implements OnInit {
  displayedColumns: string[] = [
    'createdAt',
    'isPayment',
    'taxPrice',
    'totalPrice',
    'ACCEPT',
    'CANCCEL',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminServicesService) {}

  ngOnInit(): void {
    this.getAllOrdersPending();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (filterValue) {
      this.dataSource.paginator?.firstPage();
    }
  }

  getAllOrdersPending() {
    this.adminService.getAllOrdersPending().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Iproduct>(res);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });

        this.dataSource.paginator = res.paginator;
      },
      error: (err) => {
        alert(' something go wrong');
      },
    });
  }
  updateStatus(status: string, id: string) {
    const data = { status, id };

    this.adminService.updateStatusOrder(data).subscribe(
      (res) => {
        this.getAllOrdersPending();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
