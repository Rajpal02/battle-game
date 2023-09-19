import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Battle } from './models/battle.model'; // Import your Battle model

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private apiUrl = '/api/battles'; // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  getBattles(): Observable<Battle[]> {
    return this.http.get<Battle[]>(`${this.apiUrl}`);
  }

  createBattle(battle: Battle): Observable<Battle> {
    return this.http.post<Battle>(`${this.apiUrl}`, battle);
  }

  updateBattle(battle: Battle): Observable<Battle> {
    const updateUrl = `${this.apiUrl}/${battle._id}`;
    return this.http.put<Battle>(updateUrl, battle);
  }

  deleteBattle(id: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
}
