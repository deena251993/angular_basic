import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {
  transform(items: any[], sectionText:string,yearText:string,classText:string) {
  // transform(value: unknown, ...args: unknown[]): unknown {

    if (items && items.length){
      return items.filter(item =>{
          if (sectionText && item.stdSection.toLowerCase().indexOf(sectionText.toLowerCase()) === -1){
              return false;
          }
          if (yearText && item.stdYear.toLowerCase().indexOf(yearText.toLowerCase()) === -1){
              return false;
          }
          if (classText && item.stdClass.toLowerCase().indexOf(classText.toLowerCase()) === -1){
              return false;
          }
          return true;
     })
  }
  else{
      return items;
  }
  }

}
