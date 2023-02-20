import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Product } from 'src/app/interfaces/Product';
import { selectedProduct } from 'src/app/ngrx/selectors/product.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  product$: Observable<Product> = this.store.select(selectedProduct);
  productSubscription!: Subscription;
  product!: Product;

  constructor(
    private store: Store<Product>,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.productSubscription = this.product$.subscribe((product: Product) => {
      this.product = product;
    });

    if (this.product && Object.keys(this.product).length === 0) {
      this.goTo404Page();
    }
    this.title.setTitle(`${this.product?.blend_name}'s details - Coffee Shop`);
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  goTo404Page() {
    this.router.navigate(['**']);
  }
}
