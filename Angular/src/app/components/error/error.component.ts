import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

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
    this.ErrorMessage = '';
    this.Show = false;
  }

}
