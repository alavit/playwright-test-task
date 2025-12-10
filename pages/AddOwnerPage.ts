import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { FindOwnersPage } from './FindOwnersPage';
import { OwnerDto } from '../models/OwnerDto';

export class AddOwnerPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly telephoneInput: Locator;
    readonly addOwnerBtn: Locator;
    readonly helpInline: Locator;
    readonly validationErrorShortPhone: Locator;
    readonly validationErrorEmptyName: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.addressInput = page.locator('#address');
        this.cityInput = page.locator('#city');
        this.telephoneInput = page.locator('#telephone');
        this.addOwnerBtn = page.getByRole('button', { name: 'Add Owner' });
        this.helpInline = page.locator('.help-inline');
        this.validationErrorShortPhone = this.helpInline.filter({ hasText: 'Telephone must be a 10-digit number' });
        this.validationErrorEmptyName = this.helpInline.filter({ hasText: 'must not be blank' });
    }

    async goto() {
        const findOwnersPage = new FindOwnersPage(this.page);
        await findOwnersPage.goto();
        await findOwnersPage.addOwnerBtn.click();
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
