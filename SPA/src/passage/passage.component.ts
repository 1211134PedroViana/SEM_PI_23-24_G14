import { Component } from '@angular/core';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css']
})

export class PassageComponent {
  titleText = 'Passages Management';
  createButtonText = 'Create Passage';
  updateButtonText = 'Update Passage';
  listButtonText = 'List Passages';
  createRoute = '/campus/passage/create';
  updateRoute = '/campus/passage/update';
  listRoute = '/campus/passage/list';
}
