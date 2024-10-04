import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { EditProfileComponent } from './features/pages/edit-profile/edit-profile.component';
import { UserProfileComponent } from './features/pages/user-profile/user-profile.component';
import { PropertyManagementComponent } from './features/pages/property-management/property-management.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'property-management', component: PropertyManagementComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección a login
    { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirección a login para rutas desconocidas
];
