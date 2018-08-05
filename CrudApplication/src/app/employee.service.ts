import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from './employee';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private heroesUrl = 'api/employees';  // URL to web api
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** POST: add a new hero to the server */
  addHero(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.heroesUrl, employee, httpOptions).pipe(
      //tap((employee: Employee) => ${employee.id})),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Employee>('deleteHero'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Employee> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getHero id=${id}`))
    );
  }


  constructor(
    private http: HttpClient) { }
}
