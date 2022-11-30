import { Component, Input, OnInit,EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output('sc') serverCreated = new EventEmitter<{ serverName: string, serveContent: string }>();
  @Output('bp') blueprintCreated = new EventEmitter<{ serverName: string, serveContent: string }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput : ElementRef;
 



  constructor() { }

  ngOnInit(): void {
  }

  
  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,//using local reference
      serveContent: this.serverContentInput.nativeElement.value//using @viewChild
    })
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverNameInput.value,//using local reference
      serveContent: this.serverContentInput.nativeElement.value//using @viewChild
    })
  }

}
