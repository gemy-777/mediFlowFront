import { Component } from '@angular/core';
import { Photos } from '../../services/photos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  groupProfile: string;
  headerImg: string;
  arrowIcon: string;
  constructor(private photos: Photos) {
    this.groupProfile = this.photos.pages().groupProfile;
    this.headerImg = this.photos.pages().headerImg;
    this.arrowIcon = this.photos.icons().arrowIcon;
  }
}
