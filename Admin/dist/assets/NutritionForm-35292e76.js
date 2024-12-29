import{r as n,j as e,A as I,_ as g,u as q,z as U,D as F,a as u}from"./index-8b2c0f7c.js";import{P as M}from"./PencilIcon-baa37bf3.js";import{T as R}from"./TrashIcon-778ca2f1.js";function _({title:o,titleId:a,...x},c){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:c,"aria-labelledby":a},x),o?n.createElement("title",{id:a},o):null,n.createElement("path",{fillRule:"evenodd",d:"M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z",clipRule:"evenodd"}))}const A=n.forwardRef(_),B=A;function L({title:o,titleId:a,...x},c){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:c,"aria-labelledby":a},x),o?n.createElement("title",{id:a},o):null,n.createElement("path",{fillRule:"evenodd",d:"M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z",clipRule:"evenodd"}))}const P=n.forwardRef(L),$=P,Q=({onAddNutrition:o,users:a,loading:x,error:c,handleCancel:C,editData:t})=>{const[b,p]=n.useState((t==null?void 0:t.userId)||""),[m,f]=n.useState((t==null?void 0:t.mealTime)||""),[v,j]=n.useState((t==null?void 0:t.description)||""),[y,N]=n.useState((t==null?void 0:t.quantity)||""),[d,w]=n.useState({selectedUser:"",selectedMealTime:"",description:"",quantity:""});n.useEffect(()=>{t&&(console.log(t,"==d==d==d"),p(t.userId),f(t.mealTime),j(t.description),N(t.quantity))},[t]);const T=l=>{l.preventDefault();let h={};if(b||(h.selectedUser="User selection is required."),m||(h.selectedMealTime="Meal time selection is required."),v||(h.description="Description is required."),y||(h.quantity="Quantity is required."),w(h),Object.keys(h).length>0)return;const k={userId:b,mealTime:m,description:v,quantity:y};t!=null&&t._id?I.put(`/admin/nutrition/${t._id}`,k).then(s=>{s.data.status==="success"&&(o(s.data.data),S(),g.success("Nutrition plan updated successfully."))}).catch(s=>{var i,r;g.error(((r=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:r.message)||"Failed to update nutrition plan.")}):I.post("/admin/nutrition",k).then(s=>{s.data.status==="success"&&(o(s.data.data),S(),g.success("Nutrition plan added successfully."))}).catch(s=>{var i,r;g.error(((r=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:r.message)||"Failed to add nutrition plan.")})},S=()=>{p(""),f(""),j(""),N(""),w({}),C()};return e.jsxs("div",{className:"w-full p-6 border rounded-lg shadow-lg bg-white",children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:t?"Edit Nutrition Plan":"Add Nutrition Plan"}),e.jsxs("form",{onSubmit:T,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"userSelect",className:"block text-sm font-medium text-gray-700",children:"Select User"}),e.jsxs("select",{disabled:!!t,id:"userSelect",className:"mt-1 h-8 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:b,onChange:l=>p(l.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:x?"Loading users...":"Select a user"}),c?e.jsx("option",{disabled:!0,children:"Error loading users"}):a.filter(l=>l.role==="user").map(l=>e.jsx("option",{value:l._id,children:l.name?l.name:l.email},l.id))]}),d.selectedUser&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:d.selectedUser})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"mealTimeSelect",className:"block text-sm font-medium text-gray-700",children:"Select Nutrition Time"}),e.jsxs("select",{id:"mealTimeSelect",className:"mt-1 block px-2 h-8 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:m,onChange:l=>f(l.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a meal time"}),e.jsx("option",{value:"Breakfast",children:"Breakfast"}),e.jsx("option",{value:"Lunch",children:"Lunch"}),e.jsx("option",{value:"Dinner",children:"Dinner"}),e.jsx("option",{value:"Night",children:"Night"})]}),d.selectedMealTime&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:d.selectedMealTime})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"descriptionInput",className:"block text-sm font-medium text-gray-700",children:"Description"}),e.jsx("textarea",{id:"descriptionInput",className:"mt-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:v,onChange:l=>j(l.target.value)}),d.description&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:d.description})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"quantityInput",className:"block text-sm font-medium text-gray-700",children:"Quantity"}),e.jsx("input",{id:"quantityInput",className:"mt-1 px-2 h-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:y,type:"number",onChange:l=>N(l.target.value)}),d.quantity&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:d.quantity})]}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx("button",{type:"button",className:"px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600",onClick:S,children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600",children:t?"Update":"Submit"})]})]})]})},G=()=>{const[o,a]=n.useState([]),[x,c]=n.useState(!1),[C,t]=n.useState(null),[b,p]=n.useState(null),[m,f]=n.useState(null),{users:v,loading:j,error:y}=q(s=>s.users),[N,d]=n.useState(!1),w=U(),T=()=>{c(!1),p(null)},S=s=>{t(i=>i===s?null:s)},l=()=>{d(!0),I.get("/admin/nutrition").then(s=>{s.data.status==="success"&&a(s.data.data)}).catch(s=>{console.error("Error fetching nutrition data:",s)}).finally(()=>{d(!1)})};n.useEffect(()=>{w(F({})),d(!0),l()},[w]);const h=s=>{if(!s||typeof s!="object"||!s._id){g.error("Invalid nutrition data.");return}a(i=>b?i.map(r=>r._id===s._id?s:r):[...i,s]),c(!1),p(null),l()},k=()=>{m&&(I.delete(`/admin/nutrition/${m}`).then(s=>{s.data.status==="success"&&(a(i=>i.filter(r=>r._id!==m)),g.success("Nutrition plan deleted successfully."))}).catch(s=>{console.error("Error deleting nutrition plan:",s),g.error("Failed to delete nutrition plan.")}).finally(()=>f(null)),l())};return e.jsxs("div",{className:"mt-12 mb-8 flex flex-col items-center",children:[e.jsxs(u.Card,{className:"w-full max-w-6xl shadow-lg mb-6",children:[e.jsxs(u.CardHeader,{variant:"gradient",className:"bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center",children:[e.jsx(u.Typography,{variant:"h5",color:"white",children:"Nutrition Plans"}),e.jsx(u.Button,{color:"lightBlue",onClick:()=>c(!0),children:"Add Nutrition"})]}),x?e.jsx(Q,{onAddNutrition:h,users:v,loading:j,error:y,handleCancel:T,editData:b}):e.jsx(u.CardBody,{className:"p-6 space-y-6",children:j||N?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"})}):o.map(s=>{var i;return e.jsxs("div",{className:"border-b pb-4 mb-4",children:[e.jsxs("div",{className:"flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg",onClick:()=>S(s.userId),children:[e.jsx(u.Typography,{variant:"h6",className:"text-gray-700",children:(i=s==null?void 0:s.userDetails)==null?void 0:i.name}),C===s.userId?e.jsx($,{className:"h-5 w-5 text-gray-500"}):e.jsx(B,{className:"h-5 w-5 text-gray-500"})]}),C===s.userId&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"grid grid-cols-7 gap-4 text-gray-700 font-semibold bg-gray-200 p-3 rounded-t-lg",children:[e.jsx("div",{children:"Meal Time"}),e.jsx("div",{children:"Description"}),e.jsx("div",{children:"Quantity"}),e.jsx("div",{children:"Taken"}),e.jsx("div",{children:"Skipped"}),e.jsx("div",{children:"Status"}),e.jsx("div",{children:"Actions"})]}),s.nutritionDetails.map((r,E)=>e.jsxs("div",{className:"grid grid-cols-7 gap-4 p-4 bg-white border-b last:border-none",children:[e.jsx("div",{children:r.mealTime}),e.jsx("div",{children:r.description}),e.jsx("div",{children:r.quantity}),e.jsx("div",{children:r.takenCount}),e.jsx("div",{children:r.skippedCount}),e.jsx("div",{className:r.status==="completed"?"text-green-500 font-semibold":"text-red-500 font-semibold",children:r.status}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(M,{className:"h-5 w-5 text-blue-500 cursor-pointer",onClick:()=>{p({...r,userId:s.userId}),c(!0)}}),e.jsx(R,{className:"h-5 w-5 text-red-500 cursor-pointer",onClick:()=>f(r._id)})]})]},E))]})]},s.userId)})})]}),m&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg w-96",children:[e.jsx(u.Typography,{variant:"h6",className:"mb-4",children:"Are you sure you want to delete this nutrition plan?"}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx(u.Button,{color:"red",onClick:()=>f(null),children:"Cancel"}),e.jsx(u.Button,{color:"green",onClick:k,children:"Confirm"})]})]})})]})};export{G as default};