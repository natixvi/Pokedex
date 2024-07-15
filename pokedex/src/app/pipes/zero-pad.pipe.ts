import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad',
  standalone: true
})
export class ZeroPadPipe implements PipeTransform {

  transform(value: number, length: number = 4): string {
    const stringValue = value.toString();
    return stringValue.padStart(length, '0');
  }

}
