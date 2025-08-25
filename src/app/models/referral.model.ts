export interface Referral {
  fullName: string;
  stage: 'Prospect' | 'Customer' | 'Lost';
  email: string;
  plan: string;
  premium: number;
  mobile: string;
  createdOn: string;
}

export interface MetricCard {
  label: string;
  value: number;
  color: string;
}

export interface NewReferral {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  planType: string;
  premiumAmount: number;
}