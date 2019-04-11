const express = require ('express');
const bodyParser = require ('body-parser')
const cors = require ('cors')
// const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
    {
        id: '123',
        name: 'John',
        // email: 'john@gmail.com',
        email: 'j',
        password: '1',
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
    login : {
        id: '987',
        hash: '',
        email: 'john@gmail.com'
    }
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    // console.log(req.body.password);
    // console.log(req.body.email);
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Success')
    } else {
        res.status(400).json('Nope')
    };
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    })
    database.users.push ({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
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