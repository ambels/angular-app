import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductFeatureState } from 'src/app/ngrx/AppState';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { getProducts, setSelectedProduct } from '../../ngrx/actions/product.actions';
import { Product } from 'src/app/interfaces/Product';
import { selectProducts } from 'src/app/ngrx/selectors/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  products$: Observable<ProductFeatureState> = this.store.select(selectProducts);
  length: number = 50;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 30, 50];
  columnsToDisplay: string[] = ['id', 'blend_name', 'origin', 'variety', 'notes', 'intensifier', 'link'];
  dataSource: any = new MatTableDataSource();
  isDataLoaded = false;

  constructor(
    private store: Store<ProductFeatureState>,
    private router: Router
  ) { }

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.store.dispatch(getProducts());
    this.products$.subscribe(({ products, loaded }) => {
      this.dataSource.data = products;
      this.isDataLoaded = loaded;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToDetailsPage(product: Product) {
    this.store.dispatch(setSelectedProduct({ product }))
    this.router.navigate(['/products', product.id]);
  }
}
