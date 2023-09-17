import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight,faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays,faFolderOpen,faFolderClosed, faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import {Router} from '@angular/router';
import { Folder } from '../../types/Folder';
import { Store, select } from '@ngrx/store';
import { v4 } from 'uuid';
import { Observable } from 'rxjs';
import { selectAllFolders } from 'src/app/features/folders/folders.selectors';
import { addFolder } from 'src/app/features/folders/state/folders.actions';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  icons = {
    faAngleRight,
    faAngleDown,
    faCalendarDays,
    faFolderOpen,
    faFolderClosed,
    faPlusSquare
  }


  public folders$! : Observable<Folder[]>

  protected foldersVisible! : boolean[];

  constructor(private router : Router,private store : Store){}

  ngOnInit()
  {

    this.folders$ = this.store.select(selectAllFolders);

    this.folders$.subscribe((folders)=>this.foldersVisible = new Array(folders.length).fill(false));

  }

  toogleFolder(index : number)
  {
    this.foldersVisible[index] = !this.foldersVisible[index];
  }

  redirectToPage(itemID:string)
  {
    this.router.navigate(['/note',itemID]);
  }

  createFolder()
  {
    this.store.dispatch(addFolder({folder: {id : v4(),name:'Untitled',notes:[]} as Folder}))
  }



}
