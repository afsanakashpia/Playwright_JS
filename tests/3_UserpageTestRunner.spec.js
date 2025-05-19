import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import LoginPage from "../pages/LoginPage";



test.beforeEach("User Login", async ({ page }) => {
    
    await page.goto("/");
    const latestUser = jsonData[jsonData.length - 1];
    const user = new LoginPage(page);
    await user.doLogin(latestUser.email, latestUser.password);

    await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 20000 });
    // await page.pause();


})

test("Adding Item", async ({ page }) => {
    test.setTimeout(60000);

    const user = new LoginPage(page);

    const firstItem = {
        itemName: faker.commerce.productName(),
        amount: faker.number.int({ min: 1, max: 10 }),
    };

    const secondItem = {
        itemName: faker.commerce.productName(),
        amount: faker.number.int({ min: 1, max: 10 }),
    };

    await user.addItem(firstItem);
    await page.waitForTimeout(3000);

    await user.addItem(secondItem);
    await page.pause();


})

test("update Profile", async ({ page }) => {

    const user = new LoginPage(page);
    const imagePath = "Utils/images/sample.jpg";
    await user.uploadImage(imagePath);
    await page.pause();



})

