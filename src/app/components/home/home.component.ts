import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NavbarComponent, FormsModule,PopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  filteredMovies: any[] = [];
  filters = {
    genre: '',
    vote: 0
  };
  genres: string[] = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "War",
    "Western"
  ];
  votes: string[] = ['8.5' , '8' , '7.5' , '7' , '6.5' , '6' , '5.5' , '5'];
  movies: any[] = [];
  showPopup = false; 
  popupMessage = 'Sign in to start creating your favorite movie list.';

  constructor(private authService: AuthService,private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies();
    
  }

  fetchMovies(): void {
    this.authService.getMovies().subscribe({
      next: (response) => {
        console.log('all movies')
        this.movies = response.movies; 
        this.filteredMovies = [...this.movies];
        console.log('Movies fetched:', response.movies);
        this.loadFavorites();
        
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  showMovieDetails(id: number): void {
    
    this.router.navigate(['/movie', id]);
  }

  resetFilters() {
    this.filters = {
      genre: '',
      vote: 0
    };
    this.filteredMovies = [...this.movies];
  }

  applyFilters(): void {
    const filterData = {
      genre: this.filters.genre,
      vote: this.filters.vote 
    };

    console.log('filtreddata',filterData)
    
    this.authService.filterMovies(filterData).subscribe({
      next: (response) => {
        console.log('filtredMovies',response)
        this.filteredMovies = response.movies.map((movie: { isFavorite: any; id: any; }) => {
          // Check if the movie is in the list of favorites and set its state
          movie.isFavorite = this.movies.find(m => m.id === movie.id)?.isFavorite || false;
          return movie;
        });
      },
      error: (error) => {
        console.error('Error fetching filtered movies:', error);
      }
    });
  }

  toggleFavorite(movie: any) {

    if (!this.authService.isAuthenticated()) {
      this.showPopup = true; 
      return;
    }
    
    movie.isFavorite = !movie.isFavorite;

    const movieDetails = {
      movie_id: movie.id,  
      title: movie.title,
      poster: movie.poster,  
      genre: movie.genre,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview
    };
    console.log('moviesdetails',movie)
  
    if (movie.isFavorite) {
      console.log('in the if')
      this.authService.addToFavorites(movieDetails).subscribe({
        next: (response) => {
          console.log('Movie added to favorites:', response);
        },
        error: (error) => {
          console.error('Error adding movie to favorites:', error);
          
          movie.isFavorite = false;
        },
      });
    } else {
      
      this.authService.deleteFromFavorites(movie.id).subscribe({
        next: (response) => {
          console.log('Movie removed from favorites:', response);
        },
        error: (error) => {
          console.error('Error removing movie from favorites:', error);
          
          movie.isFavorite = true;
        },
      });
    }

   
  }
  closePopup() {
    this.showPopup = false; 
  }

  loadFavorites(): void {
    this.authService.getFavorites().subscribe({
      next: (response) => {
        const favoriteMovies = response.favorites; // Assuming the API response contains a "favorites" array
        const favoriteIds = favoriteMovies.map((fav: any) => fav.movie_id);
  
        // Mark movies as favorite based on favoriteIds
        this.movies.forEach(movie => {
          movie.isFavorite = favoriteIds.includes(movie.id);
        });
  
        // Update the filtered movies to reflect favorites
        this.filteredMovies = [...this.movies];
      },
      error: (error) => {
        console.error('Error fetching favorites:', error);
      }
    });
  }
  
  


  

}
