import { Component, inject, signal } from '@angular/core';
import { PhotosService } from '../../services/photos-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  photoService = inject(PhotosService);
  isEdit = signal(true);
  userData = {
    name: 'Edward Vincent',
    image: this.photoService.pages().profilePic,
    email: 'richardjameswap@gmail.com',
    phone: '+1  123 456 7890',
    address: {
      line1: '57th Cross, Richmond ',
      line2: 'Circle, Church Road, London',
    },
    gender: 'Male',
    dob: '2000-01-20',
  };
  userForm: FormGroup = new FormGroup({
    name: new FormControl(this.userData.name),
    email: new FormControl(this.userData.email),
    phone: new FormControl(this.userData.phone),
    address: new FormGroup({
      line1: new FormControl(this.userData.address.line1),
      line2: new FormControl(this.userData.address.line2),
    }),
    gender: new FormControl(this.userData.gender),
    dateOfBirth: new FormControl(this.userData.dob),
  });
  changeEdit(newValue: boolean): void {
    this.isEdit.set(newValue);
  }
}
