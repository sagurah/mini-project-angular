import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLogin: boolean = true;

  constructor(private authService: AuthServiceService, private router: Router) {}

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  async login() {
    if (this.formLogin.valid) {
      await this.authService.login(this.formLogin.value.email!, this.formLogin.value.password!);
      this.router.navigate(['/homepage']);
    }
  }

  async register() {
    if (this.formLogin.valid) {
      await this.authService.register(this.formLogin.value.email!, this.formLogin.value.password!);
      this.router.navigate(['/auth']);
    }
  }
}
