import express from 'express';
import cors from 'cors';
import process from 'node:process';

// import routing modules
import indexRoute from './routes/indexRoute.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// starting point for routing is here
app.use('/', indexRoute);

// app
//   .route('/api/users/:newUser')
//   .get((req, res) => {
//     console.log('- req query -', req.query);
//     console.log('- req body -', req.body);
//     console.log('- req.params -', req.params);
//     res.status(200).send(req.params);
//   })
//   .post((req, res) => {
//     let user = req.params.newUser;
//     console.log('- new user to be added -', user);
    
//     if (user != '' && user != undefined) {
//       users.push(user);
//       console.log('- users -', users);
//       res.status(201).send('User created');
//     }
//     else {
//       res.status(404).send("Can't create user. Check your params");
//     }
  // })


app.listen(port, () => {
  console.log(`- port is running on localhost:${port} -`);
})
