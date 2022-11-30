
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApolloComponents from '@vue/apollo-components'
// import { ApolloLink, concat, split } from "apollo-link";

import App from './App.vue'
import router from './router'

import './assets/main.css'

import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
// import vue3GoogleLogin from 'vue3-google-login'


const httpLinkBackend = new HttpLink({
    uri: 'http://localhost:8888/graphql',
})
const httpLinkAni = new HttpLink({
    uri: 'https://graphql.anilist.co/',
})

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

// Create the apollo client
const apolloClientBackend = new ApolloClient({
    link:  concat(authMiddleware, httpLinkBackend),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const apolloClientAni = new ApolloClient({
    link:  httpLinkAni,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
    clients: {
        ani: apolloClientAni,
        backend: apolloClientBackend,
    },
    defaultClient: apolloClientAni,
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(apolloProvider)
app.use(VueApolloComponents)

// app.use(vue3GoogleLogin, {
//     clientId: '751477675292-ng83mgnceanrv2fe6s7k1m9253hsd9j0.apps.googleusercontent.com'
// })

app.mount('#app')