import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TransactionRowValueCellComponent } from 'app/main/transactions/transaction-details/transaction-row-value-cell/transaction-row-value-cell.component';
import { RouterModule } from '@angular/router';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        I18nModule,
        RouterModule.forChild([])
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,
        TimeAgoPipe,
        TransactionRowValueCellComponent
    ],
    declarations: [
        TimeAgoPipe,
        TransactionRowValueCellComponent
    ]
})
export class FuseSharedModule
{
}
