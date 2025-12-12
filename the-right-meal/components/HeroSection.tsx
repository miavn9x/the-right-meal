'use client';

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {  ChevronDown } from "lucide-react";

export default function HeroSection() {

    // 3D Parallax Setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <section 
            // Tối ưu: h-[100dvh] để fix lỗi address bar trên mobile browser
            className="relative h-dvh w-full overflow-hidden bg-slate-900 perspective-[1000px]"
            onMouseMove={handleMouseMove}
        >
            {/* Magazine Background Image - Full Bleed */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 opacity-80 mix-blend-overlay bg-linear-to-t from-black/80 via-transparent to-black/40"
                    style={{ zIndex: 1 }}
                ></div>
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1920&q=80)', // More editorial food shot
                    }}
                ></div>
            </div>

            {/* Magazine Masthead & Cover Lines */}
            {/* Tối ưu: Mobile dùng relative để absolute con. Desktop dùng flex justify-between như cũ. */}
            <div className="relative z-10 h-full container mx-auto px-4 md:px-6 block md:flex md:flex-col md:justify-between py-0 md:py-20">

                {/* 1. MASTHEAD (Top) */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    // Tối ưu: Mobile Absolute top-[35%] để tránh bị nội dung dưới đè lên. Desktop Static.
                    className="absolute top-[35%] left-0 -translate-y-1/2 w-full text-center md:static md:translate-y-0 md:w-auto md:text-center md:block"
                >
                    <div className="inline-block border-b-4 border-primary pb-2 mb-4">
                 
                    </div>
                    <div className="perspective-[1000px] select-none">
                        <motion.h1 
                            // Tối ưu: Tăng size font mobile lên 13vw để dễ đọc hơn (so với 10vw cũ)
                            // Desktop giữ nguyên lg:text-[12vw]
                            className="font-serif text-[16vw] lg:text-[11vw] leading-[0.85] font-black tracking-tighter "
                            style={{
                                color: '#ffffff', // Neutral White for readability
                                WebkitTextStroke: '1px rgba(211, 84, 0, 0.3)', // Subtle brand stroke
                                paintOrder: 'stroke fill',
                                textShadow: `
                                    1px 1px 0 #e67e22,
                                    2px 2px 0 #d35400,
                                    3px 3px 0 #ba4a00,
                                    4px 4px 0 #a04000,
                                    5px 5px 0 #873600,
                                    6px 6px 0 #6e2c00,
                                    15px 15px 30px rgba(0,0,0,0.6)
                                `,
                                rotateX: rotateX,
                                rotateY: rotateY,
                                z: 0,
                            }}
                        >
                            THE RIGHT MEAL
                        </motion.h1>
                    </div>
                </motion.div>

                {/* 2. MAIN STORY (Center/Left + Right Col for Text) */}
                {/* Tối ưu: Mobile Absolute Bottom. Desktop Static Flex/Grid. */}
                <div className="absolute bottom-0 left-0 w-full px-4 pb-20 md:static md:px-0 md:pb-0 grid grid-cols-12 gap-4 md:flex-1 items-end md:items-center content-end md:content-normal">
                    
                    {/* LEFT COLUMN: Headlines & Buttons */}
                    <div className="col-span-12 lg:col-span-7 relative pb-0 md:pb-14 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Tối ưu: text-4xl cho mobile gọn gàng, md:text-7xl giữ nguyên PC */}
                            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white font-bold italic leading-tight mb-6 md:mb-8">
                                <span className="lugrasimo-regular bg-secondary/90 text-white px-2 box-decoration-clone">Eat Smart.</span><br/>
                                <span className="bg-primary/90 text-white px-2 box-decoration-clone">Save Hard.</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Description Text (Moved from Left) - Formerly Stats/Top10 */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col justify-end h-auto md:h-full pb-0 md:pt-14">
                         <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center md:justify-end"
                        >
                            {/* Tối ưu: text-base/lg cho mobile dễ đọc, max-w thích hợp */}
                            <p className="text-white/90 text-base sm:text-lg md:text-2xl font-light leading-relaxed border-l-4 border-secondary pl-4 md:pl-6 bg-black/20 backdrop-blur-sm p-4 md:py-6 md:pr-6 max-w-sm md:max-w-lg lg:ml-auto">
                                Giải pháp sinh tồn cho sinh viên: <strong className="text-secondary font-bold">Thực đơn 25K</strong>, đủ chất, ngon miệng và không lo &quot;cháy túi&quot; cuối tháng.
                            </p>
                         </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
                <ChevronDown className="w-8 h-8 md:w-10 md:h-10 opacity-70" />
            </div>
        </section>
    );
}
