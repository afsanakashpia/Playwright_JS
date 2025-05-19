import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import fs from "fs";
import LoginPage from "../pages/LoginPage";


test("Reset Password", async ({ page }) => {

    await page.goto("/");
    const Invalidemail = faker.person.firstName() + "@gmail.com"
    // const newpassword = "newpass1234"

    const user = new LoginPage(page);
    await user.ResetPassEmpty();
    await page.goto("/");
    await user.ResetPassInvalid(Invalidemail);

    await page.goto("/");
    const latestUser = jsonData[jsonData.length - 1];
    await user.ResetPassValid(latestUser.email);


})

const baseUrl = "https://gmail.googleapis.com";
const token = "GoogleAuthToken";

test("Assert reset password Mail", async ({ request ,page}) => {
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

    const urlRegex = /https:\/\/dailyfinance\.roadtocareer\.net\/reset-password\?token=[^\s"]+/;
    const match = message.match(urlRegex);
    if (!match) {
        throw new Error("Reset link not found in the email snippet.");
    }

    const resetLink = match[0];
    console.log("Reset link:", resetLink);

    await page.goto(resetLink);
    const newPassword = 'newpass1234';
    const latestUser = jsonData[jsonData.length - 1];


    const user = new LoginPage(page);
    await user.ResetPasswordAssert(newPassword);
    await page.goto("/");
    await user.doLogin(latestUser.email,newPassword);


    const newUser = {
        email: latestUser.email,
        password: newPassword
    };

    jsonData.push(newUser);

    fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));


})
