import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TowerDetailsComponent } from './component/tower-details/tower-details.component';

const routes: Routes = [
  { path: 'tower-details/:id', component: TowerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
