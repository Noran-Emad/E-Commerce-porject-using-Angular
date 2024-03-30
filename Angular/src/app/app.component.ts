import { Component, OnInit } from '@angular/core';
import { TempAuthService } from './services/temp-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular';
constructor(private auth:TempAuthService){}
  ngOnInit(): void {
    let tempcart = localStorage.getItem('tempcart')
    if(tempcart === null && !this.auth.IsLogged()) localStorage.setItem('tempcart','[]')
  }
}
