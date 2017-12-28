import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Family } from '../../shared/app.models';

//import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'family',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.css']

})
export class FamilyComponent implements OnInit {
    families: Family[];
    name: string;
    id: number;
    isErrorMessage: boolean;
    errorMessage: string;
    successMessage: string;
    isSuccessMessage: boolean;

    constructor(private plantService: PlantService) {
    }

    public ngOnInit() {
        this.getFamilies();
    }

    public getFamilies() {
        this.plantService.getFamilies().subscribe(res => { this.families = res }, error => { console.log(error) });
    }

    public add() {
        this.isErrorMessage = false;
        this.plantService.addFamily({
            name: this.name
        }).subscribe(res => {
            if (res.isError) {
                this.isErrorMessage = true;
                this.errorMessage = res.errorMessage;
                setTimeout(() => {
                    this.isErrorMessage = false;
                }, 1500)
            } else {
                this.isSuccessMessage = true;
                this.successMessage = "Successfully saved changes.";
                this.getFamilies();
                this.name = '';
                setTimeout(() => {
                    this.isSuccessMessage = false;
                }, 1500)
            }
        }, error => {
            this.errorMessage = error.message;
            console.log("er " + error.message)
        });
    }

    public delete(id: number) {
        alert("Are you sure you want to delete this family?");
        this.plantService.deleteFamily(id).subscribe(res => {
            this.getFamilies();
        }, error => console.log(error.message));
    }
}
