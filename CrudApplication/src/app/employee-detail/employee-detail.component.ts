import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {

  @Input() employee: Employee;
  
  save(): void {
    this.employeeService.updateHero(this.employee)
      .subscribe(() => this.goBack());
  }
  constructor(
    private employeeService : EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ){}
  
  ngOnInit(): void {
    this.getEmployee();
  }

  goBack(): void {
    this.location.back();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

}
