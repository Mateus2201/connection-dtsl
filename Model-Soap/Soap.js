const url = 'http://ip-fornecedor/wsexecbo/WebServiceExecBO?wsdl'
const soapenv = 'http://schemas.xmlsoap.org/soap/envelope/'
const ser = 'http://service.execbo.ws.framework.totvs.com'
const headers = { 'Content-Type': 'text/xml' }
const method = 'POST'
class Calls {
      Login(login) {
            return {
                  'method': method, 'url': url, 'headers': headers,
                  body: `<soapenv:Envelope xmlns:soapenv="${soapenv}" xmlns:ser="${ser}"> 
                              <soapenv:Header/> <soapenv:Body> <ser:userLogin> <arg0>${login}</arg0> </ser:userLogin> </soapenv:Body> 
                        </soapenv:Envelope>`
            };
      }

      callProcedureWithToken({ token, program, procedure, temp }) {
            return {
                  'method': method, 'url': url, 'headers': headers,
                  body: `<soapenv:Envelope xmlns:soapenv="${soapenv}" xmlns:ser="${ser}"> 
                              <soapenv:Header/><soapenv:Body>
                                    <ser:callProcedureWithToken> <arg0>${token}</arg0> <arg1>${program}</arg1> <arg2>${procedure}</arg2> <arg3>${temp}</arg3> </ser:callProcedureWithToken>
                              </soapenv:Body>
                        </soapenv:Envelope>`
            };
      }

}

module.exports = Calls;

