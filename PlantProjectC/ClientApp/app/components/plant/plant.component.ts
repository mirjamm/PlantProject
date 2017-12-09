import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../shared/app.models';


@Component({
    selector: 'plant',
    templateUrl: './plant.component.html'
})
export class PlantComponent {
    constructor(private plantService: PlantService) {
        this.getPlants();
    }
    public plants: Plant[];

    public getPlants() {
        this.plantService.getPlants().subscribe(result => {
            this.plants = result.json() as Plant[];
        });
    }
    
   
    //constructor(http: Http) {
    //    http.get( 'api/Plant/GetPlants').subscribe(result => {
    //        console.log(result);
    //        this.plants = result.json() as Plant[];
    //    }, error => console.error(error));
    //}
}
