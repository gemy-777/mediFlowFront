import { Component, signal, computed, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logos } from '../../services/photos/logos';
import { Icons } from '../../services/photos/icons';
import { Pages } from '../../services/photos/pages';

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
  constructor(
    private logos: Logos,
    private icons: Icons,
    private pages: Pages,
  ) {}
  logo(): string {
    return this.logos.logo();
  }
  dropdownIcon(): string {
    return this.icons.dropdownIcon();
  }
  profilePic(): string {
    return this.pages.profilePic();
  }
}
