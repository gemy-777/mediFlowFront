//navbar component ts
import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PhotosService } from '../../services/photos-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  showMenu = signal(false);
  token = signal(true);

  myLinks: string[];

  logo: string;
  dropdownIcon: string;
  profilePic: string;
  menuIcon: string;
  crossIcon: string;

  constructor(private photosService: PhotosService) {
    this.myLinks = ['HOME', 'DOCTORS', 'ABOUT', 'CONTACT'];
    this.logo = this.photosService.logos().logo;
    this.dropdownIcon = this.photosService.icons().dropdownIcon;
    this.profilePic = this.photosService.pages().profilePic;
    this.menuIcon = this.photosService.icons().menuIcon;
    this.crossIcon = this.photosService.icons().crossIcon;
  }

  updateToken(): void {
    this.token.update((value) => !value);
  }

  setShowMenu(newState: boolean) {
    this.showMenu.set(newState);
  }
}
