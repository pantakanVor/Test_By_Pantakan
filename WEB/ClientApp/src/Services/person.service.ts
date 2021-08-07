import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Subject, of, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/Model/user';
import { Person } from 'src/Model/Person';




@Injectable({ providedIn: 'root' })

export class PersonService implements OnInit {
    public currentUserSubject: BehaviorSubject<User>;
    PersonList = new Subject<any>();
    constructor(private http: HttpClient, private Authen: AuthenticationService,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }
    user: any;
    ngOnInit() {

    }

    getPerson() {
        this.user = this.currentUserSubject.value;
        var header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.user.Token}`)
        }

        return this.http.get<Person[]>(`${environment.production}/person`, header);


    }

    savePerson(person) {
        this.user = this.currentUserSubject.value;
        var header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.user.Token}`)
        }
        return this.http.post<any>(`${environment.production}/person`, person, header);

    }
    EditPerson(person) {
        this.user = this.currentUserSubject.value;
        var header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.user.Token}`)
        }
        return this.http.put<any>(`${environment.production}/person`, person, header);

    }
    DeletePerson(id) {
        this.user = this.currentUserSubject.value;
        var header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.user.Token}`)
        }
        return this.http.delete(`${environment.production}/person/` + id, header);

    }

}

