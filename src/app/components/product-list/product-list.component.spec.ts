import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideStore, StoreModule } from '@ngrx/store';
import { routes } from 'src/app/app-routing.module';
import { product } from 'src/mock.data';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;

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
      ],
      declarations: [
        ProductListComponent
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(ProductListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /products/147', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToDetailsPage(product);
    expect(navigateSpy).toHaveBeenCalledWith(['/products', 147]);
  });
});
