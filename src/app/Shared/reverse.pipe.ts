import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any) {
    if (value.length ) {
        return value.split('').reverse().join('')
    }
    else 
        return value
}
}
