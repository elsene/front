import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Activite } from '../_models/activite';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllPatientUnvalided() {
        return this.http.get<User[]>("https://scholahealth.herukuapp.com/patients/ko");
    }
      getAllPAactivite(idm:number) {
        return this.http.get<Activite[]>("https://scholahealth.herukuapp.com/ActivitePatient/"+idm);
    }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }


    getAllPatientValided() {
        return this.http.get<User[]>("https://scholahealth.herukuapp.com/patients");
    }

     getAllMedecins() {
        return this.http.get<User[]>("https://scholahealth.herukuapp.com/medecins");
    }

    register(user: User) {
        return this.http.post("https://scholahealth.herukuapp.com/patient", user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}