import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-filtro-users',
  templateUrl: './filtro-users.component.html',
  styleUrls: ['./filtro-users.component.css']
})
export class FiltroUsersComponent implements OnInit {
  loading: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User[],
    public matDilaogRef: MatDialogRef<FiltroUsersComponent>) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.data = [];
    this.matDilaogRef.close(this.data);
  }

  onCloseClick() {
    this.matDilaogRef.close();
  }


}
