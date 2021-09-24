import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aDcenterFilter'
})
export class ADcenterFilterPipe implements PipeTransform {

  transform(center: string, args?: any): any {
    if (center) {
      const result= center.split(' ')[1];
      return result;
    }
    return center;

}
}