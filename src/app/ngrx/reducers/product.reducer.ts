import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/product.actions';

const initialState: any = {};

// handles the products state slice
export const productsReducer = createReducer(
    initialState,
    on(actions.productsLoadedSuccess, (state, props) => ({ products: props.products, loaded: true })),
    on(actions.productsLoadedError, () => alert('There was an error loading products, please contact our support team.'))
);

// handles the selected product state slice
export const selectedProductReducer = createReducer(
    initialState,
    on(actions.setSelectedProduct, (state, props) => props.product),
);
