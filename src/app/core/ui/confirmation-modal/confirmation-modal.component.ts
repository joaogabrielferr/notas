import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  @Output()
  confirm = new EventEmitter<boolean>();

  @Output()
  close = new EventEmitter<boolean>();

  @Input({required:true})
  title! : string;


  toggleClose(): void
  {
    this.close.emit(true);
  }

  _confirm()
  {
    this.confirm.emit(true);
  }

}
