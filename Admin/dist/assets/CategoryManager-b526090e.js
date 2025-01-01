import{r as o,A as f,_ as r,j as e,a as s}from"./index-9ec13ec2.js";const D=()=>{const[v,B]=o.useState([]),[E,l]=o.useState(!1),[t,n]=o.useState(""),[i,g]=o.useState(""),[u,h]=o.useState(""),[m,x]=o.useState(""),[S,y]=o.useState(null),[p,j]=o.useState("");o.useEffect(()=>{b()},[]);const b=()=>{f.get("/admin/categories").then(a=>{a.data.status==="success"?B(a.data.data):r.error("Failed to fetch categories.")}).catch(()=>{r.error("Error fetching categories.")})},_=()=>{if(t==="add-category"&&(!i||!p)){r.error("Category name and type are required.");return}if(t==="add-subcategory"&&(!u||!m)){r.error("Subcategory name and parent category are required.");return}const a=t==="add-category"?"/admin/categories":t==="add-subcategory"?"/admin/subcategories":t==="edit-category"?`/admin/categories/${S}`:`/admin/subcategories/${S}`,c=t==="add-category"||t==="edit-category"?{name:i,type:p}:{name:u,categoryId:m},d=t.startsWith("add")?"post":"patch";f[d](a,c).then(N=>{N.data.status==="success"?(r.success(`${t.startsWith("add")?t==="add-category"?"Category":"Subcategory":t==="edit-category"?"Category":"Subcategory"} ${t.startsWith("add")?"added":"updated"} successfully.`),b(),C()):r.error("Failed to save changes.")}).catch(()=>{r.error("Error saving changes.")})},w=(a,c=!0)=>{const d=c?`/admin/categories/${a}`:`/admin/subcategories/${a}`;f.delete(d).then(N=>{N.data.status==="success"?(r.success(`${c?"Category":"Subcategory"} deleted successfully.`),b()):r.error("Failed to delete.")}).catch(()=>{r.error("Error deleting.")})},C=()=>{l(!1),g(""),h(""),x(""),j(""),n(""),y(null)};return e.jsxs("div",{className:"mt-12 mb-8 flex justify-center",children:[e.jsxs(s.Card,{className:"w-full max-w-6xl shadow-lg",children:[e.jsx(s.CardHeader,{className:"bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-t-lg flex justify-between items-center",children:e.jsx(s.Typography,{variant:"h5",color:"white",children:"Category Manager"})}),e.jsxs(s.CardBody,{children:[e.jsxs("div",{className:"flex space-x-4 mb-4",children:[e.jsx(s.Button,{color:"lightBlue",onClick:()=>{n("add-category"),l(!0)},children:"Add Category"}),e.jsx(s.Button,{color:"lightGreen",onClick:()=>{n("add-subcategory"),l(!0)},children:"Add Subcategory"})]}),e.jsxs("table",{className:"min-w-full table-auto",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-200",children:[e.jsx("th",{className:"px-6 py-2",children:"S.No"}),e.jsx("th",{className:"px-6 py-2",children:"Category"}),e.jsx("th",{className:"px-6 py-2",children:"Subcategories"}),e.jsx("th",{className:"px-6 py-2",children:"Actions"})]})}),e.jsx("tbody",{children:v.map((a,c)=>e.jsxs("tr",{className:"border-t",children:[e.jsx("td",{className:"px-6 py-2",children:c+1}),e.jsxs("td",{className:"px-6 py-2",children:[a.name," "]}),e.jsx("td",{className:"px-6 py-2",children:a.subcategories.length>0?e.jsx("ul",{children:a.subcategories.map(d=>e.jsxs("li",{className:"flex justify-between",children:[d.name,e.jsxs("div",{className:"flex space-x-1 mb-1",children:[e.jsx(s.Button,{size:"sm",color:"green",className:"p-1",onClick:()=>{n("edit-subcategory"),y(d._id),h(d.name),x(a._id),l(!0)},children:"Edit"}),e.jsx(s.Button,{size:"sm",className:"p-1",color:"red",onClick:()=>w(d._id,!1),children:"Delete"})]})]},d._id))}):"No subcategories"}),e.jsxs("td",{className:"px-6 py-2",children:[e.jsx(s.Button,{color:"green",className:"p-2 mr-1",onClick:()=>{n("edit-category"),y(a._id),g(a.name),j(a.type),l(!0)},children:"Edit"}),e.jsx(s.Button,{className:"p-2",color:"red",onClick:()=>w(a._id),children:"Delete"})]})]},a._id))})]})]})]}),e.jsxs(s.Dialog,{open:E,handler:C,children:[e.jsxs(s.DialogBody,{children:[e.jsx(s.Typography,{variant:"h6",className:"mb-4 text-center",children:t==="add-category"||t==="edit-category"?t==="add-category"?"Add New Category":"Edit Category":t==="add-subcategory"?"Add New Subcategory":"Edit Subcategory"}),t==="add-category"||t==="edit-category"?e.jsxs(e.Fragment,{children:[e.jsx(s.Input,{label:"Category Name",value:i,onChange:a=>g(a.target.value),className:"mb-4"}),e.jsxs("select",{className:"border rounded mt-4 p-2 w-full mb-4",value:p,onChange:a=>j(a.target.value),children:[e.jsx("option",{value:"",children:"Select Category Type"}),e.jsx("option",{value:"audio",children:"Audio"}),e.jsx("option",{value:"video",children:"Video"}),e.jsx("option",{value:"image",children:"Image"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(s.Input,{label:"Subcategory Name",value:u,onChange:a=>h(a.target.value),className:"mb-4"}),e.jsxs("select",{className:"border rounded mt-4 p-2 w-full mb-4",value:m,onChange:a=>x(a.target.value),children:[e.jsx("option",{value:"",children:"Select Parent Category"}),v.map(a=>e.jsx("option",{value:a._id,children:a.name},a._id))]})]})]}),e.jsxs(s.DialogFooter,{className:"gap-2",children:[e.jsx(s.Button,{className:"",color:"red",onClick:C,children:"Cancel"}),e.jsx(s.Button,{color:"green",onClick:_,children:t.startsWith("add")?"Add":"Update"})]})]})]})};export{D as default};