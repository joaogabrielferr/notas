import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/core/types/Note';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan,faFolderOpen} from '@fortawesome/free-regular-svg-icons';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationModalComponent } from 'src/app/core/ui/confirmation-modal/confirmation-modal.component';
import { Store } from '@ngrx/store';
import { deleteNote } from 'src/app/features/folders/state/folders.actions';
import { formatDate } from 'src/app/utils/formatDate';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ConfirmationModalComponent],
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListNotesComponent implements OnInit ,OnChanges {

  @Input()
  notes! : Note[];

  @Input()
  showGridOption : boolean = false;

  @Input()
  view : 'table' | 'grid' = 'table';

  textMap = new Map<string,string>();

  formatDate = formatDate;

  icons = {
    faTrashCan,
    faThumbTack,
    faFolderOpen
  }

  selectedNote : Note | null = null;

  isDeleteNoteModalOpen : boolean = false;

  constructor(private router : Router,private store : Store){}


  ngOnInit(): void {
      this.generateTexts();
  }

  ngOnChanges( changes : SimpleChanges)
  {
    if(changes['notes'])
    {
      this.generateTexts();
    }
  }


  generateTexts()
  {
    this.notes.forEach((note)=>{

        let text = "";

        if(note.content.blocks && note.content.blocks.length > 0)
        {
          note.content.blocks.forEach((block)=>{
            if(block.type === "paragraph" || block.type === "header")
            {
              text += block.data.text + "<br>";
            }
            if(block.type === "list")
            {
              if(block.data.items && block.data.items.length > 0)
              {
                block.data.items.forEach((item)=>text+=(item + "<br>"));
              }
            }
          })
        }

        this.textMap.set(note.id,text);


    })
  }

  navigateToNote(noteId : string)
  {
    this.router.navigate(["/note",noteId]);
  }

  toogleDeleteNoteModal()
  {
    this.isDeleteNoteModalOpen = !this.isDeleteNoteModalOpen;
  }

  openDeleteNoteModal(note : Note)
  {
    this.selectedNote = note;
    this.toogleDeleteNoteModal();
  }

  deleteNote()
  {
    this.store.dispatch(deleteNote({note : this.selectedNote!}));
    this.selectedNote = null;
    this.toogleDeleteNoteModal();
  }

  _formatDate(date : Date)
  {
    return formatDate(date);
  }


}
