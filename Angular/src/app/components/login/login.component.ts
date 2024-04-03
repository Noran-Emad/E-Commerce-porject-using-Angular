// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../Services/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   userData: Object = {
//     email: '',
//     password: ''
//   }

//   loginError: boolean = false;

//   constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) { }
//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['',
//         [
//           Validators.required,
//           Validators.minLength(8),
//           Validators.maxLength(1024),
//           Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
//         ]
//       ]
//     });
//   }

//   onLoginSubmit(form: FormGroup) {
//     if (form.valid) {
//       this.userData = {
//         email: form.value.email,
//         password: form.value.password
//       }

//       this.userservice.login(this.userData).subscribe({
//         next: (data) => {
//           localStorage.setItem('token', data['token']);
//           this.loginError = false;
//           this.router.navigate(['home']);
//         },
//         error: (err) => {
//           console.log(err.message);
//           if (err.status === 401) {
//             this.loginError = true;
//           }
//         }
//       }
//       )
//     }
//   }
// }

