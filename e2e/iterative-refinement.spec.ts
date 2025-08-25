import { test, expect } from '@playwright/test';

test.describe('Iterative UI Refinement Tests', () => {
  
  test('Agentic Loop: Refine UI to match target', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const mismatches: string[] = [];
    
    // Test 1: Header appearance
    const header = await page.locator('.header');
    const headerHeight = await header.evaluate(el => el.offsetHeight);
    if (headerHeight !== 50) {
      mismatches.push(`Header height is ${headerHeight}px, should be 50px`);
    }
    
    // Test 2: Company name styling
    const companyName = await page.locator('.company-name');
    const companyNameText = await companyName.textContent();
    if (companyNameText !== 'LeadSquared') {
      mismatches.push(`Company name is "${companyNameText}", should be "LeadSquared"`);
    }
    
    // Test 3: Metric cards layout
    const metricCards = await page.locator('.metric-card').all();
    if (metricCards.length !== 3) {
      mismatches.push(`Found ${metricCards.length} metric cards, should be 3`);
    }
    
    // Test 4: Metric values
    const metricValues = {
      'Prospect': '10',
      'Won': '4',
      'Lost': '1'
    };
    
    for (let i = 0; i < metricCards.length; i++) {
      const label = await metricCards[i].locator('.metric-label').textContent();
      const value = await metricCards[i].locator('.metric-value').textContent();
      
      if (label && metricValues[label as keyof typeof metricValues] !== value) {
        mismatches.push(`${label} value is ${value}, should be ${metricValues[label as keyof typeof metricValues]}`);
      }
    }
    
    // Test 5: Table data accuracy
    const tableRows = await page.locator('.referral-table tbody tr').all();
    const expectedRows = 5;
    if (tableRows.length !== expectedRows) {
      mismatches.push(`Table has ${tableRows.length} rows, should have ${expectedRows}`);
    }
    
    // Test 6: Form elements
    const formInputs = await page.locator('.add-referral-form input').all();
    const expectedInputs = 4;
    if (formInputs.length !== expectedInputs) {
      mismatches.push(`Form has ${formInputs.length} inputs, should have ${expectedInputs}`);
    }
    
    // Test 7: Button states
    const saveButton = await page.locator('.btn-save');
    const isDisabled = await saveButton.isDisabled();
    if (!isDisabled) {
      mismatches.push('Save button should be disabled initially');
    }
    
    // Test 8: Color accuracy
    const colorTests = [
      { element: '.stage-prospect', property: 'backgroundColor', expected: 'rgb(227, 242, 253)' },
      { element: '.stage-customer', property: 'backgroundColor', expected: 'rgb(232, 245, 233)' },
    ];
    
    for (const test of colorTests) {
      const element = await page.locator(test.element).first();
      if (await element.count() > 0) {
        const actualColor = await element.evaluate((el, prop) => 
          window.getComputedStyle(el)[prop as any],
          test.property
        );
        if (actualColor !== test.expected) {
          mismatches.push(`${test.element} ${test.property} is ${actualColor}, should be ${test.expected}`);
        }
      }
    }
    
    // Test 9: Layout structure
    const leftSection = await page.locator('.left-section');
    const rightSection = await page.locator('.right-section');
    
    const leftSectionVisible = await leftSection.isVisible();
    const rightSectionVisible = await rightSection.isVisible();
    
    if (!leftSectionVisible) {
      mismatches.push('Left section is not visible');
    }
    if (!rightSectionVisible) {
      mismatches.push('Right section is not visible');
    }
    
    // Test 10: Entries selector
    const entriesDropdown = await page.locator('.entries-dropdown');
    const dropdownValue = await entriesDropdown.inputValue();
    if (dropdownValue !== '10') {
      mismatches.push(`Entries dropdown value is ${dropdownValue}, should be 10`);
    }
    
    // Report mismatches
    if (mismatches.length > 0) {
      console.log('UI Mismatches Found:');
      mismatches.forEach((mismatch, index) => {
        console.log(`${index + 1}. ${mismatch}`);
      });
      
      // Generate refinement suggestions
      console.log('\n--- Refinement Suggestions ---');
      if (mismatches.some(m => m.includes('Header height'))) {
        console.log('• Adjust .header height in dashboard.component.css to 50px');
      }
      if (mismatches.some(m => m.includes('metric cards'))) {
        console.log('• Verify metricCards array in dashboard.component.ts');
      }
      if (mismatches.some(m => m.includes('color'))) {
        console.log('• Update color values in component CSS files');
      }
      
      // Fail the test to trigger refinement
      expect(mismatches.length).toBe(0);
    } else {
      console.log('✅ UI matches target perfectly!');
    }
  });
  
  test('Visual Pixel Comparison', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Wait for stability
    await page.waitForTimeout(1000);
    
    // Take screenshot for comparison
    await expect(page).toHaveScreenshot('final-comparison.png', {
      maxDiffPixels: 50,
      threshold: 0.1,
      animations: 'disabled',
    });
  });
});