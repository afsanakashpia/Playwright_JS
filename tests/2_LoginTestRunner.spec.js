import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import LoginPage from "../pages/LoginPage";



test("User Login", async ({ page }) => {

    await page.goto("/");
    const user = new LoginPage(page);
    //passing UnRegistered login credentials
    const invalidemail = faker.name.firstName()+"@gmail.com";
    const invalidPass = "1234";
    await user.doLogin(invalidemail, invalidPass);
    await expect(page.getByText('Invalid email or password')).toBeVisible({ timeout: 50000 });
    
    await page.goto("/");
    const latestUser = jsonData[jsonData.length - 1];

    await user.doLogin(latestUser.email, latestUser.password);

    await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 20000 });
    // await page.pause();


})


