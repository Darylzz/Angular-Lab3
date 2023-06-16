import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GetAllEmployeeContentComponent } from './get-all-employee-content/get-all-employee-content.component';

@Component({
  selector: 'app-get-all-employee',
  templateUrl: './get-all-employee.component.html',
  styleUrls: ['./get-all-employee.component.css'],
})
export class GetAllEmployeeComponent implements AfterViewInit {
  @ViewChild(GetAllEmployeeContentComponent)
  getAllEmployeeContent!: GetAllEmployeeContentComponent;
  searchFirstName: string = '';
  searchLastName: string = '';
  searchNickName: string = '';
  row: number = 6;
  totalRecord: any[] = [];

  searchEmployees() {
    this.getAllEmployeeContent.searchFirstName = this.searchFirstName;
    this.getAllEmployeeContent.searchLastName = this.searchLastName;
    this.getAllEmployeeContent.searchNickName = this.searchNickName;
    this.getAllEmployeeContent.searchEmployees();
  }

  clearSearch() {
    this.searchFirstName = '';
    this.searchLastName = '';
    this.searchNickName = '';
    this.getAllEmployeeContent.loadEmployee();
  }

  ngAfterViewInit() {
    this.searchFirstName = this.getAllEmployeeContent.searchFirstName;
    this.searchLastName = this.getAllEmployeeContent.searchLastName;
    this.searchNickName = this.getAllEmployeeContent.searchNickName;
    this.totalRecord = this.getAllEmployeeContent.employees;
  }
}
