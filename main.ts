let hue = 0
let sound_level_delta = 0
let sound_level = 0
let ALIVE = 0
let switchable = 1
let strip = neopixel.create(DigitalPin.P1, 12, NeoPixelMode.RGB)
let servo_angle = 180
let servo_speed = 12
let servo_step = servo_speed
let worm_sensitivity = 300
basic.forever(function () {
    if (ALIVE == 1) {
        if (sound_level < pins.analogReadPin(AnalogPin.P2)) {
            sound_level_delta = 12
        } else {
            sound_level_delta = -1
        }
        sound_level = Math.constrain(sound_level + sound_level_delta, 0, 1000)
        hue = Math.constrain(Math.map(sound_level, 0, 600, 140, 0), 0, 140)
        strip.showColor(neopixel.hsl(hue, 100, 40))
        if (sound_level > worm_sensitivity) {
            if (servo_step < 0) {
                if (servo_angle > 90) {
                    servo_angle = 30
                } else {
                    servo_angle = 150
                }
                servos.P0.setAngle(servo_angle)
                servo_speed = Math.map(sound_level, 0, 600, 80, 5)
                servo_step = servo_speed
            } else {
                servo_step += -1
            }
        }
    } else {
        hue = 240
        strip.showColor(neopixel.hsl(hue, 100, 10))
    }
    if (pins.digitalReadPin(DigitalPin.P9) == 0) {
        if (switchable == 1) {
            if (ALIVE == 0) {
                ALIVE = 1
                sound_level = 100
            } else {
                ALIVE = 0
            }
            switchable = 0
        }
    } else {
        switchable = 1
    }
})
