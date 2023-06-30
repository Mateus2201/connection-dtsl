const state = require("../State/mains");
const request = require('request');
const Calls = require("../Model-Soap/Soap");
const requests = new Calls();
class CallFunction {
      constructor() {
            this.maxRetries = 5;
            this.retryInterval = 5000;
            this.retryCount = 0;
      }

      callProcedureWithToken(res, program, procedure, temp) {
            const makeRequest = () => {
                  request(requests.callProcedureWithToken({ token: state.load(), program, procedure, temp }), (error, response) => {
                        if (!response || response.statusCode !== 200) {
                              this.retryCount++;
                              if (this.retryCount <= this.maxRetries) {
                                    // this.getToken();
                                    setTimeout(makeRequest, this.retryInterval);
                                    console.log(`Erro na requisição (${response ? response.statusCode : 'N/A'}), tentando novamente em ${this.retryInterval / 1000} segundos.`);
                                    console.log(temp);
                              } else {
                                    res.send({
                                          statusCode: 500,
                                          body: {
                                                response: response,
                                                status: `Erro na requisição (${response ? response.statusCode : 'N/A'}), número máximo de tentativas atingido. ${response}`
                                          }
                                    });
                              }
                        } else {
                              res.send(response.body);
                        }
                  });
            };

            makeRequest();
      }

      getToken() {
            const currentDate = new Date().toISOString().slice(0, 10);
            request(requests.Login('rpw'), (error, response) => {
                  if (!error && response.statusCode === 200) {
                        const data = response.body;
                        state.save(data.substring(data.indexOf('<return>') + 8, data.indexOf('</return>')));
                        console.log(currentDate + ': Request token');
                  }
            });
      }
}

module.exports = new CallFunction();
