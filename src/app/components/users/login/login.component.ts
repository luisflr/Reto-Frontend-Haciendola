import { Component, inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    })
  }

  async onSubmit() {
    const response = await this.userService.login(this.form.value);
  }
}
