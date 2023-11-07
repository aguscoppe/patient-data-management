![Logo](https://i.ibb.co/0GVj9vL/Captura-de-pantalla-2023-11-06-214237.png)

# Patient Manager

Frontend application that enables users to manage patient data.

## Features

- Displays a list of patient records from a this [API](https://63bedcf7f5cfc0949b634fc8.mockapi.io/users) in cards within a user interface.
- User is able to view additional details from each patient.
- User is able to edit patient information and add new patients to the list (data will not persist).
- Form validation is implemented to ensure the accuracy and completeness of patient data.
- Notifications show up for successful or failed data modifications.
- Application is interactive and responsive.

## Tech Stack

- [React](https://react.dev/learn/installation)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Dependencies

- [Material UI](https://mui.com/material-ui/getting-started/installation/)
- [Axios](https://axios-http.com/docs/intro)
- [UUID](https://www.npmjs.com/package/uuid)
- [ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Prettier](https://prettier.io/docs/en/install)

## Project structure

Folders:
- /components
  - this is where components are placed
  - if generic, they will be placed in /common sub-folder
  - if a component has a related styles, utils or constants file, they will follow the structure:
    - ComponentName.styles.ts
    - ComponentName.constants.ts
    - ComponentName.utils.ts
- /hooks
  - this is where custom hooks are placed
- /models
  - this is where data models are placed

## Run Locally

Clone the project

```bash
  git clone https://github.com/aguscoppe/patient-data-management
```

Go to the project directory

```bash
  cd patient-data-management
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Screenshots

Desktop

![Screenshot 1](https://i.ibb.co/k3Qf9c3/Captura-de-pantalla-2023-11-06-214147.png)

![Screenshot 2](https://i.ibb.co/4g9X6hy/Captura-de-pantalla-2023-11-06-214206.png)

Mobile

![Screenshot 1](https://i.ibb.co/3zBmrXz/Captura-de-pantalla-2023-11-06-214302.png)

![Screenshot 2](https://i.ibb.co/B3mFDQg/Captura-de-pantalla-2023-11-06-214313.png)

![Screenshot 3](https://i.ibb.co/R0GZQSS/Captura-de-pantalla-2023-11-06-214322.png)

![Screenshot 4](https://i.ibb.co/svL1BSm/Captura-de-pantalla-2023-11-06-214455.png)

## Authors

- [@aguscoppe](https://www.github.com/aguscoppe)
