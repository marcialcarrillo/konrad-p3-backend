const ibanToAccNumber = (iban) => {
    const slicedIban = iban.slice(2);
    //TODO: use env variables
    const account = BigInt(slicedIban) - BigInt(41015201001092741156);
    return Number(account);
};

const accNumberToIban = (accNumber) => {
    //TODO: use env variables
    const account = BigInt(accNumber) + BigInt(41015201001092741156);
    const iban = `CR${account}`;
    return iban;
};

module.exports = { ibanToAccNumber, accNumberToIban };
