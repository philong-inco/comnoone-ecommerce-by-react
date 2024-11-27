function l(t){const e=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&e==="[object Date]"?new t.constructor(+t):typeof t=="number"||e==="[object Number]"||typeof t=="string"||e==="[object String]"?new Date(t):new Date(NaN)}function b(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}const N=6048e5,j=864e5;let L={};function D(){return L}function v(t,e){var u,c,d,h;const n=D(),r=(e==null?void 0:e.weekStartsOn)??((c=(u=e==null?void 0:e.locale)==null?void 0:u.options)==null?void 0:c.weekStartsOn)??n.weekStartsOn??((h=(d=n.locale)==null?void 0:d.options)==null?void 0:h.weekStartsOn)??0,a=l(t),o=a.getDay(),s=(o<r?7:0)+o-r;return a.setDate(a.getDate()-s),a.setHours(0,0,0,0),a}function W(t){return v(t,{weekStartsOn:1})}function H(t){const e=l(t),n=e.getFullYear(),r=b(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const a=W(r),o=b(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const s=W(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=s.getTime()?n:n-1}function Y(t){const e=l(t);return e.setHours(0,0,0,0),e}function T(t){const e=l(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function _(t,e){const n=Y(t),r=Y(e),a=+n-T(n),o=+r-T(r);return Math.round((a-o)/j)}function G(t){const e=H(t),n=b(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),W(n)}function R(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function B(t){if(!R(t)&&typeof t!="number")return!1;const e=l(t);return!isNaN(Number(e))}function A(t){const e=l(t),n=b(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}const V={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},I=(t,e,n)=>{let r;const a=V[t];return typeof a=="string"?r=a:e===1?r=a.one:r=a.other.replace("{{count}}",e.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function S(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const J={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},$={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},U={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},z={date:S({formats:J,defaultWidth:"full"}),time:S({formats:$,defaultWidth:"full"}),dateTime:S({formats:U,defaultWidth:"full"})},K={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},Z=(t,e,n,r)=>K[t];function k(t){return(e,n)=>{const r=n!=null&&n.context?String(n.context):"standalone";let a;if(r==="formatting"&&t.formattingValues){const s=t.defaultFormattingWidth||t.defaultWidth,u=n!=null&&n.width?String(n.width):s;a=t.formattingValues[u]||t.formattingValues[s]}else{const s=t.defaultWidth,u=n!=null&&n.width?String(n.width):t.defaultWidth;a=t.values[u]||t.values[s]}const o=t.argumentCallback?t.argumentCallback(e):e;return a[o]}}const tt={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},et={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},nt={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},rt={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},at={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ot={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},it=(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},st={ordinalNumber:it,era:k({values:tt,defaultWidth:"wide"}),quarter:k({values:et,defaultWidth:"wide",argumentCallback:t=>t-1}),month:k({values:nt,defaultWidth:"wide"}),day:k({values:rt,defaultWidth:"wide"}),dayPeriod:k({values:at,defaultWidth:"wide",formattingValues:ot,defaultFormattingWidth:"wide"})};function x(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;const s=o[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(u)?ct(u,g=>g.test(s)):ut(u,g=>g.test(s));let d;d=t.valueCallback?t.valueCallback(c):c,d=n.valueCallback?n.valueCallback(d):d;const h=e.slice(s.length);return{value:d,rest:h}}}function ut(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n}function ct(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n}function dt(t){return(e,n={})=>{const r=e.match(t.matchPattern);if(!r)return null;const a=r[0],o=e.match(t.parsePattern);if(!o)return null;let s=t.valueCallback?t.valueCallback(o[0]):o[0];s=n.valueCallback?n.valueCallback(s):s;const u=e.slice(a.length);return{value:s,rest:u}}}const ft=/^(\d+)(th|st|nd|rd)?/i,ht=/\d+/i,mt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},lt={any:[/^b/i,/^(a|c)/i]},gt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},wt={any:[/1/i,/2/i,/3/i,/4/i]},yt={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},bt={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Pt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Mt={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Ot={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},kt={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},xt={ordinalNumber:dt({matchPattern:ft,parsePattern:ht,valueCallback:t=>parseInt(t,10)}),era:x({matchPatterns:mt,defaultMatchWidth:"wide",parsePatterns:lt,defaultParseWidth:"any"}),quarter:x({matchPatterns:gt,defaultMatchWidth:"wide",parsePatterns:wt,defaultParseWidth:"any",valueCallback:t=>t+1}),month:x({matchPatterns:yt,defaultMatchWidth:"wide",parsePatterns:bt,defaultParseWidth:"any"}),day:x({matchPatterns:Pt,defaultMatchWidth:"wide",parsePatterns:Mt,defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:Ot,defaultMatchWidth:"any",parsePatterns:kt,defaultParseWidth:"any"})},vt={code:"en-US",formatDistance:I,formatLong:z,formatRelative:Z,localize:st,match:xt,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Wt(t){const e=l(t);return _(e,A(e))+1}function Dt(t){const e=l(t),n=+W(e)-+G(e);return Math.round(n/N)+1}function Q(t,e){var h,g,M,O;const n=l(t),r=n.getFullYear(),a=D(),o=(e==null?void 0:e.firstWeekContainsDate)??((g=(h=e==null?void 0:e.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??a.firstWeekContainsDate??((O=(M=a.locale)==null?void 0:M.options)==null?void 0:O.firstWeekContainsDate)??1,s=b(t,0);s.setFullYear(r+1,0,o),s.setHours(0,0,0,0);const u=v(s,e),c=b(t,0);c.setFullYear(r,0,o),c.setHours(0,0,0,0);const d=v(c,e);return n.getTime()>=u.getTime()?r+1:n.getTime()>=d.getTime()?r:r-1}function pt(t,e){var u,c,d,h;const n=D(),r=(e==null?void 0:e.firstWeekContainsDate)??((c=(u=e==null?void 0:e.locale)==null?void 0:u.options)==null?void 0:c.firstWeekContainsDate)??n.firstWeekContainsDate??((h=(d=n.locale)==null?void 0:d.options)==null?void 0:h.firstWeekContainsDate)??1,a=Q(t,e),o=b(t,0);return o.setFullYear(a,0,r),o.setHours(0,0,0,0),v(o,e)}function St(t,e){const n=l(t),r=+v(n,e)-+pt(n,e);return Math.round(r/N)+1}function i(t,e){const n=t<0?"-":"",r=Math.abs(t).toString().padStart(e,"0");return n+r}const w={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return i(e==="yy"?r%100:r,e.length)},M(t,e){const n=t.getMonth();return e==="M"?String(n+1):i(n+1,2)},d(t,e){return i(t.getDate(),e.length)},a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(t,e){return i(t.getHours()%12||12,e.length)},H(t,e){return i(t.getHours(),e.length)},m(t,e){return i(t.getMinutes(),e.length)},s(t,e){return i(t.getSeconds(),e.length)},S(t,e){const n=e.length,r=t.getMilliseconds(),a=Math.trunc(r*Math.pow(10,n-3));return i(a,e.length)}},P={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},E={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if(e==="yo"){const r=t.getFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return w.y(t,e)},Y:function(t,e,n,r){const a=Q(t,r),o=a>0?a:1-a;if(e==="YY"){const s=o%100;return i(s,2)}return e==="Yo"?n.ordinalNumber(o,{unit:"year"}):i(o,e.length)},R:function(t,e){const n=H(t);return i(n,e.length)},u:function(t,e){const n=t.getFullYear();return i(n,e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return i(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return i(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return w.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return i(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=St(t,r);return e==="wo"?n.ordinalNumber(a,{unit:"week"}):i(a,e.length)},I:function(t,e,n){const r=Dt(t);return e==="Io"?n.ordinalNumber(r,{unit:"week"}):i(r,e.length)},d:function(t,e,n){return e==="do"?n.ordinalNumber(t.getDate(),{unit:"date"}):w.d(t,e)},D:function(t,e,n){const r=Wt(t);return e==="Do"?n.ordinalNumber(r,{unit:"dayOfYear"}):i(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return i(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return i(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=r===0?7:r;switch(e){case"i":return String(a);case"ii":return i(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(r===12?a=P.noon:r===0?a=P.midnight:a=r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(r>=17?a=P.evening:r>=12?a=P.afternoon:r>=4?a=P.morning:a=P.night,e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if(e==="ho"){let r=t.getHours()%12;return r===0&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return w.h(t,e)},H:function(t,e,n){return e==="Ho"?n.ordinalNumber(t.getHours(),{unit:"hour"}):w.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return e==="Ko"?n.ordinalNumber(r,{unit:"hour"}):i(r,e.length)},k:function(t,e,n){let r=t.getHours();return r===0&&(r=24),e==="ko"?n.ordinalNumber(r,{unit:"hour"}):i(r,e.length)},m:function(t,e,n){return e==="mo"?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):w.m(t,e)},s:function(t,e,n){return e==="so"?n.ordinalNumber(t.getSeconds(),{unit:"second"}):w.s(t,e)},S:function(t,e){return w.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(r===0)return"Z";switch(e){case"X":return C(r);case"XXXX":case"XX":return y(r);case"XXXXX":case"XXX":default:return y(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return C(r);case"xxxx":case"xx":return y(r);case"xxxxx":case"xxx":default:return y(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+F(r,":");case"OOOO":default:return"GMT"+y(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+F(r,":");case"zzzz":default:return"GMT"+y(r,":")}},t:function(t,e,n){const r=Math.trunc(t.getTime()/1e3);return i(r,e.length)},T:function(t,e,n){const r=t.getTime();return i(r,e.length)}};function F(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),o=r%60;return o===0?n+String(a):n+String(a)+e+i(o,2)}function C(t,e){return t%60===0?(t>0?"-":"+")+i(Math.abs(t)/60,2):y(t,e)}function y(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=i(Math.trunc(r/60),2),o=i(r%60,2);return n+a+e+o}const q=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},X=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Yt=(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return q(t,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;case"PPPP":default:o=e.dateTime({width:"full"});break}return o.replace("{{date}}",q(r,e)).replace("{{time}}",X(a,e))},Tt={p:X,P:Yt},Et=/^D+$/,Ft=/^Y+$/,Ct=["D","DD","YY","YYYY"];function qt(t){return Et.test(t)}function Nt(t){return Ft.test(t)}function Ht(t,e,n){const r=Qt(t,e,n);if(console.warn(r),Ct.includes(t))throw new RangeError(r)}function Qt(t,e,n){const r=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Xt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,jt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Lt=/^'([^]*?)'?$/,_t=/''/g,Gt=/[a-zA-Z]/;function Bt(t,e,n){var h,g,M,O;const r=D(),a=r.locale??vt,o=r.firstWeekContainsDate??((g=(h=r.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??1,s=r.weekStartsOn??((O=(M=r.locale)==null?void 0:M.options)==null?void 0:O.weekStartsOn)??0,u=l(t);if(!B(u))throw new RangeError("Invalid time value");let c=e.match(jt).map(m=>{const f=m[0];if(f==="p"||f==="P"){const p=Tt[f];return p(m,a.formatLong)}return m}).join("").match(Xt).map(m=>{if(m==="''")return{isToken:!1,value:"'"};const f=m[0];if(f==="'")return{isToken:!1,value:Rt(m)};if(E[f])return{isToken:!0,value:m};if(f.match(Gt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:m}});a.localize.preprocessor&&(c=a.localize.preprocessor(u,c));const d={firstWeekContainsDate:o,weekStartsOn:s,locale:a};return c.map(m=>{if(!m.isToken)return m.value;const f=m.value;(Nt(f)||qt(f))&&Ht(f,e,String(t));const p=E[f[0]];return p(u,f,a.localize,d)}).join("")}function Rt(t){const e=t.match(Lt);return e?e[1].replace(_t,"'"):t}export{b as c,Bt as f,l as t};
