import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-all-employee-content',
  templateUrl: './get-all-employee-content.component.html',
  styleUrls: ['./get-all-employee-content.component.css'],
})
export class GetAllEmployeeContentComponent implements OnInit {
  employees: any[] = [];
  // searchResult: any[] = [];
  searchFirstName: string = '';
  searchLastName: string = '';
  searchNickName: string = '';

  currentPage: number = 1;
  rows: number = 6;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    const url = this.employeeService.url;
    const headers = this.employeeService.getHeader();

    axios
      .get(url, { headers })
      .then((response) => {
        const filteredEmployees = response.data.result.filter(
          (employee: any) => {
            return employee.statusID === 1;
          }
        );
        this.employees = filteredEmployees;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchEmployees() {
    const params: any = {};

    if (this.searchFirstName || this.searchLastName || this.searchNickName) {
      if (this.searchFirstName) {
        params.firstName = this.searchFirstName;
      }

      if (this.searchLastName) {
        params.lastName = this.searchLastName;
      }

      if (this.searchNickName) {
        params.nickName = this.searchNickName;
      }

      const url = this.employeeService.url;
      const headers = this.employeeService.getHeader();

      axios
        .get(url, { params, headers })
        .then((response) => {
          const filteredEmployees = response.data.result.filter(
            (employee: any) => {
              return employee.statusID === 1;
            }
          );
          this.employees = filteredEmployees;
          console.log(this.employees);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  clickToModify(index: number) {
    const employee = this.employees[(this.currentPage - 1) * this.rows + index];
    const empID = employee.empID;
    this.router.navigate([`/employee/${empID}/info`]);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
  }
}
