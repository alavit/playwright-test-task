import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindOwnersPage extends BasePage {
    readonly lastNameInput: Locator;
    readonly findOwnerBtn: Locator;
    readonly addOwnerBtn: Locator;
    readonly ownersTable: Locator;
    readonly notFoundMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.findOwnerBtn = page.getByRole('button', { name: 'Find Owner' });
        this.addOwnerBtn = page.getByRole('link', { name: 'Add Owner' });
        this.ownersTable = page.locator('table.table-striped').first();
        this.notFoundMessage = page.getByText('has not been found');
    }

    async goto() {
        await this.navigateTo('/owners/find');
    }

    async searchOwner(lastName: string) {
        await this.lastNameInput.fill(lastName);
        await this.findOwnerBtn.click();
    }
}
