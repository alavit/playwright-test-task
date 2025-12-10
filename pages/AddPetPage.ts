import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PetDto } from '../models/PetDto';

export class AddPetPage extends BasePage {
    readonly nameInput: Locator;
    readonly birthDateInput: Locator;
    readonly typeSelect: Locator;
    readonly addPetBtn: Locator;
    readonly helpInline: Locator;
    readonly errorPetDuplicate: Locator;
    readonly errorIsRequired: Locator;
    readonly errorPetHasInvalidBirthdate: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('#name');
        this.birthDateInput = page.locator('#birthDate');
        this.typeSelect = page.locator('#type');
        this.addPetBtn = page.getByRole('button', { name: 'Add Pet' });
        this.helpInline = page.locator('.help-inline');
        this.errorPetDuplicate = this.helpInline.filter({ hasText: 'is already in use' });
        this.errorIsRequired = this.helpInline.filter({ hasText: 'is required' });
        this.errorPetHasInvalidBirthdate = this.helpInline.filter({ hasText: 'invalid date' });
    }

    async addPet(pet: PetDto) {
        await this.nameInput.fill(pet.name);
        await this.birthDateInput.fill(pet.birthDate);
        await this.typeSelect.selectOption(pet.type);
        await this.addPetBtn.click();
    }
}
