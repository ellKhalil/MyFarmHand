import{c as e,r as t,t as n}from"./app-CM0E59aO.js";e();var r=n();function i(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:`
                @keyframes fall {
                    0% {
                        opacity: 0;
                        top: -10%;
                        transform: translateX(0px) rotate(0deg);
                    }
                    10% {
                        opacity: 0.15;
                    }
                    90% {
                        opacity: 0.15;
                    }
                    100% {
                        opacity: 0;
                        top: 110%;
                        transform: translateX(100px) rotate(360deg);
                    }
                }
                
                @keyframes fall-reverse {
                    0% {
                        opacity: 0;
                        top: -10%;
                        transform: translateX(0px) rotate(0deg);
                    }
                    10% {
                        opacity: 0.2;
                    }
                    90% {
                        opacity: 0.2;
                    }
                    100% {
                        opacity: 0;
                        top: 110%;
                        transform: translateX(-150px) rotate(-360deg);
                    }
                }

                .logo-1 { animation: fall 14s linear infinite; animation-delay: -2s; }
                .logo-2 { animation: fall-reverse 19s linear infinite; animation-delay: -7s; }
                .logo-3 { animation: fall 16s linear infinite; animation-delay: -11s; }
                .logo-4 { animation: fall-reverse 21s linear infinite; animation-delay: -4s; }
                .logo-5 { animation: fall 17s linear infinite; animation-delay: -15s; }
                .logo-6 { animation: fall-reverse 15s linear infinite; animation-delay: -8s; }
                .logo-7 { animation: fall 20s linear infinite; animation-delay: -13s; }
                .logo-8 { animation: fall-reverse 18s linear infinite; animation-delay: -5s; }
                .logo-9 { animation: fall 22s linear infinite; animation-delay: -18s; }
                .logo-10 { animation: fall-reverse 16s linear infinite; animation-delay: -9s; }
            `}),(0,r.jsx)(`div`,{className:`absolute inset-0 pointer-events-none overflow-hidden z-0`,children:[...Array(10)].map((e,t)=>(0,r.jsx)(`img`,{src:`/logo.png`,alt:``,className:`absolute logo-${t+1} opacity-15`,style:{left:`${Math.random()*100}%`,width:`${Math.random()*40+40}px`,height:`auto`}},t))})]})}function a({children:e}){return(0,r.jsxs)(`div`,{className:`relative min-h-screen flex flex-col bg-slate-50 font-sans text-gray-900 selection:bg-green-700 selection:text-white overflow-hidden`,children:[(0,r.jsxs)(`div`,{className:`absolute inset-0 pointer-events-none overflow-hidden`,children:[(0,r.jsx)(`div`,{className:`absolute top-[-10%] -left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob`}),(0,r.jsx)(`div`,{className:`absolute top-[20%] -right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000`}),(0,r.jsx)(`div`,{className:`absolute -bottom-32 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000`}),(0,r.jsx)(i,{})]}),(0,r.jsxs)(`div`,{className:`relative z-10 flex flex-1 flex-col items-center justify-center pt-6 sm:pt-0 px-4`,children:[(0,r.jsxs)(`div`,{className:`mb-8 flex flex-col items-center`,children:[(0,r.jsxs)(t,{href:`/`,className:`flex flex-col items-center gap-3 group`,children:[(0,r.jsx)(`img`,{src:`/logo.png`,alt:`MyFarmHand Logo`,className:`h-24 w-auto object-contain transition-transform group-hover:scale-105`}),(0,r.jsx)(`span`,{className:`text-3xl font-extrabold tracking-tight text-green-900 mt-2 drop-shadow-sm`,children:`MyFarmHand`})]}),(0,r.jsx)(`p`,{className:`mt-2 text-sm font-bold text-green-600 uppercase tracking-widest`,children:`Enterprise Access`})]}),(0,r.jsx)(`div`,{className:`w-full overflow-hidden bg-white/95 backdrop-blur-xl px-8 py-10 shadow-2xl sm:max-w-md rounded-3xl border border-white/20`,children:e})]}),(0,r.jsx)(`footer`,{className:`relative z-10 mt-auto py-6`,children:(0,r.jsxs)(`div`,{className:`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center`,children:[(0,r.jsxs)(`p`,{className:`text-sm text-gray-500 text-center md:text-left`,children:[`© `,new Date().getFullYear(),` MyFarmHand Enterprise Management. All rights reserved.`]}),(0,r.jsxs)(`div`,{className:`mt-4 md:mt-0 flex space-x-6`,children:[(0,r.jsx)(`a`,{href:`#`,className:`text-sm text-green-600 hover:text-green-800 transition`,children:`Privacy Policy`}),(0,r.jsx)(`a`,{href:`#`,className:`text-sm text-green-600 hover:text-green-800 transition`,children:`Terms of Service`}),(0,r.jsx)(`a`,{href:`#`,className:`text-sm text-green-600 hover:text-green-800 transition`,children:`Contact Support`})]})]})})]})}export{a as t};