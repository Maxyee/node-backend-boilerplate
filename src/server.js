import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import { isAuthenticated } from './utils/isAuthenticated';


const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit:'50mb'}));

// user module
app.use("/user", routes.user);

// product module
app.use("/product", isAuthenticated, routes.product);


app.use((req, res) => {
    res.status(404).send('404: page not found');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})