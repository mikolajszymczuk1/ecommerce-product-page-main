<template>
    <div class="app">
        <!-- ====== Header ====== -->
        <header>
            <NavigationBar />
        </header>
        <!-- ====== END Header ====== -->

        <!-- ====== Main ====== -->
        <main>
            <ImageSlider :slider-images="getProductWithId(0).productImages" />
        </main>
        <!-- ====== END Main ====== -->
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import ImageSlider from "@/components/ImageSlider";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "App",
    components: {
        NavigationBar,
        ImageSlider
    },
    computed: {
        ...mapGetters(["getProductWithId"])
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
