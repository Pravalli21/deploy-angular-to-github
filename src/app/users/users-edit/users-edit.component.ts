import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

interface User {
  id?: string;
  name: string;
  email: string;
  phoneno: string;
}

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css'],
})
export class UsersEditComponent implements OnInit {
  updatedData: any;
  editForm!: FormGroup;
  userId!: string;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.usersService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        if (user) {
          this.editForm.patchValue(user);
        }
      },
      error: () => {
        this.alertMessage = 'Error loading user!';
        setTimeout(() => (this.alertMessage = ''), 3000);
      },
    });
  }

  updateUser(): void {
    if (this.editForm.valid) {
      this.usersService.updateUser(this.userId, this.editForm.value).subscribe({
        next: () => {
          this.alertMessage = 'User updated successfully!';
          setTimeout(() => (this.alertMessage = ''), 3000);
          // Optionally navigate away after update:
          // this.router.navigate(['/users-list']);
        },
        error: () => {
          this.alertMessage = 'Error updating user!';
          setTimeout(() => (this.alertMessage = ''), 3000);
        },
      });
    }
  }
}
