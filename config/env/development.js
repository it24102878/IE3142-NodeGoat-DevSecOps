module.exports = {
   // Optional ZAP security regression-test configuration
   zapHostName: process.env.ZAP_HOST || "192.168.56.20",
   zapPort: process.env.ZAP_PORT || "8080",

   // ZAP API key must come from the runtime environment
   zapApiKey: process.env.ZAP_API_KEY || "",

   zapApiFeedbackSpeed: 5000,

   environmentalScripts: [
      `<script>document.write("<script src='http://" + (location.host || "localhost").split(":")[0] + ":35729/livereload.js'></" + "script>");</script>`
   ]
};