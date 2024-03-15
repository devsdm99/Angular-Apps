import { Component, inject } from '@angular/core';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchBoxComponent, GifsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private gifsService = inject(GifsService);


  get gifsList(){
    return this.gifsService.gifsList;
  }

}
