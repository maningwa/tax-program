import { nhifcontrib } from "./nhif.js"
import { nssfcontrib } from "./nssf.js"
import { deduct } from "./paye.js"

const process = ({name,PIN, basic, allowances = 0, period = new Date("1/aug/2023")})=>{
    let gross = parseFloat(basic) + parseFloat(allowances)
    let nhif = nhifcontrib(gross)
    console.log(gross)
    let nssf = nssfcontrib(gross,period)
    let paye = deduct([gross])-nssf
    let houselevy = (basic)*0.0015
    
    
    return `
        <div>
            PIN No.         :   ${PIN}  <br>
            Name            :   ${name} <br>
            PaySlip         :   ${period.getMonth()+"/"+period.getFullYear()} <hr>
            Basic Pay       :   ${basic.toLocaleString()}<br>
            Other Allowances:   ${allowances.toLocaleString()}<br>
            NHIF Deduction  :   ${nhif.toLocaleString()}<br>
            NSSF Deduction  :   ${nssf.toLocaleString()}<br>
            ${houselevy ? `Housing Levy\t:\t ${houselevy}<br>`:""}
            PAYE            :   ${paye.toLocaleString()}<br>
            Deductions      :   ${(nhif+nssf+houselevy + paye).toLocaleString()}<br>
            NET             :   ${(gross - nhif - nssf - houselevy - paye).toLocaleString()}
        <div>
        <br>
    `
}   


const body = document.querySelector("body")
body.insertAdjacentHTML("afterbegin",process({basic:[25000]}))
body.insertAdjacentHTML("afterbegin",process({basic:[30000]}))
body.insertAdjacentHTML("afterbegin",process({basic:[35000]}))
body.insertAdjacentHTML("afterbegin",process({basic:[55000]}))
