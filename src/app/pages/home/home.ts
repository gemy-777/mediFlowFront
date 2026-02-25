import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { SpecialityMenu } from '../../components/speciality-menu/speciality-menu';
import { TopDoctors } from '../../components/top-doctors/top-doctors';
import { Banner } from '../../components/banner/banner';

@Component({
  selector: 'app-home',
  imports: [Header, SpecialityMenu, TopDoctors, Banner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor() {}
}
