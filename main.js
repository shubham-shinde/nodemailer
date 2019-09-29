import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';

import router from './route';

const PORT = '3000';

const app = express();

app.server = http.createServer(app);
app.use(clearConsole);
app.use(logger('dev'));
app.use((req, res, next) => {
    //console.log(req);
    //res.send(req);
    next()
})
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))


function clearConsole(req,res,next){
    //console.log('\x1Bc');
    next();
}

router(app);

app.server.listen(PORT, (err) => {
    if (err)
        console.log("server cant start due to::::"+ err);
    else
        console.log("server is running on the port "+ PORT);
})