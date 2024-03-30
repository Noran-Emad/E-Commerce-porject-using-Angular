import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,} from '@angular/core';


/* TO BE REMOVED FOR TESTING ONLY (REPLACE IT WITH THE REAL AUTH SERVICE AND KEEP MY FUNCTION)  */

@Injectable({
  providedIn: 'root'
})
export class TempAuthService {
  
  constructor(private http:HttpClient) { }
  public Lodingauth = false;
  public IsLogged = (): boolean => localStorage.getItem('jwt') != null;
  public LoginFunction(){
    let loginURL = 'http://localhost:3000/api/user/login'
    let cred = {"email":"khalid@gmail.com","password":"12345678"}
    this.Lodingauth = true;
    this.http.post(loginURL,cred).subscribe((token:any)=>{
      localStorage.setItem('jwt',token.token);
      let tempcart:any[] =JSON.parse(localStorage.getItem('tempcart')||'[]')
      
      this.addtocart(tempcart);
    })
  }
  
  
  async addtocart(tempcart:any){
    let headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    await this.http.post('http://localhost:3000/api/cart/addlocal',tempcart,{ headers: headers })
    .toPromise().finally(()=>{
      this.Lodingauth = false;
      window.location.reload()
    }
    )
      
}


  public LogoutFunction(){
    localStorage.clear();
    window.location.reload();
 }

}
