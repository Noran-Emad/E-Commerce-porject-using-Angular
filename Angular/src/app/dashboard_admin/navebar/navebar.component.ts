import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin-auth/admin-auth.component';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.css'
})
export class NavebarComponent  implements OnInit{

islogin:boolean=false;

constructor(private _authService:AuthService){
 

}




  ngOnInit(): void {
    this.islogin=false; 
 this._authService.userData.subscribe({
      next:()=>{
        if (this._authService.userData.getValue() != null) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    },
      error:()=>{}
      
    })

    
  }

  signOut(){
    this._authService.signOut();
    this.islogin=false;
  }

 


  

}
