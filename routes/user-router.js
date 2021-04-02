/**
 * @swagger
 * definition:
 *   LoginDetails:
 *     properties:
 *       email_id:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - common-controller
 *     description: Service Provider Login Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: LoginDetails
 *         description: LoginDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/LoginDetails'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */