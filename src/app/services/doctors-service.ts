import { Injectable } from '@angular/core';
import { PhotosService } from './photos-service';
import { Idoctor } from '../interfaces/idoctor';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iresponse } from '../interfaces/idoctor-response';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  // private doc1: string;
  // private doc2: string;
  // private doc3: string;
  // private doc4: string;
  // private doc5: string;
  // private doc6: string;
  // private doc7: string;
  // private doc8: string;
  // private doc9: string;
  // private doc10: string;
  // private doc11: string;
  // private doc12: string;
  // private doc13: string;
  // private doc14: string;
  // private doc15: string;
  // private allDoctors: Idoctor[];
  allDoctors: BehaviorSubject<Idoctor[]> = new BehaviorSubject<Idoctor[]>([] as Idoctor[]);
  private constructor(
    private photos: PhotosService,
    private _http: HttpClient,
  ) {
    // this.doc1 = this.photos.doctors().doc1;
    // this.doc2 = this.photos.doctors().doc2;
    // this.doc3 = this.photos.doctors().doc3;
    // this.doc4 = this.photos.doctors().doc4;
    // this.doc5 = this.photos.doctors().doc5;
    // this.doc6 = this.photos.doctors().doc6;
    // this.doc7 = this.photos.doctors().doc7;
    // this.doc8 = this.photos.doctors().doc8;
    // this.doc9 = this.photos.doctors().doc9;
    // this.doc10 = this.photos.doctors().doc10;
    // this.doc11 = this.photos.doctors().doc11;
    // this.doc12 = this.photos.doctors().doc12;
    // this.doc13 = this.photos.doctors().doc13;
    // this.doc14 = this.photos.doctors().doc14;
    // this.doc15 = this.photos.doctors().doc15;
    // this.allDoctors = [
    //   {
    //     _id: 'doc1',
    //     name: 'Dr. Richard James',
    //     image: this.doc1,
    //     speciality: 'General physician',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '17th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc2',
    //     name: 'Dr. Emily Larson',
    //     image: this.doc2,
    //     speciality: 'Gynecologist',
    //     degree: 'MBBS',
    //     experience: '3 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 60,
    //     address: {
    //       line1: '27th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc3',
    //     name: 'Dr. Sarah Patel',
    //     image: this.doc3,
    //     speciality: 'Dermatologist',
    //     degree: 'MBBS',
    //     experience: '1 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 30,
    //     address: {
    //       line1: '37th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc4',
    //     name: 'Dr. Christopher Lee',
    //     image: this.doc4,
    //     speciality: 'Pediatricians',
    //     degree: 'MBBS',
    //     experience: '2 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 40,
    //     address: {
    //       line1: '47th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc5',
    //     name: 'Dr. Jennifer Garcia',
    //     image: this.doc5,
    //     speciality: 'Neurologist',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '57th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc6',
    //     name: 'Dr. Andrew Williams',
    //     image: this.doc6,
    //     speciality: 'Neurologist',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '57th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc7',
    //     name: 'Dr. Christopher Davis',
    //     image: this.doc7,
    //     speciality: 'General physician',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '17th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc8',
    //     name: 'Dr. Timothy White',
    //     image: this.doc8,
    //     speciality: 'Gynecologist',
    //     degree: 'MBBS',
    //     experience: '3 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 60,
    //     address: {
    //       line1: '27th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc9',
    //     name: 'Dr. Ava Mitchell',
    //     image: this.doc9,
    //     speciality: 'Dermatologist',
    //     degree: 'MBBS',
    //     experience: '1 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 30,
    //     address: {
    //       line1: '37th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc10',
    //     name: 'Dr. Jeffrey King',
    //     image: this.doc10,
    //     speciality: 'Pediatricians',
    //     degree: 'MBBS',
    //     experience: '2 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 40,
    //     address: {
    //       line1: '47th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc11',
    //     name: 'Dr. Zoe Kelly',
    //     image: this.doc11,
    //     speciality: 'Gastroenterologist',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '57th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc12',
    //     name: 'Dr. Patrick Harris',
    //     image: this.doc12,
    //     speciality: 'Neurologist',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '57th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc13',
    //     name: 'Dr. Chloe Evans',
    //     image: this.doc13,
    //     speciality: 'General physician',
    //     degree: 'MBBS',
    //     experience: '4 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 50,
    //     address: {
    //       line1: '17th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc14',
    //     name: 'Dr. Ryan Martinez',
    //     image: this.doc14,
    //     speciality: 'Gynecologist',
    //     degree: 'MBBS',
    //     experience: '3 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 60,
    //     address: {
    //       line1: '27th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    //   {
    //     _id: 'doc15',
    //     name: 'Dr. Amelia Hill',
    //     image: this.doc15,
    //     speciality: 'Dermatologist',
    //     degree: 'MBBS',
    //     experience: '1 Years',
    //     about:
    //       'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    //     fees: 30,
    //     address: {
    //       line1: '37th Cross, Richmond',
    //       line2: 'Circle, Ring Road, London',
    //     },
    //   },
    // ];
    // this.getDoctorsData().subscribe(
    //   (res) => (this.allDoctors = new BehaviorSubject<Idoctor[]>(res.doctors ?? [])),
    // );
  }

  getDoctorsData(): Observable<Iresponse> {
    return this._http.get<Iresponse>(`${environment.BACKEND_URL}/api/doctor/list`).pipe(
      tap((res) => {
        if (res.success && res.doctors) {
          this.allDoctors.next(res.doctors);
          console.log(this.allDoctors.value);
        }
      }),
    );
  }

  doctors(): Idoctor[] {
    console.log('this.allDoctors.value', this.allDoctors.value);
    return this.allDoctors.value;
  }

  doctor(id: string): Idoctor | null {
    return this.doctors().find((doc) => doc._id === id) ?? null;
  }
}
