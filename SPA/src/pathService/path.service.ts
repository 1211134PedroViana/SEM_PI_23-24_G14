import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class PathService {

  constructor(private http: HttpClient) { }

  async computePath(elementOrig: string, elementDest: string): Promise<any> {
    let url = `http://localhost:5000/findCaminho?origem=${elementOrig}&destino=${elementDest}`;

    try {
      const response: AxiosResponse = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }    
  }

}