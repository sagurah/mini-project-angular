import { Component } from '@angular/core';

@Component({
  selector: 'app-biodata',
  standalone: false,
  
  templateUrl: './biodata.component.html',
  styleUrl: './biodata.component.css'
})
export class BiodataComponent {
  name: string = 'Satyo Gusti A.'
  age: number = 21
  address: string = 'Gg. Delima, Depok, Sleman, DIY'
  isVisible: boolean = false
  phones: string[] = ['+6281234567890', '+6280987654321', '+6281122334455', '+6289988776655']

  revealPicture() : void {
    this.isVisible = !this.isVisible
  }
}
