import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError,tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })


export class PostService{

    error = new Subject<string>();
    
    constructor(private http: HttpClient) { }
    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title,content: content};
        this.http
        .post<{[key:string]:Post}>(
          'https://front-end-angular-88e1c-default-rtdb.firebaseio.com/posts.json',
          postData,
            {
              observe:'response'
          }
        )
        .subscribe(responseData => {
          console.log(responseData);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPost() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty'); // Changes the way the content is returned so it is more readable
        searchParams = searchParams.append('custom', 'key');
        return this.http.get<{ [key: string]: Post }>('https://front-end-angular-88e1c-default-rtdb.firebaseio.com/posts.json', {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            params: searchParams,
            responseType:'json'
        }).
        pipe(map(responseData=> {
        const postArray:Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray
        }),
        catchError(errorRes => {
         //send to analytics server 
            return throwError(errorRes);
            
     }))
        
    }

    deletePost() {
        return this.http.delete('https://front-end-angular-88e1c-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType:'text'
            }).pipe(tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Sent) {
                    // console.log(event.type)
                }
                if (event.type === HttpEventType.Response) {
                    console.log(event.body)
                }
            }));
    }
}