(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69d8fb17"],{"0ac8":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"welcome-view"},[r("combined-login-form"),r("h1",[e._v("Game browser")]),this.isAuthenticated?r("the-game-browser"):e._e(),r("h1",[e._v("Chat window")]),this.isInGame?r("the-chat-window"):e._e()],1)},s=[],o=(r("8e6e"),r("ac6a"),r("456d"),r("85f2")),i=r.n(o);function a(e,t,r){return t in e?i()(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=r("2f62"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"combined-login-form"},[r("base-textbox",{attrs:{value:e.enteredUsername,placeholder:"Username"},on:{input:e.onUsernameEntered}}),r("base-textbox",{attrs:{value:e.enteredPassword,placeholder:"Password","input-type":"password"},on:{input:e.onPasswordEntered}}),r("base-button",{on:{click:e.onRegister}},[e._v("Register")]),r("base-button",{on:{click:e.onLogin}},[e._v("Login")]),r("div",{staticClass:"response-status"},[r("div",{staticClass:"success"},[e._v(e._s(e.successMessage))]),r("div",{staticClass:"error"},[e._v(e._s(e.errorMessage))])])],1)},l=[],f=(r("96cf"),r("3b8d")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"base-button",on:{click:e.onClick}},[r("i",{class:e.iconClass}),e._t("default")],2)},d=[],m={props:{text:String,icon:String,isIconOnly:Boolean},computed:{iconClass:function(){return this.icon?"fas "+this.icon:"hidden"}},methods:{onClick:function(e){this.$emit("click",e)}}},h=m,b=(r("70fc"),r("2877")),v=Object(b["a"])(h,p,d,!1,null,"6357a1bf",null),g=v.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-input"},[r("label",[e._t("default")],2),"checkbox"!==e.inputType||e.multiline?"radio"!==e.inputType||e.multiline?e.multiline?e._e():r("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],staticClass:"card-title",attrs:{placeholder:e.placeholder,readonly:e.readonly,type:e.inputType},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],staticClass:"card-title",attrs:{placeholder:e.placeholder,readonly:e.readonly,type:"radio"},domProps:{checked:e._q(e.text,null)},on:{change:function(t){e.text=null}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],staticClass:"card-title",attrs:{placeholder:e.placeholder,readonly:e.readonly,type:"checkbox"},domProps:{checked:Array.isArray(e.text)?e._i(e.text,null)>-1:e.text},on:{change:function(t){var r=e.text,n=t.target,s=!!n.checked;if(Array.isArray(r)){var o=null,i=e._i(r,o);n.checked?i<0&&(e.text=r.concat([o])):i>-1&&(e.text=r.slice(0,i).concat(r.slice(i+1)))}else e.text=s}}}),e.multiline?r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],staticClass:"card-title",attrs:{rows:e.rows,placeholder:e.placeholder,readonly:e.readonly},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}):e._e()])},O=[],w=(r("c5f6"),{props:{rows:Number,value:[String,Number],readonly:Boolean,placeholder:String,inputType:{type:String,default:"text"}},computed:{text:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},multiline:function(){return void 0!==this.rows&&this.rows>1}}}),j=w,x=(r("33d4"),Object(b["a"])(j,y,O,!1,null,"05895418",null)),P=x.exports;function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var E={components:{BaseTextbox:P,BaseButton:g},data:function(){return{enteredUsername:"",enteredPassword:"",serverResponse:void 0}},computed:{successMessage:function(){if(this.serverResponse&&!this.serverResponse.error)return this.serverResponse},errorMessage:function(){if(this.serverResponse&&this.serverResponse.error)return this.serverResponse.error}},methods:S({},Object(c["b"])({register:"player/register",login:"player/login"}),{onUsernameEntered:function(e){this.enteredUsername=e},onPasswordEntered:function(e){this.enteredPassword=e},onRegister:function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.register({username:this.enteredUsername,password:this.enteredPassword});case 2:this.serverResponse=e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onLogin:function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.login({username:this.enteredUsername,password:this.enteredPassword});case 2:this.serverResponse=e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()})},k=E,C=(r("b714"),Object(b["a"])(k,u,l,!1,null,"0f1e34d9",null)),L=C.exports,G=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"the-game-browser"},[r("game-list",{attrs:{games:this.publicGames},on:{gameSelected:e.onGameSelected}}),0===this.publicGames.length?r("div",{staticClass:"empty-list"},[e._v("No public games found")]):e._e(),r("base-button",{on:{click:e.onCreate}},[e._v("Create")]),r("base-button",{on:{click:e.onRefresh}},[e._v("Refresh")])],1)},R=[],N=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"game-list"},e._l(e.games,(function(t){return r("the-game-list-item",{key:t.id,attrs:{game:t},on:{click:e.onGameSelected}})})),1)},T=[],I=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"game-list-item"},[r("base-button",{on:{click:e.onClick}},[e._v(e._s(e.game.id))])],1)},D=[],A={components:{BaseButton:g},props:{game:{type:Object,required:!0}},methods:{onClick:function(){this.$emit("click",this.game)}}},M=A,B=Object(b["a"])(M,I,D,!1,null,"66f77d35",null),$=B.exports;function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function U(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var V={components:{TheGameListItem:$},props:{games:{type:Array,required:!0}},data:function(){return{}},computed:{},methods:U({},Object(c["b"])({}),{onGameSelected:function(e){this.$emit("gameSelected",e)}})},H=V,q=(r("110d"),Object(b["a"])(H,N,T,!1,null,"dc3de674",null)),J=q.exports;function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function X(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var K={components:{GameList:J,BaseTextbox:P,BaseButton:g},data:function(){return{enteredUsername:"",enteredPassword:"",serverResponse:void 0}},mounted:function(){this.refreshList()},computed:X({},Object(c["d"])({publicGames:function(e){return e.gameBrowser.publicGames}})),methods:X({},Object(c["b"])({joinGame:"currentGame/joinGame",createGame:"gameBrowser/createGame",refreshList:"gameBrowser/fetchPublicGames"}),{onGameSelected:function(e){this.joinGame(e)},onCreate:function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.createGame();case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onRefresh:function(){var e=Object(f["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.refreshList();case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()})},W=K,z=Object(b["a"])(W,G,R,!1,null,"6ca0fe6b",null),Q=z.exports,Z=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"the-game-browser"},[r("chat-entry-list",{attrs:{chatEntries:this.chatHistory}}),r("base-textbox",{attrs:{value:e.enteredMessage,placeholder:"Your chat message"},on:{input:e.onMessageInput}}),r("base-button",{on:{click:e.onSend}},[e._v("Send")])],1)},ee=[],te=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"chat-message-list"},e._l(this.chatEntries,(function(e){return r("chat-entry-list-item",{key:e.id,attrs:{chatEntry:e}})})),1)},re=[],ne=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"chat-message-list-item"},[r("span",[e._v(e._s(e.chatEntry.sender.username)+": "+e._s(e.chatEntry.message))])])},se=[],oe={props:{chatEntry:{type:Object,required:!0}},methods:{}},ie=oe,ae=Object(b["a"])(ie,ne,se,!1,null,"469a6744",null),ce=ae.exports,ue={components:{ChatEntryListItem:ce},props:{chatEntries:{type:Array,required:!0}}},le=ue,fe=(r("32f2"),Object(b["a"])(le,te,re,!1,null,"4c3eb38a",null)),pe=fe.exports;function de(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function me(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?de(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):de(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var he={components:{BaseButton:g,BaseTextbox:P,ChatEntryList:pe},data:function(){return{enteredMessage:""}},mounted:function(){},computed:me({},Object(c["d"])({webSocket:function(e){return e.currentGame.webSocket},chatHistory:function(e){return e.currentGame.chatHistory}})),methods:me({},Object(c["b"])({}),{onMessageInput:function(e){this.enteredMessage=e},onSend:function(){this.webSocket.send(JSON.stringify({type:"post/chat",data:this.enteredMessage})),this.enteredMessage=""}})},be=he,ve=Object(b["a"])(be,Z,ee,!1,null,"e612231c",null),ge=ve.exports;function ye(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Oe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ye(r,!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ye(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var we={components:{TheChatWindow:ge,TheGameBrowser:Q,CombinedLoginForm:L},data:function(){return{enteredUsername:"",enteredPassword:"",serverResponse:void 0}},computed:Oe({},Object(c["c"])({isAuthenticated:"player/isAuthenticated",isInGame:"currentGame/isInGame"})),methods:{}},je=we,xe=(r("1a12"),Object(b["a"])(je,n,s,!1,null,"de9f2ffa",null));t["default"]=xe.exports},"110d":function(e,t,r){"use strict";var n=r("5a72"),s=r.n(n);s.a},"11e9":function(e,t,r){var n=r("52a7"),s=r("4630"),o=r("6821"),i=r("6a99"),a=r("69a8"),c=r("c69a"),u=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?u:function(e,t){if(e=o(e),t=i(t,!0),c)try{return u(e,t)}catch(r){}if(a(e,t))return s(!n.f.call(e,t),e[t])}},"1a12":function(e,t,r){"use strict";var n=r("6c7f"),s=r.n(n);s.a},"32f2":function(e,t,r){"use strict";var n=r("9741"),s=r.n(n);s.a},"33d4":function(e,t,r){"use strict";var n=r("ceeb"),s=r.n(n);s.a},"454f":function(e,t,r){r("46a7");var n=r("584a").Object;e.exports=function(e,t,r){return n.defineProperty(e,t,r)}},"456d":function(e,t,r){var n=r("4bf8"),s=r("0d58");r("5eda")("keys",(function(){return function(e){return s(n(e))}}))},"46a7":function(e,t,r){var n=r("63b6");n(n.S+n.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"5a72":function(e,t,r){},"5dbc":function(e,t,r){var n=r("d3f4"),s=r("8b97").set;e.exports=function(e,t,r){var o,i=t.constructor;return i!==r&&"function"==typeof i&&(o=i.prototype)!==r.prototype&&n(o)&&s&&s(e,o),e}},"5eda":function(e,t,r){var n=r("5ca1"),s=r("8378"),o=r("79e5");e.exports=function(e,t){var r=(s.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*o((function(){r(1)})),"Object",i)}},"6c7f":function(e,t,r){},"70fc":function(e,t,r){"use strict";var n=r("e0d6"),s=r.n(n);s.a},"85f2":function(e,t,r){e.exports=r("454f")},"8b97":function(e,t,r){var n=r("d3f4"),s=r("cb7c"),o=function(e,t){if(s(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(e,[]),t=!(e instanceof Array)}catch(s){t=!0}return function(e,r){return o(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:o}},"8e6e":function(e,t,r){var n=r("5ca1"),s=r("990b"),o=r("6821"),i=r("11e9"),a=r("f1ae");n(n.S,"Object",{getOwnPropertyDescriptors:function(e){var t,r,n=o(e),c=i.f,u=s(n),l={},f=0;while(u.length>f)r=c(n,t=u[f++]),void 0!==r&&a(l,t,r);return l}})},9093:function(e,t,r){var n=r("ce10"),s=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,s)}},9741:function(e,t,r){},"990b":function(e,t,r){var n=r("9093"),s=r("2621"),o=r("cb7c"),i=r("7726").Reflect;e.exports=i&&i.ownKeys||function(e){var t=n.f(o(e)),r=s.f;return r?t.concat(r(e)):t}},aa77:function(e,t,r){var n=r("5ca1"),s=r("be13"),o=r("79e5"),i=r("fdef"),a="["+i+"]",c="​",u=RegExp("^"+a+a+"*"),l=RegExp(a+a+"*$"),f=function(e,t,r){var s={},a=o((function(){return!!i[e]()||c[e]()!=c})),u=s[e]=a?t(p):i[e];r&&(s[r]=u),n(n.P+n.F*a,"String",s)},p=f.trim=function(e,t){return e=String(s(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(l,"")),e};e.exports=f},ac6a:function(e,t,r){for(var n=r("cadf"),s=r("0d58"),o=r("2aba"),i=r("7726"),a=r("32e9"),c=r("84f2"),u=r("2b4c"),l=u("iterator"),f=u("toStringTag"),p=c.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=s(d),h=0;h<m.length;h++){var b,v=m[h],g=d[v],y=i[v],O=y&&y.prototype;if(O&&(O[l]||a(O,l,p),O[f]||a(O,f,v),c[v]=p,g))for(b in n)O[b]||o(O,b,n[b],!0)}},b714:function(e,t,r){"use strict";var n=r("c7f9"),s=r.n(n);s.a},c5f6:function(e,t,r){"use strict";var n=r("7726"),s=r("69a8"),o=r("2d95"),i=r("5dbc"),a=r("6a99"),c=r("79e5"),u=r("9093").f,l=r("11e9").f,f=r("86cc").f,p=r("aa77").trim,d="Number",m=n[d],h=m,b=m.prototype,v=o(r("2aeb")(b))==d,g="trim"in String.prototype,y=function(e){var t=a(e,!1);if("string"==typeof t&&t.length>2){t=g?t.trim():p(t,3);var r,n,s,o=t.charCodeAt(0);if(43===o||45===o){if(r=t.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(t.charCodeAt(1)){case 66:case 98:n=2,s=49;break;case 79:case 111:n=8,s=55;break;default:return+t}for(var i,c=t.slice(2),u=0,l=c.length;u<l;u++)if(i=c.charCodeAt(u),i<48||i>s)return NaN;return parseInt(c,n)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof m&&(v?c((function(){b.valueOf.call(r)})):o(r)!=d)?i(new h(y(t)),r,m):y(t)};for(var O,w=r("9e1e")?u(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),j=0;w.length>j;j++)s(h,O=w[j])&&!s(m,O)&&f(m,O,l(h,O));m.prototype=b,b.constructor=m,r("2aba")(n,d,m)}},c7f9:function(e,t,r){},ceeb:function(e,t,r){},e0d6:function(e,t,r){},f1ae:function(e,t,r){"use strict";var n=r("86cc"),s=r("4630");e.exports=function(e,t,r){t in e?n.f(e,t,s(0,r)):e[t]=r}},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-69d8fb17.2c873569.js.map