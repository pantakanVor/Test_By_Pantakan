import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthenticationService } from 'src/Services/authentication.service';
import { User } from 'src/Model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent    implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    User: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        
    }
    
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['admin', Validators.required],
            password: ['1234', Validators.required]
        });
      
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    Login() {
        debugger;
        this.submitted = true;

        
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

       this.authenticationService.login(this.f.username.value, this.f.password.value) ;
        
    }
}