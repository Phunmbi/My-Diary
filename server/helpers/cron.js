import { CronJob } from 'cron';
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
  const cronJob = new CronJob(`${minute} ${hour} * * *`, () => {
    const cappedName = user.firstname.charAt(0).toUpperCase()
    + user.firstname.slice(1, user.firstname.length);
    const mailOptions = {
      from: 'mydiaryan.no.reply@gmail.com',
      to: user.email,
      subject: 'Diary Reminder',
      text: `Hey ${cappedName},

      How's the day going?, Why don't you come tell your diary all about it.

  Best Regards
  Your Diary`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      }
    });
  });

  cronJob.start();
};

const scheduleCron = () => {
  client.query('SELECT email as email, first_Name as firstname, reminder as reminder FROM users', (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      const data = resp.rows;
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const user = data[index];
          if (user.reminder !== null) {
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