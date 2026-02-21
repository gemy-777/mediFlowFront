import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logos {
  logo(): string {
    return './logos/logo.svg';
  }
}
