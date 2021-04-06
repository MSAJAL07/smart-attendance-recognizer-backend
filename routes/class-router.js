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
 * /api/v1/classes/create-class:
 *   post:
 *     security:
 *      - bearerAuth: []
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


/**
 * @swagger
 * definitions:
 *    studentsArray:
 *         properties:
 *          students:
 *              type: array
 *              items:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/classes/{id}/add-students:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - class-controller
 *     description: Add students
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of class.
 *         in: path
 *         required: true
 *         type: string
 *       - name: studentsArray
 *         description: student's id list
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/studentsArray'
 *     responses:
 *       200:
 *         description: list of students added
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */


/**
 * @swagger
 * /api/v1/classes/get-classes:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - class-controller
 *     description: Get classes of user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: id of user (Not mandatory)
 *         in: query
 *         schema:
*           type: string
 *       - name: user_type
 *         description: type of user("Student","Teacher") (Not mandatory)
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: list of classes for loggedin user
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */