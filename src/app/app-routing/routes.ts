import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: 'contactus', component: ContactComponent },
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// export const appRouting = RouterModule.forRoot(routes);