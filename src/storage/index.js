import Vue from 'vue'
import Vuex from 'vuex'

import userinfo from './userinfo'
import cache from './cache'
import avatars from './avatars'
import posts from './post'

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        userinfo,
        cache,
        avatars,
        posts
    },
});