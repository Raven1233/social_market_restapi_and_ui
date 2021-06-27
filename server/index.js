
const crypto = require("crypto");
const express = require("express")
const app = express()
require("dotenv").config()

const cors = require("cors")
const nodemailer = require("nodemailer")

app.use(cors())
app.post("/send_mail/:mail", async (req, res) => {
	
    const email=req.params.mail;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your gmail id' || 'abc@gmail.com', 
            pass: 'your gmail password' || '1234' 
        }
    });
    var id = crypto.randomBytes(6).toString('base64').slice(0,6);
    let mailOptions = {
        from: 'your gmail id', 
        to: email, 
        subject: 'ArtMe:- Thank you for shopping with us',
        html: `
             <p>Your Picture will be delivered within 5 business days.</p>
             <p>Your transaction id is ${id}. Have a nice day!!!</p>
        `
    };
    console.log(email);
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    }); 
})

app.listen(8000,() => {
		console.log("Server is listening on port 8000")
	}
)
