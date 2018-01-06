import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../shared/app.models';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'plant',
    templateUrl: './plant.component.html'
})
export class PlantComponent implements OnInit {
    plants: Plant[];
    searchedName: string;

    constructor(private plantService: PlantService) {
    }

    public ngOnInit() {
        this.getPlants();
    }

    public getPlants() {
        this.plantService.getPlants("").subscribe(res => { this.plants = res }, error => { console.log(error) });
    }

    public deletePlant(id: number) {
        alert("Are you sure you want to delete this plant?");
        this.plantService.deletePlant(id).subscribe(res => {
            this.getPlants();
        }, error => console.log(error.message));
    }

    public search() {
        this.plantService.getPlants(this.searchedName).subscribe(res => { this.plants = res }, error => { console.log(error) });
    }

    public clear() {
        this.searchedName = "";
        this.plantService.getPlants("").subscribe(res => { this.plants = res }, error => { console.log(error) });
    }
}
