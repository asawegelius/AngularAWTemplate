import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './reducers/router-serializer';
import { CustomersModule } from './modules/features/customers/customers.module';
import { MatListModule } from '@angular/material/list';
import { Endpoints } from './modules/core/features/API/utils/endpoints';
import { AccountsModule } from './modules/features/accounts/accounts.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatButtonModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CustomersModule,
    AccountsModule,
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
  providers: [Endpoints],
  bootstrap: [AppComponent]
})
export class AppModule { }
