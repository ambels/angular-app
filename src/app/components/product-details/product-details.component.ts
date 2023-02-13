import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  product: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));
    const products: Product[] = JSON.parse(sessionStorage.getItem('products') || '[]');
    this.product = products.find((product: any) => productId === product.id);
    this.title.setTitle(`${this.product?.blend_name}'s details - Coffee Shop`);

    if (!this.product) {
      this.router.navigate(['**']);
    }
  }
}
