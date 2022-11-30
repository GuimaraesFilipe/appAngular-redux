import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponenteDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit , CanComponenteDeactivate{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const urlId = +this.route.snapshot.params['id'];
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(urlId)!;
    this.route.params.subscribe(
      (params: Params) =>
      {
        this.server = this.serversService.getServer(+params['id'])!;
        }
    )
    this.route.queryParams.subscribe(
      (Qparams: Params) =>
      {
        this.allowEdit = Qparams['allowEdit'] === '1' ? true : false;
        console.log('allow edit',this.allowEdit)
        }
    )
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

   
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route })
    
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (!this.allowEdit) {
    return true;
  }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changeSaved) {
      
      return confirm('Do you want to discard the changes?');
  
    }
    else{
      return true;
      }
  } 

}
