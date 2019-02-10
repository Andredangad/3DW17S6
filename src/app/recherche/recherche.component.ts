import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JeuService }  from '../jeu.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  constructor(public jeuService: JeuService, private router: Router) { }

  ngOnInit() {
  }
showDetails(jeu) {
    if(jeu && jeu.id)
    {
      this.router.navigate(['/game-detail', jeu.id]);
	  
    }
}
}
