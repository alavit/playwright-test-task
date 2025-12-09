import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PetDto } from '../models/PetDto';

export class AddPetPage extends BasePage {
    readonly nameInput: Locator;
    readonly birthDateInput: Locator;
    readonly typeSelect: Locator;
    readonly addPetBtn: Locator;
    readonly duplicateError: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('#name');
        this.birthDateInput = page.locator('#birthDate');
        this.typeSelect = page.locator('#type');
        this.addPetBtn = page.getByRole('button', { name: 'Add Pet' });
        this.duplicateError = page.getByText('is already in use');
    }

    async addPet(pet: PetDto) {
        await this.nameInput.fill(pet.name);
        await this.birthDateInput.fill(pet.birthDate);
        await this.typeSelect.selectOption(pet.type);
        await this.addPetBtn.click();
    }
}
