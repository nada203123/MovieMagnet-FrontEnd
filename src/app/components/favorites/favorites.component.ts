import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NavbarComponent,CommonModule,],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  movies: any[] = []; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites(); 
  }

  loadFavorites(): void {
    this.authService.getFavorites().subscribe({
      next: (response: any) => {
        this.movies = response.favorites || []; 
        console.log('favorite movies',response.favorites )
      },
      error: (error) => {
        console.error('Error fetching favorite movies:', error);
      },
    });
  }
   

  showMovieDetails(id: number): void {
    this.router.navigate([`/movie/${id}`]); 
    console.log('favorite movie id' , id)
  }
}
