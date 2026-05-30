
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Log = require("./middleware/logger");
const getAccessToken = require("./services/authService");
const fetchNotifications = require("./services/notificationService");
//const fetchNotifications = require("./services/notificationService");

const app = express();

app.use(cors());

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

app.get("/notifications", async (req, res) => {

    try {

        const token =
        await getAccessToken();

        await Log(
            "backend",
            "info",
            "service",
            "Fetching notifications",
            token
        );

        const notifications =
        await fetchNotifications();

        res.json(notifications);

    } catch(error) {

        console.log(error);

        res.status(500).json({
            message:
            "Error fetching notifications"
        });
    }

});



app.get("/priority", async (req, res) => {

    try {

        const token =
        await getAccessToken();

        await Log(
            "backend",
            "info",
            "service",
            "Generating priority notifications",
            token
        );

        const notifications =
        await fetchNotifications();

        const weights = {
            Placement: 3,
            Result: 2,
            Event: 1
        };

        const top10 =
        notifications
            .map(notification => {

                const weight =
                weights[
                    notification.Type
                ] || 0;

                return {
                    ...notification,
                    score:
                    weight *
                    1000000000000 +
                    new Date(
                        notification.Timestamp
                    ).getTime()
                };
            })
            .sort(
                (a,b)=>
                b.score-a.score
            )
            .slice(0,10);

        res.json(top10);

    } catch(error) {

        const token =
        await getAccessToken();

        await Log(
            "backend",
            "error",
            "handler",
            error.message,
            token
        );

        res.status(500).json({
            message:
            "Error generating priority inbox"
        });
    }

});
app.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );

});