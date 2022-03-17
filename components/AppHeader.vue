<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFerrisWheel, mdiGithub } from '@mdi/js';
import { algNavItems } from '@@/assets/menu';

const navs = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Algorithms',
    children: [
      { name: 'Index', to: '/alg' },
      ...algNavItems,
    ],
  },
  {
    name: 'Gallery',
    to: '/test',
  },
  {
    name: 'About',
  },
];
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <NuxtLink
        class="navbar-brand"
        to="/"
      >
        <SvgIcon
          class="d-inline-block align-text-top"
          type="mdi"
          :path="mdiFerrisWheel"
        />
        Algo Playground
      </NuxtLink>

      <button
        class="navbar-toggler"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="offcanvasNavbar"
        class="offcanvas offcanvas-end"
        tabindex="-1"
      >
        <div class="offcanvas-header">
          <h5
            id="offcanvasNavbarLabel"
            class="offcanvas-title"
          >
            Algo Playground
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li
              v-for="(nav, i) in navs"
              :key="i"
              class="nav-item"
              :class="{ 'dropdown': nav.children != undefined }"
            >
              <a
                v-if="nav.children != undefined"
                class="nav-link dropdown-toggle"
                href="javascript:;"
                data-bs-toggle="dropdown"
              >
                {{ nav.name }}
              </a>
              <NuxtLink
                v-else-if="nav.to != undefined"
                class="nav-link"
                exact-active-class="active"
                :to="nav.to"
              >
                {{ nav.name }}
              </NuxtLink>
              <a
                v-else
                class="nav-link disabled"
              >
                {{ nav.name }}
              </a>

              <!-- dropdown menu -->
              <ul
                v-if="nav.children != undefined"
                class="dropdown-menu"
              >
                <li
                  v-for="(item, j) in nav.children"
                  :key="j"
                >
                  <hr
                    v-if="item == null"
                    class="dropdown-divider"
                  >
                  <NuxtLink
                    v-else-if="item.to != undefined"
                    class="dropdown-item"
                    :to="item.to"
                  >
                    {{ item.name }}
                  </NuxtLink>
                  <a
                    v-else
                    class="dropdown-item disabled"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <a
              target="_blank"
              href="https://github.com/zetaraku/algo-playground"
            >
              <SvgIcon
                class="d-inline-block align-text-top me-2"
                type="mdi"
                :path="mdiGithub"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
