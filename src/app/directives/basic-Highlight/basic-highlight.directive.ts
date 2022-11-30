import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector:'[appbasicHighlight]'
})
export class BasicHighlight implements OnInit{
    constructor(private elementRef: ElementRef) {
        
        
    }
    ngOnInit(): void {
        this.elementRef.nativeElement.style.color = 'red';
        this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    }

}