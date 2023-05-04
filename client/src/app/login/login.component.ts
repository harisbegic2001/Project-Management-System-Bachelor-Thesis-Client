import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loggedIn = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser()
  {
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }

  login()
  {
    this.accountService.login(this.model).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.loggedIn = true;
          window.location.reload()//Za refresh nakon logovanja
        },
        error: (error: any) => console.log(error)
      })
  }

  logout()
  {
    this.accountService.logout();
    this.loggedIn = false;
    window.location.reload()//Za refresh nakon logovanja
  }


}
