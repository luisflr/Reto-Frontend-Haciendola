import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductInterface } from '../../Interfaces/products.interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: number;
  productsService = inject(ProductsService);
  product: ProductInterface;
  userService = inject(UsersService);

  constructor(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
  }

  async getProduct() {
    const response = await this.productsService.getProductById(this.id);
    console.log(response.product)
    response.error ? this.handleLogout() : this.product = response.product
  }

  handleLogout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  backPage(){
    this.router.navigate(['/products'])
  }
}
