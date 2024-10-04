import{c as k,r as d,e as D,j as b}from"./index-COCf9D-9.js";import{u as w}from"./useThemeProps-DMDlQzC9.js";import{h as u}from"./moment-G82_0lEo.js";const O=["localeText"],M=d.createContext(null),H=function(i){const{localeText:a}=i,l=k(i,O),{utils:e,localeText:t}=d.useContext(M)??{utils:void 0,localeText:void 0},r=w({props:l,name:"MuiLocalizationProvider"}),{children:n,dateAdapter:s,dateFormats:o,dateLibInstance:h,adapterLocale:m,localeText:f}=r,y=d.useMemo(()=>D({},f,t,a),[f,t,a]),c=d.useMemo(()=>{if(!s)return e||null;const T=new s({locale:m,formats:o,instance:h});if(!T.isMUIAdapter)throw new Error(["MUI X: The date adapter should be imported from `@mui/x-date-pickers` or `@mui/x-date-pickers-pro`, not from `@date-io`","For example, `import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'` instead of `import AdapterDayjs from '@date-io/dayjs'`","More information on the installation documentation: https://mui.com/x/react-date-pickers/getting-started/#installation"].join(`
`));return T},[s,m,o,h,e]),p=d.useMemo(()=>c?{minDate:c.date("1900-01-01T00:00:00.000"),maxDate:c.date("2099-12-31T00:00:00.000")}:null,[c]),x=d.useMemo(()=>({utils:c,defaultDates:p,localeText:y}),[p,c,y]);return b.jsx(M.Provider,{value:x,children:n})},C={Y:"year",YY:"year",YYYY:{sectionType:"year",contentType:"digit",maxLength:4},M:{sectionType:"month",contentType:"digit",maxLength:2},MM:"month",MMM:{sectionType:"month",contentType:"letter"},MMMM:{sectionType:"month",contentType:"letter"},D:{sectionType:"day",contentType:"digit",maxLength:2},DD:"day",Do:{sectionType:"day",contentType:"digit-with-letter"},E:{sectionType:"weekDay",contentType:"digit",maxLength:1},e:{sectionType:"weekDay",contentType:"digit",maxLength:1},d:{sectionType:"weekDay",contentType:"digit",maxLength:1},dd:{sectionType:"weekDay",contentType:"letter"},ddd:{sectionType:"weekDay",contentType:"letter"},dddd:{sectionType:"weekDay",contentType:"letter"},A:"meridiem",a:"meridiem",H:{sectionType:"hours",contentType:"digit",maxLength:2},HH:"hours",h:{sectionType:"hours",contentType:"digit",maxLength:2},hh:"hours",m:{sectionType:"minutes",contentType:"digit",maxLength:2},mm:"minutes",s:{sectionType:"seconds",contentType:"digit",maxLength:2},ss:"seconds"},Y={year:"YYYY",month:"MMMM",monthShort:"MMM",dayOfMonth:"D",dayOfMonthFull:"Do",weekday:"dddd",weekdayShort:"ddd",hours24h:"HH",hours12h:"hh",meridiem:"A",minutes:"mm",seconds:"ss",fullDate:"ll",keyboardDate:"L",shortDate:"MMM D",normalDate:"D MMMM",normalDateWithWeekday:"ddd, MMM D",fullTime:"LT",fullTime12h:"hh:mm A",fullTime24h:"HH:mm",keyboardDateTime:"L LT",keyboardDateTime12h:"L hh:mm A",keyboardDateTime24h:"L HH:mm"},g=["Missing timezone plugin","To be able to use timezones, you have to pass the default export from `moment-timezone` to the `dateLibInstance` prop of `LocalizationProvider`","Find more information on https://mui.com/x/react-date-pickers/timezone/#moment-and-timezone"].join(`
`);class z{constructor({locale:i,formats:a,instance:l}={}){this.isMUIAdapter=!0,this.isTimezoneCompatible=!0,this.lib="moment",this.moment=void 0,this.locale=void 0,this.formats=void 0,this.escapedCharacters={start:"[",end:"]"},this.formatTokenMap=C,this.setLocaleToValue=e=>{const t=this.getCurrentLocaleCode();return t===e.locale()?e:e.locale(t)},this.hasTimezonePlugin=()=>typeof this.moment.tz<"u",this.createSystemDate=e=>{const t=this.moment(e).local();return this.locale===void 0?t:t.locale(this.locale)},this.createUTCDate=e=>{const t=this.moment.utc(e);return this.locale===void 0?t:t.locale(this.locale)},this.createTZDate=(e,t)=>{if(!this.hasTimezonePlugin())throw new Error(g);const r=t==="default"?this.moment(e):this.moment.tz(e,t);return this.locale===void 0?r:r.locale(this.locale)},this.date=(e,t="default")=>e===null?null:t==="UTC"?this.createUTCDate(e):t==="system"||t==="default"&&!this.hasTimezonePlugin()?this.createSystemDate(e):this.createTZDate(e,t),this.getInvalidDate=()=>this.moment(new Date("Invalid Date")),this.getTimezone=e=>{var n,s;const t=(n=e._z)==null?void 0:n.name,r=e.isUTC()?"UTC":"system";return t??((s=this.moment.defaultZone)==null?void 0:s.name)??r},this.setTimezone=(e,t)=>{var s;if(this.getTimezone(e)===t)return e;if(t==="UTC")return e.clone().utc();if(t==="system")return e.clone().local();if(!this.hasTimezonePlugin()){if(t!=="default")throw new Error(g);return e}const r=t==="default"?((s=this.moment.defaultZone)==null?void 0:s.name)??"system":t;if(r==="system")return e.clone().local();const n=e.clone();return n.tz(r),n},this.toJsDate=e=>e.toDate(),this.parse=(e,t)=>e===""?null:this.locale?this.moment(e,t,this.locale,!0):this.moment(e,t,!0),this.getCurrentLocaleCode=()=>this.locale||u.locale(),this.is12HourCycleInCurrentLocale=()=>/A|a/.test(u.localeData(this.getCurrentLocaleCode()).longDateFormat("LT")),this.expandFormat=e=>{const t=/(\[[^[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})|./g;return e.match(t).map(r=>{const n=r[0];return n==="L"||n===";"?u.localeData(this.getCurrentLocaleCode()).longDateFormat(r):r}).join("")},this.isValid=e=>e==null?!1:e.isValid(),this.format=(e,t)=>this.formatByString(e,this.formats[t]),this.formatByString=(e,t)=>{const r=e.clone();return r.locale(this.getCurrentLocaleCode()),r.format(t)},this.formatNumber=e=>e,this.isEqual=(e,t)=>e===null&&t===null?!0:e===null||t===null?!1:e.isSame(t),this.isSameYear=(e,t)=>e.isSame(t,"year"),this.isSameMonth=(e,t)=>e.isSame(t,"month"),this.isSameDay=(e,t)=>e.isSame(t,"day"),this.isSameHour=(e,t)=>e.isSame(t,"hour"),this.isAfter=(e,t)=>e.isAfter(t),this.isAfterYear=(e,t)=>e.isAfter(t,"year"),this.isAfterDay=(e,t)=>e.isAfter(t,"day"),this.isBefore=(e,t)=>e.isBefore(t),this.isBeforeYear=(e,t)=>e.isBefore(t,"year"),this.isBeforeDay=(e,t)=>e.isBefore(t,"day"),this.isWithinRange=(e,[t,r])=>e.isBetween(t,r,null,"[]"),this.startOfYear=e=>e.clone().startOf("year"),this.startOfMonth=e=>e.clone().startOf("month"),this.startOfWeek=e=>this.setLocaleToValue(e.clone()).startOf("week"),this.startOfDay=e=>e.clone().startOf("day"),this.endOfYear=e=>e.clone().endOf("year"),this.endOfMonth=e=>e.clone().endOf("month"),this.endOfWeek=e=>this.setLocaleToValue(e.clone()).endOf("week"),this.endOfDay=e=>e.clone().endOf("day"),this.addYears=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"years"):e.clone().add(t,"years"),this.addMonths=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"months"):e.clone().add(t,"months"),this.addWeeks=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"weeks"):e.clone().add(t,"weeks"),this.addDays=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"days"):e.clone().add(t,"days"),this.addHours=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"hours"):e.clone().add(t,"hours"),this.addMinutes=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"minutes"):e.clone().add(t,"minutes"),this.addSeconds=(e,t)=>t<0?e.clone().subtract(Math.abs(t),"seconds"):e.clone().add(t,"seconds"),this.getYear=e=>e.get("year"),this.getMonth=e=>e.get("month"),this.getDate=e=>e.get("date"),this.getHours=e=>e.get("hours"),this.getMinutes=e=>e.get("minutes"),this.getSeconds=e=>e.get("seconds"),this.getMilliseconds=e=>e.get("milliseconds"),this.setYear=(e,t)=>e.clone().year(t),this.setMonth=(e,t)=>e.clone().month(t),this.setDate=(e,t)=>e.clone().date(t),this.setHours=(e,t)=>e.clone().hours(t),this.setMinutes=(e,t)=>e.clone().minutes(t),this.setSeconds=(e,t)=>e.clone().seconds(t),this.setMilliseconds=(e,t)=>e.clone().milliseconds(t),this.getDaysInMonth=e=>e.daysInMonth(),this.getWeekArray=e=>{const t=this.startOfWeek(this.startOfMonth(e)),r=this.endOfWeek(this.endOfMonth(e));let n=0,s=t;const o=[];for(;s.isBefore(r);){const h=Math.floor(n/7);o[h]=o[h]||[],o[h].push(s),s=this.addDays(s,1),n+=1}return o},this.getWeekNumber=e=>e.week(),this.getDayOfWeek=e=>e.day()+1,this.moment=l||u,this.locale=i,this.formats=D({},Y,a)}getYearRange([i,a]){const l=this.startOfYear(i),e=this.endOfYear(a),t=[];let r=l;for(;this.isBefore(r,e);)t.push(r),r=this.addYears(r,1);return t}}export{z as A,H as L,M};
