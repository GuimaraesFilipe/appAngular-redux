import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {

  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
    
  }
  @HostListener('document:click',['$event']) toggleOpen( event: Event){
  this.isOpen = this.elementRef.nativeElement.contains(event.target)? !this.isOpen :false;

  }

}
