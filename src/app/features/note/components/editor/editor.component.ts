
import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import EditorJS from '@editorjs/editorjs';

//adding ts-ignore since the puglins for editor.js does not have types

//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Code from "@editorjs/code";
//@ts-ignore
import Quote from "@editorjs/quote";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Store } from "@ngrx/store";
import { EditorResponse, Note } from "src/app/core/types/Note";
import { Observable, firstValueFrom, fromEvent } from "rxjs";
import { selectFolderById, selectNoteById } from "src/app/features/folders/state/folders.selectors";
import { ActivatedRoute } from "@angular/router";
import { updateNote } from "src/app/features/folders/state/folders.actions";
import { debounce } from "lodash";


@Component({
  selector:'app-editor',
  standalone:true,
  templateUrl:'./editor.component.html',
  styleUrls:['./editor.component.scss'],
  imports: [CommonModule,FontAwesomeModule,FormsModule],
})
export class EditorComponent implements OnInit{

  editor! : EditorJS;

  noteTitle : string = "";

  note$! : Observable<Note>;

  note! : Note;

  id! : string | null;

  constructor(private store : Store, private route : ActivatedRoute){
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
      if(!this.id)
      {
        //redirect to 404
        return;
      }

       this.note$ = store.select(selectNoteById(this.id));

    });


  }

  ngOnInit(): void {
      this.note$.subscribe((note)=>{
        this.note = note;
        this.noteTitle = note.title;
        console.log("TITLE:",note.title);
        this.initializeEditor();
        });

  }


  initializeEditor()
  {
    const self = this;
    this.noteTitle = "Untitled note";
    this.editor  = new EditorJS({
      holder: 'editorjs',
      placeholder: "Type here to write your note...",
      tools:{
        header: Header,
        list:List,
        code: Code,
        quote: Quote
      },
      data:this.note.content,
      onChange(api, event) {
        self.debouncedSaveNote();
      },
    });

    this.editor.isReady.then(()=>{
      console.log("editor is ready");
    },(error)=>{
      console.log("editor couldnt initialized because of " + error);
    })

  }

  async saveNote()
  {

    console.log("salvando");

    const note : Note = await firstValueFrom(this.note$);

    const newNote = {...note};

    const content = await this.editor.save();

    newNote.content = content as EditorResponse;

    newNote.title = this.noteTitle.trim() === "" ? "Untitled Note" : this.noteTitle;

    this.store.dispatch(updateNote({note : newNote}));

  }

  debouncedSaveNote = debounce(this.saveNote,1000);

  updateTitle(value : string)
  {
    console.log("updating title",value);
    this.noteTitle = value;
    this.debouncedSaveNote();
  }






}
