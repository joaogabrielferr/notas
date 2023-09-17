import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {EditorComponent} from '../../components/editor/editor.component';



@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,FormsModule,EditorComponent],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{

  faBars = faBars;

  constructor(private route : ActivatedRoute){}



  note : any;
  id : any;

  ngOnInit()
  {
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('id');
    });

  }




}
