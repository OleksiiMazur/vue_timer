<template>
  <div id="app">
    <TimerWrap />
  </div>
</template>

<script>
import TimerWrap from './components/TimerWrap'

export default {
  name: 'App',
  components: {
    TimerWrap
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');
  
  body,html {
    font-family: 'Comfortaa', sans-serif;
    font-weight: 100;
    height: 100%;
    overflow: hidden;
    color: #fff;
  }
  * {
    font-family: 'Comfortaa', sans-serif;
    font-weight: 100;
    margin: 0;
    padding: 0;
  }
  #app {
    overflow: hidden;
    box-sizing: border-box;
    max-width: 700px;
    width: 100%;
    background-color: #222;
    margin: 0 auto;
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
</style>
