!function(e){function p(a){var b=!1,c,d=e(a.currentTarget);if(("focusin"==a.type||"click"==a.type)&&1==d.length&&"object"==typeof d[0]){c=d[0].activeElement;if(!e(c).data("markdown"))if("undefined"==typeof e(c).parent().parent().parent().b("class")||0>e(c).parent().parent().parent().b("class").indexOf("md-editor")){if("undefined"==typeof e(c).parent().parent().b("class")||0>e(c).parent().parent().b("class").indexOf("md-editor"))b=!0}else b=!1;b&&e(document).find(".md-editor").g(function(){var a=e(c).parent();
if(e(this).b("id")!=a.b("id")){var b;if(b=e(this).find("textarea").data("markdown"),null==b)b=e(this).find('div[data-provider="markdown-preview"]').data("markdown");b&&b.blur()}});a.stopPropagation()}}function q(a){a.data("markdown")?a.data("markdown").O():a.j(a.data())}function n(a,b){this.C="bootstrap-markdown";this.m=e(a);this.t={M:null,type:null,w:[],J:[],content:null};this.D=e.extend(!0,{},e.l.j.Q,b);this.u=!1;this.a=this.f=null;this.n=[];this.s=[];this.o=[];this.O()}n.prototype={F:function(a,
b){var c="all"==a,d=this;e.g(this.n,function(e,k){var l=!0,l=c?!1:0>k.indexOf(a);!1==l&&b(d.f.find('button[data-handler="'+k+'"]'))})},G:function(a,b){var c,d=this.C,m=this.n,k=this.s;for(c=0;c<a.length;c++){var l,f=a[c];for(l=0;l<f.length;l++){var g,n=f[l].data,s=e("<div/>",{"class":"btn-group"});for(g=0;g<n.length;g++){var h=n[g],p="",q=d+"-"+h.name,r=h.L?h.L:"",t=h.K?h.K:"btn",u=h.tabIndex?h.tabIndex:"-1";!0==h.toggle&&(p=' data-toggle="button"');s.append('<button class="'+t+' btn-small" title="'+
h.title+'" tabindex="'+u+'" data-provider="'+d+'" data-handler="'+q+'"'+p+'><i class="'+h.i+'"></i> '+r+"</button>");m.push(q);k.push(h.h)}b.append(s)}}return b},H:function(){var a="undefined"!=typeof this.a.b("rows"),b=5<this.a.r().split("\n").length?this.a.r().split("\n").length:"5",a=a?this.a.b("rows"):b;this.a.b("rows",a);this.a.A("resize","none");this.a.k("focus",e.q(this.focus,this)).k("keypress",e.q(this.Z,this)).k("keyup",e.q(this.B,this));this.S("keydown")&&this.a.k("keydown",e.q(this.Y,
this));this.a.data("markdown",this)},P:function(a){var b=e(a.currentTarget),c=this.n,d=this.s,b=b.b("data-handler"),c=d[c.indexOf(b)];e(a.currentTarget).focus();c(this);0>b.indexOf("cmdSave")&&this.a.focus();a.preventDefault()},O:function(){var a=this,b,c=this.C,d=this.m;d.A("height");d.A("width");var m=this.t,k=this.n,l=this.s,f=this.D,g=e("<div/>",{"class":"md-editor",click:function(){a.focus()}});null==this.f?(b=e("<div/>",{"class":"md-header"}),0<f.buttons.length&&(b=this.G(f.buttons,b)),0<f.I.length&&
(b=this.G(f.I,b)),g.append(b),d.ka("textarea")?(d.ha(g),b=d,b.v("md-input"),g.append(b)):(b="function"==typeof toMarkdown?toMarkdown(d.p()):d.p(),b=e("<textarea/>",{"class":"md-input",val:e.trim(b)}),g.append(b),m.M=d,m.type=d.ra("tagName").toLowerCase(),m.content=d.p(),e(d[0].attributes).g(function(){m.w.push(this.nodeName);m.J.push(this.nodeValue)}),d.aa(g)),f.ba&&(d=e("<div/>",{"class":"md-footer"}),k.push("cmdSave"),l.push(f.$),d.append('<button class="btn btn-success" data-provider="'+c+'" data-handler="cmdSave"><i class="fa fa-check"></i> Save</button>'),
g.append(d)),e.g(["height","width"],function(a,b){"inherit"!=f[b]&&(jQuery.la(f[b])?g.A(b,f[b]+"px"):g.v(f[b]))}),this.f=g,this.a=b,this.t=m,this.d(),this.H(),this.f.b("id",(new Date).getTime()),this.f.k("click",'[data-provider="bootstrap-markdown"]',e.q(this.P,this))):this.f.show();f.autofocus&&(this.a.focus(),this.f.v("active"));return this},da:function(){var a=this.a,b=a.next(),c=e("<div/>",{"class":"md-preview","data-provider":"markdown-preview"}),d;this.u=!0;this.R("all").N("cmdPreview");d="object"==
typeof markdown?markdown.fa(a.r()):a.r();c.p(d);b&&"md-footer"==b.b("class")?c.insertBefore(b):a.parent().append(c);a.V();c.data("markdown",this);return this},W:function(){this.u=!1;this.f.find('div[data-provider="markdown-preview"]').remove();this.N("all");this.a.show();this.H();return this},d:function(){return this.a.r()},T:function(a){var b;if(b=this.d().indexOf(a),0<=b&&0<a.length){var c=this.getSelection();this.c(b,b+a.length);a=this.getSelection();this.c(c.start,c.end);return a}return null},
getSelection:function(){var a=this.a[0];return("selectionStart"in a&&function(){var b=a.selectionEnd-a.selectionStart;return{start:a.selectionStart,end:a.selectionEnd,length:b,text:a.value.substr(a.selectionStart,b)}}||function(){return null})()},c:function(a,b){var c=this.a[0];return("selectionStart"in c&&function(){c.selectionStart=a;c.selectionEnd=b}||function(){return null})()},e:function(a){var b=this.a[0];return("selectionStart"in b&&function(){b.value=b.value.substr(0,b.selectionStart)+a+b.value.substr(b.selectionEnd,
b.value.length);b.selectionStart=b.value.length;return this}||function(){b.value+=a;return jQuery(b)})()},U:function(){if(0==this.o.length)return null;var a,b=this.o.shift();"function"==typeof b?a=b():"object"==typeof b&&0<b.length&&(a=b);return a},ca:function(a,b){if("string"==typeof a){var c=this;this.o.push(function(){return c.T(a)})}else if("numeric"==typeof a&&"numeric"==typeof b){var d=this.getSelection();this.c(a,b);this.o.push(this.getSelection());this.c(d.start,d.end)}},N:function(a){this.F(a,
function(a){a.ta("disabled")});return this},R:function(a){this.F(a,function(a){a.b("disabled","disabled")});return this},S:function(a){var b=a in this.m;b||(this.m.setAttribute(a,"return;"),b="function"===typeof this.m[a]);return b},Y:function(a){this.ea=~e.ja(a.keyCode,[40,38,9,13,27]);this.B(a)},Z:function(a){this.ea||this.B(a)},B:function(a){var b=!1;switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:var c;if(c=this.U(),null!=c){var d=this;setTimeout(function(){d.c(c.start,
c.end)},500);b=!0}else b=this.getSelection(),b.start==b.end&&b.end==this.d().length?b=!1:(this.c(this.d().length,this.d().length),b=!0);break;case 13:case 27:b=!1;break;default:b=!1}b&&(a.stopPropagation(),a.preventDefault())},focus:function(){var a=this.f;a.v("active");e(document).find(".md-editor").g(function(){if(e(this).b("id")!=a.b("id")){var b;if(b=e(this).find("textarea").data("markdown"),null==b)b=e(this).find('div[data-provider="markdown-preview"]').data("markdown");b&&b.blur()}});return this},
blur:function(){var a=this.D.X,b=this.f,c=this.t;if(b.ia("active")||0==this.m.parent().length)if(b.ua("active"),a)if(null!=c.M){var d=e("<"+c.type+"/>"),a=this.d(),a="object"==typeof markdown?markdown.fa(a):a;e(c.w).g(function(a){d.b(c.w[a],c.J[a])});d.p(a);b.aa(d)}else b.V();return this}};var r=e.l.j;e.l.j=function(a){return this.g(function(){var b=e(this),c=b.data("markdown"),d="object"==typeof a&&a;c||b.data("markdown",new n(this,d))})};e.l.j.Q={autofocus:!1,X:!1,ba:!1,width:"inherit",height:"inherit",
buttons:[[{name:"groupFont",data:[{name:"cmdBold",title:"Bold",i:"fa fa-bold",h:function(a){var b,c;c=a.getSelection();var d=a.d();b=0==c.length?"strong text":c.text;"**"==d.substr(c.start-2,2)&&"**"==d.substr(c.end,2)?(a.c(c.start-2,c.end+2),a.e(b),c=c.start-2):(a.e("**"+b+"**"),c=c.start+2);a.c(c,c+b.length)}},{name:"cmdItalic",title:"Italic",i:"fa fa-italic",h:function(a){var b,c;c=a.getSelection();var d=a.d();b=0==c.length?"emphasized text":c.text;"*"==d.substr(c.start-1,1)&&"*"==d.substr(c.end,
1)?(a.c(c.start-1,c.end+1),a.e(b),c=c.start-1):(a.e("*"+b+"*"),c=c.start+1);a.c(c,c+b.length)}},{name:"cmdHeading",title:"Heading",i:"fa fa-font",h:function(a){var b,c;c=a.getSelection();var d=a.d(),e,k;b=0==c.length?"heading text":c.text;(e=4,"### "==d.substr(c.start-e,e))||(e=3,"###"==d.substr(c.start-e,e))?(a.c(c.start-e,c.end),a.e(b),c=c.start-e):(k=d.substr(c.start-1,1),k&&"\n"!=k)?(a.e("\n\n### "+b+"\n"),c=c.start+6):(a.e("### "+b+"\n"),c=c.start+4);a.c(c,c+b.length)}}]},{name:"groupLink",data:[{name:"cmdUrl",
title:"URL/Link",i:"fa fa-globe",h:function(a){var b,c;c=a.getSelection();a.d();var d;b=0==c.length?"enter link description here":c.text;d=prompt("Insert Hyperlink","http://");null!=d&&(a.e("["+b+"]("+d+")"),c=c.start+1,a.c(c,c+b.length))}},{name:"cmdImage",title:"Image",i:"fa fa-picture-o",h:function(a){var b,c;c=a.getSelection();a.d();var d;b=0==c.length?"enter image description here":c.text;d=prompt("Insert Image Hyperlink","http://");null!=d&&(a.e("!["+b+"]("+d+' "enter image title here")'),c=
c.start+2,a.ca("enter image title here"),a.c(c,c+b.length))}}]},{name:"groupMisc",data:[{name:"cmdList",title:"List",i:"fa fa-list",h:function(a){var b,c;c=a.getSelection();a.d();if(0==c.length)b="list text here",a.e("- "+b),c=c.start+2;else if(0>c.text.indexOf("\n"))b=c.text,a.e("- "+b),c=c.start+2;else{var d=[],d=c.text.split("\n");b=d[0];e.g(d,function(a,b){d[a]="- "+b});a.e("\n\n"+d.join("\n"));c=c.start+4}a.c(c,c+b.length)}}]},{name:"groupUtil",data:[{name:"cmdPreview",toggle:!0,title:"Preview",
L:"Preview",K:"btn btn-inverse",i:"fa fa-search",h:function(a){!1==a.u?a.da():a.W()}}]}]],I:[],qa:function(){},pa:function(){},$:function(){},oa:function(){}};e.l.j.ga=n;e.l.j.na=function(){e.l.j=r;return this};e(document).k("click.markdown.data-api",'[data-provide="markdown-editable"]',function(a){q(e(this));a.preventDefault()}).k("click",function(a){p(a)}).k("focusin",function(a){p(a)}).sa(function(){e('textarea[data-provide="markdown"]').g(function(){q(e(this))})})}(window.ma);