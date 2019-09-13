import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from 'src/app/products/product';
import { GetAllProducts, GetProductById, GetAllSuppliers, GetAllCategories, SeletCategory } from './product.action';
import { ProductService } from 'src/app/products/product.service';
import { map, tap } from 'rxjs/operators';
import { Supplier } from 'src/app/suppliers/supplier';
import { SupplierService } from 'src/app/suppliers/supplier.service';
import { ProductCategory } from 'src/app/product-categories/product-category';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';

export interface ProductStateModel {
    products: Product[];
    categories: ProductCategory[];
    suppliers: Supplier[];
    selectedCategoryId: number;
    product: Product;
}

@State<ProductStateModel>({
    name: 'product',
    defaults: {
        products: [],
        categories: [],
        suppliers: [],
        selectedCategoryId: 0,
        product: null
    }
})
export class ProductState {
    constructor(private productService: ProductService, private categoryService: ProductCategoryService,
                private suppliersService: SupplierService) {}

    @Selector()
    static productList(state: ProductStateModel) {
        return state.products;
    }
    @Selector()
    static selectedCategoryId(state: ProductStateModel) {
        return state.selectedCategoryId;
    }
    @Selector()
    static categoryList(state: ProductStateModel) {
        return state.categories;
    }
    @Selector()
    static supplierList(state: ProductStateModel) {
        return state.suppliers;
    }

    @Selector()
    static selectedProduct(state: ProductStateModel) {
        return state.product;
    }


    @Action(GetAllProducts)
    getAllProduct(ctx: StateContext<ProductStateModel>, action: GetAllProducts) {
        const { patchState } = ctx;
        return this.productService.getProducts().pipe(
            map(products => products),
            tap(products => {
                patchState({ products });
            })
        );
    }
    @Action(GetAllCategories)
    getAllCategory(ctx: StateContext<ProductStateModel>, action: GetAllCategories) {
        const { patchState } = ctx;
        return this.categoryService.getCategories().pipe(
            map(categories => categories),
            tap(categories => {
                patchState({ categories });
            })
        );
    }

    @Action(SeletCategory)
    selectCategoryById(ctx: StateContext<ProductStateModel>, action: SeletCategory) {
        // tslint:disable-next-line: no-shadowed-variable
        ctx.patchState({selectedCategoryId: action.payload.cateogryId});
    }
    @Action(GetAllSuppliers)
    getAllSuppliers(ctx: StateContext<ProductStateModel>, action: GetAllSuppliers) {
        const { patchState } = ctx;
        return this.suppliersService.getSuppliers().pipe(
            map(suppliers => suppliers),
            tap(suppliers => {
                patchState({ suppliers });
            })
        );
    }
    @Action(GetProductById)
    getProductById(ctx: StateContext<ProductStateModel>, action: GetProductById) {
        // tslint:disable-next-line: no-shadowed-variable
        const prdt = ctx.getState().products.find(product => action.payload.productId === product.id);
        ctx.patchState({product: prdt});
    }
}
