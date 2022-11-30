import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-data-binding',
  templateUrl: './assessment-data-binding.component.html',
  styleUrls: ['./assessment-data-binding.component.css']
})
export class AssessmentDataBindingComponent implements OnInit {
  evenNumbers: number[]=[];
  oddNumbers: number[] = [];
  allNumbers: number[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onGameStarted(firedNumber: number) {
    
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber)
    }
    else {
      this.oddNumbers.push(firedNumber)
    }
    console.log(this.oddNumbers)

    this.allNumbers.push(firedNumber);
  }



}
