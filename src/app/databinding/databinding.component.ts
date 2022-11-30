import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-databinding',
  templateUrl: './databinding.component.html',
  styleUrls: ['./databinding.component.css']
})

export class DatabindingComponent {

  constructor(private route: ActivatedRoute, private router: Router){}
  serverElements = [{ type: 'server', name: 'server', content: 'content here!' }];
  showAsses = false;
 

  onServerAdded(serverData:{serverName:string, serveContent:string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serveContent
    });
    console.log(serverData.serveContent);
    console.log(this.serverElements);
  }

  onBlueprintAdded(BluePrintData: {serverName:string, serveContent:string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: BluePrintData.serverName,
      content: BluePrintData.serveContent
    });
  }
  
  assessment() {

    if (this.showAsses === false) {
      this.router.navigate(['dataBindingAss'], { relativeTo: this.route});
      this.showAsses=!this.showAsses
    }
    else {
      this.router.navigate(['./'], { relativeTo: this.route });
      this.showAsses=!this.showAsses
    }

    
    
  }


}
