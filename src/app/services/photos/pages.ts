import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pages {
  profilePic(): string {
    return 'pages/profile_pic.png';
  }
  groupProfile(): string {
    return 'pages/group_profiles.png';
  }
  headerImg(): string {
    return 'pages/header_img.png';
  }
}
