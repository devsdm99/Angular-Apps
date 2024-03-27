import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;

  
  private heroesService: HeroService = inject(HeroService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);


  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id))
    ).subscribe((hero) => {
      if(!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      return;
    });
  }

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }

}
