import{r as s,j as e,a,A as T,_ as J}from"./index-67d5f1bd.js";import{T as K,a as Q,b as V,c as A,d as W}from"./TableRow-fa04da15.js";import{T as n,a as X}from"./TablePagination-2527792c.js";import"./Paper-8ce4321c.js";import"./assertThisInitialized-994926f1.js";const se=()=>{const[w,S]=s.useState(null),[p,r]=s.useState(""),[o,c]=s.useState([]),[i,d]=s.useState(""),[f,g]=s.useState(""),[U,N]=s.useState(!1),[P,h]=s.useState(null),[k,B]=s.useState(!1),[I,_]=s.useState([]),[y,L]=s.useState(0),[u,O]=s.useState(5),[x,C]=s.useState(null),[b,m]=s.useState(null),q=t=>{const l=t.target.files[0];S(l);const j=URL.createObjectURL(l);h(j)},R=t=>{c(l=>l.includes(t)?l.filter(j=>j!==t):[...l,t])},E=(t=null)=>{t?(C(t),r(t.googleMeetLink),c(t.roles[0].split(",")),d(t.meetingDate),g(t.meetingTime),h(t.image)):(C(null),r(""),c([]),d(""),g(""),h(null)),N(!0)},v=()=>{S(null),r(""),c([]),d(""),g(""),h(null),N(!1),C(null)},z=()=>{if(!p||o.length===0||!i||!f)return;B(!0);const t=new FormData;t.append("googleMeetLink",p),t.append("roles",o),t.append("meetingDate",i),t.append("meetingTime",f),w&&t.append("image",w);const l=x?`/admin/updateMeeting/${x._id}`:"/admin/createMeeting";T[x?"put":"post"](l,t).then(D=>{D.data.status==="success"&&(M(),v())}).catch(D=>{console.error("Error submitting meeting:",D)}).finally(()=>B(!1))},M=()=>{T.get("/admin/getMeeting").then(t=>{t.data.status==="success"&&_(t.data.meeting)}).catch(t=>{console.error("Error fetching meetings:",t)})};s.useEffect(()=>{M()},[]);const F=t=>{m(t)},H=()=>{b&&T.delete(`/admin/deleteMeeting/${b}`).then(t=>{t.data.status==="success"&&(M(),J.success("Meeting Deleted!"))}).catch(t=>{console.error("Error deleting meeting:",t)}).finally(()=>m(null))},$=(t,l)=>{L(l)},G=t=>{O(parseInt(t.target.value,10)),L(0)};return e.jsxs("div",{className:"mt-12 mb-8 flex justify-center",children:[e.jsxs(a.Card,{className:"w-full max-w-6xl shadow-lg",children:[e.jsxs(a.CardHeader,{variant:"gradient",className:"bg-gradient-to-r from-blue-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center",children:[e.jsx(a.Typography,{variant:"h5",color:"white",children:"Meeting"}),e.jsx(a.Button,{color:"lightBlue",onClick:()=>E(),children:"Add Meeting"})]}),e.jsxs(a.CardBody,{className:"p-6 space-y-6",children:[e.jsx(K,{children:e.jsxs(Q,{children:[e.jsx(V,{children:e.jsxs(A,{children:[e.jsx(n,{children:"Sr. No."}),e.jsx(n,{children:"Image"}),e.jsx(n,{children:"Meet Link"}),e.jsx(n,{children:"Date"}),e.jsx(n,{children:"Time"}),e.jsx(n,{children:"Roles"}),e.jsx(n,{children:"Actions"})]})}),e.jsx(W,{children:I.slice(y*u,y*u+u).map((t,l)=>e.jsxs(A,{children:[e.jsx(n,{children:l+1}),e.jsx(n,{children:e.jsx("img",{src:t.image,alt:"Meeting",className:"w-16 h-16 object-cover"})}),e.jsx(n,{children:t.googleMeetLink}),e.jsx(n,{children:new Date(t.createdAt).toLocaleDateString()}),e.jsx(n,{children:new Date(t.createdAt).toLocaleTimeString()}),e.jsx(n,{children:t.roles.join(", ")}),e.jsxs(n,{children:[e.jsx(a.Button,{size:"sm",color:"green",className:"mr-1",onClick:()=>E(t),children:"Edit"}),e.jsx(a.Button,{size:"sm",color:"red",onClick:()=>F(t._id),children:"Delete"})]})]},t._id))})]})}),e.jsx(X,{rowsPerPageOptions:[5,10,25],component:"div",count:I.length,rowsPerPage:u,page:y,onPageChange:$,onRowsPerPageChange:G})]})]}),e.jsxs(a.Dialog,{open:U,handler:v,size:"lg",children:[e.jsx(a.DialogBody,{children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(a.Typography,{variant:"h6",className:"text-center mb-4",children:x?"Edit Meeting":"Add Meeting"}),e.jsx(a.Input,{label:"Meet Link",value:p,onChange:t=>r(t.target.value),required:!0}),e.jsx(a.Input,{type:"file",onChange:q,label:"Upload Image"}),P&&e.jsxs("div",{className:"mt-4",children:[e.jsx(a.Typography,{variant:"h6",color:"gray",className:"mb-2",children:"Image Preview"}),e.jsx("img",{src:P,alt:"Preview",className:"w-32 h-32 object-cover rounded-md"})]}),e.jsxs("div",{children:[e.jsx(a.Typography,{variant:"h6",className:"text-gray-700",children:"Select Roles"}),e.jsx(a.Checkbox,{label:"User",checked:o.includes("user"),onChange:()=>R("user")}),e.jsx(a.Checkbox,{label:"Coach",checked:o.includes("coach"),onChange:()=>R("coach")})]}),e.jsxs("div",{children:[e.jsx(a.Typography,{variant:"h6",className:"text-gray-700",children:"Select Meeting Date and Time"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(a.Input,{type:"date",label:"Date",value:i==null?void 0:i.split("T")[0],onChange:t=>d(t.target.value),required:!0}),e.jsx(a.Input,{type:"time",label:"Time",value:f,onChange:t=>g(t.target.value),required:!0})]})]})]})}),e.jsxs(a.DialogFooter,{children:[e.jsx(a.Button,{color:"red",onClick:v,children:"Cancel"}),e.jsx(a.Button,{color:"blue",onClick:z,disabled:k,children:k?"Please wait...":"Submit"})]})]}),e.jsxs(a.Dialog,{open:!!b,handler:()=>m(null),children:[e.jsxs(a.DialogBody,{className:"flex flex-col items-center gap-6 p-6",children:[e.jsx(a.Typography,{variant:"h6",className:"text-center",children:"Confirm Deletion"}),e.jsx(a.Typography,{className:"text-center text-blue-gray-600",children:"Are you sure you want to delete this meeting?"})]}),e.jsxs(a.DialogFooter,{className:"flex justify-center gap-4",children:[e.jsx(a.Button,{variant:"outlined",color:"blue-gray",onClick:()=>m(null),children:"Cancel"}),e.jsx(a.Button,{variant:"gradient",color:"red",onClick:H,children:"Confirm"})]})]})]})};export{se as default};
