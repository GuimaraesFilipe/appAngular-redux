import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[app-placeHolder]'
})

export class placeHolder{
    constructor(public viewContainerRef: ViewContainerRef) {
        
    }

}