import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getMessages(idRoom: string): Observable<any> {
    return this.http.get(`http://localhost:3000/messages/${idRoom}`);
  }
}
