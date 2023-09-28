import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SidebarComponent,RouterOutlet,HeaderComponent,FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSidebar : boolean = true;

  mobile : boolean = false;

  icons = {
    faBars
  }

  ngOnInit(): void {
    const resize$ = fromEvent(window, 'resize');
    resize$
      .pipe(
        map((i: any) => i),
        debounceTime(100)
      )
      .subscribe((event) => {
        if(window.innerWidth <= 768)
        {
          console.log(window.innerWidth);
          this.mobile = true;
        }else
        {
          this.mobile = false;
        }
      });
  }

  toggleSidebar()
  {
    this.showSidebar = !this.showSidebar;
  }

}
