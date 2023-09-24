import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  currentHour! : string;
  currentMinutes! : string;
  currentDay! : string;

  constructor(){
    setInterval(()=>this.clock(),1000);
  }

  ngOnInit(): void {


  }


  clock()
  {
    const date = new Date();
    this.currentHour = date.getHours().toString();
    this.currentMinutes = date.getMinutes().toString();
    if(this.currentHour.length == 1)this.currentHour = "0" + this.currentHour;
    if(this.currentMinutes.length == 1)this.currentMinutes = "0" + this.currentHour;
    this.currentDay = this.formatDate(date);
  }


   formatDate(date : Date) {
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const monthDay = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${monthDay}, ${year}`;
  }




}
