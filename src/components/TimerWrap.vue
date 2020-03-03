<template>
    <div class="timer"
         :class="{playing: !pause}"
         :style="{}">
        <h1 class="timer__title">
            It's timer time
        </h1>
        <div class="timer-nums">
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(3600)"
                        @click.right.prevent
                        v-longclick="() => incrFast(3600)"
                    >▲</button>
                <span>
                    {{ disHours }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(3600)"
                        @click.right.prevent
                        v-longclick="() => decrFast(3600)"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(60)"
                        @click.right.prevent
                        v-longclick="() => incrFast(60)"
                    >▲</button>
                <span>
                    <i v-show="this.disMinutes.toString().length < 2">0</i>{{ disMinutes }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(60)"
                        @click.right.prevent
                        v-longclick="() => decrFast(60)"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(1)"
                        @click.right.prevent
                        v-longclick="() => incrFast(1)"
                    >▲</button>
                <span>
                    <i v-show="this.disSeconds.toString().length < 2">0</i>{{ disSeconds }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(1)"
                        @click.right.prevent
                        v-longclick="() => decrFast(1)"
                    >▼</button>
            </div>
        </div>
        <div class="timer__controls">
            <button v-if="this.pause"
                    class="play"
                    @click="playTimer">
                play
            </button>
            <button v-if="!this.pause"
                    class="pause"
                    @click="pauseTimer">
                pause
            </button>
            
            <div class="gradient"></div>
        </div>
        <!--{{ sounds }}-->
    </div>
</template>

<script>
    export default {
        name: 'TimerWrap',
        data() {
            return {
                'tHours': 0,
                'tMinutes': 0,
                'tSeconds': 300,
                'pause': true,
                sounds: [
                    {
                        'id': 'click',
                        'url': 'src/audio/click.mp3',
                    }
                ],
            }
        },
        components: {},
        computed: {
            disHours() {
                let ss = this.tSeconds,
                    mm = Math.trunc(ss / 60),
                    hh = Math.trunc(mm / 60);
                
                return hh;
            },
            disMinutes() {
                let ss = this.tSeconds,
                    mm = Math.trunc(ss / 60),
                    hh = Math.trunc(mm / 60);
                
                if (mm > 59) {
                    mm = mm - hh * 60;
                }
                if (mm <= 0) {
                    mm = 0
                }
                
                return mm;
            },
            disSeconds() {
                let ss = this.tSeconds,
                    mm = Math.trunc(ss / 60);
                
                if (ss > 59) {
                    ss = ss - mm * 60;
                }
                if (ss <= 0) {
                    ss = 0;
                }
                return ss;
            },
            colorTop() {
            
            },
            colorBottom() {
            
            },
        },
        methods: {
            playTimer () {
                if (this.tSeconds > 0) {
                    this.pause = false;

                    let timerBack = setInterval(() => {
                        let ss = this.tSeconds;

                        if (ss <= 0 || this.pause === true) {
                            clearInterval(timerBack);
                            this.pause = true;
                            return;
                        }
                        ss--;

                        this.tSeconds = ss;
                        this.tMinutes = this.disMinutes;
                    },1000);
                } else {
                    alert('Set a time at first');
                }
            },
            pauseTimer: function () {
                this.pause = true;
            },
            incr: function (n) {
                this.tSeconds = this.tSeconds + n;
            },
            decr: function (n) {
                this.tSeconds = this.tSeconds - n;
                this.checkForZero();
            },
            incrFast: function (n) {
                this.tSeconds = this.tSeconds + n;
            },
            decrFast: function (n) {
                this.tSeconds = this.tSeconds - n;
                this.checkForZero();
            },
            checkForZero: function () {
                this.tSeconds <= 0 ? this.tSeconds = 0 : 0;
            },
        },
    }
</script>

<style lang="scss">
    $grMax: (180) + 50;
    
    input[type=number]::-webkit-inner-spin-button {
        /*-webkit-appearance: none;*/
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    @keyframes gradientAnim {
        @for $i from 1 through 50 {
            #{($i * 5%)} {
                background: hsla(random(180), 90%, 30%, 1);
            }
        }
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance:textfield;
    }
    .disable {
        user-select: none;
        pointer-events: none;
    }
    button, button:hover, button:focus {
        outline: none !important;
        box-shadow: none !important;
        border: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
    }
    .gradient {
        z-index: -1;
        display: block;
        position: absolute;
        height: 120px;
        width: 120px;
        border-radius: 50%;
        transform: scale(0.01);
        background: hsla(random(180), 100%, 30%, 1);
        transition: all 0.8s cubic-bezier(0.05, 0.89, 0.6, 1.28);
    }
    
    .timer {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        
        &.playing {
            .gradient {
                transform: scale(10) translateY(-25%);
                transition: all 0.8s cubic-bezier(0.94, -0.4, 0.6, 0.97);
                animation: gradientAnim 60s linear infinite alternate;
            }
        }
        & > div, & > h1 {
            position: relative;
            z-index: 5;
        }
        &__title {
            font-weight: 100;
        }
        &-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 10px;
            user-select: none;
    
            &:hover {
                button {
                    opacity: 0.5;
                }
            }
            button {
                display: block;
                background: transparent;
                opacity: 0;
                transition: opacity 0.2s ease;
                &:hover {
                    opacity: 1;
                }
            }
        }
        &-nums {
            font-size: 50px;
            display: flex;
            width: 300px;
            margin: 0 auto;
            justify-content: center;
            align-items: center;
            
            span {
                font-size: inherit;
                display: inline-block;
                text-shadow: 2px 0 0 #333;
                
                i {
                    font-style: normal;
                    text-shadow: 2px 0 0 #333;
                }
            }
        }
        .submit-btn {
            display: block;
            margin-top: 20px;
            background-color: #fff;
            padding: 15px;
            width: 100%;
            cursor: pointer;
            border-radius: 30px;
            outline: none;
            box-shadow: none;
            border: none;
            font-size: 22px;
        }
        &-inputs {
            display: flex;
        }
        #set-time {
            width: 300px;
            position: relative;
            padding: 0;
            margin: 0 auto;
            .input-group {
                display: flex;
                &:not(:last-child) {
                    margin-right: 20px;
                }
                input {
                    position: relative;
                    display: block;
                    width: 100%;
                    border: none;
                    outline: none;
                    box-shadow: none;
                    background: transparent;
                    color: #999999;
                    border-bottom: 1px solid #999999;
                    padding: 5px 0;
                    text-align: center;
                    transition: color 0.3s ease;
        
                    &:focus {
                        border-color: #fff;
                        color: #fff;
            
                        & + label {
                            bottom: -70%;
                            left: 2px;
                            font-size: 70%;
                        }
                    }
                }
                &__btns {
                    margin-left: 5px;
                    > span {
                        display: block;
                        height: 20px;
                        width: 20px;
                        line-height: 20px;
                        background: #fff;
                        color: #222;
                        font-size: 12px;
                        cursor: pointer;
                        border-radius: 4px;
                        
                        &::selection {
                            background-color: #fff;
                            color: #222;
                        }
                        &:hover {
                        }
                    }
                }
            }
        }
        
        &__controls {
            z-index: 1 !important;
            display: flex;
            position: relative;
            width: 300px;
            margin: 0 auto;
            justify-content: space-around;
            
            button {
                font-size: 25px;
                display: block;
                border-radius: 50%;
                background-color: transparent;
                border: 2px solid #fff;
                outline: none;
                box-shadow: none;
                color: #fff;
                height: 120px;
                width: 120px;
                cursor: pointer;
                transition: all 0.15s ease;
                
                &:hover {
                }
                
                &.play {
                    border-color: greenyellow green;
                    
                    &:hover {
                        border-color: green greenyellow;
                    }
                }
                
                &.pause {
                    border-color: darkorange #e2ff61;
                    
                    &:hover {
                        border-color: #e2ff61 darkorange;
                    }
                }
                
                &.edit {
                    border-color: cornflowerblue #87d7ed;
                    
                    &:hover {
                        border-color: #87d7ed cornflowerblue;
                    }
                }
                
                &.stop {
                    border-color: orangered #b1170b;
                    
                    &:hover {
                        border-color: #b1170b orangered;
                    }
                }
            }
        }
    }
</style>
