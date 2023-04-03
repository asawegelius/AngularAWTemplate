import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ModalComponent } from './modules/shared/components/modal/modal.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from './modules/core/constants/endpoints';
import { CoreModule } from './modules/core/core.module';
import { SidenavService } from './modules/core/services/sidenav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './reducers/router-serializer';
import { CustomersModule } from './modules/features/customers/customers.module';
import { AccountsPageComponent } from './modules/features/accounts/pages/accounts-page/accounts-page.component';
import { AccountsComponent } from './modules/features/accounts/components/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AccountsPageComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CustomersModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    MatSidenavModule,
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
  ],
  providers: [Endpoints, SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
