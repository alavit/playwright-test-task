import { test, expect } from '@playwright/test';
import { AddOwnerPage } from '../pages/AddOwnerPage';
import { AddPetPage } from '../pages/AddPetPage';
import { AddVisitPage } from '../pages/AddVisitPage';
import { OwnerInformationPage } from '../pages/OwnerInformationPage';
import { generateOwner, generatePet, generateVisit } from '../utils/test-data';
import { PetType } from '../models/PetType';

test.describe('Pet and Visit Management', () => {
    let addOwnerPage: AddOwnerPage;
    let addPetPage: AddPetPage;
    let addVisitPage: AddVisitPage;
    let ownerInformationPage: OwnerInformationPage;

    test.beforeEach(async ({ page }) => {
        addOwnerPage = new AddOwnerPage(page);
        addPetPage = new AddPetPage(page);
        addVisitPage = new AddVisitPage(page);
        ownerInformationPage = new OwnerInformationPage(page);
    });

    test('should add a new pet for an existing owner (Happy Path)', async ({}) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Click Add New Pet
        await ownerInformationPage.addNewPetLink.click();

        // 3. Add Pet
        const newPet = generatePet(newOwner.lastName);
        await addPetPage.addPet(newPet);

        // 4. Verify Pet Added
        await expect(ownerInformationPage.ownerInformationHeader).toBeVisible();
        // Pets and Visits table is the second table
        await expect(ownerInformationPage.petsAndVisitsTable).toContainText(newPet.name);
    });

    test('should add a visit for a pet (Happy Path)', async ({}) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet
        await ownerInformationPage.addNewPetLink.click();
        const newPet = generatePet(newOwner.lastName);
        await addPetPage.addPet(newPet);

        // 3. Add Visit
        await ownerInformationPage.addVisitButtons.first().click(); // Assuming first pet
        const newVisit = generateVisit();
        await addVisitPage.addVisit(newVisit);

        // 4. Verify Visit
        await expect(ownerInformationPage.ownerInformationHeader).toBeVisible();
        await expect(ownerInformationPage.petsAndVisitsTable).toContainText(newVisit.description);
    });

    test('should prevent adding duplicate pet name for same owner (Business Rule)', async ({}) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet
        await ownerInformationPage.addNewPetLink.click();
        const newPet = generatePet(newOwner.lastName);
        await addPetPage.addPet(newPet);

        // 3. Try to Add Same Pet Name Again
        await ownerInformationPage.addNewPetLink.click();
        // Use same name, different birthdate/type just to be sure it's name checking
        await addPetPage.addPet({ ...newPet, type: PetType.CAT });

        // 4. Verify Error
        await expect(addPetPage.duplicateError).toBeVisible();
    });
});
