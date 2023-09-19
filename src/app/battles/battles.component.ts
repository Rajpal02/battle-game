import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BattleService } from '../battle.service'; 
import { Battle } from '../models/battle.model'; 

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
    
      const newBattle: Battle = {
        attacker,
        defender,
        status: 'pending', 
      };

  
      this.battleService.createBattle(newBattle).subscribe(
        (result) => {
          console.log('Battle submitted successfully:', result);
          this.loadBattles();
        },
        (error) => {
          console.error('Failed to submit battle:', error);
        }
      );


      this.battleForm.reset();
    }
  }

  updateBattle(battle: Battle): void {
    this.battleService.updateBattle(battle).subscribe(
      (updatedBattle) => {
        console.log('Battle updated successfully:', updatedBattle);
        this.loadBattles();
      },
      (error) => {
        console.error('Failed to update battle:', error);
      }
    );
  }

  deleteBattle(id: string): void {
    this.battleService.deleteBattle(id).subscribe(
      () => {
        console.log('Battle deleted successfully');
        this.loadBattles();
      },
      (error) => {
        console.error('Failed to delete battle:', error);
      }
    );
  }
}
