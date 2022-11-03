<script setup lang="ts">
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";
import Boutique from './features/boutique/Boutique.vue'
import Admin from './features/admin/Admin.vue'
import  { reactive,  type Component as C } from "vue";
import type { Page } from "./interfaces";
import { seed } from "./data/seed";

// seed('projectproducts')

const state = reactive<{
  page: Page
}>({
  page: 'Boutique'
})

const pages: { [s: string]: C} = {
  Boutique,
  Admin
}

const navigate = (page: Page)=>{
  state.page = page
  }

</script>

<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" class="header" :page="state.page"/>
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]"/>
      </Suspense>
    </div>
    <TheFooter class="footer" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/debug.scss";

.app-container {
  height: 100vh;
  display: grid;
  grid-template-rows: 48px auto 48px;
  grid-template-areas: "header" "app-content" "footer";
}

.header {
  grid-area: header;
}
.app-content{
  grid-area: app-content;
}
.footer {
  grid-area: footer;
}
</style>
