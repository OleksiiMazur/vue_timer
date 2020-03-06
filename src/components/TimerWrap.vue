<template>
    <div class="timer"
         :class="{playing: !pause, finished: finished}">
        <button class="mute"
                @click="muted = !muted"
                v-html="muteBtn">
        </button>
        
        <h1 class="timer__title">
            It's timer time
        </h1>
        <div class="timer-nums">
            <timer-group />
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(3600)"
                        @click.right.prevent
                        v-longclick="() => incr(3600)"
                    >▲</button>
                <span>
                    {{ disHours }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(3600)"
                        @click.right.prevent
                        v-longclick="() => decr(3600)"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group middle">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(60)"
                        @click.right.prevent
                        v-longclick="() => incr(60)"
                    >▲</button>
                <span>
                    <i v-show="this.disMinutes.toString().length < 2">0</i>{{ disMinutes }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(60)"
                        @click.right.prevent
                        v-longclick="() => decr(60)"
                    >▼</button>
            </div>
            <div class="devider"> : </div>
            
            <div class="timer-group">
                <button class="more"
                        :class="{disable: !pause}"
                        @click="incr(1)"
                        @click.right.prevent
                        v-longclick="() => incr(1)"
                    >▲</button>
                <span>
                    <i v-show="this.disSeconds.toString().length < 2">0</i>{{ disSeconds }}
                </span>
                <button class="less"
                        :class="{disable: !pause}"
                        @click="decr(1)"
                        @click.right.prevent
                        v-longclick="() => decr(1)"
                    >▼</button>
            </div>
        </div>
        <div class="timer__controls">
            <button v-if="this.pause && !this.finished"
                    class="play"
                    @click="[playTimer(), playSound('play')]">
                play
            </button>
            <button v-if="!this.pause"
                    class="pause"
                    @click="[pauseTimer(), playSound('pause')]">
                pause
            </button>
            <button v-if="this.pause && this.finished"
                    class="stop"
                    @click="[stopTimer(), playSound('pause')]">
                stop
            </button>
            
            <div class="gradient"></div>
        </div>
    </div>
</template>

<script>
    import TimerGroup from "./TimerGroup";
    
    export default {
        name: 'TimerWrap',
        data() {
            return {
                'lastTime': 0,
                'finished': false,
                'muted': false,
                'tSeconds': 300,
                'pause': true,
            }
        },
        components: {
            TimerGroup
        },
        watch: {},
        computed: {
            disHours() {
                let ss = this.tSeconds,
                    mm = Math.trunc(ss / 60);
                return Math.trunc(mm / 60);
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
            muteBtn() {
                let btnSymbol;
                this.muted ? btnSymbol = '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="50">\n' +
                    '<rect width="28" height="50" fill="#C4C4C4"/>\n' +
                    '</mask>\n' +
                    '<g mask="url(#mask0)">\n' +
                    '<path d="M24.1875 3C23.2773 3 22.332 3.4375 21.5625 4.21875L9.9375 15.8125C9.29688 16.3789 9 17.4766 9 18.25V31.75C9 32.5156 9.31641 33.6055 9.90625 34.125L21.5 45.6875C22.5547 46.7578 23.5273 47 24.1562 47C25.8242 47 27 45.4766 27 43.3125V6.3125C27 4.03516 25.5391 3 24.1875 3ZM38.2812 6.8125C37.8438 6.88672 37.5078 7.24219 37.457 7.68359C37.4102 8.125 37.6523 8.54688 38.0625 8.71875C44.0117 11.7188 48.0625 17.8711 48.0625 25C48.0625 32.1289 44.0117 38.2812 38.0625 41.2812C37.6953 41.4062 37.4375 41.7344 37.3945 42.1172C37.3516 42.5039 37.5352 42.8789 37.8672 43.082C38.1953 43.2813 38.6133 43.2734 38.9375 43.0625C45.5391 39.7305 50.0625 32.8945 50.0625 25C50.0625 17.1055 45.5391 10.2695 38.9375 6.9375C38.7656 6.83984 38.5703 6.79688 38.375 6.8125C38.3438 6.8125 38.3125 6.8125 38.2812 6.8125ZM34.7188 12.125C34.2734 12.1797 33.918 12.5273 33.8555 12.9727C33.7891 13.4141 34.0273 13.8477 34.4375 14.0312C38.3398 16.1367 41 20.2461 41 25C41 29.7383 38.3516 33.8594 34.4688 35.9688C33.9844 36.2344 33.8086 36.8438 34.0781 37.3281C34.3438 37.8125 34.9531 37.9883 35.4375 37.7188C39.9453 35.2695 43 30.4844 43 25C43 19.5 39.9375 14.6953 35.4062 12.25C35.2266 12.1484 35.0195 12.1055 34.8125 12.125C34.7812 12.125 34.75 12.125 34.7188 12.125ZM3 15.9688C1.32422 15.9688 -0.03125 17.3242 -0.03125 19V31C-0.03125 32.6758 1.32422 34.0312 3 34.0312H7.46875C7.14062 33.2461 7 32.4102 7 31.75V18.25C7 17.5938 7.16406 16.7617 7.5 15.9688H3ZM30.5312 18.4062C30.0469 18.4648 29.6797 18.8633 29.6562 19.3516C29.6328 19.8359 29.9609 20.2695 30.4375 20.375C32.4844 20.9102 34 22.7773 34 25C34 27.2227 32.4844 29.0898 30.4375 29.625C29.9023 29.7617 29.582 30.3086 29.7188 30.8438C29.8555 31.3789 30.4023 31.6992 30.9375 31.5625C33.8516 30.8008 36 28.1367 36 25C36 21.8633 33.8477 19.1992 30.9375 18.4375C30.8047 18.3984 30.668 18.3906 30.5312 18.4062Z" fill="black"/>\n' +
                    '</g>\n' +
                    '</svg>' : btnSymbol = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 24.1875 3 C 23.277344 3 22.332031 3.4375 21.5625 4.21875 L 9.9375 15.8125 C 9.296875 16.378906 9 17.476563 9 18.25 L 9 31.75 C 9 32.515625 9.316406 33.605469 9.90625 34.125 L 21.5 45.6875 C 22.554688 46.757813 23.527344 47 24.15625 47 C 25.824219 47 27 45.476563 27 43.3125 L 27 6.3125 C 27 4.035156 25.539063 3 24.1875 3 Z M 38.28125 6.8125 C 37.84375 6.886719 37.507813 7.242188 37.457031 7.683594 C 37.410156 8.125 37.652344 8.546875 38.0625 8.71875 C 44.011719 11.71875 48.0625 17.871094 48.0625 25 C 48.0625 32.128906 44.011719 38.28125 38.0625 41.28125 C 37.695313 41.40625 37.4375 41.734375 37.394531 42.117188 C 37.351563 42.503906 37.535156 42.878906 37.867188 43.082031 C 38.195313 43.28125 38.613281 43.273438 38.9375 43.0625 C 45.539063 39.730469 50.0625 32.894531 50.0625 25 C 50.0625 17.105469 45.539063 10.269531 38.9375 6.9375 C 38.765625 6.839844 38.570313 6.796875 38.375 6.8125 C 38.34375 6.8125 38.3125 6.8125 38.28125 6.8125 Z M 34.71875 12.125 C 34.273438 12.179688 33.917969 12.527344 33.855469 12.972656 C 33.789063 13.414063 34.027344 13.847656 34.4375 14.03125 C 38.339844 16.136719 41 20.246094 41 25 C 41 29.738281 38.351563 33.859375 34.46875 35.96875 C 33.984375 36.234375 33.808594 36.84375 34.078125 37.328125 C 34.34375 37.8125 34.953125 37.988281 35.4375 37.71875 C 39.945313 35.269531 43 30.484375 43 25 C 43 19.5 39.9375 14.695313 35.40625 12.25 C 35.226563 12.148438 35.019531 12.105469 34.8125 12.125 C 34.78125 12.125 34.75 12.125 34.71875 12.125 Z M 3 15.96875 C 1.324219 15.96875 -0.03125 17.324219 -0.03125 19 L -0.03125 31 C -0.03125 32.675781 1.324219 34.03125 3 34.03125 L 7.46875 34.03125 C 7.140625 33.246094 7 32.410156 7 31.75 L 7 18.25 C 7 17.59375 7.164063 16.761719 7.5 15.96875 Z M 30.53125 18.40625 C 30.046875 18.464844 29.679688 18.863281 29.65625 19.351563 C 29.632813 19.835938 29.960938 20.269531 30.4375 20.375 C 32.484375 20.910156 34 22.777344 34 25 C 34 27.222656 32.484375 29.089844 30.4375 29.625 C 29.902344 29.761719 29.582031 30.308594 29.71875 30.84375 C 29.855469 31.378906 30.402344 31.699219 30.9375 31.5625 C 33.851563 30.800781 36 28.136719 36 25 C 36 21.863281 33.847656 19.199219 30.9375 18.4375 C 30.804688 18.398438 30.667969 18.390625 30.53125 18.40625 Z"></path></svg>';
                return this.innerHTML = btnSymbol;
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
                        
                        if (ss === 0) {
                            this.playSound('music');
                            clearInterval(timerBack);
                            this.finished = true;
                            this.pause = true;
                        }
                    },1000);
                }
            },
            pauseTimer: function () {
                this.pause = true;
            },
            stopTimer: function () {
                this.finished = false;
                if (this.muted === false) {
                    this.muted = true;
                    setTimeout(() => {
                        this.muted = false;
                    }, 550);
                }
                this.tSeconds = this.lastTime;
                this.pause = true;
            },
            incr: function (n) {
                this.playSound('jump_up');
                this.tSeconds = this.tSeconds + n;
                this.lastTime = this.tSeconds;
            },
            decr: function (n) {
                this.playSound('jump_down');
                this.tSeconds = this.tSeconds - n;
                this.tSeconds <= 0 ? this.tSeconds = 0 : 0;
                this.lastTime = this.tSeconds;
            },
            playSound: function (role) {
                let audio;
                
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                    audio = new Audio(require('@/audio/' + role + '.ogg'));
                } else {
                    audio = new Audio(require('@/audio/' + role + '.mp3'));
                }
                audio.play();
                
                let checkMuted = setInterval(() => {
                    let mute = this.muted;

                    if (mute === true || audio.paused) {
                        clearInterval(checkMuted);
                        audio.muted = this.muted;
                        return;
                    }
                    audio.muted = this.muted;
                },500);
                
                audio.muted = this.muted;
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
            #{($i * 3%)} {
                background: hsla(random((320) + 20), 70%, 30%, 1);
            }
        }
    }
    @keyframes gradientFinishedAnim {
        @for $i from 1 through 50 {
            #{($i * 5%)} {
                background: hsla(random(40), random((100%) + 50%), 30%, 1);
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
        top: 0;
        left: 50%;
        border-radius: 50%;
        transform:  translateX(-50%) scale(0.01);
        background: hsla(random((145) + 65), 100%, 30%, 1);
        transition: all 0.7s cubic-bezier(0, 1.36, 0.98, 1.1);
        
        &--top {
            box-sizing: border-box;
        }
        &--bottom {
            display: none;
        }
    }
    .timer.playing {
        .timer-group {
            button {
                opacity: 0;
            }
        }
    }
    .timer:not(.playing) .timer-group.middle {
        &:hover {
            button {
                opacity: 0.5;
            }
        }
        button {
            opacity: 0.3;
            &:hover {
                opacity: 1;
            }
        }
    }
    .mute {
        z-index: 5;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5%;
        right: 5%;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        font-size: 15px;
        background-color: transparent;
        svg {
            width: 20px;
            height: 20px;
            path {
                fill: #fff
            }
        }
    }
    
    .timer {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 20px;
        
        &.playing {
            .gradient {
                transform: translateX(-50%) scale(10) translateY(-25%);
                transition: all 0.8s cubic-bezier(0.57, -0.35, 0.38, 0.85);
                animation: gradientAnim 120s -30s linear infinite alternate;
            }
        }
        &.finished {
            .gradient {
                transform: translateX(-50%) scale(10) translateY(-25%);
                transition: all 0.8s cubic-bezier(0.57, -0.35, 0.38, 0.85);
                animation: gradientFinishedAnim 40s -15s linear infinite alternate;
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
    
            &:first-child {
                span {
                    text-align: right;
                }
            }
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
                border: 5px solid #fff;
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
