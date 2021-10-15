import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferancesComponent } from './preferances/preferances.component';
import { SecuringComponent } from './securing/securing.component';
import { SettingRouting } from './setting-routing.module';
import { AccountManagementComponent } from './account-management/account-management.component';



@NgModule({
  declarations: [PreferancesComponent, SecuringComponent, AccountManagementComponent],
  imports: [
    CommonModule, SettingRouting
  ]
})
export class SettingsModule { }
