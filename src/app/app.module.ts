import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './modules/core/core.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer } from './reducers/router-serializer';
import { ResponsiveSideNavigationModule } from './modules/shared/features/layouts/responsive-side-navigation/responsive-side-navigation.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResponsiveSideNavigationModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
