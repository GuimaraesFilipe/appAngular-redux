import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../Shared/post.model';
import { PostService } from '../Shared/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-httprequests',
  templateUrl: './httprequests.component.html',
  styleUrls: ['./httprequests.component.css']
})
export class HTTPrequestsComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;
  private errorsubscription: Subscription;
  constructor(private http: HttpClient, private postservice: PostService) {}

  ngOnInit() {
    this.errorsubscription=this.postservice.error.subscribe(errorMessage => {
      this.error = errorMessage
    })
    this.postservice.fetchPost().subscribe(dataFetched => {
      this.loadedPosts = dataFetched;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      alert('The following error occured ' + error.statusText)
      this.error=error.message
    });
  }


  onCreatePost(postData:Post) {
    // Send Http request
    this.postservice.createAndStorePost(postData.title,postData.content);
    this.errorsubscription=this.postservice.error.subscribe(errorMessage => {
      this.error = errorMessage
    })
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postservice.fetchPost().subscribe(dataFetched => {
      this.loadedPosts = dataFetched;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      alert('The following error occured' + error.message)
      this.error=error.message
    });

  }

  onClearPosts() {
    // Send Http request
    this.postservice.deletePost().subscribe(dataFetched => {
      this.loadedPosts = []
      this.isFetching = false;
    });
  }
  onHandlerror() {
    this.error = null;
    this.errorsubscription.unsubscribe();
  }
  ngOnDestroy(): void {
    this.errorsubscription.unsubscribe();
  }

}
