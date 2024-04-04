import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    userData: any = {
        email: '',
        password: ''
    }

    loginError: boolean = false;

    constructor(private fb: FormBuilder, private auth: TempAuthService, private router: Router) { }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(1024),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
                ]
            ]
        });
    }

    onLoginSubmit(form: FormGroup) {
        if (form.valid) {
            this.userData = {
                email: form.value.email,
                password: form.value.password
            }

            this.auth.login(this.userData).subscribe({
                next: async (data: any) => {
                    localStorage.setItem('jwt', data['token']);
                    this.auth.Lodingauth = true;
                    this.loginError = false;
                    this.router.navigate(['cart']);
                },
                error: (err) => {
                    console.log(err.message);
                    if (err.status === 401) {
                        this.loginError = true;
                    }
                },
                complete: () => {
               this.auth.Lodingauth = true;
               let tempCart: any[] = JSON.parse(localStorage.getItem('tempcart') || '[]');
               this.auth.addtocart(tempCart);
                }
           }


            )
        }
    }
}

