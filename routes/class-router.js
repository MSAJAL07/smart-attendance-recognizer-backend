/**
 * @swagger
 * securityDefinitions:
 *      bearerAuth:
 *          type: apiKey
 *          schema: bearer
 *          name: Authorization
 *          bearerFormat: JWT
 *          in: "header"
 * security:
 *        - bearerAuth: []
 */



/**
 * @swagger
 * definitions:
 *    classObject:
 *       properties:
 *          name:
 *             type: string
 *          subject_name:
 *             type: string
 *          class_time:
 *             type: array
 *             items:
 *                type: object
 *                properties:
 *                   day:
 *                      type: string
 *                   time_slots:
 *                      type: array
 *                      items:
 *                         type: object
 *                         properties:
 *                            start_time:
 *                               type: string
 *                            end_time:
 *                               type: string
 */

/**
 * @swagger
 * /api/v1/create-class:
 *   post:
 *     tags:
 *       - class-controller
 *     description: Create new class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: classDetails
 *         description: classDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/classObject'
 *     responses:
 *       200:
 *         description: class created Successfully 
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */

