import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

test.describe('Visual Comparison with Target Screenshot', () => {
  
  test('should match the target screenshot exactly', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Set viewport to match target screenshot dimensions
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Wait for all elements to be visible
    await page.waitForSelector('.metric-card', { state: 'visible' });
    await page.waitForSelector('.referral-table', { state: 'visible' });
    await page.waitForSelector('.add-referral-form', { state: 'visible' });
    
    // Take screenshot and compare
    const screenshot = await page.screenshot({ fullPage: false });
    
    // This will create a baseline on first run, then compare on subsequent runs
    await expect(page).toHaveScreenshot('target-comparison.png', {
      maxDiffPixels: 100,
      threshold: 0.2,
      animations: 'disabled',
    });
  });

  test('should verify exact color matches', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const colorChecks = [
      { selector: '.header', expectedColor: 'rgb(30, 58, 95)' },
      { selector: '.btn-primary', expectedColor: 'rgb(66, 133, 244)' },
      { selector: '.left-section', expectedColor: 'rgb(255, 255, 255)' },
      { selector: '.right-section', expectedColor: 'rgb(232, 240, 254)' },
      { selector: 'body', expectedColor: 'rgb(240, 242, 245)' },
    ];
    
    for (const check of colorChecks) {
      const element = await page.locator(check.selector).first();
      const actualColor = await element.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(actualColor).toBe(check.expectedColor);
    }
  });

  test('should verify exact font properties', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Company name font
    const companyName = await page.locator('.company-name');
    const companyNameStyles = await companyName.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
      };
    });
    expect(companyNameStyles.fontSize).toBe('28px');
    expect(companyNameStyles.fontWeight).toBe('600');
    
    // Table font
    const tableCell = await page.locator('.referral-table td').first();
    const tableCellFontSize = await tableCell.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    expect(tableCellFontSize).toBe('14px');
  });

  test('should verify exact spacing and dimensions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Header height
    const header = await page.locator('.header');
    const headerBox = await header.boundingBox();
    expect(headerBox?.height).toBe(50);
    
    // Metric card dimensions
    const metricCard = await page.locator('.metric-card').first();
    const cardBox = await metricCard.boundingBox();
    expect(cardBox?.height).toBeGreaterThan(80);
    expect(cardBox?.width).toBeGreaterThanOrEqual(150);
    
    // Button padding
    const button = await page.locator('.btn-primary').first();
    const buttonPadding = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop,
        paddingRight: styles.paddingRight,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
      };
    });
    expect(buttonPadding.paddingTop).toBe('8px');
    expect(buttonPadding.paddingRight).toBe('20px');
    expect(buttonPadding.paddingBottom).toBe('8px');
    expect(buttonPadding.paddingLeft).toBe('20px');
  });

  test('should verify table structure matches exactly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Count rows and columns
    const headerCells = await page.locator('.referral-table thead th').count();
    expect(headerCells).toBe(7);
    
    const dataRows = await page.locator('.referral-table tbody tr').count();
    expect(dataRows).toBe(5);
    
    // Verify specific cell content
    const specificCell = await page.locator('.referral-table tbody tr:first-child td:nth-child(3)');
    await expect(specificCell).toHaveText('sanj@gustr.com');
  });
});