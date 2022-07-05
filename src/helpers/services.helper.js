const servicesNames = [
    "AyA",
    "ICE",
    "Cabletica",
    "Telecable",
    "CCSS",
    "Municipality",
    "TIGO",
    "SKY",
    "RACSA",
    "Kolbi",
    "Claro",
    "Accountants Association",
    "Indoor Club",
    "360 Fitness",
    "UCR Matricula",
    "TEC Matricula",
    "Spotify",
    "Netflix",
    "HBO Max",
    "Disney Plus"
];

const getRandomServices = (email) => {
    const maxAmountToPay = 25;
    const minNumberOfServices = 10;
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
        serviceName: service,
        amountToPay: Math.random() * maxAmountToPay,
        UserEmail: email,
    }));

    return servicesObjects;
};

module.exports = { getRandomServices };
