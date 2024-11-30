import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,NavbarComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  
  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        //if (response.access_token) {
          //this.authService.storeToken(response.access_token);
          this.router.navigate(['']);  
        //}
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
  }
});
  
 }

}