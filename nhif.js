const nhif_2015=[
    {band:0,    lower:0,        upper:5999  , contribution: 150 },
    {band:1,    lower:6000,     upper:7999  , contribution: 300},
    {band:2,    lower:8000,     upper:11999 , contribution: 400},
    {band:3,    lower:12000,    upper:14999 , contribution: 500},
    {band:4,    lower:15000,    upper:19999 , contribution: 600},
    {band:5,    lower:20000,    upper:24999 , contribution: 750},
    {band:6,    lower:25000,    upper:29999 , contribution: 850},
    {band:7,    lower:30000,    upper:34999 , contribution: 900},
    {band:8,    lower:35000,    upper:39999 , contribution: 950},
    {band:9,    lower:40000,    upper:44999 , contribution: 1000},
    {band:10,   lower:45000,    upper:49999 , contribution: 1150},
    {band:11,   lower:50000,    upper:59999 , contribution: 1200},
    {band:12,   lower:60000,    upper:69999 , contribution: 1300},
    {band:13,   lower:70000,    upper:79999 , contribution: 1400},
    {band:14,   lower:80000,    upper:89999 , contribution: 1500},
    {band:15,   lower:90000,    upper:99999 , contribution: 1600},
    {band:16,   lower:10000,    upper:Infinity,contribution:1700},
]



export const nhifcontrib = (gross) => {
    let i = 0
    while (1){
        if(nhif_2015[i].upper<gross){
            i++
        }else{
            return nhif_2015[i].contribution
        }
    }
}