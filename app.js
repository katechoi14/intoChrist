import express from 'express';
import session from 'express-session';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const staticDir = express.static(__dirname + '/public');
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
};

app.use('/public', staticDir);
app.use(express.urlencoded( {extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.use(express.json());
app.use(
    session({
        name: 'AuthenticationState',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: false
    })
);

// Todo: middleware functions

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});

