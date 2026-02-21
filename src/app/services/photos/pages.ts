import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pages {
  profilePic(): string {
    return 'pages/profile_pic.png';
  }
}
