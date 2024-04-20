import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , BehaviorSubject, catchError} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { json } from 'stream/consumers';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { error } from 'console';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient, private _router:Router) { 
    // if(localStorage.getItem('userToken')!=null){
    //   this.saveUserData();
    // }
  }


  userData:any = new BehaviorSubject(null);
  
 productData:any=new BehaviorSubject(null);//have 2 method getValue and to give value

  saveUserData(){
    //get token fron local storage 
    //decode
    let encodedtoken=JSON.stringify( localStorage.getItem('userToken'));
   let decodedToken = jwtDecode(encodedtoken);
   this.userData.next(decodedToken);
   console.log(this.userData);
  }

  signOut(){
    localStorage.clear();
    this.userData.next(null);
    this._router.navigate(['/login']);
  
  }
  signUp(userData:object):Observable<any>{
    return this._httpClient.post('http://localhost:3000/api/v1/users/login/',userData);
  }



  }