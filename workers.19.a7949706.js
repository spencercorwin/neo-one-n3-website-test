self.webpackChunk([19],{2003:function(t,e,n){"use strict";n.d(e,"a",(function(){return F}));n(169),n(38),n(2004),n(122);var i=n(315),a=n(434),s=n(274),r=n(316),o=n(390),c=n(145),g=n(96),l=n.n(g),p=n(2005);let u=0;const S=(t,e,n,r,o)=>{const g=new Map;t.changes$.pipe(Object(c.a)(t=>{g.set(t.id,"".concat(t.seq))})).subscribe();const p=r?e.concat([Object(i.c)("global.d.ts"),Object(i.c)("index.d.ts")]):e,S=Object.assign(Object.assign({},Object(a.a)(t)),{getNewLine:()=>"\n",useCaseSensitiveFileNames:()=>!0,getScriptFileNames:()=>[...p],getCurrentDirectory:()=>"/",getDefaultLibFileName:t=>{const e=l.a.getDefaultLibFilePath(t);return"/node_modules/typescript/lib/".concat(e.slice(2))},getCompilationSettings:()=>n,getScriptVersion:t=>{const e=Object(s.normalizePath)(t);if(o.has(e))return(()=>{const t=u;return u+=1,"".concat(t)})();const n=g.get(e);return void 0===n?"-1":n},getScriptSnapshot:e=>{try{const n=Object(s.normalizePath)(e);let i=o.get(n);void 0===i&&(i=t.readFileSync(n));const a=i;return{getText:(t,e)=>a.substring(t,e),getLength:()=>a.length,getChangeRange:()=>void 0}}catch(t){return}},getScriptKind:t=>{switch(t.substr(t.lastIndexOf(".")+1)){case"ts":return l.a.ScriptKind.TS;case"tsx":return l.a.ScriptKind.TSX;case"js":return l.a.ScriptKind.JS;case"jsx":return l.a.ScriptKind.JSX;default:return n.allowJs?l.a.ScriptKind.JS:l.a.ScriptKind.TS}}});return l.a.createLanguageService(S)},h=t=>{t.forEach(t=>{t.file=void 0;const e=t.relatedInformation;void 0!==e&&e.forEach(t=>{t.file=void 0})})},m=t=>({ConvertTabsToSpaces:t.insertSpaces,TabSize:t.tabSize,IndentSize:t.tabSize,IndentStyle:l.a.IndentStyle.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}),d=t=>t?"\n\n"+t.map(t=>{if("example"===t.name&&t.text)return"*@".concat(t.name,"*\n")+"```typescript-internal\n"+t.text+"\n```\n";const e="*@".concat(t.name,"*");return t.text?e+(t.text.match(/\r\n|\n/g)?" \n"+t.text:" - ".concat(t.text)):e}).join("  \n\n"):"",f={includeCompletionsForModuleExports:!0,includeCompletionsWithInsertText:!0},v={convertTabsToSpaces:!0,tabSize:2,indentSize:2,indentStyle:l.a.IndentStyle.Smart,newLineCharacter:"\n",insertSpaceAfterCommaDelimiter:!0,insertSpaceAfterSemicolonInForStatements:!0,insertSpaceBeforeAndAfterBinaryOperators:!0,insertSpaceAfterKeywordsInControlFlowStatements:!0,insertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,placeOpenBraceOnNewLineForControlBlocks:!1,placeOpenBraceOnNewLineForFunctions:!1},y=new Set([".",'"',"'","`","/","@","<"]);class F{constructor(t){var e=this;let{id:n,endpoint:i,isSmartContract:a,compilerOptions:s,fileNames:c}=t;this.getSyntacticDiagnostics=(t,e)=>this.languageService.then(n=>this.withTmpFS(e,()=>{const e=n.getSyntacticDiagnostics(t);return h(e),e.map(t=>Object.assign(Object.assign({},t),{message:l.a.flattenDiagnosticMessageText(t.messageText,"\n")}))})),this.getSemanticDiagnostics=(t,e)=>Promise.all([this.fs,this.languageService]).then(n=>{let[i,a]=n;return this.withTmpFS(e,()=>{const e=this.isSmartContract?Object(o.getSemanticDiagnostics)(t,a,Object(r.a)({fs:i})):a.getSemanticDiagnostics(t);return h(e),e.map(t=>Object.assign(Object.assign({},t),{message:l.a.flattenDiagnosticMessageText(t.messageText,"\n")}))})}),this.getCompilerOptionsDiagnostics=t=>this.languageService.then(t=>{const e=t.getCompilerOptionsDiagnostics();return h(e),e}),this.getCompletionsAtPosition=(t,e,n,i)=>this.languageService.then(a=>this.withTmpFS(i,()=>{let i;return void 0!==n&&y.has(n)&&(i=n),a.getCompletionsAtPosition(t,e,Object.assign(Object.assign({},f),{triggerCharacter:i}))})),this.getCompletionEntryDetails=function(t,n,i){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:v,s=arguments.length>4?arguments[4]:void 0;return e.languageService.then(e=>e.getCompletionEntryDetails(t,n,i,a,s,f))},this.parseCompletionEntryDetails=async function(t,n,i){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:v,s=arguments.length>4?arguments[4]:void 0;const r=await e.getCompletionEntryDetails(t,n,i,a,s);if(r)return{contents:l.a.displayPartsToString(r.displayParts),documentation:l.a.displayPartsToString(r.documentation),tags:d(r.tags),name:r.name,kind:r.kind,codeActions:r.codeActions}},this.getCodeFixesAtPosition=(t,e,n,i,a)=>this.languageService.then(s=>this.withTmpFS(a,()=>s.getCodeFixesAtPosition(t,e,n,i,v,f))),this.getSignatureHelpItems=(t,e,n)=>this.languageService.then(i=>this.withTmpFS(n,()=>i.getSignatureHelpItems(t,e,void 0))),this.createSignatures=async(t,e,n)=>{const i=await this.getSignatureHelpItems(t,e,n);if(!i)return;const a=[];return i.items.forEach(t=>{const e={label:"",documentation:void 0,parameters:[]};e.label+=l.a.displayPartsToString(t.prefixDisplayParts),t.parameters.forEach((n,i,a)=>{const s=l.a.displayPartsToString(n.displayParts),r={label:s,documentation:{value:l.a.displayPartsToString(n.documentation)}};e.label+=s,e.parameters.push(r),i<a.length-1&&(e.label+=l.a.displayPartsToString(t.separatorDisplayParts))}),e.label+=l.a.displayPartsToString(t.suffixDisplayParts),a.push(e)}),{activeSignature:i.selectedItemIndex,activeParameter:i.argumentIndex,signatures:a}},this.getQuickInfoAtPosition=(t,e)=>this.languageService.then(n=>n.getQuickInfoAtPosition(t,e)),this.parseInfoAtPosition=async(t,e)=>{const n=await this.getQuickInfoAtPosition(t,e);if(n)return{textSpan:n.textSpan,tags:d(n.tags),documentation:l.a.displayPartsToString(n.documentation),contents:l.a.displayPartsToString(n.displayParts)}},this.getOccurrencesAtPosition=(t,e)=>this.languageService.then(n=>n.getOccurrencesAtPosition(t,e)),this.getDefinitionAtPosition=(t,e)=>this.languageService.then(n=>n.getDefinitionAtPosition(t,e)),this.getReferencesAtPosition=(t,e)=>this.languageService.then(n=>n.getReferencesAtPosition(t,e)),this.getNavigationBarItems=t=>this.languageService.then(e=>e.getNavigationBarItems(t)),this.getFormattingEditsForDocument=(t,e)=>this.languageService.then(n=>n.getFormattingEditsForDocument(t,e)),this.getFormattingEditsForRange=(t,e,n,i)=>{const a=m(i);return this.languageService.then(i=>i.getFormattingEditsForRange(t,e,n,a))},this.getFormattingEditsAfterKeystroke=(t,e,n,i)=>{const a=m(i);return this.languageService.then(i=>i.getFormattingEditsAfterKeystroke(t,e,n,a))},this.getEmitOutput=t=>this.languageService.then(e=>e.getEmitOutput(t)),this.fs=Object(p.a)(n,i),this.tmpFS=new Map,this.languageService=this.fs.then(t=>S(t,c,s,a,this.tmpFS)),this.isSmartContract=a}withTmpFS(t,e){this.tmpFS.clear(),Object.entries(t).forEach(t=>{let[e,n]=t;this.tmpFS.set(e,n)});try{return e()}finally{this.tmpFS.clear()}}}},2004:function(t,e,n){"use strict";var i=n(436),a=n(3),s=n(19),r=n(39),o=n(438),c=n(439);i("match",1,(function(t,e,n){return[function(e){var n=r(this),i=null==e?void 0:e[t];return void 0!==i?i.call(e,n):new RegExp(e)[t](String(n))},function(t){var i=n(e,t,this);if(i.done)return i.value;var r=a(t),g=String(this);if(!r.global)return c(r,g);var l=r.unicode;r.lastIndex=0;for(var p,u=[],S=0;null!==(p=c(r,g));){var h=String(p[0]);u[S]=h,""===h&&(r.lastIndex=o(g,s(r.lastIndex),l)),S++}return 0===S?null:u}]}))},2005:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n(38);var i=n(274);const a=async(t,e)=>Object(i.createPouchDBFileSystem)((t=>"".concat(t,"-fs"))(t),e)},87:function(t,e,n){"use strict";n.r(e);var i=n(176),a=n(2003);i.a.expose(a.a,self)}});
//# sourceMappingURL=workers.19.a7949706.js.map