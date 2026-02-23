import { Injectable } from '@angular/core';
import { Ispeciality } from '../interfaces/ispeciality';

@Injectable({
  providedIn: 'root',
})
export class Photos {
  icons() {
    return {
      dropdownIcon: 'icons/dropdown_icon.svg',
      arrowIcon: 'icons/arrow_icon.svg',
    };
  }

  logos() {
    return { logo: './logos/logo.svg' };
  }

  pages() {
    return {
      profilePic: 'pages/profile_pic.png',

      groupProfile: 'pages/group_profiles.png',

      headerImg: 'pages/header_img.png',
    };
  }

  specialityData(): Ispeciality[] {
    return [
      {
        speciality: 'General physician',
        image: 'speciality/General_physician.svg',
      },
      {
        speciality: 'Gynecologist',
        image: 'speciality/Gynecologist.svg',
      },
      {
        speciality: 'Dermatologist',
        image: 'speciality/Dermatologist.svg',
      },
      {
        speciality: 'Pediatricians',
        image: 'speciality/Pediatricians.svg',
      },
      {
        speciality: 'Neurologist',
        image: 'speciality/Neurologist.svg',
      },
      {
        speciality: 'Gastroenterologist',
        image: 'speciality/Gastroenterologist.svg',
      },
    ];
  }
}
