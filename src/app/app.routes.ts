import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './features/pages/home/home.component';
import { UserProfileComponent } from './features/pages/user-profile/user-profile.component';
import { PostsComponent } from './features/pages/posts/posts.component';
import { UserProfileOwnerComponent } from './features/pages/user-profile-owner/user-profile-owner.component';
import { ListingsComponent } from './features/pages/listings/listings.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'user-profile-owner', component: UserProfileOwnerComponent },
    { path: 'listings', component: ListingsComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
