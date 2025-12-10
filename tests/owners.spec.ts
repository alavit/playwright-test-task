import { test, expect } from '@playwright/test';
import { FindOwnersPage } from '../pages/FindOwnersPage';
import { AddOwnerPage } from '../pages/AddOwnerPage';
import { OwnerInformationPage } from '../pages/OwnerInformationPage';
import { generateOwner, OwnerBuilder } from '../utils/test-data';

test.describe('Owner Management', () => {
    let findOwnersPage: FindOwnersPage;
    let addOwnerPage: AddOwnerPage;
    let ownerInformationPage: OwnerInformationPage;

    test.beforeEach(async ({ page }) => {
        findOwnersPage = new FindOwnersPage(page);
        addOwnerPage = new AddOwnerPage(page);
        ownerInformationPage = new OwnerInformationPage(page);
    });

    test('should add a new owner', async ({ }) => {
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        await expect(ownerInformationPage.messageOnwerCreated).toBeVisible();
        await expect(ownerInformationPage.ownerInfoTable).toContainText(newOwner.firstName);
        await expect(ownerInformationPage.ownerInfoTable).toContainText(newOwner.lastName);
    });

    test('should be validation error when adding owner with empty name', async ({ page }) => {
        await addOwnerPage.goto();
        const ownerWithEmptyName = new OwnerBuilder().withFirstName('').build();

        await addOwnerPage.addOwner(ownerWithEmptyName);

        await expect(page).toHaveURL('/owners/new');
        await expect(addOwnerPage.validationErrorEmptyName).toBeVisible();
    });

    test('should be validation error when adding owner with phone number less than 10 digits', async ({ page }) => {
        await addOwnerPage.goto();
        const ownerWithShortPhone = new OwnerBuilder().withTelephone('123').build();

        await addOwnerPage.addOwner(ownerWithShortPhone);

        await expect(page).toHaveURL('/owners/new');
        await expect(addOwnerPage.validationErrorShortPhone).toBeVisible();
    });

    test('should find an owner by last name', async ({ }) => {
        await findOwnersPage.goto();

        // Generate and add new owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        await findOwnersPage.goto();
        await findOwnersPage.findOwner(newOwner.lastName);

        await expect(findOwnersPage.ownersTable).toContainText(newOwner.lastName);
    });

    test('should show error when finding non-existent owner', async ({ }) => {
        await findOwnersPage.goto();

        await findOwnersPage.findOwner('NonExistentUser12345');

        await expect(findOwnersPage.notFoundMessage).toBeVisible();
    });
});
