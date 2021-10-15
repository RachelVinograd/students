import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { StudentDetailsComponent } from "./modules/students/student-details/student-details.component";
import { StudentListComponent } from "./modules/students/student-list/student-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const APP_ROUTES: Route[] = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "students-list", component: StudentListComponent },
    { path: "student-details", component: StudentDetailsComponent},
    { path: "student-details/:id", component: StudentDetailsComponent },
    { path: "login", component: LoginComponent},
    { path: "settings", loadChildren: ()=> import("./modules/settings/settings.module").then(m => m.SettingsModule), canActivate: [AuthGuardService]},
    { path: "**", component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class appRoutingModule {

}
