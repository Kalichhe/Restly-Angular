import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-profile-owner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-owner.component.html',
  styleUrl: './user-profile-owner.component.css',
})
export class UserProfileOwnerComponent {
  updateForm = this.fb.group({
    userName: [
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[a-zA-Z0-9]*$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
  });

  posts = signal(10);
  followers = 5;
  requests = 150;
  galleryItems = signal<GalleryItem[]>([]);

  user;
  profilePhoto = '';
  uploadedUrl: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly postsService: PostsService,
    private readonly userService: UserService
  ) {
    this.user = this.userService.getUser();
    this.galleryItems.set(this.userService.getGallery(this.user().userName));
    this.profilePhoto = this.userService.getProfile(this.user().userName);
  }

  onUploadPhoto(event: Event) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileName = uuidv4();
    const input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) {
      return;
    }
    const file: File = input.files![0];
    this.postsService
      .uploadFile(file, this.user().userName, fileName, 'profile')
      .then((response) => {
        this.uploadedUrl = response;
        this.userService.saveProfile(this.uploadedUrl, this.user().userName);
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
      });
  }

  onAddComment(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      return;
    }
    this.galleryItems.update((items) => {
      let selected = items.find((item) => item.id === id);
      if (selected) {
        selected.comments = [...selected.comments, input.value];
      }
      return items;
    });
    this.userService.updateGallery(this.user().userName, this.galleryItems());
    input.value = '';
  }

  onDelete(id: string) {
    Swal.fire({
      text: '¿Está seguro de eliminar la imagen seleccionada?',
      icon: 'warning',
      iconColor: '#219ebc',
      showCancelButton: true,
      confirmButtonColor: '#023047',
      cancelButtonColor: '#d00000',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryItems.update((items) =>
          items.filter((item) => item.id !== id)
        );
        this.userService.updateGallery(
          this.user().userName,
          this.galleryItems()
        );
        this.posts.update(() => this.galleryItems().length);
      }
    });
  }

  onSaveProfile() {
    let userName = this.updateForm.value.userName ?? '';
    let email = this.updateForm.value.email ?? '';
    let bio = this.updateForm.value.bio ?? '';

    if (!this.updateForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }
    this.userService.updateProfile(userName, email, bio);
    Swal.fire({
      title: 'Perfil',
      text: 'Perfil actualizado correctamente',
      icon: 'success',
    });
  }
}
