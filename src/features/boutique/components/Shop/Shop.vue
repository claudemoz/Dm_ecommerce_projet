<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, productInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilter from './ShopFilter.vue'

defineProps<{
    products: productInterface[]
    filters: FiltersInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', ProductId: string): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()

</script>

<template>
    <div class="d-flex flex-row">
        <ShopFilter :filters="filters" :nbr-of-products="products.length" class="shop-filter" @update-filter="emit('updateFilter', $event)"/>
        <ShopProductList class="flex-fill scrolable" :products="products" @addProductToCart="emit('addProductToCart', $event)"/>
    </div>
</template>

<style scoped lang="scss">

.scrolable{
    overflow-y: auto;
    height: calc(100vh - 96px);
}
.shop-filter{
    flex: 0 0 100px
}
</style>