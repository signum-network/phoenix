import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliasesComponent } from './aliases.component';
import { AccountsResolver } from '../accounts/accounts.resolver';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatTableModule, MatTabsModule, MatSortModule, MatSelectModule, MatPaginatorModule, MatNativeDateModule, MatInputModule, MatIconModule, MatGridListModule, MatExpansionModule, MatDividerModule, MatDatepickerModule, MatChipsModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'aliases',
    component: AliasesComponent,
    resolve: {
      account: AccountsResolver
    }
  }
];

@NgModule({
  declarations: [AliasesComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    I18nModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class AliasesModule { }
