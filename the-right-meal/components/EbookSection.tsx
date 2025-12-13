'use client';

import { useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import FlipbookModal from './FlipbookModal';
import DownloadModal from './DownloadModal';


export default function EbookSection() {
    const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);


    return (
        <section id="ebook" className="relative py-12 md:py-20 bg-[#fffcf7] font-(--font-outfit)">
            {/* Blend Overlay: Fades from About section's #F2F0E9 to transparent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#F2F0E9] to-transparent z-0 pointer-events-none"></div>
            {/* Modal */}
            <FlipbookModal isOpen={isFlipbookOpen} onClose={() => setIsFlipbookOpen(false)} />
            <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                
                {/* 0. SECTION HEADER (Moved to top) */}
                <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
                    <span className="text-[#A67C52] font-bold tracking-widest uppercase text-sm mb-3 block">
                        E-book
                    </span>
                    <h2 className="story-script-regular text-4xl md:text-5xl lg:text-7xl text-slate-900 leading-tight mb-4 md:mb-6">
                        Survival Meal <span className="text-[#A67C52] italic">ULIS</span>
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-900 font-light max-w-4xl mx-auto ">
                        Giải pháp <span className="italic">&quot;Ăn Ngon - Sống Khỏe - Tiết Kiệm&quot;</span> dành riêng cho sinh viên.
                    </p>
                    <div className="w-24 md:w-32 h-1 bg-[#A67C52] mx-auto mt-6 md:mt-8"></div>
                </div>

                {/* 1. HERO - BOOK LEFT / CONTENT RIGHT */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Book Cover - En larged */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-end pr-0 lg:pr-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setIsFlipbookOpen(true)}
                            className="relative w-[320px] sm:w-[450px] md:w-[600px] aspect-3/4 shadow-2xl rounded-r-2xl border-l-4 border-[#2D2A26] overflow-hidden transform hover:rotate-2 transition-transform duration-500 cursor-pointer"
                        >
                            <Image src="/ebook/1.png" alt="Survival Meal ULIS Ebook" fill className="object-cover" />
                             {/* Badge */}
                             <div className="absolute top-6 right-6 bg-[#e74c3c] text-white font-bold text-base px-4 py-1.5 rounded-full shadow-lg">
                                FREE
                            </div>
                        </motion.div>
                         <p className="mt-6 text-[#A67C52]  text-lg animate-pulse flex items-center gap-2 cursor-pointer" onClick={() => setIsFlipbookOpen(true)}>
                            (Bấm vào sách để đọc thử)
                        </p>
                    </div>

                    {/* Right: Download Form (Embedded & Refined) */}
                    <div className="lg:col-span-5 relative">
                         {/* Decorative Element */}
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e3ae72]/10 rounded-full blur-3xl pointer-events-none"></div>

                         <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/90 backdrop-blur-md rounded-sm border border-[#A67C52]/30 shadow-2xl overflow-hidden max-w-md mx-auto lg:mx-0 relative z-10"
                        >
                            {/* Form Header */}
                            <div className="p-8 text-center border-b border-[#A67C52]/20 bg-[#fffcf7]">
                                <h3 className="text-3xl font-serif font-bold text-[#2D2A26] mb-2">Tải E-book</h3>
                                <div className="w-12 h-0.5 bg-[#A67C52] mx-auto mb-3"></div>
                                <p className="text-[#A67C52] text-[10px] font-bold tracking-[0.3em] uppercase">Survival Meal ULIS</p>
                            </div>

                            {/* Form Body */}
                            <div className="p-8 space-y-6">
                                <p className="text-slate-600 text-md story-script-regular text-center font-serif leading-relaxed">
                                    &quot;Để lại thông tin để nhận trọn bộ bí kíp nấu ăn ngon - bổ - rẻ ngay hôm nay!&quot;
                                </p>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-[#2D2A26] font-serif font-bold tracking-widest text-xs uppercase mb-2">Họ và Tên</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-transparent border-b border-slate-300 rounded-none px-0 py-2 text-[#2D2A26] font-serif focus:outline-none focus:border-[#A67C52] transition-colors placeholder:text-slate-300"
                                            placeholder="Tên của bạn..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#2D2A26] font-serif font-bold tracking-widest text-xs uppercase mb-2">Email hoặc SĐT</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-transparent border-b border-slate-300 rounded-none px-0 py-2 text-[#2D2A26] font-serif focus:outline-none focus:border-[#A67C52] transition-colors placeholder:text-slate-300"
                                            placeholder="Email hoặc số điện thoại..."
                                        />
                                    </div>
                                </div>

                                <button 
                                    className="w-full bg-[#2D2A26] text-[#fffcf7] hover:bg-[#A67C52] font-bold py-4 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group mt-4"
                                >
                                    <Download className="w-4 h-4 group-hover:animate-bounce" /> Tải Xuất Bản Phẩm
                                </button>
                                
                                <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider">
                                    Bảo mật 100%
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

              


            </div>
        </section>
    );
}
