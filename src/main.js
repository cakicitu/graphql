import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'


const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8888/graphiql',
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
    .use(apolloProvider)
app.mount('#app')
