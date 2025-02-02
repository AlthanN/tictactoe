import { Component, OnInit } from '@angular/core';
import { SquareComponent } from "../square/square.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  squares: any;
  xIsNext: boolean = false;
  winner: string = '';
  isVisible: boolean = true;
  constructor() {}
  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
    
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    if(!(this.squares[index] && !this.winner)) {
      this.squares[index] = this.player;
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
  }

  calculateWinner() {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winner = this.squares[a];
        return this.squares[a];
      }
    }
    return null;
  }
}
