import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'src/app/core/types/Folder';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFolderById } from '../../state/folders.selectors';
import { addFolder, addNote } from '../../state/folders.actions';
import { Note } from 'src/app/core/types/Note';
import { v4 } from 'uuid';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit{

  public folder$! : Observable<Folder>;

  id! : string | null;

  constructor(private route : ActivatedRoute,private store : Store){}


  ngOnInit()
  {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      if(!this.id)
      {
        //redirect to 404 page
        return;
      }
      console.log("aqui ",this.id);
      this.folder$ = this.store.select(selectFolderById(this.id));

    });

  }

  createNote()
  {
    this.store.dispatch(addNote({note:{id:v4(),title:'Untitled note',content:{},folder_id:this.id} as Note}));
  }

}
