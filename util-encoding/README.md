# util-encoding

This example showcases some of the basic data encoding utils in quais. It is comprised of 3 example scripts:

- [base58.js](./base58.js) - base58 encoding utils
- [base64.js](./base64.js) - base64 encoding utils
- [rlp.js](./rlp.js) - RLP encoding utils

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/util-encoding`) and run:

```bash
npm install
```

Use nodejs to run any of the scripts in this example. For example:

```bash
node base58.js
```

## Example Breakdown

### base58.js

This script takes an initial string, decodes it to a Uint8Array, and then encodes it back to a string using base58. To run the script, you'll need to edit the `toDecode` variable:

```js
const toDecode = 'hello world'
```

Once you've done that, you can run the script with:

```bash
node base58.js
```

The script will output the decoded and encoded strings.

### base64.js

This script takes an initial string, decodes it to a Uint8Array, and then encodes it back to a string using base64. To run the script, you'll need to edit the `toDecode` variable:

```js
const toDecode = 'base64 encoding is fun!'
```

Once you've done that, you can run the script with:

```bash
node base64.js
```

The script will output the decoded and encoded strings.

### rlp.js

This script takes an initial hex-string, encodes it using RLP encoding, and then decodes it back to a hex-string. To run the script, you'll need to edit the `toEncode` variable:

```js
const toEncode = '0x1234'
```

Once you've done that, you can run the script with:

```bash
node rlp.js
```

The script will output the encoded and decoded hex-strings.
