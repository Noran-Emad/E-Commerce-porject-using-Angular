import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../dashboard_admin/admin-auth/admin-auth.component';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
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
    
  })}}

  











