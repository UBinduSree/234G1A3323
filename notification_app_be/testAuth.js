require("dotenv").config();

const getAccessToken =
require("./src/services/authService");

(async () => {

    try {

        const token =
        await getAccessToken();

        console.log(token);

    } catch(err) {

        console.log(
            err.response?.data ||
            err.message
        );

    }

})();