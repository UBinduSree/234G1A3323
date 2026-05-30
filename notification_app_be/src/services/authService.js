const axios = require("axios");

let accessToken = null;

const getAccessToken = async () => {
  try {

    if (accessToken) {
      return accessToken;
    }

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      {
        email: process.env.EMAIL,
        name: process.env.NAME,
        rollNo: process.env.ROLLNO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      }
    );

    accessToken = response.data.access_token;

    return accessToken;

  } catch (error) {

    console.error(
      "Auth Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = getAccessToken;