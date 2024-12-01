<template>
  <header class="header">
    <div class="header__left"></div>

    <div class="header__right">
      <div class="header__avatar" @click="toggleMenu" ref="excludeRef">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          alt="User Avatar"
          class="header__avatar__image"
        />
      </div>
      <div v-if="showMenu" class="header__menu" ref="componentRef">
        <RouterLink to="/" class="header__menu__item">My Sessions</RouterLink>
        <RouterLink to="/account" class="header__menu__item">Account</RouterLink>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useClickOutside from '@/utils.ts'

const showMenu = ref(false)
const componentRef = ref()
const excludeRef = ref()

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

useClickOutside(
  componentRef,
  () => {
    showMenu.value = false
  },
  excludeRef,
)
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__left {
    flex: 1;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 2px 2px #d1d5db;
      border: 2px solid #c9cbd1;
    }

    &__image {
      max-width: 40px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__menu {
    position: absolute;
    top: 4rem;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 10rem;
    z-index: 10;
    display: flex;
    flex-direction: column;

    &__item {
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #333;
      font-size: 0.875rem;
      cursor: pointer;

      &:hover {
        background: #f3f4f6;
      }
    }
  }
}
</style>
