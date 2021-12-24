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
import { mapActions } from "vuex";

export default {
    name: "App",
    components: {
        NavigationBar
    },
    methods: {
        ...mapActions([ "loadData" ])
    },
    created() {
        this.loadData();
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
