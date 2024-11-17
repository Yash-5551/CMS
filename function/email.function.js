const nodemailer = require('nodemailer');
const notifyTemp = require('../src/template.js')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "vishal12345mane00@gmail.com",
        pass: "rraj jhsq cbot kmss",
    },
});

const sendEmail = (recipient, subject, text) => {
    const mailOptions = {
        from: 'vishal12345mane00@gmail.com',
        to: 'vishal12345mane00@gmail.com', //recipient,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email not sent: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
};
const twilio = require('twilio');

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;
const client = twilio(accountSid, authToken);


const sendSMS = (recipient, message) => {
    const num = '+91'+ recipient;
    client.messages
        .create({
            body: message,
            from: '+15109005801', // Your Twilio number
            to: num,
        })
        .then(message => console.log('SMS sent: ', message.sid))
        .catch(error => console.log('SMS not sent: ', error));
};


function DeliveryTime(status) {
    let estimate;
    switch (status) {
        case 'dispatched':
            estimate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
            break;
        case 'in_transit':
            estimate = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours
            break;
        case 'out_for_delivery':
            estimate = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
            break;
        default:
            estimate = new Date();
    }
    return estimate;
}

const triggerNotification = async (notify,r_email,statusid) => {
    console.log('triggerNotification');
    const recipientname = r_email;
    console.log(recipientname);
    const notifyType = notify; 
    console.log(notifyType);
    const template = notifyTemp[notifyType]?.[statusid];
    console.log(template);
    const estimatedDeliveryTime = DeliveryTime(statusid);
   console.log({recipientname,notifyType,template,estimatedDeliveryTime});
    const notification = {
        recipient : recipientname,
        type: notifyType,
        status: statusid,
        template: template,
        trigger: statusid,
        estimatedDeliveryTime : estimatedDeliveryTime,
    };
    console.log(notification);

    sendNotification(notification);
};

const sendNotification = async (notification) => {
    try {
        if (notification.type === 'Email') {
            sendEmail(notification.recipient, 'Notification', notification.template);
        } else if (notification.type === 'SMS') {
            sendSMS(notification.recipient, notification.template);
        } else if (notification.type === 'Push') {
            // Example: assuming deviceToken is stored in courier
         //   sendPushNotification(notification.recipient, 'Notification', notification.template);
        }
        notification.status = 'Sent';
    } catch (error) {
        console.error('Notification failed:', error);
        notification.status = 'Failed';
    } 
};


module.exports = {triggerNotification, sendNotification ,sendEmail};