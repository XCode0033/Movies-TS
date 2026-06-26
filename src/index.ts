import express, { Request, Response } from 'express';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import router from './routes/router';
import methodOverride from "method-override";
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


app.use("/", router);
app.use(errorHandler) //global error handler.
app.listen(3000, () => {
  console.log('Listening on port 3000 http://localhost:3000');
});
