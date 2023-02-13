import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as actions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(actions.getProducts),
        mergeMap(() => this.productService.getAll().pipe(
            map(products => actions.productsLoadedSuccess({ products })),
            catchError(() => of(actions.productsLoadedError()))
        ))
    ));

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }
}
