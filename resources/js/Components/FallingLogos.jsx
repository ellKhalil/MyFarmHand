import React from 'react';

export default function FallingLogos() {
    return (
        <>
            <style>{`
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
            `}</style>
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(10)].map((_, i) => (
                    <img 
                        key={i}
                        src="/logo.png"
                        alt=""
                        className={`absolute logo-${i + 1} opacity-15`}
                        style={{ 
                            left: `${Math.random() * 100}%`, 
                            width: `${Math.random() * 40 + 40}px`,
                            height: 'auto',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
