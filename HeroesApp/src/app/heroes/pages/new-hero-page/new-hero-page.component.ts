import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent implements OnInit {


  private heroService: HeroService = inject(HeroService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private dialog: MatDialog = inject(MatDialog);


  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];



  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;
    }
    )


  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Done', {
      duration: 2500
    });
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) {
      throw new Error('Cannot delete a hero without id');
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: this.heroForm.value });

    dialog.afterClosed()
      .pipe(
        filter((res: boolean) => res === true),
        switchMap(() => this.heroService.deleteHeroById(this.currentHero.id))
      )
      .subscribe((result) => {
        this.router.navigate(['/heroes']);
        this.showSnackBar('Heroe eliminado');
      }
      );

  }


  public onSubmit() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }
    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackBar('Hero updated');
      });

      return;
    }

    this.heroService.addHero(this.currentHero).subscribe(hero => {
      //TODO: Mostrar snackbar y navegar a la /heroes/edit/:id
      this.showSnackBar('Hero created');
      this.router.navigate(['/heroes/edit', hero.id]);

    });

  }





}
