import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signup/`, data);
  }

  verify(data: any) {
    return this.http.post(`${this.baseUrl}verify-otp/`, data);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}signin/`, body).pipe(
      tap((response: any) => {
        this.storeToken(response.access_token); // Store token after login
      })
    );
  }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}home/`);
  }

  filterMovies(filters: { genre: string, vote: number  }): Observable<any> {
    let params = new HttpParams();
    
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }

    if (filters.vote > 0) {
      params = params.set('vote_average', filters.vote.toString());
    }

    return this.http.get<any>(`${this.baseUrl}filter/`, { params });
  }

  storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Remove token from local storage
  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/`, {
      params: { q: query },
    });
  }

  addToFavorites(movie: any): Observable<any> {
    const url = `${this.baseUrl}addfavorite/`;
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);
    
    console.log('url',url)
    const movieData = {
        movie_id: movie.movie_id,
        title: movie.title,
        poster_url: movie.poster,
        overview: movie.overview,
        genre: movie.genre,
        vote_average: movie.vote_average,
        release_date: movie.release_date 
    };
    console.log('movieData',movieData)
    return this.http.post(url, movieData, { headers});
  }

  deleteFromFavorites(movieId: number): Observable<any> {
    const url = `${this.baseUrl}delete/`;
    return this.http.request('delete', url, {
      headers: this.getAuthHeaders(),
      body: { movie_id: movieId },
    });
  }

  getFavorites(): Observable<any> {
    const url = `${this.baseUrl}favorites/`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders():  HttpHeaders  {
    const token = localStorage.getItem('access_token'); 
    if (!token) {
      console.error('No token found in localStorage!');
    }
    return  new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token'); 
  }
}
