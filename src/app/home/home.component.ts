import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  timerValue: string;
  timerByOperator: Observable<string> = interval(1000).pipe(map(x => { return new Date().toLocaleTimeString() }));
  
  constructor() { }

  ngOnInit(): void {
    this.timerByOperator.subscribe(val => {
      this.timerValue = val;
    });    
  }

}
