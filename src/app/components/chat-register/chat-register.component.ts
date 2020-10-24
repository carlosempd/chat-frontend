import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-chat-register',
  templateUrl: './chat-register.component.html',
  styleUrls: ['./chat-register.component.scss']
})
export class ChatRegisterComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(private router: Router,
              private localStorage: LocalStorageService)
              { }

  ngOnInit(): void {

    this.initForm();

  }

  /**
   * Enter to the chat
   */
  enter() {

    // user entered
    this. user = this.form.value;

    // Set the user to local storage
    this.localStorage.setUser(this.user);

    // redirect to the chat
    this.router.navigate(['chat-inbox']);
  }

  /**
   * Initialize form
   */
  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required)
    });
  }

}
