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

    constructor(private plantService: PlantService) {
    }

    public ngOnInit() {
        this.getPlants();
    }

    public getPlants() {
        this.plantService.getPlants().subscribe(res => { this.plants = res }, error => { console.log(error) });
    }

    public deletePlant(id: number) {
        this.plantService.deletePlant(id).subscribe(res => {
            this.getPlants();;
        }, error => console.log(error.message));
    }
}
