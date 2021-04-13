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
 * /api/v1/upload-student-images/{user_id}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - attendance-controller
 *     description: Upload images
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: student details
 *         in: path
 *         type: string
 *       - name: studentImages
 *         description: image to train face
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Image trained successfuly
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 */
