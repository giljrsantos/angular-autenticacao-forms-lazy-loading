import { PlatformDetectorService } from './../../app/core/platform-detector.service.ts/platform-detector.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case-validator';
import { NewUser } from './new-user';
import { SignUpServie } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken-validator-service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit{
    signupForm : FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>

    constructor(
      private formBuilder: FormBuilder,
      private userNotTakenValidatorService: UserNotTakenValidatorService,
      private signUpService: SignUpServie,
      private router: Router,
      private platformDetectorService: PlatformDetectorService){}
    ngOnInit(): void {

        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    //Validators.pattern(/^[a-z0-_\-]+$/),
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });

        this.platformDetectorService.isPlatformBrowser() &&
          this.emailInput.nativeElement.focus();
    }

    signup(){
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signUpService
        .signup(newUser)
        .subscribe(
          () => this.router.navigate(['']),
          err => console.log('Error ', err)
        );
    }
}
