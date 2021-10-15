import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Test } from '../models/test.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'test-history-list',
  templateUrl: './test-history-list.component.html',
  styleUrls: ['./test-history-list.component.scss']
})
export class TestHistoryListComponent implements OnInit {

  @Input() testsToShow: Test[];
  @Input() average: number;

  constructor() { }

  ngOnInit(): void {
  }

}
