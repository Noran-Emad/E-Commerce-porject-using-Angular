import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TempAuthService } from '../../services/temp-auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regForm!: FormGroup
  data: Object = {
    name: '',
    email: '',
    password: ''
  }

  emailExists: boolean = false;

  constructor(private fb: FormBuilder, private authservice: TempAuthService, private router: Router) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern("^[a-zA-Z ,.'-]+$"),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(1024),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
      ]
      ],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.data = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      }

      this.authservice.registerUser(this.data).subscribe(
        {
          next: (data) => {
            console.log(data)
            this.router.navigate(['/login'])
            this.emailExists = false;
          },
          error: (err) => {
            console.log(err.message);
            if (err.status === 409) {
              this.emailExists = true;
            }
          }
        }
      )
    }

  }
}
