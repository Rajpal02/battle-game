import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeaderboardEntry } from './models/leaderboard.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private baseUrl = 'http://localhost:3000/api/leaderboard'; 

  constructor(private http: HttpClient) {}

  // Get leaderboard data
  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch leaderboard:', error);
        return throwError('Failed to fetch leaderboard data. Please try again later.');
      })
    );
  }
}
