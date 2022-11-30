import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterhighlight]'
})
export class BetterhighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string ;


  constructor(private elementRef:ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'green');
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    this.backgroundColor = this.defaultColor;
  }
}
