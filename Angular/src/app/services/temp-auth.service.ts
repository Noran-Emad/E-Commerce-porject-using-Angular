import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { catchError } from 'rxjs';


/* TO BE REMOVED FOR TESTING ONLY (REPLACE IT WITH THE REAL AUTH SERVICE AND KEEP MY FUNCTION)  */

@Injectable({
  providedIn: 'root'
})
export class TempAuthService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  public Lodingauth = false;
  public IsLogged = (): boolean => localStorage.getItem('jwt') != null;
  // public LoginFunction(){
  //   let loginURL = 'http://localhost:3000/api/user/login'
  //   let cred = {"email":"khalid@gmail.com","password":"12345678"}
  //   this.Lodingauth = true;
  //   this.http.post(loginURL,cred).subscribe((token:any)=>{
  //     localStorage.setItem('jwt',token.token);
  //     let tempcart:any[] =JSON.parse(localStorage.getItem('tempcart')||'[]')

  //     this.addtocart(tempcart);
  //   })
  // }

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
            console.error("API erro:", error);
            throw error;
          }
        )
      );
  }



  public LogoutFunction() {
    localStorage.clear();
    // window.location.reload();
  }

}
