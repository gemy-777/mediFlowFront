import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then((comp) => comp.Home) },
  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors').then((comp) => comp.Doctors),
  },
  {
    path: 'doctors/:speciality',
    loadComponent: () => import('./pages/home/home').then((comp) => comp.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((comp) => comp.Login),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((comp) => comp.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((comp) => comp.Contact),
  },
  {
    path: 'my-profile',
    loadComponent: () => import('./pages/my-profile/my-profile').then((comp) => comp.MyProfile),
  },
  {
    path: 'my-appointments',
    loadComponent: () =>
      import('./pages/my-appointment/my-appointment').then((comp) => comp.MyAppointment),
  },
  {
    path: 'appointment/:docId',
    loadComponent: () => import('./pages/appointment/appointment').then((comp) => comp.Appointment),
  },
];
