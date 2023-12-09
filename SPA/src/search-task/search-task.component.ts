import { Component } from '@angular/core';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent {

  titleText = 'Search Tasks';
  feature1ButtonText = 'Search By Status';
  feature2ButtonText = 'Search By Type';
  feature3ButtonText = 'Search By User';
  feature1Route = '/task/searchTask/byStatus';
  feature2Route = '/task/searchTask/byType';
  feature3Route = '/task/searchTask/byUser';
}
