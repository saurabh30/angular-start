import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private heroesUrl = 'api/employees';  // URL to web api
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.heroesUrl)
  }

  constructor(
    private http: HttpClient){} 
  }
