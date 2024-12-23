import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (
  to: string,
  sub: string,
  eText: string,
  eHtml: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'devteamsaadi@gmail.com',
      pass: config.sm_pass,
    },
  });

  await transporter.sendMail({
    from: '"PH Islamic University 👻" <devteamsaadi@gmail.com>', // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: eText, // plain text body
    html: eHtml,
  });
};
