import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideStore, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { getProducts } from 'src/app/ngrx/actions/product.actions';
import { product as mockProduct, products as mockProducts } from 'src/mock.data';
import { ProductListComponent } from './product-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;
  let store: MockStore;
  const mockProductsSlice = {
    products: mockProducts,
    loaded: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        provideStore(),
        provideMockStore(),
      ],
      declarations: [
        ProductListComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /products/147', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToDetailsPage(mockProduct);
    expect(navigateSpy).toHaveBeenCalledWith(['/products', 147]);
  });

  it('#isDataLoaded should be', () => {
    expect(component.isDataLoaded)
      .withContext('false at first')
      .toBe(false);

    component.products$ = of(mockProductsSlice);
    component.ngOnInit();
    expect(component.isDataLoaded)
      .withContext('true after loading the products')
      .toBe(true);
  });

  it('#dataSource.data should have', () => {
    expect(component.dataSource.data.length)
      .withContext('an empty array at first')
      .toEqual(0);

    component.products$ = of(mockProductsSlice);
    component.ngOnInit();
    expect(component.dataSource.data.length)
      .withContext('an array of 2 products after loading them')
      .toEqual(2);
  });

  it('should have dispatched the getProducts action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.products$ = of({ products: [], loaded: false });
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(getProducts());
  });
});
