import { Component, Input } from '@angular/core';
import { Referral } from '../models/referral.model';

@Component({
  selector: 'app-referral-table',
  templateUrl: './referral-table.component.html',
  styleUrls: ['./referral-table.component.css']
})
export class ReferralTableComponent {
  @Input() referrals: Referral[] = [];
  @Input() entriesPerPage: number = 10;
}