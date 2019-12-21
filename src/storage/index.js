import Vue from 'vue'
import Vuex from 'vuex'

import userinfo from './userinfo'
import cache from './cache'
import avatars from './avatars'

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        userinfo : userinfo,
        cache : cache,
        avatars : avatars
    },
});