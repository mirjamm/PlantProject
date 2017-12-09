import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { PlantComponent } from './components/plant/plant.component';
import { PlantService } from './services/plant.service';
import { NewplantComponent } from './components/newplant/newplant.component';
//import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        PlantComponent,
        HomeComponent,
        NewplantComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'plants', component: PlantComponent },
            { path: 'newplant', component: NewplantComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [PlantService],
    //entryComponents: [DialogComponent]
})
export class AppModuleShared {
}
