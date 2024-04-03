import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'; import { AdminServicesService } from '../../services/admin-service';
import { Iproduct } from '../../../components/products/model';
import { AddproductComponent } from '../../addproduct/addproduct/addproduct.component';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'brand',
    'name',
    'price',
    'productQuantity',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private adminService: AdminServicesService,
    private cdr: ChangeDetectorRef

  ) { }
  ngOnInit(): void {
    this.getProducts();
  }
  ngAfterViewInit(): void {}
  openDialog() {
    this.dialog
      .open(AddproductComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.getProducts();
        }
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (filterValue) {
      this.dataSource.paginator?.firstPage();
    }
  }
  getProducts() {
    this.adminService.getAllProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Iproduct>(res);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort =res.sort;
        });

        this.dataSource.paginator = res.paginator;
      },
      error: (err) => {
        alert(' something go wrong');
      },
    });
  }
  getbyname(name:string){
   this.adminService.getbyname(name).subscribe({
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
  updateProduct(row: Iproduct) {
    this.dialog
      .open(AddproductComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.getProducts();
        }
      });
  }

  deleteProduct(id: string) {
    this.adminService.deleteProduct(id).subscribe(
      (res) => {
        alert('this product was delete');
        this.getProducts();
      },
      (err) => {
        alert(' something get wrong when delete');
      }
    );
  }
}

