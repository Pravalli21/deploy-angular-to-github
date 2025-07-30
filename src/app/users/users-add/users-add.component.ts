import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';

interface User {
  id?: string;
  name: string;
  email: string;
  phoneno: string;
}

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
})
export class UsersAddComponent implements OnInit {
  userForm!: FormGroup;
  submittedData: User | null = null;

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }
  alertMessage: string = '';

  submitForm(): void {
    if (this.userForm.valid) {
      this.usersService.addUser(this.userForm.value).subscribe({
        next: (response: User) => {
          this.submittedData = response;
          this.alertMessage = 'User added successfully!';
          this.userForm.reset();
          setTimeout(() => (this.alertMessage = ''), 3000);
        },
        error: (error: any) => {
          this.alertMessage = 'Error adding user!';
          setTimeout(() => (this.alertMessage = ''), 3000);
        },
      });
    }
  }
  deleteUser(userId: string): void {
    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.alertMessage = 'User deleted successfully!';
        setTimeout(() => (this.alertMessage = ''), 3000);
      },
      error: () => {
        this.alertMessage = 'Error deleting user!';
        setTimeout(() => (this.alertMessage = ''), 3000);
      },
    });
  }
}
