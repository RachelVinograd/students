
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_PROFESSIONS, Profession } from '../models/profession.model';
import { Student } from '../models/student.model';
import { Test } from '../models/test.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  public set student(value: Student) {
    this._student = value;
    if (this._student != undefined) {
      this.studentForm = new FormGroup({
        "idStudent": new FormControl(this.student.idStudent, [Validators.minLength(9), Validators.maxLength(9), Validators.required]),
        "firstName": new FormControl(this.student.firstName, Validators.required),
        "lastName": new FormControl(this.student.lastName, Validators.required),
        "address": new FormControl(this.student.address),
        "phone": new FormControl(this.student.phone, Validators.required),
        "active": new FormControl(this.student.active, Validators.required),
        "leavingDate": new FormControl(this.student.leavingDate),
        "tests": new FormControl(this.student.tests),
        "professionId": new FormControl(this.student.professionId),
        "year": new FormControl(this.student.year, Validators.required),
        "email": new FormControl(this.student.email),
        "average": new FormControl(this.student.average)
      })
    }
  }

  public get student(): Student {
    return this._student
  }

  studentForm: FormGroup
  private _student: Student = new Student(0, '');

  @Input() isNewStudent: boolean = false;
  @Output() onSaveStudent: EventEmitter<Student> = new EventEmitter();
  @Output() onChangeModeStudent: EventEmitter<Student> = new EventEmitter();
  studentId: number;
  average: number;
  studentsList: Student[];

  professionsList: Profession[] = APP_PROFESSIONS;

  constructor(private _studentsService: StudentService, private _acr: ActivatedRoute, private _router: Router) {
  }

  ngOnInit(): void {
    this._acr.paramMap.subscribe(paramMap => {
      if (paramMap.has("id"))
        this.studentId = +paramMap.get("id");
    });

    this._studentsService.students.subscribe(data => {
      if (this.studentId) {
        this.student = data.filter(x => x.idStudent == this.studentId)[0];
        this.average = this._studentsService.getAverage(this.student);
        this.studentsList = data;
        console.log("is new student: " + this.isNewStudent);
      }
      else {
        this.isNewStudent = true;
        console.log("is new student: " + this.isNewStudent);
        this.student = new Student(0, '');
      }
    }, err => alert(err.message));
  }

  saveNewStudent() {
    this.student = this.studentForm.value;
    //this.onSaveStudent.emit(this.student);
    this.studentForm.dirty;
    this._studentsService.saveStudentToList(this.student);
    this._router.navigate(["/students-list"]);
  }

  changeModeStudent(isActive) {
    this._student.active = isActive;
    this.onChangeModeStudent.emit(this.student);
  }
}
