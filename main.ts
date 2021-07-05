function suivi_ligne (cmd: string) {
    if (cmd == "on" && !(RobotCar_Keyestudio.IrSensors.isLeftBlocked() && RobotCar_Keyestudio.IrSensors.isRightBlocked())) {
        if (pins.digitalReadPin(DigitalPin.P12) != pins.digitalReadPin(DigitalPin.P13)) {
            if (pins.digitalReadPin(DigitalPin.P12) == 1) {
                moteurs(1, 40)
            } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
                moteurs(-1, 40)
            }
            phares("orange")
            neo_LED("orange")
        } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
            moteurs(0, -20)
            phares("red")
            neo_LED("red")
        } else {
            moteurs(0, 30)
            phares("white")
            neo_LED("arc")
        }
    } else {
        RobotCar_Keyestudio.Motors.stop()
    }
}
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
        } else if (cmd == "on") {
            RobotCar_Keyestudio.Leds.showWhite()
        } else {
        	
        }
        phares_cmd = cmd
    }
}
function neo_LED (cmd: string) {
    if (RobotCar_Keyestudio.IrSensors.isLeftBlocked() && RobotCar_Keyestudio.IrSensors.isRightBlocked()) {
        neopixels("red")
    } else if (RobotCar_Keyestudio.IrSensors.isLeftBlocked()) {
        neopixels("left")
    } else if (RobotCar_Keyestudio.IrSensors.isRightBlocked()) {
        neopixels("right")
    } else {
        neopixels(cmd)
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
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
            neopixel2.setPixelColor(5, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(6, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(7, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else if (cmd == "left") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
            neopixel2.setPixelColor(10, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(11, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(12, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else if (cmd == "orange") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Orange))
        } else {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        neopixel_cmd = cmd
    }
}
function moteurs (sens_1_1: number, vitesse_: number) {
    if (vitesse_ < 0) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
    RobotCar_Keyestudio.Motors.steer(vitesse_, 275 * sens_1_1)
}
makerbit.onIrDatagram(function () {
    if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_1)) {
        phares("on")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_0)) {
        phares("off")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_5)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Ok)) {
        if (run_cmd == "on") {
            run_cmd = "off"
            RobotCar_Keyestudio.Motors.stop()
            phares("off")
            neo_LED("off")
        } else {
            run_cmd = "on"
        }
    }
})
let run_cmd = ""
let phares_cmd = ""
let neopixel_cmd = ""
let neopixel2: neopixel.Strip = null
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
neopixel2 = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
neopixel_cmd = ""
phares_cmd = ""
run_cmd = "off"
neopixels("arc")
phares("off")
music.setBuiltInSpeakerEnabled(false)
soundExpression.happy.playUntilDone()
basic.forever(function () {
    suivi_ligne(run_cmd)
})
