class RegisterPage {
    constructor(page){

        this.page=page;
    
        this.registrationLink = page.getByRole( "link" , { name : "Register" } );
        this.firstNameTxt = page.getByLabel("First Name");
        this.lastNameTxt = page.getByLabel("Last Name");
        this.emailTxt = page.getByLabel("Email");
        this.passwordTxt = page.getByLabel("Password");
        this.phoneNumberTxt = page.getByLabel("Phone Number");
        this.addressTxt = page.getByLabel("Address");
        this.genderRadioBtn = page.getByRole("radio");
        this.terms = page.getByRole("checkbox");
        this.registerBtn = page.getByRole("button" , { name : "REGISTER" });


    }

    async registerUser(userModel){
       await this.registrationLink.click();
        await this.firstNameTxt.fill(userModel.firstName);
        await this.lastNameTxt.fill(userModel.lastName);
        await this.emailTxt.fill(userModel.email);
        await this.passwordTxt.fill(userModel.password);
        await this.phoneNumberTxt.fill(userModel.phoneNumber);
        await this.addressTxt.fill(userModel.address);
        await this.genderRadioBtn.first().click();
        await this.terms.click();
        await this.registerBtn.click();


    }

    async registerUserInvalid1(userModel){
        //avoiding mandatory fields like firstname
        await this.registrationLink.click();
        await this.firstNameTxt.fill("");
        await this.lastNameTxt.fill(userModel.lastName);
        await this.emailTxt.fill(userModel.email);
        await this.passwordTxt.fill(userModel.password);
        await this.phoneNumberTxt.fill(userModel.phoneNumber);
        await this.addressTxt.fill(userModel.address);
        await this.genderRadioBtn.first().click();
        await this.terms.click();
        await this.registerBtn.click();

     const validationMessage = await this.firstNameTxt.evaluate(
        input => input.validationMessage
    );
    return validationMessage;


    }


        async registerUserInvalid2(userModel){
        //passing wrong email
        await this.registrationLink.click();
        await this.firstNameTxt.fill(userModel.firstName);
        await this.lastNameTxt.fill(userModel.lastName);
        await this.emailTxt.fill("invalidmail@test.com");
        await this.passwordTxt.fill(userModel.password);
        await this.phoneNumberTxt.fill(userModel.phoneNumber);
        await this.addressTxt.fill(userModel.address);
        await this.genderRadioBtn.first().click();
        await this.terms.click();
        await this.registerBtn.click();



    }

}

export default RegisterPage;