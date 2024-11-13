/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User API's]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Register a new user
 *     tags: [User API's]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */



/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User API's]
 *     responses:
 *       200:
 *         description: Profile retrieved
 *       404:
 *         description: User not found
 */
