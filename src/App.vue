<script setup lang="ts">
import TheHeader from "./components/Header.vue";
import TheFooter from "./components/Footer.vue";
import Shop from "./components/Shop/Shop.vue";
import Cart from "./components/Cart/Cart.vue";
import data from "./data/product";
import { reactive, computed } from "vue";
import type { productInterface, productCartInterface, FiltersInterface, FilterUpdate,} from "./interfaces";
import { DEFAULT_FILTERS } from "./data/filters";

const state = reactive<{
  products: productInterface[];
  cart: productCartInterface[];
  filters: FiltersInterface;
}>({
  products: data,
  cart: [],
  filters: { ...DEFAULT_FILTERS },
});

const addProductToCart = (productId: number): void => {
  const product = state.products.find((product) => product.id === productId);
  if (product) {
    const productInCart = state.cart.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
      console.log(state.cart);
    }
  }
};

const deleteProductToCart = (productId: number): void => {
  const productInCart = state.cart.find((product) => product.id === productId);
  if (productInCart && productInCart.quantity > 1) {
    productInCart.quantity--;
  } else {
    state.cart = state.cart.filter((product) => product.id !== productId);
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
  <div class="app-container" :class="{ gridEmpty: cartEmpty }">
    <TheHeader class="header" />
    <Shop
      @update-filter="updateFilter"
      class="shop"
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
    <TheFooter class="footer" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/debug.scss";

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: 48px auto 48px;
  grid-template-areas: "header header" "shop cart" "footer footer";
}

.gridEmpty {
  grid-template-columns: 100%;
  grid-template-rows: 48px auto 48px;
  grid-template-areas: "header" "shop" "footer";
}

.header {
  grid-area: header;
}

.shop {
  grid-area: shop;
}

.cart {
  grid-area: cart;
  border-left: var(--border);
  background-color: var(--white);
}

.footer {
  grid-area: footer;
}
</style>
