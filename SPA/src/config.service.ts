import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //API's URL
  mdrUrl: string = 'http://localhost:4000/';
  mduUrl: string = 'http://localhost:5095/';
  planUrl: string = 'http://localhost:5000/';
}
