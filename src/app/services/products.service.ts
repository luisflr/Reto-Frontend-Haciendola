import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient)
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = "http://localhost:3000"
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

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('user-access') as string}`
      })
    }
  }

}