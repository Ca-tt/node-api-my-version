import express from 'express';
import usersData from './../data/usersData.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.json({
      'users info': usersData,
    })
  })
  .post((req, res) => {
    const userParams = req.query;
    let user = getParams(userParams);
    console.log('- new user incoming -', user);

    user = userCheck(user);
    console.log('- user after validation -', user);

    function returnUserStatus(user) {
      for (const key in user) {
        if (user[key] == false) {
          return res.status(400).json({
            message: 'Кажется, ты сделал ошибку в вводе. Попробуй создать пользователя ещё раз',
            user: user,
            userData: usersData
          })
        }
        else continue;
      }

      usersData.push(user);

      return res.status(201).json({
        message: 'Ты успешно зарегистрирован! Можешь пользоваться нашим сайтом',
        user: user,
        userData: usersData
      })
    }

    returnUserStatus(user);
  })

function getParams(query) {
  return {
    id: query.id,
    name: query.name,
    username: query.username,
    password: query.password,
  }
}

function userCheck(user) {
  let id = user.id;
  let name = user.name;
  let username = user.username;
  let password = user.password;

  function getNewMaxId() {
    const ids = [];

    for (const user of usersData) {
      for (const key in user) {
        if (key == 'id') {
          ids.push(user.id)
        }
      }
    }

    // increase new id by id 
    return Math.max(...ids) + 1;
  }

  function checkId(id) {
    if (isNaN(id) || id.trim() == '') {
      id = getNewMaxId();
    }
    return Number(id);
  }

  function checkEmptyString(string) {
    if (string.trim() == '' || typeof (string) == 'undefined') {
      string = false;
    }
    return string;
  }

  return {
    id: checkId(id),
    name: checkEmptyString(name),
    username: checkEmptyString(username),
    password: checkEmptyString(password),
  }
}

export default router;




// * Задача: работа со списком пользователей
// имитация работы с БД

// * Список раутов

// 1. `GET /products`(get list)
// 2. `POST /products`(create new)
// 3. `GET /products/{productId}`(get single by id)
// 4. `PATCH /products/{productId}`(edit - change title, price for example)
//   5. `DELETE /products/{productId}`(delete)

// * Дополнительно
// сделать проверку на id, и если такой уже есть, генерить новый
// проверка на непустые поля, иначе не создавать пользователя и выводить на страницу уведомление