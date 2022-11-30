import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError,tap } from "rxjs/operators";
export class LoggingInteceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('outgoing request')
        console.log('Logging Interceptor ', req.url);
        console.log( req.headers);
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log(event.body)
            }
        }));
        
    }

}