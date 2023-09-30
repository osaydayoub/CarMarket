const carMarket = require("./obj.js");
//console.log(carMarket.sellers[0]);

// 1. Agency Operations
// Search for a car agency by its name or ID.
carMarket.getCarAgency = function (nameOrId) {
    this.sellers.forEach(agency => {
        if (agency.agencyName === nameOrId || agency.agencyId === nameOrId) {
            console.log(agency);
        }
    })
}
// carMarket.getCarAgency("26_IPfHU1");
// carMarket.getCarAgency("Best Deal");

// return agency without console for my use!
carMarket.getAgency = function (nameOrId) {
    let returnAgency;
    this.sellers.forEach(agency => {
        if (agency.agencyName === nameOrId || agency.agencyId === nameOrId) {
            returnAgency = agency;
        }
    })
    return returnAgency;
}


// Retrieve all agencies' names.
carMarket.getAllAgencies = function () {
    //const agenciesNames = [];
    this.sellers.forEach(agency => {
        agenciesNames.push(agency.agencyName);
    })
    console.log(agenciesNames);
    //return agenciesNames;
}
//test
//carMarket.getAllAgencies();

// Add a new car to an agency's inventory
//get name or id of an agency ,and car brand and model,
//assume that the brand is in the agency

carMarket.addCar = function (nameOrId, brand, carModel) {
    let currentAgency = this.getAgency(nameOrId);
    let carAdded = false;
    if (currentAgency !== undefined) {
        for (car of currentAgency.cars) {
            if (car.brand === brand) {
                car.models.push(carModel)
                carAdded = true;
                break;
            }
        }
        // if we are here and car not added its mean we don't find a brand in the agency 
        //that matches the given brand so we add new one!
        if (!carAdded) {
            currentAgency.cars.push({
                brand:brand,
                models:[carModel]
            })
        }
    }
}
// //test
// const newCar = {
//     name: "3",
//     year: 2015,
//     price: 137000,
//     carNumber: "1111",
//     ownerId: "OSA5M5AZ",
// }
// let res = carMarket.getAgency('Best Deal');
// console.log(res.cars[1])
// carMarket.addCar('Best Deal', 'toyota', newCar);
// console.log(res.cars[1])

//Remove a car from an agency's inventory.
// gets name or id of an agency ,car brand and carNumber to be removed
carMarket.removeCarFromAgency = function (nameOrId, brand, carNumber) {
    let currentAgency = this.getAgency(nameOrId);
    let removedCar;
    if (currentAgency !== undefined) {
        for (car of currentAgency.cars) {
            if (car.brand === brand) {
                car.models.forEach((model, index) => {
                    if (model.carNumber === carNumber) {
                        removedCar = car.models[index];
                        car.models.splice(index, 1);
                    }
                })
                break;
            }
        }
    }
    return removedCar;
}
// test
// let res = carMarket.getAgency('The Auto World');
// console.log(res.cars[1])
// carMarket.removeCarFromAgency('The Auto World', 'toyota','kHE8f');
// console.log(res.cars[1])

//Change the cash or credit of an agency.
//gets the name or id of an agency,and newCash will be the new cash value of the agancy
carMarket.changeCash = function (nameOrId, newCash) {
    let agency = this.getAgency(nameOrId);
    agency.cash = newCash;
}
//gets the name or id of an agency,and newCredit will be the new credit value of the agancy
carMarket.changeCredit = function (nameOrId, newCredit) {
    let agency = this.getAgency(nameOrId);
    agency.credit = newCredit;
}
//Update the price of a specific car in an agency (Method: updateCarPrice ).
//gets the name or id of an agency, brand and carNumber and the newPrice.
carMarket.updateCarPrice = function (nameOrId, brand, carNumber, newPrice) {
    let agency = this.getAgency(nameOrId);
    if (agency !== undefined) {
        for (car of agency.cars) {
            if (car.brand === brand) {
                car.models.forEach((model, index) => {
                    if (model.carNumber === carNumber) {
                        car.models[index].price = newPrice;
                    }
                })
                break;
            }
        }
    }
}
// test
// let res = carMarket.getAgency('The Auto World');
// console.log(res.cars[1])
// carMarket.updateCarPrice('The Auto World', 'toyota','-RQgN',90000);
// console.log(res.cars[1])

// Calculate and return the total revenue for a specific agency
carMarket.getTotalAgencyRevenue = function (nameOrId) {
    let agency = this.getAgency(nameOrId);
    let revenue = 0;
    if (agency !== undefined) {
        for (brand of agency.cars) {
            for (car of brand.models) {
                revenue += car.price;
            }
        }
    }
    console.log(revenue);
    return revenue;
}
// test
// let res = carMarket.getAgency('The Auto World');
// console.log(res)
// res=carMarket.getTotalAgencyRevenue('The Auto World');
// res

//Transfer a car from one agency to another
// get a brand and carnumber,and nameOrId1 is the current name or id of the car's agency
// and transfer it to the agency that have the name or id =nameOrId2
carMarket.transferCarBetweenAgencies = function (brand, carNumber, nameOrId1, nameOrId2) {
    let agency1 = this.getAgency(nameOrId1);
    let agancy2 = this.getAgency(nameOrId2);
    let transferCar;
    if (agency1 !== undefined && agancy2 !== undefined) {
        transferCar = this.removeCarFromAgency(nameOrId1, brand, carNumber);
        if (transferCar !== undefined) {
            this.addCar(nameOrId2, brand, transferCar)
        }
    }
}

// //test
// let res = carMarket.getAgency('CarMax');
// console.log(res);
// console.log('CarMax:+B+\n',res.cars[3]);
// let res2 = carMarket.getAgency('The Auto World');
// console.log(res2);
// carMarket.transferCarBetweenAgencies('Alpha romeo', '6t7QU', 'CarMax', 'The Auto World');
// console.log('CarMax:+A+\n',res.cars[3])
// console.log(res2);
// console.log('The Auto World:+A+\n',res2.cars[res2.cars.length-1]);


