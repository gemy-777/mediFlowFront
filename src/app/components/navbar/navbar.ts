//navbar component ts
import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Photos } from '../../services/photos';

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
  constructor(private phots: Photos) {
    this.myLinks = ['home', 'doctors', 'about', 'contact'];
    this.logo = this.phots.logos().logo;
    this.dropdownIcon = this.phots.icons().dropdownIcon;
    this.profilePic = this.phots.pages().profilePic;
  }

  updateToken(): void {
    this.token.update((value) => !value);
  }
}
