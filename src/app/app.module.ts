import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastrModule } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { GetAllEmployeeComponent } from './employee/get-all-employee/get-all-employee.component';
import { ModifyEmployeeComponent } from './employee/get-all-employee/modify-employee/modify-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddEmployeeFormComponent } from './employee/add-employee/add-employee-form/add-employee-form.component';
import { GetAllEmployeeContentComponent } from './employee/get-all-employee/get-all-employee-content/get-all-employee-content.component';
import { EmployeeService } from './employee/employee.service';
import { ModifyEmployeeFormComponent } from './employee/get-all-employee/modify-employee/modify-employee-form/modify-employee-form.component';

const appRoute = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/:id/info', component: ModifyEmployeeComponent },
  { path: 'employee/add', component: ModifyEmployeeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    GetAllEmployeeComponent,
    ModifyEmployeeComponent,
    AddEmployeeComponent,
    AddEmployeeFormComponent,
    GetAllEmployeeContentComponent,
    ModifyEmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    CommonModule,
    CalendarModule,
    HttpClientModule,
    PaginatorModule,
    RouterModule.forRoot(appRoute),
    ToastrModule.forRoot(),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
