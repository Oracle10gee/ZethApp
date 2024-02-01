import { AbstractControl, ValidatorFn } from '@angular/forms';

export function jsonValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const parsedValue = JSON.parse(control.value);
      if (typeof parsedValue === 'object' && parsedValue !== null) {
        return null;
      } else {
        return { invalidJson: true };
      }
    } catch (e) {
      return { invalidJson: true };
    }
  };
}