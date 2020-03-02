<template>
    <div class="timer">
        <h1 class="timer__title">
            It's timer time
        </h1>
        <div class="timer-nums">
            <span>
                {{ tHours }} :
            </span>
            <span>
                <i v-show="this.tMinutes.toString().length < 2">0</i>{{ tMinutes }} :
            </span>
            <span>
                <i v-show="this.tSeconds.toString().length < 2">0</i>{{ tSeconds }}
            </span>
        </div>
    
        <div class="timer__controls">
            <button class="play"
                    @click="playTimer">
                play
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
                'tSeconds': 12,
                'pause': false,
            }
        },
        components: {},
        computed: {
            // tHours() {
            //     let curHH = this.hours + Math.trunc(this.total / 60 / 60);
            //     this.hours = curHH;
            //     return curHH;
            // },
            // tMinutes() {
            //     let curMM = this.minutes + Math.trunc(this.total / 60);
            //     this.minutes = curMM;
            //     return curMM;
            // },
            // tSeconds() {
            //     let curSS = this.seconds + Math.trunc(this.total);
            //     this.seconds = curSS;
            //     return curSS;
            // },
        },
        methods: {
            playTimer () {
                this.pause = true;
                
                let timerBack = setInterval(() => {
                    if (this.tSeconds <= 0 || this.pause === false) {
                        clearInterval(timerBack);
                        this.pause = false;
                        return;
                    }
                    console.log(this.tSeconds.toString().length);
                    
                    this.tSeconds--;
                },1000);
            },
            pauseTimer: function () {
            
            },
            editTimer: function () {

            },
            stopTimer: function () {

            }
        }
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
    
    .timer {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        
        &__title {
            font-weight: 100;
        }
        &-nums {
            font-size: 40px;
            display: flex;
            width: 300px;
            margin: 0 auto;
            justify-content: center;
            
            span {
                font-size: 40px;
                display: inline-block;
                margin-right: 0.2em;
                
                i {
                    font-style: normal;
                }
                &:after {
                
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
                    .more {
                        margin-bottom: 2px;
                    }
                    .less {}
                }
            }
        }
        
        &__controls {
            display: flex;
            width: 300px;
            margin: 0 auto;
            justify-content: space-around;
            
            button {
                font-size: 12px;
                display: block;
                border-radius: 50%;
                background-color: transparent;
                border: 2px solid #fff;
                outline: none;
                box-shadow: none;
                color: #fff;
                height: 50px;
                width: 50px;
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
