import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit {

  constructor() { }

  @Input() userAcademics;
  ngOnInit(): void {
  }

}
