//navbar component ts
import { Component, signal, computed, effect, OnChanges, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PhotosService } from '../../services/photos-service';
import { NgClass } from '@angular/common';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  showMenu = signal(false);
  token!: string | boolean;

  myLinks: string[];

  logo: string;
  dropdownIcon: string;
  profilePic: string;
  menuIcon: string;
  crossIcon: string;

  constructor(
    private photosService: PhotosService,
    private auth: Authservice,
  ) {
    this.myLinks = ['HOME', 'DOCTORS', 'ABOUT', 'CONTACT'];
    this.logo = this.photosService.logos().logo;
    this.dropdownIcon = this.photosService.icons().dropdownIcon;
    this.profilePic = this.photosService.pages().profilePic;
    this.menuIcon = this.photosService.icons().menuIcon;
    this.crossIcon = this.photosService.icons().crossIcon;
  }
  ngOnInit() {
    this.auth.token.subscribe((res) => {
      this.token = res;
    });
  }
  setShowMenu(newState: boolean) {
    this.showMenu.set(newState);
  }

  logout() {
    this.auth.setToken(false);
  }
}
