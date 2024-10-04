    import { Injectable } from '@angular/core';
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://your-supabase-url.supabase.co';
    const supabaseKey = 'your-anon-key';
    const supabase = createClient(supabaseUrl, supabaseKey);

    @Injectable({
    providedIn: 'root',
    })
    export class SupabaseService {
    constructor() {}

    // Obtener el perfil del usuario
    async getUserProfile(username: string): Promise<{ bio: string; profile_picture: string; } | null> {
        const { data, error } = await supabase
        .from('profiles')
        .select('bio, profile_picture') // Selecciona solo los campos que necesitas
        .eq('id', username)
        .single();
        
        if (error) {
        console.error(error);
        return null;
        }
        
        return {
        bio: data.bio,
        profile_picture: data.profile_picture
        };
    }
    
    // Actualizar el perfil del usuario
    async updateUserProfile(username: string, bio: string, profilePicture: any): Promise<boolean> {
        // Lógica para actualizar el perfil del usuario
        const { data, error } = await supabase
        .from('profiles')
        .update({ bio, profile_picture: profilePicture }) // Actualiza los campos necesarios
        .eq('id', username);
        
        if (error) {
        console.error(error);
        return false; // Retorna false si hay un error
        }
        return true; // Retorna true si la actualización fue exitosa
    }
    }  
