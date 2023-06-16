import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { EmployeeService } from 'src/app/employee/employee.service';

@Component({
  selector: 'app-modify-employee-form',
  templateUrl: './modify-employee-form.component.html',
  styleUrls: ['./modify-employee-form.component.css'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class ModifyEmployeeFormComponent implements OnInit {
  empID!: string;
  firstNameTH!: string;
  lastNameTH!: string;
  firstNameEN!: string;
  lastNameEN!: string;
  nickName!: string;
  departmentID!: number;
  positionID!: number;
  email!: string;
  birthDate!: Date;
  startDate!: Date;
  telephone!: number;
  profilePath!: string;

  department: SelectItem[];
  position: SelectItem[];

  isModified: boolean = false;
  isModifyField: boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private params: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.department = [
      { label: 'GM', value: 1 },
      { label: 'HR', value: 2 },
      { label: 'WMD', value: 3 },
      { label: 'DMD', value: 4 },
    ];
    this.position = [
      { label: 'General Manager', value: 1 },
      { label: 'Human Resource Manager', value: 2 },
      { label: 'Human Resources Officer', value: 3 },
      { label: 'Application Section Manager', value: 4 },
      { label: 'System Analyst', value: 5 },
      { label: 'Application Architect', value: 6 },
      { label: 'Programmer Analyst', value: 7 },
      { label: 'Business Analyst', value: 8 },
      { label: 'Web Mapping Manager', value: 9 },
      { label: 'Desktop Mapping Manager', value: 10 },
      { label: 'Programmer', value: 11 },
      { label: 'Tester', value: 12 },
    ];
    // console.log(this.location.path());
  }

  isPathModify() {
    if (this.location.path().endsWith('add')) {
      return (this.isModified = false);
    } else {
      return (this.isModified = true);
    }
  }

  ngOnInit() {
    this.isPathModify();
    this.isLoadEmployeeData();
  }

  isLoadEmployeeData() {
    if (this.isModified) {
      const empID = this.params.snapshot.paramMap.get('id');
      const url = `${this.employeeService.url}/${empID}/info`;
      const headers = this.employeeService.getHeader();

      axios.get(url, { headers }).then((response) => {
        const employeeData = response.data.result;

        this.firstNameTH = employeeData.firstNameTH;
        this.lastNameTH = employeeData.lastNameTH;
        this.firstNameEN = employeeData.firstNameEN;
        this.lastNameEN = employeeData.lastNameEN;
        this.nickName = employeeData.nickName;
        this.departmentID = employeeData.departmentID;
        this.positionID = employeeData.positionID;
        this.empID = employeeData.empID;
        this.email = employeeData.email;
        this.birthDate = new Date(employeeData.birthDate);
        this.startDate = new Date(employeeData.startDate);
      });
    }
  }

  clickBack() {
    this.router.navigate(['/employee']);
  }

  onFieldChange() {
    if (
      this.birthDate !== undefined &&
      this.startDate !== undefined &&
      this.positionID !== undefined &&
      this.departmentID !== undefined &&
      this.firstNameTH &&
      this.lastNameTH &&
      this.firstNameEN &&
      this.lastNameEN &&
      this.nickName &&
      this.empID &&
      this.email
    ) {
      this.isModifyField = true;
    } else {
      this.isModifyField = false;
    }
  }

  onModifyEmployee() {
    if (!this.isModifyField) {
      this.toastr.error('Please change anything in field or click back');
      return;
    }

    if (
      !this.firstNameTH ||
      !this.lastNameTH ||
      !this.firstNameEN ||
      !this.lastNameEN ||
      !this.nickName ||
      !this.empID ||
      !this.departmentID ||
      !this.positionID ||
      !this.email ||
      !this.startDate ||
      !this.birthDate
    ) {
      this.toastr.error('Please fill in any field');
      return;
    }

    const empID = this.params.snapshot.paramMap.get('id');
    const url = `${this.employeeService.url}/${empID}`;
    const headers = this.employeeService.getHeader();
    const employeeData = {
      firstNameTH: this.firstNameTH,
      lastNameTH: this.lastNameTH,
      firstNameEN: this.firstNameEN,
      lastNameEN: this.lastNameEN,
      nickName: this.nickName,
      empID: this.empID,
      departmentID: this.departmentID,
      positionID: this.positionID,
      email: this.email,
      birthDate: this.birthDate,
      startDate: this.startDate,
    };

    const confirmed = confirm(`ต้องการแก้ไขพนักงาน ID: ${empID} ใช่หรือไม่?`);
    if (confirmed) {
      axios
        .put(url, employeeData, { headers })
        .then((response) => {
          console.log(response);
          this.toastr.success(`Success update ID: ${empID}`);
          this.router.navigate(['/employee']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  clickToDelete() {
    const empID = this.params.snapshot.paramMap.get('id');
    const url = `${this.employeeService.url}/${empID}`;
    const headers = this.employeeService.getHeader();

    const confirmed = confirm(`ต้องการลบพนักงาน ID: ${empID} ใช่หรือไม่?`);
    if (confirmed) {
      axios
        .delete(url, { headers })
        .then((response) => {
          console.log(response.data);
          this.toastr.success(`ลบพนักงาน ID: ${empID} เรียบร้อยแล้ว`);
          this.router.navigate(['/employee']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onSubmitForm() {
    if (
      this.firstNameTH &&
      this.lastNameTH &&
      this.firstNameEN &&
      this.lastNameEN &&
      this.nickName &&
      this.empID &&
      this.departmentID &&
      this.positionID &&
      this.email &&
      this.birthDate &&
      this.startDate &&
      this.telephone &&
      this.profilePath
    ) {
      const url = this.employeeService.url;

      const headers = this.employeeService.getHeader();

      const employeeData = {
        firstNameTH: this.firstNameTH,
        lastNameTH: this.lastNameTH,
        firstNameEN: this.firstNameEN,
        lastNameEN: this.lastNameEN,
        nickName: this.nickName,
        empID: this.empID,
        departmentID: this.departmentID,
        positionID: this.positionID,
        email: this.email,
        birthDate: this.birthDate,
        startDate: this.startDate,
        telephone: this.telephone,
        profilePath: this.profilePath,
      };

      const confirmed = confirm(
        `ต้องการเพิ่มข้อมูลพนักงาน ID: ${employeeData.empID} ใช่หรือไม่?`
      );
      if (confirmed) {
        axios
          .post(url, employeeData, { headers })
          .then((response) => {
            console.log(response);
            this.toastr.success(
              `Add employee ID: ${employeeData.empID} success`
            );
          })
          .catch((error) => {
            console.log(error);
            this.toastr.error(error.detail);
          });
        this.router.navigate(['/employee']);
      }
    } else {
      this.toastr.error('Please complete the infomation');
    }
  }
}
