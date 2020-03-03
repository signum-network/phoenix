import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { LoginGuard } from 'app/login/login-guard.service';
import { BlocksResolver } from './blocks.resolver';
import { BlocksComponent } from './blocks.component';
import { BlockDetailsComponent } from './block-details/block-details.component';
import { BlockResolver } from './block-details/block.resolver';
import {PageModule} from '../../components/page/page.module';
import {BlockRowValueCellComponent} from './block-details/block-row-value-cell/block-row-value-cell.component';
import { ChartsModule } from 'ng2-charts';
import {AppSharedModule} from '../../shared/shared.module';

const routes = [
  {
    path: '',
    component: BlocksComponent,
    canActivate: [LoginGuard],
    resolve: {
      blocks: BlocksResolver
    }
  },
  {
      path     : 'block/:id',
      component: BlockDetailsComponent,
      canActivate: [LoginGuard],
      resolve: {
          block: BlockResolver
      }
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FuseSharedModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
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
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        I18nModule,
        MatDialogModule,
        ChartsModule,
        RouterModule.forChild(routes),
        PageModule,
        AppSharedModule
    ],
  declarations: [
    BlocksComponent,
    BlockDetailsComponent,
    BlockRowValueCellComponent,
  ],
  providers: [
    BlocksResolver,
    BlockResolver
  ]
})
export class BlocksModule { }
