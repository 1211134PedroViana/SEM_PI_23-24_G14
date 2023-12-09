import { Component } from '@angular/core';

@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css']
})

export class PassageComponent {
  
  titleText = 'Passages Management';
  feature1ButtonText = 'Create Passage';
  feature2ButtonText = 'Update Passage';
  feature3ButtonText = 'List Passages';
  feature1Route = '/campus/passage/create';
  feature2Route = '/campus/passage/update';
  feature3Route = '/campus/passage/list';

}
