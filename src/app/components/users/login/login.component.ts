import { Component, inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  form: FormGroup;
  hidePassword = true;
  userService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    const response = await this.userService.login(this.form.value);
    if (!response.error) {
      console.log(response.token)
      localStorage.setItem('user-access', response.token);
      this.router.navigate(['/products']);
    }
  }
}
