import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../leaderboard.service'; // Import your LeaderboardService
import { LeaderboardEntry } from '../models/leaderboard.model'; // Import your LeaderboardEntry model

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardEntries: LeaderboardEntry[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  // Load leaderboard from the backend
  loadLeaderboard(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.leaderboardService.getLeaderboard().subscribe(
      (leaderboardEntries) => {
        this.leaderboardEntries = leaderboardEntries;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch leaderboard. Please try again later.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }
}
