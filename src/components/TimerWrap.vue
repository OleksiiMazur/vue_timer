<template>
    <div class="timer">
        <h1 class="timer__title">
            It's timer time
        </h1>
        <div class="timer-nums">
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incrHours"
                    >▲</button>
                <span>
                    {{ disHours }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decrHours"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incrMinutes"
                    >▲</button>
                <span>
                    <i v-show="this.disMinutes.toString().length < 2">0</i>{{ disMinutes }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decrMinutes"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incrSecond"
                        v-longclick="incrTenSeconds"
                    >▲</button>
                <span>
                    <i v-show="this.disSeconds.toString().length < 2">0</i>{{ disSeconds }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decrSecond"
                        v-longclick="decrTenSeconds"
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
        </div>
    
        <!-- <form id="set-time" class="input" @submit.prevent="totalSeconds">
            <div class="timer-inputs">
                <div class="input-group">
                    <input type="number"
                           id="hours"
                           name="hours"
                           v-model.number="hours">
                    <div class="input-group__btns">
                        <span class="more"
                              @click="incrHH">▲</span>
                        <span class="less"
                              @click="decrHH">▼</span>
                    </div>
                </div>
                <div class="input-group">
                    <input type="number"
                           id="minutes"
                           name="minutes"
                           v-model.number="minutes">
                    <div class="input-group__btns">
                        <span class="more"
                              @click="incrMM">▲</span>
                        <span class="less"
                              @click="decrMM">▼</span>
                    </div>
                </div>
                <div class="input-group">
                    <input type="number"
                           id="seconds"
                           name="seconds"
                           v-model.number="seconds">
                    <div class="input-group__btns">
                        <span class="more"
                              @click="incrSS">▲</span>
                        <span class="less"
                              @click="decrSS">▼</span>
                    </div>
                </div>
            </div>
            <button type="submit" class="submit-btn">
                {{ submitBtnText }}
            </button>
        </form>
        
        <div class="timer__controls">
            <button
                v-for="btn in controls"
                :key="btn.controlName"
                :class="btn.controlName"
            >
                {{ btn.controlName }}
            </button>
        </div>-->
    
    </div>
</template>

<script>
    
    export default {
        name: 'TimerWrap',
        data() {
            return {
                'tHours': 0,
                'tMinutes': 0,
                'tSeconds': 3,
                'pause': true,
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
        },
        methods: {
            playTimer () {
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
            },
            pauseTimer: function () {
                this.pause = true;
            },
            incrHours: function () {
                this.tSeconds = this.tSeconds + 3600;
            },
            decrHours: function () {
                this.tSeconds = this.tSeconds - 3600;
                this.checkForZero();
            },
            incrMinutes: function () {
                this.tSeconds = this.tSeconds + 60;
            },
            decrMinutes: function () {
                this.tSeconds = this.tSeconds - 60;
                this.checkForZero();
            },
            incrSecond: function () {
                this.tSeconds++;
            },
            decrSecond: function () {
                this.tSeconds--;
                this.checkForZero();
            },
            incrTenSeconds: function (n) {
                this.tSeconds++;
            },
            decrTenSeconds: function () {
                this.tSeconds--;
                this.checkForZero();
            },
            checkForZero: function () {
                this.tSeconds <= 0 ? this.tSeconds = 0 : 0;
            },
        },
    }
</script>

<style lang="scss">
    input[type=number]::-webkit-inner-spin-button {
        /*-webkit-appearance: none;*/
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance:textfield;
    }
    
    .devider {
    }
    .disable {
        user-select: none;
        pointer-events: none;
    }
    
    .timer {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        
        &__title {
            font-weight: 100;
        }
        &-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 10px;
    
            &:hover {
                button {
                    opacity: 0.5;
                }
            }
            button {
                cursor: pointer;
                display: block;
                background: transparent;
                outline: none;
                border: none;
                color: inherit;
                font: inherit;
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
                
                i {
                    font-style: normal;
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
            display: flex;
            width: 300px;
            margin: 0 auto;
            justify-content: space-around;
            
            button {
                font-size: 30px;
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
