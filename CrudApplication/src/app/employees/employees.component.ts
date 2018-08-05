import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees : Employee[] ;
  selectedEmployee: Employee;
  
  onSelect(employee: Employee): void {
  this.selectedEmployee = employee;
}
  constructor(private employeeService: EmployeeService) { }
  getEmployees(): void {
    this.employeeService.getEmployees()
        .subscribe(employees => this.employees = employees);
  }
  ngOnInit() {
    this.getEmployees();
  }

}
