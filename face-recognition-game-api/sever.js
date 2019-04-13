const express = require ('express');
const bodyParser = require ('body-parser')
const cors = require ('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'face'
    }
});

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
    const { name, email, password } = req.body;
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
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert ({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => res.json(user[0]))
        })
    .then(trx.commit)
    .catch(err => res.status(400).json('unable to register'))
    // res.json(database.users[database.users.length-1])
    })
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     } 
    // })
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
    // if (!found) {
    //     res.status(404).json('no such user')
    // }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
    
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if (!found) {
    //     res.status(404).json('no such user')
    // }
})


app.listen(8000, () => {
    console.log('Spaceship is starting on platform 8000');  
})
