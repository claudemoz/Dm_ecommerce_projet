<script setup lang="ts">
import type { productInterface } from '@/interfaces';

defineProps<{
    product: productInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', ProductId: number): void
}>()
</script>

<template>
    <div class="product d-flex flex-column">
        <img :src="product.image" alt="macbook_pro" class="product-image">
        <div class="p-10 d-flex flex-column">
            <h4>{{ product.title }}</h4>
            <p>{{ product.description }}</p>
        </div>
        <div class="px-5 d-flex flex-row align-items-center ">
            <strong class="flex-fill">Prix: {{ product.price}} €</strong>
            <button class="btn btn-primary" @click="emit('addProductToCart', product.id)">Ajouter au panier</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.product{
    -webkit-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
     box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
    //  background: var(--white);
    &-image{
        border-top-right-radius: var(--border-raduis);
        border-top-left-radius: var(--border-raduis);
        width: 100%;
        height: 180px;
        object-fit: cover;
    }
}
</style>