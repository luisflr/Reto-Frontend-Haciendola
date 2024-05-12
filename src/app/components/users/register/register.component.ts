import { Component, inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {

  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  userService = inject(UsersService);
  hasErrors = false

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  async onSubmit() {
    if ( this.form.value.password !== this.form.value.confirmPassword ) {
      this.hasErrors = true
      console.log(this.hasErrors)

    }
    else {
      const response = await this.userService.register(this.form.value);
      console.log(response)
    }
  }
}
