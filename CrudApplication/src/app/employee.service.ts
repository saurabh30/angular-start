import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  private employeesUrl = 'api/employeeDetails';

  getHeroes (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
  }
}
