import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentObservableComponent } from "./student-observable/student-observable.component";
import { StudentService } from "./student.service";
import { TestHistoryListComponent } from "./test-history-list/test-history-list.component";

@NgModule({
    declarations: [StudentListComponent, StudentDetailsComponent, TestHistoryListComponent, StudentObservableComponent],
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    providers: [StudentService],
    exports: [StudentListComponent, TestHistoryListComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class studentsModules{

}