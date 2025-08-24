import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from '../Interface/jwt-token';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

   private url:string = "http://localhost:9191/user"

  login(user:User):Observable<JwtToken>{
    console.log('in the user service')
    return this.http.post<JwtToken>(`${this.url}/login`, user)
  }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }
  
}