
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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

  ngOnInit(): void {
      this.initializeEditor();
  }



  async initializeEditor()
  {
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


}
