module.exports = {
   zapHostName: process.env.ZAP_HOST || "192.168.56.20",
   zapPort: process.env.ZAP_PORT || "8080",
   zapApiKey: process.env.ZAP_API_KEY || "",
   zapApiFeedbackSpeed: 5000
};