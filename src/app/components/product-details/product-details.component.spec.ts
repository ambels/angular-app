import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideStore, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        provideStore()
      ],
      declarations: [
        ProductDetailsComponent,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to 404 page not found', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.product$ = of({});
    component.ngOnInit()
    expect(navigateSpy).toHaveBeenCalledWith(['**']);
  });
});
