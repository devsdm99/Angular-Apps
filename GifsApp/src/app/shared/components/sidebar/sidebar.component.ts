import { Component, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private gifsService = inject(GifsService);

  onClick(tag: string){
    this.gifsService.searchTag(tag);
  }

  get history(){
    return this.gifsService.tagHistory;
  }

}
