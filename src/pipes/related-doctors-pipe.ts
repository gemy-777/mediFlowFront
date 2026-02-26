import { Pipe, PipeTransform } from '@angular/core';
import { Idoctor } from '../app/interfaces/idoctor';

@Pipe({
  name: 'relatedDoctors',
})
export class RelatedDoctorsPipe implements PipeTransform {
  transform(doctors: Idoctor[], speciality: string, id: string): Idoctor[] {
    return doctors.filter((doc) => doc.speciality === speciality && doc._id !== id);
  }
}
