import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { client } from '../models/db';

// set up host email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mydiaryan.no.reply@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

const scheduleJobs = (minute, hour, user) => {
  cron.schedule(`${minute} ${hour} * * *`, () => {
    const mailOptions = {
      from: 'mydiaryan.no.reply@gmail.com',
      to: user.email,
      subject: 'Diary Reminder',
      text: `Hey ${user.firstname}, 

      How's the day going?, Why don't you come tell your diary all about it.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      }
    });
  });
};

const scheduleCron = () => {
  client.query('SELECT email as email, first_Name as firstname, reminder as reminder FROM users', (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      const data = resp.rows;
      console.log(resp);
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const user = data[index];
          if (user.reminder !== 'null') {
            console.log(user);
            const time = user.reminder.split(':');
            const hour = time[0];
            const minute = time[1];
            scheduleJobs(minute, hour, user);
          }
        }
      }
    }
  });
};

export { scheduleCron };