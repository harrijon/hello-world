import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value)
      return null;

    value = value.toLowerCase();

    let words = value.split(' ');
    console.log("value:" + value);
    let retVal = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);

    for(let w = 1; w < words.length; w++) {

      console.log("words[w]:" + words[w] + ":");

      if (words[w] == "of"
        || words[w] == "the") {
          retVal += ' ' + words[w];
        }
        else {
          retVal += ' ' + words[w].substr(0, 1).toUpperCase() + words[w].substr(1);
        }
    }
    return retVal;
  }

}
