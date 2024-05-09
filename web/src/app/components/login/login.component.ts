import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Session from '../../extensions/session';
import { Auth } from '../../models/auth';
import { Token } from '../../models/token';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  protected submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    // Create Auth object from formGroup value
    var auth = new Auth();
    auth.email = this.form.value.email;
    auth.password = this.form.value.password;

    this.authService.auth(auth).subscribe((result) => {
      this.onAuthenticated(result);
    });
  }

  private onAuthenticated(result: Token) {
    Session.setToken(result);
    this.router.navigate(['/home']);
  }
}
