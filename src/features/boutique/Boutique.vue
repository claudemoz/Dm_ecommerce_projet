<script setup lang="ts">
    import Shop from "./components/Shop/Shop.vue";
    import Cart from "./components/Cart/Cart.vue";
    // import data from "../../data/product";
    import { reactive, computed } from "vue";
    import type { productInterface, productCartInterface, FiltersInterface, FilterUpdate,} from "../../interfaces";
    import { DEFAULT_FILTERS } from "./data/filters";
    
    const state = reactive<{
      products: productInterface[];
      cart: productCartInterface[];
      filters: FiltersInterface;
    }>({
      products: [],
      cart: [],
      filters: { ...DEFAULT_FILTERS },
    });
    
    const products = await (await fetch('https:restapi.fr/api/projectproducts')).json()
    if(Array.isArray(products)){
      state.products = products
    }else{
      state.products = [products]
    }

    const addProductToCart = (productId: string): void => {
      const product = state.products.find((product) => product._id === productId);
      if (product) {
        const productInCart = state.cart.find(
          (product) => product._id === productId
        );
        if (productInCart) {
          productInCart.quantity++;
        } else {
          state.cart.push({ ...product, quantity: 1 });
          console.log(state.cart);
        }
      }
    };
    
    const deleteProductToCart = (productId: string): void => {
      const productInCart = state.cart.find((product) => product._id === productId);
      if (productInCart && productInCart.quantity > 1) {
        productInCart.quantity--;
      } else {
        state.cart = state.cart.filter((product) => product._id !== productId);
      }
    };
    
    const cartEmpty = computed(() => state.cart.length === 0);
    
    const filteredProduct = computed(() => {
      return state.products.filter((product) => {
        if (
          product.title
            .toLocaleLowerCase()
            .includes(state.filters.search.toLocaleLowerCase()) &&
          product.price >= state.filters.priceRange[0] &&
          product.price <= state.filters.priceRange[1] &&
          (product.category === state.filters.category ||
            state.filters.category === "all")
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
    
    function updateFilter(filterUpdate: FilterUpdate){
      if(filterUpdate.search !== undefined){
        state.filters.search = filterUpdate.search
      }else if(filterUpdate.priceRange){
        state.filters.priceRange = filterUpdate.priceRange
      }else if(filterUpdate.category){
        state.filters.category = filterUpdate.category
      }else {
        state.filters = { ...DEFAULT_FILTERS }
      }
    }
</script>
    
<template>
    <div class="boutique-container" :class="{ gridEmpty: cartEmpty }">
    <Shop
        class="scrollbar"
        @update-filter="updateFilter"
        :products="filteredProduct"
        :filters="state.filters"
        @add-product-to-cart="addProductToCart"
    />
    <Cart
        v-if="!cartEmpty"
        class="cart"
        :cart="state.cart"
        @delete-product-to-cart="deleteProductToCart"
    />
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
@import "../../assets/scss/debug.scss";

.boutique-container {
    height: calc(100vh - 96px);
    display: grid;
    grid-template-columns: 75% 25%;
}

.gridEmpty {
    grid-template-columns: 100%;
}

.cart {
  border-left: var(--border);
  background-color: var(--white);
}

.scrollbar{
    overflow-y: scroll;
}
</style>
