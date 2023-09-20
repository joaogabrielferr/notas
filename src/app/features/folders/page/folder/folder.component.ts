import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Folder } from 'src/app/core/types/Folder';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFolderById } from '../../state/folders.selectors';
import { addFolder, addNote } from '../../state/folders.actions';
import { Note } from 'src/app/core/types/Note';
import { v4 } from 'uuid';
import { Actions, ofType } from '@ngrx/effects';
import { ListNotesComponent } from 'src/app/shared/components/list-notes/list-notes.component';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule,ListNotesComponent],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit{

  public folder$! : Observable<Folder>;
  public folder! : Folder;
  id! : string | null;

  notes : Note[] = [];


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

}
