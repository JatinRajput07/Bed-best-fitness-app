import{r as l,z as O,u as R,A as U,j as e,a as r,o as L,F as d,G as B,D as _}from"./index-8b2c0f7c.js";import{T as P}from"./TrashIcon-72dcb317.js";function $({title:n,titleId:i,...h},c){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:c,"aria-labelledby":i},h),n?l.createElement("title",{id:i},n):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"}))}const H=l.forwardRef($),M=H,G=({category_name:n,onGoBack:i})=>{const h=O(),[c,j]=l.useState({}),[m,g]=l.useState("All"),[x,p]=l.useState([]),[y,u]=l.useState(!1),[v,w]=l.useState(null),[f,b]=l.useState([]),{users:N,loading:C,error:A}=R(o=>o.users);l.useEffect(()=>{U.get(`/admin/video-list-byCategory/${n}`).then(o=>{o.data.status==="success"&&j(o.data.data)}).catch(o=>{console.error("Error fetching video data:",o)})},[n]),l.useEffect(()=>{if(m==="All")p(Object.values(c).flat());else{const o=c[m]||[];p(o)}},[m,c]),[...new Set(Object.keys(c))];const k=o=>{const s=o.split(".").pop().toLowerCase();return s==="mp4"?e.jsx("video",{className:"w-full h-48 object-cover rounded-t-lg",src:o,type:"video/mp4",controls:!0,children:"Your browser does not support the video tag."}):s==="mp3"||s==="wav"?e.jsxs("audio",{className:"w-full h-48 object-cover rounded-t-lg",controls:!0,children:[e.jsx("source",{src:o,type:`audio/${s}`}),"Your browser does not support the audio element."]}):s==="jpg"||s==="jpeg"||s==="png"||s==="gif"?e.jsx("img",{className:"w-full h-48 object-cover rounded-t-lg",src:o,alt:"media preview"}):null},V=o=>{L.delete(`http://43.204.2.84:7200/admin/video-list/${o}`).then(()=>{d.success("Video deleted successfully!"),h(B()),j(s=>{const a={...s};return Object.keys(a).forEach(t=>{a[t]=a[t].filter(F=>F._id!==o)}),a})}).catch(s=>console.log(s,"d=f=ff=ff=fff"))},S=()=>{const o=f.map(s=>L.post("http://43.204.2.84:7200/api/recommendation",{videoId:v,userId:s}));Promise.all(o).then(()=>{d.success("Video recommended successfully!"),u(!1),b([])}).catch(()=>d.error("Error recommending video."))},T=o=>{b(s=>s.includes(o)?s.filter(a=>a!==o):[...s,o])},D=()=>N.filter(o=>o.role==="user").map(o=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(r.Checkbox,{checked:f.includes(o._id),onChange:()=>T(o._id)}),e.jsx(r.Typography,{variant:"small",color:"blue-gray",children:o.name})]},o._id)),E=o=>["Workout Video","Recipe Video","Knowledge Video","Story/Podcast/Recognition"].includes(o);return e.jsxs("div",{className:"mt-12 mb-8 flex flex-col gap-12",children:[e.jsxs(r.Card,{children:[e.jsxs(r.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6 relative flex items-center justify-center",children:[e.jsx(M,{onClick:i,className:"absolute left-4 h-6 w-6 text-white cursor-pointer"}),e.jsx(r.Typography,{variant:"h6",color:"white",className:"text-center",children:n.replace(/-/g," ").toUpperCase()})]}),e.jsx(r.CardBody,{className:"p-4",children:x.length>0?e.jsx("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4",children:x.map(o=>e.jsxs(r.Card,{className:"shadow-lg rounded-lg",children:[e.jsx(r.CardHeader,{floated:!1,color:"gray",className:"mx-0 mt-0 mb-4 h-48 xl:h-40",children:k(o.path)}),e.jsxs(r.CardBody,{className:"p-4 bg-white",children:[e.jsx(r.Typography,{variant:"h6",className:"text-sm mb-2 font-semibold",children:o.title}),o.subcategories&&e.jsx(r.Typography,{variant:"small",className:"text-gray-600",children:o.subcategories.join(", ")}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[E(n)&&e.jsx("button",{onClick:()=>{w(o==null?void 0:o.id),u(!0)},className:"bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",children:"Assign to User"}),e.jsx(r.IconButton,{style:{height:"25px",width:"25px"},color:"red",onClick:()=>V(o.id),children:e.jsx(P,{className:"h-4 w-4"})})]})]})]},o._id||o.title))}):e.jsx(r.Typography,{variant:"small",color:"gray",className:"text-center mt-4",children:"No data found for this subcategory."})})]}),e.jsxs(r.Dialog,{open:y,handler:()=>u(!1),children:[e.jsxs(r.DialogBody,{className:"max-h-96 overflow-y-auto",children:[e.jsx(r.Typography,{variant:"h6",className:"mb-4",children:"Recommend Video to Users"}),D()]}),e.jsxs(r.DialogFooter,{children:[e.jsx(r.Button,{variant:"text",color:"red",onClick:()=>u(!1),children:"Cancel"}),e.jsx(r.Button,{color:"blue",onClick:S,children:"Recommend"})]})]})]})};function I(){const n=O(),[i,h]=l.useState(null),[c,j]=l.useState(null),[m,g]=l.useState(!1),[x,p]=l.useState([]),[y,u]=l.useState(""),{videos:v,loading:w,error:f}=R(s=>s.videos),{users:b,loading:N,error:C}=R(s=>s.users);if(l.useEffect(()=>{n(B()),n(_({}))},[n]),w||N)return e.jsx("div",{children:"Loading..."});if(f||C)return e.jsxs("div",{children:["Error: ",f||C]});const A=s=>{U.delete(`/admin/video-list/${s}`).then(()=>{d.success("Video deleted successfully!"),n(B())}).catch(()=>d.error("Error deleting video."))},k=()=>{const s=x.map(a=>U.post("/api/recommendation",{videoId:c,userId:a}));Promise.all(s).then(()=>{d.success("Video recommended successfully!"),g(!1),p([])}).catch(()=>d.error("Error recommending video."))},V=s=>{p(a=>a.includes(s)?a.filter(t=>t!==s):[...a,s])},S=()=>b.filter(s=>s.role==="user"&&s.name.toLowerCase().includes(y.toLowerCase())).map(s=>e.jsxs("div",{className:"flex items-center gap-4 py-2",children:[e.jsx(r.Checkbox,{checked:x.includes(s._id),onChange:()=>V(s._id)}),e.jsx(r.Typography,{variant:"small",color:"blue-gray",children:s.name?s.name:s.email})]},s._id)),T=s=>{const{filetype:a,path:t}=s;switch(a){case"video":return e.jsx("video",{src:t,controls:!0,className:"w-full h-48 object-cover rounded-t-lg"});case"audio":return e.jsx("audio",{controls:!0,className:"w-full h-48 object-cover rounded-t-lg",children:e.jsx("source",{src:t})});case"image":return e.jsx("img",{src:t,alt:"media",className:"w-full h-48 object-cover rounded-t-lg"});case"pdf":return e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"block w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg",children:e.jsx(r.Typography,{variant:"small",color:"blue",children:"View PDF"})});default:return e.jsx("div",{className:"w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg",children:e.jsx(r.Typography,{variant:"small",color:"red",children:"Unsupported file type"})})}},D=s=>h(s),E=s=>["Workout Video","Recipe Video","Knowledge Video","Story/Podcast/Recognition"].includes(s),o=()=>h(null);return e.jsxs("div",{className:"mt-12 mb-8 flex flex-col gap-12",children:[i?e.jsx(G,{category_name:i,onGoBack:o}):e.jsxs(r.Card,{children:[e.jsx(r.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6",children:e.jsx(r.Typography,{variant:"h6",color:"white",children:"Videos And Other Files"})}),e.jsx(r.CardBody,{className:"p-4",children:Object.keys(v).map(s=>{const a=v[s];return e.jsxs("div",{className:"px-4 mt-8 pb-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(r.Typography,{variant:"h6",color:"blue-gray",children:s.replace(/-/g," ").toUpperCase()}),e.jsx(r.Button,{size:"sm",variant:"text",color:"blue",onClick:()=>D(s),children:"View All"})]}),e.jsx("div",{className:"grid grid-cols-1 gap-8 mt-6 md:grid-cols-2 xl:grid-cols-4",children:a.map(t=>e.jsxs(r.Card,{className:"shadow-lg rounded-lg",children:[console.log(t,"=====media===="),e.jsx(r.CardHeader,{floated:!1,className:"mx-0 mt-0 mb-4 h-48",children:T(t)}),e.jsxs(r.CardBody,{children:[e.jsx(r.Typography,{variant:"h6",className:"text-sm mb-1",children:t.title}),e.jsx(r.Typography,{variant:"small",color:"gray",className:"mb-2",children:t.description||"No description available."}),e.jsxs("div",{className:"flex justify-between items-center",children:[E(s)&&e.jsx("button",{onClick:()=>{j(t==null?void 0:t.id),g(!0)},className:"bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",type:"button",children:"Assign to User"}),e.jsx(r.IconButton,{style:{height:"25px",width:"25px"},color:"red",onClick:()=>A(t.id),children:e.jsx(P,{className:"h-4 w-4"})})]})]})]},t._id))})]},s)})})]}),e.jsxs(r.Dialog,{open:m,handler:()=>g(!1),children:[e.jsxs(r.DialogBody,{className:"max-h-96 overflow-y-auto",children:[e.jsx(r.Typography,{variant:"h6",className:"mb-4",children:"Recommend Video to Users"}),e.jsx(r.Input,{label:"Search Users",value:y,onChange:s=>u(s.target.value),className:"mb-4 w-full"}),S()]}),e.jsxs(r.DialogFooter,{children:[e.jsx(r.Button,{variant:"text",color:"red",onClick:()=>g(!1),children:"Cancel"}),e.jsx(r.Button,{variant:"gradient",color:"green",onClick:k,children:"Recommend"})]})]})]})}export{I as Videos,I as default};
