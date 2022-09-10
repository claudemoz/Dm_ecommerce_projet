<script setup lang="ts">
import type { productCartInterface } from '@/interfaces';
defineProps<{
    product: productCartInterface
}>()

const emit = defineEmits<{
    (e: 'deleteProductToCart', ProductId: number ): void
}>()
</script>

<template>
    <div class="d-flex flex-row align-items-center mb-10 p-10 product">
        <strong class="mr-10">{{ product.title }}</strong>
        <span class="flex-fill mr-10"> x {{ product.quantity }}</span>
        <span class="mr-5">prix: {{ product.price }}€</span>
        <button class="btn btn-danger" @click="emit('deleteProductToCart', product.id)">Supprimer</button>
    </div>
</template>

<style scoped lang="scss">
.product{
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: var(--gray-1);
}
</style>