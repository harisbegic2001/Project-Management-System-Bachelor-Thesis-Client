import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = 'https://localhost:44361/api/';

private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }


  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'users/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      }) 
    )
  }

  getTokenForHttpHeader()
  {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }
    const user: User = JSON.parse(userString);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token })
    };

    return httpOptions
  }

  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }


}
