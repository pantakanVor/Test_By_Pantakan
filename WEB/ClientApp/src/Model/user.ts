import { observable, Subject, of, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

export class User {
    constructor(){
   
    }
    Id: string;  
    Username: string;
    Password: string;
    Firstname: string;
    Lastname: string;
    Token: string;
}
