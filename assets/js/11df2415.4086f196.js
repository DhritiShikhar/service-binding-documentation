(self.webpackChunkclassic=self.webpackChunkclassic||[]).push([[484],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return m}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),s=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return i.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||c[m]||r;return n?i.createElement(f,o(o({ref:t},d),{},{components:n})):i.createElement(f,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var s=2;s<r;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5792:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},metadata:function(){return p},toc:function(){return l},default:function(){return d}});var i=n(2122),a=n(9756),r=(n(7294),n(3905)),o={sidebar_position:2},p={unversionedId:"exposing-binding-data/data-model",id:"exposing-binding-data/data-model",isDocsHomePage:!1,title:"Data Model",description:"* path: A template representation of the path to the element in the Kubernetes resource. The value of path could be specified in either JSONPath or GO templates",source:"@site/docs/exposing-binding-data/data-model.md",sourceDirName:"exposing-binding-data",slug:"/exposing-binding-data/data-model",permalink:"/service-binding-documentation/docs/exposing-binding-data/data-model",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/exposing-binding-data/data-model.md",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/service-binding-documentation/docs/exposing-binding-data/intro-expose-binding"},next:{title:"Adding Binding Metadata as Annotations",permalink:"/service-binding-documentation/docs/exposing-binding-data/adding-annotation"}},l=[],s={toc:l};function d(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,i.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"path"),": A template representation of the path to the element in the Kubernetes resource. The value of path could be specified in either JSONPath or GO templates")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"elementType"),": Specifies if the value of the element referenced in ",(0,r.kt)("inlineCode",{parentName:"p"},"path")," is of type ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," / ",(0,r.kt)("inlineCode",{parentName:"p"},"sliceOfStrings")," / ",(0,r.kt)("inlineCode",{parentName:"p"},"sliceOfMaps"),". Defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," if omitted.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"objectType"),": Specifies if the value of the element indicated in ",(0,r.kt)("inlineCode",{parentName:"p"},"path")," refers to a ",(0,r.kt)("inlineCode",{parentName:"p"},"ConfigMap"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Secret")," or a plain string in the current namespace!  Defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"Secret")," if omitted and ",(0,r.kt)("inlineCode",{parentName:"p"},"elementType")," is a non-",(0,r.kt)("inlineCode",{parentName:"p"},"string"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"bindAs"),": Specifies if the element is to be bound as an environment variable or a volume mount using the keywords ",(0,r.kt)("inlineCode",{parentName:"p"},"envVar")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"volume"),", respectively. Defaults to ",(0,r.kt)("inlineCode",{parentName:"p"},"envVar")," if omitted.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"sourceKey"),": Specifies the key in the configmap/Secret that is be added to the binding Secret. When used in conjunction with ",(0,r.kt)("inlineCode",{parentName:"p"},"elementType"),"=",(0,r.kt)("inlineCode",{parentName:"p"},"sliceOfMaps"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"sourceKey")," specifies the key in the slice of maps whose value would be used as a key in the binding Secret. This optional field is the operator author intends to express that only when a specific field in the referenced ",(0,r.kt)("inlineCode",{parentName:"p"},"Secret"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"ConfigMap")," is bindable.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"sourceValue"),": Specifies the key in the slice of maps whose value would be used as the value, corresponding to the value of the ",(0,r.kt)("inlineCode",{parentName:"p"},"sourceKey")," which is added as the key, in the binding Secret. Mandatory only if ",(0,r.kt)("inlineCode",{parentName:"p"},"elementType")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"sliceOfMaps"),"."))))}d.isMDXComponent=!0}}]);