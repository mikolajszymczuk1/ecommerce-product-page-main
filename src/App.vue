<template>
    <div class="app">
        <!-- ====== Header ====== -->
        <header>
            <NavigationBar />
        </header>
        <!-- ====== END Header ====== -->
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
    name: "App",
    components: {
        NavigationBar
    }
}
</script>

<style lang="scss" scoped>
.app {
    @media screen and (min-width: 1200px) {
        margin: 0 10%;
    }
}
</style>
