import { Product } from "../interfaces/Product";

export interface AppState {
    products: ProductFeatureState,
    selectedProduct: Product,
}

export interface ProductFeatureState {
    products: Product[],
    loaded: boolean,
}
