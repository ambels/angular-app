import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri: string = 'https://random-data-api.com/api/coffee/random_coffee?size=50';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<object> {
    return this.http.get(this.uri);
  }
}
