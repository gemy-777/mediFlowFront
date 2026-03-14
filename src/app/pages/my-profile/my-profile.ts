import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { PhotosService } from '../../services/photos-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../services/authservice';
import { ToastrService } from 'ngx-toastr';
import { IuserProfile } from '../../interfaces/iuser-profile';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile implements OnInit {
  isEdit = signal(false);
  image = signal<null>(null);

  userData!: IuserProfile | false;
  userForm!: FormGroup;

  constructor(
    public photoService: PhotosService,
    private auth: Authservice,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.auth.loadUserProfileData().subscribe({
      next: (res) => {
        if (res.success && res.userData) {
          this.auth.userData.next(res.userData as IuserProfile);
          // this.userData = this.auth.userData.value;
          this.userData = res.userData as IuserProfile;
          this.createUserForm();
          this.cdr.detectChanges();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (error) => {
        this.toastr.error(error.massage);
      },
    });
  }
  changeEdit(newValue: boolean): void {
    this.isEdit.set(newValue);
  }
  createUserForm() {
    if (this.userData) {
      this.userForm = new FormGroup({
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
    }
  }

  setImage(files: any) {
    const file = files[0];
    if (file) {
      this.image.set(file);
    }
  }

  getProfileImage(): SafeUrl | string {
    const selectedFile = this.image(); // لو أنت مستخدم Signal

    if (selectedFile) {
      // 1. إنشاء الرابط المؤقت
      const objectUrl = URL.createObjectURL(selectedFile);
      // 2. تأمين الرابط عشان أنجلر يرضى يعرضه
      return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    }

    // 3. لو مفيش صورة مختارة، ارجع بصورة اليوزر القديمة
    return (this.userData as IuserProfile).image || this.photoService.logos().uploadArea;
  }
}
