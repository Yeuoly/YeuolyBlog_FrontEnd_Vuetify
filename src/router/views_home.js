const Dynamic = () => import('../views/home/ViewDynamic.vue');
const Category = () => import('../views/home/ViewCategory.vue');
const Likes = () => import('../views/home/ViewLikes.vue');

export default [
    {
        name : 'home-dynamic',
        path : '/home/dynamic/:uid',
        component : Dynamic,
        meta : {
            login_required : false,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : true
            }
        }
    },
    {
        name : 'home-category',
        path : '/home/category/:uid',
        component : Category,
        meta : {
            login_required : false,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : true
            }
        }
    },
    {
        name : 'home-likes',
        path : '/home/likes/:uid',
        component : Likes,
        meta : {
            login_required : false,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : true
            }
        }
    },
]