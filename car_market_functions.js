const carMarket = require("./obj.js");
//console.log(carMarket.sellers[0]);

// 1. Agency Operations start ---------------------------------------------------------------------
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
    const agenciesNames = [];
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
                brand: brand,
                models: [carModel]
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
        console.log(revenue);
        return revenue;
    }
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

// Agency Operations end ------------------------------------------------------------------------

//2. Customer Operations:start--------------------------------------------------------------------- 
// Search for a customer by their name or ID.
carMarket.getTheCustomer = function (nameOrId) {
    this.customers.forEach(customer => {
        if (customer.name === nameOrId || customer.id === nameOrId) {
            console.log(customer);
        }
    })
}
// //test
// carMarket.getTheCustomer('Lilah Goulding');
// carMarket.getTheCustomer('cnTobUDy6');

//for use in other functions
carMarket.getCustomer2 = function (nameOrId) {
    let customer1;
    this.customers.forEach(customer => {
        if (customer.name === nameOrId || customer.id === nameOrId) {
            customer1 = customer;
        }
    })
    return customer1;
}

// Retrieve all customers' names.
carMarket.getAllCustomers = function () {
    const customersNames = [];
    this.customers.forEach(customer => {
        customersNames.push(customer.name);
    })
    console.log(customersNames);
    //return customersNames;
}
// //test
// carMarket.getAllCustomers();

// Change the cash of a customer.
//gets customer nameOrId and change the customer cash to newCash
carMarket.ChangeCustomerCash = function (nameOrId, newCash) {
    let customer = this.getCustomer2(nameOrId);
    if (customer !== undefined) {
        customer.cash = newCash;
    }
}
// //test
// carMarket.getTheCustomer('Ravi Murillo');
// carMarket.ChangeCustomerCash('Ravi Murillo',30000);
// carMarket.getTheCustomer('Ravi Murillo');

// Calculate the total value of all cars owned by a specific customer
carMarket.getCustomerTotalCarValue = function (nameOrId) {
    let customer1 = this.getCustomer2(nameOrId);
    let totalValue = 0
    if (customer1 !== undefined) {
        for (car of customer1.cars) {
            totalValue += car.price;
        }
        console.log(totalValue);
        return totalValue;
    }
}
// //test
// let res;
// res=carMarket.getCustomerTotalCarValue('Lilah Goulding');
// res
// res=carMarket.getCustomerTotalCarValue('Ravi Murillo');
// res
// res=carMarket.getCustomerTotalCarValue('Bob Steel');
// res
// res=carMarket.getCustomerTotalCarValue('Will Reyes');
// res
//   Customer Operations:end----------------------------------------------------------------------- 

//3. Car Operations:start-------------------------------------------------------------------------- 
// Retrieve all cars available for purchase.
carMarket.carsAvailable = function () {
    const carsArray = [];
    for (agancy of this.sellers) {
        for (brand of agancy.cars) {
            for (car of brand.models) {
                carsArray.push(car);
            }
        }
    }
    console.log(carsArray);
    return carsArray;
}
// //test
// carMarket.carsAvailable();

carMarket.carsAvailableWithBrand = function (brand) {
    const carsArray = [];
    for (agancy of this.sellers) {
        for (b of agancy.cars) {
            if (b.brand === brand || brand === '') {
                for (car of b.models) {
                    carsArray.push(car);
                }
            }
        }
    }
    return carsArray;
}
// //test
// carMarket.carsAvailableWithBrand('bmw');

// Search for cars based on certain criteria. The search parameters should include the
// production year, price, and optionally, the brand of the car
carMarket.searchCars = function (year, price, brand = '') {
    let carsArray = [];
    let wantedCars = []
    carsArray = this.carsAvailableWithBrand(brand);
    carsArray.forEach(car => {
        if (car.year === year && car.price === price) {
            wantedCars.push(car);
        }
    })
    console.log(wantedCars);
    return wantedCars;
}
// //test
// let res = carMarket.searchCars(2019, 296900);
// res
// res = res.length;
// res

// Return the most expensive car available for sale
carMarket.getMostExpensiveCar = function () {
    let carsArray = this.carsAvailableWithBrand('');
    let expensiveCar;
    for (car of carsArray) {
        if (expensiveCar === undefined || expensiveCar.price < car.price) {
            expensiveCar = car;
        }
    }
    console.log(expensiveCar);
    return expensiveCar;
}

//Return the cheapest car available for sale
carMarket.getCheapestCar = function () {
    let carsArray = this.carsAvailableWithBrand('');
    let cheapestCar;
    for (car of carsArray) {
        if (cheapestCar === undefined || cheapestCar.price > car.price) {
            cheapestCar = car;
        }
    }
    console.log(cheapestCar);
    return cheapestCar;
}
// //test
// carMarket.carsAvailable();
// console.log('MostExpensiveCar----->');
// carMarket.getMostExpensiveCar();
// console.log('CheapestCar----->');
// carMarket.getCheapestCar();

//   Car Operations:end------------------------------------------------------------------------------ 
//4. Car Purchase Operations:start---------------------------------------------------------------------
// Implement a sellCar function that sells a car to a specific customer. This function
// should:
// 1.Check the availability of the car at the agency.
// 2.Verify if the customer has enough cash to purchase the car.
// 3.Update the cash and credit for both the agency and the customer accordingly.
// 4.Update the tax authority's records.
//gets name or id of the customer , name or id of agancy 
carMarket.sellCar = function (customerNameOrId, agancyNameOrId2, brandName, carName, year) {
    let customer = this.getCustomer2(customerNameOrId);
    let agancy = this.getAgency(agancyNameOrId2);
    let wantedCar;
    if (customer !== undefined && agancy !== undefined) {
        for (car of agancy.cars) {
            if (car.brand === brandName) {
                for (model of car.models) {
                    if (model.name === carName && model.year === year && model.price <= customer.cash) {
                        wantedCar = model;
                        break;
                    }
                }
            }
            if (wantedCar !== undefined) {
                break;
            }
        }
        // we found an appropriate car!
        if (wantedCar !== undefined) {
            this.removeCarFromAgency(agancy.agencyId,brandName, wantedCar.carNumber);
            agancy.cash+=wantedCar.price;
            wantedCar.ownerId=customer.id;
            customer.cash-=wantedCar.price;
            customer.cars.push(wantedCar);
            // TODO Update the tax authority's records.



        }
    }
}
// //test
// let res = carMarket.getAgency('CarMax');
// console.log(res);
// console.log('CarMax:+B+\n',res.cars[1]);
// let res2=carMarket.getCustomer2('Ravi Murillo');
// console.log(res2);
// carMarket.sellCar('Ravi Murillo','CarMax','toyota','Land Cruiser',2005);
// console.log('customer A---->',res2);
// console.log('agency-=--=-=A',res);
// console.log('CarMax:+A---+\n',res.cars[1]);





// Calculate and return the total revenue of the entire market (Method:
//     getTotalMarketRevenue ).

//   Car Purchase Operations:end---------------------------------------------------------------------
