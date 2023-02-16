import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/Product';
import { ProductService } from './product.service';
import { products as expectedProducts } from 'src/mock.data';


describe('ProductService', () => {
  let productService: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;



  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    productService = new ProductService(httpClientSpy);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      declarations: [
      ]
    });
    productService = TestBed.inject(ProductService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should return expected products (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(expectedProducts));

    productService.getAll().subscribe({
      next: products => {
        expect(products)
          .withContext('expected products')
          .toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});

function asyncData(expectedProducts: Product[]): Observable<unknown> {
  return of(expectedProducts);
}
