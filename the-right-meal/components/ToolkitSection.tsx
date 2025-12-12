'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Kept imports, will remove unused ones if any
import { Utensils } from 'lucide-react';
import Image from 'next/image';

// A. WEEKLY MENU DATA
const weeklyMenu = [
    {
        day: "Ngày 1",
        image: "/cong thuc/Gà Xào Sả Ớt.jpg",
        meals: [
            { type: "Sáng", name: "Bánh mì trứng ốp la & sữa", desc: "Năng lượng khởi đầu ngày mới" },
            { type: "Trưa", name: "Cơm, gà xào sả ớt, canh cải", desc: "Đậm đà hương vị, đưa cơm" },
            { type: "Tối", name: "Cơm, đậu hũ nhồi thịt, canh trứng", desc: "Thanh đạm, dễ tiêu hóa" }
        ]
    },
    {
        day: "Ngày 2",
        image: "/cong thuc/Bún Thịt Xào.jpg",
        meals: [
            { type: "Sáng", name: "Xôi xéo", desc: "Món ngon truyền thống chắc bụng" },
            { type: "Trưa", name: "Cơm, cá nục kho tiêu, canh rau ngót", desc: "Vị ngon dân dã" },
            { type: "Tối", name: "Bún thịt xào", desc: "Đổi vị nhẹ nhàng buổi tối" }
        ]
    },
    {
        day: "Ngày 3",
        image: "/cong thuc/Thịt Băm Xào Khoai Tây.jpg",
        meals: [
            { type: "Sáng", name: "Bánh cuốn", desc: "Nhẹ nhàng, tinh tế" },
            { type: "Trưa", name: "Canh bánh đa nấu thịt bằm", desc: "Nhanh gọn, đủ chất" },
            { type: "Tối", name: "Cơm, thịt heo luộc, bắp cải luộc", desc: "Healthy, hạn chế dầu mỡ" }
        ]
    },
    {
        day: "Ngày 4",
        image: "/cong thuc/Canh Bí Đỏ Nấu Tôm Khô.jpg",
        meals: [
            { type: "Sáng", name: "Ngũ cốc & sữa tươi", desc: "Tiện lợi, giàu dinh dưỡng" },
            { type: "Trưa", name: "Cơm, trứng kho, canh mướp", desc: "Bữa cơm nhà ấm cúng" },
            { type: "Tối", name: "Cơm, thịt băm xào khoai, rau muống", desc: "Lạ miệng, đưa cơm" }
        ]
    },
    {
        day: "Ngày 5",
        image: "/cong thuc/ Gà Rim Mặn Ngọt.jpg",
        meals: [
            { type: "Sáng", name: "Miến gà", desc: "Nóng hổi, thơm lừng" },
            { type: "Trưa", name: "Cơm chiên trứng xúc xích", desc: "Nhanh gọn lẹ giữa giờ" },
            { type: "Tối", name: "Cơm, gà rim mặn ngọt, canh bí đỏ", desc: "Bồi bổ sau ngày dài" }
        ]
    },
    {
        day: "Ngày 6",
        image: "/cong thuc/ Cơm Chiên Trứng – Xúc Xích.jpg",
        meals: [
            { type: "Sáng", name: "Bánh giò", desc: "Nóng hổi vừa thổi vừa ăn" },
            { type: "Trưa", name: "Mì udon xào rau trứng", desc: "Phong cách mới lạ" },
            { type: "Tối", name: "Cơm, thịt bò xào đậu que", desc: "Giàu sắt và vitamin" }
        ]
    },
    {
        day: "Ngày 7",
        image: "/cong thuc/Canh Ngao Nấu Chua.jpg",
        meals: [
            { type: "Sáng", name: "Bánh bao & sữa tươi", desc: "Tiện lợi cho cuối tuần" },
            { type: "Trưa", name: "Cơm, thịt rang cháy cạnh, canh bí", desc: "Đậm đà vị Bắc" },
            { type: "Tối", name: "Cơm, trứng cuộn, canh ngao nấu chua", desc: "Thanh mát giải nhiệt" }
        ]
    }
];

export default function ToolkitSection() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        // Tối ưu: giảm padding mobile py-12
        <section id="toolkit" className="relative py-12 md:py-20 bg-white text-[#2D2A26] font-(--font-outfit) overflow-hidden">
            
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                
                {/* Tối ưu: giảm gap mobile gap-8 */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                    
                    {/* LEFT COLUMN: IMAGE */}
                    <div className="relative">
                        {/* Tối ưu: aspect-4/5 cho mobile để hình ảnh không quá dài, giữ aspect-square cho md và lg:aspect-4/5 cho desktop */}
                        <div className="relative aspect-4/5 md:aspect-square lg:aspect-4/5 rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#F2F0E9]">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab} // Unique key triggers animation on change
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-full"
                                >
                                     <Image 
                                        src={weeklyMenu[activeTab].image} 
                                        alt={`Thực đơn ${weeklyMenu[activeTab].day}`} 
                                        fill 
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw" // Tối ưu loader ảnh
                                     />
                                </motion.div>
                             </AnimatePresence>
                        </div>
                        {/* Floating Badge */}
                        {/* Tối ưu: thu nhỏ badge trên mobile */}
                        <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-[#F2F0E9] rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white animate-spin-slow z-20">
                            <Utensils className="w-6 h-6 md:w-8 md:h-8 text-[#A67C52] mb-1" />
                            <span className="text-[#2D2A26] font-bold text-[10px] md:text-xs uppercase tracking-widest">Healthy</span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: MENU CONTENT */}
                    <div className="lg:pl-8 mt-4 md:mt-0">
                        
                        {/* Header */}
                        <div className="mb-8 md:mb-12 text-center lg:text-left">
                            <span className="text-[#A67C52] font-bold tracking-[0.3em] uppercase text-xs md:text-sm block mb-2 md:mb-4">
                                Weekly Plan
                            </span>
                             <div className="relative inline-block">
                                {/* Tối ưu: giảm size chữ mobile */}
                                <h2 className="story-script-regular text-4xl md:text-5xl lg:text-6xl text-[#2D2A26] mb-2 relative z-10">
                                    Thực Đơn Tuần
                                </h2>
                                <div className="absolute bottom-2 left-0 w-full h-2 md:h-3 bg-[#A67C52]/20 z-0"></div>
                             </div>
                             {/* Decorative Line like in reference */}
                             {/* Tối ưu: Mobile flex-wrap để không bị che, PC flex-nowrap */}
                             <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-4 md:mt-6 justify-center lg:justify-start opacity-60">
                                <div className="w-8 md:w-12 h-px bg-[#2D2A26]"></div>
                                {/* Tối ưu: giảm size chữ mobile */}
                                <span className="text-lg md:text-xl font-(--font-playfair) italic text-[#2D2A26] text-center">Eat Clean & Save Money</span>
                                <div className="w-8 md:w-12 h-px bg-[#2D2A26]"></div>
                             </div>
                        </div>

                        {/* Tabs */}
                        {/* Tối ưu: Mobile bỏ overflow-x, dùng flex-wrap để show hết ngày */}
                        <div className="mb-6 md:mb-10 w-full">
                            <div className="flex flex-wrap md:flex-nowrap md:overflow-x-auto gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center lg:justify-start pb-4 scrollbar-hide">
                                {weeklyMenu.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTab(idx)}
                                        // Tối ưu: text-base mobile
                                        className={`text-base md:text-lg font-bold transition-all duration-300 relative pb-2 ${
                                            activeTab === idx 
                                            ? 'text-[#A67C52] scale-110' 
                                            : 'text-[#2D2A26]/40 hover:text-[#2D2A26]/80'
                                        }`}
                                    >
                                        {item.day}
                                        {activeTab === idx && (
                                            <motion.div 
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#A67C52]"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Menu List */}
                        {/* Tối ưu: p-6 mobile */}
                        <div className="bg-[#F9F7F2] p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-[#EBE7DE] min-h-[350px] md:min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    {weeklyMenu[activeTab].meals.map((meal, idx) => (
                                        <div key={idx} className="group">
                                            <div className="flex items-baseline justify-between mb-1 md:mb-2">
                                                {/* Tối ưu: text-xl mobile */}
                                                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-[#2D2A26]">
                                                    {meal.name.split(',')[0]} {/* Show Main Dish Name prominently */}
                                                </h4>
                                                <span className="text-[#A67C52] font-bold text-xs md:text-sm uppercase tracking-wider shrink-0 ml-4">
                                                    {meal.type}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-end gap-2">
                                                 {/* Tối ưu: text-sm mobile */}
                                                 <p className="text-[#59554D] text-sm md:text-base leading-relaxed grow border-b border-dotted border-[#D6D3C9] pb-1">
                                                    {meal.name} {/* Full description */}
                                                </p>
                                                {/* Price placeholder or just dots */}
                                                {/* <span className="text-[#2D2A26] font-bold">25.000đ</span> */}
                                            </div>
                                            
                                            <p className="text-xs md:text-sm text-[#8C8678] italic mt-1 pl-1">
                                                * {meal.desc}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                            
                            <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-[#D6D3C9] text-center lg:text-right">
                                <a href="#ebook" className="inline-flex items-center gap-2 text-[#A67C52] font-bold uppercase tracking-widest text-xs md:text-sm hover:underline">
                                    Xem đầy đủ trong E-book <Utensils className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
