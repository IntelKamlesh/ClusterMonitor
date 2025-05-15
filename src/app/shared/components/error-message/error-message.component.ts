import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred while loading data.';
}
