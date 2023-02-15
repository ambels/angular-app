import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/Product';

export const getProducts = createAction('[ProductList Component] get products');

export const setSelectedProduct = createAction(
    '[ProductList Component] set selected product',
    props<{ product: Product }>()
);

export const productsLoadedSuccess = createAction(
    '[Product API] products loaded success',
    props<{ products: any }>()
);

export const productsLoadedError = createAction('[Product API] products loaded error');
