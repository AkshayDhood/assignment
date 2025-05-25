import { Router } from 'express';
import { createNewUserController } from './user.controller';
import { validateBody } from '../../common/validations';
import { createNewUserRequestSchema } from './validators';

const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create New User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created New User
 */
router.post('/', validateBody(createNewUserRequestSchema), createNewUserController);

export default router;
