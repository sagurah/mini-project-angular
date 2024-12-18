import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-purchase-modal',
  standalone: false,
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit {
  @Input() evolutionChain: any[] = []
  @Input() currentPokemon: string | null = ''
  @Input() isEdit: boolean = false

  pokemonToBuyData: any = null

  formPurchase = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    buyOption: new FormControl('', [Validators.required]),
  })

  constructor(private rtdb: RealtimeDatabaseService) { }

  ngOnInit() {
    console.log("purchase modal intialized")
  }

  onSubmit() {
    if (this.formPurchase.valid) {
      try {
        let payload = {}
        console.log(this.formPurchase.value.buyOption)

        if (this.formPurchase.value.buyOption === 'one') {
          payload = {
            ...this.formPurchase.value,
            pokemonToBuy: [this.currentPokemon]
          }
        } else {
          payload = {
            ...this.formPurchase.value,
            pokemonToBuy: this.evolutionChain.map(evolution => evolution.name)
          }
        }

        if (this.isEdit) {
          this.rtdb.updateFormSubmission(this.pokemonToBuyData.id, payload)
          return
        }

        this.rtdb.saveFormSubmission(payload)
      } catch (error) {
        console.error(error);
      }
    }
  }

}
