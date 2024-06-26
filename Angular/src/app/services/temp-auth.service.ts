import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class TempAuthService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private cartservice:CartService,private http: HttpClient, private router: Router) { } 
  public Lodingauth = false;
  public IsLogged = (): boolean => localStorage.getItem('jwt') != null;

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/user/register`, user).pipe(
      catchError((error: any) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/user/login`, user)
      .pipe(
        catchError(
          (error) => {
            console.error("API Error:", error);
            throw error;
          }
        )
      );
  }

  async addtocart(tempcart: any) {
    let headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    await this.http.post('http://localhost:3000/api/cart/addlocal', tempcart, { headers: headers })
      .toPromise().finally(() => {
        this.Lodingauth = false;
        window.location.reload()
      }
      )

  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/user/profile`)
      .pipe(
        catchError(
          (error) => {
            console.error("API Error:", error);
            throw error;
          }
        )
      );
  }

  updateProfile(user: any) {
    return this.http.patch(`${this.apiUrl}/user/profile`, user)
      .pipe(
        catchError(
          (error) => {
            console.error("API error:", error);
            throw error;
          }
        )
      );
  }

  public LogoutFunction() {
    localStorage.clear();
    this.router.navigate(['']);
    this.cartservice.clearCart();
  }

}
