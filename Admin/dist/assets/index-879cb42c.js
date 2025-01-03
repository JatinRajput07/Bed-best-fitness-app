import{r as t,j as e,b as a,A as m,_ as N}from"./index-6ec83a99.js";import{T as v}from"./TrashIcon-4a98b64e.js";import{T as H}from"./TablePagination-d9469597.js";import"./Paper-56e69d41.js";import"./assertThisInitialized-d9f01d27.js";const _=()=>{const[l,w]=t.useState([]),[p,i]=t.useState(null),[x,c]=t.useState(null),[C,f]=t.useState(!1),[y,j]=t.useState(!1),[d,o]=t.useState(null),[g,b]=t.useState(0),[n,P]=t.useState(5),h=()=>{m.get("/admin/highlights").then(s=>{s.data.status==="success"&&w(s.data.data.highlights)}).catch(s=>{console.error("Error fetching images:",s)})};t.useEffect(()=>{h()},[]);const I=s=>{const r=s.target.files[0];i(r);const E=URL.createObjectURL(r);c(E)},D=()=>{i(null),c(null),f(!0)},u=()=>{i(null),c(null),f(!1)},S=()=>{if(!p)return;j(!0);const s=new FormData;s.append("image",p),m.post("/admin/highlights",s).then(r=>{r.data.status==="success"&&(h(),u(),N.success("Image uploaded successfully!"))}).catch(r=>{console.error("Error uploading image:",r)}).finally(()=>j(!1))},T=()=>{d&&m.delete(`/admin/highlights/${d}`).then(s=>{s.data.status==="success"&&(h(),N.success("Image deleted successfully!"))}).catch(s=>{console.error("Error deleting image:",s)}).finally(()=>o(null))},B=(s,r)=>{b(r)},k=s=>{P(parseInt(s.target.value,10)),b(0)};return e.jsxs("div",{className:"mt-12 mb-8 flex justify-center",children:[e.jsxs(a.Card,{className:"w-full max-w-6xl shadow-lg",children:[e.jsxs(a.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6 flex justify-between items-center",children:[e.jsx(a.Typography,{variant:"h5",color:"white",children:"Highlights Gallery"}),e.jsx(a.Button,{color:"lightGreen",onClick:D,children:"Add Image"})]}),e.jsxs(a.CardBody,{className:"p-6 space-y-6",children:[(l==null?void 0:l.length)>0?e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",children:l==null?void 0:l.slice(g*n,g*n+n).map(s=>e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:s==null?void 0:s.url,alt:"Highlight",className:"w-full h-32 object-cover rounded-lg shadow-md"}),e.jsx("div",{className:"absolute bg-deep-orange-500 p-1 right-2 rounded text-white top-2",children:e.jsx(v,{onClick:()=>o(s._id),className:"h-5 w-5 text-white cursor-pointer"})})]},s._id))}):e.jsx(a.Typography,{variant:"h6",color:"blue-gray",className:"text-center font-semibold",children:"No data found"}),(l==null?void 0:l.length)>0&&e.jsx(H,{rowsPerPageOptions:[5,10,25],component:"div",count:l==null?void 0:l.length,rowsPerPage:n,page:g,onPageChange:B,onRowsPerPageChange:k})]})]}),e.jsxs(a.Dialog,{open:C,handler:u,size:"lg",className:"rounded-lg shadow-lg",children:[e.jsxs(a.DialogBody,{className:"p-6",children:[e.jsx(a.Typography,{variant:"h4",color:"blue-gray",className:"text-center mb-6 font-semibold",children:"Upload a New Highlight Image"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"border-2 border-dashed border-blue-gray-300 rounded-lg p-6 hover:border-blue-gray-500 focus-within:ring focus-within:ring-blue-400 transition",children:[e.jsxs("label",{htmlFor:"file-upload",className:"block text-center text-blue-gray-700 cursor-pointer hover:text-blue-600 transition",children:[e.jsx(a.Typography,{variant:"h6",className:"mb-2 font-semibold",children:"Click to Select Image File"}),e.jsx(a.Typography,{variant:"small",color:"gray",children:"Supported formats: .jpg, .png"})]}),e.jsx("input",{id:"file-upload",type:"file",className:"sr-only",accept:"image/*",onChange:I,required:!0})]}),x&&e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx(a.Typography,{variant:"h6",className:"mb-2 font-semibold text-blue-gray-700",children:"Image Preview"}),e.jsx("img",{src:x,alt:"Preview",className:"w-56 h-56 object-cover rounded-xl shadow-lg border border-blue-gray-200"})]})]})]}),e.jsxs(a.DialogFooter,{className:"p-6 flex justify-between",children:[e.jsx(a.Button,{variant:"outlined",color:"red",onClick:u,className:"rounded-lg px-6 py-2 border-red-500 text-red-500 hover:bg-red-100",children:"Cancel"}),e.jsx(a.Button,{variant:"gradient",color:"green",onClick:S,disabled:y,className:"rounded-lg px-6 py-2",children:y?"Uploading...":"Submit"})]})]}),e.jsxs(a.Dialog,{open:!!d,handler:()=>o(null),children:[e.jsx(a.DialogHeader,{className:"bg-gray-100 text-center py-4",children:e.jsx(a.Typography,{variant:"h5",color:"blue-gray",className:"font-semibold",children:"Confirm Deletion"})}),e.jsxs(a.DialogBody,{className:"flex flex-col items-center gap-6 p-6",children:[e.jsx("div",{className:"p-4 rounded-full bg-red-100 flex justify-center items-center",children:e.jsx(v,{className:"h-10 w-10 text-red-500"})}),e.jsx(a.Typography,{className:"text-center text-base font-medium text-blue-gray-600",children:"Are you sure you want to delete this image?"})]}),e.jsxs(a.DialogFooter,{className:"bg-gray-50 flex justify-center gap-4 py-4",children:[e.jsx(a.Button,{variant:"outlined",color:"blue-gray",className:"w-24",onClick:()=>o(null),children:"Cancel"}),e.jsx(a.Button,{variant:"gradient",color:"red",className:"w-24",onClick:T,children:"Confirm"})]})]})]})};export{_ as default};