function NumberGenerator(){
    var chars = '1234567890',
    serialLength = 9, randomSerial = "", i, randomNumber;
    for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
}

export default NumberGenerator;