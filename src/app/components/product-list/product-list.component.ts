import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { getProducts } from '../../ngrx/actions/product.actions';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products$: Observable<Product[]> = this.store.select((state) => state.products);
  length: number = 50;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 30, 50];
  columnsToDisplay: string[] = ['id', 'blend_name', 'origin', 'variety', 'notes', 'intensifier', 'link'];
  dataSource: any = new MatTableDataSource();
  isDataLoaded = false;

  constructor(private store: Store<{ products: Product[] }>) { }

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.store.dispatch(getProducts());
    this.products$.subscribe((data: any) => {
      this.dataSource.data = data.products;
      sessionStorage.setItem('products', JSON.stringify(data.products));
      this.isDataLoaded = data.loaded;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
