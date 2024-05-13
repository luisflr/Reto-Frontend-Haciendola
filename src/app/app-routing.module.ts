import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllProductsComponent } from './components/products/all-products/all-products.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';

import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'products', 
    component: AllProductsComponent,
    canActivate: [loginGuard]
  },
  { 
    path: 'products/:id', 
    component: ProductDetailComponent,
    canActivate: [loginGuard]
  },
  { 
    path: 'products/edit/:id', 
    component: UpdateProductComponent,
    canActivate: [loginGuard]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
