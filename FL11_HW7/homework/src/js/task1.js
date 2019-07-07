'use strict';

const loginData = [
    {
        user: 'user',
        password: 'UserPass',
        email: 'user@gmail.com'
    },
    {
        user: 'admin',
        password: 'AdminPass',
        email: 'admin@gmail.com'
    }
];
const alerts = {
    cancel: 'Canceled',
    noSuchUser: 'I don\'t know you',
    emailTooShort: 'I don\'t know any emails having name length less than 6 symbols',
    passwordTooShort: 'It\'s too short password. Sorry.',
    wrongPassword: 'Wrong password',
    passwordChangeFail: 'You have failed the change',
    passwordConfirmFail: 'You wrote the wrong password',
    passwordChangeSuccess: 'You have successfully changed your password'
};
const EMAIL_MIN_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 5;
const userEmail = prompt('Enter your email:', '');
if (userEmail === '' || userEmail === null) {
    alert(alerts.cancel);
} else if (userEmail.length < EMAIL_MIN_LENGTH) {
    alert(alerts.emailTooShort);
} else {
    for (let i = 0; i < loginData.length; i++) {
        if (userEmail !== loginData[i].email) {
            if (i === loginData.length - 1) {
                alert(alerts.noSuchUser);
            }
            continue;
        } if (userEmail === loginData[i].email) {
            const password = prompt('Enter password:', '');
            if (password === '' || password === null) {
                alert(alerts.cancel);
                break;
            } else if (userEmail === loginData[i].email && password === loginData[i].password) {
                const passwordChange = confirm('Do you want to change your password?');
                if (!passwordChange) {
                    alert(alerts.passwordChangeFail);
                    break;
                }
                if (passwordChange) {
                    const oldPassword = prompt('Enter your old password:', '');
                    if (oldPassword === '' || oldPassword === null) {
                        alert(alerts.cancel);
                        break;
                    } else if (userEmail === loginData[i].email && oldPassword !== loginData[i].password) {
                        alert(alerts.wrongPassword);
                        break;
                    } else if (userEmail === loginData[i].email && oldPassword === loginData[i].password) {
                        const newPassword = prompt('Enter your new password:', '');
                        if (newPassword === '' || newPassword === null) { // additional check
                            alert(alerts.cancel);
                            break;
                        } else if (newPassword.length < PASSWORD_MIN_LENGTH) {
                            alert(alerts.passwordTooShort);
                            break;
                        } else {
                            const newPasswordConfirm = prompt('Confirm your new password:', '');
                            if (newPasswordConfirm === '' || newPasswordConfirm === null) { // additional check
                                alert(alerts.cancel);
                                break;
                            } else if (newPasswordConfirm !== newPassword) {
                                alert(alerts.passwordConfirmFail);
                                break;
                            } else {
                                alert(alerts.passwordChangeSuccess);
                                break;
                            }
                        } 
                    } 
                }
            } else {
                alert(alerts.wrongPassword);
                break;
            }
        }
    }
}