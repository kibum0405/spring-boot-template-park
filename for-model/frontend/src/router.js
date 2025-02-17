path: frontend/src
---

import { createRouter, createWebHistory } from 'vue-router';

{{#boundedContexts}}
    {{#aggregates}}
        {{#if uiStyle.layout}}
import {{boundedContext.namePascalCase}}{{namePascalCase}}Manager from "./components/listers/{{boundedContext.namePascalCase}}{{namePascalCase}}{{#layoutPascalCase uiStyle.layout}}{{/layoutPascalCase}}.vue"
        {{else}}
import {{boundedContext.namePascalCase}}{{namePascalCase}}Manager from "./components/listers/{{boundedContext.namePascalCase}}{{namePascalCase}}Cards.vue"
        {{/if}}
import {{boundedContext.namePascalCase}}{{namePascalCase}}Detail from "./components/listers/{{boundedContext.namePascalCase}}{{namePascalCase}}Detail.vue"
    {{/aggregates}}

    {{#readModels}}
import {{namePascalCase}}View from "./components/{{namePascalCase}}View"
import {{namePascalCase}}ViewDetail from "./components/{{namePascalCase}}ViewDetail"
    {{/readModels}}
{{/boundedContexts}}

const routes = [
    {{#boundedContexts}}
        {{#aggregates}}
            {
                path: '/{{boundedContext.namePlural}}/{{namePlural}}',
                name: '{{boundedContext.namePascalCase}}{{namePascalCase}}Manager',
                component: {{boundedContext.namePascalCase}}{{namePascalCase}}Manager
            },
            {
                path: '/{{boundedContext.namePlural}}/{{namePlural}}/:id',
                name: '{{boundedContext.namePascalCase}}{{namePascalCase}}Detail',
                component: {{boundedContext.namePascalCase}}{{namePascalCase}}Detail
            },
        {{/aggregates}}

        {{#readModels}}
            {
                path: '/{{boundedContext.namePlural}}/{{namePlural}}',
                name: '{{namePascalCase}}View',
                component: {{namePascalCase}}View
            },
            {
                path: '/{{boundedContext.namePlural}}/{{namePlural}}/:id',
                name: '{{namePascalCase}}ViewDetail',
                component: {{namePascalCase}}ViewDetail
            },
        {{/readModels}}
    {{/boundedContexts}}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

<function>
    window.$HandleBars.registerHelper('layoutPascalCase', function (layout) {
        let layoutPas = layout.toLowerCase();
        layoutPas = layoutPas.replace(/^[a-z]/, char => char.toUpperCase());
        try{
            if(layout=='CARD'){
                return layoutPas+'s'
            } else if(layout=='LIST-ITEM'){
                return 'List'
            } else if(layout=='GRID'){
                return 'Table'
            } else{
                return layoutPas
            }
        }catch(e){
            console.log(e);
        }
    })
</function>
