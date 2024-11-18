import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  uploadedUrl: string = '';
  user;
  listingForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    direction: ['', [Validators.required]],
    priceNight: ['', [Validators.required]],
    numberRooms: ['', [Validators.required]],
    bathrooms: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly postsService: PostsService,
    private readonly userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  onUpload(event: Event) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
    });

    const fileName = uuidv4();
    const input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) {
      return;
    }
    const file: File = input.files![0];
    this.postsService
      .uploadFile(file, this.user().userName, fileName, 'restly')
      .then((response) => {
        this.uploadedUrl = response;
        this.userService.saveGalleryItem(
          { id: fileName, url: this.uploadedUrl, comments: [] },
          this.user().userName
        );
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
      });
  }

  onSaveListing() {
    let title = this.listingForm.value.title ?? '';
    let description = this.listingForm.value.description ?? '';
    let direction = this.listingForm.value.direction ?? '';
    let priceNight = Number(this.listingForm.value.priceNight ?? 0);
    let numberRooms = Number(this.listingForm.value.numberRooms ?? 0);
    let bathrooms = Number(this.listingForm.value.bathrooms ?? 0);
    let capacity = Number(this.listingForm.value.capacity ?? 0);

    if (!this.listingForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }

    this.userService.postListing(title, description, direction, priceNight, numberRooms, bathrooms, capacity);
    Swal.fire({
      title: 'Propiedad',
      text: 'Propiedad creada con éxito',
      icon: 'success',
    });

  }

}
