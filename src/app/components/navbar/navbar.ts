//navbar component ts
import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PhotosService } from '../../services/photos-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  showMenu = signal(false);
  setShowMenu = signal(false);
  token = signal(true);
  setToken = signal(true);
  myLinks: string[];

  logo: string;
  dropdownIcon: string;
  profilePic: string;
  constructor(private photosService: PhotosService) {
    this.myLinks = ['HOME', 'DOCTORS', 'ABOUT', 'CONTACT'];
    this.logo = this.photosService.logos().logo;
    this.dropdownIcon = this.photosService.icons().dropdownIcon;
    this.profilePic = this.photosService.pages().profilePic;
  }

  updateToken(): void {
    this.token.update((value) => !value);
  }
}
