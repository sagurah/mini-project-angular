import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
 } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-data-page',
  templateUrl: './pokemon-data-page.component.html',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  styleUrls: ['./pokemon-data-page.component.css']
})
export class PokemonDataPageComponent implements OnInit, AfterViewInit {
  boughtPokemonData = new MatTableDataSource<any>([]);
  isEdit: boolean = false;
  isDirty: boolean = false;
  isViewingDetails: boolean = false;
  selectedDataId: string = '';
  selectedPokemons: any[] = [];
  displayedColumns: string[] = ['id', 'address', 'email', 'firstName', 'lastName', 'actions']

  constructor(private rtdb: RealtimeDatabaseService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formEditPurchase = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })

  ngAfterViewInit() {
    this.boughtPokemonData.paginator = this.paginator;
  }

  async fetchBoughtPokemonData() {
    const response = await this.rtdb.getFormSubmissions();
    this.boughtPokemonData.data = Object.entries(response).map(([id, data]: [String, any]) => {
      return {
        id,
        ...data
      }
    })
  }

  async ngOnInit() {
    this.formEditPurchase.valueChanges.subscribe(() => {
      this.isDirty = this.formEditPurchase.dirty
    })

    await this.fetchBoughtPokemonData();
  }

  async deleteData(data: any) {
    try {
      await this.rtdb.deleteFormSubmission(data.id)
      await this.fetchBoughtPokemonData();
    } catch (error) {
      console.error(error)
    }
  }

  editData(data: any) {
    this.isEdit = true
    this.selectedDataId = data.id

    this.formEditPurchase.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address
    })

    this.selectedPokemons = data.pokemonToBuy
  }

  async updateData() {
    if (this.formEditPurchase.valid) {
      try {
        const payload = {
          ...this.formEditPurchase.value
        }

        await this.rtdb.updateFormSubmission(this.selectedDataId, payload)
        await this.fetchBoughtPokemonData();
        this.isEdit = false
        alert('Successfully edited data')
      } catch (error) {
        console.error(error)
      }
    }
  }

  cancelEdit() {
    this.isEdit = false
    this.formEditPurchase.reset()
  }

  closeDetails() {
    this.isViewingDetails = false
    this.selectedPokemons = []
  }

  canDeactivate(): boolean {
    if (this.isEdit && this.formEditPurchase.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?')
    }

    return true
  }
}
