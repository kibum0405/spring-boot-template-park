 /*eslint-disable*/
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Vuetify 플러그인 경로
import axios from 'axios';
import Managing from "./components";
import router from './router';
{{#if (isSelectedSecurity options.rootModel.toppingPlatforms)}}
import Keycloak from 'keycloak-js';
{{/if}}
import './GlobalStyle.css';

// backend host url
axios.backend = null; //"http://localhost:8088";

// axios.backendUrl = new URL(axios.backend);
axios.fixUrl = function(original) {
  if (!axios.backend && original.indexOf("/") == 0) return original;

  var url = null;

  try {
      url = new URL(original);
  } catch (e) {
      url = new URL(axios.backend + original);
  }

  if (!axios.backend) return url.pathname;

  url.hostname = axios.backendUrl.hostname;
  url.port = axios.backendUrl.port;

  return url.href;
}

const templateFiles = import.meta.glob("./components/**/*.vue");
const app = createApp(App);
app.config.globalProperties.$ManagerLists = [];
Object.keys(templateFiles).forEach(function(tempFiles) {
  if (!tempFiles.includes("Manager.vue") && tempFiles.includes("vue")) {
    app.config.globalProperties.$ManagerLists.push(
      tempFiles.replace("./components/", "").replace(".vue", "")
    );
  }
});
const pluralCaseList = []

{{#boundedContexts}}
    {{#aggregates}}
pluralCaseList.push( {plural: "{{boundedContext.namePlural}}/{{namePlural}}", pascal: "{{boundedContext.namePascalCase}}{{namePascalCase}}"} )
    {{/aggregates}}

    {{#viewes}}
pluralCaseList.push( {plural: "{{namePlural}}", pascal: "{{namePascalCase}}"} )
    {{/viewes}}
{{/boundedContexts}}

app.config.globalProperties.$ManagerLists.forEach(function(item, idx) {
  pluralCaseList.forEach(function(tmp) {
    if(item.toLowerCase() == tmp.pascal.toLowerCase()) {
      var obj = {
        name: item,
        plural: tmp.plural
      }
      app.config.globalProperties.$ManagerLists[idx] = obj
    }
  })
})

{{#if (isSelectedSecurity options.rootModel.toppingPlatforms)}}
let initOptions = {
  url: `http://localhost:9090/`,
  realm: `master`,
  clientId: `master`,
  onLoad: `login-required`,
};

let keycloak = new Keycloak(initOptions);

init();

function init() {
  keycloak.init({
    onLoad: initOptions.onLoad,
  }).then(auth => {
    const ONE_MINUTE = 60000;
  
    if (!auth) {
      window.location.reload();
    } else {
      console.info(`Auth ok`);
    }

    Vue.prototype.$OAuth = keycloak
  
    new Vue({
      vuetify,
      router,
      render: h => h(App, {
        props: {
          OAuth: keycloak,
        },
      }),
    }).$mount("#app");
  
    window.setTimeout(refreshToken.bind(null, keycloak), ONE_MINUTE);
  }).catch(() => {
    console.error(`Auth Fail`);
  })
}

function refreshToken() {
  keycloak.updateToken(70).then(refreshed => {
    if (refreshed) {
      successRefresh(refreshed);
    } else {
      warnRefresh();
    }
  }).error(errorRefresh);
}

function successRefresh(refreshed) {
  console.debug(`Token refreshed ${refreshed}`);
}

function warnRefresh() {
  console.warn(`Token not refreshed, valid for 
  ${Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)} seconds`);
}

function errorRefresh() {
  console.error('Failed to refresh token');
}
{{else}}
app.use(router);
app.use(vuetify);
app.mount('#app');
{{/if}}

<function>
 window.$HandleBars.registerHelper('isSelectedSecurity', function (selectedSecurity) {
    try{
        var isSelectedSecurity = false
        for(var i=0; i<selectedSecurity.length; i++){
            if(selectedSecurity[i].includes('keycloak-security')){
                isSelectedSecurity =  true;
            }
        }

        return isSelectedSecurity;
    } catch(e){
        console.log(e)
    }
});
</function>
