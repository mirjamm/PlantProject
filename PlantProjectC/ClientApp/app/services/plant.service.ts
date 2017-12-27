import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Plant, Family, Genus, Conservation, ResponseModel } from '../shared/app.models';

const baseUrl = "http://localhost:59421";
@Injectable()
export class PlantService {
    constructor(private http: HttpClient) { }


    public addPlant(plant: Plant) {
        return this.http.post(baseUrl + "/api/Plant", plant);
    }

    public editPlant(plant: Plant) {
        return this.http.put<ResponseModel>(baseUrl + "/api/Plant", plant);
    }

    public getPlants() {
        return this.http.get<Plant[]>(baseUrl + "/api/Plant");
    }

    public getPlant(id: any) {
        return this.http.get<Plant>(baseUrl + "/api/Plant/" + id);
    }

    public deletePlant(id: number) {
        return this.http.delete(baseUrl + "/api/Plant/" + id);
    }

    public getFamilies() {
        return this.http.get<Family[]>(baseUrl + "/api/Family");
    }

    public getGenus() {
        return this.http.get<Genus[]>(baseUrl + "/api/Genus");
    }

    public getConservations() {
        return this.http.get<Conservation[]>(baseUrl + "/api/Conservation");
    }
}