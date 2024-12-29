import{K as U,z as $,u as B,r as l,j as s,a as i,A as M,M as O,N as F,G as _,O as z}from"./index-8c0f0a2e.js";import{S as E}from"./react-select.esm-c6c473a5.js";import"./assertThisInitialized-94e292b7.js";const R=()=>{var w;const k=U(),g=$(),{progress:r,error:y}=B(e=>e.videos),[u,j]=l.useState(""),[N,S]=l.useState(""),[t,T]=l.useState(null),[p,f]=l.useState(),[n,c]=l.useState(null),[x,m]=l.useState(null),[o,d]=l.useState({}),[C,b]=l.useState(!1);l.useEffect(()=>{(async()=>{const a=await M.get("/admin/categories");W(a.data.data)})()},[]);const[A,W]=l.useState([]),q=e=>{const a=e.target.files[0];a&&(((t==null?void 0:t.value)==="audio"?a.type.startsWith("audio/"):(t==null?void 0:t.value)==="video"?a.type.startsWith("video/"):!0)?(c(a),d(v=>({...v,file:null}))):(c(null),d(v=>({...v,file:`Invalid file type. Please select a ${(t==null?void 0:t.value)==="audio"?"audio":"video"} file.`}))))},D=e=>{const a=e.target.files[0];a&&a.type.startsWith("image/")?(m(a),d(h=>({...h,audioThumbnail:null}))):(m(null),d(h=>({...h,audioThumbnail:"Invalid image type for audio thumbnail."})))},V=()=>{const e={};return u||(e.title="Title is required."),t||(e.category="Category is required."),n||(e.file="File is required."),(t==null?void 0:t.value)==="audio"&&!x&&(e.audioThumbnail="Audio thumbnail image is required for audio files."),d(e),Object.keys(e).length===0},I=async e=>{if(e.preventDefault(),!!V()){b(!0);try{await g(O({title:u,file:n,category:t.value,subcategories:p,description:N,audioThumbnail:x})).then(a=>{a.meta.requestStatus==="fulfilled"&&(F.showSuccessToast("File uploaded successfully!"),k("/dashboard/videos"),g(_()),j(""),S(""),T(null),f(),c(null),m(null),b(!1),g(z()))})}catch(a){console.error(a),F.showErrorToast("Failed to upload video."),b(!1)}}},P=!u||!t||!n||(t==null?void 0:t.value)==="audio"&&!x||!p||C||r>0&&r<100;return s.jsx("div",{className:"mt-12 mb-8 flex justify-center",children:s.jsxs(i.Card,{className:"w-full max-w-4 shadow-lg",children:[s.jsx(i.CardHeader,{variant:"gradient",className:"bg-gradient-to-r from-red-800  to-indigo-600 p-6 rounded-t-lg",children:s.jsx(i.Typography,{variant:"h5",color:"white",className:"text-center",children:"Upload File"})}),s.jsxs(i.CardBody,{className:"p-6 space-y-6",children:[y&&s.jsx(i.Typography,{color:"red",className:"text-sm",children:y}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Category"}),s.jsx(E,{value:t,onChange:e=>{T(e),f(),c(null),m(null)},options:A.map(e=>({value:e._id,label:e.name,type:e.type,subcategories:e.subcategories})),placeholder:"Select a category",isClearable:!0,className:"focus:ring focus:ring-indigo-500"}),o.category&&s.jsx(i.Typography,{color:"red",className:"text-sm mt-1",children:o.category})]}),t&&s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Subcategories"}),s.jsx(E,{value:p,onChange:e=>f(e),options:(w=t.subcategories)==null?void 0:w.map(e=>({value:e._id,label:e.name})),placeholder:"Select subcategories",className:"focus:ring focus:ring-indigo-500"})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Title"}),s.jsx("input",{type:"text",value:u,onChange:e=>j(e.target.value),className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500",placeholder:"Enter title"}),o.title&&s.jsx(i.Typography,{color:"red",className:"text-sm mt-1",children:o.title})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Description"}),s.jsx("textarea",{value:N,onChange:e=>S(e.target.value),className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500",placeholder:"Enter description"})]}),s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"File"}),console.log(t,"====category=="),s.jsx("input",{type:"file",onChange:q,accept:(t==null?void 0:t.type)==="audio"?"audio/*":(t==null?void 0:t.type)==="image"?"image/*":"video/*",className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"}),o.file&&s.jsx(i.Typography,{color:"red",className:"text-sm mt-1",children:o.file})]}),(n==null?void 0:n.type.startsWith("audio"))&&s.jsxs("div",{children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Audio Thumbnail (Image)"}),s.jsx("input",{type:"file",onChange:D,accept:"image/jpeg",className:"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"}),o.audioThumbnail&&s.jsx(i.Typography,{color:"red",className:"text-sm mt-1",children:o.audioThumbnail})]}),r>0&&s.jsx("div",{children:s.jsx(i.Progress,{value:r,color:"indigo"})}),s.jsx(i.Button,{color:"indigo",fullWidth:!0,onClick:I,disabled:P,children:C?r>0?`Uploading... ${r}%`:"Please Wait...":"Upload File"})]})]})})};export{R as default};