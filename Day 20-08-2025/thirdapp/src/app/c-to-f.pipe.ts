import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cToF',
  standalone: true
})
export class CToFPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';
    const fahrenheit = (value * 9/5) + 32;
    return `${fahrenheit}F`;
  }

}
