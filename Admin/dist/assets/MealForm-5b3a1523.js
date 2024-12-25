import{r,z as B,y as _,D as T,x as i,j as e,a as s,_ as d}from"./index-e789ef0d.js";import{P as U}from"./PencilIcon-8522e597.js";import{T as M}from"./TrashIcon-85a57467.js";const $=()=>{const[S,j]=r.useState(!1),[m,x]=r.useState(""),[h,u]=r.useState(""),[p,g]=r.useState(null),[f,k]=r.useState([]),[y,b]=r.useState(null),[I,D]=r.useState({}),{users:E,loading:N,error:z}=B(t=>t.users),v=_();r.useEffect(()=>{v(T({}))},[v]),r.useEffect(()=>{n()},[]);const n=()=>{i.get("/admin/meal").then(t=>{t.data.status==="success"&&k(t.data.data)}).catch(t=>{console.error("Error fetching meal data:",t)})},C=()=>j(!0),c=()=>{x(""),u(""),g(null),j(!1),b(null)},O=async()=>{if(!m||!h||!p)return;const t={category:m,item:h,userId:p};y?i.put(`/admin/meal/${y.itemId}`,t).then(a=>{a.data.status==="success"&&(n(),c())}).catch(a=>{console.error("Error updating meal:",a),d.error("Error updating meal.")}):i.post("/admin/meal",t).then(a=>{a.data.status==="success"&&(n(),c())}).catch(a=>{console.error("Error submitting meal:",a),d.error("Error adding meal.")})},w=t=>{i.delete(`/admin/meal/${t}`).then(a=>{a.data.status==="success"&&(n(),d.success("Meal deleted successfully."))}).catch(a=>{console.error("Error deleting meal:",a),d.error("Error deleting meal.")})},A=t=>{D(a=>({...a,[t]:!a[t]}))};return e.jsxs("div",{className:"mt-12 mb-8 flex justify-center",children:[e.jsxs(s.Card,{className:"w-full max-w-6xl shadow-lg",children:[e.jsxs(s.CardHeader,{variant:"gradient",className:"bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center",children:[e.jsx(s.Typography,{variant:"h5",color:"white",children:"Meal"}),e.jsx(s.Button,{color:"lightBlue",onClick:C,children:"Add Meal"})]}),e.jsx(s.CardBody,{className:"p-6 space-y-6",children:N?e.jsx("div",{className:"flex justify-center items-center h-64",children:e.jsx("div",{className:"loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"})}):f.length>0&&f.map((t,a)=>e.jsxs(s.Accordion,{open:I[t.userId],children:[e.jsx(s.AccordionHeader,{onClick:()=>A(t.userId),children:e.jsxs(s.Typography,{variant:"h6",color:"gray-700",children:[a+1,". ",t.name]})}),e.jsx(s.AccordionBody,{children:e.jsxs("table",{className:"min-w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-200",children:[e.jsx("th",{className:"px-6 py-2 text-left text-sm font-medium text-gray-700",children:"Category"}),e.jsx("th",{className:"px-6 py-2 text-left text-sm font-medium text-gray-700",children:"Item"}),e.jsx("th",{className:"px-6 py-2 text-left text-sm font-medium text-gray-700",children:"Actions"})]})}),e.jsx("tbody",{children:Object.keys(t.meals).map(o=>t.meals[o].length>0&&t.meals[o].map(l=>e.jsxs("tr",{className:"border-t",children:[e.jsx("td",{className:"px-6 py-2 text-sm text-gray-600",children:o}),e.jsx("td",{className:"px-6 py-2 text-sm text-gray-600",children:l.itemName}),e.jsxs("td",{className:"px-6 py-2 text-sm text-gray-600 flex space-x-2",children:[e.jsx(U,{className:"h-5 w-5 text-blue-500 cursor-pointer",onClick:()=>{x(o),u(l.itemName),g(t.userId),b(l),C()}}),e.jsx(M,{className:"h-5 w-5 text-red-500 cursor-pointer",onClick:()=>w(l.itemId)})]})]},l.itemId)))})]})})]},t.userId))})]}),e.jsxs(s.Dialog,{open:S,handler:c,size:"lg",children:[e.jsx(s.DialogBody,{children:e.jsxs("div",{className:"space-y-6 p-6 bg-gray-50 rounded-lg",children:[e.jsx(s.Typography,{className:"text-lg font-semibold text-gray-800",children:"Add or Edit Meal"}),e.jsx(s.Select,{label:"Select User",onChange:g,value:p,children:E.filter(t=>t.role==="user").map(t=>e.jsx(s.Option,{value:t._id,children:t.name},t._id))}),e.jsxs(s.Select,{label:"Select Category",onChange:x,value:m,children:[e.jsx(s.Option,{value:"breakfast",children:"Breakfast"}),e.jsx(s.Option,{value:"dinner",children:"Dinner"}),e.jsx(s.Option,{value:"evening_snacks",children:"Evening Snacks"}),e.jsx(s.Option,{value:"lunch",children:"Lunch"}),e.jsx(s.Option,{value:"morning_snacks",children:"Morning Snacks"}),e.jsx(s.Option,{value:"wake_up_food",children:"Wake Up Food"})]}),e.jsx(s.Input,{label:"Meal Item",value:h,onChange:t=>u(t.target.value),required:!0,className:"text-lg"})]})}),e.jsxs(s.DialogFooter,{children:[e.jsx(s.Button,{color:"red",onClick:c,children:"Cancel"}),e.jsx(s.Button,{color:"green",onClick:O,children:N?e.jsx(s.CircularProgress,{size:24}):"Submit"})]})]})]})};export{$ as default};