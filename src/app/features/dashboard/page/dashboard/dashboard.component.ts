import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from 'src/app/core/types/Folder';
import { Store } from '@ngrx/store';
import { selectAllFolders } from 'src/app/features/folders/state/folders.selectors';
import { Note } from 'src/app/core/types/Note';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { addFolder } from 'src/app/features/folders/state/folders.actions';
import { v4 } from 'uuid';
import { Router } from '@angular/router';
import { AddFolderModalComponent } from 'src/app/core/ui/add-folder-modal/add-folder-modal.component';
import { ListHeaderComponent } from 'src/app/shared/components/list-header/list-header.component';
import { ListNotesComponent } from 'src/app/shared/components/list-notes/list-notes.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,AddFolderModalComponent,ListHeaderComponent,ListNotesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  folders : Folder[] = [];

  notes : Note[] = [];

  filteredNotes : Note[] = [];

  noFiltersApplied : boolean = true;

  isAddFolderModalOpen : boolean = false;

  emptyNotesCount : number = 0;

  currentView : 'table' | 'grid' = 'table';

  icons = {
    faPlus
  };

  constructor(private store : Store, private router : Router){
    this.store.select(selectAllFolders).subscribe((f)=>{
      this.folders = f;
      this.getAllNotes();
      this.countEmptyNotes();

      if(this.noFiltersApplied)
      {
        this.filteredNotes = this.notes;
        this.noFiltersApplied = false;
      }

    });

  }

  ngOnInit(): void {


  }

  getAllNotes()
  {
    this.folders.forEach((folder)=>{
      this.notes = this.notes.concat(folder.notes);
    });
  }

  createFolder(name : string)
  {
    if(name.trim() == '')name = "Untitled";
    const id = v4();

    this.store.dispatch(addFolder({folder: {id : id,name:name,notes:[],created_at:new Date()} as Folder}));
    this.toogleAddFolderModal();
    this.router.navigate(["/folder",id]);
  }

  countEmptyNotes()
  {
    console.log(this.notes);
    this.emptyNotesCount = 0;
    this.notes.forEach((n)=>{
      if(!n.content.blocks || n.content.blocks.length === 0)
      {
        this.emptyNotesCount++;
      }
    })
  }

  toogleAddFolderModal()
  {
    this.isAddFolderModalOpen = !this.isAddFolderModalOpen;
  }

  selectView(op : 'table' | 'grid')
  {
    this.currentView = op;
  }


}
