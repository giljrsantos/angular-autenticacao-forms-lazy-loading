import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpServie } from './signup.service';


import { debounceTime, switchMap, map, first } from 'rxjs/operators';


@Injectable()
export class UserNotTakenValidatorService{

    constructor(private signUpService: SignUpServie){}

    checkUserNameTaken(){
      return (control: AbstractControl) => {
        return control
          .valueChanges
          .pipe(debounceTime(300))
          .pipe(switchMap(userName =>
              this.signUpService.checUserNameTaken(userName)
          ))
          .pipe(map(isTaken => isTaken ? { userNameTaken: true} : null))
          .pipe(first());
      }
    }
}
