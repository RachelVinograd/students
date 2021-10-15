import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from './modules/students/models/student.model';
import { Test } from './modules/students/models/test.model';

@Component({
    templateUrl: "./app.Component.html",
    selector: "app-root"
})
export class AppComponent {

    title: string = "hello!!!!";
    hour: number = new Date().getHours();
    testsToShow: Test[];
    average: number;
    constructor() { }

    getTestList(currentStudent: Student) {
        this.testsToShow = currentStudent.tests;
        this.average = currentStudent.average;
    }

    //lesson1:
    getTime() {
        if (this.hour >= 6 && this.hour < 12)
            return "Good morning";
        else if (this.hour >= 12 && this.hour < 18)
            return "Good afternoon";
        else if (this.hour >= 18 && this.hour < 23)
            return "Good evening";
        return "Good night";
    }
}
