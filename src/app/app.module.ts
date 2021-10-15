import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { studentsModules } from './modules/students/students.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { appRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, studentsModules, appRoutingModule],
    declarations: [AppComponent, HomeComponent, PageNotFoundComponent, LoginComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
