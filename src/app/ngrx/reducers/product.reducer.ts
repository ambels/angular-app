import { createReducer, on } from '@ngrx/store';
import { productsLoadedSuccess, productsLoadedError } from '../actions/product.actions';

const initialState: any = [];

export const productReducer = createReducer(
    initialState,
    on(productsLoadedSuccess, (state, props) => ({ products: props.products, loaded: true })),
    on(productsLoadedError, () => alert('There was an error loading products, please contact our support team.'))
);
