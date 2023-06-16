import { Component, OnInit } from '@angular/core';
import { ModifyEmployeeFormComponent } from './modify-employee-form/modify-employee-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.css'],
})
export class ModifyEmployeeComponent implements OnInit {
  private modifyFormComponent!: ModifyEmployeeFormComponent;

  isModified: boolean = true;

  constructor(private location: Location) {}

  ngOnInit() {
    this.isPathModify();
  }

  isPathModify() {
    if (this.location.path().endsWith('add')) {
      return (this.isModified = false);
    } else {
      return (this.isModified = true);
    }
  }
}
