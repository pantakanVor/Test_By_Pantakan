import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Subject, of, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router';
import { User } from 'src/Model/user';
 


@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {
    public currentUserSubject: BehaviorSubject<User>;


    user = new User();

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }
    ngOnInit() {
    
    }

    public getStatus(): Observable<any> {
        return this.currentUserSubject.asObservable();
    }
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    setUserLoginStatus(user){
        this.user.Id = user.id;
        this.user.Token = user.jwtToken;
        this.user.Firstname = user.firstName;
        this.user.Lastname = user.lastName;
        this.user.Username = user.userName;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.currentUserSubject.next(this.user);
        this.router.navigate(['/Person']);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.production}/users/authenticate`, { username, password }).toPromise()
            .then(
                user => {
                    this.setUserLoginStatus(user);
                    return this.user;
                },
                error => {
                    console.log("Error", error);
                    return this.user;
                }
            );
    }

    

    
   
}

