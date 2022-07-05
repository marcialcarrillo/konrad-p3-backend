require("dotenv").config();

const ibanToAccNumber = (iban) => {
    const slicedIban = iban.slice(2);
    const account = BigInt(slicedIban) - BigInt(process.env.IBAN_SEED);
    return Number(account);
};

const accNumberToIban = (accNumber) => {
    const account = BigInt(accNumber) + BigInt(process.env.IBAN_SEED);
    const iban = `CR${account}`;
    return iban;
};

module.exports = { ibanToAccNumber, accNumberToIban };
