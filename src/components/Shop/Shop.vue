<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, productInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilter from './ShopFilter.vue'

defineProps<{
    products: productInterface[]
    filters: FiltersInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', ProductId: number): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()

</script>

<template>
    <div class="d-flex flex-row">
        <ShopFilter :filters="filters" :nbr-of-products="products.length" class="shop-filter" @update-filter="emit('updateFilter', $event)"/>
        <ShopProductList class="flex-fill" :products="products" @addProductToCart="emit('addProductToCart', $event)"/>
    </div>
</template>

<style scoped lang="scss">
.shop-filter{
    flex: 0 0 200px
}
</style>