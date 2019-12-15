function checkCashRegister(price, cash, cid) {
    let copyCid = getCopyCid(cid)
    let returnVal = {
        status: '',
        change: ''
    };
    let currencyReferenceName = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"]
    let currencyReferenceValue = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20.00, 100]
    let changeCurrencyUsed = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00]
    let changeToReturn = []

    let amountToReturn = Number(cash).toFixed(2) - Number(price).toFixed(2)
    let totalCashInDrawer = getTotalCashInDrawer(cid)

    // console.log('>> total in cid: '+totalCashInDrawer)
    // console.log('>> amount to return: '+amountToReturn)

    if (totalCashInDrawer < amountToReturn) { // case no money give change
        returnVal.status = "INSUFFICIENT_FUNDS"
        returnVal.change = changeToReturn
        return returnVal;
    }

    for (let i = currencyReferenceValue.length - 1; i >= 0; i--) {
        let currentCurrencyValue = currencyReferenceValue[i]
        let currentCurrencyName = currencyReferenceName[i]

        if (currentCurrencyValue < amountToReturn) {                
            if (cid[i][1] > 0) {  // Case when no currency to give change even though total change is higher
                let loopOnCurrency = true
                while(loopOnCurrency){
                    
                    amountToReturn = Number(amountToReturn).toFixed(2) - Number(currentCurrencyValue).toFixed(2)
                    cid[i][1] = Number(cid[i][1]).toFixed(2)  - Number(currentCurrencyValue).toFixed(2)
                    changeCurrencyUsed[i] += currentCurrencyValue
                    
                    if( amountToReturn <= 0 || cid[i][1] <= 0 || amountToReturn < currentCurrencyValue){
                        loopOnCurrency = false
                    }
                }
                changeToReturn.push([currentCurrencyName, changeCurrencyUsed[i]])
                if(amountToReturn == 0){

                    if(getTotalCashInDrawer(cid) == 0){
                        returnVal.status = "CLOSED"
                        returnVal.change = copyCid
                        return returnVal;
                    }else{
                        returnVal.status = "OPEN"
                        returnVal.change = changeToReturn
                        return returnVal;
                    }
                }

            }
        }
    }// end for

    if(amountToReturn > 0){
        returnVal.status = "INSUFFICIENT_FUNDS"
        returnVal.change = []
        return returnVal;
    }

    returnVal.status = "OPEN"
    returnVal.change = changeToReturn
    return returnVal;


}

// ==================================================
function getTotalCashInDrawer(cid) {
    let total = 0
    for (let i = 0; i < cid.length; i++) {
        let currentCurrency = cid[i]
        total += currentCurrency[1]
    }
    return total
}

function getCopyCid(cid){
    let returnVal = []

    for(let i = 0; i< cid.length; i++){
        returnVal.push(cid[i].slice())
    }

    return returnVal
}



// ----- Test cases
// test = checkCashRegister(19.5, 20, [ ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0] ])  // ==== OK
test = checkCashRegister(19.5, 20, [ ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0] ])

// test = checkCashRegister(3.26, 100, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ]); // ===> OK
// test = checkCashRegister(19.5, 20, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ]); // ===> OK
// test = checkCashRegister(19.5, 20, [ ["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0] ])  // ===> OK


console.log('=====================================')
console.log(test)
console.log('=====================================')