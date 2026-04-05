import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private dataUrl = 'data/data.json';
    private storageKey = 'userProfile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      return of(JSON.parse(saved));
    }
    return this.http.get<any>(this.dataUrl).pipe(
      tap(data => localStorage.setItem(this.storageKey, JSON.stringify(data)))
    );
  }

  saveProfile(profile: any): void {
    const updated = {
      ...profile,
      updatedAt: { $date: new Date().toISOString() }
    };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    console.log('Saved Profile (MongoDB format):', updated);
  }

  resetProfile(): Observable<any> {
    localStorage.removeItem(this.storageKey);
    return this.getProfile();
  }
}