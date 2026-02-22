import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5000/api/auth';

    constructor(private http: HttpClient) { }

    register(user: any) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(credentials: any) {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        return !!this.getToken();
    }
}