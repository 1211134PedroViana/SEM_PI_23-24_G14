import { Component } from '@angular/core';
import { FloorService } from 'src/floorService/floor-service';

@Component({
    selector: 'app-update-floor',
    templateUrl: './update-floor.component.html',
    styleUrls: ['./update-floor.component.css']
})

export class UpdateFloorComponent {

    isVisible: boolean = false;

    constructor(private floorService: FloorService) { }

    ngOnInit() {
        this.floorService.getFormVisibility().subscribe((isVisible) => {
            this.isVisible = isVisible;
        });
    }
}