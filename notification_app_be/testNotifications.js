const axios = require("axios");
require("dotenv").config();

const getAccessToken =
require("./src/services/authService");

(async () => {

    try {

        const token =
        await getAccessToken();

        const response =
        await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        console.log(response.data);

    } catch(err){

        console.log(
            err.response?.data ||
            err.message
        );

    }

})();