import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos-service';
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
  constructor(private photosService: PhotosService) {
    this.groupProfile = this.photosService.pages().groupProfile;
    this.headerImg = this.photosService.pages().headerImg;
    this.arrowIcon = this.photosService.icons().arrowIcon;
  }
}
