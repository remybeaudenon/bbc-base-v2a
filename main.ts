function phares(cmd: string) {
    
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

function neopixels(cmd2: string) {
    
    if (neopixel_cmd != cmd2) {
        if (cmd2 == "white") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.White))
        } else if (cmd2 == "off") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
        } else if (cmd2 == "red") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Red))
        } else if (cmd2 == "green") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Green))
        } else if (cmd2 == "blue") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else if (cmd2 == "arc") {
            neopixel2.showRainbow(1, 360)
        } else if (cmd2 == "right") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
            neopixel2.setPixelColor(5, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(6, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(7, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else if (cmd2 == "left") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
            neopixel2.setPixelColor(10, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(11, neopixel.colors(NeoPixelColors.Red))
            neopixel2.setPixelColor(12, neopixel.colors(NeoPixelColors.Red))
            neopixel2.show()
        } else if (cmd2 == "orange") {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Orange))
        } else {
            neopixel2.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        
        neopixel_cmd = cmd2
    }
    
}

function neo_LED(cmd3: string) {
    if (RobotCar_Keyestudio.IrSensors.isLeftBlocked() && RobotCar_Keyestudio.IrSensors.isRightBlocked()) {
        neopixels("red")
    } else if (RobotCar_Keyestudio.IrSensors.isLeftBlocked()) {
        neopixels("left")
    } else if (RobotCar_Keyestudio.IrSensors.isRightBlocked()) {
        neopixels("right")
    } else {
        neopixels(cmd3)
    }
    
}

function moteurs(sens_1_1: number, vitesse_: number) {
    if (RobotCar_Keyestudio.Sonar.ping() < 60) {
        RobotCar_Keyestudio.Motors.stop()
        music.playTone(659, music.beat(BeatFraction.Whole))
    } else {
        if (vitesse_ < 0) {
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
        
        RobotCar_Keyestudio.Motors.steer(vitesse_, 275 * sens_1_1)
    }
    
}

function suivi_ligne(cmd4: string) {
    if (cmd4 == "on") {
        if (!(RobotCar_Keyestudio.IrSensors.isLeftBlocked() && RobotCar_Keyestudio.IrSensors.isRightBlocked())) {
            if (pins.digitalReadPin(DigitalPin.P12) != pins.digitalReadPin(DigitalPin.P13)) {
                if (pins.digitalReadPin(DigitalPin.P12) == 1) {
                    moteurs(1, 30)
                } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
                    moteurs(-1, 30)
                }
                
                phares("blue")
                neo_LED("blue")
            } else if (pins.digitalReadPin(DigitalPin.P12) == 0) {
                moteurs(0, -20)
                phares("orange")
                neo_LED("orange")
            } else {
                moteurs(0, 30)
                phares("white")
                neo_LED("arc")
            }
            
        } else {
            RobotCar_Keyestudio.Motors.stop()
            neo_LED("red")
            phares("red")
        }
        
    } else {
        RobotCar_Keyestudio.Motors.stop()
        neopixels("arc")
    }
    
}

makerbit.onIrDatagram(function on_ir_datagram() {
    
    if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_1)) {
        phares("on")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_0)) {
        phares("off")
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Number_5)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else if (makerbit.irButton() == makerbit.irButtonCode(IrButton.Ok)) {
        if (run_cmd != "off") {
            run_cmd = "off"
        } else {
            run_cmd = "on"
        }
        
    }
    
})
let run_cmd = ""
let phares_cmd = ""
let neopixel_cmd = ""
let neopixel2 : neopixel.Strip = null
makerbit.connectIrReceiver(DigitalPin.P16, IrProtocol.Keyestudio)
neopixel2 = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
neopixel_cmd = ""
phares_cmd = ""
run_cmd = "off"
let sonar2 = RobotCar_Keyestudio.Sonar.ping()
neopixels("arc")
phares("off")
music.setBuiltInSpeakerEnabled(true)
soundExpression.happy.playUntilDone()
basic.forever(function on_forever() {
    suivi_ligne(run_cmd)
})
