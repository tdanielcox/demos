<template>
    <div id="app">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        components: {
            Header
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Exo:300,400,700');
    @import url('~@fortawesome/fontawesome-free/css/all.css');

    html, body {
        height: 100%;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-family: 'Exo', sans-serif;
    }
</style>
