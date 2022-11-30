import { createRouter, createWebHistory } from 'vue-router'
import Apollo from "../views/Apollo.vue";
import Book from "../views/Book.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import createBook from "../views/createBook.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/apollo',
      name: 'apollo',
      component: Apollo
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book
    },
    {
      path: '/book/create',
      name: 'createBook',
      component: createBook
    },

  ]
})

export default router
