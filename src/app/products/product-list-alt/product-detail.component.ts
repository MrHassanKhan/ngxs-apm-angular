import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from 'src/app/store/features/product/product.state';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { Supplier } from 'src/app/suppliers/supplier';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  @Select(ProductState.selectedProduct) product$: Observable<Product>;
  @Select(ProductState.supplierList) productSuppliers$: Observable<Supplier[]>;
  constructor() { }

}
