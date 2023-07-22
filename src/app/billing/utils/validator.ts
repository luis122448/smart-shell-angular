import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MyValidators{

  // static ValidSearchCliente(control: AbstractControl){
  //   const codbuspar: string = control.get('codbuspar')?.value
  //   const busnam: string = control.get('busnam')?.value
  //   if (codbuspar.length > 4 || busnam.length > 4){
  //     return null
  //   }
  //   return { not_null_two: true }
  // }

  static NotNullValidatorTwo(input1: string, input2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const c_input1 = control.get(input1)?.value
      const c_input2 = control.get(input2)?.value
      return (c_input1 && c_input1.length > 4) || (c_input2 && c_input2.length > 4) ? null : { NotNullValidatorTwo: true }
    }
  }
}

export const decimalExchangeRate = '^\d*(?:.\d{0,4})?$';
