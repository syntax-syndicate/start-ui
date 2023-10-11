import { expect, test } from '@playwright/test';
import { getUtils } from 'e2e/utils';
import { randomUUID } from 'node:crypto';

test.describe('Login flow', () => {
  test('Login as admin', async ({ page }) => {
    const utils = getUtils(page);

    await utils.loginAsAdmin();

    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 2 })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  });

  test('Login as user', async ({ page }) => {
    const utils = getUtils(page);

    await utils.loginAsUser();

    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 2 })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
  });

  test('Login with a wrong code', async ({ page }) => {
    const utils = getUtils(page);

    await utils.login({ email: 'admin@admin.com', code: '111111' });

    await expect(page.getByText('Code is invalid')).toBeVisible();
  });

  test('Login with a wrong email', async ({ page }) => {
    const utils = getUtils(page);

    const randomId = await randomUUID();
    const email = `${randomId}@example.com`;

    await utils.login({ email });

    await expect(page.getByText('Code is invalid')).toBeVisible();
  });
});
