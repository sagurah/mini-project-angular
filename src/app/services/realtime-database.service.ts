import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  private databaseUrl = `${environment.firebase.databaseURL}/formSubmissions`;
  private usersDatabaseUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {}

  async saveUser(uid: string, data: any): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put(`${this.usersDatabaseUrl}/users/${uid}.json`, data)
      );
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  async saveFormSubmission(data: any): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.databaseUrl}.json`, data));
    } catch (error) {
      console.error('Error saving form submission:', error);
      throw error;
    }
  }

  async getFormSubmissions(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.databaseUrl}.json`)
      );
      return response || {};
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      throw error;
    }
  }

  async getFormSubmission(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.databaseUrl}/${id}.json`)
      );
      return response;
    } catch (error) {
      console.error('Error fetching form submission:', error);
      throw error;
    }
  }

  async updateFormSubmission(id: string, data: any): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put(`${this.databaseUrl}/${id}.json`, data)
      );
    } catch (error) {
      console.error('Error updating form submission:', error);
      throw error;
    }
  }

  async deleteFormSubmission(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.databaseUrl}/${id}.json`));
    } catch (error) {
      console.error('Error deleting form submission:', error);
      throw error;
    }
  }
}
