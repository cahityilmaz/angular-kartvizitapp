import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public card: Card
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.card?.name || '', Validators.maxLength(50)],
      title: [this.card?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.card?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.card?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.card?.address || '', Validators.maxLength(255)],
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        this.onSuccess(res || 'Kartvizit başarıyla eklendi.');
      }, (err: any) => {
        this.onError(err.message || 'Kartvizit eklenirken bir hata oluştu.');
      });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.card.id)
      .subscribe((res: any) => {
        this.onSuccess(res || 'Kartvizit başarıyla güncellendi.');
      }, (err: any) => {
        this.onError(err.message || 'Kartvizit güncellenirken bir hata oluştu.');
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.card.id)
      .subscribe((res: any) => {
        this.onSuccess(res || 'Kartvizit başarıyla silindi.');
      }, (err: any) => {
        this.onError(err.message || 'Kartvizit silinirken bir hata oluştu.');
      });
  }

  onSuccess(message: string) {
    this.snackbarService.showSnackBar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  onError(message: string) {
    this.snackbarService.showSnackBar('error', message);
    this.showSpinner = false;
  }

}
