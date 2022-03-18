import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL: string = 'http://localhost:8888/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getAllUser(): Observable<any> {
    return this.http.get(this.URL);
  }

  getUsers(page: number): Observable<any> {
    return this.http.get(this.URL + '/page/' + page);
  }

  create(user: User): Observable<User> {
    return this.http.post(this.URL, user)
      .pipe(
        map((response: any) => response.user as User),
        catchError(e => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          if (e.error.mensaje) {
          }
          return throwError(() => e);
        }));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/users']);
        }
        return throwError(() => e);
      }));
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.URL}/${user.id}`, user).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.error.mensaje) {
        }
        return throwError(() => e);
      }));
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.URL}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
        }
        return throwError(() => e);
      }));
  }

  getUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/filter/${name}`);
  }
}
