let userEmail = prompt('Enter your email:', '');
let password;
let passwordChange;
let oldPassword;
let newPassword;
let newPasswordConfirm;

if (userEmail === '' || userEmail === null) {
    alert('Canceled');
} else if (userEmail.length < 6) {
    alert('I don\'t know any emails having name length less than 6 symbols');
} else if (userEmail === 'user@gmail.com' || userEmail === 'admin@gmail.com') {
    password = prompt('Enter password:', '');
    if (password === '' || password === null) {
        alert('Canceled');
    } else if (userEmail === 'user@gmail.com' && password === 'UserPass' ||
        userEmail === 'admin@gmail.com' && password === 'AdminPass') {
        passwordChange = confirm('Do you want to change your password?');
        if (passwordChange === false) {
            alert('You have failed the change');
        }
        if (passwordChange === true) {
            oldPassword = prompt('Enter your old password:', '');
            if (oldPassword === '' || oldPassword === null) {
                alert('Canceled');
            } else if (userEmail === 'user@gmail.com' && oldPassword !== 'UserPass' ||
            userEmail === 'admin@gmail.com' && oldPassword !== 'AdminPass') {
                alert('Wrong password');
            } else if (userEmail === 'user@gmail.com' && oldPassword === 'UserPass' ||
                userEmail === 'admin@gmail.com' && oldPassword === 'AdminPass') {
                newPassword = prompt('Enter your new password:', '');
                if (newPassword === '' || newPassword === null) { // additional check
                    alert('Canceled');
                } else if (newPassword.length < 5) {
                    alert('It\'s too short password. Sorry.' );
                } else {
                    newPasswordConfirm = prompt('Confirm your new password:', '');
                    if (newPasswordConfirm === '' || newPasswordConfirm === null) { // additional check
                        alert('Canceled');
                    } else if (newPasswordConfirm !== newPassword) {
                        alert('You wrote the wrong password');
                    } else {
                        alert('You have successfully changed your password');
                    }
                } 
            } 
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don\'t know you');
}

