import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Icons {
  dropdownIcon(): string {
    return './icons/dropdown_icon.svg';
  }
}
