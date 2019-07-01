import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { Activite } from '../_models/activite';

import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
 })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

  patientsNotValided: User[] = [];
  patientsValided: User[] = [];
  medecins: User[] = [];
  activites: Activite[] = [];





    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user[0];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
        this.loadAllPatientsMedecin();
        this.loadAllPatientsUnvalide();
        this.loadAllPatientsValide();
        this.loadAllactivite();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();        
    }

    deleteUser(id: number) {
        //this.userService.delete(id).pipe(first()).subscribe(() => {
          //  this.loadAllUsers()
        //});
    }

    private loadAllPatientsUnvalide(){
        this.userService.getAllPatientUnvalided().pipe(first()).subscribe(users => {
            this.patientsNotValided= users;
            console.log(this.patientsNotValided);
        });
    }
     private loadAllPatientsValide(){
        this.userService.getAllPatientValided().pipe(first()).subscribe(users => {
            this.patientsValided= users;
        });
    }
    private loadAllPatientsMedecin(){
        this.userService.getAllMedecins().pipe(first()).subscribe(users => {
            this.medecins=users;
        });
    }
    private loadAllactivite(){
        this.userService.getAllPAactivite(this.currentUser.id).pipe(first()).subscribe(users => {
            this.activites=users;
            console.log(this.activites);
        });
    }


}