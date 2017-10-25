# PwnedPasswordExpress

A quick and dirty NodeJS Express based API to check if a password has been breached. It uses [ParsePwnedPasswordFile.ps1](https://gist.github.com/meilon/d034ccf366d28343bf47ef59891acbaa) to partition the publicly available [PwnedPassword](https://haveibeenpwned.com/Passwords) files, offered by[Troy Hunt](https://www.troyhunt.com)


## Install

 - `git clone` this repo
 - `npm install`
 - Get a copy of Troy Hunts [PwnedPassword](https://haveibeenpwned.com/Passwords) files
 - Parse them with [ParsePwnedPasswordFile.ps1](https://gist.github.com/meilon/d034ccf366d28343bf47ef59891acbaa) and put the output into the `PasswordPartitions` folder
 - `npm run start`

## Usage
Point your browser to http://localhost:3000/ and start testing your passwords
Other apps can query the partitions through a POST of a sha1 password to the /check endpoint

     curl -i -H "Content-Type: application/json" -X POST -d '{"password":"5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"}' http://localhost:3000/check