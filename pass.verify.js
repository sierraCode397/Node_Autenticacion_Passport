const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$CCOfTOrNK7gVaz.bOSaCmepiBL6vaAHB/NnSwfXb4Mxu/Ba/kMq86'
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPassword();
