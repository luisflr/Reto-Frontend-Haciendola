import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductInterface } from '../components/Interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient)
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = "https://reto-backend-haciendola-production.up.railway.app"
  }

  async getProducts() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/products`, this.getHeaders())
    ).catch(err => err)
  }

  async getProductById(id: number) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/products/${id}`, this.getHeaders())
    ).catch(err => err)
  }
  async deleteProduct(id: number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.baseUrl}/products/${id}`, this.getHeaders())
    ).catch(err => err)
  }

  async updateProduct(id: number, formValue: ProductInterface) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/products/${id}`, formValue, this.getHeaders())
    ).catch(err => err)
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('user-access') as string}`
      })
    }
  }

}