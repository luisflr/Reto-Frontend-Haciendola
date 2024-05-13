import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient)
  private baseUrl: string;
  private httpOptions: any;
  
  constructor() {
    this.baseUrl = "http://localhost:3000"
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('user-access') as string}`
      })
    }
  }

  async getProducts() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/products`, this.httpOptions)
    ).catch(err => err)
  }

}