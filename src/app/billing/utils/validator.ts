import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ArticleService } from "@billing-services/article.service";
import { map } from 'rxjs/operators';

export class MyValidators{

  static NotNullValidatorTwo(input1: string, input2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const c_input1 = control.get(input1)?.value
      const c_input2 = control.get(input2)?.value
      return (c_input1 && c_input1.length > 4) || (c_input2 && c_input2.length > 4) ? null : { NotNullValidatorTwo: true }
    }
  }

  static AvailableCodartArticle(service: ArticleService){
    return (control: AbstractControl) => {
      const codart = control.get('codart')?.value
      return service.isAvailable(codart).pipe(
        map(response => {
          return response.status === 1 ? null : { not_available: true }
        }
      ))
    }
  }

}

export const decimalExchangeRate = '^\d*(?:.\d{0,4})?$';
