import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{

  faBars = faBars;

  editor! : EditorJS;

  noteTitle : string = "";

  constructor(private route : ActivatedRoute){}



  note : any;
  id : any;

  ngOnInit()
  {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
    });

    this.initializeEditor();

    this.saveData();


  }

  initializeEditor()
  {
    this.noteTitle = "Untitled";
    this.editor  = new EditorJS({
      holder: 'editorjs',
      placeholder: "Type here to write your note...",
      tools:{
        header:Header
      },
      data:{
        blocks:[{type:'paragraph',data:{}}]
      }
    });

    this.editor.isReady.then(()=>{
      console.log("editor is ready");
    },(error)=>{
      console.log("editor couldnt initialized because of " + error);
    })

  }

  saveData()
  {

  }



}
