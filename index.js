'use strict'

const IOTA = require('iota.lib.js')
const five = require('johnny-five')
const delay = require('delay')
const iota = new IOTA({ 'provider': 'http://iotahosting.org:14265' })

const seedLeed = ''

const board = new five.Board({
  port: 'COM10',
  repl: false,
  debug: false
})

const getLastAddress = () => {
    return new Promise(resolve=>{
        iota.api.getAccountData(seedLeed, (er,suc) => {
            if(er){
                console.log(er)
            } else {
                let long = suc.addresses.length
                let address = iota.utils.addChecksum(suc.addresses[long-1])
                resolve(address)
            }
        })
    })
}

const getLastTransaction = () => {
    return new Promise(resolve=>{
        iota.api.getAccountData(seedLeed, (er,suc) => {
            if(er){
                console.log(er)
            } else {
                let long = suc.transfers.length
                let lastT = suc.transfers[long-1][0]
                let answer = {'hash':lastT.hash,'value':lastT.value,'confirmed':lastT.persistence}
                resolve(answer)
            }
        })
    })
}


const start = async () => {
	board.on('ready',async () =>{
		let led = new five.Led(13)
		console.log('Welcome to this example!')
	    let addressLED = await getLastAddress()
		console.log('Please, deposit so many iotas that you want, for each iota the led will turn on one second.')
	    console.log('This is the address:\n'+addressLED)
	    let lastTransacion = await getLastTransaction()
		let lastHash = lastTransacion.hash
		const wait = async (value) => {
		    led.on()
		 	await delay(value*1000)
			led.off()
		}
		do{
			console.log('Expecting next paid..')
			lastTransacion = await getLastTransaction()
			if(lastHash != lastTransacion.hash){
	    		console.log('Paid recibed: '+lastTransacion.value+' IOTAs')
	    		console.log('This will turn on the led for '+lastTransacion.value+' s')
	    		await wait(lastTransacion.value)
	    		console.log('Done! thanks for using :) ')
	    	}
	    	lastHash = lastTransacion.hash
		}while(lastHash==lastTransacion.hash)
  	})
}

start()