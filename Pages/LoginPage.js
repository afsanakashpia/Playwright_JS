import { expect } from "@playwright/test";

class LoginPage {

    constructor(page) {

        this.page = page;
        this.emailTxt = page.getByRole("textbox", { name: "Email" });
        this.passwordTxt = page.getByRole("textbox", { name: "Password" });
        this.loginBtn = page.getByRole("button", { name: "LOGIN" });
        this.AddCostBtn = page.getByRole("button", { name: "Add Cost" });
        this.itemName = page.getByRole("textbox", { name: "Item Name" });
        this.amount = page.getByRole("spinbutton", { name: "Amount" });
        this.itemSubmitBtn = page.getByRole("button", { name: " Submit" });
        this.profileiconBtn = page.getByRole("button", { name: " account of current user" });
        this.profileBtn = page.getByRole("menuitem", { name: " Profile" });
        this.logoutBtn = page.getByRole("menuitem", { name: "Logout" });
        this.resetpassLink = page.getByRole("link", { name: "Reset it here" });
        this.resetEmail = page.getByRole("textbox", { name: "Email" });
        this.resetSubmitlink = page.getByRole("button", { name: "SEND RESET LINK" });
        this.resetPassword1 = page.getByRole("textbox", { name: "New Password" });
        this.confirmPassword = page.getByRole("textbox", { name: "Confirm Password" });
        this.resetPasswordBtn = page.getByRole("button", { name: "RESET PASSWORD" });


    }

    async doLogin(email, password) {
        await this.emailTxt.fill(email);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }


    async addItem(item, amount) {
        await this.AddCostBtn.click();
        await this.itemName.fill(item.itemName);
        await this.amount.fill(item.amount.toString());

        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added successfully!');
            await dialog.dismiss();
        });

        await this.itemSubmitBtn.click();



    }

    async uploadImage(imagePath) {
        await this.profileiconBtn.click();
        await this.profileBtn.click();
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await this.page.getByRole("button", { name: "EDIT" }).click();
        // await this.page.getByRole("button", { name: "Choose File" }).click();
        const fileInput = this.page.locator('input[type="file"]');
        await fileInput.setInputFiles(imagePath);
        await this.page.getByRole("button", { name: "UPLOAD IMAGE" }).click();
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('User updated successfully!');
            await dialog.dismiss();
        });
        await this.page.getByRole("button", { name: "UPDATE" }).click();

        await this.profileiconBtn.click();
        await this.logoutBtn.click();


    }

    async ResetPassEmpty() {
        await this.resetpassLink.click();

        //passing empty email field
        await this.resetEmail.fill('');
        await this.resetSubmitlink.click();

        const validationMessage = await this.page.evaluate(
            input => input.validationMessage,
            await this.resetEmail.elementHandle()
        );
        console.log('Validation message:', validationMessage);
        expect(validationMessage).toContain('Please fill out this field.');
    }

    async ResetPassInvalid(email) {
        //passing unauthorized email
        await this.resetpassLink.click();
        await this.resetEmail.fill(email);
        await this.resetSubmitlink.click();
        await expect(this.page.getByText('Your email is not registered')).toBeVisible({ timeout: 50000 });
    }

    //passing valid email
    async ResetPassValid(email) {

        await this.resetpassLink.click();
        await this.resetEmail.fill(email);
        await this.resetSubmitlink.click();
        await expect(this.page.getByText('Password reset link sent to your email')).toBeVisible({ timeout: 50000 });


    }

    async ResetPasswordAssert(password) {

        await this.resetPassword1.fill(password);
        await this.confirmPassword.fill(password);
        await this.resetPasswordBtn.click();

    }




}

export default LoginPage;