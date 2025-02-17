
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


import 주문주문Manager from "./components/listers/주문주문Cards"
import 주문주문Detail from "./components/listers/주문주문Detail"

import 배송배송Manager from "./components/listers/배송배송Cards"
import 배송배송Detail from "./components/listers/배송배송Detail"

import 상품재고Manager from "./components/listers/상품재고Cards"
import 상품재고Detail from "./components/listers/상품재고Detail"


export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
            {
                path: '/주문/주문',
                name: '주문주문Manager',
                component: 주문주문Manager
            },
            {
                path: '/주문/주문/:id',
                name: '주문주문Detail',
                component: 주문주문Detail
            },

            {
                path: '/배송/배송',
                name: '배송배송Manager',
                component: 배송배송Manager
            },
            {
                path: '/배송/배송/:id',
                name: '배송배송Detail',
                component: 배송배송Detail
            },

            {
                path: '/상품/재고',
                name: '상품재고Manager',
                component: 상품재고Manager
            },
            {
                path: '/상품/재고/:id',
                name: '상품재고Detail',
                component: 상품재고Detail
            },



    ]
})
