import{r,z as P,u as y,A,j as e,a as o,o as O,F as d,G as _,D as H}from"./index-9ec13ec2.js";import{T as F}from"./TrashIcon-cc579cfd.js";function M({title:n,titleId:c,...h},i){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:i,"aria-labelledby":c},h),n?r.createElement("title",{id:c},n):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"}))}const G=r.forwardRef(M),W=G,z=({category_name:n,onGoBack:c})=>{const h=P(),[i,v]=r.useState({}),[m,p]=r.useState("All"),[g,f]=r.useState([]),[b,u]=r.useState(!1),[w,C]=r.useState(null),[x,N]=r.useState([]),{users:k,loading:V,error:L}=y(t=>t.users),{role:T}=y(t=>t.auth);r.useEffect(()=>{A.get(`/admin/video-list-byCategory/${n}`).then(t=>{t.data.status==="success"&&(console.log(t.data.data,"==========response.data.data========"),v(t.data.data))}).catch(t=>{console.error("Error fetching video data:",t)})},[n]),r.useEffect(()=>{if(m==="All")f(Object.values(i).flat());else{const t=i[m]||[];f(t)}},[m,i]),[...new Set(Object.keys(i))];const S=t=>{console.log(t,"=====d=d==f==f=f=f=f=f=f=f=f=f=");const{filetype:s,path:l,thumbnail:a,audioThumbnail:j}=t;return s==="video"?e.jsxs("div",{className:"w-full h-48 relative",children:[e.jsx("img",{src:a||"http://43.204.2.84:7200/uploads/images/1735548006312-film-596009_640.jpg",alt:"video thumbnail",className:"w-full h-48 object-cover rounded-t-lg"}),e.jsx("video",{className:"absolute top-0 left-0 w-full h-full object-cover rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-200",src:l,controls:!0,children:"Your browser does not support the video tag."})]}):s==="audio"?e.jsxs("div",{className:"w-full h-48 relative",children:[e.jsx("img",{src:j||"http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg",alt:"audio thumbnail",className:"w-full h-48 object-cover rounded-t-lg"}),e.jsxs("audio",{className:"absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200",controls:!0,children:[e.jsx("source",{src:l,type:`audio/${fileExtension}`}),"Your browser does not support the audio element."]})]}):s==="image"?e.jsx("img",{className:"w-full h-48 object-cover rounded-t-lg",src:l,alt:"media preview"}):null},D=t=>{O.delete(`http://43.204.2.84:7200/admin/video-list/${t}`).then(()=>{d.success("Video deleted successfully!"),h(_()),v(s=>{const l={...s};return Object.keys(l).forEach(a=>{l[a]=l[a].filter(j=>j._id!==t)}),l})}).catch(s=>console.log(s,"d=f=ff=ff=fff"))},E=()=>{const t=x.map(s=>O.post("http://43.204.2.84:7200/api/recommendation",{videoId:w,userId:s}));Promise.all(t).then(()=>{d.success("Video recommended successfully!"),u(!1),N([])}).catch(()=>d.error("Error recommending video."))},R=t=>{N(s=>s.includes(t)?s.filter(l=>l!==t):[...s,t])},U=()=>k.filter(t=>t.role==="user").map(t=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o.Checkbox,{checked:x.includes(t._id),onChange:()=>R(t._id)}),e.jsx(o.Typography,{variant:"small",color:"blue-gray",children:t.name})]},t._id)),B=t=>["Workout Video","Recipe Video","Knowledge Video","Story/Podcast/Recognition"].includes(t);return e.jsxs("div",{className:"mt-12 mb-8 flex flex-col gap-12",children:[e.jsxs(o.Card,{children:[e.jsxs(o.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6 relative flex items-center justify-center",children:[e.jsx(W,{onClick:c,className:"absolute left-4 h-6 w-6 text-white cursor-pointer"}),e.jsx(o.Typography,{variant:"h6",color:"white",className:"text-center",children:n.replace(/-/g," ").toUpperCase()})]}),e.jsx(o.CardBody,{className:"p-4",children:g.length>0?e.jsx("div",{className:"grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4",children:g.map(t=>e.jsxs(o.Card,{className:"shadow-lg rounded-lg relative",children:[console.log(t,"=====media===="),e.jsx(o.CardHeader,{floated:!1,className:"mx-0 mt-0 mb-4 h-48",children:S(t)}),e.jsxs(o.CardBody,{className:"pb-16",children:[" ",e.jsx(o.Typography,{variant:"h6",className:"text-sm mb-1",children:t.title}),e.jsx(o.Typography,{variant:"small",color:"gray",className:"mb-2",children:t.description||"No description available."})]}),e.jsxs("div",{className:"absolute bottom-10 left-0 right-0 flex justify-between items-center px-4",children:[B(n)&&e.jsx("button",{onClick:()=>{C(t==null?void 0:t.id),u(!0)},className:"bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150",type:"button",children:"Assign to User"}),T==="admin"&&e.jsx(o.IconButton,{style:{height:"25px",width:"25px"},color:"red",onClick:()=>D(t.id),children:e.jsx(F,{className:"h-4 w-4"})})]})]},t._id))}):e.jsx(o.Typography,{variant:"small",color:"gray",className:"text-center mt-4",children:"No data found for this subcategory."})})]}),e.jsxs(o.Dialog,{open:b,handler:()=>u(!1),children:[e.jsxs(o.DialogBody,{className:"max-h-96 overflow-y-auto",children:[e.jsx(o.Typography,{variant:"h6",className:"mb-4",children:"Recommend Video to Users"}),U()]}),e.jsxs(o.DialogFooter,{children:[e.jsx(o.Button,{variant:"text",color:"red",onClick:()=>u(!1),children:"Cancel"}),e.jsx(o.Button,{color:"blue",onClick:E,children:"Recommend"})]})]})]})};function Q(){const n=P(),[c,h]=r.useState(null),[i,v]=r.useState(null),[m,p]=r.useState(!1),[g,f]=r.useState([]),[b,u]=r.useState(""),{videos:w,loading:C,error:x}=y(s=>s.videos),{users:N,loading:k,error:V}=y(s=>s.users),{role:L}=y(s=>s.auth);if(r.useEffect(()=>{n(_()),n(H({}))},[n]),C||k)return e.jsx("div",{children:"Loading..."});if(x||V)return e.jsxs("div",{children:["Error: ",x||V]});const T=s=>{A.delete(`/admin/video-list/${s}`).then(()=>{d.success("Video deleted successfully!"),n(_())}).catch(()=>d.error("Error deleting video."))},S=()=>{const s=g.map(l=>A.post("/api/recommendation",{videoId:i,userId:l}));Promise.all(s).then(()=>{d.success("Video recommended successfully!"),p(!1),f([])}).catch(()=>d.error("Error recommending video."))},D=s=>{f(l=>l.includes(s)?l.filter(a=>a!==s):[...l,s])},E=()=>N.filter(s=>s.role==="user"&&s.name.toLowerCase().includes(b.toLowerCase())).map(s=>e.jsxs("div",{className:"flex items-center gap-4 py-2",children:[e.jsx(o.Checkbox,{checked:g.includes(s._id),onChange:()=>D(s._id)}),e.jsx(o.Typography,{variant:"small",color:"blue-gray",children:s.name?s.name:s.email})]},s._id)),R=s=>{const{filetype:l,path:a,thumbnail:j,audioThumbnail:$}=s;switch(l){case"video":return e.jsxs("div",{className:"w-full h-48 relative",children:[e.jsx("img",{src:j||"http://43.204.2.84:7200/uploads/images/1735548006312-film-596009_640.jpg",alt:"video thumbnail",className:"w-full h-48 object-cover rounded-t-lg"}),e.jsx("video",{src:a,controls:!0,className:"absolute top-0 left-0 w-full h-full object-cover rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-200"})]});case"audio":return e.jsxs("div",{className:"w-full h-48 relative",children:[e.jsx("img",{src:$||"http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg",alt:"audio thumbnail",className:"w-full h-48 object-cover rounded-t-lg"}),e.jsx("audio",{controls:!0,className:"absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200",children:e.jsx("source",{src:a})})]});case"image":return e.jsx("img",{src:a,alt:"media",className:"w-full h-48 object-cover rounded-t-lg"});case"pdf":return e.jsx("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:"block w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg",children:e.jsx(o.Typography,{variant:"small",color:"blue",children:"View PDF"})});default:return e.jsx("div",{className:"w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg",children:e.jsx(o.Typography,{variant:"small",color:"red",children:"Unsupported file type"})})}},U=s=>h(s),B=s=>["Workout Video","Recipe Video","Knowledge Video","Story/Podcast/Recognition"].includes(s),t=()=>h(null);return e.jsxs("div",{className:"mt-12 mb-8 flex flex-col gap-12",children:[c?e.jsx(z,{category_name:c,onGoBack:t}):e.jsxs(o.Card,{children:[e.jsx(o.CardHeader,{variant:"gradient",color:"gray",className:"mb-8 p-6",children:e.jsx(o.Typography,{variant:"h6",color:"white",children:"Videos And Other Files"})}),e.jsx(o.CardBody,{className:"p-4",children:Object.keys(w).map(s=>{const l=w[s];return e.jsxs("div",{className:"px-4 mt-8 pb-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(o.Typography,{variant:"h6",color:"blue-gray",children:s.replace(/-/g," ").toUpperCase()}),e.jsx(o.Button,{size:"sm",variant:"text",color:"blue",onClick:()=>U(s),children:"View All"})]}),e.jsx("div",{className:"grid grid-cols-1 gap-8 mt-6 md:grid-cols-2 xl:grid-cols-4",children:l.map(a=>e.jsxs(o.Card,{className:"shadow-lg rounded-lg relative",children:[console.log(a,"=====media===="),e.jsx(o.CardHeader,{floated:!1,className:"mx-0 mt-0 mb-4 h-48",children:R(a)}),e.jsxs(o.CardBody,{className:"pb-16",children:[" ",e.jsx(o.Typography,{variant:"h6",className:"text-sm mb-1",children:a.title}),e.jsx(o.Typography,{variant:"small",color:"gray",className:"mb-2",children:a.description||"No description available."})]}),e.jsxs("div",{className:"absolute bottom-5 left-0 right-0 flex justify-between items-center px-4",children:[B(s)&&e.jsx("button",{onClick:()=>{v(a==null?void 0:a.id),p(!0)},className:"bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150",type:"button",children:"Assign to User"}),L==="admin"&&e.jsx(o.IconButton,{style:{height:"25px",width:"25px"},color:"red",onClick:()=>T(a.id),children:e.jsx(F,{className:"h-4 w-4"})})]})]},a._id))})]},s)})})]}),e.jsxs(o.Dialog,{open:m,handler:()=>p(!1),children:[e.jsxs(o.DialogBody,{className:"max-h-96 overflow-y-auto",children:[e.jsx(o.Typography,{variant:"h6",className:"mb-4",children:"Recommend Video to Users"}),e.jsx(o.Input,{label:"Search Users",value:b,onChange:s=>u(s.target.value),className:"mb-4 w-full"}),E()]}),e.jsxs(o.DialogFooter,{children:[e.jsx(o.Button,{variant:"text",color:"red",onClick:()=>p(!1),children:"Cancel"}),e.jsx(o.Button,{variant:"gradient",color:"green",onClick:S,children:"Recommend"})]})]})]})}export{Q as Videos,Q as default};