"use strict";(self.webpackChunkclients=self.webpackChunkclients||[]).push([[678],{3485:function(e,r,n){var t=n(4165),s=n(5861),a=n(7430),u=n(1403),o=n(1087),l=n(9101),c=n(184);r.Z=(0,l.$j)((function(e){return{logged_in:e.logged_in}}))((function(e){var r=e.logged_in,n=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.kS)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.jsxs)("nav",{className:"navbar flex flex-col md:flex-row items-center justify-between px-6 py-6",children:[(0,c.jsxs)("a",{href:"/",className:"flex justify-between my-auto",children:[(0,c.jsx)("img",{src:a.Z,className:"w-8 h-8",alt:"Logo"}),(0,c.jsx)("h1",{className:"bold text-xl my-auto mx-4",children:"LinkScissors"})]}),!r&&(0,c.jsxs)("ul",{className:"flex flex-row my-8 md:my-auto justify-evenly md:justify-end w-screen",children:[(0,c.jsx)("li",{children:(0,c.jsx)(o.rU,{className:" border px-8 md:px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]",to:"/login",children:"Login"})},1),(0,c.jsx)("li",{children:(0,c.jsx)(o.rU,{className:" border px-8 md:px-12 p-2 md:mx-4 rounded-lg bg-[#efefef] hover:bg-[#0087cb]",to:"/register",children:"Sign Up"})},2)]}),r&&(0,c.jsxs)("ul",{className:"flex flex-row my-8 md:my-auto justify-evenly md:justify-end w-screen",children:[(0,c.jsx)("li",{children:(0,c.jsx)(o.rU,{to:"/links",className:"hover:cursor-pointer border px-8 md:px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]",children:"My Links"})},1),(0,c.jsx)("li",{children:(0,c.jsx)("span",{className:"hover:cursor-pointer mx-4 border px-8 md:px-12 p-2 rounded-lg bg-[#efefef] hover:bg-[#0087cb]",onClick:n,children:"Logout"})},2)]})]})}))},272:function(e,r,n){var t=n(2791),s=n(8418),a=n(184);r.Z=function(e){var r=e.data,n=(0,t.useRef)(null);return(0,a.jsxs)("div",{className:"flex flex-col items-center",children:[(0,a.jsx)("img",{ref:n,src:r,alt:"QR Code",className:"w-48 h-48 mb-4"}),(0,a.jsx)("button",{onClick:function(){if(n.current){var e=document.createElement("canvas"),r=e.getContext("2d"),t=n.current;r&&(e.width=t.width,e.height=t.height,r.drawImage(t,0,0),e.toBlob((function(e){if(e){var r=new ClipboardItem({"image/png":e});navigator.clipboard.write([r]),(0,s.wp)({msg:"QRcode copied",type:"success"})}})))}},className:"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",children:"Copy QR Code"})]})}},6678:function(e,r,n){n.r(r);var t=n(4165),s=n(5861),a=n(9439),u=n(2791),o=n(3485),l=n(9101),c=n(7689),i=n(272),d=n(5705),f=n(6727),m=n(9605),p=n(184);r.default=(0,l.$j)((function(e){return{logged_in:e.logged_in,user:e.user}}))((function(e){var r=e.logged_in,n=e.user,l=(0,u.useState)(null),x=(0,a.Z)(l,2),h=x[0],g=x[1],v=(0,u.useState)(null),b=(0,a.Z)(v,2),y=b[0],j=b[1],w=(0,d.TA)({initialValues:{url:"",custom_alias:"",user_id:null===n||void 0===n?void 0:n._id},validationSchema:f.Ry({url:f.Z_().url("Invalid URL").required("URL is required"),custom_alias:f.Z_(),user_id:f.Z_().required()}),onSubmit:function(){var e=(0,s.Z)((0,t.Z)().mark((function e(r){var n,s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,m.jv)(r);case 3:n=e.sent,s=null===n||void 0===n?void 0:n.data,a=s.short_url,g(a),j(null),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}()});if(!r)return(0,p.jsx)(c.Fg,{to:"/login"});var Z=w.values,_=w.errors,k=w.submitForm,N=w.isSubmitting,C=w.handleChange,S=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(){var r,n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,m.wH)({url:h});case 2:n=e.sent,j(null===n||void 0===n||null===(r=n.data)||void 0===r?void 0:r.url);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.Z,{}),(0,p.jsxs)("div",{className:"flex flex-col items-center justify-center my-12 md:my-24 w-screen",children:[(0,p.jsx)("h1",{className:"text-xl md:text-3xl font-bold mb-12",children:"Shorten your long link"}),(0,p.jsxs)("div",{className:"flex flex-col justify-center w-full px-6 md:mx-48",children:[(0,p.jsx)("input",{name:"url",type:"text",value:Z.url,onChange:C,placeholder:"Enter your super long link...",className:"border border-gray-300 rounded-lg px-4 py-2 w-full mx-auto md:w-1/2 focus:outline-none focus:ring focus:border-blue-500"}),(0,p.jsx)("input",{name:"custom_alias",type:"text",value:Z.custom_alias,onChange:C,placeholder:"Enter a custom title",className:"border border-gray-300 rounded-lg px-4 my-2 py-2 w-full mx-auto  md:w-1/2 focus:outline-none focus:ring focus:border-blue-500"}),(0,p.jsx)("button",{onClick:function(){k()},className:"bg-[#0087CB] my-4 md:my-0 text-white font-semibold px-4 py-2 mx-auto  md:w-1/2  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring",children:N?"loading...":"Scissors it"})]}),_.url&&(0,p.jsx)("span",{className:"error",children:_.url}),h&&(0,p.jsxs)("div",{className:"flex flex-col items-center justify-center my-4 md:my-8 w-screen",children:[(0,p.jsx)("p",{className:"text-base",children:"Here is scissored url:"}),(0,p.jsx)("a",{href:h,target:"_blank",rel:"noopener noreferrer",className:"text-blue-500 text-center py-4 underline hover:cursor-pointer hover:text-blue-600",children:h}),(0,p.jsx)("button",{onClick:S,className:"py-2 px-4 bg-[#0087CB] text-white rounded",children:" Generate QR code"})]}),y&&(0,p.jsx)(i.Z,{data:y})]})]})}))},9605:function(e,r,n){n.d(r,{jv:function(){return i},rx:function(){return c},wH:function(){return d}});var t=n(1413),s=n(4165),a=n(5861),u=n(1033),o=n(5696),l=n(8418),c=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(r){var n,t,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.user_id,e.prev=1,t=o.h.getState().user_token,e.next=5,u.Z.get("/url/shorten?user_id=".concat(n),{headers:{Authorization:"Bearer ".concat(t)}});case 5:return a=e.sent,e.abrupt("return",a.data);case 9:e.prev=9,e.t0=e.catch(1),(0,l.wp)({msg:e.t0.response.data.message,type:"danger"});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(r){return e.apply(this,arguments)}}(),i=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(r){var n,a,c,i,d;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,a=r.custom_alias,c=r.user_id,e.prev=1,i=o.h.getState().user_token,e.next=5,u.Z.post("/url/shorten",(0,t.Z)({url:n,user_id:c},""!==a&&{custom_alias:a}),{headers:{Authorization:"Bearer ".concat(i)}});case 5:return d=e.sent,e.abrupt("return",d.data);case 9:e.prev=9,e.t0=e.catch(1),(0,l.wp)({msg:e.t0.response.data.message,type:"danger"});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(r){return e.apply(this,arguments)}}(),d=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(r){var n,t,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.url,e.prev=1,t=o.h.getState().user_token,e.next=5,u.Z.post("/url/shorten/qrcode",{url:n},{headers:{Authorization:"Bearer ".concat(t)}});case 5:return a=e.sent,e.abrupt("return",a.data);case 9:e.prev=9,e.t0=e.catch(1),(0,l.wp)({msg:e.t0.response.data.message,type:"danger"});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(r){return e.apply(this,arguments)}}()}}]);
//# sourceMappingURL=678.ba72c51e.chunk.js.map