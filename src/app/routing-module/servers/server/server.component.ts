import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router, RouterLinkActive } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  urlId: number=0;
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];
        }
      );
    // this.urlId = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(this.urlId)!;
    // this.route.params.subscribe(
    //   (params: Params) =>
    //   {
    //     this.server = this.serversService.getServer(+params['id'])!;
    //     }
    // )
    console.log(this.urlId)
   
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo:this.route, queryParamsHandling:'preserve'});
    
  }

}
