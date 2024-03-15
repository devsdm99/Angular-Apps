import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from '../../../shared/components/lazy-image/lazy-image.component';

@Component({
  selector: 'gif-card',
  standalone: true,
  imports: [CommonModule, LazyImageComponent],
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.css'
})
export class GifCardComponent implements OnInit{

  @Input() 
  public gif!: Gif;

  constructor() { }

  ngOnInit(): void {
    if(!this.gif){
      console.error('GifCardComponent: gif is required');
    }
  }

}
