import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent  } from '@angular/material/paginator';

import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductInterface } from '../../Interfaces/products.interfaces';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})


export class AllProductsComponent implements AfterViewInit {
  productsService = inject(ProductsService);
  userService = inject(UsersService);
  router = inject(Router)
  products = new MatTableDataSource<ProductInterface>();
  displayedColumns: string[] = ['id', 'handle', 'title', 'stock', 'price', 'edit', 'delete'];
  totalItems: number;
  pageSize: number;
  totalProducts: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
  }

  constructor() {
    this.getProducts();
  }

  async getProducts() {
    const response: any = await this.productsService.getProducts();
    if (response.error) {
      this.handleLogout();
    } else {
      this.totalItems = response.products.length;
      this.pageSize = 10;
      this.totalProducts = response.products;
      this.products = this.totalProducts.slice(0, this.pageSize);
    }
  }

  handleLogout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.totalProducts.slice(startIndex, endIndex);
  }

  async deleteItem(id: number){
    const response = await this.productsService.deleteProduct(id);
    response.error ? this.handleLogout() : this.getProducts();
  }

  viewItem(id: number){
    this.router.navigate([`/products/${id}`])
  }
}
