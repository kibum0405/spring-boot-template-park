const Managing = {
  install(Vue = {}) {
    // import.meta.glob을 사용하여 모든 .vue 파일을 가져옵니다.
    const files = import.meta.glob("./**/*.vue", { eager: true });
    const components = {};

    Object.keys(files).forEach(key => {
      if (key === "./index.js") {
        return;
      }
      const componentName = key.replace(/(\.\/|\.vue)/g, "");
      components[componentName] = files[key];
    });

    if (Vue._components == null) Vue._components = {};

    for (var key in components) {
      Vue.component(components[key].default.name, components[key].default);
      Vue._components[components[key].default.name] = components[key].default;
    }

    //bpmn 컴포넌트 검색용
    Vue.ManagingComponents = components;

    //윈도우 전역변수 등록 (다른 인스톨 플러그인에서 거진 하긴 해주지만 혹시 모르니...)
    if (window && !window.Vue) {
      window.Vue = Vue;
    }
  }
};

export default Managing;
