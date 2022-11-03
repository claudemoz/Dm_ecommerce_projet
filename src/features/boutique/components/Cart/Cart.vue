<script setup lang="ts">
import type { productCartInterface } from "@/interfaces";
import CartProductList from "./CartProductList.vue";
import { computed } from "vue"

const props = defineProps<{
  cart: productCartInterface[];
}>();

const totalPrice = computed(()=>props.cart.reduce((acc, product)=>{
    return acc + product.price * product.quantity
}, 0))

const emit = defineEmits<{
  (e: "deleteProductToCart", ProductId: string): void;
}>();

</script>

<template>
  <div class="p-20 d-flex flex-column">
    <h1 class="mb-10">Panier</h1>
    <CartProductList
      class="flex-fill"
      :cart="cart"
      @deleteProductToCart="emit('deleteProductToCart', $event)"
    />
  <button class="btn btn-success">Commander {{ totalPrice }} €</button>
  </div>
</template>

<style scoped lang="scss"></style>
