import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import path from 'path';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT ?? 3005, () => {
  console.log(`Listening on port ${process.env.PORT ?? 3005}`);
});
