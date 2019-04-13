const express = require ('express');
const bodyParser = require ('body-parser')
const cors = require ('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
import PASSWORD from './env'

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: PASSWORD,
        database: 'face'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
    {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'Wun',
        email: 'wun@gmail.com',
        password: 'wookies',
        entries: 0,
        joined: new Date()
    }
    ],
    // login : {
    //     id: '987',
    //     hash: '',
    //     email: 'john@gmail.com'
    // }
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json('Something went wrong')
    };
})

app.post('/register', (req, res) => {
    const { name, email } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // })
    // database.users.push ({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     entries: 0,
    //     joined: new Date()
    // })
    db('users')
    .returning('*')
    .insert ({
        name: name,
        email: email,
        joined: new Date()
    })
    .then(user => res.json(user[0])
    .catch(err => res.status(400).json('unable to register'))
    )
    // res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(404).json('no such user')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('no such user')
    }
})


app.listen(8000, () => {
    console.log('Spaceship is starting on platform 8000');  
})

// {
// "email": "john@gmail.com",
// "password": "cookies"
// }