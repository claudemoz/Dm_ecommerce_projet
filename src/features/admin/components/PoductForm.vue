<template>
    <div class="card">
        <h3 class="mb-10">Ajouter un article</h3>
        <form @submit.prevent="submit">
            <div class="d-flex flex-column mb-20">
                <label class="mb-5">Titre<span class="text-danger">*</span></label>
                <input type="text" v-model="titleValue" ref="focusInputTitle">
                <span v-if="titleError" class="form-error">{{ titleError }}</span>
            </div>
            <div class="d-flex flex-column mb-20">
                <label class="mb-5">Image<span class="text-danger">*</span></label>
                <input type="text" v-model="imageValue">
                <span v-if="imageError" class="form-error">{{ imageError }}</span>
            </div>
            <div class="d-flex flex-column mb-20">
                <label class="mb-5">Prix<span class="text-danger">*</span></label>
                <input type="number" v-model="priceValue">
                <span v-if="priceError" class="form-error">{{ priceError }}</span>
            </div>
            <div class="d-flex flex-column mb-20">
                <label class="mb-5">Description<span class="text-danger">*</span></label>
                <textarea v-model="(descriptionValue as string)" rows="" cols=""></textarea>
                <span v-if="descriptionError" class="form-error">{{ descriptionError }}</span>
            </div>
            <div class="d-flex flex-column mb-20">
                <label class="mb-5">Categories<span class="text-danger">*</span></label>
                <select v-model="categoryValue">
                    <option value="">Choisir une catégorie</option>
                    <option value="gamer">Jeu</option>
                    <option value="desktop">Bureautique</option>
                    <option value="streaming">Stream</option>
                </select>
                <span v-if="categoryError" class="form-error">{{ categoryError }}</span>
            </div>
            <button class="btn btn-primary" :disabled="isSubmitting">Valider</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toFormValidator } from '@vee-validate/zod'
import { onMounted, ref } from 'vue';

const focusInputTitle = ref<HTMLInputElement | null>(null)

onMounted(() => {(
    focusInputTitle.value?.focus()
)})

const validationSchema = toFormValidator(
    z.object({
        title: z.string({required_error: 'Ce champ est obligatoire'})
                .min(1, {message: 'Le titre doit faire au moins 1 caractère'})
                .max(20, {message: 'le titre doit faire moins de 20 caractères'}),
        image: z.string({required_error: 'Ce champ est obligatoire'}),
        price: z.number({required_error: 'Ce champ est obligatoire'})
                .min(0, {message: 'Le prix doit êtres supérieur à 0'})
                .max(15000, {message:' le prix doit être inférieur à 15000'}),
        description: z.string({required_error: 'Ce champ est obligatoire'})
                      .min(10, {message: 'La description doit faire au moins 10 caractères'}),
        category: z.string({required_error: 'Ce champ est obligatoire'}),
    })
)

const { handleSubmit, isSubmitting, resetForm } = useForm({validationSchema})
const { value: titleValue, errorMessage: titleError} = useField('title')
const { value: imageValue, errorMessage: imageError} = useField('image')
const { value: priceValue, errorMessage: priceError} = useField('price')
const { value: descriptionValue , errorMessage: descriptionError} = useField('description')
const { value: categoryValue , errorMessage: categoryError} = useField('category')


const submit = handleSubmit( async (data)=>{
    try {
        const url = 'https://restapi.fr/api/projectproducts'
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        resetForm();
        focusInputTitle.value?.focus()
    } catch (e) {
        console.log(e);
        
    }   
})
</script>

<style lang="scss" scoped>
.card{
    max-width: 500px;
    width: 100%;
}
</style>