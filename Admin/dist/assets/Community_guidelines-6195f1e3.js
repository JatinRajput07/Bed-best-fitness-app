import{z as f,u as C,r as s,I as p,j as e,a,J as y}from"./index-8b2c0f7c.js";import{C as b,a as j}from"./ckeditor-6eb271a3.js";const E=()=>{const o=f(),t=C(n=>n.cms.content),[u,l]=s.useState("community_guidelines"),[i,r]=s.useState(""),[d,c]=s.useState(!1);s.useEffect(()=>{o(p({title:"community_guidelines"}))},[o]),s.useEffect(()=>{t&&(l((t==null?void 0:t.title)||"community_guidelines"),r((t==null?void 0:t.content)||""))},[t]);const g=(n,x)=>{const m=x.getData();r(m),c(m!==t.content)},h=()=>{o(y({title:"community_guidelines",content:i})),alert("Terms and Conditions updated successfully!"),c(!1)};return e.jsx("div",{className:"mt-12 mb-8 flex flex-col gap-12",children:e.jsxs(a.Card,{children:[e.jsx(a.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6",children:e.jsx(a.Typography,{variant:"h6",color:"white",children:"Community Guidelines"})}),e.jsxs(a.CardBody,{className:"p-6",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"title",className:"block text-sm font-medium text-gray-700",children:"Title"}),e.jsx("input",{id:"title",type:"text",value:u,onChange:n=>l(n.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})]}),i!=null&&e.jsx(b,{editor:j,data:i,onChange:g}),e.jsx(a.Button,{onClick:h,disabled:!d,className:`mt-4 ${d?"bg-indigo-600":"bg-gray-400"} text-white`,children:d?"Save Changes":"No Changes"})]})]})})};export{E as default};