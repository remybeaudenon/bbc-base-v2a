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
function neopixels (cmd: string) {
    if (neopixel_cmd != cmd) {
        if (cmd == "white") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.White))
        } else if (cmd == "off") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
        } else if (cmd == "red") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Red))
        } else if (cmd == "green") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Green))
        } else if (cmd == "blue") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else if (cmd == "arc") {
            neopixel2.showRainbow(1, 360)
        } else if (cmd == "right") {
            neopixel2.setPixelColor(5, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(6, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(7, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else if (cmd == "left") {
            neopixel2.setPixelColor(10, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(11, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(12, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        neopixel_cmd = cmd
    }
}
makerbit.onIrDatagram(function () {
    if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_1)) {
        phares("white")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_0)) {
        phares("off")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_5)) {
        music.playTone(262, music.beat(BeatFraction.Double))
    } else {
    	
    }
})
let phares_cmd = ""
let neopixel_cmd = ""
let neopixel2: neopixel.Strip = null
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
neopixel2 = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
neopixel_cmd = ""
phares_cmd = ""
phares("off")
neopixels("arc")
basic.forever(function () {
    if (input.soundLevel() > 100) {
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
})
