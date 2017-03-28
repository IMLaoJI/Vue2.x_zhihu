/**
 * Created by superman on 2016/12/2.
 */
import App from './App.vue'
import list from './view/list.vue'
import comments from './view/comments.vue'
import detail from './view/detail.vue'
import recommenders from './view/recommender.vue'
import section from './view/section.vue'
import editors from './view/editor.vue'
import author from './view/author.vue'
import listDefault from './components/list-default.vue'
import listTheme from './components/list-theme.vue'

export default [{
        path: '/',
        component: list,

        children: [{
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: '/',

                component: listDefault
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: '/theme/:id',
                name: 'theme',
                component: listTheme
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 会被渲染在 User 的 <router-view> 中
                path: '/author/:id',
                name: 'author',
                component: author
            }
        ]
    },
    {
        path: '/detail/:id',
        component: detail,
        name: 'detail'
    },
    {
        path: '/comments',
        component: comments
    },
    {
        path: '/recommenders',
        component: recommenders
    },
    {
        path: '/section',
        component: section
    },
    {
        path: '/editors',
        component: editors
    }



]