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
import { selectAllFolders } from 'src/app/features/folders/state/folders.selectors';
import { addFolder } from 'src/app/features/folders/state/folders.actions';
import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,AddFolderModalComponent],
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


  folders$! : Observable<Folder[]>

  foldersVisible! : boolean[];

  isAddFolderModalOpen : boolean = false;

  constructor(private router : Router,private store : Store){}

  ngOnInit()
  {

    this.folders$ = this.store.select(selectAllFolders);

    this.folders$.subscribe((folders)=>this.foldersVisible = new Array(folders.length).fill(true));

  }

  toogleFolder(index : number)
  {
    this.foldersVisible[index] = !this.foldersVisible[index];
  }

  redirectToPage(prefix : string,itemID:string)
  {
    this.router.navigate([prefix,itemID]);
  }

  createFolder(name : string)
  {
    if(name.trim() == '')name = "Untitled";
    this.store.dispatch(addFolder({folder: {id : v4(),name:name,notes:[]} as Folder}));
    this.toogleAddFolderModal();
  }

  toogleAddFolderModal()
  {
    this.isAddFolderModalOpen = !this.isAddFolderModalOpen;
  }


}
