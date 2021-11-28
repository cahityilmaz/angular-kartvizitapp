import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() card!: Card;

  constructor(
    public dialog: MatDialog,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
  }

  openUpdateCardModal(): void {
    this.dialog.open(CardModalComponent, { data: this.card, width: '400px' });
  }

}
