# util-shard-from-address

This example shows how to return the name of a shard from the byte prefix of an address.

## Dependencies

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [`quais`](https://www.npmjs.com/package/quais) - Quai JavaScript SDK

## Usage

To install dependencies, navigate to this directory (`quais-by-example/util-shard-from-address`) and run:

```bash
npm install
```

Use nodejs to run the example script:

```bash
node index.js
```

## Example Breakdown

The `index.js` script takes in a single address and returns the shard name of that address. To run the script, you'll need to edit the `address` variable:

```js
const address = '0x12d93219393DD6365552e5c8F3ea011C8c1F2edB' // cyprus 1 address
```

The possible return options are `zone-0-0`, `zone-0-1`, `zone-0-2`, `zone-1-0`, `zone-1-1`, `zone-1-2`, `zone-2-0`, `zone-2-1`, `zone-2-2`.

Once you've provided an address, you can run the script with:

```bash
node index.js
```

The script will output the shard that the address corresponds to.
