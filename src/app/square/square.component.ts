import { Component, EventEmitter, Output, computed, input, signal } from '@angular/core';
import { Player } from '../types/types';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {

    index = input<number>(0);

    gameWon = input<boolean>(false);

    state = signal<Player | null>(null);

    @Output('clicked') squareClicked = new EventEmitter<number>();

    protected disabled = computed<Boolean>(() => this.gameWon() || this.state() !== null);

    onClick() {
      this.squareClicked.next(this.index());
    }
}