import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  LoginResponse,
  SignUpResponse,
} from '../interfaces/login-response.interface';
import { GalleryItem } from '../../features/interfaces/gallery-item.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({ userName: '', email: '', password: '' });

  login(userName: string, password: string): LoginResponse {
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());

    if (!userSrt) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    const user: User = JSON.parse(userSrt);

    if (user.password !== password) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    this.setUser(user);
    return {
      success: true,
    };
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.userSignal.set({ userName: '', email: '', password: '' });
  }

  saveImage(id: string, url: string, userName: string) {
    const newImage: GalleryItem = {
      id,
      url,
      comments: [],
    };
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if (galleryStr) {
      let gallery = JSON.parse(galleryStr);
      gallery = [...gallery, newImage];
      localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
    } else {
      localStorage.setItem(`imgs-${userName}`, JSON.stringify([newImage]));
    }
  }

  getGallery(userName: string): GalleryItem[] {
    let galleryStr = localStorage.getItem(`imgs-${userName}`);
    if (galleryStr) {
      return JSON.parse(galleryStr);
    }
    return [];
  }

  updateGallery(userName: string, gallery: GalleryItem[]) {
    localStorage.setItem(`imgs-${userName}`, JSON.stringify(gallery));
  }

  register(user: User): SignUpResponse {
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return { success: false, message: 'Usuario ya existe' };
    }
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return { success: true };
  }

  private setUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser() {
    const userSrt = localStorage.getItem('loggedUser');
    if (userSrt) {
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }
}