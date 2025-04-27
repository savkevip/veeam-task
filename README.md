
# Veeam Form Generator

This project is a form generator application designed for managing JSON configurations. It allows users to input a JSON configuration, validate it, and apply it. The app consists of a configuration tab where users can enter a JSON configuration and a result tab to display the applied settings.

## Features

- **Config Tab**: Users can input JSON configuration and apply it.
- **Validation**: The entered JSON configuration is validated to ensure it’s correct.
- **Result Tab**: Displays the applied configuration after successful validation.
- **Error Handling**: Provides error messages if the JSON configuration is invalid.
- **Tab Switching**: The app supports switching between the configuration and result tabs.

## Tech Stack

- **React** for the user interface.
- **TypeScript** for type safety and better development experience.
- **TailwindCSS** for styling.
- **Vitest** for testing.
- **Formik** for form handling.
- **Zod** for schema validation.

## Setup

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## Running Tests

To run tests:

- Run all tests once:
  ```bash
  yarn test
  ```

- Watch for changes and rerun tests:
  ```bash
  yarn test:watch
  ```

