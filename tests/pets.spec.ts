import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddOwnerPage } from '../pages/AddOwnerPage';
import { AddPetPage } from '../pages/AddPetPage';
import { AddVisitPage } from '../pages/AddVisitPage';
import { OwnerInformationPage } from '../pages/OwnerInformationPage';
import { generateOwner, generatePet, generateVisit, PetBuilder, VisitBuilder } from '../utils/test-data';

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

    test('should add a new pet for an existing owner', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Click Add New Pet
        await ownerInformationPage.addNewPetLink.click();

        // 3. Add Pet
        const newPet = generatePet();
        await addPetPage.addPet(newPet);

        // 4. Verify Pet Added
        await expect(page).toHaveURL(/\/owners\/\d+$/);
        await expect(ownerInformationPage.messagePetCreated).toBeVisible();
        await expect(ownerInformationPage.petsAndVisitsTable).toContainText(newPet.name);
    });

    test('should prevent adding duplicate pet name for same owner', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet
        await ownerInformationPage.addNewPetLink.click();
        const newPet = generatePet();
        await addPetPage.addPet(newPet);

        // 3. Try to Add Same Pet Name Again
        await ownerInformationPage.addNewPetLink.click();
        // Use same name, different birthdate/type just to be sure it's name checking
        const duplicatePet = new PetBuilder()
            .withName(newPet.name)
            .build();

        await addPetPage.addPet(duplicatePet);

        // 4. Verify Error
        await expect(page).toHaveURL(/\/owners\/\d+\/pets\/new/);
        await expect(addPetPage.errorPetDuplicate).toBeVisible();
    });

    test('should be validation error when adding pet with empty name', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet With Empty Name
        await ownerInformationPage.addNewPetLink.click();
        const newPet = new PetBuilder().withName('').build();
        await addPetPage.addPet(newPet);

        // 3. Verify Error
        await expect(page).toHaveURL(/\/owners\/\d+\/pets\/new/);
        await expect(addPetPage.errorIsRequired).toBeVisible();
    });

    test('should be validation error when adding pet with empty birthdate', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet With Empty Birthdate
        await ownerInformationPage.addNewPetLink.click();
        const newPet = new PetBuilder().withBirthDate('').build();
        await addPetPage.addPet(newPet);

        // 3. Verify Error
        await expect(page).toHaveURL(/\/owners\/\d+\/pets\/new/);
        await expect(addPetPage.errorIsRequired).toBeVisible();
    });

    test('should be validation error when adding pet with birthdate in future', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet With Future BirthDate
        await ownerInformationPage.addNewPetLink.click();
        const futureDate = faker.date.future().toISOString().split('T')[0];
        const newPet = new PetBuilder().withBirthDate(futureDate).build();
        await addPetPage.addPet(newPet);

        // 3. Verify Error
        await expect(page).toHaveURL(/\/owners\/\d+\/pets\/new/);
        await expect(addPetPage.errorPetHasInvalidBirthdate).toBeVisible();
    });

    test('should add a visit for a pet', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet
        await ownerInformationPage.addNewPetLink.click();
        const newPet = generatePet();
        await addPetPage.addPet(newPet);

        // 3. Add Visit
        await ownerInformationPage.addVisitButtons.first().click(); // Assuming first pet
        const newVisit = generateVisit();
        await addVisitPage.addVisit(newVisit);

        // 4. Verify Visit
        await expect(page).toHaveURL(/\/owners\/\d+$/);
        await expect(ownerInformationPage.petsAndVisitsTable).toContainText(newVisit.description);
    });

    test('should be validation error when adding visit with empty description', async ({ page }) => {
        // 1. Create Owner
        const newOwner = generateOwner();
        await addOwnerPage.goto();
        await addOwnerPage.addOwner(newOwner);

        // 2. Add Pet
        await ownerInformationPage.addNewPetLink.click();
        const newPet = generatePet();
        await addPetPage.addPet(newPet);

        // 3. Add Visit With Empty Description
        await ownerInformationPage.addVisitButtons.first().click(); // Assuming first pet
        const newVisit = new VisitBuilder().withDescription('').build();
        await addVisitPage.addVisit(newVisit);

        // 4. Verify Error
        await expect(page).toHaveURL(/\/owners\/\d+\/pets\/\d+\/visits\/new/);
        await expect(addVisitPage.errorMustNotBeBlank).toBeVisible();
    });
});
