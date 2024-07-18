import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import GarageController from './resources/garage/garage.controller';

validateEnv();

const app = new App([
    new GarageController()
], Number(process.env.PORT));

app.listen();