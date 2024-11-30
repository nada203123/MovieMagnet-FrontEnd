import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  suggestions: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.isLoggedIn = !!this.authService.getToken();
  }
  
  goToHome(){
    this.router.navigate(['']);
  }
  goToSignup(){
    this.router.navigate(['signup']);
  }
  goToSignin(){
    this.router.navigate(['signin']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);  
  }

  goToProfile() {
    this.router.navigate(['/profile']);  
  }

  logout() {
    this.authService.removeToken();
    this.isLoggedIn = false;  
    this.router.navigate(['/signin']);  
  }

  onSearchInputChange(query: string) {
    this.searchQuery = query;
    if (query.length > 0) {
      this.authService.searchMovies(query).subscribe(
        (response) => {
          this.suggestions = response.suggestions;
        },
        (error) => {
          console.error('Error fetching search suggestions:', error);
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(movie: any) {
    this.searchQuery = '';
    this.suggestions = [];
    this.router.navigate(['/movie', movie.id]); // Navigate to movie details page
  }
}
