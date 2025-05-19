const generateRandomNumber = (min,max) => {
let randomNumber = Math.random() * (max-min)+min;
return parseInt(randomNumber);
}



export {generateRandomNumber};