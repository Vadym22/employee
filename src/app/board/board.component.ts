import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})



export class BoardComponent {
  constructor() { }

}
