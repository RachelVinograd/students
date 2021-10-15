import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'student-observable',
  templateUrl: './student-observable.component.html',
  styleUrls: ['./student-observable.component.scss']
})
export class StudentObservableComponent implements OnInit {

  @Input()
  students: Student[];
  studentsNameByFrom: Observable<string>;
  emailsByFrom: Observable<string>;
  studentsForObs: Student[];

  studentsName: Observable<string> = new Observable(obs => {
    for (var i = 0; i < this.students.length; i++) {
      obs.next(this.students[i].firstName);
    }
  })

  emails: Observable<string> = new Observable(obs => {
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].active)
        obs.next("The email was sent successfully to " + this.students[i].email)
    }
  })

  timer: Observable<string> = new Observable(obs => {
    setInterval(() => {
      obs.next((new Date().toLocaleTimeString()));
    }, 1000);
  })

  constructor(private _StudentService: StudentService) { }

  ngOnInit(): void {
      this.getStudentsName();
      this.getStudentsByActive();
      this.sendEmailsByFrom();
  }

  sendEmail() {
    this.emails.subscribe(val => {
      alert(val);
    })
  }

  getStudentsName() {
    this.studentsNameByFrom = from(this.students).pipe(map(x => {
      return x.firstName;
    }));
    this.studentsNameByFrom.subscribe(val => {
      console.log("by from:" + val)
    });
    this.studentsName.subscribe(val => {
      console.log(val);
    });
  }

  getStudentsByActive() {
    this.studentsForObs = this.students.filter(x => {
      x.active;
    });
  }

  sendEmailsByFrom() {
    this.emailsByFrom = from(this.students).pipe(map(x => {
      return "The email was sent successfully to " + x.email
    }));
  }

}