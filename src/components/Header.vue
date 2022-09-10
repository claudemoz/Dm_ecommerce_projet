<script setup lang="ts">

</script>

<template>
    <header class="d-flex flex-row  align-items-center">
        <a class="d-flex flex-row  align-items-center mr-20 ml-20 " href="">
            <img src="../assets/logo.svg" alt="">
            <span class="logo">VueShop</span>
        </a>
        <ul class="d-flex flex-row  flex-fill">
            <li class="mr-10"><a href="#">Boutique</a></li>
            <li><a href="#">Admin</a></li>
        </ul>
        <ul class="d-flex flex-row">
            <li class="mr-10"><a href="">Inscription</a></li>
            <li class="mr-10"><a href="">Connexion</a></li>
        </ul>
        
    </header>
</template>

<style scoped lang="scss">
header{
    background-color: var(--primary-1);
    position: sticky;
    top: 0;
    a{
        color: var(--text-primary-color);
        img{
            width: 20px;
            margin-right: 5px;
        }
        .logo{
            font-weight: 700;
            font-size: 20px;
        }
    }
}
</style>