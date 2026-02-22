import { Component } from '@angular/core';
import { Pages } from '../../services/photos/pages';
import { Icons } from '../../services/photos/icons';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private pages: Pages,
    private icons: Icons,
  ) {}

  groupProfile(): string {
    return this.pages.groupProfile();
  }
  headerImg(): string {
    return this.pages.headerImg();
  }
  arrowIcon(): string {
    return this.icons.arrowIcon();
  }
}
