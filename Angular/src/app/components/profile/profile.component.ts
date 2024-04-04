import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  showSuccess: boolean = false;
  profileForm!: FormGroup;
  userData: any = {
    name: '',
    email: '',
    address: '',
    phoneNumber: ''
  };

  constructor(private fb: FormBuilder, private auth: TempAuthService, private router: Router) { }


  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ["",
        [Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z ,.'-]+$"),
        Validators.required
        ]],

      email: ["", [Validators.email, Validators.required]],
      address: ["", Validators.maxLength(250)],
      phoneNumber: ["",
        [
          Validators.maxLength(11),
          Validators.pattern(/^(012|010|011)\d{8}$/)
        ]
      ]
    });

    this.auth.getProfile().subscribe(
      (data) => {
        console.log(data);
        this.userData = data;
        this.profileForm.patchValue(this.userData);
      }
    );

  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.userData = {
        name: form.value.name,
        email: form.value.email,
        address: form.value.address,
        phoneNumber: form.value.phoneNumber
      }

      this.auth.updateProfile(this.userData).subscribe(
        {
          next: (data: any) => {
            console.log(data);

          },

          error: (err: any) => {
            console.log(err)
          },
          complete: () => {
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
          }

        }
      )
    }


  }

  onCancel() {
    this.profileForm.reset(this.userData);
  }


  logout(): void {
    this.auth.LogoutFunction();
    this.router.navigate(['/home']);
  }

}


