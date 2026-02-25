import { Injectable } from '@angular/core';
import { Ispeciality } from '../interfaces/ispeciality';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  doctors() {
    return {
      doc1: 'doctors/doc1.png',
      doc2: 'doctors/doc2.png',
      doc3: 'doctors/doc3.png',
      doc4: 'doctors/doc4.png',
      doc5: 'doctors/doc5.png',
      doc6: 'doctors/doc6.png',
      doc7: 'doctors/doc7.png',
      doc8: 'doctors/doc8.png',
      doc9: 'doctors/doc9.png',
      doc10: 'doctors/doc10.png',
      doc11: 'doctors/doc11.png',
      doc12: 'doctors/doc12.png',
      doc13: 'doctors/doc13.png',
      doc14: 'doctors/doc14.png',
      doc15: 'doctors/doc15.png',
    };
  }
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
      appointmentImg: 'pages/appointment_img.png',
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
