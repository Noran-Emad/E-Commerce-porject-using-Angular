import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  constructor(private http:HttpClient,private route: ActivatedRoute){}

  payment:any = null;
  headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
  id = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;


  ngOnInit(): void {
    let getPaymentURL = `http://localhost:3000/api/payment/result/${this.id}`;
    this.http.get(getPaymentURL,{headers:this.headers}).subscribe((res:any)=>{
      this.payment = res;
    },error =>{
        ErrorComponent.ShowMessage(error.error)
    })
  }
}
