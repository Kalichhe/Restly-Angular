import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../auth/pages/login/login.component'; // Asegúrate de tener el componente de Login
import { UserProfileComponent } from './edit-profile/edit-profile.component';
import { PropertyManagementComponent } from './property-management/property-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: 'profile', component: UserProfileComponent },
  { path: 'edit-profile', component: UserProfileComponent },
  { path: 'property-management', component: PropertyManagementComponent },
  { path: '**', redirectTo: 'login' } // Redirección para rutas no encontradas
];


