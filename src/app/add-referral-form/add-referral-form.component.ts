import { Component, EventEmitter, Output } from '@angular/core';
import { NewReferral } from '../models/referral.model';

@Component({
  selector: 'app-add-referral-form',
  templateUrl: './add-referral-form.component.html',
  styleUrls: ['./add-referral-form.component.css']
})
export class AddReferralFormComponent {
  @Output() referralAdded = new EventEmitter<NewReferral>();

  newReferral: NewReferral = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    planType: '',
    premiumAmount: 0
  };

  planTypes = [
    'Motor Insurance',
    'Health Insurance',
    'Life Insurance',
    'Team Plan',
    'Family Plan'
  ];

  premiumAmounts = [
    { label: '$50 - $100', value: 50 },
    { label: '$100 - $200', value: 100 },
    { label: '$200 - $500', value: 200 },
    { label: '$500+', value: 500 }
  ];

  onSubmit(): void {
    if (this.isFormValid()) {
      this.referralAdded.emit(this.newReferral);
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    return !!(this.newReferral.firstName && 
              this.newReferral.lastName && 
              this.newReferral.email && 
              this.newReferral.mobileNumber);
  }

  resetForm(): void {
    this.newReferral = {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      planType: '',
      premiumAmount: 0
    };
  }
}