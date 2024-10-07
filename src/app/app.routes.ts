import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { UserProfileComponent } from './features/pages/user-profile/user-profile.component'; 
import { PropiedadesComponent } from './propiedades/propiedades.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'propiedades', component: PropiedadesComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección inicial
    { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirección para rutas desconocidas
];
