import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RolGuard } from './auth/rol.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { VotosComponent } from './components/votos/votos.component';
import { Role } from './models/role';


const routes: Routes = [
  {path: '',redirectTo:'login' , pathMatch: 'full'},
  {path: 'listas', component: ListsComponent, canActivate:[RolGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'yaviElec', component: VotosComponent},
  {path: 'login', component :LoginComponent},
  {path: 'users', component :UsersComponent, canActivate:[RolGuard]},
  {path: '**', redirectTo: 'dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
