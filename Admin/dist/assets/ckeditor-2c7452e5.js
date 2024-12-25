import{R as In,P as pe,r as Dn,aj as $2,ak as Qc}from"./index-e789ef0d.js";/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function Y2(){const W={resolve:null,promise:null};return W.promise=new Promise(L=>{W.resolve=L}),W}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function Q2(W){let L=null;return(...Y)=>(L||(L={current:W(...Y)}),L.current)}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const qt=new Array(256).fill("").map((W,L)=>("0"+L.toString(16)).slice(-2));function Z2(){const[W,L,Y,Z]=crypto.getRandomValues(new Uint32Array(4));return"e"+qt[W>>0&255]+qt[W>>8&255]+qt[W>>16&255]+qt[W>>24&255]+qt[L>>0&255]+qt[L>>8&255]+qt[L>>16&255]+qt[L>>24&255]+qt[Y>>0&255]+qt[Y>>8&255]+qt[Y>>16&255]+qt[Y>>24&255]+qt[Z>>0&255]+qt[Z>>8&255]+qt[Z>>16&255]+qt[Z>>24&255]}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function J2(W,L){const Y=W.extraPlugins||[];return{...W,extraPlugins:[...Y,...L.filter(Z=>!Y.includes(Z))]}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function Cb(W){return!!W&&/^\d+\.\d+\.\d+/.test(W)}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function vb(W){return W?["nightly","alpha","internal"].some(L=>W.includes(L)):!1}function X2(W){return Cb(W)||vb(W)}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function tE(W){if(!Cb(W))throw new Error(`Invalid semantic version: ${W||"<blank>"}.`);const[L,Y,Z]=W.split(".");return{major:Number.parseInt(L,10),minor:Number.parseInt(Y,10),patch:Number.parseInt(Z,10)}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function eE(W){if(vb(W))return 3;const{major:L}=tE(W);switch(!0){case L>=44:return 3;case L>=38:return 2;default:return 1}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function nE(){const{CKEDITOR_VERSION:W,CKEDITOR:L}=window;return X2(W)?{source:L?"cdn":"npm",version:W}:null}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function iE(){const W=nE();return W?eE(W.version):null}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function yb(W,L){switch(L||(L=iE()||void 0),L){case 1:case 2:return W===void 0;case 3:return W==="GPL";default:return!1}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function oE(W,L){return function(Z){yb(Z.config.get("licenseKey"))||Z.on("collectUsageData",(T,{setUsageData:xt})=>{xt(`integration.${W}`,L)})}}var rE=Object.defineProperty,sE=(W,L,Y)=>L in W?rE(W,L,{enumerable:!0,configurable:!0,writable:!0,value:Y}):W[L]=Y,Kt=(W,L,Y)=>sE(W,typeof L!="symbol"?L+"":L,Y);/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const xb=class Eb{constructor(L,Y){Kt(this,"_lifecycle"),Kt(this,"_element"),Kt(this,"_releaseLock",null),Kt(this,"_value",null),Kt(this,"_afterMountCallbacks",[]),Kt(this,"_state",{destroyedBeforeInitialization:!1,mountingInProgress:null}),Kt(this,"release",Q2(()=>{const{_releaseLock:Z,_state:T,_element:xt,_lifecycle:y}=this;T.mountingInProgress?T.mountingInProgress.then(()=>y.unmount({element:xt,mountResult:this.value})).catch(A=>{console.error("Semaphore unmounting error:",A)}).then(Z.resolve).then(()=>{this._value=null}):(T.destroyedBeforeInitialization=!0,Z.resolve())})),this._element=L,this._lifecycle=Y,this._lock()}get value(){return this._value}unsafeSetValue(L){this._value=L,this._afterMountCallbacks.forEach(Y=>Y(L)),this._afterMountCallbacks=[]}runAfterMount(L){const{_value:Y,_afterMountCallbacks:Z}=this;Y?L(Y):Z.push(L)}_lock(){const{_semaphores:L}=Eb,{_state:Y,_element:Z,_lifecycle:T}=this,xt=L.get(Z)||Promise.resolve(null),y=Y2();this._releaseLock=y;const A=xt.then(()=>Y.destroyedBeforeInitialization?Promise.resolve(void 0):(Y.mountingInProgress=T.mount().then(g=>(g&&this.unsafeSetValue(g),g)),Y.mountingInProgress)).then(async g=>{g&&T.afterMount&&await T.afterMount({element:Z,mountResult:g})}).then(()=>y.promise).catch(g=>{console.error("Semaphore mounting error:",g)}).then(()=>{L.get(Z)===A&&L.delete(Z)});L.set(Z,A)}};Kt(xb,"_semaphores",new Map);let aE=xb;/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const cE="$__CKEditorReactContextMetadata";function lE(W,L){return{...L,[cE]:W}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const dE=In.createContext(null),uE=W=>!!W&&typeof W=="object"&&"status"in W&&["initializing","initialized","error"].includes(W.status),Db=W=>L=>uE(L)&&L.status===W,_b=Db("initializing"),hE=W=>Db("initialized")(W)&&W.watchdog.state==="ready";/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const mE=oE("react",{version:"9.4.0",frameworkVersion:In.version});/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function gE(W){return yb(W.licenseKey)?W:J2(W,[mE])}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */const hu="Lock from React integration (@ckeditor/ckeditor5-react)";class Ib extends In.Component{constructor(L){super(L),Kt(this,"domContainer",In.createRef()),Kt(this,"editorSemaphore",null),this._checkVersion()}_checkVersion(){const{CKEDITOR_VERSION:L}=window;if(!L)return console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');const[Y]=L.split(".").map(Number);Y>=42||L.startsWith("0.0.0")||console.warn("The <CKEditor> component requires using CKEditor 5 in version 42+ or nightly build.")}get _semaphoreValue(){const{editorSemaphore:L}=this;return L?L.value:null}get watchdog(){const{_semaphoreValue:L}=this;return L?L.watchdog:null}get editor(){const{_semaphoreValue:L}=this;return L?L.instance:null}shouldComponentUpdate(L){const{props:Y,editorSemaphore:Z}=this;return L.id!==Y.id||L.disableWatchdog!==Y.disableWatchdog?!0:(Z&&(Z.runAfterMount(({instance:T})=>{this._shouldUpdateEditorData(Y,L,T)&&T.data.set(L.data)}),"disabled"in L&&Z.runAfterMount(({instance:T})=>{L.disabled?T.enableReadOnlyMode(hu):T.disableReadOnlyMode(hu)})),!1)}componentDidMount(){_b(this.context)||this._initLifeCycleSemaphore()}componentDidUpdate(){_b(this.context)||this._initLifeCycleSemaphore()}componentWillUnmount(){this._unlockLifeCycleSemaphore()}_unlockLifeCycleSemaphore(){this.editorSemaphore&&(this.editorSemaphore.release(),this.editorSemaphore=null)}_initLifeCycleSemaphore(){this._unlockLifeCycleSemaphore(),this.editorSemaphore=new aE(this.domContainer.current,{mount:async()=>this._initializeEditor(),afterMount:({mountResult:L})=>{const{onReady:Y}=this.props;Y&&this.domContainer.current!==null&&Y(L.instance)},unmount:async({element:L,mountResult:Y})=>{const{onAfterDestroy:Z}=this.props;try{await this._destroyEditor(Y),L.innerHTML=""}finally{Z&&Z(Y.instance)}}})}render(){return In.createElement("div",{ref:this.domContainer})}async _initializeEditor(){if(this.props.disableWatchdog)return{instance:await this._createEditor(this.domContainer.current,this._getConfig()),watchdog:null};const L=(()=>hE(this.context)?new pE(this.context.watchdog):new this.props.editor.EditorWatchdog(this.props.editor,this.props.watchdogConfig))(),Y={current:0};return L.setCreator(async(Z,T)=>{var xt;const{editorSemaphore:y}=this,{onAfterDestroy:A}=this.props;Y.current>0&&A&&((xt=y==null?void 0:y.value)!=null&&xt.instance)&&A(y.value.instance);const g=await this._createEditor(Z,T);return y&&Y.current>0&&(y.unsafeSetValue({instance:g,watchdog:L}),setTimeout(()=>{this.props.onReady&&this.props.onReady(L.editor)})),Y.current++,g}),L.on("error",(Z,{error:T,causesRestart:xt})=>{(this.props.onError||console.error)(T,{phase:"runtime",willEditorRestart:xt})}),await L.create(this.domContainer.current,this._getConfig()).catch(Z=>{(this.props.onError||console.error)(Z,{phase:"initialization",willEditorRestart:!1})}),{watchdog:L,instance:L.editor}}_createEditor(L,Y){const{contextItemMetadata:Z}=this.props;return Z&&(Y=lE(Z,Y)),this.props.editor.create(L,gE(Y)).then(T=>{if("disabled"in this.props){/* istanbul ignore else -- @preserve */this.props.disabled&&T.enableReadOnlyMode(hu)}const xt=T.model.document,y=T.editing.view.document;return xt.on("change:data",A=>{/* istanbul ignore else -- @preserve */this.props.onChange&&this.props.onChange(A,T)}),y.on("focus",A=>{/* istanbul ignore else -- @preserve */this.props.onFocus&&this.props.onFocus(A,T)}),y.on("blur",A=>{/* istanbul ignore else -- @preserve */this.props.onBlur&&this.props.onBlur(A,T)}),T})}async _destroyEditor(L){const{watchdog:Y,instance:Z}=L;return new Promise((T,xt)=>{/* istanbul ignore next -- @preserve */setTimeout(async()=>{try{if(Y)return await Y.destroy(),T();if(Z)return await Z.destroy(),T();T()}catch(y){console.error(y),xt(y)}})})}_shouldUpdateEditorData(L,Y,Z){return!(L.data===Y.data||Z.data.get()===Y.data)}_getConfig(){const L=this.props.config||{};return this.props.data&&L.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `content` property. The config value takes precedence over `content` property and will be used when both are specified."),{...L,initialData:L.initialData||this.props.data||""}}}Kt(Ib,"contextType",dE);Kt(Ib,"propTypes",{editor:pe.func.isRequired,data:pe.string,config:pe.object,disableWatchdog:pe.bool,watchdogConfig:pe.object,onChange:pe.func,onReady:pe.func,onFocus:pe.func,onBlur:pe.func,onError:pe.func,disabled:pe.bool,id:pe.any});class pE{constructor(L){Kt(this,"_contextWatchdog"),Kt(this,"_id"),Kt(this,"_creator"),this._contextWatchdog=L,this._id=Z2()}setCreator(L){this._creator=L}create(L,Y){return this._contextWatchdog.add({sourceElementOrData:L,config:Y,creator:this._creator,id:this._id,type:"editor"})}on(L,Y){this._contextWatchdog.on("itemError",(Z,{itemId:T,error:xt})=>{T===this._id&&Y(null,{error:xt,causesRestart:void 0})})}destroy(){return this._contextWatchdog.state==="ready"?this._contextWatchdog.remove(this._id):Promise.resolve()}get editor(){return this._contextWatchdog.getItem(this._id)}}/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */function Sb(...W){return L=>{W.forEach(Y=>{typeof Y=="function"?Y(L):Y!=null&&(Y.current=L)})}}const kE=Dn.memo(Dn.forwardRef(({id:W,semaphore:L,rootName:Y},Z)=>{const T=Dn.useRef(null);return Dn.useEffect(()=>{let xt,y;return L.runAfterMount(({instance:A})=>{if(!T.current)return;y=A;const{ui:g,model:x}=y,v=x.document.getRoot(Y);v&&y.ui.getEditableElement(Y)&&y.detachEditable(v),xt=g.view.createEditable(Y,T.current),g.addEditable(xt),A.editing.view.forceRender()}),()=>{if(y&&y.state!=="destroyed"&&T.current){const A=y.model.document.getRoot(Y);/* istanbul ignore else -- @preserve */A&&y.detachEditable(A)}}},[L.revision]),In.createElement("div",{key:L.revision,id:W,ref:Sb(Z,T)})}));kE.displayName="EditorEditable";const fE=Dn.forwardRef(({editor:W},L)=>{const Y=Dn.useRef(null);return Dn.useEffect(()=>{const Z=Y.current;if(!W||!Z)return;const T=W.ui.view.toolbar.element;return Z.appendChild(T),()=>{Z.contains(T)&&Z.removeChild(T)}},[W&&W.id]),In.createElement("div",{ref:Sb(Y,L)})});fE.displayName="EditorToolbarWrapper";var Zc={exports:{}};Zc.exports;(function(W,L){(function(Y){const Z=Y.en=Y.en||{};Z.dictionary=Object.assign(Z.dictionary||{},{"(may require <kbd>Fn</kbd>)":"(may require <kbd>Fn</kbd>)","%0 of %1":"%0 of %1",Accept:"Accept",Accessibility:"Accessibility","Accessibility help":"Accessibility help","Align cell text to the bottom":"Align cell text to the bottom","Align cell text to the center":"Align cell text to the center","Align cell text to the left":"Align cell text to the left","Align cell text to the middle":"Align cell text to the middle","Align cell text to the right":"Align cell text to the right","Align cell text to the top":"Align cell text to the top","Align table to the left":"Align table to the left","Align table to the right":"Align table to the right",Alignment:"Alignment",Aquamarine:"Aquamarine",Background:"Background","Below, you can find a list of keyboard shortcuts that can be used in the editor.":"Below, you can find a list of keyboard shortcuts that can be used in the editor.",Black:"Black","Block quote":"Block quote",Blue:"Blue",Bold:"Bold","Bold text":"Bold text",Border:"Border","Break text":"Break text","Bulleted List":"Bulleted List","Bulleted list styles toolbar":"Bulleted list styles toolbar",Cancel:"Cancel","Cannot access default workspace.":"Cannot access default workspace.","Cannot determine a category for the uploaded file.":"Cannot determine a category for the uploaded file.","Cannot upload file:":"Cannot upload file:","Caption for image: %0":"Caption for image: %0","Caption for the image":"Caption for the image","Cell properties":"Cell properties","Center table":"Center table","Centered image":"Centered image","Change image text alternative":"Change image text alternative","Choose heading":"Choose heading",Circle:"Circle",Clear:"Clear","Click to edit block":"Click to edit block",Close:"Close","Close contextual balloons, dropdowns, and dialogs":"Close contextual balloons, dropdowns, and dialogs",Code:"Code",Color:"Color","Color picker":"Color picker",Column:"Column","Content editing keystrokes":"Content editing keystrokes","Copy selected content":"Copy selected content","Could not insert image at the current position.":"Could not insert image at the current position.","Could not obtain resized image URL.":"Could not obtain resized image URL.","Create link":"Create link",Custom:"Custom","Custom image size":"Custom image size",Dashed:"Dashed",Decimal:"Decimal","Decimal with leading zero":"Decimal with leading zero","Decrease indent":"Decrease indent","Decrease list item indent":"Decrease list item indent","Delete column":"Delete column","Delete row":"Delete row","Dim grey":"Dim grey",Dimensions:"Dimensions",Disc:"Disc",Dotted:"Dotted",Double:"Double",Downloadable:"Downloadable","Drag to move":"Drag to move","Dropdown menu":"Dropdown menu","Dropdown toolbar":"Dropdown toolbar","Edit block":"Edit block","Edit image":"Edit image","Edit link":"Edit link","Editor block content toolbar":"Editor block content toolbar","Editor contextual toolbar":"Editor contextual toolbar","Editor dialog":"Editor dialog","Editor menu bar":"Editor menu bar","Editor toolbar":"Editor toolbar","Enter image caption":"Enter image caption","Enter table caption":"Enter table caption","Entering a to-do list":"Entering a to-do list","Error during image upload":"Error during image upload","Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.":"Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.","Failed to determine category of edited image.":"Failed to determine category of edited image.",File:"File","From computer":"From computer","Full size image":"Full size image",Green:"Green",Grey:"Grey",Groove:"Groove","Header column":"Header column","Header row":"Header row",Heading:"Heading","Heading 1":"Heading 1","Heading 2":"Heading 2","Heading 3":"Heading 3","Heading 4":"Heading 4","Heading 5":"Heading 5","Heading 6":"Heading 6",Height:"Height","Help Contents. To close this dialog press ESC.":"Help Contents. To close this dialog press ESC.",HEX:"HEX","Horizontal text alignment toolbar":"Horizontal text alignment toolbar",Image:"Image","Image from computer":"Image from computer","Image resize list":"Image resize list","Image toolbar":"Image toolbar","Image upload complete":"Image upload complete","Image via URL":"Image via URL","image widget":"image widget","In line":"In line","Increase indent":"Increase indent","Increase list item indent":"Increase list item indent","Insert a hard break (a new paragraph)":"Insert a hard break (a new paragraph)","Insert a new paragraph directly after a widget":"Insert a new paragraph directly after a widget","Insert a new paragraph directly before a widget":"Insert a new paragraph directly before a widget","Insert a new table row (when in the last cell of a table)":"Insert a new table row (when in the last cell of a table)","Insert a soft break (a <code>&lt;br&gt;</code> element)":"Insert a soft break (a <code>&lt;br&gt;</code> element)","Insert column left":"Insert column left","Insert column right":"Insert column right","Insert image":"Insert image","Insert image or file":"Insert image or file","Insert image via URL":"Insert image via URL","Insert image with file manager":"Insert image with file manager","Insert media":"Insert media","Insert paragraph after block":"Insert paragraph after block","Insert paragraph before block":"Insert paragraph before block","Insert row above":"Insert row above","Insert row below":"Insert row below","Insert table":"Insert table","Insert via URL":"Insert via URL","Insert with file manager":"Insert with file manager","Inserting image failed":"Inserting image failed",Inset:"Inset","Invalid start index value.":"Invalid start index value.",Italic:"Italic","Italic text":"Italic text","Justify cell text":"Justify cell text","Keystrokes that can be used in a list":"Keystrokes that can be used in a list","Keystrokes that can be used in a table cell":"Keystrokes that can be used in a table cell","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Keystrokes that can be used when a widget is selected (for example: image, table, etc.)","Leaving a to-do list":"Leaving a to-do list","Left aligned image":"Left aligned image","Light blue":"Light blue","Light green":"Light green","Light grey":"Light grey",Link:"Link","Link image":"Link image","Link URL":"Link URL","Link URL must not be empty.":"Link URL must not be empty.","List properties":"List properties","Lower-latin":"Lower-latin","Lower–roman":"Lower–roman",Media:"Media","Media toolbar":"Media toolbar","Media URL":"Media URL","media widget":"media widget",MENU_BAR_MENU_EDIT:"Edit",MENU_BAR_MENU_FILE:"File",MENU_BAR_MENU_FONT:"Font",MENU_BAR_MENU_FORMAT:"Format",MENU_BAR_MENU_HELP:"Help",MENU_BAR_MENU_INSERT:"Insert",MENU_BAR_MENU_TEXT:"Text",MENU_BAR_MENU_TOOLS:"Tools",MENU_BAR_MENU_VIEW:"View","Merge cell down":"Merge cell down","Merge cell left":"Merge cell left","Merge cell right":"Merge cell right","Merge cell up":"Merge cell up","Merge cells":"Merge cells","Move focus between form fields (inputs, buttons, etc.)":"Move focus between form fields (inputs, buttons, etc.)","Move focus from an editable area back to the parent widget":"Move focus from an editable area back to the parent widget","Move focus in and out of an active dialog window":"Move focus in and out of an active dialog window","Move focus to the menu bar, navigate between menu bars":"Move focus to the menu bar, navigate between menu bars","Move focus to the toolbar, navigate between toolbars":"Move focus to the toolbar, navigate between toolbars","Move out of a link":"Move out of a link","Move out of an inline code style":"Move out of an inline code style","Move the caret to allow typing directly after a widget":"Move the caret to allow typing directly after a widget","Move the caret to allow typing directly before a widget":"Move the caret to allow typing directly before a widget","Move the selection to the next cell":"Move the selection to the next cell","Move the selection to the previous cell":"Move the selection to the previous cell","Navigate through the table":"Navigate through the table","Navigate through the toolbar or menu bar":"Navigate through the toolbar or menu bar",Next:"Next","No results found":"No results found","No searchable items":"No searchable items",None:"None","Numbered List":"Numbered List","Numbered list styles toolbar":"Numbered list styles toolbar","Open file manager":"Open file manager","Open in a new tab":"Open in a new tab","Open link in new tab":"Open link in new tab","Open media in new tab":"Open media in new tab","Open the accessibility help dialog":"Open the accessibility help dialog",Orange:"Orange",Original:"Original",Outset:"Outset",Padding:"Padding",Paragraph:"Paragraph","Paste content":"Paste content","Paste content as plain text":"Paste content as plain text","Paste the media URL in the input.":"Paste the media URL in the input.",'Please enter a valid color (e.g. "ff0000").':'Please enter a valid color (e.g. "ff0000").',"Press %0 for help.":"Press %0 for help.","Press Enter to type after or press Shift + Enter to type before the widget":"Press Enter to type after or press Shift + Enter to type before the widget",Previous:"Previous","Processing the edited image.":"Processing the edited image.",Purple:"Purple",Red:"Red",Redo:"Redo","Remove color":"Remove color","Replace from computer":"Replace from computer","Replace image":"Replace image","Replace image from computer":"Replace image from computer","Replace image with file manager":"Replace image with file manager","Replace with file manager":"Replace with file manager","Resize image":"Resize image","Resize image (in %0)":"Resize image (in %0)","Resize image to %0":"Resize image to %0","Resize image to the original size":"Resize image to the original size","Restore default":"Restore default","Reversed order":"Reversed order","Revert autoformatting action":"Revert autoformatting action","Rich Text Editor":"Rich Text Editor","Rich Text Editor. Editing area: %0":"Rich Text Editor. Editing area: %0",Ridge:"Ridge","Right aligned image":"Right aligned image",Row:"Row",Save:"Save","Select all":"Select all","Select column":"Select column","Select row":"Select row","Selecting resized image failed":"Selecting resized image failed","Server failed to process the image.":"Server failed to process the image.","Show more items":"Show more items","Side image":"Side image",Solid:"Solid","Split cell horizontally":"Split cell horizontally","Split cell vertically":"Split cell vertically",Square:"Square","Start at":"Start at","Start index must be greater than 0.":"Start index must be greater than 0.",Strikethrough:"Strikethrough","Strikethrough text":"Strikethrough text",Style:"Style",Subscript:"Subscript",Superscript:"Superscript",Table:"Table","Table alignment toolbar":"Table alignment toolbar","Table cell text alignment":"Table cell text alignment","Table properties":"Table properties","Table toolbar":"Table toolbar","Text alternative":"Text alternative",'The color is invalid. Try "#FF0000" or "rgb(255,0,0)" or "red".':'The color is invalid. Try "#FF0000" or "rgb(255,0,0)" or "red".',"The URL must not be empty.":"The URL must not be empty.",'The value is invalid. Try "10px" or "2em" or simply "2".':'The value is invalid. Try "10px" or "2em" or simply "2".',"The value must not be empty.":"The value must not be empty.","The value should be a plain number.":"The value should be a plain number.","These keyboard shortcuts allow for quick access to content editing features.":"These keyboard shortcuts allow for quick access to content editing features.","This link has no URL":"This link has no URL","This media URL is not supported.":"This media URL is not supported.","Tip: Paste the URL into the content to embed faster.":"Tip: Paste the URL into the content to embed faster.","To-do List":"To-do List","Toggle caption off":"Toggle caption off","Toggle caption on":"Toggle caption on","Toggle the circle list style":"Toggle the circle list style","Toggle the decimal list style":"Toggle the decimal list style","Toggle the decimal with leading zero list style":"Toggle the decimal with leading zero list style","Toggle the disc list style":"Toggle the disc list style","Toggle the lower–latin list style":"Toggle the lower–latin list style","Toggle the lower–roman list style":"Toggle the lower–roman list style","Toggle the square list style":"Toggle the square list style","Toggle the upper–latin list style":"Toggle the upper–latin list style","Toggle the upper–roman list style":"Toggle the upper–roman list style",Turquoise:"Turquoise","Type or paste your content here.":"Type or paste your content here.","Type your title":"Type your title",Underline:"Underline","Underline text":"Underline text",Undo:"Undo",Unlink:"Unlink","Update image URL":"Update image URL","Upload failed":"Upload failed","Upload from computer":"Upload from computer","Upload image from computer":"Upload image from computer","Upload in progress":"Upload in progress","Uploading image":"Uploading image","Upper-latin":"Upper-latin","Upper-roman":"Upper-roman","Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.":"Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.","User interface and content navigation keystrokes":"User interface and content navigation keystrokes","Vertical text alignment toolbar":"Vertical text alignment toolbar","Via URL":"Via URL",White:"White","Widget toolbar":"Widget toolbar",Width:"Width","With file manager":"With file manager","Wrap text":"Wrap text",Yellow:"Yellow","You have no image editing permissions.":"You have no image editing permissions.","You have no image upload permissions.":"You have no image upload permissions."}),Z.getPluralForm=function(T){return T!=1}})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={})),function(Y,Z){W.exports=Z()}(self,()=>(()=>{var Y={9246:(y,A,g)=>{const x=g(6931),v={};for(const k of Object.keys(x))v[x[k]]=k;const _={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};y.exports=_;for(const k of Object.keys(_)){if(!("channels"in _[k]))throw new Error("missing channels property: "+k);if(!("labels"in _[k]))throw new Error("missing channel labels property: "+k);if(_[k].labels.length!==_[k].channels)throw new Error("channel and label counts mismatch: "+k);const{channels:w,labels:D}=_[k];delete _[k].channels,delete _[k].labels,Object.defineProperty(_[k],"channels",{value:w}),Object.defineProperty(_[k],"labels",{value:D})}_.rgb.hsl=function(k){const w=k[0]/255,D=k[1]/255,S=k[2]/255,B=Math.min(w,D,S),O=Math.max(w,D,S),z=O-B;let $,X;O===B?$=0:w===O?$=(D-S)/z:D===O?$=2+(S-w)/z:S===O&&($=4+(w-D)/z),$=Math.min(60*$,360),$<0&&($+=360);const rt=(B+O)/2;return X=O===B?0:rt<=.5?z/(O+B):z/(2-O-B),[$,100*X,100*rt]},_.rgb.hsv=function(k){let w,D,S,B,O;const z=k[0]/255,$=k[1]/255,X=k[2]/255,rt=Math.max(z,$,X),At=rt-Math.min(z,$,X),Vt=function(Zt){return(rt-Zt)/6/At+.5};return At===0?(B=0,O=0):(O=At/rt,w=Vt(z),D=Vt($),S=Vt(X),z===rt?B=S-D:$===rt?B=.3333333333333333+w-S:X===rt&&(B=.6666666666666666+D-w),B<0?B+=1:B>1&&(B-=1)),[360*B,100*O,100*rt]},_.rgb.hwb=function(k){const w=k[0],D=k[1];let S=k[2];const B=_.rgb.hsl(k)[0],O=1/255*Math.min(w,Math.min(D,S));return S=1-.00392156862745098*Math.max(w,Math.max(D,S)),[B,100*O,100*S]},_.rgb.cmyk=function(k){const w=k[0]/255,D=k[1]/255,S=k[2]/255,B=Math.min(1-w,1-D,1-S);return[100*((1-w-B)/(1-B)||0),100*((1-D-B)/(1-B)||0),100*((1-S-B)/(1-B)||0),100*B]},_.rgb.keyword=function(k){const w=v[k];if(w)return w;let D,S=1/0;for(const z of Object.keys(x)){const $=x[z],X=(O=$,((B=k)[0]-O[0])**2+(B[1]-O[1])**2+(B[2]-O[2])**2);X<S&&(S=X,D=z)}var B,O;return D},_.keyword.rgb=function(k){return x[k]},_.rgb.xyz=function(k){let w=k[0]/255,D=k[1]/255,S=k[2]/255;return w=w>.04045?((w+.055)/1.055)**2.4:w/12.92,D=D>.04045?((D+.055)/1.055)**2.4:D/12.92,S=S>.04045?((S+.055)/1.055)**2.4:S/12.92,[100*(.4124*w+.3576*D+.1805*S),100*(.2126*w+.7152*D+.0722*S),100*(.0193*w+.1192*D+.9505*S)]},_.rgb.lab=function(k){const w=_.rgb.xyz(k);let D=w[0],S=w[1],B=w[2];return D/=95.047,S/=100,B/=108.883,D=D>.008856?D**.3333333333333333:7.787*D+.13793103448275862,S=S>.008856?S**.3333333333333333:7.787*S+.13793103448275862,B=B>.008856?B**.3333333333333333:7.787*B+.13793103448275862,[116*S-16,500*(D-S),200*(S-B)]},_.hsl.rgb=function(k){const w=k[0]/360,D=k[1]/100,S=k[2]/100;let B,O,z;if(D===0)return z=255*S,[z,z,z];B=S<.5?S*(1+D):S+D-S*D;const $=2*S-B,X=[0,0,0];for(let rt=0;rt<3;rt++)O=w+.3333333333333333*-(rt-1),O<0&&O++,O>1&&O--,z=6*O<1?$+6*(B-$)*O:2*O<1?B:3*O<2?$+(B-$)*(.6666666666666666-O)*6:$,X[rt]=255*z;return X},_.hsl.hsv=function(k){const w=k[0];let D=k[1]/100,S=k[2]/100,B=D;const O=Math.max(S,.01);return S*=2,D*=S<=1?S:2-S,B*=O<=1?O:2-O,[w,100*(S===0?2*B/(O+B):2*D/(S+D)),100*((S+D)/2)]},_.hsv.rgb=function(k){const w=k[0]/60,D=k[1]/100;let S=k[2]/100;const B=Math.floor(w)%6,O=w-Math.floor(w),z=255*S*(1-D),$=255*S*(1-D*O),X=255*S*(1-D*(1-O));switch(S*=255,B){case 0:return[S,X,z];case 1:return[$,S,z];case 2:return[z,S,X];case 3:return[z,$,S];case 4:return[X,z,S];case 5:return[S,z,$]}},_.hsv.hsl=function(k){const w=k[0],D=k[1]/100,S=k[2]/100,B=Math.max(S,.01);let O,z;z=(2-D)*S;const $=(2-D)*B;return O=D*B,O/=$<=1?$:2-$,O=O||0,z/=2,[w,100*O,100*z]},_.hwb.rgb=function(k){const w=k[0]/360;let D=k[1]/100,S=k[2]/100;const B=D+S;let O;B>1&&(D/=B,S/=B);const z=Math.floor(6*w),$=1-S;O=6*w-z,1&z&&(O=1-O);const X=D+O*($-D);let rt,At,Vt;switch(z){default:case 6:case 0:rt=$,At=X,Vt=D;break;case 1:rt=X,At=$,Vt=D;break;case 2:rt=D,At=$,Vt=X;break;case 3:rt=D,At=X,Vt=$;break;case 4:rt=X,At=D,Vt=$;break;case 5:rt=$,At=D,Vt=X}return[255*rt,255*At,255*Vt]},_.cmyk.rgb=function(k){const w=k[0]/100,D=k[1]/100,S=k[2]/100,B=k[3]/100;return[255*(1-Math.min(1,w*(1-B)+B)),255*(1-Math.min(1,D*(1-B)+B)),255*(1-Math.min(1,S*(1-B)+B))]},_.xyz.rgb=function(k){const w=k[0]/100,D=k[1]/100,S=k[2]/100;let B,O,z;return B=3.2406*w+-1.5372*D+-.4986*S,O=-.9689*w+1.8758*D+.0415*S,z=.0557*w+-.204*D+1.057*S,B=B>.0031308?1.055*B**.4166666666666667-.055:12.92*B,O=O>.0031308?1.055*O**.4166666666666667-.055:12.92*O,z=z>.0031308?1.055*z**.4166666666666667-.055:12.92*z,B=Math.min(Math.max(0,B),1),O=Math.min(Math.max(0,O),1),z=Math.min(Math.max(0,z),1),[255*B,255*O,255*z]},_.xyz.lab=function(k){let w=k[0],D=k[1],S=k[2];return w/=95.047,D/=100,S/=108.883,w=w>.008856?w**.3333333333333333:7.787*w+.13793103448275862,D=D>.008856?D**.3333333333333333:7.787*D+.13793103448275862,S=S>.008856?S**.3333333333333333:7.787*S+.13793103448275862,[116*D-16,500*(w-D),200*(D-S)]},_.lab.xyz=function(k){let w,D,S;D=(k[0]+16)/116,w=k[1]/500+D,S=D-k[2]/200;const B=D**3,O=w**3,z=S**3;return D=B>.008856?B:(D-.13793103448275862)/7.787,w=O>.008856?O:(w-.13793103448275862)/7.787,S=z>.008856?z:(S-.13793103448275862)/7.787,w*=95.047,D*=100,S*=108.883,[w,D,S]},_.lab.lch=function(k){const w=k[0],D=k[1],S=k[2];let B;return B=360*Math.atan2(S,D)/2/Math.PI,B<0&&(B+=360),[w,Math.sqrt(D*D+S*S),B]},_.lch.lab=function(k){const w=k[0],D=k[1],S=k[2]/360*2*Math.PI;return[w,D*Math.cos(S),D*Math.sin(S)]},_.rgb.ansi16=function(k,w=null){const[D,S,B]=k;let O=w===null?_.rgb.hsv(k)[2]:w;if(O=Math.round(O/50),O===0)return 30;let z=30+(Math.round(B/255)<<2|Math.round(S/255)<<1|Math.round(D/255));return O===2&&(z+=60),z},_.hsv.ansi16=function(k){return _.rgb.ansi16(_.hsv.rgb(k),k[2])},_.rgb.ansi256=function(k){const w=k[0],D=k[1],S=k[2];return w===D&&D===S?w<8?16:w>248?231:Math.round((w-8)/247*24)+232:16+36*Math.round(w/255*5)+6*Math.round(D/255*5)+Math.round(S/255*5)},_.ansi16.rgb=function(k){let w=k%10;if(w===0||w===7)return k>50&&(w+=3.5),w=w/10.5*255,[w,w,w];const D=.5*(1+~~(k>50));return[(1&w)*D*255,(w>>1&1)*D*255,(w>>2&1)*D*255]},_.ansi256.rgb=function(k){if(k>=232){const D=10*(k-232)+8;return[D,D,D]}let w;return k-=16,[Math.floor(k/36)/5*255,Math.floor((w=k%36)/6)/5*255,w%6/5*255]},_.rgb.hex=function(k){const w=(((255&Math.round(k[0]))<<16)+((255&Math.round(k[1]))<<8)+(255&Math.round(k[2]))).toString(16).toUpperCase();return"000000".substring(w.length)+w},_.hex.rgb=function(k){const w=k.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!w)return[0,0,0];let D=w[0];w[0].length===3&&(D=D.split("").map(B=>B+B).join(""));const S=parseInt(D,16);return[S>>16&255,S>>8&255,255&S]},_.rgb.hcg=function(k){const w=k[0]/255,D=k[1]/255,S=k[2]/255,B=Math.max(Math.max(w,D),S),O=Math.min(Math.min(w,D),S),z=B-O;let $,X;return $=z<1?O/(1-z):0,X=z<=0?0:B===w?(D-S)/z%6:B===D?2+(S-w)/z:4+(w-D)/z,X/=6,X%=1,[360*X,100*z,100*$]},_.hsl.hcg=function(k){const w=k[1]/100,D=k[2]/100,S=D<.5?2*w*D:2*w*(1-D);let B=0;return S<1&&(B=(D-.5*S)/(1-S)),[k[0],100*S,100*B]},_.hsv.hcg=function(k){const w=k[1]/100,D=k[2]/100,S=w*D;let B=0;return S<1&&(B=(D-S)/(1-S)),[k[0],100*S,100*B]},_.hcg.rgb=function(k){const w=k[0]/360,D=k[1]/100,S=k[2]/100;if(D===0)return[255*S,255*S,255*S];const B=[0,0,0],O=w%1*6,z=O%1,$=1-z;let X=0;switch(Math.floor(O)){case 0:B[0]=1,B[1]=z,B[2]=0;break;case 1:B[0]=$,B[1]=1,B[2]=0;break;case 2:B[0]=0,B[1]=1,B[2]=z;break;case 3:B[0]=0,B[1]=$,B[2]=1;break;case 4:B[0]=z,B[1]=0,B[2]=1;break;default:B[0]=1,B[1]=0,B[2]=$}return X=(1-D)*S,[255*(D*B[0]+X),255*(D*B[1]+X),255*(D*B[2]+X)]},_.hcg.hsv=function(k){const w=k[1]/100,D=w+k[2]/100*(1-w);let S=0;return D>0&&(S=w/D),[k[0],100*S,100*D]},_.hcg.hsl=function(k){const w=k[1]/100,D=k[2]/100*(1-w)+.5*w;let S=0;return D>0&&D<.5?S=w/(2*D):D>=.5&&D<1&&(S=w/(2*(1-D))),[k[0],100*S,100*D]},_.hcg.hwb=function(k){const w=k[1]/100,D=w+k[2]/100*(1-w);return[k[0],100*(D-w),100*(1-D)]},_.hwb.hcg=function(k){const w=k[1]/100,D=1-k[2]/100,S=D-w;let B=0;return S<1&&(B=(D-S)/(1-S)),[k[0],100*S,100*B]},_.apple.rgb=function(k){return[k[0]/65535*255,k[1]/65535*255,k[2]/65535*255]},_.rgb.apple=function(k){return[k[0]/255*65535,k[1]/255*65535,k[2]/255*65535]},_.gray.rgb=function(k){return[k[0]/100*255,k[0]/100*255,k[0]/100*255]},_.gray.hsl=function(k){return[0,0,k[0]]},_.gray.hsv=_.gray.hsl,_.gray.hwb=function(k){return[0,100,k[0]]},_.gray.cmyk=function(k){return[0,0,0,k[0]]},_.gray.lab=function(k){return[k[0],0,0]},_.gray.hex=function(k){const w=255&Math.round(k[0]/100*255),D=((w<<16)+(w<<8)+w).toString(16).toUpperCase();return"000000".substring(D.length)+D},_.rgb.gray=function(k){return[(k[0]+k[1]+k[2])/3/255*100]}},9047:(y,A,g)=>{const x=g(9246),v=g(802),_={};Object.keys(x).forEach(k=>{_[k]={},Object.defineProperty(_[k],"channels",{value:x[k].channels}),Object.defineProperty(_[k],"labels",{value:x[k].labels});const w=v(k);Object.keys(w).forEach(D=>{const S=w[D];_[k][D]=function(B){const O=function(...z){const $=z[0];if($==null)return $;$.length>1&&(z=$);const X=B(z);if(typeof X=="object")for(let rt=X.length,At=0;At<rt;At++)X[At]=Math.round(X[At]);return X};return"conversion"in B&&(O.conversion=B.conversion),O}(S),_[k][D].raw=function(B){const O=function(...z){const $=z[0];return $==null?$:($.length>1&&(z=$),B(z))};return"conversion"in B&&(O.conversion=B.conversion),O}(S)})}),y.exports=_},802:(y,A,g)=>{const x=g(9246);function v(w){const D=function(){const B={},O=Object.keys(x);for(let z=O.length,$=0;$<z;$++)B[O[$]]={distance:-1,parent:null};return B}(),S=[w];for(D[w].distance=0;S.length;){const B=S.pop(),O=Object.keys(x[B]);for(let z=O.length,$=0;$<z;$++){const X=O[$],rt=D[X];rt.distance===-1&&(rt.distance=D[B].distance+1,rt.parent=B,S.unshift(X))}}return D}function _(w,D){return function(S){return D(w(S))}}function k(w,D){const S=[D[w].parent,w];let B=x[D[w].parent][w],O=D[w].parent;for(;D[O].parent;)S.unshift(D[O].parent),B=_(x[D[O].parent][O],B),O=D[O].parent;return B.conversion=S,B}y.exports=function(w){const D=v(w),S={},B=Object.keys(D);for(let O=B.length,z=0;z<O;z++){const $=B[z];D[$].parent!==null&&(S[$]=k($,D))}return S}},6931:y=>{y.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},4199:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content code{background-color:hsla(0,0%,78%,.3);border-radius:2px;padding:.15em}.ck.ck-editor__editable .ck-code_selected{background-color:hsla(0,0%,78%,.5)}","",{version:3,sources:["webpack://./../ckeditor5-basic-styles/theme/code.css"],names:[],mappings:"AAKA,iBACC,kCAAuC,CAEvC,iBAAkB,CADlB,aAED,CAEA,0CACC,kCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content code {
	background-color: hsla(0, 0%, 78%, 0.3);
	padding: .15em;
	border-radius: 2px;
}

.ck.ck-editor__editable .ck-code_selected  {
	background-color: hsla(0, 0%, 78%, 0.5);
}
`],sourceRoot:""}]);const w=k},8708:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content blockquote{border-left:5px solid #ccc;font-style:italic;margin-left:0;margin-right:0;overflow:hidden;padding-left:1.5em;padding-right:1.5em}.ck-content[dir=rtl] blockquote{border-left:0;border-right:5px solid #ccc}","",{version:3,sources:["webpack://./../ckeditor5-block-quote/theme/blockquote.css"],names:[],mappings:"AAKA,uBAWC,0BAAsC,CADtC,iBAAkB,CAFlB,aAAc,CACd,cAAe,CAPf,eAAgB,CAIhB,kBAAmB,CADnB,mBAOD,CAEA,gCACC,aAAc,CACd,2BACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content blockquote {
	/* See #12 */
	overflow: hidden;

	/* https://github.com/ckeditor/ckeditor5-block-quote/issues/15 */
	padding-right: 1.5em;
	padding-left: 1.5em;

	margin-left: 0;
	margin-right: 0;
	font-style: italic;
	border-left: solid 5px hsl(0, 0%, 80%);
}

.ck-content[dir="rtl"] blockquote {
	border-left: 0;
	border-right: solid 5px hsl(0, 0%, 80%);
}
`],sourceRoot:""}]);const w=k},1866:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,':root{--ck-image-processing-highlight-color:#f9fafa;--ck-image-processing-background-color:#e3e5e8}.ck.ck-editor__editable .image.image-processing{position:relative}.ck.ck-editor__editable .image.image-processing:before{animation:ck-image-processing-animation 2s linear infinite;background:linear-gradient(90deg,var(--ck-image-processing-background-color),var(--ck-image-processing-highlight-color),var(--ck-image-processing-background-color));background-size:200% 100%;content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:1}.ck.ck-editor__editable .image.image-processing img{height:100%}@keyframes ck-image-processing-animation{0%{background-position:200% 0}to{background-position:-200% 0}}',"",{version:3,sources:["webpack://./../ckeditor5-ckbox/theme/ckboximageedit.css"],names:[],mappings:"AAKA,MAEC,6CAAyD,CACzD,8CACD,CAIE,gDACC,iBA2BD,CAzBC,uDAmBC,0DAA2D,CAR3D,oKAKC,CACD,yBAA0B,CAhB1B,UAAW,CAOX,WAAY,CAHZ,MAAO,CAFP,iBAAkB,CAClB,KAAM,CAKN,UAAW,CAHX,SAcD,CAEA,oDACC,WACD,CAKH,yCACC,GACC,0BACD,CACA,GACC,2BACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/* Based on default CKBox theme colors */
	--ck-image-processing-highlight-color: hsl(220, 10%, 98%);
	--ck-image-processing-background-color: hsl(220, 10%, 90%);
}

.ck.ck-editor__editable {
	& .image {
		&.image-processing {
			position: relative;

			&:before {
				content: '';

				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;

				height: 100%;
				width: 100%;

				background: linear-gradient(
					90deg,
					var(--ck-image-processing-background-color),
					var(--ck-image-processing-highlight-color),
					var(--ck-image-processing-background-color)
				);
				background-size: 200% 100%;

				animation: ck-image-processing-animation 2s linear infinite;
			}

			& img {
				height: 100%;
			}
		}
	}
}

@keyframes ck-image-processing-animation {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}
`],sourceRoot:""}]);const w=k},7793:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck.ck-editor__editable .ck.ck-clipboard-drop-target-position{display:inline;pointer-events:none;position:relative}.ck.ck-editor__editable .ck.ck-clipboard-drop-target-position span{position:absolute;width:0}.ck.ck-editor__editable .ck-widget:-webkit-drag>.ck-widget__selection-handle,.ck.ck-editor__editable .ck-widget:-webkit-drag>.ck-widget__type-around{display:none}.ck.ck-clipboard-drop-target-line{pointer-events:none;position:absolute}:root{--ck-clipboard-drop-target-dot-width:12px;--ck-clipboard-drop-target-dot-height:8px;--ck-clipboard-drop-target-color:var(--ck-color-focus-border)}.ck.ck-editor__editable .ck.ck-clipboard-drop-target-position span{background:var(--ck-clipboard-drop-target-color);border:1px solid var(--ck-clipboard-drop-target-color);bottom:calc(var(--ck-clipboard-drop-target-dot-height)*-.5);margin-left:-1px;top:calc(var(--ck-clipboard-drop-target-dot-height)*-.5)}.ck.ck-editor__editable .ck.ck-clipboard-drop-target-position span:after{border-color:var(--ck-clipboard-drop-target-color) transparent transparent transparent;border-style:solid;border-width:calc(var(--ck-clipboard-drop-target-dot-height)) calc(var(--ck-clipboard-drop-target-dot-width)*.5) 0 calc(var(--ck-clipboard-drop-target-dot-width)*.5);content:"";display:block;height:0;left:50%;position:absolute;top:calc(var(--ck-clipboard-drop-target-dot-height)*-.5);transform:translateX(-50%);width:0}.ck.ck-editor__editable .ck-widget.ck-clipboard-drop-target-range{outline:var(--ck-widget-outline-thickness) solid var(--ck-clipboard-drop-target-color)!important}.ck.ck-editor__editable .ck-widget:-webkit-drag{zoom:.6;outline:none!important}.ck.ck-clipboard-drop-target-line{background:var(--ck-clipboard-drop-target-color);border:1px solid var(--ck-clipboard-drop-target-color);height:0;margin-top:-1px}.ck.ck-clipboard-drop-target-line:before{border-style:solid;content:"";height:0;position:absolute;top:calc(var(--ck-clipboard-drop-target-dot-width)*-.5);width:0}[dir=ltr] .ck.ck-clipboard-drop-target-line:before{border-color:transparent transparent transparent var(--ck-clipboard-drop-target-color);border-width:calc(var(--ck-clipboard-drop-target-dot-width)*.5) 0 calc(var(--ck-clipboard-drop-target-dot-width)*.5) var(--ck-clipboard-drop-target-dot-height);left:-1px}[dir=rtl] .ck.ck-clipboard-drop-target-line:before{border-color:transparent var(--ck-clipboard-drop-target-color) transparent transparent;border-width:calc(var(--ck-clipboard-drop-target-dot-width)*.5) var(--ck-clipboard-drop-target-dot-height) calc(var(--ck-clipboard-drop-target-dot-width)*.5) 0;right:-1px}',"",{version:3,sources:["webpack://./../ckeditor5-clipboard/theme/clipboard.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-clipboard/clipboard.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AASC,8DACC,cAAe,CAEf,mBAAoB,CADpB,iBAOD,CAJC,mEACC,iBAAkB,CAClB,OACD,CAWA,qJACC,YACD,CAIF,kCAEC,mBAAoB,CADpB,iBAED,CC9BA,MACC,yCAA0C,CAC1C,yCAA0C,CAC1C,6DACD,CAOE,mEAIC,gDAAiD,CADjD,sDAAuD,CAFvD,2DAA8D,CAI9D,gBAAiB,CAHjB,wDAqBD,CAfC,yEAWC,sFAAuF,CAEvF,kBAAmB,CADnB,qKAA0K,CAX1K,UAAW,CAIX,aAAc,CAFd,QAAS,CAIT,QAAS,CADT,iBAAkB,CAElB,wDAA2D,CAE3D,0BAA2B,CAR3B,OAYD,CAOF,kEACC,gGACD,CAKA,gDACC,OAAS,CACT,sBACD,CAGD,kCAGC,gDAAiD,CADjD,sDAAuD,CADvD,QAAS,CAGT,eAwBD,CAtBC,yCAMC,kBAAmB,CALnB,UAAW,CAIX,QAAS,CAHT,iBAAkB,CAClB,uDAA0D,CAC1D,OAiBD,CCjFA,mDDwEE,sFAAuF,CADvF,+JAAoK,CAFpK,SCnEF,CAFA,mDD+EE,sFAAuF,CADvF,+JAAmK,CAFnK,UC1EF",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor__editable {
	/*
	 * Vertical drop target (in text).
	 */
	& .ck.ck-clipboard-drop-target-position {
		display: inline;
		position: relative;
		pointer-events: none;

		& span {
			position: absolute;
			width: 0;
		}
	}

	/*
	 * Styles of the widget being dragged (its preview).
	 */
	& .ck-widget:-webkit-drag {
		& > .ck-widget__selection-handle {
			display: none;
		}

		& > .ck-widget__type-around {
			display: none;
		}
	}
}

.ck.ck-clipboard-drop-target-line {
	position: absolute;
	pointer-events: none;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

:root {
	--ck-clipboard-drop-target-dot-width: 12px;
	--ck-clipboard-drop-target-dot-height: 8px;
	--ck-clipboard-drop-target-color: var(--ck-color-focus-border);
}

.ck.ck-editor__editable {
	/*
	 * Vertical drop target (in text).
	 */
	& .ck.ck-clipboard-drop-target-position {
		& span {
			bottom: calc(-.5 * var(--ck-clipboard-drop-target-dot-height));
			top: calc(-.5 * var(--ck-clipboard-drop-target-dot-height));
			border: 1px solid var(--ck-clipboard-drop-target-color);
			background: var(--ck-clipboard-drop-target-color);
			margin-left: -1px;

			/* The triangle above the marker */
			&::after {
				content: '';
				width: 0;
				height: 0;

				display: block;
				position: absolute;
				left: 50%;
				top: calc(-.5 * var(--ck-clipboard-drop-target-dot-height));

				transform: translateX(-50%);
				border-color: var(--ck-clipboard-drop-target-color) transparent transparent transparent;
				border-width: calc(var(--ck-clipboard-drop-target-dot-height)) calc(.5 * var(--ck-clipboard-drop-target-dot-width)) 0 calc(.5 * var(--ck-clipboard-drop-target-dot-width));
				border-style: solid;
			}
		}
	}

	/*
	 * Styles of the widget that it a drop target.
	 */
	& .ck-widget.ck-clipboard-drop-target-range {
		outline: var(--ck-widget-outline-thickness) solid var(--ck-clipboard-drop-target-color) !important;
	}

	/*
	 * Styles of the widget being dragged (its preview).
	 */
	& .ck-widget:-webkit-drag {
		zoom: 0.6;
		outline: none !important;
	}
}

.ck.ck-clipboard-drop-target-line {
	height: 0;
	border: 1px solid var(--ck-clipboard-drop-target-color);
	background: var(--ck-clipboard-drop-target-color);
	margin-top: -1px;

	&::before {
		content: '';
		position: absolute;
		top: calc(-.5 * var(--ck-clipboard-drop-target-dot-width));
		width: 0;
		height: 0;
		border-style: solid;

		@mixin ck-dir ltr {
			left: -1px;

			border-width: calc(.5 * var(--ck-clipboard-drop-target-dot-width)) 0 calc(.5 * var(--ck-clipboard-drop-target-dot-width)) var(--ck-clipboard-drop-target-dot-height);
			border-color: transparent transparent transparent var(--ck-clipboard-drop-target-color);
		}

		@mixin ck-dir rtl {
			right: -1px;

			border-width:calc(.5 * var(--ck-clipboard-drop-target-dot-width)) var(--ck-clipboard-drop-target-dot-height) calc(.5 * var(--ck-clipboard-drop-target-dot-width)) 0;
			border-color: transparent var(--ck-clipboard-drop-target-color) transparent transparent;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},7388:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-editor{position:relative}.ck.ck-editor .ck-editor__top .ck-sticky-panel .ck-toolbar{z-index:var(--ck-z-panel)}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content{border:solid var(--ck-color-base-border);border-radius:0;border-width:1px 1px 0}.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content,.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content.ck-rounded-corners{border-radius:var(--ck-border-radius);border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content.ck-sticky-panel__content_sticky{border-bottom-width:1px}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content .ck-menu-bar{border:0;border-bottom:1px solid var(--ck-color-base-border)}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content .ck-toolbar{border:0}.ck.ck-editor__main>.ck-editor__editable{background:var(--ck-color-base-background);border-radius:0}.ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-top-right-radius:0}.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--ck-color-base-border)}","",{version:3,sources:["webpack://./../ckeditor5-editor-classic/theme/classiceditor.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-editor-classic/classiceditor.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAKA,cAIC,iBAMD,CAJC,2DAEC,yBACD,CCLC,8DAOC,wCAAsB,CCLxB,eAAgB,CDKd,sBAcD,CCjBD,mKAEC,qCAAsC,CDJpC,2BAA4B,CAC5B,4BCKH,CDCE,8FACC,uBACD,CAEA,2EACC,QAAS,CACT,mDACD,CAEA,0EACC,QACD,CAMH,yCAEC,0CAA2C,CC1B3C,eDoCD,CClCC,yHAEC,qCAAsC,CDyBtC,wBAAyB,CACzB,yBCxBD,CD2BA,0DACC,wCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor {
	/* All the elements within \`.ck-editor\` are positioned relatively to it.
	 If any element needs to be positioned with respect to the <body>, etc.,
	 it must land outside of the \`.ck-editor\` in DOM. */
	position: relative;

	& .ck-editor__top .ck-sticky-panel .ck-toolbar {
		/* https://github.com/ckeditor/ckeditor5-editor-classic/issues/62 */
		z-index: var(--ck-z-panel);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../mixins/_rounded.css";

.ck.ck-editor__top {
	& .ck-sticky-panel {
		& .ck-sticky-panel__content {
			@mixin ck-rounded-corners {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

			border: 1px solid var(--ck-color-base-border);
			border-bottom-width: 0;

			&.ck-sticky-panel__content_sticky {
				border-bottom-width: 1px;
			}

			& .ck-menu-bar {
				border: 0;
				border-bottom: 1px solid var(--ck-color-base-border);
			}

			& .ck-toolbar {
				border: 0;
			}
		}
	}
}

/* Note: Use ck-editor__main to make sure these styles don't apply to other editor types */
.ck.ck-editor__main > .ck-editor__editable {
	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/113 */
	background: var(--ck-color-base-background);

	@mixin ck-rounded-corners {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	&:not(.ck-focused) {
		border-color: var(--ck-color-base-border);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},4098:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-placeholder,.ck.ck-placeholder{position:relative}.ck .ck-placeholder:before,.ck.ck-placeholder:before{content:attr(data-placeholder);left:0;pointer-events:none;position:absolute;right:0}.ck.ck-read-only .ck-placeholder:before{display:none}.ck.ck-reset_all .ck-placeholder{position:relative}@media (forced-colors:active){.ck .ck-placeholder,.ck.ck-placeholder{forced-color-adjust:preserve-parent-color}}.ck .ck-placeholder:before,.ck.ck-placeholder:before{cursor:text}@media (forced-colors:none){.ck .ck-placeholder:before,.ck.ck-placeholder:before{color:var(--ck-color-engine-placeholder-text)}}@media (forced-colors:active){.ck .ck-placeholder:before,.ck.ck-placeholder:before{font-style:italic;margin-left:1px}}","",{version:3,sources:["webpack://./../ckeditor5-engine/theme/placeholder.css","webpack://./../ckeditor5-ui/theme/mixins/_mediacolors.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-engine/placeholder.css"],names:[],mappings:"AAMA,uCAEC,iBAWD,CATC,qDAIC,8BAA+B,CAF/B,MAAO,CAKP,mBAAoB,CANpB,iBAAkB,CAElB,OAKD,CAKA,wCACC,YACD,CAQD,iCACC,iBACD,CC7BC,8BACC,uCCOA,yCDLA,CACD,CCOA,qDACC,WAmBD,CDvBA,4BACC,qDCMC,6CDJD,CACD,CAZA,8BACC,qDCsBC,iBAAkB,CAMlB,eD1BD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* See ckeditor/ckeditor5#936. */
.ck.ck-placeholder,
.ck .ck-placeholder {
	position: relative;

	&::before {
		position: absolute;
		left: 0;
		right: 0;
		content: attr(data-placeholder);

		/* See ckeditor/ckeditor5#469. */
		pointer-events: none;
	}
}

/* See ckeditor/ckeditor5#1987. */
.ck.ck-read-only .ck-placeholder {
	&::before {
		display: none;
	}
}

/*
 * Rules for the \`ck-placeholder\` are loaded before the rules for \`ck-reset_all\` in the base CKEditor 5 DLL build.
 * This fix overwrites the incorrectly set \`position: static\` from \`ck-reset_all\`.
 * See https://github.com/ckeditor/ckeditor5/issues/11418.
 */
.ck.ck-reset_all .ck-placeholder {
	position: relative;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-forced-colors {
	@media (forced-colors: active) {
		& {
			@mixin-content;
		}
	}
}

@define-mixin ck-media-default-colors {
	@media (forced-colors: none) {
		& {
			@mixin-content;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_mediacolors.css";

/* See ckeditor/ckeditor5#936. */
.ck.ck-placeholder, .ck .ck-placeholder {
	@mixin ck-media-forced-colors {
		/*
		 * This is needed for Edge on Windows to use the right color for the placeholder content (::before).
		 * See https://github.com/ckeditor/ckeditor5/issues/14907.
		 */
		forced-color-adjust: preserve-parent-color;
	}

	&::before {
		cursor: text;

		@mixin ck-media-default-colors {
			color: var(--ck-color-engine-placeholder-text);
		}

		@mixin ck-media-forced-colors {
			/*
			 * In the high contrast mode there is no telling between regular and placeholder text. Using
			 * italic text to address that issue. See https://github.com/ckeditor/ckeditor5/issues/14907.
			 */
			font-style: italic;

			/*
			 * Without this margin, the caret will not show up and blink when the user puts the selection
			 * in the placeholder (Edge on Windows). See https://github.com/ckeditor/ckeditor5/issues/14907.
			 */
			margin-left: 1px;
		}
	}
}
`],sourceRoot:""}]);const w=k},8264:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-editor__editable span[data-ck-unsafe-element]{display:none}","",{version:3,sources:["webpack://./../ckeditor5-engine/theme/renderer.css"],names:[],mappings:"AAMA,qDACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* Elements marked by the Renderer as hidden should be invisible in the editor. */
.ck.ck-editor__editable span[data-ck-unsafe-element] {
	display: none;
}
`],sourceRoot:""}]);const w=k},6269:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-heading_heading1 .ck-button__label{font-size:20px}.ck.ck-heading_heading2 .ck-button__label{font-size:17px}.ck.ck-heading_heading3 .ck-button__label{font-size:14px}.ck[class*=ck-heading_heading]{font-weight:700}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__button .ck-button__label{width:8em}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__panel .ck-list__item{min-width:18em}","",{version:3,sources:["webpack://./../ckeditor5-heading/theme/heading.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-heading/heading.css"],names:[],mappings:"AAKA,0CACC,cACD,CAEA,0CACC,cACD,CAEA,0CACC,cACD,CAEA,+BACC,eACD,CCZC,2EACC,SACD,CAEA,uEACC,cACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-heading_heading1 .ck-button__label {
	font-size: 20px;
}

.ck.ck-heading_heading2 .ck-button__label {
	font-size: 17px;
}

.ck.ck-heading_heading3 .ck-button__label {
	font-size: 14px;
}

.ck[class*="ck-heading_heading"] {
	font-weight: bold;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* Resize dropdown's button label. */
.ck.ck-dropdown.ck-heading-dropdown {
	& .ck-dropdown__button .ck-button__label {
		width: 8em;
	}

	& .ck-dropdown__panel .ck-list__item {
		min-width: 18em;
	}
}
`],sourceRoot:""}]);const w=k},265:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content .image{clear:both;display:table;margin:.9em auto;min-width:50px;text-align:center}.ck-content .image img{display:block;height:auto;margin:0 auto;max-width:100%;min-width:100%}.ck-content .image-inline{align-items:flex-start;display:inline-flex;max-width:100%}.ck-content .image-inline picture{display:flex}.ck-content .image-inline img,.ck-content .image-inline picture{flex-grow:1;flex-shrink:1;max-width:100%}.ck.ck-editor__editable .image>figcaption.ck-placeholder:before{overflow:hidden;padding-left:inherit;padding-right:inherit;text-overflow:ellipsis;white-space:nowrap}.ck.ck-editor__editable .image{z-index:1}.ck.ck-editor__editable .image.ck-widget_selected{z-index:2}.ck.ck-editor__editable .image-inline{z-index:1}.ck.ck-editor__editable .image-inline.ck-widget_selected{z-index:2}.ck.ck-editor__editable .image-inline.ck-widget_selected ::selection{display:none}.ck.ck-editor__editable .image-inline img{height:auto}.ck.ck-editor__editable td .image-inline img,.ck.ck-editor__editable th .image-inline img{max-width:none}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/image.css"],names:[],mappings:"AAMC,mBAEC,UAAW,CADX,aAAc,CAOd,gBAAkB,CAGlB,cAAe,CARf,iBA2BD,CAjBC,uBAEC,aAAc,CAad,WAAY,CAVZ,aAAc,CAGd,cAAe,CAGf,cAKD,CAGD,0BAYC,sBAAuB,CANvB,mBAAoB,CAGpB,cAoBD,CAdC,kCACC,YACD,CAGA,gEAGC,WAAY,CACZ,aAAc,CAGd,cACD,CAUD,gEASC,eAAgB,CARhB,oBAAqB,CACrB,qBAAsB,CAQtB,sBAAuB,CAFvB,kBAGD,CAKA,+BACC,SASD,CAHC,kDACC,SACD,CAMD,sCACC,SAkBD,CAZC,yDACC,SAUD,CAHC,qEACC,YACD,CAMF,0CACC,WACD,CAMC,0FACC,cACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content {
	& .image {
		display: table;
		clear: both;
		text-align: center;

		/* Make sure there is some space between the content and the image. Center image by default. */
		/* The first value should be equal to --ck-spacing-large variable if used in the editor context
	 	to avoid the content jumping (See https://github.com/ckeditor/ckeditor5/issues/9825). */
		margin: 0.9em auto;

		/* Make sure the caption will be displayed properly (See: https://github.com/ckeditor/ckeditor5/issues/1870). */
		min-width: 50px;

		& img {
			/* Prevent unnecessary margins caused by line-height (see #44). */
			display: block;

			/* Center the image if its width is smaller than the content's width. */
			margin: 0 auto;

			/* Make sure the image never exceeds the size of the parent container (ckeditor/ckeditor5-ui#67). */
			max-width: 100%;

			/* Make sure the image is never smaller than the parent container (See: https://github.com/ckeditor/ckeditor5/issues/9300). */
			min-width: 100%;

			/* Keep proportions of the block image if the height is set and the image is wider than the editor width.
			See https://github.com/ckeditor/ckeditor5/issues/14542. */
			height: auto;
		}
	}

	& .image-inline {
		/*
		 * Normally, the .image-inline would have "display: inline-block" and "img { width: 100% }" (to follow the wrapper while resizing).
		 * Unfortunately, together with "srcset", it gets automatically stretched up to the width of the editing root.
		 * This strange behavior does not happen with inline-flex.
		 */
		display: inline-flex;

		/* While being resized, don't allow the image to exceed the width of the editing root. */
		max-width: 100%;

		/* This is required by Safari to resize images in a sensible way. Without this, the browser breaks the ratio. */
		align-items: flex-start;

		/* When the picture is present it must act as a flex container to let the img resize properly */
		& picture {
			display: flex;
		}

		/* When the picture is present, it must act like a resizable img. */
		& picture,
		& img {
			/* This is necessary for the img to span the entire .image-inline wrapper and to resize properly. */
			flex-grow: 1;
			flex-shrink: 1;

			/* Prevents overflowing the editing root boundaries when an inline image is very wide. */
			max-width: 100%;
		}
	}
}

.ck.ck-editor__editable {
	/*
	 * Inhertit the content styles padding of the <figcaption> in case the integration overrides \`text-align: center\`
	 * of \`.image\` (e.g. to the left/right). This ensures the placeholder stays at the padding just like the native
	 * caret does, and not at the edge of <figcaption>.
	 */
	& .image > figcaption.ck-placeholder::before {
		padding-left: inherit;
		padding-right: inherit;

		/*
		 * Make sure the image caption placeholder doesn't overflow the placeholder area.
		 * See https://github.com/ckeditor/ckeditor5/issues/9162.
		 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/*
	 * See https://github.com/ckeditor/ckeditor5/issues/15115.
	 */
	& .image {
		z-index: 1;

		/*
		 * Make sure the selected image always stays on top of its siblings.
		 * See https://github.com/ckeditor/ckeditor5/issues/9108.
		 */
		&.ck-widget_selected {
			z-index: 2;
		}
	}

	/*
	 * See https://github.com/ckeditor/ckeditor5/issues/15115.
	 */
	& .image-inline {
		z-index: 1;

		/*
		 * Make sure the selected inline image always stays on top of its siblings.
		 * See https://github.com/ckeditor/ckeditor5/issues/9108.
		 */
		&.ck-widget_selected {
			z-index: 2;

			/*
			 * Make sure the native browser selection style is not displayed.
			 * Inline image widgets have their own styles for the selected state and
			 * leaving this up to the browser is asking for a visual collision.
			 */
			& ::selection {
				display: none;
			}
		}
	}

	/* Keep proportions of the inline image if the height is set and the image is wider than the editor width.
	See https://github.com/ckeditor/ckeditor5/issues/14542. */
	& .image-inline img {
		height: auto;
	}

	/* The inline image nested in the table should have its original size if not resized.
	See https://github.com/ckeditor/ckeditor5/issues/9117. */
	& td,
	& th {
		& .image-inline img {
			max-width: none;
		}
	}
}
`],sourceRoot:""}]);const w=k},5247:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-image-caption-background:#f7f7f7;--ck-color-image-caption-text:#333;--ck-color-image-caption-highlighted-background:#fd0}.ck-content .image>figcaption{background-color:var(--ck-color-image-caption-background);caption-side:bottom;color:var(--ck-color-image-caption-text);display:table-caption;font-size:.75em;outline-offset:-1px;padding:.6em;word-break:break-word}@media (forced-colors:active){.ck-content .image>figcaption{background-color:unset;color:unset}}@media (forced-colors:none){.ck.ck-editor__editable .image>figcaption.image__caption_highlighted{animation:ck-image-caption-highlight .6s ease-out}}@media (prefers-reduced-motion:reduce){.ck.ck-editor__editable .image>figcaption.image__caption_highlighted{animation:none}}@keyframes ck-image-caption-highlight{0%{background-color:var(--ck-color-image-caption-highlighted-background)}to{background-color:var(--ck-color-image-caption-background)}}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imagecaption.css","webpack://./../ckeditor5-ui/theme/mixins/_mediacolors.css"],names:[],mappings:"AAOA,MACC,2CAAoD,CACpD,kCAA8C,CAC9C,oDACD,CAGA,8BAKC,yDAA0D,CAH1D,mBAAoB,CAEpB,wCAAyC,CAHzC,qBAAsB,CAMtB,eAAgB,CAChB,mBAAoB,CAFpB,YAAa,CAHb,qBAYD,CAJC,8BAXD,8BAYE,sBAAuB,CACvB,WAEF,CADC,CCdA,4BACC,qEDmBA,iDCjBA,CACD,CDmBA,uCALD,qEAME,cAEF,CADC,CAGD,sCACC,GACC,qEACD,CAEA,GACC,yDACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_mediacolors.css";

:root {
	--ck-color-image-caption-background: hsl(0, 0%, 97%);
	--ck-color-image-caption-text: hsl(0, 0%, 20%);
	--ck-color-image-caption-highlighted-background: hsl(52deg 100% 50%);
}

/* Content styles */
.ck-content .image > figcaption {
	display: table-caption;
	caption-side: bottom;
	word-break: break-word;
	color: var(--ck-color-image-caption-text);
	background-color: var(--ck-color-image-caption-background);
	padding: .6em;
	font-size: .75em;
	outline-offset: -1px;

	/* Improve placeholder rendering in high-constrast mode (https://github.com/ckeditor/ckeditor5/issues/14907). */
	@media (forced-colors: active) {
		background-color: unset;
		color: unset;
	}
}

/* Editing styles */
.ck.ck-editor__editable .image > figcaption.image__caption_highlighted {
	@mixin ck-media-default-colors {
		animation: ck-image-caption-highlight .6s ease-out;
	}

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}

@keyframes ck-image-caption-highlight {
	0% {
		background-color: var(--ck-color-image-caption-highlighted-background);
	}

	100% {
		background-color: var(--ck-color-image-caption-background);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-forced-colors {
	@media (forced-colors: active) {
		& {
			@mixin-content;
		}
	}
}

@define-mixin ck-media-default-colors {
	@media (forced-colors: none) {
		& {
			@mixin-content;
		}
	}
}
`],sourceRoot:""}]);const w=k},4642:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-image-custom-resize-form{align-items:flex-start;display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-image-custom-resize-form .ck-labeled-field-view{display:inline-block}.ck.ck-image-custom-resize-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-image-custom-resize-form{flex-wrap:wrap}.ck.ck-image-custom-resize-form .ck-labeled-field-view{flex-basis:100%}.ck.ck-image-custom-resize-form .ck-button{flex-basis:50%}}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imagecustomresizeform.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css"],names:[],mappings:"AAOA,gCAIC,sBAAuB,CAHvB,YAAa,CACb,kBAAmB,CACnB,gBAsBD,CAnBC,uDACC,oBACD,CAEA,0CACC,YACD,CCbA,oCDCD,gCAeE,cAUF,CARE,uDACC,eACD,CAEA,2CACC,cACD,CCtBD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-image-custom-resize-form {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: flex-start;

	& .ck-labeled-field-view {
		display: inline-block;
	}

	& .ck-label {
		display: none;
	}

	@mixin ck-media-phone {
		flex-wrap: wrap;

		& .ck-labeled-field-view {
			flex-basis: 100%;
		}

		& .ck-button {
			flex-basis: 50%;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},3350:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-image-insert-url{padding:var(--ck-spacing-large) var(--ck-spacing-large) 0;width:400px}.ck.ck-image-insert-url .ck-image-insert-url__action-row{display:grid;grid-template-columns:repeat(2,1fr)}:root{--ck-image-insert-insert-by-url-width:250px}.ck.ck-image-insert-url{--ck-input-width:100%}.ck.ck-image-insert-url .ck-image-insert-url__action-row{grid-column-gap:var(--ck-spacing-large);margin-top:var(--ck-spacing-large)}.ck.ck-image-insert-url .ck-image-insert-url__action-row .ck-button-cancel,.ck.ck-image-insert-url .ck-image-insert-url__action-row .ck-button-save{justify-content:center;min-width:auto}.ck.ck-image-insert-url .ck-image-insert-url__action-row .ck-button .ck-button__label{color:var(--ck-color-text)}.ck.ck-image-insert-form>.ck.ck-button{display:block;width:100%}[dir=ltr] .ck.ck-image-insert-form>.ck.ck-button{text-align:left}[dir=rtl] .ck.ck-image-insert-form>.ck.ck-button{text-align:right}.ck.ck-image-insert-form>.ck.ck-collapsible{min-width:var(--ck-image-insert-insert-by-url-width)}.ck.ck-image-insert-form>.ck.ck-collapsible:not(:first-child){border-top:1px solid var(--ck-color-base-border)}.ck.ck-image-insert-form>.ck.ck-collapsible:not(:last-child){border-bottom:1px solid var(--ck-color-base-border)}.ck.ck-image-insert-form>.ck.ck-image-insert-url{min-width:var(--ck-image-insert-insert-by-url-width);padding:var(--ck-spacing-large)}.ck.ck-image-insert-form:focus{outline:none}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageinsert.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-image/imageinsert.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAKA,wBAEC,yDAA0D,CAD1D,WAOD,CAJC,yDACC,YAAa,CACb,mCACD,CCLD,MACC,2CACD,CAEA,wBACC,qBAgBD,CAdC,yDACC,uCAAwC,CACxC,kCAWD,CATC,oJAEC,sBAAuB,CACvB,cACD,CAEA,sFACC,0BACD,CAKD,uCACC,aAAc,CACd,UASD,CCpCA,iDD8BE,eC5BF,CAFA,iDDkCE,gBChCF,CDoCA,4CASC,oDACD,CATC,8DACC,gDACD,CAEA,6DACC,mDACD,CAMD,iDACC,oDAAqD,CACrD,+BACD,CAEA,+BACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-image-insert-url {
	width: 400px;
	padding: var(--ck-spacing-large) var(--ck-spacing-large) 0;

	& .ck-image-insert-url__action-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

:root {
	--ck-image-insert-insert-by-url-width: 250px;
}

.ck.ck-image-insert-url {
	--ck-input-width: 100%;

	& .ck-image-insert-url__action-row {
		grid-column-gap: var(--ck-spacing-large);
		margin-top: var(--ck-spacing-large);

		& .ck-button-save,
		& .ck-button-cancel {
			justify-content: center;
			min-width: auto;
		}

		& .ck-button .ck-button__label {
			color: var(--ck-color-text);
		}
	}
}

.ck.ck-image-insert-form {
	& > .ck.ck-button {
		display: block;
		width: 100%;

		@mixin ck-dir ltr {
			text-align: left;
		}

		@mixin ck-dir rtl {
			text-align: right;
		}
	}

	& > .ck.ck-collapsible {
		&:not(:first-child) {
			border-top: 1px solid var(--ck-color-base-border);
		}

		&:not(:last-child) {
			border-bottom: 1px solid var(--ck-color-base-border);
		}

		min-width: var(--ck-image-insert-insert-by-url-width);
	}

	/* This is the case when there are no other integrations configured than insert by URL */
	& > .ck.ck-image-insert-url {
		min-width: var(--ck-image-insert-insert-by-url-width);
		padding: var(--ck-spacing-large);
	}

	&:focus {
		outline: none;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},7378:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-editor__editable img.image_placeholder{background-size:100% 100%}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageplaceholder.css"],names:[],mappings:"AAMC,8CACC,yBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor__editable {
	& img.image_placeholder {
		background-size: 100% 100%;
	}
}
`],sourceRoot:""}]);const w=k},3469:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content img.image_resized{height:auto}.ck-content .image.image_resized{box-sizing:border-box;display:block;max-width:100%}.ck-content .image.image_resized img{width:100%}.ck-content .image.image_resized>figcaption{display:block}.ck.ck-editor__editable td .image-inline.image_resized img,.ck.ck-editor__editable th .image-inline.image_resized img{max-width:100%}[dir=ltr] .ck.ck-button.ck-button_with-text.ck-resize-image-button .ck-button__icon{margin-right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-button.ck-button_with-text.ck-resize-image-button .ck-button__icon{margin-left:var(--ck-spacing-standard)}.ck.ck-dropdown .ck-button.ck-resize-image-button .ck-button__label{width:4em}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageresize.css"],names:[],mappings:"AAMA,8BACC,WACD,CAEA,iCAQC,qBAAsB,CADtB,aAAc,CANd,cAkBD,CATC,qCAEC,UACD,CAEA,4CAEC,aACD,CAQC,sHACC,cACD,CAIF,oFACC,uCACD,CAEA,oFACC,sCACD,CAEA,oEACC,SACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* Preserve aspect ratio of the resized image after introducing image height attribute. */
.ck-content img.image_resized {
	height: auto;
}

.ck-content .image.image_resized {
	max-width: 100%;
	/*
	The \`<figure>\` element for resized images must not use \`display:table\` as browsers do not support \`max-width\` for it well.
	See https://stackoverflow.com/questions/4019604/chrome-safari-ignoring-max-width-in-table/14420691#14420691 for more.
	Fortunately, since we control the width, there is no risk that the image will look bad.
	*/
	display: block;
	box-sizing: border-box;

	& img {
		/* For resized images it is the \`<figure>\` element that determines the image width. */
		width: 100%;
	}

	& > figcaption {
		/* The \`<figure>\` element uses \`display:block\`, so \`<figcaption>\` also has to. */
		display: block;
	}
}

.ck.ck-editor__editable {
	/* The resized inline image nested in the table should respect its parent size.
	See https://github.com/ckeditor/ckeditor5/issues/9117. */
	& td,
	& th {
		& .image-inline.image_resized img {
			max-width: 100%;
		}
	}
}

[dir="ltr"] .ck.ck-button.ck-button_with-text.ck-resize-image-button .ck-button__icon {
	margin-right: var(--ck-spacing-standard);
}

[dir="rtl"] .ck.ck-button.ck-button_with-text.ck-resize-image-button .ck-button__icon {
	margin-left: var(--ck-spacing-standard);
}

.ck.ck-dropdown .ck-button.ck-resize-image-button .ck-button__label {
	width: 4em;
}
`],sourceRoot:""}]);const w=k},6386:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-image-style-spacing:1.5em;--ck-inline-image-style-spacing:calc(var(--ck-image-style-spacing)/2)}.ck-content .image.image-style-block-align-left,.ck-content .image.image-style-block-align-right{max-width:calc(100% - var(--ck-image-style-spacing))}.ck-content .image.image-style-align-left,.ck-content .image.image-style-align-right{clear:none}.ck-content .image.image-style-side{float:right;margin-left:var(--ck-image-style-spacing);max-width:50%}.ck-content .image.image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.ck-content .image.image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.ck-content .image.image-style-block-align-right{margin-left:auto;margin-right:0}.ck-content .image.image-style-block-align-left{margin-left:0;margin-right:auto}.ck-content .image-style-align-center{margin-left:auto;margin-right:auto}.ck-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.ck-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.ck-content p+.image.image-style-align-left,.ck-content p+.image.image-style-align-right,.ck-content p+.image.image-style-side{margin-top:0}.ck-content .image-inline.image-style-align-left,.ck-content .image-inline.image-style-align-right{margin-bottom:var(--ck-inline-image-style-spacing);margin-top:var(--ck-inline-image-style-spacing)}.ck-content .image-inline.image-style-align-left{margin-right:var(--ck-inline-image-style-spacing)}.ck-content .image-inline.image-style-align-right{margin-left:var(--ck-inline-image-style-spacing)}.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__action:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):not(:hover),.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__action:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__arrow:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__arrow:not(.ck-disabled):not(:hover){background-color:var(--ck-color-button-on-background)}.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__action:not(.ck-disabled):after,.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):after,.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):not(:hover):after,.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__action:not(.ck-disabled):after,.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__arrow:not(.ck-disabled):after,.ck.ck-splitbutton.ck-splitbutton_flatten:hover>.ck-splitbutton__arrow:not(.ck-disabled):not(:hover):after{display:none}.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open:hover>.ck-splitbutton__action:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open:hover>.ck-splitbutton__arrow:not(.ck-disabled),.ck.ck-splitbutton.ck-splitbutton_flatten.ck-splitbutton_open:hover>.ck-splitbutton__arrow:not(.ck-disabled):not(:hover){background-color:var(--ck-color-button-on-hover-background)}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imagestyle.css"],names:[],mappings:"AAKA,MACC,8BAA+B,CAC/B,qEACD,CAQE,iGAEC,oDACD,CAIA,qFAEC,UACD,CAEA,oCACC,WAAY,CACZ,yCAA0C,CAC1C,aACD,CAEA,0CACC,UAAW,CACX,0CACD,CAEA,2CACC,WAAY,CACZ,yCACD,CAEA,iDAEC,gBAAiB,CADjB,cAED,CAEA,gDACC,aAAc,CACd,iBACD,CAGD,sCACC,gBAAiB,CACjB,iBACD,CAEA,oCACC,UAAW,CACX,0CACD,CAEA,qCACC,WAAY,CACZ,yCACD,CAGA,+HAGC,YACD,CAGC,mGAGC,kDAAmD,CADnD,+CAED,CAEA,iDACC,iDACD,CAEA,kDACC,gDACD,CAUC,0lBAGC,qDAKD,CAHC,8nBACC,YACD,CAKD,oVAGC,2DACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-image-style-spacing: 1.5em;
	--ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
}

.ck-content {
	/* See: https://github.com/ckeditor/ckeditor5/issues/16317 */
	& .image {
		/* Provides a minimal side margin for the left and right aligned images, so that the user has a visual feedback
		confirming successful application of the style if image width exceeds the editor's size.
		See https://github.com/ckeditor/ckeditor5/issues/9342 */
		&.image-style-block-align-left,
		&.image-style-block-align-right {
			max-width: calc(100% - var(--ck-image-style-spacing));
		}

		/* Allows displaying multiple floating images in the same line.
		See https://github.com/ckeditor/ckeditor5/issues/9183#issuecomment-804988132 */
		&.image-style-align-left,
		&.image-style-align-right {
			clear: none;
		}

		&.image-style-side {
			float: right;
			margin-left: var(--ck-image-style-spacing);
			max-width: 50%;
		}

		&.image-style-align-left {
			float: left;
			margin-right: var(--ck-image-style-spacing);
		}

		&.image-style-align-right {
			float: right;
			margin-left: var(--ck-image-style-spacing);
		}

		&.image-style-block-align-right {
			margin-right: 0;
			margin-left: auto;
		}

		&.image-style-block-align-left {
			margin-left: 0;
			margin-right: auto;
		}
	}

	& .image-style-align-center {
		margin-left: auto;
		margin-right: auto;
	}

	& .image-style-align-left {
		float: left;
		margin-right: var(--ck-image-style-spacing);
	}

	& .image-style-align-right {
		float: right;
		margin-left: var(--ck-image-style-spacing);
	}

	/* Simulates margin collapsing with the preceding paragraph, which does not work for the floating elements. */
	& p + .image.image-style-align-left,
	& p + .image.image-style-align-right,
	& p + .image.image-style-side {
		margin-top: 0;
	}

	& .image-inline {
		&.image-style-align-left,
		&.image-style-align-right {
			margin-top: var(--ck-inline-image-style-spacing);
			margin-bottom: var(--ck-inline-image-style-spacing);
		}

		&.image-style-align-left {
			margin-right: var(--ck-inline-image-style-spacing);
		}

		&.image-style-align-right {
			margin-left: var(--ck-inline-image-style-spacing);
		}
	}
}

.ck.ck-splitbutton {
	/* The button should display as a regular drop-down if the action button
	is forced to fire the same action as the arrow button. */
	&.ck-splitbutton_flatten {
		&:hover,
		&.ck-splitbutton_open {
			& > .ck-splitbutton__action:not(.ck-disabled),
			& > .ck-splitbutton__arrow:not(.ck-disabled),
			& > .ck-splitbutton__arrow:not(.ck-disabled):not(:hover) {
				background-color: var(--ck-color-button-on-background);

				&::after {
					display: none;
				}
			}
		}

		&.ck-splitbutton_open:hover {
			& > .ck-splitbutton__action:not(.ck-disabled),
			& > .ck-splitbutton__arrow:not(.ck-disabled),
			& > .ck-splitbutton__arrow:not(.ck-disabled):not(:hover) {
				background-color: var(--ck-color-button-on-hover-background);
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},7693:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck-image-upload-complete-icon{border-radius:50%;display:block;position:absolute;right:min(var(--ck-spacing-medium),6%);top:min(var(--ck-spacing-medium),6%);z-index:1}.ck-image-upload-complete-icon:after{content:"";position:absolute}:root{--ck-color-image-upload-icon:#fff;--ck-color-image-upload-icon-background:#008a00;--ck-image-upload-icon-size:20;--ck-image-upload-icon-width:2px;--ck-image-upload-icon-is-visible:clamp(0px,100% - 50px,1px)}.ck-image-upload-complete-icon{animation-delay:0s,3s;animation-duration:.5s,.5s;animation-fill-mode:forwards,forwards;animation-name:ck-upload-complete-icon-show,ck-upload-complete-icon-hide;background:var(--ck-color-image-upload-icon-background);font-size:calc(1px*var(--ck-image-upload-icon-size));height:calc(var(--ck-image-upload-icon-is-visible)*var(--ck-image-upload-icon-size));opacity:0;overflow:hidden;width:calc(var(--ck-image-upload-icon-is-visible)*var(--ck-image-upload-icon-size))}.ck-image-upload-complete-icon:after{animation-delay:.5s;animation-duration:.5s;animation-fill-mode:forwards;animation-name:ck-upload-complete-icon-check;border-right:var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);border-top:var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);box-sizing:border-box;height:0;left:25%;opacity:0;top:50%;transform:scaleX(-1) rotate(135deg);transform-origin:left top;width:0}@media (prefers-reduced-motion:reduce){.ck-image-upload-complete-icon{animation-duration:0s}.ck-image-upload-complete-icon:after{animation:none;height:.45em;opacity:1;width:.3em}}@keyframes ck-upload-complete-icon-show{0%{opacity:0}to{opacity:1}}@keyframes ck-upload-complete-icon-hide{0%{opacity:1}to{opacity:0}}@keyframes ck-upload-complete-icon-check{0%{height:0;opacity:1;width:0}33%{height:0;width:.3em}to{height:.45em;opacity:1;width:.3em}}',"",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageuploadicon.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-image/imageuploadicon.css"],names:[],mappings:"AAKA,+BAUC,iBAAkB,CATlB,aAAc,CACd,iBAAkB,CAOlB,sCAAwC,CADxC,oCAAsC,CAGtC,SAMD,CAJC,qCACC,UAAW,CACX,iBACD,CChBD,MACC,iCAA8C,CAC9C,+CAA4D,CAG5D,8BAA+B,CAC/B,gCAAiC,CACjC,4DACD,CAEA,+BAWC,qBAA4B,CAN5B,0BAAgC,CADhC,qCAAuC,CADvC,wEAA0E,CAD1E,uDAAwD,CAMxD,oDAAuD,CAWvD,oFAAuF,CAlBvF,SAAU,CAgBV,eAAgB,CAChB,mFAqCD,CAjCC,qCAgBC,mBAAsB,CADtB,sBAAyB,CAEzB,4BAA6B,CAH7B,4CAA6C,CAF7C,sFAAuF,CADvF,oFAAqF,CASrF,qBAAsB,CAdtB,QAAS,CAJT,QAAS,CAGT,SAAU,CADV,OAAQ,CAKR,mCAAoC,CACpC,yBAA0B,CAH1B,OAcD,CAEA,uCA7CD,+BA8CE,qBASF,CAPE,qCACC,cAAe,CAGf,YAAc,CAFd,SAAU,CACV,UAED,CACD,CAGD,wCACC,GACC,SACD,CAEA,GACC,SACD,CACD,CAEA,wCACC,GACC,SACD,CAEA,GACC,SACD,CACD,CAEA,yCACC,GAGC,QAAS,CAFT,SAAU,CACV,OAED,CACA,IAEC,QAAS,CADT,UAED,CACA,GAGC,YAAc,CAFd,SAAU,CACV,UAED,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-image-upload-complete-icon {
	display: block;
	position: absolute;

	/*
	 * Smaller images should have the icon closer to the border.
	 * Match the icon position with the linked image indicator brought by the link image feature.
	 */
	top: min(var(--ck-spacing-medium), 6%);
	right: min(var(--ck-spacing-medium), 6%);
	border-radius: 50%;
	z-index: 1;

	&::after {
		content: "";
		position: absolute;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-image-upload-icon: hsl(0, 0%, 100%);
	--ck-color-image-upload-icon-background: hsl(120, 100%, 27%);

	/* Match the icon size with the linked image indicator brought by the link image feature. */
	--ck-image-upload-icon-size: 20;
	--ck-image-upload-icon-width: 2px;
	--ck-image-upload-icon-is-visible: clamp(0px, 100% - 50px, 1px);
}

.ck-image-upload-complete-icon {
	opacity: 0;
	background: var(--ck-color-image-upload-icon-background);
	animation-name: ck-upload-complete-icon-show, ck-upload-complete-icon-hide;
	animation-fill-mode: forwards, forwards;
	animation-duration: 500ms, 500ms;

	/* To make animation scalable. */
	font-size: calc(1px * var(--ck-image-upload-icon-size));

	/* Hide completed upload icon after 3 seconds. */
	animation-delay: 0ms, 3000ms;

	/*
	 * Use CSS math to simulate container queries.
	 * https://css-tricks.com/the-raven-technique-one-step-closer-to-container-queries/#what-about-showing-and-hiding-things
	 */
	overflow: hidden;
	width: calc(var(--ck-image-upload-icon-is-visible) * var(--ck-image-upload-icon-size));
	height: calc(var(--ck-image-upload-icon-is-visible) * var(--ck-image-upload-icon-size));

	/* This is check icon element made from border-width mixed with animations. */
	&::after {
		/* Because of border transformation we need to "hard code" left position. */
		left: 25%;

		top: 50%;
		opacity: 0;
		height: 0;
		width: 0;

		transform: scaleX(-1) rotate(135deg);
		transform-origin: left top;
		border-top: var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);
		border-right: var(--ck-image-upload-icon-width) solid var(--ck-color-image-upload-icon);

		animation-name: ck-upload-complete-icon-check;
		animation-duration: 500ms;
		animation-delay: 500ms;
		animation-fill-mode: forwards;

		/* #1095. While reset is not providing proper box-sizing for pseudoelements, we need to handle it. */
		box-sizing: border-box;
	}

	@media (prefers-reduced-motion: reduce) {
		animation-duration: 0ms;

		&::after {
			animation: none;
			opacity: 1;
			width: 0.3em;
			height: 0.45em;
		}
	}
}

@keyframes ck-upload-complete-icon-show {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes ck-upload-complete-icon-hide {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}

@keyframes ck-upload-complete-icon-check {
	0% {
		opacity: 1;
		width: 0;
		height: 0;
	}
	33% {
		width: 0.3em;
		height: 0;
	}
	100% {
		opacity: 1;
		width: 0.3em;
		height: 0.45em;
	}
}
`],sourceRoot:""}]);const w=k},1559:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck .ck-upload-placeholder-loader{align-items:center;display:flex;justify-content:center;left:0;position:absolute;top:0}.ck .ck-upload-placeholder-loader:before{content:"";position:relative}:root{--ck-color-upload-placeholder-loader:#b3b3b3;--ck-upload-placeholder-loader-size:32px;--ck-upload-placeholder-image-aspect-ratio:2.8}.ck .ck-image-upload-placeholder{margin:0;width:100%}.ck .ck-image-upload-placeholder.image-inline{width:calc(var(--ck-upload-placeholder-loader-size)*2*var(--ck-upload-placeholder-image-aspect-ratio))}.ck .ck-image-upload-placeholder img{aspect-ratio:var(--ck-upload-placeholder-image-aspect-ratio)}.ck .ck-upload-placeholder-loader{height:100%;width:100%}.ck .ck-upload-placeholder-loader:before{animation:ck-upload-placeholder-loader 1s linear infinite;border-radius:50%;border-right:2px solid transparent;border-top:3px solid var(--ck-color-upload-placeholder-loader);height:var(--ck-upload-placeholder-loader-size);width:var(--ck-upload-placeholder-loader-size)}@keyframes ck-upload-placeholder-loader{to{transform:rotate(1turn)}}',"",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageuploadloader.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-image/imageuploadloader.css"],names:[],mappings:"AAKA,kCAGC,kBAAmB,CADnB,YAAa,CAEb,sBAAuB,CAEvB,MAAO,CALP,iBAAkB,CAIlB,KAOD,CAJC,yCACC,UAAW,CACX,iBACD,CCXD,MACC,4CAAqD,CACrD,wCAAyC,CACzC,8CACD,CAEA,iCAGC,QAAS,CADT,UAgBD,CAbC,8CACC,sGACD,CAEA,qCAOC,4DACD,CAGD,kCAEC,WAAY,CADZ,UAWD,CARC,yCAMC,yDAA0D,CAH1D,iBAAkB,CAElB,kCAAmC,CADnC,8DAA+D,CAF/D,+CAAgD,CADhD,8CAMD,CAGD,wCACC,GACC,uBACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-upload-placeholder-loader {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;

	&::before {
		content: '';
		position: relative;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-upload-placeholder-loader: hsl(0, 0%, 70%);
	--ck-upload-placeholder-loader-size: 32px;
	--ck-upload-placeholder-image-aspect-ratio: 2.8;
}

.ck .ck-image-upload-placeholder {
	/* We need to control the full width of the SVG gray background. */
	width: 100%;
	margin: 0;

	&.image-inline {
		width: calc( 2 * var(--ck-upload-placeholder-loader-size) * var(--ck-upload-placeholder-image-aspect-ratio) );
	}

	& img {
		/*
		 * This is an arbitrary aspect for a 1x1 px GIF to display to the user. Not too tall, not too short.
		 * There's nothing special about this number except that it should make the image placeholder look like
		 * a real image during this short period after the upload started and before the image was read from the
		 * file system (and a rich preview was loaded).
		 */
		aspect-ratio: var(--ck-upload-placeholder-image-aspect-ratio);
	}
}

.ck .ck-upload-placeholder-loader {
	width: 100%;
	height: 100%;

	&::before {
		width: var(--ck-upload-placeholder-loader-size);
		height: var(--ck-upload-placeholder-loader-size);
		border-radius: 50%;
		border-top: 3px solid var(--ck-color-upload-placeholder-loader);
		border-right: 2px solid transparent;
		animation: ck-upload-placeholder-loader 1s linear infinite;
	}
}

@keyframes ck-upload-placeholder-loader {
	to {
		transform: rotate( 360deg );
	}
}
`],sourceRoot:""}]);const w=k},2267:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-editor__editable .image,.ck.ck-editor__editable .image-inline{position:relative}.ck.ck-editor__editable .image .ck-progress-bar,.ck.ck-editor__editable .image-inline .ck-progress-bar{left:0;position:absolute;top:0}.ck.ck-editor__editable .image-inline.ck-appear,.ck.ck-editor__editable .image.ck-appear{animation:fadeIn .7s}@media (prefers-reduced-motion:reduce){.ck.ck-editor__editable .image-inline.ck-appear,.ck.ck-editor__editable .image.ck-appear{animation:none;opacity:1}}.ck.ck-editor__editable .image .ck-progress-bar,.ck.ck-editor__editable .image-inline .ck-progress-bar{background:var(--ck-color-upload-bar-background);height:2px;transition:width .1s;width:0}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/imageuploadprogress.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-image/imageuploadprogress.css"],names:[],mappings:"AAMC,qEAEC,iBACD,CAGA,uGAIC,MAAO,CAFP,iBAAkB,CAClB,KAED,CCRC,yFACC,oBAMD,CAJC,uCAHD,yFAKE,cAAe,CADf,SAGF,CADC,CAKF,uGAIC,gDAAiD,CAFjD,UAAW,CAGX,oBAAuB,CAFvB,OAGD,CAGD,kBACC,GAAO,SAAY,CACnB,GAAO,SAAY,CACpB",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor__editable {
	& .image,
	& .image-inline {
		position: relative;
	}

	/* Upload progress bar. */
	& .image .ck-progress-bar,
	& .image-inline .ck-progress-bar {
		position: absolute;
		top: 0;
		left: 0;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor__editable {
	& .image,
	& .image-inline {
		/* Showing animation. */
		&.ck-appear {
			animation: fadeIn 700ms;

			@media (prefers-reduced-motion: reduce) {
				opacity: 1;
				animation: none;
			}
		}
	}

	/* Upload progress bar. */
	& .image .ck-progress-bar,
	& .image-inline .ck-progress-bar {
		height: 2px;
		width: 0;
		background: var(--ck-color-upload-bar-background);
		transition: width 100ms;
	}
}

@keyframes fadeIn {
	from { opacity: 0; }
	to   { opacity: 1; }
}
`],sourceRoot:""}]);const w=k},4062:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-text-alternative-form{display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-text-alternative-form .ck-labeled-field-view{display:inline-block}.ck.ck-text-alternative-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-text-alternative-form{flex-wrap:wrap}.ck.ck-text-alternative-form .ck-labeled-field-view{flex-basis:100%}.ck.ck-text-alternative-form .ck-button{flex-basis:50%}}","",{version:3,sources:["webpack://./../ckeditor5-image/theme/textalternativeform.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css"],names:[],mappings:"AAOA,6BACC,YAAa,CACb,kBAAmB,CACnB,gBAqBD,CAnBC,oDACC,oBACD,CAEA,uCACC,YACD,CCZA,oCDCD,6BAcE,cAUF,CARE,oDACC,eACD,CAEA,wCACC,cACD,CCrBD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-text-alternative-form {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	& .ck-labeled-field-view {
		display: inline-block;
	}

	& .ck-label {
		display: none;
	}

	@mixin ck-media-phone {
		flex-wrap: wrap;

		& .ck-labeled-field-view {
			flex-basis: 100%;
		}

		& .ck-button {
			flex-basis: 50%;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},7719:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-link_selected{background:var(--ck-color-link-selected-background)}.ck .ck-link_selected span.image-inline{outline:var(--ck-widget-outline-thickness) solid var(--ck-color-link-selected-background)}.ck .ck-fake-link-selection{background:var(--ck-color-link-fake-selection)}.ck .ck-fake-link-selection_collapsed{border-right:1px solid var(--ck-color-base-text);height:100%;margin-right:-1px;outline:1px solid hsla(0,0%,100%,.5)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-link/link.css"],names:[],mappings:"AAMA,sBACC,mDAMD,CAHC,wCACC,yFACD,CAOD,4BACC,8CACD,CAGA,sCAEC,gDAAiD,CADjD,WAAY,CAEZ,iBAAkB,CAClB,oCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* Class added to span element surrounding currently selected link. */
.ck .ck-link_selected {
	background: var(--ck-color-link-selected-background);

	/* Give linked inline images some outline to let the user know they are also part of the link. */
	& span.image-inline {
		outline: var(--ck-widget-outline-thickness) solid var(--ck-color-link-selected-background);
	}
}

/*
 * Classes used by the "fake visual selection" displayed in the content when an input
 * in the link UI has focus (the browser does not render the native selection in this state).
 */
.ck .ck-fake-link-selection {
	background: var(--ck-color-link-fake-selection);
}

/* A collapsed fake visual selection. */
.ck .ck-fake-link-selection_collapsed {
	height: 100%;
	border-right: 1px solid var(--ck-color-base-text);
	margin-right: -1px;
	outline: solid 1px hsla(0, 0%, 100%, .5);
}
`],sourceRoot:""}]);const w=k},8762:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-link-actions{display:flex;flex-direction:row;flex-wrap:nowrap}.ck.ck-link-actions .ck-link-actions__preview{display:inline-block}.ck.ck-link-actions .ck-link-actions__preview .ck-button__label{overflow:hidden}@media screen and (max-width:600px){.ck.ck-link-actions{flex-wrap:wrap}.ck.ck-link-actions .ck-link-actions__preview{flex-basis:100%}.ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){flex-basis:50%}}.ck.ck-link-actions .ck-button.ck-link-actions__preview{padding-left:0;padding-right:0}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{color:var(--ck-color-link-default);cursor:pointer;max-width:var(--ck-input-width);min-width:3em;padding:0 var(--ck-spacing-medium);text-align:center;text-overflow:ellipsis}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label:hover{text-decoration:underline}.ck.ck-link-actions .ck-button.ck-link-actions__preview,.ck.ck-link-actions .ck-button.ck-link-actions__preview:active,.ck.ck-link-actions .ck-button.ck-link-actions__preview:focus,.ck.ck-link-actions .ck-button.ck-link-actions__preview:hover{background:none}.ck.ck-link-actions .ck-button.ck-link-actions__preview:active{box-shadow:none}.ck.ck-link-actions .ck-button.ck-link-actions__preview:focus .ck-button__label{text-decoration:underline}[dir=ltr] .ck.ck-link-actions .ck-button:not(:first-child),[dir=rtl] .ck.ck-link-actions .ck-button:not(:last-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-link-actions .ck-button.ck-link-actions__preview{margin:var(--ck-spacing-standard) var(--ck-spacing-standard) 0}.ck.ck-link-actions .ck-button.ck-link-actions__preview .ck-button__label{max-width:100%;min-width:0}[dir=ltr] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview),[dir=rtl] .ck.ck-link-actions .ck-button:not(.ck-link-actions__preview){margin-left:0}}","",{version:3,sources:["webpack://./../ckeditor5-link/theme/linkactions.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-link/linkactions.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAOA,oBACC,YAAa,CACb,kBAAmB,CACnB,gBAqBD,CAnBC,8CACC,oBAKD,CAHC,gEACC,eACD,CCXD,oCDCD,oBAcE,cAUF,CARE,8CACC,eACD,CAEA,8DACC,cACD,CCrBD,CCIA,wDACC,cAAe,CACf,eAmCD,CAjCC,0EAEC,kCAAmC,CAEnC,cAAe,CAIf,+BAAgC,CAChC,aAAc,CARd,kCAAmC,CASnC,iBAAkB,CAPlB,sBAYD,CAHC,gFACC,yBACD,CAGD,mPAIC,eACD,CAEA,+DACC,eACD,CAGC,gFACC,yBACD,CAWD,qHACC,sCACD,CDtDD,oCC0DC,wDACC,8DAMD,CAJC,0EAEC,cAAe,CADf,WAED,CChEF,gJDyEG,aCvEH,CFAA",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-link-actions {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	& .ck-link-actions__preview {
		display: inline-block;

		& .ck-button__label {
			overflow: hidden;
		}
	}

	@mixin ck-media-phone {
		flex-wrap: wrap;

		& .ck-link-actions__preview {
			flex-basis: 100%;
		}

		& .ck-button:not(.ck-link-actions__preview) {
			flex-basis: 50%;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_unselectable.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";
@import "../mixins/_focus.css";
@import "../mixins/_shadow.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-link-actions {
	& .ck-button.ck-link-actions__preview {
		padding-left: 0;
		padding-right: 0;

		& .ck-button__label {
			padding: 0 var(--ck-spacing-medium);
			color: var(--ck-color-link-default);
			text-overflow: ellipsis;
			cursor: pointer;

			/* Match the box model of the link editor form's input so the balloon
			does not change width when moving between actions and the form. */
			max-width: var(--ck-input-width);
			min-width: 3em;
			text-align: center;

			&:hover {
				text-decoration: underline;
			}
		}

		&,
		&:hover,
		&:focus,
		&:active {
			background: none;
		}

		&:active {
			box-shadow: none;
		}

		&:focus {
			& .ck-button__label {
				text-decoration: underline;
			}
		}
	}

	@mixin ck-dir ltr {
		& .ck-button:not(:first-child) {
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-dir rtl {
		& .ck-button:not(:last-child) {
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-media-phone {
		& .ck-button.ck-link-actions__preview {
			margin: var(--ck-spacing-standard) var(--ck-spacing-standard) 0;

			& .ck-button__label {
				min-width: 0;
				max-width: 100%;
			}
		}

		& .ck-button:not(.ck-link-actions__preview) {
			@mixin ck-dir ltr {
				margin-left: 0;
			}

			@mixin ck-dir rtl {
				margin-left: 0;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},3817:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-link-form{align-items:flex-start;display:flex}.ck.ck-link-form .ck-label{display:none}@media screen and (max-width:600px){.ck.ck-link-form{flex-wrap:wrap}.ck.ck-link-form .ck-labeled-field-view{flex-basis:100%}.ck.ck-link-form .ck-button{flex-basis:50%}}.ck.ck-link-form_layout-vertical{display:block}.ck.ck-link-form_layout-vertical .ck-button.ck-button-cancel,.ck.ck-link-form_layout-vertical .ck-button.ck-button-save{margin-top:var(--ck-spacing-medium)}.ck.ck-link-form_layout-vertical{min-width:var(--ck-input-width);padding:0}.ck.ck-link-form_layout-vertical .ck-labeled-field-view{margin:var(--ck-spacing-large) var(--ck-spacing-large) var(--ck-spacing-small)}.ck.ck-link-form_layout-vertical .ck-labeled-field-view .ck-input-text{min-width:0;width:100%}.ck.ck-link-form_layout-vertical>.ck-button{border-radius:0;margin:0;padding:var(--ck-spacing-standard);width:50%}.ck.ck-link-form_layout-vertical>.ck-button:not(:focus){border-top:1px solid var(--ck-color-base-border)}[dir=ltr] .ck.ck-link-form_layout-vertical>.ck-button,[dir=rtl] .ck.ck-link-form_layout-vertical>.ck-button{margin-left:0}[dir=rtl] .ck.ck-link-form_layout-vertical>.ck-button:last-of-type{border-right:1px solid var(--ck-color-base-border)}.ck.ck-link-form_layout-vertical .ck.ck-list{margin:0 var(--ck-spacing-large)}.ck.ck-link-form_layout-vertical .ck.ck-list .ck-button.ck-switchbutton{padding:0;width:100%}.ck.ck-link-form_layout-vertical .ck.ck-list .ck-button.ck-switchbutton:hover{background:none}","",{version:3,sources:["webpack://./../ckeditor5-link/theme/linkform.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-link/linkform.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAOA,iBAEC,sBAAuB,CADvB,YAkBD,CAfC,2BACC,YACD,CCPA,oCDCD,iBASE,cAUF,CARE,wCACC,eACD,CAEA,4BACC,cACD,CChBD,CDwBD,iCACC,aAYD,CALE,wHAEC,mCACD,CEhCF,iCAEC,+BAAgC,CADhC,SAgDD,CA7CC,wDACC,8EAMD,CAJC,uEACC,WAAY,CACZ,UACD,CAGD,4CAIC,eAAgB,CAFhB,QAAS,CADT,kCAAmC,CAEnC,SAkBD,CAfC,wDACC,gDACD,CC1BD,4GDiCE,aC/BF,CDiCE,mEACC,kDACD,CAKF,6CACC,gCAUD,CARC,wEACC,SAAU,CACV,UAKD,CAHC,8EACC,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-link-form {
	display: flex;
	align-items: flex-start;

	& .ck-label {
		display: none;
	}

	@mixin ck-media-phone {
		flex-wrap: wrap;

		& .ck-labeled-field-view {
			flex-basis: 100%;
		}

		& .ck-button {
			flex-basis: 50%;
		}
	}
}

/*
 * Style link form differently when manual decorators are available.
 * See: https://github.com/ckeditor/ckeditor5-link/issues/186.
 */
.ck.ck-link-form_layout-vertical {
	display: block;

	/*
	 * Whether the form is in the responsive mode or not, if there are decorator buttons
	 * keep the top margin of action buttons medium.
	 */
	& .ck-button {
		&.ck-button-save,
		&.ck-button-cancel {
			margin-top: var(--ck-spacing-medium);
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

/*
 * Style link form differently when manual decorators are available.
 * See: https://github.com/ckeditor/ckeditor5-link/issues/186.
 */
.ck.ck-link-form_layout-vertical {
	padding: 0;
	min-width: var(--ck-input-width);

	& .ck-labeled-field-view {
		margin: var(--ck-spacing-large) var(--ck-spacing-large) var(--ck-spacing-small);

		& .ck-input-text {
			min-width: 0;
			width: 100%;
		}
	}

	& > .ck-button {
		padding: var(--ck-spacing-standard);
		margin: 0;
		width: 50%;
		border-radius: 0;

		&:not(:focus) {
			border-top: 1px solid var(--ck-color-base-border);
		}

		@mixin ck-dir ltr {
			margin-left: 0;
		}

		@mixin ck-dir rtl {
			margin-left: 0;

			&:last-of-type {
				border-right: 1px solid var(--ck-color-base-border);
			}
		}
	}

	/* Using additional \`.ck\` class for stronger CSS specificity than \`.ck.ck-link-form > :not(:first-child)\`. */
	& .ck.ck-list {
		margin: 0 var(--ck-spacing-large);

		& .ck-button.ck-switchbutton {
			padding: 0;
			width: 100%;

			&:hover {
				background: none;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},4808:(y,A,g)=>{g.d(A,{A:()=>z});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_),w=g(62),D=g.n(w),S=new URL(g(4782),g.b),B=k()(v()),O=D()(S);B.push([y.id,`.ck.ck-editor__editable a span.image-inline:after,.ck.ck-editor__editable figure.image>a:after{display:block;position:absolute}:root{--ck-link-image-indicator-icon-size:20;--ck-link-image-indicator-icon-is-visible:clamp(0px,100% - 50px,1px)}.ck.ck-editor__editable a span.image-inline:after,.ck.ck-editor__editable figure.image>a:after{background-color:rgba(0,0,0,.4);background-image:url(${O});background-position:50%;background-repeat:no-repeat;background-size:14px;border-radius:100%;content:"";height:calc(var(--ck-link-image-indicator-icon-is-visible)*var(--ck-link-image-indicator-icon-size));overflow:hidden;right:min(var(--ck-spacing-medium),6%);top:min(var(--ck-spacing-medium),6%);width:calc(var(--ck-link-image-indicator-icon-is-visible)*var(--ck-link-image-indicator-icon-size))}`,"",{version:3,sources:["webpack://./../ckeditor5-link/theme/linkimage.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-link/linkimage.css"],names:[],mappings:"AASE,+FACC,aAAc,CACd,iBACD,CCPF,MAEC,sCAAuC,CACvC,oEACD,CAME,+FAUC,+BAAqC,CACrC,wDAA+3B,CAG/3B,uBAA2B,CAD3B,2BAA4B,CAD5B,oBAAqB,CAGrB,kBAAmB,CAdnB,UAAW,CAsBX,oGAAuG,CAFvG,eAAgB,CAbhB,sCAAwC,CADxC,oCAAsC,CAetC,mGAED",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-editor__editable {
	/* Linked image indicator */
	& figure.image > a,
	& a span.image-inline {
		&::after {
			display: block;
			position: absolute;
		}
	}
}

`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/* Match the icon size with the upload indicator brought by the image upload feature. */
	--ck-link-image-indicator-icon-size: 20;
	--ck-link-image-indicator-icon-is-visible: clamp(0px, 100% - 50px, 1px);
}

.ck.ck-editor__editable {
	/* Linked image indicator */
	& figure.image > a,
	& a span.image-inline {
		&::after {
			content: "";

			/*
			 * Smaller images should have the icon closer to the border.
			 * Match the icon position with the upload indicator brought by the image upload feature.
			 */
			top: min(var(--ck-spacing-medium), 6%);
			right: min(var(--ck-spacing-medium), 6%);

			background-color: hsla(0, 0%, 0%, .4);
			background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTExLjA3NyAxNSAuOTkxLTEuNDE2YS43NS43NSAwIDEgMSAxLjIyOS44NmwtMS4xNDggMS42NGEuNzQ4Ljc0OCAwIDAgMS0uMjE3LjIwNiA1LjI1MSA1LjI1MSAwIDAgMS04LjUwMy01Ljk1NS43NDEuNzQxIDAgMCAxIC4xMi0uMjc0bDEuMTQ3LTEuNjM5YS43NS43NSAwIDEgMSAxLjIyOC44Nkw0LjkzMyAxMC43bC4wMDYuMDAzYTMuNzUgMy43NSAwIDAgMCA2LjEzMiA0LjI5NGwuMDA2LjAwNHptNS40OTQtNS4zMzVhLjc0OC43NDggMCAwIDEtLjEyLjI3NGwtMS4xNDcgMS42MzlhLjc1Ljc1IDAgMSAxLTEuMjI4LS44NmwuODYtMS4yM2EzLjc1IDMuNzUgMCAwIDAtNi4xNDQtNC4zMDFsLS44NiAxLjIyOWEuNzUuNzUgMCAwIDEtMS4yMjktLjg2bDEuMTQ4LTEuNjRhLjc0OC43NDggMCAwIDEgLjIxNy0uMjA2IDUuMjUxIDUuMjUxIDAgMCAxIDguNTAzIDUuOTU1em0tNC41NjMtMi41MzJhLjc1Ljc1IDAgMCAxIC4xODQgMS4wNDVsLTMuMTU1IDQuNTA1YS43NS43NSAwIDEgMS0xLjIyOS0uODZsMy4xNTUtNC41MDZhLjc1Ljc1IDAgMCAxIDEuMDQ1LS4xODR6Ii8+PC9zdmc+");
			background-size: 14px;
			background-repeat: no-repeat;
			background-position: center;
			border-radius: 100%;

			/*
			* Use CSS math to simulate container queries.
			* https://css-tricks.com/the-raven-technique-one-step-closer-to-container-queries/#what-about-showing-and-hiding-things
			*/
			overflow: hidden;
			width: calc(var(--ck-link-image-indicator-icon-is-visible) * var(--ck-link-image-indicator-icon-size));
			height: calc(var(--ck-link-image-indicator-icon-is-visible) * var(--ck-link-image-indicator-icon-size));
		}
	}
}

`],sourceRoot:""}]);const z=B},1232:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-editor__editable .ck-list-bogus-paragraph{display:block}","",{version:3,sources:["webpack://./../ckeditor5-list/theme/documentlist.css"],names:[],mappings:"AAKA,8CACC,aACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-editor__editable .ck-list-bogus-paragraph {
	display: block;
}
`],sourceRoot:""}]);const w=k},6903:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content ol{list-style-type:decimal}.ck-content ol ol{list-style-type:lower-latin}.ck-content ol ol ol{list-style-type:lower-roman}.ck-content ol ol ol ol{list-style-type:upper-latin}.ck-content ol ol ol ol ol{list-style-type:upper-roman}.ck-content ul{list-style-type:disc}.ck-content ul ul{list-style-type:circle}.ck-content ul ul ul,.ck-content ul ul ul ul{list-style-type:square}","",{version:3,sources:["webpack://./../ckeditor5-list/theme/list.css"],names:[],mappings:"AAKA,eACC,uBAiBD,CAfC,kBACC,2BAaD,CAXC,qBACC,2BASD,CAPC,wBACC,2BAKD,CAHC,2BACC,2BACD,CAMJ,eACC,oBAaD,CAXC,kBACC,sBASD,CAJE,6CACC,sBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content ol {
	list-style-type: decimal;

	& ol {
		list-style-type: lower-latin;

		& ol {
			list-style-type: lower-roman;

			& ol {
				list-style-type: upper-latin;

				& ol {
					list-style-type: upper-roman;
				}
			}
		}
	}
}

.ck-content ul {
	list-style-type: disc;

	& ul {
		list-style-type: circle;

		& ul {
			list-style-type: square;

			& ul {
				list-style-type: square;
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},9968:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-list-properties.ck-list-properties_without-styles{padding:var(--ck-spacing-large)}.ck.ck-list-properties.ck-list-properties_without-styles>*{min-width:14em}.ck.ck-list-properties.ck-list-properties_without-styles>*+*{margin-top:var(--ck-spacing-standard)}.ck.ck-list-properties.ck-list-properties_with-numbered-properties>.ck-list-styles-list{grid-template-columns:repeat(4,auto)}.ck.ck-list-properties.ck-list-properties_with-numbered-properties>.ck-collapsible{border-top:1px solid var(--ck-color-base-border)}.ck.ck-list-properties.ck-list-properties_with-numbered-properties>.ck-collapsible>.ck-collapsible__children>*{width:100%}.ck.ck-list-properties.ck-list-properties_with-numbered-properties>.ck-collapsible>.ck-collapsible__children>*+*{margin-top:var(--ck-spacing-standard)}.ck.ck-list-properties .ck.ck-numbered-list-properties__start-index .ck-input{min-width:auto;width:100%}.ck.ck-list-properties .ck.ck-numbered-list-properties__reversed-order{background:transparent;margin-bottom:calc(var(--ck-spacing-tiny)*-1);padding-left:0;padding-right:0}.ck.ck-list-properties .ck.ck-numbered-list-properties__reversed-order:active,.ck.ck-list-properties .ck.ck-numbered-list-properties__reversed-order:hover{background:none;border-color:transparent;box-shadow:none}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-list/listproperties.css"],names:[],mappings:"AAOC,yDACC,+BASD,CAPC,2DACC,cAKD,CAHC,6DACC,qCACD,CASD,wFACC,oCACD,CAGA,mFACC,gDAWD,CARE,+GACC,UAKD,CAHC,iHACC,qCACD,CAMJ,8EACC,cAAe,CACf,UACD,CAEA,uEACC,sBAAuB,CAGvB,6CAAgD,CAFhD,cAAe,CACf,eAQD,CALC,2JAGC,eAAgB,CADhB,wBAAyB,CADzB,eAGD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-list-properties {
	/* When there are no list styles and there is no collapsible. */
	&.ck-list-properties_without-styles {
		padding: var(--ck-spacing-large);

		& > * {
			min-width: 14em;

			& + * {
				margin-top: var(--ck-spacing-standard);
			}
		}
	}

	/*
	 * When the numbered list property fields (start at, reversed) should be displayed,
	 * more horizontal space is needed. Reconfigure the style grid to create that space.
	 */
	&.ck-list-properties_with-numbered-properties {
		& > .ck-list-styles-list {
			grid-template-columns: repeat( 4, auto );
		}

		/* When list styles are rendered and property fields are in a collapsible. */
		& > .ck-collapsible {
			border-top: 1px solid var(--ck-color-base-border);

			& > .ck-collapsible__children {
				& > * {
					width: 100%;

					& + * {
						margin-top: var(--ck-spacing-standard);
					}
				}
			}
		}
	}

	& .ck.ck-numbered-list-properties__start-index .ck-input {
		min-width: auto;
		width: 100%;
	}

	& .ck.ck-numbered-list-properties__reversed-order {
		background: transparent;
		padding-left: 0;
		padding-right: 0;
		margin-bottom: calc(-1 * var(--ck-spacing-tiny));

		&:active, &:hover {
			box-shadow: none;
			border-color: transparent;
			background: none;
		}
	}
}
`],sourceRoot:""}]);const w=k},7141:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-list-styles-list{display:grid}:root{--ck-list-style-button-size:44px}.ck.ck-list-styles-list{column-gap:var(--ck-spacing-medium);grid-template-columns:repeat(3,auto);padding:var(--ck-spacing-large);row-gap:var(--ck-spacing-medium)}.ck.ck-list-styles-list .ck-button{box-sizing:content-box;margin:0;padding:0}.ck.ck-list-styles-list .ck-button,.ck.ck-list-styles-list .ck-button .ck-icon{height:var(--ck-list-style-button-size);width:var(--ck-list-style-button-size)}","",{version:3,sources:["webpack://./../ckeditor5-list/theme/liststyles.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-list/liststyles.css"],names:[],mappings:"AAKA,wBACC,YACD,CCFA,MACC,gCACD,CAEA,wBAGC,mCAAoC,CAFpC,oCAAwC,CAGxC,+BAAgC,CAFhC,gCA4BD,CAxBC,mCAiBC,sBAAuB,CAPvB,QAAS,CANT,SAmBD,CAJC,+EAhBA,uCAAwC,CADxC,sCAoBA",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-list-styles-list {
	display: grid;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-list-style-button-size: 44px;
}

.ck.ck-list-styles-list {
	grid-template-columns: repeat( 3, auto );
	row-gap: var(--ck-spacing-medium);
	column-gap: var(--ck-spacing-medium);
	padding: var(--ck-spacing-large);

	& .ck-button {
		/* Make the button look like a thumbnail (the icon "takes it all"). */
		width: var(--ck-list-style-button-size);
		height: var(--ck-list-style-button-size);
		padding: 0;

		/*
		 * Buttons are aligned by the grid so disable default button margins to not collide with the
		 * gaps in the grid.
		 */
		margin: 0;

		/*
		 * Make sure the button border (which is displayed on focus, BTW) does not steal pixels
		 * from the button dimensions and, as a result, decrease the size of the icon
		 * (which becomes blurry as it scales down).
		 */
		box-sizing: content-box;

		& .ck-icon {
			width: var(--ck-list-style-button-size);
			height: var(--ck-list-style-button-size);
		}
	}
}
`],sourceRoot:""}]);const w=k},8991:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,':root{--ck-todo-list-checkmark-size:16px}.ck-content .todo-list{list-style:none}.ck-content .todo-list li{margin-bottom:5px;position:relative}.ck-content .todo-list li .todo-list{margin-top:5px}.ck-content .todo-list .todo-list__label>input{-webkit-appearance:none;border:0;display:inline-block;height:var(--ck-todo-list-checkmark-size);left:-25px;margin-left:0;margin-right:-15px;position:relative;right:0;vertical-align:middle;width:var(--ck-todo-list-checkmark-size)}.ck-content[dir=rtl] .todo-list .todo-list__label>input{left:0;margin-left:-15px;margin-right:0;right:-25px}.ck-content .todo-list .todo-list__label>input:before{border:1px solid #333;border-radius:2px;box-sizing:border-box;content:"";display:block;height:100%;position:absolute;transition:box-shadow .25s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.ck-content .todo-list .todo-list__label>input:before{transition:none}}.ck-content .todo-list .todo-list__label>input:after{border-color:transparent;border-style:solid;border-width:0 calc(var(--ck-todo-list-checkmark-size)/8) calc(var(--ck-todo-list-checkmark-size)/8) 0;box-sizing:content-box;content:"";display:block;height:calc(var(--ck-todo-list-checkmark-size)/2.6);left:calc(var(--ck-todo-list-checkmark-size)/3);pointer-events:none;position:absolute;top:calc(var(--ck-todo-list-checkmark-size)/5.3);transform:rotate(45deg);width:calc(var(--ck-todo-list-checkmark-size)/5.3)}.ck-content .todo-list .todo-list__label>input[checked]:before{background:#26ab33;border-color:#26ab33}.ck-content .todo-list .todo-list__label>input[checked]:after{border-color:#fff}.ck-content .todo-list .todo-list__label .todo-list__label__description{vertical-align:middle}.ck-content .todo-list .todo-list__label.todo-list__label_without-description input[type=checkbox]{position:absolute}.ck-editor__editable.ck-content .todo-list .todo-list__label>input,.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input{cursor:pointer}.ck-editor__editable.ck-content .todo-list .todo-list__label>input:hover:before,.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input:hover:before{box-shadow:0 0 0 5px rgba(0,0,0,.1)}.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input{-webkit-appearance:none;border:0;display:inline-block;height:var(--ck-todo-list-checkmark-size);left:-25px;margin-left:0;margin-right:-15px;position:relative;right:0;vertical-align:middle;width:var(--ck-todo-list-checkmark-size)}.ck-editor__editable.ck-content[dir=rtl] .todo-list .todo-list__label>span[contenteditable=false]>input{left:0;margin-left:-15px;margin-right:0;right:-25px}.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input:before{border:1px solid #333;border-radius:2px;box-sizing:border-box;content:"";display:block;height:100%;position:absolute;transition:box-shadow .25s ease-in-out;width:100%}@media (prefers-reduced-motion:reduce){.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input:before{transition:none}}.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input:after{border-color:transparent;border-style:solid;border-width:0 calc(var(--ck-todo-list-checkmark-size)/8) calc(var(--ck-todo-list-checkmark-size)/8) 0;box-sizing:content-box;content:"";display:block;height:calc(var(--ck-todo-list-checkmark-size)/2.6);left:calc(var(--ck-todo-list-checkmark-size)/3);pointer-events:none;position:absolute;top:calc(var(--ck-todo-list-checkmark-size)/5.3);transform:rotate(45deg);width:calc(var(--ck-todo-list-checkmark-size)/5.3)}.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input[checked]:before{background:#26ab33;border-color:#26ab33}.ck-editor__editable.ck-content .todo-list .todo-list__label>span[contenteditable=false]>input[checked]:after{border-color:#fff}.ck-editor__editable.ck-content .todo-list .todo-list__label.todo-list__label_without-description input[type=checkbox]{position:absolute}',"",{version:3,sources:["webpack://./../ckeditor5-list/theme/todolist.css"],names:[],mappings:"AAKA,MACC,kCACD,CA4EA,uBACC,eAwBD,CAtBC,0BAEC,iBAAkB,CADlB,iBAMD,CAHC,qCACC,cACD,CAIA,+CAtFD,uBAAwB,CAQxB,QAAS,CAPT,oBAAqB,CAGrB,yCAA0C,CAO1C,UAAW,CAGX,aAAc,CAFd,kBAAmB,CAVnB,iBAAkB,CAWlB,OAAQ,CARR,qBAAsB,CAFtB,wCAqFC,CAvED,wDACC,MAAO,CAGP,iBAAkB,CAFlB,cAAe,CACf,WAED,CAEA,sDAOC,qBAAiC,CACjC,iBAAkB,CALlB,qBAAsB,CACtB,UAAW,CAHX,aAAc,CAKd,WAAY,CAJZ,iBAAkB,CAOlB,sCAAwC,CAJxC,UASD,CAHC,uCAXD,sDAYE,eAEF,CADC,CAGD,qDAaC,wBAAyB,CADzB,kBAAmB,CAEnB,sGAA+G,CAX/G,sBAAuB,CAEvB,UAAW,CAJX,aAAc,CAUd,mDAAwD,CAHxD,+CAAoD,CAJpD,mBAAoB,CAFpB,iBAAkB,CAOlB,gDAAqD,CAMrD,uBAAwB,CALxB,kDAMD,CAGC,+DACC,kBAA8B,CAC9B,oBACD,CAEA,8DACC,iBACD,CAwBA,wEACC,qBACD,CAEA,mGACC,iBACD,CAYD,kKAEC,cAKD,CAHC,4LACC,mCACD,CAMD,+FAxHA,uBAAwB,CAQxB,QAAS,CAPT,oBAAqB,CAGrB,yCAA0C,CAO1C,UAAW,CAGX,aAAc,CAFd,kBAAmB,CAVnB,iBAAkB,CAWlB,OAAQ,CARR,qBAAsB,CAFtB,wCAuHA,CAzGA,wGACC,MAAO,CAGP,iBAAkB,CAFlB,cAAe,CACf,WAED,CAEA,sGAOC,qBAAiC,CACjC,iBAAkB,CALlB,qBAAsB,CACtB,UAAW,CAHX,aAAc,CAKd,WAAY,CAJZ,iBAAkB,CAOlB,sCAAwC,CAJxC,UASD,CAHC,uCAXD,sGAYE,eAEF,CADC,CAGD,qGAaC,wBAAyB,CADzB,kBAAmB,CAEnB,sGAA+G,CAX/G,sBAAuB,CAEvB,UAAW,CAJX,aAAc,CAUd,mDAAwD,CAHxD,+CAAoD,CAJpD,mBAAoB,CAFpB,iBAAkB,CAOlB,gDAAqD,CAMrD,uBAAwB,CALxB,kDAMD,CAGC,+GACC,kBAA8B,CAC9B,oBACD,CAEA,8GACC,iBACD,CA2DA,uHACC,iBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-todo-list-checkmark-size: 16px;
}

@define-mixin todo-list-checkbox {
	-webkit-appearance: none;
	display: inline-block;
	position: relative;
	width: var(--ck-todo-list-checkmark-size);
	height: var(--ck-todo-list-checkmark-size);
	vertical-align: middle;

	/* Needed on iOS */
	border: 0;

	/* LTR styles */
	left: -25px;
	margin-right: -15px;
	right: 0;
	margin-left: 0;

	/* RTL styles */
	[dir=rtl]& {
		left: 0;
		margin-right: 0;
		right: -25px;
		margin-left: -15px;
	}

	&::before {
		display: block;
		position: absolute;
		box-sizing: border-box;
		content: '';
		width: 100%;
		height: 100%;
		border: 1px solid hsl(0, 0%, 20%);
		border-radius: 2px;
		transition: 250ms ease-in-out box-shadow;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	&::after {
		display: block;
		position: absolute;
		box-sizing: content-box;
		pointer-events: none;
		content: '';

		/* Calculate tick position, size and border-width proportional to the checkmark size. */
		left: calc( var(--ck-todo-list-checkmark-size) / 3 );
		top: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
		width: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
		height: calc( var(--ck-todo-list-checkmark-size) / 2.6 );
		border-style: solid;
		border-color: transparent;
		border-width: 0 calc( var(--ck-todo-list-checkmark-size) / 8 ) calc( var(--ck-todo-list-checkmark-size) / 8 ) 0;
		transform: rotate(45deg);
	}

	&[checked] {
		&::before {
			background: hsl(126, 64%, 41%);
			border-color: hsl(126, 64%, 41%);
		}

		&::after {
			border-color: hsl(0, 0%, 100%);
		}
	}
}

/*
 * To-do list content styles.
 */
.ck-content .todo-list {
	list-style: none;

	& li {
		position: relative;
		margin-bottom: 5px;

		& .todo-list {
			margin-top: 5px;
		}
	}

	& .todo-list__label {
		& > input {
			@mixin todo-list-checkbox;
		}

		& .todo-list__label__description {
			vertical-align: middle;
		}

		&.todo-list__label_without-description input[type=checkbox] {
			position: absolute;
		}
	}
}

/*
 * To-do list editing view styles.
 */
.ck-editor__editable.ck-content .todo-list .todo-list__label {
	/*
	 * To-do list should be interactive only during the editing
	 * (https://github.com/ckeditor/ckeditor5/issues/2090).
	 */
	& > input,
	& > span[contenteditable=false] > input {
		cursor: pointer;

		&:hover::before {
			box-shadow: 0 0 0 5px hsla(0, 0%, 0%, 0.1);
		}
	}

	/*
	 * Document Lists - editing view has an additional span around checkbox.
	 */
	& > span[contenteditable=false] > input {
		@mixin todo-list-checkbox;
	}

	&.todo-list__label_without-description {
		& input[type=checkbox] {
			position: absolute;
		}
	}
}
`],sourceRoot:""}]);const w=k},70:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content .media{clear:both;display:block;margin:.9em 0;min-width:15em}","",{version:3,sources:["webpack://./../ckeditor5-media-embed/theme/mediaembed.css"],names:[],mappings:"AAKA,mBAGC,UAAW,CASX,aAAc,CAJd,aAAe,CAQf,cACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content .media {
	/* Don't allow floated content overlap the media.
	https://github.com/ckeditor/ckeditor5-media-embed/issues/53 */
	clear: both;

	/* Make sure there is some space between the content and the media. */
	/* The first value should be equal to --ck-spacing-large variable if used in the editor context
	to avoid the content jumping (See https://github.com/ckeditor/ckeditor5/issues/9825). */
	margin: 0.9em 0;

	/* Make sure media is not overriden with Bootstrap default \`flex\` value.
	See: https://github.com/ckeditor/ckeditor5/issues/1373. */
	display: block;

	/* Give the media some minimal width in the content to prevent them
	from being "squashed" in tight spaces, e.g. in table cells (#44) */
	min-width: 15em;
}
`],sourceRoot:""}]);const w=k},7048:(y,A,g)=>{g.d(A,{A:()=>Zt});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_),w=g(62),D=g.n(w),S=new URL(g(657),g.b),B=new URL(g(9736),g.b),O=new URL(g(6341),g.b),z=new URL(g(7784),g.b),$=k()(v()),X=D()(S),rt=D()(B),At=D()(O),Vt=D()(z);$.push([y.id,`.ck-media__wrapper .ck-media__placeholder{align-items:center;display:flex;flex-direction:column}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url{max-width:100%;position:relative}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url .ck-media__placeholder__url__text{display:block;overflow:hidden}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="goo.gl/maps"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="google.com/maps"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="maps.app.goo.gl"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="maps.google.com"] .ck-media__placeholder__icon *,.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck-media__placeholder__icon *{display:none}.ck-editor__editable:not(.ck-read-only) .ck-media__wrapper>:not(.ck-media__placeholder),.ck-editor__editable:not(.ck-read-only) .ck-widget:not(.ck-widget_selected) .ck-media__placeholder{pointer-events:none}:root{--ck-media-embed-placeholder-icon-size:3em;--ck-color-media-embed-placeholder-url-text:#757575;--ck-color-media-embed-placeholder-url-text-hover:var(--ck-color-base-text)}.ck-media__wrapper{margin:0 auto}.ck-media__wrapper .ck-media__placeholder{background:var(--ck-color-base-foreground);padding:calc(var(--ck-spacing-standard)*3)}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__icon{background-position:50%;background-size:cover;height:var(--ck-media-embed-placeholder-icon-size);margin-bottom:var(--ck-spacing-large);min-width:var(--ck-media-embed-placeholder-icon-size)}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__icon .ck-icon{height:100%;width:100%}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url__text{color:var(--ck-color-media-embed-placeholder-url-text);font-style:italic;text-align:center;text-overflow:ellipsis;white-space:nowrap}.ck-media__wrapper .ck-media__placeholder .ck-media__placeholder__url__text:hover{color:var(--ck-color-media-embed-placeholder-url-text-hover);cursor:pointer;text-decoration:underline}.ck-media__wrapper[data-oembed-url*="open.spotify.com"]{max-height:380px;max-width:300px}.ck-media__wrapper[data-oembed-url*="goo.gl/maps"] .ck-media__placeholder__icon,.ck-media__wrapper[data-oembed-url*="google.com/maps"] .ck-media__placeholder__icon,.ck-media__wrapper[data-oembed-url*="maps.app.goo.gl"] .ck-media__placeholder__icon,.ck-media__wrapper[data-oembed-url*="maps.google.com"] .ck-media__placeholder__icon{background-image:url(${X})}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder{background:#4268b3}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__icon{background-image:url(${rt})}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__url__text{color:#cdf}.ck-media__wrapper[data-oembed-url*="facebook.com"] .ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder{background:linear-gradient(-135deg,#1400c7,#b800b1,#f50000)}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__icon{background-image:url(${At})}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__url__text{color:#ffe0fe}.ck-media__wrapper[data-oembed-url*="instagram.com"] .ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder{background:linear-gradient(90deg,#71c6f4,#0d70a5)}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__icon{background-image:url(${Vt})}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__url__text{color:#b8e6ff}.ck-media__wrapper[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder .ck-media__placeholder__url__text:hover{color:#fff}`,"",{version:3,sources:["webpack://./../ckeditor5-media-embed/theme/mediaembedediting.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-media-embed/mediaembedediting.css"],names:[],mappings:"AAMC,0CAGC,kBAAmB,CAFnB,YAAa,CACb,qBAcD,CAXC,sEAEC,cAAe,CAEf,iBAMD,CAJC,wGAEC,aAAc,CADd,eAED,CAWD,6kBACC,YACD,CAYF,2LACC,mBACD,CC1CA,MACC,0CAA2C,CAE3C,mDAA4D,CAC5D,2EACD,CAEA,mBACC,aA+FD,CA7FC,0CAEC,0CAA2C,CAD3C,0CA6BD,CA1BC,uEAIC,uBAA2B,CAC3B,qBAAsB,CAHtB,kDAAmD,CACnD,qCAAsC,CAFtC,qDAUD,CAJC,gFAEC,WAAY,CADZ,UAED,CAGD,4EACC,sDAAuD,CAGvD,iBAAkB,CADlB,iBAAkB,CAElB,sBAAuB,CAHvB,kBAUD,CALC,kFACC,4DAA6D,CAC7D,cAAe,CACf,yBACD,CAIF,wDAEC,gBAAiB,CADjB,eAED,CAEA,4UAIC,wDACD,CAEA,2EACC,kBAaD,CAXC,wGACC,wDACD,CAEA,6GACC,UAKD,CAHC,mHACC,UACD,CAIF,4EACC,2DAcD,CAZC,yGACC,wDACD,CAGA,8GACC,aAKD,CAHC,oHACC,UACD,CAIF,6EAEC,iDAaD,CAXC,0GACC,wDACD,CAEA,+GACC,aAKD,CAHC,qHACC,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-media__wrapper {
	& .ck-media__placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;

		& .ck-media__placeholder__url {
			/* Otherwise the URL will overflow when the content is very narrow. */
			max-width: 100%;

			position: relative;

			& .ck-media__placeholder__url__text {
				overflow: hidden;
				display: block;
			}
		}
	}

	&[data-oembed-url*="twitter.com"],
	&[data-oembed-url*="google.com/maps"],
	&[data-oembed-url*="goo.gl/maps"],
	&[data-oembed-url*="maps.google.com"],
	&[data-oembed-url*="maps.app.goo.gl"],
	&[data-oembed-url*="facebook.com"],
	&[data-oembed-url*="instagram.com"] {
		& .ck-media__placeholder__icon * {
			display: none;
		}
	}
}

/* Disable all mouse interaction as long as the editor is not read–only.
   https://github.com/ckeditor/ckeditor5-media-embed/issues/58 */
.ck-editor__editable:not(.ck-read-only) .ck-media__wrapper > *:not(.ck-media__placeholder) {
	pointer-events: none;
}

/* Disable all mouse interaction when the widget is not selected (e.g. to avoid opening links by accident).
   https://github.com/ckeditor/ckeditor5-media-embed/issues/18 */
.ck-editor__editable:not(.ck-read-only) .ck-widget:not(.ck-widget_selected) .ck-media__placeholder {
	pointer-events: none;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-media-embed-placeholder-icon-size: 3em;

	--ck-color-media-embed-placeholder-url-text: hsl(0, 0%, 46%);
	--ck-color-media-embed-placeholder-url-text-hover: var(--ck-color-base-text);
}

.ck-media__wrapper {
	margin: 0 auto;

	& .ck-media__placeholder {
		padding: calc( 3 * var(--ck-spacing-standard) );
		background: var(--ck-color-base-foreground);

		& .ck-media__placeholder__icon {
			min-width: var(--ck-media-embed-placeholder-icon-size);
			height: var(--ck-media-embed-placeholder-icon-size);
			margin-bottom: var(--ck-spacing-large);
			background-position: center;
			background-size: cover;

			& .ck-icon {
				width: 100%;
				height: 100%;
			}
		}

		& .ck-media__placeholder__url__text {
			color: var(--ck-color-media-embed-placeholder-url-text);
			white-space: nowrap;
			text-align: center;
			font-style: italic;
			text-overflow: ellipsis;

			&:hover {
				color: var(--ck-color-media-embed-placeholder-url-text-hover);
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}

	&[data-oembed-url*="open.spotify.com"] {
		max-width: 300px;
		max-height: 380px;
	}

	&[data-oembed-url*="google.com/maps"] .ck-media__placeholder__icon,
	&[data-oembed-url*="goo.gl/maps"] .ck-media__placeholder__icon,
	&[data-oembed-url*="maps.google.com"] .ck-media__placeholder__icon,
	&[data-oembed-url*="maps.app.goo.gl"] .ck-media__placeholder__icon {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAuMzc4IiBoZWlnaHQ9IjI1NC4xNjciIHZpZXdCb3g9IjAgMCA2Ni4yNDYgNjcuMjQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjUzMSAtMjE4LjQ1NSkgc2NhbGUoLjk4MDEyKSI+PHJlY3Qgcnk9IjUuMjM4IiByeD0iNS4yMzgiIHk9IjIzMS4zOTkiIHg9IjE3Ni4wMzEiIGhlaWdodD0iNjAuMDk5IiB3aWR0aD0iNjAuMDk5IiBmaWxsPSIjMzRhNjY4IiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxwYXRoIGQ9Ik0yMDYuNDc3IDI2MC45bC0yOC45ODcgMjguOTg3YTUuMjE4IDUuMjE4IDAgMCAwIDMuNzggMS42MWg0OS42MjFjMS42OTQgMCAzLjE5LS43OTggNC4xNDYtMi4wMzd6IiBmaWxsPSIjNWM4OGM1Ii8+PHBhdGggZD0iTTIyNi43NDIgMjIyLjk4OGMtOS4yNjYgMC0xNi43NzcgNy4xNy0xNi43NzcgMTYuMDE0LjAwNyAyLjc2Mi42NjMgNS40NzQgMi4wOTMgNy44NzUuNDMuNzAzLjgzIDEuNDA4IDEuMTkgMi4xMDcuMzMzLjUwMi42NSAxLjAwNS45NSAxLjUwOC4zNDMuNDc3LjY3My45NTcuOTg4IDEuNDQgMS4zMSAxLjc2OSAyLjUgMy41MDIgMy42MzcgNS4xNjguNzkzIDEuMjc1IDEuNjgzIDIuNjQgMi40NjYgMy45OSAyLjM2MyA0LjA5NCA0LjAwNyA4LjA5MiA0LjYgMTMuOTE0di4wMTJjLjE4Mi40MTIuNTE2LjY2Ni44NzkuNjY3LjQwMy0uMDAxLjc2OC0uMzE0LjkzLS43OTkuNjAzLTUuNzU2IDIuMjM4LTkuNzI5IDQuNTg1LTEzLjc5NC43ODItMS4zNSAxLjY3My0yLjcxNSAyLjQ2NS0zLjk5IDEuMTM3LTEuNjY2IDIuMzI4LTMuNCAzLjYzOC01LjE2OS4zMTUtLjQ4Mi42NDUtLjk2Mi45ODgtMS40MzkuMy0uNTAzLjYxNy0xLjAwNi45NS0xLjUwOC4zNTktLjcuNzYtMS40MDQgMS4xOS0yLjEwNyAxLjQyNi0yLjQwMiAyLTUuMTE0IDIuMDA0LTcuODc1IDAtOC44NDQtNy41MTEtMTYuMDE0LTE2Ljc3Ni0xNi4wMTR6IiBmaWxsPSIjZGQ0YjNlIiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxlbGxpcHNlIHJ5PSI1LjU2NCIgcng9IjUuODI4IiBjeT0iMjM5LjAwMiIgY3g9IjIyNi43NDIiIGZpbGw9IiM4MDJkMjciIHBhaW50LW9yZGVyPSJtYXJrZXJzIHN0cm9rZSBmaWxsIi8+PHBhdGggZD0iTTE5MC4zMDEgMjM3LjI4M2MtNC42NyAwLTguNDU3IDMuODUzLTguNDU3IDguNjA2czMuNzg2IDguNjA3IDguNDU3IDguNjA3YzMuMDQzIDAgNC44MDYtLjk1OCA2LjMzNy0yLjUxNiAxLjUzLTEuNTU3IDIuMDg3LTMuOTEzIDIuMDg3LTYuMjkgMC0uMzYyLS4wMjMtLjcyMi0uMDY0LTEuMDc5aC04LjI1N3YzLjA0M2g0Ljg1Yy0uMTk3Ljc1OS0uNTMxIDEuNDUtMS4wNTggMS45ODYtLjk0Mi45NTgtMi4wMjggMS41NDgtMy45MDEgMS41NDgtMi44NzYgMC01LjIwOC0yLjM3Mi01LjIwOC01LjI5OSAwLTIuOTI2IDIuMzMyLTUuMjk5IDUuMjA4LTUuMjk5IDEuMzk5IDAgMi42MTguNDA3IDMuNTg0IDEuMjkzbDIuMzgxLTIuMzhjMC0uMDAyLS4wMDMtLjAwNC0uMDA0LS4wMDUtMS41ODgtMS41MjQtMy42Mi0yLjIxNS01Ljk1NS0yLjIxNXptNC40MyA1LjY2bC4wMDMuMDA2di0uMDAzeiIgZmlsbD0iI2ZmZiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiLz48cGF0aCBkPSJNMjE1LjE4NCAyNTEuOTI5bC03Ljk4IDcuOTc5IDI4LjQ3NyAyOC40NzVjLjI4Ny0uNjQ5LjQ0OS0xLjM2Ni40NDktMi4xMjN2LTMxLjE2NWMtLjQ2OS42NzUtLjkzNCAxLjM0OS0xLjM4MiAyLjAwNS0uNzkyIDEuMjc1LTEuNjgyIDIuNjQtMi40NjUgMy45OS0yLjM0NyA0LjA2NS0zLjk4MiA4LjAzOC00LjU4NSAxMy43OTQtLjE2Mi40ODUtLjUyNy43OTgtLjkzLjc5OS0uMzYzLS4wMDEtLjY5Ny0uMjU1LS44NzktLjY2N3YtLjAxMmMtLjU5My01LjgyMi0yLjIzNy05LjgyLTQuNi0xMy45MTQtLjc4My0xLjM1LTEuNjczLTIuNzE1LTIuNDY2LTMuOTktMS4xMzctMS42NjYtMi4zMjctMy40LTMuNjM3LTUuMTY5bC0uMDAyLS4wMDN6IiBmaWxsPSIjYzNjM2MzIi8+PHBhdGggZD0iTTIxMi45ODMgMjQ4LjQ5NWwtMzYuOTUyIDM2Ljk1M3YuODEyYTUuMjI3IDUuMjI3IDAgMCAwIDUuMjM4IDUuMjM4aDEuMDE1bDM1LjY2Ni0zNS42NjZhMTM2LjI3NSAxMzYuMjc1IDAgMCAwLTIuNzY0LTMuOSAzNy41NzUgMzcuNTc1IDAgMCAwLS45ODktMS40NGMtLjI5OS0uNTAzLS42MTYtMS4wMDYtLjk1LTEuNTA4LS4wODMtLjE2Mi0uMTc2LS4zMjYtLjI2NC0uNDg5eiIgZmlsbD0iI2ZkZGM0ZiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiLz48cGF0aCBkPSJNMjExLjk5OCAyNjEuMDgzbC02LjE1MiA2LjE1MSAyNC4yNjQgMjQuMjY0aC43ODFhNS4yMjcgNS4yMjcgMCAwIDAgNS4yMzktNS4yMzh2LTEuMDQ1eiIgZmlsbD0iI2ZmZiIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiLz48L2c+PC9zdmc+);
	}

	&[data-oembed-url*="facebook.com"] .ck-media__placeholder {
		background: hsl(220, 46%, 48%);

		& .ck-media__placeholder__icon {
			background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMDI0cHgiIGhlaWdodD0iMTAyNHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAgICAgICAgPHRpdGxlPkZpbGwgMTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9ImZMb2dvX1doaXRlIiBmaWxsPSIjRkZGRkZFIj4gICAgICAgICAgICA8cGF0aCBkPSJNOTY3LjQ4NCwwIEw1Ni41MTcsMCBDMjUuMzA0LDAgMCwyNS4zMDQgMCw1Ni41MTcgTDAsOTY3LjQ4MyBDMCw5OTguNjk0IDI1LjI5NywxMDI0IDU2LjUyMiwxMDI0IEw1NDcsMTAyNCBMNTQ3LDYyOCBMNDE0LDYyOCBMNDE0LDQ3MyBMNTQ3LDQ3MyBMNTQ3LDM1OS4wMjkgQzU0NywyMjYuNzY3IDYyNy43NzMsMTU0Ljc0NyA3NDUuNzU2LDE1NC43NDcgQzgwMi4yNjksMTU0Ljc0NyA4NTAuODQyLDE1OC45NTUgODY1LDE2MC44MzYgTDg2NSwyOTkgTDc4My4zODQsMjk5LjAzNyBDNzE5LjM5MSwyOTkuMDM3IDcwNywzMjkuNTI5IDcwNywzNzQuMjczIEw3MDcsNDczIEw4NjAuNDg3LDQ3MyBMODQwLjUwMSw2MjggTDcwNyw2MjggTDcwNywxMDI0IEw5NjcuNDg0LDEwMjQgQzk5OC42OTcsMTAyNCAxMDI0LDk5OC42OTcgMTAyNCw5NjcuNDg0IEwxMDI0LDU2LjUxNSBDMTAyNCwyNS4zMDMgOTk4LjY5NywwIDk2Ny40ODQsMCIgaWQ9IkZpbGwtMSI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
		}

		& .ck-media__placeholder__url__text {
			color: hsl(220, 100%, 90%);

			&:hover {
				color: hsl(0, 0%, 100%);
			}
		}
	}

	&[data-oembed-url*="instagram.com"] .ck-media__placeholder {
		background: linear-gradient(-135deg,hsl(246, 100%, 39%),hsl(302, 100%, 36%),hsl(0, 100%, 48%));

		& .ck-media__placeholder__icon {
			background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1MDRweCIgaGVpZ2h0PSI1MDRweCIgdmlld0JveD0iMCAwIDUwNCA1MDQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+Z2x5cGgtbG9nb19NYXkyMDE2PC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPiAgICAgICAgPHBvbHlnb24gaWQ9InBhdGgtMSIgcG9pbnRzPSIwIDAuMTU5IDUwMy44NDEgMC4xNTkgNTAzLjg0MSA1MDMuOTQgMCA1MDMuOTQiPjwvcG9seWdvbj4gICAgPC9kZWZzPiAgICA8ZyBpZD0iZ2x5cGgtbG9nb19NYXkyMDE2IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cC0zIj4gICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+ICAgICAgICAgICAgPC9tYXNrPiAgICAgICAgICAgIDxnIGlkPSJDbGlwLTIiPjwvZz4gICAgICAgICAgICA8cGF0aCBkPSJNMjUxLjkyMSwwLjE1OSBDMTgzLjUwMywwLjE1OSAxNzQuOTI0LDAuNDQ5IDE0OC4wNTQsMS42NzUgQzEyMS4yNCwyLjg5OCAxMDIuOTI3LDcuMTU3IDg2LjkwMywxMy4zODUgQzcwLjMzNywxOS44MjIgNTYuMjg4LDI4LjQzNiA0Mi4yODIsNDIuNDQxIEMyOC4yNzcsNTYuNDQ3IDE5LjY2Myw3MC40OTYgMTMuMjI2LDg3LjA2MiBDNi45OTgsMTAzLjA4NiAyLjczOSwxMjEuMzk5IDEuNTE2LDE0OC4yMTMgQzAuMjksMTc1LjA4MyAwLDE4My42NjIgMCwyNTIuMDggQzAsMzIwLjQ5NyAwLjI5LDMyOS4wNzYgMS41MTYsMzU1Ljk0NiBDMi43MzksMzgyLjc2IDYuOTk4LDQwMS4wNzMgMTMuMjI2LDQxNy4wOTcgQzE5LjY2Myw0MzMuNjYzIDI4LjI3Nyw0NDcuNzEyIDQyLjI4Miw0NjEuNzE4IEM1Ni4yODgsNDc1LjcyMyA3MC4zMzcsNDg0LjMzNyA4Ni45MDMsNDkwLjc3NSBDMTAyLjkyNyw0OTcuMDAyIDEyMS4yNCw1MDEuMjYxIDE0OC4wNTQsNTAyLjQ4NCBDMTc0LjkyNCw1MDMuNzEgMTgzLjUwMyw1MDQgMjUxLjkyMSw1MDQgQzMyMC4zMzgsNTA0IDMyOC45MTcsNTAzLjcxIDM1NS43ODcsNTAyLjQ4NCBDMzgyLjYwMSw1MDEuMjYxIDQwMC45MTQsNDk3LjAwMiA0MTYuOTM4LDQ5MC43NzUgQzQzMy41MDQsNDg0LjMzNyA0NDcuNTUzLDQ3NS43MjMgNDYxLjU1OSw0NjEuNzE4IEM0NzUuNTY0LDQ0Ny43MTIgNDg0LjE3OCw0MzMuNjYzIDQ5MC42MTYsNDE3LjA5NyBDNDk2Ljg0Myw0MDEuMDczIDUwMS4xMDIsMzgyLjc2IDUwMi4zMjUsMzU1Ljk0NiBDNTAzLjU1MSwzMjkuMDc2IDUwMy44NDEsMzIwLjQ5NyA1MDMuODQxLDI1Mi4wOCBDNTAzLjg0MSwxODMuNjYyIDUwMy41NTEsMTc1LjA4MyA1MDIuMzI1LDE0OC4yMTMgQzUwMS4xMDIsMTIxLjM5OSA0OTYuODQzLDEwMy4wODYgNDkwLjYxNiw4Ny4wNjIgQzQ4NC4xNzgsNzAuNDk2IDQ3NS41NjQsNTYuNDQ3IDQ2MS41NTksNDIuNDQxIEM0NDcuNTUzLDI4LjQzNiA0MzMuNTA0LDE5LjgyMiA0MTYuOTM4LDEzLjM4NSBDNDAwLjkxNCw3LjE1NyAzODIuNjAxLDIuODk4IDM1NS43ODcsMS42NzUgQzMyOC45MTcsMC40NDkgMzIwLjMzOCwwLjE1OSAyNTEuOTIxLDAuMTU5IFogTTI1MS45MjEsNDUuNTUgQzMxOS4xODYsNDUuNTUgMzI3LjE1NCw0NS44MDcgMzUzLjcxOCw0Ny4wMTkgQzM3OC4yOCw0OC4xMzkgMzkxLjYxOSw1Mi4yNDMgNDAwLjQ5Niw1NS42OTMgQzQxMi4yNTUsNjAuMjYzIDQyMC42NDcsNjUuNzIyIDQyOS40NjIsNzQuNTM4IEM0MzguMjc4LDgzLjM1MyA0NDMuNzM3LDkxLjc0NSA0NDguMzA3LDEwMy41MDQgQzQ1MS43NTcsMTEyLjM4MSA0NTUuODYxLDEyNS43MiA0NTYuOTgxLDE1MC4yODIgQzQ1OC4xOTMsMTc2Ljg0NiA0NTguNDUsMTg0LjgxNCA0NTguNDUsMjUyLjA4IEM0NTguNDUsMzE5LjM0NSA0NTguMTkzLDMyNy4zMTMgNDU2Ljk4MSwzNTMuODc3IEM0NTUuODYxLDM3OC40MzkgNDUxLjc1NywzOTEuNzc4IDQ0OC4zMDcsNDAwLjY1NSBDNDQzLjczNyw0MTIuNDE0IDQzOC4yNzgsNDIwLjgwNiA0MjkuNDYyLDQyOS42MjEgQzQyMC42NDcsNDM4LjQzNyA0MTIuMjU1LDQ0My44OTYgNDAwLjQ5Niw0NDguNDY2IEMzOTEuNjE5LDQ1MS45MTYgMzc4LjI4LDQ1Ni4wMiAzNTMuNzE4LDQ1Ny4xNCBDMzI3LjE1OCw0NTguMzUyIDMxOS4xOTEsNDU4LjYwOSAyNTEuOTIxLDQ1OC42MDkgQzE4NC42NSw0NTguNjA5IDE3Ni42ODQsNDU4LjM1MiAxNTAuMTIzLDQ1Ny4xNCBDMTI1LjU2MSw0NTYuMDIgMTEyLjIyMiw0NTEuOTE2IDEwMy4zNDUsNDQ4LjQ2NiBDOTEuNTg2LDQ0My44OTYgODMuMTk0LDQzOC40MzcgNzQuMzc5LDQyOS42MjEgQzY1LjU2NCw0MjAuODA2IDYwLjEwNCw0MTIuNDE0IDU1LjUzNCw0MDAuNjU1IEM1Mi4wODQsMzkxLjc3OCA0Ny45OCwzNzguNDM5IDQ2Ljg2LDM1My44NzcgQzQ1LjY0OCwzMjcuMzEzIDQ1LjM5MSwzMTkuMzQ1IDQ1LjM5MSwyNTIuMDggQzQ1LjM5MSwxODQuODE0IDQ1LjY0OCwxNzYuODQ2IDQ2Ljg2LDE1MC4yODIgQzQ3Ljk4LDEyNS43MiA1Mi4wODQsMTEyLjM4MSA1NS41MzQsMTAzLjUwNCBDNjAuMTA0LDkxLjc0NSA2NS41NjMsODMuMzUzIDc0LjM3OSw3NC41MzggQzgzLjE5NCw2NS43MjIgOTEuNTg2LDYwLjI2MyAxMDMuMzQ1LDU1LjY5MyBDMTEyLjIyMiw1Mi4yNDMgMTI1LjU2MSw0OC4xMzkgMTUwLjEyMyw0Ny4wMTkgQzE3Ni42ODcsNDUuODA3IDE4NC42NTUsNDUuNTUgMjUxLjkyMSw0NS41NSBaIiBpZD0iRmlsbC0xIiBmaWxsPSIjRkZGRkZGIiBtYXNrPSJ1cmwoI21hc2stMikiPjwvcGF0aD4gICAgICAgIDwvZz4gICAgICAgIDxwYXRoIGQ9Ik0yNTEuOTIxLDMzNi4wNTMgQzIwNS41NDMsMzM2LjA1MyAxNjcuOTQ3LDI5OC40NTcgMTY3Ljk0NywyNTIuMDggQzE2Ny45NDcsMjA1LjcwMiAyMDUuNTQzLDE2OC4xMDYgMjUxLjkyMSwxNjguMTA2IEMyOTguMjk4LDE2OC4xMDYgMzM1Ljg5NCwyMDUuNzAyIDMzNS44OTQsMjUyLjA4IEMzMzUuODk0LDI5OC40NTcgMjk4LjI5OCwzMzYuMDUzIDI1MS45MjEsMzM2LjA1MyBaIE0yNTEuOTIxLDEyMi43MTUgQzE4MC40NzQsMTIyLjcxNSAxMjIuNTU2LDE4MC42MzMgMTIyLjU1NiwyNTIuMDggQzEyMi41NTYsMzIzLjUyNiAxODAuNDc0LDM4MS40NDQgMjUxLjkyMSwzODEuNDQ0IEMzMjMuMzY3LDM4MS40NDQgMzgxLjI4NSwzMjMuNTI2IDM4MS4yODUsMjUyLjA4IEMzODEuMjg1LDE4MC42MzMgMzIzLjM2NywxMjIuNzE1IDI1MS45MjEsMTIyLjcxNSBaIiBpZD0iRmlsbC00IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+ICAgICAgICA8cGF0aCBkPSJNNDE2LjYyNywxMTcuNjA0IEM0MTYuNjI3LDEzNC4zIDQwMy4wOTIsMTQ3LjgzNCAzODYuMzk2LDE0Ny44MzQgQzM2OS43MDEsMTQ3LjgzNCAzNTYuMTY2LDEzNC4zIDM1Ni4xNjYsMTE3LjYwNCBDMzU2LjE2NiwxMDAuOTA4IDM2OS43MDEsODcuMzczIDM4Ni4zOTYsODcuMzczIEM0MDMuMDkyLDg3LjM3MyA0MTYuNjI3LDEwMC45MDggNDE2LjYyNywxMTcuNjA0IiBpZD0iRmlsbC01IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+ICAgIDwvZz48L3N2Zz4=);
		}

		/* stylelint-disable-next-line no-descending-specificity */
		& .ck-media__placeholder__url__text {
			color: hsl(302, 100%, 94%);

			&:hover {
				color: hsl(0, 0%, 100%);
			}
		}
	}

	&[data-oembed-url*="twitter.com"] .ck.ck-media__placeholder {
		/* Use gradient to contrast with focused widget (ckeditor/ckeditor5-media-embed#22). */
		background: linear-gradient( to right, hsl(201, 85%, 70%), hsl(201, 85%, 35%) );

		& .ck-media__placeholder__icon {
			background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IldoaXRlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwMCA0MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MDAsMjAwYzAsMTEwLjUtODkuNSwyMDAtMjAwLDIwMFMwLDMxMC41LDAsMjAwUzg5LjUsMCwyMDAsMFM0MDAsODkuNSw0MDAsMjAweiBNMTYzLjQsMzA1LjVjODguNywwLDEzNy4yLTczLjUsMTM3LjItMTM3LjJjMC0yLjEsMC00LjItMC4xLTYuMmM5LjQtNi44LDE3LjYtMTUuMywyNC4xLTI1Yy04LjYsMy44LTE3LjksNi40LTI3LjcsNy42YzEwLTYsMTcuNi0xNS40LDIxLjItMjYuN2MtOS4zLDUuNS0xOS42LDkuNS0zMC42LDExLjdjLTguOC05LjQtMjEuMy0xNS4yLTM1LjItMTUuMmMtMjYuNiwwLTQ4LjIsMjEuNi00OC4yLDQ4LjJjMCwzLjgsMC40LDcuNSwxLjMsMTFjLTQwLjEtMi03NS42LTIxLjItOTkuNC01MC40Yy00LjEsNy4xLTYuNSwxNS40LTYuNSwyNC4yYzAsMTYuNyw4LjUsMzEuNSwyMS41LDQwLjFjLTcuOS0wLjItMTUuMy0yLjQtMjEuOC02YzAsMC4yLDAsMC40LDAsMC42YzAsMjMuNCwxNi42LDQyLjgsMzguNyw0Ny4zYy00LDEuMS04LjMsMS43LTEyLjcsMS43Yy0zLjEsMC02LjEtMC4zLTkuMS0wLjljNi4xLDE5LjIsMjMuOSwzMy4xLDQ1LDMzLjVjLTE2LjUsMTIuOS0zNy4zLDIwLjYtNTkuOSwyMC42Yy0zLjksMC03LjctMC4yLTExLjUtMC43QzExMC44LDI5Ny41LDEzNi4yLDMwNS41LDE2My40LDMwNS41Ii8+PC9zdmc+);
		}

		& .ck-media__placeholder__url__text {
			color: hsl(201, 100%, 86%);

			&:hover {
				color: hsl(0, 0%, 100%);
			}
		}
	}
}
`],sourceRoot:""}]);const Zt=$},5651:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-media-form{align-items:flex-start;display:flex;flex-direction:row;flex-wrap:nowrap;width:400px}.ck.ck-media-form .ck-labeled-field-view{display:inline-block;width:100%}.ck.ck-media-form .ck-label{display:none}.ck.ck-media-form .ck-input{width:100%}@media screen and (max-width:600px){.ck.ck-media-form{flex-wrap:wrap}.ck.ck-media-form .ck-labeled-field-view{flex-basis:100%}.ck.ck-media-form .ck-button{flex-basis:50%}}","",{version:3,sources:["webpack://./../ckeditor5-media-embed/theme/mediaform.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css"],names:[],mappings:"AAOA,kBAEC,sBAAuB,CADvB,YAAa,CAEb,kBAAmB,CACnB,gBAAiB,CACjB,WA0BD,CAxBC,yCACC,oBAAqB,CACrB,UACD,CAEA,4BACC,YACD,CAEA,4BACC,UACD,CCnBA,oCDCD,kBAqBE,cAUF,CARE,yCACC,eACD,CAEA,6BACC,cACD,CC5BD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck.ck-media-form {
	display: flex;
	align-items: flex-start;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 400px;

	& .ck-labeled-field-view {
		display: inline-block;
		width: 100%;
	}

	& .ck-label {
		display: none;
	}

	& .ck-input {
		width: 100%;
	}

	@mixin ck-media-phone {
		flex-wrap: wrap;

		& .ck-labeled-field-view {
			flex-basis: 100%;
		}

		& .ck-button {
			flex-basis: 50%;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},5506:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-input-color{display:flex;flex-direction:row-reverse;width:100%}.ck.ck-input-color>input.ck.ck-input-text{flex-grow:1;min-width:auto}.ck.ck-input-color>div.ck.ck-dropdown{min-width:auto}.ck.ck-input-color>div.ck.ck-dropdown>.ck-input-color__button .ck-dropdown__arrow{display:none}.ck.ck-input-color .ck.ck-input-color__button{display:flex}.ck.ck-input-color .ck.ck-input-color__button .ck.ck-input-color__button__preview{overflow:hidden;position:relative}.ck.ck-input-color .ck.ck-input-color__button .ck.ck-input-color__button__preview>.ck.ck-input-color__button__preview__no-color-indicator{display:block;position:absolute}[dir=ltr] .ck.ck-input-color>.ck.ck-input-text{border-bottom-right-radius:0;border-top-right-radius:0}[dir=rtl] .ck.ck-input-color>.ck.ck-input-text{border-bottom-left-radius:0;border-top-left-radius:0}.ck.ck-input-color>.ck.ck-input-text:focus{z-index:0}.ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button{padding:0}[dir=ltr] .ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button{border-bottom-left-radius:0;border-top-left-radius:0}[dir=ltr] .ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button:not(:focus){border-left:1px solid transparent}[dir=rtl] .ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button{border-bottom-right-radius:0;border-top-right-radius:0}[dir=rtl] .ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button:not(:focus){border-right:1px solid transparent}.ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button.ck-disabled{background:var(--ck-color-input-disabled-background)}.ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button>.ck.ck-input-color__button__preview{border:1px solid var(--ck-color-input-border);border-radius:0;height:20px;width:20px}.ck-rounded-corners .ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button>.ck.ck-input-color__button__preview,.ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button>.ck.ck-input-color__button__preview.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-input-color>.ck.ck-dropdown>.ck.ck-button.ck-input-color__button>.ck.ck-input-color__button__preview>.ck.ck-input-color__button__preview__no-color-indicator{background:red;border-radius:2px;height:150%;left:50%;top:-30%;transform:rotate(45deg);transform-origin:50%;width:8%}.ck.ck-input-color .ck.ck-input-color__remove-color{border-bottom-left-radius:0;border-bottom-right-radius:0;padding:calc(var(--ck-spacing-standard)/2) var(--ck-spacing-standard);width:100%}.ck.ck-input-color .ck.ck-input-color__remove-color:not(:focus){border-bottom:1px solid var(--ck-color-input-border)}[dir=ltr] .ck.ck-input-color .ck.ck-input-color__remove-color{border-top-right-radius:0}[dir=rtl] .ck.ck-input-color .ck.ck-input-color__remove-color{border-top-left-radius:0}.ck.ck-input-color .ck.ck-input-color__remove-color .ck.ck-icon{margin-right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-input-color .ck.ck-input-color__remove-color .ck.ck-icon{margin-left:var(--ck-spacing-standard);margin-right:0}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/colorinput.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/colorinput.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAKA,mBAEC,YAAa,CACb,0BAA2B,CAF3B,UAgCD,CA5BC,0CAEC,WAAY,CADZ,cAED,CAEA,sCACC,cAMD,CAHC,kFACC,YACD,CAGD,8CAEC,YAWD,CATC,kFAEC,eAAgB,CADhB,iBAOD,CAJC,0IAEC,aAAc,CADd,iBAED,CC7BF,+CCME,4BAA6B,CAD7B,yBDHF,CAFA,+CCWE,2BAA4B,CAD5B,wBDRF,CCcC,2CACC,SACD,CAIA,wEACC,SA0CD,CDjED,kFC2BG,2BAA4B,CAD5B,wBDxBH,CC2BG,8FACC,iCACD,CD/BH,kFCoCG,4BAA6B,CAD7B,yBDjCH,CCoCG,8FACC,kCACD,CAGD,oFACC,oDACD,CAEA,4GAKC,6CAA8C,CC/CjD,eAAgB,CD8Cb,WAAY,CADZ,UAcD,CCzDF,+PAEC,qCAED,CD2CG,oKAKC,cAA6B,CAC7B,iBAAkB,CAHlB,WAAY,CADZ,QAAS,CADT,QAAS,CAMT,uBAAwB,CACxB,oBAAqB,CAJrB,QAKD,CAKH,oDAIC,2BAA4B,CAC5B,4BAA6B,CAH7B,qEAAwE,CADxE,UA0BD,CApBC,gEACC,oDACD,CD7ED,8DCgFE,yBD9EF,CAFA,8DCoFE,wBDlFF,CCqFC,gEACC,uCAMD,CD9FD,0EC4FG,sCAAuC,CADvC,cDzFH",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-input-color {
	width: 100%;
	display: flex;
	flex-direction: row-reverse;

	& > input.ck.ck-input-text {
		min-width: auto;
		flex-grow: 1;
	}

	& > div.ck.ck-dropdown {
		min-width: auto;

		/* This dropdown has no arrow but a color preview instead. */
		& > .ck-input-color__button .ck-dropdown__arrow {
			display: none;
		}
	}

	& .ck.ck-input-color__button {
		/* Resolving issue with misaligned buttons on Safari (see #10589) */
		display: flex;

		& .ck.ck-input-color__button__preview {
			position: relative;
			overflow: hidden;

			& > .ck.ck-input-color__button__preview__no-color-indicator {
				position: absolute;
				display: block;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";
@import "../mixins/_rounded.css";

.ck.ck-input-color {
	& > .ck.ck-input-text {
		@mixin ck-dir ltr {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		@mixin ck-dir rtl {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		/* Make sure the focused input is always on top of the dropdown button so its
		   outline and border are never cropped (also when the input is read-only). */
		&:focus {
			z-index: 0;
		}
	}

	& > .ck.ck-dropdown {
		& > .ck.ck-button.ck-input-color__button {
			padding: 0;

			@mixin ck-dir ltr {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;

				&:not(:focus) {
					border-left: 1px solid transparent;
				}
			}

			@mixin ck-dir rtl {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;

				&:not(:focus) {
					border-right: 1px solid transparent;
				}
			}

			&.ck-disabled {
				background: var(--ck-color-input-disabled-background);
			}

			& > .ck.ck-input-color__button__preview {
				@mixin ck-rounded-corners;

				width: 20px;
				height: 20px;
				border: 1px solid var(--ck-color-input-border);

				& > .ck.ck-input-color__button__preview__no-color-indicator {
					top: -30%;
					left: 50%;
					height: 150%;
					width: 8%;
					background: hsl(0, 100%, 50%);
					border-radius: 2px;
					transform: rotate(45deg);
					transform-origin: 50%;
				}
			}
		}
	}

	& .ck.ck-input-color__remove-color {
		width: 100%;
		padding: calc(var(--ck-spacing-standard) / 2) var(--ck-spacing-standard);

		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;

		&:not(:focus) {
			border-bottom: 1px solid var(--ck-color-input-border);
		}

		@mixin ck-dir ltr {
			border-top-right-radius: 0;
		}

		@mixin ck-dir rtl {
			border-top-left-radius: 0;
		}

		& .ck.ck-icon {
			margin-right: var(--ck-spacing-standard);

			@mixin ck-dir rtl {
				margin-right: 0;
				margin-left: var(--ck-spacing-standard);
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},4043:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-form{padding:0 0 var(--ck-spacing-large)}.ck.ck-form:focus{outline:none}.ck.ck-form .ck.ck-input-text{min-width:100%;width:0}.ck.ck-form .ck.ck-dropdown{min-width:100%}.ck.ck-form .ck.ck-dropdown .ck-dropdown__button:not(:focus){border:1px solid var(--ck-color-base-border)}.ck.ck-form .ck.ck-dropdown .ck-dropdown__button .ck-button__label{width:100%}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/form.css"],names:[],mappings:"AAKA,YACC,mCAyBD,CAvBC,kBAEC,YACD,CAEA,8BACC,cAAe,CACf,OACD,CAEA,4BACC,cAWD,CARE,6DACC,4CACD,CAEA,mEACC,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-form {
	padding: 0 0 var(--ck-spacing-large);

	&:focus {
		/* See: https://github.com/ckeditor/ckeditor5/issues/4773 */
		outline: none;
	}

	& .ck.ck-input-text {
		min-width: 100%;
		width: 0;
	}

	& .ck.ck-dropdown {
		min-width: 100%;

		& .ck-dropdown__button {
			&:not(:focus) {
				border: 1px solid var(--ck-color-base-border);
			}

			& .ck-button__label {
				width: 100%;
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},2655:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-form__row{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between}.ck.ck-form__row>:not(.ck-label){flex-grow:1}.ck.ck-form__row.ck-table-form__action-row .ck-button-cancel,.ck.ck-form__row.ck-table-form__action-row .ck-button-save{justify-content:center}.ck.ck-form__row{padding:var(--ck-spacing-standard) var(--ck-spacing-large) 0}[dir=ltr] .ck.ck-form__row>:not(.ck-label)+*{margin-left:var(--ck-spacing-large)}[dir=rtl] .ck.ck-form__row>:not(.ck-label)+*{margin-right:var(--ck-spacing-large)}.ck.ck-form__row>.ck-label{min-width:100%;width:100%}.ck.ck-form__row.ck-table-form__action-row{margin-top:var(--ck-spacing-large)}.ck.ck-form__row.ck-table-form__action-row .ck-button .ck-button__label{color:var(--ck-color-text)}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/formrow.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/formrow.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAKA,iBACC,YAAa,CACb,kBAAmB,CACnB,gBAAiB,CACjB,6BAaD,CAVC,iCACC,WACD,CAGC,wHAEC,sBACD,CCbF,iBACC,4DA2BD,CC7BC,6CDQG,mCCNH,CAFA,6CDYG,oCCVH,CDeA,2BAEC,cAAe,CADf,UAED,CAEA,2CACC,kCAKD,CAHC,wEACC,0BACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-form__row {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	/* Ignore labels that work as fieldset legends */
	& > *:not(.ck-label) {
		flex-grow: 1;
	}

	&.ck-table-form__action-row {
		& .ck-button-save,
		& .ck-button-cancel {
			justify-content: center;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-form__row {
	padding: var(--ck-spacing-standard) var(--ck-spacing-large) 0;

	/* Ignore labels that work as fieldset legends */
	& > *:not(.ck-label) {
		& + * {
			@mixin ck-dir ltr {
				margin-left: var(--ck-spacing-large);
			}

			@mixin ck-dir rtl {
				margin-right: var(--ck-spacing-large);
			}
		}
	}

	& > .ck-label {
		width: 100%;
		min-width: 100%;
	}

	&.ck-table-form__action-row {
		margin-top: var(--ck-spacing-large);

		& .ck-button .ck-button__label {
			color: var(--ck-color-text);
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},5032:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-insert-table-dropdown__grid{display:flex;flex-direction:row;flex-wrap:wrap}:root{--ck-insert-table-dropdown-padding:10px;--ck-insert-table-dropdown-box-height:11px;--ck-insert-table-dropdown-box-width:12px;--ck-insert-table-dropdown-box-margin:1px}.ck .ck-insert-table-dropdown__grid{padding:var(--ck-insert-table-dropdown-padding) var(--ck-insert-table-dropdown-padding) 0;width:calc(var(--ck-insert-table-dropdown-box-width)*10 + var(--ck-insert-table-dropdown-box-margin)*20 + var(--ck-insert-table-dropdown-padding)*2)}.ck .ck-insert-table-dropdown__label,.ck[dir=rtl] .ck-insert-table-dropdown__label{text-align:center}.ck .ck-insert-table-dropdown-grid-box{border:1px solid var(--ck-color-base-border);border-radius:1px;margin:var(--ck-insert-table-dropdown-box-margin);min-height:var(--ck-insert-table-dropdown-box-height);min-width:var(--ck-insert-table-dropdown-box-width);outline:none;transition:none}@media (prefers-reduced-motion:reduce){.ck .ck-insert-table-dropdown-grid-box{transition:none}}.ck .ck-insert-table-dropdown-grid-box:focus{box-shadow:none}.ck .ck-insert-table-dropdown-grid-box.ck-on{background:var(--ck-color-focus-outer-shadow);border-color:var(--ck-color-focus-border)}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/inserttable.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/inserttable.css"],names:[],mappings:"AAKA,oCACC,YAAa,CACb,kBAAmB,CACnB,cACD,CCJA,MACC,uCAAwC,CACxC,0CAA2C,CAC3C,yCAA0C,CAC1C,yCACD,CAEA,oCAGC,yFAA0F,CAD1F,oJAED,CAEA,mFAEC,iBACD,CAEA,uCAIC,4CAA6C,CAC7C,iBAAkB,CAFlB,iDAAkD,CADlD,qDAAsD,CADtD,mDAAoD,CAKpD,YAAa,CACb,eAcD,CAZC,uCATD,uCAUE,eAWF,CAVC,CAEA,6CACC,eACD,CAEA,6CAEC,6CAA8C,CAD9C,yCAED",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-insert-table-dropdown__grid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-insert-table-dropdown-padding: 10px;
	--ck-insert-table-dropdown-box-height: 11px;
	--ck-insert-table-dropdown-box-width: 12px;
	--ck-insert-table-dropdown-box-margin: 1px;
}

.ck .ck-insert-table-dropdown__grid {
	/* The width of a container should match 10 items in a row so there will be a 10x10 grid. */
	width: calc(var(--ck-insert-table-dropdown-box-width) * 10 + var(--ck-insert-table-dropdown-box-margin) * 20 + var(--ck-insert-table-dropdown-padding) * 2);
	padding: var(--ck-insert-table-dropdown-padding) var(--ck-insert-table-dropdown-padding) 0;
}

.ck .ck-insert-table-dropdown__label,
.ck[dir=rtl] .ck-insert-table-dropdown__label {
	text-align: center;
}

.ck .ck-insert-table-dropdown-grid-box {
	min-width: var(--ck-insert-table-dropdown-box-width);
	min-height: var(--ck-insert-table-dropdown-box-height);
	margin: var(--ck-insert-table-dropdown-box-margin);
	border: 1px solid var(--ck-color-base-border);
	border-radius: 1px;
	outline: none;
	transition: none;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&:focus {
		box-shadow: none;
	}

	&.ck-on {
		border-color: var(--ck-color-focus-border);
		background: var(--ck-color-focus-outer-shadow);
	}
}

`],sourceRoot:""}]);const w=k},2329:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-content .table{display:table;margin:.9em auto}.ck-content .table table{border:1px double #b3b3b3;border-collapse:collapse;border-spacing:0;height:100%;width:100%}.ck-content .table table td,.ck-content .table table th{border:1px solid #bfbfbf;min-width:2em;padding:.4em}.ck-content .table table th{background:rgba(0,0,0,.05);font-weight:700}@media print{.ck-content .table table{height:auto}}.ck-content[dir=rtl] .table th{text-align:right}.ck-content[dir=ltr] .table th{text-align:left}.ck-editor__editable .ck-table-bogus-paragraph{display:inline-block;width:100%}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/table.css"],names:[],mappings:"AAKA,mBAKC,aAAc,CADd,gBAiCD,CA9BC,yBAYC,yBAAkC,CAVlC,wBAAyB,CACzB,gBAAiB,CAKjB,WAAY,CADZ,UAsBD,CAfC,wDAQC,wBAAiC,CANjC,aAAc,CACd,YAMD,CAEA,4BAEC,0BAA+B,CAD/B,eAED,CAeF,aACC,yBACC,WACD,CACD,CAIA,+BACC,gBACD,CAEA,+BACC,eACD,CAEA,+CAKC,oBAAqB,CAMrB,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck-content .table {
	/* Give the table widget some air and center it horizontally */
	/* The first value should be equal to --ck-spacing-large variable if used in the editor context
	to avoid the content jumping (See https://github.com/ckeditor/ckeditor5/issues/9825). */
	margin: 0.9em auto;
	display: table;

	& table {
		/* The table cells should have slight borders */
		border-collapse: collapse;
		border-spacing: 0;

		/* Table width and height are set on the parent <figure>. Make sure the table inside stretches
		to the full dimensions of the container (https://github.com/ckeditor/ckeditor5/issues/6186). */
		width: 100%;
		height: 100%;

		/* The outer border of the table should be slightly darker than the inner lines.
		Also see https://github.com/ckeditor/ckeditor5-table/issues/50. */
		border: 1px double hsl(0, 0%, 70%);

		& td,
		& th {
			min-width: 2em;
			padding: .4em;

			/* The border is inherited from .ck-editor__nested-editable styles, so theoretically it's not necessary here.
			However, the border is a content style, so it should use .ck-content (so it works outside the editor).
			Hence, the duplication. See https://github.com/ckeditor/ckeditor5/issues/6314 */
			border: 1px solid hsl(0, 0%, 75%);
		}

		& th {
			font-weight: bold;
			background: hsla(0, 0%, 0%, 5%);
		}
	}
}

/**
 * Expanding the table to the full height of the parent container is necessary because tables
 * are rendered inside <figure> elements, which is kinda buggy in table height calculation.
 * While setting \`height: 100%\` fixes the issue in the editing mode described here:
 * https://github.com/ckeditor/ckeditor5/issues/6186
 *
 * it's causing another issue with the table height in the print preview mode here:
 * https://github.com/ckeditor/ckeditor5/issues/16856
 *
 * For now, resetting the height to \`initial\` in the print mode works as a workaround.
 */
@media print {
	.ck-content .table table {
		height: initial;
	}
}

/* Text alignment of the table header should match the editor settings and override the native browser styling,
when content is available outside the editor. See https://github.com/ckeditor/ckeditor5/issues/6638 */
.ck-content[dir="rtl"] .table th {
	text-align: right;
}

.ck-content[dir="ltr"] .table th {
	text-align: left;
}

.ck-editor__editable .ck-table-bogus-paragraph {
	/*
	 * Use display:inline-block to force Chrome/Safari to limit text mutations to this element.
	 * See https://github.com/ckeditor/ckeditor5/issues/6062.
	 */
	display: inline-block;

	/*
	 * Inline HTML elements nested in the span should always be dimensioned in relation to the whole cell width.
	 * See https://github.com/ckeditor/ckeditor5/issues/9117.
	 */
	width: 100%;
}
`],sourceRoot:""}]);const w=k},4143:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-selector-caption-background:#f7f7f7;--ck-color-selector-caption-text:#333;--ck-color-selector-caption-highlighted-background:#fd0}.ck-content .table>figcaption{background-color:var(--ck-color-selector-caption-background);caption-side:top;color:var(--ck-color-selector-caption-text);display:table-caption;font-size:.75em;outline-offset:-1px;padding:.6em;text-align:center;word-break:break-word}@media (forced-colors:active){.ck-content .table>figcaption{background-color:unset;color:unset}}@media (forced-colors:none){.ck.ck-editor__editable .table>figcaption.table__caption_highlighted{animation:ck-table-caption-highlight .6s ease-out}}.ck.ck-editor__editable .table>figcaption.ck-placeholder:before{overflow:hidden;padding-left:inherit;padding-right:inherit;text-overflow:ellipsis;white-space:nowrap}@keyframes ck-table-caption-highlight{0%{background-color:var(--ck-color-selector-caption-highlighted-background)}to{background-color:var(--ck-color-selector-caption-background)}}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/tablecaption.css","webpack://./../ckeditor5-ui/theme/mixins/_mediacolors.css"],names:[],mappings:"AAOA,MACC,8CAAuD,CACvD,qCAAiD,CACjD,uDACD,CAGA,8BAMC,4DAA6D,CAJ7D,gBAAiB,CAGjB,2CAA4C,CAJ5C,qBAAsB,CAOtB,eAAgB,CAChB,mBAAoB,CAFpB,YAAa,CAHb,iBAAkB,CADlB,qBAaD,CCxBC,8BACC,8BDoBA,sBAAuB,CACvB,WCnBA,CACD,CAIA,4BDqBC,qEACC,iDACD,CCnBD,CDsBA,gEASC,eAAgB,CARhB,oBAAqB,CACrB,qBAAsB,CAQtB,sBAAuB,CAFvB,kBAGD,CAGD,sCACC,GACC,wEACD,CAEA,GACC,4DACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_mediacolors.css";

:root {
	--ck-color-selector-caption-background: hsl(0, 0%, 97%);
	--ck-color-selector-caption-text: hsl(0, 0%, 20%);
	--ck-color-selector-caption-highlighted-background: hsl(52deg 100% 50%);
}

/* Content styles */
.ck-content .table > figcaption {
	display: table-caption;
	caption-side: top;
	word-break: break-word;
	text-align: center;
	color: var(--ck-color-selector-caption-text);
	background-color: var(--ck-color-selector-caption-background);
	padding: .6em;
	font-size: .75em;
	outline-offset: -1px;

	/* Improve placeholder rendering in high-constrast mode (https://github.com/ckeditor/ckeditor5/issues/14907). */
	@mixin ck-media-forced-colors {
		background-color: unset;
		color: unset;
	}
}

/* Editing styles */
.ck.ck-editor__editable .table > figcaption {
	@mixin ck-media-default-colors {
		&.table__caption_highlighted {
			animation: ck-table-caption-highlight .6s ease-out;
		}
	}

	&.ck-placeholder::before {
		padding-left: inherit;
		padding-right: inherit;

		/*
		 * Make sure the table caption placeholder doesn't overflow the placeholder area.
		 * See https://github.com/ckeditor/ckeditor5/issues/9162.
		 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

@keyframes ck-table-caption-highlight {
	0% {
		background-color: var(--ck-color-selector-caption-highlighted-background);
	}

	100% {
		background-color: var(--ck-color-selector-caption-background);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-forced-colors {
	@media (forced-colors: active) {
		& {
			@mixin-content;
		}
	}
}

@define-mixin ck-media-default-colors {
	@media (forced-colors: none) {
		& {
			@mixin-content;
		}
	}
}
`],sourceRoot:""}]);const w=k},8986:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__alignment-row{flex-wrap:wrap}.ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__alignment-row .ck.ck-toolbar:first-of-type{flex-grow:0.57}.ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__alignment-row .ck.ck-toolbar:last-of-type{flex-grow:0.43}.ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__alignment-row .ck.ck-toolbar .ck-button{flex-grow:1}.ck.ck-table-cell-properties-form{width:320px}.ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__padding-row{align-self:flex-end;padding:0;width:25%}.ck.ck-table-cell-properties-form .ck-form__row.ck-table-cell-properties-form__alignment-row .ck.ck-toolbar{background:none;margin-top:var(--ck-spacing-standard)}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/tablecellproperties.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/tablecellproperties.css"],names:[],mappings:"AAOE,6FACC,cAiBD,CAdE,0HAEC,cACD,CAEA,yHAEC,cACD,CAEA,uHACC,WACD,CClBJ,kCACC,WAkBD,CAfE,2FACC,mBAAoB,CACpB,SAAU,CACV,SACD,CAGC,4GACC,eAAgB,CAGhB,qCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-table-cell-properties-form {
	& .ck-form__row {
		&.ck-table-cell-properties-form__alignment-row {
			flex-wrap: wrap;

			& .ck.ck-toolbar {
				&:first-of-type {
					/* 4 buttons out of 7 (h-alignment + v-alignment) = 0.57 */
					flex-grow: 0.57;
				}

				&:last-of-type {
					/* 3 buttons out of 7 (h-alignment + v-alignment) = 0.43 */
					flex-grow: 0.43;
				}

				& .ck-button {
					flex-grow: 1;
				}
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-table-cell-properties-form {
	width: 320px;

	& .ck-form__row {
		&.ck-table-cell-properties-form__padding-row {
			align-self: flex-end;
			padding: 0;
			width: 25%;
		}

		&.ck-table-cell-properties-form__alignment-row {
			& .ck.ck-toolbar {
				background: none;

				/* Compensate for missing input label that would push the margin (toolbar has no inputs). */
				margin-top: var(--ck-spacing-standard);
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},8795:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-selector-column-resizer-hover:var(--ck-color-base-active);--ck-table-column-resizer-width:7px;--ck-table-column-resizer-position-offset:calc(var(--ck-table-column-resizer-width)*-0.5 - 0.5px)}.ck-content .table .ck-table-resized{table-layout:fixed}.ck-content .table table{overflow:hidden}.ck-content .table td,.ck-content .table th{overflow-wrap:break-word;position:relative}.ck.ck-editor__editable .table .ck-table-column-resizer{bottom:0;cursor:col-resize;position:absolute;right:var(--ck-table-column-resizer-position-offset);top:0;user-select:none;width:var(--ck-table-column-resizer-width);z-index:var(--ck-z-default)}.ck.ck-editor__editable .table[draggable] .ck-table-column-resizer,.ck.ck-editor__editable.ck-column-resize_disabled .table .ck-table-column-resizer{display:none}.ck.ck-editor__editable .table .ck-table-column-resizer:hover,.ck.ck-editor__editable .table .ck-table-column-resizer__active{background-color:var(--ck-color-selector-column-resizer-hover);bottom:-999999px;opacity:.25;top:-999999px}.ck.ck-editor__editable[dir=rtl] .table .ck-table-column-resizer{left:var(--ck-table-column-resizer-position-offset);right:unset}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/tablecolumnresize.css"],names:[],mappings:"AAKA,MACC,oEAAqE,CACrE,mCAAoC,CAIpC,iGACD,CAEA,qCACC,kBACD,CAEA,yBACC,eACD,CAEA,4CAIC,wBAAyB,CACzB,iBACD,CAEA,wDAGC,QAAS,CAGT,iBAAkB,CALlB,iBAAkB,CAGlB,oDAAqD,CAFrD,KAAM,CAKN,gBAAiB,CAFjB,0CAA2C,CAG3C,2BACD,CAQA,qJACC,YACD,CAEA,8HAEC,8DAA+D,CAO/D,gBAAiB,CANjB,WAAa,CAKb,aAED,CAEA,iEACC,mDAAoD,CACpD,WACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-selector-column-resizer-hover: var(--ck-color-base-active);
	--ck-table-column-resizer-width: 7px;

	/* The offset used for absolute positioning of the resizer element, so that it is placed exactly above the cell border.
	   The value is: minus half the width of the resizer decreased additionaly by the half the width of the border (0.5px). */
	--ck-table-column-resizer-position-offset: calc(var(--ck-table-column-resizer-width) * -0.5 - 0.5px);
}

.ck-content .table .ck-table-resized {
	table-layout: fixed;
}

.ck-content .table table {
	overflow: hidden;
}

.ck-content .table td,
.ck-content .table th {
	/* To prevent text overflowing beyond its cell when columns are resized by resize handler
	(https://github.com/ckeditor/ckeditor5/pull/14379#issuecomment-1589460978). */
	overflow-wrap: break-word;
	position: relative;
}

.ck.ck-editor__editable .table .ck-table-column-resizer {
	position: absolute;
	top: 0;
	bottom: 0;
	right: var(--ck-table-column-resizer-position-offset);
	width: var(--ck-table-column-resizer-width);
	cursor: col-resize;
	user-select: none;
	z-index: var(--ck-z-default);
}

.ck.ck-editor__editable.ck-column-resize_disabled .table .ck-table-column-resizer {
	display: none;
}

/* The resizer elements, which are extended to an extremely high height, break the drag & drop feature in Chrome. To make it work again,
   all resizers must be hidden while the table is dragged. */
.ck.ck-editor__editable .table[draggable] .ck-table-column-resizer {
	display: none;
}

.ck.ck-editor__editable .table .ck-table-column-resizer:hover,
.ck.ck-editor__editable .table .ck-table-column-resizer__active {
	background-color: var(--ck-color-selector-column-resizer-hover);
	opacity: 0.25;
	/* The resizer element resides in each cell so to occupy the entire height of the table, which is unknown from a CSS point of view,
	   it is extended to an extremely high height. Even for screens with a very high pixel density, the resizer will fulfill its role as
	   it should, i.e. for a screen of 476 ppi the total height of the resizer will take over 350 sheets of A4 format, which is totally
	   unrealistic height for a single table. */
	top: -999999px;
	bottom: -999999px;
}

.ck.ck-editor__editable[dir=rtl] .table .ck-table-column-resizer {
	left: var(--ck-table-column-resizer-position-offset);
	right: unset;
}
`],sourceRoot:""}]);const w=k},8137:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-selector-focused-cell-background:rgba(158,201,250,.3)}.ck-widget.table td.ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck-widget.table td.ck-editor__nested-editable:focus,.ck-widget.table th.ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck-widget.table th.ck-editor__nested-editable:focus{background:var(--ck-color-selector-focused-cell-background);outline:1px solid var(--ck-color-focus-border);outline-offset:-1px}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/tableediting.css"],names:[],mappings:"AAKA,MACC,gEACD,CAWE,8QAGC,2DAA4D,CAC5D,8CAA+C,CAC/C,mBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-selector-focused-cell-background: hsla(212, 90%, 80%, .3);
}

.ck-widget.table {
	& td,
	& th {
		/**
		 * While setting outline is fine, the border should not be modified here
		 * because it overrides the default table cell border color which is not expected.
		 * So do not use \`@mixin ck-focus-ring;\` here, or any other border styles.
		 * See more: https://github.com/ckeditor/ckeditor5/issues/16979
		 */
		&.ck-editor__nested-editable.ck-editor__nested-editable_focused,
		&.ck-editor__nested-editable:focus {
			/* A very slight background to highlight the focused cell */
			background: var(--ck-color-selector-focused-cell-background);
			outline: 1px solid var(--ck-color-focus-border);
			outline-offset: -1px; /* progressive enhancement - no IE support */
		}
	}
}
`],sourceRoot:""}]);const w=k},1623:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck.ck-table-form .ck-form__row.ck-table-form__background-row,.ck.ck-table-form .ck-form__row.ck-table-form__border-row{flex-wrap:wrap}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row{align-items:center;flex-wrap:wrap}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-labeled-field-view{align-items:center;display:flex;flex-direction:column-reverse}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-labeled-field-view .ck.ck-dropdown,.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-table-form__dimension-operator{flex-grow:0}.ck.ck-table-form .ck.ck-labeled-field-view{position:relative}.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status{bottom:calc(var(--ck-table-properties-error-arrow-size)*-1);left:50%;position:absolute;transform:translate(-50%,100%);z-index:1}.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status:after{content:"";left:50%;position:absolute;top:calc(var(--ck-table-properties-error-arrow-size)*-1);transform:translateX(-50%)}:root{--ck-table-properties-error-arrow-size:6px;--ck-table-properties-min-error-width:150px}.ck.ck-table-form .ck-form__row.ck-table-form__border-row .ck-labeled-field-view>.ck-label{font-size:var(--ck-font-size-tiny);text-align:center}.ck.ck-table-form .ck-form__row.ck-table-form__border-row .ck-table-form__border-style,.ck.ck-table-form .ck-form__row.ck-table-form__border-row .ck-table-form__border-width{max-width:80px;min-width:80px;width:80px}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row{padding:0}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-table-form__dimensions-row__height,.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-table-form__dimensions-row__width{margin:0}.ck.ck-table-form .ck-form__row.ck-table-form__dimensions-row .ck-table-form__dimension-operator{align-self:flex-end;display:inline-block;height:var(--ck-ui-component-min-height);line-height:var(--ck-ui-component-min-height);margin:0 var(--ck-spacing-small)}.ck.ck-table-form .ck.ck-labeled-field-view{padding-top:var(--ck-spacing-standard)}.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status{animation:ck-table-form-labeled-view-status-appear .15s ease both;background:var(--ck-color-base-error);border-radius:0;color:var(--ck-color-base-background);min-width:var(--ck-table-properties-min-error-width);padding:var(--ck-spacing-small) var(--ck-spacing-medium);text-align:center}.ck-rounded-corners .ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status,.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status:after{border-color:transparent transparent var(--ck-color-base-error) transparent;border-style:solid;border-width:0 var(--ck-table-properties-error-arrow-size) var(--ck-table-properties-error-arrow-size) var(--ck-table-properties-error-arrow-size)}@media (prefers-reduced-motion:reduce){.ck.ck-table-form .ck.ck-labeled-field-view .ck.ck-labeled-field-view__status{animation:none}}.ck.ck-table-form .ck.ck-labeled-field-view .ck-input.ck-error:not(:focus)+.ck.ck-labeled-field-view__status{display:none}@keyframes ck-table-form-labeled-view-status-appear{0%{opacity:0}to{opacity:1}}',"",{version:3,sources:["webpack://./../ckeditor5-table/theme/tableform.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/tableform.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAWE,wHACC,cACD,CAEA,8DAEC,kBAAmB,CADnB,cAgBD,CAbC,qFAGC,kBAAmB,CAFnB,YAAa,CACb,6BAMD,CAEA,sMACC,WACD,CAIF,4CAEC,iBAoBD,CAlBC,8EAGC,2DAAgE,CADhE,QAAS,CADT,iBAAkB,CAGlB,8BAA+B,CAG/B,SAUD,CAPC,oFACC,UAAW,CAGX,QAAS,CAFT,iBAAkB,CAClB,wDAA6D,CAE7D,0BACD,CChDH,MACC,0CAA2C,CAC3C,2CACD,CAMI,2FACC,kCAAmC,CACnC,iBACD,CAGD,8KAIC,cAAe,CADf,cAAe,CADf,UAGD,CAGD,8DACC,SAcD,CAZC,yMAEC,QACD,CAEA,iGACC,mBAAoB,CACpB,oBAAqB,CACrB,wCAAyC,CACzC,6CAA8C,CAC9C,gCACD,CAIF,4CACC,sCA6BD,CA3BC,8EAgBC,iEAAkE,CAblE,qCAAsC,CC3CxC,eAAgB,CD4Cd,qCAAsC,CAEtC,oDAAqD,CADrD,wDAAyD,CAEzD,iBAcD,CC3DD,mMAEC,qCAED,CD4CE,oFACC,2EAA4E,CAE5E,kBAAmB,CADnB,kJAED,CAIA,uCAlBD,8EAmBE,cAEF,CADC,CAID,6GACC,YACD,CAIF,oDACC,GACC,SACD,CAEA,GACC,SACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-table-form {
	& .ck-form__row {
		&.ck-table-form__border-row {
			flex-wrap: wrap;
		}

		&.ck-table-form__background-row {
			flex-wrap: wrap;
		}

		&.ck-table-form__dimensions-row {
			flex-wrap: wrap;
			align-items: center;

			& .ck-labeled-field-view {
				display: flex;
				flex-direction: column-reverse;
				align-items: center;

				& .ck.ck-dropdown {
					flex-grow: 0;
				}
			}

			& .ck-table-form__dimension-operator {
				flex-grow: 0;
			}
		}
	}

	& .ck.ck-labeled-field-view {
		/* Allow absolute positioning of the status (error) balloons. */
		position: relative;

		& .ck.ck-labeled-field-view__status {
			position: absolute;
			left: 50%;
			bottom: calc( -1 * var(--ck-table-properties-error-arrow-size) );
			transform: translate(-50%,100%);

			/* Make sure the balloon status stays on top of other form elements. */
			z-index: 1;

			/* The arrow pointing towards the field. */
			&::after {
				content: "";
				position: absolute;
				top: calc( -1 * var(--ck-table-properties-error-arrow-size) );
				left: 50%;
				transform: translateX( -50% );
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../mixins/_rounded.css";

:root {
	--ck-table-properties-error-arrow-size: 6px;
	--ck-table-properties-min-error-width: 150px;
}

.ck.ck-table-form {
	& .ck-form__row {
		&.ck-table-form__border-row {
			& .ck-labeled-field-view {
				& > .ck-label {
					font-size: var(--ck-font-size-tiny);
					text-align: center;
				}
			}

			& .ck-table-form__border-style,
			& .ck-table-form__border-width {
				width: 80px;
				min-width: 80px;
				max-width: 80px;
			}
		}

		&.ck-table-form__dimensions-row {
			padding: 0;

			& .ck-table-form__dimensions-row__width,
			& .ck-table-form__dimensions-row__height {
				margin: 0
			}

			& .ck-table-form__dimension-operator {
				align-self: flex-end;
				display: inline-block;
				height: var(--ck-ui-component-min-height);
				line-height: var(--ck-ui-component-min-height);
				margin: 0 var(--ck-spacing-small);
			}
		}
	}

	& .ck.ck-labeled-field-view {
		padding-top: var(--ck-spacing-standard);

		& .ck.ck-labeled-field-view__status {
			@mixin ck-rounded-corners;

			background: var(--ck-color-base-error);
			color: var(--ck-color-base-background);
			padding: var(--ck-spacing-small) var(--ck-spacing-medium);
			min-width: var(--ck-table-properties-min-error-width);
			text-align: center;

			/* The arrow pointing towards the field. */
			&::after {
				border-color: transparent transparent var(--ck-color-base-error) transparent;
				border-width: 0 var(--ck-table-properties-error-arrow-size) var(--ck-table-properties-error-arrow-size) var(--ck-table-properties-error-arrow-size);
				border-style: solid;
			}

			animation: ck-table-form-labeled-view-status-appear .15s ease both;

			@media (prefers-reduced-motion: reduce) {
				animation: none;
			}
		}

		/* Hide the error balloon when the field is blurred. Makes the experience much more clear. */
		& .ck-input.ck-error:not(:focus) + .ck.ck-labeled-field-view__status {
			display: none;
		}
	}
}

@keyframes ck-table-form-labeled-view-status-appear {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},5562:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-table-properties-form .ck-form__row.ck-table-properties-form__alignment-row{align-content:baseline;flex-basis:0;flex-wrap:wrap}.ck.ck-table-properties-form .ck-form__row.ck-table-properties-form__alignment-row .ck.ck-toolbar .ck-toolbar__items{flex-wrap:nowrap}.ck.ck-table-properties-form{width:320px}.ck.ck-table-properties-form .ck-form__row.ck-table-properties-form__alignment-row{align-self:flex-end;padding:0}.ck.ck-table-properties-form .ck-form__row.ck-table-properties-form__alignment-row .ck.ck-toolbar{background:none;margin-top:var(--ck-spacing-standard)}.ck.ck-table-properties-form .ck-form__row.ck-table-properties-form__alignment-row .ck.ck-toolbar .ck-toolbar__items>*{width:40px}","",{version:3,sources:["webpack://./../ckeditor5-table/theme/tableproperties.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/tableproperties.css"],names:[],mappings:"AAOE,mFAGC,sBAAuB,CADvB,YAAa,CADb,cAOD,CAHC,qHACC,gBACD,CCTH,6BACC,WAmBD,CAhBE,mFACC,mBAAoB,CACpB,SAYD,CAVC,kGACC,eAAgB,CAGhB,qCAKD,CAHC,uHACC,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-table-properties-form {
	& .ck-form__row {
		&.ck-table-properties-form__alignment-row {
			flex-wrap: wrap;
			flex-basis: 0;
			align-content: baseline;

			& .ck.ck-toolbar .ck-toolbar__items {
				flex-wrap: nowrap;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-table-properties-form {
	width: 320px;

	& .ck-form__row {
		&.ck-table-properties-form__alignment-row {
			align-self: flex-end;
			padding: 0;

			& .ck.ck-toolbar {
				background: none;

				/* Compensate for missing input label that would push the margin (toolbar has no inputs). */
				margin-top: var(--ck-spacing-standard);

				& .ck-toolbar__items > * {
					width: 40px;
				}
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},8423:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,':root{--ck-table-selected-cell-background:rgba(158,207,250,.3)}.ck.ck-editor__editable .table table td.ck-editor__editable_selected,.ck.ck-editor__editable .table table th.ck-editor__editable_selected{box-shadow:unset;caret-color:transparent;outline:unset;position:relative}.ck.ck-editor__editable .table table td.ck-editor__editable_selected:after,.ck.ck-editor__editable .table table th.ck-editor__editable_selected:after{background-color:var(--ck-table-selected-cell-background);bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.ck.ck-editor__editable .table table td.ck-editor__editable_selected ::selection,.ck.ck-editor__editable .table table td.ck-editor__editable_selected:focus,.ck.ck-editor__editable .table table th.ck-editor__editable_selected ::selection,.ck.ck-editor__editable .table table th.ck-editor__editable_selected:focus{background-color:transparent}.ck.ck-editor__editable .table table td.ck-editor__editable_selected .ck-widget,.ck.ck-editor__editable .table table th.ck-editor__editable_selected .ck-widget{outline:unset}.ck.ck-editor__editable .table table td.ck-editor__editable_selected .ck-widget>.ck-widget__selection-handle,.ck.ck-editor__editable .table table th.ck-editor__editable_selected .ck-widget>.ck-widget__selection-handle{display:none}',"",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-table/tableselection.css"],names:[],mappings:"AAKA,MACC,wDACD,CAGC,0IAKC,gBAAiB,CAFjB,uBAAwB,CACxB,aAAc,CAFd,iBAiCD,CA3BC,sJAGC,yDAA0D,CAK1D,QAAS,CAPT,UAAW,CAKX,MAAO,CAJP,mBAAoB,CAEpB,iBAAkB,CAGlB,OAAQ,CAFR,KAID,CAEA,wTAEC,4BACD,CAMA,gKACC,aAKD,CAHC,0NACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-table-selected-cell-background: hsla(208, 90%, 80%, .3);
}

.ck.ck-editor__editable .table table {
	& td.ck-editor__editable_selected,
	& th.ck-editor__editable_selected {
		position: relative;
		caret-color: transparent;
		outline: unset;
		box-shadow: unset;

		/* https://github.com/ckeditor/ckeditor5/issues/6446 */
		&:after {
			content: '';
			pointer-events: none;
			background-color: var(--ck-table-selected-cell-background);
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		& ::selection,
		&:focus {
			background-color: transparent;
		}

		/*
		 * To reduce the amount of noise, all widgets in the table selection have no outline and no selection handle.
		 * See https://github.com/ckeditor/ckeditor5/issues/9491.
		 */
		& .ck-widget {
			outline: unset;

			& > .ck-widget__selection-handle {
				display: none;
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},1801:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-aria-live-announcer{left:-10000px;position:absolute;top:-10000px}.ck.ck-aria-live-region-list{list-style-type:none}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/arialiveannouncer/arialiveannouncer.css"],names:[],mappings:"AAKA,2BAEC,aAAc,CADd,iBAAkB,CAElB,YACD,CAEA,6BACC,oBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-aria-live-announcer {
	position: absolute;
	left: -10000px;
	top: -10000px;
}

.ck.ck-aria-live-region-list {
	list-style-type: none;
}
`],sourceRoot:""}]);const w=k},5727:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-autocomplete{position:relative}.ck.ck-autocomplete>.ck-search__results{position:absolute;z-index:var(--ck-z-panel)}.ck.ck-autocomplete>.ck-search__results.ck-search__results_n{bottom:100%}.ck.ck-autocomplete>.ck-search__results.ck-search__results_s{bottom:auto;top:100%}.ck.ck-autocomplete>.ck-search__results{background:var(--ck-color-base-background);border:1px solid var(--ck-color-dropdown-panel-border);border-radius:0;max-height:200px;min-width:auto;overflow-y:auto}.ck-rounded-corners .ck.ck-autocomplete>.ck-search__results,.ck.ck-autocomplete>.ck-search__results.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-autocomplete>.ck-search__results{box-shadow:var(--ck-drop-shadow),0 0}.ck.ck-autocomplete>.ck-search__results.ck-search__results_n{border-bottom-left-radius:0;border-bottom-right-radius:0;margin-bottom:-1px}.ck.ck-autocomplete>.ck-search__results.ck-search__results_s{border-top-left-radius:0;border-top-right-radius:0;margin-top:-1px}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/autocomplete/autocomplete.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/autocomplete/autocomplete.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAKA,oBACC,iBAeD,CAbC,wCACC,iBAAkB,CAClB,yBAUD,CARC,6DACC,WACD,CAEA,6DAEC,WAAY,CADZ,QAED,CCVD,wCAMC,0CAA2C,CAC3C,sDAAuD,CCLxD,eAAgB,CDEf,gBAAiB,CAIjB,cAAe,CAHf,eAoBD,CCrBA,uHAEC,qCAED,CDRA,wCEAA,oCFyBA,CAfC,6DACC,2BAA4B,CAC5B,4BAA6B,CAG7B,kBACD,CAEA,6DACC,wBAAyB,CACzB,yBAA0B,CAG1B,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-autocomplete {
	position: relative;

	& > .ck-search__results {
		position: absolute;
		z-index: var(--ck-z-panel);

		&.ck-search__results_n {
			bottom: 100%;
		}

		&.ck-search__results_s {
			top: 100%;
			bottom: auto;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-theme-lark/theme/mixins/_rounded.css";
@import "@ckeditor/ckeditor5-theme-lark/theme/mixins/_shadow.css";

.ck.ck-autocomplete {
	& > .ck-search__results {
		@mixin ck-rounded-corners;
		@mixin ck-drop-shadow;

		max-height: 200px;
		overflow-y: auto;
		background: var(--ck-color-base-background);
		border: 1px solid var(--ck-color-dropdown-panel-border);
		min-width: auto;

		&.ck-search__results_n {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;

			/* Prevent duplicated borders between the input and the results pane. */
			margin-bottom: -1px;
		}

		&.ck-search__results_s {
			border-top-left-radius: 0;
			border-top-right-radius: 0;

			/* Prevent duplicated borders between the input and the results pane. */
			margin-top: -1px;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},9715:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-button,a.ck.ck-button{align-items:center;display:inline-flex;position:relative;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}[dir=ltr] .ck.ck-button,[dir=ltr] a.ck.ck-button{justify-content:left}[dir=rtl] .ck.ck-button,[dir=rtl] a.ck.ck-button{justify-content:right}.ck.ck-button .ck-button__label,a.ck.ck-button .ck-button__label{display:none}.ck.ck-button.ck-button_with-text .ck-button__label,a.ck.ck-button.ck-button_with-text .ck-button__label{display:inline-block}.ck.ck-button:not(.ck-button_with-text),a.ck.ck-button:not(.ck-button_with-text){justify-content:center}.ck.ck-button,a.ck.ck-button{-webkit-appearance:none;background:var(--ck-color-button-default-background);border:1px solid transparent;border-radius:0;cursor:default;font-size:inherit;line-height:1;min-height:var(--ck-ui-component-min-height);min-width:var(--ck-ui-component-min-height);padding:var(--ck-spacing-tiny);text-align:center;transition:box-shadow .2s ease-in-out,border .2s ease-in-out;vertical-align:middle;white-space:nowrap}.ck.ck-button:not(.ck-disabled):hover,a.ck.ck-button:not(.ck-disabled):hover{background:var(--ck-color-button-default-hover-background)}.ck.ck-button:not(.ck-disabled):active,a.ck.ck-button:not(.ck-disabled):active{background:var(--ck-color-button-default-active-background)}.ck.ck-button.ck-disabled,a.ck.ck-button.ck-disabled{background:var(--ck-color-button-default-disabled-background)}.ck-rounded-corners .ck.ck-button,.ck-rounded-corners a.ck.ck-button,.ck.ck-button.ck-rounded-corners,a.ck.ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius)}@media (prefers-reduced-motion:reduce){.ck.ck-button,a.ck.ck-button{transition:none}}.ck.ck-button:active,.ck.ck-button:focus,a.ck.ck-button:active,a.ck.ck-button:focus{border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),0 0;outline:none}.ck.ck-button .ck-button__icon use,.ck.ck-button .ck-button__icon use *,a.ck.ck-button .ck-button__icon use,a.ck.ck-button .ck-button__icon use *{color:inherit}.ck.ck-button .ck-button__label,a.ck.ck-button .ck-button__label{color:inherit;cursor:inherit;font-size:inherit;font-weight:inherit;vertical-align:middle}[dir=ltr] .ck.ck-button .ck-button__label,[dir=ltr] a.ck.ck-button .ck-button__label{text-align:left}[dir=rtl] .ck.ck-button .ck-button__label,[dir=rtl] a.ck.ck-button .ck-button__label{text-align:right}.ck.ck-button .ck-button__keystroke,a.ck.ck-button .ck-button__keystroke{color:inherit;opacity:.5}[dir=ltr] .ck.ck-button .ck-button__keystroke,[dir=ltr] a.ck.ck-button .ck-button__keystroke{margin-left:var(--ck-spacing-large)}[dir=rtl] .ck.ck-button .ck-button__keystroke,[dir=rtl] a.ck.ck-button .ck-button__keystroke{margin-right:var(--ck-spacing-large)}.ck.ck-button.ck-disabled:active,.ck.ck-button.ck-disabled:focus,a.ck.ck-button.ck-disabled:active,a.ck.ck-button.ck-disabled:focus{box-shadow:var(--ck-focus-disabled-outer-shadow),0 0}.ck.ck-button.ck-disabled .ck-button__icon,.ck.ck-button.ck-disabled .ck-button__label,a.ck.ck-button.ck-disabled .ck-button__icon,a.ck.ck-button.ck-disabled .ck-button__label{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-disabled .ck-button__keystroke,a.ck.ck-button.ck-disabled .ck-button__keystroke{opacity:.3}.ck.ck-button.ck-button_with-text,a.ck.ck-button.ck-button_with-text{padding:var(--ck-spacing-tiny) var(--ck-spacing-standard)}[dir=ltr] .ck.ck-button.ck-button_with-text .ck-button__icon,[dir=ltr] a.ck.ck-button.ck-button_with-text .ck-button__icon{margin-right:var(--ck-spacing-medium)}[dir=rtl] .ck.ck-button.ck-button_with-text .ck-button__icon,[dir=rtl] a.ck.ck-button.ck-button_with-text .ck-button__icon{margin-left:var(--ck-spacing-medium)}.ck.ck-button.ck-button_with-keystroke .ck-button__label,a.ck.ck-button.ck-button_with-keystroke .ck-button__label{flex-grow:1}.ck.ck-button.ck-on,a.ck.ck-button.ck-on{background:var(--ck-color-button-on-background);color:var(--ck-color-button-on-color)}.ck.ck-button.ck-on:not(.ck-disabled):hover,a.ck.ck-button.ck-on:not(.ck-disabled):hover{background:var(--ck-color-button-on-hover-background)}.ck.ck-button.ck-on:not(.ck-disabled):active,a.ck.ck-button.ck-on:not(.ck-disabled):active{background:var(--ck-color-button-on-active-background)}.ck.ck-button.ck-on.ck-disabled,a.ck.ck-button.ck-on.ck-disabled{background:var(--ck-color-button-on-disabled-background)}.ck.ck-button.ck-button-save,a.ck.ck-button.ck-button-save{color:var(--ck-color-button-save)}.ck.ck-button.ck-button-cancel,a.ck.ck-button.ck-button-cancel{color:var(--ck-color-button-cancel)}.ck.ck-button-action,a.ck.ck-button-action{background:var(--ck-color-button-action-background);color:var(--ck-color-button-action-text)}.ck.ck-button-action:not(.ck-disabled):hover,a.ck.ck-button-action:not(.ck-disabled):hover{background:var(--ck-color-button-action-hover-background)}.ck.ck-button-action:not(.ck-disabled):active,a.ck.ck-button-action:not(.ck-disabled):active{background:var(--ck-color-button-action-active-background)}.ck.ck-button-action.ck-disabled,a.ck.ck-button-action.ck-disabled{background:var(--ck-color-button-action-disabled-background)}.ck.ck-button-bold,a.ck.ck-button-bold{font-weight:700}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/button/button.css","webpack://./../ckeditor5-ui/theme/mixins/_unselectable.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/button/button.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/mixins/_button.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_disabled.css"],names:[],mappings:"AAQA,6BAMC,kBAAmB,CADnB,mBAAoB,CADpB,iBAAkB,CCHlB,qBAAsB,CACtB,wBAAyB,CACzB,oBAAqB,CACrB,gBD0BD,CEhCC,iDFWC,oBETD,CAFA,iDFeC,qBEbD,CFgBA,iEACC,YACD,CAGC,yGACC,oBACD,CAID,iFACC,sBACD,CGzBD,6BA6BC,uBAAwB,CC7BxB,oDAAqC,CDuBrC,4BAA6B,CExB7B,eAAgB,CFOhB,cAAe,CAcf,iBAAkB,CAHlB,aAAc,CAJd,4CAA6C,CAD7C,2CAA4C,CAJ5C,8BAA+B,CAC/B,iBAAkB,CAiBlB,4DAA8D,CAnB9D,qBAAsB,CAFtB,kBAwID,CC1IE,6EACC,0DACD,CAEA,+EACC,2DACD,CAID,qDACC,6DACD,CCdA,wIAEC,qCAED,CF0BA,uCA/BD,6BAgCE,eA6GF,CA5GC,CAEA,oFGpCA,2BAA2B,CCF3B,2CAA8B,CDC9B,YHyCA,CAIC,kJAEC,aACD,CAGD,iEAIC,aAAc,CACd,cAAe,CAHf,iBAAkB,CAClB,mBAAoB,CAMpB,qBASD,CDzEA,qFCmEE,eDjEF,CAFA,qFCuEE,gBDrEF,CCyEA,yEACC,aAAc,CAUd,UACD,CDvFA,6FC+EE,mCD7EF,CAFA,6FCmFE,oCDjFF,CCyFC,oIIxFD,oDJ4FC,CAOA,gLKnGD,kCLqGC,CAEA,iGACC,UACD,CAGD,qEACC,yDAYD,CD5HA,2HCqHG,qCDnHH,CAFA,2HCyHG,oCDvHH,CC8HC,mHACC,WACD,CAID,yCChIA,+CAAqC,CDmIpC,qCACD,CCjIC,yFACC,qDACD,CAEA,2FACC,sDACD,CAID,iEACC,wDACD,CDuHA,2DACC,iCACD,CAEA,+DACC,mCACD,CAID,2CChJC,mDAAqC,CDoJrC,wCACD,CClJE,2FACC,yDACD,CAEA,6FACC,0DACD,CAID,mEACC,4DACD,CDwID,uCAEC,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../mixins/_unselectable.css";
@import "../../mixins/_dir.css";

.ck.ck-button,
a.ck.ck-button {
	@mixin ck-unselectable;

	position: relative;
	display: inline-flex;
	align-items: center;

	@mixin ck-dir ltr {
		justify-content: left;
	}

	@mixin ck-dir rtl {
		justify-content: right;
	}

	& .ck-button__label {
		display: none;
	}

	&.ck-button_with-text {
		& .ck-button__label {
			display: inline-block;
		}
	}

	/* Center the icon horizontally in a button without text. */
	&:not(.ck-button_with-text)  {
		justify-content: center;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Makes element unselectable.
 */
@define-mixin ck-unselectable {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_focus.css";
@import "../../../mixins/_shadow.css";
@import "../../../mixins/_disabled.css";
@import "../../../mixins/_rounded.css";
@import "../../mixins/_button.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-button,
a.ck.ck-button {
	@mixin ck-button-colors --ck-color-button-default;
	@mixin ck-rounded-corners;

	white-space: nowrap;
	cursor: default;
	vertical-align: middle;
	padding: var(--ck-spacing-tiny);
	text-align: center;

	/* A very important piece of styling. Go to variable declaration to learn more. */
	min-width: var(--ck-ui-component-min-height);
	min-height: var(--ck-ui-component-min-height);

	/* Normalize the height of the line. Removing this will break consistent height
	among text and text-less buttons (with icons). */
	line-height: 1;

	/* Enable font size inheritance, which allows fluid UI scaling. */
	font-size: inherit;

	/* Avoid flickering when the foucs border shows up. */
	border: 1px solid transparent;

	/* Apply some smooth transition to the box-shadow and border. */
	transition: box-shadow .2s ease-in-out, border .2s ease-in-out;

	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/189 */
	-webkit-appearance: none;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&:active,
	&:focus {
		@mixin ck-focus-ring;
		@mixin ck-box-shadow var(--ck-focus-outer-shadow);
	}

	/* Allow icon coloring using the text "color" property. */
	& .ck-button__icon {
		& use,
		& use * {
			color: inherit;
		}
	}

	& .ck-button__label {
		/* Enable font size inheritance, which allows fluid UI scaling. */
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		cursor: inherit;

		/* Must be consistent with .ck-icon's vertical align. Otherwise, buttons with and
		without labels (but with icons) have different sizes in Chrome */
		vertical-align: middle;

		@mixin ck-dir ltr {
			text-align: left;
		}

		@mixin ck-dir rtl {
			text-align: right;
		}
	}

	& .ck-button__keystroke {
		color: inherit;

		@mixin ck-dir ltr {
			margin-left: var(--ck-spacing-large);
		}

		@mixin ck-dir rtl {
			margin-right: var(--ck-spacing-large);
		}

		opacity: .5;
	}

	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/70 */
	&.ck-disabled {
		&:active,
		&:focus {
			/* The disabled button should have a slightly less visible shadow when focused. */
			@mixin ck-box-shadow var(--ck-focus-disabled-outer-shadow);
		}

		& .ck-button__icon {
			@mixin ck-disabled;
		}

		/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/98 */
		& .ck-button__label {
			@mixin ck-disabled;
		}

		& .ck-button__keystroke {
			opacity: .3;
		}
	}

	&.ck-button_with-text {
		padding: var(--ck-spacing-tiny) var(--ck-spacing-standard);

		/* stylelint-disable-next-line no-descending-specificity */
		& .ck-button__icon {
			@mixin ck-dir ltr {
				margin-right: var(--ck-spacing-medium);
			}

			@mixin ck-dir rtl {
				margin-left: var(--ck-spacing-medium);
			}
		}
	}

	&.ck-button_with-keystroke {
		/* stylelint-disable-next-line no-descending-specificity */
		& .ck-button__label {
			flex-grow: 1;
		}
	}

	/* A style of the button which is currently on, e.g. its feature is active. */
	&.ck-on {
		@mixin ck-button-colors --ck-color-button-on;

		color: var(--ck-color-button-on-color);
	}

	&.ck-button-save {
		color: var(--ck-color-button-save);
	}

	&.ck-button-cancel {
		color: var(--ck-color-button-cancel);
	}
}

/* A style of the button which handles the primary action. */
.ck.ck-button-action,
a.ck.ck-button-action {
	@mixin ck-button-colors --ck-color-button-action;

	color: var(--ck-color-button-action-text);
}

.ck.ck-button-bold,
a.ck.ck-button-bold {
	font-weight: bold;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements a button of given background color.
 *
 * @param {String} $background - Background color of the button.
 * @param {String} $border - Border color of the button.
 */
@define-mixin ck-button-colors $prefix {
	background: var($(prefix)-background);

	&:not(.ck-disabled) {
		&:hover {
			background: var($(prefix)-hover-background);
		}

		&:active {
			background: var($(prefix)-active-background);
		}
	}

	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/98 */
	&.ck-disabled {
		background: var($(prefix)-disabled-background);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which indicates that an element holding it is disabled.
 */
@define-mixin ck-disabled {
	opacity: var(--ck-disabled-opacity);
}
`],sourceRoot:""}]);const w=k},278:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-list-item-button{border-radius:0;min-height:unset;width:100%}[dir=ltr] .ck.ck-list-item-button{text-align:left}[dir=rtl] .ck.ck-list-item-button{text-align:right}[dir=ltr] .ck.ck-list-item-button.ck-list-item-button_toggleable{padding-left:var(--ck-spacing-small)}[dir=rtl] .ck.ck-list-item-button.ck-list-item-button_toggleable{padding-right:var(--ck-spacing-small)}.ck.ck-list-item-button .ck-list-item-button__check-holder{display:inline-flex;height:.9em;width:.9em}[dir=ltr] .ck.ck-list-item-button .ck-list-item-button__check-holder{margin-right:var(--ck-spacing-small)}[dir=rtl] .ck.ck-list-item-button .ck-list-item-button__check-holder{margin-left:var(--ck-spacing-small)}.ck.ck-list-item-button .ck-list-item-button__check-icon{height:100%}.ck.ck-button.ck-list-item-button{padding:var(--ck-spacing-tiny) calc(var(--ck-spacing-standard)*2)}.ck.ck-button.ck-list-item-button,.ck.ck-button.ck-list-item-button.ck-on{background:var(--ck-color-list-background);color:var(--ck-color-text)}[dir=ltr] .ck.ck-button.ck-list-item-button:has(.ck-list-item-button__check-holder){padding-left:var(--ck-spacing-small)}[dir=rtl] .ck.ck-button.ck-list-item-button:has(.ck-list-item-button__check-holder){padding-right:var(--ck-spacing-small)}.ck.ck-button.ck-list-item-button.ck-button.ck-on:hover,.ck.ck-button.ck-list-item-button.ck-on:hover,.ck.ck-button.ck-list-item-button.ck-on:not(.ck-list-item-button_toggleable),.ck.ck-button.ck-list-item-button:hover:not(.ck-disabled){background:var(--ck-color-list-button-hover-background)}.ck.ck-button.ck-list-item-button.ck-button.ck-on:hover:not(.ck-disabled),.ck.ck-button.ck-list-item-button.ck-on:hover:not(.ck-disabled),.ck.ck-button.ck-list-item-button.ck-on:not(.ck-list-item-button_toggleable):not(.ck-disabled),.ck.ck-button.ck-list-item-button:hover:not(.ck-disabled):not(.ck-disabled){color:var(--ck-color-text)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/button/listitembutton.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/button/listitembutton.css"],names:[],mappings:"AAOA,wBAGC,eAAgB,CAFhB,gBAAiB,CACjB,UAsCD,CCzCC,kCDOC,eCLD,CAFA,kCDWC,gBCTD,CAFA,iEDgBE,oCCdF,CAFA,iEDoBE,qCClBF,CDsBA,2DACC,mBAAoB,CAEpB,WAAY,CADZ,UAUD,CCpCA,qED8BE,oCC5BF,CAFA,qEDkCE,mCChCF,CDoCA,yDACC,WACD,CEvCD,kCACC,iEAiCD,CA/BC,0EAEC,0CAA2C,CAC3C,0BACD,CDRA,oFCYE,oCDVF,CAFA,oFCgBE,qCDdF,CCuBA,6OAIC,uDAKD,CAHC,qTACC,0BACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../mixins/_dir.css";

.ck.ck-list-item-button {
	min-height: unset;
	width: 100%;
	border-radius: 0;

	@mixin ck-dir ltr {
		text-align: left;
	}

	@mixin ck-dir rtl {
		text-align: right;
	}

	&.ck-list-item-button_toggleable {
		@mixin ck-dir ltr {
			padding-left: var(--ck-spacing-small);
		}

		@mixin ck-dir rtl {
			padding-right: var(--ck-spacing-small);
		}
	}

	& .ck-list-item-button__check-holder {
		display: inline-flex;
		width: .9em;
		height: .9em;

		@mixin ck-dir ltr {
			margin-right: var(--ck-spacing-small);
		}

		@mixin ck-dir rtl {
			margin-left: var(--ck-spacing-small);
		}
	}

	& .ck-list-item-button__check-icon {
		height: 100%;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-button.ck-list-item-button {
	padding: var(--ck-spacing-tiny) calc(2 * var(--ck-spacing-standard));

	&,
	&.ck-on {
		background: var(--ck-color-list-background);
		color: var(--ck-color-text);
	}

	&:has(.ck-list-item-button__check-holder) {
		@mixin ck-dir ltr {
			padding-left: var(--ck-spacing-small);
		}

		@mixin ck-dir rtl {
			padding-right: var(--ck-spacing-small);
		}
	}

	/*
	 * \`.ck-on\` class and background styling is overridden for \`ck-button\` in many places.
	 * This is a workaround to make sure that the background is not overridden and uses similar
	 * selector specificity as the other overrides.
	 */
	&:hover:not(.ck-disabled),
	&.ck-button.ck-on:hover,
	&.ck-on:not(.ck-list-item-button_toggleable),
	&.ck-on:hover {
		background: var(--ck-color-list-button-hover-background);

		&:not(.ck-disabled) {
			color: var(--ck-color-text);
		}
	}
}
`],sourceRoot:""}]);const w=k},4391:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-button.ck-switchbutton .ck-button__toggle,.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{display:block}:root{--ck-switch-button-toggle-width:2.6153846154em;--ck-switch-button-toggle-inner-size:calc(1.07692em + 1px);--ck-switch-button-translation:calc(var(--ck-switch-button-toggle-width) - var(--ck-switch-button-toggle-inner-size) - 2px);--ck-switch-button-inner-hover-shadow:0 0 0 5px var(--ck-color-switch-button-inner-shadow)}.ck.ck-button.ck-switchbutton,.ck.ck-button.ck-switchbutton.ck-on:active,.ck.ck-button.ck-switchbutton.ck-on:focus,.ck.ck-button.ck-switchbutton.ck-on:hover,.ck.ck-button.ck-switchbutton:active,.ck.ck-button.ck-switchbutton:focus,.ck.ck-button.ck-switchbutton:hover{background:transparent;color:inherit}[dir=ltr] .ck.ck-button.ck-switchbutton .ck-button__label{margin-right:calc(var(--ck-spacing-large)*2)}[dir=rtl] .ck.ck-button.ck-switchbutton .ck-button__label{margin-left:calc(var(--ck-spacing-large)*2)}.ck.ck-button.ck-switchbutton .ck-button__toggle{background:var(--ck-color-switch-button-off-background);border:1px solid transparent;border-radius:0;transition:background .4s ease,box-shadow .2s ease-in-out,outline .2s ease-in-out;width:var(--ck-switch-button-toggle-width)}.ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle,.ck.ck-button.ck-switchbutton .ck-button__toggle.ck-rounded-corners{border-radius:var(--ck-border-radius)}[dir=ltr] .ck.ck-button.ck-switchbutton .ck-button__toggle{margin-left:auto}[dir=rtl] .ck.ck-button.ck-switchbutton .ck-button__toggle{margin-right:auto}.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{background:var(--ck-color-switch-button-inner-background);border-radius:0;height:var(--ck-switch-button-toggle-inner-size);transition:all .3s ease;width:var(--ck-switch-button-toggle-inner-size)}.ck-rounded-corners .ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner,.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner.ck-rounded-corners{border-radius:var(--ck-border-radius);border-radius:calc(var(--ck-border-radius)*.5)}@media (prefers-reduced-motion:reduce){.ck.ck-button.ck-switchbutton .ck-button__toggle .ck-button__toggle__inner{transition:none}}.ck.ck-button.ck-switchbutton .ck-button__toggle:hover{background:var(--ck-color-switch-button-off-hover-background)}.ck.ck-button.ck-switchbutton .ck-button__toggle:hover .ck-button__toggle__inner{box-shadow:var(--ck-switch-button-inner-hover-shadow)}.ck.ck-button.ck-switchbutton.ck-disabled .ck-button__toggle{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-switchbutton:focus{border-color:transparent;box-shadow:none;outline:none}.ck.ck-button.ck-switchbutton:focus .ck-button__toggle{box-shadow:0 0 0 1px var(--ck-color-base-background),0 0 0 5px var(--ck-color-focus-outer-shadow);outline:var(--ck-focus-ring);outline-offset:1px}.ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle{background:var(--ck-color-switch-button-on-background)}.ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle:hover{background:var(--ck-color-switch-button-on-hover-background)}[dir=ltr] .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle .ck-button__toggle__inner{transform:translateX(var( --ck-switch-button-translation ))}[dir=rtl] .ck.ck-button.ck-switchbutton.ck-on .ck-button__toggle .ck-button__toggle__inner{transform:translateX(calc(var( --ck-switch-button-translation )*-1))}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/button/switchbutton.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/button/switchbutton.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_disabled.css"],names:[],mappings:"AASE,4HACC,aACD,CCCF,MAEC,8CAA+C,CAE/C,0DAAgE,CAChE,2HAIC,CACD,0FACD,CAOC,0QAEC,sBAAuB,CADvB,aAED,CC3BA,0DDgCE,4CC9BF,CAFA,0DDqCE,2CCnCF,CDuCA,iDAkBC,uDAAwD,CAFxD,4BAA6B,CEpD9B,eAAgB,CFmDf,iFAAsF,CAEtF,0CA2BD,CE9EA,yIAEC,qCAED,CDXA,2DD8CE,gBC5CF,CAFA,2DDmDE,iBCjDF,CD2DC,2EAOC,yDAA0D,CE/D5D,eAAgB,CF8Dd,gDAAiD,CAIjD,uBAA0B,CAL1B,+CAUD,CErED,6LAEC,qCAAsC,CFsDpC,8CEpDH,CF8DE,uCAZD,2EAaE,eAEF,CADC,CAGD,uDACC,6DAKD,CAHC,iFACC,qDACD,CAIF,6DGpFA,kCHsFA,CAGA,oCACC,wBAAyB,CAEzB,eAAgB,CADhB,YAQD,CALC,uDACC,iGAAmG,CAEnG,4BAA6B,CAD7B,kBAED,CAKA,uDACC,sDAkBD,CAhBC,6DACC,4DACD,CC/GF,2FDsHI,2DCpHJ,CAFA,2FD0HI,oECxHJ",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-button.ck-switchbutton {
	& .ck-button__toggle {
		display: block;

		& .ck-button__toggle__inner {
			display: block;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_disabled.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

/* Note: To avoid rendering issues (aliasing) but to preserve the responsive nature
of the component, floating–point numbers have been used which, for the default font size
(see: --ck-font-size-base), will generate simple integers. */
:root {
	/* 34px at 13px font-size */
	--ck-switch-button-toggle-width: 2.6153846154em;
	/* 14px at 13px font-size */
	--ck-switch-button-toggle-inner-size: calc(1.0769230769em + 1px);
	--ck-switch-button-translation: calc(
		var(--ck-switch-button-toggle-width) -
		var(--ck-switch-button-toggle-inner-size) -
		2px /* Border */
	);
	--ck-switch-button-inner-hover-shadow: 0 0 0 5px var(--ck-color-switch-button-inner-shadow);
}

.ck.ck-button.ck-switchbutton {
	/* Unlike a regular button, the switch button text color and background should never change.
	 * Changing toggle switch (background, outline) is enough to carry the information about the
	 * state of the entire component (https://github.com/ckeditor/ckeditor5/issues/12519)
	 */
	&, &:hover, &:focus, &:active, &.ck-on:hover, &.ck-on:focus, &.ck-on:active {
		color: inherit;
		background: transparent;
	}

	& .ck-button__label {
		@mixin ck-dir ltr {
			/* Separate the label from the switch */
			margin-right: calc(2 * var(--ck-spacing-large));
		}

		@mixin ck-dir rtl {
			/* Separate the label from the switch */
			margin-left: calc(2 * var(--ck-spacing-large));
		}
	}

	& .ck-button__toggle {
		@mixin ck-rounded-corners;

		@mixin ck-dir ltr {
			/* Make sure the toggle is always to the right as far as possible. */
			margin-left: auto;
		}

		@mixin ck-dir rtl {
			/* Make sure the toggle is always to the left as far as possible. */
			margin-right: auto;
		}

		/* Apply some smooth transition to the box-shadow and border. */
		/* Gently animate the background color of the toggle switch */
		transition: background 400ms ease, box-shadow .2s ease-in-out, outline .2s ease-in-out;
		border: 1px solid transparent;
		width: var(--ck-switch-button-toggle-width);
		background: var(--ck-color-switch-button-off-background);

		& .ck-button__toggle__inner {
			@mixin ck-rounded-corners {
				border-radius: calc(.5 * var(--ck-border-radius));
			}

			width: var(--ck-switch-button-toggle-inner-size);
			height: var(--ck-switch-button-toggle-inner-size);
			background: var(--ck-color-switch-button-inner-background);

			/* Gently animate the inner part of the toggle switch */
			transition: all 300ms ease;

			@media (prefers-reduced-motion: reduce) {
				transition: none;
			}
		}

		&:hover {
			background: var(--ck-color-switch-button-off-hover-background);

			& .ck-button__toggle__inner {
				box-shadow: var(--ck-switch-button-inner-hover-shadow);
			}
		}
	}

	&.ck-disabled .ck-button__toggle {
		@mixin ck-disabled;
	}

	/* Overriding default .ck-button:focus styles + an outline around the toogle */
	&:focus {
		border-color: transparent;
		outline: none;
		box-shadow: none;

		& .ck-button__toggle {
			box-shadow: 0 0 0 1px var(--ck-color-base-background), 0 0 0 5px var(--ck-color-focus-outer-shadow);
			outline-offset: 1px;
			outline: var(--ck-focus-ring);
		}
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&.ck-on {
		& .ck-button__toggle {
			background: var(--ck-color-switch-button-on-background);

			&:hover {
				background: var(--ck-color-switch-button-on-hover-background);
			}

			& .ck-button__toggle__inner {
				/*
				* Move the toggle switch to the right. It will be animated.
				*/
				@mixin ck-dir ltr {
					transform: translateX( var( --ck-switch-button-translation ) );
				}

				@mixin ck-dir rtl {
					transform: translateX( calc( -1 * var( --ck-switch-button-translation ) ) );
				}
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which indicates that an element holding it is disabled.
 */
@define-mixin ck-disabled {
	opacity: var(--ck-disabled-opacity);
}
`],sourceRoot:""}]);const w=k},25:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-collapsible.ck-collapsible_collapsed>.ck-collapsible__children{display:none}:root{--ck-collapsible-arrow-size:calc(var(--ck-icon-size)*0.5)}.ck.ck-collapsible>.ck.ck-button{border-radius:0;color:inherit;font-weight:700;width:100%}.ck.ck-collapsible>.ck.ck-button:focus{background:transparent}.ck.ck-collapsible>.ck.ck-button:active,.ck.ck-collapsible>.ck.ck-button:hover:not(:focus),.ck.ck-collapsible>.ck.ck-button:not(:focus){background:transparent;border-color:transparent;box-shadow:none}.ck.ck-collapsible>.ck.ck-button>.ck-icon{margin-right:var(--ck-spacing-medium);width:var(--ck-collapsible-arrow-size)}.ck.ck-collapsible>.ck-collapsible__children{padding:var(--ck-spacing-medium) var(--ck-spacing-large) var(--ck-spacing-large)}.ck.ck-collapsible.ck-collapsible_collapsed>.ck.ck-button .ck-icon{transform:rotate(-90deg)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/collapsible/collapsible.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/collapsible/collapsible.css"],names:[],mappings:"AAMC,sEACC,YACD,CCHD,MACC,yDACD,CAGC,iCAGC,eAAgB,CAChB,aAAc,CAFd,eAAiB,CADjB,UAmBD,CAdC,uCACC,sBACD,CAEA,wIACC,sBAAuB,CACvB,wBAAyB,CACzB,eACD,CAEA,0CACC,qCAAsC,CACtC,sCACD,CAGD,6CACC,gFACD,CAGC,mEACC,wBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-collapsible.ck-collapsible_collapsed {
	& > .ck-collapsible__children {
		display: none;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-collapsible-arrow-size: calc(0.5 * var(--ck-icon-size));
}

.ck.ck-collapsible {
	& > .ck.ck-button {
		width: 100%;
		font-weight: bold;
		border-radius: 0;
		color: inherit;

		&:focus {
			background: transparent;
		}

		&:active, &:not(:focus), &:hover:not(:focus) {
			background: transparent;
			border-color: transparent;
			box-shadow: none;
		}

		& > .ck-icon {
			margin-right: var(--ck-spacing-medium);
			width: var(--ck-collapsible-arrow-size);
		}
	}

	& > .ck-collapsible__children {
		padding: var(--ck-spacing-medium) var(--ck-spacing-large) var(--ck-spacing-large);
	}

	&.ck-collapsible_collapsed {
		& > .ck.ck-button .ck-icon {
			transform: rotate(-90deg);
		}
	}
}
`],sourceRoot:""}]);const w=k},7317:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-color-grid{display:grid}:root{--ck-color-grid-tile-size:24px;--ck-color-color-grid-check-icon:#166fd4}.ck.ck-color-grid{grid-gap:5px;padding:8px}.ck.ck-color-grid__tile{transition:box-shadow .2s ease}@media (forced-colors:none){.ck.ck-color-grid__tile{border:0;height:var(--ck-color-grid-tile-size);min-height:var(--ck-color-grid-tile-size);min-width:var(--ck-color-grid-tile-size);padding:0;width:var(--ck-color-grid-tile-size)}.ck.ck-color-grid__tile.ck-on,.ck.ck-color-grid__tile:focus:not(.ck-disabled),.ck.ck-color-grid__tile:hover:not(.ck-disabled){border:0}.ck.ck-color-grid__tile.ck-color-selector__color-tile_bordered{box-shadow:0 0 0 1px var(--ck-color-base-border)}.ck.ck-color-grid__tile.ck-on{box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-base-text)}.ck.ck-color-grid__tile:focus:not(.ck-disabled),.ck.ck-color-grid__tile:hover:not(.ck-disabled){box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-focus-border)}}@media (forced-colors:active){.ck.ck-color-grid__tile{height:unset;min-height:unset;min-width:unset;padding:0 var(--ck-spacing-small);width:unset}.ck.ck-color-grid__tile .ck-button__label{display:inline-block}}@media (prefers-reduced-motion:reduce){.ck.ck-color-grid__tile{transition:none}}.ck.ck-color-grid__tile.ck-disabled{cursor:unset;transition:unset}.ck.ck-color-grid__tile .ck.ck-icon{color:var(--ck-color-color-grid-check-icon);display:none}.ck.ck-color-grid__tile.ck-on .ck.ck-icon{display:block}.ck.ck-color-grid__label{padding:0 var(--ck-spacing-standard)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/colorgrid/colorgrid.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/colorgrid/colorgrid.css","webpack://./../ckeditor5-ui/theme/mixins/_mediacolors.css"],names:[],mappings:"AAKA,kBACC,YACD,CCCA,MACC,8BAA+B,CAK/B,wCACD,CAEA,kBACC,YAAa,CACb,WACD,CAEA,wBACC,8BAkED,CC3EC,4BACC,wBDgBA,QAAS,CAJT,qCAAsC,CAEtC,yCAA0C,CAD1C,wCAAyC,CAEzC,SAAU,CAJV,oCCTA,CDgBA,8HAIC,QACD,CAEA,+DACC,gDACD,CAEA,8BACC,8FACD,CAEA,gGAEC,iGACD,CCjCD,CAZA,8BACC,wBDqDA,YAAa,CAEb,gBAAiB,CADjB,eAAgB,CAEhB,iCAAkC,CAJlC,WClDA,CDwDA,0CACC,oBACD,CCzDD,CD4DA,uCAhDD,wBAiDE,eAkBF,CAjBC,CAEA,oCACC,YAAa,CACb,gBACD,CAEA,oCAEC,2CAA4C,CAD5C,YAED,CAGC,0CACC,aACD,CAIF,yBACC,oCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-color-grid {
	display: grid;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_mediacolors.css";

:root {
	--ck-color-grid-tile-size: 24px;

	/* Not using global colors here because these may change but some colors in a pallette
	 * require special treatment. For instance, this ensures no matter what the UI text color is,
	 * the check icon will look good on the black color tile. */
	--ck-color-color-grid-check-icon: hsl(212, 81%, 46%);
}

.ck.ck-color-grid {
	grid-gap: 5px;
	padding: 8px;
}

.ck.ck-color-grid__tile {
	transition: .2s ease box-shadow;

	@mixin ck-media-default-colors {
		width: var(--ck-color-grid-tile-size);
		height: var(--ck-color-grid-tile-size);
		min-width: var(--ck-color-grid-tile-size);
		min-height: var(--ck-color-grid-tile-size);
		padding: 0;
		border: 0;

		&.ck-on,
		&:focus:not( .ck-disabled ),
		&:hover:not( .ck-disabled ) {
			/* Disable the default .ck-button's border ring. */
			border: 0;
		}

		&.ck-color-selector__color-tile_bordered {
			box-shadow: 0 0 0 1px var(--ck-color-base-border);
		}

		&.ck-on {
			box-shadow: inset 0 0 0 1px var(--ck-color-base-background), 0 0 0 2px var(--ck-color-base-text);
		}

		&:focus:not( .ck-disabled ),
		&:hover:not( .ck-disabled ) {
			box-shadow: inset 0 0 0 1px var(--ck-color-base-background), 0 0 0 2px var(--ck-color-focus-border);
		}
	}

	/*
	 * In high contrast mode, the colors are replaced with text labels.
	 * See https://github.com/ckeditor/ckeditor5/issues/14907.
	 */
	@mixin ck-media-forced-colors {
		width: unset;
		height: unset;
		min-width: unset;
		min-height: unset;
		padding: 0 var(--ck-spacing-small);

		& .ck-button__label {
			display: inline-block;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&.ck-disabled {
		cursor: unset;
		transition: unset;
	}

	& .ck.ck-icon {
		display: none;
		color: var(--ck-color-color-grid-check-icon);
	}

	&.ck-on {
		& .ck.ck-icon {
			display: block;
		}
	}
}

.ck.ck-color-grid__label {
	padding: 0 var(--ck-spacing-standard);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-forced-colors {
	@media (forced-colors: active) {
		& {
			@mixin-content;
		}
	}
}

@define-mixin ck-media-default-colors {
	@media (forced-colors: none) {
		& {
			@mixin-content;
		}
	}
}
`],sourceRoot:""}]);const w=k},1905:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".color-picker-hex-input{width:max-content}.color-picker-hex-input .ck.ck-input{min-width:unset}.ck.ck-color-picker__row{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;margin:var(--ck-spacing-large) 0 0;width:unset}.ck.ck-color-picker__row .ck.ck-labeled-field-view{padding-top:unset}.ck.ck-color-picker__row .ck.ck-input-text{width:unset}.ck.ck-color-picker__row .ck-color-picker__hash-view{padding-right:var(--ck-spacing-medium);padding-top:var(--ck-spacing-tiny)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/colorpicker/colorpicker.css"],names:[],mappings:"AAKA,wBACC,iBAKD,CAHC,qCACC,eACD,CAGD,yBACC,YAAa,CACb,kBAAmB,CACnB,gBAAiB,CACjB,6BAA8B,CAC9B,kCAAmC,CACnC,WAcD,CAZC,mDACC,iBACD,CAEA,2CACC,WACD,CAEA,qDAEC,sCAAuC,CADvC,kCAED",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.color-picker-hex-input {
	width: max-content;

	& .ck.ck-input {
		min-width: unset;
	}
}

.ck.ck-color-picker__row {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin: var(--ck-spacing-large) 0 0;
	width: unset;

	& .ck.ck-labeled-field-view {
		padding-top: unset;
	}

	& .ck.ck-input-text {
		width: unset;
	}

	& .ck-color-picker__hash-view {
		padding-top: var(--ck-spacing-tiny);
		padding-right: var(--ck-spacing-medium);
	}
}
`],sourceRoot:""}]);const w=k},6309:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker,.ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__remove-color{align-items:center;display:flex}[dir=rtl] .ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker,[dir=rtl] .ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__remove-color{justify-content:flex-start}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-selector_action-bar{display:flex;flex-direction:row;justify-content:space-around}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-selector_action-bar .ck-button-cancel,.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-selector_action-bar .ck-button-save{flex:1}.ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker,.ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__remove-color{width:100%}.ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker{border-bottom-left-radius:0;border-bottom-right-radius:0;padding:calc(var(--ck-spacing-standard)/2) var(--ck-spacing-standard)}.ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker:not(:focus){border-top:1px solid var(--ck-color-base-border)}[dir=ltr] .ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker .ck.ck-icon{margin-right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-color-selector .ck-color-grids-fragment .ck-button.ck-color-selector__color-picker .ck.ck-icon{margin-left:var(--ck-spacing-standard)}.ck.ck-color-selector .ck-color-grids-fragment label.ck.ck-color-grid__label{font-weight:unset}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker{padding:8px}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker .hex-color-picker{height:100px;min-width:180px}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker .hex-color-picker::part(saturation){border-radius:var(--ck-border-radius) var(--ck-border-radius) 0 0}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker .hex-color-picker::part(hue){border-radius:0 0 var(--ck-border-radius) var(--ck-border-radius)}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker .hex-color-picker::part(hue-pointer),.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-picker .hex-color-picker::part(saturation-pointer){height:15px;width:15px}.ck.ck-color-selector .ck-color-picker-fragment .ck.ck-color-selector_action-bar{padding:0 8px 8px}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/colorselector/colorselector.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/colorselector/colorselector.css"],names:[],mappings:"AAUE,oLAGC,kBAAmB,CADnB,YAMD,CCZD,wMDUG,0BCRH,CDeC,iFACC,YAAa,CACb,kBAAmB,CACnB,4BAMD,CAJC,oMAEC,MACD,CErBD,oLAEC,UACD,CAEA,0FAEC,2BAA4B,CAC5B,4BAA6B,CAF7B,qEAiBD,CAbC,sGACC,gDACD,CDhBF,gHCoBI,uCDlBJ,CAFA,gHCwBI,sCDtBJ,CC2BC,6EACC,iBACD,CAKA,oEACC,WAoBD,CAlBC,sFACC,YAAa,CACb,eAeD,CAbC,wGACC,iEACD,CAEA,iGACC,iEACD,CAEA,yNAGC,WAAY,CADZ,UAED,CAIF,iFACC,iBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-color-selector {
	/* View fragment with color grids. */
	& .ck-color-grids-fragment {
		& .ck-button.ck-color-selector__remove-color,
		& .ck-button.ck-color-selector__color-picker {
			display: flex;
			align-items: center;

			@mixin ck-dir rtl {
				justify-content: flex-start;
			}
		}
	}

	/* View fragment with a color picker. */
	& .ck-color-picker-fragment {
		& .ck.ck-color-selector_action-bar {
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			& .ck-button-save,
			& .ck-button-cancel {
				flex: 1
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-color-selector {
	/* View fragment with color grids. */
	& .ck-color-grids-fragment {
		& .ck-button.ck-color-selector__remove-color,
		& .ck-button.ck-color-selector__color-picker {
			width: 100%;
		}

		& .ck-button.ck-color-selector__color-picker {
			padding: calc(var(--ck-spacing-standard) / 2) var(--ck-spacing-standard);
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;

			&:not(:focus) {
				border-top: 1px solid var(--ck-color-base-border);
			}

			& .ck.ck-icon {
				@mixin ck-dir ltr {
					margin-right: var(--ck-spacing-standard);
				}

				@mixin ck-dir rtl {
					margin-left: var(--ck-spacing-standard);
				}
			}
		}

		& label.ck.ck-color-grid__label {
			font-weight: unset;
		}
	}

	/* View fragment with a color picker. */
	& .ck-color-picker-fragment {
		& .ck.ck-color-picker {
			padding: 8px;

			& .hex-color-picker {
				height: 100px;
				min-width: 180px;

				&::part(saturation) {
					border-radius: var(--ck-border-radius) var(--ck-border-radius) 0 0;
				}

				&::part(hue) {
					border-radius: 0 0 var(--ck-border-radius) var(--ck-border-radius);
				}

				&::part(saturation-pointer),
				&::part(hue-pointer) {
					width: 15px;
					height: 15px;
				}
			}
		}

		& .ck.ck-color-selector_action-bar {
			padding: 0 8px 8px;
		}
	}
}
`],sourceRoot:""}]);const w=k},9819:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-dialog-overlay{bottom:0;left:0;overscroll-behavior:none;position:fixed;right:0;top:0;user-select:none}.ck.ck-dialog-overlay.ck-dialog-overlay__transparent{animation:none;background:none;pointer-events:none}.ck.ck-dialog{overscroll-behavior:none;position:absolute;width:fit-content}.ck.ck-dialog .ck.ck-form__header{flex-shrink:0}.ck.ck-dialog:not(.ck-dialog_modal) .ck.ck-form__header .ck-form__header__label{cursor:grab}.ck.ck-dialog-overlay.ck-dialog-overlay__transparent .ck.ck-dialog{pointer-events:all}:root{--ck-dialog-overlay-background-color:rgba(0,0,0,.5);--ck-dialog-drop-shadow:0px 0px 6px 2px rgba(0,0,0,.15);--ck-dialog-max-width:100vw;--ck-dialog-max-height:90vh;--ck-color-dialog-background:var(--ck-color-base-background);--ck-color-dialog-form-header-border:var(--ck-color-base-border)}.ck.ck-dialog-overlay{animation:ck-dialog-fade-in .3s;background:var(--ck-dialog-overlay-background-color);z-index:var(--ck-z-dialog)}.ck.ck-dialog{border-radius:0;--ck-drop-shadow:var(--ck-dialog-drop-shadow);background:var(--ck-color-dialog-background);border:1px solid var(--ck-color-base-border);max-height:var(--ck-dialog-max-height);max-width:var(--ck-dialog-max-width);overscroll-behavior:contain}.ck-rounded-corners .ck.ck-dialog,.ck.ck-dialog.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-dialog{box-shadow:var(--ck-drop-shadow),0 0}.ck.ck-dialog .ck.ck-form__header{border-bottom:1px solid var(--ck-color-dialog-form-header-border)}.ck-dialog-scroll-locked{overflow:hidden}@keyframes ck-dialog-fade-in{0%{background:transparent}to{background:var(--ck-dialog-overlay-background-color)}}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dialog/dialog.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dialog/dialog.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAKA,sBAKC,QAAS,CACT,MAAO,CAJP,wBAAyB,CAEzB,cAAe,CAGf,OAAQ,CACR,KAAM,CAPN,gBAcD,CALC,qDAEC,cAAe,CACf,eAAgB,CAFhB,mBAGD,CAGD,cACC,wBAAyB,CAEzB,iBAAkB,CADlB,iBAiBD,CAdC,kCACC,aACD,CAIC,gFACC,WACD,CAGD,mEACC,kBACD,CC/BD,MACC,mDAA2D,CAC3D,uDAA8D,CAC9D,2BAA4B,CAC5B,2BAA4B,CAC5B,4DAA6D,CAC7D,gEACD,CAEA,sBACC,+BAAgC,CAChC,oDAAqD,CACrD,0BACD,CAEA,cCbC,eAAgB,CDiBhB,6CAA8C,CAE9C,4CAA6C,CAG7C,4CAA6C,CAF7C,sCAAuC,CACvC,oCAAqC,CAErC,2BAKD,CC1BC,mEAEC,qCAED,CDOD,cEfC,oCF8BD,CAHC,kCACC,iEACD,CAGD,yBACC,eACD,CAEA,6BACC,GACC,sBACD,CAEA,GACC,oDACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-dialog-overlay {
	user-select: none;
	overscroll-behavior: none;

	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;

	&.ck-dialog-overlay__transparent {
		pointer-events: none;
		animation: none;
		background: none;
	}
}

.ck.ck-dialog {
	overscroll-behavior: none;
	width: fit-content;
	position: absolute;

	& .ck.ck-form__header  {
		flex-shrink: 0;
	}

	/* Modals should not be draggable. */
	&:not(.ck-dialog_modal) {
		& .ck.ck-form__header .ck-form__header__label {
			cursor: grab;
		}
	}

	.ck.ck-dialog-overlay.ck-dialog-overlay__transparent & {
		pointer-events: all;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_shadow.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

:root {
	--ck-dialog-overlay-background-color: hsla( 0, 0%, 0%, .5 );
	--ck-dialog-drop-shadow: 0px 0px 6px 2px hsl(0deg 0% 0% / 15%);
	--ck-dialog-max-width: 100vw;
	--ck-dialog-max-height: 90vh;
	--ck-color-dialog-background: var(--ck-color-base-background);
	--ck-color-dialog-form-header-border: var(--ck-color-base-border);
}

.ck.ck-dialog-overlay {
	animation: ck-dialog-fade-in .3s;
	background: var(--ck-dialog-overlay-background-color);
	z-index: var(--ck-z-dialog);
}

.ck.ck-dialog {
	@mixin ck-rounded-corners;
	@mixin ck-drop-shadow;

	--ck-drop-shadow: var(--ck-dialog-drop-shadow);

	background: var(--ck-color-dialog-background);
	max-height: var(--ck-dialog-max-height);
	max-width: var(--ck-dialog-max-width);
	border: 1px solid var(--ck-color-base-border);
	overscroll-behavior: contain;

	& .ck.ck-form__header {
		border-bottom: 1px solid var(--ck-color-dialog-form-header-border);
	}
}

.ck-dialog-scroll-locked {
	overflow: hidden;
}

@keyframes ck-dialog-fade-in {
	0% {
		background: hsla( 0, 0%, 0%, 0 );
	}

	100% {
		background: var(--ck-dialog-overlay-background-color);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},9822:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-dialog .ck.ck-dialog__actions{display:flex;justify-content:flex-end;padding:var(--ck-spacing-large)}.ck.ck-dialog .ck.ck-dialog__actions>*+*{margin-left:var(--ck-spacing-large)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dialog/dialogactions.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dialog/dialogactions.css"],names:[],mappings:"AAMC,qCACC,YAAa,CACb,wBAAyB,CCDzB,+BDED,CCAC,yCACC,mCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-dialog {
	& .ck.ck-dialog__actions {
		display: flex;
		justify-content: flex-end;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-dialog {
	& .ck.ck-dialog__actions {
		padding: var(--ck-spacing-large);

		& > * + * {
			margin-left: var(--ck-spacing-large);
		}
	}
}
`],sourceRoot:""}]);const w=k},8149:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-dropdown-max-width:75vw}.ck.ck-dropdown{display:inline-block;position:relative}.ck.ck-dropdown .ck-dropdown__arrow{pointer-events:none;z-index:var(--ck-z-default)}.ck.ck-dropdown .ck-button.ck-dropdown__button{width:100%}.ck.ck-dropdown .ck-dropdown__panel{display:none;max-width:var(--ck-dropdown-max-width);position:absolute;z-index:var(--ck-z-panel)}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel-visible{display:inline-block}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_n,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nme,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nmw,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw{bottom:100%}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_s,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sme,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_smw,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw{bottom:auto;top:100%}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_ne,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_se{left:0}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nw,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sw{right:0}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_n,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_s{left:50%;transform:translateX(-50%)}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nmw,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_smw{left:75%;transform:translateX(-75%)}.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_nme,.ck.ck-dropdown .ck-dropdown__panel.ck-dropdown__panel_sme{left:25%;transform:translateX(-25%)}.ck.ck-toolbar .ck-dropdown__panel{z-index:calc(var(--ck-z-panel) + 1)}:root{--ck-dropdown-arrow-size:calc(var(--ck-icon-size)*0.5)}.ck.ck-dropdown{font-size:inherit}.ck.ck-dropdown .ck-dropdown__arrow{width:var(--ck-dropdown-arrow-size)}[dir=ltr] .ck.ck-dropdown .ck-dropdown__arrow{margin-left:var(--ck-spacing-standard);right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-dropdown .ck-dropdown__arrow{left:var(--ck-spacing-standard);margin-right:var(--ck-spacing-small)}.ck.ck-dropdown.ck-disabled .ck-dropdown__arrow{opacity:var(--ck-disabled-opacity)}[dir=ltr] .ck.ck-dropdown .ck-button.ck-dropdown__button:not(.ck-button_with-text){padding-left:var(--ck-spacing-small)}[dir=rtl] .ck.ck-dropdown .ck-button.ck-dropdown__button:not(.ck-button_with-text){padding-right:var(--ck-spacing-small)}.ck.ck-dropdown .ck-button.ck-dropdown__button .ck-button__label{overflow:hidden;text-overflow:ellipsis;width:7em}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-disabled .ck-button__label{opacity:var(--ck-disabled-opacity)}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on{border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-dropdown__button_label-width_auto .ck-button__label{width:auto}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-off:active,.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on:active{box-shadow:none}.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-off:active:focus,.ck.ck-dropdown .ck-button.ck-dropdown__button.ck-on:active:focus{box-shadow:var(--ck-focus-outer-shadow),0 0}.ck.ck-dropdown__panel{background:var(--ck-color-dropdown-panel-background);border:1px solid var(--ck-color-dropdown-panel-border);border-radius:0;bottom:0;min-width:100%}.ck-rounded-corners .ck.ck-dropdown__panel,.ck.ck-dropdown__panel.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-dropdown__panel{box-shadow:var(--ck-drop-shadow),0 0}.ck.ck-dropdown__panel.ck-dropdown__panel_se{border-top-left-radius:0}.ck.ck-dropdown__panel.ck-dropdown__panel_sw{border-top-right-radius:0}.ck.ck-dropdown__panel.ck-dropdown__panel_ne{border-bottom-left-radius:0}.ck.ck-dropdown__panel.ck-dropdown__panel_nw{border-bottom-right-radius:0}.ck.ck-dropdown__panel:focus{outline:none}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/dropdown.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/dropdown.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_disabled.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAKA,MACC,4BACD,CAEA,gBACC,oBAAqB,CACrB,iBA2ED,CAzEC,oCACC,mBAAoB,CACpB,2BACD,CAGA,+CACC,UACD,CAEA,oCACC,YAAa,CAEb,sCAAuC,CAEvC,iBAAkB,CAHlB,yBA4DD,CAvDC,+DACC,oBACD,CAEA,mSAKC,WACD,CAEA,mSAUC,WAAY,CADZ,QAED,CAEA,oHAEC,MACD,CAEA,oHAEC,OACD,CAEA,kHAGC,QAAS,CACT,0BACD,CAEA,sHAGC,QAAS,CACT,0BACD,CAEA,sHAGC,QAAS,CACT,0BACD,CAQF,mCACC,mCACD,CCpFA,MACC,sDACD,CAEA,gBAEC,iBA2ED,CAzEC,oCACC,mCACD,CAGC,8CAIC,sCAAuC,CAHvC,gCAID,CAIA,8CACC,+BAAgC,CAGhC,oCACD,CAGD,gDC/BA,kCDiCA,CAIE,mFAEC,oCACD,CAIA,mFAEC,qCACD,CAID,iEAEC,eAAgB,CAChB,sBAAuB,CAFvB,SAGD,CAGA,6EC1DD,kCD4DC,CAGA,qDACC,2BAA4B,CAC5B,4BACD,CAEA,sGACC,UACD,CAGA,yHAEC,eAKD,CAHC,qIE7EF,2CF+EE,CAKH,uBAIC,oDAAqD,CACrD,sDAAuD,CGvFvD,eAAgB,CHwFhB,QAAS,CAGT,cAuBD,CGhHC,qFAEC,qCAED,CH4ED,uBEpFC,oCFoHD,CAnBC,6CACC,wBACD,CAEA,6CACC,yBACD,CAEA,6CACC,2BACD,CAEA,6CACC,4BACD,CAEA,6BACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-dropdown-max-width: 75vw;
}

.ck.ck-dropdown {
	display: inline-block;
	position: relative;

	& .ck-dropdown__arrow {
		pointer-events: none;
		z-index: var(--ck-z-default);
	}

	/* Dropdown button should span horizontally, e.g. in vertical toolbars */
	& .ck-button.ck-dropdown__button {
		width: 100%;
	}

	& .ck-dropdown__panel {
		display: none;
		z-index: var(--ck-z-panel);
		max-width: var(--ck-dropdown-max-width);

		position: absolute;

		&.ck-dropdown__panel-visible {
			display: inline-block;
		}

		&.ck-dropdown__panel_ne,
		&.ck-dropdown__panel_nw,
		&.ck-dropdown__panel_n,
		&.ck-dropdown__panel_nmw,
		&.ck-dropdown__panel_nme {
			bottom: 100%;
		}

		&.ck-dropdown__panel_se,
		&.ck-dropdown__panel_sw,
		&.ck-dropdown__panel_smw,
		&.ck-dropdown__panel_sme,
		&.ck-dropdown__panel_s {
			/*
			 * Using transform: translate3d( 0, 100%, 0 ) causes blurry dropdown on Chrome 67-78+ on non-retina displays.
			 * See https://github.com/ckeditor/ckeditor5/issues/1053.
			 */
			top: 100%;
			bottom: auto;
		}

		&.ck-dropdown__panel_ne,
		&.ck-dropdown__panel_se {
			left: 0px;
		}

		&.ck-dropdown__panel_nw,
		&.ck-dropdown__panel_sw {
			right: 0px;
		}

		&.ck-dropdown__panel_s,
		&.ck-dropdown__panel_n {
			/* Positioning panels relative to the center of the button */
			left: 50%;
			transform: translateX(-50%);
		}

		&.ck-dropdown__panel_nmw,
		&.ck-dropdown__panel_smw {
			/* Positioning panels relative to the middle-west of the button */
			left: 75%;
			transform: translateX(-75%);
		}

		&.ck-dropdown__panel_nme,
		&.ck-dropdown__panel_sme {
			/* Positioning panels relative to the middle-east of the button */
			left: 25%;
			transform: translateX(-25%);
		}
	}
}

/*
 * Toolbar dropdown panels should be always above the UI (eg. other dropdown panels) from the editor's content.
 * See https://github.com/ckeditor/ckeditor5/issues/7874
 */
.ck.ck-toolbar .ck-dropdown__panel {
	z-index: calc( var(--ck-z-panel) + 1 );
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_disabled.css";
@import "../../../mixins/_shadow.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

:root {
	--ck-dropdown-arrow-size: calc(0.5 * var(--ck-icon-size));
}

.ck.ck-dropdown {
	/* Enable font size inheritance, which allows fluid UI scaling. */
	font-size: inherit;

	& .ck-dropdown__arrow {
		width: var(--ck-dropdown-arrow-size);
	}

	@mixin ck-dir ltr {
		& .ck-dropdown__arrow {
			right: var(--ck-spacing-standard);

			/* A space to accommodate the triangle. */
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-dir rtl {
		& .ck-dropdown__arrow {
			left: var(--ck-spacing-standard);

			/* A space to accommodate the triangle. */
			margin-right: var(--ck-spacing-small);
		}
	}

	&.ck-disabled .ck-dropdown__arrow {
		@mixin ck-disabled;
	}

	& .ck-button.ck-dropdown__button {
		@mixin ck-dir ltr {
			&:not(.ck-button_with-text) {
				/* Make sure dropdowns with just an icon have the right inner spacing */
				padding-left: var(--ck-spacing-small);
			}
		}

		@mixin ck-dir rtl {
			&:not(.ck-button_with-text) {
				/* Make sure dropdowns with just an icon have the right inner spacing */
				padding-right: var(--ck-spacing-small);
			}
		}

		/* #23 */
		& .ck-button__label {
			width: 7em;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/70 */
		&.ck-disabled .ck-button__label {
			@mixin ck-disabled;
		}

		/* https://github.com/ckeditor/ckeditor5/issues/816 */
		&.ck-on {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		&.ck-dropdown__button_label-width_auto .ck-button__label {
			width: auto;
		}

		/* https://github.com/ckeditor/ckeditor5/issues/8699 */
		&.ck-off:active,
		&.ck-on:active {
			box-shadow: none;

			&:focus {
				@mixin ck-box-shadow var(--ck-focus-outer-shadow);
			}
		}
	}
}

.ck.ck-dropdown__panel {
	@mixin ck-rounded-corners;
	@mixin ck-drop-shadow;

	background: var(--ck-color-dropdown-panel-background);
	border: 1px solid var(--ck-color-dropdown-panel-border);
	bottom: 0;

	/* Make sure the panel is at least as wide as the drop-down's button. */
	min-width: 100%;

	/* Disabled corner border radius to be consistent with the .dropdown__button
	https://github.com/ckeditor/ckeditor5/issues/816 */
	&.ck-dropdown__panel_se {
		border-top-left-radius: 0;
	}

	&.ck-dropdown__panel_sw {
		border-top-right-radius: 0;
	}

	&.ck-dropdown__panel_ne {
		border-bottom-left-radius: 0;
	}

	&.ck-dropdown__panel_nw {
		border-bottom-right-radius: 0;
	}

	&:focus {
		outline: none;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which indicates that an element holding it is disabled.
 */
@define-mixin ck-disabled {
	opacity: var(--ck-disabled-opacity);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},3629:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-dropdown>.ck-dropdown__panel>.ck-list{border-radius:0}.ck-rounded-corners .ck.ck-dropdown>.ck-dropdown__panel>.ck-list,.ck.ck-dropdown>.ck-dropdown__panel>.ck-list.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0}.ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:first-child>.ck-button{border-radius:0}.ck-rounded-corners .ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:first-child>.ck-button,.ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:first-child>.ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius);border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:0}.ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:last-child>.ck-button{border-radius:0}.ck-rounded-corners .ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:last-child>.ck-button,.ck.ck-dropdown>.ck-dropdown__panel>.ck-list .ck-list__item:last-child>.ck-button.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-top-right-radius:0}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/listdropdown.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAOA,6CCIC,eDqBD,CCnBC,iIAEC,qCAAsC,CDJtC,wBCMD,CDAC,mFCND,eDYC,CCVD,6MAEC,qCAAsC,CDKpC,2BAA4B,CAC5B,4BAA6B,CAF7B,wBCFH,CDQC,kFCdD,eDmBC,CCjBD,2MAEC,qCAAsC,CDYpC,wBAAyB,CACzB,yBCXH",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";

.ck.ck-dropdown > .ck-dropdown__panel > .ck-list {
	/* Disabled radius of top-left border to be consistent with .dropdown__button
	https://github.com/ckeditor/ckeditor5/issues/816 */
	@mixin ck-rounded-corners {
		border-top-left-radius: 0;
	}

	/* Make sure the button belonging to the first/last child of the list goes well with the
	border radius of the entire panel. */
	& .ck-list__item {
		&:first-child > .ck-button {
			@mixin ck-rounded-corners {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		&:last-child > .ck-button {
			@mixin ck-rounded-corners {
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},7218:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-dropdown-menu-list__nested-menu{display:block}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/menu/dropdownmenu.css"],names:[],mappings:"AAKA,uCACC,aACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-dropdown-menu-list__nested-menu {
	display: block;
}
`],sourceRoot:""}]);const w=k},9554:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{pointer-events:none;z-index:var(--ck-z-default)}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button{border-radius:0;padding:var(--ck-spacing-tiny) calc(var(--ck-spacing-standard)*2);width:100%}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button:focus{border-color:transparent;box-shadow:none}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button:focus:not(.ck-on){background:var(--ck-color-button-default-hover-background)}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-button__label{flex-grow:1;overflow:hidden;text-overflow:ellipsis}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button.ck-disabled>.ck-button__label{opacity:var(--ck-disabled-opacity)}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button.ck-icon-spacing:not(:has(.ck-button__icon))>.ck-button__label{margin-left:calc(var(--ck-icon-size) - var(--ck-spacing-small))}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{width:var(--ck-dropdown-arrow-size)}[dir=ltr] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{margin-right:calc(var(--ck-spacing-small)*-1);transform:rotate(-90deg)}[dir=rtl] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{margin-left:calc(var(--ck-spacing-small)*-1);transform:rotate(90deg)}.ck.ck-button.ck-dropdown-menu-list__nested-menu__button.ck-disabled>.ck-dropdown-menu-list__nested-menu__button__arrow{opacity:var(--ck-disabled-opacity)}[dir=ltr] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button:not(.ck-button_with-text){padding-left:var(--ck-spacing-small)}[dir=ltr] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{margin-left:var(--ck-spacing-standard);right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button:not(.ck-button_with-text){padding-right:var(--ck-spacing-small)}[dir=rtl] .ck.ck-button.ck-dropdown-menu-list__nested-menu__button>.ck-dropdown-menu-list__nested-menu__button__arrow{left:var(--ck-spacing-standard);margin-right:var(--ck-spacing-small)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/menu/dropdownmenubutton.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/menu/dropdownmenubutton.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_disabled.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAKA,kGACC,mBAAoB,CACpB,2BACD,CCIA,yDAGC,eAAgB,CADhB,iEAAoE,CADpE,UA2ED,CAvEC,+DACC,wBAAyB,CACzB,eAKD,CAHC,2EACC,0DACD,CAGD,2EACC,WAAY,CACZ,eAAgB,CAChB,sBACD,CAEA,uFCvBA,kCDyBA,CAGA,uHACC,+DACD,CAEA,4GACC,mCAeD,CEnDA,sHF0CE,6CAAgD,CAHhD,wBErCF,CAFA,sHFiDE,4CAA+C,CAH/C,uBE5CF,CFmDA,wHClDA,kCDoDA,CAGC,6FACC,oCACD,CAEA,sHAIC,sCAAuC,CAHvC,gCAID,CAIA,6FACC,qCACD,CAEA,sHACC,+BAAgC,CAGhC,oCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-dropdown-menu-list__nested-menu__button > .ck-dropdown-menu-list__nested-menu__button__arrow {
	pointer-events: none;
	z-index: var(--ck-z-default);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../../mixins/_disabled.css";
@import "../../../mixins/_button.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

/*
 * All menu buttons.
 */
.ck.ck-button.ck-dropdown-menu-list__nested-menu__button {
	width: 100%;
	padding: var(--ck-spacing-tiny) calc(2 * var(--ck-spacing-standard));
	border-radius: 0;

	&:focus {
		border-color: transparent;
		box-shadow: none;

		&:not(.ck-on) {
			background: var(--ck-color-button-default-hover-background);
		}
	}

	& > .ck-button__label {
		flex-grow: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&.ck-disabled > .ck-button__label {
		@mixin ck-disabled;
	}

	/* Spacing in buttons that miss the icon. */
	&.ck-icon-spacing:not(:has(.ck-button__icon)) > .ck-button__label {
		margin-left: calc(var(--ck-icon-size) - var(--ck-spacing-small));
	}

	& > .ck-dropdown-menu-list__nested-menu__button__arrow {
		width: var(--ck-dropdown-arrow-size);

		@mixin ck-dir ltr {
			transform: rotate(-90deg);

			/* Nudge the arrow gently to the right because its center of gravity is to the left */
			margin-right: calc(-1 * var(--ck-spacing-small));
		}

		@mixin ck-dir rtl {
			transform: rotate(90deg);

			/* Nudge the arrow gently to the left because its center of gravity is to the right (after rotation). */
			margin-left: calc(-1 * var(--ck-spacing-small));
		}
	}

	&.ck-disabled > .ck-dropdown-menu-list__nested-menu__button__arrow {
		@mixin ck-disabled;
	}

	@mixin ck-dir ltr {
		&:not(.ck-button_with-text) {
			padding-left: var(--ck-spacing-small);
		}

		& > .ck-dropdown-menu-list__nested-menu__button__arrow {
			right: var(--ck-spacing-standard);

			/* A space to accommodate the triangle. */
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-dir rtl {
		&:not(.ck-button_with-text) {
			padding-right: var(--ck-spacing-small);
		}

		& > .ck-dropdown-menu-list__nested-menu__button__arrow {
			left: var(--ck-spacing-standard);

			/* A space to accommodate the triangle. */
			margin-right: var(--ck-spacing-small);
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which indicates that an element holding it is disabled.
 */
@define-mixin ck-disabled {
	opacity: var(--ck-disabled-opacity);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},2171:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-dropdown-menu-menu-item-min-width:18em}.ck.ck-dropdown-menu-list__nested-menu__item{min-width:var(--ck-dropdown-menu-menu-item-min-width)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/menu/dropdownmenulistitem.css"],names:[],mappings:"AAKA,MACC,2CACD,CAEA,6CACC,qDACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-dropdown-menu-menu-item-min-width: 18em;
}

.ck.ck-dropdown-menu-list__nested-menu__item {
	min-width: var(--ck-dropdown-menu-menu-item-min-width);
}
`],sourceRoot:""}]);const w=k},4767:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-button.ck-dropdown-menu-list__nested-menu__item__button{border-radius:0}.ck-button.ck-dropdown-menu-list__nested-menu__item__button>.ck-spinner-container,.ck-button.ck-dropdown-menu-list__nested-menu__item__button>.ck-spinner-container .ck-spinner{--ck-toolbar-spinner-size:20px}.ck-button.ck-dropdown-menu-list__nested-menu__item__button>.ck-spinner-container{margin-left:calc(var(--ck-spacing-small)*-1);margin-right:var(--ck-spacing-small)}.ck-button.ck-dropdown-menu-list__nested-menu__item__button:focus{border-color:transparent;box-shadow:none}.ck-button.ck-dropdown-menu-list__nested-menu__item__button:focus:not(.ck-on){background:var(--ck-color-button-default-hover-background)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/menu/dropdownmenulistitembutton.css"],names:[],mappings:"AAQA,4DACC,eA0BD,CAxBC,gLAGC,8BACD,CAEA,kFAEC,4CAA+C,CAC/C,oCACD,CAMA,kEACC,wBAAyB,CACzB,eAKD,CAHC,8EACC,0DACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/*
 * List item buttons.
 */
.ck-button.ck-dropdown-menu-list__nested-menu__item__button {
	border-radius: 0;

	& > .ck-spinner-container,
	& > .ck-spinner-container .ck-spinner {
		/* These styles correspond to .ck-icon so that the spinner seamlessly replaces the icon. */
		--ck-toolbar-spinner-size: 20px;
	}

	& > .ck-spinner-container {
		/* These margins are the same as for .ck-icon. */
		margin-left: calc(-1 * var(--ck-spacing-small));
		margin-right: var(--ck-spacing-small);
	}

	/*
	 * Hovered items automatically get focused. Default focus styles look odd
	 * while moving across a huge list of items so let's get rid of them
	 */
	&:focus {
		border-color: transparent;
		box-shadow: none;

		&:not(.ck-on) {
			background: var(--ck-color-button-default-hover-background);
		}
	}
}
`],sourceRoot:""}]);const w=k},3610:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel{max-height:314px;overflow-y:auto;position:absolute;z-index:calc(var(--ck-z-panel) + 1)}:root{--ck-dropdown-menu-menu-panel-max-width:75vw}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel{background:var(--ck-color-dropdown-panel-background);border:1px solid var(--ck-color-dropdown-panel-border);bottom:0;box-shadow:var(--ck-drop-shadow),0 0;height:fit-content;max-width:var(--ck-dropdown-menu-menu-panel-max-width)}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel:after,.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel:before{display:none}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_es,.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_se{border-top-left-radius:0}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_sw,.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_ws{border-top-right-radius:0}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_en,.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_ne{border-bottom-left-radius:0}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_nw,.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel.ck-balloon-panel_wn{border-bottom-right-radius:0}.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel:focus{outline:none}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/menu/dropdownmenupanel.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/menu/dropdownmenupanel.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAKA,0DAEC,gBAAiB,CACjB,eAAgB,CAFhB,iBAAkB,CAGlB,mCACD,CCFA,MACC,4CACD,CAEA,0DAGC,oDAAqD,CACrD,sDAAuD,CACvD,QAAS,CCRT,oCAA8B,CDS9B,kBAAmB,CACnB,sDAgCD,CA7BC,iIAEC,YACD,CAGA,4JAEC,wBACD,CAEA,4JAEC,yBACD,CAEA,4JAEC,2BACD,CAEA,4JAEC,4BACD,CAEA,gEACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel {
	position: absolute;
	max-height: 314px; /* With the default settings, this is equal to 10 menu items. */
	overflow-y: auto;
	z-index: calc(var(--ck-z-panel) + 1);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../../mixins/_rounded.css";
@import "../../../../mixins/_shadow.css";

:root {
	--ck-dropdown-menu-menu-panel-max-width: 75vw;
}

.ck.ck-balloon-panel.ck-dropdown-menu__nested-menu__panel {
	@mixin ck-drop-shadow;

	background: var(--ck-color-dropdown-panel-background);
	border: 1px solid var(--ck-color-dropdown-panel-border);
	bottom: 0;
	height: fit-content;
	max-width: var(--ck-dropdown-menu-menu-panel-max-width);

	/* Reset balloon styling */
	&::after,
	&::before {
		display: none;
	}

	/* Corner border radius consistent with the button. */
	&.ck-balloon-panel_es,
	&.ck-balloon-panel_se {
		border-top-left-radius: 0;
	}

	&.ck-balloon-panel_ws,
	&.ck-balloon-panel_sw {
		border-top-right-radius: 0;
	}

	&.ck-balloon-panel_en,
	&.ck-balloon-panel_ne {
		border-bottom-left-radius: 0;
	}

	&.ck-balloon-panel_wn,
	&.ck-balloon-panel_nw {
		border-bottom-right-radius: 0;
	}

	&:focus {
		outline: none;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},1792:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck.ck-splitbutton{font-size:inherit}.ck.ck-splitbutton .ck-splitbutton__action:focus{z-index:calc(var(--ck-z-default) + 1)}:root{--ck-color-split-button-hover-background:#ebebeb;--ck-color-split-button-hover-border:#b3b3b3}[dir=ltr] .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__action,[dir=ltr] .ck.ck-splitbutton:hover>.ck-splitbutton__action{border-bottom-right-radius:unset;border-top-right-radius:unset}[dir=rtl] .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__action,[dir=rtl] .ck.ck-splitbutton:hover>.ck-splitbutton__action{border-bottom-left-radius:unset;border-top-left-radius:unset}.ck.ck-splitbutton>.ck-splitbutton__arrow{min-width:unset}[dir=ltr] .ck.ck-splitbutton>.ck-splitbutton__arrow{border-bottom-left-radius:unset;border-top-left-radius:unset}[dir=rtl] .ck.ck-splitbutton>.ck-splitbutton__arrow{border-bottom-right-radius:unset;border-top-right-radius:unset}.ck.ck-splitbutton>.ck-splitbutton__arrow svg{width:var(--ck-dropdown-arrow-size)}.ck.ck-splitbutton>.ck-splitbutton__arrow:not(:focus){border-bottom-width:0;border-top-width:0}.ck.ck-splitbutton.ck-splitbutton_open{border-radius:0}.ck-rounded-corners .ck.ck-splitbutton.ck-splitbutton_open,.ck.ck-splitbutton.ck-splitbutton_open.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck-rounded-corners .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__action,.ck.ck-splitbutton.ck-splitbutton_open.ck-rounded-corners>.ck-splitbutton__action{border-bottom-left-radius:0}.ck-rounded-corners .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__arrow,.ck.ck-splitbutton.ck-splitbutton_open.ck-rounded-corners>.ck-splitbutton__arrow{border-bottom-right-radius:0}.ck.ck-splitbutton.ck-splitbutton_open>.ck-button:not(.ck-on):not(.ck-disabled):not(:hover),.ck.ck-splitbutton:hover>.ck-button:not(.ck-on):not(.ck-disabled):not(:hover){background:var(--ck-color-split-button-hover-background)}.ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):after,.ck.ck-splitbutton:hover>.ck-splitbutton__arrow:not(.ck-disabled):after{background-color:var(--ck-color-split-button-hover-border);content:"";height:100%;position:absolute;width:1px}.ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__arrow:focus:after,.ck.ck-splitbutton:hover>.ck-splitbutton__arrow:focus:after{--ck-color-split-button-hover-border:var(--ck-color-focus-border)}[dir=ltr] .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):after,[dir=ltr] .ck.ck-splitbutton:hover>.ck-splitbutton__arrow:not(.ck-disabled):after{left:-1px}[dir=rtl] .ck.ck-splitbutton.ck-splitbutton_open>.ck-splitbutton__arrow:not(.ck-disabled):after,[dir=rtl] .ck.ck-splitbutton:hover>.ck-splitbutton__arrow:not(.ck-disabled):after{right:-1px}',"",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/splitbutton.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/splitbutton.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAKA,mBAEC,iBAKD,CAHC,iDACC,qCACD,CCJD,MACC,gDAAyD,CACzD,4CACD,CAQE,oIAGC,gCAAiC,CADjC,6BAED,CAEA,oIAGC,+BAAgC,CADhC,4BAED,CAGD,0CAGC,eAiBD,CAfC,oDAGC,+BAAgC,CADhC,4BAED,CAEA,oDAGC,gCAAiC,CADjC,6BAED,CAEA,8CACC,mCACD,CAKD,sDAEC,qBAAwB,CADxB,kBAED,CAIA,uCCnDA,eD6DA,CC3DA,qHAEC,qCAED,CD+CE,qKACC,2BACD,CAEA,mKACC,4BACD,CAUD,0KACC,wDACD,CAIA,8JAKC,0DAA2D,CAJ3D,UAAW,CAGX,WAAY,CAFZ,iBAAkB,CAClB,SAGD,CAGA,sIACC,iEACD,CAGC,kLACC,SACD,CAIA,kLACC,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-splitbutton {
	/* Enable font size inheritance, which allows fluid UI scaling. */
	font-size: inherit;

	& .ck-splitbutton__action:focus {
		z-index: calc(var(--ck-z-default) + 1);
	}
}

`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";

:root {
	--ck-color-split-button-hover-background: hsl(0, 0%, 92%);
	--ck-color-split-button-hover-border: hsl(0, 0%, 70%);
}

.ck.ck-splitbutton {
	/*
	 * Note: ck-rounded and ck-dir mixins don't go together (because they both use @nest).
	 */
	&:hover > .ck-splitbutton__action,
	&.ck-splitbutton_open > .ck-splitbutton__action {
		[dir="ltr"] & {
			/* Don't round the action button on the right side */
			border-top-right-radius: unset;
			border-bottom-right-radius: unset;
		}

		[dir="rtl"] & {
			/* Don't round the action button on the left side */
			border-top-left-radius: unset;
			border-bottom-left-radius: unset;
		}
	}

	& > .ck-splitbutton__arrow {
		/* It's a text-less button and since the icon is positioned absolutely in such situation,
		it must get some arbitrary min-width. */
		min-width: unset;

		[dir="ltr"] & {
			/* Don't round the arrow button on the left side */
			border-top-left-radius: unset;
			border-bottom-left-radius: unset;
		}

		[dir="rtl"] & {
			/* Don't round the arrow button on the right side */
			border-top-right-radius: unset;
			border-bottom-right-radius: unset;
		}

		& svg {
			width: var(--ck-dropdown-arrow-size);
		}
	}

	/* Make sure the divider stretches 100% height of the button
	https://github.com/ckeditor/ckeditor5/issues/10936 */
	& > .ck-splitbutton__arrow:not(:focus) {
		border-top-width: 0px;
		border-bottom-width: 0px;
	}

	/* Don't round the bottom left and right corners of the buttons when "open"
	https://github.com/ckeditor/ckeditor5/issues/816 */
	&.ck-splitbutton_open {
		@mixin ck-rounded-corners {
			& > .ck-splitbutton__action {
				border-bottom-left-radius: 0;
			}

			& > .ck-splitbutton__arrow {
				border-bottom-right-radius: 0;
			}
		}
	}

	/* When the split button is "open" (the arrow is on) or being hovered, it should get some styling
	as a whole. The background of both buttons should stand out and there should be a visual
	separation between both buttons. */
	&.ck-splitbutton_open,
	&:hover {
		/* When the split button hovered as a whole, not as individual buttons. */
		& > .ck-button:not(.ck-on):not(.ck-disabled):not(:hover) {
			background: var(--ck-color-split-button-hover-background);
		}

		/* Splitbutton separator needs to be set with the ::after pseudoselector
		to display properly the borders on focus */
		& > .ck-splitbutton__arrow:not(.ck-disabled)::after {
			content: '';
			position: absolute;
			width: 1px;
			height: 100%;
			background-color: var(--ck-color-split-button-hover-border);
		}

		/* Make sure the divider between the buttons looks fine when the button is focused */
		& > .ck-splitbutton__arrow:focus::after {
			--ck-color-split-button-hover-border: var(--ck-color-focus-border);
		}

		[dir="ltr"] & {
			& > .ck-splitbutton__arrow:not(.ck-disabled)::after {
				left: -1px;
			}
		}

		[dir="rtl"] & {
			& > .ck-splitbutton__arrow:not(.ck-disabled)::after {
				right: -1px;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},1666:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-toolbar-dropdown-max-width:60vw}.ck.ck-toolbar-dropdown>.ck-dropdown__panel{max-width:var(--ck-toolbar-dropdown-max-width);width:max-content}.ck.ck-toolbar-dropdown>.ck-dropdown__panel .ck-button:focus{z-index:calc(var(--ck-z-default) + 1)}.ck.ck-toolbar-dropdown .ck-toolbar{border:0}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/dropdown/toolbardropdown.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/dropdown/toolbardropdown.css"],names:[],mappings:"AAKA,MACC,oCACD,CAEA,4CAGC,8CAA+C,CAD/C,iBAQD,CAJE,6DACC,qCACD,CCZF,oCACC,QACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-toolbar-dropdown-max-width: 60vw;
}

.ck.ck-toolbar-dropdown > .ck-dropdown__panel {
	/* https://github.com/ckeditor/ckeditor5/issues/5586 */
	width: max-content;
	max-width: var(--ck-toolbar-dropdown-max-width);

	& .ck-button {
		&:focus {
			z-index: calc(var(--ck-z-default) + 1);
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-toolbar-dropdown .ck-toolbar {
	border: 0;
}
`],sourceRoot:""}]);const w=k},8527:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-accessibility-help-dialog-max-width:600px;--ck-accessibility-help-dialog-max-height:400px;--ck-accessibility-help-dialog-border-color:#ccced1;--ck-accessibility-help-dialog-code-background-color:#ededed;--ck-accessibility-help-dialog-kbd-shadow-color:#9c9c9c}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content{border:1px solid transparent;max-height:var(--ck-accessibility-help-dialog-max-height);max-width:var(--ck-accessibility-help-dialog-max-width);overflow:auto;padding:var(--ck-spacing-large);user-select:text}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content:focus{border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),0 0;outline:none}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content *{white-space:normal}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content .ck-label{display:none}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content h3{font-size:1.2em;font-weight:700}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content h4{font-size:1em;font-weight:700}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content h3,.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content h4,.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content p,.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content table{margin:1em 0}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content dl{border-bottom:none;border-top:1px solid var(--ck-accessibility-help-dialog-border-color);display:grid;grid-template-columns:2fr 1fr}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content dl dd,.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content dl dt{border-bottom:1px solid var(--ck-accessibility-help-dialog-border-color);padding:.4em 0}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content dl dt{grid-column-start:1}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content dl dd{grid-column-start:2;text-align:right}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content code,.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content kbd{background:var(--ck-accessibility-help-dialog-code-background-color);border-radius:2px;display:inline-block;font-size:.9em;line-height:1;padding:.4em;text-align:center;vertical-align:middle}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content code{font-family:monospace}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content kbd{box-shadow:0 1px 1px var(--ck-accessibility-help-dialog-kbd-shadow-color);margin:0 1px;min-width:1.8em}.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content kbd+kbd{margin-left:2px}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/editorui/accessibilityhelp.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAQA,MACC,8CAA+C,CAC/C,+CAAgD,CAChD,mDAA8D,CAC9D,4DAAyE,CACzE,uDACD,CAEA,wEAOC,4BAA6B,CAJ7B,yDAA0D,CAD1D,uDAAwD,CAExD,aAAc,CAHd,+BAAgC,CAIhC,gBAgFD,CA5EC,8ECdA,2BAA2B,CCF3B,2CAA8B,CDC9B,YDkBA,CAEA,0EACC,kBACD,CAGA,kFACC,YACD,CAEA,2EAEC,eAAgB,CADhB,eAED,CAEA,2EAEC,aAAc,CADd,eAED,CAEA,8SAIC,YACD,CAEA,2EAIC,kBAAmB,CADnB,qEAAsE,CAFtE,YAAa,CACb,6BAiBD,CAbC,4JACC,wEAAyE,CACzE,cACD,CAEA,8EACC,mBACD,CAEA,8EACC,mBAAoB,CACpB,gBACD,CAGD,yJAEC,oEAAqE,CAIrE,iBAAkB,CALlB,oBAAqB,CAOrB,cAAe,CAHf,aAAc,CAFd,YAAa,CAIb,iBAAkB,CAHlB,qBAKD,CAEA,6EACC,qBACD,CAEA,4EAEC,yEAA4E,CAC5E,YAAa,CAFb,eAOD,CAHC,gFACC,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_focus.css";
@import "../../../mixins/_shadow.css";

:root {
	--ck-accessibility-help-dialog-max-width: 600px;
	--ck-accessibility-help-dialog-max-height: 400px;
	--ck-accessibility-help-dialog-border-color: hsl(220, 6%, 81%);
	--ck-accessibility-help-dialog-code-background-color: hsl(0deg 0% 92.94%);
	--ck-accessibility-help-dialog-kbd-shadow-color: hsl(0deg 0% 61%);
}

.ck.ck-accessibility-help-dialog .ck-accessibility-help-dialog__content {
	padding: var(--ck-spacing-large);
	max-width: var(--ck-accessibility-help-dialog-max-width);
	max-height: var(--ck-accessibility-help-dialog-max-height);
	overflow: auto;
	user-select: text;

	border: 1px solid transparent;

	&:focus {
		@mixin ck-focus-ring;
		@mixin ck-box-shadow var(--ck-focus-outer-shadow);
	}

	* {
		white-space: normal;
	}

	/* Hide the main label of the content container. */
	& .ck-label {
		display: none;
	}

	& h3 {
		font-weight: bold;
		font-size: 1.2em;
	}

	& h4 {
		font-weight: bold;
		font-size: 1em;
	}

	& p,
	& h3,
	& h4,
	& table {
		margin: 1em 0;
	}

	& dl {
		display: grid;
		grid-template-columns: 2fr 1fr;
		border-top: 1px solid var(--ck-accessibility-help-dialog-border-color);
		border-bottom: none;

		& dt, & dd {
			border-bottom: 1px solid var(--ck-accessibility-help-dialog-border-color);
			padding: .4em 0;
		}

		& dt {
			grid-column-start: 1;
		}

		& dd {
			grid-column-start: 2;
			text-align: right;
		}
	}

	& kbd, & code {
		display: inline-block;
		background: var(--ck-accessibility-help-dialog-code-background-color);
		padding: .4em;
		vertical-align: middle;
		line-height: 1;
		border-radius: 2px;
		text-align: center;
		font-size: .9em;
	}

	& code {
		font-family: monospace;
	}

	& kbd {
		min-width: 1.8em;
		box-shadow: 0px 1px 1px var(--ck-accessibility-help-dialog-kbd-shadow-color);
		margin: 0 1px;

		& + kbd {
			margin-left: 2px;
		}
	}
}

`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},1185:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-editable-blur-selection:#d9d9d9}.ck.ck-editor__editable:not(.ck-editor__nested-editable){border-radius:0}.ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),.ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable){border-radius:var(--ck-border-radius)}.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable){border:var(--ck-focus-ring);box-shadow:var(--ck-inner-shadow),0 0;outline:none}.ck.ck-editor__editable_inline{border:1px solid transparent;overflow:auto;padding:0 var(--ck-spacing-standard)}.ck.ck-editor__editable_inline[dir=ltr]{text-align:left}.ck.ck-editor__editable_inline[dir=rtl]{text-align:right}.ck.ck-editor__editable_inline>:first-child{margin-top:var(--ck-spacing-large)}.ck.ck-editor__editable_inline>:last-child{margin-bottom:var(--ck-spacing-large)}.ck.ck-editor__editable_inline.ck-blurred ::selection{background:var(--ck-color-editable-blur-selection)}.ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_n]:after{border-bottom-color:var(--ck-color-panel-background)}.ck.ck-balloon-panel.ck-toolbar-container[class*=arrow_s]:after{border-top-color:var(--ck-color-panel-background)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/editorui/editorui.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAWA,MACC,0CACD,CAEA,yDCJC,eDWD,CCTC,yJAEC,qCAED,CDCA,oEEPA,2BAA2B,CCF3B,qCAA8B,CDC9B,YFWA,CAGD,+BAGC,4BAA6B,CAF7B,aAAc,CACd,oCA6BD,CA1BC,wCACC,eACD,CAEA,wCACC,gBACD,CAGA,4CACC,kCACD,CAGA,2CAKC,qCACD,CAGA,sDACC,kDACD,CAKA,gEACC,oDACD,CAIA,gEACC,iDACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_disabled.css";
@import "../../../mixins/_shadow.css";
@import "../../../mixins/_focus.css";
@import "../../mixins/_button.css";

:root {
	--ck-color-editable-blur-selection: hsl(0, 0%, 85%);
}

.ck.ck-editor__editable:not(.ck-editor__nested-editable) {
	@mixin ck-rounded-corners;

	&.ck-focused {
		@mixin ck-focus-ring;
		@mixin ck-box-shadow var(--ck-inner-shadow);
	}
}

.ck.ck-editor__editable_inline {
	overflow: auto;
	padding: 0 var(--ck-spacing-standard);
	border: 1px solid transparent;

	&[dir="ltr"] {
		text-align: left;
	}

	&[dir="rtl"] {
		text-align: right;
	}

	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/116 */
	& > *:first-child {
		margin-top: var(--ck-spacing-large);
	}

	/* https://github.com/ckeditor/ckeditor5/issues/847 */
	& > *:last-child {
		/*
		 * This value should match with the default margins of the block elements (like .media or .image)
		 * to avoid a content jumping when the fake selection container shows up (See https://github.com/ckeditor/ckeditor5/issues/9825).
		 */
		margin-bottom: var(--ck-spacing-large);
	}

	/* https://github.com/ckeditor/ckeditor5/issues/6517 */
	&.ck-blurred ::selection {
		background: var(--ck-color-editable-blur-selection);
	}
}

/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/111 */
.ck.ck-balloon-panel.ck-toolbar-container[class*="arrow_n"] {
	&::after {
		border-bottom-color: var(--ck-color-panel-background);
	}
}

.ck.ck-balloon-panel.ck-toolbar-container[class*="arrow_s"] {
	&::after {
		border-top-color: var(--ck-color-panel-background);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},7913:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-form__header{align-items:center;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between}.ck.ck-form__header h2.ck-form__header__label{flex-grow:1}:root{--ck-form-header-height:44px}.ck.ck-form__header{border-bottom:1px solid var(--ck-color-base-border);height:var(--ck-form-header-height);line-height:var(--ck-form-header-height);padding:var(--ck-spacing-small) var(--ck-spacing-large)}[dir=ltr] .ck.ck-form__header>.ck-icon{margin-right:var(--ck-spacing-medium)}[dir=rtl] .ck.ck-form__header>.ck-icon{margin-left:var(--ck-spacing-medium)}.ck.ck-form__header .ck-form__header__label{--ck-font-size-base:15px;font-weight:700}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/formheader/formheader.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/formheader/formheader.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAKA,oBAIC,kBAAmB,CAHnB,YAAa,CACb,kBAAmB,CACnB,gBAAiB,CAEjB,6BAKD,CAHC,8CACC,WACD,CCPD,MACC,4BACD,CAEA,oBAIC,mDAAoD,CAFpD,mCAAoC,CACpC,wCAAyC,CAFzC,uDAmBD,CCzBC,uCDaE,qCCXF,CAFA,uCDiBE,oCCfF,CDmBA,4CACC,wBAAyB,CACzB,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-form__header {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;

	& h2.ck-form__header__label {
		flex-grow: 1;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

:root {
	--ck-form-header-height: 44px;
}

.ck.ck-form__header {
	padding: var(--ck-spacing-small) var(--ck-spacing-large);
	height: var(--ck-form-header-height);
	line-height: var(--ck-form-header-height);
	border-bottom: 1px solid var(--ck-color-base-border);

	& > .ck-icon {
		@mixin ck-dir ltr {
			margin-right: var(--ck-spacing-medium);
		}

		@mixin ck-dir rtl {
			margin-left: var(--ck-spacing-medium);
		}
	}

	& .ck-form__header__label {
		--ck-font-size-base: 15px;
		font-weight: bold;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},9529:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-highlighted-text mark{background:var(--ck-color-highlight-background);font-size:inherit;font-weight:inherit;line-height:inherit;vertical-align:initial}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/highlightedtext/highlightedtext.css"],names:[],mappings:"AAKA,6BACC,+CAAgD,CAIhD,iBAAkB,CAFlB,mBAAoB,CACpB,mBAAoB,CAFpB,sBAID",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-highlighted-text mark {
	background: var(--ck-color-highlight-background);
	vertical-align: initial;
	font-weight: inherit;
	line-height: inherit;
	font-size: inherit;
}
`],sourceRoot:""}]);const w=k},7621:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-icon{vertical-align:middle}:root{--ck-icon-size:calc(var(--ck-line-height-base)*var(--ck-font-size-normal));--ck-icon-font-size:.8333350694em}.ck.ck-icon{font-size:var(--ck-icon-font-size);height:var(--ck-icon-size);width:var(--ck-icon-size);will-change:transform}.ck.ck-icon,.ck.ck-icon *{cursor:inherit}.ck.ck-icon.ck-icon_inherit-color,.ck.ck-icon.ck-icon_inherit-color *{color:inherit}.ck.ck-icon.ck-icon_inherit-color :not([fill]){fill:currentColor}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/icon/icon.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/icon/icon.css"],names:[],mappings:"AAKA,YACC,qBACD,CCFA,MACC,0EAA6E,CAC7E,iCACD,CAEA,YAKC,kCAAmC,CAHnC,0BAA2B,CAD3B,yBAA0B,CAU1B,qBAoBD,CAlBC,0BALA,cAQA,CAMC,sEACC,aAMD,CAJC,+CAEC,iBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-icon {
	vertical-align: middle;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-icon-size: calc(var(--ck-line-height-base) * var(--ck-font-size-normal));
	--ck-icon-font-size: .8333350694em;
}

.ck.ck-icon {
	width: var(--ck-icon-size);
	height: var(--ck-icon-size);

	/* Multiplied by the height of the line in "px" should give SVG "viewport" dimensions */
	font-size: var(--ck-icon-font-size);

	/* Inherit cursor style (#5). */
	cursor: inherit;

	/* This will prevent blurry icons on Firefox. See #340. */
	will-change: transform;

	& * {
		/* Inherit cursor style (#5). */
		cursor: inherit;
	}

	/* Allows dynamic coloring of an icon by inheriting its color from the parent. */
	&.ck-icon_inherit-color {
		color: inherit;

		& * {
			color: inherit;

			&:not([fill]) {
				/* Needed by FF. */
				fill: currentColor;
			}
		}
	}
}
`],sourceRoot:""}]);const w=k},253:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-input-width:18em;--ck-input-text-width:var(--ck-input-width)}.ck.ck-input{background:var(--ck-color-input-background);border:1px solid var(--ck-color-input-border);border-radius:0;min-height:var(--ck-ui-component-min-height);min-width:var(--ck-input-width);padding:var(--ck-spacing-extra-tiny) var(--ck-spacing-medium);transition:box-shadow .1s ease-in-out,border .1s ease-in-out}.ck-rounded-corners .ck.ck-input,.ck.ck-input.ck-rounded-corners{border-radius:var(--ck-border-radius)}@media (prefers-reduced-motion:reduce){.ck.ck-input{transition:none}}.ck.ck-input:focus{border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),0 0;outline:none}.ck.ck-input[readonly]{background:var(--ck-color-input-disabled-background);border:1px solid var(--ck-color-input-disabled-border);color:var(--ck-color-input-disabled-text)}.ck.ck-input[readonly]:focus{box-shadow:var(--ck-focus-disabled-outer-shadow),0 0}.ck.ck-input.ck-error{animation:ck-input-shake .3s ease both;border-color:var(--ck-color-input-error-border)}@media (prefers-reduced-motion:reduce){.ck.ck-input.ck-error{animation:none}}.ck.ck-input.ck-error:focus{box-shadow:var(--ck-focus-error-outer-shadow),0 0}@keyframes ck-input-shake{20%{transform:translateX(-2px)}40%{transform:translateX(2px)}60%{transform:translateX(-1px)}80%{transform:translateX(1px)}}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/input/input.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AASA,MACC,qBAAsB,CAGtB,2CACD,CAEA,aAGC,2CAA4C,CAC5C,6CAA8C,CCT9C,eAAgB,CDchB,4CAA6C,CAH7C,+BAAgC,CADhC,6DAA8D,CAO9D,4DAkCD,CCjDC,iEAEC,qCAED,CDaA,uCAdD,aAeE,eA+BF,CA9BC,CAEA,mBEvBA,2BAA2B,CCF3B,2CAA8B,CDC9B,YF2BA,CAEA,uBAEC,oDAAqD,CADrD,sDAAuD,CAEvD,yCAMD,CAJC,6BGnCD,oDHsCC,CAGD,sBAEC,sCAAuC,CADvC,+CAUD,CAPC,uCAJD,sBAKE,cAMF,CALC,CAEA,4BGjDD,iDHmDC,CAIF,0BACC,IACC,0BACD,CAEA,IACC,yBACD,CAEA,IACC,0BACD,CAEA,IACC,yBACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_focus.css";
@import "../../../mixins/_shadow.css";

:root {
	--ck-input-width: 18em;

	/* Backward compatibility. */
	--ck-input-text-width: var(--ck-input-width);
}

.ck.ck-input {
	@mixin ck-rounded-corners;

	background: var(--ck-color-input-background);
	border: 1px solid var(--ck-color-input-border);
	padding: var(--ck-spacing-extra-tiny) var(--ck-spacing-medium);
	min-width: var(--ck-input-width);

	/* This is important to stay of the same height as surrounding buttons */
	min-height: var(--ck-ui-component-min-height);

	/* Apply some smooth transition to the box-shadow and border. */
	transition: box-shadow .1s ease-in-out, border .1s ease-in-out;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&:focus {
		@mixin ck-focus-ring;
		@mixin ck-box-shadow var(--ck-focus-outer-shadow);
	}

	&[readonly] {
		border: 1px solid var(--ck-color-input-disabled-border);
		background: var(--ck-color-input-disabled-background);
		color: var(--ck-color-input-disabled-text);

		&:focus {
			/* The read-only input should have a slightly less visible shadow when focused. */
			@mixin ck-box-shadow var(--ck-focus-disabled-outer-shadow);
		}
	}

	&.ck-error {
		border-color: var(--ck-color-input-error-border);
		animation: ck-input-shake .3s ease both;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}

		&:focus {
			@mixin ck-box-shadow var(--ck-focus-error-outer-shadow);
		}
	}
}

@keyframes ck-input-shake {
	20% {
		transform: translateX(-2px);
	}

	40% {
		transform: translateX(2px);
	}

	60% {
		transform: translateX(-1px);
	}

	80% {
		transform: translateX(1px);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},7801:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-label{display:block}.ck.ck-voice-label{display:none}.ck.ck-label{font-weight:700}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/label/label.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/label/label.css"],names:[],mappings:"AAKA,aACC,aACD,CAEA,mBACC,YACD,CCNA,aACC,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-label {
	display: block;
}

.ck.ck-voice-label {
	display: none;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-label {
	font-weight: bold;
}
`],sourceRoot:""}]);const w=k},4962:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper{display:flex;position:relative}.ck.ck-labeled-field-view .ck.ck-label{display:block;position:absolute}:root{--ck-labeled-field-view-transition:.1s cubic-bezier(0,0,0.24,0.95);--ck-labeled-field-empty-unfocused-max-width:100% - 2 * var(--ck-spacing-medium);--ck-labeled-field-label-default-position-x:var(--ck-spacing-medium);--ck-labeled-field-label-default-position-y:calc(var(--ck-font-size-base)*0.6);--ck-color-labeled-field-label-background:var(--ck-color-base-background)}.ck.ck-labeled-field-view{border-radius:0}.ck-rounded-corners .ck.ck-labeled-field-view,.ck.ck-labeled-field-view.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper{width:100%}.ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{background:var(--ck-color-labeled-field-label-background);font-weight:400;line-height:normal;max-width:100%;overflow:hidden;padding:0 calc(var(--ck-font-size-tiny)*.5);pointer-events:none;text-overflow:ellipsis;top:0;transition:transform var(--ck-labeled-field-view-transition),padding var(--ck-labeled-field-view-transition),background var(--ck-labeled-field-view-transition)}[dir=ltr] .ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{left:0;transform:translate(var(--ck-spacing-medium),-6px) scale(.75);transform-origin:0 0}[dir=rtl] .ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{right:0;transform:translate(calc(var(--ck-spacing-medium)*-1),-6px) scale(.75);transform-origin:100% 0}@media (prefers-reduced-motion:reduce){.ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{transition:none}}.ck.ck-labeled-field-view.ck-error .ck-input:not([readonly])+.ck.ck-label,.ck.ck-labeled-field-view.ck-error>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{color:var(--ck-color-base-error)}.ck.ck-labeled-field-view .ck-labeled-field-view__status{font-size:var(--ck-font-size-small);margin-top:var(--ck-spacing-small);white-space:normal}.ck.ck-labeled-field-view .ck-labeled-field-view__status.ck-labeled-field-view__status_error{color:var(--ck-color-base-error)}.ck.ck-labeled-field-view.ck-disabled>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label,.ck.ck-labeled-field-view.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{color:var(--ck-color-input-disabled-text)}.ck.ck-labeled-field-view.ck-disabled.ck-labeled-field-view_empty:not(.ck-labeled-field-view_placeholder)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label,.ck.ck-labeled-field-view.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder):not(.ck-error)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{background:transparent;max-width:calc(var(--ck-labeled-field-empty-unfocused-max-width));padding:0}[dir=ltr] .ck.ck-labeled-field-view.ck-disabled.ck-labeled-field-view_empty:not(.ck-labeled-field-view_placeholder)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label,[dir=ltr] .ck.ck-labeled-field-view.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder):not(.ck-error)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{transform:translate(var(--ck-labeled-field-label-default-position-x),var(--ck-labeled-field-label-default-position-y)) scale(1)}[dir=rtl] .ck.ck-labeled-field-view.ck-disabled.ck-labeled-field-view_empty:not(.ck-labeled-field-view_placeholder)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label,[dir=rtl] .ck.ck-labeled-field-view.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder):not(.ck-error)>.ck.ck-labeled-field-view__input-wrapper>.ck.ck-label{transform:translate(calc(var(--ck-labeled-field-label-default-position-x)*-1),var(--ck-labeled-field-label-default-position-y)) scale(1)}.ck.ck-labeled-field-view>.ck.ck-labeled-field-view__input-wrapper>.ck-dropdown>.ck.ck-button{background:transparent}.ck.ck-labeled-field-view.ck-labeled-field-view_empty>.ck.ck-labeled-field-view__input-wrapper>.ck-dropdown>.ck-button>.ck-button__label{opacity:0}.ck.ck-labeled-field-view.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder)>.ck.ck-labeled-field-view__input-wrapper>.ck-dropdown+.ck-label{max-width:calc(var(--ck-labeled-field-empty-unfocused-max-width) - var(--ck-dropdown-arrow-size) - var(--ck-spacing-standard))}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/labeledfield/labeledfieldview.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/labeledfield/labeledfieldview.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAMC,mEACC,YAAa,CACb,iBACD,CAEA,uCACC,aAAc,CACd,iBACD,CCND,MACC,kEAAsE,CACtE,gFAAiF,CACjF,oEAAqE,CACrE,8EAAiF,CACjF,yEACD,CAEA,0BCLC,eDmHD,CCjHC,2FAEC,qCAED,CDEA,mEACC,UAwCD,CAtCC,gFAkBC,yDAA0D,CAG1D,eAAmB,CADnB,kBAAoB,CAOpB,cAAe,CAFf,eAAgB,CANhB,2CAA8C,CAH9C,mBAAoB,CAQpB,sBAAuB,CAvBvB,KAAQ,CA4BR,+JAQD,CErDD,0FFoBG,MAAS,CAGT,6DAA+D,CAF/D,oBEnBH,CAFA,0FF2BG,OAAU,CAEV,sEAA0E,CAD1E,uBE1BH,CFgDE,uCAlCD,gFAmCE,eAEF,CADC,CASD,mKACC,gCACD,CAGD,yDACC,mCAAoC,CACpC,kCAAmC,CAInC,kBAKD,CAHC,6FACC,gCACD,CAID,4OAEC,yCACD,CAIA,uWAaC,sBAAuB,CAFvB,iEAAkE,CAGlE,SACD,CEtGA,2XF0FE,+HExFF,CAFA,2XF8FE,wIE5FF,CFyGA,8FACC,sBACD,CAGA,yIACC,SACD,CAGA,kMACC,8HACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-labeled-field-view {
	& > .ck.ck-labeled-field-view__input-wrapper {
		display: flex;
		position: relative;
	}

	& .ck.ck-label {
		display: block;
		position: absolute;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";
@import "../../../mixins/_rounded.css";

:root {
	--ck-labeled-field-view-transition: .1s cubic-bezier(0, 0, 0.24, 0.95);
	--ck-labeled-field-empty-unfocused-max-width: 100% - 2 * var(--ck-spacing-medium);
	--ck-labeled-field-label-default-position-x: var(--ck-spacing-medium);
	--ck-labeled-field-label-default-position-y: calc(0.6 * var(--ck-font-size-base));
	--ck-color-labeled-field-label-background: var(--ck-color-base-background);
}

.ck.ck-labeled-field-view {
	@mixin ck-rounded-corners;

	& > .ck.ck-labeled-field-view__input-wrapper {
		width: 100%;

		& > .ck.ck-label {
			top: 0px;

			@mixin ck-dir ltr {
				left: 0px;
				transform-origin: 0 0;
				/* By default, display the label scaled down above the field. */
				transform: translate(var(--ck-spacing-medium), -6px) scale(.75);
			}

			@mixin ck-dir rtl {
				right: 0px;
				transform-origin: 100% 0;
				transform: translate(calc(-1 * var(--ck-spacing-medium)), -6px) scale(.75);
			}

			pointer-events: none;

			background: var(--ck-color-labeled-field-label-background);
			padding: 0 calc(.5 * var(--ck-font-size-tiny));
			line-height: initial;
			font-weight: normal;

			/* Prevent overflow when the label is longer than the input */
			text-overflow: ellipsis;
			overflow: hidden;

			max-width: 100%;

			transition:
				transform var(--ck-labeled-field-view-transition),
				padding var(--ck-labeled-field-view-transition),
				background var(--ck-labeled-field-view-transition);

			@media (prefers-reduced-motion: reduce) {
				transition: none;
			}
		}
	}

	&.ck-error {
		& > .ck.ck-labeled-field-view__input-wrapper > .ck.ck-label {
			color: var(--ck-color-base-error);
		}

		& .ck-input:not([readonly]) + .ck.ck-label {
			color: var(--ck-color-base-error);
		}
	}

	& .ck-labeled-field-view__status {
		font-size: var(--ck-font-size-small);
		margin-top: var(--ck-spacing-small);

		/* Let the info wrap to the next line to avoid stretching the layout horizontally.
		The status could be very long. */
		white-space: normal;

		&.ck-labeled-field-view__status_error {
			color: var(--ck-color-base-error);
		}
	}

	/* Disabled fields and fields that have no focus should fade out. */
	&.ck-disabled > .ck.ck-labeled-field-view__input-wrapper > .ck.ck-label,
	&.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused) > .ck.ck-labeled-field-view__input-wrapper > .ck.ck-label {
		color: var(--ck-color-input-disabled-text);
	}

	/* Fields that are disabled or not focused and without a placeholder should have full-sized labels. */
	/* stylelint-disable-next-line no-descending-specificity */
	&.ck-disabled.ck-labeled-field-view_empty:not(.ck-labeled-field-view_placeholder) > .ck.ck-labeled-field-view__input-wrapper > .ck.ck-label,
	&.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder):not(.ck-error) > .ck.ck-labeled-field-view__input-wrapper > .ck.ck-label {
		@mixin ck-dir ltr {
			transform: translate(var(--ck-labeled-field-label-default-position-x), var(--ck-labeled-field-label-default-position-y)) scale(1);
		}

		@mixin ck-dir rtl {
			transform: translate(calc(-1 * var(--ck-labeled-field-label-default-position-x)), var(--ck-labeled-field-label-default-position-y)) scale(1);
		}

		/* Compensate for the default translate position. */
		max-width: calc(var(--ck-labeled-field-empty-unfocused-max-width));

		background: transparent;
		padding: 0;
	}

	/*------ DropdownView integration ----------------------------------------------------------------------------------- */

	/* Make sure dropdown' background color in any of dropdown's state does not collide with labeled field. */
	& > .ck.ck-labeled-field-view__input-wrapper > .ck-dropdown > .ck.ck-button {
		background: transparent;
	}

	/* When the dropdown is "empty", the labeled field label replaces its label. */
	&.ck-labeled-field-view_empty > .ck.ck-labeled-field-view__input-wrapper > .ck-dropdown > .ck-button > .ck-button__label {
		opacity: 0;
	}

	/* Make sure the label of the empty, unfocused input does not cover the dropdown arrow. */
	&.ck-labeled-field-view_empty:not(.ck-labeled-field-view_focused):not(.ck-labeled-field-view_placeholder) > .ck.ck-labeled-field-view__input-wrapper > .ck-dropdown + .ck-label {
		max-width: calc(var(--ck-labeled-field-empty-unfocused-max-width) - var(--ck-dropdown-arrow-size) - var(--ck-spacing-standard));
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},5199:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-list{display:flex;flex-direction:column;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ck.ck-list .ck-list__item,.ck.ck-list .ck-list__separator{display:block}.ck.ck-list .ck-list__item>:focus{position:relative;z-index:var(--ck-z-default)}.ck.ck-list{background:var(--ck-color-list-background);border-radius:0;list-style-type:none;padding:var(--ck-spacing-small) 0}.ck-rounded-corners .ck.ck-list,.ck.ck-list.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-list__item{cursor:default;min-width:15em}.ck.ck-list__item>.ck-button:not(.ck-list-item-button){border-radius:0;min-height:unset;padding:var(--ck-spacing-tiny) calc(var(--ck-spacing-standard)*2);width:100%}[dir=ltr] .ck.ck-list__item>.ck-button:not(.ck-list-item-button){text-align:left}[dir=rtl] .ck.ck-list__item>.ck-button:not(.ck-list-item-button){text-align:right}.ck.ck-list__item>.ck-button:not(.ck-list-item-button) .ck-button__label{line-height:calc(var(--ck-line-height-base)*var(--ck-font-size-base))}.ck.ck-list__item>.ck-button:not(.ck-list-item-button):active{box-shadow:none}.ck.ck-list__item>.ck-button.ck-on:not(.ck-list-item-button){background:var(--ck-color-list-button-on-background);color:var(--ck-color-list-button-on-text)}.ck.ck-list__item>.ck-button.ck-on:not(.ck-list-item-button):active{box-shadow:none}.ck.ck-list__item>.ck-button.ck-on:not(.ck-list-item-button):hover:not(.ck-disabled){background:var(--ck-color-list-button-on-background-focus)}.ck.ck-list__item>.ck-button.ck-on:not(.ck-list-item-button):focus:not(.ck-disabled){border-color:var(--ck-color-base-background)}.ck.ck-list__item>.ck-button:not(.ck-list-item-button):hover:not(.ck-disabled){background:var(--ck-color-list-button-hover-background)}.ck.ck-list__item>.ck-button.ck-switchbutton.ck-on{background:var(--ck-color-list-background);color:inherit}.ck.ck-list__item>.ck-button.ck-switchbutton.ck-on:hover:not(.ck-disabled){background:var(--ck-color-list-button-hover-background);color:inherit}.ck-list .ck-list__group{padding-top:var(--ck-spacing-medium)}.ck-list .ck-list__group:first-child{padding-top:0}:not(.ck-hidden)~.ck-list .ck-list__group{border-top:1px solid var(--ck-color-base-border)}.ck-list .ck-list__group>.ck-label{font-size:11px;font-weight:700;padding:var(--ck-spacing-medium) var(--ck-spacing-large) 0}.ck.ck-list__separator{background:var(--ck-color-base-border);height:1px;margin:var(--ck-spacing-small) 0;width:100%}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/list/list.css","webpack://./../ckeditor5-ui/theme/mixins/_unselectable.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/list/list.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAOA,YAGC,YAAa,CACb,qBAAsB,CCFtB,qBAAsB,CACtB,wBAAyB,CACzB,oBAAqB,CACrB,gBDaD,CAZC,2DAEC,aACD,CAKA,kCACC,iBAAkB,CAClB,2BACD,CEdD,YAIC,0CAA2C,CCH3C,eAAgB,CDEhB,oBAAqB,CAIrB,iCACD,CCLC,+DAEC,qCAED,CDGD,kBACC,cAAe,CAGf,cA4DD,CA1DC,uDAIC,eAAgB,CAFhB,gBAAiB,CADjB,iEAAoE,CAEpE,UAwCD,CE/DA,iEF2BE,eEzBF,CAFA,iEF+BE,gBE7BF,CFgCC,yEAEC,qEACD,CAEA,8DACC,eACD,CAEA,6DACC,oDAAqD,CACrD,yCAaD,CAXC,oEACC,eACD,CAEA,qFACC,0DACD,CAEA,qFACC,4CACD,CAGD,+EACC,uDACD,CAMA,mDACC,0CAA2C,CAC3C,aAMD,CAJC,2EACC,uDAAwD,CACxD,aACD,CAKH,yBACC,oCAiBD,CAdC,qCACC,aACD,CAGA,0CACC,gDACD,CAEA,mCACC,cAAe,CACf,eAAiB,CACjB,0DACD,CAGD,uBAGC,sCAAuC,CAFvC,UAAW,CAKX,gCAAiC,CAJjC,UAKD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../mixins/_unselectable.css";

.ck.ck-list {
	@mixin ck-unselectable;

	display: flex;
	flex-direction: column;

	& .ck-list__item,
	& .ck-list__separator {
		display: block;
	}

	/* Make sure that whatever child of the list item gets focus, it remains on the
	top. Thanks to that, styles like box-shadow, outline, etc. are not masked by
	adjacent list items. */
	& .ck-list__item > *:focus {
		position: relative;
		z-index: var(--ck-z-default);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Makes element unselectable.
 */
@define-mixin ck-unselectable {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_disabled.css";
@import "../../../mixins/_rounded.css";
@import "../../../mixins/_shadow.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-list {
	@mixin ck-rounded-corners;

	list-style-type: none;
	background: var(--ck-color-list-background);

	/* A spacing at the beginning and end of the list */
	padding: var(--ck-spacing-small) 0;
}

.ck.ck-list__item {
	cursor: default;

	/* Almost as wide as menu bar items. */
	min-width: 15em;

	& > .ck-button:not(.ck-list-item-button) {
		padding: var(--ck-spacing-tiny) calc(2 * var(--ck-spacing-standard));
		min-height: unset;
		width: 100%;
		border-radius: 0;

		@mixin ck-dir ltr {
			text-align: left;
		}

		@mixin ck-dir rtl {
			text-align: right;
		}

		& .ck-button__label {
			/* https://github.com/ckeditor/ckeditor5-heading/issues/63 */
			line-height: calc(var(--ck-line-height-base) * var(--ck-font-size-base));
		}

		&:active {
			box-shadow: none;
		}

		&.ck-on {
			background: var(--ck-color-list-button-on-background);
			color: var(--ck-color-list-button-on-text);

			&:active {
				box-shadow: none;
			}

			&:hover:not(.ck-disabled) {
				background: var(--ck-color-list-button-on-background-focus);
			}

			&:focus:not(.ck-disabled) {
				border-color: var(--ck-color-base-background);
			}
		}

		&:hover:not(.ck-disabled) {
			background: var(--ck-color-list-button-hover-background);
		}
	}

	/* It's unnecessary to change the background/text of a switch toggle; it has different ways
	of conveying its state (like the switcher) */
	& > .ck-button.ck-switchbutton {
		&.ck-on {
			background: var(--ck-color-list-background);
			color: inherit;

			&:hover:not(.ck-disabled) {
				background: var(--ck-color-list-button-hover-background);
				color: inherit;
			}
		}
	}
}

.ck-list .ck-list__group {
	padding-top: var(--ck-spacing-medium);

	/* Lists come with an inner vertical padding. Don't duplicate it. */
	&:first-child {
		padding-top: 0;
	}

	/* The group should have a border when it's not the first item. */
	*:not(.ck-hidden) ~ & {
		border-top: 1px solid var(--ck-color-base-border);
	}

	& > .ck-label {
		font-size: 11px;
		font-weight: bold;
		padding: var(--ck-spacing-medium) var(--ck-spacing-large) 0;
	}
}

.ck.ck-list__separator {
	height: 1px;
	width: 100%;
	background: var(--ck-color-base-border);

	/* Give the separator some air */
	margin: var(--ck-spacing-small) 0;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},497:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-menu-bar{background:var(--ck-color-base-background);border:1px solid var(--ck-color-toolbar-border);display:flex;flex-wrap:wrap;gap:var(--ck-spacing-small);justify-content:flex-start;padding:var(--ck-spacing-small);width:100%}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubar.css"],names:[],mappings:"AAKA,gBAIC,0CAA2C,CAG3C,+CAAgD,CANhD,YAAa,CACb,cAAe,CAIf,2BAA4B,CAH5B,0BAA2B,CAE3B,+BAAgC,CAGhC,UACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-menu-bar {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	background: var(--ck-color-base-background);
	padding: var(--ck-spacing-small);
	gap: var(--ck-spacing-small);
	border: 1px solid var(--ck-color-toolbar-border);
	width: 100%;
}
`],sourceRoot:""}]);const w=k},4:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-menu-bar__menu{display:block;font-size:inherit;position:relative}.ck.ck-menu-bar__menu.ck-menu-bar__menu_top-level{max-width:100%}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/menubar/menubarmenu.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubarmenu.css"],names:[],mappings:"AAKA,sBACC,aAAc,CCCd,iBAAkB,CDAlB,iBACD,CCCC,kDACC,cACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-menu-bar__menu {
	display: block;
	position: relative;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-menu-bar__menu {
	/* Enable font size inheritance, which allows fluid UI scaling. */
	font-size: inherit;

	&.ck-menu-bar__menu_top-level {
		max-width: 100%;
	}
}
`],sourceRoot:""}]);const w=k},3344:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-menu-bar__menu>.ck-menu-bar__menu__button>.ck-menu-bar__menu__button__arrow{pointer-events:none;z-index:var(--ck-z-default)}.ck.ck-menu-bar__menu>.ck-menu-bar__menu__button{width:100%}.ck.ck-menu-bar__menu>.ck-menu-bar__menu__button>.ck-button__label{flex-grow:1;overflow:hidden;text-overflow:ellipsis}.ck.ck-menu-bar__menu>.ck-menu-bar__menu__button.ck-disabled>.ck-button__label{opacity:var(--ck-disabled-opacity)}[dir=ltr] .ck.ck-menu-bar__menu>.ck-menu-bar__menu__button:not(.ck-button_with-text){padding-left:var(--ck-spacing-small)}[dir=rtl] .ck.ck-menu-bar__menu>.ck-menu-bar__menu__button:not(.ck-button_with-text){padding-right:var(--ck-spacing-small)}.ck.ck-menu-bar__menu.ck-menu-bar__menu_top-level>.ck-menu-bar__menu__button{min-height:unset;padding:var(--ck-spacing-small) var(--ck-spacing-medium)}.ck.ck-menu-bar__menu.ck-menu-bar__menu_top-level>.ck-menu-bar__menu__button .ck-button__label{line-height:unset;width:unset}.ck.ck-menu-bar__menu.ck-menu-bar__menu_top-level>.ck-menu-bar__menu__button.ck-on{border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-menu-bar__menu.ck-menu-bar__menu_top-level>.ck-menu-bar__menu__button .ck-icon{display:none}.ck.ck-menu-bar__menu:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button{border-radius:0}.ck.ck-menu-bar__menu:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button>.ck-menu-bar__menu__button__arrow{width:var(--ck-dropdown-arrow-size)}[dir=ltr] .ck.ck-menu-bar__menu:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button>.ck-menu-bar__menu__button__arrow{margin-left:var(--ck-spacing-standard);margin-right:calc(var(--ck-spacing-small)*-1);transform:rotate(-90deg)}[dir=rtl] .ck.ck-menu-bar__menu:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button>.ck-menu-bar__menu__button__arrow{left:var(--ck-spacing-standard);margin-left:calc(var(--ck-spacing-small)*-1);margin-right:var(--ck-spacing-small);transform:rotate(90deg)}.ck.ck-menu-bar__menu:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button.ck-disabled>.ck-menu-bar__menu__button__arrow{opacity:var(--ck-disabled-opacity)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/menubar/menubarmenubutton.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubarmenubutton.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_disabled.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAMC,mFACC,mBAAoB,CACpB,2BACD,CCIA,iDACC,UAuBD,CArBC,mEACC,WAAY,CACZ,eAAgB,CAChB,sBACD,CAEA,+ECbD,kCDeC,CAGC,qFACC,oCACD,CAIA,qFACC,qCACD,CAOF,6EAEC,gBAAiB,CADjB,wDAgBD,CAbC,+FAEC,iBAAkB,CADlB,WAED,CAEA,mFACC,2BAA4B,CAC5B,4BACD,CAEA,sFACC,YACD,CAMD,mFACC,eA+BD,CA7BC,qHACC,mCAuBD,CErFD,+HFoEG,sCAAuC,CAGvC,6CAAgD,CANhD,wBE/DH,CAFA,+HF6EG,+BAAgC,CAMhC,4CAA+C,CAH/C,oCAAqC,CALrC,uBEzEH,CFqFC,iICpFD,kCDsFC",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-menu-bar__menu  {
	& > .ck-menu-bar__menu__button > .ck-menu-bar__menu__button__arrow {
		pointer-events: none;
		z-index: var(--ck-z-default);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_disabled.css";
@import "../../mixins/_button.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-menu-bar__menu {
	/*
	 * All menu buttons.
	 */
	& > .ck-menu-bar__menu__button {
		width: 100%;

		& > .ck-button__label {
			flex-grow: 1;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&.ck-disabled > .ck-button__label {
			@mixin ck-disabled;
		}

		@mixin ck-dir ltr {
			&:not(.ck-button_with-text) {
				padding-left: var(--ck-spacing-small);
			}
		}

		@mixin ck-dir rtl {
			&:not(.ck-button_with-text) {
				padding-right: var(--ck-spacing-small);
			}
		}
	}

	/*
	 * Top-level menu buttons only.
	 */
	&.ck-menu-bar__menu_top-level > .ck-menu-bar__menu__button {
		padding: var(--ck-spacing-small) var(--ck-spacing-medium);
		min-height: unset;

		& .ck-button__label {
			width: unset;
			line-height: unset;
		}

		&.ck-on {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		& .ck-icon {
			display: none;
		}
	}

	/*
	 * Sub-menu buttons.
	 */
	&:not(.ck-menu-bar__menu_top-level) .ck-menu-bar__menu__button {
		border-radius: 0;

		& > .ck-menu-bar__menu__button__arrow {
			width: var(--ck-dropdown-arrow-size);

			@mixin ck-dir ltr {
				transform: rotate(-90deg);

				/* A space to accommodate the triangle. */
				margin-left: var(--ck-spacing-standard);

				/* Nudge the arrow gently to the right because its center of gravity is to the left */
				margin-right: calc(-1 * var(--ck-spacing-small));
			}

			@mixin ck-dir rtl {
				transform: rotate(90deg);

				left: var(--ck-spacing-standard);

				/* A space to accommodate the triangle. */
				margin-right: var(--ck-spacing-small);

				/* Nudge the arrow gently to the left because its center of gravity is to the right (after rotation). */
				margin-left: calc(-1 * var(--ck-spacing-small));
			}
		}

		&.ck-disabled > .ck-menu-bar__menu__button__arrow {
			@mixin ck-disabled;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which indicates that an element holding it is disabled.
 */
@define-mixin ck-disabled {
	opacity: var(--ck-disabled-opacity);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},9481:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-menu-bar-menu-item-min-width:18em}.ck.ck-menu-bar__menu .ck.ck-menu-bar__menu__item{min-width:var(--ck-menu-bar-menu-item-min-width)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubarmenulistitem.css"],names:[],mappings:"AAKA,MACC,sCACD,CAEA,kDACC,gDACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-menu-bar-menu-item-min-width: 18em;
}

.ck.ck-menu-bar__menu .ck.ck-menu-bar__menu__item {
	min-width: var(--ck-menu-bar-menu-item-min-width);
}
`],sourceRoot:""}]);const w=k},977:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button{border-radius:0}.ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button>.ck-spinner-container,.ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button>.ck-spinner-container .ck-spinner{--ck-toolbar-spinner-size:20px}.ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button>.ck-spinner-container{font-size:var(--ck-icon-font-size)}[dir=ltr] .ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button>.ck-spinner-container{margin-right:var(--ck-spacing-medium)}[dir=rtl] .ck.ck-menu-bar__menu .ck-button.ck-menu-bar__menu__item__button>.ck-spinner-container{margin-left:var(--ck-spacing-medium)}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubarmenulistitembutton.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAWC,iEACC,eAoBD,CAlBC,0LAGC,8BACD,CAEA,uFAEC,kCASD,CCzBD,iGDmBG,qCCjBH,CAFA,iGDuBG,oCCrBH",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-menu-bar__menu {
	/*
	 * List item buttons.
	 */
	& .ck-button.ck-menu-bar__menu__item__button {
		border-radius: 0;

		& > .ck-spinner-container,
		& > .ck-spinner-container .ck-spinner {
			/* These styles correspond to .ck-icon so that the spinner seamlessly replaces the icon. */
			--ck-toolbar-spinner-size: 20px;
		}

		& > .ck-spinner-container {
			/* This ensures margins corresponding to the .ck-icon. */
			font-size: var(--ck-icon-font-size);

			@mixin ck-dir ltr {
				margin-right: var(--ck-spacing-medium);
			}

			@mixin ck-dir rtl {
				margin-left: var(--ck-spacing-medium);
			}
		}
	}
}


`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},9108:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-menu-bar-menu-max-width:75vw;--ck-menu-bar-nested-menu-horizontal-offset:5px}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel{max-width:var(--ck-menu-bar-menu-max-width);position:absolute;z-index:var(--ck-z-panel)}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ne,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_nw{bottom:100%}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_se,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_sw{bottom:auto;top:100%}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ne,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_se{left:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_nw,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_sw{right:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_en,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_es{left:calc(100% - var(--ck-menu-bar-nested-menu-horizontal-offset))}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_es{top:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_en{bottom:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_wn,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ws{right:calc(100% - var(--ck-menu-bar-nested-menu-horizontal-offset))}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ws{top:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_wn{bottom:0}:root{--ck-menu-bar-menu-panel-max-width:75vw}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel{background:var(--ck-color-dropdown-panel-background);border:1px solid var(--ck-color-dropdown-panel-border);border-radius:0;bottom:0;height:fit-content;max-width:var(--ck-menu-bar-menu-panel-max-width)}.ck-rounded-corners .ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel{box-shadow:var(--ck-drop-shadow),0 0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_es,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_se{border-top-left-radius:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_sw,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ws{border-top-right-radius:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_en,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_ne{border-bottom-left-radius:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_nw,.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel.ck-menu-bar__menu__panel_position_wn{border-bottom-right-radius:0}.ck.ck-menu-bar__menu>.ck.ck-menu-bar__menu__panel:focus{outline:none}.ck.ck-menu-bar .ck-list-item-button:active,.ck.ck-menu-bar .ck-list-item-button:focus{border-color:transparent;box-shadow:none}.ck.ck-menu-bar.ck-menu-bar_focus-border-enabled .ck-list-item-button:active,.ck.ck-menu-bar.ck-menu-bar_focus-border-enabled .ck-list-item-button:focus{border:var(--ck-focus-ring);box-shadow:var(--ck-focus-outer-shadow),0 0;outline:none;position:relative;z-index:2}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/menubar/menubarmenupanel.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/menubar/menubarmenupanel.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css"],names:[],mappings:"AAKA,MACC,iCAAkC,CAClC,+CACD,CAEA,mDAEC,2CAA4C,CAC5C,iBAAkB,CAFlB,yBAkDD,CA9CC,gLAEC,WACD,CAEA,gLAGC,WAAY,CADZ,QAED,CAEA,gLAEC,MACD,CAEA,gLAEC,OACD,CAEA,gLAEC,kEACD,CAEA,wFACC,KACD,CAEA,wFACC,QACD,CAEA,gLAEC,mEACD,CAEA,wFACC,KACD,CAEA,wFACC,QACD,CCnDD,MACC,uCACD,CAEA,mDAIC,oDAAqD,CACrD,sDAAuD,CCPvD,eAAgB,CDQhB,QAAS,CACT,kBAAmB,CACnB,iDA0BD,CClCC,6IAEC,qCAED,CDJD,mDEJC,oCFsCD,CAvBC,gLAEC,wBACD,CAEA,gLAEC,yBACD,CAEA,gLAEC,2BACD,CAEA,gLAEC,4BACD,CAEA,yDACC,YACD,CAKC,uFAEC,wBAAyB,CACzB,eACD,CAIA,yJGhDD,2BAA2B,CDF3B,2CAA8B,CCC9B,YAAa,CHoDX,iBAAkB,CAClB,SAID",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-menu-bar-menu-max-width: 75vw;
	--ck-menu-bar-nested-menu-horizontal-offset: 5px;
}

.ck.ck-menu-bar__menu > .ck.ck-menu-bar__menu__panel {
	z-index: var(--ck-z-panel);
	max-width: var(--ck-menu-bar-menu-max-width);
	position: absolute;

	&.ck-menu-bar__menu__panel_position_ne,
	&.ck-menu-bar__menu__panel_position_nw {
		bottom: 100%;
	}

	&.ck-menu-bar__menu__panel_position_se,
	&.ck-menu-bar__menu__panel_position_sw {
		top: 100%;
		bottom: auto;
	}

	&.ck-menu-bar__menu__panel_position_ne,
	&.ck-menu-bar__menu__panel_position_se {
		left: 0px;
	}

	&.ck-menu-bar__menu__panel_position_nw,
	&.ck-menu-bar__menu__panel_position_sw {
		right: 0px;
	}

	&.ck-menu-bar__menu__panel_position_es,
	&.ck-menu-bar__menu__panel_position_en {
		left: calc( 100% - var(--ck-menu-bar-nested-menu-horizontal-offset) );
	}

	&.ck-menu-bar__menu__panel_position_es {
		top: 0px;
	}

	&.ck-menu-bar__menu__panel_position_en {
		bottom: 0px;
	}

	&.ck-menu-bar__menu__panel_position_ws,
	&.ck-menu-bar__menu__panel_position_wn {
		right: calc( 100% - var(--ck-menu-bar-nested-menu-horizontal-offset) );
	}

	&.ck-menu-bar__menu__panel_position_ws {
		top: 0px;
	}

	&.ck-menu-bar__menu__panel_position_wn {
		bottom: 0px;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_shadow.css";
@import "../../../mixins/_focus.css";

:root {
	--ck-menu-bar-menu-panel-max-width: 75vw;
}

.ck.ck-menu-bar__menu > .ck.ck-menu-bar__menu__panel {
	@mixin ck-rounded-corners;
	@mixin ck-drop-shadow;

	background: var(--ck-color-dropdown-panel-background);
	border: 1px solid var(--ck-color-dropdown-panel-border);
	bottom: 0;
	height: fit-content;
	max-width: var(--ck-menu-bar-menu-panel-max-width);

	/* Corner border radius consistent with the button. */
	&.ck-menu-bar__menu__panel_position_es,
	&.ck-menu-bar__menu__panel_position_se {
		border-top-left-radius: 0;
	}

	&.ck-menu-bar__menu__panel_position_ws,
	&.ck-menu-bar__menu__panel_position_sw {
		border-top-right-radius: 0;
	}

	&.ck-menu-bar__menu__panel_position_en,
	&.ck-menu-bar__menu__panel_position_ne {
		border-bottom-left-radius: 0;
	}

	&.ck-menu-bar__menu__panel_position_wn,
	&.ck-menu-bar__menu__panel_position_nw {
		border-bottom-right-radius: 0;
	}

	&:focus {
		outline: none;
	}
}

.ck.ck-menu-bar {
	& .ck-list-item-button {
		&:focus,
		&:active {
			border-color: transparent;
			box-shadow: none;
		}
	}

	&.ck-menu-bar_focus-border-enabled .ck-list-item-button {
		&:focus,
		&:active {
			/* Fix truncated shadows due to rendering order. */
			position: relative;
			z-index: 2;

			@mixin ck-focus-ring;
			@mixin ck-box-shadow var(--ck-focus-outer-shadow);
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`],sourceRoot:""}]);const w=k},3710:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,':root{--ck-balloon-panel-arrow-z-index:calc(var(--ck-z-default) - 3)}.ck.ck-balloon-panel{display:none;position:absolute;z-index:var(--ck-z-panel)}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{content:"";position:absolute}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel[class*=arrow_n]:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel[class*=arrow_n]:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel[class*=arrow_s]:before{z-index:var(--ck-balloon-panel-arrow-z-index)}.ck.ck-balloon-panel[class*=arrow_s]:after{z-index:calc(var(--ck-balloon-panel-arrow-z-index) + 1)}.ck.ck-balloon-panel.ck-balloon-panel_visible{display:block}:root{--ck-balloon-border-width:1px;--ck-balloon-arrow-offset:2px;--ck-balloon-arrow-height:10px;--ck-balloon-arrow-half-width:8px;--ck-balloon-arrow-drop-shadow:0 2px 2px var(--ck-color-shadow-drop)}.ck.ck-balloon-panel{background:var(--ck-color-panel-background);border:var(--ck-balloon-border-width) solid var(--ck-color-panel-border);border-radius:0;min-height:15px}.ck-rounded-corners .ck.ck-balloon-panel,.ck.ck-balloon-panel.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-balloon-panel{box-shadow:var(--ck-drop-shadow),0 0}.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:after,.ck.ck-balloon-panel.ck-balloon-panel_with-arrow:before{border-style:solid;height:0;width:0}.ck.ck-balloon-panel[class*=arrow_n]:after,.ck.ck-balloon-panel[class*=arrow_n]:before{border-width:0 var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width)}.ck.ck-balloon-panel[class*=arrow_n]:before{border-color:transparent transparent var(--ck-color-panel-border) transparent;margin-top:calc(var(--ck-balloon-border-width)*-1)}.ck.ck-balloon-panel[class*=arrow_n]:after{border-color:transparent transparent var(--ck-color-panel-background) transparent;margin-top:calc(var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width))}.ck.ck-balloon-panel[class*=arrow_s]:after,.ck.ck-balloon-panel[class*=arrow_s]:before{border-width:var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width) 0 var(--ck-balloon-arrow-half-width)}.ck.ck-balloon-panel[class*=arrow_s]:before{border-color:var(--ck-color-panel-border) transparent transparent;filter:drop-shadow(var(--ck-balloon-arrow-drop-shadow));margin-bottom:calc(var(--ck-balloon-border-width)*-1)}.ck.ck-balloon-panel[class*=arrow_s]:after{border-color:var(--ck-color-panel-background) transparent transparent transparent;margin-bottom:calc(var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width))}.ck.ck-balloon-panel[class*=arrow_e]:after,.ck.ck-balloon-panel[class*=arrow_e]:before{border-width:var(--ck-balloon-arrow-half-width) 0 var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height)}.ck.ck-balloon-panel[class*=arrow_e]:before{border-color:transparent transparent transparent var(--ck-color-panel-border);margin-right:calc(var(--ck-balloon-border-width)*-1)}.ck.ck-balloon-panel[class*=arrow_e]:after{border-color:transparent transparent transparent var(--ck-color-panel-background);margin-right:calc(var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width))}.ck.ck-balloon-panel[class*=arrow_w]:after,.ck.ck-balloon-panel[class*=arrow_w]:before{border-width:var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width) 0}.ck.ck-balloon-panel[class*=arrow_w]:before{border-color:transparent var(--ck-color-panel-border) transparent transparent;margin-left:calc(var(--ck-balloon-border-width)*-1)}.ck.ck-balloon-panel[class*=arrow_w]:after{border-color:transparent var(--ck-color-panel-background) transparent transparent;margin-left:calc(var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width))}.ck.ck-balloon-panel.ck-balloon-panel_arrow_n:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_n:before{left:50%;margin-left:calc(var(--ck-balloon-arrow-half-width)*-1);top:calc(var(--ck-balloon-arrow-height)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_nw:before{left:calc(var(--ck-balloon-arrow-half-width)*2);top:calc(var(--ck-balloon-arrow-height)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_ne:before{right:calc(var(--ck-balloon-arrow-half-width)*2);top:calc(var(--ck-balloon-arrow-height)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_s:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_s:before{bottom:calc(var(--ck-balloon-arrow-height)*-1);left:50%;margin-left:calc(var(--ck-balloon-arrow-half-width)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_sw:before{bottom:calc(var(--ck-balloon-arrow-height)*-1);left:calc(var(--ck-balloon-arrow-half-width)*2)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_se:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_se:before{bottom:calc(var(--ck-balloon-arrow-height)*-1);right:calc(var(--ck-balloon-arrow-half-width)*2)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_sme:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_sme:before{bottom:calc(var(--ck-balloon-arrow-height)*-1);margin-right:calc(var(--ck-balloon-arrow-half-width)*2);right:25%}.ck.ck-balloon-panel.ck-balloon-panel_arrow_smw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_smw:before{bottom:calc(var(--ck-balloon-arrow-height)*-1);left:25%;margin-left:calc(var(--ck-balloon-arrow-half-width)*2)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_nme:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_nme:before{margin-right:calc(var(--ck-balloon-arrow-half-width)*2);right:25%;top:calc(var(--ck-balloon-arrow-height)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_nmw:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_nmw:before{left:25%;margin-left:calc(var(--ck-balloon-arrow-half-width)*2);top:calc(var(--ck-balloon-arrow-height)*-1)}.ck.ck-balloon-panel.ck-balloon-panel_arrow_e:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_e:before{margin-top:calc(var(--ck-balloon-arrow-half-width)*-1);right:calc(var(--ck-balloon-arrow-height)*-1);top:50%}.ck.ck-balloon-panel.ck-balloon-panel_arrow_w:after,.ck.ck-balloon-panel.ck-balloon-panel_arrow_w:before{left:calc(var(--ck-balloon-arrow-height)*-1);margin-top:calc(var(--ck-balloon-arrow-half-width)*-1);top:50%}',"",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/panel/balloonpanel.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/panel/balloonpanel.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAKA,MAEC,8DACD,CAEA,qBACC,YAAa,CACb,iBAAkB,CAElB,yBAyCD,CAtCE,+GAEC,UAAW,CACX,iBACD,CAEA,wDACC,6CACD,CAEA,uDACC,uDACD,CAIA,4CACC,6CACD,CAEA,2CACC,uDACD,CAIA,4CACC,6CACD,CAEA,2CACC,uDACD,CAGD,8CACC,aACD,CC9CD,MACC,6BAA8B,CAC9B,6BAA8B,CAC9B,8BAA+B,CAC/B,iCAAkC,CAClC,oEACD,CAEA,qBAMC,2CAA4C,CAC5C,wEAAyE,CCZzE,eAAgB,CDShB,eA0LD,CCjMC,iFAEC,qCAED,CDDD,qBEPC,oCFqMD,CApLE,+GAIC,kBAAmB,CADnB,QAAS,CADT,OAGD,CAIA,uFAEC,mHACD,CAEA,4CACC,6EAA8E,CAC9E,kDACD,CAEA,2CACC,iFAAkF,CAClF,gFACD,CAIA,uFAEC,mHACD,CAEA,4CACC,iEAAkE,CAClE,uDAAwD,CACxD,qDACD,CAEA,2CACC,iFAAkF,CAClF,mFACD,CAIA,uFAEC,mHACD,CAEA,4CACC,6EAA8E,CAC9E,oDACD,CAEA,2CACC,iFAAkF,CAClF,kFACD,CAIA,uFAEC,mHACD,CAEA,4CACC,6EAA8E,CAC9E,mDACD,CAEA,2CACC,iFAAkF,CAClF,iFACD,CAIA,yGAEC,QAAS,CACT,uDAA0D,CAC1D,2CACD,CAIA,2GAEC,+CAAkD,CAClD,2CACD,CAIA,2GAEC,gDAAmD,CACnD,2CACD,CAIA,yGAIC,8CAAiD,CAFjD,QAAS,CACT,uDAED,CAIA,2GAGC,8CAAiD,CADjD,+CAED,CAIA,2GAGC,8CAAiD,CADjD,gDAED,CAIA,6GAIC,8CAAiD,CADjD,uDAA0D,CAD1D,SAGD,CAIA,6GAIC,8CAAiD,CAFjD,QAAS,CACT,sDAED,CAIA,6GAGC,uDAA0D,CAD1D,SAAU,CAEV,2CACD,CAIA,6GAEC,QAAS,CACT,sDAAyD,CACzD,2CACD,CAIA,yGAGC,sDAAyD,CADzD,6CAAgD,CAEhD,OACD,CAIA,yGAEC,4CAA+C,CAC/C,sDAAyD,CACzD,OACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/* Make sure the balloon arrow does not float over its children. */
	--ck-balloon-panel-arrow-z-index: calc(var(--ck-z-default) - 3);
}

.ck.ck-balloon-panel {
	display: none;
	position: absolute;

	z-index: var(--ck-z-panel);

	&.ck-balloon-panel_with-arrow {
		&::before,
		&::after {
			content: "";
			position: absolute;
		}

		&::before {
			z-index: var(--ck-balloon-panel-arrow-z-index);
		}

		&::after {
			z-index: calc(var(--ck-balloon-panel-arrow-z-index) + 1);
		}
	}

	&[class*="arrow_n"] {
		&::before {
			z-index: var(--ck-balloon-panel-arrow-z-index);
		}

		&::after {
			z-index: calc(var(--ck-balloon-panel-arrow-z-index) + 1);
		}
	}

	&[class*="arrow_s"] {
		&::before {
			z-index: var(--ck-balloon-panel-arrow-z-index);
		}

		&::after {
			z-index: calc(var(--ck-balloon-panel-arrow-z-index) + 1);
		}
	}

	&.ck-balloon-panel_visible {
		display: block;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "../../../mixins/_shadow.css";

:root {
	--ck-balloon-border-width: 1px;
	--ck-balloon-arrow-offset: 2px;
	--ck-balloon-arrow-height: 10px;
	--ck-balloon-arrow-half-width: 8px;
	--ck-balloon-arrow-drop-shadow: 0 2px 2px var(--ck-color-shadow-drop);
}

.ck.ck-balloon-panel {
	@mixin ck-rounded-corners;
	@mixin ck-drop-shadow;

	min-height: 15px;

	background: var(--ck-color-panel-background);
	border: var(--ck-balloon-border-width) solid var(--ck-color-panel-border);

	&.ck-balloon-panel_with-arrow {
		&::before,
		&::after {
			width: 0;
			height: 0;
			border-style: solid;
		}
	}

	&[class*="arrow_n"] {
		&::before,
		&::after {
			border-width: 0 var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width);
		}

		&::before {
			border-color: transparent transparent var(--ck-color-panel-border) transparent;
			margin-top: calc( -1 * var(--ck-balloon-border-width) );
		}

		&::after {
			border-color: transparent transparent var(--ck-color-panel-background) transparent;
			margin-top: calc( var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width) );
		}
	}

	&[class*="arrow_s"] {
		&::before,
		&::after {
			border-width: var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width) 0 var(--ck-balloon-arrow-half-width);
		}

		&::before {
			border-color: var(--ck-color-panel-border) transparent transparent;
			filter: drop-shadow(var(--ck-balloon-arrow-drop-shadow));
			margin-bottom: calc( -1 * var(--ck-balloon-border-width) );
		}

		&::after {
			border-color: var(--ck-color-panel-background) transparent transparent transparent;
			margin-bottom: calc( var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width) );
		}
	}

	&[class*="arrow_e"] {
		&::before,
		&::after {
			border-width: var(--ck-balloon-arrow-half-width) 0 var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height);
		}

		&::before {
			border-color: transparent transparent transparent var(--ck-color-panel-border);
			margin-right: calc( -1 * var(--ck-balloon-border-width) );
		}

		&::after {
			border-color: transparent transparent transparent var(--ck-color-panel-background);
			margin-right: calc( var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width) );
		}
	}

	&[class*="arrow_w"] {
		&::before,
		&::after {
			border-width: var(--ck-balloon-arrow-half-width) var(--ck-balloon-arrow-height) var(--ck-balloon-arrow-half-width) 0;
		}

		&::before {
			border-color: transparent var(--ck-color-panel-border) transparent transparent;
			margin-left: calc( -1 * var(--ck-balloon-border-width) );
		}

		&::after {
			border-color: transparent var(--ck-color-panel-background) transparent transparent;
			margin-left: calc( var(--ck-balloon-arrow-offset) - var(--ck-balloon-border-width) );
		}
	}

	&.ck-balloon-panel_arrow_n {
		&::before,
		&::after {
			left: 50%;
			margin-left: calc(-1 * var(--ck-balloon-arrow-half-width));
			top: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_nw {
		&::before,
		&::after {
			left: calc(2 * var(--ck-balloon-arrow-half-width));
			top: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_ne {
		&::before,
		&::after {
			right: calc(2 * var(--ck-balloon-arrow-half-width));
			top: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_s {
		&::before,
		&::after {
			left: 50%;
			margin-left: calc(-1 * var(--ck-balloon-arrow-half-width));
			bottom: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_sw {
		&::before,
		&::after {
			left: calc(2 * var(--ck-balloon-arrow-half-width));
			bottom: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_se {
		&::before,
		&::after {
			right: calc(2 * var(--ck-balloon-arrow-half-width));
			bottom: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_sme {
		&::before,
		&::after {
			right: 25%;
			margin-right: calc(2 * var(--ck-balloon-arrow-half-width));
			bottom: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_smw {
		&::before,
		&::after {
			left: 25%;
			margin-left: calc(2 * var(--ck-balloon-arrow-half-width));
			bottom: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_nme {
		&::before,
		&::after {
			right: 25%;
			margin-right: calc(2 * var(--ck-balloon-arrow-half-width));
			top: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_nmw {
		&::before,
		&::after {
			left: 25%;
			margin-left: calc(2 * var(--ck-balloon-arrow-half-width));
			top: calc(-1 * var(--ck-balloon-arrow-height));
		}
	}

	&.ck-balloon-panel_arrow_e {
		&::before,
		&::after {
			right: calc(-1 * var(--ck-balloon-arrow-height));
			margin-top: calc(-1 * var(--ck-balloon-arrow-half-width));
			top: 50%;
		}
	}

	&.ck-balloon-panel_arrow_w {
		&::before,
		&::after {
			left: calc(-1 * var(--ck-balloon-arrow-height));
			margin-top: calc(-1 * var(--ck-balloon-arrow-half-width));
			top: 50%;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},991:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-balloon-rotator__navigation{align-items:center;display:flex;justify-content:center}.ck .ck-balloon-rotator__content .ck-toolbar{justify-content:center}.ck .ck-balloon-rotator__navigation{background:var(--ck-color-toolbar-background);border-bottom:1px solid var(--ck-color-toolbar-border);padding:0 var(--ck-spacing-small)}.ck .ck-balloon-rotator__navigation>*{margin-bottom:var(--ck-spacing-small);margin-right:var(--ck-spacing-small);margin-top:var(--ck-spacing-small)}.ck .ck-balloon-rotator__navigation .ck-balloon-rotator__counter{margin-left:var(--ck-spacing-small);margin-right:var(--ck-spacing-standard)}.ck .ck-balloon-rotator__content .ck.ck-annotation-wrapper{box-shadow:none}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/panel/balloonrotator.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/panel/balloonrotator.css"],names:[],mappings:"AAKA,oCAEC,kBAAmB,CADnB,YAAa,CAEb,sBACD,CAKA,6CACC,sBACD,CCXA,oCACC,6CAA8C,CAC9C,sDAAuD,CACvD,iCAgBD,CAbC,sCAGC,qCAAsC,CAFtC,oCAAqC,CACrC,kCAED,CAGA,iEAIC,mCAAoC,CAHpC,uCAID,CAMA,2DACC,eACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-balloon-rotator__navigation {
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Buttons inside a toolbar should be centered when rotator bar is wider.
 * See: https://github.com/ckeditor/ckeditor5-ui/issues/495
 */
.ck .ck-balloon-rotator__content .ck-toolbar {
	justify-content: center;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-balloon-rotator__navigation {
	background: var(--ck-color-toolbar-background);
	border-bottom: 1px solid var(--ck-color-toolbar-border);
	padding: 0 var(--ck-spacing-small);

	/* Let's keep similar appearance to \`ck-toolbar\`. */
	& > * {
		margin-right: var(--ck-spacing-small);
		margin-top: var(--ck-spacing-small);
		margin-bottom: var(--ck-spacing-small);
	}

	/* Gives counter more breath than buttons. */
	& .ck-balloon-rotator__counter {
		margin-right: var(--ck-spacing-standard);

		/* We need to use smaller margin because of previous button's right margin. */
		margin-left: var(--ck-spacing-small);
	}
}

.ck .ck-balloon-rotator__content {

	/* Disable default annotation shadow inside rotator with fake panels. */
	& .ck.ck-annotation-wrapper {
		box-shadow: none;
	}
}
`],sourceRoot:""}]);const w=k},5380:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-fake-panel{position:absolute;z-index:calc(var(--ck-z-panel) - 1)}.ck .ck-fake-panel div{position:absolute}.ck .ck-fake-panel div:first-child{z-index:2}.ck .ck-fake-panel div:nth-child(2){z-index:1}:root{--ck-balloon-fake-panel-offset-horizontal:6px;--ck-balloon-fake-panel-offset-vertical:6px}.ck .ck-fake-panel div{background:var(--ck-color-panel-background);border:1px solid var(--ck-color-panel-border);border-radius:var(--ck-border-radius);box-shadow:var(--ck-drop-shadow),0 0;height:100%;min-height:15px;width:100%}.ck .ck-fake-panel div:first-child{margin-left:var(--ck-balloon-fake-panel-offset-horizontal);margin-top:var(--ck-balloon-fake-panel-offset-vertical)}.ck .ck-fake-panel div:nth-child(2){margin-left:calc(var(--ck-balloon-fake-panel-offset-horizontal)*2);margin-top:calc(var(--ck-balloon-fake-panel-offset-vertical)*2)}.ck .ck-fake-panel div:nth-child(3){margin-left:calc(var(--ck-balloon-fake-panel-offset-horizontal)*3);margin-top:calc(var(--ck-balloon-fake-panel-offset-vertical)*3)}.ck .ck-balloon-panel_arrow_s+.ck-fake-panel,.ck .ck-balloon-panel_arrow_se+.ck-fake-panel,.ck .ck-balloon-panel_arrow_sw+.ck-fake-panel{--ck-balloon-fake-panel-offset-vertical:-6px}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/panel/fakepanel.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/panel/fakepanel.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAKA,mBACC,iBAAkB,CAGlB,mCACD,CAEA,uBACC,iBACD,CAEA,mCACC,SACD,CAEA,oCACC,SACD,CCfA,MACC,6CAA8C,CAC9C,2CACD,CAGA,uBAKC,2CAA4C,CAC5C,6CAA8C,CAC9C,qCAAsC,CCXtC,oCAA8B,CDc9B,WAAY,CAPZ,eAAgB,CAMhB,UAED,CAEA,mCACC,0DAA2D,CAC3D,uDACD,CAEA,oCACC,kEAAqE,CACrE,+DACD,CACA,oCACC,kEAAqE,CACrE,+DACD,CAGA,yIAGC,4CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-fake-panel {
	position: absolute;

	/* Fake panels should be placed under main balloon content. */
	z-index: calc(var(--ck-z-panel) - 1);
}

.ck .ck-fake-panel div {
	position: absolute;
}

.ck .ck-fake-panel div:nth-child( 1 ) {
	z-index: 2;
}

.ck .ck-fake-panel div:nth-child( 2 ) {
	z-index: 1;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_shadow.css";

:root {
	--ck-balloon-fake-panel-offset-horizontal: 6px;
	--ck-balloon-fake-panel-offset-vertical: 6px;
}

/* Let's use \`.ck-balloon-panel\` appearance. See: balloonpanel.css. */
.ck .ck-fake-panel div {
	@mixin ck-drop-shadow;

	min-height: 15px;

	background: var(--ck-color-panel-background);
	border: 1px solid var(--ck-color-panel-border);
	border-radius: var(--ck-border-radius);

	width: 100%;
	height: 100%;
}

.ck .ck-fake-panel div:nth-child( 1 ) {
	margin-left: var(--ck-balloon-fake-panel-offset-horizontal);
	margin-top: var(--ck-balloon-fake-panel-offset-vertical);
}

.ck .ck-fake-panel div:nth-child( 2 ) {
	margin-left: calc(var(--ck-balloon-fake-panel-offset-horizontal) * 2);
	margin-top: calc(var(--ck-balloon-fake-panel-offset-vertical) * 2);
}
.ck .ck-fake-panel div:nth-child( 3 ) {
	margin-left: calc(var(--ck-balloon-fake-panel-offset-horizontal) * 3);
	margin-top: calc(var(--ck-balloon-fake-panel-offset-vertical) * 3);
}

/* If balloon is positioned above element, we need to move fake panel to the top. */
.ck .ck-balloon-panel_arrow_s + .ck-fake-panel,
.ck .ck-balloon-panel_arrow_se + .ck-fake-panel,
.ck .ck-balloon-panel_arrow_sw + .ck-fake-panel {
	--ck-balloon-fake-panel-offset-vertical: -6px;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},8298:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-sticky-panel .ck-sticky-panel__content_sticky{position:fixed;top:0;z-index:var(--ck-z-panel)}.ck.ck-sticky-panel .ck-sticky-panel__content_sticky_bottom-limit{position:absolute;top:auto}.ck.ck-sticky-panel .ck-sticky-panel__content_sticky{border-top-left-radius:0;border-top-right-radius:0;border-width:0 1px 1px;box-shadow:var(--ck-drop-shadow),0 0}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/panel/stickypanel.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/panel/stickypanel.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css"],names:[],mappings:"AAMC,qDAEC,cAAe,CACf,KAAM,CAFN,yBAGD,CAEA,kEAEC,iBAAkB,CADlB,QAED,CCPA,qDAIC,wBAAyB,CACzB,yBAA0B,CAF1B,sBAAuB,CCFxB,oCDKA",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-sticky-panel {
	& .ck-sticky-panel__content_sticky {
		z-index: var(--ck-z-panel); /* #315 */
		position: fixed;
		top: 0;
	}

	& .ck-sticky-panel__content_sticky_bottom-limit {
		top: auto;
		position: absolute;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_shadow.css";

.ck.ck-sticky-panel {
	& .ck-sticky-panel__content_sticky {
		@mixin ck-drop-shadow;

		border-width: 0 1px 1px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`],sourceRoot:""}]);const w=k},2722:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck-vertical-form .ck-button:after{bottom:-1px;content:"";position:absolute;right:-1px;top:-1px;width:0;z-index:1}.ck-vertical-form .ck-button:focus:after{display:none}@media screen and (max-width:600px){.ck.ck-responsive-form .ck-button:after{bottom:-1px;content:"";position:absolute;right:-1px;top:-1px;width:0;z-index:1}.ck.ck-responsive-form .ck-button:focus:after{display:none}}.ck-vertical-form>.ck-button:nth-last-child(2):after{border-right:1px solid var(--ck-color-base-border)}.ck.ck-responsive-form{padding:var(--ck-spacing-large)}.ck.ck-responsive-form:focus{outline:none}[dir=ltr] .ck.ck-responsive-form>:not(:first-child),[dir=rtl] .ck.ck-responsive-form>:not(:last-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-responsive-form{padding:0;width:calc(var(--ck-input-width)*.8)}.ck.ck-responsive-form .ck-labeled-field-view{margin:var(--ck-spacing-large) var(--ck-spacing-large) 0}.ck.ck-responsive-form .ck-labeled-field-view .ck-input-number,.ck.ck-responsive-form .ck-labeled-field-view .ck-input-text{min-width:0;width:100%}.ck.ck-responsive-form .ck-labeled-field-view .ck-labeled-field-view__error{white-space:normal}.ck.ck-responsive-form>.ck-button:nth-last-child(2):after{border-right:1px solid var(--ck-color-base-border)}.ck.ck-responsive-form>.ck-button:last-child,.ck.ck-responsive-form>.ck-button:nth-last-child(2){border-radius:0;margin-top:var(--ck-spacing-large);padding:var(--ck-spacing-standard)}.ck.ck-responsive-form>.ck-button:last-child:not(:focus),.ck.ck-responsive-form>.ck-button:nth-last-child(2):not(:focus){border-top:1px solid var(--ck-color-base-border)}[dir=ltr] .ck.ck-responsive-form>.ck-button:last-child,[dir=ltr] .ck.ck-responsive-form>.ck-button:nth-last-child(2),[dir=rtl] .ck.ck-responsive-form>.ck-button:last-child,[dir=rtl] .ck.ck-responsive-form>.ck-button:nth-last-child(2){margin-left:0}[dir=rtl] .ck.ck-responsive-form>.ck-button:last-child:last-of-type,[dir=rtl] .ck.ck-responsive-form>.ck-button:nth-last-child(2):last-of-type{border-right:1px solid var(--ck-color-base-border)}}',"",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/responsive-form/responsiveform.css","webpack://./../ckeditor5-ui/theme/mixins/_rwd.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/responsive-form/responsiveform.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css"],names:[],mappings:"AAQC,mCAMC,WAAY,CALZ,UAAW,CAEX,iBAAkB,CAClB,UAAW,CACX,QAAS,CAHT,OAAQ,CAKR,SACD,CAEA,yCACC,YACD,CCdA,oCDoBE,wCAMC,WAAY,CALZ,UAAW,CAEX,iBAAkB,CAClB,UAAW,CACX,QAAS,CAHT,OAAQ,CAKR,SACD,CAEA,8CACC,YACD,CC9BF,CCAD,qDACC,kDACD,CAEA,uBACC,+BAoED,CAlEC,6BAEC,YACD,CASC,uGACC,sCACD,CDvBD,oCCMD,uBAqBE,SAAU,CACV,oCA+CF,CA7CE,8CACC,wDAYD,CAVC,4HAEC,WAAY,CACZ,UACD,CAGA,4EACC,kBACD,CAKA,0DACC,kDACD,CAGD,iGAIC,eAAgB,CADhB,kCAAmC,CADnC,kCAmBD,CAfC,yHACC,gDACD,CC5DF,0ODmEG,aCjEH,CDmEG,+IACC,kDACD,CDrEH",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";

.ck-vertical-form .ck-button {
	&::after {
		content: "";
		width: 0;
		position: absolute;
		right: -1px;
		top: -1px;
		bottom: -1px;
		z-index: 1;
	}

	&:focus::after {
		display: none;
	}
}

.ck.ck-responsive-form {
	@mixin ck-media-phone {
		& .ck-button {
			&::after {
				content: "";
				width: 0;
				position: absolute;
				right: -1px;
				top: -1px;
				bottom: -1px;
				z-index: 1;
			}

			&:focus::after {
				display: none;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-phone {
	@media screen and (max-width: 600px) {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_rwd.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck-vertical-form > .ck-button:nth-last-child(2)::after {
	border-right: 1px solid var(--ck-color-base-border);
}

.ck.ck-responsive-form {
	padding: var(--ck-spacing-large);

	&:focus {
		/* See: https://github.com/ckeditor/ckeditor5/issues/4773 */
		outline: none;
	}

	@mixin ck-dir ltr {
		& > :not(:first-child) {
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-dir rtl {
		& > :not(:last-child) {
			margin-left: var(--ck-spacing-standard);
		}
	}

	@mixin ck-media-phone {
		padding: 0;
		width: calc(.8 * var(--ck-input-width));

		& .ck-labeled-field-view {
			margin: var(--ck-spacing-large) var(--ck-spacing-large) 0;

			& .ck-input-text,
			& .ck-input-number {
				min-width: 0;
				width: 100%;
			}

			/* Let the long error messages wrap in the narrow form. */
			& .ck-labeled-field-view__error {
				white-space: normal;
			}
		}

		/* Styles for two last buttons in the form (save&cancel, edit&unlink, etc.). */
		& > .ck-button:nth-last-child(2) {
			&::after {
				border-right: 1px solid var(--ck-color-base-border);
			}
		}

		& > .ck-button:nth-last-child(1),
		& > .ck-button:nth-last-child(2) {
			padding: var(--ck-spacing-standard);
			margin-top: var(--ck-spacing-large);
			border-radius: 0;

			&:not(:focus) {
				border-top: 1px solid var(--ck-color-base-border);
			}

			@mixin ck-dir ltr {
				margin-left: 0;
			}

			@mixin ck-dir rtl {
				margin-left: 0;

				&:last-of-type {
					border-right: 1px solid var(--ck-color-base-border);
				}
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},8107:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-search>.ck-labeled-field-view>.ck-labeled-field-view__input-wrapper>.ck-icon{position:absolute;top:50%;transform:translateY(-50%)}[dir=ltr] .ck.ck-search>.ck-labeled-field-view>.ck-labeled-field-view__input-wrapper>.ck-icon{left:var(--ck-spacing-medium)}[dir=rtl] .ck.ck-search>.ck-labeled-field-view>.ck-labeled-field-view__input-wrapper>.ck-icon{right:var(--ck-spacing-medium)}.ck.ck-search>.ck-labeled-field-view .ck-search__reset{position:absolute;top:50%;transform:translateY(-50%)}.ck.ck-search>.ck-search__results>.ck-search__info>span:first-child{display:block}.ck.ck-search>.ck-search__results>.ck-search__info:not(.ck-hidden)~*{display:none}:root{--ck-search-field-view-horizontal-spacing:calc(var(--ck-icon-size) + var(--ck-spacing-medium))}.ck.ck-search>.ck-labeled-field-view .ck-input{width:100%}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-icon{--ck-labeled-field-label-default-position-x:var(--ck-search-field-view-horizontal-spacing)}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-icon>.ck-labeled-field-view__input-wrapper>.ck-icon{opacity:.5;pointer-events:none}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-icon .ck-input{width:100%}[dir=ltr] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-icon .ck-input,[dir=rtl] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-icon .ck-input:not(.ck-input-text_empty){padding-left:var(--ck-search-field-view-horizontal-spacing)}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset{--ck-labeled-field-empty-unfocused-max-width:100% - 2 * var(--ck-search-field-view-horizontal-spacing)}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset.ck-labeled-field-view_empty{--ck-labeled-field-empty-unfocused-max-width:100% - var(--ck-search-field-view-horizontal-spacing) - var(--ck-spacing-medium)}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-search__reset{background:none;min-height:auto;min-width:auto;opacity:.5;padding:0}[dir=ltr] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-search__reset{right:var(--ck-spacing-medium)}[dir=rtl] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-search__reset{left:var(--ck-spacing-medium)}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-search__reset:hover{opacity:1}.ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-input{width:100%}[dir=ltr] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-input:not(.ck-input-text_empty),[dir=rtl] .ck.ck-search>.ck-labeled-field-view.ck-search__query_with-reset .ck-input{padding-right:var(--ck-search-field-view-horizontal-spacing)}.ck.ck-search>.ck-search__results{min-width:100%}.ck.ck-search>.ck-search__results>.ck-search__info{padding:var(--ck-spacing-medium) var(--ck-spacing-large);width:100%}.ck.ck-search>.ck-search__results>.ck-search__info *{white-space:normal}.ck.ck-search>.ck-search__results>.ck-search__info>span:first-child{font-weight:700}.ck.ck-search>.ck-search__results>.ck-search__info>span:last-child{margin-top:var(--ck-spacing-medium)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/search/search.css","webpack://./../ckeditor5-ui/theme/mixins/_dir.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/search/search.css"],names:[],mappings:"AASE,oFACC,iBAAkB,CAClB,OAAQ,CACR,0BASD,CCfD,8FDSG,6BCPH,CAFA,8FDaG,8BCXH,CDeC,uDACC,iBAAkB,CAClB,OAAQ,CACR,0BACD,CAKC,oEACC,aACD,CAGA,qEACC,YACD,CEhCH,MACC,8FACD,CAIE,+CACC,UACD,CAEA,gEACC,0FAoBD,CAlBC,+GACC,UAAW,CACX,mBACD,CAEA,0EACC,UAWD,CAJE,kMACC,2DACD,CAKH,iEACC,sGAwCD,CAtCC,6FACC,6HACD,CAEA,mFAIC,eAAgB,CAFhB,eAAgB,CADhB,cAAe,CAIf,UAAW,CACX,SAaD,CD5DF,6FCkDI,8BDhDJ,CAFA,6FCsDI,6BDpDJ,CCuDG,yFACC,SACD,CAGD,2EACC,UAWD,CD1EF,oMCwEI,4DDtEJ,CC4EA,kCACC,cAkBD,CAhBC,mDAEC,wDAAyD,CADzD,UAcD,CAXC,qDACC,kBACD,CAEA,oEACC,eACD,CAEA,mEACC,mCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-search {
	& > .ck-labeled-field-view {
		& > .ck-labeled-field-view__input-wrapper > .ck-icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);

			@mixin ck-dir ltr {
				left: var(--ck-spacing-medium);
			}

			@mixin ck-dir rtl {
				right: var(--ck-spacing-medium);
			}
		}

		& .ck-search__reset {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	& > .ck-search__results {
		& > .ck-search__info {
			& > span:first-child {
				display: block;
			}

			/* Hide the filtered view when nothing was found */
			&:not(.ck-hidden) ~ * {
				display: none;
			}
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-dir $direction {
	[dir="$(direction)"] & {
		@mixin-content;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

:root {
	--ck-search-field-view-horizontal-spacing: calc(var(--ck-icon-size) + var(--ck-spacing-medium));
}

.ck.ck-search {
	& > .ck-labeled-field-view {
		& .ck-input {
			width: 100%;
		}

		&.ck-search__query_with-icon {
			--ck-labeled-field-label-default-position-x: var(--ck-search-field-view-horizontal-spacing);

			& > .ck-labeled-field-view__input-wrapper > .ck-icon {
				opacity: .5;
				pointer-events: none;
			}

			& .ck-input {
				width: 100%;

				@mixin ck-dir ltr {
					padding-left: var(--ck-search-field-view-horizontal-spacing);
				}

				@mixin ck-dir rtl {
					&:not(.ck-input-text_empty) {
						padding-left: var(--ck-search-field-view-horizontal-spacing);
					}
				}
			}
		}

		&.ck-search__query_with-reset {
			--ck-labeled-field-empty-unfocused-max-width: 100% - 2 * var(--ck-search-field-view-horizontal-spacing);

			&.ck-labeled-field-view_empty {
				--ck-labeled-field-empty-unfocused-max-width: 100% - var(--ck-search-field-view-horizontal-spacing) - var(--ck-spacing-medium);
			}

			& .ck-search__reset {
				min-width: auto;
				min-height: auto;

				background: none;
				opacity: .5;
				padding: 0;

				@mixin ck-dir ltr {
					right: var(--ck-spacing-medium);
				}

				@mixin ck-dir rtl {
					left: var(--ck-spacing-medium);
				}

				&:hover {
					opacity: 1;
				}
			}

			& .ck-input {
				width: 100%;

				@mixin ck-dir ltr {
					&:not(.ck-input-text_empty) {
						padding-right: var(--ck-search-field-view-horizontal-spacing);
					}
				}

				@mixin ck-dir rtl {
					padding-right: var(--ck-search-field-view-horizontal-spacing);
				}
			}
		}
	}

	& > .ck-search__results {
		min-width: 100%;

		& > .ck-search__info {
			width: 100%;
			padding: var(--ck-spacing-medium) var(--ck-spacing-large);

			& * {
				white-space: normal;
			}

			& > span:first-child {
				font-weight: bold;
			}

			& > span:last-child {
				margin-top: var(--ck-spacing-medium);
			}
		}
	}
}

`],sourceRoot:""}]);const w=k},109:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-spinner-container{display:block;position:relative}.ck.ck-spinner{left:0;margin:0 auto;position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:1}:root{--ck-toolbar-spinner-size:18px}.ck.ck-spinner-container{animation:ck-spinner-rotate 1.5s linear infinite;height:var(--ck-toolbar-spinner-size);width:var(--ck-toolbar-spinner-size)}@media (prefers-reduced-motion:reduce){.ck.ck-spinner-container{animation-duration:3s}}.ck.ck-spinner{border:2px solid var(--ck-color-text);border-radius:50%;border-top:2px solid transparent;height:var(--ck-toolbar-spinner-size);width:var(--ck-toolbar-spinner-size)}@keyframes ck-spinner-rotate{to{transform:rotate(1turn)}}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/spinner/spinner.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/spinner/spinner.css"],names:[],mappings:"AASA,yBACC,aAAc,CACd,iBACD,CAEA,eAGC,MAAO,CAEP,aAAc,CAJd,iBAAkB,CAGlB,OAAQ,CAFR,OAAQ,CAIR,0BAA2B,CAC3B,SACD,CCjBA,MACC,8BACD,CAEA,yBAGC,gDAAiD,CADjD,qCAAsC,CADtC,oCAOD,CAHC,uCALD,yBAME,qBAEF,CADC,CAGD,eAKC,qCAA6B,CAF7B,iBAAkB,CAElB,gCAA6B,CAH7B,qCAAsC,CADtC,oCAKD,CAEA,6BACC,GACC,uBACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-toolbar-spinner-size: 18px;
}

.ck.ck-spinner-container {
	display: block;
	position: relative;
}

.ck.ck-spinner {
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	margin: 0 auto;
	transform: translateY(-50%);
	z-index: 1;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-toolbar-spinner-size: 18px;
}

.ck.ck-spinner-container {
	width: var(--ck-toolbar-spinner-size);
	height: var(--ck-toolbar-spinner-size);
	animation: 1.5s infinite ck-spinner-rotate linear;

	@media (prefers-reduced-motion: reduce) {
		animation-duration: 3s;
	}
}

.ck.ck-spinner {
	width: var(--ck-toolbar-spinner-size);
	height: var(--ck-toolbar-spinner-size);
	border-radius: 50%;
	border: 2px solid var(--ck-color-text);
	border-top-color: transparent;
}

@keyframes ck-spinner-rotate {
	to {
		transform: rotate(360deg)
	}
}
`],sourceRoot:""}]);const w=k},1671:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-textarea{overflow-x:hidden}","",{version:3,sources:["webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/textarea/textarea.css"],names:[],mappings:"AASA,aACC,iBACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/*
 * This fixes a problem in Firefox when the initial height of the complement does not match the number of rows.
 * This bug is especially visible when rows=1.
 */
.ck-textarea {
	overflow-x: hidden
}
`],sourceRoot:""}]);const w=k},2710:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-block-toolbar-button{position:absolute;z-index:var(--ck-z-default)}:root{--ck-color-block-toolbar-button:var(--ck-color-text);--ck-block-toolbar-button-size:var(--ck-font-size-normal)}.ck.ck-block-toolbar-button{color:var(--ck-color-block-toolbar-button);font-size:var(--ck-block-toolbar-size)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/toolbar/blocktoolbar.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/toolbar/blocktoolbar.css"],names:[],mappings:"AAKA,4BACC,iBAAkB,CAClB,2BACD,CCHA,MACC,oDAAqD,CACrD,yDACD,CAEA,4BACC,0CAA2C,CAC3C,sCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck.ck-block-toolbar-button {
	position: absolute;
	z-index: var(--ck-z-default);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-block-toolbar-button: var(--ck-color-text);
	--ck-block-toolbar-button-size: var(--ck-font-size-normal);
}

.ck.ck-block-toolbar-button {
	color: var(--ck-color-block-toolbar-button);
	font-size: var(--ck-block-toolbar-size);
}
`],sourceRoot:""}]);const w=k},9677:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-toolbar{align-items:center;display:flex;flex-flow:row nowrap;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ck.ck-toolbar>.ck-toolbar__items{align-items:center;display:flex;flex-flow:row wrap;flex-grow:1}.ck.ck-toolbar .ck.ck-toolbar__separator{display:inline-block}.ck.ck-toolbar .ck.ck-toolbar__separator:first-child,.ck.ck-toolbar .ck.ck-toolbar__separator:last-child{display:none}.ck.ck-toolbar .ck-toolbar__line-break{flex-basis:100%}.ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items{flex-wrap:nowrap}.ck.ck-toolbar.ck-toolbar_vertical>.ck-toolbar__items{flex-direction:column}.ck.ck-toolbar.ck-toolbar_floating>.ck-toolbar__items{flex-wrap:nowrap}.ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown>.ck-dropdown__button .ck-dropdown__arrow{display:none}.ck.ck-toolbar{background:var(--ck-color-toolbar-background);border:1px solid var(--ck-color-toolbar-border);border-radius:0;padding:0 var(--ck-spacing-small)}.ck-rounded-corners .ck.ck-toolbar,.ck.ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius)}.ck.ck-toolbar .ck.ck-toolbar__separator{background:var(--ck-color-toolbar-border);height:var(--ck-icon-size);margin-bottom:var(--ck-spacing-small);margin-top:var(--ck-spacing-small);min-width:1px;width:1px}.ck.ck-toolbar .ck-toolbar__line-break{height:0}.ck.ck-toolbar>.ck-toolbar__items>:not(.ck-toolbar__line-break){margin-right:var(--ck-spacing-small)}.ck.ck-toolbar>.ck-toolbar__items:empty+.ck.ck-toolbar__separator{display:none}.ck.ck-toolbar>.ck-toolbar__items>:not(.ck-toolbar__line-break),.ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown{margin-bottom:var(--ck-spacing-small);margin-top:var(--ck-spacing-small)}.ck.ck-toolbar.ck-toolbar_vertical{padding:0}.ck.ck-toolbar.ck-toolbar_vertical>.ck-toolbar__items>.ck{border-radius:0;margin:0;width:100%}.ck.ck-toolbar.ck-toolbar_compact{padding:0}.ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>*{margin:0}.ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>:not(:first-child):not(:last-child){border-radius:0}.ck.ck-toolbar>.ck.ck-toolbar__grouped-dropdown>.ck.ck-button.ck-dropdown__button{padding-left:var(--ck-spacing-tiny)}.ck.ck-toolbar .ck-toolbar__nested-toolbar-dropdown>.ck-dropdown__panel{min-width:auto}.ck.ck-toolbar .ck-toolbar__nested-toolbar-dropdown>.ck-button>.ck-button__label{max-width:7em;width:auto}.ck.ck-toolbar:focus{outline:none}.ck-toolbar-container .ck.ck-toolbar{border:0}.ck.ck-toolbar[dir=rtl]>.ck-toolbar__items>.ck,[dir=rtl] .ck.ck-toolbar>.ck-toolbar__items>.ck{margin-right:0}.ck.ck-toolbar[dir=rtl]:not(.ck-toolbar_compact)>.ck-toolbar__items>.ck,[dir=rtl] .ck.ck-toolbar:not(.ck-toolbar_compact)>.ck-toolbar__items>.ck{margin-left:var(--ck-spacing-small)}.ck.ck-toolbar[dir=rtl]>.ck-toolbar__items>.ck:last-child,[dir=rtl] .ck.ck-toolbar>.ck-toolbar__items>.ck:last-child{margin-left:0}.ck.ck-toolbar.ck-toolbar_compact[dir=rtl]>.ck-toolbar__items>.ck:first-child,[dir=rtl] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.ck.ck-toolbar.ck-toolbar_compact[dir=rtl]>.ck-toolbar__items>.ck:last-child,[dir=rtl] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:last-child{border-bottom-right-radius:0;border-top-right-radius:0}.ck.ck-toolbar.ck-toolbar_grouping[dir=rtl]>.ck-toolbar__items:not(:empty):not(:only-child),.ck.ck-toolbar[dir=rtl]>.ck.ck-toolbar__separator,[dir=rtl] .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child),[dir=rtl] .ck.ck-toolbar>.ck.ck-toolbar__separator{margin-left:var(--ck-spacing-small)}.ck.ck-toolbar[dir=ltr]>.ck-toolbar__items>.ck:last-child,[dir=ltr] .ck.ck-toolbar>.ck-toolbar__items>.ck:last-child{margin-right:0}.ck.ck-toolbar.ck-toolbar_compact[dir=ltr]>.ck-toolbar__items>.ck:first-child,[dir=ltr] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:first-child{border-bottom-right-radius:0;border-top-right-radius:0}.ck.ck-toolbar.ck-toolbar_compact[dir=ltr]>.ck-toolbar__items>.ck:last-child,[dir=ltr] .ck.ck-toolbar.ck-toolbar_compact>.ck-toolbar__items>.ck:last-child{border-bottom-left-radius:0;border-top-left-radius:0}.ck.ck-toolbar.ck-toolbar_grouping[dir=ltr]>.ck-toolbar__items:not(:empty):not(:only-child),.ck.ck-toolbar[dir=ltr]>.ck.ck-toolbar__separator,[dir=ltr] .ck.ck-toolbar.ck-toolbar_grouping>.ck-toolbar__items:not(:empty):not(:only-child),[dir=ltr] .ck.ck-toolbar>.ck.ck-toolbar__separator{margin-right:var(--ck-spacing-small)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/toolbar/toolbar.css","webpack://./../ckeditor5-ui/theme/mixins/_unselectable.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/toolbar/toolbar.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_rounded.css"],names:[],mappings:"AAOA,eAKC,kBAAmB,CAFnB,YAAa,CACb,oBAAqB,CCFrB,qBAAsB,CACtB,wBAAyB,CACzB,oBAAqB,CACrB,gBD6CD,CA3CC,kCAGC,kBAAmB,CAFnB,YAAa,CACb,kBAAmB,CAEnB,WAED,CAEA,yCACC,oBAWD,CAJC,yGAEC,YACD,CAGD,uCACC,eACD,CAEA,sDACC,gBACD,CAEA,sDACC,qBACD,CAEA,sDACC,gBACD,CAGC,yFACC,YACD,CE/CF,eAGC,6CAA8C,CAE9C,+CAAgD,CCFhD,eAAgB,CDChB,iCAuGD,CCtGC,qEAEC,qCAED,CDFA,yCAIC,yCAA0C,CAH1C,0BAA2B,CAU3B,qCAAsC,CADtC,kCAAmC,CAPnC,aAAc,CADd,SAUD,CAEA,uCACC,QACD,CAGC,gEAEC,oCACD,CAIA,kEACC,YACD,CAGD,gHAIC,qCAAsC,CADtC,kCAED,CAEA,mCAEC,SAaD,CAVC,0DAQC,eAAgB,CAHhB,QAAS,CAHT,UAOD,CAGD,kCAEC,SAWD,CATC,uDAEC,QAMD,CAHC,yFACC,eACD,CASD,kFACC,mCACD,CAMA,wEACC,cACD,CAEA,iFACC,aAAc,CACd,UACD,CAGD,qBACC,YACD,CAEA,qCACC,QACD,CAaA,+FACC,cACD,CAEA,iJAEC,mCACD,CAEA,qHACC,aACD,CAIC,6JAEC,2BAA4B,CAD5B,wBAED,CAGA,2JAEC,4BAA6B,CAD7B,yBAED,CASD,8RACC,mCACD,CAWA,qHACC,cACD,CAIC,6JAEC,4BAA6B,CAD7B,yBAED,CAGA,2JAEC,2BAA4B,CAD5B,wBAED,CASD,8RACC,oCACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../mixins/_unselectable.css";

.ck.ck-toolbar {
	@mixin ck-unselectable;

	display: flex;
	flex-flow: row nowrap;
	align-items: center;

	& > .ck-toolbar__items {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		flex-grow: 1;

	}

	& .ck.ck-toolbar__separator {
		display: inline-block;

		/*
		 * A leading or trailing separator makes no sense (separates from nothing on one side).
		 * For instance, it can happen when toolbar items (also separators) are getting grouped one by one and
		 * moved to another toolbar in the dropdown.
		 */
		&:first-child,
		&:last-child {
			display: none;
		}
	}

	& .ck-toolbar__line-break {
		flex-basis: 100%;
	}

	&.ck-toolbar_grouping > .ck-toolbar__items {
		flex-wrap: nowrap;
	}

	&.ck-toolbar_vertical > .ck-toolbar__items {
		flex-direction: column;
	}

	&.ck-toolbar_floating > .ck-toolbar__items {
		flex-wrap: nowrap;
	}

	& > .ck.ck-toolbar__grouped-dropdown {
		& > .ck-dropdown__button .ck-dropdown__arrow {
			display: none;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Makes element unselectable.
 */
@define-mixin ck-unselectable {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_dir.css";

.ck.ck-toolbar {
	@mixin ck-rounded-corners;

	background: var(--ck-color-toolbar-background);
	padding: 0 var(--ck-spacing-small);
	border: 1px solid var(--ck-color-toolbar-border);

	& .ck.ck-toolbar__separator {
		height: var(--ck-icon-size);
		width: 1px;
		min-width: 1px;
		background: var(--ck-color-toolbar-border);

		/*
		 * These margins make the separators look better in balloon toolbars (when aligned with the "tip").
		 * See https://github.com/ckeditor/ckeditor5/issues/7493.
		 */
		margin-top: var(--ck-spacing-small);
		margin-bottom: var(--ck-spacing-small);
	}

	& .ck-toolbar__line-break {
		height: 0;
	}

	& > .ck-toolbar__items {
		& > *:not(.ck-toolbar__line-break) {
			/* (#11) Separate toolbar items. */
			margin-right: var(--ck-spacing-small);
		}

		/* Don't display a separator after an empty items container, for instance,
		when all items were grouped */
		&:empty + .ck.ck-toolbar__separator {
			display: none;
		}
	}

	& > .ck-toolbar__items > *:not(.ck-toolbar__line-break),
	& > .ck.ck-toolbar__grouped-dropdown {
		/* Make sure items wrapped to the next line have v-spacing */
		margin-top: var(--ck-spacing-small);
		margin-bottom: var(--ck-spacing-small);
	}

	&.ck-toolbar_vertical {
		/* Items in a vertical toolbar span the entire width. */
		padding: 0;

		/* Specificity matters here. See https://github.com/ckeditor/ckeditor5-theme-lark/issues/168. */
		& > .ck-toolbar__items > .ck {
			/* Items in a vertical toolbar should span the horizontal space. */
			width: 100%;

			/* Items in a vertical toolbar should have no margin. */
			margin: 0;

			/* Items in a vertical toolbar span the entire width so rounded corners are pointless. */
			border-radius: 0;
		}
	}

	&.ck-toolbar_compact {
		/* No spacing around items. */
		padding: 0;

		& > .ck-toolbar__items > * {
			/* Compact toolbar items have no spacing between them. */
			margin: 0;

			/* "Middle" children should have no rounded corners. */
			&:not(:first-child):not(:last-child) {
				border-radius: 0;
			}
		}
	}

	& > .ck.ck-toolbar__grouped-dropdown {
		/*
		 * Dropdown button has asymmetric padding to fit the arrow.
		 * This button has no arrow so let's revert that padding back to normal.
		 */
		& > .ck.ck-button.ck-dropdown__button {
			padding-left: var(--ck-spacing-tiny);
		}
	}

	/* A drop-down containing the nested toolbar with configured items. */
	& .ck-toolbar__nested-toolbar-dropdown {
		/* Prevent empty space in the panel when the dropdown label is visible and long but the toolbar has few items. */
		& > .ck-dropdown__panel {
			min-width: auto;
		}

		& > .ck-button > .ck-button__label {
			max-width: 7em;
			width: auto;
		}
	}

	&:focus {
		outline: none;
	}

	.ck-toolbar-container & {
		border: 0;
	}
}

/* stylelint-disable */

/*
 * Styles for RTL toolbars.
 *
 * Note: In some cases (e.g. a decoupled editor), the toolbar has its own "dir"
 * because its parent is not controlled by the editor framework.
 */
[dir="rtl"] .ck.ck-toolbar,
.ck.ck-toolbar[dir="rtl"] {
	& > .ck-toolbar__items > .ck {
		margin-right: 0;
	}

	&:not(.ck-toolbar_compact) > .ck-toolbar__items > .ck {
		/* (#11) Separate toolbar items. */
		margin-left: var(--ck-spacing-small);
	}

	& > .ck-toolbar__items > .ck:last-child {
		margin-left: 0;
	}

	&.ck-toolbar_compact > .ck-toolbar__items > .ck {
		/* No rounded corners on the right side of the first child. */
		&:first-child {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		/* No rounded corners on the left side of the last child. */
		&:last-child {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	/* Separate the the separator form the grouping dropdown when some items are grouped. */
	& > .ck.ck-toolbar__separator {
		margin-left: var(--ck-spacing-small);
	}

	/* Some spacing between the items and the separator before the grouped items dropdown. */
	&.ck-toolbar_grouping > .ck-toolbar__items:not(:empty):not(:only-child) {
		margin-left: var(--ck-spacing-small);
	}
}

/*
 * Styles for LTR toolbars.
 *
 * Note: In some cases (e.g. a decoupled editor), the toolbar has its own "dir"
 * because its parent is not controlled by the editor framework.
 */
[dir="ltr"] .ck.ck-toolbar,
.ck.ck-toolbar[dir="ltr"] {
	& > .ck-toolbar__items > .ck:last-child {
		margin-right: 0;
	}

	&.ck-toolbar_compact > .ck-toolbar__items > .ck {
		/* No rounded corners on the right side of the first child. */
		&:first-child {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		/* No rounded corners on the left side of the last child. */
		&:last-child {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}

	/* Separate the the separator form the grouping dropdown when some items are grouped. */
	& > .ck.ck-toolbar__separator {
		margin-right: var(--ck-spacing-small);
	}

	/* Some spacing between the items and the separator before the grouped items dropdown. */
	&.ck-toolbar_grouping > .ck-toolbar__items:not(:empty):not(:only-child) {
		margin-right: var(--ck-spacing-small);
	}
}

/* stylelint-enable */
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Implements rounded corner interface for .ck-rounded-corners class.
 *
 * @see $ck-border-radius
 */
@define-mixin ck-rounded-corners {
	border-radius: 0;

	.ck-rounded-corners &,
	&.ck-rounded-corners {
		border-radius: var(--ck-border-radius);
		@mixin-content;
	}
}
`],sourceRoot:""}]);const w=k},9205:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck.ck-balloon-panel.ck-tooltip{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;z-index:calc(var(--ck-z-dialog) + 100);--ck-balloon-border-width:0px;--ck-balloon-arrow-offset:0px;--ck-balloon-arrow-half-width:4px;--ck-balloon-arrow-height:4px;--ck-tooltip-text-padding:4px;--ck-color-panel-background:var(--ck-color-tooltip-background);box-shadow:none;padding:0 var(--ck-spacing-medium)}.ck.ck-balloon-panel.ck-tooltip .ck-tooltip__text{color:var(--ck-color-tooltip-text);font-size:.9em;line-height:1.5}.ck.ck-balloon-panel.ck-tooltip.ck-tooltip_multi-line .ck-tooltip__text{display:inline-block;max-width:200px;padding:var(--ck-tooltip-text-padding) 0;white-space:break-spaces}.ck.ck-balloon-panel.ck-tooltip:before{display:none}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/components/tooltip/tooltip.css","webpack://./../ckeditor5-ui/theme/mixins/_unselectable.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/components/tooltip/tooltip.css"],names:[],mappings:"AAOA,gCCEC,qBAAsB,CACtB,wBAAyB,CACzB,oBAAqB,CACrB,gBAAgB,CDFhB,sCAAyC,CEFzC,6BAA8B,CAC9B,6BAA8B,CAC9B,iCAAkC,CAClC,6BAA8B,CAC9B,6BAA8B,CAC9B,8DAA+D,CAkB/D,eAAgB,CAhBhB,kCFJD,CEMC,kDAGC,kCAAmC,CAFnC,cAAe,CACf,eAED,CAEA,wEAEC,oBAAqB,CAErB,eAAgB,CADhB,wCAAyC,CAFzC,wBAID,CAMA,uCACC,YACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../mixins/_unselectable.css";

.ck.ck-balloon-panel.ck-tooltip {
	@mixin ck-unselectable;

	z-index: calc( var(--ck-z-dialog) + 100 );
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Makes element unselectable.
 */
@define-mixin ck-unselectable {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../../../mixins/_rounded.css";

.ck.ck-balloon-panel.ck-tooltip {
	--ck-balloon-border-width: 0px;
	--ck-balloon-arrow-offset: 0px;
	--ck-balloon-arrow-half-width: 4px;
	--ck-balloon-arrow-height: 4px;
	--ck-tooltip-text-padding: 4px;
	--ck-color-panel-background: var(--ck-color-tooltip-background);

	padding: 0 var(--ck-spacing-medium);

	& .ck-tooltip__text {
		font-size: .9em;
		line-height: 1.5;
		color: var(--ck-color-tooltip-text);
	}

	&.ck-tooltip_multi-line .ck-tooltip__text {
		white-space: break-spaces;
		display: inline-block;
		padding: var(--ck-tooltip-text-padding) 0;
		max-width: 200px;
	}

	/* Reset balloon panel styles */
	box-shadow: none;

	/* Hide the default shadow of the .ck-balloon-panel tip */
	&::before {
		display: none;
	}
}
`],sourceRoot:""}]);const w=k},7676:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck-hidden{display:none!important}:root{--ck-z-default:1;--ck-z-panel:calc(var(--ck-z-default) + 999);--ck-z-dialog:9999}.ck-transitions-disabled,.ck-transitions-disabled *{transition:none!important}:root{--ck-powered-by-line-height:10px;--ck-powered-by-padding-vertical:2px;--ck-powered-by-padding-horizontal:4px;--ck-powered-by-text-color:#4f4f4f;--ck-powered-by-border-radius:var(--ck-border-radius);--ck-powered-by-background:#fff;--ck-powered-by-border-color:var(--ck-color-focus-border)}.ck.ck-balloon-panel.ck-powered-by-balloon{--ck-border-radius:var(--ck-powered-by-border-radius);background:var(--ck-powered-by-background);box-shadow:none;min-height:unset;z-index:calc(var(--ck-z-panel) - 1)}.ck.ck-balloon-panel.ck-powered-by-balloon .ck.ck-powered-by{line-height:var(--ck-powered-by-line-height)}.ck.ck-balloon-panel.ck-powered-by-balloon .ck.ck-powered-by a{align-items:center;cursor:pointer;display:flex;filter:grayscale(80%);line-height:var(--ck-powered-by-line-height);opacity:.66;padding:var(--ck-powered-by-padding-vertical) var(--ck-powered-by-padding-horizontal)}.ck.ck-balloon-panel.ck-powered-by-balloon .ck.ck-powered-by .ck-powered-by__label{color:var(--ck-powered-by-text-color);cursor:pointer;font-size:7.5px;font-weight:700;letter-spacing:-.2px;line-height:normal;margin-right:4px;padding-left:2px;text-transform:uppercase}.ck.ck-balloon-panel.ck-powered-by-balloon .ck.ck-powered-by .ck-icon{cursor:pointer;display:block}.ck.ck-balloon-panel.ck-powered-by-balloon .ck.ck-powered-by:hover a{filter:grayscale(0);opacity:1}.ck.ck-balloon-panel.ck-powered-by-balloon[class*=position_inside]{border-color:transparent}.ck.ck-balloon-panel.ck-powered-by-balloon[class*=position_border]{border:var(--ck-focus-ring);border-color:var(--ck-powered-by-border-color)}:root{--ck-color-base-foreground:#fafafa;--ck-color-base-background:#fff;--ck-color-base-border:#ccced1;--ck-color-base-action:#53a336;--ck-color-base-focus:#6cb5f9;--ck-color-base-text:#333;--ck-color-base-active:#2977ff;--ck-color-base-active-focus:#0d65ff;--ck-color-base-error:#db3700;--ck-color-focus-border-coordinates:218,81.8%,56.9%;--ck-color-focus-border:hsl(var(--ck-color-focus-border-coordinates));--ck-color-focus-outer-shadow:#cae1fc;--ck-color-focus-disabled-shadow:rgba(119,186,248,.3);--ck-color-focus-error-shadow:rgba(255,64,31,.3);--ck-color-text:var(--ck-color-base-text);--ck-color-shadow-drop:rgba(0,0,0,.15);--ck-color-shadow-drop-active:rgba(0,0,0,.2);--ck-color-shadow-inner:rgba(0,0,0,.1);--ck-color-button-default-background:transparent;--ck-color-button-default-hover-background:#f0f0f0;--ck-color-button-default-active-background:#f0f0f0;--ck-color-button-default-disabled-background:transparent;--ck-color-button-on-background:#f0f7ff;--ck-color-button-on-hover-background:#dbecff;--ck-color-button-on-active-background:#dbecff;--ck-color-button-on-disabled-background:#f0f2f4;--ck-color-button-on-color:#2977ff;--ck-color-button-action-background:var(--ck-color-base-action);--ck-color-button-action-hover-background:#4d9d30;--ck-color-button-action-active-background:#4d9d30;--ck-color-button-action-disabled-background:#7ec365;--ck-color-button-action-text:var(--ck-color-base-background);--ck-color-button-save:#008a00;--ck-color-button-cancel:#db3700;--ck-color-switch-button-off-background:#939393;--ck-color-switch-button-off-hover-background:#7d7d7d;--ck-color-switch-button-on-background:var(--ck-color-button-action-background);--ck-color-switch-button-on-hover-background:#4d9d30;--ck-color-switch-button-inner-background:var(--ck-color-base-background);--ck-color-switch-button-inner-shadow:rgba(0,0,0,.1);--ck-color-dropdown-panel-background:var(--ck-color-base-background);--ck-color-dropdown-panel-border:var(--ck-color-base-border);--ck-color-dialog-background:var(--ck-custom-background);--ck-color-dialog-form-header-border:var(--ck-custom-border);--ck-color-input-background:var(--ck-color-base-background);--ck-color-input-border:var(--ck-color-base-border);--ck-color-input-error-border:var(--ck-color-base-error);--ck-color-input-text:var(--ck-color-base-text);--ck-color-input-disabled-background:#f2f2f2;--ck-color-input-disabled-border:var(--ck-color-base-border);--ck-color-input-disabled-text:#757575;--ck-color-list-background:var(--ck-color-base-background);--ck-color-list-button-hover-background:var(--ck-color-button-default-hover-background);--ck-color-list-button-on-background:var(--ck-color-button-on-color);--ck-color-list-button-on-background-focus:var(--ck-color-button-on-color);--ck-color-list-button-on-text:var(--ck-color-base-background);--ck-color-panel-background:var(--ck-color-base-background);--ck-color-panel-border:var(--ck-color-base-border);--ck-color-toolbar-background:var(--ck-color-base-background);--ck-color-toolbar-border:var(--ck-color-base-border);--ck-color-tooltip-background:var(--ck-color-base-text);--ck-color-tooltip-text:var(--ck-color-base-background);--ck-color-engine-placeholder-text:#707070;--ck-color-upload-bar-background:#6cb5f9;--ck-color-link-default:#0000f0;--ck-color-link-selected-background:rgba(31,176,255,.1);--ck-color-link-fake-selection:rgba(31,176,255,.3);--ck-color-highlight-background:#ff0;--ck-color-light-red:#fcc;--ck-disabled-opacity:.5;--ck-focus-outer-shadow-geometry:0 0 0 3px;--ck-focus-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-outer-shadow);--ck-focus-disabled-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-disabled-shadow);--ck-focus-error-outer-shadow:var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-error-shadow);--ck-focus-ring:1px solid var(--ck-color-focus-border);--ck-font-size-base:13px;--ck-line-height-base:1.84615;--ck-font-face:Helvetica,Arial,Tahoma,Verdana,Sans-Serif;--ck-font-size-tiny:0.7em;--ck-font-size-small:0.75em;--ck-font-size-normal:1em;--ck-font-size-big:1.4em;--ck-font-size-large:1.8em;--ck-ui-component-min-height:2.3em}.ck-reset_all :not(.ck-reset_all-excluded *),.ck.ck-reset,.ck.ck-reset_all{background:transparent;border:0;box-sizing:border-box;height:auto;margin:0;padding:0;position:static;text-decoration:none;transition:none;vertical-align:middle;width:auto;word-wrap:break-word}.ck-reset_all :not(.ck-reset_all-excluded *),.ck.ck-reset_all{border-collapse:collapse;color:var(--ck-color-text);cursor:auto;float:none;font:normal normal normal var(--ck-font-size-base)/var(--ck-line-height-base) var(--ck-font-face);text-align:left;white-space:nowrap}.ck-reset_all .ck-rtl :not(.ck-reset_all-excluded *){text-align:right}.ck-reset_all iframe:not(.ck-reset_all-excluded *){vertical-align:inherit}.ck-reset_all textarea:not(.ck-reset_all-excluded *){white-space:pre-wrap}.ck-reset_all input[type=password]:not(.ck-reset_all-excluded *),.ck-reset_all input[type=text]:not(.ck-reset_all-excluded *),.ck-reset_all textarea:not(.ck-reset_all-excluded *){cursor:text}.ck-reset_all input[type=password][disabled]:not(.ck-reset_all-excluded *),.ck-reset_all input[type=text][disabled]:not(.ck-reset_all-excluded *),.ck-reset_all textarea[disabled]:not(.ck-reset_all-excluded *){cursor:default}.ck-reset_all fieldset:not(.ck-reset_all-excluded *){border:2px groove #dfdee3;padding:10px}.ck-reset_all button:not(.ck-reset_all-excluded *)::-moz-focus-inner{border:0;padding:0}.ck[dir=rtl],.ck[dir=rtl] .ck{text-align:right}:root{--ck-border-radius:2px;--ck-inner-shadow:2px 2px 3px var(--ck-color-shadow-inner) inset;--ck-drop-shadow:0 1px 2px 1px var(--ck-color-shadow-drop);--ck-drop-shadow-active:0 3px 6px 1px var(--ck-color-shadow-drop-active);--ck-spacing-unit:0.6em;--ck-spacing-large:calc(var(--ck-spacing-unit)*1.5);--ck-spacing-standard:var(--ck-spacing-unit);--ck-spacing-medium:calc(var(--ck-spacing-unit)*0.8);--ck-spacing-small:calc(var(--ck-spacing-unit)*0.5);--ck-spacing-tiny:calc(var(--ck-spacing-unit)*0.3);--ck-spacing-extra-tiny:calc(var(--ck-spacing-unit)*0.16)}","",{version:3,sources:["webpack://./../ckeditor5-ui/theme/globals/_hidden.css","webpack://./../ckeditor5-ui/theme/globals/_zindex.css","webpack://./../ckeditor5-ui/theme/globals/_transition.css","webpack://./../ckeditor5-ui/theme/globals/_poweredby.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_colors.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_disabled.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_focus.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_fonts.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_reset.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_rounded.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_shadow.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-ui/globals/_spacing.css"],names:[],mappings:"AAQA,WAGC,sBACD,CCPA,MACC,gBAAiB,CACjB,4CAA+C,CAC/C,kBACD,CCDA,oDAEC,yBACD,CCNA,MACC,gCAAiC,CACjC,oCAAqC,CACrC,sCAAuC,CACvC,kCAA2C,CAC3C,qDAAsD,CACtD,+BAA4C,CAC5C,yDACD,CAEA,2CACC,qDAAsD,CAGtD,0CAA2C,CAD3C,eAAgB,CAEhB,gBAAiB,CACjB,mCAiDD,CA/CC,6DACC,4CAoCD,CAlCC,+DAGC,kBAAmB,CAFnB,cAAe,CACf,YAAa,CAGb,qBAAsB,CACtB,4CAA6C,CAF7C,WAAY,CAGZ,qFACD,CAEA,mFASC,qCAAsC,CAFtC,cAAe,CANf,eAAgB,CAIhB,eAAiB,CAHjB,oBAAqB,CAMrB,kBAAmB,CAFnB,gBAAiB,CAHjB,gBAAiB,CACjB,wBAOD,CAEA,sEAEC,cAAe,CADf,aAED,CAGC,qEACC,mBAAqB,CACrB,SACD,CAIF,mEACC,wBACD,CAEA,mEACC,2BAA4B,CAC5B,8CACD,CChED,MACC,kCAAmD,CACnD,+BAAoD,CACpD,8BAAkD,CAClD,8BAAuD,CACvD,6BAAmD,CACnD,yBAA+C,CAC/C,8BAAsD,CACtD,oCAA4D,CAC5D,6BAAkD,CAIlD,mDAA4D,CAC5D,qEAA+E,CAC/E,qCAA4D,CAC5D,qDAA8D,CAC9D,gDAAyD,CACzD,yCAAqD,CACrD,sCAAsD,CACtD,4CAA0D,CAC1D,sCAAsD,CAItD,gDAAuD,CACvD,kDAAiE,CACjE,mDAAkE,CAClE,yDAA8D,CAE9D,uCAA6D,CAC7D,6CAAoE,CACpE,8CAAoE,CACpE,gDAAiE,CACjE,kCAAyD,CAGzD,+DAAsE,CACtE,iDAAsE,CACtE,kDAAsE,CACtE,oDAAoE,CACpE,6DAAsE,CAEtE,8BAAoD,CACpD,gCAAqD,CAErD,+CAA8D,CAC9D,qDAAiE,CACjE,+EAAqF,CACrF,oDAAuE,CACvE,yEAA8E,CAC9E,oDAAgE,CAIhE,oEAA2E,CAC3E,4DAAoE,CAIpE,wDAAiE,CACjE,4DAAmE,CAInE,2DAAoE,CACpE,mDAA6D,CAC7D,wDAAgE,CAChE,+CAA0D,CAC1D,4CAA2D,CAC3D,4DAAoE,CACpE,sCAAsD,CAItD,0DAAmE,CACnE,uFAA6F,CAC7F,oEAA2E,CAC3E,0EAA+E,CAC/E,8DAAsE,CAItE,2DAAoE,CACpE,mDAA6D,CAI7D,6DAAsE,CACtE,qDAA+D,CAI/D,uDAAgE,CAChE,uDAAiE,CAIjE,0CAAyD,CAIzD,wCAA2D,CAI3D,+BAAoD,CACpD,uDAAmE,CACnE,kDAAgE,CAIhE,oCAAyD,CAIzD,yBAAgD,CChHhD,wBAAyB,CCAzB,0CAA2C,CAK3C,gGAAiG,CAKjG,4GAA6G,CAK7G,sGAAuG,CAKvG,sDAAuD,CCvBvD,wBAAyB,CACzB,6BAA8B,CAC9B,wDAA6D,CAE7D,yBAA0B,CAC1B,2BAA4B,CAC5B,yBAA0B,CAC1B,wBAAyB,CACzB,0BAA2B,CCJ3B,kCJgHD,CI1GA,2EAYC,sBAAuB,CADvB,QAAS,CART,qBAAsB,CAEtB,WAAY,CAIZ,QAAS,CACT,SAAU,CAJV,eAAgB,CAOhB,oBAAqB,CAErB,eAAgB,CADhB,qBAAsB,CAVtB,UAAW,CAcX,oBACD,CAKA,8DAGC,wBAAyB,CAEzB,0BAA2B,CAG3B,WAAY,CACZ,UAAW,CALX,iGAAkG,CAElG,eAAgB,CAChB,kBAGD,CAGC,qDACC,gBACD,CAEA,mDAEC,sBACD,CAEA,qDACC,oBACD,CAEA,mLAGC,WACD,CAEA,iNAGC,cACD,CAEA,qDAEC,yBAAoC,CADpC,YAED,CAEA,qEAGC,QAAQ,CADR,SAED,CAMD,8BAEC,gBACD,CCxFA,MACC,sBAAuB,CCAvB,gEAAiE,CAKjE,0DAA2D,CAK3D,wEAAyE,CCbzE,uBAA8B,CAC9B,mDAA2D,CAC3D,4CAAkD,CAClD,oDAA4D,CAC5D,mDAA2D,CAC3D,kDAA2D,CAC3D,yDFFD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class which hides an element in DOM.
 */
.ck-hidden {
	/* Override selector specificity. Otherwise, all elements with some display
	style defined will override this one, which is not a desired result. */
	display: none !important;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-z-default: 1;
	--ck-z-panel: calc( var(--ck-z-default) + 999 );
	--ck-z-dialog: 9999;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A class that disables all transitions of the element and its children.
 */
.ck-transitions-disabled,
.ck-transitions-disabled * {
	transition: none !important;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-powered-by-line-height: 10px;
	--ck-powered-by-padding-vertical: 2px;
	--ck-powered-by-padding-horizontal: 4px;
	--ck-powered-by-text-color: hsl(0, 0%, 31%);
	--ck-powered-by-border-radius: var(--ck-border-radius);
	--ck-powered-by-background: hsl(0, 0%, 100%);
	--ck-powered-by-border-color: var(--ck-color-focus-border);
}

.ck.ck-balloon-panel.ck-powered-by-balloon {
	--ck-border-radius: var(--ck-powered-by-border-radius);

	box-shadow: none;
	background: var(--ck-powered-by-background);
	min-height: unset;
	z-index: calc( var(--ck-z-panel) - 1 );

	& .ck.ck-powered-by {
		line-height: var(--ck-powered-by-line-height);

		& a {
			cursor: pointer;
			display: flex;
			align-items: center;
			opacity: .66;
			filter: grayscale(80%);
			line-height: var(--ck-powered-by-line-height);
			padding: var(--ck-powered-by-padding-vertical) var(--ck-powered-by-padding-horizontal);
		}

		& .ck-powered-by__label {
			font-size: 7.5px;
			letter-spacing: -.2px;
			padding-left: 2px;
			text-transform: uppercase;
			font-weight: bold;
			margin-right: 4px;
			cursor: pointer;
			line-height: normal;
			color: var(--ck-powered-by-text-color);

		}

		& .ck-icon {
			display: block;
			cursor: pointer;
		}

		&:hover {
			& a {
				filter: grayscale(0%);
				opacity: 1;
			}
		}
	}

	&[class*="position_inside"] {
		border-color: transparent;
	}

	&[class*="position_border"] {
		border: var(--ck-focus-ring);
		border-color: var(--ck-powered-by-border-color);
	}
}

`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-base-foreground: 								hsl(0, 0%, 98%);
	--ck-color-base-background: 								hsl(0, 0%, 100%);
	--ck-color-base-border: 									hsl(220, 6%, 81%);
	--ck-color-base-action: 									hsl(104, 50.2%, 42.5%);
	--ck-color-base-focus: 										hsl(209, 92%, 70%);
	--ck-color-base-text: 										hsl(0, 0%, 20%);
	--ck-color-base-active: 									hsl(218.1, 100%, 58%);
	--ck-color-base-active-focus:								hsl(218.2, 100%, 52.5%);
	--ck-color-base-error:										hsl(15, 100%, 43%);

	/* -- Generic colors ------------------------------------------------------------------------ */

	--ck-color-focus-border-coordinates: 						218, 81.8%, 56.9%;
	--ck-color-focus-border: 									hsl(var(--ck-color-focus-border-coordinates));
	--ck-color-focus-outer-shadow:								hsl(212.4, 89.3%, 89%);
	--ck-color-focus-disabled-shadow:							hsla(209, 90%, 72%,.3);
	--ck-color-focus-error-shadow:								hsla(9,100%,56%,.3);
	--ck-color-text: 											var(--ck-color-base-text);
	--ck-color-shadow-drop: 									hsla(0, 0%, 0%, 0.15);
	--ck-color-shadow-drop-active:								hsla(0, 0%, 0%, 0.2);
	--ck-color-shadow-inner: 									hsla(0, 0%, 0%, 0.1);

	/* -- Buttons ------------------------------------------------------------------------------- */

	--ck-color-button-default-background: 						transparent;
	--ck-color-button-default-hover-background: 				hsl(0, 0%, 94.1%);
	--ck-color-button-default-active-background: 				hsl(0, 0%, 94.1%);
	--ck-color-button-default-disabled-background: 				transparent;

	--ck-color-button-on-background: 							hsl(212, 100%, 97.1%);
	--ck-color-button-on-hover-background: 						hsl(211.7, 100%, 92.9%);
	--ck-color-button-on-active-background: 					hsl(211.7, 100%, 92.9%);
	--ck-color-button-on-disabled-background: 					hsl(211, 15%, 95%);
	--ck-color-button-on-color:									hsl(218.1, 100%, 58%);


	--ck-color-button-action-background: 						var(--ck-color-base-action);
	--ck-color-button-action-hover-background: 					hsl(104, 53.2%, 40.2%);
	--ck-color-button-action-active-background: 				hsl(104, 53.2%, 40.2%);
	--ck-color-button-action-disabled-background: 				hsl(104, 44%, 58%);
	--ck-color-button-action-text: 								var(--ck-color-base-background);

	--ck-color-button-save: 									hsl(120, 100%, 27%);
	--ck-color-button-cancel: 									hsl(15, 100%, 43%);

	--ck-color-switch-button-off-background:					hsl(0, 0%, 57.6%);
	--ck-color-switch-button-off-hover-background:				hsl(0, 0%, 49%);
	--ck-color-switch-button-on-background:						var(--ck-color-button-action-background);
	--ck-color-switch-button-on-hover-background:				hsl(104, 53.2%, 40.2%);
	--ck-color-switch-button-inner-background:					var(--ck-color-base-background);
	--ck-color-switch-button-inner-shadow:						hsla(0, 0%, 0%, 0.1);

	/* -- Dropdown ------------------------------------------------------------------------------ */

	--ck-color-dropdown-panel-background: 						var(--ck-color-base-background);
	--ck-color-dropdown-panel-border: 							var(--ck-color-base-border);

	/* -- Dialog -------------------------------------------------------------------------------- */

	--ck-color-dialog-background: 								var(--ck-custom-background);
	--ck-color-dialog-form-header-border: 						var(--ck-custom-border);

	/* -- Input --------------------------------------------------------------------------------- */

	--ck-color-input-background: 								var(--ck-color-base-background);
	--ck-color-input-border: 									var(--ck-color-base-border);
	--ck-color-input-error-border:								var(--ck-color-base-error);
	--ck-color-input-text: 										var(--ck-color-base-text);
	--ck-color-input-disabled-background: 						hsl(0, 0%, 95%);
	--ck-color-input-disabled-border: 							var(--ck-color-base-border);
	--ck-color-input-disabled-text: 							hsl(0, 0%, 46%);

	/* -- List ---------------------------------------------------------------------------------- */

	--ck-color-list-background: 								var(--ck-color-base-background);
	--ck-color-list-button-hover-background: 					var(--ck-color-button-default-hover-background);
	--ck-color-list-button-on-background: 						var(--ck-color-button-on-color);
	--ck-color-list-button-on-background-focus: 				var(--ck-color-button-on-color);
	--ck-color-list-button-on-text:								var(--ck-color-base-background);

	/* -- Panel --------------------------------------------------------------------------------- */

	--ck-color-panel-background: 								var(--ck-color-base-background);
	--ck-color-panel-border: 									var(--ck-color-base-border);

	/* -- Toolbar ------------------------------------------------------------------------------- */

	--ck-color-toolbar-background: 								var(--ck-color-base-background);
	--ck-color-toolbar-border: 									var(--ck-color-base-border);

	/* -- Tooltip ------------------------------------------------------------------------------- */

	--ck-color-tooltip-background: 								var(--ck-color-base-text);
	--ck-color-tooltip-text: 									var(--ck-color-base-background);

	/* -- Engine -------------------------------------------------------------------------------- */

	--ck-color-engine-placeholder-text: 						hsl(0, 0%, 44%);

	/* -- Upload -------------------------------------------------------------------------------- */

	--ck-color-upload-bar-background:		 					hsl(209, 92%, 70%);

	/* -- Link -------------------------------------------------------------------------------- */

	--ck-color-link-default:									hsl(240, 100%, 47%);
	--ck-color-link-selected-background:						hsla(201, 100%, 56%, 0.1);
	--ck-color-link-fake-selection:								hsla(201, 100%, 56%, 0.3);

	/* -- Search result highlight ---------------------------------------------------------------- */

	--ck-color-highlight-background:							hsl(60, 100%, 50%);

	/* -- Generic colors ------------------------------------------------------------------------- */

	--ck-color-light-red:										hsl(0, 100%, 90%);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/**
	 * An opacity value of disabled UI item.
	 */
	--ck-disabled-opacity: .5;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/**
	 * The geometry of the of focused element's outer shadow.
	 */
	--ck-focus-outer-shadow-geometry: 0 0 0 3px;

	/**
	 * A visual style of focused element's outer shadow.
	 */
	--ck-focus-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-outer-shadow);

	/**
	 * A visual style of focused element's outer shadow (when disabled).
	 */
	--ck-focus-disabled-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-disabled-shadow);

	/**
	 * A visual style of focused element's outer shadow (when has errors).
	 */
	--ck-focus-error-outer-shadow: var(--ck-focus-outer-shadow-geometry) var(--ck-color-focus-error-shadow);

	/**
	 * A visual style of focused element's border or outline.
	 */
	--ck-focus-ring: 1px solid var(--ck-color-focus-border);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-font-size-base: 13px;
	--ck-line-height-base: 1.84615;
	--ck-font-face: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;

	--ck-font-size-tiny: 0.7em;
	--ck-font-size-small: 0.75em;
	--ck-font-size-normal: 1em;
	--ck-font-size-big: 1.4em;
	--ck-font-size-large: 1.8em;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/* This is super-important. This is **manually** adjusted so a button without an icon
	is never smaller than a button with icon, additionally making sure that text-less buttons
	are perfect squares. The value is also shared by other components which should stay "in-line"
	with buttons. */
	--ck-ui-component-min-height: 2.3em;
}

/**
 * Resets an element, ignoring its children.
 */
.ck.ck-reset,
.ck.ck-reset_all,
.ck-reset_all *:not(.ck-reset_all-excluded *) {
	box-sizing: border-box;
	width: auto;
	height: auto;
	position: static;

	/* Do not include inheritable rules here. */
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	text-decoration: none;
	vertical-align: middle;
	transition: none;

	/* https://github.com/ckeditor/ckeditor5-theme-lark/issues/105 */
	word-wrap: break-word;
}

/**
 * Resets an element AND its children.
 */
.ck.ck-reset_all,
.ck-reset_all *:not(.ck-reset_all-excluded *) {
	/* These are rule inherited by all children elements. */
	border-collapse: collapse;
	font: normal normal normal var(--ck-font-size-base)/var(--ck-line-height-base) var(--ck-font-face);
	color: var(--ck-color-text);
	text-align: left;
	white-space: nowrap;
	cursor: auto;
	float: none;
}

.ck-reset_all {
	& .ck-rtl *:not(.ck-reset_all-excluded *) {
		text-align: right;
	}

	& iframe:not(.ck-reset_all-excluded *) {
		/* For IE */
		vertical-align: inherit;
	}

	& textarea:not(.ck-reset_all-excluded *) {
		white-space: pre-wrap;
	}

	& textarea:not(.ck-reset_all-excluded *),
	& input[type="text"]:not(.ck-reset_all-excluded *),
	& input[type="password"]:not(.ck-reset_all-excluded *) {
		cursor: text;
	}

	& textarea[disabled]:not(.ck-reset_all-excluded *),
	& input[type="text"][disabled]:not(.ck-reset_all-excluded *),
	& input[type="password"][disabled]:not(.ck-reset_all-excluded *) {
		cursor: default;
	}

	& fieldset:not(.ck-reset_all-excluded *) {
		padding: 10px;
		border: 2px groove hsl(255, 7%, 88%);
	}

	& button:not(.ck-reset_all-excluded *)::-moz-focus-inner {
		/* See http://stackoverflow.com/questions/5517744/remove-extra-button-spacing-padding-in-firefox */
		padding: 0;
		border: 0
	}
}

/**
 * Default UI rules for RTL languages.
 */
.ck[dir="rtl"],
.ck[dir="rtl"] .ck {
	text-align: right;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * Default border-radius value.
 */
:root{
	--ck-border-radius: 2px;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	/**
	 * A visual style of element's inner shadow (i.e. input).
	 */
	--ck-inner-shadow: 2px 2px 3px var(--ck-color-shadow-inner) inset;

	/**
	 * A visual style of element's drop shadow (i.e. panel).
	 */
	--ck-drop-shadow: 0 1px 2px 1px var(--ck-color-shadow-drop);

	/**
	 * A visual style of element's active shadow (i.e. comment or suggestion).
	 */
	--ck-drop-shadow-active: 0 3px 6px 1px var(--ck-color-shadow-drop-active);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-spacing-unit: 						0.6em;
	--ck-spacing-large: 					calc(var(--ck-spacing-unit) * 1.5);
	--ck-spacing-standard: 					var(--ck-spacing-unit);
	--ck-spacing-medium: 					calc(var(--ck-spacing-unit) * 0.8);
	--ck-spacing-small: 					calc(var(--ck-spacing-unit) * 0.5);
	--ck-spacing-tiny: 						calc(var(--ck-spacing-unit) * 0.3);
	--ck-spacing-extra-tiny: 				calc(var(--ck-spacing-unit) * 0.16);
}
`],sourceRoot:""}]);const w=k},695:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,":root{--ck-color-resizer:var(--ck-color-focus-border);--ck-color-resizer-tooltip-background:#262626;--ck-color-resizer-tooltip-text:#f2f2f2;--ck-resizer-border-radius:var(--ck-border-radius);--ck-resizer-tooltip-offset:10px;--ck-resizer-tooltip-height:calc(var(--ck-spacing-small)*2 + 10px)}.ck .ck-widget,.ck .ck-widget.ck-widget_with-selection-handle{position:relative}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle{position:absolute}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle .ck-icon{display:block}.ck .ck-widget.ck-widget_with-selection-handle.ck-widget_selected>.ck-widget__selection-handle,.ck .ck-widget.ck-widget_with-selection-handle:hover>.ck-widget__selection-handle{visibility:visible}.ck .ck-size-view{background:var(--ck-color-resizer-tooltip-background);border:1px solid var(--ck-color-resizer-tooltip-text);border-radius:var(--ck-resizer-border-radius);color:var(--ck-color-resizer-tooltip-text);display:block;font-size:var(--ck-font-size-tiny);height:var(--ck-resizer-tooltip-height);line-height:var(--ck-resizer-tooltip-height);padding:0 var(--ck-spacing-small)}.ck .ck-size-view.ck-orientation-above-center,.ck .ck-size-view.ck-orientation-bottom-left,.ck .ck-size-view.ck-orientation-bottom-right,.ck .ck-size-view.ck-orientation-top-left,.ck .ck-size-view.ck-orientation-top-right{position:absolute}.ck .ck-size-view.ck-orientation-top-left{left:var(--ck-resizer-tooltip-offset);top:var(--ck-resizer-tooltip-offset)}.ck .ck-size-view.ck-orientation-top-right{right:var(--ck-resizer-tooltip-offset);top:var(--ck-resizer-tooltip-offset)}.ck .ck-size-view.ck-orientation-bottom-right{bottom:var(--ck-resizer-tooltip-offset);right:var(--ck-resizer-tooltip-offset)}.ck .ck-size-view.ck-orientation-bottom-left{bottom:var(--ck-resizer-tooltip-offset);left:var(--ck-resizer-tooltip-offset)}.ck .ck-size-view.ck-orientation-above-center{left:50%;top:calc(var(--ck-resizer-tooltip-height)*-1);transform:translate(-50%)}:root{--ck-widget-outline-thickness:3px;--ck-widget-handler-icon-size:16px;--ck-widget-handler-animation-duration:200ms;--ck-widget-handler-animation-curve:ease;--ck-color-widget-blurred-border:#dedede;--ck-color-widget-hover-border:#ffc83d;--ck-color-widget-editable-focus-background:var(--ck-color-base-background);--ck-color-widget-drag-handler-icon-color:var(--ck-color-base-background)}.ck .ck-widget{outline-color:transparent;outline-style:solid;outline-width:var(--ck-widget-outline-thickness);transition:outline-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve)}@media (prefers-reduced-motion:reduce){.ck .ck-widget{transition:none}}.ck .ck-widget.ck-widget_selected,.ck .ck-widget.ck-widget_selected:hover{outline:var(--ck-widget-outline-thickness) solid var(--ck-color-focus-border)}.ck .ck-widget:hover{outline-color:var(--ck-color-widget-hover-border)}.ck .ck-editor__nested-editable{border:1px solid transparent}.ck .ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck .ck-editor__nested-editable:focus{box-shadow:var(--ck-inner-shadow),0 0}@media (forced-colors:none){.ck .ck-editor__nested-editable.ck-editor__nested-editable_focused,.ck .ck-editor__nested-editable:focus{background-color:var(--ck-color-widget-editable-focus-background)}}.ck .ck-editor__nested-editable.ck-editor__nested-editable_focused:not(td,th),.ck .ck-editor__nested-editable:focus:not(td,th){border:var(--ck-focus-ring);outline:none}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle{background-color:transparent;border-radius:var(--ck-border-radius) var(--ck-border-radius) 0 0;box-sizing:border-box;left:calc(0px - var(--ck-widget-outline-thickness));opacity:0;padding:4px;top:0;transform:translateY(-100%);transition:background-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),visibility var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),opacity var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve)}@media (prefers-reduced-motion:reduce){.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle{transition:none}}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle .ck-icon{color:var(--ck-color-widget-drag-handler-icon-color);height:var(--ck-widget-handler-icon-size);width:var(--ck-widget-handler-icon-size)}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle .ck-icon .ck-icon__selected-indicator{opacity:0;transition:opacity .3s var(--ck-widget-handler-animation-curve)}@media (prefers-reduced-motion:reduce){.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle .ck-icon .ck-icon__selected-indicator{transition:none}}.ck .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle:hover .ck-icon .ck-icon__selected-indicator{opacity:1}.ck .ck-widget.ck-widget_with-selection-handle:hover>.ck-widget__selection-handle{background-color:var(--ck-color-widget-hover-border);opacity:1}.ck .ck-widget.ck-widget_with-selection-handle.ck-widget_selected:hover>.ck-widget__selection-handle,.ck .ck-widget.ck-widget_with-selection-handle.ck-widget_selected>.ck-widget__selection-handle{background-color:var(--ck-color-focus-border);opacity:1}.ck .ck-widget.ck-widget_with-selection-handle.ck-widget_selected:hover>.ck-widget__selection-handle .ck-icon .ck-icon__selected-indicator,.ck .ck-widget.ck-widget_with-selection-handle.ck-widget_selected>.ck-widget__selection-handle .ck-icon .ck-icon__selected-indicator{opacity:1}.ck[dir=rtl] .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle{left:auto;right:calc(0px - var(--ck-widget-outline-thickness))}.ck.ck-editor__editable.ck-read-only .ck-widget{transition:none}.ck.ck-editor__editable.ck-read-only .ck-widget:not(.ck-widget_selected){--ck-widget-outline-thickness:0px}.ck.ck-editor__editable.ck-read-only .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle,.ck.ck-editor__editable.ck-read-only .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle:hover{background:var(--ck-color-widget-blurred-border)}.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected,.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected:hover{outline-color:var(--ck-color-widget-blurred-border)}.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected.ck-widget_with-selection-handle:hover>.ck-widget__selection-handle,.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected.ck-widget_with-selection-handle:hover>.ck-widget__selection-handle:hover,.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected.ck-widget_with-selection-handle>.ck-widget__selection-handle,.ck.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected.ck-widget_with-selection-handle>.ck-widget__selection-handle:hover{background:var(--ck-color-widget-blurred-border)}.ck.ck-editor__editable blockquote>.ck-widget.ck-widget_with-selection-handle:first-child,.ck.ck-editor__editable>.ck-widget.ck-widget_with-selection-handle:first-child{margin-top:calc(1em + var(--ck-widget-handler-icon-size))}","",{version:3,sources:["webpack://./../ckeditor5-widget/theme/widget.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-widget/widget.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_shadow.css","webpack://./../ckeditor5-ui/theme/mixins/_mediacolors.css","webpack://./../ckeditor5-theme-lark/theme/mixins/_focus.css"],names:[],mappings:"AAKA,MACC,+CAAgD,CAChD,6CAAsD,CACtD,uCAAgD,CAEhD,kDAAmD,CACnD,gCAAiC,CACjC,kEACD,CAOA,8DAEC,iBAqBD,CAnBC,4EACC,iBAOD,CALC,qFAGC,aACD,CASD,iLACC,kBACD,CAGD,kBACC,qDAAsD,CAEtD,qDAAsD,CACtD,6CAA8C,CAF9C,0CAA2C,CAI3C,aAAc,CADd,kCAAmC,CAGnC,uCAAwC,CACxC,4CAA6C,CAF7C,iCAsCD,CAlCC,8NAKC,iBACD,CAEA,0CAEC,qCAAsC,CADtC,oCAED,CAEA,2CAEC,sCAAuC,CADvC,oCAED,CAEA,8CACC,uCAAwC,CACxC,sCACD,CAEA,6CACC,uCAAwC,CACxC,qCACD,CAGA,8CAEC,QAAS,CADT,6CAAgD,CAEhD,yBACD,CChFD,MACC,iCAAkC,CAClC,kCAAmC,CACnC,4CAA6C,CAC7C,wCAAyC,CAEzC,wCAAiD,CACjD,sCAAkD,CAClD,2EAA4E,CAC5E,yEACD,CAEA,eAGC,yBAA0B,CAD1B,mBAAoB,CADpB,gDAAiD,CAGjD,6GAcD,CAZC,uCAND,eAOE,eAWF,CAVC,CAEA,0EAEC,6EACD,CAEA,qBACC,iDACD,CAGD,gCACC,4BAoBD,CAhBC,yGCrCA,qCDoDA,CE/CA,4BACC,yGFmCC,iEEjCD,CACD,CFwCC,+HG/CD,2BAA2B,CAD3B,YHkDC,CAKD,4EAKC,4BAA6B,CAa7B,iEAAkE,CAhBlE,qBAAsB,CAoBtB,mDAAoD,CAhBpD,SAAU,CALV,WAAY,CAsBZ,KAAM,CAFN,2BAA4B,CAT5B,6SAwCD,CA3BC,uCAzBD,4EA0BE,eA0BF,CAzBC,CAEA,qFAIC,oDAAqD,CADrD,yCAA0C,CAD1C,wCAeD,CAVC,kHACC,SAAU,CAGV,+DAKD,CAHC,uCAND,kHAOE,eAEF,CADC,CAKF,wHACC,SACD,CAID,kFAEC,oDAAqD,CADrD,SAED,CAKC,oMAEC,6CAA8C,CAD9C,SAOD,CAHC,gRACC,SACD,CAOH,qFACC,SAAU,CACV,oDACD,CAGA,gDAEC,eAkBD,CAhBC,yEAOC,iCACD,CAGC,gOAEC,gDACD,CAOD,wIAEC,mDAQD,CALE,ghBAEC,gDACD,CAKH,yKAOC,yDACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-color-resizer: var(--ck-color-focus-border);
	--ck-color-resizer-tooltip-background: hsl(0, 0%, 15%);
	--ck-color-resizer-tooltip-text: hsl(0, 0%, 95%);

	--ck-resizer-border-radius: var(--ck-border-radius);
	--ck-resizer-tooltip-offset: 10px;
	--ck-resizer-tooltip-height: calc(var(--ck-spacing-small) * 2 + 10px);
}

.ck .ck-widget {
	/* This is neccessary for type around UI to be positioned properly. */
	position: relative;
}

.ck .ck-widget.ck-widget_with-selection-handle {
	/* Make the widget wrapper a relative positioning container for the drag handle. */
	position: relative;

	& .ck-widget__selection-handle {
		position: absolute;

		& .ck-icon {
			/* Make sure the icon in not a subject to font-size or line-height to avoid
			unnecessary spacing around it. */
			display: block;
		}
	}

	/* Show the selection handle on mouse hover over the widget, but not for nested widgets. */
	&:hover > .ck-widget__selection-handle {
		visibility: visible;
	}

	/* Show the selection handle when the widget is selected, but not for nested widgets. */
	&.ck-widget_selected > .ck-widget__selection-handle {
		visibility: visible;
	}
}

.ck .ck-size-view {
	background: var(--ck-color-resizer-tooltip-background);
	color: var(--ck-color-resizer-tooltip-text);
	border: 1px solid var(--ck-color-resizer-tooltip-text);
	border-radius: var(--ck-resizer-border-radius);
	font-size: var(--ck-font-size-tiny);
	display: block;
	padding: 0 var(--ck-spacing-small);
	height: var(--ck-resizer-tooltip-height);
	line-height: var(--ck-resizer-tooltip-height);

	&.ck-orientation-top-left,
	&.ck-orientation-top-right,
	&.ck-orientation-bottom-right,
	&.ck-orientation-bottom-left,
	&.ck-orientation-above-center {
		position: absolute;
	}

	&.ck-orientation-top-left {
		top: var(--ck-resizer-tooltip-offset);
		left: var(--ck-resizer-tooltip-offset);
	}

	&.ck-orientation-top-right {
		top: var(--ck-resizer-tooltip-offset);
		right: var(--ck-resizer-tooltip-offset);
	}

	&.ck-orientation-bottom-right {
		bottom: var(--ck-resizer-tooltip-offset);
		right: var(--ck-resizer-tooltip-offset);
	}

	&.ck-orientation-bottom-left {
		bottom: var(--ck-resizer-tooltip-offset);
		left: var(--ck-resizer-tooltip-offset);
	}

	/* Class applied if the widget is too small to contain the size label */
	&.ck-orientation-above-center {
		top: calc(var(--ck-resizer-tooltip-height) * -1);
		left: 50%;
		transform: translate(-50%);
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@import "../mixins/_focus.css";
@import "../mixins/_shadow.css";
@import "@ckeditor/ckeditor5-ui/theme/mixins/_mediacolors.css";

:root {
	--ck-widget-outline-thickness: 3px;
	--ck-widget-handler-icon-size: 16px;
	--ck-widget-handler-animation-duration: 200ms;
	--ck-widget-handler-animation-curve: ease;

	--ck-color-widget-blurred-border: hsl(0, 0%, 87%);
	--ck-color-widget-hover-border: hsl(43, 100%, 62%);
	--ck-color-widget-editable-focus-background: var(--ck-color-base-background);
	--ck-color-widget-drag-handler-icon-color: var(--ck-color-base-background);
}

.ck .ck-widget {
	outline-width: var(--ck-widget-outline-thickness);
	outline-style: solid;
	outline-color: transparent;
	transition: outline-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve);

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&.ck-widget_selected,
	&.ck-widget_selected:hover {
		outline: var(--ck-widget-outline-thickness) solid var(--ck-color-focus-border);
	}

	&:hover {
		outline-color: var(--ck-color-widget-hover-border);
	}
}

.ck .ck-editor__nested-editable {
	border: 1px solid transparent;

	/* The :focus style is applied before .ck-editor__nested-editable_focused class is rendered in the view.
	These styles show a different border for a blink of an eye, so \`:focus\` need to have same styles applied. */
	&.ck-editor__nested-editable_focused,
	&:focus {
		@mixin ck-box-shadow var(--ck-inner-shadow);
		@mixin ck-media-default-colors {
			background-color: var(--ck-color-widget-editable-focus-background);
		}

		/**
		 * Focus border should not be applied to table cells because it overrides the default table cell border color.
		 * In other words - in some scenarios, the part of the table cell border has focus color style, which is not expected behavior
		 * because it should be the same as the table cell border color.
		 */
		&:not(td, th) {
			@mixin ck-focus-ring;
		}
	}
}

.ck .ck-widget.ck-widget_with-selection-handle {
	& .ck-widget__selection-handle {
		padding: 4px;
		box-sizing: border-box;

		/* Background and opacity will be animated as the handler shows up or the widget gets selected. */
		background-color: transparent;
		opacity: 0;

		/* Transition:
		   * background-color for the .ck-widget_selected state change,
		   * visibility for hiding the handler,
		   * opacity for the proper look of the icon when the handler disappears. */
		transition:
			background-color var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),
			visibility var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),
			opacity var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve);

		/* Make only top corners round. */
		border-radius: var(--ck-border-radius) var(--ck-border-radius) 0 0;

		/* Place the drag handler outside the widget wrapper. */
		transform: translateY(-100%);
		left: calc(0px - var(--ck-widget-outline-thickness));
		top: 0;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}

		& .ck-icon {
			/* Make sure the dimensions of the icon are independent of the fon-size of the content. */
			width: var(--ck-widget-handler-icon-size);
			height: var(--ck-widget-handler-icon-size);
			color: var(--ck-color-widget-drag-handler-icon-color);

			/* The "selected" part of the icon is invisible by default */
			& .ck-icon__selected-indicator {
				opacity: 0;

				/* Note: The animation is longer on purpose. Simply feels better. */
				transition: opacity 300ms var(--ck-widget-handler-animation-curve);

				@media (prefers-reduced-motion: reduce) {
					transition: none;
				}
			}
		}

		/* Advertise using the look of the icon that once clicked the handler, the widget will be selected. */
		&:hover .ck-icon .ck-icon__selected-indicator {
			opacity: 1;
		}
	}

	/* Show the selection handler on mouse hover over the widget, but not for nested widgets. */
	&:hover > .ck-widget__selection-handle {
		opacity: 1;
		background-color: var(--ck-color-widget-hover-border);
	}

	/* Show the selection handler when the widget is selected, but not for nested widgets. */
	&.ck-widget_selected,
	&.ck-widget_selected:hover {
		& > .ck-widget__selection-handle {
			opacity: 1;
			background-color: var(--ck-color-focus-border);

			/* When the widget is selected, notify the user using the proper look of the icon. */
			& .ck-icon .ck-icon__selected-indicator {
				opacity: 1;
			}
		}
	}
}

/* In a RTL environment, align the selection handler to the right side of the widget */
/* stylelint-disable-next-line no-descending-specificity */
.ck[dir="rtl"] .ck-widget.ck-widget_with-selection-handle .ck-widget__selection-handle {
	left: auto;
	right: calc(0px - var(--ck-widget-outline-thickness));
}

/* https://github.com/ckeditor/ckeditor5/issues/6415 */
.ck.ck-editor__editable.ck-read-only .ck-widget {
	/* Prevent the :hover outline from showing up because of the used outline-color transition. */
	transition: none;

	&:not(.ck-widget_selected) {
		/* Disable visual effects of hover/active widget when CKEditor is in readOnly mode.
		 * See: https://github.com/ckeditor/ckeditor5/issues/1261
		 *
		 * Leave the unit because this custom property is used in calc() by other features.
		 * See: https://github.com/ckeditor/ckeditor5/issues/6775
		 */
		--ck-widget-outline-thickness: 0px;
	}

	&.ck-widget_with-selection-handle {
		& .ck-widget__selection-handle,
		& .ck-widget__selection-handle:hover {
			background: var(--ck-color-widget-blurred-border);
		}
	}
}

/* Style the widget when it's selected but the editable it belongs to lost focus. */
/* stylelint-disable-next-line no-descending-specificity */
.ck.ck-editor__editable.ck-blurred .ck-widget {
	&.ck-widget_selected,
	&.ck-widget_selected:hover {
		outline-color: var(--ck-color-widget-blurred-border);

		&.ck-widget_with-selection-handle {
			& > .ck-widget__selection-handle,
			& > .ck-widget__selection-handle:hover {
				background: var(--ck-color-widget-blurred-border);
			}
		}
	}
}

.ck.ck-editor__editable > .ck-widget.ck-widget_with-selection-handle:first-child,
.ck.ck-editor__editable blockquote > .ck-widget.ck-widget_with-selection-handle:first-child {
	/* Do not crop selection handler if a widget is a first-child in the blockquote or in the root editable.
	In fact, anything with overflow: hidden.
	https://github.com/ckeditor/ckeditor5-block-quote/issues/28
	https://github.com/ckeditor/ckeditor5-widget/issues/44
	https://github.com/ckeditor/ckeditor5-widget/issues/66 */
	margin-top: calc(1em + var(--ck-widget-handler-icon-size));
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A helper to combine multiple shadows.
 */
@define-mixin ck-box-shadow $shadowA, $shadowB: 0 0 {
	box-shadow: $shadowA, $shadowB;
}

/**
 * Gives an element a drop shadow so it looks like a floating panel.
 */
@define-mixin ck-drop-shadow {
	@mixin ck-box-shadow var(--ck-drop-shadow);
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

@define-mixin ck-media-forced-colors {
	@media (forced-colors: active) {
		& {
			@mixin-content;
		}
	}
}

@define-mixin ck-media-default-colors {
	@media (forced-colors: none) {
		& {
			@mixin-content;
		}
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * A visual style of focused element's border.
 */
@define-mixin ck-focus-ring {
	/* Disable native outline. */
	outline: none;
	border: var(--ck-focus-ring)
}
`],sourceRoot:""}]);const w=k},4095:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,".ck .ck-widget_with-resizer{position:relative}.ck .ck-widget__resizer{display:none;left:0;pointer-events:none;position:absolute;top:0}.ck-focused .ck-widget_with-resizer.ck-widget_selected>.ck-widget__resizer{display:block}.ck .ck-widget__resizer__handle{pointer-events:all;position:absolute}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-bottom-right,.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-top-left{cursor:nwse-resize}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-bottom-left,.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-top-right{cursor:nesw-resize}:root{--ck-resizer-size:10px;--ck-resizer-offset:calc(var(--ck-resizer-size)/-2 - 2px);--ck-resizer-border-width:1px}.ck .ck-widget__resizer{outline:1px solid var(--ck-color-resizer)}.ck .ck-widget__resizer__handle{background:var(--ck-color-focus-border);border:var(--ck-resizer-border-width) solid #fff;border-radius:var(--ck-resizer-border-radius);height:var(--ck-resizer-size);width:var(--ck-resizer-size)}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-top-left{left:var(--ck-resizer-offset);top:var(--ck-resizer-offset)}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-top-right{right:var(--ck-resizer-offset);top:var(--ck-resizer-offset)}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-bottom-right{bottom:var(--ck-resizer-offset);right:var(--ck-resizer-offset)}.ck .ck-widget__resizer__handle.ck-widget__resizer__handle-bottom-left{bottom:var(--ck-resizer-offset);left:var(--ck-resizer-offset)}","",{version:3,sources:["webpack://./../ckeditor5-widget/theme/widgetresize.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-widget/widgetresize.css"],names:[],mappings:"AAKA,4BAEC,iBACD,CAEA,wBACC,YAAa,CAMb,MAAO,CAFP,mBAAoB,CAHpB,iBAAkB,CAMlB,KACD,CAGC,2EACC,aACD,CAGD,gCAIC,kBAAmB,CAHnB,iBAcD,CATC,4IAEC,kBACD,CAEA,4IAEC,kBACD,CCpCD,MACC,sBAAuB,CAGvB,yDAAiE,CACjE,6BACD,CAEA,wBACC,yCACD,CAEA,gCAGC,uCAAwC,CACxC,gDAA6D,CAC7D,6CAA8C,CAH9C,6BAA8B,CAD9B,4BAyBD,CAnBC,oEAEC,6BAA8B,CAD9B,4BAED,CAEA,qEAEC,8BAA+B,CAD/B,4BAED,CAEA,wEACC,+BAAgC,CAChC,8BACD,CAEA,uEACC,+BAAgC,CAChC,6BACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-widget_with-resizer {
	/* Make the widget wrapper a relative positioning container for the drag handle. */
	position: relative;
}

.ck .ck-widget__resizer {
	display: none;
	position: absolute;

	/* The wrapper itself should not interfere with the pointer device, only the handles should. */
	pointer-events: none;

	left: 0;
	top: 0;
}

.ck-focused .ck-widget_with-resizer.ck-widget_selected {
	& > .ck-widget__resizer {
		display: block;
	}
}

.ck .ck-widget__resizer__handle {
	position: absolute;

	/* Resizers are the only UI elements that should interfere with a pointer device. */
	pointer-events: all;

	&.ck-widget__resizer__handle-top-left,
	&.ck-widget__resizer__handle-bottom-right {
		cursor: nwse-resize;
	}

	&.ck-widget__resizer__handle-top-right,
	&.ck-widget__resizer__handle-bottom-left {
		cursor: nesw-resize;
	}
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-resizer-size: 10px;

	/* Set the resizer with a 50% offset. */
	--ck-resizer-offset: calc( ( var(--ck-resizer-size) / -2 ) - 2px);
	--ck-resizer-border-width: 1px;
}

.ck .ck-widget__resizer {
	outline: 1px solid var(--ck-color-resizer);
}

.ck .ck-widget__resizer__handle {
	width: var(--ck-resizer-size);
	height: var(--ck-resizer-size);
	background: var(--ck-color-focus-border);
	border: var(--ck-resizer-border-width) solid hsl(0, 0%, 100%);
	border-radius: var(--ck-resizer-border-radius);

	&.ck-widget__resizer__handle-top-left {
		top: var(--ck-resizer-offset);
		left: var(--ck-resizer-offset);
	}

	&.ck-widget__resizer__handle-top-right {
		top: var(--ck-resizer-offset);
		right: var(--ck-resizer-offset);
	}

	&.ck-widget__resizer__handle-bottom-right {
		bottom: var(--ck-resizer-offset);
		right: var(--ck-resizer-offset);
	}

	&.ck-widget__resizer__handle-bottom-left {
		bottom: var(--ck-resizer-offset);
		left: var(--ck-resizer-offset);
	}
}
`],sourceRoot:""}]);const w=k},8508:(y,A,g)=>{g.d(A,{A:()=>w});var x=g(2001),v=g.n(x),_=g(935),k=g.n(_)()(v());k.push([y.id,'.ck .ck-widget .ck-widget__type-around__button{display:block;overflow:hidden;position:absolute;z-index:var(--ck-z-default)}.ck .ck-widget .ck-widget__type-around__button svg{left:50%;position:absolute;top:50%;z-index:calc(var(--ck-z-default) + 2)}.ck .ck-widget .ck-widget__type-around__button.ck-widget__type-around__button_before{left:min(10%,30px);top:calc(var(--ck-widget-outline-thickness)*-.5);transform:translateY(-50%)}.ck .ck-widget .ck-widget__type-around__button.ck-widget__type-around__button_after{bottom:calc(var(--ck-widget-outline-thickness)*-.5);right:min(10%,30px);transform:translateY(50%)}.ck .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button:after,.ck .ck-widget>.ck-widget__type-around>.ck-widget__type-around__button:hover:after{content:"";display:block;left:1px;position:absolute;top:1px;z-index:calc(var(--ck-z-default) + 1)}.ck .ck-widget>.ck-widget__type-around>.ck-widget__type-around__fake-caret{display:none;left:0;position:absolute;right:0}.ck .ck-widget:hover>.ck-widget__type-around>.ck-widget__type-around__fake-caret{left:calc(var(--ck-widget-outline-thickness)*-1);right:calc(var(--ck-widget-outline-thickness)*-1)}.ck .ck-widget.ck-widget_type-around_show-fake-caret_before>.ck-widget__type-around>.ck-widget__type-around__fake-caret{display:block;top:calc(var(--ck-widget-outline-thickness)*-1 - 1px)}.ck .ck-widget.ck-widget_type-around_show-fake-caret_after>.ck-widget__type-around>.ck-widget__type-around__fake-caret{bottom:calc(var(--ck-widget-outline-thickness)*-1 - 1px);display:block}.ck.ck-editor__editable.ck-read-only .ck-widget__type-around,.ck.ck-editor__editable.ck-restricted-editing_mode_restricted .ck-widget__type-around,.ck.ck-editor__editable.ck-widget__type-around_disabled .ck-widget__type-around{display:none}:root{--ck-widget-type-around-button-size:20px;--ck-color-widget-type-around-button-active:var(--ck-color-focus-border);--ck-color-widget-type-around-button-hover:var(--ck-color-widget-hover-border);--ck-color-widget-type-around-button-blurred-editable:var(--ck-color-widget-blurred-border);--ck-color-widget-type-around-button-radar-start-alpha:0;--ck-color-widget-type-around-button-radar-end-alpha:.3;--ck-color-widget-type-around-button-icon:var(--ck-color-base-background)}.ck .ck-widget .ck-widget__type-around__button{background:var(--ck-color-widget-type-around-button);border-radius:100px;height:var(--ck-widget-type-around-button-size);opacity:0;pointer-events:none;transition:opacity var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve),background var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve);width:var(--ck-widget-type-around-button-size)}@media (prefers-reduced-motion:reduce){.ck .ck-widget .ck-widget__type-around__button{transition:none}}.ck .ck-widget .ck-widget__type-around__button svg{height:8px;margin-top:1px;transform:translate(-50%,-50%);transition:transform .5s ease;width:10px}@media (prefers-reduced-motion:reduce){.ck .ck-widget .ck-widget__type-around__button svg{transition:none}}.ck .ck-widget .ck-widget__type-around__button svg *{stroke-dasharray:10;stroke-dashoffset:0;fill:none;stroke:var(--ck-color-widget-type-around-button-icon);stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round}.ck .ck-widget .ck-widget__type-around__button svg line{stroke-dasharray:7}.ck .ck-widget .ck-widget__type-around__button:hover{animation:ck-widget-type-around-button-sonar 1s ease infinite}.ck .ck-widget .ck-widget__type-around__button:hover svg polyline{animation:ck-widget-type-around-arrow-dash 2s linear}.ck .ck-widget .ck-widget__type-around__button:hover svg line{animation:ck-widget-type-around-arrow-tip-dash 2s linear}@media (prefers-reduced-motion:reduce){.ck .ck-widget .ck-widget__type-around__button:hover,.ck .ck-widget .ck-widget__type-around__button:hover svg line,.ck .ck-widget .ck-widget__type-around__button:hover svg polyline{animation:none}}.ck .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button,.ck .ck-widget:hover>.ck-widget__type-around>.ck-widget__type-around__button{opacity:1;pointer-events:auto}.ck .ck-widget:not(.ck-widget_selected)>.ck-widget__type-around>.ck-widget__type-around__button{background:var(--ck-color-widget-type-around-button-hover)}.ck .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button,.ck .ck-widget>.ck-widget__type-around>.ck-widget__type-around__button:hover{background:var(--ck-color-widget-type-around-button-active)}.ck .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button:after,.ck .ck-widget>.ck-widget__type-around>.ck-widget__type-around__button:hover:after{background:linear-gradient(135deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.3));border-radius:100px;height:calc(var(--ck-widget-type-around-button-size) - 2px);width:calc(var(--ck-widget-type-around-button-size) - 2px)}.ck .ck-widget.ck-widget_with-selection-handle>.ck-widget__type-around>.ck-widget__type-around__button_before{margin-left:20px}.ck .ck-widget .ck-widget__type-around__fake-caret{animation:ck-widget-type-around-fake-caret-pulse 1s linear infinite normal forwards;background:var(--ck-color-base-text);height:1px;outline:1px solid hsla(0,0%,100%,.5);pointer-events:none}.ck .ck-widget.ck-widget_selected.ck-widget_type-around_show-fake-caret_after,.ck .ck-widget.ck-widget_selected.ck-widget_type-around_show-fake-caret_before{outline-color:transparent}.ck .ck-widget.ck-widget_type-around_show-fake-caret_after.ck-widget_selected:hover,.ck .ck-widget.ck-widget_type-around_show-fake-caret_before.ck-widget_selected:hover{outline-color:var(--ck-color-widget-hover-border)}.ck .ck-widget.ck-widget_type-around_show-fake-caret_after>.ck-widget__type-around>.ck-widget__type-around__button,.ck .ck-widget.ck-widget_type-around_show-fake-caret_before>.ck-widget__type-around>.ck-widget__type-around__button{opacity:0;pointer-events:none}.ck .ck-widget.ck-widget_type-around_show-fake-caret_after.ck-widget_selected.ck-widget_with-resizer>.ck-widget__resizer,.ck .ck-widget.ck-widget_type-around_show-fake-caret_after.ck-widget_with-selection-handle.ck-widget_selected:hover>.ck-widget__selection-handle,.ck .ck-widget.ck-widget_type-around_show-fake-caret_after.ck-widget_with-selection-handle.ck-widget_selected>.ck-widget__selection-handle,.ck .ck-widget.ck-widget_type-around_show-fake-caret_before.ck-widget_selected.ck-widget_with-resizer>.ck-widget__resizer,.ck .ck-widget.ck-widget_type-around_show-fake-caret_before.ck-widget_with-selection-handle.ck-widget_selected:hover>.ck-widget__selection-handle,.ck .ck-widget.ck-widget_type-around_show-fake-caret_before.ck-widget_with-selection-handle.ck-widget_selected>.ck-widget__selection-handle{opacity:0}.ck[dir=rtl] .ck-widget.ck-widget_with-selection-handle .ck-widget__type-around>.ck-widget__type-around__button_before{margin-left:0;margin-right:20px}.ck-editor__nested-editable.ck-editor__editable_selected .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button,.ck-editor__nested-editable.ck-editor__editable_selected .ck-widget:hover>.ck-widget__type-around>.ck-widget__type-around__button{opacity:0;pointer-events:none}.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button:not(:hover){background:var(--ck-color-widget-type-around-button-blurred-editable)}.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected>.ck-widget__type-around>.ck-widget__type-around__button:not(:hover) svg *{stroke:#999}@keyframes ck-widget-type-around-arrow-dash{0%{stroke-dashoffset:10}20%,to{stroke-dashoffset:0}}@keyframes ck-widget-type-around-arrow-tip-dash{0%,20%{stroke-dashoffset:7}40%,to{stroke-dashoffset:0}}@keyframes ck-widget-type-around-button-sonar{0%{box-shadow:0 0 0 0 hsla(var(--ck-color-focus-border-coordinates),var(--ck-color-widget-type-around-button-radar-start-alpha))}50%{box-shadow:0 0 0 5px hsla(var(--ck-color-focus-border-coordinates),var(--ck-color-widget-type-around-button-radar-end-alpha))}to{box-shadow:0 0 0 5px hsla(var(--ck-color-focus-border-coordinates),var(--ck-color-widget-type-around-button-radar-start-alpha))}}@keyframes ck-widget-type-around-fake-caret-pulse{0%{opacity:1}49%{opacity:1}50%{opacity:0}99%{opacity:0}to{opacity:1}}',"",{version:3,sources:["webpack://./../ckeditor5-widget/theme/widgettypearound.css","webpack://./../ckeditor5-theme-lark/theme/ckeditor5-widget/widgettypearound.css"],names:[],mappings:"AASC,+CACC,aAAc,CAEd,eAAgB,CADhB,iBAAkB,CAElB,2BAwBD,CAtBC,mDAGC,QAAS,CAFT,iBAAkB,CAClB,OAAQ,CAER,qCACD,CAEA,qFAGC,kBAAoB,CADpB,gDAAoD,CAGpD,0BACD,CAEA,oFAEC,mDAAuD,CACvD,mBAAqB,CAErB,yBACD,CAUA,mLACC,UAAW,CACX,aAAc,CAGd,QAAS,CAFT,iBAAkB,CAClB,OAAQ,CAER,qCACD,CAMD,2EACC,YAAa,CAEb,MAAO,CADP,iBAAkB,CAElB,OACD,CAOA,iFACC,gDAAqD,CACrD,iDACD,CAKA,wHAEC,aAAc,CADd,qDAED,CAKA,uHACC,wDAA6D,CAC7D,aACD,CAoBD,mOACC,YACD,CC3GA,MACC,wCAAyC,CACzC,wEAAyE,CACzE,8EAA+E,CAC/E,2FAA4F,CAC5F,wDAAyD,CACzD,uDAAwD,CACxD,yEACD,CAgBC,+CAGC,oDAAqD,CACrD,mBAAoB,CAFpB,+CAAgD,CAVjD,SAAU,CACV,mBAAoB,CAYnB,uMAAyM,CAJzM,8CAwED,CAhEC,uCATD,+CAUE,eA+DF,CA9DC,CAEA,mDAEC,UAAW,CAGX,cAAe,CAFf,8BAA+B,CAC/B,6BAA8B,CAH9B,UAwBD,CAlBC,uCAPD,mDAQE,eAiBF,CAhBC,CAEA,qDACC,mBAAoB,CACpB,mBAAoB,CAEpB,SAAU,CACV,qDAAsD,CACtD,kBAAmB,CACnB,oBAAqB,CACrB,qBACD,CAEA,wDACC,kBACD,CAGD,qDAIC,6DA4BD,CAtBE,kEACC,oDACD,CAEA,8DACC,wDACD,CAGD,uCAQE,qLACC,cACD,CAEF,CASD,uKA7FD,SAAU,CACV,mBA8FC,CAOD,gGACC,0DACD,CAOA,uKAEC,2DAQD,CANC,mLAIC,uEAAkF,CADlF,mBAAoB,CADpB,2DAA4D,CAD5D,0DAID,CAOD,8GACC,gBACD,CAKA,mDAGC,mFAAoF,CAOpF,oCAAqC,CARrC,UAAW,CAOX,oCAAwC,CARxC,mBAUD,CAOC,6JAEC,yBACD,CAUA,yKACC,iDACD,CAMA,uOAxKD,SAAU,CACV,mBAyKC,CAoBA,6yBACC,SACD,CASF,uHACC,aAAc,CACd,iBACD,CAYG,iRAxNF,SAAU,CACV,mBAyNE,CAQH,kIACC,qEAKD,CAHC,wIACC,WACD,CAGD,4CACC,GACC,oBACD,CACA,OACC,mBACD,CACD,CAEA,gDACC,OACC,mBACD,CACA,OACC,mBACD,CACD,CAEA,8CACC,GACC,6HACD,CACA,IACC,6HACD,CACA,GACC,+HACD,CACD,CAEA,kDACC,GACC,SACD,CACA,IACC,SACD,CACA,IACC,SACD,CACA,IACC,SACD,CACA,GACC,SACD,CACD",sourcesContent:[`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

.ck .ck-widget {
	/*
	 * Styles of the type around buttons
	 */
	& .ck-widget__type-around__button {
		display: block;
		position: absolute;
		overflow: hidden;
		z-index: var(--ck-z-default);

		& svg {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: calc(var(--ck-z-default) + 2);
		}

		&.ck-widget__type-around__button_before {
			/* Place it in the middle of the outline */
			top: calc(-0.5 * var(--ck-widget-outline-thickness));
			left: min(10%, 30px);

			transform: translateY(-50%);
		}

		&.ck-widget__type-around__button_after {
			/* Place it in the middle of the outline */
			bottom: calc(-0.5 * var(--ck-widget-outline-thickness));
			right: min(10%, 30px);

			transform: translateY(50%);
		}
	}

	/*
	 * Styles for the buttons when:
	 * - the widget is selected,
	 * - or the button is being hovered (regardless of the widget state).
	 */
	&.ck-widget_selected > .ck-widget__type-around > .ck-widget__type-around__button,
	& > .ck-widget__type-around > .ck-widget__type-around__button:hover {
		&::after {
			content: "";
			display: block;
			position: absolute;
			top: 1px;
			left: 1px;
			z-index: calc(var(--ck-z-default) + 1);
		}
	}

	/*
	 * Styles for the horizontal "fake caret" which is displayed when the user navigates using the keyboard.
	 */
	& > .ck-widget__type-around > .ck-widget__type-around__fake-caret {
		display: none;
		position: absolute;
		left: 0;
		right: 0;
	}

	/*
	 * When the widget is hovered the "fake caret" would normally be narrower than the
	 * extra outline displayed around the widget. Let's extend the "fake caret" to match
	 * the full width of the widget.
	 */
	&:hover > .ck-widget__type-around > .ck-widget__type-around__fake-caret {
		left: calc( -1 * var(--ck-widget-outline-thickness) );
		right: calc( -1 * var(--ck-widget-outline-thickness) );
	}

	/*
	 * Styles for the horizontal "fake caret" when it should be displayed before the widget (backward keyboard navigation).
	 */
	&.ck-widget_type-around_show-fake-caret_before > .ck-widget__type-around > .ck-widget__type-around__fake-caret {
		top: calc( -1 * var(--ck-widget-outline-thickness) - 1px );
		display: block;
	}

	/*
	 * Styles for the horizontal "fake caret" when it should be displayed after the widget (forward keyboard navigation).
	 */
	&.ck-widget_type-around_show-fake-caret_after > .ck-widget__type-around > .ck-widget__type-around__fake-caret {
		bottom: calc( -1 * var(--ck-widget-outline-thickness) - 1px );
		display: block;
	}
}

/*
 * Integration with the read-only mode of the editor.
 */
.ck.ck-editor__editable.ck-read-only .ck-widget__type-around {
	display: none;
}

/*
 * Integration with the restricted editing mode (feature) of the editor.
 */
.ck.ck-editor__editable.ck-restricted-editing_mode_restricted .ck-widget__type-around {
	display: none;
}

/*
 * Integration with the #isEnabled property of the WidgetTypeAround plugin.
 */
.ck.ck-editor__editable.ck-widget__type-around_disabled .ck-widget__type-around {
	display: none;
}
`,`/*
 * Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

:root {
	--ck-widget-type-around-button-size: 20px;
	--ck-color-widget-type-around-button-active: var(--ck-color-focus-border);
	--ck-color-widget-type-around-button-hover: var(--ck-color-widget-hover-border);
	--ck-color-widget-type-around-button-blurred-editable: var(--ck-color-widget-blurred-border);
	--ck-color-widget-type-around-button-radar-start-alpha: 0;
	--ck-color-widget-type-around-button-radar-end-alpha: .3;
	--ck-color-widget-type-around-button-icon: var(--ck-color-base-background);
}

@define-mixin ck-widget-type-around-button-visible {
	opacity: 1;
	pointer-events: auto;
}

@define-mixin ck-widget-type-around-button-hidden {
	opacity: 0;
	pointer-events: none;
}

.ck .ck-widget {
	/*
	 * Styles of the type around buttons
	 */
	& .ck-widget__type-around__button {
		width: var(--ck-widget-type-around-button-size);
		height: var(--ck-widget-type-around-button-size);
		background: var(--ck-color-widget-type-around-button);
		border-radius: 100px;
		transition: opacity var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve), background var(--ck-widget-handler-animation-duration) var(--ck-widget-handler-animation-curve);

		@mixin ck-widget-type-around-button-hidden;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}

		& svg {
			width: 10px;
			height: 8px;
			transform: translate(-50%,-50%);
			transition: transform .5s ease;
			margin-top: 1px;

			@media (prefers-reduced-motion: reduce) {
				transition: none;
			}

			& * {
				stroke-dasharray: 10;
				stroke-dashoffset: 0;

				fill: none;
				stroke: var(--ck-color-widget-type-around-button-icon);
				stroke-width: 1.5px;
				stroke-linecap: round;
				stroke-linejoin: round;
			}

			& line {
				stroke-dasharray: 7;
			}
		}

		&:hover {
			/*
			 * Display the "sonar" around the button when hovered.
			 */
			animation: ck-widget-type-around-button-sonar 1s ease infinite;

			/*
			 * Animate active button's icon.
			 */
			& svg {
				& polyline {
					animation: ck-widget-type-around-arrow-dash 2s linear;
				}

				& line {
					animation: ck-widget-type-around-arrow-tip-dash 2s linear;
				}
			}

			@media (prefers-reduced-motion: reduce) {
				animation: none;

				& svg {
					& polyline {
						animation: none;
					}

					& line {
						animation: none;
					}
				}
			}
		}
	}

	/*
	 * Show type around buttons when the widget gets selected or being hovered.
	 */
	&.ck-widget_selected,
	&:hover {
		& > .ck-widget__type-around > .ck-widget__type-around__button {
			@mixin ck-widget-type-around-button-visible;
		}
	}

	/*
	 * Styles for the buttons when the widget is NOT selected (but the buttons are visible
	 * and still can be hovered).
	 */
	&:not(.ck-widget_selected) > .ck-widget__type-around > .ck-widget__type-around__button {
		background: var(--ck-color-widget-type-around-button-hover);
	}

	/*
	 * Styles for the buttons when:
	 * - the widget is selected,
	 * - or the button is being hovered (regardless of the widget state).
	 */
	&.ck-widget_selected > .ck-widget__type-around > .ck-widget__type-around__button,
	& > .ck-widget__type-around > .ck-widget__type-around__button:hover {
		background: var(--ck-color-widget-type-around-button-active);

		&::after {
			width: calc(var(--ck-widget-type-around-button-size) - 2px);
			height: calc(var(--ck-widget-type-around-button-size) - 2px);
			border-radius: 100px;
			background: linear-gradient(135deg, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,.3) 100%);
		}
	}

	/*
	 * Styles for the "before" button when the widget has a selection handle. Because some space
	 * is consumed by the handle, the button must be moved slightly to the right to let it breathe.
	 */
	&.ck-widget_with-selection-handle > .ck-widget__type-around > .ck-widget__type-around__button_before {
		margin-left: 20px;
	}

	/*
	 * Styles for the horizontal "fake caret" which is displayed when the user navigates using the keyboard.
	 */
	& .ck-widget__type-around__fake-caret {
		pointer-events: none;
		height: 1px;
		animation: ck-widget-type-around-fake-caret-pulse linear 1s infinite normal forwards;

		/*
		 * The semi-transparent-outline+background combo improves the contrast
		 * when the background underneath the fake caret is dark.
		 */
		outline: solid 1px hsla(0, 0%, 100%, .5);
		background: var(--ck-color-base-text);
	}

	/*
	 * Styles of the widget when the "fake caret" is blinking (e.g. upon keyboard navigation).
	 * Despite the widget being physically selected in the model, its outline should disappear.
	 */
	&.ck-widget_selected {
		&.ck-widget_type-around_show-fake-caret_before,
		&.ck-widget_type-around_show-fake-caret_after {
			outline-color: transparent;
		}
	}

	&.ck-widget_type-around_show-fake-caret_before,
	&.ck-widget_type-around_show-fake-caret_after {
		/*
		 * When the "fake caret" is visible we simulate that the widget is not selected
		 * (despite being physically selected), so the outline color should be for the
		 * unselected widget.
		 */
		&.ck-widget_selected:hover {
			outline-color: var(--ck-color-widget-hover-border);
		}

		/*
		 * Styles of the type around buttons when the "fake caret" is blinking (e.g. upon keyboard navigation).
		 * In this state, the type around buttons would collide with the fake carets so they should disappear.
		 */
		& > .ck-widget__type-around > .ck-widget__type-around__button {
			@mixin ck-widget-type-around-button-hidden;
		}

		/*
		 * Fake horizontal caret integration with the selection handle. When the caret is visible, simply
		 * hide the handle because it intersects with the caret (and does not make much sense anyway).
		 */
		&.ck-widget_with-selection-handle {
			&.ck-widget_selected,
			&.ck-widget_selected:hover {
				& > .ck-widget__selection-handle {
					opacity: 0
				}
			}
		}

		/*
		 * Fake horizontal caret integration with the resize UI. When the caret is visible, simply
		 * hide the resize UI because it creates too much noise. It can be visible when the user
		 * hovers the widget, though.
		 */
		&.ck-widget_selected.ck-widget_with-resizer > .ck-widget__resizer {
			opacity: 0
		}
	}
}

/*
 * Styles for the "before" button when the widget has a selection handle in an RTL environment.
 * The selection handler is aligned to the right side of the widget so there is no need to create
 * additional space for it next to the "before" button.
 */
.ck[dir="rtl"] .ck-widget.ck-widget_with-selection-handle .ck-widget__type-around > .ck-widget__type-around__button_before {
	margin-left: 0;
	margin-right: 20px;
}

/*
 * Hide type around buttons when the widget is selected as a child of a selected
 * nested editable (e.g. mulit-cell table selection).
 *
 * See https://github.com/ckeditor/ckeditor5/issues/7263.
 */
.ck-editor__nested-editable.ck-editor__editable_selected {
	& .ck-widget {
		&.ck-widget_selected,
		&:hover {
			& > .ck-widget__type-around > .ck-widget__type-around__button {
				@mixin ck-widget-type-around-button-hidden;
			}
		}
	}
}

/*
 * Styles for the buttons when the widget is selected but the user clicked outside of the editor (blurred the editor).
 */
.ck-editor__editable.ck-blurred .ck-widget.ck-widget_selected > .ck-widget__type-around > .ck-widget__type-around__button:not(:hover) {
	background: var(--ck-color-widget-type-around-button-blurred-editable);

	& svg * {
		stroke: hsl(0,0%,60%);
	}
}

@keyframes ck-widget-type-around-arrow-dash {
	0% {
		stroke-dashoffset: 10;
	}
	20%, 100% {
		stroke-dashoffset: 0;
	}
}

@keyframes ck-widget-type-around-arrow-tip-dash {
	0%, 20% {
		stroke-dashoffset: 7;
	}
	40%, 100% {
		stroke-dashoffset: 0;
	}
}

@keyframes ck-widget-type-around-button-sonar {
	0% {
		box-shadow: 0 0 0 0 hsla(var(--ck-color-focus-border-coordinates), var(--ck-color-widget-type-around-button-radar-start-alpha));
	}
	50% {
		box-shadow: 0 0 0 5px hsla(var(--ck-color-focus-border-coordinates), var(--ck-color-widget-type-around-button-radar-end-alpha));
	}
	100% {
		box-shadow: 0 0 0 5px hsla(var(--ck-color-focus-border-coordinates), var(--ck-color-widget-type-around-button-radar-start-alpha));
	}
}

@keyframes ck-widget-type-around-fake-caret-pulse {
	0% {
		opacity: 1;
	}
	49% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	99% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`],sourceRoot:""}]);const w=k},935:y=>{y.exports=function(A){var g=[];return g.toString=function(){return this.map(function(x){var v="",_=x[5]!==void 0;return x[4]&&(v+="@supports (".concat(x[4],") {")),x[2]&&(v+="@media ".concat(x[2]," {")),_&&(v+="@layer".concat(x[5].length>0?" ".concat(x[5]):""," {")),v+=A(x),_&&(v+="}"),x[2]&&(v+="}"),x[4]&&(v+="}"),v}).join("")},g.i=function(x,v,_,k,w){typeof x=="string"&&(x=[[null,x,void 0]]);var D={};if(_)for(var S=0;S<this.length;S++){var B=this[S][0];B!=null&&(D[B]=!0)}for(var O=0;O<x.length;O++){var z=[].concat(x[O]);_&&D[z[0]]||(w!==void 0&&(z[5]===void 0||(z[1]="@layer".concat(z[5].length>0?" ".concat(z[5]):""," {").concat(z[1],"}")),z[5]=w),v&&(z[2]&&(z[1]="@media ".concat(z[2]," {").concat(z[1],"}")),z[2]=v),k&&(z[4]?(z[1]="@supports (".concat(z[4],") {").concat(z[1],"}"),z[4]=k):z[4]="".concat(k)),g.push(z))}},g}},62:y=>{y.exports=function(A,g){return g||(g={}),A&&(A=String(A.__esModule?A.default:A),/^['"].*['"]$/.test(A)&&(A=A.slice(1,-1)),g.hash&&(A+=g.hash),/["'() \t\n]|(%20)/.test(A)||g.needQuotes?'"'.concat(A.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):A)}},2001:y=>{y.exports=function(A){var g=A[1],x=A[3];if(!x)return g;if(typeof btoa=="function"){var v=btoa(unescape(encodeURIComponent(JSON.stringify(x)))),_="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(v),k="/*# ".concat(_," */");return[g].concat([k]).join(`
`)}return[g].join(`
`)}},2591:y=>{var A=[];function g(_){for(var k=-1,w=0;w<A.length;w++)if(A[w].identifier===_){k=w;break}return k}function x(_,k){for(var w={},D=[],S=0;S<_.length;S++){var B=_[S],O=k.base?B[0]+k.base:B[0],z=w[O]||0,$="".concat(O," ").concat(z);w[O]=z+1;var X=g($),rt={css:B[1],media:B[2],sourceMap:B[3],supports:B[4],layer:B[5]};if(X!==-1)A[X].references++,A[X].updater(rt);else{var At=v(rt,k);k.byIndex=S,A.splice(S,0,{identifier:$,updater:At,references:1})}D.push($)}return D}function v(_,k){var w=k.domAPI(k);return w.update(_),function(D){if(D){if(D.css===_.css&&D.media===_.media&&D.sourceMap===_.sourceMap&&D.supports===_.supports&&D.layer===_.layer)return;w.update(_=D)}else w.remove()}}y.exports=function(_,k){var w=x(_=_||[],k=k||{});return function(D){D=D||[];for(var S=0;S<w.length;S++){var B=g(w[S]);A[B].references--}for(var O=x(D,k),z=0;z<w.length;z++){var $=g(w[z]);A[$].references===0&&(A[$].updater(),A.splice($,1))}w=O}}},8128:y=>{var A={};y.exports=function(g,x){var v=function(_){if(A[_]===void 0){var k=document.querySelector(_);if(window.HTMLIFrameElement&&k instanceof window.HTMLIFrameElement)try{k=k.contentDocument.head}catch{k=null}A[_]=k}return A[_]}(g);if(!v)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");v.appendChild(x)}},3051:y=>{y.exports=function(A){var g=document.createElement("style");return A.setAttributes(g,A.attributes),A.insert(g,A.options),g}},8021:y=>{y.exports=function(A,g){Object.keys(g).forEach(function(x){A.setAttribute(x,g[x])})}},8639:y=>{var A,g=(A=[],function(_,k){return A[_]=k,A.filter(Boolean).join(`
`)});function x(_,k,w,D){var S;if(w)S="";else{S="",D.supports&&(S+="@supports (".concat(D.supports,") {")),D.media&&(S+="@media ".concat(D.media," {"));var B=D.layer!==void 0;B&&(S+="@layer".concat(D.layer.length>0?" ".concat(D.layer):""," {")),S+=D.css,B&&(S+="}"),D.media&&(S+="}"),D.supports&&(S+="}")}if(_.styleSheet)_.styleSheet.cssText=g(k,S);else{var O=document.createTextNode(S),z=_.childNodes;z[k]&&_.removeChild(z[k]),z.length?_.insertBefore(O,z[k]):_.appendChild(O)}}var v={singleton:null,singletonCounter:0};y.exports=function(_){if(typeof document>"u")return{update:function(){},remove:function(){}};var k=v.singletonCounter++,w=v.singleton||(v.singleton=_.insertStyleElement(_));return{update:function(D){x(w,k,!1,D)},remove:function(D){x(w,k,!0,D)}}}},4782:y=>{y.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTExLjA3NyAxNSAuOTkxLTEuNDE2YS43NS43NSAwIDEgMSAxLjIyOS44NmwtMS4xNDggMS42NGEuNzUuNzUgMCAwIDEtLjIxNy4yMDYgNS4yNTEgNS4yNTEgMCAwIDEtOC41MDMtNS45NTUuNy43IDAgMCAxIC4xMi0uMjc0bDEuMTQ3LTEuNjM5YS43NS43NSAwIDEgMSAxLjIyOC44Nkw0LjkzMyAxMC43bC4wMDYuMDAzYTMuNzUgMy43NSAwIDAgMCA2LjEzMiA0LjI5NHptNS40OTQtNS4zMzVhLjc1Ljc1IDAgMCAxLS4xMi4yNzRsLTEuMTQ3IDEuNjM5YS43NS43NSAwIDEgMS0xLjIyOC0uODZsLjg2LTEuMjNhMy43NSAzLjc1IDAgMCAwLTYuMTQ0LTQuMzAxbC0uODYgMS4yMjlhLjc1Ljc1IDAgMCAxLTEuMjI5LS44NmwxLjE0OC0xLjY0YS43NS43NSAwIDAgMSAuMjE3LS4yMDYgNS4yNTEgNS4yNTEgMCAwIDEgOC41MDMgNS45NTVtLTQuNTYzLTIuNTMyYS43NS43NSAwIDAgMSAuMTg0IDEuMDQ1bC0zLjE1NSA0LjUwNWEuNzUuNzUgMCAxIDEtMS4yMjktLjg2bDMuMTU1LTQuNTA2YS43NS43NSAwIDAgMSAxLjA0NS0uMTg0Ii8+PC9zdmc+"},9736:y=>{y.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjx0aXRsZT5GaWxsIDE8L3RpdGxlPjxwYXRoIGZpbGw9IiNGRkZGRkUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTk2Ny40ODQgMEg1Ni41MTdDMjUuMzA0IDAgMCAyNS4zMDQgMCA1Ni41MTd2OTEwLjk2NkMwIDk5OC42OTQgMjUuMjk3IDEwMjQgNTYuNTIyIDEwMjRINTQ3VjYyOEg0MTRWNDczaDEzM1YzNTkuMDI5YzAtMTMyLjI2MiA4MC43NzMtMjA0LjI4MiAxOTguNzU2LTIwNC4yODIgNTYuNTEzIDAgMTA1LjA4NiA0LjIwOCAxMTkuMjQ0IDYuMDg5VjI5OWwtODEuNjE2LjAzN2MtNjMuOTkzIDAtNzYuMzg0IDMwLjQ5Mi03Ni4zODQgNzUuMjM2VjQ3M2gxNTMuNDg3bC0xOS45ODYgMTU1SDcwN3YzOTZoMjYwLjQ4NGMzMS4yMTMgMCA1Ni41MTYtMjUuMzAzIDU2LjUxNi01Ni41MTZWNTYuNTE1QzEwMjQgMjUuMzAzIDk5OC42OTcgMCA5NjcuNDg0IDAiLz48L3N2Zz4="},657:y=>{y.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAuMzc4IiBoZWlnaHQ9IjI1NC4xNjciIHZpZXdCb3g9IjAgMCA2Ni4yNDYgNjcuMjQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjUzMSAtMjE4LjQ1NSlzY2FsZSguOTgwMTIpIj48cmVjdCB3aWR0aD0iNjAuMDk5IiBoZWlnaHQ9IjYwLjA5OSIgeD0iMTc2LjAzMSIgeT0iMjMxLjM5OSIgZmlsbD0iIzM0YTY2OCIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiIHJ4PSI1LjIzOCIgcnk9IjUuMjM4Ii8+PHBhdGggZmlsbD0iIzVjODhjNSIgZD0ibTIwNi40NzcgMjYwLjktMjguOTg3IDI4Ljk4N2E1LjIyIDUuMjIgMCAwIDAgMy43OCAxLjYxaDQ5LjYyMWMxLjY5NCAwIDMuMTktLjc5OCA0LjE0Ni0yLjAzN3oiLz48cGF0aCBmaWxsPSIjZGQ0YjNlIiBkPSJNMjI2Ljc0MiAyMjIuOTg4Yy05LjI2NiAwLTE2Ljc3NyA3LjE3LTE2Ljc3NyAxNi4wMTQuMDA3IDIuNzYyLjY2MyA1LjQ3NCAyLjA5MyA3Ljg3NS40My43MDMuODMgMS40MDggMS4xOSAyLjEwN3EuNS43NTMuOTUgMS41MDguNTE1LjcxNS45ODggMS40NGMxLjMxIDEuNzY5IDIuNSAzLjUwMiAzLjYzNyA1LjE2OC43OTMgMS4yNzUgMS42ODMgMi42NCAyLjQ2NiAzLjk5IDIuMzYzIDQuMDk0IDQuMDA3IDguMDkyIDQuNiAxMy45MTR2LjAxMmMuMTgyLjQxMi41MTYuNjY2Ljg3OS42NjcuNDAzLS4wMDEuNzY4LS4zMTQuOTMtLjc5OS42MDMtNS43NTYgMi4yMzgtOS43MjkgNC41ODUtMTMuNzk0Ljc4Mi0xLjM1IDEuNjczLTIuNzE1IDIuNDY1LTMuOTkgMS4xMzctMS42NjYgMi4zMjgtMy40IDMuNjM4LTUuMTY5cS40NzMtLjcyMy45ODgtMS40MzkuNDUtLjc1NS45NS0xLjUwOGMuMzU5LS43Ljc2LTEuNDA0IDEuMTktMi4xMDcgMS40MjYtMi40MDIgMi01LjExNCAyLjAwNC03Ljg3NSAwLTguODQ0LTcuNTExLTE2LjAxNC0xNi43NzYtMTYuMDE0IiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxlbGxpcHNlIGN4PSIyMjYuNzQyIiBjeT0iMjM5LjAwMiIgZmlsbD0iIzgwMmQyNyIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiIHJ4PSI1LjgyOCIgcnk9IjUuNTY0Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5MC4zMDEgMjM3LjI4M2MtNC42NyAwLTguNDU3IDMuODUzLTguNDU3IDguNjA2czMuNzg2IDguNjA3IDguNDU3IDguNjA3YzMuMDQzIDAgNC44MDYtLjk1OCA2LjMzNy0yLjUxNiAxLjUzLTEuNTU3IDIuMDg3LTMuOTEzIDIuMDg3LTYuMjlxLS4wMDEtLjU0My0uMDY0LTEuMDc5aC04LjI1N3YzLjA0M2g0Ljg1Yy0uMTk3Ljc1OS0uNTMxIDEuNDUtMS4wNTggMS45ODYtLjk0Mi45NTgtMi4wMjggMS41NDgtMy45MDEgMS41NDgtMi44NzYgMC01LjIwOC0yLjM3Mi01LjIwOC01LjI5OSAwLTIuOTI2IDIuMzMyLTUuMjk5IDUuMjA4LTUuMjk5IDEuMzk5IDAgMi42MTguNDA3IDMuNTg0IDEuMjkzbDIuMzgxLTIuMzhxLS4wMDEtLjAwMy0uMDA0LS4wMDVjLTEuNTg4LTEuNTI0LTMuNjItMi4yMTUtNS45NTUtMi4yMTVtNC40MyA1LjY2LjAwMy4wMDZ2LS4wMDN6IiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjxwYXRoIGZpbGw9IiNjM2MzYzMiIGQ9Im0yMTUuMTg0IDI1MS45MjktNy45OCA3Ljk3OSAyOC40NzcgMjguNDc1YTUuMiA1LjIgMCAwIDAgLjQ0OS0yLjEyM3YtMzEuMTY1Yy0uNDY5LjY3NS0uOTM0IDEuMzQ5LTEuMzgyIDIuMDA1LS43OTIgMS4yNzUtMS42ODIgMi42NC0yLjQ2NSAzLjk5LTIuMzQ3IDQuMDY1LTMuOTgyIDguMDM4LTQuNTg1IDEzLjc5NC0uMTYyLjQ4NS0uNTI3Ljc5OC0uOTMuNzk5LS4zNjMtLjAwMS0uNjk3LS4yNTUtLjg3OS0uNjY3di0uMDEyYy0uNTkzLTUuODIyLTIuMjM3LTkuODItNC42LTEzLjkxNC0uNzgzLTEuMzUtMS42NzMtMi43MTUtMi40NjYtMy45OS0xLjEzNy0xLjY2Ni0yLjMyNy0zLjQtMy42MzctNS4xNjl6Ii8+PHBhdGggZmlsbD0iI2ZkZGM0ZiIgZD0ibTIxMi45ODMgMjQ4LjQ5NS0zNi45NTIgMzYuOTUzdi44MTJhNS4yMjcgNS4yMjcgMCAwIDAgNS4yMzggNS4yMzhoMS4wMTVsMzUuNjY2LTM1LjY2NmExMzYgMTM2IDAgMCAwLTIuNzY0LTMuOSAzOCAzOCAwIDAgMC0uOTg5LTEuNDQgMzUgMzUgMCAwIDAtLjk1LTEuNTA4Yy0uMDgzLS4xNjItLjE3Ni0uMzI2LS4yNjQtLjQ4OSIgcGFpbnQtb3JkZXI9Im1hcmtlcnMgc3Ryb2tlIGZpbGwiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMjExLjk5OCAyNjEuMDgzLTYuMTUyIDYuMTUxIDI0LjI2NCAyNC4yNjRoLjc4MWE1LjIyNyA1LjIyNyAwIDAgMCA1LjIzOS01LjIzOHYtMS4wNDV6IiBwYWludC1vcmRlcj0ibWFya2VycyBzdHJva2UgZmlsbCIvPjwvZz48L3N2Zz4="},7784:y=>{y.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj48cGF0aCBkPSJNNDAwIDIwMGMwIDExMC41LTg5LjUgMjAwLTIwMCAyMDBTMCAzMTAuNSAwIDIwMCA4OS41IDAgMjAwIDBzMjAwIDg5LjUgMjAwIDIwME0xNjMuNCAzMDUuNWM4OC43IDAgMTM3LjItNzMuNSAxMzcuMi0xMzcuMiAwLTIuMSAwLTQuMi0uMS02LjIgOS40LTYuOCAxNy42LTE1LjMgMjQuMS0yNS04LjYgMy44LTE3LjkgNi40LTI3LjcgNy42IDEwLTYgMTcuNi0xNS40IDIxLjItMjYuNy05LjMgNS41LTE5LjYgOS41LTMwLjYgMTEuNy04LjgtOS40LTIxLjMtMTUuMi0zNS4yLTE1LjItMjYuNiAwLTQ4LjIgMjEuNi00OC4yIDQ4LjIgMCAzLjguNCA3LjUgMS4zIDExLTQwLjEtMi03NS42LTIxLjItOTkuNC01MC40LTQuMSA3LjEtNi41IDE1LjQtNi41IDI0LjIgMCAxNi43IDguNSAzMS41IDIxLjUgNDAuMS03LjktLjItMTUuMy0yLjQtMjEuOC02di42YzAgMjMuNCAxNi42IDQyLjggMzguNyA0Ny4zLTQgMS4xLTguMyAxLjctMTIuNyAxLjctMy4xIDAtNi4xLS4zLTkuMS0uOSA2LjEgMTkuMiAyMy45IDMzLjEgNDUgMzMuNS0xNi41IDEyLjktMzcuMyAyMC42LTU5LjkgMjAuNi0zLjkgMC03LjctLjItMTEuNS0uNyAyMS4xIDEzLjggNDYuNSAyMS44IDczLjcgMjEuOCIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg=="},6341:y=>{y.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTA0IiBoZWlnaHQ9IjUwNCIgdmlld0JveD0iMCAwIDUwNCA1MDQiPjx0aXRsZT5nbHlwaC1sb2dvX01heTIwMTY8L3RpdGxlPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMCAuMTU5aDUwMy44NDFWNTAzLjk0SDB6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTI1MS45MjEuMTU5Yy02OC40MTggMC03Ni45OTcuMjktMTAzLjg2NyAxLjUxNi0yNi44MTQgMS4yMjMtNDUuMTI3IDUuNDgyLTYxLjE1MSAxMS43MS0xNi41NjYgNi40MzctMzAuNjE1IDE1LjA1MS00NC42MjEgMjkuMDU2LTE0LjAwNSAxNC4wMDYtMjIuNjE5IDI4LjA1NS0yOS4wNTYgNDQuNjIxLTYuMjI4IDE2LjAyNC0xMC40ODcgMzQuMzM3LTExLjcxIDYxLjE1MUMuMjkgMTc1LjA4MyAwIDE4My42NjIgMCAyNTIuMDhjMCA2OC40MTcuMjkgNzYuOTk2IDEuNTE2IDEwMy44NjYgMS4yMjMgMjYuODE0IDUuNDgyIDQ1LjEyNyAxMS43MSA2MS4xNTEgNi40MzcgMTYuNTY2IDE1LjA1MSAzMC42MTUgMjkuMDU2IDQ0LjYyMSAxNC4wMDYgMTQuMDA1IDI4LjA1NSAyMi42MTkgNDQuNjIxIDI5LjA1NyAxNi4wMjQgNi4yMjcgMzQuMzM3IDEwLjQ4NiA2MS4xNTEgMTEuNzA5IDI2Ljg3IDEuMjI2IDM1LjQ0OSAxLjUxNiAxMDMuODY3IDEuNTE2IDY4LjQxNyAwIDc2Ljk5Ni0uMjkgMTAzLjg2Ni0xLjUxNiAyNi44MTQtMS4yMjMgNDUuMTI3LTUuNDgyIDYxLjE1MS0xMS43MDkgMTYuNTY2LTYuNDM4IDMwLjYxNS0xNS4wNTIgNDQuNjIxLTI5LjA1NyAxNC4wMDUtMTQuMDA2IDIyLjYxOS0yOC4wNTUgMjkuMDU3LTQ0LjYyMSA2LjIyNy0xNi4wMjQgMTAuNDg2LTM0LjMzNyAxMS43MDktNjEuMTUxIDEuMjI2LTI2Ljg3IDEuNTE2LTM1LjQ0OSAxLjUxNi0xMDMuODY2IDAtNjguNDE4LS4yOS03Ni45OTctMS41MTYtMTAzLjg2Ny0xLjIyMy0yNi44MTQtNS40ODItNDUuMTI3LTExLjcwOS02MS4xNTEtNi40MzgtMTYuNTY2LTE1LjA1Mi0zMC42MTUtMjkuMDU3LTQ0LjYyMS0xNC4wMDYtMTQuMDA1LTI4LjA1NS0yMi42MTktNDQuNjIxLTI5LjA1Ni0xNi4wMjQtNi4yMjgtMzQuMzM3LTEwLjQ4Ny02MS4xNTEtMTEuNzFDMzI4LjkxNy40NDkgMzIwLjMzOC4xNTkgMjUxLjkyMS4xNTltMCA0NS4zOTFjNjcuMjY1IDAgNzUuMjMzLjI1NyAxMDEuNzk3IDEuNDY5IDI0LjU2MiAxLjEyIDM3LjkwMSA1LjIyNCA0Ni43NzggOC42NzQgMTEuNzU5IDQuNTcgMjAuMTUxIDEwLjAyOSAyOC45NjYgMTguODQ1czE0LjI3NSAxNy4yMDcgMTguODQ1IDI4Ljk2NmMzLjQ1IDguODc3IDcuNTU0IDIyLjIxNiA4LjY3NCA0Ni43NzggMS4yMTIgMjYuNTY0IDEuNDY5IDM0LjUzMiAxLjQ2OSAxMDEuNzk4IDAgNjcuMjY1LS4yNTcgNzUuMjMzLTEuNDY5IDEwMS43OTctMS4xMiAyNC41NjItNS4yMjQgMzcuOTAxLTguNjc0IDQ2Ljc3OC00LjU3IDExLjc1OS0xMC4wMjkgMjAuMTUxLTE4Ljg0NSAyOC45NjZzLTE3LjIwNyAxNC4yNzUtMjguOTY2IDE4Ljg0NWMtOC44NzcgMy40NS0yMi4yMTYgNy41NTQtNDYuNzc4IDguNjc0LTI2LjU2IDEuMjEyLTM0LjUyNyAxLjQ2OS0xMDEuNzk3IDEuNDY5LTY3LjI3MSAwLTc1LjIzNy0uMjU3LTEwMS43OTgtMS40NjktMjQuNTYyLTEuMTItMzcuOTAxLTUuMjI0LTQ2Ljc3OC04LjY3NC0xMS43NTktNC41Ny0yMC4xNTEtMTAuMDI5LTI4Ljk2Ni0xOC44NDVzLTE0LjI3NS0xNy4yMDctMTguODQ1LTI4Ljk2NmMtMy40NS04Ljg3Ny03LjU1NC0yMi4yMTYtOC42NzQtNDYuNzc4LTEuMjEyLTI2LjU2NC0xLjQ2OS0zNC41MzItMS40NjktMTAxLjc5NyAwLTY3LjI2Ni4yNTctNzUuMjM0IDEuNDY5LTEwMS43OTggMS4xMi0yNC41NjIgNS4yMjQtMzcuOTAxIDguNjc0LTQ2Ljc3OCA0LjU3LTExLjc1OSAxMC4wMjktMjAuMTUxIDE4Ljg0NS0yOC45NjZzMTcuMjA3LTE0LjI3NSAyOC45NjYtMTguODQ1YzguODc3LTMuNDUgMjIuMjE2LTcuNTU0IDQ2Ljc3OC04LjY3NCAyNi41NjQtMS4yMTIgMzQuNTMyLTEuNDY5IDEwMS43OTgtMS40NjkiIG1hc2s9InVybCgjYikiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjUxLjkyMSAzMzYuMDUzYy00Ni4zNzggMC04My45NzQtMzcuNTk2LTgzLjk3NC04My45NzNzMzcuNTk2LTgzLjk3NCA4My45NzQtODMuOTc0YzQ2LjM3NyAwIDgzLjk3MyAzNy41OTYgODMuOTczIDgzLjk3NCAwIDQ2LjM3Ny0zNy41OTYgODMuOTczLTgzLjk3MyA4My45NzNtMC0yMTMuMzM4Yy03MS40NDcgMC0xMjkuMzY1IDU3LjkxOC0xMjkuMzY1IDEyOS4zNjUgMCA3MS40NDYgNTcuOTE4IDEyOS4zNjQgMTI5LjM2NSAxMjkuMzY0IDcxLjQ0NiAwIDEyOS4zNjQtNTcuOTE4IDEyOS4zNjQtMTI5LjM2NCAwLTcxLjQ0Ny01Ny45MTgtMTI5LjM2NS0xMjkuMzY0LTEyOS4zNjVNNDE2LjYyNyAxMTcuNjA0YzAgMTYuNjk2LTEzLjUzNSAzMC4yMy0zMC4yMzEgMzAuMjMtMTYuNjk1IDAtMzAuMjMtMTMuNTM0LTMwLjIzLTMwLjIzczEzLjUzNS0zMC4yMzEgMzAuMjMtMzAuMjMxYzE2LjY5NiAwIDMwLjIzMSAxMy41MzUgMzAuMjMxIDMwLjIzMSIvPjwvZz48L3N2Zz4="}},Z={};function T(y){var A=Z[y];if(A!==void 0)return A.exports;var g=Z[y]={id:y,exports:{}};return Y[y](g,g.exports,T),g.exports}T.m=Y,T.n=y=>{var A=y&&y.__esModule?()=>y.default:()=>y;return T.d(A,{a:A}),A},T.d=(y,A)=>{for(var g in A)T.o(A,g)&&!T.o(y,g)&&Object.defineProperty(y,g,{enumerable:!0,get:A[g]})},T.o=(y,A)=>Object.prototype.hasOwnProperty.call(y,A),T.b=document.baseURI||self.location.href;var xt={};return(()=>{let y;T.d(xt,{default:()=>du});try{y={window,document}}catch{y={window:{},document:{}}}const A=y;function g(){try{return navigator.userAgent.toLowerCase()}catch{return""}}const x=g(),v={isMac:_(x),isWindows:k(x),isGecko:w(x),isSafari:D(x),isiOS:S(x),isAndroid:B(x),isBlink:O(x),get isMediaForcedColors(){return!!A.window.matchMedia&&A.window.matchMedia("(forced-colors: active)").matches},get isMotionReduced(){return!!A.window.matchMedia&&A.window.matchMedia("(prefers-reduced-motion)").matches},features:{isRegExpUnicodePropertySupported:z()}};function _(o){return o.indexOf("macintosh")>-1}function k(o){return o.indexOf("windows")>-1}function w(o){return!!o.match(/gecko\/\d+/)}function D(o){return o.indexOf(" applewebkit/")>-1&&o.indexOf("chrome")===-1}function S(o){return!!o.match(/iphone|ipad/i)||_(o)&&navigator.maxTouchPoints>0}function B(o){return o.indexOf("android")>-1}function O(o){return o.indexOf("chrome/")>-1&&o.indexOf("edge/")<0}function z(){let o=!1;try{o="ć".search(new RegExp("[\\p{L}]","u"))===0}catch{}return o}function $(o,t,e,n){e=e||function(c,l){return c===l};const i=Array.isArray(o)?o:Array.prototype.slice.call(o),r=Array.isArray(t)?t:Array.prototype.slice.call(t),s=function(c,l,d){const u=X(c,l,d);if(u===-1)return{firstIndex:-1,lastIndexOld:-1,lastIndexNew:-1};const h=rt(c,u),m=rt(l,u),p=X(h,m,d),f=c.length-p,b=l.length-p;return{firstIndex:u,lastIndexOld:f,lastIndexNew:b}}(i,r,e);return n?function(c,l){const{firstIndex:d,lastIndexOld:u,lastIndexNew:h}=c;if(d===-1)return Array(l).fill("equal");let m=[];return d>0&&(m=m.concat(Array(d).fill("equal"))),h-d>0&&(m=m.concat(Array(h-d).fill("insert"))),u-d>0&&(m=m.concat(Array(u-d).fill("delete"))),h<l&&(m=m.concat(Array(l-h).fill("equal"))),m}(s,r.length):function(c,l){const d=[],{firstIndex:u,lastIndexOld:h,lastIndexNew:m}=l;return m-u>0&&d.push({index:u,type:"insert",values:c.slice(u,m)}),h-u>0&&d.push({index:u+(m-u),type:"delete",howMany:h-u}),d}(r,s)}function X(o,t,e){for(let n=0;n<Math.max(o.length,t.length);n++)if(o[n]===void 0||t[n]===void 0||!e(o[n],t[n]))return n;return-1}function rt(o,t){return o.slice(t).reverse()}function At(o,t,e){e=e||function(f,b){return f===b};const n=o.length,i=t.length;if(n>200||i>200||n+i>300)return At.fastDiff(o,t,e,!0);let r,s;if(i<n){const f=o;o=t,t=f,r="delete",s="insert"}else r="insert",s="delete";const a=o.length,c=t.length,l=c-a,d={},u={};function h(f){const b=(u[f-1]!==void 0?u[f-1]:-1)+1,C=u[f+1]!==void 0?u[f+1]:-1,I=b>C?-1:1;d[f+I]&&(d[f]=d[f+I].slice(0)),d[f]||(d[f]=[]),d[f].push(b>C?r:s);let M=Math.max(b,C),P=M-f;for(;P<a&&M<c&&e(o[P],t[M]);)P++,M++,d[f].push("equal");return M}let m,p=0;do{for(m=-p;m<l;m++)u[m]=h(m);for(m=l+p;m>l;m--)u[m]=h(m);u[l]=h(l),p++}while(u[l]!==c);return d[l].slice(1)}At.fastDiff=$;const Vt=function(){return function o(){o.called=!0}};class Zt{constructor(t,e){this.source=t,this.name=e,this.path=[],this.stop=Vt(),this.off=Vt()}}const Ht=new Array(256).fill("").map((o,t)=>("0"+t.toString(16)).slice(-2));function se(){const[o,t,e,n]=crypto.getRandomValues(new Uint32Array(4));return"e"+Ht[255&o]+Ht[o>>8&255]+Ht[o>>16&255]+Ht[o>>24&255]+Ht[255&t]+Ht[t>>8&255]+Ht[t>>16&255]+Ht[t>>24&255]+Ht[255&e]+Ht[e>>8&255]+Ht[e>>16&255]+Ht[e>>24&255]+Ht[255&n]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]}const Ge={get(o="normal"){return typeof o!="number"?this[o]||this.normal:o},highest:1e5,high:1e3,normal:0,low:-1e3,lowest:-1e5};function mu(o,t){const e=Ge.get(t.priority);for(let n=0;n<o.length;n++)if(Ge.get(o[n].priority)<e)return void o.splice(n,0,t);o.push(t)}class E extends Error{constructor(t,e,n){super(function(i,r){const s=new WeakSet,a=(d,u)=>{if(typeof u=="object"&&u!==null){if(s.has(u))return`[object ${u.constructor.name}]`;s.add(u)}return u},c=r?` ${JSON.stringify(r,a)}`:"",l=gu(i);return i+c+l}(t,n)),this.name="CKEditorError",this.context=e,this.data=n}is(t){return t==="CKEditorError"}static rethrowUnexpectedError(t,e){if(t.is&&t.is("CKEditorError"))throw t;const n=new E(t.message,e);throw n.stack=t.stack,n}}function st(o,t){console.warn(...pu(o,t))}function Jc(o,t){console.error(...pu(o,t))}function gu(o){return`
Read more: https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html#error-${o}`}function pu(o,t){const e=gu(o);return t?[o,t,e]:[o,e]}const Mb="43.3.1",Bb=new Date(2024,10,6);if(globalThis.CKEDITOR_VERSION)throw new E("ckeditor-duplicated-modules",null);globalThis.CKEDITOR_VERSION=Mb;const Sn=Symbol("listeningTo"),Xc=Symbol("emitterId"),ze=Symbol("delegations"),ku=ut(Object);function ut(o){return o?class extends o{on(t,e,n){this.listenTo(this,t,e,n)}once(t,e,n){let i=!1;this.listenTo(this,t,(r,...s)=>{i||(i=!0,r.off(),e.call(this,r,...s))},n)}off(t,e){this.stopListening(this,t,e)}listenTo(t,e,n,i={}){let r,s;this[Sn]||(this[Sn]={});const a=this[Sn];tl(t)||fu(t);const c=tl(t);(r=a[c])||(r=a[c]={emitter:t,callbacks:{}}),(s=r.callbacks[e])||(s=r.callbacks[e]=[]),s.push(n),function(l,d,u,h,m){d._addEventListener?d._addEventListener(u,h,m):l._addEventListener.call(d,u,h,m)}(this,t,e,n,i)}stopListening(t,e,n){const i=this[Sn];let r=t&&tl(t);const s=i&&r?i[r]:void 0,a=s&&e?s.callbacks[e]:void 0;if(!(!i||t&&!s||e&&!a))if(n)nl(this,t,e,n),a.indexOf(n)!==-1&&(a.length===1?delete s.callbacks[e]:nl(this,t,e,n));else if(a){for(;n=a.pop();)nl(this,t,e,n);delete s.callbacks[e]}else if(s){for(e in s.callbacks)this.stopListening(t,e);delete i[r]}else{for(r in i)this.stopListening(i[r].emitter);delete this[Sn]}}fire(t,...e){try{const n=t instanceof Zt?t:new Zt(this,t),i=n.name;let r=wu(this,i);if(n.path.push(this),r){const a=[n,...e];r=Array.from(r);for(let c=0;c<r.length&&(r[c].callback.apply(this,a),n.off.called&&(delete n.off.called,this._removeEventListener(i,r[c].callback)),!n.stop.called);c++);}const s=this[ze];if(s){const a=s.get(i),c=s.get("*");a&&Au(a,n,e),c&&Au(c,n,e)}return n.return}catch(n){E.rethrowUnexpectedError(n,this)}}delegate(...t){return{to:(e,n)=>{this[ze]||(this[ze]=new Map),t.forEach(i=>{const r=this[ze].get(i);r?r.set(e,n):this[ze].set(i,new Map([[e,n]]))})}}}stopDelegating(t,e){if(this[ze])if(t)if(e){const n=this[ze].get(t);n&&n.delete(e)}else this[ze].delete(t);else this[ze].clear()}_addEventListener(t,e,n){(function(s,a){const c=bu(s);if(c[a])return;let l=a,d=null;const u=[];for(;l!==""&&!c[l];)c[l]={callbacks:[],childEvents:[]},u.push(c[l]),d&&c[l].childEvents.push(d),d=l,l=l.substr(0,l.lastIndexOf(":"));if(l!==""){for(const h of u)h.callbacks=c[l].callbacks.slice();c[l].childEvents.push(d)}})(this,t);const i=el(this,t),r={callback:e,priority:Ge.get(n.priority)};for(const s of i)mu(s,r)}_removeEventListener(t,e){const n=el(this,t);for(const i of n)for(let r=0;r<i.length;r++)i[r].callback==e&&(i.splice(r,1),r--)}}:ku}function fu(o,t){o[Xc]||(o[Xc]=t||se())}function tl(o){return o[Xc]}function bu(o){return o._events||Object.defineProperty(o,"_events",{value:{}}),o._events}function el(o,t){const e=bu(o)[t];if(!e)return[];let n=[e.callbacks];for(let i=0;i<e.childEvents.length;i++){const r=el(o,e.childEvents[i]);n=n.concat(r)}return n}function wu(o,t){let e;return o._events&&(e=o._events[t])&&e.callbacks.length?e.callbacks:t.indexOf(":")>-1?wu(o,t.substr(0,t.lastIndexOf(":"))):null}function Au(o,t,e){for(let[n,i]of o){i?typeof i=="function"&&(i=i(t.name)):i=t.name;const r=new Zt(t.source,i);r.path=[...t.path],n.fire(r,...e)}}function nl(o,t,e,n){t._removeEventListener?t._removeEventListener(e,n):o._removeEventListener.call(t,e,n)}["on","once","off","listenTo","stopListening","fire","delegate","stopDelegating","_addEventListener","_removeEventListener"].forEach(o=>{ut[o]=ku.prototype[o]});const _t=function(o){var t=typeof o;return o!=null&&(t=="object"||t=="function")},Fr=Symbol("observableProperties"),jr=Symbol("boundObservables"),Vr=Symbol("boundProperties"),Mn=Symbol("decoratedMethods"),_u=Symbol("decoratedOriginal"),Cu=gt(ut());function gt(o){var t;if(!o)return Cu;class e extends(t=o,t){set(i,r){if(_t(i))return void Object.keys(i).forEach(a=>{this.set(a,i[a])},this);il(this);const s=this[Fr];if(i in this&&!s.has(i))throw new E("observable-set-cannot-override",this);Object.defineProperty(this,i,{enumerable:!0,configurable:!0,get:()=>s.get(i),set(a){const c=s.get(i);let l=this.fire(`set:${i}`,i,a,c);l===void 0&&(l=a),c===l&&s.has(i)||(s.set(i,l),this.fire(`change:${i}`,i,l,c))}}),this[i]=r}bind(...i){if(!i.length||!vu(i))throw new E("observable-bind-wrong-properties",this);if(new Set(i).size!==i.length)throw new E("observable-bind-duplicate-properties",this);il(this);const r=this[Vr];i.forEach(a=>{if(r.has(a))throw new E("observable-bind-rebind",this)});const s=new Map;return i.forEach(a=>{const c={property:a,to:[]};r.set(a,c),s.set(a,c)}),{to:Tb,toMany:Nb,_observable:this,_bindProperties:i,_to:[],_bindings:s}}unbind(...i){if(!this[Fr])return;const r=this[Vr],s=this[jr];if(i.length){if(!vu(i))throw new E("observable-unbind-wrong-properties",this);i.forEach(a=>{const c=r.get(a);c&&(c.to.forEach(([l,d])=>{const u=s.get(l),h=u[d];h.delete(c),h.size||delete u[d],Object.keys(u).length||(s.delete(l),this.stopListening(l,"change"))}),r.delete(a))})}else s.forEach((a,c)=>{this.stopListening(c,"change")}),s.clear(),r.clear()}decorate(i){il(this);const r=this[i];if(!r)throw new E("observablemixin-cannot-decorate-undefined",this,{object:this,methodName:i});this.on(i,(s,a)=>{s.return=r.apply(this,a)}),this[i]=function(...s){return this.fire(i,s)},this[i][_u]=r,this[Mn]||(this[Mn]=[]),this[Mn].push(i)}stopListening(i,r,s){if(!i&&this[Mn]){for(const a of this[Mn])this[a]=this[a][_u];delete this[Mn]}super.stopListening(i,r,s)}}return e}function il(o){o[Fr]||(Object.defineProperty(o,Fr,{value:new Map}),Object.defineProperty(o,jr,{value:new Map}),Object.defineProperty(o,Vr,{value:new Map}))}function Tb(...o){const t=function(...r){if(!r.length)throw new E("observable-bind-to-parse-error",null);const s={to:[]};let a;return typeof r[r.length-1]=="function"&&(s.callback=r.pop()),r.forEach(c=>{if(typeof c=="string")a.properties.push(c);else{if(typeof c!="object")throw new E("observable-bind-to-parse-error",null);a={observable:c,properties:[]},s.to.push(a)}}),s}(...o),e=Array.from(this._bindings.keys()),n=e.length;if(!t.callback&&t.to.length>1)throw new E("observable-bind-to-no-callback",this);if(n>1&&t.callback)throw new E("observable-bind-to-extra-callback",this);var i;t.to.forEach(r=>{if(r.properties.length&&r.properties.length!==n)throw new E("observable-bind-to-properties-length",this);r.properties.length||(r.properties=this._bindProperties)}),this._to=t.to,t.callback&&(this._bindings.get(e[0]).callback=t.callback),i=this._observable,this._to.forEach(r=>{const s=i[jr];let a;s.get(r.observable)||i.listenTo(r.observable,"change",(c,l)=>{a=s.get(r.observable)[l],a&&a.forEach(d=>{yu(i,d.property)})})}),function(r){let s;r._bindings.forEach((a,c)=>{r._to.forEach(l=>{s=l.properties[a.callback?0:r._bindProperties.indexOf(c)],a.to.push([l.observable,s]),function(d,u,h,m){const p=d[jr],f=p.get(h),b=f||{};b[m]||(b[m]=new Set),b[m].add(u),f||p.set(h,b)}(r._observable,a,l.observable,s)})})}(this),this._bindProperties.forEach(r=>{yu(this._observable,r)})}function Nb(o,t,e){if(this._bindings.size>1)throw new E("observable-bind-to-many-not-one-binding",this);this.to(...function(n,i){const r=n.map(s=>[s,i]);return Array.prototype.concat.apply([],r)}(o,t),e)}function vu(o){return o.every(t=>typeof t=="string")}function yu(o,t){const e=o[Vr].get(t);let n;e.callback?n=e.callback.apply(o,e.to.map(i=>i[0][i[1]])):(n=e.to[0],n=n[0][n[1]]),Object.prototype.hasOwnProperty.call(o,t)?o[t]=n:o.set(t,n)}["set","bind","unbind","decorate","on","once","off","listenTo","stopListening","fire","delegate","stopDelegating","_addEventListener","_removeEventListener"].forEach(o=>{gt[o]=Cu.prototype[o]});class Pb{constructor(){this._replacedElements=[]}replace(t,e){this._replacedElements.push({element:t,newElement:e}),t.style.display="none",e&&t.parentNode.insertBefore(e,t.nextSibling)}restore(){this._replacedElements.forEach(({element:t,newElement:e})=>{t.style.display="",e&&e.remove()}),this._replacedElements=[]}}function ol(o){let t=0;for(const e of o)t++;return t}function Gt(o,t){const e=Math.min(o.length,t.length);for(let n=0;n<e;n++)if(o[n]!=t[n])return n;return o.length==t.length?"same":o.length<t.length?"prefix":"extension"}function Jt(o){return!(!o||!o[Symbol.iterator])}const xu=typeof Qc=="object"&&Qc&&Qc.Object===Object&&Qc;var Lb=typeof self=="object"&&self&&self.Object===Object&&self;const ke=xu||Lb||Function("return this")(),De=ke.Symbol;var Eu=Object.prototype,zb=Eu.hasOwnProperty,Ob=Eu.toString,di=De?De.toStringTag:void 0;const Rb=function(o){var t=zb.call(o,di),e=o[di];try{o[di]=void 0;var n=!0}catch{}var i=Ob.call(o);return n&&(t?o[di]=e:delete o[di]),i};var Fb=Object.prototype.toString;const jb=function(o){return Fb.call(o)};var Du=De?De.toStringTag:void 0;const We=function(o){return o==null?o===void 0?"[object Undefined]":"[object Null]":Du&&Du in Object(o)?Rb(o):jb(o)},Xt=Array.isArray,ae=function(o){return o!=null&&typeof o=="object"},Iu=function(o){return typeof o=="string"||!Xt(o)&&ae(o)&&We(o)=="[object String]"};function ce(o,t,e={},n=[]){const i=e&&e.xmlns,r=i?o.createElementNS(i,t):o.createElement(t);for(const s in e)r.setAttribute(s,e[s]);!Iu(n)&&Jt(n)||(n=[n]);for(let s of n)Iu(s)&&(s=o.createTextNode(s)),r.appendChild(s);return r}const Su=function(o,t){return function(e){return o(t(e))}},rl=Su(Object.getPrototypeOf,Object);var Vb=Function.prototype,Hb=Object.prototype,Mu=Vb.toString,Ub=Hb.hasOwnProperty,qb=Mu.call(Object);const te=function(o){if(!ae(o)||We(o)!="[object Object]")return!1;var t=rl(o);if(t===null)return!0;var e=Ub.call(t,"constructor")&&t.constructor;return typeof e=="function"&&e instanceof e&&Mu.call(e)==qb},Gb=function(){this.__data__=[],this.size=0},ui=function(o,t){return o===t||o!=o&&t!=t},Hr=function(o,t){for(var e=o.length;e--;)if(ui(o[e][0],t))return e;return-1};var Wb=Array.prototype.splice;const Kb=function(o){var t=this.__data__,e=Hr(t,o);return!(e<0)&&(e==t.length-1?t.pop():Wb.call(t,e,1),--this.size,!0)},$b=function(o){var t=this.__data__,e=Hr(t,o);return e<0?void 0:t[e][1]},Yb=function(o){return Hr(this.__data__,o)>-1},Qb=function(o,t){var e=this.__data__,n=Hr(e,o);return n<0?(++this.size,e.push([o,t])):e[n][1]=t,this};function Bn(o){var t=-1,e=o==null?0:o.length;for(this.clear();++t<e;){var n=o[t];this.set(n[0],n[1])}}Bn.prototype.clear=Gb,Bn.prototype.delete=Kb,Bn.prototype.get=$b,Bn.prototype.has=Yb,Bn.prototype.set=Qb;const Ur=Bn,Zb=function(){this.__data__=new Ur,this.size=0},Jb=function(o){var t=this.__data__,e=t.delete(o);return this.size=t.size,e},Xb=function(o){return this.__data__.get(o)},tw=function(o){return this.__data__.has(o)},dn=function(o){if(!_t(o))return!1;var t=We(o);return t=="[object Function]"||t=="[object GeneratorFunction]"||t=="[object AsyncFunction]"||t=="[object Proxy]"},sl=ke["__core-js_shared__"];var Bu=function(){var o=/[^.]+$/.exec(sl&&sl.keys&&sl.keys.IE_PROTO||"");return o?"Symbol(src)_1."+o:""}();const ew=function(o){return!!Bu&&Bu in o};var nw=Function.prototype.toString;const un=function(o){if(o!=null){try{return nw.call(o)}catch{}try{return o+""}catch{}}return""};var iw=/^\[object .+?Constructor\]$/,ow=Function.prototype,rw=Object.prototype,sw=ow.toString,aw=rw.hasOwnProperty,cw=RegExp("^"+sw.call(aw).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const lw=function(o){return!(!_t(o)||ew(o))&&(dn(o)?cw:iw).test(un(o))},dw=function(o,t){return o==null?void 0:o[t]},hn=function(o,t){var e=dw(o,t);return lw(e)?e:void 0},hi=hn(ke,"Map"),mi=hn(Object,"create"),uw=function(){this.__data__=mi?mi(null):{},this.size=0},hw=function(o){var t=this.has(o)&&delete this.__data__[o];return this.size-=t?1:0,t};var mw=Object.prototype.hasOwnProperty;const gw=function(o){var t=this.__data__;if(mi){var e=t[o];return e==="__lodash_hash_undefined__"?void 0:e}return mw.call(t,o)?t[o]:void 0};var pw=Object.prototype.hasOwnProperty;const kw=function(o){var t=this.__data__;return mi?t[o]!==void 0:pw.call(t,o)},fw=function(o,t){var e=this.__data__;return this.size+=this.has(o)?0:1,e[o]=mi&&t===void 0?"__lodash_hash_undefined__":t,this};function Tn(o){var t=-1,e=o==null?0:o.length;for(this.clear();++t<e;){var n=o[t];this.set(n[0],n[1])}}Tn.prototype.clear=uw,Tn.prototype.delete=hw,Tn.prototype.get=gw,Tn.prototype.has=kw,Tn.prototype.set=fw;const Tu=Tn,bw=function(){this.size=0,this.__data__={hash:new Tu,map:new(hi||Ur),string:new Tu}},ww=function(o){var t=typeof o;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?o!=="__proto__":o===null},qr=function(o,t){var e=o.__data__;return ww(t)?e[typeof t=="string"?"string":"hash"]:e.map},Aw=function(o){var t=qr(this,o).delete(o);return this.size-=t?1:0,t},_w=function(o){return qr(this,o).get(o)},Cw=function(o){return qr(this,o).has(o)},vw=function(o,t){var e=qr(this,o),n=e.size;return e.set(o,t),this.size+=e.size==n?0:1,this};function Nn(o){var t=-1,e=o==null?0:o.length;for(this.clear();++t<e;){var n=o[t];this.set(n[0],n[1])}}Nn.prototype.clear=bw,Nn.prototype.delete=Aw,Nn.prototype.get=_w,Nn.prototype.has=Cw,Nn.prototype.set=vw;const Gr=Nn,yw=function(o,t){var e=this.__data__;if(e instanceof Ur){var n=e.__data__;if(!hi||n.length<199)return n.push([o,t]),this.size=++e.size,this;e=this.__data__=new Gr(n)}return e.set(o,t),this.size=e.size,this};function Pn(o){var t=this.__data__=new Ur(o);this.size=t.size}Pn.prototype.clear=Zb,Pn.prototype.delete=Jb,Pn.prototype.get=Xb,Pn.prototype.has=tw,Pn.prototype.set=yw;const Ln=Pn,xw=function(o,t){for(var e=-1,n=o==null?0:o.length;++e<n&&t(o[e],e,o)!==!1;);return o},Wr=function(){try{var o=hn(Object,"defineProperty");return o({},"",{}),o}catch{}}(),Kr=function(o,t,e){t=="__proto__"&&Wr?Wr(o,t,{configurable:!0,enumerable:!0,value:e,writable:!0}):o[t]=e};var Ew=Object.prototype.hasOwnProperty;const al=function(o,t,e){var n=o[t];Ew.call(o,t)&&ui(n,e)&&(e!==void 0||t in o)||Kr(o,t,e)},zn=function(o,t,e,n){var i=!e;e||(e={});for(var r=-1,s=t.length;++r<s;){var a=t[r],c=n?n(e[a],o[a],a,e,o):void 0;c===void 0&&(c=o[a]),i?Kr(e,a,c):al(e,a,c)}return e},Dw=function(o,t){for(var e=-1,n=Array(o);++e<o;)n[e]=t(e);return n},Nu=function(o){return ae(o)&&We(o)=="[object Arguments]"};var Pu=Object.prototype,Iw=Pu.hasOwnProperty,Sw=Pu.propertyIsEnumerable;const $r=Nu(function(){return arguments}())?Nu:function(o){return ae(o)&&Iw.call(o,"callee")&&!Sw.call(o,"callee")},Mw=function(){return!1};var Lu=L&&!L.nodeType&&L,zu=Lu&&!0&&W&&!W.nodeType&&W,Ou=zu&&zu.exports===Lu?ke.Buffer:void 0;const gi=(Ou?Ou.isBuffer:void 0)||Mw;var Bw=/^(?:0|[1-9]\d*)$/;const Yr=function(o,t){var e=typeof o;return!!(t=t??9007199254740991)&&(e=="number"||e!="symbol"&&Bw.test(o))&&o>-1&&o%1==0&&o<t},cl=function(o){return typeof o=="number"&&o>-1&&o%1==0&&o<=9007199254740991};var vt={};vt["[object Float32Array]"]=vt["[object Float64Array]"]=vt["[object Int8Array]"]=vt["[object Int16Array]"]=vt["[object Int32Array]"]=vt["[object Uint8Array]"]=vt["[object Uint8ClampedArray]"]=vt["[object Uint16Array]"]=vt["[object Uint32Array]"]=!0,vt["[object Arguments]"]=vt["[object Array]"]=vt["[object ArrayBuffer]"]=vt["[object Boolean]"]=vt["[object DataView]"]=vt["[object Date]"]=vt["[object Error]"]=vt["[object Function]"]=vt["[object Map]"]=vt["[object Number]"]=vt["[object Object]"]=vt["[object RegExp]"]=vt["[object Set]"]=vt["[object String]"]=vt["[object WeakMap]"]=!1;const Tw=function(o){return ae(o)&&cl(o.length)&&!!vt[We(o)]},ll=function(o){return function(t){return o(t)}};var Ru=L&&!L.nodeType&&L,pi=Ru&&!0&&W&&!W.nodeType&&W,dl=pi&&pi.exports===Ru&&xu.process;const On=function(){try{var o=pi&&pi.require&&pi.require("util").types;return o||dl&&dl.binding&&dl.binding("util")}catch{}}();var Fu=On&&On.isTypedArray;const ul=Fu?ll(Fu):Tw;var Nw=Object.prototype.hasOwnProperty;const ju=function(o,t){var e=Xt(o),n=!e&&$r(o),i=!e&&!n&&gi(o),r=!e&&!n&&!i&&ul(o),s=e||n||i||r,a=s?Dw(o.length,String):[],c=a.length;for(var l in o)!t&&!Nw.call(o,l)||s&&(l=="length"||i&&(l=="offset"||l=="parent")||r&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Yr(l,c))||a.push(l);return a};var Pw=Object.prototype;const hl=function(o){var t=o&&o.constructor;return o===(typeof t=="function"&&t.prototype||Pw)},Lw=Su(Object.keys,Object);var zw=Object.prototype.hasOwnProperty;const Ow=function(o){if(!hl(o))return Lw(o);var t=[];for(var e in Object(o))zw.call(o,e)&&e!="constructor"&&t.push(e);return t},Qr=function(o){return o!=null&&cl(o.length)&&!dn(o)},ki=function(o){return Qr(o)?ju(o):Ow(o)},Rw=function(o,t){return o&&zn(t,ki(t),o)},Fw=function(o){var t=[];if(o!=null)for(var e in Object(o))t.push(e);return t};var jw=Object.prototype.hasOwnProperty;const Vw=function(o){if(!_t(o))return Fw(o);var t=hl(o),e=[];for(var n in o)(n!="constructor"||!t&&jw.call(o,n))&&e.push(n);return e},Rn=function(o){return Qr(o)?ju(o,!0):Vw(o)},Hw=function(o,t){return o&&zn(t,Rn(t),o)};var Vu=L&&!L.nodeType&&L,Hu=Vu&&!0&&W&&!W.nodeType&&W,Uu=Hu&&Hu.exports===Vu?ke.Buffer:void 0,qu=Uu?Uu.allocUnsafe:void 0;const Gu=function(o,t){if(t)return o.slice();var e=o.length,n=qu?qu(e):new o.constructor(e);return o.copy(n),n},Wu=function(o,t){var e=-1,n=o.length;for(t||(t=Array(n));++e<n;)t[e]=o[e];return t},Uw=function(o,t){for(var e=-1,n=o==null?0:o.length,i=0,r=[];++e<n;){var s=o[e];t(s,e,o)&&(r[i++]=s)}return r},Ku=function(){return[]};var qw=Object.prototype.propertyIsEnumerable,$u=Object.getOwnPropertySymbols;const ml=$u?function(o){return o==null?[]:(o=Object(o),Uw($u(o),function(t){return qw.call(o,t)}))}:Ku,Gw=function(o,t){return zn(o,ml(o),t)},Yu=function(o,t){for(var e=-1,n=t.length,i=o.length;++e<n;)o[i+e]=t[e];return o},Qu=Object.getOwnPropertySymbols?function(o){for(var t=[];o;)Yu(t,ml(o)),o=rl(o);return t}:Ku,Ww=function(o,t){return zn(o,Qu(o),t)},Zu=function(o,t,e){var n=t(o);return Xt(o)?n:Yu(n,e(o))},gl=function(o){return Zu(o,ki,ml)},Kw=function(o){return Zu(o,Rn,Qu)},pl=hn(ke,"DataView"),kl=hn(ke,"Promise"),fl=hn(ke,"Set"),bl=hn(ke,"WeakMap");var Ju="[object Map]",Xu="[object Promise]",th="[object Set]",eh="[object WeakMap]",nh="[object DataView]",$w=un(pl),Yw=un(hi),Qw=un(kl),Zw=un(fl),Jw=un(bl),mn=We;(pl&&mn(new pl(new ArrayBuffer(1)))!=nh||hi&&mn(new hi)!=Ju||kl&&mn(kl.resolve())!=Xu||fl&&mn(new fl)!=th||bl&&mn(new bl)!=eh)&&(mn=function(o){var t=We(o),e=t=="[object Object]"?o.constructor:void 0,n=e?un(e):"";if(n)switch(n){case $w:return nh;case Yw:return Ju;case Qw:return Xu;case Zw:return th;case Jw:return eh}return t});const fi=mn;var Xw=Object.prototype.hasOwnProperty;const tA=function(o){var t=o.length,e=new o.constructor(t);return t&&typeof o[0]=="string"&&Xw.call(o,"index")&&(e.index=o.index,e.input=o.input),e},Zr=ke.Uint8Array,wl=function(o){var t=new o.constructor(o.byteLength);return new Zr(t).set(new Zr(o)),t},eA=function(o,t){var e=t?wl(o.buffer):o.buffer;return new o.constructor(e,o.byteOffset,o.byteLength)};var nA=/\w*$/;const iA=function(o){var t=new o.constructor(o.source,nA.exec(o));return t.lastIndex=o.lastIndex,t};var ih=De?De.prototype:void 0,oh=ih?ih.valueOf:void 0;const oA=function(o){return oh?Object(oh.call(o)):{}},rh=function(o,t){var e=t?wl(o.buffer):o.buffer;return new o.constructor(e,o.byteOffset,o.length)},rA=function(o,t,e){var n=o.constructor;switch(t){case"[object ArrayBuffer]":return wl(o);case"[object Boolean]":case"[object Date]":return new n(+o);case"[object DataView]":return eA(o,e);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return rh(o,e);case"[object Map]":case"[object Set]":return new n;case"[object Number]":case"[object String]":return new n(o);case"[object RegExp]":return iA(o);case"[object Symbol]":return oA(o)}};var sh=Object.create;const sA=function(){function o(){}return function(t){if(!_t(t))return{};if(sh)return sh(t);o.prototype=t;var e=new o;return o.prototype=void 0,e}}(),ah=function(o){return typeof o.constructor!="function"||hl(o)?{}:sA(rl(o))},aA=function(o){return ae(o)&&fi(o)=="[object Map]"};var ch=On&&On.isMap;const cA=ch?ll(ch):aA,lA=function(o){return ae(o)&&fi(o)=="[object Set]"};var lh=On&&On.isSet;const dA=lh?ll(lh):lA;var dh="[object Arguments]",uh="[object Function]",hh="[object Object]",Ct={};Ct[dh]=Ct["[object Array]"]=Ct["[object ArrayBuffer]"]=Ct["[object DataView]"]=Ct["[object Boolean]"]=Ct["[object Date]"]=Ct["[object Float32Array]"]=Ct["[object Float64Array]"]=Ct["[object Int8Array]"]=Ct["[object Int16Array]"]=Ct["[object Int32Array]"]=Ct["[object Map]"]=Ct["[object Number]"]=Ct[hh]=Ct["[object RegExp]"]=Ct["[object Set]"]=Ct["[object String]"]=Ct["[object Symbol]"]=Ct["[object Uint8Array]"]=Ct["[object Uint8ClampedArray]"]=Ct["[object Uint16Array]"]=Ct["[object Uint32Array]"]=!0,Ct["[object Error]"]=Ct[uh]=Ct["[object WeakMap]"]=!1;const Al=function o(t,e,n,i,r,s){var a,c=1&e,l=2&e,d=4&e;if(n&&(a=r?n(t,i,r,s):n(t)),a!==void 0)return a;if(!_t(t))return t;var u=Xt(t);if(u){if(a=tA(t),!c)return Wu(t,a)}else{var h=fi(t),m=h==uh||h=="[object GeneratorFunction]";if(gi(t))return Gu(t,c);if(h==hh||h==dh||m&&!r){if(a=l||m?{}:ah(t),!c)return l?Ww(t,Hw(a,t)):Gw(t,Rw(a,t))}else{if(!Ct[h])return r?t:{};a=rA(t,h,c)}}s||(s=new Ln);var p=s.get(t);if(p)return p;s.set(t,a),dA(t)?t.forEach(function(b){a.add(o(b,e,n,b,t,s))}):cA(t)&&t.forEach(function(b,C){a.set(C,o(b,e,n,C,t,s))});var f=u?void 0:(d?l?Kw:gl:l?Rn:ki)(t);return xw(f||t,function(b,C){f&&(b=t[C=b]),al(a,C,o(b,e,n,C,t,s))}),a},_l=function(o,t){return Al(o,5,t=typeof t=="function"?t:void 0)},Ke=function(o){return ae(o)&&o.nodeType===1&&!te(o)};class mh{constructor(t,e){this._config=Object.create(null),e&&this.define(gh(e)),t&&this._setObjectToTarget(this._config,t)}set(t,e){this._setToTarget(this._config,t,e)}define(t,e){this._setToTarget(this._config,t,e,!0)}get(t){return this._getFromSource(this._config,t)}*names(){for(const t of Object.keys(this._config))yield t}_setToTarget(t,e,n,i=!1){if(te(e))return void this._setObjectToTarget(t,e,i);const r=e.split(".");e=r.pop();for(const s of r)te(t[s])||(t[s]=Object.create(null)),t=t[s];if(te(n))return te(t[e])||(t[e]=Object.create(null)),t=t[e],void this._setObjectToTarget(t,n,i);i&&t[e]!==void 0||(t[e]=n)}_getFromSource(t,e){const n=e.split(".");e=n.pop();for(const i of n){if(!te(t[i])){t=null;break}t=t[i]}return t?gh(t[e]):void 0}_setObjectToTarget(t,e,n){Object.keys(e).forEach(i=>{this._setToTarget(t,i,e[i],n)})}}function gh(o){return _l(o,uA)}function uA(o){return Ke(o)||typeof o=="function"?o:void 0}function $e(o){if(o){if(o.defaultView)return o instanceof o.defaultView.Document;if(o.ownerDocument&&o.ownerDocument.defaultView)return o instanceof o.ownerDocument.defaultView.Node}return!1}function Jr(o){const t=Object.prototype.toString.apply(o);return t=="[object Window]"||t=="[object global]"}const ph=le(ut());function le(o){return o?class extends o{listenTo(t,e,n,i={}){if($e(t)||Jr(t)){const r={capture:!!i.useCapture,passive:!!i.usePassive},s=this._getProxyEmitter(t,r)||new hA(t,r);this.listenTo(s,e,n,i)}else super.listenTo(t,e,n,i)}stopListening(t,e,n){if($e(t)||Jr(t)){const i=this._getAllProxyEmitters(t);for(const r of i)this.stopListening(r,e,n)}else super.stopListening(t,e,n)}_getProxyEmitter(t,e){return function(n,i){const r=n[Sn];return r&&r[i]?r[i].emitter:null}(this,kh(t,e))}_getAllProxyEmitters(t){return[{capture:!1,passive:!1},{capture:!1,passive:!0},{capture:!0,passive:!1},{capture:!0,passive:!0}].map(e=>this._getProxyEmitter(t,e)).filter(e=>!!e)}}:ph}["_getProxyEmitter","_getAllProxyEmitters","on","once","off","listenTo","stopListening","fire","delegate","stopDelegating","_addEventListener","_removeEventListener"].forEach(o=>{le[o]=ph.prototype[o]});class hA extends ut(){constructor(t,e){super(),fu(this,kh(t,e)),this._domNode=t,this._options=e}attach(t){if(this._domListeners&&this._domListeners[t])return;const e=this._createDomListener(t);this._domNode.addEventListener(t,e,this._options),this._domListeners||(this._domListeners={}),this._domListeners[t]=e}detach(t){let e;!this._domListeners[t]||(e=this._events[t])&&e.callbacks.length||this._domListeners[t].removeListener()}_addEventListener(t,e,n){this.attach(t),ut().prototype._addEventListener.call(this,t,e,n)}_removeEventListener(t,e){ut().prototype._removeEventListener.call(this,t,e),this.detach(t)}_createDomListener(t){const e=n=>{this.fire(t,n)};return e.removeListener=()=>{this._domNode.removeEventListener(t,e,this._options),delete this._domListeners[t]},e}}function kh(o,t){let e=function(n){return n["data-ck-expando"]||(n["data-ck-expando"]=se())}(o);for(const n of Object.keys(t).sort())t[n]&&(e+="-"+n);return e}function mA(o){const t=[];let e=o;for(;e&&e.nodeType!=Node.DOCUMENT_NODE;)t.unshift(e),e=e.parentNode;return t}function fh(o){const t=o.ownerDocument.defaultView.getComputedStyle(o);return{top:parseInt(t.borderTopWidth,10),right:parseInt(t.borderRightWidth,10),bottom:parseInt(t.borderBottomWidth,10),left:parseInt(t.borderLeftWidth,10)}}function bh(o){if(!o.target)return null;const t=o.target.ownerDocument,e=o.clientX,n=o.clientY;let i=null;return t.caretRangeFromPoint&&t.caretRangeFromPoint(e,n)?i=t.caretRangeFromPoint(e,n):o.rangeParent&&(i=t.createRange(),i.setStart(o.rangeParent,o.rangeOffset),i.collapse(!0)),i}function Et(o){return Object.prototype.toString.call(o)=="[object Text]"}function Xr(o){return Object.prototype.toString.apply(o)=="[object Range]"}function wh(o){return o&&o.parentNode?o.offsetParent===A.document.body?null:o.offsetParent:null}const Ah=["top","right","bottom","left","width","height"];class it{constructor(t){const e=Xr(t);if(Object.defineProperty(this,"_source",{value:t._source||t,writable:!0,enumerable:!1}),Cl(t)||e)if(e){const n=it.getDomRangeRects(t);ts(this,it.getBoundingRect(n))}else ts(this,t.getBoundingClientRect());else if(Jr(t)){const{innerWidth:n,innerHeight:i}=t;ts(this,{top:0,right:n,bottom:i,left:0,width:n,height:i})}else ts(this,t)}clone(){return new it(this)}moveTo(t,e){return this.top=e,this.right=t+this.width,this.bottom=e+this.height,this.left=t,this}moveBy(t,e){return this.top+=e,this.right+=t,this.left+=t,this.bottom+=e,this}getIntersection(t){const e={top:Math.max(this.top,t.top),right:Math.min(this.right,t.right),bottom:Math.min(this.bottom,t.bottom),left:Math.max(this.left,t.left),width:0,height:0};if(e.width=e.right-e.left,e.height=e.bottom-e.top,e.width<0||e.height<0)return null;{const n=new it(e);return n._source=this._source,n}}getIntersectionArea(t){const e=this.getIntersection(t);return e?e.getArea():0}getArea(){return this.width*this.height}getVisible(){const t=this._source;let e=this.clone();if(_h(t))return e;let n,i=t,r=t.parentNode||t.commonAncestorContainer;for(;r&&!_h(r);){const a=((s=r)instanceof HTMLElement?s.ownerDocument.defaultView.getComputedStyle(s).overflow:"visible")==="visible";i instanceof HTMLElement&&Ch(i)==="absolute"&&(n=i);const c=Ch(r);if(a||n&&(c==="relative"&&a||c!=="relative")){i=r,r=r.parentNode;continue}const l=new it(r),d=e.getIntersection(l);if(!d)return null;d.getArea()<e.getArea()&&(e=d),i=r,r=r.parentNode}var s;return e}isEqual(t){for(const e of Ah)if(this[e]!==t[e])return!1;return!0}contains(t){const e=this.getIntersection(t);return!(!e||!e.isEqual(t))}toAbsoluteRect(){const{scrollX:t,scrollY:e}=A.window,n=this.clone().moveBy(t,e);if(Cl(n._source)){const i=wh(n._source);i&&function(r,s){const a=new it(s),c=fh(s);let l=0,d=0;l-=a.left,d-=a.top,l+=s.scrollLeft,d+=s.scrollTop,l-=c.left,d-=c.top,r.moveBy(l,d)}(n,i)}return n}excludeScrollbarsAndBorders(){const t=this._source;let e,n,i;if(Jr(t))e=t.innerWidth-t.document.documentElement.clientWidth,n=t.innerHeight-t.document.documentElement.clientHeight,i=t.getComputedStyle(t.document.documentElement).direction;else{const r=fh(t);e=t.offsetWidth-t.clientWidth-r.left-r.right,n=t.offsetHeight-t.clientHeight-r.top-r.bottom,i=t.ownerDocument.defaultView.getComputedStyle(t).direction,this.left+=r.left,this.top+=r.top,this.right-=r.right,this.bottom-=r.bottom,this.width=this.right-this.left,this.height=this.bottom-this.top}return this.width-=e,i==="ltr"?this.right-=e:this.left+=e,this.height-=n,this.bottom-=n,this}static getDomRangeRects(t){const e=[],n=Array.from(t.getClientRects());if(n.length)for(const i of n)e.push(new it(i));else{let i=t.startContainer;Et(i)&&(i=i.parentNode);const r=new it(i.getBoundingClientRect());r.right=r.left,r.width=0,e.push(r)}return e}static getBoundingRect(t){const e={left:Number.POSITIVE_INFINITY,top:Number.POSITIVE_INFINITY,right:Number.NEGATIVE_INFINITY,bottom:Number.NEGATIVE_INFINITY,width:0,height:0};let n=0;for(const i of t)n++,e.left=Math.min(e.left,i.left),e.top=Math.min(e.top,i.top),e.right=Math.max(e.right,i.right),e.bottom=Math.max(e.bottom,i.bottom);return n==0?null:(e.width=e.right-e.left,e.height=e.bottom-e.top,new it(e))}}function ts(o,t){for(const e of Ah)o[e]=t[e]}function _h(o){return!!Cl(o)&&o===o.ownerDocument.body}function Cl(o){return o!==null&&typeof o=="object"&&o.nodeType===1&&typeof o.getBoundingClientRect=="function"}function Ch(o){return o instanceof HTMLElement?o.ownerDocument.defaultView.getComputedStyle(o).position:"static"}const yt=class yt{constructor(t,e){yt._observerInstance||yt._createObserver(),this._element=t,this._callback=e,yt._addElementCallback(t,e),yt._observerInstance.observe(t)}get element(){return this._element}destroy(){yt._deleteElementCallback(this._element,this._callback)}static _addElementCallback(t,e){yt._elementCallbacks||(yt._elementCallbacks=new Map);let n=yt._elementCallbacks.get(t);n||(n=new Set,yt._elementCallbacks.set(t,n)),n.add(e)}static _deleteElementCallback(t,e){const n=yt._getElementCallbacks(t);n&&(n.delete(e),n.size||(yt._elementCallbacks.delete(t),yt._observerInstance.unobserve(t))),yt._elementCallbacks&&!yt._elementCallbacks.size&&(yt._observerInstance=null,yt._elementCallbacks=null)}static _getElementCallbacks(t){return yt._elementCallbacks?yt._elementCallbacks.get(t):null}static _createObserver(){yt._observerInstance=new A.window.ResizeObserver(t=>{for(const e of t){const n=yt._getElementCallbacks(e.target);if(n)for(const i of n)i(e)}})}};yt._observerInstance=null,yt._elementCallbacks=null;let bi=yt;function vh(o,t){o instanceof HTMLTextAreaElement&&(o.value=t),o.innerHTML=t}function Fn(o){return t=>t+o}function wi(o){let t=0;for(;o.previousSibling;)o=o.previousSibling,t++;return t}function yh(o,t,e){o.insertBefore(e,o.childNodes[t]||null)}function Ai(o){return o&&o.nodeType===Node.COMMENT_NODE}function Oe(o){return!!o&&(Et(o)?Oe(o.parentElement):!!o.getClientRects&&!!o.getClientRects().length)}function es({element:o,target:t,positions:e,limiter:n,fitInViewport:i,viewportOffsetConfig:r}){dn(t)&&(t=t()),dn(n)&&(n=n());const s=wh(o),a=function(h){h=Object.assign({top:0,bottom:0,left:0,right:0},h);const m=new it(A.window);return m.top+=h.top,m.height-=h.top,m.bottom-=h.bottom,m.height-=h.bottom,m}(r),c=new it(o),l=xh(t,a);let d;if(!l||!a.getIntersection(l))return null;const u={targetRect:l,elementRect:c,positionedElementAncestor:s,viewportRect:a};if(n||i){if(n){const h=xh(n,a);h&&(u.limiterRect=h)}d=function(h,m){const{elementRect:p}=m,f=p.getArea(),b=h.map(M=>new Eh(M,m)).filter(M=>!!M.name);let C=0,I=null;for(const M of b){const{limiterIntersectionArea:P,viewportIntersectionArea:K}=M;if(P===f)return M;const tt=K**2+P**2;tt>C&&(C=tt,I=M)}return I}(e,u)}else d=new Eh(e[0],u);return d}function xh(o,t){const e=new it(o).getVisible();return e?e.getIntersection(t):null}class Eh{constructor(t,e){const n=t(e.targetRect,e.elementRect,e.viewportRect,e.limiterRect);if(!n)return;const{left:i,top:r,name:s,config:a}=n;this.name=s,this.config=a,this._positioningFunctionCoordinates={left:i,top:r},this._options=e}get left(){return this._absoluteRect.left}get top(){return this._absoluteRect.top}get limiterIntersectionArea(){const t=this._options.limiterRect;return t?t.getIntersectionArea(this._rect):0}get viewportIntersectionArea(){return this._options.viewportRect.getIntersectionArea(this._rect)}get _rect(){return this._cachedRect||(this._cachedRect=this._options.elementRect.clone().moveTo(this._positioningFunctionCoordinates.left,this._positioningFunctionCoordinates.top)),this._cachedRect}get _absoluteRect(){return this._cachedAbsoluteRect||(this._cachedAbsoluteRect=this._rect.toAbsoluteRect()),this._cachedAbsoluteRect}}function Dh(o){const t=o.parentNode;t&&t.removeChild(o)}function gA({window:o,rect:t,alignToTop:e,forceScroll:n,viewportOffset:i}){const r=t.clone().moveBy(0,i.bottom),s=t.clone().moveBy(0,-i.top),a=new it(o).excludeScrollbarsAndBorders(),c=e&&n,l=[s,r].every(p=>a.contains(p));let{scrollX:d,scrollY:u}=o;const h=d,m=u;c?u-=a.top-t.top+i.top:l||(Sh(s,a)?u-=a.top-t.top+i.top:Ih(r,a)&&(u+=e?t.top-a.top-i.top:t.bottom-a.bottom+i.bottom)),l||(Mh(t,a)?d-=a.left-t.left+i.left:Bh(t,a)&&(d+=t.right-a.right+i.right)),d==h&&u===m||o.scrollTo(d,u)}function pA({parent:o,getRect:t,alignToTop:e,forceScroll:n,ancestorOffset:i=0,limiterElement:r}){const s=vl(o),a=e&&n;let c,l,d;const u=r||s.document.body;for(;o!=u;)l=t(),c=new it(o).excludeScrollbarsAndBorders(),d=c.contains(l),a?o.scrollTop-=c.top-l.top+i:d||(Sh(l,c)?o.scrollTop-=c.top-l.top+i:Ih(l,c)&&(o.scrollTop+=e?l.top-c.top-i:l.bottom-c.bottom+i)),d||(Mh(l,c)?o.scrollLeft-=c.left-l.left+i:Bh(l,c)&&(o.scrollLeft+=l.right-c.right+i)),o=o.parentNode}function Ih(o,t){return o.bottom>t.bottom}function Sh(o,t){return o.top<t.top}function Mh(o,t){return o.left<t.left}function Bh(o,t){return o.right>t.right}function vl(o){return Xr(o)?o.startContainer.ownerDocument.defaultView:o.ownerDocument.defaultView}function kA(o){if(Xr(o)){let t=o.commonAncestorContainer;return Et(t)&&(t=t.parentNode),t}return o.parentNode}function Th(o,t){const e=vl(o),n=new it(o);if(e===t)return n;{let i=e;for(;i!=t;){const r=i.frameElement,s=new it(r).excludeScrollbarsAndBorders();n.moveBy(s.left,s.top),i=i.parent}}return n}const fA={ctrl:"⌃",cmd:"⌘",alt:"⌥",shift:"⇧"},bA={ctrl:"Ctrl+",alt:"Alt+",shift:"Shift+"},Nh={37:"←",38:"↑",39:"→",40:"↓",9:"⇥",33:"Page Up",34:"Page Down"},ct=AA(),wA=Object.fromEntries(Object.entries(ct).map(([o,t])=>{let e;return e=t in Nh?Nh[t]:o.charAt(0).toUpperCase()+o.slice(1),[t,e]}));function jn(o){let t;if(typeof o=="string"){if(t=ct[o.toLowerCase()],!t)throw new E("keyboard-unknown-key",null,{key:o})}else t=o.keyCode+(o.altKey?ct.alt:0)+(o.ctrlKey?ct.ctrl:0)+(o.shiftKey?ct.shift:0)+(o.metaKey?ct.cmd:0);return t}function yl(o){return typeof o=="string"&&(o=function(t){return t.split("+").map(e=>e.trim())}(o)),o.map(t=>typeof t=="string"?function(e){if(e.endsWith("!"))return jn(e.slice(0,-1));const n=jn(e);return(v.isMac||v.isiOS)&&n==ct.ctrl?ct.cmd:n}(t):t).reduce((t,e)=>e+t,0)}function ns(o){let t=yl(o);return Object.entries(v.isMac||v.isiOS?fA:bA).reduce((e,[n,i])=>(t&ct[n]&&(t&=~ct[n],e+=i),e),"")+(t?wA[t]:"")}function xl(o,t){const e=t==="ltr";switch(o){case ct.arrowleft:return e?"left":"right";case ct.arrowright:return e?"right":"left";case ct.arrowup:return"up";case ct.arrowdown:return"down"}}function AA(){const o={pageup:33,pagedown:34,arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,backspace:8,delete:46,enter:13,space:32,esc:27,tab:9,ctrl:1114112,shift:2228224,alt:4456448,cmd:8912896};for(let t=65;t<=90;t++)o[String.fromCharCode(t).toLowerCase()]=t;for(let t=48;t<=57;t++)o[t-48]=t;for(let t=112;t<=123;t++)o["f"+(t-111)]=t;return Object.assign(o,{"'":222,",":108,"-":109,".":110,"/":111,";":186,"=":187,"[":219,"\\":220,"]":221,"`":223}),o}function bt(o){return Array.isArray(o)?o:[o]}const El=function(o,t,e){(e!==void 0&&!ui(o[t],e)||e===void 0&&!(t in o))&&Kr(o,t,e)},Ph=function(o){return function(t,e,n){for(var i=-1,r=Object(t),s=n(t),a=s.length;a--;){var c=s[o?a:++i];if(e(r[c],c,r)===!1)break}return t}}(),_A=function(o){return ae(o)&&Qr(o)},Dl=function(o,t){if((t!=="constructor"||typeof o[t]!="function")&&t!="__proto__")return o[t]},CA=function(o){return zn(o,Rn(o))},vA=function(o,t,e,n,i,r,s){var a=Dl(o,e),c=Dl(t,e),l=s.get(c);if(l)El(o,e,l);else{var d=r?r(a,c,e+"",o,t,s):void 0,u=d===void 0;if(u){var h=Xt(c),m=!h&&gi(c),p=!h&&!m&&ul(c);d=c,h||m||p?Xt(a)?d=a:_A(a)?d=Wu(a):m?(u=!1,d=Gu(c,!0)):p?(u=!1,d=rh(c,!0)):d=[]:te(c)||$r(c)?(d=a,$r(a)?d=CA(a):_t(a)&&!dn(a)||(d=ah(c))):u=!1}u&&(s.set(c,d),i(d,c,n,r,s),s.delete(c)),El(o,e,d)}},yA=function o(t,e,n,i,r){t!==e&&Ph(e,function(s,a){if(r||(r=new Ln),_t(s))vA(t,e,a,n,o,i,r);else{var c=i?i(Dl(t,a),s,a+"",t,e,r):void 0;c===void 0&&(c=s),El(t,a,c)}},Rn)},Ye=function(o){return o},xA=function(o,t,e){switch(e.length){case 0:return o.call(t);case 1:return o.call(t,e[0]);case 2:return o.call(t,e[0],e[1]);case 3:return o.call(t,e[0],e[1],e[2])}return o.apply(t,e)};var Lh=Math.max;const EA=function(o,t,e){return t=Lh(t===void 0?o.length-1:t,0),function(){for(var n=arguments,i=-1,r=Lh(n.length-t,0),s=Array(r);++i<r;)s[i]=n[t+i];i=-1;for(var a=Array(t+1);++i<t;)a[i]=n[i];return a[t]=e(s),xA(o,this,a)}},DA=function(o){return function(){return o}},IA=Wr?function(o,t){return Wr(o,"toString",{configurable:!0,enumerable:!1,value:DA(t),writable:!0})}:Ye;var SA=Date.now;const MA=function(o){var t=0,e=0;return function(){var n=SA(),i=16-(n-e);if(e=n,i>0){if(++t>=800)return arguments[0]}else t=0;return o.apply(void 0,arguments)}}(IA),BA=function(o,t){return MA(EA(o,t,Ye),o+"")},TA=function(o,t,e){if(!_t(e))return!1;var n=typeof t;return!!(n=="number"?Qr(e)&&Yr(t,e.length):n=="string"&&t in e)&&ui(e[t],o)},zh=function(o){return BA(function(t,e){var n=-1,i=e.length,r=i>1?e[i-1]:void 0,s=i>2?e[2]:void 0;for(r=o.length>3&&typeof r=="function"?(i--,r):void 0,s&&TA(e[0],e[1],s)&&(r=i<3?void 0:r,i=1),t=Object(t);++n<i;){var a=e[n];a&&o(t,a,n,r)}return t})},Il=zh(function(o,t,e){yA(o,t,e)});function NA(o,t,e=1,n){if(typeof e!="number")throw new E("translation-service-quantity-not-a-number",null,{quantity:e});const i=n||A.window.CKEDITOR_TRANSLATIONS,r=function(d){return Object.keys(d).length}(i);r===1&&(o=Object.keys(i)[0]);const s=t.id||t.string;if(r===0||!function(d,u,h){return!!h[d]&&!!h[d].dictionary[u]}(o,s,i))return e!==1?t.plural:t.string;const a=i[o].dictionary,c=i[o].getPluralForm||(d=>d===1?0:1),l=a[s];return typeof l=="string"?l:l[Number(c(e))]}A.window.CKEDITOR_TRANSLATIONS||(A.window.CKEDITOR_TRANSLATIONS={});const PA=["ar","ara","dv","div","fa","per","fas","he","heb","ku","kur","ug","uig"];function Oh(o){return PA.includes(o)?"rtl":"ltr"}class LA{constructor({uiLanguage:t="en",contentLanguage:e,translations:n}={}){this.uiLanguage=t,this.contentLanguage=e||this.uiLanguage,this.uiLanguageDirection=Oh(this.uiLanguage),this.contentLanguageDirection=Oh(this.contentLanguage),this.translations=function(i){return Array.isArray(i)?i.reduce((r,s)=>Il(r,s)):i}(n),this.t=(i,r)=>this._t(i,r)}get language(){return console.warn("locale-deprecated-language-property: The Locale#language property has been deprecated and will be removed in the near future. Please use #uiLanguage and #contentLanguage properties instead."),this.uiLanguage}_t(t,e=[]){e=bt(e),typeof t=="string"&&(t={string:t});const n=t.plural?e[0]:1;return function(i,r){return i.replace(/%(\d+)/g,(s,a)=>a<r.length?r[a]:s)}(NA(this.uiLanguage,t,n,this.translations),e)}}class fe extends ut(){constructor(t={},e={}){super();const n=Jt(t);if(n||(e=t),this._items=[],this._itemMap=new Map,this._idProperty=e.idProperty||"id",this._bindToExternalToInternalMap=new WeakMap,this._bindToInternalToExternalMap=new WeakMap,this._skippedIndexesFromExternal=[],n)for(const i of t)this._items.push(i),this._itemMap.set(this._getItemIdBeforeAdding(i),i)}get length(){return this._items.length}get first(){return this._items[0]||null}get last(){return this._items[this.length-1]||null}add(t,e){return this.addMany([t],e)}addMany(t,e){if(e===void 0)e=this._items.length;else if(e>this._items.length||e<0)throw new E("collection-add-item-invalid-index",this);let n=0;for(const i of t){const r=this._getItemIdBeforeAdding(i),s=e+n;this._items.splice(s,0,i),this._itemMap.set(r,i),this.fire("add",i,s),n++}return this.fire("change",{added:t,removed:[],index:e}),this}get(t){let e;if(typeof t=="string")e=this._itemMap.get(t);else{if(typeof t!="number")throw new E("collection-get-invalid-arg",this);e=this._items[t]}return e||null}has(t){if(typeof t=="string")return this._itemMap.has(t);{const e=t[this._idProperty];return e&&this._itemMap.has(e)}}getIndex(t){let e;return e=typeof t=="string"?this._itemMap.get(t):t,e?this._items.indexOf(e):-1}remove(t){const[e,n]=this._remove(t);return this.fire("change",{added:[],removed:[e],index:n}),e}map(t,e){return this._items.map(t,e)}forEach(t,e){this._items.forEach(t,e)}find(t,e){return this._items.find(t,e)}filter(t,e){return this._items.filter(t,e)}clear(){this._bindToCollection&&(this.stopListening(this._bindToCollection),this._bindToCollection=null);const t=Array.from(this._items);for(;this.length;)this._remove(0);this.fire("change",{added:[],removed:t,index:0})}bindTo(t){if(this._bindToCollection)throw new E("collection-bind-to-rebind",this);return this._bindToCollection=t,{as:e=>{this._setUpBindToBinding(n=>new e(n))},using:e=>{typeof e=="function"?this._setUpBindToBinding(e):this._setUpBindToBinding(n=>n[e])}}}_setUpBindToBinding(t){const e=this._bindToCollection,n=(i,r,s)=>{const a=e._bindToCollection==this,c=e._bindToInternalToExternalMap.get(r);if(a&&c)this._bindToExternalToInternalMap.set(r,c),this._bindToInternalToExternalMap.set(c,r);else{const l=t(r);if(!l)return void this._skippedIndexesFromExternal.push(s);let d=s;for(const u of this._skippedIndexesFromExternal)s>u&&d--;for(const u of e._skippedIndexesFromExternal)d>=u&&d++;this._bindToExternalToInternalMap.set(r,l),this._bindToInternalToExternalMap.set(l,r),this.add(l,d);for(let u=0;u<e._skippedIndexesFromExternal.length;u++)d<=e._skippedIndexesFromExternal[u]&&e._skippedIndexesFromExternal[u]++}};for(const i of e)n(0,i,e.getIndex(i));this.listenTo(e,"add",n),this.listenTo(e,"remove",(i,r,s)=>{const a=this._bindToExternalToInternalMap.get(r);a&&this.remove(a),this._skippedIndexesFromExternal=this._skippedIndexesFromExternal.reduce((c,l)=>(s<l&&c.push(l-1),s>l&&c.push(l),c),[])})}_getItemIdBeforeAdding(t){const e=this._idProperty;let n;if(e in t){if(n=t[e],typeof n!="string")throw new E("collection-add-invalid-id",this);if(this.get(n))throw new E("collection-add-item-already-exists",this)}else t[e]=n=se();return n}_remove(t){let e,n,i,r=!1;const s=this._idProperty;if(typeof t=="string"?(n=t,i=this._itemMap.get(n),r=!i,i&&(e=this._items.indexOf(i))):typeof t=="number"?(e=t,i=this._items[e],r=!i,i&&(n=i[s])):(i=t,n=i[s],e=this._items.indexOf(i),r=e==-1||!this._itemMap.get(n)),r)throw new E("collection-remove-404",this);this._items.splice(e,1),this._itemMap.delete(n);const a=this._bindToInternalToExternalMap.get(i);return this._bindToInternalToExternalMap.delete(i),this._bindToExternalToInternalMap.delete(a),this.fire("remove",i,e),[i,e]}[Symbol.iterator](){return this._items[Symbol.iterator]()}}function Lt(o){const t=o.next();return t.done?null:t.value}class Bt extends le(gt()){constructor(){super(),this._elements=new Set,this._externalViews=new Set,this._blurTimeout=null,this.set("isFocused",!1),this.set("focusedElement",null)}get elements(){return Array.from(this._elements.values())}get externalViews(){return Array.from(this._externalViews.values())}add(t){if(Fh(t))this._addElement(t);else if(Rh(t))this._addView(t);else{if(!t.element)throw new E("focustracker-add-view-missing-element",{focusTracker:this,view:t});this._addElement(t.element)}}remove(t){Fh(t)?this._removeElement(t):Rh(t)?this._removeView(t):this._removeElement(t.element)}_addElement(t){if(this._elements.has(t))throw new E("focustracker-add-element-already-exist",this);this.listenTo(t,"focus",()=>{const e=this.externalViews.find(n=>function(i,r){return jh(i,r)?!0:!!r.focusTracker.externalViews.find(s=>jh(i,s))}(t,n));e?this._focus(e.element):this._focus(t)},{useCapture:!0}),this.listenTo(t,"blur",()=>{this._blur()},{useCapture:!0}),this._elements.add(t)}_removeElement(t){this._elements.has(t)&&(this.stopListening(t),this._elements.delete(t)),t===this.focusedElement&&this._blur()}_addView(t){t.element&&this._addElement(t.element),this.listenTo(t.focusTracker,"change:focusedElement",()=>{t.focusTracker.focusedElement?t.element&&this._focus(t.element):this._blur()}),this._externalViews.add(t)}_removeView(t){t.element&&this._removeElement(t.element),this.stopListening(t.focusTracker),this._externalViews.delete(t)}destroy(){this.stopListening(),this._elements.clear(),this._externalViews.clear(),this.isFocused=!1,this.focusedElement=null}_focus(t){this._clearBlurTimeout(),this.focusedElement=t,this.isFocused=!0}_blur(){this.elements.find(t=>t.contains(document.activeElement))||this.externalViews.find(t=>t.focusTracker.isFocused&&!t.focusTracker._blurTimeout)||(this._clearBlurTimeout(),this._blurTimeout=setTimeout(()=>{this.focusedElement=null,this.isFocused=!1},0))}_clearBlurTimeout(){clearTimeout(this._blurTimeout),this._blurTimeout=null}}function Rh(o){return"focusTracker"in o&&o.focusTracker instanceof Bt}function Fh(o){return Ke(o)}function jh(o,t){return!!t.element&&t.element.contains(document.activeElement)&&o.contains(t.element)}class Ut{constructor(){this._listener=new(le())}listenTo(t){this._listener.listenTo(t,"keydown",(e,n)=>{this._listener.fire("_keydown:"+jn(n),n)})}set(t,e,n={}){const i=yl(t),r=n.priority;this._listener.listenTo(this._listener,"_keydown:"+i,(s,a)=>{n.filter&&!n.filter(a)||(e(a,()=>{a.preventDefault(),a.stopPropagation(),s.stop()}),s.return=!0)},{priority:r})}press(t){return!!this._listener.fire("_keydown:"+jn(t),t)}stopListening(t){this._listener.stopListening(t)}destroy(){this.stopListening()}}function Ie(o){return Jt(o)?new Map(o):function(t){const e=new Map;for(const n in t)e.set(n,t[n]);return e}(o)}function Vh(o,t,e,n){if(Math.max(t.length,o.length)>1e4)return o.slice(0,e).concat(t).concat(o.slice(e+n,o.length));{const i=Array.from(o);return i.splice(e,n,...t),i}}function Sl(o,t){let e;function n(...i){n.cancel(),e=setTimeout(()=>o(...i),t)}return n.cancel=()=>{clearTimeout(e)},n}function Ml(o,t){return!!(e=o.charAt(t-1))&&e.length==1&&/[\ud800-\udbff]/.test(e)&&function(n){return!!n&&n.length==1&&/[\udc00-\udfff]/.test(n)}(o.charAt(t));var e}function Bl(o,t){return!!(e=o.charAt(t))&&e.length==1&&/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(e);var e}const zA=OA();function Hh(o,t){const e=String(o).matchAll(zA);return Array.from(e).some(n=>n.index<t&&t<n.index+n[0].length)}function OA(){const o=/\p{Regional_Indicator}{2}/u.source,t="(?:"+[/\p{Emoji}[\u{E0020}-\u{E007E}]+\u{E007F}/u,/\p{Emoji}\u{FE0F}?\u{20E3}/u,/\p{Emoji}\u{FE0F}/u,/(?=\p{General_Category=Other_Symbol})\p{Emoji}\p{Emoji_Modifier}*/u].map(e=>e.source).join("|")+")";return new RegExp(`${o}|${t}(?:‍${t})*`,"ug")}class be extends fe{constructor(t=[]){super(t,{idProperty:"viewUid"}),this.on("add",(e,n,i)=>{this._renderViewIntoCollectionParent(n,i)}),this.on("remove",(e,n)=>{n.element&&this._parentElement&&n.element.remove()}),this._parentElement=null}destroy(){this.map(t=>t.destroy())}setParent(t){this._parentElement=t;for(const e of this)this._renderViewIntoCollectionParent(e)}delegate(...t){if(!t.length||!t.every(e=>typeof e=="string"))throw new E("ui-viewcollection-delegate-wrong-events",this);return{to:e=>{for(const n of this)for(const i of t)n.delegate(i).to(e);this.on("add",(n,i)=>{for(const r of t)i.delegate(r).to(e)}),this.on("remove",(n,i)=>{for(const r of t)i.stopDelegating(r,e)})}}}_renderViewIntoCollectionParent(t,e){t.isRendered||t.render(),t.element&&this._parentElement&&this._parentElement.insertBefore(t.element,this._parentElement.children[e])}remove(t){return super.remove(t)}}class we extends ut(){constructor(t){super(),Object.assign(this,Wh(Gh(t))),this._isRendered=!1,this._revertData=null}render(){const t=this._renderNode({intoFragment:!0});return this._isRendered=!0,t}apply(t){return this._revertData={children:[],bindings:[],attributes:{}},this._renderNode({node:t,intoFragment:!1,isApplying:!0,revertData:this._revertData}),t}revert(t){if(!this._revertData)throw new E("ui-template-revert-not-applied",[this,t]);this._revertTemplateFromNode(t,this._revertData)}*getViews(){yield*function*t(e){if(e.children)for(const n of e.children)os(n)?yield n:Tl(n)&&(yield*t(n))}(this)}static bind(t,e){return{to:(n,i)=>new RA({eventNameOrFunction:n,attribute:n,observable:t,emitter:e,callback:i}),if:(n,i,r)=>new Uh({observable:t,emitter:e,attribute:n,valueIfTrue:i,callback:r})}}static extend(t,e){if(t._isRendered)throw new E("template-extend-render",[this,t]);Qh(t,Wh(Gh(e)))}_renderNode(t){let e;if(e=t.node?this.tag&&this.text:this.tag?this.text:!this.text,e)throw new E("ui-template-wrong-syntax",this);return this.text?this._renderText(t):this._renderElement(t)}_renderElement(t){let e=t.node;return e||(e=t.node=document.createElementNS(this.ns||"http://www.w3.org/1999/xhtml",this.tag)),this._renderAttributes(t),this._renderElementChildren(t),this._setUpListeners(t),e}_renderText(t){let e=t.node;return e?t.revertData.text=e.textContent:e=t.node=document.createTextNode(""),is(this.text)?this._bindToObservable({schema:this.text,updater:FA(e),data:t}):e.textContent=this.text.join(""),e}_renderAttributes(t){if(!this.attributes)return;const e=t.node,n=t.revertData;for(const i in this.attributes){const r=e.getAttribute(i),s=this.attributes[i];n&&(n.attributes[i]=r);const a=Zh(s)?s[0].ns:null;if(is(s)){const c=Zh(s)?s[0].value:s;n&&Jh(i)&&c.unshift(r),this._bindToObservable({schema:c,updater:jA(e,i,a),data:t})}else if(i=="style"&&typeof s[0]!="string")this._renderStyleAttribute(s[0],t);else{n&&r&&Jh(i)&&s.unshift(r);const c=s.map(l=>l&&l.value||l).reduce((l,d)=>l.concat(d),[]).reduce($h,"");Vn(c)||e.setAttributeNS(a,i,c)}}}_renderStyleAttribute(t,e){const n=e.node;for(const i in t){const r=t[i];is(r)?this._bindToObservable({schema:[r],updater:VA(n,i),data:e}):n.style[i]=r}}_renderElementChildren(t){const e=t.node,n=t.intoFragment?document.createDocumentFragment():e,i=t.isApplying;let r=0;for(const s of this.children)if(Nl(s)){if(!i){s.setParent(e);for(const a of s)n.appendChild(a.element)}}else if(os(s))i||(s.isRendered||s.render(),n.appendChild(s.element));else if($e(s))n.appendChild(s);else if(i){const a={children:[],bindings:[],attributes:{}};t.revertData.children.push(a),s._renderNode({intoFragment:!1,node:n.childNodes[r++],isApplying:!0,revertData:a})}else n.appendChild(s.render());t.intoFragment&&e.appendChild(n)}_setUpListeners(t){if(this.eventListeners)for(const e in this.eventListeners){const n=this.eventListeners[e].map(i=>{const[r,s]=e.split("@");return i.activateDomEventListener(r,s,t)});t.revertData&&t.revertData.bindings.push(n)}}_bindToObservable({schema:t,updater:e,data:n}){const i=n.revertData;qh(t,e,n);const r=t.filter(s=>!Vn(s)).filter(s=>s.observable).map(s=>s.activateAttributeListener(t,e,n));i&&i.bindings.push(r)}_revertTemplateFromNode(t,e){for(const i of e.bindings)for(const r of i)r();if(e.text)return void(t.textContent=e.text);const n=t;for(const i in e.attributes){const r=e.attributes[i];r===null?n.removeAttribute(i):n.setAttribute(i,r)}for(let i=0;i<e.children.length;++i)this._revertTemplateFromNode(n.childNodes[i],e.children[i])}}class _i{constructor(t){this.attribute=t.attribute,this.observable=t.observable,this.emitter=t.emitter,this.callback=t.callback}getValue(t){const e=this.observable[this.attribute];return this.callback?this.callback(e,t):e}activateAttributeListener(t,e,n){const i=()=>qh(t,e,n);return this.emitter.listenTo(this.observable,`change:${this.attribute}`,i),()=>{this.emitter.stopListening(this.observable,`change:${this.attribute}`,i)}}}class RA extends _i{constructor(t){super(t),this.eventNameOrFunction=t.eventNameOrFunction}activateDomEventListener(t,e,n){const i=(r,s)=>{e&&!s.target.matches(e)||(typeof this.eventNameOrFunction=="function"?this.eventNameOrFunction(s):this.observable.fire(this.eventNameOrFunction,s))};return this.emitter.listenTo(n.node,t,i),()=>{this.emitter.stopListening(n.node,t,i)}}}class Uh extends _i{constructor(t){super(t),this.valueIfTrue=t.valueIfTrue}getValue(t){return!Vn(super.getValue(t))&&(this.valueIfTrue||!0)}}function is(o){return!!o&&(o.value&&(o=o.value),Array.isArray(o)?o.some(is):o instanceof _i)}function qh(o,t,{node:e}){const n=function(r,s){return r.map(a=>a instanceof _i?a.getValue(s):a)}(o,e);let i;i=o.length==1&&o[0]instanceof Uh?n[0]:n.reduce($h,""),Vn(i)?t.remove():t.set(i)}function FA(o){return{set(t){o.textContent=t},remove(){o.textContent=""}}}function jA(o,t,e){return{set(n){o.setAttributeNS(e,t,n)},remove(){o.removeAttributeNS(e,t)}}}function VA(o,t){return{set(e){o.style[t]=e},remove(){o.style[t]=null}}}function Gh(o){return _l(o,t=>{if(t&&(t instanceof _i||Tl(t)||os(t)||Nl(t)))return t})}function Wh(o){if(typeof o=="string"?o=function(t){return{text:[t]}}(o):o.text&&function(t){t.text=bt(t.text)}(o),o.on&&(o.eventListeners=function(t){for(const e in t)Kh(t,e);return t}(o.on),delete o.on),!o.text){o.attributes&&function(e){for(const n in e)e[n].value&&(e[n].value=bt(e[n].value)),Kh(e,n)}(o.attributes);const t=[];if(o.children)if(Nl(o.children))t.push(o.children);else for(const e of o.children)Tl(e)||os(e)||$e(e)?t.push(e):t.push(new we(e));o.children=t}return o}function Kh(o,t){o[t]=bt(o[t])}function $h(o,t){return Vn(t)?o:Vn(o)?t:`${o} ${t}`}function Yh(o,t){for(const e in t)o[e]?o[e].push(...t[e]):o[e]=t[e]}function Qh(o,t){if(t.attributes&&(o.attributes||(o.attributes={}),Yh(o.attributes,t.attributes)),t.eventListeners&&(o.eventListeners||(o.eventListeners={}),Yh(o.eventListeners,t.eventListeners)),t.text&&o.text.push(...t.text),t.children&&t.children.length){if(o.children.length!=t.children.length)throw new E("ui-template-extend-children-mismatch",o);let e=0;for(const n of t.children)Qh(o.children[e++],n)}}function Vn(o){return!o&&o!==0}function os(o){return o instanceof J}function Tl(o){return o instanceof we}function Nl(o){return o instanceof be}function Zh(o){return _t(o[0])&&o[0].ns}function Jh(o){return o=="class"||o=="style"}var HA=T(2591),j=T.n(HA),UA=T(8639),V=T.n(UA),qA=T(8128),H=T.n(qA),GA=T(8021),U=T.n(GA),WA=T(3051),q=T.n(WA),rs=T(7676),Ci={attributes:{"data-cke":!0}};Ci.setAttributes=U(),Ci.insert=H().bind(null,"head"),Ci.domAPI=V(),Ci.insertStyleElement=q(),j()(rs.A,Ci),rs.A&&rs.A.locals&&rs.A.locals;class J extends le(gt()){constructor(t){super(),this.element=null,this.isRendered=!1,this.locale=t,this.t=t&&t.t,this._viewCollections=new fe,this._unboundChildren=this.createCollection(),this._viewCollections.on("add",(e,n)=>{n.locale=t,n.t=t&&t.t}),this.decorate("render")}get bindTemplate(){return this._bindTemplate?this._bindTemplate:this._bindTemplate=we.bind(this,this)}createCollection(t){const e=new be(t);return this._viewCollections.add(e),e}registerChild(t){Jt(t)||(t=[t]);for(const e of t)this._unboundChildren.add(e)}deregisterChild(t){Jt(t)||(t=[t]);for(const e of t)this._unboundChildren.remove(e)}setTemplate(t){this.template=new we(t)}extendTemplate(t){we.extend(this.template,t)}render(){if(this.isRendered)throw new E("ui-view-render-already-rendered",this);this.template&&(this.element=this.template.render(),this.registerChild(this.template.getViews())),this.isRendered=!0}destroy(){this.stopListening(),this._viewCollections.map(t=>t.destroy()),this.template&&this.template._revertData&&this.template.revert(this.element)}}function ss({emitter:o,activator:t,callback:e,contextElements:n,listenerOptions:i}){o.listenTo(document,"mousedown",(r,s)=>{if(!t())return;const a=typeof s.composedPath=="function"?s.composedPath():[],c=typeof n=="function"?n():n;for(const l of c)if(l.contains(s.target)||a.includes(l))return;e()},i)}function Pl(o){return class extends o{disableCssTransitions(){this._isCssTransitionsDisabled=!0}enableCssTransitions(){this._isCssTransitionsDisabled=!1}constructor(...t){super(...t),this.set("_isCssTransitionsDisabled",!1),this.initializeCssTransitionDisablerMixin()}initializeCssTransitionDisablerMixin(){this.extendTemplate({attributes:{class:[this.bindTemplate.if("_isCssTransitionsDisabled","ck-transitions-disabled")]}})}}}function as({view:o}){o.listenTo(o.element,"submit",(t,e)=>{e.preventDefault(),o.fire("submit")},{useCapture:!0})}function KA({keystrokeHandler:o,focusTracker:t,gridItems:e,numberOfColumns:n,uiLanguageDirection:i}){const r=typeof n=="number"?()=>n:n;function s(l){return d=>{const u=e.find(p=>p.element===t.focusedElement),h=e.getIndex(u),m=l(h,e);e.get(m).focus(),d.stopPropagation(),d.preventDefault()}}function a(l,d){return l===d-1?0:l+1}function c(l,d){return l===0?d-1:l-1}o.set("arrowright",s((l,d)=>i==="rtl"?c(l,d.length):a(l,d.length))),o.set("arrowleft",s((l,d)=>i==="rtl"?a(l,d.length):c(l,d.length))),o.set("arrowup",s((l,d)=>{let u=l-r();return u<0&&(u=l+r()*Math.floor(d.length/r()),u>d.length-1&&(u-=r())),u})),o.set("arrowdown",s((l,d)=>{let u=l+r();return u>d.length-1&&(u=l%r()),u}))}class F extends gt(){constructor(t){super(),this._disableStack=new Set,this.editor=t,this.set("isEnabled",!0)}forceDisabled(t){this._disableStack.add(t),this._disableStack.size==1&&(this.on("set:isEnabled",Xh,{priority:"highest"}),this.isEnabled=!1)}clearForceDisabled(t){this._disableStack.delete(t),this._disableStack.size==0&&(this.off("set:isEnabled",Xh),this.isEnabled=!0)}destroy(){this.stopListening()}static get isContextPlugin(){return!1}static get isOfficialPlugin(){return!1}static get isPremiumPlugin(){return!1}}function Xh(o){o.return=!1,o.stop()}class ot extends gt(){constructor(t){super(),this.editor=t,this.set("value",void 0),this.set("isEnabled",!1),this._affectsData=!0,this._isEnabledBasedOnSelection=!0,this._disableStack=new Set,this.decorate("execute"),this.listenTo(this.editor.model.document,"change",()=>{this.refresh()}),this.listenTo(t,"change:isReadOnly",()=>{this.refresh()}),this.on("set:isEnabled",e=>{if(!this.affectsData)return;const n=t.model.document.selection,i=n.getFirstPosition().root.rootName!="$graveyard"&&t.model.canEditAt(n);(t.isReadOnly||this._isEnabledBasedOnSelection&&!i)&&(e.return=!1,e.stop())},{priority:"highest"}),this.on("execute",e=>{this.isEnabled||e.stop()},{priority:"high"})}get affectsData(){return this._affectsData}set affectsData(t){this._affectsData=t}refresh(){this.isEnabled=!0}forceDisabled(t){this._disableStack.add(t),this._disableStack.size==1&&(this.on("set:isEnabled",tm,{priority:"highest"}),this.isEnabled=!1)}clearForceDisabled(t){this._disableStack.delete(t),this._disableStack.size==0&&(this.off("set:isEnabled",tm),this.refresh())}execute(...t){}destroy(){this.stopListening()}}function tm(o){o.return=!1,o.stop()}class em extends ot{constructor(){super(...arguments),this._childCommandsDefinitions=[]}refresh(){}execute(...t){const e=this._getFirstEnabledCommand();return!!e&&e.execute(t)}registerChildCommand(t,e={}){mu(this._childCommandsDefinitions,{command:t,priority:e.priority||"normal"}),t.on("change:isEnabled",()=>this._checkEnabled()),this._checkEnabled()}_checkEnabled(){this.isEnabled=!!this._getFirstEnabledCommand()}_getFirstEnabledCommand(){const t=this._childCommandsDefinitions.find(({command:e})=>e.isEnabled);return t&&t.command}}class nm extends ut(){constructor(t,e=[],n=[]){super(),this._plugins=new Map,this._context=t,this._availablePlugins=new Map;for(const i of e)i.pluginName&&this._availablePlugins.set(i.pluginName,i);this._contextPlugins=new Map;for(const[i,r]of n)this._contextPlugins.set(i,r),this._contextPlugins.set(r,i),i.pluginName&&this._availablePlugins.set(i.pluginName,i)}*[Symbol.iterator](){for(const t of this._plugins)typeof t[0]=="function"&&(yield t)}get(t){const e=this._plugins.get(t);if(!e){let n=t;throw typeof t=="function"&&(n=t.pluginName||t.name),new E("plugincollection-plugin-not-loaded",this._context,{plugin:n})}return e}has(t){return this._plugins.has(t)}init(t,e=[],n=[]){const i=this,r=this._context;(function p(f,b=new Set){f.forEach(C=>{c(C)&&(b.has(C)||(b.add(C),C.pluginName&&!i._availablePlugins.has(C.pluginName)&&i._availablePlugins.set(C.pluginName,C),C.requires&&p(C.requires,b)))})})(t),h(t);const s=[...function p(f,b=new Set){return f.map(C=>c(C)?C:i._availablePlugins.get(C)).reduce((C,I)=>b.has(I)?C:(b.add(I),I.requires&&(h(I.requires,I),p(I.requires,b).forEach(M=>C.add(M))),C.add(I)),new Set)}(t.filter(p=>!d(p,e)))];(function(p,f){for(const b of f){if(typeof b!="function")throw new E("plugincollection-replace-plugin-invalid-type",null,{pluginItem:b});const C=b.pluginName;if(!C)throw new E("plugincollection-replace-plugin-missing-name",null,{pluginItem:b});if(b.requires&&b.requires.length)throw new E("plugincollection-plugin-for-replacing-cannot-have-dependencies",null,{pluginName:C});const I=i._availablePlugins.get(C);if(!I)throw new E("plugincollection-plugin-for-replacing-not-exist",null,{pluginName:C});const M=p.indexOf(I);if(M===-1){if(i._contextPlugins.has(I))return;throw new E("plugincollection-plugin-for-replacing-not-loaded",null,{pluginName:C})}if(I.requires&&I.requires.length)throw new E("plugincollection-replaced-plugin-cannot-have-dependencies",null,{pluginName:C});p.splice(M,1,b),i._availablePlugins.set(C,b)}})(s,n);const a=s.map(p=>{let f=i._contextPlugins.get(p);return f=f||new p(r),i._add(p,f),f});return m(a,"init").then(()=>m(a,"afterInit")).then(()=>a);function c(p){return typeof p=="function"}function l(p){return c(p)&&!!p.isContextPlugin}function d(p,f){return f.some(b=>b===p||u(p)===b||u(b)===p)}function u(p){return c(p)?p.pluginName||p.name:p}function h(p,f=null){p.map(b=>c(b)?b:i._availablePlugins.get(b)||b).forEach(b=>{(function(C,I){if(!c(C))throw I?new E("plugincollection-soft-required",r,{missingPlugin:C,requiredBy:u(I)}):new E("plugincollection-plugin-not-found",r,{plugin:C})})(b,f),function(C,I){if(l(I)&&!l(C))throw new E("plugincollection-context-required",r,{plugin:u(C),requiredBy:u(I)})}(b,f),function(C,I){if(I&&d(C,e))throw new E("plugincollection-required",r,{plugin:u(C),requiredBy:u(I)})}(b,f)})}function m(p,f){return p.reduce((b,C)=>C[f]?i._contextPlugins.has(C)?b:b.then(C[f].bind(C)):b,Promise.resolve())}}destroy(){const t=[];for(const[,e]of this)typeof e.destroy!="function"||this._contextPlugins.has(e)||t.push(e.destroy());return Promise.all(t)}_add(t,e){this._plugins.set(t,e);const n=t.pluginName;if(n){if(this._plugins.has(n))throw new E("plugincollection-plugin-name-conflict",null,{pluginName:n,plugin1:this._plugins.get(n).constructor,plugin2:t});this._plugins.set(n,e)}}}class im{constructor(t){this._contextOwner=null;const{translations:e,...n}=t||{};this.config=new mh(n,this.constructor.defaultConfig);const i=this.constructor.builtinPlugins;this.config.define("plugins",i),this.plugins=new nm(this,i);const r=this.config.get("language")||{};this.locale=new LA({uiLanguage:typeof r=="string"?r:r.ui,contentLanguage:this.config.get("language.content"),translations:e}),this.t=this.locale.t,this.editors=new fe}initPlugins(){const t=this.config.get("plugins")||[],e=this.config.get("substitutePlugins")||[];for(const n of t.concat(e)){if(typeof n!="function")throw new E("context-initplugins-constructor-only",null,{Plugin:n});if(n.isContextPlugin!==!0)throw new E("context-initplugins-invalid-plugin",null,{Plugin:n})}return this.plugins.init(t,[],e)}destroy(){return Promise.all(Array.from(this.editors,t=>t.destroy())).then(()=>this.plugins.destroy())}_addEditor(t,e){if(this._contextOwner)throw new E("context-addeditor-private-context");this.editors.add(t),e&&(this._contextOwner=t)}_removeEditor(t){return this.editors.has(t)&&this.editors.remove(t),this._contextOwner===t?this.destroy():Promise.resolve()}_getEditorConfig(){const t={};for(const e of this.config.names())["plugins","removePlugins","extraPlugins"].includes(e)||(t[e]=this.config.get(e));return t}static create(t){return new Promise(e=>{const n=new this(t);e(n.initPlugins().then(()=>n))})}}class cs extends gt(){constructor(t){super(),this.context=t}destroy(){this.stopListening()}static get isContextPlugin(){return!0}static get isOfficialPlugin(){return!1}static get isPremiumPlugin(){return!1}}var ls=T(4098),vi={attributes:{"data-cke":!0}};vi.setAttributes=U(),vi.insert=H().bind(null,"head"),vi.domAPI=V(),vi.insertStyleElement=q(),j()(ls.A,vi),ls.A&&ls.A.locals&&ls.A.locals;const ds=new WeakMap;let om=!1;function rm({view:o,element:t,text:e,isDirectHost:n=!0,keepOnFocus:i=!1}){const r=o.document;function s(a){ds.get(r).set(t,{text:a,isDirectHost:n,keepOnFocus:i,hostElement:n?t:null}),o.change(c=>Ll(r,c))}ds.has(r)||(ds.set(r,new Map),r.registerPostFixer(a=>Ll(r,a)),r.on("change:isComposing",()=>{o.change(a=>Ll(r,a))},{priority:"high"})),t.is("editableElement")&&t.on("change:placeholder",(a,c,l)=>{s(l)}),t.placeholder?s(t.placeholder):e&&s(e),e&&function(){om||st("enableplaceholder-deprecated-text-option"),om=!0}()}function $A(o,t){return!t.hasClass("ck-placeholder")&&(o.addClass("ck-placeholder",t),!0)}function YA(o,t){return!!t.hasClass("ck-placeholder")&&(o.removeClass("ck-placeholder",t),!0)}function QA(o,t){if(!o.isAttached()||Array.from(o.getChildren()).some(i=>!i.is("uiElement")))return!1;const e=o.document,n=e.selection.anchor;return(!e.isComposing||!n||n.parent!==o)&&(!!t||!e.isFocused||!!n&&n.parent!==o)}function Ll(o,t){const e=ds.get(o),n=[];let i=!1;for(const[r,s]of e)s.isDirectHost&&(n.push(r),sm(t,r,s)&&(i=!0));for(const[r,s]of e){if(s.isDirectHost)continue;const a=ZA(r);a&&(n.includes(a)||(s.hostElement=a,sm(t,r,s)&&(i=!0)))}return i}function sm(o,t,e){const{text:n,isDirectHost:i,hostElement:r}=e;let s=!1;return r.getAttribute("data-placeholder")!==n&&(o.setAttribute("data-placeholder",n,r),s=!0),(i||t.childCount==1)&&QA(r,e.keepOnFocus)?$A(o,r)&&(s=!0):YA(o,r)&&(s=!0),s}function ZA(o){if(o.childCount){const t=o.getChild(0);if(t.is("element")&&!t.is("uiElement")&&!t.is("attributeElement"))return t}return null}class gn{is(){throw new Error("is() method is abstract")}}const am=function(o){return Al(o,4)};class pn extends ut(gn){constructor(t){super(),this.document=t,this.parent=null}get index(){let t;if(!this.parent)return null;if((t=this.parent.getChildIndex(this))==-1)throw new E("view-node-not-found-in-parent",this);return t}get nextSibling(){const t=this.index;return t!==null&&this.parent.getChild(t+1)||null}get previousSibling(){const t=this.index;return t!==null&&this.parent.getChild(t-1)||null}get root(){let t=this;for(;t.parent;)t=t.parent;return t}isAttached(){return this.root.is("rootElement")}getPath(){const t=[];let e=this;for(;e.parent;)t.unshift(e.index),e=e.parent;return t}getAncestors(t={}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}getCommonAncestor(t,e={}){const n=this.getAncestors(e),i=t.getAncestors(e);let r=0;for(;n[r]==i[r]&&n[r];)r++;return r===0?null:n[r-1]}isBefore(t){if(this==t||this.root!==t.root)return!1;const e=this.getPath(),n=t.getPath(),i=Gt(e,n);switch(i){case"prefix":return!0;case"extension":return!1;default:return e[i]<n[i]}}isAfter(t){return this!=t&&this.root===t.root&&!this.isBefore(t)}_remove(){this.parent._removeChildren(this.index)}_fireChange(t,e){this.fire(`change:${t}`,e),this.parent&&this.parent._fireChange(t,e)}toJSON(){const t=am(this);return delete t.parent,t}}pn.prototype.is=function(o){return o==="node"||o==="view:node"};class pt extends pn{constructor(t,e){super(t),this._textData=e}get data(){return this._textData}get _data(){return this.data}set _data(t){this._fireChange("text",this),this._textData=t}isSimilar(t){return t instanceof pt&&(this===t||this.data===t.data)}_clone(){return new pt(this.document,this.data)}}pt.prototype.is=function(o){return o==="$text"||o==="view:$text"||o==="text"||o==="view:text"||o==="node"||o==="view:node"};class Se extends gn{constructor(t,e,n){if(super(),this.textNode=t,e<0||e>t.data.length)throw new E("view-textproxy-wrong-offsetintext",this);if(n<0||e+n>t.data.length)throw new E("view-textproxy-wrong-length",this);this.data=t.data.substring(e,e+n),this.offsetInText=e}get offsetSize(){return this.data.length}get isPartial(){return this.data.length!==this.textNode.data.length}get parent(){return this.textNode.parent}get root(){return this.textNode.root}get document(){return this.textNode.document}getAncestors(t={}){const e=[];let n=t.includeSelf?this.textNode:this.parent;for(;n!==null;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}}Se.prototype.is=function(o){return o==="$textProxy"||o==="view:$textProxy"||o==="textProxy"||o==="view:textProxy"};class Me{constructor(...t){this._patterns=[],this.add(...t)}add(...t){for(let e of t)(typeof e=="string"||e instanceof RegExp)&&(e={name:e}),this._patterns.push(e)}match(...t){for(const e of t)for(const n of this._patterns){const i=cm(e,n);if(i)return{element:e,pattern:n,match:i}}return null}matchAll(...t){const e=[];for(const n of t)for(const i of this._patterns){const r=cm(n,i);r&&e.push({element:n,pattern:i,match:r})}return e.length>0?e:null}getElementName(){if(this._patterns.length!==1)return null;const t=this._patterns[0],e=t.name;return typeof t=="function"||!e||e instanceof RegExp?null:e}}function cm(o,t){if(typeof t=="function")return t(o);const e={};return t.name&&(e.name=function(n,i){return n instanceof RegExp?!!i.match(n):n===i}(t.name,o.name),!e.name)||t.attributes&&(e.attributes=function(n,i){const r=new Set(i.getAttributeKeys());return te(n)?(n.style!==void 0&&st("matcher-pattern-deprecated-attributes-style-key",n),n.class!==void 0&&st("matcher-pattern-deprecated-attributes-class-key",n)):(r.delete("style"),r.delete("class")),zl(n,r,s=>i.getAttribute(s))}(t.attributes,o),!e.attributes)||t.classes&&(e.classes=function(n,i){return zl(n,i.getClassNames(),()=>{})}(t.classes,o),!e.classes)||t.styles&&(e.styles=function(n,i){return zl(n,i.getStyleNames(!0),r=>i.getStyle(r))}(t.styles,o),!e.styles)?null:e}function zl(o,t,e){const n=function(s){return Array.isArray(s)?s.map(a=>te(a)?(a.key!==void 0&&a.value!==void 0||st("matcher-pattern-missing-key-or-value",a),[a.key,a.value]):[a,!0]):te(s)?Object.entries(s):[[s,!0]]}(o),i=Array.from(t),r=[];if(n.forEach(([s,a])=>{i.forEach(c=>{(function(l,d){return l===!0||l===d||l instanceof RegExp&&d.match(l)})(s,c)&&function(l,d,u){if(l===!0)return!0;const h=u(d);return l===h||l instanceof RegExp&&!!String(h).match(l)}(a,c,e)&&r.push(c)})}),n.length&&!(r.length<n.length))return r}const us=function(o){return typeof o=="symbol"||ae(o)&&We(o)=="[object Symbol]"};var JA=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,XA=/^\w*$/;const Ol=function(o,t){if(Xt(o))return!1;var e=typeof o;return!(e!="number"&&e!="symbol"&&e!="boolean"&&o!=null&&!us(o))||XA.test(o)||!JA.test(o)||t!=null&&o in Object(t)};function Rl(o,t){if(typeof o!="function"||t!=null&&typeof t!="function")throw new TypeError("Expected a function");var e=function(){var n=arguments,i=t?t.apply(this,n):n[0],r=e.cache;if(r.has(i))return r.get(i);var s=o.apply(this,n);return e.cache=r.set(i,s)||r,s};return e.cache=new(Rl.Cache||Gr),e}Rl.Cache=Gr;const t0=Rl,e0=function(o){var t=t0(o,function(n){return e.size===500&&e.clear(),n}),e=t.cache;return t};var n0=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i0=/\\(\\)?/g,o0=e0(function(o){var t=[];return o.charCodeAt(0)===46&&t.push(""),o.replace(n0,function(e,n,i,r){t.push(i?r.replace(i0,"$1"):n||e)}),t});const r0=o0,s0=function(o,t){for(var e=-1,n=o==null?0:o.length,i=Array(n);++e<n;)i[e]=t(o[e],e,o);return i};var lm=De?De.prototype:void 0,dm=lm?lm.toString:void 0;const a0=function o(t){if(typeof t=="string")return t;if(Xt(t))return s0(t,o)+"";if(us(t))return dm?dm.call(t):"";var e=t+"";return e=="0"&&1/t==-1/0?"-0":e},Fl=function(o){return o==null?"":a0(o)},hs=function(o,t){return Xt(o)?o:Ol(o,t)?[o]:r0(Fl(o))},c0=function(o){var t=o==null?0:o.length;return t?o[t-1]:void 0},Hn=function(o){if(typeof o=="string"||us(o))return o;var t=o+"";return t=="0"&&1/o==-1/0?"-0":t},jl=function(o,t){for(var e=0,n=(t=hs(t,o)).length;o!=null&&e<n;)o=o[Hn(t[e++])];return e&&e==n?o:void 0},um=function(o,t,e){var n=-1,i=o.length;t<0&&(t=-t>i?0:i+t),(e=e>i?i:e)<0&&(e+=i),i=t>e?0:e-t>>>0,t>>>=0;for(var r=Array(i);++n<i;)r[n]=o[n+t];return r},l0=function(o,t){return t.length<2?o:jl(o,um(t,0,-1))},d0=function(o,t){return t=hs(t,o),(o=l0(o,t))==null||delete o[Hn(c0(t))]},u0=function(o,t){return o==null||d0(o,t)},yi=function(o,t,e){var n=o==null?void 0:jl(o,t);return n===void 0?e:n},h0=function(o,t,e,n){if(!_t(o))return o;for(var i=-1,r=(t=hs(t,o)).length,s=r-1,a=o;a!=null&&++i<r;){var c=Hn(t[i]),l=e;if(c==="__proto__"||c==="constructor"||c==="prototype")return o;if(i!=s){var d=a[c];(l=n?n(d,c,a):void 0)===void 0&&(l=_t(d)?d:Yr(t[i+1])?[]:{})}al(a,c,l),a=a[c]}return o},m0=function(o,t,e){return o==null?o:h0(o,t,e)};class Vl{constructor(t){this._styles={},this._styleProcessor=t}get isEmpty(){return!Object.entries(this._styles).length}get size(){return this.isEmpty?0:this.getStyleNames().length}setTo(t){this.clear();const e=function(n){let i=null,r=0,s=0,a=null;const c=new Map;if(n==="")return c;n.charAt(n.length-1)!=";"&&(n+=";");for(let l=0;l<n.length;l++){const d=n.charAt(l);if(i===null)switch(d){case":":a||(a=n.substr(r,l-r),s=l+1);break;case'"':case"'":i=d;break;case";":{const u=n.substr(s,l-s);a&&c.set(a.trim(),u.trim()),a=null,r=l+1;break}}else d===i&&(i=null)}return c}(t);for(const[n,i]of e)this._styleProcessor.toNormalizedForm(n,i,this._styles)}has(t){if(this.isEmpty)return!1;const e=this._styleProcessor.getReducedForm(t,this._styles).find(([n])=>n===t);return Array.isArray(e)}set(t,e){if(_t(t))for(const[n,i]of Object.entries(t))this._styleProcessor.toNormalizedForm(n,i,this._styles);else this._styleProcessor.toNormalizedForm(t,e,this._styles)}remove(t){const e=Hl(t);u0(this._styles,e),delete this._styles[t],this._cleanEmptyObjectsOnPath(e)}getNormalized(t){return this._styleProcessor.getNormalized(t,this._styles)}toString(){return this.isEmpty?"":this.getStylesEntries().map(t=>t.join(":")).sort().join(";")+";"}getAsString(t){if(this.isEmpty)return;if(this._styles[t]&&!_t(this._styles[t]))return this._styles[t];const e=this._styleProcessor.getReducedForm(t,this._styles).find(([n])=>n===t);return Array.isArray(e)?e[1]:void 0}getStyleNames(t=!1){return this.isEmpty?[]:t?this._styleProcessor.getStyleNames(this._styles):this.getStylesEntries().map(([e])=>e)}clear(){this._styles={}}getStylesEntries(){const t=[],e=Object.keys(this._styles);for(const n of e)t.push(...this._styleProcessor.getReducedForm(n,this._styles));return t}_cleanEmptyObjectsOnPath(t){const e=t.split(".");if(!(e.length>1))return;const n=e.splice(0,e.length-1).join("."),i=yi(this._styles,n);i&&!Object.keys(i).length&&this.remove(n)}}class g0{constructor(){this._normalizers=new Map,this._extractors=new Map,this._reducers=new Map,this._consumables=new Map}toNormalizedForm(t,e,n){if(_t(e))Ul(n,Hl(t),e);else if(this._normalizers.has(t)){const i=this._normalizers.get(t),{path:r,value:s}=i(e);Ul(n,r,s)}else Ul(n,t,e)}getNormalized(t,e){if(!t)return Il({},e);if(e[t]!==void 0)return e[t];if(this._extractors.has(t)){const n=this._extractors.get(t);if(typeof n=="string")return yi(e,n);const i=n(t,e);if(i)return i}return yi(e,Hl(t))}getReducedForm(t,e){const n=this.getNormalized(t,e);return n===void 0?[]:this._reducers.has(t)?this._reducers.get(t)(n):[[t,n]]}getStyleNames(t){const e=new Set;for(const n of this._consumables.keys()){const i=this.getNormalized(n,t);i&&(typeof i!="object"||Object.keys(i).length)&&e.add(n)}for(const n of Object.keys(t))e.add(n);return Array.from(e)}getRelatedStyles(t){return this._consumables.get(t)||[]}setNormalizer(t,e){this._normalizers.set(t,e)}setExtractor(t,e){this._extractors.set(t,e)}setReducer(t,e){this._reducers.set(t,e)}setStyleRelation(t,e){this._mapStyleNames(t,e);for(const n of e)this._mapStyleNames(n,[t])}_mapStyleNames(t,e){this._consumables.has(t)||this._consumables.set(t,[]),this._consumables.get(t).push(...e)}}function Hl(o){return o.replace("-",".")}function Ul(o,t,e){let n=e;_t(e)&&(n=Il({},yi(o,t),e)),m0(o,t,n)}class ee extends pn{constructor(t,e,n,i){if(super(t),this._unsafeAttributesToRender=[],this._customProperties=new Map,this.name=e,this._attrs=function(r){const s=Ie(r);for(const[a,c]of s)c===null?s.delete(a):typeof c!="string"&&s.set(a,String(c));return s}(n),this._children=[],i&&this._insertChild(0,i),this._classes=new Set,this._attrs.has("class")){const r=this._attrs.get("class");hm(this._classes,r),this._attrs.delete("class")}this._styles=new Vl(this.document.stylesProcessor),this._attrs.has("style")&&(this._styles.setTo(this._attrs.get("style")),this._attrs.delete("style"))}get childCount(){return this._children.length}get isEmpty(){return this._children.length===0}getChild(t){return this._children[t]}getChildIndex(t){return this._children.indexOf(t)}getChildren(){return this._children[Symbol.iterator]()}*getAttributeKeys(){this._classes.size>0&&(yield"class"),this._styles.isEmpty||(yield"style"),yield*this._attrs.keys()}*getAttributes(){yield*this._attrs.entries(),this._classes.size>0&&(yield["class",this.getAttribute("class")]),this._styles.isEmpty||(yield["style",this.getAttribute("style")])}getAttribute(t){if(t=="class")return this._classes.size>0?[...this._classes].join(" "):void 0;if(t=="style"){const e=this._styles.toString();return e==""?void 0:e}return this._attrs.get(t)}hasAttribute(t){return t=="class"?this._classes.size>0:t=="style"?!this._styles.isEmpty:this._attrs.has(t)}isSimilar(t){if(!(t instanceof ee))return!1;if(this===t)return!0;if(this.name!=t.name||this._attrs.size!==t._attrs.size||this._classes.size!==t._classes.size||this._styles.size!==t._styles.size)return!1;for(const[e,n]of this._attrs)if(!t._attrs.has(e)||t._attrs.get(e)!==n)return!1;for(const e of this._classes)if(!t._classes.has(e))return!1;for(const e of this._styles.getStyleNames())if(!t._styles.has(e)||t._styles.getAsString(e)!==this._styles.getAsString(e))return!1;return!0}hasClass(...t){for(const e of t)if(!this._classes.has(e))return!1;return!0}getClassNames(){return this._classes.keys()}getStyle(t){return this._styles.getAsString(t)}getNormalizedStyle(t){return this._styles.getNormalized(t)}getStyleNames(t){return this._styles.getStyleNames(t)}hasStyle(...t){for(const e of t)if(!this._styles.has(e))return!1;return!0}findAncestor(...t){const e=new Me(...t);let n=this.parent;for(;n&&!n.is("documentFragment");){if(e.match(n))return n;n=n.parent}return null}getCustomProperty(t){return this._customProperties.get(t)}*getCustomProperties(){yield*this._customProperties.entries()}getIdentity(){const t=Array.from(this._classes).sort().join(","),e=this._styles.toString(),n=Array.from(this._attrs).map(i=>`${i[0]}="${i[1]}"`).sort().join(" ");return this.name+(t==""?"":` class="${t}"`)+(e?` style="${e}"`:"")+(n==""?"":` ${n}`)}shouldRenderUnsafeAttribute(t){return this._unsafeAttributesToRender.includes(t)}_clone(t=!1){const e=[];if(t)for(const i of this.getChildren())e.push(i._clone(t));const n=new this.constructor(this.document,this.name,this._attrs,e);return n._classes=new Set(this._classes),n._styles.set(this._styles.getNormalized()),n._customProperties=new Map(this._customProperties),n.getFillerOffset=this.getFillerOffset,n._unsafeAttributesToRender=this._unsafeAttributesToRender,n}_appendChild(t){return this._insertChild(this.childCount,t)}_insertChild(t,e){this._fireChange("children",this);let n=0;const i=function(r,s){return typeof s=="string"?[new pt(r,s)]:(Jt(s)||(s=[s]),Array.from(s).map(a=>typeof a=="string"?new pt(r,a):a instanceof Se?new pt(r,a.data):a))}(this.document,e);for(const r of i)r.parent!==null&&r._remove(),r.parent=this,r.document=this.document,this._children.splice(t,0,r),t++,n++;return n}_removeChildren(t,e=1){this._fireChange("children",this);for(let n=t;n<t+e;n++)this._children[n].parent=null;return this._children.splice(t,e)}_setAttribute(t,e){const n=String(e);this._fireChange("attributes",this),t=="class"?hm(this._classes,n):t=="style"?this._styles.setTo(n):this._attrs.set(t,n)}_removeAttribute(t){return this._fireChange("attributes",this),t=="class"?this._classes.size>0&&(this._classes.clear(),!0):t=="style"?!this._styles.isEmpty&&(this._styles.clear(),!0):this._attrs.delete(t)}_addClass(t){this._fireChange("attributes",this);for(const e of bt(t))this._classes.add(e)}_removeClass(t){this._fireChange("attributes",this);for(const e of bt(t))this._classes.delete(e)}_setStyle(t,e){this._fireChange("attributes",this),typeof t!="string"?this._styles.set(t):this._styles.set(t,e)}_removeStyle(t){this._fireChange("attributes",this);for(const e of bt(t))this._styles.remove(e)}_setCustomProperty(t,e){this._customProperties.set(t,e)}_removeCustomProperty(t){return this._customProperties.delete(t)}}function hm(o,t){const e=t.split(/\s+/);o.clear(),e.forEach(n=>o.add(n))}ee.prototype.is=function(o,t){return t?t===this.name&&(o==="element"||o==="view:element"):o==="element"||o==="view:element"||o==="node"||o==="view:node"};class xi extends ee{constructor(t,e,n,i){super(t,e,n,i),this.getFillerOffset=p0}}function p0(){const o=[...this.getChildren()],t=o[this.childCount-1];if(t&&t.is("element","br"))return this.childCount;for(const e of o)if(!e.is("uiElement"))return null;return this.childCount}xi.prototype.is=function(o,t){return t?t===this.name&&(o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"):o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class ms extends gt(xi){constructor(t,e,n,i){super(t,e,n,i),this.set("isReadOnly",!1),this.set("isFocused",!1),this.set("placeholder",void 0),this.bind("isReadOnly").to(t),this.bind("isFocused").to(t,"isFocused",r=>r&&t.selection.editableElement==this),this.listenTo(t.selection,"change",()=>{this.isFocused=t.isFocused&&t.selection.editableElement==this})}destroy(){this.stopListening()}}ms.prototype.is=function(o,t){return t?t===this.name&&(o==="editableElement"||o==="view:editableElement"||o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"):o==="editableElement"||o==="view:editableElement"||o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};const mm=Symbol("rootName");class gm extends ms{constructor(t,e){super(t,e),this.rootName="main"}get rootName(){return this.getCustomProperty(mm)}set rootName(t){this._setCustomProperty(mm,t)}set _name(t){this.name=t}}gm.prototype.is=function(o,t){return t?t===this.name&&(o==="rootElement"||o==="view:rootElement"||o==="editableElement"||o==="view:editableElement"||o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"):o==="rootElement"||o==="view:rootElement"||o==="editableElement"||o==="view:editableElement"||o==="containerElement"||o==="view:containerElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class kn{constructor(t={}){if(!t.boundaries&&!t.startPosition)throw new E("view-tree-walker-no-start-position",null);if(t.direction&&t.direction!="forward"&&t.direction!="backward")throw new E("view-tree-walker-unknown-direction",t.startPosition,{direction:t.direction});this.boundaries=t.boundaries||null,t.startPosition?this._position=G._createAt(t.startPosition):this._position=G._createAt(t.boundaries[t.direction=="backward"?"end":"start"]),this.direction=t.direction||"forward",this.singleCharacters=!!t.singleCharacters,this.shallow=!!t.shallow,this.ignoreElementEnd=!!t.ignoreElementEnd,this._boundaryStartParent=this.boundaries?this.boundaries.start.parent:null,this._boundaryEndParent=this.boundaries?this.boundaries.end.parent:null}[Symbol.iterator](){return this}get position(){return this._position}skip(t){let e,n;do n=this.position,e=this.next();while(!e.done&&t(e.value));e.done||(this._position=n)}next(){return this.direction=="forward"?this._next():this._previous()}_next(){let t=this.position.clone();const e=this.position,n=t.parent;if(n.parent===null&&t.offset===n.childCount)return{done:!0,value:void 0};if(n===this._boundaryEndParent&&t.offset==this.boundaries.end.offset)return{done:!0,value:void 0};let i;if(n instanceof pt){if(t.isAtEnd)return this._position=G._createAfter(n),this._next();i=n.data[t.offset]}else i=n.getChild(t.offset);if(i instanceof ee){if(this.shallow){if(this.boundaries&&this.boundaries.end.isBefore(t))return{done:!0,value:void 0};t.offset++}else t=new G(i,0);return this._position=t,this._formatReturnValue("elementStart",i,e,t,1)}if(i instanceof pt){if(this.singleCharacters)return t=new G(i,0),this._position=t,this._next();let r,s=i.data.length;return i==this._boundaryEndParent?(s=this.boundaries.end.offset,r=new Se(i,0,s),t=G._createAfter(r)):(r=new Se(i,0,i.data.length),t.offset++),this._position=t,this._formatReturnValue("text",r,e,t,s)}if(typeof i=="string"){let r;this.singleCharacters?r=1:r=(n===this._boundaryEndParent?this.boundaries.end.offset:n.data.length)-t.offset;const s=new Se(n,t.offset,r);return t.offset+=r,this._position=t,this._formatReturnValue("text",s,e,t,r)}return t=G._createAfter(n),this._position=t,this.ignoreElementEnd?this._next():this._formatReturnValue("elementEnd",n,e,t)}_previous(){let t=this.position.clone();const e=this.position,n=t.parent;if(n.parent===null&&t.offset===0)return{done:!0,value:void 0};if(n==this._boundaryStartParent&&t.offset==this.boundaries.start.offset)return{done:!0,value:void 0};let i;if(n instanceof pt){if(t.isAtStart)return this._position=G._createBefore(n),this._previous();i=n.data[t.offset-1]}else i=n.getChild(t.offset-1);if(i instanceof ee)return this.shallow?(t.offset--,this._position=t,this._formatReturnValue("elementStart",i,e,t,1)):(t=new G(i,i.childCount),this._position=t,this.ignoreElementEnd?this._previous():this._formatReturnValue("elementEnd",i,e,t));if(i instanceof pt){if(this.singleCharacters)return t=new G(i,i.data.length),this._position=t,this._previous();let r,s=i.data.length;if(i==this._boundaryStartParent){const a=this.boundaries.start.offset;r=new Se(i,a,i.data.length-a),s=r.data.length,t=G._createBefore(r)}else r=new Se(i,0,i.data.length),t.offset--;return this._position=t,this._formatReturnValue("text",r,e,t,s)}if(typeof i=="string"){let r;if(this.singleCharacters)r=1;else{const a=n===this._boundaryStartParent?this.boundaries.start.offset:0;r=t.offset-a}t.offset-=r;const s=new Se(n,t.offset,r);return this._position=t,this._formatReturnValue("text",s,e,t,r)}return t=G._createBefore(n),this._position=t,this._formatReturnValue("elementStart",n,e,t,1)}_formatReturnValue(t,e,n,i,r){return e instanceof Se&&(e.offsetInText+e.data.length==e.textNode.data.length&&(this.direction!="forward"||this.boundaries&&this.boundaries.end.isEqual(this.position)?n=G._createAfter(e.textNode):(i=G._createAfter(e.textNode),this._position=i)),e.offsetInText===0&&(this.direction!="backward"||this.boundaries&&this.boundaries.start.isEqual(this.position)?n=G._createBefore(e.textNode):(i=G._createBefore(e.textNode),this._position=i))),{done:!1,value:{type:t,item:e,previousPosition:n,nextPosition:i,length:r}}}}class G extends gn{constructor(t,e){super(),this.parent=t,this.offset=e}get nodeAfter(){return this.parent.is("$text")?null:this.parent.getChild(this.offset)||null}get nodeBefore(){return this.parent.is("$text")?null:this.parent.getChild(this.offset-1)||null}get isAtStart(){return this.offset===0}get isAtEnd(){const t=this.parent.is("$text")?this.parent.data.length:this.parent.childCount;return this.offset===t}get root(){return this.parent.root}get editableElement(){let t=this.parent;for(;!(t instanceof ms);){if(!t.parent)return null;t=t.parent}return t}getShiftedBy(t){const e=G._createAt(this),n=e.offset+t;return e.offset=n<0?0:n,e}getLastMatchingPosition(t,e={}){e.startPosition=this;const n=new kn(e);return n.skip(t),n.position}getAncestors(){return this.parent.is("documentFragment")?[this.parent]:this.parent.getAncestors({includeSelf:!0})}getCommonAncestor(t){const e=this.getAncestors(),n=t.getAncestors();let i=0;for(;e[i]==n[i]&&e[i];)i++;return i===0?null:e[i-1]}isEqual(t){return this.parent==t.parent&&this.offset==t.offset}isBefore(t){return this.compareWith(t)=="before"}isAfter(t){return this.compareWith(t)=="after"}compareWith(t){if(this.root!==t.root)return"different";if(this.isEqual(t))return"same";const e=this.parent.is("node")?this.parent.getPath():[],n=t.parent.is("node")?t.parent.getPath():[];e.push(this.offset),n.push(t.offset);const i=Gt(e,n);switch(i){case"prefix":return"before";case"extension":return"after";default:return e[i]<n[i]?"before":"after"}}getWalker(t={}){return t.startPosition=this,new kn(t)}clone(){return new G(this.parent,this.offset)}static _createAt(t,e){if(t instanceof G)return new this(t.parent,t.offset);{const n=t;if(e=="end")e=n.is("$text")?n.data.length:n.childCount;else{if(e=="before")return this._createBefore(n);if(e=="after")return this._createAfter(n);if(e!==0&&!e)throw new E("view-createpositionat-offset-required",n)}return new G(n,e)}}static _createAfter(t){if(t.is("$textProxy"))return new G(t.textNode,t.offsetInText+t.data.length);if(!t.parent)throw new E("view-position-after-root",t,{root:t});return new G(t.parent,t.index+1)}static _createBefore(t){if(t.is("$textProxy"))return new G(t.textNode,t.offsetInText);if(!t.parent)throw new E("view-position-before-root",t,{root:t});return new G(t.parent,t.index)}}G.prototype.is=function(o){return o==="position"||o==="view:position"};class et extends gn{constructor(t,e=null){super(),this.start=t.clone(),this.end=e?e.clone():t.clone()}*[Symbol.iterator](){yield*new kn({boundaries:this,ignoreElementEnd:!0})}get isCollapsed(){return this.start.isEqual(this.end)}get isFlat(){return this.start.parent===this.end.parent}get root(){return this.start.root}getEnlarged(){let t=this.start.getLastMatchingPosition(gs,{direction:"backward"}),e=this.end.getLastMatchingPosition(gs);return t.parent.is("$text")&&t.isAtStart&&(t=G._createBefore(t.parent)),e.parent.is("$text")&&e.isAtEnd&&(e=G._createAfter(e.parent)),new et(t,e)}getTrimmed(){let t=this.start.getLastMatchingPosition(gs);if(t.isAfter(this.end)||t.isEqual(this.end))return new et(t,t);let e=this.end.getLastMatchingPosition(gs,{direction:"backward"});const n=t.nodeAfter,i=e.nodeBefore;return n&&n.is("$text")&&(t=new G(n,0)),i&&i.is("$text")&&(e=new G(i,i.data.length)),new et(t,e)}isEqual(t){return this==t||this.start.isEqual(t.start)&&this.end.isEqual(t.end)}containsPosition(t){return t.isAfter(this.start)&&t.isBefore(this.end)}containsRange(t,e=!1){t.isCollapsed&&(e=!1);const n=this.containsPosition(t.start)||e&&this.start.isEqual(t.start),i=this.containsPosition(t.end)||e&&this.end.isEqual(t.end);return n&&i}getDifference(t){const e=[];return this.isIntersecting(t)?(this.containsPosition(t.start)&&e.push(new et(this.start,t.start)),this.containsPosition(t.end)&&e.push(new et(t.end,this.end))):e.push(this.clone()),e}getIntersection(t){if(this.isIntersecting(t)){let e=this.start,n=this.end;return this.containsPosition(t.start)&&(e=t.start),this.containsPosition(t.end)&&(n=t.end),new et(e,n)}return null}getWalker(t={}){return t.boundaries=this,new kn(t)}getCommonAncestor(){return this.start.getCommonAncestor(this.end)}getContainedElement(){if(this.isCollapsed)return null;let t=this.start.nodeAfter,e=this.end.nodeBefore;return this.start.parent.is("$text")&&this.start.isAtEnd&&this.start.parent.nextSibling&&(t=this.start.parent.nextSibling),this.end.parent.is("$text")&&this.end.isAtStart&&this.end.parent.previousSibling&&(e=this.end.parent.previousSibling),t&&t.is("element")&&t===e?t:null}clone(){return new et(this.start,this.end)}*getItems(t={}){t.boundaries=this,t.ignoreElementEnd=!0;const e=new kn(t);for(const n of e)yield n.item}*getPositions(t={}){t.boundaries=this;const e=new kn(t);yield e.position;for(const n of e)yield n.nextPosition}isIntersecting(t){return this.start.isBefore(t.end)&&this.end.isAfter(t.start)}static _createFromParentsAndOffsets(t,e,n,i){return new this(new G(t,e),new G(n,i))}static _createFromPositionAndShift(t,e){const n=t,i=t.getShiftedBy(e);return e>0?new this(n,i):new this(i,n)}static _createIn(t){return this._createFromParentsAndOffsets(t,0,t,t.childCount)}static _createOn(t){const e=t.is("$textProxy")?t.offsetSize:1;return this._createFromPositionAndShift(G._createBefore(t),e)}}function gs(o){return!(!o.item.is("attributeElement")&&!o.item.is("uiElement"))}et.prototype.is=function(o){return o==="range"||o==="view:range"};class Ae extends ut(gn){constructor(...t){super(),this._ranges=[],this._lastRangeBackward=!1,this._isFake=!1,this._fakeSelectionLabel="",t.length&&this.setTo(...t)}get isFake(){return this._isFake}get fakeSelectionLabel(){return this._fakeSelectionLabel}get anchor(){if(!this._ranges.length)return null;const t=this._ranges[this._ranges.length-1];return(this._lastRangeBackward?t.end:t.start).clone()}get focus(){if(!this._ranges.length)return null;const t=this._ranges[this._ranges.length-1];return(this._lastRangeBackward?t.start:t.end).clone()}get isCollapsed(){return this.rangeCount===1&&this._ranges[0].isCollapsed}get rangeCount(){return this._ranges.length}get isBackward(){return!this.isCollapsed&&this._lastRangeBackward}get editableElement(){return this.anchor?this.anchor.editableElement:null}*getRanges(){for(const t of this._ranges)yield t.clone()}getFirstRange(){let t=null;for(const e of this._ranges)t&&!e.start.isBefore(t.start)||(t=e);return t?t.clone():null}getLastRange(){let t=null;for(const e of this._ranges)t&&!e.end.isAfter(t.end)||(t=e);return t?t.clone():null}getFirstPosition(){const t=this.getFirstRange();return t?t.start.clone():null}getLastPosition(){const t=this.getLastRange();return t?t.end.clone():null}isEqual(t){if(this.isFake!=t.isFake||this.isFake&&this.fakeSelectionLabel!=t.fakeSelectionLabel||this.rangeCount!=t.rangeCount)return!1;if(this.rangeCount===0)return!0;if(!this.anchor.isEqual(t.anchor)||!this.focus.isEqual(t.focus))return!1;for(const e of this._ranges){let n=!1;for(const i of t._ranges)if(e.isEqual(i)){n=!0;break}if(!n)return!1}return!0}isSimilar(t){if(this.isBackward!=t.isBackward)return!1;const e=ol(this.getRanges());if(e!=ol(t.getRanges()))return!1;if(e==0)return!0;for(let n of this.getRanges()){n=n.getTrimmed();let i=!1;for(let r of t.getRanges())if(r=r.getTrimmed(),n.start.isEqual(r.start)&&n.end.isEqual(r.end)){i=!0;break}if(!i)return!1}return!0}getSelectedElement(){return this.rangeCount!==1?null:this.getFirstRange().getContainedElement()}setTo(...t){let[e,n,i]=t;if(typeof n=="object"&&(i=n,n=void 0),e===null)this._setRanges([]),this._setFakeOptions(i);else if(e instanceof Ae||e instanceof ql)this._setRanges(e.getRanges(),e.isBackward),this._setFakeOptions({fake:e.isFake,label:e.fakeSelectionLabel});else if(e instanceof et)this._setRanges([e],i&&i.backward),this._setFakeOptions(i);else if(e instanceof G)this._setRanges([new et(e)]),this._setFakeOptions(i);else if(e instanceof pn){const r=!!i&&!!i.backward;let s;if(n===void 0)throw new E("view-selection-setto-required-second-parameter",this);s=n=="in"?et._createIn(e):n=="on"?et._createOn(e):new et(G._createAt(e,n)),this._setRanges([s],r),this._setFakeOptions(i)}else{if(!Jt(e))throw new E("view-selection-setto-not-selectable",this);this._setRanges(e,i&&i.backward),this._setFakeOptions(i)}this.fire("change")}setFocus(t,e){if(this.anchor===null)throw new E("view-selection-setfocus-no-ranges",this);const n=G._createAt(t,e);if(n.compareWith(this.focus)=="same")return;const i=this.anchor;this._ranges.pop(),n.compareWith(i)=="before"?this._addRange(new et(n,i),!0):this._addRange(new et(i,n)),this.fire("change")}_setRanges(t,e=!1){t=Array.from(t),this._ranges=[];for(const n of t)this._addRange(n);this._lastRangeBackward=!!e}_setFakeOptions(t={}){this._isFake=!!t.fake,this._fakeSelectionLabel=t.fake&&t.label||""}_addRange(t,e=!1){if(!(t instanceof et))throw new E("view-selection-add-range-not-range",this);this._pushRange(t),this._lastRangeBackward=!!e}_pushRange(t){for(const e of this._ranges)if(t.isIntersecting(e))throw new E("view-selection-range-intersects",this,{addedRange:t,intersectingRange:e});this._ranges.push(new et(t.start,t.end))}}Ae.prototype.is=function(o){return o==="selection"||o==="view:selection"};class ql extends ut(gn){constructor(...t){super(),this._selection=new Ae,this._selection.delegate("change").to(this),t.length&&this._selection.setTo(...t)}get isFake(){return this._selection.isFake}get fakeSelectionLabel(){return this._selection.fakeSelectionLabel}get anchor(){return this._selection.anchor}get focus(){return this._selection.focus}get isCollapsed(){return this._selection.isCollapsed}get rangeCount(){return this._selection.rangeCount}get isBackward(){return this._selection.isBackward}get editableElement(){return this._selection.editableElement}get _ranges(){return this._selection._ranges}*getRanges(){yield*this._selection.getRanges()}getFirstRange(){return this._selection.getFirstRange()}getLastRange(){return this._selection.getLastRange()}getFirstPosition(){return this._selection.getFirstPosition()}getLastPosition(){return this._selection.getLastPosition()}getSelectedElement(){return this._selection.getSelectedElement()}isEqual(t){return this._selection.isEqual(t)}isSimilar(t){return this._selection.isSimilar(t)}_setTo(...t){this._selection.setTo(...t)}_setFocus(t,e){this._selection.setFocus(t,e)}}ql.prototype.is=function(o){return o==="selection"||o=="documentSelection"||o=="view:selection"||o=="view:documentSelection"};class Un extends Zt{constructor(t,e,n){super(t,e),this.startRange=n,this._eventPhase="none",this._currentTarget=null}get eventPhase(){return this._eventPhase}get currentTarget(){return this._currentTarget}}const Gl=Symbol("bubbling contexts");function Wl(o){return class extends o{fire(t,...e){try{const n=t instanceof Zt?t:new Zt(this,t),i=Kl(this);if(!i.size)return;if(Ei(n,"capturing",this),qn(i,"$capture",n,...e))return n.return;const r=n.startRange||this.selection.getFirstRange(),s=r?r.getContainedElement():null,a=!!s&&!!pm(i,s);let c=s||function(l){if(!l)return null;const d=l.start.parent,u=l.end.parent,h=d.getPath(),m=u.getPath();return h.length>m.length?d:u}(r);if(Ei(n,"atTarget",c),!a){if(qn(i,"$text",n,...e))return n.return;Ei(n,"bubbling",c)}for(;c;){if(c.is("rootElement")){if(qn(i,"$root",n,...e))return n.return}else if(c.is("element")&&qn(i,c.name,n,...e))return n.return;if(qn(i,c,n,...e))return n.return;c=c.parent,Ei(n,"bubbling",c)}return Ei(n,"bubbling",this),qn(i,"$document",n,...e),n.return}catch(n){E.rethrowUnexpectedError(n,this)}}_addEventListener(t,e,n){const i=bt(n.context||"$document"),r=Kl(this);for(const s of i){let a=r.get(s);a||(a=new(ut()),r.set(s,a)),this.listenTo(a,t,e,n)}}_removeEventListener(t,e){const n=Kl(this);for(const i of n.values())this.stopListening(i,t,e)}}}{const o=Wl(Object);["fire","_addEventListener","_removeEventListener"].forEach(t=>{Wl[t]=o.prototype[t]})}function Ei(o,t,e){o instanceof Un&&(o._eventPhase=t,o._currentTarget=e)}function qn(o,t,e,...n){const i=typeof t=="string"?o.get(t):pm(o,t);return!!i&&(i.fire(e,...n),e.stop.called)}function pm(o,t){for(const[e,n]of o)if(typeof e=="function"&&e(t))return n;return null}function Kl(o){return o[Gl]||(o[Gl]=new Map),o[Gl]}class ps extends Wl(gt()){constructor(t){super(),this._postFixers=new Set,this.selection=new ql,this.roots=new fe({idProperty:"rootName"}),this.stylesProcessor=t,this.set("isReadOnly",!1),this.set("isFocused",!1),this.set("isSelecting",!1),this.set("isComposing",!1)}getRoot(t="main"){return this.roots.get(t)}registerPostFixer(t){this._postFixers.add(t)}destroy(){this.roots.forEach(t=>t.destroy()),this.stopListening()}_callPostFixers(t){let e=!1;do for(const n of this._postFixers)if(e=n(t),e)break;while(e)}}const uu=class uu extends ee{constructor(t,e,n,i){super(t,e,n,i),this._priority=10,this._id=null,this._clonesGroup=null,this.getFillerOffset=k0}get priority(){return this._priority}get id(){return this._id}getElementsWithSameId(){if(this.id===null)throw new E("attribute-element-get-elements-with-same-id-no-id",this);return new Set(this._clonesGroup)}isSimilar(t){return this.id!==null||t.id!==null?this.id===t.id:super.isSimilar(t)&&this.priority==t.priority}_clone(t=!1){const e=super._clone(t);return e._priority=this._priority,e._id=this._id,e}};uu.DEFAULT_PRIORITY=10;let Qe=uu;function k0(){if($l(this))return null;let o=this.parent;for(;o&&o.is("attributeElement");){if($l(o)>1)return null;o=o.parent}return!o||$l(o)>1?null:this.childCount}function $l(o){return Array.from(o.getChildren()).filter(t=>!t.is("uiElement")).length}Qe.prototype.is=function(o,t){return t?t===this.name&&(o==="attributeElement"||o==="view:attributeElement"||o==="element"||o==="view:element"):o==="attributeElement"||o==="view:attributeElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class Yl extends ee{constructor(t,e,n,i){super(t,e,n,i),this.getFillerOffset=f0}_insertChild(t,e){if(e&&(e instanceof pn||Array.from(e).length>0))throw new E("view-emptyelement-cannot-add",[this,e]);return 0}}function f0(){return null}Yl.prototype.is=function(o,t){return t?t===this.name&&(o==="emptyElement"||o==="view:emptyElement"||o==="element"||o==="view:element"):o==="emptyElement"||o==="view:emptyElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class ks extends ee{constructor(t,e,n,i){super(t,e,n,i),this.getFillerOffset=w0}_insertChild(t,e){if(e&&(e instanceof pn||Array.from(e).length>0))throw new E("view-uielement-cannot-add",[this,e]);return 0}render(t,e){return this.toDomElement(t)}toDomElement(t){const e=t.createElement(this.name);for(const n of this.getAttributeKeys())e.setAttribute(n,this.getAttribute(n));return e}}function b0(o){o.document.on("arrowKey",(t,e)=>function(n,i,r){if(i.keyCode==ct.arrowright){const s=i.domTarget.ownerDocument.defaultView.getSelection(),a=s.rangeCount==1&&s.getRangeAt(0).collapsed;if(a||i.shiftKey){const c=s.focusNode,l=s.focusOffset,d=r.domPositionToView(c,l);if(d===null)return;let u=!1;const h=d.getLastMatchingPosition(m=>(m.item.is("uiElement")&&(u=!0),!(!m.item.is("uiElement")&&!m.item.is("attributeElement"))));if(u){const m=r.viewPositionToDom(h);a?s.collapse(m.parent,m.offset):s.extend(m.parent,m.offset)}}}}(0,e,o.domConverter),{priority:"low"})}function w0(){return null}ks.prototype.is=function(o,t){return t?t===this.name&&(o==="uiElement"||o==="view:uiElement"||o==="element"||o==="view:element"):o==="uiElement"||o==="view:uiElement"||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class Ql extends ee{constructor(t,e,n,i){super(t,e,n,i),this.getFillerOffset=A0}_insertChild(t,e){if(e&&(e instanceof pn||Array.from(e).length>0))throw new E("view-rawelement-cannot-add",[this,e]);return 0}render(t,e){}}function A0(){return null}Ql.prototype.is=function(o,t){return t?t===this.name&&(o==="rawElement"||o==="view:rawElement"||o==="element"||o==="view:element"):o==="rawElement"||o==="view:rawElement"||o===this.name||o==="view:"+this.name||o==="element"||o==="view:element"||o==="node"||o==="view:node"};class fn extends ut(gn){constructor(t,e){super(),this._children=[],this._customProperties=new Map,this.document=t,e&&this._insertChild(0,e)}[Symbol.iterator](){return this._children[Symbol.iterator]()}get childCount(){return this._children.length}get isEmpty(){return this.childCount===0}get root(){return this}get parent(){return null}get name(){}get getFillerOffset(){}getCustomProperty(t){return this._customProperties.get(t)}*getCustomProperties(){yield*this._customProperties.entries()}_appendChild(t){return this._insertChild(this.childCount,t)}getChild(t){return this._children[t]}getChildIndex(t){return this._children.indexOf(t)}getChildren(){return this._children[Symbol.iterator]()}_insertChild(t,e){this._fireChange("children",this);let n=0;const i=function(r,s){return typeof s=="string"?[new pt(r,s)]:(Jt(s)||(s=[s]),Array.from(s).map(a=>typeof a=="string"?new pt(r,a):a instanceof Se?new pt(r,a.data):a))}(this.document,e);for(const r of i)r.parent!==null&&r._remove(),r.parent=this,this._children.splice(t,0,r),t++,n++;return n}_removeChildren(t,e=1){this._fireChange("children",this);for(let n=t;n<t+e;n++)this._children[n].parent=null;return this._children.splice(t,e)}_fireChange(t,e){this.fire("change:"+t,e)}_setCustomProperty(t,e){this._customProperties.set(t,e)}_removeCustomProperty(t){return this._customProperties.delete(t)}}fn.prototype.is=function(o){return o==="documentFragment"||o==="view:documentFragment"};class km{constructor(t){this._cloneGroups=new Map,this._slotFactory=null,this.document=t}setSelection(...t){this.document.selection._setTo(...t)}setSelectionFocus(t,e){this.document.selection._setFocus(t,e)}createDocumentFragment(t){return new fn(this.document,t)}createText(t){return new pt(this.document,t)}createAttributeElement(t,e,n={}){const i=new Qe(this.document,t,e);return typeof n.priority=="number"&&(i._priority=n.priority),n.id&&(i._id=n.id),n.renderUnsafeAttributes&&i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),i}createContainerElement(t,e,n={},i={}){let r=null;te(n)?i=n:r=n;const s=new xi(this.document,t,e,r);return i.renderUnsafeAttributes&&s._unsafeAttributesToRender.push(...i.renderUnsafeAttributes),s}createEditableElement(t,e,n={}){const i=new ms(this.document,t,e);return n.renderUnsafeAttributes&&i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),i}createEmptyElement(t,e,n={}){const i=new Yl(this.document,t,e);return n.renderUnsafeAttributes&&i._unsafeAttributesToRender.push(...n.renderUnsafeAttributes),i}createUIElement(t,e,n){const i=new ks(this.document,t,e);return n&&(i.render=n),i}createRawElement(t,e,n,i={}){const r=new Ql(this.document,t,e);return n&&(r.render=n),i.renderUnsafeAttributes&&r._unsafeAttributesToRender.push(...i.renderUnsafeAttributes),r}setAttribute(t,e,n){n._setAttribute(t,e)}removeAttribute(t,e){e._removeAttribute(t)}addClass(t,e){e._addClass(t)}removeClass(t,e){e._removeClass(t)}setStyle(t,e,n){te(t)&&n===void 0?e._setStyle(t):n._setStyle(t,e)}removeStyle(t,e){e._removeStyle(t)}setCustomProperty(t,e,n){n._setCustomProperty(t,e)}removeCustomProperty(t,e){return e._removeCustomProperty(t)}breakAttributes(t){return t instanceof G?this._breakAttributes(t):this._breakAttributesRange(t)}breakContainer(t){const e=t.parent;if(!e.is("containerElement"))throw new E("view-writer-break-non-container-element",this.document);if(!e.parent)throw new E("view-writer-break-root",this.document);if(t.isAtStart)return G._createBefore(e);if(!t.isAtEnd){const n=e._clone(!1);this.insert(G._createAfter(e),n);const i=new et(t,G._createAt(e,"end")),r=new G(n,0);this.move(i,r)}return G._createAfter(e)}mergeAttributes(t){const e=t.offset,n=t.parent;if(n.is("$text"))return t;if(n.is("attributeElement")&&n.childCount===0){const s=n.parent,a=n.index;return n._remove(),this._removeFromClonedElementsGroup(n),this.mergeAttributes(new G(s,a))}const i=n.getChild(e-1),r=n.getChild(e);if(!i||!r)return t;if(i.is("$text")&&r.is("$text"))return bm(i,r);if(i.is("attributeElement")&&r.is("attributeElement")&&i.isSimilar(r)){const s=i.childCount;return i._appendChild(r.getChildren()),r._remove(),this._removeFromClonedElementsGroup(r),this.mergeAttributes(new G(i,s))}return t}mergeContainers(t){const e=t.nodeBefore,n=t.nodeAfter;if(!(e&&n&&e.is("containerElement")&&n.is("containerElement")))throw new E("view-writer-merge-containers-invalid-position",this.document);const i=e.getChild(e.childCount-1),r=i instanceof pt?G._createAt(i,"end"):G._createAt(e,"end");return this.move(et._createIn(n),G._createAt(e,"end")),this.remove(et._createOn(n)),r}insert(t,e){wm(e=Jt(e)?[...e]:[e],this.document);const n=e.reduce((s,a)=>{const c=s[s.length-1],l=!a.is("uiElement");return c&&c.breakAttributes==l?c.nodes.push(a):s.push({breakAttributes:l,nodes:[a]}),s},[]);let i=null,r=t;for(const{nodes:s,breakAttributes:a}of n){const c=this._insertNodes(r,s,a);i||(i=c.start),r=c.end}return i?new et(i,r):new et(t)}remove(t){const e=t instanceof et?t:et._createOn(t);if(Di(e,this.document),e.isCollapsed)return new fn(this.document);const{start:n,end:i}=this._breakAttributesRange(e,!0),r=n.parent,s=i.offset-n.offset,a=r._removeChildren(n.offset,s);for(const l of a)this._removeFromClonedElementsGroup(l);const c=this.mergeAttributes(n);return e.start=c,e.end=c.clone(),new fn(this.document,a)}clear(t,e){Di(t,this.document);const n=t.getWalker({direction:"backward",ignoreElementEnd:!0});for(const i of n){const r=i.item;let s;if(r.is("element")&&e.isSimilar(r))s=et._createOn(r);else if(!i.nextPosition.isAfter(t.start)&&r.is("$textProxy")){const a=r.getAncestors().find(c=>c.is("element")&&e.isSimilar(c));a&&(s=et._createIn(a))}s&&(s.end.isAfter(t.end)&&(s.end=t.end),s.start.isBefore(t.start)&&(s.start=t.start),this.remove(s))}}move(t,e){let n;if(e.isAfter(t.end)){const i=(e=this._breakAttributes(e,!0)).parent,r=i.childCount;t=this._breakAttributesRange(t,!0),n=this.remove(t),e.offset+=i.childCount-r}else n=this.remove(t);return this.insert(e,n)}wrap(t,e){if(!(e instanceof Qe))throw new E("view-writer-wrap-invalid-attribute",this.document);if(Di(t,this.document),t.isCollapsed){let i=t.start;i.parent.is("element")&&(n=i.parent,!Array.from(n.getChildren()).some(s=>!s.is("uiElement")))&&(i=i.getLastMatchingPosition(s=>s.item.is("uiElement"))),i=this._wrapPosition(i,e);const r=this.document.selection;return r.isCollapsed&&r.getFirstPosition().isEqual(t.start)&&this.setSelection(i),new et(i)}return this._wrapRange(t,e);var n}unwrap(t,e){if(!(e instanceof Qe))throw new E("view-writer-unwrap-invalid-attribute",this.document);if(Di(t,this.document),t.isCollapsed)return t;const{start:n,end:i}=this._breakAttributesRange(t,!0),r=n.parent,s=this._unwrapChildren(r,n.offset,i.offset,e),a=this.mergeAttributes(s.start);a.isEqual(s.start)||s.end.offset--;const c=this.mergeAttributes(s.end);return new et(a,c)}rename(t,e){const n=new xi(this.document,t,e.getAttributes());return this.insert(G._createAfter(e),n),this.move(et._createIn(e),G._createAt(n,0)),this.remove(et._createOn(e)),n}clearClonedElementsGroup(t){this._cloneGroups.delete(t)}createPositionAt(t,e){return G._createAt(t,e)}createPositionAfter(t){return G._createAfter(t)}createPositionBefore(t){return G._createBefore(t)}createRange(t,e){return new et(t,e)}createRangeOn(t){return et._createOn(t)}createRangeIn(t){return et._createIn(t)}createSelection(...t){return new Ae(...t)}createSlot(t="children"){if(!this._slotFactory)throw new E("view-writer-invalid-create-slot-context",this.document);return this._slotFactory(this,t)}_registerSlotFactory(t){this._slotFactory=t}_clearSlotFactory(){this._slotFactory=null}_insertNodes(t,e,n){let i,r;if(i=n?Zl(t):t.parent.is("$text")?t.parent.parent:t.parent,!i)throw new E("view-writer-invalid-position-container",this.document);r=n?this._breakAttributes(t,!0):t.parent.is("$text")?Jl(t):t;const s=i._insertChild(r.offset,e);for(const d of e)this._addToClonedElementsGroup(d);const a=r.getShiftedBy(s),c=this.mergeAttributes(r);c.isEqual(r)||a.offset--;const l=this.mergeAttributes(a);return new et(c,l)}_wrapChildren(t,e,n,i){let r=e;const s=[];for(;r<n;){const c=t.getChild(r),l=c.is("$text"),d=c.is("attributeElement");if(d&&this._wrapAttributeElement(i,c))s.push(new G(t,r));else if(l||!d||_0(i,c)){const u=i._clone();c._remove(),u._appendChild(c),t._insertChild(r,u),this._addToClonedElementsGroup(u),s.push(new G(t,r))}else this._wrapChildren(c,0,c.childCount,i);r++}let a=0;for(const c of s)c.offset-=a,c.offset!=e&&(this.mergeAttributes(c).isEqual(c)||(a++,n--));return et._createFromParentsAndOffsets(t,e,t,n)}_unwrapChildren(t,e,n,i){let r=e;const s=[];for(;r<n;){const c=t.getChild(r);if(c.is("attributeElement"))if(c.isSimilar(i)){const l=c.getChildren(),d=c.childCount;c._remove(),t._insertChild(r,l),this._removeFromClonedElementsGroup(c),s.push(new G(t,r),new G(t,r+d)),r+=d,n+=d-1}else this._unwrapAttributeElement(i,c)?(s.push(new G(t,r),new G(t,r+1)),r++):(this._unwrapChildren(c,0,c.childCount,i),r++);else r++}let a=0;for(const c of s)c.offset-=a,!(c.offset==e||c.offset==n)&&(this.mergeAttributes(c).isEqual(c)||(a++,n--));return et._createFromParentsAndOffsets(t,e,t,n)}_wrapRange(t,e){const{start:n,end:i}=this._breakAttributesRange(t,!0),r=n.parent,s=this._wrapChildren(r,n.offset,i.offset,e),a=this.mergeAttributes(s.start);a.isEqual(s.start)||s.end.offset--;const c=this.mergeAttributes(s.end);return new et(a,c)}_wrapPosition(t,e){if(e.isSimilar(t.parent))return fm(t.clone());t.parent.is("$text")&&(t=Jl(t));const n=this.createAttributeElement("_wrapPosition-fake-element");n._priority=Number.POSITIVE_INFINITY,n.isSimilar=()=>!1,t.parent._insertChild(t.offset,n);const i=new et(t,t.getShiftedBy(1));this.wrap(i,e);const r=new G(n.parent,n.index);n._remove();const s=r.nodeBefore,a=r.nodeAfter;return s instanceof pt&&a instanceof pt?bm(s,a):fm(r)}_wrapAttributeElement(t,e){if(!Am(t,e)||t.name!==e.name||t.priority!==e.priority)return!1;for(const n of t.getAttributeKeys())if(n!=="class"&&n!=="style"&&e.hasAttribute(n)&&e.getAttribute(n)!==t.getAttribute(n))return!1;for(const n of t.getStyleNames())if(e.hasStyle(n)&&e.getStyle(n)!==t.getStyle(n))return!1;for(const n of t.getAttributeKeys())n!=="class"&&n!=="style"&&(e.hasAttribute(n)||this.setAttribute(n,t.getAttribute(n),e));for(const n of t.getStyleNames())e.hasStyle(n)||this.setStyle(n,t.getStyle(n),e);for(const n of t.getClassNames())e.hasClass(n)||this.addClass(n,e);return!0}_unwrapAttributeElement(t,e){if(!Am(t,e)||t.name!==e.name||t.priority!==e.priority)return!1;for(const n of t.getAttributeKeys())if(n!=="class"&&n!=="style"&&(!e.hasAttribute(n)||e.getAttribute(n)!==t.getAttribute(n)))return!1;if(!e.hasClass(...t.getClassNames()))return!1;for(const n of t.getStyleNames())if(!e.hasStyle(n)||e.getStyle(n)!==t.getStyle(n))return!1;for(const n of t.getAttributeKeys())n!=="class"&&n!=="style"&&this.removeAttribute(n,e);return this.removeClass(Array.from(t.getClassNames()),e),this.removeStyle(Array.from(t.getStyleNames()),e),!0}_breakAttributesRange(t,e=!1){const n=t.start,i=t.end;if(Di(t,this.document),t.isCollapsed){const c=this._breakAttributes(t.start,e);return new et(c,c)}const r=this._breakAttributes(i,e),s=r.parent.childCount,a=this._breakAttributes(n,e);return r.offset+=r.parent.childCount-s,new et(a,r)}_breakAttributes(t,e=!1){const n=t.offset,i=t.parent;if(t.parent.is("emptyElement"))throw new E("view-writer-cannot-break-empty-element",this.document);if(t.parent.is("uiElement"))throw new E("view-writer-cannot-break-ui-element",this.document);if(t.parent.is("rawElement"))throw new E("view-writer-cannot-break-raw-element",this.document);if(!e&&i.is("$text")&&Xl(i.parent)||Xl(i))return t.clone();if(i.is("$text"))return this._breakAttributes(Jl(t),e);if(n==i.childCount){const r=new G(i.parent,i.index+1);return this._breakAttributes(r,e)}if(n===0){const r=new G(i.parent,i.index);return this._breakAttributes(r,e)}{const r=i.index+1,s=i._clone();i.parent._insertChild(r,s),this._addToClonedElementsGroup(s);const a=i.childCount-n,c=i._removeChildren(n,a);s._appendChild(c);const l=new G(i.parent,r);return this._breakAttributes(l,e)}}_addToClonedElementsGroup(t){if(!t.root.is("rootElement"))return;if(t.is("element"))for(const i of t.getChildren())this._addToClonedElementsGroup(i);const e=t.id;if(!e)return;let n=this._cloneGroups.get(e);n||(n=new Set,this._cloneGroups.set(e,n)),n.add(t),t._clonesGroup=n}_removeFromClonedElementsGroup(t){if(t.is("element"))for(const i of t.getChildren())this._removeFromClonedElementsGroup(i);const e=t.id;if(!e)return;const n=this._cloneGroups.get(e);n&&n.delete(t)}}function Zl(o){let t=o.parent;for(;!Xl(t);){if(!t)return;t=t.parent}return t}function _0(o,t){return o.priority<t.priority||!(o.priority>t.priority)&&o.getIdentity()<t.getIdentity()}function fm(o){const t=o.nodeBefore;if(t&&t.is("$text"))return new G(t,t.data.length);const e=o.nodeAfter;return e&&e.is("$text")?new G(e,0):o}function Jl(o){if(o.offset==o.parent.data.length)return new G(o.parent.parent,o.parent.index+1);if(o.offset===0)return new G(o.parent.parent,o.parent.index);const t=o.parent.data.slice(o.offset);return o.parent._data=o.parent.data.slice(0,o.offset),o.parent.parent._insertChild(o.parent.index+1,new pt(o.root.document,t)),new G(o.parent.parent,o.parent.index+1)}function bm(o,t){const e=o.data.length;return o._data+=t.data,t._remove(),new G(o,e)}const C0=[pt,Qe,xi,Yl,Ql,ks];function wm(o,t){for(const e of o){if(!C0.some(n=>e instanceof n))throw new E("view-writer-insert-invalid-node-type",t);e.is("$text")||wm(e.getChildren(),t)}}function Xl(o){return o&&(o.is("containerElement")||o.is("documentFragment"))}function Di(o,t){const e=Zl(o.start),n=Zl(o.end);if(!e||!n||e!==n)throw new E("view-writer-invalid-range-container",t)}function Am(o,t){return o.id===null&&t.id===null}const _m=o=>o.createTextNode(" "),Cm=o=>{const t=o.createElement("span");return t.dataset.ckeFiller="true",t.innerText=" ",t},vm=o=>{const t=o.createElement("br");return t.dataset.ckeFiller="true",t},Ii="⁠".repeat(7);function ne(o){return typeof o=="string"?o.substr(0,7)===Ii:Et(o)&&o.data.substr(0,7)===Ii}function Gn(o){return o.data.length==7&&ne(o)}function ym(o){const t=typeof o=="string"?o:o.data;return ne(o)?t.slice(7):t}function v0(o,t){if(t.keyCode==ct.arrowleft){const e=t.domTarget.ownerDocument.defaultView.getSelection();if(e.rangeCount==1&&e.getRangeAt(0).collapsed){const n=e.getRangeAt(0).startContainer,i=e.getRangeAt(0).startOffset;ne(n)&&i<=7&&e.collapse(n,0)}}}var fs=T(8264),Si={attributes:{"data-cke":!0}};Si.setAttributes=U(),Si.insert=H().bind(null,"head"),Si.domAPI=V(),Si.insertStyleElement=q(),j()(fs.A,Si),fs.A&&fs.A.locals&&fs.A.locals;class y0 extends gt(){constructor(t,e){super(),this.domDocuments=new Set,this.markedAttributes=new Set,this.markedChildren=new Set,this.markedTexts=new Set,this._inlineFiller=null,this._fakeSelectionContainer=null,this.domConverter=t,this.selection=e,this.set("isFocused",!1),this.set("isSelecting",!1),this.set("isComposing",!1),v.isBlink&&!v.isAndroid&&this.on("change:isSelecting",()=>{this.isSelecting||this.render()})}markToSync(t,e){if(t==="text")this.domConverter.mapViewToDom(e.parent)&&this.markedTexts.add(e);else{if(!this.domConverter.mapViewToDom(e))return;if(t==="attributes")this.markedAttributes.add(e);else{if(t!=="children")throw new E("view-renderer-unknown-type",this);this.markedChildren.add(e)}}}render(){if(this.isComposing&&!v.isAndroid)return;let t=null;const e=!(v.isBlink&&!v.isAndroid)||!this.isSelecting;for(const n of this.markedChildren)this._updateChildrenMappings(n);e?(this._inlineFiller&&!this._isSelectionInInlineFiller()&&this._removeInlineFiller(),this._inlineFiller?t=this._getInlineFillerPosition():this._needsInlineFillerAtSelection()&&(t=this.selection.getFirstPosition(),this.markedChildren.add(t.parent))):this._inlineFiller&&this._inlineFiller.parentNode&&(t=this.domConverter.domPositionToView(this._inlineFiller),t&&t.parent.is("$text")&&(t=G._createBefore(t.parent)));for(const n of this.markedAttributes)this._updateAttrs(n);for(const n of this.markedChildren)this._updateChildren(n,{inlineFillerPosition:t});for(const n of this.markedTexts)!this.markedChildren.has(n.parent)&&this.domConverter.mapViewToDom(n.parent)&&this._updateText(n,{inlineFillerPosition:t});if(e)if(t){const n=this.domConverter.viewPositionToDom(t),i=n.parent.ownerDocument;ne(n.parent)?this._inlineFiller=n.parent:this._inlineFiller=xm(i,n.parent,n.offset)}else this._inlineFiller=null;this._updateFocus(),this._updateSelection(),this.domConverter._clearTemporaryCustomProperties(),this.markedTexts.clear(),this.markedAttributes.clear(),this.markedChildren.clear()}_updateChildrenMappings(t){const e=this.domConverter.mapViewToDom(t);if(!e)return;const n=Array.from(e.childNodes),i=Array.from(this.domConverter.viewChildrenToDom(t,{withChildren:!1})),r=this._diffNodeLists(n,i),s=this._findUpdateActions(r,n,i,x0);if(s.indexOf("update")!==-1){const a={equal:0,insert:0,delete:0};for(const c of s)if(c==="update"){const l=a.equal+a.insert,d=a.equal+a.delete,u=t.getChild(l);!u||u.is("uiElement")||u.is("rawElement")||this._updateElementMappings(u,n[d]),Dh(i[l]),a.equal++}else a[c]++}}_updateElementMappings(t,e){this.domConverter.unbindDomElement(e),this.domConverter.bindElements(e,t),this.markedChildren.add(t),this.markedAttributes.add(t)}_getInlineFillerPosition(){const t=this.selection.getFirstPosition();return t.parent.is("$text")?G._createBefore(t.parent):t}_isSelectionInInlineFiller(){if(this.selection.rangeCount!=1||!this.selection.isCollapsed)return!1;const t=this.selection.getFirstPosition(),e=this.domConverter.viewPositionToDom(t);return!!(e&&Et(e.parent)&&ne(e.parent))}_removeInlineFiller(){const t=this._inlineFiller;if(!ne(t))throw new E("view-renderer-filler-was-lost",this);Gn(t)?t.remove():t.data=t.data.substr(7),this._inlineFiller=null}_needsInlineFillerAtSelection(){if(this.selection.rangeCount!=1||!this.selection.isCollapsed)return!1;const t=this.selection.getFirstPosition(),e=t.parent,n=t.offset;if(!this.domConverter.mapViewToDom(e.root)||!e.is("element")||!function(s){if(s.getAttribute("contenteditable")=="false")return!1;const a=s.findAncestor(c=>c.hasAttribute("contenteditable"));return!a||a.getAttribute("contenteditable")=="true"}(e))return!1;const i=t.nodeBefore,r=t.nodeAfter;return!(i instanceof pt||r instanceof pt)&&!!(n!==e.getFillerOffset()||i&&i.is("element","br"))&&(!v.isAndroid||!i&&!r)}_updateText(t,e){const n=this.domConverter.findCorrespondingDomText(t);let i=this.domConverter.viewToDom(t).data;const r=e.inlineFillerPosition;r&&r.parent==t.parent&&r.offset==t.index&&(i=Ii+i),this._updateTextNode(n,i)}_updateAttrs(t){const e=this.domConverter.mapViewToDom(t);if(e){for(const n of e.attributes){const i=n.name;t.hasAttribute(i)||this.domConverter.removeDomElementAttribute(e,i)}for(const n of t.getAttributeKeys())this.domConverter.setDomElementAttribute(e,n,t.getAttribute(n),t)}}_updateChildren(t,e){const n=this.domConverter.mapViewToDom(t);if(!n)return;if(v.isAndroid){let u=null;for(const h of Array.from(n.childNodes)){if(u&&Et(u)&&Et(h)){n.normalize();break}u=h}}const i=e.inlineFillerPosition,r=n.childNodes,s=Array.from(this.domConverter.viewChildrenToDom(t,{bind:!0}));i&&i.parent===t&&xm(n.ownerDocument,s,i.offset);const a=this._diffNodeLists(r,s),c=this._findUpdateActions(a,r,s,E0);let l=0;const d=new Set;for(const u of c)u==="delete"?(d.add(r[l]),Dh(r[l])):u!=="equal"&&u!=="update"||l++;l=0;for(const u of c)u==="insert"?(yh(n,l,s[l]),l++):u==="update"?(this._updateTextNode(r[l],s[l].data),l++):u==="equal"&&(this._markDescendantTextToSync(this.domConverter.domToView(s[l])),l++);for(const u of d)u.parentNode||this.domConverter.unbindDomElement(u)}_diffNodeLists(t,e){return t=function(n,i){const r=Array.from(n);return r.length==0||!i||r[r.length-1]==i&&r.pop(),r}(t,this._fakeSelectionContainer),At(t,e,D0.bind(null,this.domConverter))}_findUpdateActions(t,e,n,i){if(t.indexOf("insert")===-1||t.indexOf("delete")===-1)return t;let r=[],s=[],a=[];const c={equal:0,insert:0,delete:0};for(const l of t)l==="insert"?a.push(n[c.equal+c.insert]):l==="delete"?s.push(e[c.equal+c.delete]):(r=r.concat(At(s,a,i).map(d=>d==="equal"?"update":d)),r.push("equal"),s=[],a=[]),c[l]++;return r.concat(At(s,a,i).map(l=>l==="equal"?"update":l))}_updateTextNode(t,e){const n=t.data;n!=e&&(v.isAndroid&&this.isComposing&&n.replace(/\u00A0/g," ")==e.replace(/\u00A0/g," ")||this._updateTextNodeInternal(t,e))}_updateTextNodeInternal(t,e){const n=$(t.data,e);for(const i of n)i.type==="insert"?t.insertData(i.index,i.values.join("")):t.deleteData(i.index,i.howMany)}_markDescendantTextToSync(t){if(t){if(t.is("$text"))this.markedTexts.add(t);else if(t.is("element"))for(const e of t.getChildren())this._markDescendantTextToSync(e)}}_updateSelection(){if(v.isBlink&&!v.isAndroid&&this.isSelecting&&!this.markedChildren.size)return;if(this.selection.rangeCount===0)return this._removeDomSelection(),void this._removeFakeSelection();const t=this.domConverter.mapViewToDom(this.selection.editableElement);this.isFocused&&t&&(this.selection.isFake?this._updateFakeSelection(t):this._fakeSelectionContainer&&this._fakeSelectionContainer.isConnected?(this._removeFakeSelection(),this._updateDomSelection(t)):this.isComposing&&v.isAndroid||this._updateDomSelection(t))}_updateFakeSelection(t){const e=t.ownerDocument;this._fakeSelectionContainer||(this._fakeSelectionContainer=function(s){const a=s.createElement("div");return a.className="ck-fake-selection-container",Object.assign(a.style,{position:"fixed",top:0,left:"-9999px",width:"42px"}),a.textContent=" ",a}(e));const n=this._fakeSelectionContainer;if(this.domConverter.bindFakeSelection(n,this.selection),!this._fakeSelectionNeedsUpdate(t))return;n.parentElement&&n.parentElement==t||t.appendChild(n),n.textContent=this.selection.fakeSelectionLabel||" ";const i=e.getSelection(),r=e.createRange();i.removeAllRanges(),r.selectNodeContents(n),i.addRange(r)}_updateDomSelection(t){const e=t.ownerDocument.defaultView.getSelection();if(!this._domSelectionNeedsUpdate(e))return;const n=this.domConverter.viewPositionToDom(this.selection.anchor),i=this.domConverter.viewPositionToDom(this.selection.focus);e.setBaseAndExtent(n.parent,n.offset,i.parent,i.offset),v.isGecko&&function(r,s){let a=r.parent,c=r.offset;if(Et(a)&&Gn(a)&&(c=wi(a)+1,a=a.parentNode),a.nodeType!=Node.ELEMENT_NODE||c!=a.childNodes.length-1)return;const l=a.childNodes[c];l&&l.tagName=="BR"&&s.addRange(s.getRangeAt(0))}(i,e)}_domSelectionNeedsUpdate(t){if(!this.domConverter.isDomSelectionCorrect(t))return!0;const e=t&&this.domConverter.domSelectionToView(t);return(!e||!this.selection.isEqual(e))&&!(!this.selection.isCollapsed&&this.selection.isSimilar(e))}_fakeSelectionNeedsUpdate(t){const e=this._fakeSelectionContainer,n=t.ownerDocument.getSelection();return!e||e.parentElement!==t||n.anchorNode!==e&&!e.contains(n.anchorNode)||e.textContent!==this.selection.fakeSelectionLabel}_removeDomSelection(){for(const t of this.domDocuments){const e=t.getSelection();if(e.rangeCount){const n=t.activeElement,i=this.domConverter.mapDomToView(n);n&&i&&e.removeAllRanges()}}}_removeFakeSelection(){const t=this._fakeSelectionContainer;t&&t.remove()}_updateFocus(){if(this.isFocused){const t=this.selection.editableElement;t&&this.domConverter.focus(t)}}}function xm(o,t,e){const n=t instanceof Array?t:t.childNodes,i=n[e];if(Et(i))return i.data=Ii+i.data,i;{const r=o.createTextNode(Ii);return Array.isArray(t)?n.splice(e,0,r):yh(t,e,r),r}}function x0(o,t){return $e(o)&&$e(t)&&!Et(o)&&!Et(t)&&!Ai(o)&&!Ai(t)&&o.tagName.toLowerCase()===t.tagName.toLowerCase()}function E0(o,t){return $e(o)&&$e(t)&&Et(o)&&Et(t)}function D0(o,t,e){return t===e||(Et(t)&&Et(e)?t.data===e.data:!(!o.isBlockFiller(t)||!o.isBlockFiller(e)))}const I0=vm(A.document),S0=_m(A.document),M0=Cm(A.document),bs="data-ck-unsafe-attribute-",Em="data-ck-unsafe-element";class ws{constructor(t,{blockFillerMode:e,renderingMode:n="editing"}={}){this._domToViewMapping=new WeakMap,this._viewToDomMapping=new WeakMap,this._fakeSelectionMapping=new WeakMap,this._rawContentElementMatcher=new Me,this._inlineObjectElementMatcher=new Me,this._elementsWithTemporaryCustomProperties=new Set,this.document=t,this.renderingMode=n,this.blockFillerMode=e||(n==="editing"?"br":"nbsp"),this.preElements=["pre","textarea"],this.blockElements=["address","article","aside","blockquote","caption","center","dd","details","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","legend","li","main","menu","nav","ol","p","pre","section","summary","table","tbody","td","tfoot","th","thead","tr","ul"],this.inlineObjectElements=["object","iframe","input","button","textarea","select","option","video","embed","audio","img","canvas"],this.unsafeElements=["script","style"],this._domDocument=this.renderingMode==="editing"?A.document:A.document.implementation.createHTMLDocument("")}bindFakeSelection(t,e){this._fakeSelectionMapping.set(t,new Ae(e))}fakeSelectionToView(t){return this._fakeSelectionMapping.get(t)}bindElements(t,e){this._domToViewMapping.set(t,e),this._viewToDomMapping.set(e,t)}unbindDomElement(t){const e=this._domToViewMapping.get(t);if(e){this._domToViewMapping.delete(t),this._viewToDomMapping.delete(e);for(const n of t.children)this.unbindDomElement(n)}}bindDocumentFragments(t,e){this._domToViewMapping.set(t,e),this._viewToDomMapping.set(e,t)}shouldRenderAttribute(t,e,n){return this.renderingMode==="data"||!(t=t.toLowerCase()).startsWith("on")&&(t!=="srcdoc"||!e.match(/\bon\S+\s*=|javascript:|<\s*\/*script/i))&&(n==="img"&&(t==="src"||t==="srcset")||n==="source"&&t==="srcset"||!e.match(/^\s*(javascript:|data:(image\/svg|text\/x?html))/i))}setContentOf(t,e){if(this.renderingMode==="data")return void(t.innerHTML=e);const n=new DOMParser().parseFromString(e,"text/html"),i=n.createDocumentFragment(),r=n.body.childNodes;for(;r.length>0;)i.appendChild(r[0]);const s=n.createTreeWalker(i,NodeFilter.SHOW_ELEMENT),a=[];let c;for(;c=s.nextNode();)a.push(c);for(const l of a){for(const u of l.getAttributeNames())this.setDomElementAttribute(l,u,l.getAttribute(u));const d=l.tagName.toLowerCase();this._shouldRenameElement(d)&&(Sm(d),l.replaceWith(this._createReplacementDomElement(d,l)))}for(;t.firstChild;)t.firstChild.remove();t.append(i)}viewToDom(t,e={}){if(t.is("$text")){const n=this._processDataFromViewText(t);return this._domDocument.createTextNode(n)}{const n=t;if(this.mapViewToDom(n)){if(!n.getCustomProperty("editingPipeline:doNotReuseOnce"))return this.mapViewToDom(n);this._elementsWithTemporaryCustomProperties.add(n)}let i;if(n.is("documentFragment"))i=this._domDocument.createDocumentFragment(),e.bind&&this.bindDocumentFragments(i,n);else{if(n.is("uiElement"))return i=n.name==="$comment"?this._domDocument.createComment(n.getCustomProperty("$rawContent")):n.render(this._domDocument,this),e.bind&&this.bindElements(i,n),i;this._shouldRenameElement(n.name)?(Sm(n.name),i=this._createReplacementDomElement(n.name)):i=n.hasAttribute("xmlns")?this._domDocument.createElementNS(n.getAttribute("xmlns"),n.name):this._domDocument.createElement(n.name),n.is("rawElement")&&n.render(i,this),e.bind&&this.bindElements(i,n);for(const r of n.getAttributeKeys())this.setDomElementAttribute(i,r,n.getAttribute(r),n)}if(e.withChildren!==!1)for(const r of this.viewChildrenToDom(n,e))i instanceof HTMLTemplateElement?i.content.appendChild(r):i.appendChild(r);return i}}setDomElementAttribute(t,e,n,i){const r=this.shouldRenderAttribute(e,n,t.tagName.toLowerCase())||i&&i.shouldRenderUnsafeAttribute(e);r||st("domconverter-unsafe-attribute-detected",{domElement:t,key:e,value:n}),function(s){try{A.document.createAttribute(s)}catch{return!1}return!0}(e)?(t.hasAttribute(e)&&!r?t.removeAttribute(e):t.hasAttribute(bs+e)&&r&&t.removeAttribute(bs+e),t.setAttribute(r?e:bs+e,n)):st("domconverter-invalid-attribute-detected",{domElement:t,key:e,value:n})}removeDomElementAttribute(t,e){e!=Em&&(t.removeAttribute(e),t.removeAttribute(bs+e))}*viewChildrenToDom(t,e={}){const n=t.getFillerOffset&&t.getFillerOffset();let i=0;for(const r of t.getChildren()){n===i&&(yield this._getBlockFiller());const s=r.is("element")&&!!r.getCustomProperty("dataPipeline:transparentRendering")&&!Lt(r.getAttributes());if(s&&this.renderingMode=="data")if(r.is("rawElement")){const a=this._domDocument.createElement(r.name);r.render(a,this),yield*[...a.childNodes]}else yield*this.viewChildrenToDom(r,e);else s&&st("domconverter-transparent-rendering-unsupported-in-editing-pipeline",{viewElement:r}),yield this.viewToDom(r,e);i++}n===i&&(yield this._getBlockFiller())}viewRangeToDom(t){const e=this.viewPositionToDom(t.start),n=this.viewPositionToDom(t.end),i=this._domDocument.createRange();return i.setStart(e.parent,e.offset),i.setEnd(n.parent,n.offset),i}viewPositionToDom(t){const e=t.parent;if(e.is("$text")){const n=this.findCorrespondingDomText(e);if(!n)return null;let i=t.offset;return ne(n)&&(i+=7),{parent:n,offset:i}}{let n,i,r;if(t.offset===0){if(n=this.mapViewToDom(e),!n)return null;r=n.childNodes[0]}else{const s=t.nodeBefore;if(i=s.is("$text")?this.findCorrespondingDomText(s):this.mapViewToDom(s),!i)return null;n=i.parentNode,r=i.nextSibling}return Et(r)&&ne(r)?{parent:r,offset:7}:{parent:n,offset:i?wi(i)+1:0}}}domToView(t,e={}){const n=[],i=this._domToView(t,e,n),r=i.next().value;return r?(i.next(),this._processDomInlineNodes(null,n,e),r.is("$text")&&r.data.length==0?null:r):null}*domChildrenToView(t,e={},n=[]){let i=[];i=t instanceof HTMLTemplateElement?[...t.content.childNodes]:[...t.childNodes];for(let r=0;r<i.length;r++){const s=i[r],a=this._domToView(s,e,n),c=a.next().value;c!==null&&(this._isBlockViewElement(c)&&this._processDomInlineNodes(t,n,e),yield c,a.next())}this._processDomInlineNodes(t,n,e)}domSelectionToView(t){if(function(i){if(!v.isGecko||!i.rangeCount)return!1;const r=i.getRangeAt(0).startContainer;try{Object.prototype.toString.call(r)}catch{return!0}return!1}(t))return new Ae([]);if(t.rangeCount===1){let i=t.getRangeAt(0).startContainer;Et(i)&&(i=i.parentNode);const r=this.fakeSelectionToView(i);if(r)return r}const e=this.isDomSelectionBackward(t),n=[];for(let i=0;i<t.rangeCount;i++){const r=t.getRangeAt(i),s=this.domRangeToView(r);s&&n.push(s)}return new Ae(n,{backward:e})}domRangeToView(t){const e=this.domPositionToView(t.startContainer,t.startOffset),n=this.domPositionToView(t.endContainer,t.endOffset);return e&&n?new et(e,n):null}domPositionToView(t,e=0){if(this.isBlockFiller(t))return this.domPositionToView(t.parentNode,wi(t));const n=this.mapDomToView(t);if(n&&(n.is("uiElement")||n.is("rawElement")))return G._createBefore(n);if(Et(t)){if(Gn(t))return this.domPositionToView(t.parentNode,wi(t));const i=this.findCorrespondingViewText(t);let r=e;return i?(ne(t)&&(r-=7,r=r<0?0:r),new G(i,r)):null}if(e===0){const i=this.mapDomToView(t);if(i)return new G(i,0)}else{const i=t.childNodes[e-1];if(Et(i)&&Gn(i)||i&&this.isBlockFiller(i))return this.domPositionToView(i.parentNode,wi(i));const r=Et(i)?this.findCorrespondingViewText(i):this.mapDomToView(i);if(r&&r.parent)return new G(r.parent,r.index+1)}return null}mapDomToView(t){return this.getHostViewElement(t)||this._domToViewMapping.get(t)}findCorrespondingViewText(t){if(Gn(t))return null;const e=this.getHostViewElement(t);if(e)return e;const n=t.previousSibling;if(n){if(!this.isElement(n))return null;const i=this.mapDomToView(n);if(i){const r=i.nextSibling;return r instanceof pt?r:null}}else{const i=this.mapDomToView(t.parentNode);if(i){const r=i.getChild(0);return r instanceof pt?r:null}}return null}mapViewToDom(t){return this._viewToDomMapping.get(t)}findCorrespondingDomText(t){const e=t.previousSibling;return e&&this.mapViewToDom(e)?this.mapViewToDom(e).nextSibling:!e&&t.parent&&this.mapViewToDom(t.parent)?this.mapViewToDom(t.parent).childNodes[0]:null}focus(t){const e=this.mapViewToDom(t);if(e&&e.ownerDocument.activeElement!==e){const{scrollX:n,scrollY:i}=A.window,r=[];Dm(e,s=>{const{scrollLeft:a,scrollTop:c}=s;r.push([a,c])}),e.focus(),Dm(e,s=>{const[a,c]=r.shift();s.scrollLeft=a,s.scrollTop=c}),A.window.scrollTo(n,i)}}_clearDomSelection(){const t=this.mapViewToDom(this.document.selection.editableElement);if(!t)return;const e=t.ownerDocument.defaultView.getSelection(),n=this.domSelectionToView(e);n&&n.rangeCount>0&&e.removeAllRanges()}isElement(t){return t&&t.nodeType==Node.ELEMENT_NODE}isDocumentFragment(t){return t&&t.nodeType==Node.DOCUMENT_FRAGMENT_NODE}isBlockFiller(t){return this.blockFillerMode=="br"?t.isEqualNode(I0):!(t.tagName!=="BR"||!Im(t,this.blockElements)||t.parentNode.childNodes.length!==1)||t.isEqualNode(M0)||function(e,n){return e.isEqualNode(S0)&&Im(e,n)&&e.parentNode.childNodes.length===1}(t,this.blockElements)}isDomSelectionBackward(t){if(t.isCollapsed)return!1;const e=this._domDocument.createRange();try{e.setStart(t.anchorNode,t.anchorOffset),e.setEnd(t.focusNode,t.focusOffset)}catch{return!1}const n=e.collapsed;return e.detach(),n}getHostViewElement(t){const e=mA(t);for(e.pop();e.length;){const n=e.pop(),i=this._domToViewMapping.get(n);if(i&&(i.is("uiElement")||i.is("rawElement")))return i}return null}isDomSelectionCorrect(t){return this._isDomSelectionPositionCorrect(t.anchorNode,t.anchorOffset)&&this._isDomSelectionPositionCorrect(t.focusNode,t.focusOffset)}registerRawContentMatcher(t){this._rawContentElementMatcher.add(t)}registerInlineObjectMatcher(t){this._inlineObjectElementMatcher.add(t)}_clearTemporaryCustomProperties(){for(const t of this._elementsWithTemporaryCustomProperties)t._removeCustomProperty("editingPipeline:doNotReuseOnce");this._elementsWithTemporaryCustomProperties.clear()}_getBlockFiller(){switch(this.blockFillerMode){case"nbsp":return _m(this._domDocument);case"markedNbsp":return Cm(this._domDocument);case"br":return vm(this._domDocument)}}_isDomSelectionPositionCorrect(t,e){if(Et(t)&&ne(t)&&e<7||this.isElement(t)&&ne(t.childNodes[e]))return!1;const n=this.mapDomToView(t);return!n||!n.is("uiElement")&&!n.is("rawElement")}*_domToView(t,e,n){if(this.isBlockFiller(t))return null;const i=this.getHostViewElement(t);if(i)return i;if(Ai(t)&&e.skipComments)return null;if(Et(t)){if(Gn(t))return null;{const r=t.data;if(r==="")return null;const s=new pt(this.document,r);return n.push(s),s}}{let r=this.mapDomToView(t);if(r)return this._isInlineObjectElement(r)&&n.push(r),r;if(this.isDocumentFragment(t))r=new fn(this.document),e.bind&&this.bindDocumentFragments(t,r);else{r=this._createViewElement(t,e),e.bind&&this.bindElements(t,r);const a=t.attributes;if(a)for(let c=a.length,l=0;l<c;l++)r._setAttribute(a[l].name,a[l].value);if(this._isViewElementWithRawContent(r,e))return r._setCustomProperty("$rawContent",t.innerHTML),this._isBlockViewElement(r)||n.push(r),r;if(Ai(t))return r._setCustomProperty("$rawContent",t.data),r}yield r;const s=[];if(e.withChildren!==!1)for(const a of this.domChildrenToView(t,e,s))r._appendChild(a);if(this._isInlineObjectElement(r))n.push(r),this._processDomInlineNodes(null,s,e);else for(const a of s)n.push(a)}}_processDomInlineNodes(t,e,n){if(!e.length||t&&!this.isDocumentFragment(t)&&!this._isBlockDomElement(t))return;let i=!1;for(let r=0;r<e.length;r++){const s=e[r];if(!s.is("$text")){i=!1;continue}let a,c=!1;if(this._isPreFormatted(s))a=ym(s.data);else{a=s.data.replace(/[ \n\t\r]{1,}/g," "),c=/[^\S\u00A0]/.test(a.charAt(a.length-1));const l=r>0?e[r-1]:null,d=r+1<e.length?e[r+1]:null,u=!l||l.is("element")&&l.name=="br"||i,h=!d&&!ne(s.data);n.withChildren!==!1&&(u&&(a=a.replace(/^ /,"")),h&&(a=a.replace(/ $/,""))),a=ym(a),a=a.replace(/ \u00A0/g,"  ");const m=d&&d.is("element")&&d.name!="br",p=d&&d.is("$text")&&d.data.charAt(0)==" ";(/[ \u00A0]\u00A0$/.test(a)||!d||m||p)&&(a=a.replace(/\u00A0$/," ")),(u||l&&l.is("element")&&l.name!="br")&&(a=a.replace(/^\u00A0/," "))}a.length==0&&s.parent?(s._remove(),e.splice(r,1),r--):(s._data=a,i=c)}e.length=0}_processDataFromViewText(t){let e=t.data;if(this._isPreFormatted(t))return e;if(e.charAt(0)==" "){const n=this._getTouchingInlineViewNode(t,!1);!(n&&n.is("$textProxy")&&this._nodeEndsWithSpace(n))&&n||(e=" "+e.substr(1))}if(e.charAt(e.length-1)==" "){const n=this._getTouchingInlineViewNode(t,!0),i=n&&n.is("$textProxy")&&n.data.charAt(0)==" ";e.charAt(e.length-2)!=" "&&n&&!i||(e=e.substr(0,e.length-1)+" ")}return e.replace(/ {2}/g,"  ")}_nodeEndsWithSpace(t){if(this._isPreFormatted(t))return!1;const e=this._processDataFromViewText(t);return e.charAt(e.length-1)==" "}_isPreFormatted(t){if(function(e,n){return e.getAncestors().some(i=>i.is("element")&&n.includes(i.name))}(t,this.preElements))return!0;for(const e of t.getAncestors({parentFirst:!0}))if(e.is("element")&&e.hasStyle("white-space")&&e.getStyle("white-space")!=="inherit")return["pre","pre-wrap","break-spaces"].includes(e.getStyle("white-space"));return!1}_getTouchingInlineViewNode(t,e){const n=new kn({startPosition:e?G._createAfter(t):G._createBefore(t),direction:e?"forward":"backward"});for(const{item:i}of n){if(i.is("$textProxy"))return i;if(!i.is("element")||!i.getCustomProperty("dataPipeline:transparentRendering")){if(i.is("element","br"))return null;if(this._isInlineObjectElement(i))return i;if(i.is("containerElement"))return null}}return null}_isBlockDomElement(t){return this.isElement(t)&&this.blockElements.includes(t.tagName.toLowerCase())}_isBlockViewElement(t){return t.is("element")&&this.blockElements.includes(t.name)}_isInlineObjectElement(t){return!!t.is("element")&&(t.name=="br"||this.inlineObjectElements.includes(t.name)||!!this._inlineObjectElementMatcher.match(t))}_createViewElement(t,e){if(Ai(t))return new ks(this.document,"$comment");const n=e.keepOriginalCase?t.tagName:t.tagName.toLowerCase();return new ee(this.document,n)}_isViewElementWithRawContent(t,e){return e.withChildren!==!1&&t.is("element")&&!!this._rawContentElementMatcher.match(t)}_shouldRenameElement(t){const e=t.toLowerCase();return this.renderingMode==="editing"&&this.unsafeElements.includes(e)}_createReplacementDomElement(t,e){const n=this._domDocument.createElement("span");if(n.setAttribute(Em,t),e){for(;e.firstChild;)n.appendChild(e.firstChild);for(const i of e.getAttributeNames())n.setAttribute(i,e.getAttribute(i))}return n}}function Dm(o,t){let e=o;for(;e;)t(e),e=e.parentElement}function Im(o,t){const e=o.parentNode;return!!e&&!!e.tagName&&t.includes(e.tagName.toLowerCase())}function Sm(o){o==="script"&&st("domconverter-unsafe-script-element-detected"),o==="style"&&st("domconverter-unsafe-style-element-detected")}class Be extends le(){constructor(t){super(),this._isEnabled=!1,this.view=t,this.document=t.document}get isEnabled(){return this._isEnabled}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}destroy(){this.disable(),this.stopListening()}checkShouldIgnoreEventFromTarget(t){return t&&t.nodeType===3&&(t=t.parentNode),!(!t||t.nodeType!==1)&&t.matches("[data-cke-ignore-events], [data-cke-ignore-events] *")}}const Mm=zh(function(o,t){zn(t,Rn(t),o)});class Wn{constructor(t,e,n){this.view=t,this.document=t.document,this.domEvent=e,this.domTarget=e.target,Mm(this,n)}get target(){return this.view.domConverter.mapDomToView(this.domTarget)}preventDefault(){this.domEvent.preventDefault()}stopPropagation(){this.domEvent.stopPropagation()}}class Ze extends Be{constructor(){super(...arguments),this.useCapture=!1,this.usePassive=!1}observe(t){(typeof this.domEventType=="string"?[this.domEventType]:this.domEventType).forEach(e=>{this.listenTo(t,e,(n,i)=>{this.isEnabled&&!this.checkShouldIgnoreEventFromTarget(i.target)&&this.onDomEvent(i)},{useCapture:this.useCapture,usePassive:this.usePassive})})}stopObserving(t){this.stopListening(t)}fire(t,e,n){this.isEnabled&&this.document.fire(t,new Wn(this.view,e,n))}}class B0 extends Ze{constructor(){super(...arguments),this.domEventType=["keydown","keyup"]}onDomEvent(t){const e={keyCode:t.keyCode,altKey:t.altKey,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,metaKey:t.metaKey,get keystroke(){return jn(this)}};this.fire(t.type,t,e)}}const td=function(){return ke.Date.now()};var T0=/\s/;const N0=function(o){for(var t=o.length;t--&&T0.test(o.charAt(t)););return t};var P0=/^\s+/;const L0=function(o){return o&&o.slice(0,N0(o)+1).replace(P0,"")};var z0=/^[-+]0x[0-9a-f]+$/i,O0=/^0b[01]+$/i,R0=/^0o[0-7]+$/i,F0=parseInt;const Bm=function(o){if(typeof o=="number")return o;if(us(o))return NaN;if(_t(o)){var t=typeof o.valueOf=="function"?o.valueOf():o;o=_t(t)?t+"":t}if(typeof o!="string")return o===0?o:+o;o=L0(o);var e=O0.test(o);return e||R0.test(o)?F0(o.slice(2),e?2:8):z0.test(o)?NaN:+o};var j0=Math.max,V0=Math.min;const bn=function(o,t,e){var n,i,r,s,a,c,l=0,d=!1,u=!1,h=!0;if(typeof o!="function")throw new TypeError("Expected a function");function m(I){var M=n,P=i;return n=i=void 0,l=I,s=o.apply(P,M)}function p(I){var M=I-c;return c===void 0||M>=t||M<0||u&&I-l>=r}function f(){var I=td();if(p(I))return b(I);a=setTimeout(f,function(M){var P=t-(M-c);return u?V0(P,r-(M-l)):P}(I))}function b(I){return a=void 0,h&&n?m(I):(n=i=void 0,s)}function C(){var I=td(),M=p(I);if(n=arguments,i=this,c=I,M){if(a===void 0)return function(P){return l=P,a=setTimeout(f,t),d?m(P):s}(c);if(u)return clearTimeout(a),a=setTimeout(f,t),m(c)}return a===void 0&&(a=setTimeout(f,t)),s}return t=Bm(t)||0,_t(e)&&(d=!!e.leading,r=(u="maxWait"in e)?j0(Bm(e.maxWait)||0,t):r,h="trailing"in e?!!e.trailing:h),C.cancel=function(){a!==void 0&&clearTimeout(a),l=0,n=c=i=a=void 0},C.flush=function(){return a===void 0?s:b(td())},C};class H0 extends Be{constructor(t){super(t),this._fireSelectionChangeDoneDebounced=bn(e=>{this.document.fire("selectionChangeDone",e)},200)}observe(){const t=this.document;t.on("arrowKey",(e,n)=>{t.selection.isFake&&this.isEnabled&&n.preventDefault()},{context:"$capture"}),t.on("arrowKey",(e,n)=>{t.selection.isFake&&this.isEnabled&&this._handleSelectionMove(n.keyCode)},{priority:"lowest"})}stopObserving(){}destroy(){super.destroy(),this._fireSelectionChangeDoneDebounced.cancel()}_handleSelectionMove(t){const e=this.document.selection,n=new Ae(e.getRanges(),{backward:e.isBackward,fake:!1});t!=ct.arrowleft&&t!=ct.arrowup||n.setTo(n.getFirstPosition()),t!=ct.arrowright&&t!=ct.arrowdown||n.setTo(n.getLastPosition());const i={oldSelection:e,newSelection:n,domSelection:null};this.document.fire("selectionChange",i),this._fireSelectionChangeDoneDebounced(i)}}const U0=function(o){return this.__data__.set(o,"__lodash_hash_undefined__"),this},q0=function(o){return this.__data__.has(o)};function As(o){var t=-1,e=o==null?0:o.length;for(this.__data__=new Gr;++t<e;)this.add(o[t])}As.prototype.add=As.prototype.push=U0,As.prototype.has=q0;const G0=As,W0=function(o,t){for(var e=-1,n=o==null?0:o.length;++e<n;)if(t(o[e],e,o))return!0;return!1},K0=function(o,t){return o.has(t)},Tm=function(o,t,e,n,i,r){var s=1&e,a=o.length,c=t.length;if(a!=c&&!(s&&c>a))return!1;var l=r.get(o),d=r.get(t);if(l&&d)return l==t&&d==o;var u=-1,h=!0,m=2&e?new G0:void 0;for(r.set(o,t),r.set(t,o);++u<a;){var p=o[u],f=t[u];if(n)var b=s?n(f,p,u,t,o,r):n(p,f,u,o,t,r);if(b!==void 0){if(b)continue;h=!1;break}if(m){if(!W0(t,function(C,I){if(!K0(m,I)&&(p===C||i(p,C,e,n,r)))return m.push(I)})){h=!1;break}}else if(p!==f&&!i(p,f,e,n,r)){h=!1;break}}return r.delete(o),r.delete(t),h},$0=function(o){var t=-1,e=Array(o.size);return o.forEach(function(n,i){e[++t]=[i,n]}),e},Y0=function(o){var t=-1,e=Array(o.size);return o.forEach(function(n){e[++t]=n}),e};var Nm=De?De.prototype:void 0,ed=Nm?Nm.valueOf:void 0;const Q0=function(o,t,e,n,i,r,s){switch(e){case"[object DataView]":if(o.byteLength!=t.byteLength||o.byteOffset!=t.byteOffset)return!1;o=o.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(o.byteLength!=t.byteLength||!r(new Zr(o),new Zr(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return ui(+o,+t);case"[object Error]":return o.name==t.name&&o.message==t.message;case"[object RegExp]":case"[object String]":return o==t+"";case"[object Map]":var a=$0;case"[object Set]":var c=1&n;if(a||(a=Y0),o.size!=t.size&&!c)return!1;var l=s.get(o);if(l)return l==t;n|=2,s.set(o,t);var d=Tm(a(o),a(t),n,i,r,s);return s.delete(o),d;case"[object Symbol]":if(ed)return ed.call(o)==ed.call(t)}return!1};var Z0=Object.prototype.hasOwnProperty;const J0=function(o,t,e,n,i,r){var s=1&e,a=gl(o),c=a.length;if(c!=gl(t).length&&!s)return!1;for(var l=c;l--;){var d=a[l];if(!(s?d in t:Z0.call(t,d)))return!1}var u=r.get(o),h=r.get(t);if(u&&h)return u==t&&h==o;var m=!0;r.set(o,t),r.set(t,o);for(var p=s;++l<c;){var f=o[d=a[l]],b=t[d];if(n)var C=s?n(b,f,d,t,o,r):n(f,b,d,o,t,r);if(!(C===void 0?f===b||i(f,b,e,n,r):C)){m=!1;break}p||(p=d=="constructor")}if(m&&!p){var I=o.constructor,M=t.constructor;I==M||!("constructor"in o)||!("constructor"in t)||typeof I=="function"&&I instanceof I&&typeof M=="function"&&M instanceof M||(m=!1)}return r.delete(o),r.delete(t),m};var Pm="[object Arguments]",Lm="[object Array]",_s="[object Object]",zm=Object.prototype.hasOwnProperty;const X0=function(o,t,e,n,i,r){var s=Xt(o),a=Xt(t),c=s?Lm:fi(o),l=a?Lm:fi(t),d=(c=c==Pm?_s:c)==_s,u=(l=l==Pm?_s:l)==_s,h=c==l;if(h&&gi(o)){if(!gi(t))return!1;s=!0,d=!1}if(h&&!d)return r||(r=new Ln),s||ul(o)?Tm(o,t,e,n,i,r):Q0(o,t,c,e,n,i,r);if(!(1&e)){var m=d&&zm.call(o,"__wrapped__"),p=u&&zm.call(t,"__wrapped__");if(m||p){var f=m?o.value():o,b=p?t.value():t;return r||(r=new Ln),i(f,b,e,n,r)}}return!!h&&(r||(r=new Ln),J0(o,t,e,n,i,r))},Cs=function o(t,e,n,i,r){return t===e||(t==null||e==null||!ae(t)&&!ae(e)?t!=t&&e!=e:X0(t,e,n,i,o,r))},t_=function(o,t,e){var n=(e=typeof e=="function"?e:void 0)?e(o,t):void 0;return n===void 0?Cs(o,t,void 0,e):!!n};class Om extends Be{constructor(t){super(t),this._config={childList:!0,characterData:!0,subtree:!0},this.domConverter=t.domConverter,this._domElements=new Set,this._mutationObserver=new window.MutationObserver(this._onMutations.bind(this))}flush(){this._onMutations(this._mutationObserver.takeRecords())}observe(t){this._domElements.add(t),this.isEnabled&&this._mutationObserver.observe(t,this._config)}stopObserving(t){if(this._domElements.delete(t),this.isEnabled){this._mutationObserver.disconnect();for(const e of this._domElements)this._mutationObserver.observe(e,this._config)}}enable(){super.enable();for(const t of this._domElements)this._mutationObserver.observe(t,this._config)}disable(){super.disable(),this._mutationObserver.disconnect()}destroy(){super.destroy(),this._mutationObserver.disconnect()}_onMutations(t){if(t.length===0)return;const e=this.domConverter,n=new Set,i=new Set;for(const s of t){const a=e.mapDomToView(s.target);a&&(a.is("uiElement")||a.is("rawElement")||s.type!=="childList"||this._isBogusBrMutation(s)||i.add(a))}for(const s of t){const a=e.mapDomToView(s.target);if((!a||!a.is("uiElement")&&!a.is("rawElement"))&&s.type==="characterData"){const c=e.findCorrespondingViewText(s.target);c&&!i.has(c.parent)?n.add(c):!c&&ne(s.target)&&i.add(e.mapDomToView(s.target.parentNode))}}const r=[];for(const s of n)r.push({type:"text",node:s});for(const s of i){const a=e.mapViewToDom(s),c=Array.from(s.getChildren()),l=Array.from(e.domChildrenToView(a,{withChildren:!1}));t_(c,l,e_)||r.push({type:"children",node:s})}r.length&&this.document.fire("mutations",{mutations:r})}_isBogusBrMutation(t){let e=null;return t.nextSibling===null&&t.removedNodes.length===0&&t.addedNodes.length==1&&(e=this.domConverter.domToView(t.addedNodes[0],{withChildren:!1})),e&&e.is("element","br")}}function e_(o,t){if(!Array.isArray(o))return o===t||!(!o.is("$text")||!t.is("$text"))&&o.data===t.data}class vs extends Ze{constructor(t){super(t),this._renderTimeoutId=null,this._isFocusChanging=!1,this.domEventType=["focus","blur"],this.useCapture=!0;const e=this.document;e.on("focus",()=>this._handleFocus()),e.on("blur",(n,i)=>this._handleBlur(i)),e.on("beforeinput",()=>{e.isFocused||this._handleFocus()},{priority:"highest"})}flush(){this._isFocusChanging&&(this._isFocusChanging=!1,this.document.isFocused=!0)}onDomEvent(t){this.fire(t.type,t)}destroy(){this._clearTimeout(),super.destroy()}_handleFocus(){this._clearTimeout(),this._isFocusChanging=!0,this._renderTimeoutId=setTimeout(()=>{this._renderTimeoutId=null,this.flush(),this.view.change(()=>{})},50)}_handleBlur(t){const e=this.document.selection.editableElement;e!==null&&e!==t.target||(this.document.isFocused=!1,this._isFocusChanging=!1,this.view.change(()=>{}))}_clearTimeout(){this._renderTimeoutId&&(clearTimeout(this._renderTimeoutId),this._renderTimeoutId=null)}}class n_ extends Be{constructor(t){super(t),this.mutationObserver=t.getObserver(Om),this.focusObserver=t.getObserver(vs),this.selection=this.document.selection,this.domConverter=t.domConverter,this._documents=new WeakSet,this._fireSelectionChangeDoneDebounced=bn(e=>{this.document.fire("selectionChangeDone",e)},200),this._clearInfiniteLoopInterval=setInterval(()=>this._clearInfiniteLoop(),1e3),this._documentIsSelectingInactivityTimeoutDebounced=bn(()=>this.document.isSelecting=!1,5e3),this._loopbackCounter=0}observe(t){const e=t.ownerDocument,n=()=>{this.document.isSelecting&&(this._handleSelectionChange(e),this.document.isSelecting=!1,this._documentIsSelectingInactivityTimeoutDebounced.cancel())};this.listenTo(t,"selectstart",()=>{this.document.isSelecting=!0,this._documentIsSelectingInactivityTimeoutDebounced()},{priority:"highest"}),this.listenTo(t,"keydown",n,{priority:"highest",useCapture:!0}),this.listenTo(t,"keyup",n,{priority:"highest",useCapture:!0}),this._documents.has(e)||(this.listenTo(e,"mouseup",n,{priority:"highest",useCapture:!0}),this.listenTo(e,"selectionchange",()=>{this.document.isComposing&&!v.isAndroid||(this._handleSelectionChange(e),this._documentIsSelectingInactivityTimeoutDebounced())}),this.listenTo(this.view.document,"compositionstart",()=>{this._handleSelectionChange(e)},{priority:"lowest"}),this._documents.add(e))}stopObserving(t){this.stopListening(t)}destroy(){super.destroy(),clearInterval(this._clearInfiniteLoopInterval),this._fireSelectionChangeDoneDebounced.cancel(),this._documentIsSelectingInactivityTimeoutDebounced.cancel()}_reportInfiniteLoop(){}_handleSelectionChange(t){if(!this.isEnabled)return;const e=t.defaultView.getSelection();if(this.checkShouldIgnoreEventFromTarget(e.anchorNode))return;this.mutationObserver.flush();const n=this.domConverter.domSelectionToView(e);if(n.rangeCount!=0){if(this.view.hasDomSelection=!0,this.focusObserver.flush(),!this.selection.isEqual(n)||!this.domConverter.isDomSelectionCorrect(e))if(++this._loopbackCounter>60)this._reportInfiniteLoop();else if(this.selection.isSimilar(n))this.view.forceRender();else{const i={oldSelection:this.selection,newSelection:n,domSelection:e};this.document.fire("selectionChange",i),this._fireSelectionChangeDoneDebounced(i)}}else this.view.hasDomSelection=!1}_clearInfiniteLoop(){this._loopbackCounter=0}}class i_ extends Ze{constructor(t){super(t),this.domEventType=["compositionstart","compositionupdate","compositionend"];const e=this.document;e.on("compositionstart",()=>{e.isComposing=!0},{priority:"low"}),e.on("compositionend",()=>{e.isComposing=!1},{priority:"low"})}onDomEvent(t){this.fire(t.type,t,{data:t.data})}}class Rm{constructor(t,e={}){this._files=e.cacheFiles?Fm(t):null,this._native=t}get files(){return this._files||(this._files=Fm(this._native)),this._files}get types(){return this._native.types}getData(t){return this._native.getData(t)}setData(t,e){this._native.setData(t,e)}set effectAllowed(t){this._native.effectAllowed=t}get effectAllowed(){return this._native.effectAllowed}set dropEffect(t){this._native.dropEffect=t}get dropEffect(){return this._native.dropEffect}setDragImage(t,e,n){this._native.setDragImage(t,e,n)}get isCanceled(){return this._native.dropEffect=="none"||!!this._native.mozUserCancelled}}function Fm(o){const t=Array.from(o.files||[]),e=Array.from(o.items||[]);return t.length?t:e.filter(n=>n.kind==="file").map(n=>n.getAsFile())}class o_ extends Ze{constructor(){super(...arguments),this.domEventType="beforeinput"}onDomEvent(t){const e=t.getTargetRanges(),n=this.view,i=n.document;let r=null,s=null,a=[];if(t.dataTransfer&&(r=new Rm(t.dataTransfer)),t.data!==null?s=t.data:r&&(s=r.getData("text/plain")),i.selection.isFake)a=Array.from(i.selection.getRanges());else if(e.length)a=e.map(c=>{const l=n.domConverter.domPositionToView(c.startContainer,c.startOffset),d=n.domConverter.domPositionToView(c.endContainer,c.endOffset);return l?n.createRange(l,d):d?n.createRange(d):void 0}).filter(c=>!!c);else if(v.isAndroid){const c=t.target.ownerDocument.defaultView.getSelection();a=Array.from(n.domConverter.domSelectionToView(c).getRanges())}if(v.isAndroid&&t.inputType=="insertCompositionText"&&s&&s.endsWith(`
`))this.fire(t.type,t,{inputType:"insertParagraph",targetRanges:[n.createRange(a[0].end)]});else if(t.inputType=="insertText"&&s&&s.includes(`
`)){const c=s.split(/\n{1,2}/g);let l=a;for(let d=0;d<c.length;d++){const u=c[d];u!=""&&(this.fire(t.type,t,{data:u,dataTransfer:r,targetRanges:l,inputType:t.inputType,isComposing:t.isComposing}),l=[i.selection.getFirstRange()]),d+1<c.length&&(this.fire(t.type,t,{inputType:"insertParagraph",targetRanges:l}),l=[i.selection.getFirstRange()])}}else this.fire(t.type,t,{data:s,dataTransfer:r,targetRanges:a,inputType:t.inputType,isComposing:t.isComposing})}}class r_ extends Be{constructor(t){super(t),this.document.on("keydown",(e,n)=>{if(this.isEnabled&&((i=n.keyCode)==ct.arrowright||i==ct.arrowleft||i==ct.arrowup||i==ct.arrowdown)){const r=new Un(this.document,"arrowKey",this.document.selection.getFirstRange());this.document.fire(r,n),r.stop.called&&e.stop()}var i})}observe(){}stopObserving(){}}class s_ extends Be{constructor(t){super(t);const e=this.document;e.on("keydown",(n,i)=>{if(!this.isEnabled||i.keyCode!=ct.tab||i.ctrlKey)return;const r=new Un(e,"tab",e.selection.getFirstRange());e.fire(r,i),r.stop.called&&n.stop()})}observe(){}stopObserving(){}}const _e=function(o){return Al(o,5)};class a_ extends gt(){constructor(t){super(),this.domRoots=new Map,this._initialDomRootAttributes=new WeakMap,this._observers=new Map,this._ongoingChange=!1,this._postFixersInProgress=!1,this._renderingDisabled=!1,this._hasChangedSinceTheLastRendering=!1,this.document=new ps(t),this.domConverter=new ws(this.document),this.set("isRenderingInProgress",!1),this.set("hasDomSelection",!1),this._renderer=new y0(this.domConverter,this.document.selection),this._renderer.bind("isFocused","isSelecting","isComposing").to(this.document,"isFocused","isSelecting","isComposing"),this._writer=new km(this.document),this.addObserver(Om),this.addObserver(vs),this.addObserver(n_),this.addObserver(B0),this.addObserver(H0),this.addObserver(i_),this.addObserver(r_),this.addObserver(o_),this.addObserver(s_),this.document.on("arrowKey",v0,{priority:"low"}),b0(this),this.on("render",()=>{this._render(),this.document.fire("layoutChanged"),this._hasChangedSinceTheLastRendering=!1}),this.listenTo(this.document.selection,"change",()=>{this._hasChangedSinceTheLastRendering=!0}),this.listenTo(this.document,"change:isFocused",()=>{this._hasChangedSinceTheLastRendering=!0}),v.isiOS&&this.listenTo(this.document,"blur",(e,n)=>{this.domConverter.mapDomToView(n.domEvent.relatedTarget)||this.domConverter._clearDomSelection()}),this.listenTo(this.document,"mutations",(e,{mutations:n})=>{n.forEach(i=>this._renderer.markToSync(i.type,i.node))},{priority:"low"}),this.listenTo(this.document,"mutations",()=>{this.forceRender()},{priority:"lowest"})}attachDomRoot(t,e="main"){const n=this.document.getRoot(e);n._name=t.tagName.toLowerCase();const i={};for(const{name:s,value:a}of Array.from(t.attributes))i[s]=a,s==="class"?this._writer.addClass(a.split(" "),n):n.hasAttribute(s)||this._writer.setAttribute(s,a,n);this._initialDomRootAttributes.set(t,i);const r=()=>{this._writer.setAttribute("contenteditable",(!n.isReadOnly).toString(),n),n.isReadOnly?this._writer.addClass("ck-read-only",n):this._writer.removeClass("ck-read-only",n)};r(),this.domRoots.set(e,t),this.domConverter.bindElements(t,n),this._renderer.markToSync("children",n),this._renderer.markToSync("attributes",n),this._renderer.domDocuments.add(t.ownerDocument),n.on("change:children",(s,a)=>this._renderer.markToSync("children",a)),n.on("change:attributes",(s,a)=>this._renderer.markToSync("attributes",a)),n.on("change:text",(s,a)=>this._renderer.markToSync("text",a)),n.on("change:isReadOnly",()=>this.change(r)),n.on("change",()=>{this._hasChangedSinceTheLastRendering=!0});for(const s of this._observers.values())s.observe(t,e)}detachDomRoot(t){const e=this.domRoots.get(t);Array.from(e.attributes).forEach(({name:i})=>e.removeAttribute(i));const n=this._initialDomRootAttributes.get(e);for(const i in n)e.setAttribute(i,n[i]);this.domRoots.delete(t),this.domConverter.unbindDomElement(e);for(const i of this._observers.values())i.stopObserving(e)}getDomRoot(t="main"){return this.domRoots.get(t)}addObserver(t){let e=this._observers.get(t);if(e)return e;e=new t(this),this._observers.set(t,e);for(const[n,i]of this.domRoots)e.observe(i,n);return e.enable(),e}getObserver(t){return this._observers.get(t)}disableObservers(){for(const t of this._observers.values())t.disable()}enableObservers(){for(const t of this._observers.values())t.enable()}scrollToTheSelection({alignToTop:t,forceScroll:e,viewportOffset:n=20,ancestorOffset:i=20}={}){const r=this.document.selection.getFirstRange();if(!r)return;const s=_e({alignToTop:t,forceScroll:e,viewportOffset:n,ancestorOffset:i});typeof n=="number"&&(n={top:n,bottom:n,left:n,right:n});const a={target:this.domConverter.viewRangeToDom(r),viewportOffset:n,ancestorOffset:i,alignToTop:t,forceScroll:e};this.fire("scrollToTheSelection",a,s),function({target:c,viewportOffset:l=0,ancestorOffset:d=0,alignToTop:u,forceScroll:h}){const m=vl(c);let p=m,f=null;for(l=function(b){return typeof b=="number"?{top:b,bottom:b,left:b,right:b}:b}(l);p;){let b;b=kA(p==m?c:f),pA({parent:b,getRect:()=>Th(c,p),alignToTop:u,ancestorOffset:d,forceScroll:h});const C=Th(c,p);if(gA({window:p,rect:C,viewportOffset:l,alignToTop:u,forceScroll:h}),p.parent!=p){if(f=p.frameElement,p=p.parent,!f)return}else p=null}}(a)}focus(){if(!this.document.isFocused){const t=this.document.selection.editableElement;t&&(this.domConverter.focus(t),this.forceRender())}}change(t){if(this.isRenderingInProgress||this._postFixersInProgress)throw new E("cannot-change-view-tree",this);try{if(this._ongoingChange)return t(this._writer);this._ongoingChange=!0;const e=t(this._writer);return this._ongoingChange=!1,!this._renderingDisabled&&this._hasChangedSinceTheLastRendering&&(this._postFixersInProgress=!0,this.document._callPostFixers(this._writer),this._postFixersInProgress=!1,this.fire("render")),e}catch(e){E.rethrowUnexpectedError(e,this)}}forceRender(){this._hasChangedSinceTheLastRendering=!0,this.getObserver(vs).flush(),this.change(()=>{})}destroy(){for(const t of this._observers.values())t.destroy();this.document.destroy(),this.stopListening()}createPositionAt(t,e){return G._createAt(t,e)}createPositionAfter(t){return G._createAfter(t)}createPositionBefore(t){return G._createBefore(t)}createRange(t,e){return new et(t,e)}createRangeOn(t){return et._createOn(t)}createRangeIn(t){return et._createIn(t)}createSelection(...t){return new Ae(...t)}_disableRendering(t){this._renderingDisabled=t,t==0&&this.change(()=>{})}_render(){this.isRenderingInProgress=!0,this.disableObservers(),this._renderer.render(),this.enableObservers(),this.isRenderingInProgress=!1}}class Je{is(){throw new Error("is() method is abstract")}}class wn extends Je{constructor(t){super(),this.parent=null,this._index=null,this._startOffset=null,this._attrs=Ie(t)}get document(){return null}get index(){return this._index}get startOffset(){return this._startOffset}get offsetSize(){return 1}get endOffset(){return this.startOffset===null?null:this.startOffset+this.offsetSize}get nextSibling(){const t=this.index;return t!==null&&this.parent.getChild(t+1)||null}get previousSibling(){const t=this.index;return t!==null&&this.parent.getChild(t-1)||null}get root(){let t=this;for(;t.parent;)t=t.parent;return t}isAttached(){return this.parent!==null&&this.root.isAttached()}getPath(){const t=[];let e=this;for(;e.parent;)t.unshift(e.startOffset),e=e.parent;return t}getAncestors(t={}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}getCommonAncestor(t,e={}){const n=this.getAncestors(e),i=t.getAncestors(e);let r=0;for(;n[r]==i[r]&&n[r];)r++;return r===0?null:n[r-1]}isBefore(t){if(this==t||this.root!==t.root)return!1;const e=this.getPath(),n=t.getPath(),i=Gt(e,n);switch(i){case"prefix":return!0;case"extension":return!1;default:return e[i]<n[i]}}isAfter(t){return this!=t&&this.root===t.root&&!this.isBefore(t)}hasAttribute(t){return this._attrs.has(t)}getAttribute(t){return this._attrs.get(t)}getAttributes(){return this._attrs.entries()}getAttributeKeys(){return this._attrs.keys()}toJSON(){const t={};return this._attrs.size&&(t.attributes=Array.from(this._attrs).reduce((e,n)=>(e[n[0]]=n[1],e),{})),t}_clone(t){return new this.constructor(this._attrs)}_remove(){this.parent._removeChildren(this.index)}_setAttribute(t,e){this._attrs.set(t,e)}_setAttributesTo(t){this._attrs=Ie(t)}_removeAttribute(t){return this._attrs.delete(t)}_clearAttributes(){this._attrs.clear()}}wn.prototype.is=function(o){return o==="node"||o==="model:node"};class Mi{constructor(t){this._nodes=[],this._offsetToNode=[],t&&this._insertNodes(0,t)}[Symbol.iterator](){return this._nodes[Symbol.iterator]()}get length(){return this._nodes.length}get maxOffset(){return this._offsetToNode.length}getNode(t){return this._nodes[t]||null}getNodeAtOffset(t){return this._offsetToNode[t]||null}getNodeIndex(t){return t.index}getNodeStartOffset(t){return t.startOffset}indexToOffset(t){if(t==this._nodes.length)return this.maxOffset;const e=this._nodes[t];if(!e)throw new E("model-nodelist-index-out-of-bounds",this);return this.getNodeStartOffset(e)}offsetToIndex(t){if(t==this._offsetToNode.length)return this._nodes.length;const e=this._offsetToNode[t];if(!e)throw new E("model-nodelist-offset-out-of-bounds",this,{offset:t,nodeList:this});return this.getNodeIndex(e)}_insertNodes(t,e){for(const s of e)if(!(s instanceof wn))throw new E("model-nodelist-insertnodes-not-node",this);const n=Array.from(e),i=function(s){const a=[];for(const c of s){const l=a.length;a.length+=c.offsetSize,a.fill(c,l)}return a}(n);let r=this.indexToOffset(t);this._nodes=Vh(this._nodes,n,t,0),this._offsetToNode=Vh(this._offsetToNode,i,r,0);for(let s=t;s<this._nodes.length;s++)this._nodes[s]._index=s,this._nodes[s]._startOffset=r,r+=this._nodes[s].offsetSize}_removeNodes(t,e=1){if(e==0)return[];let n=this.indexToOffset(t);const i=this._nodes.splice(t,e),r=i[i.length-1],s=r.startOffset+r.offsetSize-n;this._offsetToNode.splice(n,s);for(const a of i)a._index=null,a._startOffset=null;for(let a=t;a<this._nodes.length;a++)this._nodes[a]._index=a,this._nodes[a]._startOffset=n,n+=this._nodes[a].offsetSize;return i}toJSON(){return this._nodes.map(t=>t.toJSON())}}class kt extends wn{constructor(t,e){super(e),this._data=t||""}get offsetSize(){return this.data.length}get data(){return this._data}toJSON(){const t=super.toJSON();return t.data=this.data,t}_clone(){return new kt(this.data,this.getAttributes())}static fromJSON(t){return new kt(t.data,t.attributes)}}kt.prototype.is=function(o){return o==="$text"||o==="model:$text"||o==="text"||o==="model:text"||o==="node"||o==="model:node"};class Ce extends Je{constructor(t,e,n){if(super(),this.textNode=t,e<0||e>t.offsetSize)throw new E("model-textproxy-wrong-offsetintext",this);if(n<0||e+n>t.offsetSize)throw new E("model-textproxy-wrong-length",this);this.data=t.data.substring(e,e+n),this.offsetInText=e}get startOffset(){return this.textNode.startOffset!==null?this.textNode.startOffset+this.offsetInText:null}get offsetSize(){return this.data.length}get endOffset(){return this.startOffset!==null?this.startOffset+this.offsetSize:null}get isPartial(){return this.offsetSize!==this.textNode.offsetSize}get parent(){return this.textNode.parent}get root(){return this.textNode.root}getPath(){const t=this.textNode.getPath();return t.length>0&&(t[t.length-1]+=this.offsetInText),t}getAncestors(t={}){const e=[];let n=t.includeSelf?this:this.parent;for(;n;)e[t.parentFirst?"push":"unshift"](n),n=n.parent;return e}hasAttribute(t){return this.textNode.hasAttribute(t)}getAttribute(t){return this.textNode.getAttribute(t)}getAttributes(){return this.textNode.getAttributes()}getAttributeKeys(){return this.textNode.getAttributeKeys()}}Ce.prototype.is=function(o){return o==="$textProxy"||o==="model:$textProxy"||o==="textProxy"||o==="model:textProxy"};class ht extends wn{constructor(t,e,n){super(e),this._children=new Mi,this.name=t,n&&this._insertChild(0,n)}get childCount(){return this._children.length}get maxOffset(){return this._children.maxOffset}get isEmpty(){return this.childCount===0}getChild(t){return this._children.getNode(t)}getChildAtOffset(t){return this._children.getNodeAtOffset(t)}getChildren(){return this._children[Symbol.iterator]()}getChildIndex(t){return this._children.getNodeIndex(t)}getChildStartOffset(t){return this._children.getNodeStartOffset(t)}offsetToIndex(t){return this._children.offsetToIndex(t)}getNodeByPath(t){let e=this;for(const n of t)e=e.getChildAtOffset(n);return e}findAncestor(t,e={}){let n=e.includeSelf?this:this.parent;for(;n;){if(n.name===t)return n;n=n.parent}return null}toJSON(){const t=super.toJSON();if(t.name=this.name,this._children.length>0){t.children=[];for(const e of this._children)t.children.push(e.toJSON())}return t}_clone(t=!1){const e=t?Array.from(this._children).map(n=>n._clone(!0)):void 0;return new ht(this.name,this.getAttributes(),e)}_appendChild(t){this._insertChild(this.childCount,t)}_insertChild(t,e){const n=function(i){return typeof i=="string"?[new kt(i)]:(Jt(i)||(i=[i]),Array.from(i).map(r=>typeof r=="string"?new kt(r):r instanceof Ce?new kt(r.data,r.getAttributes()):r))}(e);for(const i of n)i.parent!==null&&i._remove(),i.parent=this;this._children._insertNodes(t,n)}_removeChildren(t,e=1){const n=this._children._removeNodes(t,e);for(const i of n)i.parent=null;return n}static fromJSON(t){let e;if(t.children){e=[];for(const n of t.children)n.name?e.push(ht.fromJSON(n)):e.push(kt.fromJSON(n))}return new ht(t.name,t.attributes,e)}}ht.prototype.is=function(o,t){return t?t===this.name&&(o==="element"||o==="model:element"):o==="element"||o==="model:element"||o==="node"||o==="model:node"};class Re{constructor(t){if(!t||!t.boundaries&&!t.startPosition)throw new E("model-tree-walker-no-start-position",null);const e=t.direction||"forward";if(e!="forward"&&e!="backward")throw new E("model-tree-walker-unknown-direction",t,{direction:e});this.direction=e,this.boundaries=t.boundaries||null,t.startPosition?this._position=t.startPosition.clone():this._position=R._createAt(this.boundaries[this.direction=="backward"?"end":"start"]),this.position.stickiness="toNone",this.singleCharacters=!!t.singleCharacters,this.shallow=!!t.shallow,this.ignoreElementEnd=!!t.ignoreElementEnd,this._boundaryStartParent=this.boundaries?this.boundaries.start.parent:null,this._boundaryEndParent=this.boundaries?this.boundaries.end.parent:null,this._visitedParent=this.position.parent}[Symbol.iterator](){return this}get position(){return this._position}skip(t){let e,n,i,r;do i=this.position,r=this._visitedParent,{done:e,value:n}=this.next();while(!e&&t(n));e||(this._position=i,this._visitedParent=r)}next(){return this.direction=="forward"?this._next():this._previous()}_next(){const t=this.position,e=this.position.clone(),n=this._visitedParent;if(n.parent===null&&e.offset===n.maxOffset)return{done:!0,value:void 0};if(n===this._boundaryEndParent&&e.offset==this.boundaries.end.offset)return{done:!0,value:void 0};const i=Bi(e,n),r=i||jm(e,n,i);if(r instanceof ht){if(this.shallow){if(this.boundaries&&this.boundaries.end.isBefore(e))return{done:!0,value:void 0};e.offset++}else e.path.push(0),this._visitedParent=r;return this._position=e,An("elementStart",r,t,e,1)}if(r instanceof kt){let s;if(this.singleCharacters)s=1;else{let l=r.endOffset;this._boundaryEndParent==n&&this.boundaries.end.offset<l&&(l=this.boundaries.end.offset),s=l-e.offset}const a=e.offset-r.startOffset,c=new Ce(r,a,s);return e.offset+=s,this._position=e,An("text",c,t,e,s)}return e.path.pop(),e.offset++,this._position=e,this._visitedParent=n.parent,this.ignoreElementEnd?this._next():An("elementEnd",n,t,e)}_previous(){const t=this.position,e=this.position.clone(),n=this._visitedParent;if(n.parent===null&&e.offset===0)return{done:!0,value:void 0};if(n==this._boundaryStartParent&&e.offset==this.boundaries.start.offset)return{done:!0,value:void 0};const i=e.parent,r=Bi(e,i),s=r||Vm(e,i,r);if(s instanceof ht)return e.offset--,this.shallow?(this._position=e,An("elementStart",s,t,e,1)):(e.path.push(s.maxOffset),this._position=e,this._visitedParent=s,this.ignoreElementEnd?this._previous():An("elementEnd",s,t,e));if(s instanceof kt){let a;if(this.singleCharacters)a=1;else{let d=s.startOffset;this._boundaryStartParent==n&&this.boundaries.start.offset>d&&(d=this.boundaries.start.offset),a=e.offset-d}const c=e.offset-s.startOffset,l=new Ce(s,c-a,a);return e.offset-=a,this._position=e,An("text",l,t,e,a)}return e.path.pop(),this._position=e,this._visitedParent=n.parent,An("elementStart",n,t,e,1)}}function An(o,t,e,n,i){return{done:!1,value:{type:o,item:t,previousPosition:e,nextPosition:n,length:i}}}class R extends Je{constructor(t,e,n="toNone"){if(super(),!t.is("element")&&!t.is("documentFragment"))throw new E("model-position-root-invalid",t);if(!(e instanceof Array)||e.length===0)throw new E("model-position-path-incorrect-format",t,{path:e});t.is("rootElement")?e=e.slice():(e=[...t.getPath(),...e],t=t.root),this.root=t,this.path=e,this.stickiness=n}get offset(){return this.path[this.path.length-1]}set offset(t){this.path[this.path.length-1]=t}get parent(){let t=this.root;for(let e=0;e<this.path.length-1;e++)if(t=t.getChildAtOffset(this.path[e]),!t)throw new E("model-position-path-incorrect",this,{position:this});if(t.is("$text"))throw new E("model-position-path-incorrect",this,{position:this});return t}get index(){return this.parent.offsetToIndex(this.offset)}get textNode(){return Bi(this,this.parent)}get nodeAfter(){const t=this.parent;return jm(this,t,Bi(this,t))}get nodeBefore(){const t=this.parent;return Vm(this,t,Bi(this,t))}get isAtStart(){return this.offset===0}get isAtEnd(){return this.offset==this.parent.maxOffset}isValid(){if(this.offset<0)return!1;let t=this.root;for(let e=0;e<this.path.length-1;e++)if(t=t.getChildAtOffset(this.path[e]),!t)return!1;return this.offset<=t.maxOffset}compareWith(t){if(this.root!=t.root)return"different";const e=Gt(this.path,t.path);switch(e){case"same":return"same";case"prefix":return"before";case"extension":return"after";default:return this.path[e]<t.path[e]?"before":"after"}}getLastMatchingPosition(t,e={}){e.startPosition=this;const n=new Re(e);return n.skip(t),n.position}getParentPath(){return this.path.slice(0,-1)}getAncestors(){const t=this.parent;return t.is("documentFragment")?[t]:t.getAncestors({includeSelf:!0})}findAncestor(t){const e=this.parent;return e.is("element")?e.findAncestor(t,{includeSelf:!0}):null}getCommonPath(t){if(this.root!=t.root)return[];const e=Gt(this.path,t.path),n=typeof e=="string"?Math.min(this.path.length,t.path.length):e;return this.path.slice(0,n)}getCommonAncestor(t){const e=this.getAncestors(),n=t.getAncestors();let i=0;for(;e[i]==n[i]&&e[i];)i++;return i===0?null:e[i-1]}getShiftedBy(t){const e=this.clone(),n=e.offset+t;return e.offset=n<0?0:n,e}isAfter(t){return this.compareWith(t)=="after"}isBefore(t){return this.compareWith(t)=="before"}isEqual(t){return this.compareWith(t)=="same"}isTouching(t){if(this.root!==t.root)return!1;const e=Math.min(this.path.length,t.path.length);for(let n=0;n<e;n++){const i=this.path[n]-t.path[n];if(i<-1||i>1)return!1;if(i===1)return Hm(t,this,n);if(i===-1)return Hm(this,t,n)}return this.path.length===t.path.length||(this.path.length>t.path.length?nd(this.path,e):nd(t.path,e))}hasSameParentAs(t){return this.root!==t.root?!1:Gt(this.getParentPath(),t.getParentPath())=="same"}getTransformedByOperation(t){let e;switch(t.type){case"insert":e=this._getTransformedByInsertOperation(t);break;case"move":case"remove":case"reinsert":e=this._getTransformedByMoveOperation(t);break;case"split":e=this._getTransformedBySplitOperation(t);break;case"merge":e=this._getTransformedByMergeOperation(t);break;default:e=R._createAt(this)}return e}_getTransformedByInsertOperation(t){return this._getTransformedByInsertion(t.position,t.howMany)}_getTransformedByMoveOperation(t){return this._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany)}_getTransformedBySplitOperation(t){const e=t.movedRange;return e.containsPosition(this)||e.start.isEqual(this)&&this.stickiness=="toNext"?this._getCombined(t.splitPosition,t.moveTargetPosition):t.graveyardPosition?this._getTransformedByMove(t.graveyardPosition,t.insertionPosition,1):this._getTransformedByInsertion(t.insertionPosition,1)}_getTransformedByMergeOperation(t){const e=t.movedRange;let n;return e.containsPosition(this)||e.start.isEqual(this)?(n=this._getCombined(t.sourcePosition,t.targetPosition),t.sourcePosition.isBefore(t.targetPosition)&&(n=n._getTransformedByDeletion(t.deletionPosition,1))):n=this.isEqual(t.deletionPosition)?R._createAt(t.deletionPosition):this._getTransformedByMove(t.deletionPosition,t.graveyardPosition,1),n}_getTransformedByDeletion(t,e){const n=R._createAt(this);if(this.root!=t.root)return n;if(Gt(t.getParentPath(),this.getParentPath())=="same"){if(t.offset<this.offset){if(t.offset+e>this.offset)return null;n.offset-=e}}else if(Gt(t.getParentPath(),this.getParentPath())=="prefix"){const i=t.path.length-1;if(t.offset<=this.path[i]){if(t.offset+e>this.path[i])return null;n.path[i]-=e}}return n}_getTransformedByInsertion(t,e){const n=R._createAt(this);if(this.root!=t.root)return n;if(Gt(t.getParentPath(),this.getParentPath())=="same")(t.offset<this.offset||t.offset==this.offset&&this.stickiness!="toPrevious")&&(n.offset+=e);else if(Gt(t.getParentPath(),this.getParentPath())=="prefix"){const i=t.path.length-1;t.offset<=this.path[i]&&(n.path[i]+=e)}return n}_getTransformedByMove(t,e,n){if(e=e._getTransformedByDeletion(t,n),t.isEqual(e))return R._createAt(this);const i=this._getTransformedByDeletion(t,n);return i===null||t.isEqual(this)&&this.stickiness=="toNext"||t.getShiftedBy(n).isEqual(this)&&this.stickiness=="toPrevious"?this._getCombined(t,e):i._getTransformedByInsertion(e,n)}_getCombined(t,e){const n=t.path.length-1,i=R._createAt(e);return i.stickiness=this.stickiness,i.offset=i.offset+this.path[n]-t.offset,i.path=[...i.path,...this.path.slice(n+1)],i}toJSON(){return{root:this.root.toJSON(),path:Array.from(this.path),stickiness:this.stickiness}}clone(){return new this.constructor(this.root,this.path,this.stickiness)}static _createAt(t,e,n="toNone"){if(t instanceof R)return new R(t.root,t.path,t.stickiness);{const i=t;if(e=="end")e=i.maxOffset;else{if(e=="before")return this._createBefore(i,n);if(e=="after")return this._createAfter(i,n);if(e!==0&&!e)throw new E("model-createpositionat-offset-required",[this,t])}if(!i.is("element")&&!i.is("documentFragment"))throw new E("model-position-parent-incorrect",[this,t]);const r=i.getPath();return r.push(e),new this(i.root,r,n)}}static _createAfter(t,e){if(!t.parent)throw new E("model-position-after-root",[this,t],{root:t});return this._createAt(t.parent,t.endOffset,e)}static _createBefore(t,e){if(!t.parent)throw new E("model-position-before-root",t,{root:t});return this._createAt(t.parent,t.startOffset,e)}static fromJSON(t,e){if(t.root==="$graveyard"){const n=new R(e.graveyard,t.path);return n.stickiness=t.stickiness,n}if(!e.getRoot(t.root))throw new E("model-position-fromjson-no-root",e,{rootName:t.root});return new R(e.getRoot(t.root),t.path,t.stickiness)}}function Bi(o,t){const e=t.getChildAtOffset(o.offset);return e&&e.is("$text")&&e.startOffset<o.offset?e:null}function jm(o,t,e){return e!==null?null:t.getChildAtOffset(o.offset)}function Vm(o,t,e){return e!==null?null:t.getChild(t.offsetToIndex(o.offset)-1)}function Hm(o,t,e){return e+1!==o.path.length&&!!nd(t.path,e+1)&&!!function(n,i){let r=n.parent,s=n.path.length-1,a=0;for(;s>=i;){if(n.path[s]+a!==r.maxOffset)return!1;a=1,s--,r=r.parent}return!0}(o,e+1)}function nd(o,t){for(;t<o.length;){if(o[t]!==0)return!1;t++}return!0}R.prototype.is=function(o){return o==="position"||o==="model:position"};class N extends Je{constructor(t,e){super(),this.start=R._createAt(t),this.end=e?R._createAt(e):R._createAt(t),this.start.stickiness=this.isCollapsed?"toNone":"toNext",this.end.stickiness=this.isCollapsed?"toNone":"toPrevious"}*[Symbol.iterator](){yield*new Re({boundaries:this,ignoreElementEnd:!0})}get isCollapsed(){return this.start.isEqual(this.end)}get isFlat(){return Gt(this.start.getParentPath(),this.end.getParentPath())=="same"}get root(){return this.start.root}containsPosition(t){return t.isAfter(this.start)&&t.isBefore(this.end)}containsRange(t,e=!1){t.isCollapsed&&(e=!1);const n=this.containsPosition(t.start)||e&&this.start.isEqual(t.start),i=this.containsPosition(t.end)||e&&this.end.isEqual(t.end);return n&&i}containsItem(t){const e=R._createBefore(t);return this.containsPosition(e)||this.start.isEqual(e)}isEqual(t){return this.start.isEqual(t.start)&&this.end.isEqual(t.end)}isIntersecting(t){return this.start.isBefore(t.end)&&this.end.isAfter(t.start)}getDifference(t){const e=[];return this.isIntersecting(t)?(this.containsPosition(t.start)&&e.push(new N(this.start,t.start)),this.containsPosition(t.end)&&e.push(new N(t.end,this.end))):e.push(new N(this.start,this.end)),e}getIntersection(t){if(this.isIntersecting(t)){let e=this.start,n=this.end;return this.containsPosition(t.start)&&(e=t.start),this.containsPosition(t.end)&&(n=t.end),new N(e,n)}return null}getJoined(t,e=!1){let n=this.isIntersecting(t);if(n||(n=this.start.isBefore(t.start)?e?this.end.isTouching(t.start):this.end.isEqual(t.start):e?t.end.isTouching(this.start):t.end.isEqual(this.start)),!n)return null;let i=this.start,r=this.end;return t.start.isBefore(i)&&(i=t.start),t.end.isAfter(r)&&(r=t.end),new N(i,r)}getMinimalFlatRanges(){const t=[],e=this.start.getCommonPath(this.end).length,n=R._createAt(this.start);let i=n.parent;for(;n.path.length>e+1;){const r=i.maxOffset-n.offset;r!==0&&t.push(new N(n,n.getShiftedBy(r))),n.path=n.path.slice(0,-1),n.offset++,i=i.parent}for(;n.path.length<=this.end.path.length;){const r=this.end.path[n.path.length-1],s=r-n.offset;s!==0&&t.push(new N(n,n.getShiftedBy(s))),n.offset=r,n.path.push(0)}return t}getWalker(t={}){return t.boundaries=this,new Re(t)}*getItems(t={}){t.boundaries=this,t.ignoreElementEnd=!0;const e=new Re(t);for(const n of e)yield n.item}*getPositions(t={}){t.boundaries=this;const e=new Re(t);yield e.position;for(const n of e)yield n.nextPosition}getTransformedByOperation(t){switch(t.type){case"insert":return this._getTransformedByInsertOperation(t);case"move":case"remove":case"reinsert":return this._getTransformedByMoveOperation(t);case"split":return[this._getTransformedBySplitOperation(t)];case"merge":return[this._getTransformedByMergeOperation(t)]}return[new N(this.start,this.end)]}getTransformedByOperations(t){const e=[new N(this.start,this.end)];for(const n of t)for(let i=0;i<e.length;i++){const r=e[i].getTransformedByOperation(n);e.splice(i,1,...r),i+=r.length-1}for(let n=0;n<e.length;n++){const i=e[n];for(let r=n+1;r<e.length;r++){const s=e[r];(i.containsRange(s)||s.containsRange(i)||i.isEqual(s))&&e.splice(r,1)}}return e}getCommonAncestor(){return this.start.getCommonAncestor(this.end)}getContainedElement(){if(this.isCollapsed)return null;const t=this.start.nodeAfter,e=this.end.nodeBefore;return t&&t.is("element")&&t===e?t:null}toJSON(){return{start:this.start.toJSON(),end:this.end.toJSON()}}clone(){return new this.constructor(this.start,this.end)}_getTransformedByInsertOperation(t,e=!1){return this._getTransformedByInsertion(t.position,t.howMany,e)}_getTransformedByMoveOperation(t,e=!1){const n=t.sourcePosition,i=t.howMany,r=t.targetPosition;return this._getTransformedByMove(n,r,i,e)}_getTransformedBySplitOperation(t){const e=this.start._getTransformedBySplitOperation(t);let n=this.end._getTransformedBySplitOperation(t);return this.end.isEqual(t.insertionPosition)&&(n=this.end.getShiftedBy(1)),e.root!=n.root&&(n=this.end.getShiftedBy(-1)),new N(e,n)}_getTransformedByMergeOperation(t){if(this.start.isEqual(t.targetPosition)&&this.end.isEqual(t.deletionPosition))return new N(this.start);let e=this.start._getTransformedByMergeOperation(t),n=this.end._getTransformedByMergeOperation(t);return e.root!=n.root&&(n=this.end.getShiftedBy(-1)),e.isAfter(n)?(t.sourcePosition.isBefore(t.targetPosition)?(e=R._createAt(n),e.offset=0):(t.deletionPosition.isEqual(e)||(n=t.deletionPosition),e=t.targetPosition),new N(e,n)):new N(e,n)}_getTransformedByInsertion(t,e,n=!1){if(n&&this.containsPosition(t))return[new N(this.start,t),new N(t.getShiftedBy(e),this.end._getTransformedByInsertion(t,e))];{const i=new N(this.start,this.end);return i.start=i.start._getTransformedByInsertion(t,e),i.end=i.end._getTransformedByInsertion(t,e),[i]}}_getTransformedByMove(t,e,n,i=!1){if(this.isCollapsed){const u=this.start._getTransformedByMove(t,e,n);return[new N(u)]}const r=N._createFromPositionAndShift(t,n),s=e._getTransformedByDeletion(t,n);if(this.containsPosition(e)&&!i&&(r.containsPosition(this.start)||r.containsPosition(this.end))){const u=this.start._getTransformedByMove(t,e,n),h=this.end._getTransformedByMove(t,e,n);return[new N(u,h)]}let a;const c=this.getDifference(r);let l=null;const d=this.getIntersection(r);if(c.length==1?l=new N(c[0].start._getTransformedByDeletion(t,n),c[0].end._getTransformedByDeletion(t,n)):c.length==2&&(l=new N(this.start,this.end._getTransformedByDeletion(t,n))),a=l?l._getTransformedByInsertion(s,n,d!==null||i):[],d){const u=new N(d.start._getCombined(r.start,s),d.end._getCombined(r.start,s));a.length==2?a.splice(1,0,u):a.push(u)}return a}_getTransformedByDeletion(t,e){let n=this.start._getTransformedByDeletion(t,e),i=this.end._getTransformedByDeletion(t,e);return n==null&&i==null?null:(n==null&&(n=t),i==null&&(i=t),new N(n,i))}static _createFromPositionAndShift(t,e){const n=t,i=t.getShiftedBy(e);return e>0?new this(n,i):new this(i,n)}static _createIn(t){return new this(R._createAt(t,0),R._createAt(t,t.maxOffset))}static _createOn(t){return this._createFromPositionAndShift(R._createBefore(t),t.offsetSize)}static _createFromRanges(t){if(t.length===0)throw new E("range-create-from-ranges-empty-array",null);if(t.length==1)return t[0].clone();const e=t[0];t.sort((r,s)=>r.start.isAfter(s.start)?1:-1);const n=t.indexOf(e),i=new this(e.start,e.end);for(let r=n-1;r>=0&&t[r].end.isEqual(i.start);r--)i.start=R._createAt(t[r].start);for(let r=n+1;r<t.length&&t[r].start.isEqual(i.end);r++)i.end=R._createAt(t[r].end);return i}static fromJSON(t,e){return new this(R.fromJSON(t.start,e),R.fromJSON(t.end,e))}}N.prototype.is=function(o){return o==="range"||o==="model:range"};class Um extends ut(){constructor(){super(),this._modelToViewMapping=new WeakMap,this._viewToModelMapping=new WeakMap,this._viewToModelLengthCallbacks=new Map,this._markerNameToElements=new Map,this._elementToMarkerNames=new Map,this._deferredBindingRemovals=new Map,this._unboundMarkerNames=new Set,this.on("modelToViewPosition",(t,e)=>{if(e.viewPosition)return;const n=this._modelToViewMapping.get(e.modelPosition.parent);if(!n)throw new E("mapping-model-position-view-parent-not-found",this,{modelPosition:e.modelPosition});e.viewPosition=this.findPositionIn(n,e.modelPosition.offset)},{priority:"low"}),this.on("viewToModelPosition",(t,e)=>{if(e.modelPosition)return;const n=this.findMappedViewAncestor(e.viewPosition),i=this._viewToModelMapping.get(n),r=this._toModelOffset(e.viewPosition.parent,e.viewPosition.offset,n);e.modelPosition=R._createAt(i,r)},{priority:"low"})}bindElements(t,e){this._modelToViewMapping.set(t,e),this._viewToModelMapping.set(e,t)}unbindViewElement(t,e={}){const n=this.toModelElement(t);if(this._elementToMarkerNames.has(t))for(const i of this._elementToMarkerNames.get(t))this._unboundMarkerNames.add(i);e.defer?this._deferredBindingRemovals.set(t,t.root):(this._viewToModelMapping.delete(t),this._modelToViewMapping.get(n)==t&&this._modelToViewMapping.delete(n))}unbindModelElement(t){const e=this.toViewElement(t);this._modelToViewMapping.delete(t),this._viewToModelMapping.get(e)==t&&this._viewToModelMapping.delete(e)}bindElementToMarker(t,e){const n=this._markerNameToElements.get(e)||new Set;n.add(t);const i=this._elementToMarkerNames.get(t)||new Set;i.add(e),this._markerNameToElements.set(e,n),this._elementToMarkerNames.set(t,i)}unbindElementFromMarkerName(t,e){const n=this._markerNameToElements.get(e);n&&(n.delete(t),n.size==0&&this._markerNameToElements.delete(e));const i=this._elementToMarkerNames.get(t);i&&(i.delete(e),i.size==0&&this._elementToMarkerNames.delete(t))}flushUnboundMarkerNames(){const t=Array.from(this._unboundMarkerNames);return this._unboundMarkerNames.clear(),t}flushDeferredBindings(){for(const[t,e]of this._deferredBindingRemovals)t.root==e&&this.unbindViewElement(t);this._deferredBindingRemovals=new Map}clearBindings(){this._modelToViewMapping=new WeakMap,this._viewToModelMapping=new WeakMap,this._markerNameToElements=new Map,this._elementToMarkerNames=new Map,this._unboundMarkerNames=new Set,this._deferredBindingRemovals=new Map}toModelElement(t){return this._viewToModelMapping.get(t)}toViewElement(t){return this._modelToViewMapping.get(t)}toModelRange(t){return new N(this.toModelPosition(t.start),this.toModelPosition(t.end))}toViewRange(t){return new et(this.toViewPosition(t.start),this.toViewPosition(t.end))}toModelPosition(t){const e={viewPosition:t,mapper:this};return this.fire("viewToModelPosition",e),e.modelPosition}toViewPosition(t,e={}){const n={modelPosition:t,mapper:this,isPhantom:e.isPhantom};return this.fire("modelToViewPosition",n),n.viewPosition}markerNameToElements(t){const e=this._markerNameToElements.get(t);if(!e)return null;const n=new Set;for(const i of e)if(i.is("attributeElement"))for(const r of i.getElementsWithSameId())n.add(r);else n.add(i);return n}registerViewToModelLength(t,e){this._viewToModelLengthCallbacks.set(t,e)}findMappedViewAncestor(t){let e=t.parent;for(;!this._viewToModelMapping.has(e);)e=e.parent;return e}_toModelOffset(t,e,n){if(n!=t)return this._toModelOffset(t.parent,t.index,n)+this._toModelOffset(t,e,t);if(t.is("$text"))return e;let i=0;for(let r=0;r<e;r++)i+=this.getModelLength(t.getChild(r));return i}getModelLength(t){if(this._viewToModelLengthCallbacks.get(t.name))return this._viewToModelLengthCallbacks.get(t.name)(t);if(this._viewToModelMapping.has(t))return 1;if(t.is("$text"))return t.data.length;if(t.is("uiElement"))return 0;{let e=0;for(const n of t.getChildren())e+=this.getModelLength(n);return e}}findPositionIn(t,e){let n,i=0,r=0,s=0;if(t.is("$text"))return new G(t,e);for(;r<e;)n=t.getChild(s),i=this.getModelLength(n),r+=i,s++;return r==e?this._moveViewPositionToTextNode(new G(t,s)):this.findPositionIn(n,e-(r-i))}_moveViewPositionToTextNode(t){const e=t.nodeBefore,n=t.nodeAfter;return e instanceof pt?new G(e,e.data.length):n instanceof pt?new G(n,0):t}}class c_{constructor(){this._consumable=new Map,this._textProxyRegistry=new Map}add(t,e){e=ys(e),t instanceof Ce&&(t=this._getSymbolForTextProxy(t)),this._consumable.has(t)||this._consumable.set(t,new Map),this._consumable.get(t).set(e,!0)}consume(t,e){return e=ys(e),t instanceof Ce&&(t=this._getSymbolForTextProxy(t)),!!this.test(t,e)&&(this._consumable.get(t).set(e,!1),!0)}test(t,e){e=ys(e),t instanceof Ce&&(t=this._getSymbolForTextProxy(t));const n=this._consumable.get(t);if(n===void 0)return null;const i=n.get(e);return i===void 0?null:i}revert(t,e){e=ys(e),t instanceof Ce&&(t=this._getSymbolForTextProxy(t));const n=this.test(t,e);return n===!1?(this._consumable.get(t).set(e,!0),!0):n!==!0&&null}verifyAllConsumed(t){const e=[];for(const[n,i]of this._consumable)for(const[r,s]of i){const a=r.split(":")[0];s&&t==a&&e.push({event:r,item:n.name||n.description})}if(e.length)throw new E("conversion-model-consumable-not-consumed",null,{items:e})}_getSymbolForTextProxy(t){let e=null;const n=this._textProxyRegistry.get(t.startOffset);if(n){const i=n.get(t.endOffset);i&&(e=i.get(t.parent))}return e||(e=this._addSymbolForTextProxy(t)),e}_addSymbolForTextProxy(t){const e=t.startOffset,n=t.endOffset,i=t.parent,r=Symbol("$textProxy:"+t.data);let s,a;return s=this._textProxyRegistry.get(e),s||(s=new Map,this._textProxyRegistry.set(e,s)),a=s.get(n),a||(a=new Map,s.set(n,a)),a.set(i,r),r}}function ys(o){const t=o.split(":");return t[0]=="insert"?t[0]:t[0]=="addMarker"||t[0]=="removeMarker"?o:t.length>1?t[0]+":"+t[1]:t[0]}class qm extends ut(){constructor(t){super(),this._conversionApi={dispatcher:this,...t},this._firedEventsMap=new WeakMap}convertChanges(t,e,n){const i=this._createConversionApi(n,t.getRefreshedItems());for(const s of t.getMarkersToRemove())this._convertMarkerRemove(s.name,s.range,i);const r=this._reduceChanges(t.getChanges());for(const s of r)s.type==="insert"?this._convertInsert(N._createFromPositionAndShift(s.position,s.length),i):s.type==="reinsert"?this._convertReinsert(N._createFromPositionAndShift(s.position,s.length),i):s.type==="remove"?this._convertRemove(s.position,s.length,s.name,i):this._convertAttribute(s.range,s.attributeKey,s.attributeOldValue,s.attributeNewValue,i);i.mapper.flushDeferredBindings();for(const s of i.mapper.flushUnboundMarkerNames()){const a=e.get(s).getRange();this._convertMarkerRemove(s,a,i),this._convertMarkerAdd(s,a,i)}for(const s of t.getMarkersToAdd())this._convertMarkerAdd(s.name,s.range,i);i.consumable.verifyAllConsumed("insert")}convert(t,e,n,i={}){const r=this._createConversionApi(n,void 0,i);this._convertInsert(t,r);for(const[s,a]of e)this._convertMarkerAdd(s,a,r);r.consumable.verifyAllConsumed("insert")}convertSelection(t,e,n){const i=this._createConversionApi(n);this.fire("cleanSelection",{selection:t},i);const r=t.getFirstPosition().root;if(!i.mapper.toViewElement(r))return;const s=Array.from(e.getMarkersAtPosition(t.getFirstPosition()));if(this._addConsumablesForSelection(i.consumable,t,s),this.fire("selection",{selection:t},i),t.isCollapsed){for(const a of s)if(i.consumable.test(t,"addMarker:"+a.name)){const c=a.getRange();if(!l_(t.getFirstPosition(),a,i.mapper))continue;const l={item:t,markerName:a.name,markerRange:c};this.fire(`addMarker:${a.name}`,l,i)}for(const a of t.getAttributeKeys())if(i.consumable.test(t,"attribute:"+a)){const c={item:t,range:t.getFirstRange(),attributeKey:a,attributeOldValue:null,attributeNewValue:t.getAttribute(a)};this.fire(`attribute:${a}:$text`,c,i)}}}_convertInsert(t,e,n={}){n.doNotAddConsumables||this._addConsumablesForInsert(e.consumable,t);for(const i of Array.from(t.getWalker({shallow:!0})).map(Gm))this._testAndFire("insert",i,e)}_convertRemove(t,e,n,i){this.fire(`remove:${n}`,{position:t,length:e},i)}_convertAttribute(t,e,n,i,r){this._addConsumablesForRange(r.consumable,t,`attribute:${e}`);for(const s of t){const a={item:s.item,range:N._createFromPositionAndShift(s.previousPosition,s.length),attributeKey:e,attributeOldValue:n,attributeNewValue:i};this._testAndFire(`attribute:${e}`,a,r)}}_convertReinsert(t,e){const n=Array.from(t.getWalker({shallow:!0}));this._addConsumablesForInsert(e.consumable,n);for(const i of n.map(Gm))this._testAndFire("insert",{...i,reconversion:!0},e)}_convertMarkerAdd(t,e,n){if(e.root.rootName=="$graveyard")return;const i=`addMarker:${t}`;if(n.consumable.add(e,i),this.fire(i,{markerName:t,markerRange:e},n),n.consumable.consume(e,i)){this._addConsumablesForRange(n.consumable,e,i);for(const r of e.getItems()){if(!n.consumable.test(r,i))continue;const s={item:r,range:N._createOn(r),markerName:t,markerRange:e};this.fire(i,s,n)}}}_convertMarkerRemove(t,e,n){e.root.rootName!="$graveyard"&&this.fire(`removeMarker:${t}`,{markerName:t,markerRange:e},n)}_reduceChanges(t){const e={changes:t};return this.fire("reduceChanges",e),e.changes}_addConsumablesForInsert(t,e){for(const n of e){const i=n.item;if(t.test(i,"insert")===null){t.add(i,"insert");for(const r of i.getAttributeKeys())t.add(i,"attribute:"+r)}}return t}_addConsumablesForRange(t,e,n){for(const i of e.getItems())t.add(i,n);return t}_addConsumablesForSelection(t,e,n){t.add(e,"selection");for(const i of n)t.add(e,"addMarker:"+i.name);for(const i of e.getAttributeKeys())t.add(e,"attribute:"+i);return t}_testAndFire(t,e,n){const i=function(c,l){const d=l.item.is("element")?l.item.name:"$text";return`${c}:${d}`}(t,e),r=e.item.is("$textProxy")?n.consumable._getSymbolForTextProxy(e.item):e.item,s=this._firedEventsMap.get(n),a=s.get(r);if(a){if(a.has(i))return;a.add(i)}else s.set(r,new Set([i]));this.fire(i,e,n)}_testAndFireAddAttributes(t,e){const n={item:t,range:N._createOn(t)};for(const i of n.item.getAttributeKeys())n.attributeKey=i,n.attributeOldValue=null,n.attributeNewValue=n.item.getAttribute(i),this._testAndFire(`attribute:${i}`,n,e)}_createConversionApi(t,e=new Set,n={}){const i={...this._conversionApi,consumable:new c_,writer:t,options:n,convertItem:r=>this._convertInsert(N._createOn(r),i),convertChildren:r=>this._convertInsert(N._createIn(r),i,{doNotAddConsumables:!0}),convertAttributes:r=>this._testAndFireAddAttributes(r,i),canReuseView:r=>!e.has(i.mapper.toModelElement(r))};return this._firedEventsMap.set(i,new Map),i}}function l_(o,t,e){const n=t.getRange(),i=Array.from(o.getAncestors());return i.shift(),i.reverse(),!i.some(r=>{if(n.containsItem(r))return!!e.toViewElement(r).getCustomProperty("addHighlight")})}function Gm(o){return{item:o.item,range:N._createFromPositionAndShift(o.previousPosition,o.length)}}class ie extends ut(Je){constructor(...t){super(),this._lastRangeBackward=!1,this._attrs=new Map,this._ranges=[],t.length&&this.setTo(...t)}get anchor(){if(this._ranges.length>0){const t=this._ranges[this._ranges.length-1];return this._lastRangeBackward?t.end:t.start}return null}get focus(){if(this._ranges.length>0){const t=this._ranges[this._ranges.length-1];return this._lastRangeBackward?t.start:t.end}return null}get isCollapsed(){return this._ranges.length===1&&this._ranges[0].isCollapsed}get rangeCount(){return this._ranges.length}get isBackward(){return!this.isCollapsed&&this._lastRangeBackward}isEqual(t){if(this.rangeCount!=t.rangeCount)return!1;if(this.rangeCount===0)return!0;if(!this.anchor.isEqual(t.anchor)||!this.focus.isEqual(t.focus))return!1;for(const e of this._ranges){let n=!1;for(const i of t._ranges)if(e.isEqual(i)){n=!0;break}if(!n)return!1}return!0}*getRanges(){for(const t of this._ranges)yield new N(t.start,t.end)}getFirstRange(){let t=null;for(const e of this._ranges)t&&!e.start.isBefore(t.start)||(t=e);return t?new N(t.start,t.end):null}getLastRange(){let t=null;for(const e of this._ranges)t&&!e.end.isAfter(t.end)||(t=e);return t?new N(t.start,t.end):null}getFirstPosition(){const t=this.getFirstRange();return t?t.start.clone():null}getLastPosition(){const t=this.getLastRange();return t?t.end.clone():null}setTo(...t){let[e,n,i]=t;if(typeof n=="object"&&(i=n,n=void 0),e===null)this._setRanges([]);else if(e instanceof ie)this._setRanges(e.getRanges(),e.isBackward);else if(e&&typeof e.getRanges=="function")this._setRanges(e.getRanges(),e.isBackward);else if(e instanceof N)this._setRanges([e],!!i&&!!i.backward);else if(e instanceof R)this._setRanges([new N(e)]);else if(e instanceof wn){const r=!!i&&!!i.backward;let s;if(n=="in")s=N._createIn(e);else if(n=="on")s=N._createOn(e);else{if(n===void 0)throw new E("model-selection-setto-required-second-parameter",[this,e]);s=new N(R._createAt(e,n))}this._setRanges([s],r)}else{if(!Jt(e))throw new E("model-selection-setto-not-selectable",[this,e]);this._setRanges(e,i&&!!i.backward)}}_setRanges(t,e=!1){const n=Array.from(t),i=n.some(r=>{if(!(r instanceof N))throw new E("model-selection-set-ranges-not-range",[this,t]);return this._ranges.every(s=>!s.isEqual(r))});(n.length!==this._ranges.length||i)&&(this._replaceAllRanges(n),this._lastRangeBackward=!!e,this.fire("change:range",{directChange:!0}))}setFocus(t,e){if(this.anchor===null)throw new E("model-selection-setfocus-no-ranges",[this,t]);const n=R._createAt(t,e);if(n.compareWith(this.focus)=="same")return;const i=this.anchor;this._ranges.length&&this._popRange(),n.compareWith(i)=="before"?(this._pushRange(new N(n,i)),this._lastRangeBackward=!0):(this._pushRange(new N(i,n)),this._lastRangeBackward=!1),this.fire("change:range",{directChange:!0})}getAttribute(t){return this._attrs.get(t)}getAttributes(){return this._attrs.entries()}getAttributeKeys(){return this._attrs.keys()}hasAttribute(t){return this._attrs.has(t)}removeAttribute(t){this.hasAttribute(t)&&(this._attrs.delete(t),this.fire("change:attribute",{attributeKeys:[t],directChange:!0}))}setAttribute(t,e){this.getAttribute(t)!==e&&(this._attrs.set(t,e),this.fire("change:attribute",{attributeKeys:[t],directChange:!0}))}getSelectedElement(){return this.rangeCount!==1?null:this.getFirstRange().getContainedElement()}*getSelectedBlocks(){const t=new WeakSet;for(const e of this.getRanges()){const n=Km(e.start,t);u_(n,e)&&(yield n);for(const r of e.getWalker()){const s=r.item;r.type=="elementEnd"&&d_(s,t,e)&&(yield s)}const i=Km(e.end,t);h_(i,e)&&(yield i)}}containsEntireContent(t=this.anchor.root){const e=R._createAt(t,0),n=R._createAt(t,"end");return e.isTouching(this.getFirstPosition())&&n.isTouching(this.getLastPosition())}_pushRange(t){this._checkRange(t),this._ranges.push(new N(t.start,t.end))}_checkRange(t){for(let e=0;e<this._ranges.length;e++)if(t.isIntersecting(this._ranges[e]))throw new E("model-selection-range-intersects",[this,t],{addedRange:t,intersectingRange:this._ranges[e]})}_replaceAllRanges(t){this._removeAllRanges();for(const e of t)this._pushRange(e)}_removeAllRanges(){for(;this._ranges.length>0;)this._popRange()}_popRange(){this._ranges.pop()}}function Wm(o,t){return!t.has(o)&&(t.add(o),o.root.document.model.schema.isBlock(o)&&!!o.parent)}function d_(o,t,e){return Wm(o,t)&&id(o,e)}function Km(o,t){const e=o.parent.root.document.model.schema,n=o.parent.getAncestors({parentFirst:!0,includeSelf:!0});let i=!1;const r=n.find(s=>!i&&(i=e.isLimit(s),!i&&Wm(s,t)));return n.forEach(s=>t.add(s)),r}function id(o,t){const e=function(n){const i=n.root.document.model.schema;let r=n.parent;for(;r;){if(i.isBlock(r))return r;r=r.parent}}(o);return e?!t.containsRange(N._createOn(e),!0):!0}function u_(o,t){return!!o&&(!(!t.isCollapsed&&!o.isEmpty)||!t.start.isTouching(R._createAt(o,o.maxOffset))&&id(o,t))}function h_(o,t){return!!o&&(!(!t.isCollapsed&&!o.isEmpty)||!t.end.isTouching(R._createAt(o,0))&&id(o,t))}ie.prototype.is=function(o){return o==="selection"||o==="model:selection"};class $t extends ut(N){constructor(t,e){super(t,e),m_.call(this)}detach(){this.stopListening()}toRange(){return new N(this.start,this.end)}static fromRange(t){return new $t(t.start,t.end)}}function m_(){this.listenTo(this.root.document.model,"applyOperation",(o,t)=>{const e=t[0];e.isDocumentOperation&&g_.call(this,e)},{priority:"low"})}function g_(o){const t=this.getTransformedByOperation(o),e=N._createFromRanges(t),n=!e.isEqual(this),i=function(s,a){switch(a.type){case"insert":return s.containsPosition(a.position);case"move":case"remove":case"reinsert":case"merge":return s.containsPosition(a.sourcePosition)||s.start.isEqual(a.sourcePosition)||s.containsPosition(a.targetPosition);case"split":return s.containsPosition(a.splitPosition)||s.containsPosition(a.insertionPosition)}return!1}(this,o);let r=null;if(n){e.root.rootName=="$graveyard"&&(r=o.type=="remove"?o.sourcePosition:o.deletionPosition);const s=this.toRange();this.start=e.start,this.end=e.end,this.fire("change:range",s,{deletionPosition:r})}else i&&this.fire("change:content",this.toRange(),{deletionPosition:r})}$t.prototype.is=function(o){return o==="liveRange"||o==="model:liveRange"||o=="range"||o==="model:range"};const xs="selection:";class ve extends ut(Je){constructor(t){super(),this._selection=new p_(t),this._selection.delegate("change:range").to(this),this._selection.delegate("change:attribute").to(this),this._selection.delegate("change:marker").to(this)}get isCollapsed(){return this._selection.isCollapsed}get anchor(){return this._selection.anchor}get focus(){return this._selection.focus}get rangeCount(){return this._selection.rangeCount}get hasOwnRange(){return this._selection.hasOwnRange}get isBackward(){return this._selection.isBackward}get isGravityOverridden(){return this._selection.isGravityOverridden}get markers(){return this._selection.markers}get _ranges(){return this._selection._ranges}getRanges(){return this._selection.getRanges()}getFirstPosition(){return this._selection.getFirstPosition()}getLastPosition(){return this._selection.getLastPosition()}getFirstRange(){return this._selection.getFirstRange()}getLastRange(){return this._selection.getLastRange()}getSelectedBlocks(){return this._selection.getSelectedBlocks()}getSelectedElement(){return this._selection.getSelectedElement()}containsEntireContent(t){return this._selection.containsEntireContent(t)}destroy(){this._selection.destroy()}getAttributeKeys(){return this._selection.getAttributeKeys()}getAttributes(){return this._selection.getAttributes()}getAttribute(t){return this._selection.getAttribute(t)}hasAttribute(t){return this._selection.hasAttribute(t)}refresh(){this._selection.updateMarkers(),this._selection._updateAttributes(!1)}observeMarkers(t){this._selection.observeMarkers(t)}_setFocus(t,e){this._selection.setFocus(t,e)}_setTo(...t){this._selection.setTo(...t)}_setAttribute(t,e){this._selection.setAttribute(t,e)}_removeAttribute(t){this._selection.removeAttribute(t)}_getStoredAttributes(){return this._selection.getStoredAttributes()}_overrideGravity(){return this._selection.overrideGravity()}_restoreGravity(t){this._selection.restoreGravity(t)}static _getStoreAttributeKey(t){return xs+t}static _isStoreAttributeKey(t){return t.startsWith(xs)}}ve.prototype.is=function(o){return o==="selection"||o=="model:selection"||o=="documentSelection"||o=="model:documentSelection"};class p_ extends ie{constructor(t){super(),this.markers=new fe({idProperty:"name"}),this._attributePriority=new Map,this._selectionRestorePosition=null,this._hasChangedRange=!1,this._overriddenGravityRegister=new Set,this._observedMarkers=new Set,this._model=t.model,this._document=t,this.listenTo(this._model,"applyOperation",(e,n)=>{const i=n[0];i.isDocumentOperation&&i.type!="marker"&&i.type!="rename"&&i.type!="noop"&&(this._ranges.length==0&&this._selectionRestorePosition&&this._fixGraveyardSelection(this._selectionRestorePosition),this._selectionRestorePosition=null,this._hasChangedRange&&(this._hasChangedRange=!1,this.fire("change:range",{directChange:!1})))},{priority:"lowest"}),this.on("change:range",()=>{this._validateSelectionRanges(this.getRanges())}),this.listenTo(this._model.markers,"update",(e,n,i,r)=>{this._updateMarker(n,r)}),this.listenTo(this._document,"change",(e,n)=>{(function(i,r){const s=i.document.differ;for(const a of s.getChanges()){if(a.type!="insert")continue;const c=a.position.parent;a.length===c.maxOffset&&i.enqueueChange(r,l=>{const d=Array.from(c.getAttributeKeys()).filter(u=>u.startsWith(xs));for(const u of d)l.removeAttribute(u,c)})}})(this._model,n)})}get isCollapsed(){return this._ranges.length===0?this._document._getDefaultRange().isCollapsed:super.isCollapsed}get anchor(){return super.anchor||this._document._getDefaultRange().start}get focus(){return super.focus||this._document._getDefaultRange().end}get rangeCount(){return this._ranges.length?this._ranges.length:1}get hasOwnRange(){return this._ranges.length>0}get isGravityOverridden(){return!!this._overriddenGravityRegister.size}destroy(){for(let t=0;t<this._ranges.length;t++)this._ranges[t].detach();this.stopListening()}*getRanges(){this._ranges.length?yield*super.getRanges():yield this._document._getDefaultRange()}getFirstRange(){return super.getFirstRange()||this._document._getDefaultRange()}getLastRange(){return super.getLastRange()||this._document._getDefaultRange()}setTo(...t){super.setTo(...t),this._updateAttributes(!0),this.updateMarkers()}setFocus(t,e){super.setFocus(t,e),this._updateAttributes(!0),this.updateMarkers()}setAttribute(t,e){if(this._setAttribute(t,e)){const n=[t];this.fire("change:attribute",{attributeKeys:n,directChange:!0})}}removeAttribute(t){if(this._removeAttribute(t)){const e=[t];this.fire("change:attribute",{attributeKeys:e,directChange:!0})}}overrideGravity(){const t=se();return this._overriddenGravityRegister.add(t),this._overriddenGravityRegister.size===1&&this._updateAttributes(!0),t}restoreGravity(t){if(!this._overriddenGravityRegister.has(t))throw new E("document-selection-gravity-wrong-restore",this,{uid:t});this._overriddenGravityRegister.delete(t),this.isGravityOverridden||this._updateAttributes(!0)}observeMarkers(t){this._observedMarkers.add(t),this.updateMarkers()}_replaceAllRanges(t){this._validateSelectionRanges(t),super._replaceAllRanges(t)}_popRange(){this._ranges.pop().detach()}_pushRange(t){const e=this._prepareRange(t);e&&this._ranges.push(e)}_validateSelectionRanges(t){for(const e of t)if(!this._document._validateSelectionRange(e))throw new E("document-selection-wrong-position",this,{range:e})}_prepareRange(t){if(this._checkRange(t),t.root==this._document.graveyard)return;const e=$t.fromRange(t);return e.on("change:range",(n,i,r)=>{if(this._hasChangedRange=!0,e.root==this._document.graveyard){this._selectionRestorePosition=r.deletionPosition;const s=this._ranges.indexOf(e);this._ranges.splice(s,1),e.detach()}}),e}updateMarkers(){if(!this._observedMarkers.size)return;const t=[];let e=!1;for(const i of this._model.markers){const r=i.name.split(":",1)[0];if(!this._observedMarkers.has(r))continue;const s=i.getRange();for(const a of this.getRanges())s.containsRange(a,!a.isCollapsed)&&t.push(i)}const n=Array.from(this.markers);for(const i of t)this.markers.has(i)||(this.markers.add(i),e=!0);for(const i of Array.from(this.markers))t.includes(i)||(this.markers.remove(i),e=!0);e&&this.fire("change:marker",{oldMarkers:n,directChange:!1})}_updateMarker(t,e){const n=t.name.split(":",1)[0];if(!this._observedMarkers.has(n))return;let i=!1;const r=Array.from(this.markers),s=this.markers.has(t);if(e){let a=!1;for(const c of this.getRanges())if(e.containsRange(c,!c.isCollapsed)){a=!0;break}a&&!s?(this.markers.add(t),i=!0):!a&&s&&(this.markers.remove(t),i=!0)}else s&&(this.markers.remove(t),i=!0);i&&this.fire("change:marker",{oldMarkers:r,directChange:!1})}_updateAttributes(t){const e=Ie(this._getSurroundingAttributes()),n=Ie(this.getAttributes());if(t)this._attributePriority=new Map,this._attrs=new Map;else for(const[r,s]of this._attributePriority)s=="low"&&(this._attrs.delete(r),this._attributePriority.delete(r));this._setAttributesTo(e);const i=[];for(const[r,s]of this.getAttributes())n.has(r)&&n.get(r)===s||i.push(r);for(const[r]of n)this.hasAttribute(r)||i.push(r);i.length>0&&this.fire("change:attribute",{attributeKeys:i,directChange:!1})}_setAttribute(t,e,n=!0){const i=n?"normal":"low";return i=="low"&&this._attributePriority.get(t)=="normal"?!1:super.getAttribute(t)!==e&&(this._attrs.set(t,e),this._attributePriority.set(t,i),!0)}_removeAttribute(t,e=!0){const n=e?"normal":"low";return(n!="low"||this._attributePriority.get(t)!="normal")&&(this._attributePriority.set(t,n),!!super.hasAttribute(t)&&(this._attrs.delete(t),!0))}_setAttributesTo(t){const e=new Set;for(const[n,i]of this.getAttributes())t.get(n)!==i&&this._removeAttribute(n,!1);for(const[n,i]of t)this._setAttribute(n,i,!1)&&e.add(n);return e}*getStoredAttributes(){const t=this.getFirstPosition().parent;if(this.isCollapsed&&t.isEmpty)for(const e of t.getAttributeKeys())e.startsWith(xs)&&(yield[e.substr(10),t.getAttribute(e)])}_getSurroundingAttributes(){const t=this.getFirstPosition(),e=this._model.schema;if(t.root.rootName=="$graveyard")return null;let n=null;if(this.isCollapsed){const i=t.textNode?t.textNode:t.nodeBefore,r=t.textNode?t.textNode:t.nodeAfter;if(this.isGravityOverridden||(n=Ti(i,e)),n||(n=Ti(r,e)),!this.isGravityOverridden&&!n){let s=i;for(;s&&!n;)s=s.previousSibling,n=Ti(s,e)}if(!n){let s=r;for(;s&&!n;)s=s.nextSibling,n=Ti(s,e)}n||(n=this.getStoredAttributes())}else{const i=this.getFirstRange();for(const r of i){if(r.item.is("element")&&e.isObject(r.item)){n=Ti(r.item,e);break}if(r.type=="text"){n=r.item.getAttributes();break}}}return n}_fixGraveyardSelection(t){const e=this._model.schema.getNearestSelectionRange(t);e&&this._pushRange(e)}}function Ti(o,t){if(!o)return null;if(o instanceof Ce||o instanceof kt)return o.getAttributes();if(!t.isInline(o))return null;if(!t.isObject(o))return[];const e=[];for(const[n,i]of o.getAttributes())t.checkAttribute("$text",n)&&t.getAttributeProperties(n).copyFromObject!==!1&&e.push([n,i]);return e}class $m{constructor(t){this._dispatchers=t}add(t){for(const e of this._dispatchers)t(e);return this}}class k_ extends $m{elementToElement(t){return this.add(function(e){const n=Zm(e.model),i=Ni(e.view,"container");return n.attributes.length&&(n.children=!0),r=>{r.on(`insert:${n.name}`,b_(i,eg(n)),{priority:e.converterPriority||"normal"}),(n.children||n.attributes.length)&&r.on("reduceChanges",tg(n),{priority:"low"})}}(t))}elementToStructure(t){return this.add(function(e){const n=Zm(e.model),i=Ni(e.view,"container");return n.children=!0,r=>{if(r._conversionApi.schema.checkChild(n.name,"$text"))throw new E("conversion-element-to-structure-disallowed-text",r,{elementName:n.name});var s,a;r.on(`insert:${n.name}`,(s=i,a=eg(n),(c,l,d)=>{if(!a(l.item,d.consumable,{preflight:!0}))return;const u=new Map;d.writer._registerSlotFactory(function(p,f,b){return(C,I)=>{const M=C.createContainerElement("$slot");let P=null;if(I==="children")P=Array.from(p.getChildren());else{if(typeof I!="function")throw new E("conversion-slot-mode-unknown",b.dispatcher,{modeOrFilter:I});P=Array.from(p.getChildren()).filter(K=>I(K))}return f.set(M,P),M}}(l.item,u,d));const h=s(l.item,d,l);if(d.writer._clearSlotFactory(),!h)return;(function(p,f,b){const C=Array.from(f.values()).flat(),I=new Set(C);if(I.size!=C.length)throw new E("conversion-slot-filter-overlap",b.dispatcher,{element:p});if(I.size!=p.childCount)throw new E("conversion-slot-filter-incomplete",b.dispatcher,{element:p})})(l.item,u,d),a(l.item,d.consumable);const m=d.mapper.toViewPosition(l.range.start);d.mapper.bindElements(l.item,h),d.writer.insert(m,h),d.convertAttributes(l.item),function(p,f,b,C){b.mapper.on("modelToViewPosition",P,{priority:"highest"});let I=null,M=null;for([I,M]of f)ng(p,M,b,C),b.writer.move(b.writer.createRangeIn(I),b.writer.createPositionBefore(I)),b.writer.remove(I);function P(K,tt){const nt=tt.modelPosition.nodeAfter,wt=M.indexOf(nt);wt<0||(tt.viewPosition=tt.mapper.findPositionIn(I,wt))}b.mapper.off("modelToViewPosition",P)}(h,u,d,{reconversion:l.reconversion})}),{priority:e.converterPriority||"normal"}),r.on("reduceChanges",tg(n),{priority:"low"})}}(t))}attributeToElement(t){return this.add(function(e){e=_e(e);let n=e.model;typeof n=="string"&&(n={key:n});let i=`attribute:${n.key}`;if(n.name&&(i+=":"+n.name),n.values)for(const s of n.values)e.view[s]=Ni(e.view[s],"attribute");else e.view=Ni(e.view,"attribute");const r=Jm(e);return s=>{s.on(i,f_(r),{priority:e.converterPriority||"normal"})}}(t))}attributeToAttribute(t){return this.add(function(e){e=_e(e);let n=e.model;typeof n=="string"&&(n={key:n});let i=`attribute:${n.key}`;if(n.name&&(i+=":"+n.name),n.values)for(const s of n.values)e.view[s]=Xm(e.view[s]);else e.view=Xm(e.view);const r=Jm(e);return s=>{var a;s.on(i,(a=r,(c,l,d)=>{if(!d.consumable.test(l.item,c.name))return;const u=a(l.attributeOldValue,d,l),h=a(l.attributeNewValue,d,l);if(!u&&!h)return;d.consumable.consume(l.item,c.name);const m=d.mapper.toViewElement(l.item),p=d.writer;if(!m)throw new E("conversion-attribute-to-attribute-on-text",d.dispatcher,l);if(l.attributeOldValue!==null&&u)if(u.key=="class"){const f=typeof u.value=="string"?u.value.split(/\s+/):u.value;for(const b of f)p.removeClass(b,m)}else if(u.key=="style")if(typeof u.value=="string"){const f=new Vl(p.document.stylesProcessor);f.setTo(u.value);for(const[b]of f.getStylesEntries())p.removeStyle(b,m)}else{const f=Object.keys(u.value);for(const b of f)p.removeStyle(b,m)}else p.removeAttribute(u.key,m);if(l.attributeNewValue!==null&&h)if(h.key=="class"){const f=typeof h.value=="string"?h.value.split(/\s+/):h.value;for(const b of f)p.addClass(b,m)}else if(h.key=="style")if(typeof h.value=="string"){const f=new Vl(p.document.stylesProcessor);f.setTo(h.value);for(const[b,C]of f.getStylesEntries())p.setStyle(b,C,m)}else{const f=Object.keys(h.value);for(const b of f)p.setStyle(b,h.value[b],m)}else p.setAttribute(h.key,h.value,m)}),{priority:e.converterPriority||"normal"})}}(t))}markerToElement(t){return this.add(function(e){const n=Ni(e.view,"ui");return i=>{i.on(`addMarker:${e.model}`,w_(n),{priority:e.converterPriority||"normal"}),i.on(`removeMarker:${e.model}`,(r,s,a)=>{const c=a.mapper.markerNameToElements(s.markerName);if(c){for(const l of c)a.mapper.unbindElementFromMarkerName(l,s.markerName),a.writer.clear(a.writer.createRangeOn(l),l);a.writer.clearClonedElementsGroup(s.markerName),r.stop()}},{priority:e.converterPriority||"normal"})}}(t))}markerToHighlight(t){return this.add(function(e){return n=>{var i;n.on(`addMarker:${e.model}`,(i=e.view,(r,s,a)=>{if(!s.item||!(s.item instanceof ie||s.item instanceof ve||s.item.is("$textProxy")))return;const c=od(i,s,a);if(!c||!a.consumable.consume(s.item,r.name))return;const l=a.writer,d=Ym(l,c),u=l.document.selection;if(s.item instanceof ie||s.item instanceof ve)l.wrap(u.getFirstRange(),d);else{const h=a.mapper.toViewRange(s.range),m=l.wrap(h,d);for(const p of m.getItems())if(p.is("attributeElement")&&p.isSimilar(d)){a.mapper.bindElementToMarker(p,s.markerName);break}}}),{priority:e.converterPriority||"normal"}),n.on(`addMarker:${e.model}`,function(r){return(s,a,c)=>{if(!a.item||!(a.item instanceof ht))return;const l=od(r,a,c);if(!l||!c.consumable.test(a.item,s.name))return;const d=c.mapper.toViewElement(a.item);if(d&&d.getCustomProperty("addHighlight")){c.consumable.consume(a.item,s.name);for(const u of N._createIn(a.item))c.consumable.consume(u.item,s.name);d.getCustomProperty("addHighlight")(d,l,c.writer),c.mapper.bindElementToMarker(d,a.markerName)}}}(e.view),{priority:e.converterPriority||"normal"}),n.on(`removeMarker:${e.model}`,function(r){return(s,a,c)=>{if(a.markerRange.isCollapsed)return;const l=od(r,a,c);if(!l)return;const d=Ym(c.writer,l),u=c.mapper.markerNameToElements(a.markerName);if(u){for(const h of u)c.mapper.unbindElementFromMarkerName(h,a.markerName),h.is("attributeElement")?c.writer.unwrap(c.writer.createRangeOn(h),d):h.getCustomProperty("removeHighlight")(h,l.id,c.writer);c.writer.clearClonedElementsGroup(a.markerName),s.stop()}}}(e.view),{priority:e.converterPriority||"normal"})}}(t))}markerToData(t){return this.add(function(e){e=_e(e);const n=e.model;let i=e.view;return i||(i=r=>({group:n,name:r.substr(e.model.length+1)})),r=>{var s;r.on(`addMarker:${n}`,(s=i,(a,c,l)=>{const d=s(c.markerName,l);if(!d)return;const u=c.markerRange;l.consumable.consume(u,a.name)&&(Qm(u,!1,l,c,d),Qm(u,!0,l,c,d),a.stop())}),{priority:e.converterPriority||"normal"}),r.on(`removeMarker:${n}`,function(a){return(c,l,d)=>{const u=a(l.markerName,d);if(!u)return;const h=d.mapper.markerNameToElements(l.markerName);if(h){for(const p of h)d.mapper.unbindElementFromMarkerName(p,l.markerName),p.is("containerElement")?(m(`data-${u.group}-start-before`,p),m(`data-${u.group}-start-after`,p),m(`data-${u.group}-end-before`,p),m(`data-${u.group}-end-after`,p)):d.writer.clear(d.writer.createRangeOn(p),p);d.writer.clearClonedElementsGroup(l.markerName),c.stop()}function m(p,f){if(f.hasAttribute(p)){const b=new Set(f.getAttribute(p).split(","));b.delete(u.name),b.size==0?d.writer.removeAttribute(p,f):d.writer.setAttribute(p,Array.from(b).join(","),f)}}}}(i),{priority:e.converterPriority||"normal"})}}(t))}}function Ym(o,t){const e=o.createAttributeElement("span",t.attributes);return t.classes&&e._addClass(t.classes),typeof t.priority=="number"&&(e._priority=t.priority),e._id=t.id,e}function f_(o){return(t,e,n)=>{if(!n.consumable.test(e.item,t.name))return;const i=o(e.attributeOldValue,n,e),r=o(e.attributeNewValue,n,e);if(!i&&!r)return;n.consumable.consume(e.item,t.name);const s=n.writer,a=s.document.selection;if(e.item instanceof ie||e.item instanceof ve)s.wrap(a.getFirstRange(),r);else{let c=n.mapper.toViewRange(e.range);e.attributeOldValue!==null&&i&&(c=s.unwrap(c,i)),e.attributeNewValue!==null&&r&&s.wrap(c,r)}}}function b_(o,t=__){return(e,n,i)=>{if(!t(n.item,i.consumable,{preflight:!0}))return;const r=o(n.item,i,n);if(!r)return;t(n.item,i.consumable);const s=i.mapper.toViewPosition(n.range.start);i.mapper.bindElements(n.item,r),i.writer.insert(s,r),i.convertAttributes(n.item),ng(r,n.item.getChildren(),i,{reconversion:n.reconversion})}}function w_(o){return(t,e,n)=>{e.isOpening=!0;const i=o(e,n);e.isOpening=!1;const r=o(e,n);if(!i||!r)return;const s=e.markerRange;if(s.isCollapsed&&!n.consumable.consume(s,t.name))return;for(const l of s)if(!n.consumable.consume(l.item,t.name))return;const a=n.mapper,c=n.writer;c.insert(a.toViewPosition(s.start),i),n.mapper.bindElementToMarker(i,e.markerName),s.isCollapsed||(c.insert(a.toViewPosition(s.end),r),n.mapper.bindElementToMarker(r,e.markerName)),t.stop()}}function Qm(o,t,e,n,i){const r=t?o.start:o.end,s=r.nodeAfter&&r.nodeAfter.is("element")?r.nodeAfter:null,a=r.nodeBefore&&r.nodeBefore.is("element")?r.nodeBefore:null;if(s||a){let c,l;t&&s||!t&&!a?(c=s,l=!0):(c=a,l=!1);const d=e.mapper.toViewElement(c);if(d)return void function(u,h,m,p,f,b){const C=`data-${b.group}-${h?"start":"end"}-${m?"before":"after"}`,I=u.hasAttribute(C)?u.getAttribute(C).split(","):[];I.unshift(b.name),p.writer.setAttribute(C,I.join(","),u),p.mapper.bindElementToMarker(u,f.markerName)}(d,t,l,e,n,i)}(function(c,l,d,u,h){const m=`${h.group}-${l?"start":"end"}`,p=h.name?{name:h.name}:null,f=d.writer.createUIElement(m,p);d.writer.insert(c,f),d.mapper.bindElementToMarker(f,u.markerName)})(e.mapper.toViewPosition(r),t,e,n,i)}function Zm(o){return typeof o=="string"&&(o={name:o}),{name:o.name,attributes:o.attributes?bt(o.attributes):[],children:!!o.children}}function Ni(o,t){return typeof o=="function"?o:(e,n)=>function(i,r,s){typeof i=="string"&&(i={name:i});let a;const c=r.writer,l=Object.assign({},i.attributes);if(s=="container")a=c.createContainerElement(i.name,l);else if(s=="attribute"){const d={priority:i.priority||Qe.DEFAULT_PRIORITY};a=c.createAttributeElement(i.name,l,d)}else a=c.createUIElement(i.name,l);if(i.styles){const d=Object.keys(i.styles);for(const u of d)c.setStyle(u,i.styles[u],a)}if(i.classes){const d=i.classes;if(typeof d=="string")c.addClass(d,a);else for(const u of d)c.addClass(u,a)}return a}(o,n,t)}function Jm(o){return o.model.values?(t,e,n)=>{const i=o.view[t];return i?i(t,e,n):null}:o.view}function Xm(o){return typeof o=="string"?t=>({key:o,value:t}):typeof o=="object"?o.value?()=>o:t=>({key:o.key,value:t}):o}function od(o,t,e){const n=typeof o=="function"?o(t,e):o;return n?(n.priority||(n.priority=10),n.id||(n.id=t.markerName),n):null}function tg(o){const t=function(e){return(n,i)=>{if(!n.is("element",e.name))return!1;if(i.type=="attribute"){if(e.attributes.includes(i.attributeKey))return!0}else if(e.children)return!0;return!1}}(o);return(e,n)=>{const i=[];n.reconvertedElements||(n.reconvertedElements=new Set);for(const r of n.changes){const s=r.type=="attribute"?r.range.start.nodeAfter:r.position.parent;if(s&&t(s,r)){if(!n.reconvertedElements.has(s)){n.reconvertedElements.add(s);const a=R._createBefore(s);let c=i.length;for(let l=i.length-1;l>=0;l--){const d=i[l],u=(d.type=="attribute"?d.range.start:d.position).compareWith(a);if(u=="before"||d.type=="remove"&&u=="same")break;c=l}i.splice(c,0,{type:"remove",name:s.name,position:a,length:1},{type:"reinsert",name:s.name,position:a,length:1})}}else i.push(r)}n.changes=i}}function eg(o){return(t,e,n={})=>{const i=["insert"];for(const r of o.attributes)t.hasAttribute(r)&&i.push(`attribute:${r}`);return!!i.every(r=>e.test(t,r))&&(n.preflight||i.forEach(r=>e.consume(t,r)),!0)}}function ng(o,t,e,n){for(const i of t)A_(o.root,i,e,n)||e.convertItem(i)}function A_(o,t,e,n){const{writer:i,mapper:r}=e;if(!n.reconversion)return!1;const s=r.toViewElement(t);return!(!s||s.root==o)&&!!e.canReuseView(s)&&(i.move(i.createRangeOn(s),r.toViewPosition(R._createBefore(t))),!0)}function __(o,t,{preflight:e}={}){return e?t.test(o,"insert"):t.consume(o,"insert")}function ig(o){const{schema:t,document:e}=o.model;for(const n of e.getRoots())if(n.isEmpty&&!t.checkChild(n,"$text")&&t.checkChild(n,"paragraph"))return o.insertElement("paragraph",n),!0;return!1}function og(o,t,e){const n=e.createContext(o);return!!e.checkChild(n,"paragraph")&&!!e.checkChild(n.push("paragraph"),t)}function rg(o,t){const e=t.createElement("paragraph");return t.insert(e,o),t.createPositionAt(e,0)}class C_ extends $m{elementToElement(t){return this.add(sg(t))}elementToAttribute(t){return this.add(function(e){e=_e(e),ag(e);const n=cg(e,!1),i=rd(e.view),r=i?`element:${i}`:"element";return s=>{s.on(r,n,{priority:e.converterPriority||"low"})}}(t))}attributeToAttribute(t){return this.add(function(e){e=_e(e);let n=null;(typeof e.view=="string"||e.view.key)&&(n=function(r){typeof r.view=="string"&&(r.view={key:r.view});const s=r.view.key,a=r.view.value===void 0?/[\s\S]*/:r.view.value;let c;return s=="class"||s=="style"?c={[s=="class"?"classes":"styles"]:a}:c={attributes:{[s]:a}},r.view.name&&(c.name=r.view.name),r.view=c,s}(e)),ag(e,n);const i=cg(e,!0);return r=>{r.on("element",i,{priority:e.converterPriority||"low"})}}(t))}elementToMarker(t){return this.add(function(e){const n=function(i){return(r,s)=>{const a=typeof i=="string"?i:i(r,s);return s.writer.createElement("$marker",{"data-name":a})}}(e.model);return sg({...e,model:n})}(t))}dataToMarker(t){return this.add(function(e){e=_e(e),e.model||(e.model=s=>s?e.view+":"+s:e.view);const n={view:e.view,model:e.model},i=sd(lg(n,"start")),r=sd(lg(n,"end"));return s=>{s.on(`element:${e.view}-start`,i,{priority:e.converterPriority||"normal"}),s.on(`element:${e.view}-end`,r,{priority:e.converterPriority||"normal"});const a=Ge.low,c=Ge.highest,l=Ge.get(e.converterPriority)/c;s.on("element",function(d){return(u,h,m)=>{const p=`data-${d.view}`;function f(b,C){for(const I of C){const M=d.model(I,m),P=m.writer.createElement("$marker",{"data-name":M});m.writer.insert(P,b),h.modelCursor.isEqual(b)?h.modelCursor=h.modelCursor.getShiftedBy(1):h.modelCursor=h.modelCursor._getTransformedByInsertion(b,1),h.modelRange=h.modelRange._getTransformedByInsertion(b,1)[0]}}(m.consumable.test(h.viewItem,{attributes:p+"-end-after"})||m.consumable.test(h.viewItem,{attributes:p+"-start-after"})||m.consumable.test(h.viewItem,{attributes:p+"-end-before"})||m.consumable.test(h.viewItem,{attributes:p+"-start-before"}))&&(h.modelRange||Object.assign(h,m.convertChildren(h.viewItem,h.modelCursor)),m.consumable.consume(h.viewItem,{attributes:p+"-end-after"})&&f(h.modelRange.end,h.viewItem.getAttribute(p+"-end-after").split(",")),m.consumable.consume(h.viewItem,{attributes:p+"-start-after"})&&f(h.modelRange.end,h.viewItem.getAttribute(p+"-start-after").split(",")),m.consumable.consume(h.viewItem,{attributes:p+"-end-before"})&&f(h.modelRange.start,h.viewItem.getAttribute(p+"-end-before").split(",")),m.consumable.consume(h.viewItem,{attributes:p+"-start-before"})&&f(h.modelRange.start,h.viewItem.getAttribute(p+"-start-before").split(",")))}}(n),{priority:a+l})}}(t))}}function sg(o){const t=sd(o=_e(o)),e=rd(o.view),n=e?`element:${e}`:"element";return i=>{i.on(n,t,{priority:o.converterPriority||"normal"})}}function rd(o){return typeof o=="string"?o:typeof o=="object"&&typeof o.name=="string"?o.name:null}function sd(o){const t=new Me(o.view);return(e,n,i)=>{const r=t.match(n.viewItem);if(!r)return;const s=r.match;if(s.name=!0,!i.consumable.test(n.viewItem,s))return;const a=function(c,l,d){return c instanceof Function?c(l,d):d.writer.createElement(c)}(o.model,n.viewItem,i);a&&i.safeInsert(a,n.modelCursor)&&(i.consumable.consume(n.viewItem,s),i.convertChildren(n.viewItem,a),i.updateConversionResult(a,n))}}function ag(o,t=null){const e=t===null||(r=>r.getAttribute(t)),n=typeof o.model!="object"?o.model:o.model.key,i=typeof o.model!="object"||o.model.value===void 0?e:o.model.value;o.model={key:n,value:i}}function cg(o,t){const e=new Me(o.view);return(n,i,r)=>{if(!i.modelRange&&t)return;const s=e.match(i.viewItem);if(!s||(function(d,u){const h=typeof d=="function"?d(u):d;return typeof h=="object"&&!rd(h)?!1:!h.classes&&!h.attributes&&!h.styles}(o.view,i.viewItem)?s.match.name=!0:delete s.match.name,!r.consumable.test(i.viewItem,s.match)))return;const a=o.model.key,c=typeof o.model.value=="function"?o.model.value(i.viewItem,r):o.model.value;if(c===null)return;i.modelRange||Object.assign(i,r.convertChildren(i.viewItem,i.modelCursor)),function(d,u,h,m){let p=!1;for(const f of Array.from(d.getItems({shallow:h})))m.schema.checkAttribute(f,u.key)&&(p=!0,f.hasAttribute(u.key)||m.writer.setAttribute(u.key,u.value,f));return p}(i.modelRange,{key:a,value:c},t,r)&&(r.consumable.test(i.viewItem,{name:!0})&&(s.match.name=!0),r.consumable.consume(i.viewItem,s.match))}}function lg(o,t){return{view:`${o.view}-${t}`,model:(e,n)=>{const i=e.getAttribute("name"),r=o.model(i,n);return n.writer.createElement("$marker",{"data-name":r})}}}function v_(o){o.document.registerPostFixer(t=>function(e,n){const i=n.document.selection,r=n.schema,s=[];let a=!1;for(const c of i.getRanges()){const l=dg(c,r);l&&!l.isEqual(c)?(s.push(l),a=!0):s.push(c)}return a&&e.setSelection(function(c){const l=[...c],d=new Set;let u=1;for(;u<l.length;){const h=l[u],m=l.slice(0,u);for(const[p,f]of m.entries())if(!d.has(p)){if(h.isEqual(f))d.add(p);else if(h.isIntersecting(f)){d.add(p),d.add(u);const b=h.getJoined(f);l.push(b)}}u++}return l.filter((h,m)=>!d.has(m))}(s),{backward:i.isBackward}),!1}(t,o))}function dg(o,t){return o.isCollapsed?function(e,n){const i=e.start,r=n.getNearestSelectionRange(i);if(!r){const a=i.getAncestors().reverse().find(c=>n.isObject(c));return a?N._createOn(a):null}if(!r.isCollapsed)return r;const s=r.start;return i.isEqual(s)?null:new N(s)}(o,t):function(e,n){const{start:i,end:r}=e,s=n.checkChild(i,"$text"),a=n.checkChild(r,"$text"),c=n.getLimitElement(i),l=n.getLimitElement(r);if(c===l){if(s&&a)return null;if(function(h,m,p){const f=h.nodeAfter&&!p.isLimit(h.nodeAfter)||p.checkChild(h,"$text"),b=m.nodeBefore&&!p.isLimit(m.nodeBefore)||p.checkChild(m,"$text");return f||b}(i,r,n)){const h=i.nodeAfter&&n.isSelectable(i.nodeAfter)?null:n.getNearestSelectionRange(i,"forward"),m=r.nodeBefore&&n.isSelectable(r.nodeBefore)?null:n.getNearestSelectionRange(r,"backward"),p=h?h.start:i,f=m?m.end:r;return new N(p,f)}}const d=c&&!c.is("rootElement"),u=l&&!l.is("rootElement");if(d||u){const h=i.nodeAfter&&r.nodeBefore&&i.nodeAfter.parent===r.nodeBefore.parent,m=d&&(!h||!hg(i.nodeAfter,n)),p=u&&(!h||!hg(r.nodeBefore,n));let f=i,b=r;return m&&(f=R._createBefore(ug(c,n))),p&&(b=R._createAfter(ug(l,n))),new N(f,b)}return null}(o,t)}function ug(o,t){let e=o,n=e;for(;t.isLimit(n)&&n.parent;)e=n,n=n.parent;return e}function hg(o,t){return o&&t.isSelectable(o)}class y_ extends gt(){constructor(t,e){super(),this.model=t,this.view=new a_(e),this.mapper=new Um,this.downcastDispatcher=new qm({mapper:this.mapper,schema:t.schema});const n=this.model.document,i=n.selection,r=this.model.markers;var s,a,c;this.listenTo(this.model,"_beforeChanges",()=>{this.view._disableRendering(!0)},{priority:"highest"}),this.listenTo(this.model,"_afterChanges",()=>{this.view._disableRendering(!1)},{priority:"lowest"}),this.listenTo(n,"change",()=>{this.view.change(l=>{this.downcastDispatcher.convertChanges(n.differ,r,l),this.downcastDispatcher.convertSelection(i,r,l)})},{priority:"low"}),this.listenTo(this.view.document,"selectionChange",function(l,d){return(u,h)=>{const m=h.newSelection,p=[];for(const b of m.getRanges())p.push(d.toModelRange(b));const f=l.createSelection(p,{backward:m.isBackward});f.isEqual(l.document.selection)||l.change(b=>{b.setSelection(f)})}}(this.model,this.mapper)),this.listenTo(this.view.document,"beforeinput",(s=this.mapper,a=this.model.schema,c=this.view,(l,d)=>{if(!c.document.isComposing||v.isAndroid)for(let u=0;u<d.targetRanges.length;u++){const h=d.targetRanges[u],m=s.toModelRange(h),p=dg(m,a);p&&!p.isEqual(m)&&(d.targetRanges[u]=s.toViewRange(p))}}),{priority:"high"}),this.downcastDispatcher.on("insert:$text",(l,d,u)=>{if(!u.consumable.consume(d.item,l.name))return;const h=u.writer,m=u.mapper.toViewPosition(d.range.start),p=h.createText(d.item.data);h.insert(m,p)},{priority:"lowest"}),this.downcastDispatcher.on("insert",(l,d,u)=>{u.convertAttributes(d.item),d.reconversion||!d.item.is("element")||d.item.isEmpty||u.convertChildren(d.item)},{priority:"lowest"}),this.downcastDispatcher.on("remove",(l,d,u)=>{const h=u.mapper.toViewPosition(d.position),m=d.position.getShiftedBy(d.length),p=u.mapper.toViewPosition(m,{isPhantom:!0}),f=u.writer.createRange(h,p),b=u.writer.remove(f.getTrimmed());for(const C of u.writer.createRangeIn(b).getItems())u.mapper.unbindViewElement(C,{defer:!0})},{priority:"low"}),this.downcastDispatcher.on("cleanSelection",(l,d,u)=>{const h=u.writer,m=h.document.selection;for(const p of m.getRanges())p.isCollapsed&&p.end.parent.isAttached()&&u.writer.mergeAttributes(p.start);h.setSelection(null)}),this.downcastDispatcher.on("selection",(l,d,u)=>{const h=d.selection;if(h.isCollapsed||!u.consumable.consume(h,"selection"))return;const m=[];for(const p of h.getRanges())m.push(u.mapper.toViewRange(p));u.writer.setSelection(m,{backward:h.isBackward})},{priority:"low"}),this.downcastDispatcher.on("selection",(l,d,u)=>{const h=d.selection;if(!h.isCollapsed||!u.consumable.consume(h,"selection"))return;const m=u.writer,p=h.getFirstPosition(),f=u.mapper.toViewPosition(p),b=m.breakAttributes(f);m.setSelection(b)},{priority:"low"}),this.view.document.roots.bindTo(this.model.document.roots).using(l=>{if(l.rootName=="$graveyard")return null;const d=new gm(this.view.document,l.name);return d.rootName=l.rootName,this.mapper.bindElements(l,d),d})}destroy(){this.view.destroy(),this.stopListening()}reconvertMarker(t){const e=typeof t=="string"?t:t.name,n=this.model.markers.get(e);if(!n)throw new E("editingcontroller-reconvertmarker-marker-not-exist",this,{markerName:e});this.model.change(()=>{this.model.markers._refresh(n)})}reconvertItem(t){this.model.change(()=>{this.model.document.differ._refreshItem(t)})}}class Pi{constructor(){this._consumables=new Map}add(t,e){let n;t.is("$text")||t.is("documentFragment")?this._consumables.set(t,!0):(this._consumables.has(t)?n=this._consumables.get(t):(n=new x_(t),this._consumables.set(t,n)),n.add(e))}test(t,e){const n=this._consumables.get(t);return n===void 0?null:t.is("$text")||t.is("documentFragment")?n:n.test(e)}consume(t,e){return!!this.test(t,e)&&(t.is("$text")||t.is("documentFragment")?this._consumables.set(t,!1):this._consumables.get(t).consume(e),!0)}revert(t,e){const n=this._consumables.get(t);n!==void 0&&(t.is("$text")||t.is("documentFragment")?this._consumables.set(t,!0):n.revert(e))}static consumablesFromElement(t){const e={element:t,name:!0,attributes:[],classes:[],styles:[]},n=t.getAttributeKeys();for(const s of n)s!="style"&&s!="class"&&e.attributes.push(s);const i=t.getClassNames();for(const s of i)e.classes.push(s);const r=t.getStyleNames();for(const s of r)e.styles.push(s);return e}static createFrom(t,e){if(e||(e=new Pi),t.is("$text"))return e.add(t),e;t.is("element")&&e.add(t,Pi.consumablesFromElement(t)),t.is("documentFragment")&&e.add(t);for(const n of t.getChildren())e=Pi.createFrom(n,e);return e}}const Es=["attributes","classes","styles"];class x_{constructor(t){this.element=t,this._canConsumeName=null,this._consumables={attributes:new Map,styles:new Map,classes:new Map}}add(t){t.name&&(this._canConsumeName=!0);for(const e of Es)e in t&&this._add(e,t[e])}test(t){if(t.name&&!this._canConsumeName)return this._canConsumeName;for(const e of Es)if(e in t){const n=this._test(e,t[e]);if(n!==!0)return n}return!0}consume(t){t.name&&(this._canConsumeName=!1);for(const e of Es)e in t&&this._consume(e,t[e])}revert(t){t.name&&(this._canConsumeName=!0);for(const e of Es)e in t&&this._revert(e,t[e])}_add(t,e){const n=bt(e),i=this._consumables[t];for(const r of n){if(t==="attributes"&&(r==="class"||r==="style"))throw new E("viewconsumable-invalid-attribute",this);if(i.set(r,!0),t==="styles")for(const s of this.element.document.stylesProcessor.getRelatedStyles(r))i.set(s,!0)}}_test(t,e){const n=bt(e),i=this._consumables[t];for(const r of n)if(t!=="attributes"||r!=="class"&&r!=="style"){const s=i.get(r);if(s===void 0)return null;if(!s)return!1}else{const s=r=="class"?"classes":"styles",a=this._test(s,[...this._consumables[s].keys()]);if(a!==!0)return a}return!0}_consume(t,e){const n=bt(e),i=this._consumables[t];for(const r of n)if(t!=="attributes"||r!=="class"&&r!=="style"){if(i.set(r,!1),t=="styles")for(const s of this.element.document.stylesProcessor.getRelatedStyles(r))i.set(s,!1)}else{const s=r=="class"?"classes":"styles";this._consume(s,[...this._consumables[s].keys()])}}_revert(t,e){const n=bt(e),i=this._consumables[t];for(const r of n)if(t!=="attributes"||r!=="class"&&r!=="style")i.get(r)===!1&&i.set(r,!0);else{const s=r=="class"?"classes":"styles";this._revert(s,[...this._consumables[s].keys()])}}}class E_ extends gt(){constructor(){super(),this._sourceDefinitions={},this._attributeProperties=Object.create(null),this._customChildChecks=new Map,this._customAttributeChecks=new Map,this._genericCheckSymbol=Symbol("$generic"),this.decorate("checkChild"),this.decorate("checkAttribute"),this.on("checkAttribute",(t,e)=>{e[0]=new Xe(e[0])},{priority:"highest"}),this.on("checkChild",(t,e)=>{e[0]=new Xe(e[0]),e[1]=this.getDefinition(e[1])},{priority:"highest"})}register(t,e){if(this._sourceDefinitions[t])throw new E("schema-cannot-register-item-twice",this,{itemName:t});this._sourceDefinitions[t]=[Object.assign({},e)],this._clearCache()}extend(t,e){if(!this._sourceDefinitions[t])throw new E("schema-cannot-extend-missing-item",this,{itemName:t});this._sourceDefinitions[t].push(Object.assign({},e)),this._clearCache()}getDefinitions(){return this._compiledDefinitions||this._compile(),this._compiledDefinitions}getDefinition(t){let e;return e=typeof t=="string"?t:"is"in t&&(t.is("$text")||t.is("$textProxy"))?"$text":t.name,this.getDefinitions()[e]}isRegistered(t){return!!this.getDefinition(t)}isBlock(t){const e=this.getDefinition(t);return!(!e||!e.isBlock)}isLimit(t){const e=this.getDefinition(t);return!!e&&!(!e.isLimit&&!e.isObject)}isObject(t){const e=this.getDefinition(t);return!!e&&!!(e.isObject||e.isLimit&&e.isSelectable&&e.isContent)}isInline(t){const e=this.getDefinition(t);return!(!e||!e.isInline)}isSelectable(t){const e=this.getDefinition(t);return!!e&&!(!e.isSelectable&&!e.isObject)}isContent(t){const e=this.getDefinition(t);return!!e&&!(!e.isContent&&!e.isObject)}checkChild(t,e){return!!e&&this._checkContextMatch(t,e)}checkAttribute(t,e){const n=this.getDefinition(t.last);if(!n)return!1;const i=this._evaluateAttributeChecks(t,e);return i!==void 0?i:n.allowAttributes.includes(e)}checkMerge(t,e){if(t instanceof R){const n=t.nodeBefore,i=t.nodeAfter;if(!(n instanceof ht))throw new E("schema-check-merge-no-element-before",this);if(!(i instanceof ht))throw new E("schema-check-merge-no-element-after",this);return this.checkMerge(n,i)}if(this.isLimit(t)||this.isLimit(e))return!1;for(const n of e.getChildren())if(!this.checkChild(t,n))return!1;return!0}addChildCheck(t,e){const n=e!==void 0?e:this._genericCheckSymbol,i=this._customChildChecks.get(n)||[];i.push(t),this._customChildChecks.set(n,i)}addAttributeCheck(t,e){const n=e!==void 0?e:this._genericCheckSymbol,i=this._customAttributeChecks.get(n)||[];i.push(t),this._customAttributeChecks.set(n,i)}setAttributeProperties(t,e){this._attributeProperties[t]=Object.assign(this.getAttributeProperties(t),e)}getAttributeProperties(t){return this._attributeProperties[t]||Object.create(null)}getLimitElement(t){let e;for(t instanceof R?e=t.parent:e=(t instanceof N?[t]:Array.from(t.getRanges())).reduce((n,i)=>{const r=i.getCommonAncestor();return n?n.getCommonAncestor(r,{includeSelf:!0}):r},null);!this.isLimit(e)&&e.parent;)e=e.parent;return e}checkAttributeInSelection(t,e){if(t.isCollapsed){const n=[...t.getFirstPosition().getAncestors(),new kt("",t.getAttributes())];return this.checkAttribute(n,e)}{const n=t.getRanges();for(const i of n)for(const r of i)if(this.checkAttribute(r.item,e))return!0}return!1}*getValidRanges(t,e){t=function*(n){for(const i of n)yield*i.getMinimalFlatRanges()}(t);for(const n of t)yield*this._getValidRangesForRange(n,e)}getNearestSelectionRange(t,e="both"){if(t.root.rootName=="$graveyard")return null;if(this.checkChild(t,"$text"))return new N(t);let n,i;const r=t.getAncestors().reverse().find(s=>this.isLimit(s))||t.root;e!="both"&&e!="backward"||(n=new Re({boundaries:N._createIn(r),startPosition:t,direction:"backward"})),e!="both"&&e!="forward"||(i=new Re({boundaries:N._createIn(r),startPosition:t}));for(const s of function*(a,c){let l=!1;for(;!l;){if(l=!0,a){const d=a.next();d.done||(l=!1,yield{walker:a,value:d.value})}if(c){const d=c.next();d.done||(l=!1,yield{walker:c,value:d.value})}}}(n,i)){const a=s.walker==n?"elementEnd":"elementStart",c=s.value;if(c.type==a&&this.isObject(c.item))return N._createOn(c.item);if(this.checkChild(c.nextPosition,"$text"))return new N(c.nextPosition)}return null}findAllowedParent(t,e){let n=t.parent;for(;n;){if(this.checkChild(n,e))return n;if(this.isLimit(n))return null;n=n.parent}return null}setAllowedAttributes(t,e,n){const i=n.model;for(const[r,s]of Object.entries(e))i.schema.checkAttribute(t,r)&&n.setAttribute(r,s,t)}removeDisallowedAttributes(t,e){for(const n of t)if(n.is("$text"))mg(this,n,e);else{const i=N._createIn(n).getPositions();for(const r of i)mg(this,r.nodeBefore||r.parent,e)}}getAttributesWithProperty(t,e,n){const i={};for(const[r,s]of t.getAttributes()){const a=this.getAttributeProperties(r);a[e]!==void 0&&(n!==void 0&&n!==a[e]||(i[r]=s))}return i}createContext(t){return new Xe(t)}_clearCache(){this._compiledDefinitions=null}_compile(){const t={},e=this._sourceDefinitions,n=Object.keys(e);for(const r of n)t[r]=D_(e[r],r);const i=Object.values(t);for(const r of i)I_(t,r),S_(t,r),M_(t,r),B_(t,r);for(const r of i)T_(t,r);for(const r of i)N_(t,r);for(const r of i)P_(t,r);for(const r of i)L_(t,r);for(const r of i)z_(t,r);this._compiledDefinitions=function(r){const s={};for(const a of Object.values(r))s[a.name]={name:a.name,isBlock:!!a.isBlock,isContent:!!a.isContent,isInline:!!a.isInline,isLimit:!!a.isLimit,isObject:!!a.isObject,isSelectable:!!a.isSelectable,allowIn:Array.from(a.allowIn).filter(c=>!!r[c]),allowChildren:Array.from(a.allowChildren).filter(c=>!!r[c]),allowAttributes:Array.from(a.allowAttributes)};return s}(t)}_checkContextMatch(t,e){const n=t.last;let i=this._evaluateChildChecks(t,e);if(i=i!==void 0?i:e.allowIn.includes(n.name),!i)return!1;const r=this.getDefinition(n),s=t.trimLast();return!!r&&(s.length==0||this._checkContextMatch(s,r))}_evaluateChildChecks(t,e){const n=this._customChildChecks.get(this._genericCheckSymbol)||[],i=this._customChildChecks.get(e.name)||[];for(const r of[...n,...i]){const s=r(t,e);if(s!==void 0)return s}}_evaluateAttributeChecks(t,e){const n=this._customAttributeChecks.get(this._genericCheckSymbol)||[],i=this._customAttributeChecks.get(e)||[];for(const r of[...n,...i]){const s=r(t,e);if(s!==void 0)return s}}*_getValidRangesForRange(t,e){let n=t.start,i=t.start;for(const r of t.getItems({shallow:!0}))r.is("element")&&(yield*this._getValidRangesForRange(N._createIn(r),e)),this.checkAttribute(r,e)||(n.isEqual(i)||(yield new N(n,i)),n=R._createAfter(r)),i=R._createAfter(r);n.isEqual(i)||(yield new N(n,i))}findOptimalInsertionRange(t,e){const n=t.getSelectedElement();if(n&&this.isObject(n)&&!this.isInline(n))return e=="before"||e=="after"?new N(R._createAt(n,e)):N._createOn(n);const i=Lt(t.getSelectedBlocks());if(!i)return new N(t.focus);if(i.isEmpty)return new N(R._createAt(i,0));const r=R._createAfter(i);return t.focus.isTouching(r)?new N(r):new N(R._createBefore(i))}}class Xe{constructor(t){if(t instanceof Xe)return t;let e;e=typeof t=="string"?[t]:Array.isArray(t)?t:t.getAncestors({includeSelf:!0}),this._items=e.map(O_)}get length(){return this._items.length}get last(){return this._items[this._items.length-1]}[Symbol.iterator](){return this._items[Symbol.iterator]()}push(t){const e=new Xe([t]);return e._items=[...this._items,...e._items],e}trimLast(){const t=new Xe([]);return t._items=this._items.slice(0,-1),t}getItem(t){return this._items[t]}*getNames(){yield*this._items.map(t=>t.name)}endsWith(t){return Array.from(this.getNames()).join(" ").endsWith(t)}startsWith(t){return Array.from(this.getNames()).join(" ").startsWith(t)}}function D_(o,t){const e={name:t,allowIn:new Set,allowChildren:new Set,disallowIn:new Set,disallowChildren:new Set,allowContentOf:new Set,allowWhere:new Set,allowAttributes:new Set,disallowAttributes:new Set,allowAttributesOf:new Set,inheritTypesFrom:new Set};return function(n,i){for(const r of n){const s=Object.keys(r).filter(a=>a.startsWith("is"));for(const a of s)i[a]=!!r[a]}}(o,e),Te(o,e,"allowIn"),Te(o,e,"allowChildren"),Te(o,e,"disallowIn"),Te(o,e,"disallowChildren"),Te(o,e,"allowContentOf"),Te(o,e,"allowWhere"),Te(o,e,"allowAttributes"),Te(o,e,"disallowAttributes"),Te(o,e,"allowAttributesOf"),Te(o,e,"inheritTypesFrom"),function(n,i){for(const r of n){const s=r.inheritAllFrom;s&&(i.allowContentOf.add(s),i.allowWhere.add(s),i.allowAttributesOf.add(s),i.inheritTypesFrom.add(s))}}(o,e),e}function I_(o,t){for(const e of t.allowIn){const n=o[e];n?n.allowChildren.add(t.name):t.allowIn.delete(e)}}function S_(o,t){for(const e of t.allowChildren){const n=o[e];n?n.allowIn.add(t.name):t.allowChildren.delete(e)}}function M_(o,t){for(const e of t.disallowIn){const n=o[e];n?n.disallowChildren.add(t.name):t.disallowIn.delete(e)}}function B_(o,t){for(const e of t.disallowChildren){const n=o[e];n?n.disallowIn.add(t.name):t.disallowChildren.delete(e)}}function T_(o,t){for(const e of t.disallowChildren)t.allowChildren.delete(e);for(const e of t.disallowIn)t.allowIn.delete(e);for(const e of t.disallowAttributes)t.allowAttributes.delete(e)}function N_(o,t){for(const e of t.allowContentOf){const n=o[e];n&&(n.disallowChildren.forEach(i=>{t.allowChildren.has(i)||(t.disallowChildren.add(i),o[i].disallowIn.add(t.name))}),n.allowChildren.forEach(i=>{t.disallowChildren.has(i)||(t.allowChildren.add(i),o[i].allowIn.add(t.name))}))}}function P_(o,t){for(const e of t.allowWhere){const n=o[e];n&&(n.disallowIn.forEach(i=>{t.allowIn.has(i)||(t.disallowIn.add(i),o[i].disallowChildren.add(t.name))}),n.allowIn.forEach(i=>{t.disallowIn.has(i)||(t.allowIn.add(i),o[i].allowChildren.add(t.name))}))}}function L_(o,t){for(const e of t.allowAttributesOf){const n=o[e];if(!n)return;n.allowAttributes.forEach(i=>{t.disallowAttributes.has(i)||t.allowAttributes.add(i)})}}function z_(o,t){for(const e of t.inheritTypesFrom){const n=o[e];if(n){const i=Object.keys(n).filter(r=>r.startsWith("is"));for(const r of i)r in t||(t[r]=n[r])}}}function Te(o,t,e){for(const n of o){let i=n[e];typeof i=="string"&&(i=[i]),Array.isArray(i)&&i.forEach(r=>t[e].add(r))}}function O_(o){return typeof o=="string"||o.is("documentFragment")?{name:typeof o=="string"?o:"$documentFragment",*getAttributeKeys(){},getAttribute(){}}:{name:o.is("element")?o.name:"$text",*getAttributeKeys(){yield*o.getAttributeKeys()},getAttribute:t=>o.getAttribute(t)}}function mg(o,t,e){for(const n of t.getAttributeKeys())o.checkAttribute(t,n)||e.removeAttribute(n,t)}class R_ extends ut(){constructor(t){super(),this._splitParts=new Map,this._cursorParents=new Map,this._modelCursor=null,this._emptyElementsToKeep=new Set,this.conversionApi={...t,consumable:null,writer:null,store:null,convertItem:(e,n)=>this._convertItem(e,n),convertChildren:(e,n)=>this._convertChildren(e,n),safeInsert:(e,n)=>this._safeInsert(e,n),updateConversionResult:(e,n)=>this._updateConversionResult(e,n),splitToAllowedParent:(e,n)=>this._splitToAllowedParent(e,n),getSplitParts:e=>this._getSplitParts(e),keepEmptyElement:e=>this._keepEmptyElement(e)}}convert(t,e,n=["$root"]){this.fire("viewCleanup",t),this._modelCursor=function(s,a){let c;for(const l of new Xe(s)){const d={};for(const h of l.getAttributeKeys())d[h]=l.getAttribute(h);const u=a.createElement(l.name,d);c&&a.insert(u,c),c=R._createAt(u,0)}return c}(n,e),this.conversionApi.writer=e,this.conversionApi.consumable=Pi.createFrom(t),this.conversionApi.store={};const{modelRange:i}=this._convertItem(t,this._modelCursor),r=e.createDocumentFragment();if(i){this._removeEmptyElements();for(const s of Array.from(this._modelCursor.parent.getChildren()))e.append(s,r);r.markers=function(s,a){const c=new Set,l=new Map,d=N._createIn(s).getItems();for(const u of d)u.is("element","$marker")&&c.add(u);for(const u of c){const h=u.getAttribute("data-name"),m=a.createPositionBefore(u);l.has(h)?l.get(h).end=m.clone():l.set(h,new N(m.clone())),a.remove(u)}return l}(r,e)}return this._modelCursor=null,this._splitParts.clear(),this._cursorParents.clear(),this._emptyElementsToKeep.clear(),this.conversionApi.writer=null,this.conversionApi.store=null,r}_convertItem(t,e){const n={viewItem:t,modelCursor:e,modelRange:null};if(t.is("element")?this.fire(`element:${t.name}`,n,this.conversionApi):t.is("$text")?this.fire("text",n,this.conversionApi):this.fire("documentFragment",n,this.conversionApi),n.modelRange&&!(n.modelRange instanceof N))throw new E("view-conversion-dispatcher-incorrect-result",this);return{modelRange:n.modelRange,modelCursor:n.modelCursor}}_convertChildren(t,e){let n=e.is("position")?e:R._createAt(e,0);const i=new N(n);for(const r of Array.from(t.getChildren())){const s=this._convertItem(r,n);s.modelRange instanceof N&&(i.end=s.modelRange.end,n=s.modelCursor)}return{modelRange:i,modelCursor:n}}_safeInsert(t,e){const n=this._splitToAllowedParent(t,e);return!!n&&(this.conversionApi.writer.insert(t,n.position),!0)}_updateConversionResult(t,e){const n=this._getSplitParts(t),i=this.conversionApi.writer;e.modelRange||(e.modelRange=i.createRange(i.createPositionBefore(t),i.createPositionAfter(n[n.length-1])));const r=this._cursorParents.get(t);e.modelCursor=r?i.createPositionAt(r,0):e.modelRange.end}_splitToAllowedParent(t,e){const{schema:n,writer:i}=this.conversionApi;let r=n.findAllowedParent(e,t);if(r){if(r===e.parent)return{position:e};this._modelCursor.parent.getAncestors().includes(r)&&(r=null)}if(!r)return og(e,t,n)?{position:rg(e,i)}:null;const s=this.conversionApi.writer.split(e,r),a=[];for(const l of s.range.getWalker())if(l.type=="elementEnd")a.push(l.item);else{const d=a.pop(),u=l.item;this._registerSplitPair(d,u)}const c=s.range.end.parent;return this._cursorParents.set(t,c),{position:s.position,cursorParent:c}}_registerSplitPair(t,e){this._splitParts.has(t)||this._splitParts.set(t,[t]);const n=this._splitParts.get(t);this._splitParts.set(e,n),n.push(e)}_getSplitParts(t){let e;return e=this._splitParts.has(t)?this._splitParts.get(t):[t],e}_keepEmptyElement(t){this._emptyElementsToKeep.add(t)}_removeEmptyElements(){let t=!1;for(const e of this._splitParts.keys())e.isEmpty&&!this._emptyElementsToKeep.has(e)&&(this.conversionApi.writer.remove(e),this._splitParts.delete(e),t=!0);t&&this._removeEmptyElements()}}class F_{getHtml(t){const e=A.document.implementation.createHTMLDocument("").createElement("div");return e.appendChild(t),e.innerHTML}}class j_{constructor(t){this.skipComments=!0,this.domParser=new DOMParser,this.domConverter=new ws(t,{renderingMode:"data"}),this.htmlWriter=new F_}toData(t){const e=this.domConverter.viewToDom(t);return this.htmlWriter.getHtml(e)}toView(t){const e=this._toDom(t);return this.domConverter.domToView(e,{skipComments:this.skipComments})}registerRawContentMatcher(t){this.domConverter.registerRawContentMatcher(t)}useFillerType(t){this.domConverter.blockFillerMode=t=="marked"?"markedNbsp":"nbsp"}_toDom(t){/<(?:html|body|head|meta)(?:\s[^>]*)?>/i.test(t.trim().slice(0,1e4))||(t=`<body>${t}</body>`);const e=this.domParser.parseFromString(t,"text/html"),n=e.createDocumentFragment(),i=e.body.childNodes;for(;i.length>0;)n.appendChild(i[0]);return n}}class V_ extends ut(){constructor(t,e){super(),this.model=t,this.mapper=new Um,this.downcastDispatcher=new qm({mapper:this.mapper,schema:t.schema}),this.downcastDispatcher.on("insert:$text",(n,i,r)=>{if(!r.consumable.consume(i.item,n.name))return;const s=r.writer,a=r.mapper.toViewPosition(i.range.start),c=s.createText(i.item.data);s.insert(a,c)},{priority:"lowest"}),this.downcastDispatcher.on("insert",(n,i,r)=>{r.convertAttributes(i.item),i.reconversion||!i.item.is("element")||i.item.isEmpty||r.convertChildren(i.item)},{priority:"lowest"}),this.upcastDispatcher=new R_({schema:t.schema}),this.viewDocument=new ps(e),this.stylesProcessor=e,this.htmlProcessor=new j_(this.viewDocument),this.processor=this.htmlProcessor,this._viewWriter=new km(this.viewDocument),this.upcastDispatcher.on("text",(n,i,{schema:r,consumable:s,writer:a})=>{let c=i.modelCursor;if(!s.test(i.viewItem))return;if(!r.checkChild(c,"$text")){if(!og(c,"$text",r)||i.viewItem.data.trim().length==0)return;c=rg(c,a)}s.consume(i.viewItem);const l=a.createText(i.viewItem.data);a.insert(l,c),i.modelRange=a.createRange(c,c.getShiftedBy(l.offsetSize)),i.modelCursor=i.modelRange.end},{priority:"lowest"}),this.upcastDispatcher.on("element",(n,i,r)=>{if(!i.modelRange&&r.consumable.consume(i.viewItem,{name:!0})){const{modelRange:s,modelCursor:a}=r.convertChildren(i.viewItem,i.modelCursor);i.modelRange=s,i.modelCursor=a}},{priority:"lowest"}),this.upcastDispatcher.on("documentFragment",(n,i,r)=>{if(!i.modelRange&&r.consumable.consume(i.viewItem,{name:!0})){const{modelRange:s,modelCursor:a}=r.convertChildren(i.viewItem,i.modelCursor);i.modelRange=s,i.modelCursor=a}},{priority:"lowest"}),gt().prototype.decorate.call(this,"init"),gt().prototype.decorate.call(this,"set"),gt().prototype.decorate.call(this,"get"),gt().prototype.decorate.call(this,"toView"),gt().prototype.decorate.call(this,"toModel"),this.on("init",()=>{this.fire("ready")},{priority:"lowest"}),this.on("ready",()=>{this.model.enqueueChange({isUndoable:!1},ig)},{priority:"lowest"})}get(t={}){const{rootName:e="main",trim:n="empty"}=t;if(!this._checkIfRootsExists([e]))throw new E("datacontroller-get-non-existent-root",this);const i=this.model.document.getRoot(e);return i.isAttached()||st("datacontroller-get-detached-root",this),n!=="empty"||this.model.hasContent(i,{ignoreWhitespaces:!0})?this.stringify(i,t):""}stringify(t,e={}){const n=this.toView(t,e);return this.processor.toData(n)}toView(t,e={}){const n=this.viewDocument,i=this._viewWriter;this.mapper.clearBindings();const r=N._createIn(t),s=new fn(n);this.mapper.bindElements(t,s);const a=t.is("documentFragment")?t.markers:function(c){const l=[],d=c.root.document;if(!d)return new Map;const u=N._createIn(c);for(const h of d.model.markers){const m=h.getRange(),p=m.isCollapsed,f=m.start.isEqual(u.start)||m.end.isEqual(u.end);if(p&&f)l.push([h.name,m]);else{const b=u.getIntersection(m);b&&l.push([h.name,b])}}return l.sort(([h,m],[p,f])=>{if(m.end.compareWith(f.start)!=="after")return 1;if(m.start.compareWith(f.end)!=="before")return-1;switch(m.start.compareWith(f.start)){case"before":return 1;case"after":return-1;default:switch(m.end.compareWith(f.end)){case"before":return 1;case"after":return-1;default:return p.localeCompare(h)}}}),new Map(l)}(t);return this.downcastDispatcher.convert(r,a,i,e),s}init(t){if(this.model.document.version)throw new E("datacontroller-init-document-not-empty",this);let e={};if(typeof t=="string"?e.main=t:e=t,!this._checkIfRootsExists(Object.keys(e)))throw new E("datacontroller-init-non-existent-root",this);return this.model.enqueueChange({isUndoable:!1},n=>{for(const i of Object.keys(e)){const r=this.model.document.getRoot(i);n.insert(this.parse(e[i],r),r,0)}}),Promise.resolve()}set(t,e={}){let n={};if(typeof t=="string"?n.main=t:n=t,!this._checkIfRootsExists(Object.keys(n)))throw new E("datacontroller-set-non-existent-root",this);this.model.enqueueChange(e.batchType||{},i=>{i.setSelection(null),i.removeSelectionAttribute(this.model.document.selection.getAttributeKeys());for(const r of Object.keys(n)){const s=this.model.document.getRoot(r);i.remove(i.createRangeIn(s)),i.insert(this.parse(n[r],s),s,0)}})}parse(t,e="$root"){const n=this.processor.toView(t);return this.toModel(n,e)}toModel(t,e="$root"){return this.model.change(n=>this.upcastDispatcher.convert(t,n,e))}addStyleProcessorRules(t){t(this.stylesProcessor)}registerRawContentMatcher(t){this.processor&&this.processor!==this.htmlProcessor&&this.processor.registerRawContentMatcher(t),this.htmlProcessor.registerRawContentMatcher(t)}destroy(){this.stopListening()}_checkIfRootsExists(t){for(const e of t)if(!this.model.document.getRoot(e))return!1;return!0}}class H_{constructor(t,e){this._helpers=new Map,this._downcast=bt(t),this._createConversionHelpers({name:"downcast",dispatchers:this._downcast,isDowncast:!0}),this._upcast=bt(e),this._createConversionHelpers({name:"upcast",dispatchers:this._upcast,isDowncast:!1})}addAlias(t,e){const n=this._downcast.includes(e);if(!this._upcast.includes(e)&&!n)throw new E("conversion-add-alias-dispatcher-not-registered",this);this._createConversionHelpers({name:t,dispatchers:[e],isDowncast:n})}for(t){if(!this._helpers.has(t))throw new E("conversion-for-unknown-group",this);return this._helpers.get(t)}elementToElement(t){this.for("downcast").elementToElement(t);for(const{model:e,view:n}of ad(t))this.for("upcast").elementToElement({model:e,view:n,converterPriority:t.converterPriority})}attributeToElement(t){this.for("downcast").attributeToElement(t);for(const{model:e,view:n}of ad(t))this.for("upcast").elementToAttribute({view:n,model:e,converterPriority:t.converterPriority})}attributeToAttribute(t){this.for("downcast").attributeToAttribute(t);for(const{model:e,view:n}of ad(t))this.for("upcast").attributeToAttribute({view:n,model:e})}_createConversionHelpers({name:t,dispatchers:e,isDowncast:n}){if(this._helpers.has(t))throw new E("conversion-group-exists",this);const i=n?new k_(e):new C_(e);this._helpers.set(t,i)}}function*ad(o){if(o.model.values)for(const t of o.model.values){const e={key:o.model.key,value:t},n=o.view[t],i=o.upcastAlso?o.upcastAlso[t]:void 0;yield*gg(e,n,i)}else yield*gg(o.model,o.view,o.upcastAlso)}function*gg(o,t,e){if(yield{model:o,view:t},e)for(const n of bt(e))yield{model:o,view:n}}class oe{constructor(t){this.baseVersion=t,this.isDocumentOperation=this.baseVersion!==null,this.batch=null}_validate(){}toJSON(){const t=Object.assign({},this);return t.__className=this.constructor.className,delete t.batch,delete t.isDocumentOperation,t}static get className(){return"Operation"}static fromJSON(t,e){return new this(t.baseVersion)}}function cd(o,t){const e=kg(t),n=e.reduce((s,a)=>s+a.offsetSize,0),i=o.parent;Oi(o);const r=o.index;return i._insertChild(r,e),zi(i,r+e.length),zi(i,r),new N(o,o.getShiftedBy(n))}function pg(o){if(!o.isFlat)throw new E("operation-utils-remove-range-not-flat",this);const t=o.start.parent;Oi(o.start),Oi(o.end);const e=t._removeChildren(o.start.index,o.end.index-o.start.index);return zi(t,o.start.index),e}function Li(o,t){if(!o.isFlat)throw new E("operation-utils-move-range-not-flat",this);const e=pg(o);return cd(t=t._getTransformedByDeletion(o.start,o.end.offset-o.start.offset),e)}function kg(o){const t=[];(function e(n){if(typeof n=="string")t.push(new kt(n));else if(n instanceof Ce)t.push(new kt(n.data,n.getAttributes()));else if(n instanceof wn)t.push(n);else if(Jt(n))for(const i of n)e(i)})(o);for(let e=1;e<t.length;e++){const n=t[e],i=t[e-1];n instanceof kt&&i instanceof kt&&fg(n,i)&&(t.splice(e-1,2,new kt(i.data+n.data,i.getAttributes())),e--)}return t}function zi(o,t){const e=o.getChild(t-1),n=o.getChild(t);if(e&&n&&e.is("$text")&&n.is("$text")&&fg(e,n)){const i=new kt(e.data+n.data,e.getAttributes());o._removeChildren(t-1,2),o._insertChild(t-1,i)}}function Oi(o){const t=o.textNode,e=o.parent;if(t){const n=o.offset-t.startOffset,i=t.index;e._removeChildren(i,1);const r=new kt(t.data.substr(0,n),t.getAttributes()),s=new kt(t.data.substr(n),t.getAttributes());e._insertChild(i,[r,s])}}function fg(o,t){const e=o.getAttributes(),n=t.getAttributes();for(const i of e){if(i[1]!==t.getAttribute(i[0]))return!1;n.next()}return n.next().done}class dt extends oe{constructor(t,e,n,i){super(i),this.sourcePosition=t.clone(),this.sourcePosition.stickiness="toNext",this.howMany=e,this.targetPosition=n.clone(),this.targetPosition.stickiness="toNone"}get type(){return this.targetPosition.root.rootName=="$graveyard"?"remove":this.sourcePosition.root.rootName=="$graveyard"?"reinsert":"move"}get affectedSelectable(){return[N._createFromPositionAndShift(this.sourcePosition,this.howMany),N._createFromPositionAndShift(this.targetPosition,0)]}clone(){return new dt(this.sourcePosition,this.howMany,this.targetPosition,this.baseVersion)}getMovedRangeStart(){return this.targetPosition._getTransformedByDeletion(this.sourcePosition,this.howMany)}getReversed(){const t=this.sourcePosition._getTransformedByInsertion(this.targetPosition,this.howMany);return new dt(this.getMovedRangeStart(),this.howMany,t,this.baseVersion+1)}_validate(){const t=this.sourcePosition.parent,e=this.targetPosition.parent,n=this.sourcePosition.offset,i=this.targetPosition.offset;if(n+this.howMany>t.maxOffset)throw new E("move-operation-nodes-do-not-exist",this);if(t===e&&n<i&&i<n+this.howMany)throw new E("move-operation-range-into-itself",this);if(this.sourcePosition.root==this.targetPosition.root&&Gt(this.sourcePosition.getParentPath(),this.targetPosition.getParentPath())=="prefix"){const r=this.sourcePosition.path.length-1;if(this.targetPosition.path[r]>=n&&this.targetPosition.path[r]<n+this.howMany)throw new E("move-operation-node-into-itself",this)}}_execute(){Li(N._createFromPositionAndShift(this.sourcePosition,this.howMany),this.targetPosition)}toJSON(){const t=super.toJSON();return t.sourcePosition=this.sourcePosition.toJSON(),t.targetPosition=this.targetPosition.toJSON(),t}static get className(){return"MoveOperation"}static fromJSON(t,e){const n=R.fromJSON(t.sourcePosition,e),i=R.fromJSON(t.targetPosition,e);return new this(n,t.howMany,i,t.baseVersion)}}class zt extends oe{constructor(t,e,n){super(n),this.position=t.clone(),this.position.stickiness="toNone",this.nodes=new Mi(kg(e)),this.shouldReceiveAttributes=!1}get type(){return"insert"}get howMany(){return this.nodes.maxOffset}get affectedSelectable(){return this.position.clone()}clone(){const t=new Mi([...this.nodes].map(n=>n._clone(!0))),e=new zt(this.position,t,this.baseVersion);return e.shouldReceiveAttributes=this.shouldReceiveAttributes,e}getReversed(){const t=this.position.root.document.graveyard,e=new R(t,[0]);return new dt(this.position,this.nodes.maxOffset,e,this.baseVersion+1)}_validate(){const t=this.position.parent;if(!t||t.maxOffset<this.position.offset)throw new E("insert-operation-position-invalid",this)}_execute(){const t=this.nodes;this.nodes=new Mi([...t].map(e=>e._clone(!0))),cd(this.position,t)}toJSON(){const t=super.toJSON();return t.position=this.position.toJSON(),t.nodes=this.nodes.toJSON(),t}static get className(){return"InsertOperation"}static fromJSON(t,e){const n=[];for(const r of t.nodes)r.name?n.push(ht.fromJSON(r)):n.push(kt.fromJSON(r));const i=new zt(R.fromJSON(t.position,e),n,t.baseVersion);return i.shouldReceiveAttributes=t.shouldReceiveAttributes,i}}class ft extends oe{constructor(t,e,n,i,r){super(r),this.splitPosition=t.clone(),this.splitPosition.stickiness="toNext",this.howMany=e,this.insertionPosition=n,this.graveyardPosition=i?i.clone():null,this.graveyardPosition&&(this.graveyardPosition.stickiness="toNext")}get type(){return"split"}get moveTargetPosition(){const t=this.insertionPosition.path.slice();return t.push(0),new R(this.insertionPosition.root,t)}get movedRange(){const t=this.splitPosition.getShiftedBy(Number.POSITIVE_INFINITY);return new N(this.splitPosition,t)}get affectedSelectable(){const t=[N._createFromPositionAndShift(this.splitPosition,0),N._createFromPositionAndShift(this.insertionPosition,0)];return this.graveyardPosition&&t.push(N._createFromPositionAndShift(this.graveyardPosition,0)),t}clone(){return new ft(this.splitPosition,this.howMany,this.insertionPosition,this.graveyardPosition,this.baseVersion)}getReversed(){const t=this.splitPosition.root.document.graveyard,e=new R(t,[0]);return new Dt(this.moveTargetPosition,this.howMany,this.splitPosition,e,this.baseVersion+1)}_validate(){const t=this.splitPosition.parent,e=this.splitPosition.offset;if(!t||t.maxOffset<e)throw new E("split-operation-position-invalid",this);if(!t.parent)throw new E("split-operation-split-in-root",this);if(this.howMany!=t.maxOffset-this.splitPosition.offset)throw new E("split-operation-how-many-invalid",this);if(this.graveyardPosition&&!this.graveyardPosition.nodeAfter)throw new E("split-operation-graveyard-position-invalid",this)}_execute(){const t=this.splitPosition.parent;if(this.graveyardPosition)Li(N._createFromPositionAndShift(this.graveyardPosition,1),this.insertionPosition);else{const e=t._clone();cd(this.insertionPosition,e)}Li(new N(R._createAt(t,this.splitPosition.offset),R._createAt(t,t.maxOffset)),this.moveTargetPosition)}toJSON(){const t=super.toJSON();return t.splitPosition=this.splitPosition.toJSON(),t.insertionPosition=this.insertionPosition.toJSON(),this.graveyardPosition&&(t.graveyardPosition=this.graveyardPosition.toJSON()),t}static get className(){return"SplitOperation"}static getInsertionPosition(t){const e=t.path.slice(0,-1);return e[e.length-1]++,new R(t.root,e,"toPrevious")}static fromJSON(t,e){const n=R.fromJSON(t.splitPosition,e),i=R.fromJSON(t.insertionPosition,e),r=t.graveyardPosition?R.fromJSON(t.graveyardPosition,e):null;return new this(n,t.howMany,i,r,t.baseVersion)}}class Dt extends oe{constructor(t,e,n,i,r){super(r),this.sourcePosition=t.clone(),this.sourcePosition.stickiness="toPrevious",this.howMany=e,this.targetPosition=n.clone(),this.targetPosition.stickiness="toNext",this.graveyardPosition=i.clone()}get type(){return"merge"}get deletionPosition(){return new R(this.sourcePosition.root,this.sourcePosition.path.slice(0,-1))}get movedRange(){const t=this.sourcePosition.getShiftedBy(Number.POSITIVE_INFINITY);return new N(this.sourcePosition,t)}get affectedSelectable(){const t=this.sourcePosition.parent;return[N._createOn(t),N._createFromPositionAndShift(this.targetPosition,0),N._createFromPositionAndShift(this.graveyardPosition,0)]}clone(){return new Dt(this.sourcePosition,this.howMany,this.targetPosition,this.graveyardPosition,this.baseVersion)}getReversed(){const t=this.targetPosition._getTransformedByMergeOperation(this),e=this.sourcePosition.path.slice(0,-1),n=new R(this.sourcePosition.root,e)._getTransformedByMergeOperation(this);return new ft(t,this.howMany,n,this.graveyardPosition,this.baseVersion+1)}_validate(){const t=this.sourcePosition.parent,e=this.targetPosition.parent;if(!t.parent)throw new E("merge-operation-source-position-invalid",this);if(!e.parent)throw new E("merge-operation-target-position-invalid",this);if(this.howMany!=t.maxOffset)throw new E("merge-operation-how-many-invalid",this)}_execute(){const t=this.sourcePosition.parent;Li(N._createIn(t),this.targetPosition),Li(N._createOn(t),this.graveyardPosition)}toJSON(){const t=super.toJSON();return t.sourcePosition=t.sourcePosition.toJSON(),t.targetPosition=t.targetPosition.toJSON(),t.graveyardPosition=t.graveyardPosition.toJSON(),t}static get className(){return"MergeOperation"}static fromJSON(t,e){const n=R.fromJSON(t.sourcePosition,e),i=R.fromJSON(t.targetPosition,e),r=R.fromJSON(t.graveyardPosition,e);return new this(n,t.howMany,i,r,t.baseVersion)}}class Wt extends oe{constructor(t,e,n,i,r,s){super(s),this.name=t,this.oldRange=e?e.clone():null,this.newRange=n?n.clone():null,this.affectsData=r,this._markers=i}get type(){return"marker"}get affectedSelectable(){const t=[];return this.oldRange&&t.push(this.oldRange.clone()),this.newRange&&(this.oldRange?t.push(...this.newRange.getDifference(this.oldRange)):t.push(this.newRange.clone())),t}clone(){return new Wt(this.name,this.oldRange,this.newRange,this._markers,this.affectsData,this.baseVersion)}getReversed(){return new Wt(this.name,this.newRange,this.oldRange,this._markers,this.affectsData,this.baseVersion+1)}_execute(){this.newRange?this._markers._set(this.name,this.newRange,!0,this.affectsData):this._markers._remove(this.name)}toJSON(){const t=super.toJSON();return this.oldRange&&(t.oldRange=this.oldRange.toJSON()),this.newRange&&(t.newRange=this.newRange.toJSON()),delete t._markers,t}static get className(){return"MarkerOperation"}static fromJSON(t,e){return new Wt(t.name,t.oldRange?N.fromJSON(t.oldRange,e):null,t.newRange?N.fromJSON(t.newRange,e):null,e.model.markers,t.affectsData,t.baseVersion)}}const bg=function(o,t){return Cs(o,t)};class Mt extends oe{constructor(t,e,n,i,r){super(r),this.range=t.clone(),this.key=e,this.oldValue=n===void 0?null:n,this.newValue=i===void 0?null:i}get type(){return this.oldValue===null?"addAttribute":this.newValue===null?"removeAttribute":"changeAttribute"}get affectedSelectable(){return this.range.clone()}clone(){return new Mt(this.range,this.key,this.oldValue,this.newValue,this.baseVersion)}getReversed(){return new Mt(this.range,this.key,this.newValue,this.oldValue,this.baseVersion+1)}toJSON(){const t=super.toJSON();return t.range=this.range.toJSON(),t}_validate(){if(!this.range.isFlat)throw new E("attribute-operation-range-not-flat",this);for(const t of this.range.getItems({shallow:!0})){if(this.oldValue!==null&&!bg(t.getAttribute(this.key),this.oldValue))throw new E("attribute-operation-wrong-old-value",this,{item:t,key:this.key,value:this.oldValue});if(this.oldValue===null&&this.newValue!==null&&t.hasAttribute(this.key))throw new E("attribute-operation-attribute-exists",this,{node:t,key:this.key})}}_execute(){bg(this.oldValue,this.newValue)||function(t,e,n){Oi(t.start),Oi(t.end);for(const i of t.getItems({shallow:!0})){const r=i.is("$textProxy")?i.textNode:i;n!==null?r._setAttribute(e,n):r._removeAttribute(e),zi(r.parent,r.index)}zi(t.end.parent,t.end.index)}(this.range,this.key,this.newValue)}static get className(){return"AttributeOperation"}static fromJSON(t,e){return new Mt(N.fromJSON(t.range,e),t.key,t.oldValue,t.newValue,t.baseVersion)}}class Tt extends oe{get type(){return"noop"}get affectedSelectable(){return null}clone(){return new Tt(this.baseVersion)}getReversed(){return new Tt(this.baseVersion+1)}_execute(){}static get className(){return"NoOperation"}}class Yt extends oe{constructor(t,e,n,i){super(i),this.position=t,this.position.stickiness="toNext",this.oldName=e,this.newName=n}get type(){return"rename"}get affectedSelectable(){return this.position.nodeAfter}clone(){return new Yt(this.position.clone(),this.oldName,this.newName,this.baseVersion)}getReversed(){return new Yt(this.position.clone(),this.newName,this.oldName,this.baseVersion+1)}_validate(){const t=this.position.nodeAfter;if(!(t instanceof ht))throw new E("rename-operation-wrong-position",this);if(t.name!==this.oldName)throw new E("rename-operation-wrong-name",this)}_execute(){this.position.nodeAfter.name=this.newName}toJSON(){const t=super.toJSON();return t.position=this.position.toJSON(),t}static get className(){return"RenameOperation"}static fromJSON(t,e){return new Yt(R.fromJSON(t.position,e),t.oldName,t.newName,t.baseVersion)}}class Fe extends oe{constructor(t,e,n,i,r){super(r),this.root=t,this.key=e,this.oldValue=n===void 0?null:n,this.newValue=i===void 0?null:i}get type(){return this.oldValue===null?"addRootAttribute":this.newValue===null?"removeRootAttribute":"changeRootAttribute"}get affectedSelectable(){return this.root}clone(){return new Fe(this.root,this.key,this.oldValue,this.newValue,this.baseVersion)}getReversed(){return new Fe(this.root,this.key,this.newValue,this.oldValue,this.baseVersion+1)}_validate(){if(this.root!=this.root.root||this.root.is("documentFragment"))throw new E("rootattribute-operation-not-a-root",this,{root:this.root,key:this.key});if(this.oldValue!==null&&this.root.getAttribute(this.key)!==this.oldValue)throw new E("rootattribute-operation-wrong-old-value",this,{root:this.root,key:this.key});if(this.oldValue===null&&this.newValue!==null&&this.root.hasAttribute(this.key))throw new E("rootattribute-operation-attribute-exists",this,{root:this.root,key:this.key})}_execute(){this.newValue!==null?this.root._setAttribute(this.key,this.newValue):this.root._removeAttribute(this.key)}toJSON(){const t=super.toJSON();return t.root=this.root.toJSON(),t}static get className(){return"RootAttributeOperation"}static fromJSON(t,e){if(!e.getRoot(t.root))throw new E("rootattribute-operation-fromjson-no-root",this,{rootName:t.root});return new Fe(e.getRoot(t.root),t.key,t.oldValue,t.newValue,t.baseVersion)}}class Ne extends oe{constructor(t,e,n,i,r){super(r),this.rootName=t,this.elementName=e,this.isAdd=n,this._document=i,!this._document.getRoot(this.rootName)&&(this._document.createRoot(this.elementName,this.rootName)._isAttached=!1)}get type(){return this.isAdd?"addRoot":"detachRoot"}get affectedSelectable(){return this._document.getRoot(this.rootName)}clone(){return new Ne(this.rootName,this.elementName,this.isAdd,this._document,this.baseVersion)}getReversed(){return new Ne(this.rootName,this.elementName,!this.isAdd,this._document,this.baseVersion+1)}_execute(){this._document.getRoot(this.rootName)._isAttached=this.isAdd}toJSON(){const t=super.toJSON();return delete t._document,t}static get className(){return"RootOperation"}static fromJSON(t,e){return new Ne(t.rootName,t.elementName,t.isAdd,e,t.baseVersion)}}const de={};de[Mt.className]=Mt,de[zt.className]=zt,de[Wt.className]=Wt,de[dt.className]=dt,de[Tt.className]=Tt,de[oe.className]=oe,de[Yt.className]=Yt,de[Fe.className]=Fe,de[Ne.className]=Ne,de[ft.className]=ft,de[Dt.className]=Dt;class U_{static fromJSON(t,e){return de[t.__className].fromJSON(t,e)}}const ld=new Map;function lt(o,t,e){let n=ld.get(o);n||(n=new Map,ld.set(o,n)),n.set(t,e)}function q_(o){return[o]}function wg(o,t,e={}){const n=function(i,r){const s=ld.get(i);return s&&s.has(r)?s.get(r):q_}(o.constructor,t.constructor);try{return n(o=o.clone(),t,e)}catch(i){throw i}}function G_(o,t,e){o=o.slice(),t=t.slice();const n=new W_(e.document,e.useRelations,e.forceWeakRemove);n.setOriginalOperations(o),n.setOriginalOperations(t);const i=n.originalOperations;if(o.length==0||t.length==0)return{operationsA:o,operationsB:t,originalOperations:i};const r=new WeakMap;for(const c of o)r.set(c,0);const s={nextBaseVersionA:o[o.length-1].baseVersion+1,nextBaseVersionB:t[t.length-1].baseVersion+1,originalOperationsACount:o.length,originalOperationsBCount:t.length};let a=0;for(;a<o.length;){const c=o[a],l=r.get(c);if(l==t.length){a++;continue}const d=t[l],u=wg(c,d,n.getContext(c,d,!0)),h=wg(d,c,n.getContext(d,c,!1));n.updateRelation(c,d),n.setOriginalOperations(u,c),n.setOriginalOperations(h,d);for(const m of u)r.set(m,l+h.length);o.splice(a,1,...u),t.splice(l,1,...h)}if(Cg(o),Cg(t),e.padWithNoOps){const c=o.length-s.originalOperationsACount,l=t.length-s.originalOperationsBCount;_g(o,l-c),_g(t,c-l)}return Ag(o,s.nextBaseVersionB),Ag(t,s.nextBaseVersionA),{operationsA:o,operationsB:t,originalOperations:i}}class W_{constructor(t,e,n=!1){this.originalOperations=new Map,this._history=t.history,this._useRelations=e,this._forceWeakRemove=!!n,this._relations=new Map}setOriginalOperations(t,e=null){const n=e?this.originalOperations.get(e):null;for(const i of t)this.originalOperations.set(i,n||i)}updateRelation(t,e){if(t instanceof dt)e instanceof Dt?t.targetPosition.isEqual(e.sourcePosition)||e.movedRange.containsPosition(t.targetPosition)?this._setRelation(t,e,"insertAtSource"):t.targetPosition.isEqual(e.deletionPosition)?this._setRelation(t,e,"insertBetween"):t.targetPosition.isAfter(e.sourcePosition)&&this._setRelation(t,e,"moveTargetAfter"):e instanceof dt&&(t.targetPosition.isEqual(e.sourcePosition)||t.targetPosition.isBefore(e.sourcePosition)?this._setRelation(t,e,"insertBefore"):this._setRelation(t,e,"insertAfter"));else if(t instanceof ft){if(e instanceof Dt)t.splitPosition.isBefore(e.sourcePosition)&&this._setRelation(t,e,"splitBefore");else if(e instanceof dt)if(t.splitPosition.isEqual(e.sourcePosition)||t.splitPosition.isBefore(e.sourcePosition))this._setRelation(t,e,"splitBefore");else{const n=N._createFromPositionAndShift(e.sourcePosition,e.howMany);if(t.splitPosition.hasSameParentAs(e.sourcePosition)&&n.containsPosition(t.splitPosition)){const i=n.end.offset-t.splitPosition.offset,r=t.splitPosition.offset-n.start.offset;this._setRelation(t,e,{howMany:i,offset:r})}}}else if(t instanceof Dt)e instanceof Dt?(t.targetPosition.isEqual(e.sourcePosition)||this._setRelation(t,e,"mergeTargetNotMoved"),t.sourcePosition.isEqual(e.targetPosition)&&this._setRelation(t,e,"mergeSourceNotMoved"),t.sourcePosition.isEqual(e.sourcePosition)&&this._setRelation(t,e,"mergeSameElement")):e instanceof ft?t.sourcePosition.isEqual(e.splitPosition)&&this._setRelation(t,e,"splitAtSource"):e instanceof dt&&e.howMany>0&&(t.sourcePosition.isEqual(e.sourcePosition.getShiftedBy(e.howMany))&&this._setRelation(t,e,"mergeSourceAffected"),t.targetPosition.isEqual(e.sourcePosition)&&this._setRelation(t,e,"mergeTargetWasBefore"));else if(t instanceof Wt){const n=t.newRange;if(!n)return;if(e instanceof Dt){const i=n.start.isEqual(e.targetPosition),r=n.start.isEqual(e.deletionPosition),s=n.end.isEqual(e.deletionPosition),a=n.end.isEqual(e.sourcePosition);(i||r||s||a)&&this._setRelation(t,e,{wasInLeftElement:i,wasStartBeforeMergedElement:r,wasEndBeforeMergedElement:s,wasInRightElement:a})}}}getContext(t,e,n){return{aIsStrong:n,aWasUndone:this._wasUndone(t),bWasUndone:this._wasUndone(e),abRelation:this._useRelations?this._getRelation(t,e):null,baRelation:this._useRelations?this._getRelation(e,t):null,forceWeakRemove:this._forceWeakRemove}}_wasUndone(t){const e=this.originalOperations.get(t);return e.wasUndone||this._history.isUndoneOperation(e)}_getRelation(t,e){const n=this.originalOperations.get(e),i=this._history.getUndoneOperation(n);if(!i)return null;const r=this.originalOperations.get(t),s=this._relations.get(r);return s&&s.get(i)||null}_setRelation(t,e,n){const i=this.originalOperations.get(t),r=this.originalOperations.get(e);let s=this._relations.get(i);s||(s=new Map,this._relations.set(i,s)),s.set(r,n)}}function Ag(o,t){for(const e of o)e.baseVersion=t++}function _g(o,t){for(let e=0;e<t;e++)o.push(new Tt(0))}function Cg(o){const t=new Map;for(let e=0;e<o.length;e++){const n=o[e];n instanceof Wt&&(n.baseVersion!==-1?t.set(n.name,{op:n,ranges:n.newRange?[n.newRange]:[]}):(n.newRange&&t.get(n.name).ranges.push(n.newRange),o.splice(e,1),e--))}for(const{op:e,ranges:n}of t.values())n.length?e.newRange=N._createFromRanges(n):e.newRange=null}function vg(o,t,e){const n=o.nodes.getNode(0).getAttribute(t);if(n==e)return null;const i=new N(o.position,o.position.getShiftedBy(o.howMany));return new Mt(i,t,n,e,0)}function yg(o,t){return o.targetPosition._getTransformedByDeletion(t.sourcePosition,t.howMany)===null}function Kn(o,t){const e=[];for(let n=0;n<o.length;n++){const i=o[n],r=new dt(i.start,i.end.offset-i.start.offset,t,0);e.push(r);for(let s=n+1;s<o.length;s++)o[s]=o[s]._getTransformedByMove(r.sourcePosition,r.targetPosition,r.howMany)[0];t=t._getTransformedByMove(r.sourcePosition,r.targetPosition,r.howMany)}return e}lt(Mt,Mt,(o,t,e)=>{if(o.key===t.key&&o.range.start.hasSameParentAs(t.range.start)){const n=o.range.getDifference(t.range).map(r=>new Mt(r,o.key,o.oldValue,o.newValue,0)),i=o.range.getIntersection(t.range);return i&&e.aIsStrong&&n.push(new Mt(i,t.key,t.newValue,o.newValue,0)),n.length==0?[new Tt(0)]:n}return[o]}),lt(Mt,zt,(o,t)=>{if(o.range.start.hasSameParentAs(t.position)&&o.range.containsPosition(t.position)){const e=o.range._getTransformedByInsertion(t.position,t.howMany,!t.shouldReceiveAttributes).map(n=>new Mt(n,o.key,o.oldValue,o.newValue,o.baseVersion));if(t.shouldReceiveAttributes){const n=vg(t,o.key,o.oldValue);n&&e.unshift(n)}return e}return o.range=o.range._getTransformedByInsertion(t.position,t.howMany,!1)[0],[o]}),lt(Mt,Dt,(o,t)=>{const e=[];o.range.start.hasSameParentAs(t.deletionPosition)&&(o.range.containsPosition(t.deletionPosition)||o.range.start.isEqual(t.deletionPosition))&&e.push(N._createFromPositionAndShift(t.graveyardPosition,1));const n=o.range._getTransformedByMergeOperation(t);return n.isCollapsed||e.push(n),e.map(i=>new Mt(i,o.key,o.oldValue,o.newValue,o.baseVersion))}),lt(Mt,dt,(o,t)=>function(n,i){const r=N._createFromPositionAndShift(i.sourcePosition,i.howMany);let s=null,a=[];r.containsRange(n,!0)?s=n:n.start.hasSameParentAs(r.start)?(a=n.getDifference(r),s=n.getIntersection(r)):a=[n];const c=[];for(let l of a){l=l._getTransformedByDeletion(i.sourcePosition,i.howMany);const d=i.getMovedRangeStart(),u=l.start.hasSameParentAs(d),h=l._getTransformedByInsertion(d,i.howMany,u);c.push(...h)}return s&&c.push(s._getTransformedByMove(i.sourcePosition,i.targetPosition,i.howMany,!1)[0]),c}(o.range,t).map(n=>new Mt(n,o.key,o.oldValue,o.newValue,o.baseVersion))),lt(Mt,ft,(o,t)=>{if(o.range.end.isEqual(t.insertionPosition))return t.graveyardPosition||o.range.end.offset++,[o];if(o.range.start.hasSameParentAs(t.splitPosition)&&o.range.containsPosition(t.splitPosition)){const e=o.clone();return e.range=new N(t.moveTargetPosition.clone(),o.range.end._getCombined(t.splitPosition,t.moveTargetPosition)),o.range.end=t.splitPosition.clone(),o.range.end.stickiness="toPrevious",[o,e]}return o.range=o.range._getTransformedBySplitOperation(t),[o]}),lt(zt,Mt,(o,t)=>{const e=[o];if(o.shouldReceiveAttributes&&o.position.hasSameParentAs(t.range.start)&&t.range.containsPosition(o.position)){const n=vg(o,t.key,t.newValue);n&&e.push(n)}return e}),lt(zt,zt,(o,t,e)=>(o.position.isEqual(t.position)&&e.aIsStrong||(o.position=o.position._getTransformedByInsertOperation(t)),[o])),lt(zt,dt,(o,t)=>(o.position=o.position._getTransformedByMoveOperation(t),[o])),lt(zt,ft,(o,t)=>(o.position=o.position._getTransformedBySplitOperation(t),[o])),lt(zt,Dt,(o,t)=>(o.position=o.position._getTransformedByMergeOperation(t),[o])),lt(Wt,zt,(o,t)=>(o.oldRange&&(o.oldRange=o.oldRange._getTransformedByInsertOperation(t)[0]),o.newRange&&(o.newRange=o.newRange._getTransformedByInsertOperation(t)[0]),[o])),lt(Wt,Wt,(o,t,e)=>{if(o.name==t.name){if(!e.aIsStrong)return[new Tt(0)];o.oldRange=t.newRange?t.newRange.clone():null}return[o]}),lt(Wt,Dt,(o,t)=>(o.oldRange&&(o.oldRange=o.oldRange._getTransformedByMergeOperation(t)),o.newRange&&(o.newRange=o.newRange._getTransformedByMergeOperation(t)),[o])),lt(Wt,dt,(o,t)=>{const e=[o];if(o.oldRange&&(o.oldRange=N._createFromRanges(o.oldRange._getTransformedByMoveOperation(t))),o.newRange){const n=o.newRange._getTransformedByMoveOperation(t);o.newRange=n[0];for(let i=1;i<n.length;i++){const r=o.clone();r.oldRange=null,r.newRange=n[i],r.baseVersion=-1,e.push(r)}}return e}),lt(Wt,ft,(o,t,e)=>{if(o.oldRange&&(o.oldRange=o.oldRange._getTransformedBySplitOperation(t)),o.newRange){if(e.abRelation){const n=o.newRange._getTransformedBySplitOperation(t);return o.newRange.start.isEqual(t.splitPosition)&&e.abRelation.wasStartBeforeMergedElement?o.newRange.start=R._createAt(t.insertionPosition):o.newRange.start.isEqual(t.splitPosition)&&!e.abRelation.wasInLeftElement?o.newRange.start=R._createAt(t.moveTargetPosition):o.newRange.start=n.start,o.newRange.end.isEqual(t.splitPosition)&&e.abRelation.wasInRightElement?o.newRange.end=R._createAt(t.moveTargetPosition):o.newRange.end.isEqual(t.splitPosition)&&e.abRelation.wasEndBeforeMergedElement?o.newRange.end=R._createAt(t.insertionPosition):o.newRange.end=n.end,[o]}o.newRange=o.newRange._getTransformedBySplitOperation(t)}return[o]}),lt(Dt,zt,(o,t)=>(o.sourcePosition.hasSameParentAs(t.position)&&(o.howMany+=t.howMany),o.sourcePosition=o.sourcePosition._getTransformedByInsertOperation(t),o.targetPosition=o.targetPosition._getTransformedByInsertOperation(t),[o])),lt(Dt,Dt,(o,t,e)=>{if(o.sourcePosition.isEqual(t.sourcePosition)&&o.targetPosition.isEqual(t.targetPosition)){if(e.bWasUndone){const n=t.graveyardPosition.path.slice();return n.push(0),o.sourcePosition=new R(t.graveyardPosition.root,n),o.howMany=0,[o]}return[new Tt(0)]}if(o.sourcePosition.isEqual(t.sourcePosition)&&!o.targetPosition.isEqual(t.targetPosition)&&!e.bWasUndone&&e.abRelation!="splitAtSource"){const n=o.targetPosition.root.rootName=="$graveyard",i=t.targetPosition.root.rootName=="$graveyard";if(i&&!n||!(n&&!i)&&e.aIsStrong){const r=t.targetPosition._getTransformedByMergeOperation(t),s=o.targetPosition._getTransformedByMergeOperation(t);return[new dt(r,o.howMany,s,0)]}return[new Tt(0)]}return o.sourcePosition.hasSameParentAs(t.targetPosition)&&(o.howMany+=t.howMany),o.sourcePosition=o.sourcePosition._getTransformedByMergeOperation(t),o.targetPosition=o.targetPosition._getTransformedByMergeOperation(t),o.graveyardPosition.isEqual(t.graveyardPosition)&&e.aIsStrong||(o.graveyardPosition=o.graveyardPosition._getTransformedByMergeOperation(t)),[o]}),lt(Dt,dt,(o,t,e)=>{const n=N._createFromPositionAndShift(t.sourcePosition,t.howMany);return t.type=="remove"&&!e.bWasUndone&&o.deletionPosition.hasSameParentAs(t.sourcePosition)&&n.containsPosition(o.sourcePosition)?[new Tt(0)]:(t.sourcePosition.getShiftedBy(t.howMany).isEqual(o.sourcePosition)?o.sourcePosition.stickiness="toNone":t.targetPosition.isEqual(o.sourcePosition)&&e.abRelation=="mergeSourceAffected"?o.sourcePosition.stickiness="toNext":t.sourcePosition.isEqual(o.targetPosition)?(o.targetPosition.stickiness="toNone",o.howMany-=t.howMany):t.targetPosition.isEqual(o.targetPosition)&&e.abRelation=="mergeTargetWasBefore"?(o.targetPosition.stickiness="toPrevious",o.howMany+=t.howMany):(o.sourcePosition.hasSameParentAs(t.targetPosition)&&(o.howMany+=t.howMany),o.sourcePosition.hasSameParentAs(t.sourcePosition)&&(o.howMany-=t.howMany)),o.sourcePosition=o.sourcePosition._getTransformedByMoveOperation(t),o.targetPosition=o.targetPosition._getTransformedByMoveOperation(t),o.sourcePosition.stickiness="toPrevious",o.targetPosition.stickiness="toNext",o.graveyardPosition.isEqual(t.targetPosition)||(o.graveyardPosition=o.graveyardPosition._getTransformedByMoveOperation(t)),[o])}),lt(Dt,ft,(o,t,e)=>{if(t.graveyardPosition&&(o.graveyardPosition=o.graveyardPosition._getTransformedByDeletion(t.graveyardPosition,1),o.deletionPosition.isEqual(t.graveyardPosition)&&(o.howMany=t.howMany)),o.targetPosition.isEqual(t.splitPosition)&&(t.graveyardPosition&&o.deletionPosition.isEqual(t.graveyardPosition)||e.abRelation=="mergeTargetNotMoved"))return o.sourcePosition=o.sourcePosition._getTransformedBySplitOperation(t),[o];if(o.sourcePosition.isEqual(t.splitPosition)){if(e.abRelation=="mergeSourceNotMoved")return o.howMany=0,o.targetPosition=o.targetPosition._getTransformedBySplitOperation(t),[o];if(e.abRelation=="mergeSameElement"||o.sourcePosition.offset>0)return o.sourcePosition=t.moveTargetPosition.clone(),o.targetPosition=o.targetPosition._getTransformedBySplitOperation(t),[o]}return o.sourcePosition.hasSameParentAs(t.splitPosition)&&(o.howMany=t.splitPosition.offset),o.sourcePosition=o.sourcePosition._getTransformedBySplitOperation(t),o.targetPosition=o.targetPosition._getTransformedBySplitOperation(t),[o]}),lt(dt,zt,(o,t)=>{const e=N._createFromPositionAndShift(o.sourcePosition,o.howMany)._getTransformedByInsertOperation(t,!1)[0];return o.sourcePosition=e.start,o.howMany=e.end.offset-e.start.offset,o.targetPosition.isEqual(t.position)||(o.targetPosition=o.targetPosition._getTransformedByInsertOperation(t)),[o]}),lt(dt,dt,(o,t,e)=>{const n=N._createFromPositionAndShift(o.sourcePosition,o.howMany),i=N._createFromPositionAndShift(t.sourcePosition,t.howMany);let r,s=e.aIsStrong,a=!e.aIsStrong;if(e.abRelation=="insertBefore"||e.baRelation=="insertAfter"?a=!0:e.abRelation!="insertAfter"&&e.baRelation!="insertBefore"||(a=!1),r=o.targetPosition.isEqual(t.targetPosition)&&a?o.targetPosition._getTransformedByDeletion(t.sourcePosition,t.howMany):o.targetPosition._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany),yg(o,t)&&yg(t,o))return[t.getReversed()];if(n.containsPosition(t.targetPosition)&&n.containsRange(i,!0))return n.start=n.start._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany),n.end=n.end._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany),Kn([n],r);if(i.containsPosition(o.targetPosition)&&i.containsRange(n,!0))return n.start=n.start._getCombined(t.sourcePosition,t.getMovedRangeStart()),n.end=n.end._getCombined(t.sourcePosition,t.getMovedRangeStart()),Kn([n],r);const c=Gt(o.sourcePosition.getParentPath(),t.sourcePosition.getParentPath());if(c=="prefix"||c=="extension")return n.start=n.start._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany),n.end=n.end._getTransformedByMove(t.sourcePosition,t.targetPosition,t.howMany),Kn([n],r);o.type!="remove"||t.type=="remove"||e.aWasUndone||e.forceWeakRemove?o.type=="remove"||t.type!="remove"||e.bWasUndone||e.forceWeakRemove||(s=!1):s=!0;const l=[],d=n.getDifference(i);for(const h of d){h.start=h.start._getTransformedByDeletion(t.sourcePosition,t.howMany),h.end=h.end._getTransformedByDeletion(t.sourcePosition,t.howMany);const m=Gt(h.start.getParentPath(),t.getMovedRangeStart().getParentPath())=="same",p=h._getTransformedByInsertion(t.getMovedRangeStart(),t.howMany,m);l.push(...p)}const u=n.getIntersection(i);return u!==null&&s&&(u.start=u.start._getCombined(t.sourcePosition,t.getMovedRangeStart()),u.end=u.end._getCombined(t.sourcePosition,t.getMovedRangeStart()),l.length===0?l.push(u):l.length==1?i.start.isBefore(n.start)||i.start.isEqual(n.start)?l.unshift(u):l.push(u):l.splice(1,0,u)),l.length===0?[new Tt(o.baseVersion)]:Kn(l,r)}),lt(dt,ft,(o,t,e)=>{let n=o.targetPosition.clone();o.targetPosition.isEqual(t.insertionPosition)&&t.graveyardPosition&&e.abRelation!="moveTargetAfter"||(n=o.targetPosition._getTransformedBySplitOperation(t));const i=N._createFromPositionAndShift(o.sourcePosition,o.howMany);if(i.end.isEqual(t.insertionPosition))return t.graveyardPosition||o.howMany++,o.targetPosition=n,[o];if(i.start.hasSameParentAs(t.splitPosition)&&i.containsPosition(t.splitPosition)){let s=new N(t.splitPosition,i.end);return s=s._getTransformedBySplitOperation(t),Kn([new N(i.start,t.splitPosition),s],n)}o.targetPosition.isEqual(t.splitPosition)&&e.abRelation=="insertAtSource"&&(n=t.moveTargetPosition),o.targetPosition.isEqual(t.insertionPosition)&&e.abRelation=="insertBetween"&&(n=o.targetPosition);const r=[i._getTransformedBySplitOperation(t)];if(t.graveyardPosition){const s=i.start.isEqual(t.graveyardPosition)||i.containsPosition(t.graveyardPosition);o.howMany>1&&s&&!e.aWasUndone&&r.push(N._createFromPositionAndShift(t.insertionPosition,1))}return Kn(r,n)}),lt(dt,Dt,(o,t,e)=>{const n=N._createFromPositionAndShift(o.sourcePosition,o.howMany);if(t.deletionPosition.hasSameParentAs(o.sourcePosition)&&n.containsPosition(t.sourcePosition)){if(o.type!="remove"||e.forceWeakRemove){if(o.howMany==1)return e.bWasUndone?(o.sourcePosition=t.graveyardPosition.clone(),o.targetPosition=o.targetPosition._getTransformedByMergeOperation(t),[o]):[new Tt(0)]}else if(!e.aWasUndone){const r=[];let s=t.graveyardPosition.clone(),a=t.targetPosition._getTransformedByMergeOperation(t);const c=o.targetPosition.getTransformedByOperation(t);o.howMany>1&&(r.push(new dt(o.sourcePosition,o.howMany-1,c,0)),s=s._getTransformedByMove(o.sourcePosition,c,o.howMany-1),a=a._getTransformedByMove(o.sourcePosition,c,o.howMany-1));const l=t.deletionPosition._getCombined(o.sourcePosition,c),d=new dt(s,1,l,0),u=d.getMovedRangeStart().path.slice();u.push(0);const h=new R(d.targetPosition.root,u);a=a._getTransformedByMove(s,l,1);const m=new dt(a,t.howMany,h,0);return r.push(d),r.push(m),r}}const i=N._createFromPositionAndShift(o.sourcePosition,o.howMany)._getTransformedByMergeOperation(t);return o.sourcePosition=i.start,o.howMany=i.end.offset-i.start.offset,o.targetPosition=o.targetPosition._getTransformedByMergeOperation(t),[o]}),lt(Yt,zt,(o,t)=>(o.position=o.position._getTransformedByInsertOperation(t),[o])),lt(Yt,Dt,(o,t)=>o.position.isEqual(t.deletionPosition)?(o.position=t.graveyardPosition.clone(),o.position.stickiness="toNext",[o]):(o.position=o.position._getTransformedByMergeOperation(t),[o])),lt(Yt,dt,(o,t)=>(o.position=o.position._getTransformedByMoveOperation(t),[o])),lt(Yt,Yt,(o,t,e)=>{if(o.position.isEqual(t.position)){if(!e.aIsStrong)return[new Tt(0)];o.oldName=t.newName}return[o]}),lt(Yt,ft,(o,t)=>{if(Gt(o.position.path,t.splitPosition.getParentPath())=="same"&&!t.graveyardPosition){const e=new Yt(o.position.getShiftedBy(1),o.oldName,o.newName,0);return[o,e]}return o.position=o.position._getTransformedBySplitOperation(t),[o]}),lt(Fe,Fe,(o,t,e)=>{if(o.root===t.root&&o.key===t.key){if(!e.aIsStrong||o.newValue===t.newValue)return[new Tt(0)];o.oldValue=t.newValue}return[o]}),lt(Ne,Ne,(o,t)=>o.rootName===t.rootName&&o.isAdd===t.isAdd?[new Tt(0)]:[o]),lt(ft,zt,(o,t)=>(o.splitPosition.hasSameParentAs(t.position)&&o.splitPosition.offset<t.position.offset&&(o.howMany+=t.howMany),o.splitPosition=o.splitPosition._getTransformedByInsertOperation(t),o.insertionPosition=o.insertionPosition._getTransformedByInsertOperation(t),[o])),lt(ft,Dt,(o,t,e)=>{if(!o.graveyardPosition&&!e.bWasUndone&&o.splitPosition.hasSameParentAs(t.sourcePosition)){const n=t.graveyardPosition.path.slice();n.push(0);const i=new R(t.graveyardPosition.root,n),r=ft.getInsertionPosition(new R(t.graveyardPosition.root,n)),s=new ft(i,0,r,null,0);return o.splitPosition=o.splitPosition._getTransformedByMergeOperation(t),o.insertionPosition=ft.getInsertionPosition(o.splitPosition),o.graveyardPosition=s.insertionPosition.clone(),o.graveyardPosition.stickiness="toNext",[s,o]}return o.splitPosition.hasSameParentAs(t.deletionPosition)&&!o.splitPosition.isAfter(t.deletionPosition)&&o.howMany--,o.splitPosition.hasSameParentAs(t.targetPosition)&&(o.howMany+=t.howMany),o.splitPosition=o.splitPosition._getTransformedByMergeOperation(t),o.insertionPosition=ft.getInsertionPosition(o.splitPosition),o.graveyardPosition&&(o.graveyardPosition=o.graveyardPosition._getTransformedByMergeOperation(t)),[o]}),lt(ft,dt,(o,t,e)=>{const n=N._createFromPositionAndShift(t.sourcePosition,t.howMany);if(o.graveyardPosition){const r=n.start.isEqual(o.graveyardPosition)||n.containsPosition(o.graveyardPosition);if(!e.bWasUndone&&r){const s=o.splitPosition._getTransformedByMoveOperation(t),a=o.graveyardPosition._getTransformedByMoveOperation(t),c=a.path.slice();c.push(0);const l=new R(a.root,c);return[new dt(s,o.howMany,l,0)]}o.graveyardPosition=o.graveyardPosition._getTransformedByMoveOperation(t)}const i=o.splitPosition.isEqual(t.targetPosition);if(i&&(e.baRelation=="insertAtSource"||e.abRelation=="splitBefore"))return o.howMany+=t.howMany,o.splitPosition=o.splitPosition._getTransformedByDeletion(t.sourcePosition,t.howMany),o.insertionPosition=ft.getInsertionPosition(o.splitPosition),[o];if(i&&e.abRelation&&e.abRelation.howMany){const{howMany:r,offset:s}=e.abRelation;return o.howMany+=r,o.splitPosition=o.splitPosition.getShiftedBy(s),[o]}if(o.splitPosition.hasSameParentAs(t.sourcePosition)&&n.containsPosition(o.splitPosition)){const r=t.howMany-(o.splitPosition.offset-t.sourcePosition.offset);return o.howMany-=r,o.splitPosition.hasSameParentAs(t.targetPosition)&&o.splitPosition.offset<t.targetPosition.offset&&(o.howMany+=t.howMany),o.splitPosition=t.sourcePosition.clone(),o.insertionPosition=ft.getInsertionPosition(o.splitPosition),[o]}return t.sourcePosition.isEqual(t.targetPosition)||(o.splitPosition.hasSameParentAs(t.sourcePosition)&&o.splitPosition.offset<=t.sourcePosition.offset&&(o.howMany-=t.howMany),o.splitPosition.hasSameParentAs(t.targetPosition)&&o.splitPosition.offset<t.targetPosition.offset&&(o.howMany+=t.howMany)),o.splitPosition.stickiness="toNone",o.splitPosition=o.splitPosition._getTransformedByMoveOperation(t),o.splitPosition.stickiness="toNext",o.graveyardPosition?o.insertionPosition=o.insertionPosition._getTransformedByMoveOperation(t):o.insertionPosition=ft.getInsertionPosition(o.splitPosition),[o]}),lt(ft,ft,(o,t,e)=>{if(o.splitPosition.isEqual(t.splitPosition)){if(!o.graveyardPosition&&!t.graveyardPosition)return[new Tt(0)];if(o.graveyardPosition&&t.graveyardPosition&&o.graveyardPosition.isEqual(t.graveyardPosition))return[new Tt(0)];if(e.abRelation=="splitBefore")return o.howMany=0,o.graveyardPosition=o.graveyardPosition._getTransformedBySplitOperation(t),[o]}if(o.graveyardPosition&&t.graveyardPosition&&o.graveyardPosition.isEqual(t.graveyardPosition)){const n=o.splitPosition.root.rootName=="$graveyard",i=t.splitPosition.root.rootName=="$graveyard";if(i&&!n||!(n&&!i)&&e.aIsStrong){const r=[];return t.howMany&&r.push(new dt(t.moveTargetPosition,t.howMany,t.splitPosition,0)),o.howMany&&r.push(new dt(o.splitPosition,o.howMany,o.moveTargetPosition,0)),r}return[new Tt(0)]}if(o.graveyardPosition&&(o.graveyardPosition=o.graveyardPosition._getTransformedBySplitOperation(t)),o.splitPosition.isEqual(t.insertionPosition)&&e.abRelation=="splitBefore")return o.howMany++,[o];if(t.splitPosition.isEqual(o.insertionPosition)&&e.baRelation=="splitBefore"){const n=t.insertionPosition.path.slice();n.push(0);const i=new R(t.insertionPosition.root,n);return[o,new dt(o.insertionPosition,1,i,0)]}return o.splitPosition.hasSameParentAs(t.splitPosition)&&o.splitPosition.offset<t.splitPosition.offset&&(o.howMany-=t.howMany),o.splitPosition=o.splitPosition._getTransformedBySplitOperation(t),o.insertionPosition=ft.getInsertionPosition(o.splitPosition),[o]});class Rt extends ut(R){constructor(t,e,n="toNone"){if(super(t,e,n),!this.root.is("rootElement"))throw new E("model-liveposition-root-not-rootelement",t);K_.call(this)}detach(){this.stopListening()}toPosition(){return new R(this.root,this.path.slice(),this.stickiness)}static fromPosition(t,e){return new this(t.root,t.path.slice(),e||t.stickiness)}}function K_(){this.listenTo(this.root.document.model,"applyOperation",(o,t)=>{const e=t[0];e.isDocumentOperation&&$_.call(this,e)},{priority:"low"})}function $_(o){const t=this.getTransformedByOperation(o);if(!this.isEqual(t)){const e=this.toPosition();this.path=t.path,this.root=t.root,this.fire("change",e)}}Rt.prototype.is=function(o){return o==="livePosition"||o==="model:livePosition"||o=="position"||o==="model:position"};class $n{constructor(t={}){typeof t=="string"&&(t=t==="transparent"?{isUndoable:!1}:{},st("batch-constructor-deprecated-string-type"));const{isUndoable:e=!0,isLocal:n=!0,isUndo:i=!1,isTyping:r=!1}=t;this.operations=[],this.isUndoable=e,this.isLocal=n,this.isUndo=i,this.isTyping=r}get type(){return st("batch-type-deprecated"),"default"}get baseVersion(){for(const t of this.operations)if(t.baseVersion!==null)return t.baseVersion;return null}addOperation(t){return t.batch=this,this.operations.push(t),t}}const Or=class Or{constructor(t){this._changesInElement=new Map,this._elementsSnapshots=new Map,this._elementChildrenSnapshots=new Map,this._elementState=new Map,this._changedMarkers=new Map,this._changedRoots=new Map,this._changeCount=0,this._cachedChanges=null,this._cachedChangesWithGraveyard=null,this._refreshedItems=new Set,this._markerCollection=t}get isEmpty(){return this._changesInElement.size==0&&this._changedMarkers.size==0&&this._changedRoots.size==0}bufferOperation(t){const e=t;switch(e.type){case"insert":if(this._isInInsertedElement(e.position.parent))return;this._markInsert(e.position.parent,e.position.offset,e.nodes.maxOffset);break;case"addAttribute":case"removeAttribute":case"changeAttribute":for(const n of e.range.getItems({shallow:!0}))this._isInInsertedElement(n.parent)||this._markAttribute(n);break;case"remove":case"move":case"reinsert":{if(e.sourcePosition.isEqual(e.targetPosition)||e.sourcePosition.getShiftedBy(e.howMany).isEqual(e.targetPosition))return;const n=this._isInInsertedElement(e.sourcePosition.parent),i=this._isInInsertedElement(e.targetPosition.parent);n||this._markRemove(e.sourcePosition.parent,e.sourcePosition.offset,e.howMany),i||this._markInsert(e.targetPosition.parent,e.getMovedRangeStart().offset,e.howMany);const r=N._createFromPositionAndShift(e.sourcePosition,e.howMany);for(const s of r.getItems({shallow:!0}))this._setElementState(s,"move");break}case"rename":{if(this._isInInsertedElement(e.position.parent))return;this._markRemove(e.position.parent,e.position.offset,1),this._markInsert(e.position.parent,e.position.offset,1);const n=N._createFromPositionAndShift(e.position,1);for(const i of this._markerCollection.getMarkersIntersectingRange(n)){const r=i.getData();this.bufferMarkerChange(i.name,r,r)}this._setElementState(e.position.nodeAfter,"rename");break}case"split":{const n=e.splitPosition.parent;if(!this._isInInsertedElement(n)){this._markRemove(n,e.splitPosition.offset,e.howMany);const i=N._createFromPositionAndShift(e.splitPosition,e.howMany);for(const r of i.getItems({shallow:!0}))this._setElementState(r,"move")}this._isInInsertedElement(e.insertionPosition.parent)||this._markInsert(e.insertionPosition.parent,e.insertionPosition.offset,1),e.graveyardPosition&&(this._markRemove(e.graveyardPosition.parent,e.graveyardPosition.offset,1),this._setElementState(e.graveyardPosition.nodeAfter,"move"));break}case"merge":{const n=e.sourcePosition.parent;this._isInInsertedElement(n.parent)||this._markRemove(n.parent,n.startOffset,1);const i=e.graveyardPosition.parent;this._markInsert(i,e.graveyardPosition.offset,1),this._setElementState(n,"move");const r=e.targetPosition.parent;if(!this._isInInsertedElement(r)){this._markInsert(r,e.targetPosition.offset,n.maxOffset);const s=N._createFromPositionAndShift(e.sourcePosition,e.howMany);for(const a of s.getItems({shallow:!0}))this._setElementState(a,"move")}break}case"detachRoot":case"addRoot":{const n=e.affectedSelectable;if(!n._isLoaded||n.isAttached()==e.isAdd)return;this._bufferRootStateChange(e.rootName,e.isAdd);break}case"addRootAttribute":case"removeRootAttribute":case"changeRootAttribute":{if(!e.root._isLoaded)return;const n=e.root.rootName;this._bufferRootAttributeChange(n,e.key,e.oldValue,e.newValue);break}}this._cachedChanges=null}bufferMarkerChange(t,e,n){e.range&&e.range.root.is("rootElement")&&!e.range.root._isLoaded&&(e.range=null),n.range&&n.range.root.is("rootElement")&&!n.range.root._isLoaded&&(n.range=null);let i=this._changedMarkers.get(t);i?i.newMarkerData=n:(i={newMarkerData:n,oldMarkerData:e},this._changedMarkers.set(t,i)),i.oldMarkerData.range==null&&n.range==null&&this._changedMarkers.delete(t)}getMarkersToRemove(){const t=[];for(const[e,n]of this._changedMarkers)n.oldMarkerData.range!=null&&t.push({name:e,range:n.oldMarkerData.range});return t}getMarkersToAdd(){const t=[];for(const[e,n]of this._changedMarkers)n.newMarkerData.range!=null&&t.push({name:e,range:n.newMarkerData.range});return t}getChangedMarkers(){return Array.from(this._changedMarkers).map(([t,e])=>({name:t,data:{oldRange:e.oldMarkerData.range,newRange:e.newMarkerData.range}}))}hasDataChanges(){if(this.getChanges().length||this._changedRoots.size>0)return!0;for(const{newMarkerData:t,oldMarkerData:e}of this._changedMarkers.values()){if(t.affectsData!==e.affectsData)return!0;if(t.affectsData){const n=t.range&&!e.range,i=!t.range&&e.range,r=t.range&&e.range&&!t.range.isEqual(e.range);if(n||i||r)return!0}}return!1}getChanges(t={}){if(this._cachedChanges)return t.includeChangesInGraveyard?this._cachedChangesWithGraveyard.slice():this._cachedChanges.slice();let e=[];for(const n of this._changesInElement.keys()){const i=this._changesInElement.get(n).sort((d,u)=>d.offset===u.offset?d.type!=u.type?d.type=="remove"?-1:1:0:d.offset<u.offset?-1:1),r=this._elementChildrenSnapshots.get(n),s=Eg(n.getChildren()),a=Y_(r.length,i);let c=0,l=0;for(const d of a)if(d==="i"){const u=this._getDiffActionForNode(s[c].node,"insert"),h=this._elementsSnapshots.get(s[c].node),m=this._getInsertDiff(n,c,u,s[c],h);e.push(m),c++}else if(d==="r"){const u=this._getDiffActionForNode(r[l].node,"remove"),h=this._getRemoveDiff(n,c,u,r[l]);e.push(h),l++}else if(d==="a"){const u=r[l].attributes,h=s[c].attributes;let m;if(s[c].name=="$text")m=new N(R._createAt(n,c),R._createAt(n,c+1));else{const f=n.offsetToIndex(c);m=new N(R._createAt(n,c),R._createAt(n.getChild(f),0))}const p=this._getAttributesDiff(m,u,h);e.push(...p),c++,l++}else c++,l++}e.sort((n,i)=>n.position.root!=i.position.root?n.position.root.rootName<i.position.root.rootName?-1:1:n.position.isEqual(i.position)?n.changeCount-i.changeCount:n.position.isBefore(i.position)?-1:1);for(let n=1,i=0;n<e.length;n++){const r=e[i],s=e[n],a=r.type=="remove"&&s.type=="remove"&&r.name=="$text"&&s.name=="$text"&&r.position.isEqual(s.position),c=r.type=="insert"&&s.type=="insert"&&r.name=="$text"&&s.name=="$text"&&r.position.parent==s.position.parent&&r.position.offset+r.length==s.position.offset,l=r.type=="attribute"&&s.type=="attribute"&&r.position.parent==s.position.parent&&r.range.isFlat&&s.range.isFlat&&r.position.offset+r.length==s.position.offset&&r.attributeKey==s.attributeKey&&r.attributeOldValue==s.attributeOldValue&&r.attributeNewValue==s.attributeNewValue;a||c||l?(r.length++,l&&(r.range.end=r.range.end.getShiftedBy(1)),e[n]=null):i=n}e=e.filter(n=>n);for(const n of e)delete n.changeCount,n.type=="attribute"&&(delete n.position,delete n.length);return this._changeCount=0,this._cachedChangesWithGraveyard=e,this._cachedChanges=e.filter(Q_),t.includeChangesInGraveyard?this._cachedChangesWithGraveyard.slice():this._cachedChanges.slice()}getChangedRoots(){return Array.from(this._changedRoots.values()).map(t=>{const e={...t};return e.state!==void 0&&delete e.attributes,e})}getRefreshedItems(){return new Set(this._refreshedItems)}reset(){this._changesInElement.clear(),this._elementChildrenSnapshots.clear(),this._elementsSnapshots.clear(),this._elementState.clear(),this._changedMarkers.clear(),this._changedRoots.clear(),this._refreshedItems.clear(),this._cachedChanges=null}_refreshItem(t){if(this._isInInsertedElement(t.parent))return;this._markRemove(t.parent,t.startOffset,t.offsetSize),this._markInsert(t.parent,t.startOffset,t.offsetSize),this._refreshedItems.add(t),this._setElementState(t,"refresh");const e=N._createOn(t);for(const n of this._markerCollection.getMarkersIntersectingRange(e)){const i=n.getData();this.bufferMarkerChange(n.name,i,i)}this._cachedChanges=null}_bufferRootLoad(t){if(t.isAttached()){this._bufferRootStateChange(t.rootName,!0),this._markInsert(t,0,t.maxOffset);for(const e of t.getAttributeKeys())this._bufferRootAttributeChange(t.rootName,e,null,t.getAttribute(e));for(const e of this._markerCollection)if(e.getRange().root==t){const n=e.getData();this.bufferMarkerChange(e.name,{...n,range:null},n)}}}_bufferRootStateChange(t,e){if(!this._changedRoots.has(t))return void this._changedRoots.set(t,{name:t,state:e?"attached":"detached"});const n=this._changedRoots.get(t);n.state!==void 0?(delete n.state,n.attributes===void 0&&this._changedRoots.delete(t)):n.state=e?"attached":"detached"}_bufferRootAttributeChange(t,e,n,i){const r=this._changedRoots.get(t)||{name:t},s=r.attributes||{};if(s[e]){const a=s[e];i===a.oldValue?delete s[e]:a.newValue=i}else s[e]={oldValue:n,newValue:i};Object.entries(s).length===0?(delete r.attributes,r.state===void 0&&this._changedRoots.delete(t)):(r.attributes=s,this._changedRoots.set(t,r))}_markInsert(t,e,n){if(t.root.is("rootElement")&&!t.root._isLoaded)return;const i={type:"insert",offset:e,howMany:n,count:this._changeCount++};this._markChange(t,i)}_markRemove(t,e,n){if(t.root.is("rootElement")&&!t.root._isLoaded)return;const i={type:"remove",offset:e,howMany:n,count:this._changeCount++};this._markChange(t,i),this._removeAllNestedChanges(t,e,n)}_markAttribute(t){if(t.root.is("rootElement")&&!t.root._isLoaded)return;const e={type:"attribute",offset:t.startOffset,howMany:t.offsetSize,count:this._changeCount++};this._markChange(t.parent,e)}_markChange(t,e){this._makeSnapshots(t);const n=this._getChangesForElement(t);this._handleChange(e,n),n.push(e);for(let i=0;i<n.length;i++)n[i].howMany<1&&(n.splice(i,1),i--)}_setElementState(t,e){if(!t.is("element"))return;const n=Or._statesPriority.indexOf(this._elementState.get(t));Or._statesPriority.indexOf(e)>n&&this._elementState.set(t,e)}_getDiffActionForNode(t,e){if(!t.is("element")||!this._elementsSnapshots.has(t))return e;const n=this._elementState.get(t);return n&&n!="move"?n:e}_getChangesForElement(t){let e;return this._changesInElement.has(t)?e=this._changesInElement.get(t):(e=[],this._changesInElement.set(t,e)),e}_makeSnapshots(t){if(this._elementChildrenSnapshots.has(t))return;const e=Eg(t.getChildren());this._elementChildrenSnapshots.set(t,e);for(const n of e)this._elementsSnapshots.set(n.node,n)}_handleChange(t,e){t.nodesToHandle=t.howMany;for(const n of e){const i=t.offset+t.howMany,r=n.offset+n.howMany;if(t.type=="insert"&&(n.type=="insert"&&(t.offset<=n.offset?n.offset+=t.howMany:t.offset<r&&(n.howMany+=t.nodesToHandle,t.nodesToHandle=0)),n.type=="remove"&&t.offset<n.offset&&(n.offset+=t.howMany),n.type=="attribute")){if(t.offset<=n.offset)n.offset+=t.howMany;else if(t.offset<r){const s=n.howMany;n.howMany=t.offset-n.offset,e.unshift({type:"attribute",offset:i,howMany:s-n.howMany,count:this._changeCount++})}}if(t.type=="remove"){if(n.type=="insert"){if(i<=n.offset)n.offset-=t.howMany;else if(i<=r)if(t.offset<n.offset){const s=i-n.offset;n.offset=t.offset,n.howMany-=s,t.nodesToHandle-=s}else n.howMany-=t.nodesToHandle,t.nodesToHandle=0;else if(t.offset<=n.offset)t.nodesToHandle-=n.howMany,n.howMany=0;else if(t.offset<r){const s=r-t.offset;n.howMany-=s,t.nodesToHandle-=s}}if(n.type=="remove"&&(i<=n.offset?n.offset-=t.howMany:t.offset<n.offset&&(t.nodesToHandle+=n.howMany,n.howMany=0)),n.type=="attribute"){if(i<=n.offset)n.offset-=t.howMany;else if(t.offset<n.offset){const s=i-n.offset;n.offset=t.offset,n.howMany-=s}else if(t.offset<r)if(i<=r){const s=n.howMany;n.howMany=t.offset-n.offset;const a=s-n.howMany-t.nodesToHandle;e.unshift({type:"attribute",offset:t.offset,howMany:a,count:this._changeCount++})}else n.howMany-=r-t.offset}}if(t.type=="attribute"){if(n.type=="insert")if(t.offset<n.offset&&i>n.offset){if(i>r){const s={type:"attribute",offset:r,howMany:i-r,count:this._changeCount++};this._handleChange(s,e),e.push(s)}t.nodesToHandle=n.offset-t.offset,t.howMany=t.nodesToHandle}else t.offset>=n.offset&&t.offset<r&&(i>r?(t.nodesToHandle=i-r,t.offset=r):t.nodesToHandle=0);if(n.type=="remove"&&t.offset<n.offset&&i>n.offset){const s={type:"attribute",offset:n.offset,howMany:i-n.offset,count:this._changeCount++};this._handleChange(s,e),e.push(s),t.nodesToHandle=n.offset-t.offset,t.howMany=t.nodesToHandle}n.type=="attribute"&&(t.offset>=n.offset&&i<=r?(t.nodesToHandle=0,t.howMany=0,t.offset=0):t.offset<=n.offset&&i>=r&&(n.howMany=0))}}t.howMany=t.nodesToHandle,delete t.nodesToHandle}_getInsertDiff(t,e,n,i,r){const s={type:"insert",position:R._createAt(t,e),name:i.name,attributes:new Map(i.attributes),length:1,changeCount:this._changeCount++,action:n};return n!="insert"&&r&&(s.before={name:r.name,attributes:new Map(r.attributes)}),s}_getRemoveDiff(t,e,n,i){return{type:"remove",action:n,position:R._createAt(t,e),name:i.name,attributes:new Map(i.attributes),length:1,changeCount:this._changeCount++}}_getAttributesDiff(t,e,n){const i=[];n=new Map(n);for(const[r,s]of e){const a=n.has(r)?n.get(r):null;a!==s&&i.push({type:"attribute",position:t.start,range:t.clone(),length:1,attributeKey:r,attributeOldValue:s,attributeNewValue:a,changeCount:this._changeCount++}),n.delete(r)}for(const[r,s]of n)i.push({type:"attribute",position:t.start,range:t.clone(),length:1,attributeKey:r,attributeOldValue:null,attributeNewValue:s,changeCount:this._changeCount++});return i}_isInInsertedElement(t){const e=t.parent;if(!e)return!1;const n=this._changesInElement.get(e),i=t.startOffset;if(n){for(const r of n)if(r.type=="insert"&&i>=r.offset&&i<r.offset+r.howMany)return!0}return this._isInInsertedElement(e)}_removeAllNestedChanges(t,e,n){const i=new N(R._createAt(t,e),R._createAt(t,e+n));for(const r of i.getItems({shallow:!0}))r.is("element")&&(this._changesInElement.delete(r),this._removeAllNestedChanges(r,0,r.maxOffset))}};Or._statesPriority=[void 0,"refresh","rename","move"];let dd=Or;function xg(o){return{node:o,name:o.is("$text")?"$text":o.name,attributes:new Map(o.getAttributes())}}function Eg(o){const t=[];for(const e of o)if(e.is("$text"))for(let n=0;n<e.data.length;++n)t.push(xg(e));else t.push(xg(e));return t}function Y_(o,t){const e=[];let n=0,i=0;for(const r of t){if(r.offset>n){for(let s=0;s<r.offset-n;s++)e.push("e");i+=r.offset-n}if(r.type=="insert"){for(let s=0;s<r.howMany;s++)e.push("i");n=r.offset+r.howMany}else if(r.type=="remove"){for(let s=0;s<r.howMany;s++)e.push("r");n=r.offset,i+=r.howMany}else{if(r.howMany>1500)for(let s=0;s<r.howMany;s++)e.push("a");else e.push(..."a".repeat(r.howMany).split(""));n=r.offset+r.howMany,i+=r.howMany}}if(i<o)for(let r=0;r<o-i-n;r++)e.push("e");return e}function Q_(o){const t="position"in o&&o.position.root.rootName=="$graveyard",e="range"in o&&o.range.root.rootName=="$graveyard";return!t&&!e}class Z_{constructor(){this._operations=[],this._undoPairs=new Map,this._undoneOperations=new Set,this._baseVersionToOperationIndex=new Map,this._version=0,this._gaps=new Map}get version(){return this._version}set version(t){this._operations.length&&t>this._version+1&&this._gaps.set(this._version,t),this._version=t}get lastOperation(){return this._operations[this._operations.length-1]}addOperation(t){if(t.baseVersion!==this.version)throw new E("model-document-history-addoperation-incorrect-version",this,{operation:t,historyVersion:this.version});this._operations.push(t),this._version++,this._baseVersionToOperationIndex.set(t.baseVersion,this._operations.length-1)}getOperations(t,e=this.version){if(!this._operations.length)return[];const n=this._operations[0];t===void 0&&(t=n.baseVersion);let i=e-1;for(const[a,c]of this._gaps)t>a&&t<c&&(t=c),i>a&&i<c&&(i=a-1);if(i<n.baseVersion||t>this.lastOperation.baseVersion)return[];let r=this._baseVersionToOperationIndex.get(t);r===void 0&&(r=0);let s=this._baseVersionToOperationIndex.get(i);return s===void 0&&(s=this._operations.length-1),this._operations.slice(r,s+1)}getOperation(t){const e=this._baseVersionToOperationIndex.get(t);if(e!==void 0)return this._operations[e]}setOperationAsUndone(t,e){this._undoPairs.set(e,t),this._undoneOperations.add(t)}isUndoingOperation(t){return this._undoPairs.has(t)}isUndoneOperation(t){return this._undoneOperations.has(t)}getUndoneOperation(t){return this._undoPairs.get(t)}reset(){this._version=0,this._undoPairs=new Map,this._operations=[],this._undoneOperations=new Set,this._gaps=new Map,this._baseVersionToOperationIndex=new Map}}class Ds extends ht{constructor(t,e,n="main"){super(e),this._isAttached=!0,this._isLoaded=!0,this._document=t,this.rootName=n}get document(){return this._document}isAttached(){return this._isAttached}toJSON(){return this.rootName}}Ds.prototype.is=function(o,t){return t?t===this.name&&(o==="rootElement"||o==="model:rootElement"||o==="element"||o==="model:element"):o==="rootElement"||o==="model:rootElement"||o==="element"||o==="model:element"||o==="node"||o==="model:node"};const Dg="$graveyard";class J_ extends ut(){constructor(t){super(),this.model=t,this.history=new Z_,this.selection=new ve(this),this.roots=new fe({idProperty:"rootName"}),this.differ=new dd(t.markers),this.isReadOnly=!1,this._postFixers=new Set,this._hasSelectionChangedFromTheLastChangeBlock=!1,this.createRoot("$root",Dg),this.listenTo(t,"applyOperation",(e,n)=>{const i=n[0];i.isDocumentOperation&&this.differ.bufferOperation(i)},{priority:"high"}),this.listenTo(t,"applyOperation",(e,n)=>{const i=n[0];i.isDocumentOperation&&this.history.addOperation(i)},{priority:"low"}),this.listenTo(this.selection,"change",()=>{this._hasSelectionChangedFromTheLastChangeBlock=!0}),this.listenTo(t.markers,"update",(e,n,i,r,s)=>{const a={...n.getData(),range:r};this.differ.bufferMarkerChange(n.name,s,a),i===null&&n.on("change",(c,l)=>{const d=n.getData();this.differ.bufferMarkerChange(n.name,{...d,range:l},d)})}),this.registerPostFixer(e=>{let n=!1;for(const i of this.roots)i.isAttached()||i.isEmpty||(e.remove(e.createRangeIn(i)),n=!0);for(const i of this.model.markers)i.getRange().root.isAttached()||(e.removeMarker(i),n=!0);return n})}get version(){return this.history.version}set version(t){this.history.version=t}get graveyard(){return this.getRoot(Dg)}createRoot(t="$root",e="main"){if(this.roots.get(e))throw new E("model-document-createroot-name-exists",this,{name:e});const n=new Ds(this,t,e);return this.roots.add(n),n}destroy(){this.selection.destroy(),this.stopListening()}getRoot(t="main"){return this.roots.get(t)}getRootNames(t=!1){return this.getRoots(t).map(e=>e.rootName)}getRoots(t=!1){return this.roots.filter(e=>e!=this.graveyard&&(t||e.isAttached())&&e._isLoaded)}registerPostFixer(t){this._postFixers.add(t)}toJSON(){const t=am(this);return t.selection="[engine.model.DocumentSelection]",t.model="[engine.model.Model]",t}_handleChangeBlock(t){this._hasDocumentChangedFromTheLastChangeBlock()&&(this._callPostFixers(t),this.selection.refresh(),this.differ.hasDataChanges()?this.fire("change:data",t.batch):this.fire("change",t.batch),this.selection.refresh(),this.differ.reset()),this._hasSelectionChangedFromTheLastChangeBlock=!1}_hasDocumentChangedFromTheLastChangeBlock(){return!this.differ.isEmpty||this._hasSelectionChangedFromTheLastChangeBlock}_getDefaultRoot(){const t=this.getRoots();return t.length?t[0]:this.graveyard}_getDefaultRange(){const t=this._getDefaultRoot(),e=this.model,n=e.schema,i=e.createPositionFromPath(t,[0]);return n.getNearestSelectionRange(i)||e.createRange(i)}_validateSelectionRange(t){return t.start.isValid()&&t.end.isValid()&&Ig(t.start)&&Ig(t.end)}_callPostFixers(t){let e=!1;do for(const n of this._postFixers)if(this.selection.refresh(),e=n(t),e)break;while(e)}}function Ig(o){const t=o.textNode;if(t){const e=t.data,n=o.offset-t.startOffset;return!Ml(e,n)&&!Bl(e,n)}return!0}class X_ extends ut(){constructor(){super(...arguments),this._markers=new Map}[Symbol.iterator](){return this._markers.values()}has(t){const e=t instanceof Yn?t.name:t;return this._markers.has(e)}get(t){return this._markers.get(t)||null}_set(t,e,n=!1,i=!1){const r=t instanceof Yn?t.name:t;if(r.includes(","))throw new E("markercollection-incorrect-marker-name",this);const s=this._markers.get(r);if(s){const l=s.getData(),d=s.getRange();let u=!1;return d.isEqual(e)||(s._attachLiveRange($t.fromRange(e)),u=!0),n!=s.managedUsingOperations&&(s._managedUsingOperations=n,u=!0),typeof i=="boolean"&&i!=s.affectsData&&(s._affectsData=i,u=!0),u&&this.fire(`update:${r}`,s,d,e,l),s}const a=$t.fromRange(e),c=new Yn(r,a,n,i);return this._markers.set(r,c),this.fire(`update:${r}`,c,null,e,{...c.getData(),range:null}),c}_remove(t){const e=t instanceof Yn?t.name:t,n=this._markers.get(e);return!!n&&(this._markers.delete(e),this.fire(`update:${e}`,n,n.getRange(),null,n.getData()),this._destroyMarker(n),!0)}_refresh(t){const e=t instanceof Yn?t.name:t,n=this._markers.get(e);if(!n)throw new E("markercollection-refresh-marker-not-exists",this);const i=n.getRange();this.fire(`update:${e}`,n,i,i,n.getData())}*getMarkersAtPosition(t){for(const e of this)e.getRange().containsPosition(t)&&(yield e)}*getMarkersIntersectingRange(t){for(const e of this)e.getRange().getIntersection(t)!==null&&(yield e)}destroy(){for(const t of this._markers.values())this._destroyMarker(t);this._markers=null,this.stopListening()}*getMarkersGroup(t){for(const e of this._markers.values())e.name.startsWith(t+":")&&(yield e)}_destroyMarker(t){t.stopListening(),t._detachLiveRange()}}class Yn extends ut(Je){constructor(t,e,n,i){super(),this.name=t,this._liveRange=this._attachLiveRange(e),this._managedUsingOperations=n,this._affectsData=i}get managedUsingOperations(){if(!this._liveRange)throw new E("marker-destroyed",this);return this._managedUsingOperations}get affectsData(){if(!this._liveRange)throw new E("marker-destroyed",this);return this._affectsData}getData(){return{range:this.getRange(),affectsData:this.affectsData,managedUsingOperations:this.managedUsingOperations}}getStart(){if(!this._liveRange)throw new E("marker-destroyed",this);return this._liveRange.start.clone()}getEnd(){if(!this._liveRange)throw new E("marker-destroyed",this);return this._liveRange.end.clone()}getRange(){if(!this._liveRange)throw new E("marker-destroyed",this);return this._liveRange.toRange()}_attachLiveRange(t){return this._liveRange&&this._detachLiveRange(),t.delegate("change:range").to(this),t.delegate("change:content").to(this),this._liveRange=t,t}_detachLiveRange(){this._liveRange.stopDelegating("change:range",this),this._liveRange.stopDelegating("change:content",this),this._liveRange.detach(),this._liveRange=null}}Yn.prototype.is=function(o){return o==="marker"||o==="model:marker"};class tC extends oe{constructor(t,e){super(null),this.sourcePosition=t.clone(),this.howMany=e}get type(){return"detach"}get affectedSelectable(){return null}toJSON(){const t=super.toJSON();return t.sourcePosition=this.sourcePosition.toJSON(),t}_validate(){if(this.sourcePosition.root.document)throw new E("detach-operation-on-document-node",this)}_execute(){pg(N._createFromPositionAndShift(this.sourcePosition,this.howMany))}static get className(){return"DetachOperation"}}class je extends Je{constructor(t){super(),this.markers=new Map,this._children=new Mi,t&&this._insertChild(0,t)}[Symbol.iterator](){return this.getChildren()}get childCount(){return this._children.length}get maxOffset(){return this._children.maxOffset}get isEmpty(){return this.childCount===0}get nextSibling(){return null}get previousSibling(){return null}get root(){return this}get parent(){return null}get document(){return null}isAttached(){return!1}getAncestors(){return[]}getChild(t){return this._children.getNode(t)}getChildAtOffset(t){return this._children.getNodeAtOffset(t)}getChildren(){return this._children[Symbol.iterator]()}getChildIndex(t){return this._children.getNodeIndex(t)}getChildStartOffset(t){return this._children.getNodeStartOffset(t)}getPath(){return[]}getNodeByPath(t){let e=this;for(const n of t)e=e.getChildAtOffset(n);return e}offsetToIndex(t){return this._children.offsetToIndex(t)}toJSON(){const t=[];for(const e of this._children)t.push(e.toJSON());return t}static fromJSON(t){const e=[];for(const n of t)n.name?e.push(ht.fromJSON(n)):e.push(kt.fromJSON(n));return new je(e)}_appendChild(t){this._insertChild(this.childCount,t)}_insertChild(t,e){const n=function(i){return typeof i=="string"?[new kt(i)]:(Jt(i)||(i=[i]),Array.from(i).map(r=>typeof r=="string"?new kt(r):r instanceof Ce?new kt(r.data,r.getAttributes()):r))}(e);for(const i of n)i.parent!==null&&i._remove(),i.parent=this;this._children._insertNodes(t,n)}_removeChildren(t,e=1){const n=this._children._removeNodes(t,e);for(const i of n)i.parent=null;return n}}je.prototype.is=function(o){return o==="documentFragment"||o==="model:documentFragment"};class eC{constructor(t,e){this.model=t,this.batch=e}createText(t,e){return new kt(t,e)}createElement(t,e){return new ht(t,e)}createDocumentFragment(){return new je}cloneElement(t,e=!0){return t._clone(e)}insert(t,e,n=0){if(this._assertWriterUsedCorrectly(),t instanceof kt&&t.data=="")return;const i=R._createAt(e,n);if(t.parent){if(Bg(t.root,i.root))return void this.move(N._createOn(t),i);if(t.root.document)throw new E("model-writer-insert-forbidden-move",this);this.remove(t)}const r=i.root.document?i.root.document.version:null,s=new zt(i,t,r);if(t instanceof kt&&(s.shouldReceiveAttributes=!0),this.batch.addOperation(s),this.model.applyOperation(s),t instanceof je)for(const[a,c]of t.markers){const l=R._createAt(c.root,0),d={range:new N(c.start._getCombined(l,i),c.end._getCombined(l,i)),usingOperation:!0,affectsData:!0};this.model.markers.has(a)?this.updateMarker(a,d):this.addMarker(a,d)}}insertText(t,e,n,i){e instanceof je||e instanceof ht||e instanceof R?this.insert(this.createText(t),e,n):this.insert(this.createText(t,e),n,i)}insertElement(t,e,n,i){e instanceof je||e instanceof ht||e instanceof R?this.insert(this.createElement(t),e,n):this.insert(this.createElement(t,e),n,i)}append(t,e){this.insert(t,e,"end")}appendText(t,e,n){e instanceof je||e instanceof ht?this.insert(this.createText(t),e,"end"):this.insert(this.createText(t,e),n,"end")}appendElement(t,e,n){e instanceof je||e instanceof ht?this.insert(this.createElement(t),e,"end"):this.insert(this.createElement(t,e),n,"end")}setAttribute(t,e,n){if(this._assertWriterUsedCorrectly(),n instanceof N){const i=n.getMinimalFlatRanges();for(const r of i)Sg(this,t,e,r)}else Mg(this,t,e,n)}setAttributes(t,e){for(const[n,i]of Ie(t))this.setAttribute(n,i,e)}removeAttribute(t,e){if(this._assertWriterUsedCorrectly(),e instanceof N){const n=e.getMinimalFlatRanges();for(const i of n)Sg(this,t,null,i)}else Mg(this,t,null,e)}clearAttributes(t){this._assertWriterUsedCorrectly();const e=n=>{for(const i of n.getAttributeKeys())this.removeAttribute(i,n)};if(t instanceof N)for(const n of t.getItems())e(n);else e(t)}move(t,e,n){if(this._assertWriterUsedCorrectly(),!(t instanceof N))throw new E("writer-move-invalid-range",this);if(!t.isFlat)throw new E("writer-move-range-not-flat",this);const i=R._createAt(e,n);if(i.isEqual(t.start))return;if(this._addOperationForAffectedMarkers("move",t),!Bg(t.root,i.root))throw new E("writer-move-different-document",this);const r=t.root.document?t.root.document.version:null,s=new dt(t.start,t.end.offset-t.start.offset,i,r);this.batch.addOperation(s),this.model.applyOperation(s)}remove(t){this._assertWriterUsedCorrectly();const e=(t instanceof N?t:N._createOn(t)).getMinimalFlatRanges().reverse();for(const n of e)this._addOperationForAffectedMarkers("move",n),nC(n.start,n.end.offset-n.start.offset,this.batch,this.model)}merge(t){this._assertWriterUsedCorrectly();const e=t.nodeBefore,n=t.nodeAfter;if(this._addOperationForAffectedMarkers("merge",t),!(e instanceof ht))throw new E("writer-merge-no-element-before",this);if(!(n instanceof ht))throw new E("writer-merge-no-element-after",this);t.root.document?this._merge(t):this._mergeDetached(t)}createPositionFromPath(t,e,n){return this.model.createPositionFromPath(t,e,n)}createPositionAt(t,e){return this.model.createPositionAt(t,e)}createPositionAfter(t){return this.model.createPositionAfter(t)}createPositionBefore(t){return this.model.createPositionBefore(t)}createRange(t,e){return this.model.createRange(t,e)}createRangeIn(t){return this.model.createRangeIn(t)}createRangeOn(t){return this.model.createRangeOn(t)}createSelection(...t){return this.model.createSelection(...t)}_mergeDetached(t){const e=t.nodeBefore,n=t.nodeAfter;this.move(N._createIn(n),R._createAt(e,"end")),this.remove(n)}_merge(t){const e=R._createAt(t.nodeBefore,"end"),n=R._createAt(t.nodeAfter,0),i=t.root.document.graveyard,r=new R(i,[0]),s=t.root.document.version,a=new Dt(n,t.nodeAfter.maxOffset,e,r,s);this.batch.addOperation(a),this.model.applyOperation(a)}rename(t,e){if(this._assertWriterUsedCorrectly(),!(t instanceof ht))throw new E("writer-rename-not-element-instance",this);const n=t.root.document?t.root.document.version:null,i=new Yt(R._createBefore(t),t.name,e,n);this.batch.addOperation(i),this.model.applyOperation(i)}split(t,e){this._assertWriterUsedCorrectly();let n,i,r=t.parent;if(!r.parent)throw new E("writer-split-element-no-parent",this);if(e||(e=r.parent),!t.parent.getAncestors({includeSelf:!0}).includes(e))throw new E("writer-split-invalid-limit-element",this);do{const s=r.root.document?r.root.document.version:null,a=r.maxOffset-t.offset,c=ft.getInsertionPosition(t),l=new ft(t,a,c,null,s);this.batch.addOperation(l),this.model.applyOperation(l),n||i||(n=r,i=t.parent.nextSibling),r=(t=this.createPositionAfter(t.parent)).parent}while(r!==e);return{position:t,range:new N(R._createAt(n,"end"),R._createAt(i,0))}}wrap(t,e){if(this._assertWriterUsedCorrectly(),!t.isFlat)throw new E("writer-wrap-range-not-flat",this);const n=e instanceof ht?e:new ht(e);if(n.childCount>0)throw new E("writer-wrap-element-not-empty",this);if(n.parent!==null)throw new E("writer-wrap-element-attached",this);this.insert(n,t.start);const i=new N(t.start.getShiftedBy(1),t.end.getShiftedBy(1));this.move(i,R._createAt(n,0))}unwrap(t){if(this._assertWriterUsedCorrectly(),t.parent===null)throw new E("writer-unwrap-element-no-parent",this);this.move(N._createIn(t),this.createPositionAfter(t)),this.remove(t)}addMarker(t,e){if(this._assertWriterUsedCorrectly(),!e||typeof e.usingOperation!="boolean")throw new E("writer-addmarker-no-usingoperation",this);const n=e.usingOperation,i=e.range,r=e.affectsData!==void 0&&e.affectsData;if(this.model.markers.has(t))throw new E("writer-addmarker-marker-exists",this);if(!i)throw new E("writer-addmarker-no-range",this);return n?(Ri(this,t,null,i,r),this.model.markers.get(t)):this.model.markers._set(t,i,n,r)}updateMarker(t,e){this._assertWriterUsedCorrectly();const n=typeof t=="string"?t:t.name,i=this.model.markers.get(n);if(!i)throw new E("writer-updatemarker-marker-not-exists",this);if(!e)return st("writer-updatemarker-reconvert-using-editingcontroller",{markerName:n}),void this.model.markers._refresh(i);const r=typeof e.usingOperation=="boolean",s=typeof e.affectsData=="boolean",a=s?e.affectsData:i.affectsData;if(!r&&!e.range&&!s)throw new E("writer-updatemarker-wrong-options",this);const c=i.getRange(),l=e.range?e.range:c;r&&e.usingOperation!==i.managedUsingOperations?e.usingOperation?Ri(this,n,null,l,a):(Ri(this,n,c,null,a),this.model.markers._set(n,l,void 0,a)):i.managedUsingOperations?Ri(this,n,c,l,a):this.model.markers._set(n,l,void 0,a)}removeMarker(t){this._assertWriterUsedCorrectly();const e=typeof t=="string"?t:t.name;if(!this.model.markers.has(e))throw new E("writer-removemarker-no-marker",this);const n=this.model.markers.get(e);if(!n.managedUsingOperations)return void this.model.markers._remove(e);Ri(this,e,n.getRange(),null,n.affectsData)}addRoot(t,e="$root"){this._assertWriterUsedCorrectly();const n=this.model.document.getRoot(t);if(n&&n.isAttached())throw new E("writer-addroot-root-exists",this);const i=this.model.document,r=new Ne(t,e,!0,i,i.version);return this.batch.addOperation(r),this.model.applyOperation(r),this.model.document.getRoot(t)}detachRoot(t){this._assertWriterUsedCorrectly();const e=typeof t=="string"?this.model.document.getRoot(t):t;if(!e||!e.isAttached())throw new E("writer-detachroot-no-root",this);for(const r of this.model.markers)r.getRange().root===e&&this.removeMarker(r);for(const r of e.getAttributeKeys())this.removeAttribute(r,e);this.remove(this.createRangeIn(e));const n=this.model.document,i=new Ne(e.rootName,e.name,!1,n,n.version);this.batch.addOperation(i),this.model.applyOperation(i)}setSelection(...t){this._assertWriterUsedCorrectly(),this.model.document.selection._setTo(...t)}setSelectionFocus(t,e){this._assertWriterUsedCorrectly(),this.model.document.selection._setFocus(t,e)}setSelectionAttribute(t,e){if(this._assertWriterUsedCorrectly(),typeof t=="string")this._setSelectionAttribute(t,e);else for(const[n,i]of Ie(t))this._setSelectionAttribute(n,i)}removeSelectionAttribute(t){if(this._assertWriterUsedCorrectly(),typeof t=="string")this._removeSelectionAttribute(t);else for(const e of t)this._removeSelectionAttribute(e)}overrideSelectionGravity(){return this.model.document.selection._overrideGravity()}restoreSelectionGravity(t){this.model.document.selection._restoreGravity(t)}_setSelectionAttribute(t,e){const n=this.model.document.selection;if(n.isCollapsed&&n.anchor.parent.isEmpty){const i=ve._getStoreAttributeKey(t);this.setAttribute(i,e,n.anchor.parent)}n._setAttribute(t,e)}_removeSelectionAttribute(t){const e=this.model.document.selection;if(e.isCollapsed&&e.anchor.parent.isEmpty){const n=ve._getStoreAttributeKey(t);this.removeAttribute(n,e.anchor.parent)}e._removeAttribute(t)}_assertWriterUsedCorrectly(){if(this.model._currentWriter!==this)throw new E("writer-incorrect-use",this)}_addOperationForAffectedMarkers(t,e){for(const n of this.model.markers){if(!n.managedUsingOperations)continue;const i=n.getRange();let r=!1;if(t==="move"){const s=e;r=s.containsPosition(i.start)||s.start.isEqual(i.start)||s.containsPosition(i.end)||s.end.isEqual(i.end)}else{const s=e,a=s.nodeBefore,c=s.nodeAfter,l=i.start.parent==a&&i.start.isAtEnd,d=i.end.parent==c&&i.end.offset==0,u=i.end.nodeAfter==c,h=i.start.nodeAfter==c;r=l||d||u||h}r&&this.updateMarker(n.name,{range:i})}}}function Sg(o,t,e,n){const i=o.model,r=i.document;let s,a,c,l=n.start;for(const u of n.getWalker({shallow:!0}))c=u.item.getAttribute(t),s&&a!=c&&(a!=e&&d(),l=s),s=u.nextPosition,a=c;function d(){const u=new N(l,s),h=u.root.document?r.version:null,m=new Mt(u,t,a,e,h);o.batch.addOperation(m),i.applyOperation(m)}s instanceof R&&s!=l&&a!=e&&d()}function Mg(o,t,e,n){const i=o.model,r=i.document,s=n.getAttribute(t);let a,c;if(s!=e){if(n.root===n){const l=n.document?r.version:null;c=new Fe(n,t,s,e,l)}else{a=new N(R._createBefore(n),o.createPositionAfter(n));const l=a.root.document?r.version:null;c=new Mt(a,t,s,e,l)}o.batch.addOperation(c),i.applyOperation(c)}}function Ri(o,t,e,n,i){const r=o.model,s=r.document,a=new Wt(t,e,n,r.markers,!!i,s.version);o.batch.addOperation(a),r.applyOperation(a)}function nC(o,t,e,n){let i;if(o.root.document){const r=n.document,s=new R(r.graveyard,[0]);i=new dt(o,t,s,r.version)}else i=new tC(o,t);e.addOperation(i),n.applyOperation(i)}function Bg(o,t){return o===t||o instanceof Ds&&t instanceof Ds}function iC(o,t,e={}){if(t.isCollapsed)return;const n=t.getFirstRange();if(n.root.rootName=="$graveyard")return;const i=o.schema;o.change(r=>{if(!e.doNotResetEntireContent&&function(l,d){const u=l.getLimitElement(d);if(!d.containsEntireContent(u))return!1;const h=d.getFirstRange();return h.start.parent==h.end.parent?!1:l.checkChild(u,"paragraph")}(i,t))return void function(l,d){const u=l.model.schema.getLimitElement(d);l.remove(l.createRangeIn(u)),Pg(l,l.createPositionAt(u,0),d)}(r,t);const s={};if(!e.doNotAutoparagraph){const l=t.getSelectedElement();l&&Object.assign(s,i.getAttributesWithProperty(l,"copyOnReplace",!0))}const[a,c]=function(l){const d=l.root.document.model,u=l.start;let h=l.end;if(d.hasContent(l,{ignoreMarkers:!0})){const m=function(p){const f=p.parent,b=f.root.document.model.schema,C=f.getAncestors({parentFirst:!0,includeSelf:!0});for(const I of C){if(b.isLimit(I))return null;if(b.isBlock(I))return I}}(h);if(m&&h.isTouching(d.createPositionAt(m,0))){const p=d.createSelection(l);d.modifySelection(p,{direction:"backward"});const f=p.getLastPosition(),b=d.createRange(f,h);d.hasContent(b,{ignoreMarkers:!0})||(h=f)}}return[Rt.fromPosition(u,"toPrevious"),Rt.fromPosition(h,"toNext")]}(n);a.isTouching(c)||r.remove(r.createRange(a,c)),e.leaveUnmerged||(function(l,d,u){const h=l.model;if(!ud(l.model.schema,d,u))return;const[m,p]=function(f,b){const C=f.getAncestors(),I=b.getAncestors();let M=0;for(;C[M]&&C[M]==I[M];)M++;return[C[M],I[M]]}(d,u);!m||!p||(!h.hasContent(m,{ignoreMarkers:!0})&&h.hasContent(p,{ignoreMarkers:!0})?Ng(l,d,u,m.parent):Tg(l,d,u,m.parent))}(r,a,c),i.removeDisallowedAttributes(a.parent.getChildren(),r)),Lg(r,t,a),!e.doNotAutoparagraph&&function(l,d){const u=l.checkChild(d,"$text"),h=l.checkChild(d,"paragraph");return!u&&h}(i,a)&&Pg(r,a,t,s),a.detach(),c.detach()})}function Tg(o,t,e,n){const i=t.parent,r=e.parent;if(i!=n&&r!=n){for(t=o.createPositionAfter(i),(e=o.createPositionBefore(r)).isEqual(t)||o.insert(r,t),o.merge(t);e.parent.isEmpty;){const s=e.parent;e=o.createPositionBefore(s),o.remove(s)}ud(o.model.schema,t,e)&&Tg(o,t,e,n)}}function Ng(o,t,e,n){const i=t.parent,r=e.parent;if(i!=n&&r!=n){for(t=o.createPositionAfter(i),(e=o.createPositionBefore(r)).isEqual(t)||o.insert(i,e);t.parent.isEmpty;){const s=t.parent;t=o.createPositionBefore(s),o.remove(s)}e=o.createPositionBefore(r),function(s,a){const c=a.nodeBefore,l=a.nodeAfter;c.name!=l.name&&s.rename(c,l.name),s.clearAttributes(c),s.setAttributes(Object.fromEntries(l.getAttributes()),c),s.merge(a)}(o,e),ud(o.model.schema,t,e)&&Ng(o,t,e,n)}}function ud(o,t,e){const n=t.parent,i=e.parent;return n!=i&&!o.isLimit(n)&&!o.isLimit(i)&&function(r,s,a){const c=new N(r,s);for(const l of c.getWalker())if(a.isLimit(l.item))return!1;return!0}(t,e,o)}function Pg(o,t,e,n={}){const i=o.createElement("paragraph");o.model.schema.setAllowedAttributes(i,n,o),o.insert(i,t),Lg(o,e,o.createPositionAt(i,0))}function Lg(o,t,e){t instanceof ve?o.setSelection(e):t.setTo(e)}function zg(o,t){const e=[];Array.from(o.getItems({direction:"backward"})).map(n=>t.createRangeOn(n)).filter(n=>(n.start.isAfter(o.start)||n.start.isEqual(o.start))&&(n.end.isBefore(o.end)||n.end.isEqual(o.end))).forEach(n=>{e.push(n.start.parent),t.remove(n)}),e.forEach(n=>{let i=n;for(;i.parent&&i.isEmpty;){const r=t.createRangeOn(i);i=i.parent,t.remove(r)}})}class oC{constructor(t,e,n){this._firstNode=null,this._lastNode=null,this._lastAutoParagraph=null,this._filterAttributesOf=[],this._affectedStart=null,this._affectedEnd=null,this._nodeToSelect=null,this.model=t,this.writer=e,this.position=n,this.canMergeWith=new Set([this.position.parent]),this.schema=t.schema,this._documentFragment=e.createDocumentFragment(),this._documentFragmentPosition=e.createPositionAt(this._documentFragment,0)}handleNodes(t){for(const e of Array.from(t))this._handleNode(e);this._insertPartialFragment(),this._lastAutoParagraph&&this._updateLastNodeFromAutoParagraph(this._lastAutoParagraph),this._mergeOnRight(),this.schema.removeDisallowedAttributes(this._filterAttributesOf,this.writer),this._filterAttributesOf=[]}_updateLastNodeFromAutoParagraph(t){const e=this.writer.createPositionAfter(this._lastNode),n=this.writer.createPositionAfter(t);if(n.isAfter(e)){if(this._lastNode=t,this.position.parent!=t||!this.position.isAtEnd)throw new E("insertcontent-invalid-insertion-position",this);this.position=n,this._setAffectedBoundaries(this.position)}}getSelectionRange(){return this._nodeToSelect?N._createOn(this._nodeToSelect):this.model.schema.getNearestSelectionRange(this.position)}getAffectedRange(){return this._affectedStart?new N(this._affectedStart,this._affectedEnd):null}destroy(){this._affectedStart&&this._affectedStart.detach(),this._affectedEnd&&this._affectedEnd.detach()}_handleNode(t){this._checkAndSplitToAllowedPosition(t)?(this._appendToFragment(t),this._firstNode||(this._firstNode=t),this._lastNode=t):this.schema.isObject(t)||this._handleDisallowedNode(t)}_insertPartialFragment(){if(this._documentFragment.isEmpty)return;const t=Rt.fromPosition(this.position,"toNext");this._setAffectedBoundaries(this.position),this._documentFragment.getChild(0)==this._firstNode&&(this.writer.insert(this._firstNode,this.position),this._mergeOnLeft(),this.position=t.toPosition()),this._documentFragment.isEmpty||this.writer.insert(this._documentFragment,this.position),this._documentFragmentPosition=this.writer.createPositionAt(this._documentFragment,0),this.position=t.toPosition(),t.detach()}_handleDisallowedNode(t){t.is("element")&&this.handleNodes(t.getChildren())}_appendToFragment(t){if(!this.schema.checkChild(this.position,t))throw new E("insertcontent-wrong-position",this,{node:t,position:this.position});this.writer.insert(t,this._documentFragmentPosition),this._documentFragmentPosition=this._documentFragmentPosition.getShiftedBy(t.offsetSize),this.schema.isObject(t)&&!this.schema.checkChild(this.position,"$text")?this._nodeToSelect=t:this._nodeToSelect=null,this._filterAttributesOf.push(t)}_setAffectedBoundaries(t){this._affectedStart||(this._affectedStart=Rt.fromPosition(t,"toPrevious")),this._affectedEnd&&!this._affectedEnd.isBefore(t)||(this._affectedEnd&&this._affectedEnd.detach(),this._affectedEnd=Rt.fromPosition(t,"toNext"))}_mergeOnLeft(){const t=this._firstNode;if(!(t instanceof ht)||!this._canMergeLeft(t))return;const e=Rt._createBefore(t);e.stickiness="toNext";const n=Rt.fromPosition(this.position,"toNext");this._affectedStart.isEqual(e)&&(this._affectedStart.detach(),this._affectedStart=Rt._createAt(e.nodeBefore,"end","toPrevious")),this._firstNode===this._lastNode&&(this._firstNode=e.nodeBefore,this._lastNode=e.nodeBefore),this.writer.merge(e),e.isEqual(this._affectedEnd)&&this._firstNode===this._lastNode&&(this._affectedEnd.detach(),this._affectedEnd=Rt._createAt(e.nodeBefore,"end","toNext")),this.position=n.toPosition(),n.detach(),this._filterAttributesOf.push(this.position.parent),e.detach()}_mergeOnRight(){const t=this._lastNode;if(!(t instanceof ht)||!this._canMergeRight(t))return;const e=Rt._createAfter(t);if(e.stickiness="toNext",!this.position.isEqual(e))throw new E("insertcontent-invalid-insertion-position",this);this.position=R._createAt(e.nodeBefore,"end");const n=Rt.fromPosition(this.position,"toPrevious");this._affectedEnd.isEqual(e)&&(this._affectedEnd.detach(),this._affectedEnd=Rt._createAt(e.nodeBefore,"end","toNext")),this._firstNode===this._lastNode&&(this._firstNode=e.nodeBefore,this._lastNode=e.nodeBefore),this.writer.merge(e),e.getShiftedBy(-1).isEqual(this._affectedStart)&&this._firstNode===this._lastNode&&(this._affectedStart.detach(),this._affectedStart=Rt._createAt(e.nodeBefore,0,"toPrevious")),this.position=n.toPosition(),n.detach(),this._filterAttributesOf.push(this.position.parent),e.detach()}_canMergeLeft(t){const e=t.previousSibling;return e instanceof ht&&this.canMergeWith.has(e)&&this.model.schema.checkMerge(e,t)}_canMergeRight(t){const e=t.nextSibling;return e instanceof ht&&this.canMergeWith.has(e)&&this.model.schema.checkMerge(t,e)}_insertAutoParagraph(){this._insertPartialFragment();const t=this.writer.createElement("paragraph");this.writer.insert(t,this.position),this._setAffectedBoundaries(this.position),this._lastAutoParagraph=t,this.position=this.writer.createPositionAt(t,0)}_checkAndSplitToAllowedPosition(t){const e=this._getAllowedIn(this.position.parent,t);if(!e)return!1;for(e!=this.position.parent&&this._insertPartialFragment();e!=this.position.parent;)if(this.position.isAtStart){const n=this.position.parent;this.position=this.writer.createPositionBefore(n),n.isEmpty&&n.parent===e&&this.writer.remove(n)}else if(this.position.isAtEnd)this.position=this.writer.createPositionAfter(this.position.parent);else{const n=this.writer.createPositionAfter(this.position.parent);this._setAffectedBoundaries(this.position),this.writer.split(this.position),this.position=n,this.canMergeWith.add(this.position.nodeAfter)}return this.schema.checkChild(this.position.parent,t)||this._insertAutoParagraph(),!0}_getAllowedIn(t,e){return this.schema.checkChild(t,e)||this.schema.checkChild(t,"paragraph")&&this.schema.checkChild("paragraph",e)?t:this.schema.isLimit(t)?null:this._getAllowedIn(t.parent,e)}}function rC(o,t,e,n={}){if(!o.schema.isObject(t))throw new E("insertobject-element-not-an-object",o,{object:t});const i=e||o.document.selection;let r=i;n.findOptimalPosition&&o.schema.isBlock(t)&&(r=o.createSelection(o.schema.findOptimalInsertionRange(i,n.findOptimalPosition)));const s=Lt(i.getSelectedBlocks()),a={};return s&&Object.assign(a,o.schema.getAttributesWithProperty(s,"copyOnReplace",!0)),o.change(c=>{r.isCollapsed||o.deleteContent(r,{doNotAutoparagraph:!0});let l=t;const d=r.anchor.parent;!o.schema.checkChild(d,t)&&o.schema.checkChild(d,"paragraph")&&o.schema.checkChild("paragraph",t)&&(l=c.createElement("paragraph"),c.insert(t,l)),o.schema.setAllowedAttributes(l,a,c);const u=o.insertContent(l,r);return u.isCollapsed||n.setSelection&&function(h,m,p,f){const b=h.model;if(p=="on")return void h.setSelection(m,"on");if(p!="after")throw new E("insertobject-invalid-place-parameter-value",b);let C=m.nextSibling;if(b.schema.isInline(m))return void h.setSelection(m,"after");!(C&&b.schema.checkChild(C,"$text"))&&b.schema.checkChild(m.parent,"paragraph")&&(C=h.createElement("paragraph"),b.schema.setAllowedAttributes(C,f,h),b.insertContent(C,h.createPositionAfter(m))),C&&h.setSelection(C,0)}(c,t,n.setSelection,a),u})}function sC(o,t){const{isForward:e,walker:n,unit:i,schema:r,treatEmojiAsSingleUnit:s}=o,{type:a,item:c,nextPosition:l}=t;if(a=="text")return o.unit==="word"?function(d,u){let h=d.position.textNode;for(h||(h=u?d.position.nodeAfter:d.position.nodeBefore);h&&h.is("$text");){const m=d.position.offset-h.startOffset;if(lC(h,m,u))h=u?d.position.nodeAfter:d.position.nodeBefore;else{if(cC(h.data,m,u))break;d.next()}}return d.position}(n,e):function(d,u,h){const m=d.position.textNode;if(m){const p=m.data;let f=d.position.offset-m.startOffset;for(;Ml(p,f)||u=="character"&&Bl(p,f)||h&&Hh(p,f);)d.next(),f=d.position.offset-m.startOffset}return d.position}(n,i,s);if(a==(e?"elementStart":"elementEnd")){if(r.isSelectable(c))return R._createAt(c,e?"after":"before");if(r.checkChild(l,"$text"))return l}else{if(r.isLimit(c))return void n.skip(()=>!0);if(r.checkChild(l,"$text"))return l}}function aC(o,t){const e=o.root,n=R._createAt(e,t?"end":0);return t?new N(o,n):new N(n,o)}function cC(o,t,e){const n=t+(e?0:-1);return' ,.?!:;"-()'.includes(o.charAt(n))}function lC(o,t,e){return t===(e?o.offsetSize:0)}class dC extends gt(){constructor(){super(),this.markers=new X_,this.document=new J_(this),this.schema=new E_,this._pendingChanges=[],this._currentWriter=null,["deleteContent","modifySelection","getSelectedContent","applyOperation"].forEach(t=>this.decorate(t)),this.on("applyOperation",(t,e)=>{e[0]._validate()},{priority:"highest"}),this.schema.register("$root",{isLimit:!0}),this.schema.register("$container",{allowIn:["$root","$container"]}),this.schema.register("$block",{allowIn:["$root","$container"],isBlock:!0}),this.schema.register("$blockObject",{allowWhere:"$block",isBlock:!0,isObject:!0}),this.schema.register("$inlineObject",{allowWhere:"$text",allowAttributesOf:"$text",isInline:!0,isObject:!0}),this.schema.register("$text",{allowIn:"$block",isInline:!0,isContent:!0}),this.schema.register("$clipboardHolder",{allowContentOf:"$root",allowChildren:"$text",isLimit:!0}),this.schema.register("$documentFragment",{allowContentOf:"$root",allowChildren:"$text",isLimit:!0}),this.schema.register("$marker"),this.schema.addChildCheck(()=>!0,"$marker"),v_(this),this.document.registerPostFixer(ig),this.on("insertContent",(t,[e,n])=>{t.return=function(i,r,s){return i.change(a=>{const c=s||i.document.selection;c.isCollapsed||i.deleteContent(c,{doNotAutoparagraph:!0});const l=new oC(i,a,c.anchor),d=[];let u;if(r.is("documentFragment")){if(r.markers.size){const p=[];for(const[f,b]of r.markers){const{start:C,end:I}=b,M=C.isEqual(I);p.push({position:C,name:f,isCollapsed:M},{position:I,name:f,isCollapsed:M})}p.sort(({position:f},{position:b})=>f.isBefore(b)?1:-1);for(const{position:f,name:b,isCollapsed:C}of p){let I=null,M=null;const P=f.parent===r&&f.isAtStart,K=f.parent===r&&f.isAtEnd;P||K?C&&(M=P?"start":"end"):(I=a.createElement("$marker"),a.insert(I,f)),d.push({name:b,element:I,collapsed:M})}}u=r.getChildren()}else u=[r];l.handleNodes(u);let h=l.getSelectionRange();if(r.is("documentFragment")&&d.length){const p=h?$t.fromRange(h):null,f={};for(let b=d.length-1;b>=0;b--){const{name:C,element:I,collapsed:M}=d[b],P=!f[C];if(P&&(f[C]=[]),I){const K=a.createPositionAt(I,"before");f[C].push(K),a.remove(I)}else{const K=l.getAffectedRange();if(!K){M&&f[C].push(l.position);continue}M?f[C].push(K[M]):f[C].push(P?K.start:K.end)}}for(const[b,[C,I]]of Object.entries(f))C&&I&&C.root===I.root&&C.root.document&&!a.model.markers.has(b)&&a.addMarker(b,{usingOperation:!0,affectsData:!0,range:new N(C,I)});p&&(h=p.toRange(),p.detach())}h&&(c instanceof ve?a.setSelection(h):c.setTo(h));const m=l.getAffectedRange()||i.createRange(c.anchor);return l.destroy(),m})}(this,e,n)}),this.on("insertObject",(t,[e,n,i])=>{t.return=rC(this,e,n,i)}),this.on("canEditAt",t=>{const e=!this.document.isReadOnly;t.return=e,e||t.stop()})}change(t){try{return this._pendingChanges.length===0?(this._pendingChanges.push({batch:new $n,callback:t}),this._runPendingChanges()[0]):t(this._currentWriter)}catch(e){E.rethrowUnexpectedError(e,this)}}enqueueChange(t,e){try{t?typeof t=="function"?(e=t,t=new $n):t instanceof $n||(t=new $n(t)):t=new $n,this._pendingChanges.push({batch:t,callback:e}),this._pendingChanges.length==1&&this._runPendingChanges()}catch(n){E.rethrowUnexpectedError(n,this)}}applyOperation(t){t._execute()}insertContent(t,e,n,...i){const r=hd(e,n);return this.fire("insertContent",[t,r,n,...i])}insertObject(t,e,n,i,...r){const s=hd(e,n);return this.fire("insertObject",[t,s,i,i,...r])}deleteContent(t,e){iC(this,t,e)}modifySelection(t,e){(function(n,i,r={}){const s=n.schema,a=r.direction!="backward",c=r.unit?r.unit:"character",l=!!r.treatEmojiAsSingleUnit,d=i.focus,u=new Re({boundaries:aC(d,a),singleCharacters:!0,direction:a?"forward":"backward"}),h={walker:u,schema:s,isForward:a,unit:c,treatEmojiAsSingleUnit:l};let m;for(;m=u.next();){if(m.done)return;const p=sC(h,m.value);if(p)return void(i instanceof ve?n.change(f=>{f.setSelectionFocus(p)}):i.setFocus(p))}})(this,t,e)}getSelectedContent(t){return function(e,n){return e.change(i=>{const r=i.createDocumentFragment(),s=n.getFirstRange();if(!s||s.isCollapsed)return r;const a=s.start.root,c=s.start.getCommonPath(s.end),l=a.getNodeByPath(c);let d;d=s.start.parent==s.end.parent?s:i.createRange(i.createPositionAt(l,s.start.path[c.length]),i.createPositionAt(l,s.end.path[c.length]+1));const u=d.end.offset-d.start.offset;for(const h of d.getItems({shallow:!0}))h.is("$textProxy")?i.appendText(h.data,h.getAttributes(),r):i.append(i.cloneElement(h,!0),r);if(d!=s){const h=s._getTransformedByMove(d.start,i.createPositionAt(r,0),u)[0],m=i.createRange(i.createPositionAt(r,0),h.start);zg(i.createRange(h.end,i.createPositionAt(r,"end")),i),zg(m,i)}return r})}(this,t)}hasContent(t,e={}){const n=t instanceof N?t:N._createIn(t);if(n.isCollapsed)return!1;const{ignoreWhitespaces:i=!1,ignoreMarkers:r=!1}=e;if(!r){for(const s of this.markers.getMarkersIntersectingRange(n))if(s.affectsData)return!0}for(const s of n.getItems())if(this.schema.isContent(s)&&(!s.is("$textProxy")||!i||s.data.search(/\S/)!==-1))return!0;return!1}canEditAt(t){const e=hd(t);return this.fire("canEditAt",[e])}createPositionFromPath(t,e,n){return new R(t,e,n)}createPositionAt(t,e){return R._createAt(t,e)}createPositionAfter(t){return R._createAfter(t)}createPositionBefore(t){return R._createBefore(t)}createRange(t,e){return new N(t,e)}createRangeIn(t){return N._createIn(t)}createRangeOn(t){return N._createOn(t)}createSelection(...t){return new ie(...t)}createBatch(t){return new $n(t)}createOperationFromJSON(t){return U_.fromJSON(t,this.document)}destroy(){this.document.destroy(),this.stopListening()}_runPendingChanges(){const t=[];this.fire("_beforeChanges");try{for(;this._pendingChanges.length;){const e=this._pendingChanges[0].batch;this._currentWriter=new eC(this,e);const n=this._pendingChanges[0].callback(this._currentWriter);t.push(n),this.document._handleChangeBlock(this._currentWriter),this._pendingChanges.shift(),this._currentWriter=null}}finally{this._pendingChanges.length=0,this._currentWriter=null,this.fire("_afterChanges")}return t}}function hd(o,t){if(o)return o instanceof ie||o instanceof ve?o:o instanceof wn?t||t===0?new ie(o,t):o.is("rootElement")?new ie(o,"in"):new ie(o,"on"):new ie(o)}class uC extends Ze{constructor(){super(...arguments),this.domEventType="click"}onDomEvent(t){this.fire(t.type,t)}}class md extends Ze{constructor(){super(...arguments),this.domEventType=["mousedown","mouseup","mouseover","mouseout"]}onDomEvent(t){this.fire(t.type,t)}}class tn{constructor(t){this.document=t}createDocumentFragment(t){return new fn(this.document,t)}createElement(t,e,n){return new ee(this.document,t,e,n)}createText(t){return new pt(this.document,t)}clone(t,e=!1){return t._clone(e)}appendChild(t,e){return e._appendChild(t)}insertChild(t,e,n){return n._insertChild(t,e)}removeChildren(t,e,n){return n._removeChildren(t,e)}remove(t){const e=t.parent;return e?this.removeChildren(e.getChildIndex(t),1,e):[]}replace(t,e){const n=t.parent;if(n){const i=n.getChildIndex(t);return this.removeChildren(i,1,n),this.insertChild(i,e,n),!0}return!1}unwrapElement(t){const e=t.parent;if(e){const n=e.getChildIndex(t);this.remove(t),this.insertChild(n,t.getChildren(),e)}}rename(t,e){const n=new ee(this.document,t,e.getAttributes(),e.getChildren());return this.replace(e,n)?n:null}setAttribute(t,e,n){n._setAttribute(t,e)}removeAttribute(t,e){e._removeAttribute(t)}addClass(t,e){e._addClass(t)}removeClass(t,e){e._removeClass(t)}setStyle(t,e,n){te(t)&&n===void 0?e._setStyle(t):n._setStyle(t,e)}removeStyle(t,e){e._removeStyle(t)}setCustomProperty(t,e,n){n._setCustomProperty(t,e)}removeCustomProperty(t,e){return e._removeCustomProperty(t)}createPositionAt(t,e){return G._createAt(t,e)}createPositionAfter(t){return G._createAfter(t)}createPositionBefore(t){return G._createBefore(t)}createRange(t,e){return new et(t,e)}createRangeOn(t){return et._createOn(t)}createRangeIn(t){return et._createIn(t)}createSelection(...t){return new Ae(...t)}}class Og{constructor(t){if(this.crashes=[],this.state="initializing",this._now=Date.now,this.crashes=[],this._crashNumberLimit=typeof t.crashNumberLimit=="number"?t.crashNumberLimit:3,this._minimumNonErrorTimePeriod=typeof t.minimumNonErrorTimePeriod=="number"?t.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=e=>{const n="error"in e?e.error:e.reason;n instanceof Error&&this._handleError(n,e)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}destroy(){this._stopErrorHandling(),this._listeners={}}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){this._listeners[t]=this._listeners[t].filter(n=>n!==e)}_fire(t,...e){const n=this._listeners[t]||[];for(const i of n)i.apply(this,[null,...e])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(t,e){if(this._shouldReactToError(t)){this.crashes.push({message:t.message,stack:t.stack,filename:e instanceof ErrorEvent?e.filename:void 0,lineno:e instanceof ErrorEvent?e.lineno:void 0,colno:e instanceof ErrorEvent?e.colno:void 0,date:this._now()});const n=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:t,causesRestart:n}),n?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(t){return t.is&&t.is("CKEditorError")&&t.context!==void 0&&t.context!==null&&this.state==="ready"&&this._isErrorComingFromThisItem(t)}_shouldRestart(){return this.crashes.length<=this._crashNumberLimit?!0:(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}function gd(o,t=new Set){const e=[o],n=new Set;let i=0;for(;e.length>i;){const r=e[i++];if(!n.has(r)&&hC(r)&&!t.has(r))if(n.add(r),Symbol.iterator in r)try{for(const s of r)e.push(s)}catch{}else for(const s in r)s!=="defaultValue"&&e.push(r[s])}return n}function hC(o){const t=Object.prototype.toString.call(o),e=typeof o;return!(e==="number"||e==="boolean"||e==="string"||e==="symbol"||e==="function"||t==="[object Date]"||t==="[object RegExp]"||t==="[object Module]"||o==null||o._watchdogExcluded||o instanceof EventTarget||o instanceof Event)}function Rg(o,t,e=new Set){if(o===t&&typeof(n=o)=="object"&&n!==null)return!0;var n;const i=gd(o,e),r=gd(t,e);for(const s of i)if(r.has(s))return!0;return!1}const Is=function(o,t,e){var n=!0,i=!0;if(typeof o!="function")throw new TypeError("Expected a function");return _t(e)&&(n="leading"in e?!!e.leading:n,i="trailing"in e?!!e.trailing:i),bn(o,t,{leading:n,maxWait:t,trailing:i})};class Fg extends Og{constructor(t,e={}){super(e),this._editor=null,this._lifecyclePromise=null,this._initUsingData=!0,this._editables={},this._throttledSave=Is(this._save.bind(this),typeof e.saveInterval=="number"?e.saveInterval:5e3),t&&(this._creator=(n,i)=>t.create(n,i)),this._destructor=n=>n.destroy()}get editor(){return this._editor}get _item(){return this._editor}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}_restart(){return Promise.resolve().then(()=>(this.state="initializing",this._fire("stateChange"),this._destroy())).catch(t=>{console.error("An error happened during the editor destroying.",t)}).then(()=>{const t={},e=[],n=this._config.rootsAttributes||{},i={};for(const[s,a]of Object.entries(this._data.roots))a.isLoaded?(t[s]="",i[s]=n[s]||{}):e.push(s);const r={...this._config,extraPlugins:this._config.extraPlugins||[],lazyRoots:e,rootsAttributes:i,_watchdogInitialData:this._data};return delete r.initialData,r.extraPlugins.push(mC),this._initUsingData?this.create(t,r,r.context):Ke(this._elementOrData)?this.create(this._elementOrData,r,r.context):this.create(this._editables,r,r.context)}).then(()=>{this._fire("restart")})}create(t=this._elementOrData,e=this._config,n){return this._lifecyclePromise=Promise.resolve(this._lifecyclePromise).then(()=>(super._startErrorHandling(),this._elementOrData=t,this._initUsingData=typeof t=="string"||Object.keys(t).length>0&&typeof Object.values(t)[0]=="string",this._config=this._cloneEditorConfiguration(e)||{},this._config.context=n,this._creator(t,this._config))).then(i=>{this._editor=i,i.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=i.model.document.version,this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this.state="ready",this._fire("stateChange")}).finally(()=>{this._lifecyclePromise=null}),this._lifecyclePromise}destroy(){return this._lifecyclePromise=Promise.resolve(this._lifecyclePromise).then(()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())).finally(()=>{this._lifecyclePromise=null}),this._lifecyclePromise}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling(),this._throttledSave.cancel();const t=this._editor;return this._editor=null,t.model.document.off("change:data",this._throttledSave),this._destructor(t)})}_save(){const t=this._editor.model.document.version;try{this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this._lastDocumentVersion=t}catch(e){console.error(e,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(t){this._excludedProps=t}_getData(){const t=this._editor,e=t.model.document.roots.filter(a=>a.isAttached()&&a.rootName!="$graveyard"),{plugins:n}=t,i=n.has("CommentsRepository")&&n.get("CommentsRepository"),r=n.has("TrackChanges")&&n.get("TrackChanges"),s={roots:{},markers:{},commentThreads:JSON.stringify([]),suggestions:JSON.stringify([])};e.forEach(a=>{s.roots[a.rootName]={content:JSON.stringify(Array.from(a.getChildren())),attributes:JSON.stringify(Array.from(a.getAttributes())),isLoaded:a._isLoaded}});for(const a of t.model.markers)a._affectsData&&(s.markers[a.name]={rangeJSON:a.getRange().toJSON(),usingOperation:a._managedUsingOperations,affectsData:a._affectsData});return i&&(s.commentThreads=JSON.stringify(i.getCommentThreads({toJSON:!0,skipNotAttached:!0}))),r&&(s.suggestions=JSON.stringify(r.getSuggestions({toJSON:!0,skipNotAttached:!0}))),s}_getEditables(){const t={};for(const e of this.editor.model.document.getRootNames()){const n=this.editor.ui.getEditableElement(e);n&&(t[e]=n)}return t}_isErrorComingFromThisItem(t){return Rg(this._editor,t.context,this._excludedProps)}_cloneEditorConfiguration(t){return _l(t,(e,n)=>Ke(e)||n==="context"?e:void 0)}}class mC{constructor(t){this.editor=t,this._data=t.config.get("_watchdogInitialData")}init(){this.editor.data.on("init",t=>{t.stop(),this.editor.model.enqueueChange({isUndoable:!1},e=>{this._restoreCollaborationData(),this._restoreEditorData(e)}),this.editor.data.fire("ready")},{priority:999})}_createNode(t,e){if("name"in e){const n=t.createElement(e.name,e.attributes);if(e.children)for(const i of e.children)n._appendChild(this._createNode(t,i));return n}return t.createText(e.data,e.attributes)}_restoreEditorData(t){const e=this.editor;Object.entries(this._data.roots).forEach(([n,{content:i,attributes:r}])=>{const s=JSON.parse(i),a=JSON.parse(r),c=e.model.document.getRoot(n);for(const[l,d]of a)t.setAttribute(l,d,c);for(const l of s){const d=this._createNode(t,l);t.insert(d,c,"end")}}),Object.entries(this._data.markers).forEach(([n,i])=>{const{document:r}=e.model,{rangeJSON:{start:s,end:a},...c}=i,l=r.getRoot(s.root),d=t.createPositionFromPath(l,s.path,s.stickiness),u=t.createPositionFromPath(l,a.path,a.stickiness),h=t.createRange(d,u);t.addMarker(n,{range:h,...c})})}_restoreCollaborationData(){const t=JSON.parse(this._data.commentThreads),e=JSON.parse(this._data.suggestions);t.forEach(n=>{const i=this.editor.config.get("collaboration.channelId"),r=this.editor.plugins.get("CommentsRepository");r.hasCommentThread(n.threadId)&&r.getCommentThread(n.threadId).remove(),r.addCommentThread({channelId:i,...n})}),e.forEach(n=>{const i=this.editor.plugins.get("TrackChangesEditing");i.hasSuggestion(n.id)?i.getSuggestion(n.id).attributes=n.attributes:i.addSuggestionData(n)})}}const Fi=Symbol("MainQueueId");class gC extends Og{constructor(t,e={}){super(e),this._watchdogs=new Map,this._context=null,this._contextProps=new Set,this._actionQueues=new pC,this._watchdogConfig=e,this._creator=n=>t.create(n),this._destructor=n=>n.destroy(),this._actionQueues.onEmpty(()=>{this.state==="initializing"&&(this.state="ready",this._fire("stateChange"))})}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}get context(){return this._context}create(t={}){return this._actionQueues.enqueue(Fi,()=>(this._contextConfig=t,this._create()))}getItem(t){return this._getWatchdog(t)._item}getItemState(t){return this._getWatchdog(t).state}add(t){const e=jg(t);return Promise.all(e.map(n=>this._actionQueues.enqueue(n.id,()=>{if(this.state==="destroyed")throw new Error("Cannot add items to destroyed watchdog.");if(!this._context)throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");let i;if(this._watchdogs.has(n.id))throw new Error(`Item with the given id is already added: '${n.id}'.`);if(n.type==="editor")return i=new Fg(null,this._watchdogConfig),i.setCreator(n.creator),i._setExcludedProperties(this._contextProps),n.destructor&&i.setDestructor(n.destructor),this._watchdogs.set(n.id,i),i.on("error",(r,{error:s,causesRestart:a})=>{this._fire("itemError",{itemId:n.id,error:s}),a&&this._actionQueues.enqueue(n.id,()=>new Promise(c=>{const l=()=>{i.off("restart",l),this._fire("itemRestart",{itemId:n.id}),c()};i.on("restart",l)}))}),i.create(n.sourceElementOrData,n.config,this._context);throw new Error(`Not supported item type: '${n.type}'.`)})))}remove(t){const e=jg(t);return Promise.all(e.map(n=>this._actionQueues.enqueue(n,()=>{const i=this._getWatchdog(n);return this._watchdogs.delete(n),i.destroy()})))}destroy(){return this._actionQueues.enqueue(Fi,()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy()))}_restart(){return this._actionQueues.enqueue(Fi,()=>(this.state="initializing",this._fire("stateChange"),this._destroy().catch(t=>{console.error("An error happened during destroying the context or items.",t)}).then(()=>this._create()).then(()=>this._fire("restart"))))}_create(){return Promise.resolve().then(()=>(this._startErrorHandling(),this._creator(this._contextConfig))).then(t=>(this._context=t,this._contextProps=gd(this._context),Promise.all(Array.from(this._watchdogs.values()).map(e=>(e._setExcludedProperties(this._contextProps),e.create(void 0,void 0,this._context))))))}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling();const t=this._context;return this._context=null,this._contextProps=new Set,Promise.all(Array.from(this._watchdogs.values()).map(e=>e.destroy())).then(()=>this._destructor(t))})}_getWatchdog(t){const e=this._watchdogs.get(t);if(!e)throw new Error(`Item with the given id was not registered: ${t}.`);return e}_isErrorComingFromThisItem(t){for(const e of this._watchdogs.values())if(e._isErrorComingFromThisItem(t))return!1;return Rg(this._context,t.context)}}class pC{constructor(){this._onEmptyCallbacks=[],this._queues=new Map,this._activeActions=0}onEmpty(t){this._onEmptyCallbacks.push(t)}enqueue(t,e){const n=t===Fi;this._activeActions++,this._queues.get(t)||this._queues.set(t,Promise.resolve());const i=(n?Promise.all(this._queues.values()):Promise.all([this._queues.get(Fi),this._queues.get(t)])).then(e),r=i.catch(()=>{});return this._queues.set(t,r),i.finally(()=>{this._activeActions--,this._queues.get(t)===r&&this._activeActions===0&&this._onEmptyCallbacks.forEach(s=>s())})}}function jg(o){return Array.isArray(o)?o:[o]}class kC{constructor(){this._commands=new Map}add(t,e){this._commands.set(t,e)}get(t){return this._commands.get(t)}execute(t,...e){const n=this.get(t);if(!n)throw new E("commandcollection-command-not-found",this,{commandName:t});return n.execute(...e)}*names(){yield*this._commands.keys()}*commands(){yield*this._commands.values()}[Symbol.iterator](){return this._commands[Symbol.iterator]()}destroy(){for(const t of this.commands())t.destroy()}}class fC extends Ut{constructor(t){super(),this.editor=t}set(t,e,n={}){if(typeof e=="string"){const i=e;e=(r,s)=>{this.editor.execute(i),s()}}super.set(t,e,n)}}const pd="contentEditing",Vg="common";class bC{constructor(t){this.keystrokeInfos=new Map,this._editor=t;const e=t.config.get("menuBar.isVisible"),n=t.locale.t;this.addKeystrokeInfoCategory({id:pd,label:n("Content editing keystrokes"),description:n("These keyboard shortcuts allow for quick access to content editing features.")});const i=[{label:n("Close contextual balloons, dropdowns, and dialogs"),keystroke:"Esc"},{label:n("Open the accessibility help dialog"),keystroke:"Alt+0"},{label:n("Move focus between form fields (inputs, buttons, etc.)"),keystroke:[["Tab"],["Shift+Tab"]]},{label:n("Move focus to the toolbar, navigate between toolbars"),keystroke:"Alt+F10",mayRequireFn:!0},{label:n("Navigate through the toolbar or menu bar"),keystroke:[["arrowup"],["arrowright"],["arrowdown"],["arrowleft"]]},{label:n("Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content."),keystroke:[["Enter"],["Space"]]}];e&&i.push({label:n("Move focus to the menu bar, navigate between menu bars"),keystroke:"Alt+F9",mayRequireFn:!0}),this.addKeystrokeInfoCategory({id:"navigation",label:n("User interface and content navigation keystrokes"),description:n("Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface."),groups:[{id:"common",keystrokes:i}]})}addKeystrokeInfoCategory({id:t,label:e,description:n,groups:i}){this.keystrokeInfos.set(t,{id:t,label:e,description:n,groups:new Map}),this.addKeystrokeInfoGroup({categoryId:t,id:Vg}),i&&i.forEach(r=>{this.addKeystrokeInfoGroup({categoryId:t,...r})})}addKeystrokeInfoGroup({categoryId:t=pd,id:e,label:n,keystrokes:i}){const r=this.keystrokeInfos.get(t);if(!r)throw new E("accessibility-unknown-keystroke-info-category",this._editor,{groupId:e,categoryId:t});r.groups.set(e,{id:e,label:n,keystrokes:i||[]})}addKeystrokeInfos({categoryId:t=pd,groupId:e=Vg,keystrokes:n}){if(!this.keystrokeInfos.has(t))throw new E("accessibility-unknown-keystroke-info-category",this._editor,{categoryId:t,keystrokes:n});const i=this.keystrokeInfos.get(t);if(!i.groups.has(e))throw new E("accessibility-unknown-keystroke-info-group",this._editor,{groupId:e,categoryId:t,keystrokes:n});i.groups.get(e).keystrokes.push(...n)}}const Rr=class Rr extends gt(){constructor(t={}){if(super(),"sanitizeHtml"in t)throw new E("editor-config-sanitizehtml-not-supported");const e=this.constructor,{translations:n,...i}=e.defaultConfig||{},{translations:r=n,...s}=t,a=t.language||i.language;this._context=t.context||new im({language:a,translations:r}),this._context._addEditor(this,!t.context);const c=Array.from(e.builtinPlugins||[]);this.config=new mh(s,i),this.config.define("plugins",c),this.config.define(this._context._getEditorConfig()),this.plugins=new nm(this,c,this._context.plugins),this.locale=this._context.locale,this.t=this.locale.t,this._readOnlyLocks=new Set,this.commands=new kC,this.set("state","initializing"),this.once("ready",()=>this.state="ready",{priority:"high"}),this.once("destroy",()=>this.state="destroyed",{priority:"high"}),this.model=new dC,this.on("change:isReadOnly",()=>{this.model.document.isReadOnly=this.isReadOnly});const l=new g0;this.data=new V_(this.model,l),this.editing=new y_(this.model,l),this.editing.view.document.bind("isReadOnly").to(this),this.conversion=new H_([this.editing.downcastDispatcher,this.data.downcastDispatcher],this.data.upcastDispatcher),this.conversion.addAlias("dataDowncast",this.data.downcastDispatcher),this.conversion.addAlias("editingDowncast",this.editing.downcastDispatcher),this.keystrokes=new fC(this),this.keystrokes.listenTo(this.editing.view.document),this.accessibility=new bC(this)}get isReadOnly(){return this._readOnlyLocks.size>0}set isReadOnly(t){throw new E("editor-isreadonly-has-no-setter")}enableReadOnlyMode(t){if(typeof t!="string"&&typeof t!="symbol")throw new E("editor-read-only-lock-id-invalid",null,{lockId:t});this._readOnlyLocks.has(t)||(this._readOnlyLocks.add(t),this._readOnlyLocks.size===1&&this.fire("change:isReadOnly","isReadOnly",!0,!1))}disableReadOnlyMode(t){if(typeof t!="string"&&typeof t!="symbol")throw new E("editor-read-only-lock-id-invalid",null,{lockId:t});this._readOnlyLocks.has(t)&&(this._readOnlyLocks.delete(t),this._readOnlyLocks.size===0&&this.fire("change:isReadOnly","isReadOnly",!1,!0))}setData(t){this.data.set(t)}getData(t){return this.data.get(t)}initPlugins(){const t=this.config,e=t.get("plugins"),n=t.get("removePlugins")||[],i=t.get("extraPlugins")||[],r=t.get("substitutePlugins")||[];return this.plugins.init(e.concat(i),n,r)}destroy(){let t=Promise.resolve();return this.state=="initializing"&&(t=new Promise(e=>this.once("ready",e))),t.then(()=>{this.fire("destroy"),this.stopListening(),this.commands.destroy()}).then(()=>this.plugins.destroy()).then(()=>{this.model.destroy(),this.data.destroy(),this.editing.destroy(),this.keystrokes.destroy()}).then(()=>this._context._removeEditor(this))}execute(t,...e){try{return this.commands.execute(t,...e)}catch(n){E.rethrowUnexpectedError(n,this)}}focus(){this.editing.view.focus()}static create(...t){throw new Error("This is an abstract method.")}};Rr.Context=im,Rr.EditorWatchdog=Fg,Rr.ContextWatchdog=gC;let kd=Rr;function fd(o){return class extends o{updateSourceElement(t){if(!this.sourceElement)throw new E("editor-missing-sourceelement",this);const e=this.config.get("updateSourceElementOnDestroy"),n=this.sourceElement instanceof HTMLTextAreaElement;if(!e&&!n)return void vh(this.sourceElement,"");const i=typeof t=="string"?t:this.data.get();vh(this.sourceElement,i)}}}fd.updateSourceElement=fd(Object).prototype.updateSourceElement;class Hg extends cs{static get pluginName(){return"PendingActions"}static get isOfficialPlugin(){return!0}init(){this.set("hasAny",!1),this._actions=new fe({idProperty:"_id"}),this._actions.delegate("add","remove").to(this)}add(t){if(typeof t!="string")throw new E("pendingactions-add-invalid-message",this);const e=new(gt());return e.set("message",t),this._actions.add(e),this.hasAny=!0,e}remove(t){this._actions.remove(t),this.hasAny=!!this._actions.length}get first(){return this._actions.get(0)}[Symbol.iterator](){return this._actions[Symbol.iterator]()}}const Q={bold:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/></svg>',cancel:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.591 10.177 4.243 4.242a1 1 0 0 1-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 0 1-1.414-1.415l4.243-4.242L4.52 5.934A1 1 0 0 1 5.934 4.52l4.243 4.243 4.242-4.243a1 1 0 1 1 1.415 1.414l-4.243 4.243z"/></svg>',caption:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 16h9a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z"/><path d="M17 1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H3a.5.5 0 0 0-.492.41L2.5 3v9a.5.5 0 0 0 .41.492L3 12.5h14a.5.5 0 0 0 .492-.41L17.5 12V3a.5.5 0 0 0-.41-.492L17 2.5z" fill-opacity=".6"/></svg>',check:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"/></svg>',cog:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.333 2 .19 2.263a5.899 5.899 0 0 1 1.458.604L14.714 3.4 16.6 5.286l-1.467 1.733c.263.452.468.942.605 1.46L18 8.666v2.666l-2.263.19a5.899 5.899 0 0 1-.604 1.458l1.467 1.733-1.886 1.886-1.733-1.467a5.899 5.899 0 0 1-1.46.605L11.334 18H8.667l-.19-2.263a5.899 5.899 0 0 1-1.458-.604L5.286 16.6 3.4 14.714l1.467-1.733a5.899 5.899 0 0 1-.604-1.458L2 11.333V8.667l2.262-.189a5.899 5.899 0 0 1 .605-1.459L3.4 5.286 5.286 3.4l1.733 1.467a5.899 5.899 0 0 1 1.46-.605L8.666 2h2.666zM10 6.267a3.733 3.733 0 1 0 0 7.466 3.733 3.733 0 0 0 0-7.466z"/></svg>',colorPalette:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.209 18.717A8.5 8.5 0 1 1 18.686 9.6h-.008l.002.12a3 3 0 0 1-2.866 2.997h-.268l-.046-.002v.002h-4.791a2 2 0 1 0 0 4 1 1 0 1 1-.128 1.992 8.665 8.665 0 0 1-.372.008Zm-3.918-7.01a1.25 1.25 0 1 0-2.415-.648 1.25 1.25 0 0 0 2.415.647ZM5.723 8.18a1.25 1.25 0 1 0 .647-2.414 1.25 1.25 0 0 0-.647 2.414ZM9.76 6.155a1.25 1.25 0 1 0 .647-2.415 1.25 1.25 0 0 0-.647 2.415Zm4.028 1.759a1.25 1.25 0 1 0 .647-2.415 1.25 1.25 0 0 0-.647 2.415Z"/></svg>',eraser:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m8.636 9.531-2.758 3.94a.5.5 0 0 0 .122.696l3.224 2.284h1.314l2.636-3.736L8.636 9.53zm.288 8.451L5.14 15.396a2 2 0 0 1-.491-2.786l6.673-9.53a2 2 0 0 1 2.785-.49l3.742 2.62a2 2 0 0 1 .491 2.785l-7.269 10.053-2.147-.066z"/><path d="M4 18h5.523v-1H4zm-2 0h1v-1H2z"/></svg>',history:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 1a9 9 0 1 1-8.027 13.075l1.128-1.129A7.502 7.502 0 0 0 18.5 10a7.5 7.5 0 1 0-14.962.759l-.745-.746-.76.76A9 9 0 0 1 11 1z"/><path d="M.475 8.17a.75.75 0 0 1 .978.047l.075.082 1.284 1.643 1.681-1.284a.75.75 0 0 1 .978.057l.073.083a.75.75 0 0 1-.057.978l-.083.073-2.27 1.737a.75.75 0 0 1-.973-.052l-.074-.082-1.741-2.23a.75.75 0 0 1 .13-1.052z"/><path d="M11.5 5v4.999l3.196 3.196-1.06 1.06L10.1 10.72l-.1-.113V5z"/></svg>',image:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.66 9.118a.693.693 0 0 1 .956.032l3.65 3.411 2.422-2.238a.695.695 0 0 1 .945 0L17.5 13.6V2.5h-15v11.1l4.16-4.482ZM17.8 1c.652 0 1.2.47 1.2 1.1v14.362c0 .64-.532 1.038-1.184 1.038H2.184C1.532 17.5 1 17.103 1 16.462V2.1C1 1.47 1.537 1 2.2 1h15.6Zm-5.655 6a2.128 2.128 0 0 1 .157-2.364A2.133 2.133 0 1 1 12.145 7Z"/></svg>',imageUpload:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.201 1C.538 1 0 1.47 0 2.1v14.363c0 .64.534 1.037 1.186 1.037h9.494a2.97 2.97 0 0 1-.414-.287 2.998 2.998 0 0 1-1.055-2.03 3.003 3.003 0 0 1 .693-2.185l.383-.455-.02.018-3.65-3.41a.695.695 0 0 0-.957-.034L1.5 13.6V2.5h15v5.535a2.97 2.97 0 0 1 1.412.932l.088.105V2.1c0-.63-.547-1.1-1.2-1.1H1.202Zm11.713 2.803a2.146 2.146 0 0 0-2.049 1.992 2.14 2.14 0 0 0 1.28 2.096 2.13 2.13 0 0 0 2.644-3.11 2.134 2.134 0 0 0-1.875-.978Z"/><path d="M15.522 19.1a.79.79 0 0 0 .79-.79v-5.373l2.059 2.455a.79.79 0 1 0 1.211-1.015l-3.352-3.995a.79.79 0 0 0-.995-.179.784.784 0 0 0-.299.221l-3.35 3.99a.79.79 0 1 0 1.21 1.017l1.936-2.306v5.185c0 .436.353.79.79.79Z"/><path d="M15.522 19.1a.79.79 0 0 0 .79-.79v-5.373l2.059 2.455a.79.79 0 1 0 1.211-1.015l-3.352-3.995a.79.79 0 0 0-.995-.179.784.784 0 0 0-.299.221l-3.35 3.99a.79.79 0 1 0 1.21 1.017l1.936-2.306v5.185c0 .436.353.79.79.79Z"/></svg>',imageAssetManager:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.201 1c-.662 0-1.2.47-1.2 1.1v14.248c0 .64.533 1.152 1.185 1.152h6.623v-7.236L6.617 9.15a.694.694 0 0 0-.957-.033L1.602 13.55V2.553l14.798.003V9.7H18V2.1c0-.63-.547-1.1-1.2-1.1H1.202Zm11.723 2.805a2.094 2.094 0 0 0-1.621.832 2.127 2.127 0 0 0 1.136 3.357 2.13 2.13 0 0 0 2.611-1.506 2.133 2.133 0 0 0-.76-2.244 2.13 2.13 0 0 0-1.366-.44Z"/><path clip-rule="evenodd" d="M19.898 12.369v6.187a.844.844 0 0 1-.844.844h-8.719a.844.844 0 0 1-.843-.844v-7.312a.844.844 0 0 1 .843-.844h2.531a.843.843 0 0 1 .597.248l.838.852h4.75c.223 0 .441.114.6.272a.844.844 0 0 1 .247.597Zm-1.52.654-4.377.02-1.1-1.143H11v6h7.4l-.023-4.877Z"/></svg>',imageUrl:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M1.201 1C.538 1 0 1.47 0 2.1v14.363c0 .64.534 1.037 1.186 1.037h7.029a5.401 5.401 0 0 1 .615-4.338l.762-1.232-2.975-2.78a.696.696 0 0 0-.957-.033L1.5 13.6V2.5h15v6.023c.449.131.887.32 1.307.573l.058.033c.046.028.09.057.135.086V2.1c0-.63-.547-1.1-1.2-1.1H1.202Zm11.713 2.803a2.15 2.15 0 0 0-1.611.834 2.118 2.118 0 0 0-.438 1.158 2.14 2.14 0 0 0 1.277 2.096 2.132 2.132 0 0 0 2.645-3.11 2.13 2.13 0 0 0-1.873-.978Z"/><path d="M16.63 10.294a3.003 3.003 0 0 0-4.142.887l-.117.177a.647.647 0 0 0-.096.492.664.664 0 0 0 .278.418.7.7 0 0 0 .944-.234 1.741 1.741 0 0 1 2.478-.463 1.869 1.869 0 0 1 .476 2.55.637.637 0 0 0-.071.5.646.646 0 0 0 .309.396.627.627 0 0 0 .869-.19l.027-.041a3.226 3.226 0 0 0-.956-4.492Zm-6.061 3.78-.044.066a3.228 3.228 0 0 0 .82 4.403 3.005 3.005 0 0 0 4.275-.798l.13-.197a.626.626 0 0 0 .092-.475.638.638 0 0 0-.268-.402.713.713 0 0 0-.99.26l-.018.029a1.741 1.741 0 0 1-2.477.461 1.87 1.87 0 0 1-.475-2.55l.029-.047a.647.647 0 0 0 .086-.485.66.66 0 0 0-.275-.408l-.04-.027a.609.609 0 0 0-.845.17Z"/><path d="M15.312 13.925c.24-.36.154-.838-.19-1.067-.346-.23-.82-.124-1.059.236l-1.268 1.907c-.239.36-.153.838.192 1.067.345.23.818.123 1.057-.236l1.268-1.907Z"/></svg>',lowVision:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.085 6.22 2.943 4.078a.75.75 0 1 1 1.06-1.06l2.592 2.59A11.094 11.094 0 0 1 10 5.068c4.738 0 8.578 3.101 8.578 5.083 0 1.197-1.401 2.803-3.555 3.887l1.714 1.713a.75.75 0 0 1-.09 1.138.488.488 0 0 1-.15.084.75.75 0 0 1-.821-.16L6.17 7.304c-.258.11-.51.233-.757.365l6.239 6.24-.006.005.78.78c-.388.094-.78.166-1.174.215l-1.11-1.11h.011L4.55 8.197a7.2 7.2 0 0 0-.665.514l-.112.098 4.897 4.897-.005.006 1.276 1.276a10.164 10.164 0 0 1-1.477-.117l-.479-.479-.009.009-4.863-4.863-.022.031a2.563 2.563 0 0 0-.124.2c-.043.077-.08.158-.108.241a.534.534 0 0 0-.028.133.29.29 0 0 0 .008.072.927.927 0 0 0 .082.226c.067.133.145.26.234.379l3.242 3.365.025.01.59.623c-3.265-.918-5.59-3.155-5.59-4.668 0-1.194 1.448-2.838 3.663-3.93zm7.07.531a4.632 4.632 0 0 1 1.108 5.992l.345.344.046-.018a9.313 9.313 0 0 0 2-1.112c.256-.187.5-.392.727-.613.137-.134.27-.277.392-.431.072-.091.141-.185.203-.286.057-.093.107-.19.148-.292a.72.72 0 0 0 .036-.12.29.29 0 0 0 .008-.072.492.492 0 0 0-.028-.133.999.999 0 0 0-.036-.096 2.165 2.165 0 0 0-.071-.145 2.917 2.917 0 0 0-.125-.2 3.592 3.592 0 0 0-.263-.335 5.444 5.444 0 0 0-.53-.523 7.955 7.955 0 0 0-1.054-.768 9.766 9.766 0 0 0-1.879-.891c-.337-.118-.68-.219-1.027-.301zm-2.85.21-.069.002a.508.508 0 0 0-.254.097.496.496 0 0 0-.104.679.498.498 0 0 0 .326.199l.045.005c.091.003.181.003.272.012a2.45 2.45 0 0 1 2.017 1.513c.024.061.043.125.069.185a.494.494 0 0 0 .45.287h.008a.496.496 0 0 0 .35-.158.482.482 0 0 0 .13-.335.638.638 0 0 0-.048-.219 3.379 3.379 0 0 0-.36-.723 3.438 3.438 0 0 0-2.791-1.543l-.028-.001h-.013z"/></svg>',textAlternative:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.035 1C2.446 1 2 1.54 2 2.098V10.5h1.5v-8h13v8H18V2.098C18 1.539 17.48 1 16.9 1H3.035Zm10.453 2.61a1.885 1.885 0 0 0-1.442.736 1.89 1.89 0 0 0 1.011 2.976 1.903 1.903 0 0 0 2.253-1.114 1.887 1.887 0 0 0-1.822-2.598ZM7.463 8.163a.611.611 0 0 0-.432.154L5.071 10.5h5.119L7.88 8.348a.628.628 0 0 0-.417-.185Zm6.236 1.059a.62.62 0 0 0-.42.164L12.07 10.5h2.969l-.92-1.113a.618.618 0 0 0-.42-.165ZM.91 11.5a.91.91 0 0 0-.91.912v6.877c0 .505.405.91.91.91h18.178a.91.91 0 0 0 .912-.91v-6.877a.908.908 0 0 0-.912-.912H.91ZM3.668 13h1.947l2.135 5.7H5.898l-.28-.946H3.601l-.278.945H1.516L3.668 13Zm4.947 0h1.801v4.3h2.7v1.4h-4.5V13h-.001Zm4.5 0h5.4v1.4h-1.798v4.3h-1.701v-4.3h-1.9V13h-.001Zm-8.517 1.457-.614 2.059h1.262l-.648-2.059Z"/></svg>',loupe:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.68 13.74h-.001l4.209 4.208a1 1 0 1 0 1.414-1.414l-4.267-4.268a6 6 0 1 0-1.355 1.474ZM13 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>',previousArrow:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"/></svg>',nextArrow:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.537 14.813a.888.888 0 1 1-1.254-1.255L10.84 10 7.283 6.442a.888.888 0 1 1 1.254-1.255L12.74 9.39a.888.888 0 0 1-.16 1.382l-4.043 4.042z"/></svg>',importExport:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 4.5 14 0H3v12.673l.868-1.041c.185-.222.4-.402.632-.54V1.5h8v5h5v7.626a2.24 2.24 0 0 1 1.5.822V4.5ZM14 5V2l3.3 3H14Zm-3.692 12.5c.062.105.133.206.213.303L11.52 19H8v-.876a2.243 2.243 0 0 0 1.82-.624h.488Zm7.518-.657a.75.75 0 0 0-1.152-.96L15.5 17.29V12H14v5.29l-1.174-1.408a.75.75 0 0 0-1.152.96l2.346 2.816a.95.95 0 0 0 1.46 0l2.346-2.815Zm-15.056-.38a.75.75 0 0 1-.096-1.056l2.346-2.815a.95.95 0 0 1 1.46 0l2.346 2.815a.75.75 0 1 1-1.152.96L6.5 14.96V20H5v-5.04l-1.174 1.408a.75.75 0 0 1-1.056.096Z"/></svg>',paragraph:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5.5H7v5h3.5a2.5 2.5 0 1 0 0-5zM5 3h6.5v.025a5 5 0 0 1 0 9.95V13H7v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/></svg>',plus:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>',text:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.816 11.5 7.038 4.785 4.261 11.5h5.555Zm.62 1.5H3.641l-1.666 4.028H.312l5.789-14h1.875l5.789 14h-1.663L10.436 13Z"/><path d="m12.09 17-.534-1.292.848-1.971.545 1.319L12.113 17h-.023Zm1.142-5.187.545 1.319L15.5 9.13l1.858 4.316h-3.45l.398.965h3.467L18.887 17H20l-3.873-9h-1.254l-1.641 3.813Z"/></svg>',alignBottom:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m9.239 13.938-2.88-1.663a.75.75 0 0 1 .75-1.3L9 12.067V4.75a.75.75 0 1 1 1.5 0v7.318l1.89-1.093a.75.75 0 0 1 .75 1.3l-2.879 1.663a.752.752 0 0 1-.511.187.752.752 0 0 1-.511-.187zM4.25 17a.75.75 0 1 1 0-1.5h10.5a.75.75 0 0 1 0 1.5H4.25z"/></svg>',alignMiddle:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 11.875a.752.752 0 0 1 .508.184l2.883 1.666a.75.75 0 0 1-.659 1.344l-.091-.044-1.892-1.093.001 4.318a.75.75 0 1 1-1.5 0v-4.317l-1.89 1.092a.75.75 0 0 1-.75-1.3l2.879-1.663a.752.752 0 0 1 .51-.187zM15.25 9a.75.75 0 1 1 0 1.5H4.75a.75.75 0 1 1 0-1.5h10.5zM9.75.375a.75.75 0 0 1 .75.75v4.318l1.89-1.093.092-.045a.75.75 0 0 1 .659 1.344l-2.883 1.667a.752.752 0 0 1-.508.184.752.752 0 0 1-.511-.187L6.359 5.65a.75.75 0 0 1 .75-1.299L9 5.442V1.125a.75.75 0 0 1 .75-.75z"/></svg>',alignTop:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m10.261 7.062 2.88 1.663a.75.75 0 0 1-.75 1.3L10.5 8.933v7.317a.75.75 0 1 1-1.5 0V8.932l-1.89 1.093a.75.75 0 0 1-.75-1.3l2.879-1.663a.752.752 0 0 1 .511-.187.752.752 0 0 1 .511.187zM15.25 4a.75.75 0 1 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h10.5z"/></svg>',alignLeft:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 4c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75z"/></svg>',alignCenter:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm2.286 4c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75z"/></svg>',alignRight:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 3.75a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 8a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 4a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75zm0-8a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75z"/></svg>',alignJustify:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 4c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75z"/></svg>',objectLeft:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zm0-3H18v1.5h-4.5zm0-3H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>',objectCenter:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"/></svg>',objectRight:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2zm0-9h5v1.5H2zm0 3h5v1.5H2zm0 3h5v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>',objectFullWidth:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M18 7v5.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm-1.505.5H3.504V12h12.991V7.5z"/></svg>',objectInline:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>',objectBlockLeft:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>',objectBlockRight:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>',objectSizeCustom:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 20 20"><path d="M.95 1.43a.95.95 0 0 0-.95.95v3.1a.95.95 0 0 0 .95.95h.75v6.3H.95a.95.95 0 0 0-.95.95v3.1a.95.95 0 0 0 .95.95h3.1a.95.95 0 0 0 .95-.95v-.65h1.932l1.539-1.5H5v-.95a.95.95 0 0 0-.95-.95H3.2v-6.3h.85A.95.95 0 0 0 5 5.48v-.55h10v.55a.95.95 0 0 0 .95.95h3.1a.95.95 0 0 0 .95-.95v-3.1a.95.95 0 0 0-.95-.95h-3.1a.95.95 0 0 0-.95.95v1.05H5V2.38a.95.95 0 0 0-.95-.95H.95zm.55 3.5v-2h2v2h-2zm0 9.3v2h2v-2h-2zm15-11.3v2h2v-2h-2z"/><path d="M8.139 20.004v-2.388l7.045-7.048 2.391 2.391-7.046 7.046h-2.39zm11.421-9.101a.64.64 0 0 1-.138.206l-1.165 1.168-2.391-2.391 1.167-1.163a.63.63 0 0 1 .206-.138.635.635 0 0 1 .243-.049.63.63 0 0 1 .449.187l1.491 1.488c.059.059.108.129.138.206s.049.16.049.243a.6.6 0 0 1-.049.243z"/></svg>',objectSizeFull:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.5 17v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM1 15.5v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm0-2v1h-1v-1h1zm-19 0v1H0v-1h1zM14.5 2v1h-1V2h1zm2 0v1h-1V2h1zm2 0v1h-1V2h1zm-8 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm8 0v1h-1V2h1zm-10 0v1h-1V2h1z"/><path d="M18.095 2H1.905C.853 2 0 2.895 0 4v12c0 1.105.853 2 1.905 2h16.19C19.147 18 20 17.105 20 16V4c0-1.105-.853-2-1.905-2zm0 1.5c.263 0 .476.224.476.5v12c0 .276-.213.5-.476.5H1.905a.489.489 0 0 1-.476-.5V4c0-.276.213-.5.476-.5h16.19z"/></svg>',objectSizeLarge:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 16.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1ZM1 15v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 13v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 11v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 9v1H0V9h1Zm19 0v1h-1V9h1ZM1 7v1H0V7h1Zm19 0v1h-1V7h1ZM1 5v1H0V5h1Zm19 0v1h-1V5h1Zm0-2v1h-1V3h1ZM1 3v1H0V3h1Zm13.5-1.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm-8 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm8 0v1h-1v-1h1Zm-10 0v1h-1v-1h1Z"/><path d="M13 5.5H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM13 7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-8A.5.5 0 0 1 2 7h11Z"/></svg>',objectSizeSmall:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 16.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1ZM1 15v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 13v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 11v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 9v1H0V9h1Zm19 0v1h-1V9h1ZM1 7v1H0V7h1Zm19 0v1h-1V7h1ZM1 5v1H0V5h1Zm19 0v1h-1V5h1Zm0-2v1h-1V3h1ZM1 3v1H0V3h1Zm13.5-1.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm-8 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm8 0v1h-1v-1h1Zm-10 0v1h-1v-1h1Z"/><path d="M7 9.5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2ZM7 11a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-4A.5.5 0 0 1 2 11h5Z"/></svg>',objectSizeMedium:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 16.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1ZM1 15v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 13v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 11v1H0v-1h1Zm19 0v1h-1v-1h1ZM1 9v1H0V9h1Zm19 0v1h-1V9h1ZM1 7v1H0V7h1Zm19 0v1h-1V7h1ZM1 5v1H0V5h1Zm19 0v1h-1V5h1Zm0-2v1h-1V3h1ZM1 3v1H0V3h1Zm13.5-1.5v1h-1v-1h1Zm2 0v1h-1v-1h1Zm2 0v1h-1v-1h1Zm-8 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm-2 0v1h-1v-1h1Zm8 0v1h-1v-1h1Zm-10 0v1h-1v-1h1Z"/><path d="M10 7.5H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2ZM10 9a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-6A.5.5 0 0 1 2 9h8Z"/></svg>',pencil:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m7.3 17.37-.061.088a1.518 1.518 0 0 1-.934.535l-4.178.663-.806-4.153a1.495 1.495 0 0 1 .187-1.058l.056-.086L8.77 2.639c.958-1.351 2.803-1.076 4.296-.03 1.497 1.047 2.387 2.693 1.433 4.055L7.3 17.37zM9.14 4.728l-5.545 8.346 3.277 2.294 5.544-8.346L9.14 4.728zM6.07 16.512l-3.276-2.295.53 2.73 2.746-.435zM9.994 3.506 13.271 5.8c.316-.452-.16-1.333-1.065-1.966-.905-.634-1.895-.78-2.212-.328zM8 18.5 9.375 17H19v1.5H8z"/></svg>',pilcrow:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.999 2H15a1 1 0 0 1 0 2h-1.004v13a1 1 0 1 1-2 0V4H8.999v13a1 1 0 1 1-2 0v-7A4 4 0 0 1 3 6a4 4 0 0 1 3.999-4z"/></svg>',quote:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"/></svg>',threeVerticalDots:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="9.5" cy="4.5" r="1.5"/><circle cx="9.5" cy="10.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1.5"/></svg>',dragIndicator:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 3.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M5 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M5 16.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 16.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/></svg>',redo:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m14.958 9.367-2.189 1.837a.75.75 0 0 0 .965 1.149l3.788-3.18a.747.747 0 0 0 .21-.284.75.75 0 0 0-.17-.945L13.77 4.762a.75.75 0 1 0-.964 1.15l2.331 1.955H6.22A.75.75 0 0 0 6 7.9a4 4 0 1 0 1.477 7.718l-.344-1.489A2.5 2.5 0 1 1 6.039 9.4l-.008-.032h8.927z"/></svg>',undo:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z"/></svg>',bulletedList:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0C1 4.784 1.777 4 2.75 4c.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75C1.784 7.5 1 6.723 1 5.75zm6 9c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zm-6 0c0-.966.777-1.75 1.75-1.75.966 0 1.75.777 1.75 1.75 0 .966-.777 1.75-1.75 1.75-.966 0-1.75-.777-1.75-1.75z"/></svg>',numberedList:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.75c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM3.5 3v5H2V3.7H1v-1h2.5V3zM.343 17.857l2.59-3.257H2.92a.6.6 0 1 0-1.04 0H.302a2 2 0 1 1 3.995 0h-.001c-.048.405-.16.734-.333.988-.175.254-.59.692-1.244 1.312H4.3v1h-4l.043-.043zM7 14.75a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"/></svg>',todoList:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m2.315 14.705 2.224-2.24a.689.689 0 0 1 .963 0 .664.664 0 0 1 0 .949L2.865 16.07a.682.682 0 0 1-.112.089.647.647 0 0 1-.852-.051L.688 14.886a.635.635 0 0 1 0-.903.647.647 0 0 1 .91 0l.717.722zm5.185.045a.75.75 0 0 1 .75-.75h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75zM2.329 5.745l2.21-2.226a.689.689 0 0 1 .963 0 .664.664 0 0 1 0 .95L2.865 7.125a.685.685 0 0 1-.496.196.644.644 0 0 1-.468-.187L.688 5.912a.635.635 0 0 1 0-.903.647.647 0 0 1 .91 0l.73.736zM7.5 5.75A.75.75 0 0 1 8.25 5h9.5a.75.75 0 1 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75z"/></svg>',codeBlock:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.87 12.61a.75.75 0 0 1-.089.976l-.085.07-3.154 2.254 3.412 2.414a.75.75 0 0 1 .237.95l-.057.095a.75.75 0 0 1-.95.237l-.096-.058-4.272-3.022-.003-1.223 4.01-2.867a.75.75 0 0 1 1.047.174zm2.795-.231.095.057 4.011 2.867-.003 1.223-4.272 3.022-.095.058a.75.75 0 0 1-.88-.151l-.07-.086-.058-.095a.75.75 0 0 1 .15-.88l.087-.07 3.412-2.414-3.154-2.253-.085-.071a.75.75 0 0 1 .862-1.207zM16 0a2 2 0 0 1 2 2v9.354l-.663-.492-.837-.001V2a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h3.118L7.156 19H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h14zM5.009 15l.003 1H3v-1h2.009zm2.188-2-1.471 1H5v-1h2.197zM10 11v.095L8.668 12H7v-1h3zm4-2v1H7V9h7zm0-2v1H7V7h7zm-4-2v1H5V5h5zM6 3v1H3V3h3z"/></svg>',browseFiles:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.627 16.5zm5.873-.196zm0-7.001V8h-13v8.5h4.341c.191.54.457 1.044.785 1.5H2a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 2 2h4.5a1.5 1.5 0 0 1 1.06.44L9.122 4H16a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 19 8v2.531a6.027 6.027 0 0 0-1.5-1.228zM16 6.5v-1H8.5l-2-2H2v13h1V8a1.5 1.5 0 0 1 1.5-1.5H16z"/><path d="M14.5 19.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM15 14v-2h-1v2h-2v1h2v2h1v-2h2v-1h-2z"/></svg>',heading1:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 9v10h-2v-8h-2V9h4zM4 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V11H4v4.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v4.5z"/></svg>',heading2:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V11H3v4.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H2a1 1 0 0 1 1 1v4.5zm16.076 8.343V18.5h-6.252c.067-.626.27-1.22.61-1.78.338-.561 1.006-1.305 2.005-2.232.804-.749 1.297-1.257 1.479-1.523.245-.368.368-.732.368-1.092 0-.398-.107-.703-.32-.917-.214-.214-.51-.32-.886-.32-.372 0-.669.111-.889.336-.22.224-.347.596-.38 1.117l-1.778-.178c.106-.982.438-1.686.997-2.114.558-.427 1.257-.64 2.095-.64.918 0 1.64.247 2.164.742.525.495.787 1.11.787 1.847 0 .419-.075.818-.225 1.197-.15.378-.388.775-.714 1.19-.216.275-.605.67-1.168 1.187-.563.516-.92.859-1.07 1.028a3.11 3.11 0 0 0-.365.495h3.542z"/></svg>',heading3:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V11H3v4.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H2a1 1 0 0 1 1 1v4.5zm9.989 7.53 1.726-.209c.055.44.203.777.445 1.01.24.232.533.349.876.349.368 0 .678-.14.93-.42.251-.279.377-.655.377-1.13 0-.448-.12-.803-.362-1.066a1.153 1.153 0 0 0-.882-.393c-.228 0-.501.044-.819.133l.197-1.453c.482.012.85-.092 1.105-.315.253-.222.38-.517.38-.885 0-.313-.093-.563-.279-.75-.186-.185-.434-.278-.743-.278a1.07 1.07 0 0 0-.78.317c-.216.212-.347.52-.394.927l-1.644-.28c.114-.562.287-1.012.517-1.348.231-.337.553-.601.965-.794a3.24 3.24 0 0 1 1.387-.289c.876 0 1.579.28 2.108.838.436.457.653.973.653 1.549 0 .817-.446 1.468-1.339 1.955.533.114.96.37 1.28.768.319.398.478.878.478 1.441 0 .817-.298 1.513-.895 2.088-.596.576-1.339.864-2.228.864-.842 0-1.54-.243-2.094-.727-.555-.485-.876-1.118-.965-1.901z"/></svg>',heading4:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V11h-5v4.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v4.5zm13.55 10v-1.873h-3.81v-1.561l4.037-5.91h1.498v5.904h1.156v1.567h-1.156V18.5H17.05zm0-3.44v-3.18l-2.14 3.18h2.14z"/></svg>',heading5:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V11h-5v4.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v4.5zm9.578 7.607 1.777-.184c.05.402.201.72.45.955a1.223 1.223 0 0 0 1.81-.101c.258-.303.387-.759.387-1.368 0-.572-.128-1-.384-1.286-.256-.285-.59-.428-1-.428-.512 0-.971.226-1.377.679l-1.448-.21.915-4.843h4.716v1.67H15.56l-.28 1.58a2.697 2.697 0 0 1 1.219-.298 2.68 2.68 0 0 1 2.012.863c.55.576.825 1.323.825 2.241a3.36 3.36 0 0 1-.666 2.05c-.605.821-1.445 1.232-2.52 1.232-.86 0-1.56-.23-2.101-.692-.542-.461-.866-1.081-.971-1.86z"/></svg>',heading6:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8.5h5V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V11h-5v4.5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v4.5zm15.595 2.973-1.726.19c-.043-.355-.153-.617-.33-.787-.178-.169-.409-.253-.692-.253-.377 0-.695.169-.956.507-.26.339-.424 1.043-.492 2.114.445-.525.997-.787 1.657-.787.745 0 1.383.284 1.914.85.531.568.797 1.3.797 2.197 0 .952-.28 1.716-.838 2.291-.559.576-1.276.864-2.152.864-.94 0-1.712-.365-2.317-1.095-.605-.73-.908-1.927-.908-3.59 0-1.705.316-2.935.946-3.688.63-.753 1.45-1.13 2.457-1.13.706 0 1.291.198 1.755.594.463.395.758.97.885 1.723zm-4.043 3.891c0 .58.133 1.028.4 1.343.266.315.57.473.914.473.33 0 .605-.13.825-.388.22-.258.33-.68.33-1.27 0-.604-.118-1.047-.355-1.329a1.115 1.115 0 0 0-.89-.422c-.342 0-.632.134-.869.403s-.355.666-.355 1.19z"/></svg>',horizontalLine:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 9h16v2H2z"/></svg>',html:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17 0a2 2 0 0 1 2 2v7a1 1 0 0 1 1 1v5a1 1 0 0 1-.883.993l-.118.006L19 17a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2l-.001-1.001-.116-.006A1 1 0 0 1 0 15v-5a1 1 0 0 1 .999-1L1 2a2 2 0 0 1 2-2h14zm.499 15.999h-15L2.5 17a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5l-.001-1.001zm-3.478-6.013-.014.014H14v.007l-1.525 1.525-1.46-1.46-.015.013V10h-1v5h1v-3.53l1.428 1.43.048.043.131-.129L14 11.421V15h1v-5h-.965l-.014-.014zM2 10H1v5h1v-2h2v2h1v-5H4v2H2v-2zm7 0H6v1h1v4h1v-4h1v-1zm8 0h-1v5h3v-1h-2v-4zm0-8.5H3a.5.5 0 0 0-.5.5l-.001 6.999h15L17.5 2a.5.5 0 0 0-.5-.5zM10 7v1H4V7h6zm3-2v1H4V5h9zm-3-2v1H4V3h6z"/></svg>',indent:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zM1.632 6.95 5.02 9.358a.4.4 0 0 1-.013.661l-3.39 2.207A.4.4 0 0 1 1 11.892V7.275a.4.4 0 0 1 .632-.326z"/></svg>',outdent:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm5 6c0 .414.336.75.75.75h9.5a.75.75 0 1 0 0-1.5h-9.5a.75.75 0 0 0-.75.75zM2.75 16.5h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 1 0 0 1.5zm1.618-9.55L.98 9.358a.4.4 0 0 0 .013.661l3.39 2.207A.4.4 0 0 0 5 11.892V7.275a.4.4 0 0 0-.632-.326z"/></svg>',table:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.5v3h4v-3H3Zm0 4v3h4v-3H3Zm0 4v3h4v-3H3Zm5 3h4v-3H8v3Zm5 0h4v-3h-4v3Zm4-4v-3h-4v3h4Zm0-4v-3h-4v3h4Zm1.5 8A1.5 1.5 0 0 1 17 18H3a1.5 1.5 0 0 1-1.5-1.5V3c.222-.863 1.068-1.5 2-1.5h13c.932 0 1.778.637 2 1.5v13.5Zm-6.5-4v-3H8v3h4Zm0-4v-3H8v3h4Z"/></svg>'};var Ss=T(7621),ji={attributes:{"data-cke":!0}};ji.setAttributes=U(),ji.insert=H().bind(null,"head"),ji.domAPI=V(),ji.insertStyleElement=q(),j()(Ss.A,ji),Ss.A&&Ss.A.locals&&Ss.A.locals;const qc=class qc extends J{constructor(){super();const t=this.bindTemplate;this.set("content",""),this.set("viewBox","0 0 20 20"),this.set("fillColor",""),this.set("isColorInherited",!0),this.set("isVisible",!0),this.setTemplate({tag:"svg",ns:"http://www.w3.org/2000/svg",attributes:{class:["ck","ck-icon",t.if("isVisible","ck-hidden",e=>!e),"ck-reset_all-excluded",t.if("isColorInherited","ck-icon_inherit-color")],viewBox:t.to("viewBox")}})}render(){super.render(),this._updateXMLContent(),this._colorFillPaths(),this.on("change:content",()=>{this._updateXMLContent(),this._colorFillPaths()}),this.on("change:fillColor",()=>{this._colorFillPaths()})}_updateXMLContent(){if(this.content){const t=new DOMParser().parseFromString(this.content.trim(),"image/svg+xml").querySelector("svg"),e=t.getAttribute("viewBox");e&&(this.viewBox=e);for(const{name:n,value:i}of Array.from(t.attributes))qc.presentationalAttributeNames.includes(n)&&this.element.setAttribute(n,i);for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);for(;t.childNodes.length>0;)this.element.appendChild(t.childNodes[0])}}_colorFillPaths(){this.fillColor&&this.element.querySelectorAll(".ck-icon__fill").forEach(t=>{t.style.fill=this.fillColor})}};qc.presentationalAttributeNames=["alignment-baseline","baseline-shift","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-rendering","cursor","direction","display","dominant-baseline","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","paint-order","pointer-events","shape-rendering","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-overflow","text-rendering","transform","unicode-bidi","vector-effect","visibility","white-space","word-spacing","writing-mode"];let ue=qc;class Ug extends J{constructor(){super(),this.set({style:void 0,text:void 0,id:void 0});const t=this.bindTemplate;this.setTemplate({tag:"span",attributes:{class:["ck","ck-button__label"],style:t.to("style"),id:t.to("id")},children:[{text:t.to("text")}]})}}var Ms=T(9715),Vi={attributes:{"data-cke":!0}};Vi.setAttributes=U(),Vi.insert=H().bind(null,"head"),Vi.domAPI=V(),Vi.insertStyleElement=q(),j()(Ms.A,Vi),Ms.A&&Ms.A.locals&&Ms.A.locals;class at extends J{constructor(t,e=new Ug){super(t),this._focusDelayed=null;const n=this.bindTemplate,i=se();this.set("_ariaPressed",!1),this.set("_ariaChecked",!1),this.set("ariaLabel",void 0),this.set("ariaLabelledBy",`ck-editor__aria-label_${i}`),this.set("class",void 0),this.set("labelStyle",void 0),this.set("icon",void 0),this.set("isEnabled",!0),this.set("isOn",!1),this.set("isVisible",!0),this.set("isToggleable",!1),this.set("keystroke",void 0),this.set("label",void 0),this.set("role",void 0),this.set("tabindex",-1),this.set("tooltip",!1),this.set("tooltipPosition","s"),this.set("type","button"),this.set("withText",!1),this.set("withKeystroke",!1),this.children=this.createCollection(),this.labelView=this._setupLabelView(e),this.iconView=new ue,this.iconView.extendTemplate({attributes:{class:"ck-button__icon"}}),this.keystrokeView=this._createKeystrokeView(),this.bind("_tooltipString").to(this,"tooltip",this,"label",this,"keystroke",this._getTooltipString.bind(this));const r={tag:"button",attributes:{class:["ck","ck-button",n.to("class"),n.if("isEnabled","ck-disabled",s=>!s),n.if("isVisible","ck-hidden",s=>!s),n.to("isOn",s=>s?"ck-on":"ck-off"),n.if("withText","ck-button_with-text"),n.if("withKeystroke","ck-button_with-keystroke")],role:n.to("role"),type:n.to("type",s=>s||"button"),tabindex:n.to("tabindex"),"aria-checked":n.to("_ariaChecked"),"aria-pressed":n.to("_ariaPressed"),"aria-label":n.to("ariaLabel"),"aria-labelledby":n.to("ariaLabelledBy"),"aria-disabled":n.if("isEnabled",!0,s=>!s),"data-cke-tooltip-text":n.to("_tooltipString"),"data-cke-tooltip-position":n.to("tooltipPosition")},children:this.children,on:{click:n.to(s=>{this.isEnabled?this.fire("execute"):s.preventDefault()})}};this.bind("_ariaPressed").to(this,"isOn",this,"isToggleable",this,"role",(s,a,c)=>!(!a||qg(c))&&String(!!s)),this.bind("_ariaChecked").to(this,"isOn",this,"isToggleable",this,"role",(s,a,c)=>!(!a||!qg(c))&&String(!!s)),v.isSafari&&(this._focusDelayed||(this._focusDelayed=Sl(()=>this.focus(),0)),r.on.mousedown=n.to(()=>{this._focusDelayed()}),r.on.mouseup=n.to(()=>{this._focusDelayed.cancel()})),this.setTemplate(r)}render(){super.render(),this.icon&&(this.iconView.bind("content").to(this,"icon"),this.children.add(this.iconView)),this.children.add(this.labelView),this.withKeystroke&&this.keystroke&&this.children.add(this.keystrokeView)}focus(){this.element.focus()}destroy(){this._focusDelayed&&this._focusDelayed.cancel(),super.destroy()}_setupLabelView(t){return t.bind("text","style","id").to(this,"label","labelStyle","ariaLabelledBy"),t}_createKeystrokeView(){const t=new J;return t.setTemplate({tag:"span",attributes:{class:["ck","ck-button__keystroke"]},children:[{text:this.bindTemplate.to("keystroke",e=>ns(e))}]}),t}_getTooltipString(t,e,n){return t?typeof t=="string"?t:(n&&(n=ns(n)),t instanceof Function?t(e,n):`${e}${n?` (${n})`:""}`):""}}function qg(o){switch(o){case"radio":case"checkbox":case"option":case"switch":case"menuitemcheckbox":case"menuitemradio":return!0;default:return!1}}var Bs=T(7913),Hi={attributes:{"data-cke":!0}};Hi.setAttributes=U(),Hi.insert=H().bind(null,"head"),Hi.domAPI=V(),Hi.insertStyleElement=q(),j()(Bs.A,Hi),Bs.A&&Bs.A.locals&&Bs.A.locals;class wC extends J{constructor(t,e={}){super(t);const n=this.bindTemplate;this.set("label",e.label||""),this.set("class",e.class||null),this.children=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-form__header",n.to("class")]},children:this.children}),e.icon&&(this.iconView=new ue,this.iconView.content=e.icon,this.children.add(this.iconView));const i=new J(t);i.setTemplate({tag:"h2",attributes:{class:["ck","ck-form__header__label"],role:"presentation"},children:[{text:n.to("label")}]}),this.children.add(i)}}class ye extends ut(){constructor(t){if(super(),this.focusables=t.focusables,this.focusTracker=t.focusTracker,this.keystrokeHandler=t.keystrokeHandler,this.actions=t.actions,t.actions&&t.keystrokeHandler)for(const e in t.actions){let n=t.actions[e];typeof n=="string"&&(n=[n]);for(const i of n)t.keystrokeHandler.set(i,(r,s)=>{this[e](),s()},t.keystrokeHandlerOptions)}this.on("forwardCycle",()=>this.focusFirst(),{priority:"low"}),this.on("backwardCycle",()=>this.focusLast(),{priority:"low"})}get first(){return this.focusables.find(bd)||null}get last(){return this.focusables.filter(bd).slice(-1)[0]||null}get next(){return this._getDomFocusableItem(1)}get previous(){return this._getDomFocusableItem(-1)}get current(){let t=null;return this.focusTracker.focusedElement===null?null:(this.focusables.find((e,n)=>{const i=e.element===this.focusTracker.focusedElement;return i&&(t=n),i}),t)}focusFirst(){this._focus(this.first,1)}focusLast(){this._focus(this.last,-1)}focusNext(){const t=this.next;t&&this.focusables.getIndex(t)===this.current||t===this.first?this.fire("forwardCycle"):this._focus(t,1)}focusPrevious(){const t=this.previous;t&&this.focusables.getIndex(t)===this.current||t===this.last?this.fire("backwardCycle"):this._focus(t,-1)}chain(t){const e=()=>this.current===null?null:this.focusables.get(this.current);this.listenTo(t,"forwardCycle",n=>{const i=e();this.focusNext(),i!==e()&&n.stop()},{priority:"low"}),this.listenTo(t,"backwardCycle",n=>{const i=e();this.focusPrevious(),i!==e()&&n.stop()},{priority:"low"})}unchain(t){this.stopListening(t)}_focus(t,e){t&&this.focusTracker.focusedElement!==t.element&&t.focus(e)}_getDomFocusableItem(t){const e=this.focusables.length;if(!e)return null;const n=this.current;if(n===null)return this[t===1?"first":"last"];let i=this.focusables.get(n),r=(n+e+t)%e;do{const s=this.focusables.get(r);if(bd(s)){i=s;break}r=(r+e+t)%e}while(r!==n);return i}}function bd(o){return Ui(o)&&Oe(o.element)}function Ui(o){return!(!("focus"in o)||typeof o.focus!="function")}function AC(o){return class extends o{constructor(...t){super(...t),this._onDragBound=this._onDrag.bind(this),this._onDragEndBound=this._onDragEnd.bind(this),this._lastDraggingCoordinates={x:0,y:0},this.on("render",()=>{this._attachListeners()}),this.set("isDragging",!1)}_attachListeners(){this.listenTo(this.element,"mousedown",this._onDragStart.bind(this)),this.listenTo(this.element,"touchstart",this._onDragStart.bind(this))}_attachDragListeners(){this.listenTo(A.document,"mouseup",this._onDragEndBound),this.listenTo(A.document,"touchend",this._onDragEndBound),this.listenTo(A.document,"mousemove",this._onDragBound),this.listenTo(A.document,"touchmove",this._onDragBound)}_detachDragListeners(){this.stopListening(A.document,"mouseup",this._onDragEndBound),this.stopListening(A.document,"touchend",this._onDragEndBound),this.stopListening(A.document,"mousemove",this._onDragBound),this.stopListening(A.document,"touchmove",this._onDragBound)}_onDragStart(t,e){if(!this._isHandleElementPressed(e))return;this._attachDragListeners();let n=0,i=0;e instanceof MouseEvent?(n=e.clientX,i=e.clientY):(n=e.touches[0].clientX,i=e.touches[0].clientY),this._lastDraggingCoordinates={x:n,y:i},this.isDragging=!0}_onDrag(t,e){if(!this.isDragging)return void this._detachDragListeners();let n=0,i=0;e instanceof MouseEvent?(n=e.clientX,i=e.clientY):(n=e.touches[0].clientX,i=e.touches[0].clientY),e.preventDefault(),this.fire("drag",{deltaX:Math.round(n-this._lastDraggingCoordinates.x),deltaY:Math.round(i-this._lastDraggingCoordinates.y)}),this._lastDraggingCoordinates={x:n,y:i}}_onDragEnd(){this._detachDragListeners(),this.isDragging=!1}_isHandleElementPressed(t){return!!this.dragHandleElement&&(this.dragHandleElement===t.target||t.target instanceof HTMLElement&&this.dragHandleElement.contains(t.target))}}}var Ts=T(9822),qi={attributes:{"data-cke":!0}};qi.setAttributes=U(),qi.insert=H().bind(null,"head"),qi.domAPI=V(),qi.insertStyleElement=q(),j()(Ts.A,qi),Ts.A&&Ts.A.locals&&Ts.A.locals;class _C extends J{constructor(t){super(t),this.children=this.createCollection(),this.keystrokes=new Ut,this._focusTracker=new Bt,this._focusables=new be,this.focusCycler=new ye({focusables:this._focusables,focusTracker:this._focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"div",attributes:{class:["ck","ck-dialog__actions"]},children:this.children})}render(){super.render(),this.keystrokes.listenTo(this.element)}setButtons(t){for(const e of t){const n=new at(this.locale);let i;for(i in n.on("execute",()=>e.onExecute()),e.onCreate&&e.onCreate(n),e)i!="onExecute"&&i!="onCreate"&&n.set(i,e[i]);this.children.add(n)}this._updateFocusCyclableItems()}focus(t){t===-1?this.focusCycler.focusLast():this.focusCycler.focusFirst()}_updateFocusCyclableItems(){Array.from(this.children).forEach(t=>{this._focusables.add(t),this._focusTracker.add(t.element)})}}class CC extends J{constructor(t){super(t),this.children=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-dialog__content"]},children:this.children})}reset(){for(;this.children.length;)this.children.remove(0)}}var Ns=T(9819),Gi={attributes:{"data-cke":!0}};Gi.setAttributes=U(),Gi.insert=H().bind(null,"head"),Gi.domAPI=V(),Gi.insertStyleElement=q(),j()(Ns.A,Gi),Ns.A&&Ns.A.locals&&Ns.A.locals;const Ps="screen-center",Gg="editor-center",vC="editor-top-side",yC="editor-top-center",xC="editor-bottom-center",EC="editor-above-center",DC="editor-below-center",Wg=Fn("px"),Gc=class Gc extends AC(J){constructor(t,{getCurrentDomRoot:e,getViewportOffset:n}){super(t),this.wasMoved=!1;const i=this.bindTemplate,r=t.t;this.set("className",""),this.set("ariaLabel",r("Editor dialog")),this.set("isModal",!1),this.set("position",Ps),this.set("_isVisible",!1),this.set("_isTransparent",!1),this.set("_top",0),this.set("_left",0),this._getCurrentDomRoot=e,this._getViewportOffset=n,this.decorate("moveTo"),this.parts=this.createCollection(),this.keystrokes=new Ut,this.focusTracker=new Bt,this._focusables=new be,this._focusCycler=new ye({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"div",attributes:{class:["ck","ck-dialog-overlay",i.if("isModal","ck-dialog-overlay__transparent",s=>!s),i.if("_isVisible","ck-hidden",s=>!s)],tabindex:"-1"},children:[{tag:"div",attributes:{tabindex:"-1",class:["ck","ck-dialog",i.if("isModal","ck-dialog_modal"),i.to("className")],role:"dialog","aria-label":i.to("ariaLabel"),style:{top:i.to("_top",s=>Wg(s)),left:i.to("_left",s=>Wg(s)),visibility:i.if("_isTransparent","hidden")}},children:this.parts}]})}render(){super.render(),this.keystrokes.set("Esc",(t,e)=>{this.fire("close",{source:"escKeyPress"}),e()}),this.on("drag",(t,{deltaX:e,deltaY:n})=>{this.wasMoved=!0,this.moveBy(e,n)}),this.listenTo(A.window,"resize",()=>{this._isVisible&&!this.wasMoved&&this.updatePosition()}),this.listenTo(A.document,"scroll",()=>{this._isVisible&&!this.wasMoved&&this.updatePosition()}),this.on("change:_isVisible",(t,e,n)=>{n&&(this._isTransparent=!0,setTimeout(()=>{this.updatePosition(),this._isTransparent=!1,this.focus()},10))}),this.keystrokes.listenTo(this.element)}get dragHandleElement(){return this.headerView&&!this.isModal?this.headerView.element:null}setupParts({icon:t,title:e,hasCloseButton:n=!0,content:i,actionButtons:r}){e&&(this.headerView=new wC(this.locale,{icon:t}),n&&(this.closeButtonView=this._createCloseButton(),this.headerView.children.add(this.closeButtonView)),this.headerView.label=e,this.ariaLabel=e,this.parts.add(this.headerView,0)),i&&(i instanceof J&&(i=[i]),this.contentView=new CC(this.locale),this.contentView.children.addMany(i),this.parts.add(this.contentView)),r&&(this.actionsView=new _C(this.locale),this.actionsView.setButtons(r),this.parts.add(this.actionsView)),this._updateFocusCyclableItems()}focus(){this._focusCycler.focusFirst()}moveTo(t,e){const n=this._getViewportRect(),i=this._getDialogRect();t+i.width>n.right&&(t=n.right-i.width),t<n.left&&(t=n.left),e<n.top&&(e=n.top),this._moveTo(t,e)}_moveTo(t,e){this._left=t,this._top=e}moveBy(t,e){this.moveTo(this._left+t,this._top+e)}_moveOffScreen(){this._moveTo(-9999,-9999)}updatePosition(){if(!this.element||!this.element.parentNode)return;const t=this._getViewportRect();let e,n=this.position;this._getCurrentDomRoot()?e=this._getVisibleDomRootRect(t):n=Ps;const i=Gc.defaultOffset,r=this._getDialogRect();switch(n){case vC:if(e){const s=this.locale.contentLanguageDirection==="ltr"?e.right-r.width-i:e.left+i;this.moveTo(s,e.top+i)}else this._moveOffScreen();break;case Gg:e?this.moveTo(Math.round(e.left+e.width/2-r.width/2),Math.round(e.top+e.height/2-r.height/2)):this._moveOffScreen();break;case Ps:this.moveTo(Math.round((t.width-r.width)/2),Math.round((t.height-r.height)/2));break;case yC:e?this.moveTo(Math.round(e.left+e.width/2-r.width/2),e.top+i):this._moveOffScreen();break;case xC:e?this.moveTo(Math.round(e.left+e.width/2-r.width/2),e.bottom-r.height-i):this._moveOffScreen();break;case EC:e?this.moveTo(Math.round(e.left+e.width/2-r.width/2),e.top-r.height-i):this._moveOffScreen();break;case DC:e?this.moveTo(Math.round(e.left+e.width/2-r.width/2),e.bottom+i):this._moveOffScreen()}}_getVisibleDomRootRect(t){let e=new it(this._getCurrentDomRoot()).getVisible();return e?(e=t.getIntersection(e),e||null):null}_getDialogRect(){return new it(this.element.firstElementChild)}_getViewportRect(){const t=new it(A.window);if(this.isModal)return t;const e={top:0,bottom:0,left:0,right:0,...this._getViewportOffset()};return t.top+=e.top,t.height-=e.top,t.bottom-=e.bottom,t.height-=e.bottom,t.left+=e.left,t.right-=e.right,t.width-=e.left+e.right,t}_updateFocusCyclableItems(){const t=[];if(this.contentView)for(const e of this.contentView.children)Ui(e)&&t.push(e);this.actionsView&&t.push(this.actionsView),this.closeButtonView&&t.push(this.closeButtonView),t.forEach(e=>{var n;this._focusables.add(e),this.focusTracker.add(e.element),Ui(n=e)&&"focusCycler"in n&&n.focusCycler instanceof ye&&this._focusCycler.chain(e.focusCycler)})}_createCloseButton(){const t=new at(this.locale),e=this.locale.t;return t.set({label:e("Close"),tooltip:!0,icon:Q.cancel}),t.on("execute",()=>this.fire("close",{source:"closeButton"})),t}};Gc.defaultOffset=15;let Wi=Gc;class Pe extends F{static get pluginName(){return"Dialog"}static get isOfficialPlugin(){return!0}constructor(t){super(t);const e=t.t;this._initShowHideListeners(),this._initFocusToggler(),this._initMultiRootIntegration(),this.set({id:null,isOpen:!1}),t.accessibility.addKeystrokeInfos({categoryId:"navigation",keystrokes:[{label:e("Move focus in and out of an active dialog window"),keystroke:"Ctrl+F6",mayRequireFn:!0}]})}destroy(){super.destroy(),this._unlockBodyScroll()}_initShowHideListeners(){this.on("show",(t,e)=>{this._show(e)}),this.on("show",(t,e)=>{e.onShow&&e.onShow(this)},{priority:"low"}),this.on("hide",()=>{Pe._visibleDialogPlugin&&Pe._visibleDialogPlugin._hide()}),this.on("hide",()=>{this._onHide&&(this._onHide(this),this._onHide=void 0)},{priority:"low"})}_initFocusToggler(){const t=this.editor;t.keystrokes.set("Ctrl+F6",(e,n)=>{this.isOpen&&!this.view.isModal&&(this.view.focusTracker.isFocused?t.editing.view.focus():this.view.focus(),n())})}_initMultiRootIntegration(){const t=this.editor.model;t.document.on("change:data",()=>{if(!this.view)return;const e=t.document.differ.getChangedRoots();for(const n of e)n.state&&this.view.updatePosition()})}show(t){this.hide(),this.fire(`show:${t.id}`,t)}_show({id:t,icon:e,title:n,hasCloseButton:i=!0,content:r,actionButtons:s,className:a,isModal:c,position:l,onHide:d}){const u=this.editor;this.view=new Wi(u.locale,{getCurrentDomRoot:()=>u.editing.view.getDomRoot(u.model.document.selection.anchor.root.rootName),getViewportOffset:()=>u.ui.viewportOffset});const h=this.view;h.on("close",()=>{this.hide()}),u.ui.view.body.add(h),u.keystrokes.listenTo(h.element),l||(l=c?Ps:Gg),c&&this._lockBodyScroll(),h.set({position:l,_isVisible:!0,className:a,isModal:c}),h.setupParts({icon:e,title:n,hasCloseButton:i,content:r,actionButtons:s}),this.id=t,d&&(this._onHide=d),this.isOpen=!0,Pe._visibleDialogPlugin=this}hide(){Pe._visibleDialogPlugin&&Pe._visibleDialogPlugin.fire(`hide:${Pe._visibleDialogPlugin.id}`)}_hide(){if(!this.view)return;const t=this.editor,e=this.view;e.isModal&&this._unlockBodyScroll(),e.contentView&&e.contentView.reset(),t.ui.view.body.remove(e),t.ui.focusTracker.remove(e.element),t.keystrokes.stopListening(e.element),e.destroy(),t.editing.view.focus(),this.id=null,this.isOpen=!1,Pe._visibleDialogPlugin=null}_lockBodyScroll(){document.documentElement.classList.add("ck-dialog-scroll-locked")}_unlockBodyScroll(){document.documentElement.classList.remove("ck-dialog-scroll-locked")}}var Ls=T(278),Ki={attributes:{"data-cke":!0}};Ki.setAttributes=U(),Ki.insert=H().bind(null,"head"),Ki.domAPI=V(),Ki.insertStyleElement=q(),j()(Ls.A,Ki),Ls.A&&Ls.A.locals&&Ls.A.locals;class _n extends at{constructor(t,e=new Ug){super(t,e),this._checkIconHolderView=new IC,this.set({hasCheckSpace:!1,_hasCheck:this.isToggleable});const n=this.bindTemplate;this.extendTemplate({attributes:{class:["ck-list-item-button",n.if("isToggleable","ck-list-item-button_toggleable")]}}),this.bind("_hasCheck").to(this,"hasCheckSpace",this,"isToggleable",(i,r)=>i||r)}render(){super.render(),this._hasCheck&&this.children.add(this._checkIconHolderView,0),this._watchCheckIconHolderMount()}_watchCheckIconHolderMount(){this._checkIconHolderView.bind("isOn").to(this,"isOn",t=>this.isToggleable&&t),this.on("change:_hasCheck",(t,e,n)=>{const{children:i,_checkIconHolderView:r}=this;n?i.add(r,0):i.remove(r)})}}class IC extends J{constructor(){super(),this._checkIconView=this._createCheckIconView();const t=this.bindTemplate;this.children=this.createCollection(),this.set("isOn",!1),this.setTemplate({tag:"span",children:this.children,attributes:{class:["ck","ck-list-item-button__check-holder",t.to("isOn",e=>e?"ck-on":"ck-off")]}})}render(){super.render(),this.isOn&&this.children.add(this._checkIconView,0),this._watchCheckIconMount()}_watchCheckIconMount(){this.on("change:isOn",(t,e,n)=>{const{children:i,_checkIconView:r}=this;n&&!i.has(r)?i.add(r):!n&&i.has(r)&&i.remove(r)})}_createCheckIconView(){const t=new ue;return t.content=Q.check,t.extendTemplate({attributes:{class:"ck-list-item-button__check-icon"}}),t}}var zs=T(977),$i={attributes:{"data-cke":!0}};$i.setAttributes=U(),$i.insert=H().bind(null,"head"),$i.domAPI=V(),$i.insertStyleElement=q(),j()(zs.A,$i),zs.A&&zs.A.locals&&zs.A.locals;class Ft extends _n{constructor(t){super(t),this.set({withText:!0,withKeystroke:!0,tooltip:!1,role:"menuitem"}),this.extendTemplate({attributes:{class:["ck-menu-bar__menu__item__button"]}})}}var Os=T(7801),Yi={attributes:{"data-cke":!0}};Yi.setAttributes=U(),Yi.insert=H().bind(null,"head"),Yi.domAPI=V(),Yi.insertStyleElement=q(),j()(Os.A,Yi),Os.A&&Os.A.locals&&Os.A.locals;class Rs extends J{constructor(t){super(t),this.set("text",void 0),this.set("for",void 0),this.id=`ck-editor__label_${se()}`;const e=this.bindTemplate;this.setTemplate({tag:"label",attributes:{class:["ck","ck-label"],id:this.id,for:e.to("for")},children:[{text:e.to("text")}]})}}class SC extends J{constructor(t,e){super(t);const n=t.t,i=new Rs;i.text=n("Help Contents. To close this dialog press ESC."),this.setTemplate({tag:"div",attributes:{class:["ck","ck-accessibility-help-dialog__content"],"aria-labelledby":i.id,role:"document",tabindex:-1},children:[ce(document,"p",{},n("Below, you can find a list of keyboard shortcuts that can be used in the editor.")),...this._createCategories(Array.from(e.values())),i]})}focus(){this.element.focus()}_createCategories(t){return t.map(e=>{const n=[ce(document,"h3",{},e.label),...Array.from(e.groups.values()).map(i=>this._createGroup(i)).flat()];return e.description&&n.splice(1,0,ce(document,"p",{},e.description)),ce(document,"section",{},n)})}_createGroup(t){const e=t.keystrokes.sort((i,r)=>i.label.localeCompare(r.label)).map(i=>this._createGroupRow(i)).flat(),n=[ce(document,"dl",{},e)];return t.label&&n.unshift(ce(document,"h4",{},t.label)),n}_createGroupRow(t){const e=this.locale.t,n=ce(document,"dt"),i=ce(document,"dd"),r=function(a){return typeof a=="string"?[[a]]:typeof a[0]=="string"?[a]:a}(t.keystroke),s=[];for(const a of r)s.push(a.map(MC).join(""));return n.innerHTML=t.label,i.innerHTML=s.join(", ")+(t.mayRequireFn&&v.isMac?` ${e("(may require <kbd>Fn</kbd>)")}`:""),[n,i]}}function MC(o){return ns(o).split("+").map(t=>`<kbd>${t}</kbd>`).join("+")}const Kg='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.628a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8.5 9.125a.3.3 0 0 0-.253-.296L5.11 8.327a.75.75 0 1 1 .388-1.449l4.04.716c.267.072.624.08.893.009l4.066-.724a.75.75 0 1 1 .388 1.45l-3.132.5a.3.3 0 0 0-.253.296v1.357a.3.3 0 0 0 .018.102l1.615 4.438a.75.75 0 0 1-1.41.513l-1.35-3.71a.3.3 0 0 0-.281-.197h-.209a.3.3 0 0 0-.282.198l-1.35 3.711a.75.75 0 0 1-1.41-.513l1.64-4.509a.3.3 0 0 0 .019-.103V9.125Z"/><path clip-rule="evenodd" d="M10 18.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Zm0 1.5c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"/></svg>';var Fs=T(8527),Qi={attributes:{"data-cke":!0}};Qi.setAttributes=U(),Qi.insert=H().bind(null,"head"),Qi.domAPI=V(),Qi.insertStyleElement=q(),j()(Fs.A,Qi),Fs.A&&Fs.A.locals&&Fs.A.locals;class BC extends F{constructor(){super(...arguments),this.contentView=null}static get requires(){return[Pe]}static get pluginName(){return"AccessibilityHelp"}static get isOfficialPlugin(){return!0}init(){const t=this.editor,e=t.locale.t;t.ui.componentFactory.add("accessibilityHelp",()=>{const n=this._createButton(at);return n.set({tooltip:!0,withText:!1,label:e("Accessibility help")}),n}),t.ui.componentFactory.add("menuBar:accessibilityHelp",()=>{const n=this._createButton(Ft);return n.label=e("Accessibility"),n}),t.keystrokes.set("Alt+0",(n,i)=>{this._toggleDialog(),i()}),this._setupRootLabels()}_createButton(t){const e=this.editor,n=e.plugins.get("Dialog"),i=new t(e.locale);return i.set({keystroke:"Alt+0",icon:Kg,isToggleable:!0}),i.on("execute",()=>this._toggleDialog()),i.bind("isOn").to(n,"id",r=>r==="accessibilityHelp"),i}_setupRootLabels(){const t=this.editor,e=t.editing.view,n=t.t;function i(r,s){const a=[s.getAttribute("aria-label"),n("Press %0 for help.",[ns("Alt+0")])].filter(c=>c).join(". ");r.setAttribute("aria-label",a,s)}t.ui.on("ready",()=>{e.change(r=>{for(const s of e.document.roots)i(r,s)}),t.on("addRoot",(r,s)=>{const a=t.editing.view.document.getRoot(s.rootName);e.change(c=>i(c,a))},{priority:"low"})})}_toggleDialog(){const t=this.editor,e=t.plugins.get("Dialog"),n=t.locale.t;this.contentView||(this.contentView=new SC(t.locale,t.accessibility.keystrokeInfos)),e.id==="accessibilityHelp"?e.hide():e.show({id:"accessibilityHelp",className:"ck-accessibility-help-dialog",title:n("Accessibility help"),icon:Kg,hasCloseButton:!0,content:this.contentView})}}class TC extends be{constructor(t,e=[]){super(e),this.locale=t}get bodyCollectionContainer(){return this._bodyCollectionContainer}attachToDom(){this._bodyCollectionContainer=new we({tag:"div",attributes:{class:["ck","ck-reset_all","ck-body","ck-rounded-corners"],dir:this.locale.uiLanguageDirection,role:"application"},children:this}).render();let t=document.querySelector(".ck-body-wrapper");t||(t=ce(document,"div",{class:"ck-body-wrapper"}),document.body.appendChild(t)),t.appendChild(this._bodyCollectionContainer)}detachFromDom(){super.destroy(),this._bodyCollectionContainer&&this._bodyCollectionContainer.remove();const t=document.querySelector(".ck-body-wrapper");t&&t.childElementCount==0&&t.remove()}}var js=T(4391),Zi={attributes:{"data-cke":!0}};Zi.setAttributes=U(),Zi.insert=H().bind(null,"head"),Zi.domAPI=V(),Zi.insertStyleElement=q(),j()(js.A,Zi),js.A&&js.A.locals&&js.A.locals;class Vs extends at{constructor(t){super(t),this.isToggleable=!0,this.toggleSwitchView=this._createToggleView(),this.extendTemplate({attributes:{class:"ck-switchbutton"}})}render(){super.render(),this.children.add(this.toggleSwitchView)}_createToggleView(){const t=new J;return t.setTemplate({tag:"span",attributes:{class:["ck","ck-button__toggle"]},children:[{tag:"span",attributes:{class:["ck","ck-button__toggle__inner"]}}]}),t}}class $g extends Yg(at){}class NC extends Yg(_n){}function Yg(o){return class extends o{constructor(...t){super(...t),this.buttonView=this,this._fileInputView=new PC(this.locale),this._fileInputView.bind("acceptedType").to(this),this._fileInputView.bind("allowMultipleFiles").to(this),this._fileInputView.delegate("done").to(this),this.on("execute",()=>{this._fileInputView.open()}),this.extendTemplate({attributes:{class:"ck-file-dialog-button"}})}render(){super.render(),this.children.add(this._fileInputView)}}}class PC extends J{constructor(t){super(t),this.set("acceptedType",void 0),this.set("allowMultipleFiles",!1);const e=this.bindTemplate;this.setTemplate({tag:"input",attributes:{class:["ck-hidden"],type:"file",tabindex:"-1",accept:e.to("acceptedType"),multiple:e.to("allowMultipleFiles")},on:{change:e.to(()=>{this.element&&this.element.files&&this.element.files.length&&this.fire("done",this.element.files),this.element.value=""})}})}open(){this.element.click()}}const Ji='<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"/></svg>';var Hs=T(25),Xi={attributes:{"data-cke":!0}};Xi.setAttributes=U(),Xi.insert=H().bind(null,"head"),Xi.domAPI=V(),Xi.insertStyleElement=q(),j()(Hs.A,Xi),Hs.A&&Hs.A.locals&&Hs.A.locals;class LC extends J{constructor(t,e){super(t);const n=this.bindTemplate;this.set("isCollapsed",!1),this.set("label",""),this.buttonView=this._createButtonView(),this.children=this.createCollection(),this.set("_collapsibleAriaLabelUid",void 0),e&&this.children.addMany(e),this.setTemplate({tag:"div",attributes:{class:["ck","ck-collapsible",n.if("isCollapsed","ck-collapsible_collapsed")]},children:[this.buttonView,{tag:"div",attributes:{class:["ck","ck-collapsible__children"],role:"region",hidden:n.if("isCollapsed","hidden"),"aria-labelledby":n.to("_collapsibleAriaLabelUid")},children:this.children}]})}render(){super.render(),this._collapsibleAriaLabelUid=this.buttonView.labelView.element.id}focus(){this.buttonView.focus()}_createButtonView(){const t=new at(this.locale),e=t.bindTemplate;return t.set({withText:!0,icon:Ji}),t.extendTemplate({attributes:{"aria-expanded":e.to("isOn",n=>String(n))}}),t.bind("label").to(this),t.bind("isOn").to(this,"isCollapsed",n=>!n),t.on("execute",()=>{this.isCollapsed=!this.isCollapsed}),t}}var Us=T(7317),to={attributes:{"data-cke":!0}};to.setAttributes=U(),to.insert=H().bind(null,"head"),to.domAPI=V(),to.insertStyleElement=q(),j()(Us.A,to),Us.A&&Us.A.locals&&Us.A.locals,T(6931),T(9047);var qs=T(4962),eo={attributes:{"data-cke":!0}};eo.setAttributes=U(),eo.insert=H().bind(null,"head"),eo.domAPI=V(),eo.insertStyleElement=q(),j()(qs.A,eo),qs.A&&qs.A.locals&&qs.A.locals;class Gs extends J{constructor(t,e){super(t);const n=`ck-labeled-field-view-${se()}`,i=`ck-labeled-field-view-status-${se()}`;this.fieldView=e(this,n,i),this.set("label",void 0),this.set("isEnabled",!0),this.set("isEmpty",!0),this.set("isFocused",!1),this.set("errorText",null),this.set("infoText",null),this.set("class",void 0),this.set("placeholder",void 0),this.labelView=this._createLabelView(n),this.statusView=this._createStatusView(i),this.fieldWrapperChildren=this.createCollection([this.fieldView,this.labelView]),this.bind("_statusText").to(this,"errorText",this,"infoText",(s,a)=>s||a);const r=this.bindTemplate;this.setTemplate({tag:"div",attributes:{class:["ck","ck-labeled-field-view",r.to("class"),r.if("isEnabled","ck-disabled",s=>!s),r.if("isEmpty","ck-labeled-field-view_empty"),r.if("isFocused","ck-labeled-field-view_focused"),r.if("placeholder","ck-labeled-field-view_placeholder"),r.if("errorText","ck-error")]},children:[{tag:"div",attributes:{class:["ck","ck-labeled-field-view__input-wrapper"]},children:this.fieldWrapperChildren},this.statusView]})}_createLabelView(t){const e=new Rs(this.locale);return e.for=t,e.bind("text").to(this,"label"),e}_createStatusView(t){const e=new J(this.locale),n=this.bindTemplate;return e.setTemplate({tag:"div",attributes:{class:["ck","ck-labeled-field-view__status",n.if("errorText","ck-labeled-field-view__status_error"),n.if("_statusText","ck-hidden",i=>!i)],id:t,role:n.if("errorText","alert")},children:[{text:n.to("_statusText")}]}),e}focus(t){this.fieldView.focus(t)}}class zC extends J{constructor(t){super(t),this.set("value",void 0),this.set("id",void 0),this.set("placeholder",void 0),this.set("tabIndex",void 0),this.set("isReadOnly",!1),this.set("hasError",!1),this.set("ariaDescribedById",void 0),this.set("ariaLabel",void 0),this.focusTracker=new Bt,this.bind("isFocused").to(this.focusTracker),this.set("isEmpty",!0);const e=this.bindTemplate;this.setTemplate({tag:"input",attributes:{class:["ck","ck-input",e.if("isFocused","ck-input_focused"),e.if("isEmpty","ck-input-text_empty"),e.if("hasError","ck-error")],id:e.to("id"),placeholder:e.to("placeholder"),tabindex:e.to("tabIndex"),readonly:e.to("isReadOnly"),"aria-invalid":e.if("hasError",!0),"aria-describedby":e.to("ariaDescribedById"),"aria-label":e.to("ariaLabel")},on:{input:e.to((...n)=>{this.fire("input",...n),this._updateIsEmpty()}),change:e.to(this._updateIsEmpty.bind(this))}})}render(){super.render(),this.focusTracker.add(this.element),this._setDomElementValue(this.value),this._updateIsEmpty(),this.on("change:value",(t,e,n)=>{this._setDomElementValue(n),this._updateIsEmpty()})}destroy(){super.destroy(),this.focusTracker.destroy()}select(){this.element.select()}focus(){this.element.focus()}reset(){this.value=this.element.value="",this._updateIsEmpty()}_updateIsEmpty(){this.isEmpty=!this.element.value}_setDomElementValue(t){this.element.value=t||t===0?t:""}}var Ws=T(253),no={attributes:{"data-cke":!0}};no.setAttributes=U(),no.insert=H().bind(null,"head"),no.domAPI=V(),no.insertStyleElement=q(),j()(Ws.A,no),Ws.A&&Ws.A.locals&&Ws.A.locals;class OC extends zC{constructor(t){super(t),this.set("inputMode","text");const e=this.bindTemplate;this.extendTemplate({attributes:{inputmode:e.to("inputMode")}})}}class RC extends OC{constructor(t){super(t),this.extendTemplate({attributes:{type:"text",class:["ck-input-text"]}})}}var Ks=T(1671),io={attributes:{"data-cke":!0}};io.setAttributes=U(),io.insert=H().bind(null,"head"),io.domAPI=V(),io.insertStyleElement=q(),j()(Ks.A,io),Ks.A&&Ks.A.locals&&Ks.A.locals;class FC extends J{constructor(t){super(t);const e=this.bindTemplate;this.set("isVisible",!1),this.set("position","se"),this.children=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-reset","ck-dropdown__panel",e.to("position",n=>`ck-dropdown__panel_${n}`),e.if("isVisible","ck-dropdown__panel-visible")],tabindex:"-1"},children:this.children,on:{selectstart:e.to(n=>{n.target.tagName.toLocaleLowerCase()!=="input"&&n.preventDefault()})}})}focus(){if(this.children.length){const t=this.children.first;typeof t.focus=="function"?t.focus():st("ui-dropdown-panel-focus-child-missing-focus",{childView:this.children.first,dropdownPanel:this})}}focusLast(){if(this.children.length){const t=this.children.last;typeof t.focusLast=="function"?t.focusLast():t.focus()}}}var $s=T(8149),oo={attributes:{"data-cke":!0}};oo.setAttributes=U(),oo.insert=H().bind(null,"head"),oo.domAPI=V(),oo.insertStyleElement=q(),j()($s.A,oo),$s.A&&$s.A.locals&&$s.A.locals;const ci=class ci extends J{constructor(t,e,n){super(t);const i=this.bindTemplate;this.buttonView=e,this.panelView=n,this.set("isOpen",!1),this.set("isEnabled",!0),this.set("class",void 0),this.set("id",void 0),this.set("panelPosition","auto"),this.panelView.bind("isVisible").to(this,"isOpen"),this.keystrokes=new Ut,this.focusTracker=new Bt,this.setTemplate({tag:"div",attributes:{class:["ck","ck-dropdown",i.to("class"),i.if("isEnabled","ck-disabled",r=>!r)],id:i.to("id"),"aria-describedby":i.to("ariaDescribedById")},children:[e,n]}),e.extendTemplate({attributes:{class:["ck-dropdown__button"],"data-cke-tooltip-disabled":i.to("isOpen")}})}render(){super.render(),this.focusTracker.add(this.buttonView.element),this.focusTracker.add(this.panelView.element),this.listenTo(this.buttonView,"open",()=>{this.isOpen=!this.isOpen}),this.on("change:isOpen",(e,n,i)=>{if(i)if(this.panelPosition==="auto"){const r=ci._getOptimalPosition({element:this.panelView.element,target:this.buttonView.element,fitInViewport:!0,positions:this._panelPositions});this.panelView.position=r?r.name:this._panelPositions[0].name}else this.panelView.position=this.panelPosition}),this.keystrokes.listenTo(this.element);const t=(e,n)=>{this.isOpen&&(this.isOpen=!1,n())};this.keystrokes.set("arrowdown",(e,n)=>{this.buttonView.isEnabled&&!this.isOpen&&(this.isOpen=!0,n())}),this.keystrokes.set("arrowright",(e,n)=>{this.isOpen&&n()}),this.keystrokes.set("arrowleft",t),this.keystrokes.set("esc",t)}focus(){this.buttonView.focus()}get _panelPositions(){const{south:t,north:e,southEast:n,southWest:i,northEast:r,northWest:s,southMiddleEast:a,southMiddleWest:c,northMiddleEast:l,northMiddleWest:d}=ci.defaultPanelPositions;return this.locale.uiLanguageDirection!=="rtl"?[n,i,a,c,t,r,s,l,d,e]:[i,n,c,a,t,s,r,d,l,e]}};ci.defaultPanelPositions={south:(t,e)=>({top:t.bottom,left:t.left-(e.width-t.width)/2,name:"s"}),southEast:t=>({top:t.bottom,left:t.left,name:"se"}),southWest:(t,e)=>({top:t.bottom,left:t.left-e.width+t.width,name:"sw"}),southMiddleEast:(t,e)=>({top:t.bottom,left:t.left-(e.width-t.width)/4,name:"sme"}),southMiddleWest:(t,e)=>({top:t.bottom,left:t.left-3*(e.width-t.width)/4,name:"smw"}),north:(t,e)=>({top:t.top-e.height,left:t.left-(e.width-t.width)/2,name:"n"}),northEast:(t,e)=>({top:t.top-e.height,left:t.left,name:"ne"}),northWest:(t,e)=>({top:t.top-e.height,left:t.left-e.width+t.width,name:"nw"}),northMiddleEast:(t,e)=>({top:t.top-e.height,left:t.left-(e.width-t.width)/4,name:"nme"}),northMiddleWest:(t,e)=>({top:t.top-e.height,left:t.left-3*(e.width-t.width)/4,name:"nmw"})},ci._getOptimalPosition=es;let wd=ci;class jC extends at{constructor(t){super(t),this.arrowView=this._createArrowView(),this.extendTemplate({attributes:{"aria-haspopup":!0,"aria-expanded":this.bindTemplate.to("isOn",e=>String(e))}}),this.delegate("execute").to(this,"open")}render(){super.render(),this.children.add(this.arrowView)}_createArrowView(){const t=new ue;return t.content=Ji,t.extendTemplate({attributes:{class:"ck-dropdown__arrow"}}),t}}var Ys=T(4767),ro={attributes:{"data-cke":!0}};ro.setAttributes=U(),ro.insert=H().bind(null,"head"),ro.domAPI=V(),ro.insertStyleElement=q(),j()(Ys.A,ro),Ys.A&&Ys.A.locals&&Ys.A.locals;var Qs=T(9554),so={attributes:{"data-cke":!0}};so.setAttributes=U(),so.insert=H().bind(null,"head"),so.domAPI=V(),so.insertStyleElement=q(),j()(Qs.A,so),Qs.A&&Qs.A.locals&&Qs.A.locals;class VC extends _n{constructor(t){super(t);const e=this.bindTemplate;this.set({withText:!0,role:"menuitem"}),this.arrowView=this._createArrowView(),this.extendTemplate({attributes:{class:["ck-dropdown-menu-list__nested-menu__button"],"aria-haspopup":!0,"aria-expanded":this.bindTemplate.to("isOn",n=>String(n)),"data-cke-tooltip-disabled":e.to("isOn")},on:{mouseenter:e.to("mouseenter")}})}render(){super.render(),this.children.add(this.arrowView)}_createArrowView(){const t=new ue;return t.content=Ji,t.extendTemplate({attributes:{class:"ck-dropdown-menu-list__nested-menu__button__arrow"}}),t}}class en extends J{constructor(t){super(t);const e=this.bindTemplate;this.set("isVisible",!0),this.children=this.createCollection(),this.setTemplate({tag:"li",attributes:{class:["ck","ck-list__item",e.if("isVisible","ck-hidden",n=>!n)],role:"presentation"},children:this.children})}focus(){this.children.first&&this.children.first.focus()}}class Ad extends J{constructor(t){super(t),this.setTemplate({tag:"li",attributes:{class:["ck","ck-list__separator"]}})}}class Zs extends J{constructor(t,e=new Rs){super(t);const n=this.bindTemplate,i=new Xs(t);this.set({label:"",isVisible:!0}),this.labelView=e,this.labelView.bind("text").to(this,"label"),this.children=this.createCollection(),this.children.addMany([this.labelView,i]),i.set({role:"group",ariaLabelledBy:e.id}),i.focusTracker.destroy(),i.keystrokes.destroy(),this.items=i.items,this.setTemplate({tag:"li",attributes:{role:"presentation",class:["ck","ck-list__group",n.if("isVisible","ck-hidden",r=>!r)]},children:this.children})}focus(){if(this.items){const t=this.items.find(e=>!(e instanceof Ad));t&&t.focus()}}}var Js=T(5199),ao={attributes:{"data-cke":!0}};ao.setAttributes=U(),ao.insert=H().bind(null,"head"),ao.domAPI=V(),ao.insertStyleElement=q(),j()(Js.A,ao),Js.A&&Js.A.locals&&Js.A.locals;class Xs extends J{constructor(t){super(t),this._listItemGroupToChangeListeners=new WeakMap;const e=this.bindTemplate;this.focusables=new be,this.items=this.createCollection(),this.focusTracker=new Bt,this.keystrokes=new Ut,this._focusCycler=new ye({focusables:this.focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"arrowup",focusNext:"arrowdown"}}),this.set("ariaLabel",void 0),this.set("ariaLabelledBy",void 0),this.set("role",void 0),this.setTemplate({tag:"ul",attributes:{class:["ck","ck-reset","ck-list"],role:e.to("role"),"aria-label":e.to("ariaLabel"),"aria-labelledby":e.to("ariaLabelledBy")},children:this.items})}render(){super.render();for(const t of this.items)t instanceof Zs?this._registerFocusableItemsGroup(t):t instanceof en&&this._registerFocusableListItem(t);this.items.on("change",(t,e)=>{for(const n of e.removed)n instanceof Zs?this._deregisterFocusableItemsGroup(n):n instanceof en&&this._deregisterFocusableListItem(n);for(const n of Array.from(e.added).reverse())n instanceof Zs?this._registerFocusableItemsGroup(n,e.index):this._registerFocusableListItem(n,e.index)}),this.keystrokes.listenTo(this.element)}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}focus(){this._focusCycler.focusFirst()}focusFirst(){this._focusCycler.focusFirst()}focusLast(){this._focusCycler.focusLast()}_registerFocusableListItem(t,e){this.focusTracker.add(t.element),this.focusables.add(t,e)}_deregisterFocusableListItem(t){this.focusTracker.remove(t.element),this.focusables.remove(t)}_getOnGroupItemsChangeCallback(t){return(e,n)=>{for(const i of n.removed)this._deregisterFocusableListItem(i);for(const i of Array.from(n.added).reverse())this._registerFocusableListItem(i,this.items.getIndex(t)+n.index)}}_registerFocusableItemsGroup(t,e){Array.from(t.items).forEach((i,r)=>{const s=e!==void 0?e+r:void 0;this._registerFocusableListItem(i,s)});const n=this._getOnGroupItemsChangeCallback(t);this._listItemGroupToChangeListeners.set(t,n),t.items.on("change",n)}_deregisterFocusableItemsGroup(t){for(const e of t.items)this._deregisterFocusableListItem(e);t.items.off("change",this._listItemGroupToChangeListeners.get(t)),this._listItemGroupToChangeListeners.delete(t)}}class HC extends Xs{constructor(t){super(t);const e=this.bindTemplate;this.role="menu",this.set("isVisible",!0),this.extendTemplate({attributes:{class:["ck-dropdown-menu-list",e.if("isVisible","ck-hidden",n=>!n)]}})}}const UC={eastSouth:o=>({top:o.top,left:o.right-5,name:"es"}),eastNorth:(o,t)=>({top:o.top-t.height+o.height,left:o.right-5,name:"en"}),westSouth:(o,t)=>({top:o.top,left:o.left-t.width+5,name:"ws"}),westNorth:(o,t)=>({top:o.top-t.height+o.height,left:o.left-t.width+5,name:"wn"})};var ta=T(2171),co={attributes:{"data-cke":!0}};co.setAttributes=U(),co.insert=H().bind(null,"head"),co.domAPI=V(),co.insertStyleElement=q(),j()(ta.A,co),ta.A&&ta.A.locals&&ta.A.locals;const Qn={openOnArrowRightKey(o){const t=o.locale.uiLanguageDirection==="rtl"?"arrowleft":"arrowright";o.keystrokes.set(t,(e,n)=>{o.focusTracker.focusedElement===o.buttonView.element&&o.isEnabled&&(o.isOpen||(o.isOpen=!0),o.panelView.focus(),n())})},openOnButtonClick(o){o.buttonView.on("execute",()=>{o.isEnabled&&(o.isOpen=!0)})},openAndFocusOnEnterKeyPress(o){o.keystrokes.set("enter",(t,e)=>{o.focusTracker.focusedElement===o.buttonView.element&&(o.isOpen=!0,o.panelView.focus(),e())})},closeOnArrowLeftKey(o){const t=o.locale.uiLanguageDirection==="rtl"?"arrowright":"arrowleft";o.keystrokes.set(t,(e,n)=>{o.isOpen&&(o.focus(),o.isOpen=!1,n())})},closeOnEscKey(o){o.keystrokes.set("esc",(t,e)=>{o.isOpen&&(o.focus(),o.isOpen=!1,e())})},closeOnParentClose(o,t){t.on("change:isOpen",(e,n,i)=>{i||e.source!==t||(o.isOpen=!1)})}};var ea=T(3710),lo={attributes:{"data-cke":!0}};lo.setAttributes=U(),lo.insert=H().bind(null,"head"),lo.domAPI=V(),lo.insertStyleElement=q(),j()(ea.A,lo),ea.A&&ea.A.locals&&ea.A.locals;const Qg=Fn("px"),qC={top:-99999,left:-99999,name:"arrowless",config:{withArrow:!1}},re=class re extends J{constructor(t){super(t);const e=this.bindTemplate;this.set("top",0),this.set("left",0),this.set("position","arrow_nw"),this.set("isVisible",!1),this.set("withArrow",!0),this.set("class",void 0),this._pinWhenIsVisibleCallback=null,this._resizeObserver=null,this.content=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-balloon-panel",e.to("position",n=>`ck-balloon-panel_${n}`),e.if("isVisible","ck-balloon-panel_visible"),e.if("withArrow","ck-balloon-panel_with-arrow"),e.to("class")],style:{top:e.to("top",Qg),left:e.to("left",Qg)}},children:this.content})}destroy(){this.hide(),super.destroy()}show(){this.isVisible=!0}hide(){this.isVisible=!1}attachTo(t){const e=na(t.target);if(e&&!Oe(e))return!1;this.show();const n=re.defaultPositions,i=Object.assign({},{element:this.element,positions:[n.southArrowNorth,n.southArrowNorthMiddleWest,n.southArrowNorthMiddleEast,n.southArrowNorthWest,n.southArrowNorthEast,n.northArrowSouth,n.northArrowSouthMiddleWest,n.northArrowSouthMiddleEast,n.northArrowSouthWest,n.northArrowSouthEast,n.viewportStickyNorth],limiter:A.document.body,fitInViewport:!0},t),r=re._getOptimalPosition(i)||qC,s=parseInt(r.left),a=parseInt(r.top),c=r.name,l=r.config||{},{withArrow:d=!0}=l;return this.top=a,this.left=s,this.position=c,this.withArrow=d,!0}pin(t){this.unpin(),this._startPinning(t)&&(this._pinWhenIsVisibleCallback=()=>{this.isVisible?this._startPinning(t):this._stopPinning()},this.listenTo(this,"change:isVisible",this._pinWhenIsVisibleCallback))}unpin(){this._pinWhenIsVisibleCallback&&(this._stopPinning(),this.stopListening(this,"change:isVisible",this._pinWhenIsVisibleCallback),this._pinWhenIsVisibleCallback=null,this.hide())}_startPinning(t){if(!this.attachTo(t))return!1;let e=na(t.target);const n=t.limiter?na(t.limiter):A.document.body;if(this.listenTo(A.document,"scroll",(i,r)=>{const s=r.target,a=e&&s.contains(e),c=n&&s.contains(n);!a&&!c&&e&&n||this.attachTo(t)},{useCapture:!0}),this.listenTo(A.window,"resize",()=>{this.attachTo(t)}),!this._resizeObserver&&(e&&Et(e)&&(e=e.parentElement),e)){const i=()=>{Oe(e)||this.unpin()};this._resizeObserver=new bi(e,i)}return!0}_stopPinning(){this.stopListening(A.document,"scroll"),this.stopListening(A.window,"resize"),this._resizeObserver&&(this._resizeObserver.destroy(),this._resizeObserver=null)}static generatePositions(t={}){const{sideOffset:e=re.arrowSideOffset,heightOffset:n=re.arrowHeightOffset,stickyVerticalOffset:i=re.stickyVerticalOffset,config:r}=t;return{northWestArrowSouthWest:(c,l)=>({top:s(c,l),left:c.left-e,name:"arrow_sw",...r&&{config:r}}),northWestArrowSouthMiddleWest:(c,l)=>({top:s(c,l),left:c.left-.25*l.width-e,name:"arrow_smw",...r&&{config:r}}),northWestArrowSouth:(c,l)=>({top:s(c,l),left:c.left-l.width/2,name:"arrow_s",...r&&{config:r}}),northWestArrowSouthMiddleEast:(c,l)=>({top:s(c,l),left:c.left-.75*l.width+e,name:"arrow_sme",...r&&{config:r}}),northWestArrowSouthEast:(c,l)=>({top:s(c,l),left:c.left-l.width+e,name:"arrow_se",...r&&{config:r}}),northArrowSouthWest:(c,l)=>({top:s(c,l),left:c.left+c.width/2-e,name:"arrow_sw",...r&&{config:r}}),northArrowSouthMiddleWest:(c,l)=>({top:s(c,l),left:c.left+c.width/2-.25*l.width-e,name:"arrow_smw",...r&&{config:r}}),northArrowSouth:(c,l)=>({top:s(c,l),left:c.left+c.width/2-l.width/2,name:"arrow_s",...r&&{config:r}}),northArrowSouthMiddleEast:(c,l)=>({top:s(c,l),left:c.left+c.width/2-.75*l.width+e,name:"arrow_sme",...r&&{config:r}}),northArrowSouthEast:(c,l)=>({top:s(c,l),left:c.left+c.width/2-l.width+e,name:"arrow_se",...r&&{config:r}}),northEastArrowSouthWest:(c,l)=>({top:s(c,l),left:c.right-e,name:"arrow_sw",...r&&{config:r}}),northEastArrowSouthMiddleWest:(c,l)=>({top:s(c,l),left:c.right-.25*l.width-e,name:"arrow_smw",...r&&{config:r}}),northEastArrowSouth:(c,l)=>({top:s(c,l),left:c.right-l.width/2,name:"arrow_s",...r&&{config:r}}),northEastArrowSouthMiddleEast:(c,l)=>({top:s(c,l),left:c.right-.75*l.width+e,name:"arrow_sme",...r&&{config:r}}),northEastArrowSouthEast:(c,l)=>({top:s(c,l),left:c.right-l.width+e,name:"arrow_se",...r&&{config:r}}),southWestArrowNorthWest:c=>({top:a(c),left:c.left-e,name:"arrow_nw",...r&&{config:r}}),southWestArrowNorthMiddleWest:(c,l)=>({top:a(c),left:c.left-.25*l.width-e,name:"arrow_nmw",...r&&{config:r}}),southWestArrowNorth:(c,l)=>({top:a(c),left:c.left-l.width/2,name:"arrow_n",...r&&{config:r}}),southWestArrowNorthMiddleEast:(c,l)=>({top:a(c),left:c.left-.75*l.width+e,name:"arrow_nme",...r&&{config:r}}),southWestArrowNorthEast:(c,l)=>({top:a(c),left:c.left-l.width+e,name:"arrow_ne",...r&&{config:r}}),southArrowNorthWest:c=>({top:a(c),left:c.left+c.width/2-e,name:"arrow_nw",...r&&{config:r}}),southArrowNorthMiddleWest:(c,l)=>({top:a(c),left:c.left+c.width/2-.25*l.width-e,name:"arrow_nmw",...r&&{config:r}}),southArrowNorth:(c,l)=>({top:a(c),left:c.left+c.width/2-l.width/2,name:"arrow_n",...r&&{config:r}}),southArrowNorthMiddleEast:(c,l)=>({top:a(c),left:c.left+c.width/2-.75*l.width+e,name:"arrow_nme",...r&&{config:r}}),southArrowNorthEast:(c,l)=>({top:a(c),left:c.left+c.width/2-l.width+e,name:"arrow_ne",...r&&{config:r}}),southEastArrowNorthWest:c=>({top:a(c),left:c.right-e,name:"arrow_nw",...r&&{config:r}}),southEastArrowNorthMiddleWest:(c,l)=>({top:a(c),left:c.right-.25*l.width-e,name:"arrow_nmw",...r&&{config:r}}),southEastArrowNorth:(c,l)=>({top:a(c),left:c.right-l.width/2,name:"arrow_n",...r&&{config:r}}),southEastArrowNorthMiddleEast:(c,l)=>({top:a(c),left:c.right-.75*l.width+e,name:"arrow_nme",...r&&{config:r}}),southEastArrowNorthEast:(c,l)=>({top:a(c),left:c.right-l.width+e,name:"arrow_ne",...r&&{config:r}}),westArrowEast:(c,l)=>({top:c.top+c.height/2-l.height/2,left:c.left-l.width-n,name:"arrow_e",...r&&{config:r}}),eastArrowWest:(c,l)=>({top:c.top+c.height/2-l.height/2,left:c.right+n,name:"arrow_w",...r&&{config:r}}),viewportStickyNorth:(c,l,d,u)=>{const h=u||d;return c.getIntersection(h)?h.height-c.height>i?null:{top:h.top+i,left:c.left+c.width/2-l.width/2,name:"arrowless",config:{withArrow:!1,...r}}:null}};function s(c,l){return c.top-l.height-n}function a(c){return c.bottom+n}}};re.arrowSideOffset=25,re.arrowHeightOffset=10,re.stickyVerticalOffset=20,re._getOptimalPosition=es,re.defaultPositions=re.generatePositions();let Ve=re;function na(o){return Ke(o)?o:Xr(o)?o.commonAncestorContainer:typeof o=="function"?na(o()):null}var ia=T(3610),uo={attributes:{"data-cke":!0}};uo.setAttributes=U(),uo.insert=H().bind(null,"head"),uo.domAPI=V(),uo.insertStyleElement=q(),j()(ia.A,uo),ia.A&&ia.A.locals&&ia.A.locals;class GC extends Ve{constructor(t){super(t);const e=this.bindTemplate;this.set({isVisible:!1,position:"se",class:null,top:0,left:0}),this.extendTemplate({tag:"div",attributes:{class:["ck-reset","ck-dropdown-menu__nested-menu__panel"],tabindex:"-1"},on:{selectstart:e.to(n=>{n.target.tagName.toLocaleLowerCase()!=="input"&&n.preventDefault()})}})}focus(t=1){const{content:e}=this;e.length&&(t===1?e.first.focus():e.last.focus())}}var oa=T(7218),ho={attributes:{"data-cke":!0}};ho.setAttributes=U(),ho.insert=H().bind(null,"head"),ho.domAPI=V(),ho.insertStyleElement=q(),j()(oa.A,ho),oa.A&&oa.A.locals&&oa.A.locals;const Wc=class Wc extends J{constructor(t,e,n,i,r){super(t),this._bodyCollection=e,this.id=n,this.set({isOpen:!1,isEnabled:!0,panelPosition:"w",class:void 0,parentMenuView:null}),this.keystrokes=new Ut,this.focusTracker=new Bt,this.buttonView=new VC(t),this.buttonView.delegate("mouseenter").to(this),this.buttonView.bind("isOn","isEnabled").to(this,"isOpen","isEnabled"),this.buttonView.label=i,this.panelView=new GC(t),this.panelView.isVisible=!0,this.listView=new HC(t),this.listView.bind("ariaLabel").to(this.buttonView,"label"),this.panelView.content.add(this.listView);const s=this.bindTemplate;this.setTemplate({tag:"div",attributes:{class:["ck","ck-dropdown-menu-list__nested-menu",s.to("class"),s.if("isEnabled","ck-disabled",a=>!a)],role:"presentation"},children:[this.buttonView]}),this.parentMenuView=r,this.parentMenuView&&this._handleParentMenuView(),this._attachBehaviors()}get _panelPositions(){const{westSouth:t,eastSouth:e,westNorth:n,eastNorth:i}=UC;return this.locale.uiLanguageDirection==="ltr"?[e,i,t,n]:[t,n,e,i]}render(){super.render(),this.panelView.render(),this.focusTracker.add(this.buttonView.element),this.focusTracker.add(this.panelView.element),this.focusTracker.add(this.listView),this.keystrokes.listenTo(this.element),this._mountPanelOnOpen()}destroy(){this._removePanelFromBody(),this.panelView.destroy(),super.destroy()}focus(){this.buttonView.focus()}_handleParentMenuView(){this.delegate(...Wc.DELEGATED_EVENTS).to(this.parentMenuView),Qn.closeOnParentClose(this,this.parentMenuView)}_attachBehaviors(){Qn.openOnButtonClick(this),Qn.openAndFocusOnEnterKeyPress(this),Qn.openOnArrowRightKey(this),Qn.closeOnEscKey(this),Qn.closeOnArrowLeftKey(this)}_mountPanelOnOpen(){const{panelView:t}=this;this.on("change:isOpen",(e,n,i)=>{e.source===this&&(i||!this._bodyCollection.has(t)?i&&!this._bodyCollection.has(t)&&this._addPanelToBody():this._removePanelFromBody())})}_removePanelFromBody(){const{panelView:t,keystrokes:e}=this;this._bodyCollection.has(t)&&(this._bodyCollection.remove(t),e.stopListening(t.element))}_addPanelToBody(){const{panelView:t,buttonView:e,keystrokes:n}=this;this._bodyCollection.has(t)||(this._bodyCollection.add(t),n.listenTo(t.element),t.pin({positions:this._panelPositions,limiter:A.document.body,element:t.element,target:e.element,fitInViewport:!0}))}};Wc.DELEGATED_EVENTS=["mouseenter","execute","change:isOpen"];let Zg=Wc;class Jg extends J{constructor(t){super(t),this.setTemplate({tag:"span",attributes:{class:["ck","ck-toolbar__separator"]}})}}class WC extends J{constructor(t){super(t),this.setTemplate({tag:"span",attributes:{class:["ck","ck-toolbar__line-break"]}})}}function Xg(o){if(Array.isArray(o))return{items:o,removeItems:[]};const t={items:[],removeItems:[]};return o?{...t,...o}:t}var ra=T(9677),mo={attributes:{"data-cke":!0}};mo.setAttributes=U(),mo.insert=H().bind(null,"head"),mo.domAPI=V(),mo.insertStyleElement=q(),j()(ra.A,mo),ra.A&&ra.A.locals&&ra.A.locals;const KC=(()=>({alignLeft:Q.alignLeft,bold:Q.bold,importExport:Q.importExport,paragraph:Q.paragraph,plus:Q.plus,text:Q.text,threeVerticalDots:Q.threeVerticalDots,pilcrow:Q.pilcrow,dragIndicator:Q.dragIndicator}))();class _d extends J{constructor(t,e){super(t);const n=this.bindTemplate,i=this.t;this.options=e||{},this.set("ariaLabel",i("Editor toolbar")),this.set("maxWidth","auto"),this.items=this.createCollection(),this.focusTracker=new Bt,this.keystrokes=new Ut,this.set("class",void 0),this.set("isCompact",!1),this.itemsView=new $C(t),this.children=this.createCollection(),this.children.add(this.itemsView),this.focusables=this.createCollection();const r=t.uiLanguageDirection==="rtl";this._focusCycler=new ye({focusables:this.focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:[r?"arrowright":"arrowleft","arrowup"],focusNext:[r?"arrowleft":"arrowright","arrowdown"]}});const s=["ck","ck-toolbar",n.to("class"),n.if("isCompact","ck-toolbar_compact")];var a;this.options.shouldGroupWhenFull&&this.options.isFloating&&s.push("ck-toolbar_floating"),this.setTemplate({tag:"div",attributes:{class:s,role:"toolbar","aria-label":n.to("ariaLabel"),style:{maxWidth:n.to("maxWidth")},tabindex:-1},children:this.children,on:{mousedown:(a=this,a.bindTemplate.to(c=>{c.target===a.element&&c.preventDefault()}))}}),this._behavior=this.options.shouldGroupWhenFull?new QC(this):new YC(this)}render(){super.render(),this.focusTracker.add(this.element);for(const t of this.items)this.focusTracker.add(t);this.items.on("add",(t,e)=>{this.focusTracker.add(e)}),this.items.on("remove",(t,e)=>{this.focusTracker.remove(e)}),this.keystrokes.listenTo(this.element),this._behavior.render(this)}destroy(){return this._behavior.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy(),super.destroy()}focus(){this._focusCycler.focusFirst()}focusLast(){this._focusCycler.focusLast()}fillFromConfig(t,e,n){this.items.addMany(this._buildItemsFromConfig(t,e,n))}_buildItemsFromConfig(t,e,n){const i=Xg(t),r=n||i.removeItems;return this._cleanItemsConfiguration(i.items,e,r).map(s=>_t(s)?this._createNestedToolbarDropdown(s,e,r):s==="|"?new Jg:s==="-"?new WC:e.create(s)).filter(s=>!!s)}_cleanItemsConfiguration(t,e,n){const i=t.filter((r,s,a)=>r==="|"||n.indexOf(r)===-1&&(r==="-"?!this.options.shouldGroupWhenFull||(st("toolbarview-line-break-ignored-when-grouping-items",a),!1):!(!_t(r)&&!e.has(r))||(st("toolbarview-item-unavailable",{item:r}),!1)));return this._cleanSeparatorsAndLineBreaks(i)}_cleanSeparatorsAndLineBreaks(t){const e=s=>s!=="-"&&s!=="|",n=t.length,i=t.findIndex(e);if(i===-1)return[];const r=n-t.slice().reverse().findIndex(e);return t.slice(i,r).filter((s,a,c)=>e(s)?!0:!(a>0&&c[a-1]===s))}_createNestedToolbarDropdown(t,e,n){let{label:i,icon:r,items:s,tooltip:a=!0,withText:c=!1}=t;if(s=this._cleanItemsConfiguration(s,e,n),!s.length)return null;const l=nn(this.locale);return i||st("toolbarview-nested-toolbar-dropdown-missing-label",t),l.class="ck-toolbar__nested-toolbar-dropdown",l.buttonView.set({label:i,tooltip:a,withText:!!c}),r!==!1?l.buttonView.icon=KC[r]||r||Q.threeVerticalDots:l.buttonView.withText=!0,Cd(l,()=>l.toolbarView._buildItemsFromConfig(s,e,n)),l}}class $C extends J{constructor(t){super(t),this.children=this.createCollection(),this.setTemplate({tag:"div",attributes:{class:["ck","ck-toolbar__items"]},children:this.children})}}class YC{constructor(t){const e=t.bindTemplate;t.set("isVertical",!1),t.itemsView.children.bindTo(t.items).using(n=>n),t.focusables.bindTo(t.items).using(n=>Ui(n)?n:null),t.extendTemplate({attributes:{class:[e.if("isVertical","ck-toolbar_vertical")]}})}render(){}destroy(){}}class QC{constructor(t){this.resizeObserver=null,this.cachedPadding=null,this.shouldUpdateGroupingOnNextResize=!1,this.view=t,this.viewChildren=t.children,this.viewFocusables=t.focusables,this.viewItemsView=t.itemsView,this.viewFocusTracker=t.focusTracker,this.viewLocale=t.locale,this.ungroupedItems=t.createCollection(),this.groupedItems=t.createCollection(),this.groupedItemsDropdown=this._createGroupedItemsDropdown(),t.itemsView.children.bindTo(this.ungroupedItems).using(e=>e),this.ungroupedItems.on("change",this._updateFocusCyclableItems.bind(this)),t.children.on("change",this._updateFocusCyclableItems.bind(this)),t.items.on("change",(e,n)=>{const i=n.index,r=Array.from(n.added);for(const s of n.removed)i>=this.ungroupedItems.length?this.groupedItems.remove(s):this.ungroupedItems.remove(s);for(let s=i;s<i+r.length;s++){const a=r[s-i];s>this.ungroupedItems.length?this.groupedItems.add(a,s-this.ungroupedItems.length):this.ungroupedItems.add(a,s)}this._updateGrouping()}),t.extendTemplate({attributes:{class:["ck-toolbar_grouping"]}})}render(t){this.viewElement=t.element,this._enableGroupingOnResize(),this._enableGroupingOnMaxWidthChange(t)}destroy(){this.groupedItemsDropdown.destroy(),this.resizeObserver.destroy()}_updateGrouping(){if(!this.viewElement.ownerDocument.body.contains(this.viewElement))return;if(!Oe(this.viewElement))return void(this.shouldUpdateGroupingOnNextResize=!0);const t=this.groupedItems.length;let e;for(;this._areItemsOverflowing;)this._groupLastItem(),e=!0;if(!e&&this.groupedItems.length){for(;this.groupedItems.length&&!this._areItemsOverflowing;)this._ungroupFirstItem();this._areItemsOverflowing&&this._groupLastItem()}this.groupedItems.length!==t&&this.view.fire("groupedItemsUpdate")}get _areItemsOverflowing(){if(!this.ungroupedItems.length)return!1;const t=this.viewElement,e=this.viewLocale.uiLanguageDirection,n=new it(t.lastChild),i=new it(t);if(!this.cachedPadding){const r=A.window.getComputedStyle(t),s=e==="ltr"?"paddingRight":"paddingLeft";this.cachedPadding=Number.parseInt(r[s])}return e==="ltr"?n.right>i.right-this.cachedPadding:n.left<i.left+this.cachedPadding}_enableGroupingOnResize(){let t;this.resizeObserver=new bi(this.viewElement,e=>{t&&t===e.contentRect.width&&!this.shouldUpdateGroupingOnNextResize||(this.shouldUpdateGroupingOnNextResize=!1,this._updateGrouping(),t=e.contentRect.width)}),this._updateGrouping()}_enableGroupingOnMaxWidthChange(t){t.on("change:maxWidth",()=>{this._updateGrouping()})}_groupLastItem(){this.groupedItems.length||(this.viewChildren.add(new Jg),this.viewChildren.add(this.groupedItemsDropdown),this.viewFocusTracker.add(this.groupedItemsDropdown.element)),this.groupedItems.add(this.ungroupedItems.remove(this.ungroupedItems.last),0)}_ungroupFirstItem(){this.ungroupedItems.add(this.groupedItems.remove(this.groupedItems.first)),this.groupedItems.length||(this.viewChildren.remove(this.groupedItemsDropdown),this.viewChildren.remove(this.viewChildren.last),this.viewFocusTracker.remove(this.groupedItemsDropdown.element))}_createGroupedItemsDropdown(){const t=this.viewLocale,e=t.t,n=nn(t);return n.class="ck-toolbar__grouped-dropdown",n.panelPosition=t.uiLanguageDirection==="ltr"?"sw":"se",Cd(n,this.groupedItems),n.buttonView.set({label:e("Show more items"),tooltip:!0,tooltipPosition:t.uiLanguageDirection==="rtl"?"se":"sw",icon:Q.threeVerticalDots}),n}_updateFocusCyclableItems(){this.viewFocusables.clear(),this.ungroupedItems.map(t=>{Ui(t)&&this.viewFocusables.add(t)}),this.groupedItems.length&&this.viewFocusables.add(this.groupedItemsDropdown)}}var sa=T(1792),go={attributes:{"data-cke":!0}};go.setAttributes=U(),go.insert=H().bind(null,"head"),go.domAPI=V(),go.insertStyleElement=q(),j()(sa.A,go),sa.A&&sa.A.locals&&sa.A.locals;class aa extends J{constructor(t,e){super(t);const n=this.bindTemplate;this.set("class",void 0),this.set("labelStyle",void 0),this.set("icon",void 0),this.set("isEnabled",!0),this.set("isOn",!1),this.set("isToggleable",!1),this.set("isVisible",!0),this.set("keystroke",void 0),this.set("withKeystroke",!1),this.set("label",void 0),this.set("tabindex",-1),this.set("tooltip",!1),this.set("tooltipPosition","s"),this.set("type","button"),this.set("withText",!1),this.children=this.createCollection(),this.actionView=this._createActionView(e),this.arrowView=this._createArrowView(),this.keystrokes=new Ut,this.focusTracker=new Bt,this.setTemplate({tag:"div",attributes:{class:["ck","ck-splitbutton",n.to("class"),n.if("isVisible","ck-hidden",i=>!i),this.arrowView.bindTemplate.if("isOn","ck-splitbutton_open")]},children:this.children})}render(){super.render(),this.children.add(this.actionView),this.children.add(this.arrowView),this.focusTracker.add(this.actionView.element),this.focusTracker.add(this.arrowView.element),this.keystrokes.listenTo(this.element),this.keystrokes.set("arrowright",(t,e)=>{this.focusTracker.focusedElement===this.actionView.element&&(this.arrowView.focus(),e())}),this.keystrokes.set("arrowleft",(t,e)=>{this.focusTracker.focusedElement===this.arrowView.element&&(this.actionView.focus(),e())})}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}focus(){this.actionView.focus()}_createActionView(t){const e=t||new at;return t||e.bind("icon","isEnabled","isOn","isToggleable","keystroke","label","tabindex","tooltip","tooltipPosition","type","withText").to(this),e.extendTemplate({attributes:{class:"ck-splitbutton__action"}}),e.delegate("execute").to(this),e}_createArrowView(){const t=new at,e=t.bindTemplate;return t.icon=Ji,t.extendTemplate({attributes:{class:["ck-splitbutton__arrow"],"data-cke-tooltip-disabled":e.to("isOn"),"aria-haspopup":!0,"aria-expanded":e.to("isOn",n=>String(n))}}),t.bind("isEnabled").to(this),t.bind("label").to(this),t.bind("tooltip").to(this),t.delegate("execute").to(this,"open"),t}}var ca=T(1666),po={attributes:{"data-cke":!0}};po.setAttributes=U(),po.insert=H().bind(null,"head"),po.domAPI=V(),po.insertStyleElement=q(),j()(ca.A,po),ca.A&&ca.A.locals&&ca.A.locals;var la=T(3629),ko={attributes:{"data-cke":!0}};ko.setAttributes=U(),ko.insert=H().bind(null,"head"),ko.domAPI=V(),ko.insertStyleElement=q(),j()(la.A,ko),la.A&&la.A.locals&&la.A.locals;function nn(o,t=jC){const e=typeof t=="function"?new t(o):t,n=new FC(o),i=new wd(o,e,n);return e.bind("isEnabled").to(i),e instanceof aa?e.arrowView.bind("isOn").to(i,"isOpen"):e.bind("isOn").to(i,"isOpen"),function(r){(function(s){ss({emitter:s,activator:()=>s.isRendered&&s.isOpen,callback:()=>{s.isOpen=!1},contextElements:()=>[s.element,...op(s.focusTracker).filter(a=>!s.element.contains(a))]})})(r),function(s){s.on("execute",a=>{a.source instanceof Vs||(s.isOpen=!1)})}(r),function(s){s.focusTracker.on("change:isFocused",(a,c,l)=>{!l&&s.isOpen&&(s.isOpen=!1)})}(r),function(s){s.keystrokes.set("arrowdown",(a,c)=>{s.isOpen&&(s.panelView.focus(),c())}),s.keystrokes.set("arrowup",(a,c)=>{s.isOpen&&(s.panelView.focusLast(),c())})}(r),function(s){s.on("change:isOpen",(a,c,l)=>{l||s.focusTracker.elements.some(d=>d.contains(A.document.activeElement))&&s.buttonView.focus()})}(r),function(s){s.on("change:isOpen",(a,c,l)=>{l&&s.panelView.focus()},{priority:"low"})}(r)}(i),i}function Cd(o,t,e={}){o.extendTemplate({attributes:{class:["ck-toolbar-dropdown"]}}),o.isOpen?tp(o,t,e):o.once("change:isOpen",()=>tp(o,t,e),{priority:"highest"}),e.enableActiveItemFocusOnDropdownOpen&&ip(o,()=>o.toolbarView.items.find(n=>n.isOn))}function tp(o,t,e){const n=o.locale,i=n.t,r=o.toolbarView=new _d(n),s=typeof t=="function"?t():t;r.ariaLabel=e.ariaLabel||i("Dropdown toolbar"),e.maxWidth&&(r.maxWidth=e.maxWidth),e.class&&(r.class=e.class),e.isCompact&&(r.isCompact=e.isCompact),e.isVertical&&(r.isVertical=!0),s instanceof be?r.items.bindTo(s).using(a=>a):r.items.addMany(s),o.panelView.children.add(r),o.focusTracker.add(r),r.items.delegate("execute").to(o)}function ep(o,t,e={}){o.isOpen?np(o,t,e):o.once("change:isOpen",()=>np(o,t,e),{priority:"highest"}),ip(o,()=>o.listView.items.find(n=>n instanceof en&&n.children.first.isOn))}function np(o,t,e){const n=o.locale,i=o.listView=new Xs(n),r=typeof t=="function"?t():t;i.ariaLabel=e.ariaLabel,i.role=e.role,rp(o,i.items,r,n),o.panelView.children.add(i),i.items.delegate("execute").to(o)}function ip(o,t){o.on("change:isOpen",()=>{if(!o.isOpen)return;const e=t();e&&(typeof e.focus=="function"?e.focus():st("ui-dropdown-focus-child-on-open-child-missing-focus",{view:e}))},{priority:Ge.low-10})}function op(o){return[...o.elements,...o.externalViews.flatMap(t=>op(t.focusTracker))]}function rp(o,t,e,n){t.on("change",()=>{const i=[...t].reduce((s,a)=>(a instanceof en&&a.children.first instanceof _n&&s.push(a.children.first),s),[]),r=i.some(s=>s.isToggleable);i.forEach(s=>{s.hasCheckSpace=r})}),t.bindTo(e).using(i=>{if(i.type==="separator")return new Ad(n);if(i.type==="group"){const r=new Zs(n);return r.set({label:i.label}),rp(o,r.items,i.items,n),r.items.delegate("execute").to(o),r}if(i.type==="button"||i.type==="switchbutton"){const r=i.model.role==="menuitemcheckbox"||i.model.role==="menuitemradio",s=new en(n);let a;return i.type==="button"?(a=new _n(n),a.set({isToggleable:r})):a=new Vs(n),a.bind(...Object.keys(i.model)).to(i.model),a.delegate("execute").to(s),s.children.add(a),s}return null})}const da=(o,t,e)=>{const n=new RC(o.locale);return n.set({id:t,ariaDescribedById:e}),n.bind("isReadOnly").to(o,"isEnabled",i=>!i),n.bind("hasError").to(o,"errorText",i=>!!i),n.on("input",()=>{o.errorText=null}),o.bind("isEmpty","isFocused","placeholder").to(n),n};var ua=T(1905),fo={attributes:{"data-cke":!0}};fo.setAttributes=U(),fo.insert=H().bind(null,"head"),fo.domAPI=V(),fo.insertStyleElement=q(),j()(ua.A,fo),ua.A&&ua.A.locals&&ua.A.locals;var ha=T(6309),bo={attributes:{"data-cke":!0}};bo.setAttributes=U(),bo.insert=H().bind(null,"head"),bo.domAPI=V(),bo.insertStyleElement=q(),j()(ha.A,bo),ha.A&&ha.A.locals&&ha.A.locals;class ZC{constructor(t){this._components=new Map,this.editor=t}*names(){for(const t of this._components.values())yield t.originalName}add(t,e){this._components.set(vd(t),{callback:e,originalName:t})}create(t){if(!this.has(t))throw new E("componentfactory-item-missing",this,{name:t});return this._components.get(vd(t)).callback(this.editor.locale)}has(t){return this._components.has(vd(t))}}function vd(o){return String(o).toLowerCase()}var ma=T(9205),wo={attributes:{"data-cke":!0}};wo.setAttributes=U(),wo.insert=H().bind(null,"head"),wo.domAPI=V(),wo.insertStyleElement=q(),j()(ma.A,wo),ma.A&&ma.A.locals&&ma.A.locals;const sp="ck-tooltip",Ot=class Ot extends le(){constructor(t){if(super(),this._currentElementWithTooltip=null,this._currentTooltipPosition=null,this._mutationObserver=null,Ot._editors.add(t),Ot._instance)return Ot._instance;Ot._instance=this,this.tooltipTextView=new J(t.locale),this.tooltipTextView.set("text",""),this.tooltipTextView.setTemplate({tag:"span",attributes:{class:["ck","ck-tooltip__text"]},children:[{text:this.tooltipTextView.bindTemplate.to("text")}]}),this.balloonPanelView=new Ve(t.locale),this.balloonPanelView.class=sp,this.balloonPanelView.content.add(this.tooltipTextView),this._mutationObserver=function(e){const n=new MutationObserver(()=>{e()});return{attach(i){n.observe(i,{attributes:!0,attributeFilter:["data-cke-tooltip-text","data-cke-tooltip-position"]})},detach(){n.disconnect()}}}(()=>{this._updateTooltipPosition()}),this._pinTooltipDebounced=bn(this._pinTooltip,600),this._unpinTooltipDebounced=bn(this._unpinTooltip,400),this.listenTo(A.document,"keydown",this._onKeyDown.bind(this),{useCapture:!0}),this.listenTo(A.document,"mouseenter",this._onEnterOrFocus.bind(this),{useCapture:!0}),this.listenTo(A.document,"mouseleave",this._onLeaveOrBlur.bind(this),{useCapture:!0}),this.listenTo(A.document,"focus",this._onEnterOrFocus.bind(this),{useCapture:!0}),this.listenTo(A.document,"blur",this._onLeaveOrBlur.bind(this),{useCapture:!0}),this.listenTo(A.document,"scroll",this._onScroll.bind(this),{useCapture:!0}),this._watchdogExcluded=!0}destroy(t){const e=t.ui.view&&t.ui.view.body;Ot._editors.delete(t),this.stopListening(t.ui),e&&e.has(this.balloonPanelView)&&e.remove(this.balloonPanelView),Ot._editors.size||(this._unpinTooltip(),this.balloonPanelView.destroy(),this.stopListening(),Ot._instance=null)}static getPositioningFunctions(t){const e=Ot.defaultBalloonPositions;return{s:[e.southArrowNorth,e.southArrowNorthEast,e.southArrowNorthWest],n:[e.northArrowSouth],e:[e.eastArrowWest],w:[e.westArrowEast],sw:[e.southArrowNorthEast],se:[e.southArrowNorthWest]}[t]}_onKeyDown(t,e){e.key==="Escape"&&this._currentElementWithTooltip&&(this._unpinTooltip(),e.stopPropagation())}_onEnterOrFocus(t,{target:e}){const n=xd(e);n?n!==this._currentElementWithTooltip&&(this._unpinTooltip(),t.name!=="focus"||n.matches(":hover")?this._pinTooltipDebounced(n,Ed(n)):this._pinTooltip(n,Ed(n))):t.name==="focus"&&this._unpinTooltip()}_onLeaveOrBlur(t,{target:e,relatedTarget:n}){if(t.name==="mouseleave"){if(!Ke(e))return;const i=this.balloonPanelView.element,r=i&&(i===n||i.contains(n)),s=!r&&e===i;if(r)return void this._unpinTooltipDebounced.cancel();if(!s&&this._currentElementWithTooltip&&e!==this._currentElementWithTooltip)return;const a=xd(e),c=xd(n);(s||a&&a!==c)&&this._unpinTooltipDebounced()}else{if(this._currentElementWithTooltip&&e!==this._currentElementWithTooltip)return;this._unpinTooltipDebounced()}}_onScroll(t,{target:e}){this._currentElementWithTooltip&&(e.contains(this.balloonPanelView.element)&&e.contains(this._currentElementWithTooltip)||this._unpinTooltip())}_pinTooltip(t,{text:e,position:n,cssClass:i}){this._unpinTooltip();const r=Lt(Ot._editors.values()).ui.view.body;r.has(this.balloonPanelView)||r.add(this.balloonPanelView),this.tooltipTextView.text=e,this.balloonPanelView.class=[sp,i].filter(s=>s).join(" "),this.balloonPanelView.pin({target:t,positions:Ot.getPositioningFunctions(n)}),this._mutationObserver.attach(t);for(const s of Ot._editors)this.listenTo(s.ui,"update",this._updateTooltipPosition.bind(this),{priority:"low"});this._currentElementWithTooltip=t,this._currentTooltipPosition=n}_unpinTooltip(){this._unpinTooltipDebounced.cancel(),this._pinTooltipDebounced.cancel(),this.balloonPanelView.unpin();for(const t of Ot._editors)this.stopListening(t.ui,"update");this._currentElementWithTooltip=null,this._currentTooltipPosition=null,this.tooltipTextView.text="",this._mutationObserver.detach()}_updateTooltipPosition(){if(!this._currentElementWithTooltip)return;const t=Ed(this._currentElementWithTooltip);Oe(this._currentElementWithTooltip)&&t.text?this.balloonPanelView.pin({target:this._currentElementWithTooltip,positions:Ot.getPositioningFunctions(t.position)}):this._unpinTooltip()}};Ot.defaultBalloonPositions=Ve.generatePositions({heightOffset:5,sideOffset:13}),Ot._editors=new Set,Ot._instance=null;let yd=Ot;function xd(o){return Ke(o)?o.closest("[data-cke-tooltip-text]:not([data-cke-tooltip-disabled])"):null}function Ed(o){return{text:o.dataset.ckeTooltipText,position:o.dataset.ckeTooltipPosition||"s",cssClass:o.dataset.ckeTooltipClass||""}}class JC extends le(){constructor(t){super(),this.editor=t,this._balloonView=null,this._lastFocusedEditableElement=null,this._showBalloonThrottled=Is(this._showBalloon.bind(this),50,{leading:!0}),t.on("ready",this._handleEditorReady.bind(this))}destroy(){const t=this._balloonView;t&&(t.unpin(),this._balloonView=null),this._showBalloonThrottled.cancel(),this.stopListening()}_handleEditorReady(){const t=this.editor;(t.config.get("ui.poweredBy.forceVisible")||function(e){function n(m){return m.length>=40&&m.length<=255?"VALID":"INVALID"}if(!e)return"INVALID";let i="";try{i=atob(e)}catch{return"INVALID"}const r=i.split("-"),s=r[0],a=r[1];if(!a)return n(e);try{atob(a)}catch{try{if(atob(s),!atob(s).length)return n(e)}catch{return n(e)}}if(s.length<40||s.length>255)return"INVALID";let c="";try{atob(s),c=atob(a)}catch{return"INVALID"}if(c.length!==8)return"INVALID";const l=Number(c.substring(0,4)),d=Number(c.substring(4,6))-1,u=Number(c.substring(6,8)),h=new Date(l,d,u);return h<Bb||isNaN(Number(h))?"INVALID":"VALID"}(t.config.get("licenseKey"))!=="VALID")&&t.ui.view&&(t.ui.focusTracker.on("change:isFocused",(e,n,i)=>{this._updateLastFocusedEditableElement(),i?this._showBalloon():this._hideBalloon()}),t.ui.focusTracker.on("change:focusedElement",(e,n,i)=>{this._updateLastFocusedEditableElement(),i&&this._showBalloon()}),t.ui.on("update",()=>{this._showBalloonThrottled()}))}_createBalloonView(){const t=this.editor,e=this._balloonView=new Ve,n=cp(t),i=new XC(t.locale,n.label);e.content.add(i),e.set({class:"ck-powered-by-balloon"}),t.ui.view.body.add(e),this._balloonView=e}_showBalloon(){if(!this._lastFocusedEditableElement)return;const t=function(e,n){const i=cp(e),r=i.side==="right"?function(s,a){return ap(s,a,(c,l)=>c.left+c.width-l.width-a.horizontalOffset)}(n,i):function(s,a){return ap(s,a,c=>c.left+a.horizontalOffset)}(n,i);return{target:n,positions:[r]}}(this.editor,this._lastFocusedEditableElement);t&&(this._balloonView||this._createBalloonView(),this._balloonView.pin(t))}_hideBalloon(){this._balloonView&&this._balloonView.unpin()}_updateLastFocusedEditableElement(){const t=this.editor,e=t.ui.focusTracker.isFocused,n=t.ui.focusTracker.focusedElement;if(!e||!n)return void(this._lastFocusedEditableElement=null);const i=Array.from(t.ui.getEditableElementsNames()).map(r=>t.ui.getEditableElement(r));i.includes(n)?this._lastFocusedEditableElement=n:this._lastFocusedEditableElement=i[0]}}class XC extends J{constructor(t,e){super(t);const n=new ue,i=this.bindTemplate;n.set({content:`<svg xmlns="http://www.w3.org/2000/svg" width="53" height="10" viewBox="0 0 53 10"><path fill="#1C2331" d="M31.724 1.492a15.139 15.139 0 0 0 .045 1.16 2.434 2.434 0 0 0-.687-.34 3.68 3.68 0 0 0-1.103-.166 2.332 2.332 0 0 0-1.14.255 1.549 1.549 0 0 0-.686.87c-.15.41-.225.98-.225 1.712 0 .939.148 1.659.444 2.161.297.503.792.754 1.487.754.452.015.9-.094 1.294-.316.296-.174.557-.4.771-.669l.14.852h1.282V.007h-1.623v1.485ZM31 6.496a1.77 1.77 0 0 1-.494.061.964.964 0 0 1-.521-.127.758.758 0 0 1-.296-.466 3.984 3.984 0 0 1-.093-.992 4.208 4.208 0 0 1 .098-1.052.753.753 0 0 1 .307-.477 1.08 1.08 0 0 1 .55-.122c.233-.004.466.026.69.089l.483.144v2.553c-.11.076-.213.143-.307.2a1.73 1.73 0 0 1-.417.189ZM35.68 0l-.702.004c-.322.002-.482.168-.48.497l.004.581c.002.33.164.493.486.49l.702-.004c.322-.002.481-.167.48-.496L36.165.49c-.002-.33-.164-.493-.486-.491ZM36.145 2.313l-1.612.01.034 5.482 1.613-.01-.035-5.482ZM39.623.79 37.989.8 38 2.306l-.946.056.006 1.009.949-.006.024 2.983c.003.476.143.844.419 1.106.275.26.658.39 1.148.387.132 0 .293-.01.483-.03.19-.02.38-.046.57-.08.163-.028.324-.068.482-.119l-.183-1.095-.702.004a.664.664 0 0 1-.456-.123.553.553 0 0 1-.14-.422l-.016-2.621 1.513-.01-.006-1.064-1.514.01-.01-1.503ZM46.226 2.388c-.41-.184-.956-.274-1.636-.27-.673.004-1.215.101-1.627.29-.402.179-.72.505-.888.91-.18.419-.268.979-.264 1.68.004.688.1 1.24.285 1.655.172.404.495.724.9.894.414.18.957.268 1.63.264.68-.004 1.224-.099 1.632-.284.4-.176.714-.501.878-.905.176-.418.263-.971.258-1.658-.004-.702-.097-1.261-.28-1.677a1.696 1.696 0 0 0-.888-.9Zm-.613 3.607a.77.77 0 0 1-.337.501 1.649 1.649 0 0 1-1.317.009.776.776 0 0 1-.343-.497 4.066 4.066 0 0 1-.105-1.02 4.136 4.136 0 0 1 .092-1.03.786.786 0 0 1 .337-.507 1.59 1.59 0 0 1 1.316-.008.79.79 0 0 1 .344.502c.078.337.113.683.105 1.03.012.343-.019.685-.092 1.02ZM52.114 2.07a2.67 2.67 0 0 0-1.128.278c-.39.191-.752.437-1.072.73l-.157-.846-1.273.008.036 5.572 1.623-.01-.024-3.78c.35-.124.646-.22.887-.286.26-.075.53-.114.8-.118l.45-.003.144-1.546-.286.001ZM22.083 7.426l-1.576-2.532a2.137 2.137 0 0 0-.172-.253 1.95 1.95 0 0 0-.304-.29.138.138 0 0 1 .042-.04 1.7 1.7 0 0 0 .328-.374l1.75-2.71c.01-.015.025-.028.024-.048-.01-.01-.021-.007-.031-.007L20.49 1.17a.078.078 0 0 0-.075.045l-.868 1.384c-.23.366-.46.732-.688 1.099a.108.108 0 0 1-.112.06c-.098-.005-.196-.001-.294-.002-.018 0-.038.006-.055-.007.002-.02.002-.039.005-.058a4.6 4.6 0 0 0 .046-.701V1.203c0-.02-.009-.032-.03-.03h-.033L16.93 1.17c-.084 0-.073-.01-.073.076v6.491c-.001.018.006.028.025.027h1.494c.083 0 .072.007.072-.071v-2.19c0-.055-.003-.11-.004-.166a3.366 3.366 0 0 0-.05-.417h.06c.104 0 .209.002.313-.002a.082.082 0 0 1 .084.05c.535.913 1.07 1.824 1.607 2.736a.104.104 0 0 0 .103.062c.554-.003 1.107-.002 1.66-.002l.069-.003-.019-.032-.188-.304ZM27.112 6.555c-.005-.08-.004-.08-.082-.08h-2.414c-.053 0-.106-.003-.159-.011a.279.279 0 0 1-.246-.209.558.558 0 0 1-.022-.15c0-.382 0-.762-.002-1.143 0-.032.007-.049.042-.044h2.504c.029.003.037-.012.034-.038V3.814c0-.089.013-.078-.076-.078h-2.44c-.07 0-.062.003-.062-.06v-.837c0-.047.004-.093.013-.14a.283.283 0 0 1 .241-.246.717.717 0 0 1 .146-.011h2.484c.024.002.035-.009.036-.033l.003-.038.03-.496c.01-.183.024-.365.034-.548.005-.085.003-.087-.082-.094-.218-.018-.437-.038-.655-.05a17.845 17.845 0 0 0-.657-.026 72.994 72.994 0 0 0-1.756-.016 1.7 1.7 0 0 0-.471.064 1.286 1.286 0 0 0-.817.655c-.099.196-.149.413-.145.633v3.875c0 .072.003.144.011.216a1.27 1.27 0 0 0 .711 1.029c.228.113.48.167.734.158.757-.005 1.515.002 2.272-.042.274-.016.548-.034.82-.053.03-.002.043-.008.04-.041-.008-.104-.012-.208-.019-.312a69.964 69.964 0 0 1-.05-.768ZM16.14 7.415l-.127-1.075c-.004-.03-.014-.04-.044-.037a13.125 13.125 0 0 1-.998.073c-.336.01-.672.02-1.008.016-.116-.001-.233-.014-.347-.039a.746.746 0 0 1-.45-.262c-.075-.1-.132-.211-.167-.33a3.324 3.324 0 0 1-.126-.773 9.113 9.113 0 0 1-.015-.749c0-.285.022-.57.065-.852.023-.158.066-.312.127-.46a.728.728 0 0 1 .518-.443 1.64 1.64 0 0 1 .397-.048c.628-.001 1.255.003 1.882.05.022.001.033-.006.036-.026l.003-.031.06-.55c.019-.177.036-.355.057-.532.004-.034-.005-.046-.04-.056a5.595 5.595 0 0 0-1.213-.21 10.783 10.783 0 0 0-.708-.02c-.24-.003-.48.01-.719.041a3.477 3.477 0 0 0-.625.14 1.912 1.912 0 0 0-.807.497c-.185.2-.33.433-.424.688a4.311 4.311 0 0 0-.24 1.096c-.031.286-.045.572-.042.86-.006.43.024.86.091 1.286.04.25.104.497.193.734.098.279.26.53.473.734.214.205.473.358.756.446.344.11.702.17 1.063.177a8.505 8.505 0 0 0 1.578-.083 6.11 6.11 0 0 0 .766-.18c.03-.008.047-.023.037-.057a.157.157 0 0 1-.003-.025Z"/><path fill="#AFE229" d="M6.016 6.69a1.592 1.592 0 0 0-.614.21c-.23.132-.422.32-.56.546-.044.072-.287.539-.287.539l-.836 1.528.009.006c.038.025.08.046.123.063.127.046.26.07.395.073.505.023 1.011-.007 1.517-.003.29.009.58.002.869-.022a.886.886 0 0 0 .395-.116.962.962 0 0 0 .312-.286c.056-.083.114-.163.164-.249.24-.408.48-.816.718-1.226.075-.128.148-.257.222-.386l.112-.192a1.07 1.07 0 0 0 .153-.518l-1.304.023s-1.258-.005-1.388.01Z"/><path fill="#771BFF" d="m2.848 9.044.76-1.39.184-.352c-.124-.067-.245-.14-.367-.21-.346-.204-.706-.384-1.045-.6a.984.984 0 0 1-.244-.207c-.108-.134-.136-.294-.144-.46-.021-.409-.002-.818-.009-1.227-.003-.195 0-.39.003-.585.004-.322.153-.553.427-.713l.833-.488c.22-.13.44-.257.662-.385.05-.029.105-.052.158-.077.272-.128.519-.047.76.085l.044.028c.123.06.242.125.358.196.318.178.635.357.952.537.095.056.187.117.275.184.194.144.254.35.266.578.016.284.007.569.006.853-.001.28.004.558 0 .838.592-.003 1.259 0 1.259 0l.723-.013c-.003-.292-.007-.584-.007-.876 0-.524.015-1.048-.016-1.571-.024-.42-.135-.8-.492-1.067a5.02 5.02 0 0 0-.506-.339A400.52 400.52 0 0 0 5.94.787C5.722.664 5.513.524 5.282.423 5.255.406 5.228.388 5.2.373 4.758.126 4.305-.026 3.807.21c-.097.046-.197.087-.29.14A699.896 699.896 0 0 0 .783 1.948c-.501.294-.773.717-.778 1.31-.004.36-.009.718-.001 1.077.016.754-.017 1.508.024 2.261.016.304.07.6.269.848.127.15.279.28.448.382.622.4 1.283.734 1.92 1.11l.183.109Z"/></svg>
`;let t="",e=null;for(const n of o.getChildren())t+=Iv(n,e)+xp(n),e=n;return t}function Iv(o,t){return t?o.is("element","li")&&!o.isEmpty&&o.getChild(0).is("containerElement")||yp.includes(o.name)&&yp.includes(t.name)?`

`:o.is("containerElement")||t.is("containerElement")?vp.includes(o.name)||vp.includes(t.name)?`
`:o.is("element")&&o.getCustomProperty("dataPipeline:transparentRendering")||t.is("element")&&t.getCustomProperty("dataPipeline:transparentRendering")?"":`
