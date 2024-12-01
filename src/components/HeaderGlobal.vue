<template>
  <header class="header">
    <div class="header__left"></div>

    <div class="header__right">
      <RouterLink to="/">
        <button class="header__button header__button--primary">My Sessions</button>
      </RouterLink>
      <RouterLink to="/create-session">
        <button class="header__button header__button--secondary">+</button>
      </RouterLink>

      <RouterLink to="/account">
        <div class="header__avatar">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt="User Avatar"
            class="header__avatar__image"
          />
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

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

  &__button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &--primary {
      background-color: #3b82f6;
    }

    &--primary:hover {
      background-color: #2563eb;
    }

    &--secondary {
      background-color: #6b7280;
    }

    &--secondary:hover {
      background-color: #4b5563;
    }
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
}
</style>
