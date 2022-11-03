<script setup lang="ts">
import type { productCartInterface } from '@/interfaces';
import CartProduct from './CartProduct.vue';
defineProps<{
    cart: productCartInterface[]
}>()

const emit = defineEmits<{
    (e: 'deleteProductToCart', ProductId: string ): void
}>()
</script>

<template>
    <div class="d-flex flex-column">
        <CartProduct v-for="product of cart"  :product="product" @deleteProductToCart="emit('deleteProductToCart', $event)"/>
    </div>
</template>

<style scoped lang="scss">

</style>