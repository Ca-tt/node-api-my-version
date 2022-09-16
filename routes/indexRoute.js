import express from 'express';
import usersRoute from './usersRoute.js';
import appPath from './appPath.js';

const router = express.Router();

router.use(appPath.users, usersRoute);

// base '/api' route
router
  .route(appPath.base)

  .get((req, res) => {
    const responseMessage = 'connected to backed server';

    res.status(200).json({
      message: responseMessage,
      status: res.statusCode,
    })
  })

export default router;
