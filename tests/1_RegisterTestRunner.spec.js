import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';

import jsonData from "../Utils/userData.json"

import fs from "fs"

import RegisterPage from "../Pages/RegisterPage.js"

import { generateRandomNumber } from "../Utils/utils.js"


test("Register Page", async ({ page }) => {
    await page.goto("/");

    //create an objct of registration page

    const reg = new RegisterPage(page);

    const userModel = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: "afsanasharmilykashpia+" + generateRandomNumber(100, 999) + "@gmail.com",
        password: faker.internet.password(),
        phoneNumber: `015${generateRandomNumber(10000000, 99999999)}`,
        address: faker.location.city()

    }

    //method calling
    const validationMessage = await reg.registerUserInvalid1(userModel);
    console.log("Validation Message:", validationMessage);
    expect(validationMessage).toContain("Please fill out this field.");

    await page.goto("/");
    await reg.registerUserInvalid2(userModel);

    const toastMessage = page.locator(".Toastify__toast");
    await toastMessage.waitFor({ timeout: 20000 })

    const msg = await toastMessage.textContent();
    //assert
    expect(msg).toContain("Only Gmail addresses are accepted.");

     await page.goto("/");
    await reg.registerUser(userModel);

           const toastMessage2 = page.locator(".Toastify__toast");
       await toastMessage2.waitFor({ timeout: 20000 })

        const msg2 = await toastMessage2.textContent();
        //assert
        expect(msg2).toContain("successfully");

   // push data to userData.json file
    jsonData.push(userModel);

    fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));


})



const baseUrl = "https://gmail.googleapis.com";
const token = "GoogleAuthToken";

test("Assert Congratulation Mail", async ({ request }) => {
    test.setTimeout(60000);

    await new Promise(resolve => setTimeout(resolve, 40000));

    const response1 = await request.get(baseUrl + "/gmail/v1/users/me/messages/", {
        "headers": {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    const data = await response1.json();
    const emailId = data.messages[0].id;


    const response2 = await request.get(baseUrl + "/gmail/v1/users/me/messages/" + emailId, {
        "headers": {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

    });
    const response2json = await response2.json();
    const message = response2json.snippet;
    console.log(message);

    expect(message).toContain(" Welcome to our platform!");


})


