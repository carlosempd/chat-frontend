import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../model/message.model';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class MessageResolver implements Resolve<Message[]> {
    constructor(private apiService: ApiService,
                private localStorage: LocalStorageService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> | Promise<Message[]> | Message[] {
        const idRoom: string = this.localStorage.getIdRoom();
        
        return this.apiService.getMessages(idRoom).
            pipe(
                map((messagesResponse) => {
                    if (messagesResponse.ok) {
                        return messagesResponse.messages;
                        
                    }
                })
        )
        
    }
}