import{r as s,j as e,M as C,a9 as E,O as T,N as D,S as I,a as x}from"./index-f8c2a8c5.js";function U({title:l,titleId:i,...c},d){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:d,"aria-labelledby":i},c),l?s.createElement("title",{id:i},l):null,s.createElement("path",{fillRule:"evenodd",d:"M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z",clipRule:"evenodd"}))}const q=s.forwardRef(U),M=q;function R({title:l,titleId:i,...c},d){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:d,"aria-labelledby":i},c),l?s.createElement("title",{id:i},l):null,s.createElement("path",{fillRule:"evenodd",d:"M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z",clipRule:"evenodd"}))}const F=s.forwardRef(R),A=F,B=({onAddNutrition:l,users:i,loading:c,error:d,handleCancel:f})=>{const[g,j]=s.useState(""),[u,v]=s.useState(""),[p,b]=s.useState(""),[m,y]=s.useState(""),[n,N]=s.useState({selectedUser:"",selectedMealTime:"",description:"",quantity:""}),t=r=>{r.preventDefault();let h={};if(g||(h.selectedUser="User selection is required."),u||(h.selectedMealTime="Meal time selection is required."),p||(h.description="Description is required."),m||(h.quantity="Quantity is required."),N(h),Object.keys(h).length>0)return;const k={userId:g,mealTime:u,description:p,quantity:m};C.post("/admin/nutrition",k).then(o=>{o.data.status==="success"&&(l(o.data.data),a())}).catch(o=>{var w,S;console.log(o.response.data.message,"==========================e=r=rr=r==================="),E.error((S=(w=o==null?void 0:o.response)==null?void 0:w.data)==null?void 0:S.message),console.error("Error submitting nutrition:",o)})},a=()=>{j(""),v(""),b(""),y(""),N({})};return e.jsxs("div",{className:"w-full p-6 border rounded-lg shadow-lg bg-white",children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Add Nutrition Plan"}),e.jsxs("form",{onSubmit:t,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"userSelect",className:"block text-sm font-medium text-gray-700",children:"Select User"}),e.jsxs("select",{id:"userSelect",className:"mt-1 h-8 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:g,onChange:r=>j(r.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:c?"Loading users...":"Select a user"}),d?e.jsx("option",{disabled:!0,children:"Error loading users"}):i.map(r=>e.jsx("option",{value:r._id,children:r.name},r.id))]}),n.selectedUser&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:n.selectedUser})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"mealTimeSelect",className:"block text-sm font-medium text-gray-700",children:"Select Nutrition Time"}),e.jsxs("select",{id:"mealTimeSelect",className:"mt-1 block px-2 h-8 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:u,onChange:r=>v(r.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Select a meal time"}),e.jsx("option",{value:"Breakfast",children:"Breakfast"}),e.jsx("option",{value:"Lunch",children:"Lunch"}),e.jsx("option",{value:"Dinner",children:"Dinner"}),e.jsx("option",{value:"Night",children:"Night"})]}),n.selectedMealTime&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:n.selectedMealTime})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"descriptionInput",className:"block text-sm font-medium text-gray-700",children:"Description"}),e.jsx("textarea",{id:"descriptionInput",className:"mt-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:p,onChange:r=>b(r.target.value)}),n.description&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:n.description})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"quantityInput",className:"block text-sm font-medium text-gray-700",children:"Quantity"}),e.jsx("input",{id:"quantityInput",className:"mt-1 px-2 h-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500",value:m,type:"number",onChange:r=>y(r.target.value)}),n.quantity&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:n.quantity})]}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx("button",{type:"button",className:"px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600",onClick:f,children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600",children:"Submit"})]})]})]})},O=()=>{const[l,i]=s.useState([]),[c,d]=s.useState(!1),[f,g]=s.useState(null),{users:j,loading:u,error:v}=T(t=>t.users),[p,b]=s.useState(!1),m=D(),y=()=>d(!1),n=t=>{g(a=>a===t?null:t)};s.useEffect(()=>{m(I({})),b(!0),C.get("/admin/nutrition").then(t=>{t.data.status==="success"&&i(t.data.data)}).catch(t=>{console.error("Error fetching nutrition data:",t)}).finally(()=>{b(!1)})},[m]);const N=t=>{i(a=>[...a,t]),d(!1)};return e.jsx("div",{className:"mt-12 mb-8 flex flex-col items-center",children:e.jsxs(x.Card,{className:"w-full max-w-6xl shadow-lg mb-6",children:[e.jsxs(x.CardHeader,{variant:"gradient",className:"bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center",children:[e.jsx(x.Typography,{variant:"h5",color:"white",children:"Nutrition Plans"}),e.jsx(x.Button,{color:"lightBlue",onClick:()=>d(!0),children:"Add Nutrition"})]}),c?e.jsx(B,{onAddNutrition:N,users:j,loading:u,error:v,handleCancel:y}):e.jsx(x.CardBody,{className:"p-6 space-y-6",children:u||p?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"})}):l.map(t=>e.jsxs("div",{className:"border-b pb-4 mb-4",children:[e.jsxs("div",{className:"flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg",onClick:()=>n(t.userId),children:[e.jsx(x.Typography,{variant:"h6",className:"text-gray-700",children:t.userDetails.name}),f===t.userId?e.jsx(A,{className:"h-5 w-5 text-gray-500"}):e.jsx(M,{className:"h-5 w-5 text-gray-500"})]}),f===t.userId&&e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"grid grid-cols-6 gap-4 text-gray-700 font-semibold bg-gray-200 p-3 rounded-t-lg",children:[e.jsx("div",{children:"Meal Time"}),e.jsx("div",{children:"Description"}),e.jsx("div",{children:"Quantity"}),e.jsx("div",{children:"Taken"}),e.jsx("div",{children:"Skipped"}),e.jsx("div",{children:"Status"})]}),t.nutritionDetails.map((a,r)=>e.jsxs("div",{className:"grid grid-cols-6 gap-4 p-4 bg-white border-b last:border-none",children:[e.jsx("div",{children:a.mealTime}),e.jsx("div",{children:a.description}),e.jsx("div",{children:a.quantity}),e.jsx("div",{children:a.takenCount}),e.jsx("div",{children:a.skippedCount}),e.jsx("div",{className:a.status==="completed"?"text-green-500 font-semibold":"text-red-500 font-semibold",children:a.status})]},r))]})]},t.userId))})]})})};export{O as default};