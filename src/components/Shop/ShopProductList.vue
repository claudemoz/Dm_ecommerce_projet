<script setup lang="ts">
import type { productInterface } from "@/interfaces";
import ShopProduct from "./ShopProduct.vue";

defineProps<{
  products: productInterface[];
}>();

const emit = defineEmits<{
  (e: "addProductToCart", ProductId: number): void;
}>();
</script>

<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product of products"
      :product="product"
      :key="product.id"
      @addProductToCart="emit('addProductToCart', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 380px;
  gap: 20px;
}
</style>
