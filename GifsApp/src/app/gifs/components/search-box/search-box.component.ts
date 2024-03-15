import { Component, ElementRef, Output, ViewChild, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') 
  public searchInput!: ElementRef<HTMLInputElement>;
  
  private gifsService = inject(GifsService);

  searchTag(){
    const newTag = this.searchInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.searchInput.nativeElement.value = '';
  }



}
