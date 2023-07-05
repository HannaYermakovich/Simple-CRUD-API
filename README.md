# Simple-CRUD-API

## Hello, colleagues! Here's a short guide on how to review my work.

Please follow the steps below:

1. Install all dependencies by running the following command:
   
   ```bash
   npm install
2. In the `.env` file, you'll find the necessary port. Feel free to modify it if needed.

3. To launch the server in development mode, run the following command: **npm run start:dev**.

4. Open Postman on your local machine.

5. Send requests to the following URL: **http://localhost:4000/users**.
**Note:** The port number (**4000**) may vary (e.g., 3000, 5000, or 8080). Here, you can make requests and verify the responses.
**Note:** ALL MY ENDPOINTS DON'T INCLUDE **API/USERS**. ONLY **/USERS**

7. Test all the available methods and endpoints.

8. If you want to simulate **a server error (500)**, add the following code to line 47 of the `server.ts` file: **throw new Error('Something went wrong');**.

9. To check the production mode, run the following command: **npm run start:prod**.
After running this command, a `dist` folder will appear.

10. You can find all the `tests` in the test folder. There are 3 scenarios available.
Before run all test, please, **stop the server**. Click ctrl + c. After run command in terminal **npm run test**.
