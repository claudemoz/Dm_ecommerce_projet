<script setup lang="ts">
import type { productInterface } from "@/interfaces";
import ShopProduct from "./ShopProduct.vue";

defineProps<{
  products: productInterface[];
}>();

const emit = defineEmits<{
  (e: "addProductToCart", ProductId: string): void;
}>();
</script>

<template>
  <div class="grid p-20 B1">
    <ShopProduct
      v-for="product of products"
      :product="product"
      :key="product._id"
      @addProductToCart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 380px;
  // @include m.sm{
  //   grid-template-columns: 1fr;
  // }
  @include m.md{
    grid-template-columns: 1fr 1fr;
  }
  @include m.lg{
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include m.xl{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  gap: 20px;
}
</style>
