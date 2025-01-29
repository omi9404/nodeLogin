const mysql = require("mysql");
const Joi = require('joi');
const User = require('../Models/user');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

exports.register = (req, res) => {
        const { body } = req; 
        const schema = Joi.object({ 
            name: Joi.string().min(6).required(),
            email: Joi.string().email().alphanum().min(3).max(30).required(),
            password: Joi.string().min(6).required(),
            confirmPass: Joi.string().min(6).required() 
        });
        const validation = schema.validate(req.body); 
        res.send(validation);


       
if(1>2){

    const { name, email, password, confirmPass } = req.body;
    console.log('Register body', req.body);
    let message = {};
    db.query('SELECT email from users where email = ?', [email], (error, result) => {
        if (error) {
            message = err;
            res.json({ message });
        }
        if (!name || !email || !password || !confirmPass) {
            message = "Fill empty fields.";
            res.json({ message });
        } else if (result.length > 0) {
            message = "User email is already registered";
            res.json({ message });
        } else if (password !== confirmPass) {
            message = "Password and Confirm Password should be same.";
            res.json({ message });
        } else {
            db.query("INSERT INTO users SET ? ", { name: name, email: email, password: password }, (error, result) => {
                if (error) {
                    message = err;
                    res.json({ message });
                } else {
                    message = "User Registered.";
                    res.json({ message });
                }
            });
        }
    });
}
}

exports.login = (req, res) => {
    let message = {};
    const { email, password } = req.body;
    console.log('email', email);
    if (!email || !password) {
        message = "Please enter email and password.";
        res.json({ message });
    } else {
        User.getAll(req.body, (err, result) => {
            console.log('result.length', result.length);
            if (err) {
                message = err;
                res.json({ message });
            } else if (result.length > 0) {
                message = "User email is already registered";
                res.json(result);
            } else if (result.length == 0) {
                message.message = "User email and password does not match.";
                res.json(message);
            } else {
                message.message = "User email and password does not match.";
                res.json(message);
            }

        });
    }
}

exports.changePassword = (req, res) => {
    let message = {};
    const { email, password, newpassword } = req.body;
    User.getAll(req.body, (err, result) => {
        if (!email || !password || !newpassword) {
            message = "Fill empty fields.";
            res.json({ message });
        } else if (password == newpassword) {
            message = "Password and Confirm Password should not be same.";
            res.json({ message });
        } else if (result.length > 0) {
            User.changePassword(req.body, (error, result) => {
                if (error) {
                    message = error;
                    res.json({ message });
                } else {
                    message = "Password Changed Successfully.";
                    res.json({ message });
                }
            });
        } else {
            message = "Email and Password does not match or Email is not registered.";
            res.json({ message });
        }
    });
}

exports.sendOtp = (req, res) => {
    let message = {};
    const { email } = req.body;
    User.checkUserByEmail(email, (err, result) => {
        if (!email) {
            message = "Please enter email.";
            res.json({ message });
        } else if (result.length > 0) {
            User.saveOtp(req.body, (error, result) => {
                if (error) {
                    message = error;
                    res.json({ message });
                } else {
                    message = "Otp Sent Successfully.";
                    res.json({ message });
                }
            });
        } else {
            message = "Email is not registered";
            res.json({ message });
        }
    });
}

exports.loginWithOtp = (req, res) => {
    let message = {};
    const { email, otp } = req.body;
    User.checkUserByEmail(email, (err, result) => {
        if (!email || !otp) {
            message = "Fill empty fields.";
            res.json({ message });
        } else if (result.length > 0) {
            User.CheckOtpForLogin(req.body, (error, result) => {
                if (error) {
                    message = error;
                    res.json({ message });
                } else {
                    if (result.length > 0) {
                        message = result;
                    } else {
                        message = "Please generat new otp and try";
                    }
                    res.json({ message });
                }
            });
        } else {
            message = "Email is not registered";
            res.json({ message });
        }
    });
}


exports.editProfile = (req, res) => {
    let message = {};
    const { id, name, email } = req.body;
    User.findById(id, function (err, user) {
        if (!user) {
            message = "User is not registered";
            res.json({ message });
        } else {
            if (user.length > 0) {
                User.updateUserProfile(req.body, (error, result) => {
                    if (error) {
                        message = error;
                        res.json({ message });
                    } else {
                        message = result;
                        res.json({ message });
                    }
                });
            } else {
                message = "User is not registered";
                res.json({ message });
            }
        }
    });
}