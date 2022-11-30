import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirectiveDirective } from "../directives/dropdown-directive/dropdown-directive.directive";
import { AlertComponent } from "./alert/alert.component";
import { loadingSpinnerComponent } from "./loading-spinner/loadingSpinner.component";
import { placeHolder } from "./placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        loadingSpinnerComponent,
        placeHolder,
        DropdownDirectiveDirective
    ],
        imports: [
            CommonModule
    ],
    exports: [
        AlertComponent,
        loadingSpinnerComponent,
        placeHolder,
        DropdownDirectiveDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ]

})
export class sharedModule{ }