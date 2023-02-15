import { createSelector } from "@ngrx/store";
import { Product } from "src/app/interfaces/Product";

export const selectProducts = createSelector(
    (state: any) => state.products,
    data => data
);

export const selectedProduct = createSelector(
    (state: any) => state.selectedProduct,
    (product: Product) => product
);
