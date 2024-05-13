import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

import { ProductInterface } from '../../Interfaces/products.interfaces';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.sass']
})
export class UpdateProductComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: number;
  productsService = inject(ProductsService);
  product: ProductInterface;
  userService = inject(UsersService);
  form: FormGroup;
  dialog = inject(MatDialog)

  constructor(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
  }

  async getProduct() {
    const response = await this.productsService.getProductById(this.id);
    if(response.error){
      this.handleLogout()
    } else {
      this.product = response.product
      this.form = new FormGroup({
        title: new FormControl(this.product.title, [Validators.required, Validators.minLength(1)]),
        handle: new FormControl(this.product.handle),
        description: new FormControl(this.product.description),
        sku: new FormControl(this.product.sku, [Validators.required, Validators.minLength(1)]),
        grams: new FormControl(this.product.grams, [Validators.required, Validators.minLength(1)]),
        stock: new FormControl(this.product.stock, [Validators.required, Validators.minLength(1)]),
        price: new FormControl(this.product.price, [Validators.required, Validators.minLength(1)]),
        compare_price: new FormControl(this.product.compare_price),
        barcode: new FormControl(this.product.barcode)
      });
    }
    
  }

  handleLogout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  backPage(){
    this.router.navigate(['/products'])
  }

  async onSubmit(){
    const response = await this.productsService.updateProduct(this.id, this.form.value)
    if( response.error ){
      this.handleLogout();
    } else {
      this.openDialog();
      this.router.navigate(['/products']);
    }
  }

  openDialog() {
    this.dialog.open(DialogSuccess);
  }

}


@Component({
  selector: 'dialog-success',
  templateUrl: 'dialog-success.html',
  standalone: true,
  imports: [],
})
export class DialogSuccess {
  constructor() {}
}