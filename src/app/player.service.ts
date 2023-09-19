import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Player } from './models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = 'http://localhost:3000/api/players';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Get all players
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch players:', error);
        return throwError('Failed to fetch players. Please try again later.');
      })
    );
  }

  // Create a new player
  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.baseUrl, player, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to create player:', error);
        return throwError('Failed to create player. Please try again.');
      })
    );
  }
}
