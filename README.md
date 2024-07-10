<p  align="center">
<a  href="http://brewww.com/"  target="_blank"><img  src="https://github.com/BrewInteractive/nestjs-notification-module/blob/main/Brew-Logo-Small.png?raw=true"  width="300"  alt="Brew Logo"  /></a>
</p>

<h1  align="center">NestJS Notification Module</h1>

<p align="center">This package was created to facilitate the use of the Notification Module in NestJS projects</p>
<p align="center">
<a href="https://sonarcloud.io/summary/overall?id=BrewInteractive_nestjs-notification-module" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=BrewInteractive_nestjs-notification-module&metric=alert_status"/></a>
<a href="https://sonarcloud.io/summary/overall?id=BrewInteractive_nestjs-notification-module" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=BrewInteractive_nestjs-notification-module&metric=coverage"/></a>
<a href="https://www.npmjs.com/package/@brewww/nestjs-notification-module" target="_blank"><img src="https://img.shields.io/npm/v/@brewww/nestjs-notification-module.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/@brewww/nestjs-notification-module" target="_blank"><img src="https://img.shields.io/npm/l/@brewww/nestjs-notification-module.svg" alt="Package License" /></a> <a href="https://www.npmjs.com/@brewww/nestjs-notification-module" target="_blank"><img src="https://img.shields.io/npm/dm/@brewww/nestjs-notification-module.svg" alt="NPM Downloads" /></a>
</p>
<p align="center">
<a href="https://www.instagram.com/brew_interactive/" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://www.linkedin.com/company/brew-interactive/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin" /></a>
<a href="https://twitter.com/BrewInteractive" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
</p>

## Purpose

This package is developed to be used in NestJS projects. The purpose of the module is to use notification service more easily and effectively in NestJS projects.


## Requirements


| Variable Name                 | Description                                                     | Required | Default          |
| ----------------------------- | --------------------------------------------------------------- | -------- | ---------------- |
| `EMAIL_SERVICE`               | The email service provider to be used                           | Yes      | -                |
| `EMAIL_FROM`                  | The sender email address                                        | Yes      | -                |
| `EMAIL_SUBJECT`               | Default subject for emails                                      | No       | "Notification"   |
| `AWS_SES_REGION`              | AWS SES service region                                          | Yes      | -                |
| `AWS_SES_ACCESS_KEY_ID`       | AWS SES access key ID                                           | Yes      | -                |
| `AWS_SES_SECRET_ACCESS_KEY`   | AWS SES secret access key                                       | Yes      | -                |
| `SMTP_HOST`                   | SMTP server address                                             | Yes      | -                |
| `SMTP_USER`                   | SMTP user name                                                  | Yes      | -                |
| `SMTP_PASSWORD`               | SMTP password                                                   | Yes      | -                |
| `SENDGRID_API_KEY`            | SendGrid API key                                                | Yes      | -                |
| `SMS_SERVICE`                 | The SMS service provider to be used                             | Yes      | -                |
| `MUTLUCELL_USERNAME`          | Mutlucell user name                                             | Yes      | -                |
| `MUTLUCELL_PASSWORD`          | Mutlucell password                                              | Yes      | -                |
| `MUTLUCELL_ORIGINATOR`        | Mutlucell message sender name (originator)                      | Yes      | -                |
| `MUTLUCELL_API_URL`           | Mutlucell API URL                                               | Yes      | -                |

## Conclusion

These instructions will help you start, configure, test, and use the nestjs-notification-module project.

## License

NestJS Plugin Module is [MIT licensed](LICENSE).

