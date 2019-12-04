import { Directive, ElementRef, HostListener, Input  } from '@angular/core';


@Directive({
  selector: '[appAllowOnlyNumber]'
})
export class AllowOnlyNumberDirective {

  constructor(private el:ElementRef) { }
  @Input() appAllowOnlyNumber: boolean;
  @HostListener('input', ['$event']) onInputChange(event){
    console.log(event)
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
