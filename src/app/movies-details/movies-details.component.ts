import { Component, OnInit , OnDestroy } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movies-details',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './movies-details.component.html',
  styleUrl: './movies-details.component.css'
})
export class MoviesDetailsComponent implements OnInit , OnDestroy{
 
  movie: any;
  recommendations: any[] = [];
  private routeSub!: Subscription;
  private favoriteIds: number[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to route parameters to handle ID changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchMovieDetails(id);
        this.loadFavorites(); // Fetch the movie details when the ID changes
      }
    });
  }

  fetchMovieDetails(id: string): void {
    this.http.get(`http://127.0.0.1:8000/api/auth/movie/${id}/`).subscribe(
      (data: any) => {
        const favoritesSet = new Set(this.favoriteIds); // Use a Set for efficient lookups
        this.movie = {
          ...data,
          isFavorite: favoritesSet.has(data.id), // Check if the movie is in favorites
        };
  
        if (this.movie?.title) {
          this.fetchRecommendations(this.movie.title); // Fetch recommendations when the movie is fetched
        }
      },
      error => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  fetchRecommendations(movieName: string): void {
    this.http.post(`http://127.0.0.1:8000/api/auth/recommend/`, { movie_name: movieName }).subscribe(
      (data: any) => {
        const favoritesSet = new Set(this.favoriteIds); // Use a Set for efficient lookups
      this.recommendations = (data.recommendations || []).map((movie: any) => {
        return {
          ...movie,
          isFavorite: favoritesSet.has(movie.id), // Check if the movie is in favorites
        };
      });
      },
      error => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }

  loadFavorites(): void {
    this.authService.getFavorites().subscribe({
      next: (response) => {
        const favoriteMovies = response.favorites; // Assuming the API response contains a "favorites" array
        this.favoriteIds = favoriteMovies.map((fav: any) => fav.movie_id);
      },
      error: (error) => {
        console.error('Error fetching favorites:', error);
      },
    });
  }


  toggleFavorite(movie: any): void {
    movie.isFavorite = !movie.isFavorite;

    const movieDetails = {
      movie_id: movie.id,
      title: movie.title,
      poster: movie.poster,
      genre: movie.genre,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    };

    if (movie.isFavorite) {
      this.authService.addToFavorites(movieDetails).subscribe({
        next: () => {
          console.log('Movie added to favorites:', movie.title);
        },
        error: (error) => {
          console.error('Error adding movie to favorites:', error);
          movie.isFavorite = false;
        },
      });
    } else {
      this.authService.deleteFromFavorites(movie.id).subscribe({
        next: () => {
          console.log('Movie removed from favorites:', movie.title);
        },
        error: (error) => {
          console.error('Error removing movie from favorites:', error);
          movie.isFavorite = true;
        },
      });
    }
  }
  // Handle click on a recommended movie to view its details
  showMovieDetails(id: number): void {
    this.router.navigate([`/movie/${id}`]);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the route parameters subscription when the component is destroyed
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  
}
