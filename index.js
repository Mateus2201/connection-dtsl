const callfunction = require("./Function/Function");
const customExpres = require("./service/express");
const port = 5000;

const app = customExpres();

callfunction.getToken();
setInterval(callfunction.getToken, 30 * 60 * 1000);

app.get('/request/procedure', (req, res) => {
      callfunction.callProcedureWithToken(res, req.query['program'], req.query['procedure'], req.query['temp'], req.clientIp)
})

app.listen(port, () => {
      console.log("Servidor Node Rodando na porta 5000");
})