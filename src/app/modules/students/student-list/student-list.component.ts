import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[] =[];
  selectedStudent: Student;
  isNewStudent: boolean = false;

  @Output()
  public onShowStudent: EventEmitter<Student> = new EventEmitter();

  constructor(private _studentsService: StudentService, private _router: Router) {
  }

  ngOnInit(): void {
    this._studentsService.students.subscribe(data=>{
      if(data)
      this.students = data;
    });
    this.students.forEach(element => element.average = this._studentsService.getAverage(element));
  }

  showDetails(studentToShow: Student) {
    this.isNewStudent = false;
    this.selectedStudent = studentToShow;
    this.onShowStudent.emit(this.selectedStudent);
    this._router.navigate(["/student-details", studentToShow.idStudent]);
    //console.log("selectedStudent", this.selectedStudent);
  }

  deleteStudent(student: Student) {
    this._studentsService.deleteStudent(student.idStudent).subscribe(data => {
      if (data) {
        alert("delete succeed");
        let indexToDelete = this.students.indexOf(student);
        this.students.splice(indexToDelete, 1);
      }
      else {
        alert("delete failed");
      }  
    }, err => alert(err.message));
  }

  showNewStudentDetails() {
    this.selectedStudent = new Student(0, "");
    this.isNewStudent = true;
    this.selectedStudent.active = true;
    this._router.navigate(["/student-details"]);
  }

  ShowStudentsByActive(active: boolean) {
    this._studentsService.getStudentsByActive(active).subscribe(data => {
      this.students = data;
    }, err => alert(err.message))
  }

  saveStudentToList(studentToSave: Student) {
    if (this.students.find(x => x.idStudent == studentToSave.idStudent)) {
      let studentToUpdate = this.students.filter(x => x.idStudent == studentToSave.idStudent)[0]
      console.log("studentToSave: " + JSON.stringify(studentToSave) + " studentToUpdate: " + JSON.stringify(studentToUpdate))
      this._studentsService.updateStudent({ id: studentToUpdate.idStudent, student: studentToSave }).subscribe(data => {
        if (data) {
          alert("The changes saved successfully");
        }
        else
          alert("saved failed");
      }, err => alert(err.message)
      );
      let index = this.students.indexOf(studentToUpdate);
      this.students[index] = studentToSave;
    }
    else {
      this._studentsService.addStudent(studentToSave).subscribe(data => {
        if (data) {
          alert("The student saved successfully " + studentToSave.firstName)
        }
        else
          alert("savad failed")
      }, err => alert(err.message)
      );
      this.students.push(studentToSave);
    }
    this.selectedStudent = null;
  }

}
