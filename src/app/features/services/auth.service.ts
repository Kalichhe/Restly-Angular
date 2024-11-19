// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token, false si no lo hay
  }

  // Método para cerrar sesión (opcional)
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
