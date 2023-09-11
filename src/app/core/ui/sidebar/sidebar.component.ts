import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  faAngleUp = faAngleUp;
  faCalendarDays = faCalendarDays;
  faFolderOpen = faFolderOpen;

  constructor(private router : Router){}

  folders : any = [
    {
      name:'notes',
      id:1,
      notes:[
       {
        title:'plan trip',
        id:3,
        folder_id:1
       },
       {
        title:'oop',
        id:4,
        folder_id:1
       },
       {
        title:'docker',
        id:5,
        folder_id:1
       }

      ]
    },{
      name:'books',
      id:2,
      notes:[
        {
          title:'the lord of the rings',
          id:6,
          folder_id:2
        },
        {
          title:'1984',
          id:7,
          folder_id:2
        }
      ]
    }
  ]

  foldersVisible : boolean[] = new Array(10).fill(false);

  toogleFolder(index : number)
  {
    this.foldersVisible[index] = !this.foldersVisible[index];
  }

  redirectToPage(itemID:number)
  {
    this.router.navigate(['/note',itemID]);
  }

}
