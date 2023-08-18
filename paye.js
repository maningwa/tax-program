const bandsize = 8333;
const taxablemin = 24000



//KRA PAYE rates pred covid period
const rates20_precovid = [
    {band: 0,rate: 0.1  ,lower: 0,                  upper: 12299                },
    {band: 2,rate: 0.15 ,lower: 12299,              upper: 12299 + 11587        },
    {band: 2,rate: 0.20 ,lower: 12299 + 11587,      upper: 12299 + (11587*2)    },
    {band: 3,rate: 0.25 ,lower: 12299 + (11587*2),  upper: Infinity             },
]

//KRA PAYE rates covid period
const rates20_covid = [
    {band: 0,rate: 0.1  ,lower: 0,                          upper: taxablemin               },
    {band: 2,rate: 0.15 ,lower: taxablemin,                 upper: taxablemin + 16666.67    },
    {band: 2,rate: 0.20 ,lower: taxablemin + 16666.67,      upper: taxablemin + (16666.67*2)},
    {band: 3,rate: 0.25 ,lower: taxablemin + (16666.67*2),  upper: Infinity                 },
]
///KRA PAYE Rates unde the Finance ACT 2021 till 2021
const rates21_23 = [
    {band: 0,rate: 0.1  ,lower: 0,                          upper: taxablemin                   },
    {band: 2,rate: 0.25 ,lower: taxablemin,                 upper: taxablemin + bandsize        },
    {band: 3,rate: 0.3  ,lower: taxablemin + bandsize * 2,  upper: Infinity                     },
]
/// KRA PAYEE Rates under the FINANCE ACT 2023
const rates23 = [
    {band: 0,rate: 0.1  ,lower: 0,                          upper: taxablemin                   },
    {band: 2,rate: 0.25 ,lower: taxablemin,                 upper: taxablemin + bandsize        },
    {band: 3,rate: 0.3  ,lower: taxablemin + bandsize * 2,  upper: 300000                       },
    {band: 4,rate: 0.325,lower: 300000,                     upper: 800000                       },
    {band: 5,rate: 0.35 ,lower: 800000,                     upper: Infinity                     },
]

export const deduct = ([taxablevalue,rates=rates23]) => {
    let accumulated = 0
    let deducting = true;
    let i = 0;
    while (deducting){
        if(taxablevalue<=rates[i].upper){
            accumulated+=(taxablevalue-rates[i].lower)*rates[i].rate
            deducting= false;
        }else{
            accumulated+= rates[i].rate*(rates[i].upper-rates[i].lower)
            i++;
        }
    }
   return accumulated
}