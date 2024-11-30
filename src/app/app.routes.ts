import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { OtpComponent } from './components/otp/otp.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'otp' , component : OtpComponent},
  { path: 'movie/:id', component: MoviesDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
];
