import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SetupRouting } from './setup.routing';
import { AccountNewComponent } from './account/account.component';
import { CreatePassiveAccountComponent } from './account/create-passive/create-passive.component';
import { CreateActiveAccountComponent } from './account/create-active/create.component';
import { AccountCreatePinComponent } from './account/create-active/pin/pin.component';
import { AccountCreateRecordComponent } from './account/create-active/record/record.component';
import { AccountCreateSeedComponent } from './account/create-active/seed/seed.component';

import { CreateService } from './account/create.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { I18nModule } from '../layout/components/i18n/i18n.module';
import { NgxMaskModule } from 'ngx-mask';
import { AccountCreateExistingComponent } from './account/create-active/existing/existing.component';
import { AccountResolver } from './account/account.resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import {PageModule} from '../components/page/page.module';
import {AccountActivateComponent} from './account/create-active/activate/activate.component';
import {AppSharedModule} from '../shared/shared.module';
import {MatCheckboxModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatStepperModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        SetupRouting,
        FormsModule,
        I18nModule,
        NgxMaskModule.forRoot(),
        MatTooltipModule,
        PageModule,
        AppSharedModule,
        MatCheckboxModule,
    ],
    declarations: [
        CreateActiveAccountComponent,
        CreatePassiveAccountComponent,
        AccountCreatePinComponent,
        AccountCreateRecordComponent,
        AccountCreateExistingComponent,
        AccountCreateSeedComponent,
        AccountNewComponent,
        AccountActivateComponent,
    ],
    providers: [
        CreateService,
        AccountResolver
    ],
    exports: [
        AccountNewComponent,
        CreateActiveAccountComponent,
        CreatePassiveAccountComponent
    ]
})
export class SetupModule { }
