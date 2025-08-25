import { Component, OnInit } from '@angular/core';
import { Referral, MetricCard } from '../models/referral.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  referrals: Referral[] = [
    {
      fullName: 'Sanjay K',
      stage: 'Prospect',
      email: 'sanj@gustr.com',
      plan: 'Motor Insurance',
      premium: 70,
      mobile: '+91-9898123456',
      createdOn: '2019-12-06'
    },
    {
      fullName: 'Gal Gadot',
      stage: 'Customer',
      email: 'gadot@gustr.com',
      plan: 'Team Plan',
      premium: 150,
      mobile: '+91-9898123456',
      createdOn: '2019-12-06'
    },
    {
      fullName: 'Virat Kohli',
      stage: 'Prospect',
      email: 'kohli@gustr.com',
      plan: 'Health Insurance',
      premium: 120,
      mobile: '+91-9898123456',
      createdOn: '2019-12-06'
    },
    {
      fullName: 'Sahin T',
      stage: 'Prospect',
      email: 'ten@gustr.com',
      plan: 'Life Insurance',
      premium: 250,
      mobile: '+91-9898123456',
      createdOn: '2019-12-06'
    },
    {
      fullName: 'Robert D',
      stage: 'Customer',
      email: 'dony@gustr.com',
      plan: 'Family Plan',
      premium: 400,
      mobile: '+91-9898123456',
      createdOn: '2019-12-06'
    }
  ];

  metricCards: MetricCard[] = [];
  entriesPerPage = 10;

  ngOnInit(): void {
    this.calculateMetrics();
  }

  calculateMetrics(): void {
    const prospectCount = this.referrals.filter(r => r.stage === 'Prospect').length;
    const wonCount = this.referrals.filter(r => r.stage === 'Customer').length;
    const lostCount = this.referrals.filter(r => r.stage === 'Lost').length;

    this.metricCards = [
      { label: 'Prospect', value: 10, color: '#4A90E2' },
      { label: 'Won', value: 4, color: '#52C41A' },
      { label: 'Lost', value: 1, color: '#FF4D4F' }
    ];
  }

  onReferralAdded(referral: any): void {
    // Handle new referral addition
    console.log('New referral:', referral);
  }
}