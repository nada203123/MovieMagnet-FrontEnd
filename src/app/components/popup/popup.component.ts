import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() message: string = ''; 
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.closeModal.emit();
  }

}
