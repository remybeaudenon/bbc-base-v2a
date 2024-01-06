def phares(cmd: str):
    global phares_cmd
    if phares_cmd != cmd:
        if cmd == "white":
            RobotCar_Keyestudio.Leds.show_white()
        elif cmd == "off":
            RobotCar_Keyestudio.Leds.leds_off()
        elif cmd == "red":
            RobotCar_Keyestudio.Leds.show_red()
        elif cmd == "green":
            RobotCar_Keyestudio.Leds.show_green()
        elif cmd == "blue":
            RobotCar_Keyestudio.Leds.show_blue()
        elif cmd == "orange":
            RobotCar_Keyestudio.Leds.set_rgb(255, 60, 0)
        elif cmd == "on":
            RobotCar_Keyestudio.Leds.show_white()
        else:
            pass
        phares_cmd = cmd
def neopixels(cmd2: str):
    global neopixel_cmd
    if neopixel_cmd != cmd2:
        if cmd2 == "white":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.WHITE))
        elif cmd2 == "off":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.BLACK))
        elif cmd2 == "red":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.RED))
        elif cmd2 == "green":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.GREEN))
        elif cmd2 == "blue":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.BLUE))
        elif cmd2 == "arc":
            neopixel2.show_rainbow(1, 360)
        elif cmd2 == "right":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.BLACK))
            neopixel2.set_pixel_color(5, neopixel.colors(NeoPixelColors.RED))
            neopixel2.set_pixel_color(6, neopixel.colors(NeoPixelColors.RED))
            neopixel2.set_pixel_color(7, neopixel.colors(NeoPixelColors.RED))
            neopixel2.show()
        elif cmd2 == "left":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.BLACK))
            neopixel2.set_pixel_color(10, neopixel.colors(NeoPixelColors.RED))
            neopixel2.set_pixel_color(11, neopixel.colors(NeoPixelColors.RED))
            neopixel2.set_pixel_color(12, neopixel.colors(NeoPixelColors.RED))
            neopixel2.show()
        elif cmd2 == "orange":
            neopixel2.show_color(neopixel.colors(NeoPixelColors.ORANGE))
        else:
            neopixel2.show_color(neopixel.colors(NeoPixelColors.BLACK))
        neopixel_cmd = cmd2
def neo_LED(cmd3: str):
    if RobotCar_Keyestudio.IrSensors.is_left_blocked() and RobotCar_Keyestudio.IrSensors.is_right_blocked():
        neopixels("red")
    elif RobotCar_Keyestudio.IrSensors.is_left_blocked():
        neopixels("left")
    elif RobotCar_Keyestudio.IrSensors.is_right_blocked():
        neopixels("right")
    else:
        neopixels(cmd3)
def moteurs(sens_1_1: number, vitesse_: number):
    if RobotCar_Keyestudio.Sonar.ping() < 60:
        RobotCar_Keyestudio.Motors.stop()
        music.play_tone(659, music.beat(BeatFraction.WHOLE))
    else:
        if vitesse_ < 0:
            music.play_tone(262, music.beat(BeatFraction.WHOLE))
        RobotCar_Keyestudio.Motors.steer(vitesse_, 275 * sens_1_1)
def suivi_ligne(cmd4: str):
    if cmd4 == "on":
        if not (RobotCar_Keyestudio.IrSensors.is_left_blocked() and RobotCar_Keyestudio.IrSensors.is_right_blocked()):
            if pins.digital_read_pin(DigitalPin.P12) != pins.digital_read_pin(DigitalPin.P13):
                if pins.digital_read_pin(DigitalPin.P12) == 1:
                    moteurs(1, 30)
                elif pins.digital_read_pin(DigitalPin.P13) == 1:
                    moteurs(-1, 30)
                phares("blue")
                neo_LED("blue")
            elif pins.digital_read_pin(DigitalPin.P12) == 0:
                moteurs(0, -20)
                phares("orange")
                neo_LED("orange")
            else:
                moteurs(0, 30)
                phares("white")
                neo_LED("arc")
        else:
            RobotCar_Keyestudio.Motors.stop()
            neo_LED("red")
            phares("red")
    else:
        RobotCar_Keyestudio.Motors.stop()
        neopixels("arc")

def on_ir_datagram():
    global run_cmd
    if makerbit.ir_button() == makerbit.ir_button_code(IrButton.NUMBER_1):
        phares("on")
    elif makerbit.ir_button() == makerbit.ir_button_code(IrButton.NUMBER_0):
        phares("off")
    elif makerbit.ir_button() == makerbit.ir_button_code(IrButton.NUMBER_5):
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
    elif makerbit.ir_button() == makerbit.ir_button_code(IrButton.OK):
        if run_cmd != "off":
            run_cmd = "off"
        else:
            run_cmd = "on"
makerbit.on_ir_datagram(on_ir_datagram)

run_cmd = ""
phares_cmd = ""
neopixel_cmd = ""
neopixel2: neopixel.Strip = None
makerbit.connect_ir_receiver(DigitalPin.P16, IrProtocol.KEYESTUDIO)
neopixel2 = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
neopixel_cmd = ""
phares_cmd = ""
run_cmd = "off"
sonar2 = RobotCar_Keyestudio.Sonar.ping()
neopixels("arc")
phares("off")
music.set_built_in_speaker_enabled(True)
soundExpression.happy.play_until_done()

def on_forever():
    suivi_ligne(run_cmd)
basic.forever(on_forever)
