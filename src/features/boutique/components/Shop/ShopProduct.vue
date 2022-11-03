<script setup lang="ts">
import type { productInterface } from '@/interfaces';

defineProps<{
    product: productInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', ProductId: string): void
}>()
</script>

<template>
    <div class="product d-flex flex-column">
        <img :src="product.image" alt="macbook_pro" class="product-image">
        <div class="p-10">
            <div class="d-flex flex-row justify-content-between">
                <h4>{{ product.title }}</h4>
                <strong class="">{{ product.price}} €</strong>
            </div>
            <p>{{ product.description }}</p>
        </div>
        <button class="mx-5 btn btn-primary" @click="emit('addProductToCart', product._id)">Ajouter au panier</button>
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