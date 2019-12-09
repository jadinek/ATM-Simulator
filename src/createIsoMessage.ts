const IsoParser = require('iso_8583')

export function createIsoMessage (MSISDN: string, amount: string) {
  function pad (value: string, length: number, char: string) {
    if (value.length >= length) {
      return value.substring(0, length)
    }

    const diff = length - value.length
    let padding = ''

    for (let i = 0; i < diff; i++) {
      padding += char
    }

    return padding + value
  }

  function generateField7 (): string {
    const now = new Date(Date.now())
    const month = (now.getUTCMonth() + 1).toString()
    const day = now.getUTCDate().toString()
    const minutes = now.getUTCMinutes().toString()
    const hours = now.getUTCHours().toString()
    const seconds = now.getUTCSeconds().toString()

    return pad(month, 2, '0') + pad(day, 2, '0') + pad(hours, 2, '0') + pad(minutes, 2, '0') + pad(seconds, 2, '0')
  }

  const ISO0100 = {
    0: '0100',
    3: '012000',
    2: '5959590000000042',
    4: amount,
    7: generateField7(),
    11: '000001',
    12: '124845',
    13: '0328',
    15: '0328',
    18: '0780',
    22: '000',
    25: '00',
    28: 'D00000200',
    30: 'C00000000',
    37: '000000000010',
    40: '000',
    41: '00000003',
    42: '000000000000001',
    43: 'koratty                thrissur     keIN',
    49: '356',
    56: '1510',
    59: '0000000010',
    100: '484848',
    102: MSISDN, // Mobile number/Account Number
    127.2: '000319562' // Postillion switchKey
  }

  const isopack = new IsoParser(ISO0100)
  const bufferMessage = isopack.getBufferMessage()

  return bufferMessage
}
