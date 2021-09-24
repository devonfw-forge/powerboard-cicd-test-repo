import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkTypeFilter'
})
export class LinkTypeFilterPipe implements PipeTransform {

  transform(linkType: string, args?: any): any {
    if (linkType) {
     const linkTypeArray= linkType.split('_');
     const result= linkTypeArray[0]+ ' '+ linkTypeArray[1];

    return result;

}}}
