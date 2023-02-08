import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //variable

  constructor(  private router: Router,) {}
  ngOnInit(): void {
    type Timer = ReturnType<typeof setTimeout>;

    const timer: Timer = setTimeout(() => {
     this.router.navigate(['/yaviElec'])
    }, 2000);
  }
}
