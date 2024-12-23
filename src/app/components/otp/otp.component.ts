import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule,NavbarComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  email = '';
  otp = '';
 

  constructor(private authService: AuthService,private router: Router) {}

  verify() {
    const data = { email: this.email, otp: this.otp };
    this.authService.verify(data).subscribe(
      (response) => {
        
        this.router.navigate(['signin']);

      } ,
      (error) => alert('Invalid OTP or user not found.')
    );
  }
}
