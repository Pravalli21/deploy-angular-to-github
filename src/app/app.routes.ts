import { Routes } from '@angular/router';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users-list', pathMatch: 'full' }, // Default route
  { path: 'users-list', component: UsersListComponent }, // Route for Users List
  { path: 'users-add', component: UsersAddComponent }, // Route for Add User
  { path: 'users-edit', component: UsersEditComponent }, // Route for Edit User
];
