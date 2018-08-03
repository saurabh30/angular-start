import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES} from './mock-employees'
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employeesUrl = 'api/employees';


  constructor(private http: HttpClient,
    private messageService: MessageService) { }



  getEmployees() : Observable<Employee[]>{
    this.messageService.add('EmployeeService: fetched employees')
    return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      tap(employees => this.log('fetched heroes')),
      catchError(this.handleError('getEmployees', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


/** PUT: update the hero on the server */
updateEmployee (employee: Employee): Observable<any> {
  return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${employee.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}


  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }
/** DELETE: delete the hero from the server */
deleteEmployee (employee: Employee | number): Observable<Employee> {
  const id = typeof employee === 'number' ? employee : employee.id;
  const url = `${this.employeesUrl}/${id}`;

  return this.http.delete<Employee>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted employee id=${id}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}

  /** POST: add a new hero to the server */
addEmployee (employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
    tap((employee: Employee) => this.log(`added employee w/ id=${employee.id}`)),
    catchError(this.handleError<Employee>('addEmployee'))
  );
}
private log(message: string) {
  this.messageService.add(`EmployeeService: ${message}`);
}
}