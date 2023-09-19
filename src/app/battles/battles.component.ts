import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BattleService } from '../battle.service'; // Import your BattleService
import { Battle } from '../models/battle.model'; // Import your Battle model

@Component({
  selector: 'app-battles',
  templateUrl: './battles.component.html',
  styleUrls: ['./battles.component.css'],
})
export class BattlesComponent implements OnInit {
  battles: Battle[] = [];
  battleForm: FormGroup;

  constructor(
    private battleService: BattleService,
    private formBuilder: FormBuilder
  ) {
    this.battleForm = this.formBuilder.group({
      attacker: ['', [Validators.required]],
      defender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadBattles();
  }

  loadBattles(): void {
    // Call your battle service to fetch battles from the backend
    this.battleService.getBattles().subscribe(
      (battles) => {
        this.battles = battles;
      },
      (error) => {
        console.error('Failed to fetch battles:', error);
      }
    );
  }

  submitBattle(): void {
    if (this.battleForm.valid) {
      const { attacker, defender } = this.battleForm.value;
      // Create a battle object based on your Battle model
      const newBattle: Battle = {
        attacker,
        defender,
        // Set other properties as needed
        status: 'pending', // Set an initial status if needed
      };

      // Call your battle service to submit the battle to the backend
      this.battleService.createBattle(newBattle).subscribe(
        (result) => {
          // Handle success (e.g., show a success message)
          console.log('Battle submitted successfully:', result);
          // Refresh the battles list
          this.loadBattles();
        },
        (error) => {
          // Handle error (e.g., show an error message)
          console.error('Failed to submit battle:', error);
        }
      );

      // Reset the form
      this.battleForm.reset();
    }
  }

  updateBattle(battle: Battle): void {
    // Call your battle service to update the battle
    this.battleService.updateBattle(battle).subscribe(
      (updatedBattle) => {
        // Handle success (e.g., show a success message)
        console.log('Battle updated successfully:', updatedBattle);
        // Refresh the battles list
        this.loadBattles();
      },
      (error) => {
        // Handle error (e.g., show an error message)
        console.error('Failed to update battle:', error);
      }
    );
  }

  deleteBattle(id: string): void {
    // Call your battle service to delete the battle
    this.battleService.deleteBattle(id).subscribe(
      () => {
        // Handle success (e.g., show a success message)
        console.log('Battle deleted successfully');
        // Refresh the battles list
        this.loadBattles();
      },
      (error) => {
        // Handle error (e.g., show an error message)
        console.error('Failed to delete battle:', error);
      }
    );
  }
}
