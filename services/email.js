const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");
require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "stage":
        this.link = config.stage;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }

  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "System Contacts",
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: "Это у нас интро и где ты находишься?",
        action: {
          instructions: "Чтобы закончить регистрацию кликните на кнопку",
          button: {
            color: "#22BC66",
            text: "Подвердить аккуант",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email,we'd love to help",
      },
    };

    return mailGenerator.generate(template);
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "jonybravocn.jb@gmail.com",
      subject: "Подтверждение регистрации",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
