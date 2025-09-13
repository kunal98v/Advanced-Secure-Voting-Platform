const cron = require("node-cron");

cron.schedule("30 22 * * *", () => {
  console.log("Cron running at 10:30 PM 🚀");
});
