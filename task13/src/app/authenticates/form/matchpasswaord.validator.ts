import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null=> {
    let password = control.get('password')
    let cpassword = control.get('password_confirmation')
    if(password && cpassword && password?.value !== cpassword?.value){
        return {
            passwordmatcherror : true
        }
    }
    return null;
}