function phares (cmd: string) {
    if (phares_cmd != cmd) {
        if (cmd == "white") {
            RobotCar_Keyestudio.Leds.showWhite()
        } else if (cmd == "off") {
            RobotCar_Keyestudio.Leds.ledsOff()
        } else if (cmd == "red") {
            RobotCar_Keyestudio.Leds.showRed()
        } else if (cmd == "green") {
            RobotCar_Keyestudio.Leds.showGreen()
        } else if (cmd == "blue") {
            RobotCar_Keyestudio.Leds.showBlue()
        } else if (cmd == "orange") {
            RobotCar_Keyestudio.Leds.setRGB(255, 60, 0)
        }
        phares_cmd = cmd
    }
}
makerbit.onIrDatagram(function () {
    if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_1)) {
        phares("white")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_0)) {
        phares("off")
    } else {
    	
    }
})
let phares_cmd = ""
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
let neopixel2 = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
let neopixel_cmd = ""
phares_cmd = ""
phares("off")
basic.forever(function () {
    if (input.soundLevel() > 100) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
})
basic.forever(function () {
	
})
