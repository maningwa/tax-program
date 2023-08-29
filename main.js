import { nhifcontrib } from "./nhif.js"
import { nssfcontrib } from "./nssf.js"
import { deduct } from "./paye.js"

const process = ({name,PIN, basic, allowances = 0, period = new Date("1/aug/2023")})=>{
    let gross = parseFloat(basic) + parseFloat(allowances)
    let nhif = nhifcontrib(gross)
    console.log(gross)
    let nssf = nssfcontrib(gross,period)
    let paye = deduct([gross])-2400 - (0.15*nhif)
    let houselevy = gross *0.015
    
    
    return `
        <div class = "slip">
            <div class="detail"><strong> PIN No.         </strong>:   ${PIN || "____"}  </div>
            <div class="detail"><strong> Name            </strong>:   ${name || "___"} </div>
            <div class="detail"><strong> PaySlip         </strong>:   ${period.getMonth()+"/"+period.getFullYear()} </div>
            <div class="detail"><strong> Basic Pay       </strong>:   ${basic.toLocaleString()} </div>
            <div class="detail"><strong> Other Allowances</strong>:   ${allowances.toLocaleString()}</div>
            <div class="detail"><strong> NHIF Deduction  </strong>:   ${nhif.toLocaleString()}</div>
            <div class="detail"><strong> NSSF Deduction  </strong>:   ${nssf.toLocaleString()}</div>
            <div class="detail">${houselevy ? `<strong>Housing Levy</strong>:\t ${houselevy.toLocaleString()}`:""}</div>
            <div class="detail"><strong> NHIF relief     </strong>:   ${(nhif*0.15).toLocaleString()}</div>
            <div class="detail"><strong> PAYE            </strong>:   ${paye.toLocaleString()}</div>
            <div class="detail"><strong> Deductions      </strong>:   ${(nhif+nssf+houselevy + paye).toLocaleString()}</div>
            <div class="detail"><strong> NET             </strong>:   ${(gross - nhif - nssf - houselevy - paye).toLocaleString()} </div>
        </div>
    `
}   


const body = document.querySelector("body")
body.insertAdjacentHTML("afterbegin",process({basic:[35000]}))
body.insertAdjacentHTML("afterbegin",process({basic:[45000]}))
body.insertAdjacentHTML("afterbegin",process({basic:[40000]}))

