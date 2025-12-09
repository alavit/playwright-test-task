import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { OwnerDto } from '../models/OwnerDto';

export class AddOwnerPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly telephoneInput: Locator;
    readonly addOwnerBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.addressInput = page.locator('#address');
        this.cityInput = page.locator('#city');
        this.telephoneInput = page.locator('#telephone');
        this.addOwnerBtn = page.getByRole('button', { name: 'Add Owner' });
    }

    async goto() {
        await this.navigateTo('/owners/new');
    }

    async addOwner(owner: OwnerDto) {
        await this.firstNameInput.fill(owner.firstName);
        await this.lastNameInput.fill(owner.lastName);
        await this.addressInput.fill(owner.address);
        await this.cityInput.fill(owner.city);
        await this.telephoneInput.fill(owner.telephone);
        await this.addOwnerBtn.click();
    }
}
