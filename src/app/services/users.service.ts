import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = "http://localhost:3000"
  }

  async register(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue)
    ).catch(err => err)
  }

  async login(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
    ).catch(err => err)
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user-access') !== null;
  }

  logout() { localStorage.removeItem('user-access') }
}
