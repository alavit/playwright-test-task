import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OwnerInformationPage extends BasePage {
    readonly ownerInformationHeader: Locator;
    readonly ownerInfoTable: Locator;
    readonly petsAndVisitsTable: Locator;
    readonly addNewPetLink: Locator;
    readonly addVisitButtons: Locator;

    constructor(page: Page) {
        super(page);
        this.ownerInformationHeader = page.getByRole('heading', { name: 'Owner Information' });
        this.ownerInfoTable = page.locator('table.table-striped').first();
        this.petsAndVisitsTable = page.locator('table.table-striped').nth(1);
        this.addNewPetLink = page.getByRole('link', { name: 'Add New Pet' });
        this.addVisitButtons = page.getByRole('link', { name: 'Add Visit' });
    }
}
