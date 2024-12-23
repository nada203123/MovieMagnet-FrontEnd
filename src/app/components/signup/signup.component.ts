import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,NavbarComponent,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  firstname='';
  lastname='';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    const data = { first_name:this.firstname, last_name:this.lastname, email: this.email, password: this.password };
    console.log('data',data)
    this.authService.signup(data).subscribe((response) => {
   
      this.router.navigate(['/otp']);
    },
    (error) => {
      if (error.status === 400) {
        alert('Signup failed. Check your input and try again.');
      } else if (error.status === 500) {
        alert('Internal server error. Please try again later.');
      } else {
        alert('Signup failed. Please try again.');
      }
    }

  );
  }

  goToSignIn(){
    this.router.navigate(['signin']);
  }
}
