import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FiltroUsersComponent } from '../filtro-users/filtro-users.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  search: string;
  users: User[];
  paginador: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog, private router: Router) {
    this.search = '';
    this.users = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.userService.getUsers(page)
        .subscribe(response => {
          this.users = response.content as User[];
          this.paginador = response;
        });
    });
  }

  clearSearch() {
    this.search = '';
  }

  deleteUser(user: User): void {
    Swal.fire({
      title: 'Estas seguro de eliminar el usuario?',
      text: 'Una ves eliminado no hay manera de recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No, mantener usuario'
    }).then((result) => {
      if (result.value) {

        this.userService.delete(user.id).subscribe(
          () => {
            this.users = this.users.filter(cli => cli !== user)
            Swal.fire(
              'Eliminado!',
              'Se ha eliminado con exito el usuario!',
              'success'
            );
            this.router.navigate(['/users']);
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  searchUser(search: string) {
    if (search == '') {


      this.userService.getAllUser().subscribe(users => {
        if (users.length > 0) {
          this.matDialog.open(FiltroUsersComponent, {
            data: users
          });
        } else {
          Swal.fire(
            'Error',
            'Señor actualmente no existen registros disponibles',
            'warning'
          );
        }
      });
    } else {
      this.userService.getUsersByName(search).subscribe(userFilters => {
        if (userFilters.length > 0) {
          this.matDialog.open(FiltroUsersComponent, {
            data: userFilters
          });
        } else {
          Swal.fire(
            'Error',
            'Señor usuario no existe registros con ese nombre',
            'warning'
          );
        }
      });
    }
  }
}


