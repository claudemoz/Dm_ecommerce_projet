<script setup lang="ts">
import type { Category, FiltersInterface, FilterUpdate } from '@/interfaces';
import { defineEmits } from 'vue';

const props = defineProps<{
    filters: FiltersInterface,
    nbrOfProducts: number
}>()

const emit = defineEmits<{
  (e: 'updateFilter', filterUpdate: FilterUpdate): void
}>()


</script>

<template>
    <div class="p-20 d-flex flex-column">
        <section class="mb-20">
            <h3 class="mb-10">Rechercher</h3>
            <input type="text" :value="filters.search" placeholder="Rechercher" @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value})" />
        </section>
        <section class="mb-20">
            <h3 class="mb-10">Trier par prix</h3>
            <div class="mb-5" v-for="priceRange  of ([[0, 10000],[800, 1000],[1000, 1500], [1500, 2000], [2000, 10000]] as [number, number][])">
                <input type="radio"  @input="emit('updateFilter', { priceRange })" :checked="filters.priceRange[0] === priceRange[0]" name="priceRange" :id="`${priceRange[0]}-${priceRange[1]}`">
                <label :for="`${priceRange[0]}-${priceRange[1]}`">
                    {{ priceRange[0]=== 0 ? 'Tous les prix' : priceRange[0]=== 2000 ? `Plus de ${priceRange[0]} €`: `${priceRange[0]}-${priceRange[1]}`  }}
                </label>
            </div>
            <!-- <div class="mb-5">
                <input type="radio" @input="emit('updateFilter', { priceRange: [800, 1000]})" name="priceRange" id="800-1000">
                <label for="800-1000">800-1000 €</label>
            </div>
            <div class="mb-5">
                <input type="radio" @input="emit('updateFilter', { priceRange: [1000, 1500]})" name="priceRange" id="1000-1500">
                <label for="1000-1500">1000-1500 €</label>
            </div>
            <div class="mb-5">
                <input type="radio" @input="emit('updateFilter', { priceRange: [1500, 2000]})" name="priceRange" id="1500-2000">
                <label for="1500-2000">1500-2000 €</label>
            </div>
            <div class="mb-5">
                <input type="radio" @input="emit('updateFilter', { priceRange: [2000, 10000]})" name="priceRange" id="2000-10000">
                <label for="2000-10000">Plus de 2000 €</label>
            </div> -->
        </section>
        <section class="mb-20 flex-fill">
            <h3 class="mb-10">Trier par categorie</h3>
            <div>
                <p class="category" :class="{selected: filters.category === category}" v-for="category in ((['all', 'desktop', 'gamer', 'streaming']) as Category[])" @click="emit('updateFilter', { category })">{{ category }}</p>
            </div>
        </section>
        <small class="mb-5">Nombre Total: <strong>{{ nbrOfProducts }}</strong></small>
        <button class="btn btn-danger" @click="emit('updateFilter', {})">Supprimer les filtres</button>
    </div>
</template>

<style scoped lang="scss">
.category{
  &:hover{  
  cursor: pointer;
}
}



.selected::before{
  content: '';
  margin-right: 5px;
  border-left: 6px solid var(--primary-1);
}
</style>