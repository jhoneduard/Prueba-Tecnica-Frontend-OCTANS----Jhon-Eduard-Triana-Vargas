import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Rol } from 'src/app/models/Rol';
import { User } from 'src/app/models/User';
import { RolService } from 'src/app/services/rol-service.service';
import { UserService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userId: number;
  rolId: number;
  name: string;
  active: string;

  public user: User = new User();
  roles: Rol[];
  titleCreate: string = "Crear Usuario";
  titleEdit: string = "Editar Usuario";
  errores: string[];

  constructor(private userService: UserService,
    private rolService: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.userId = 0;
    this.rolId = 0;
    this.name = '';
    this.active = '';
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.userService.getUser(id).subscribe((user) => this.user = user);
      }
    });

    this.rolService.getRegiones().subscribe(roles => this.roles = roles);
  }

  create(): void {
    this.userService.create(this.user)
      .subscribe(
        user => {
          this.router.navigate(['/users']);
          Swal.fire('Nuevo usuario', `El usuario ${user.name} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
        }
      );
  }

  update(): void {
    this.userService.update(this.user)
      .subscribe(
        user => {
          this.router.navigate(['/users']);
          Swal.fire('Usuario Actualizado', `${user.mensaje}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
        }
      )
  }

  comparateRol(o1: Rol, o2: Rol): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
