import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(): Observable<Employee[]> {
    return of(EMPLOYEES);
  }

  constructor() { }
}
