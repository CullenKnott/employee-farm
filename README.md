# Employee-Farm
## Description

Employee Farm is a CLI application that is used as a content management system (CMS) to track and store employee information such as their first and last name, department, role, salary, and manager. The application also allows the user to update and add employees to the database.

![badge](https://img.shields.io/badge/License%20-MIT--License-brightgreen)

## Table of Contents

- [Technology](#Technology)
- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [Credits](#credits)
- [License](#license)

## Technology

- JavaScript
- Node.js
- Inquirer
- MySQL
- Console table

## Installation

Click on the repository link below to download the CLI app. Once there, download the zip file and copy into a directory or clone the repository into a directory using your terminal. Then, go to the directory where the CLI is kept and open in VS Code. Open the terminal in VS Code and make sure to download the requried packages by running `npm i` in the terminal. 

**Make sure MySQL is installed as it is required to create the database**

https://github.com/CullenKnott/employee-farm

## Usage

In the terminal, create the database by by logging in to MySQL `mysql -u root` and run `source db/schema.sql` and then `source db/seed.sql` to seed the database and then `quit` to exit out of the mysql CLI. Now, run the command `node index.js` and the inquirer package will begin to prompt you a list of commands for what you would like to do with the database. You can choose any command in any order; the commands are as followed:
- `View all employees`
- `View all departments`
- `View all roles`
- `Add a department`
- `Add a role`
- `Add an employee`
- `Update employee`
- `QUIT`

Here is a video walkthrough on how to use the application

https://youtu.be/wYCXKaWaS7Q

## Test

To test this app, open up the file in VS Code. Open the terminal, change directory into the root folder `employee-farm`, and run `node index.js`. Go through each prompt and check for any errors.

## Credits
- Rene Trevino (Tutor)

## License

MIT License

Copyright (c) [2023] [CullenKnott]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
