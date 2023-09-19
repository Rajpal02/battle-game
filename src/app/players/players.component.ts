import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'; 
import { Player } from '../models/player.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  playerForm: FormGroup;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder
  ) {
    this.playerForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      amountOfGold: [0, Validators.required],
      attack: [0, Validators.required],
      hitPoints: [0, Validators.required],
      luck: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPlayers();
  }


  loadPlayers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.playerService.getPlayers().subscribe(
      (players) => {
        this.players = players;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch players. Please try again later.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  createPlayer(): void {
    if (this.playerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const newPlayer: Player = this.playerForm.value;

    this.playerService.createPlayer(newPlayer).subscribe(
      (player) => {
        this.players.push(player);
        this.isLoading = false;
        this.playerForm.reset({
          identifier: '',
          name: '',
          amountOfGold: 0,
          attack: 0,
          hitPoints: 0,
          luck: 0,
        });
      },
      (error) => {
        this.errorMessage = 'Failed to create a player. Please try again.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }
}
