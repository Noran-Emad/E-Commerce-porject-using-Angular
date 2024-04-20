import { Component } from '@angular/core';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(private authservice:TempAuthService){}

  LocalMessage = () => ErrorComponent.ErrorMessage;
  LocalShow = () => ErrorComponent.Show;
  LocalHideFunc = () => ErrorComponent.HideMessage();

static ErrorMessage: string = '';
static  Show: boolean = false;

 static ShowMessage(message: string) {
    this.ErrorMessage = message;
    this.Show = true;
  }

 static HideMessage() {
   if(this.ErrorMessage === 'invalid token'){
    localStorage.clear();
    window.location.href = '/'
   }
    this.ErrorMessage = '';
    this.Show = false;
  }

}
