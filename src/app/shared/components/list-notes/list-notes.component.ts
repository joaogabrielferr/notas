import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/core/types/Note';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-list-notes',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {

  @Input() notes! : Note[];

  textMap = new Map<string,string>();

  icons = {
    faTrashCan
  }

  constructor(private router : Router){}


  ngOnInit(): void {
      this.generateTexts();
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


}
