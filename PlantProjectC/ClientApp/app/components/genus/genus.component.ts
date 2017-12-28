import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Genus } from '../../shared/app.models';

@Component({
    selector: 'genus',
    templateUrl: './genus.component.html',
    styleUrls: ['./genus.component.css']

})
export class GenusComponent implements OnInit {
    genuses: Genus[];
    name: string;
    id: number;
    isErrorMessage: boolean;
    errorMessage: string;
    successMessage: string;
    isSuccessMessage: boolean;

    constructor(private plantService: PlantService) {
    }

    public ngOnInit() {
        this.getGenuses();
    }

    public getGenuses() {
        this.plantService.getGenus().subscribe(res => { this.genuses = res }, error => { console.log(error) });
    }

    public add() {
        this.isErrorMessage = false;
        this.plantService.addGenus({
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
                this.getGenuses();
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
        alert("Are you sure you want to delete this genus?");
        this.plantService.deleteGenus(id).subscribe(res => {
            this.getGenuses();
        }, error => console.log(error.message));
    }
}
