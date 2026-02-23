import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { SpecialityMenu } from '../../components/speciality-menu/speciality-menu';

@Component({
  selector: 'app-home',
  imports: [Header, SpecialityMenu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
