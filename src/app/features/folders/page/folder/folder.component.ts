import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Folder } from 'src/app/core/types/Folder';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFolderById } from '../../state/folders.selectors';
import { addFolder, addNote, deleteFolder } from '../../state/folders.actions';
import { Note } from 'src/app/core/types/Note';
import { v4 } from 'uuid';
import { Actions, ofType } from '@ngrx/effects';
import { ListNotesComponent } from 'src/app/shared/components/list-notes/list-notes.component';
import { faPlus,faTrashCan,faTable, faGrip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationModalComponent } from 'src/app/core/ui/confirmation-modal/confirmation-modal.component';
import { ListHeaderComponent } from 'src/app/shared/components/list-header/list-header.component';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule,ListNotesComponent,FontAwesomeModule,ConfirmationModalComponent,ListHeaderComponent],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit{

  @ViewChild("listHeader") listHeader! : ListHeaderComponent;

  public folder$! : Observable<Folder>;
  public folder! : Folder;
  id! : string | null;

  notes : Note[] = [];

  isModalDeleteFolderOpen : boolean = false;

  currentView : 'grid' | 'table' = 'table';

  filteredNotes : Note[] = [];

  noFiltersApplied : boolean = true;

  icons = {
    faPlus,
    faTrashCan,
    faTable,
    faGrip
  }

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private store : Store,
    ){
    }


  ngOnInit()
  {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      if(!this.id)
      {
        //redirect to 404 page
        this.router.navigate(["/404"]);
        return;
      }
      this.folder$ = this.store.select(selectFolderById(this.id));
      this.folder$.subscribe((folder)=>
      {
        if(!folder)
        {
          this.router.navigate(["/404"]);
          return;
        }
        this.folder = folder;
        this.notes = folder.notes;

        this.filteredNotes = this.notes;

        this.filter(this.listHeader.sortOption || 'sort');


      },(err)=>{
        this.router.navigate(["/404"]);
      }
      );

    });

  }

  createNote()
  {
    const id = v4();
    this.store.dispatch(addNote({note:{id:id,title:'Untitled note',content:{},folder_id:this.id,created_at: new Date()} as Note}));
    this.router.navigate(["/note",id]);
  }

  toogleModalDeleteFolder()
  {
    this.isModalDeleteFolderOpen = !this.isModalDeleteFolderOpen;
  }

  deleteFolder()
  {
    this.store.dispatch(deleteFolder({id: this.folder.id}));
    this.router.navigate(["/"]);
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
