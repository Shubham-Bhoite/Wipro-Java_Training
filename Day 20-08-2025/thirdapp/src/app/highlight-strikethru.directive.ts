// EX-04

import { Directive , ElementRef} from '@angular/core';

@Directive({
  selector: '[appHighlightStrikethru]'
})
export class HighlightStrikethruDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.color = 'yellow';       
    this.elementRef.nativeElement.style.textDecoration = 'line-through'; 
  }
}
