import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PreferancesComponent } from './preferances/preferances.component';
import { SecuringComponent } from './securing/securing.component';
import { AccountManagementComponent } from './account-management/account-management.component';


const SETTING_ROUTES: Route[] = [
  { path: "", redirectTo: "preferance", pathMatch: "full"},
  { path: "preferance", component: PreferancesComponent},
  { path: "account-managment", component: AccountManagementComponent},
  { path: "securring", component: SecuringComponent}
]

@NgModule({
  imports: [RouterModule.forChild(SETTING_ROUTES)],
  exports: [RouterModule]
})
export class SettingRouting { }
