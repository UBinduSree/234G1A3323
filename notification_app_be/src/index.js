const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fetchNotifications = require("./services/notificationService");

const app = express();

app.use(cors());

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

app.get("/notifications", async (req, res) => {

  try {

    const notifications =
      await fetchNotifications();

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching notifications"
    });

  }
});

app.get("/priority", async (req, res) => {

  try {

    const notifications =
      await fetchNotifications();

    const top10 = notifications
      .map(notification => ({
        ...notification,
        score:
          weights[notification.Type] * 1000000000000 +
          new Date(notification.Timestamp).getTime()
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json(top10);

  } catch (error) {

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