import { createAction, props } from '@ngrx/store';

export const getProducts = createAction('[ProductList Component] get products');

export const productsLoadedSuccess = createAction(
    '[Product API] products loaded success',
    props<{ products: any }>()
);

export const productsLoadedError = createAction('[Product API] products loaded error');
