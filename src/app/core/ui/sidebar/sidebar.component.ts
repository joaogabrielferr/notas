import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight,faAngleDown, faHome } from '@fortawesome/free-solid-svg-icons';
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

  @Input()
  mobile! : boolean;

  @Output()
  toggleSidebar = new EventEmitter<boolean>();

  icons = {
    faAngleRight,
    faAngleDown,
    faCalendarDays,
    faFolderOpen,
    faFolderClosed,
    faPlusSquare,
    faHome
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

  redirectToPage(prefix : string,itemID?:string)
  {
    if(itemID)this.router.navigate([prefix,itemID]);
    else this.router.navigate([prefix]);
  }

  createFolder(name : string)
  {
    if(name.trim() == '')name = "Untitled";
    const id = v4();

    this.store.dispatch(addFolder({folder: {id : id,name:name,notes:[],created_at:new Date()} as Folder}));
    this.toogleAddFolderModal();
    this.router.navigate(["/folder",id]);
  }

  toogleAddFolderModal()
  {
    this.isAddFolderModalOpen = !this.isAddFolderModalOpen;
  }

  _toggleSidebar()
  {
    this.toggleSidebar.emit(true);
  }


}
