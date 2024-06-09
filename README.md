# Serverless Website Analytics Deployment Demo

This repository demonstrates how to set up the [Serverless Website Analytics](https://github.com/rehanvdm/serverless-website-analytics) open project for the AWS Community Day 2024 in Columbus, Ohio. This demo is intended for educational purposes and is not configured for production use.

## Purpose

This repository showcases the setup and deployment of the Serverless Website Analytics project. It is part of a presentation at AWS Community Day 2024 highlighting serverless technologies and analytics.

## Related Repository

The [Serverless Web Analytics Demo SPA Application](https://github.com/cebert/serverless-web-analytics-demo-spa-application) repository points to Serverless Website Analytics for demonstration purposes. The SPA application setup and configuration can be found there.

## Project Structure

The project structure includes:

- **bin/**: Entry point for the CDK application
- **lib/**: Contains the CDK stack definitions and utility modules
- **lib/stacks/**: CDK stack definitions for the project
- **lib/utils/**: Utility modules used across the project

## Prerequisites

Ensure you have the following installed:

- Node.js and npm
- AWS CLI
- AWS CDK

## Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/cebert/serverless-website-analytics-demo
   cd serverless-website-analytics-demo
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Configure AWS CLI:**

   Ensure your AWS CLI is configured with the necessary permissions to deploy the stacks.

   ```sh
   aws configure
   ```

4. **Set Environment Variables:**

   Set the required environment variable to subscribe an email address to SNS alarm notifications. 
   This is not strictly necessary but is helpful for monitoring purposes.
   You can store your email address an environmental variable `.bash_profile`, `.zshrc`, or a `.env` file:

   ```sh
   export EMAIL_ADDRESS="your-email@example.com"
   ```

   If using a `.env` file, you can load it using the `dotenv` package:

   ```sh
   npm install dotenv
   ```

   Then, create a `.env` file:

   ```sh
   echo "EMAIL_ADDRESS=your-email@example.com" > .env
   ```

   This avoids needing to store a secret in source control.

   Load the environment variables at the beginning of your entry file:

   ```typescript
   import * as dotenv from 'dotenv';
   dotenv.config();
   ```

5. **Configure Authorization:**
This demonstration repository does not enable access controls to demonstrate the admin page at a conference.
I would encourage you to either enable Cognito authorization or at least basic HTTP auth. Serverless website analytics supports this and
you simply need to enable in in configuration.

## Deployment

1. **Bootstrap the CDK:**

   If this is your first time deploying a CDK app in the account/region, you need to bootstrap it:

   ```sh
   cdk bootstrap
   ```

2. **Deploy the Stacks:**

   Deploy the stacks using the CDK CLI:

   ```sh
   cdk deploy --all
   ```

## Contributing

I do not plan on actively maintaining this sample SPA application after AWS Community Day 2024, so feel free to fork it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the contributors of the [Serverless Website Analytics](https://github.com/rehanvdm/serverless-website-analytics) project.
