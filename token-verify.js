const jwt = require('jsonwebtoken');

const secret = 'myCat7';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5ODU5OTgyMn0.G-Jco0p0uni9E1jeZB9t5vyRnLvE6besJ27PmDrBu0I'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
