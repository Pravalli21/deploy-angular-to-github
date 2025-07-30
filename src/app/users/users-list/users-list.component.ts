import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService, User } from '../../services/users.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  editForm!: FormGroup;

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.initializeForm();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.error('Error fetching users:', error),
    });
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,
    });
  }

  updateUser(): void {
    if (this.editForm.valid && this.editingUser?.id) {
      const updatedUser = { ...this.editingUser, ...this.editForm.value };
      this.usersService.updateUser(this.editingUser.id, updatedUser).subscribe({
        next: () => {
          this.fetchUsers();
          this.editingUser = null;
        },
        error: (error) => console.error('Error updating user:', error),
      });
    }
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => this.fetchUsers(),
        error: (error) => console.error('Error deleting user:', error),
      });
    }
  }
}
