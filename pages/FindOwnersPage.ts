import { Page, Locator } from '@playwright/test';
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
        this.notFoundMessage = page.locator('.help-inline').filter({ hasText: 'has not been found' });
    }

    async goto() {
        await this.navigateTo('/');
        await this.findOwnersLink.click();
    }

    async findOwner(lastName: string) {
        await this.lastNameInput.fill(lastName);
        await this.findOwnerBtn.click();
    }
}
