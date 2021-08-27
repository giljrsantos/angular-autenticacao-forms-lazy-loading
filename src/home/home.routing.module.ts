
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { HomeComponent } from './home.componente';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './singup/signup.component';


const routes: Routes = [

    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: SigninComponent,
        },
        {
            path: 'signup',
            component: SignupComponent,
        },
      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

