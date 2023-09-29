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

// Retrieve all agencies' names.
carMarket.getAllAgencies = function () {
    const agenciesNames = [];
    this.sellers.forEach(agency => {
        agenciesNames.push(agency.agencyName);
    })
    console.log(agenciesNames);
}
//test
//carMarket.getAllAgencies();


