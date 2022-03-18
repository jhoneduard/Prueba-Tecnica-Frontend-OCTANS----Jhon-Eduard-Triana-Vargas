import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlEndPoint: string = 'http://localhost:8888/api/roles';

  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlEndPoint);
  }

}
