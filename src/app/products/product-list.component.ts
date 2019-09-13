import { Component, OnInit } from '@angular/core';

import { Observable, combineLatest } from 'rxjs';

import { Product } from './product';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../store/features/product/product.state';
import { GetAllProducts, GetAllCategories, SeletCategory } from '../store/features/product/product.action';
import { ProductCategory } from '../product-categories/product-category';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.productList) products$: Observable<Product[]>;
  @Select(ProductState.categoryList) categories$: Observable<ProductCategory[]>;
  @Select(ProductState.selectedCategoryId) categoryId$: Observable<number>;
  // @Select(ProductState.supplierList) suppliers$: Observable<Supplier[]>;
  pageTitle = 'Product List';
  errorMessage = '';
  productWithCategory$ = combineLatest([this.products$, this.categories$]).pipe(
    filter(([products, categories]) => (products.length !== 0 && categories.length !== 0)),
    map(([products, categories]) => products.map(product => ({
        ...product,
        price: product.price * 1.5,
        categoryName: categories.find(c => product.categoryId === c.id).name,
        searchKey: [product.productName]
      }) as Product)
    ),
    tap((products => console.log(products)))
  );

  productsWithCategoryWithAction$ = combineLatest([this.productWithCategory$, this.categoryId$]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(product =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      ))
  );
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetAllProducts());
    this.store.dispatch(new GetAllCategories());
  }

  onAdd() {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string) {
    this.store.dispatch(new SeletCategory({cateogryId: +categoryId}));
  }
}
