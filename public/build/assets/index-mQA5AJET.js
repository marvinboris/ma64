import{c as F,r as T,j as e,u as D,m as S,L as p,F as d,i as W,k as _,n as v,R as w,o as x}from"./index-BncDn27B.js";import{B as E,S as $,a as R}from"./Subtitle-EIBA-Hk5.js";import{D as A,L as B}from"./Delete-DN_4O9m9.js";import{e as C}from"./Error-CC8F97pB.js";import{F as g}from"./Feedback-C0SvNv4r.js";import{T as I}from"./index-C0jNRMwo.js";import{g as O,d as P,r as J}from"./languages-CMnUc65G.js";import"./app-BShz7gyO.js";import"./BreadcrumbItem-BLbML1-v.js";import"./Table-Cy8UlfKH.js";class M extends T.Component{componentDidMount(){var s,r;(r=(s=this.props).get)==null||r.call(s)}componentWillUnmount(){this.props.reset()}render(){var m,l;if(!((m=this.props.content)!=null&&m.cms)||!((l=this.props.backend)!=null&&l.languages))return null;let{content:{cms:{pages:{components:{list:{action:s}},backend:{pages:{languages:{title:r,add:i,index:c,form:n}}}}}},backend:{languages:{loading:f,error:h,message:j,languages:o,total:u}}}=this.props;const b=e.jsx(e.Fragment,{children:e.jsx(C,{err:h})}),k=this.props.location.state?e.jsx(g,{time:5e3,message:this.props.location.state.message}):null,N=e.jsx(g,{message:j});o||(o=[]);const L=o.map(a=>D(a,{created_at:S(a.created_at),flag:e.jsxs("div",{children:[e.jsx("span",{className:`flag-icon flag-icon-${a.flag.toLowerCase()} mr-1`}),a.flag]}),action:e.jsxs("div",{className:"text-center",children:[e.jsx(p,{to:`/admin/languages/${a.id}`,className:"mx-1",children:e.jsx(d,{icon:W,className:"text-green",fixedWidth:!0})}),e.jsx(p,{to:`/admin/languages/${a.id}/edit`,className:"mx-1",children:e.jsx(d,{icon:_,className:"text-brokenblue",fixedWidth:!0})}),e.jsx("span",{className:"mx-1",children:e.jsx(A,{deleteAction:()=>this.props.delete(a.id),children:e.jsx(d,{icon:v,className:"text-red",fixedWidth:!0})})})]})})),y=e.jsx(e.Fragment,{children:e.jsx(w,{children:e.jsx(B,{array:L,loading:f,data:JSON.stringify(o),get:this.props.get,total:u,bordered:!0,add:i,link:"/admin/languages/add",icon:x,title:c,className:"shadow-sm",fields:[{name:n.name,key:"name"},{name:n.abbr,key:"abbr"},{name:n.flag,key:"flag"},{name:n.created_at,key:"created_at"},{name:s,key:"action"}]})})});return e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[e.jsx(E,{main:c,icon:x}),e.jsx($,{children:r}),e.jsx(R,{children:c})]}),e.jsxs("div",{children:[b,k,N,y]})]})}}const U=t=>({...t}),q=t=>({get:(s,r,i)=>t(O(s,r,i)),delete:s=>t(P(s)),reset:()=>t(J())}),se=F(U,q)(M);export{se as default};
