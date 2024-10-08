import { GalleryItem } from '../../features/interfaces/gallery-item.interface';
import { User } from '../interfaces/user.interface';
import { Injectable, signal } from '@angular/core';
import {
  LoginResponse,
  SignUpResponse,
} from '../interfaces/login-response.interface';
import { Listing } from '../interfaces/listings.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSignal = signal<User>({
    userName: '',
    email: '',
    password: '',
  });

  login(userName: string, password: string): LoginResponse {
    if (typeof window !== 'undefined' && window.localStorage) {
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
    } else {
      return { success: false, message: 'localStorage no está disponible' };
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('loggedUser');
    }
    this.userSignal.set({
      userName: '',
      email: '',
      password: '',
    });
  }

  Image(id: string, url: string, userName: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
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
  }

  getGallery(userName: string): GalleryItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      let galleryStr = localStorage.getItem(`gallery-${userName}`);
      let gallery: GalleryItem[] = [];
      if (galleryStr) {
        gallery = JSON.parse(galleryStr);
      }
      return gallery;
    } else {
      return [];
    }
  }

  saveGalleryItem(galleryItem: GalleryItem, userName: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      let gallerySrt = localStorage.getItem(`gallery-${userName}`);
      let gallery: GalleryItem[] = [];
      if (gallerySrt) {
        gallery = JSON.parse(gallerySrt);
      }
      gallery = [...gallery, galleryItem];
      localStorage.setItem(`gallery-${userName}`, JSON.stringify(gallery));
    }
  }

  updateGallery(userName: string, gallery: GalleryItem[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`gallery-${userName}`, JSON.stringify(gallery));
    }
  }

  register(user: User): SignUpResponse {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem(user.userName.toLowerCase().trim())) {
        return { success: false, message: 'Usuario ya existe' };
      }
      const userSrt = JSON.stringify(user);
      localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
      console.log();

      this.setUser(user);
      return { success: true };
    } else {
      return { success: false, message: 'localStorage no está disponible' };
    }
  }

  updateProfile(userName: string, email: string, bio: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userSrt = localStorage.getItem(this.userSignal().userName);
      if (userSrt) {
        const user: User = JSON.parse(userSrt);
        user.userName = userName.toLowerCase().trim();
        user.email = email;
        user.bio = bio;
        localStorage.setItem(
          userName.toLowerCase().trim(),
          JSON.stringify(user)
        );
        this.setUser(user);
      }
    }
  }

  postListing(title: string, description: string, direction: string, priceNight: number, numberRooms: number, bathrooms: number, capacity: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const newListing: Listing = {
        title,
        description,
        direction,
        priceNight,
        numberRooms,
        bathrooms,
        capacity,
      };
      let listingsStr = localStorage.getItem('listings');
      let listings: Listing[] = [];
      if (listingsStr) {
        listings = JSON.parse(listingsStr);
      }
      listings = [...listings, newListing];
      localStorage.setItem(`listings-${title}`, JSON.stringify(listings));
    }
  }

  private setUser(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
    this.userSignal.set(user);
  }

  getUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userSrt = localStorage.getItem('loggedUser');
      if (userSrt) {
        const user = JSON.parse(userSrt);
        this.userSignal.set(user);
      }
    }
    return this.userSignal;
  }

  saveProfile(profileUrl: string, userName: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`profile-${userName}`, profileUrl);
    }
  }

  getProfile(userName: string): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(`profile-${userName}`) ?? '';
    } else {
      return '';
    }
  }
}
