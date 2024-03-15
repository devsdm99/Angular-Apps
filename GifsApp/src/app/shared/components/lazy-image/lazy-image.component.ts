import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt: string = "No description available";


  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url){
      console.error('LazyImageComponent: url is required');
    }
  }

  onLoad(){
      this.hasLoaded = true;
  }
}
