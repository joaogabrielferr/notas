import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('listHeader')
  listHeader! : ListHeaderComponent;

  folders : Folder[] = [];

  notes : Note[] = [];

  filteredNotes : Note[] = [];

  isAddFolderModalOpen : boolean = false;

  emptyNotesCount : number = 0;

  currentView : 'table' | 'grid' = 'table';

  icons = {
    faPlus
  };

  constructor(private store : Store, private router : Router){
  }

  ngOnInit(): void {
    this.store.select(selectAllFolders).subscribe((f)=>{

      this.folders = f;
      this.getAllNotes();
      this.countEmptyNotes();

      this.filteredNotes = this.notes;

      if(this.listHeader == undefined)
      {
        this.filter('sort');
        console.log("aqui");
      }else this.filter(this.listHeader.sortOption);

    });
  }

  getAllNotes()
  {
    this.notes = [];
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

  filter(op : string)
  {

    if(op == 'sort')return;

    const newNotes = [...this.filteredNotes];

    newNotes.sort((a : Note,b : Note)=>{

      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);

      if(date1.getTime() < date2.getTime())return op == 'desc' ? 1 : -1;
      else if(date1.getTime() > date2.getTime())return op == 'desc' ? -1 : 1;
      else return 0;
    });


    this.filteredNotes = newNotes;

  }


}
