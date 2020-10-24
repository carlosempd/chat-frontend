import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any) { }

  setUser(user: User) {
    this.localStorage.setItem('name', user.name);
    this.localStorage.setItem('room', user.room);
  }

  getUser(): User {
    return {
      name: this.localStorage.getItem('name'),
      room: this.localStorage.getItem('room')
    };
  }

  removeUser() {
    this.localStorage.clear();
  }
}
