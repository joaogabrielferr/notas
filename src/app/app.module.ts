import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { foldersReducer } from './features/folders/state/folders.reducer';
import { FoldersEffects } from './features/folders/state/folders.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({folders : foldersReducer}),
    EffectsModule.forRoot([FoldersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:false,
      autoPause:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
