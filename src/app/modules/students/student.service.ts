import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './models/student.model';
import { Test } from './models/test.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
headers.append('Accept', 'application/json');
const STUDENTS = []

@Injectable()
export class StudentService {

    students: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>(undefined);
    public tests: Test[] = [];

    constructor(private _http: HttpClient) {
        this.getStudents().subscribe(data => {
            this.students.next(data);
        });
    }

    saveStudentToList(studentToSave: Student) {
        if (this.students.value.find(x => x.idStudent == studentToSave.idStudent)) {
            let studentToUpdate = this.students.value.filter(x => x.idStudent == studentToSave.idStudent)[0]
            // console.log("studentToSave: " + JSON.stringify(studentToSave) + " studentToUpdate: " + JSON.stringify(studentToUpdate))
            this.updateStudent({ id: studentToUpdate.idStudent, student: studentToSave }).subscribe(data => {
                if (data) {
                    alert("The changes saved successfully");
                }
                else
                    alert("saved failed");
            }, err => alert(err.message)
            );
            let index = this.students.value.indexOf(studentToUpdate);
            this.students.value[index] = studentToSave;
            this.students.next(this.students.value);
        }
        else {
            this.addStudent(studentToSave).subscribe(data => {
                if (data) {
                    alert("The student saved successfully " + studentToSave.firstName)
                }
                else
                    alert("savad failed")
            }, err => alert(err.message)
            );
            this.students.value.push(studentToSave);
        }
    }

    getStudents(): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students");
    }

    addStudent(student: Student): Observable<boolean> {
        return this._http.post<boolean>("/api/Students", student);
    }

    updateStudent({ id, student }: { id: number; student: Student; }): Observable<boolean> {
        return this._http.put<boolean>("/api/Students/" + id, student
            , { headers: headers }
        );
    }

    deleteStudent(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/Students/" + id);
    }

    getStudentsByActive(active: boolean): Observable<Student[]> {
        return this._http.get<Student[]>("/api/Students/?active=" + active);
    }

    getStudentsByPromise(): Promise<Student[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(STUDENTS);
            }, 1000);
        })
    }

    getAverage(student: Student) {
        let sum = 0;
        if (student.tests) {
            for (let i = 0; i < student.tests.length; i++) {
                sum = sum + student.tests[i].grade;
            }
            return sum / student.tests.length;
        }
        return 0;
    }
}
