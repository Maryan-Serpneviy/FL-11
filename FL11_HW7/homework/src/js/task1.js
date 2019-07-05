let loginData = [
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
]
const EMAIL_MIN_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 5;
let userEmail = prompt('Enter your email:', '');

if (userEmail === '' || userEmail === null) {
    alert('Canceled');
} else if (userEmail.length < EMAIL_MIN_LENGTH) {
    alert('I don\'t know any emails having name length less than 6 symbols');
} else {
    for (let i = 0; i < loginData.length; i++) {
        if (userEmail !== loginData[i].email) {
            if (i === loginData.length - 1) {
                alert('I don\'t know you');
            }
            continue;
        } if (userEmail === loginData[i].email) {
            let password = prompt('Enter password:', '');
            if (password === '' || password === null) {
                alert('Canceled');
                break;
            } else if (userEmail === loginData[i].email && password === loginData[i].password) {
                let passwordChange = confirm('Do you want to change your password?');
                if (passwordChange === false) {
                    alert('You have failed the change');
                    break;
                }
                if (passwordChange === true) {
                    let oldPassword = prompt('Enter your old password:', '');
                    if (oldPassword === '' || oldPassword === null) {
                        alert('Canceled');
                        break;
                    } else if (userEmail === loginData[i].email && oldPassword !== loginData[i].password) {
                        alert('Wrong password');
                        break;
                    } else if (userEmail === loginData[i].email && oldPassword === loginData[i].password) {
                        let newPassword = prompt('Enter your new password:', '');
                        if (newPassword === '' || newPassword === null) { // additional check
                            alert('Canceled');
                            break;
                        } else if (newPassword.length < PASSWORD_MIN_LENGTH) {
                            alert('It\'s too short password. Sorry.' );
                            break;
                        } else {
                            let newPasswordConfirm = prompt('Confirm your new password:', '');
                            if (newPasswordConfirm === '' || newPasswordConfirm === null) { // additional check
                                alert('Canceled');
                                break;
                            } else if (newPasswordConfirm !== newPassword) {
                                alert('You wrote the wrong password');
                                break;
                            } else {
                                alert('You have successfully changed your password');
                                break;
                            }
                        } 
                    } 
                }
            } else {
                alert('Wrong password');
                break;
            }
        }
    }
}
 