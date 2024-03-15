import { Component, Inject, Input, inject } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { CommonModule } from '@angular/common';
import { GifCardComponent } from '../gif-card/gif-card.component';

@Component({
  selector: 'gifs-list',
  standalone: true,
  imports: [CommonModule, GifCardComponent],
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent {

  @Input() gifsList: Gif[] = [];

}
