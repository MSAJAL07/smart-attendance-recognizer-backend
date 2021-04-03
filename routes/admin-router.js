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


