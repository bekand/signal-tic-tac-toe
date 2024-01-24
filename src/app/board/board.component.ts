import { Component, QueryList, ViewChildren, computed, inject } from '@angular/core';
import { SquareComponent } from "../square/square.component";
import { GameService } from '../game.service';
import { Resolution } from '../types/types';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  imports: [SquareComponent]
})
export class BoardComponent {
  private gameService = inject(GameService);

  @ViewChildren(SquareComponent) private readonly squares!: QueryList<SquareComponent>;

  gameWon = computed<boolean>(() => this.gameService.gameState().resolution !== Resolution.InProgress);

  winner = computed<string | undefined>(() => {
    const gameState = this.gameService.gameState();
    if (gameState.resolution === Resolution.Tie) {
      return "It's a tie!";
    } else if (gameState.resolution !== Resolution.InProgress) {
      return gameState.lastMoved?.toString().concat(" won!");
    } else return
  })

  lastMoved = computed(() => this.gameService.gameState().lastMoved);

  squareClicked($event: number) {
    this.gameService.move($event);
    this.squares.get($event)?.state.set(this.gameService.gameState().lastMoved);
  }

  resetGame() {
    this.squares.forEach((square) => square.state.set(null));
    this.gameService.reset();
  }
}
