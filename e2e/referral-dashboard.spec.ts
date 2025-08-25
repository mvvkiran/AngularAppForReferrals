import { test, expect, Page } from '@playwright/test';

test.describe('Referral Dashboard Visual Tests', () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the correct header', async () => {
    // Check for dark blue header bar
    const header = await page.locator('.header');
    await expect(header).toBeVisible();
    
    // Verify header background color
    const headerColor = await header.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(headerColor).toBe('rgb(30, 58, 95)'); // #1e3a5f
  });

  test('should display company information correctly', async () => {
    // Check company name
    const companyName = await page.locator('.company-name');
    await expect(companyName).toBeVisible();
    await expect(companyName).toHaveText('LeadSquared');
    
    // Check company tagline
    const tagline = await page.locator('.company-tagline');
    await expect(tagline).toBeVisible();
    await expect(tagline).toHaveText('ABC Insurance Agency Portal');
  });

  test('should display My Referrals section with action buttons', async () => {
    // Check section title
    const sectionTitle = await page.locator('.section-title');
    await expect(sectionTitle).toBeVisible();
    await expect(sectionTitle).toHaveText('My Referrals');
    
    // Check action buttons
    const buttons = await page.locator('.action-buttons button').all();
    expect(buttons).toHaveLength(3);
    
    await expect(buttons[0]).toHaveText('Raise Query');
    await expect(buttons[1]).toHaveText('My Incentive');
    await expect(buttons[2]).toHaveText('Add New Referrals');
    
    // Verify button styling
    for (const button of buttons) {
      const bgColor = await button.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBe('rgb(66, 133, 244)'); // #4285f4
    }
  });

  test('should display metric cards with correct values and colors', async () => {
    const metricCards = await page.locator('.metric-card').all();
    expect(metricCards).toHaveLength(3);
    
    // Check Prospect card
    const prospectLabel = await metricCards[0].locator('.metric-label');
    await expect(prospectLabel).toHaveText('Prospect');
    const prospectValue = await metricCards[0].locator('.metric-value');
    await expect(prospectValue).toHaveText('10');
    const prospectColor = await prospectLabel.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    expect(prospectColor).toBe('rgb(74, 144, 226)'); // #4A90E2
    
    // Check Won card
    const wonLabel = await metricCards[1].locator('.metric-label');
    await expect(wonLabel).toHaveText('Won');
    const wonValue = await metricCards[1].locator('.metric-value');
    await expect(wonValue).toHaveText('4');
    const wonColor = await wonLabel.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    expect(wonColor).toBe('rgb(82, 196, 26)'); // #52C41A
    
    // Check Lost card
    const lostLabel = await metricCards[2].locator('.metric-label');
    await expect(lostLabel).toHaveText('Lost');
    const lostValue = await metricCards[2].locator('.metric-value');
    await expect(lostValue).toHaveText('1');
    const lostColor = await lostLabel.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    expect(lostColor).toBe('rgb(255, 77, 79)'); // #FF4D4F
  });

  test('should display referral table with correct data', async () => {
    // Check table headers
    const headers = await page.locator('.referral-table thead th').allTextContents();
    expect(headers).toEqual([
      'Full name',
      'stage',
      'Email',
      'Plan',
      'Premium',
      'mobile#',
      'Created on'
    ]);
    
    // Check table rows
    const rows = await page.locator('.referral-table tbody tr').all();
    expect(rows).toHaveLength(5);
    
    // Verify first row data
    const firstRowCells = await rows[0].locator('td').allTextContents();
    expect(firstRowCells[0]).toBe('Sanjay K');
    expect(firstRowCells[1]).toContain('Prospect');
    expect(firstRowCells[2]).toBe('sanj@gustr.com');
    expect(firstRowCells[3]).toBe('Motor Insurance');
    expect(firstRowCells[4]).toBe('$70');
    expect(firstRowCells[5]).toBe('+91-9898123456');
    expect(firstRowCells[6]).toBe('2019-12-06');
    
    // Check stage badges styling
    const stageBadges = await page.locator('.stage-badge').all();
    for (const badge of stageBadges) {
      const text = await badge.textContent();
      const bgColor = await badge.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      if (text === 'Prospect') {
        expect(bgColor).toBe('rgb(227, 242, 253)'); // #e3f2fd
      } else if (text === 'Customer') {
        expect(bgColor).toBe('rgb(232, 245, 233)'); // #e8f5e9
      }
    }
  });

  test('should display entries selector dropdown', async () => {
    const entriesSelector = await page.locator('.entries-selector');
    await expect(entriesSelector).toBeVisible();
    
    const label = await entriesSelector.locator('span');
    await expect(label).toHaveText('Show entries');
    
    const dropdown = await entriesSelector.locator('select');
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toHaveValue('10');
    
    // Check dropdown options
    const options = await dropdown.locator('option').allTextContents();
    expect(options).toEqual(['10', '25', '50', '100']);
  });

  test('should display Add New Referral form on the right side', async () => {
    const formContainer = await page.locator('.add-referral-form');
    await expect(formContainer).toBeVisible();
    
    // Check form title
    const formTitle = await formContainer.locator('.form-title');
    await expect(formTitle).toHaveText('Add New Referral');
    
    // Check form fields
    const inputs = await formContainer.locator('input').all();
    expect(inputs).toHaveLength(4);
    
    // Verify placeholders
    await expect(inputs[0]).toHaveAttribute('placeholder', 'First Name');
    await expect(inputs[1]).toHaveAttribute('placeholder', 'Last Name');
    await expect(inputs[2]).toHaveAttribute('placeholder', 'Mobile Number');
    await expect(inputs[3]).toHaveAttribute('placeholder', 'Email');
    
    // Check dropdowns
    const selects = await formContainer.locator('select').all();
    expect(selects).toHaveLength(2);
    
    // Check Save button
    const saveButton = await formContainer.locator('.btn-save');
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toHaveText('Save');
    
    // Verify button is disabled initially
    const isDisabled = await saveButton.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('should match overall layout and styling', async () => {
    // Check main container layout
    const mainContent = await page.locator('.main-content');
    await expect(mainContent).toBeVisible();
    
    // Check two-column layout
    const leftSection = await page.locator('.left-section');
    const rightSection = await page.locator('.right-section');
    
    await expect(leftSection).toBeVisible();
    await expect(rightSection).toBeVisible();
    
    // Verify background colors
    const bodyBgColor = await page.evaluate(() => 
      window.getComputedStyle(document.body).backgroundColor
    );
    expect(bodyBgColor).toBe('rgb(240, 242, 245)'); // #f0f2f5
    
    const leftBgColor = await leftSection.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(leftBgColor).toBe('rgb(255, 255, 255)'); // white
    
    const rightBgColor = await rightSection.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(rightBgColor).toBe('rgb(232, 240, 254)'); // #e8f0fe
  });

  test('should enable Save button when form is filled', async () => {
    const formContainer = await page.locator('.add-referral-form');
    
    // Fill in the form
    await formContainer.locator('input[placeholder="First Name"]').fill('John');
    await formContainer.locator('input[placeholder="Last Name"]').fill('Doe');
    await formContainer.locator('input[placeholder="Mobile Number"]').fill('+1234567890');
    await formContainer.locator('input[placeholder="Email"]').fill('john.doe@example.com');
    
    // Check if Save button is enabled
    const saveButton = await formContainer.locator('.btn-save');
    const isDisabled = await saveButton.isDisabled();
    expect(isDisabled).toBe(false);
  });

  test('should take full page screenshot for visual comparison', async () => {
    // Wait for all elements to be visible
    await page.waitForSelector('.metric-card', { state: 'visible' });
    await page.waitForSelector('.referral-table', { state: 'visible' });
    await page.waitForSelector('.add-referral-form', { state: 'visible' });
    
    // Take screenshot
    await expect(page).toHaveScreenshot('referral-dashboard-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match component-level visual snapshots', async () => {
    // Header screenshot
    const header = await page.locator('.header');
    await expect(header).toHaveScreenshot('header.png');
    
    // Metric cards screenshot
    const metricCards = await page.locator('.metric-cards');
    await expect(metricCards).toHaveScreenshot('metric-cards.png');
    
    // Table screenshot
    const table = await page.locator('.referral-table');
    await expect(table).toHaveScreenshot('referral-table.png');
    
    // Form screenshot
    const form = await page.locator('.add-referral-form');
    await expect(form).toHaveScreenshot('add-referral-form.png');
  });
});