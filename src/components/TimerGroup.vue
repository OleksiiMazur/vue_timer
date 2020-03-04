<template>
    <div class="timer-group"
         :class="{middle: isMiddle}">
         {{ tSeconds }}
    </div>
</template>

<script>
    export default {
        name: "TimerGroup",
        props: {
            tSeconds: Number,
        },
        data() {
            return {
                isMiddle: true
            }
        }
    }
</script>

<style scoped lang="scss">

</style>