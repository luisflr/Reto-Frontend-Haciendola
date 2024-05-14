import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogSuccess } from '../update-product/update-product.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass']
})
export class CreateProductComponent {
  form: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);
  productService = inject(ProductsService);
  dialog = inject(MatDialog)

  initialData = [
    { key: 'title', value: '', type: 'text' },
    { key: 'handle', value: '', type: 'text' },
    { key: 'description', value: '', type: 'text' },
    { key: 'sku', value: 0 , type: 'number'},
    { key: 'grams', value: '', type: 'text' },
    { key: 'stock', value: 0 , type: 'number'},
    { key: 'price', value: 0 , type: 'number'},
    { key: 'compare_price', value: 0 , type: 'number'},
    { key: 'barcode', value: 0 , type: 'number'}
  ]

  constructor(){
    this.form = new FormGroup({
      title: new FormControl(this.initialData[0].value, [Validators.required, Validators.minLength(1)]),
      handle: new FormControl(this.initialData[1].value, [Validators.required, Validators.minLength(1)]),
      description: new FormControl(this.initialData[2].value, [Validators.required, Validators.minLength(1)]),
      sku: new FormControl(this.initialData[3].value, [Validators.required, Validators.minLength(1)]),
      grams: new FormControl(this.initialData[4].value, [Validators.required, Validators.minLength(1)]),
      stock: new FormControl(this.initialData[5].value, [Validators.required, Validators.minLength(1)]),
      price: new FormControl(this.initialData[6].value, [Validators.required, Validators.minLength(1)]),
      compare_price: new FormControl(this.initialData[7].value, [Validators.required, Validators.minLength(1)]),
      barcode: new FormControl(this.initialData[8].value, [Validators.required, Validators.minLength(1)])
    });
  }

  handleLogout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  backPage(){
    this.router.navigate(['/products']);
  }

  async onSubmit(){
    const response = await this.productService.createProduct(this.form.value)
    if( response.error ){
      this.handleLogout();
    } else {
      this.openDialog();
      this.router.navigate(['/products']);
    }
    console.log(this.form.value);
  }

  openDialog() {
    this.dialog.open(DialogSuccess);
  }
}
