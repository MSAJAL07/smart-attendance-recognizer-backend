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
 *    adminRegistartionObject:
 *       properties:
 *          email_id:
 *             type: string
 *          username:
 *             type: string
 *          password:
 *             type: string
 *          confirm_password:
 *             type: string
 *          org_name:
 *             type: string
 *          org_address:
 *             type: string
 *          establishment_year:
 *             type: number
 */

/**
 * @swagger
 * /api/v1/college-registration:
 *   post:
 *     tags:
 *       - user-controller
 *     description: User admin Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: adminDetails
 *         description: adminDetails object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/adminRegistartionObject'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */

/**
 * @swagger
 * definitions:
 *    studentRegistartionObject:
 *       properties:
 *          name:
 *             type: string
 *          phone_number:
 *             type: string
 *          email_id:
 *             type: string
 *          gender:
 *             type: string
 *          enrollment_number:
 *             type: string
 *          address:
 *             type: string
 *          year:
 *             type: string
 *          branch:
 *             type: string
 *          date_of_birth:
 *             type: string
 */

/**
 * @swagger
 * /api/v1/student-registration:
 *    post:
 *       security:
 *          - bearerAuth: []
 *       tags:
 *          - admin-controller
 *       description: New student registration
 *       produces:
 *          - application/json
 *       parameters:
 *          -  name: StudentDetails
 *             description: student details object
 *             in: body
 *             required: true
 *             schema:
 *                type: object
 *                $ref: '#/definitions/studentRegistartionObject'
 *       responses:
 *          200:
 *             description: Successfully created
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 */


/**
 * @swagger
 * definitions:
 *    teacherRegistartionObject:
 *       properties:
 *          name:
 *             type: string
 *          phone_number:
 *             type: string
 *          email_id:
 *             type: string
 *          gender:
 *             type: string
 *          faculty_id:
 *             type: string
 *          address:
 *             type: string
 *          date_of_birth:
 *             type: string
 */

/**
 * @swagger
 * /api/v1/teacher-registration:
 *    post:
 *       security:
 *          - bearerAuth: []
 *       tags:
 *          - admin-controller
 *       description: New teacher registration
 *       produces:
 *          - application/json
 *       parameters:
 *          -  name: TeacherDetails
 *             description: teacher details object
 *             in: body
 *             required: true
 *             schema:
 *                type: object
 *                $ref: '#/definitions/teacherRegistartionObject'
 *       responses:
 *          200:
 *             description: Successfully created
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 */


