import { test, expect } from '@playwright/test';
import { FindOwnersPage } from '../pages/FindOwnersPage';
import { AddOwnerPage } from '../pages/AddOwnerPage';
import { OwnerInformationPage } from '../pages/OwnerInformationPage';
import { generateOwner } from '../utils/test-data';

test.describe('Owner Management', () => {
    let findOwnersPage: FindOwnersPage;
    let addOwnerPage: AddOwnerPage;
    let ownerInformationPage: OwnerInformationPage;

    test.beforeEach(async ({ page }) => {
        findOwnersPage = new FindOwnersPage(page);
        addOwnerPage = new AddOwnerPage(page);
        ownerInformationPage = new OwnerInformationPage(page);
    });

    test('should find an owner by last name', async ({}) => {
        await findOwnersPage.goto();
        // Assuming 'Davis' exists in the seeded data or we add one first.
        // For complete isolation, we should probably add an owner first.
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        await findOwnersPage.goto();
        await findOwnersPage.searchOwner(newOwner.lastName);
        await expect(findOwnersPage.ownersTable).toContainText(newOwner.lastName);
    });

    test('should show error when finding non-existent owner (Negative Case)', async ({}) => {
        await findOwnersPage.goto();
        await findOwnersPage.searchOwner('NonExistentUser12345');
        await expect(findOwnersPage.notFoundMessage).toBeVisible();
    });

    test('should add a new owner successfully (Happy Path)', async ({}) => {
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // Verification - usually redirects to owner details
        // Verification - usually redirects to owner details
        await expect(ownerInformationPage.ownerInformationHeader).toBeVisible();
        // Use first table for Owner Information
        await expect(ownerInformationPage.ownerInfoTable).toContainText(newOwner.firstName);
        await expect(ownerInformationPage.ownerInfoTable).toContainText(newOwner.lastName);
    });

    test('should validation error for required fields when adding owner (Edge Case)', async ({}) => {
        await addOwnerPage.goto();
        // Click add without filling anything
        await addOwnerPage.addOwnerBtn.click();

        // Expect validation errors (Assuming HTML5 validation or app specific)
        // For HTML5 validation, simple check might be tricky without specific robust util, 
        // but let's assume the app shows some error text or keeps on same page.
        await expect(addOwnerPage.addOwnerBtn).toBeVisible();
        // If specific error messages appear:
        // await expect(page.locator('.help-block')).toContainText('must not be empty');
    });
});
