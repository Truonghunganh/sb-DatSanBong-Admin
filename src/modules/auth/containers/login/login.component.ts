import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from './../../models/auth.model';
import Swal from 'sweetalert2';

import { Admin } from './../../models/auth.model';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup: any;
    error = '';
    a = true;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}
    ngOnInit() {
        
        this.loginFormGroup = this.formBuilder.group({
            phone: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.authService.checkTokenUser().subscribe(
            result => {
                console.log(result);
                
                if (result.status) {
                    this.router.navigate(['/dashboard/quan']);
                }
                
            }
        )
    }
    submit(phone : string, password : string){
        console.log(phone,password);
        const user=new User(phone,password);
        this.authService.login(user).subscribe(result => {
            if (result.status) {
                this.router.navigate(['/dashboard/quan']);
            } else {
                Swal.fire({
                    icon: 'error',
                    text: '"phone or password is false of user!',
                })
            }
           
            
        })
        
    }
}
