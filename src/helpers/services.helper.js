const servicesNames = [
    "AyA",
    "ICE",
    "Cabletica",
    "Telecable",
    "CCSS",
    "Municipalidad",
    "Impuesto de Renta",
];

const getRandomServices = (email) => {
    const maxAmountToPay = 25;
    const minNumberOfServices = 3;
    let randomNumOfServices = Math.round(Math.random() * servicesNames.length);

    //shuffle the services
    const servicesSubset = servicesNames.sort(() => 0.5 - Math.random());

    //get a random subset of the shuffled array
    const slicedServices = servicesSubset.slice(
        0,
        Math.max(randomNumOfServices, minNumberOfServices)
    );

    
    //create the services to be used in a bulk create
    const servicesObjects = slicedServices.map((service) => ({
        debtorEmail: email,
        serviceName: service,
        amountToPay: Math.random() * maxAmountToPay,
    }));

    return servicesObjects;
};

module.exports = { getRandomServices };
