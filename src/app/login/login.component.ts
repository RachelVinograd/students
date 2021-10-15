import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthGuardService) { }

  ngOnInit(): void {
  }

  userLogin(){
    this._auth.authenticated = true;
    alert("you connected successfully ");
  }
}
