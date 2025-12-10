import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly findOwnersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.findOwnersLink = page.getByRole('link', { name: 'Find owners' });
    }

    async navigateTo(url: string = '/') {
        await this.page.goto(url);
    }
}
