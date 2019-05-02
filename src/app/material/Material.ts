import {MatButtonModule,MatBadgeModule, MatCheckboxModule,MatCardModule, MatInputModule,MatDialogModule,MatProgressSpinnerModule,MatTableModule,MatPaginatorModule, MatSortModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule,MatBadgeModule, MatCheckboxModule,MatCardModule,MatInputModule,MatDialogModule,MatProgressSpinnerModule,MatTableModule,MatPaginatorModule,MatSortModule,MatDatepickerModule,MatNativeDateModule],
  exports: [MatButtonModule,MatBadgeModule, MatCheckboxModule,MatCardModule,MatInputModule,MatDialogModule,MatProgressSpinnerModule,MatTableModule,MatPaginatorModule,MatSortModule,MatDatepickerModule,MatNativeDateModule],
})
export class Material { }