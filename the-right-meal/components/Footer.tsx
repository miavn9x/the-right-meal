"use client";

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#F9F7F2] text-[#2D2A26] border-t border-[#A67C52]/30 font-(--font-outfit)">
            {/* Tối ưu padding: Giảm py trên mobile để tiết kiệm diện tích */}
            <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
                
                {/* Grid Layout: Mobile 1 cột (xếp dọc), PC 12 cột (như cũ) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-12">
                    
                    {/* Brand & Socials */}
                    {/* Căn giữa trên mobile, căn trái trên PC */}
                    <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            {/* Logo */}
                            {/* Tối ưu kích thước logo trên mobile */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                                <Image 
                                    src="/ebook/logo.png" 
                                    alt="The Right Meal Logo" 
                                    fill
                                    sizes="(max-width: 768px) 100px, 128px"
                                    className="object-contain"
                                />
                            </div>
                            
                            {/* Brand Name */}
                            <div>
                                <h3 className="lugrasimo-regular text-4xl md:text-5xl leading-none mb-2 text-[#2D2A26]">
                                    THE<br/>RIGHT<br/>MEAL
                                </h3>
                                <div className="flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-8 md:w-12 h-0.5 bg-[#A67C52]"></div>
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#A67C52] font-bold">Nhóm 60 ULIS</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                            Đồng hành cùng sinh viên trên hành trình ăn uống thông minh, tiết kiệm và đảm bảo dinh dưỡng.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full border border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52] hover:text-white flex items-center justify-center transition-all">
                                <Facebook className="w-5 h-5"/>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52] hover:text-white flex items-center justify-center transition-all">
                                <Instagram className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    {/* Căn giữa trên mobile, căn trái trên PC */}
                    <div className="lg:col-span-4 text-center lg:text-left">
                        <h4 className="font-(--font-playfair) text-xl md:text-2xl text-[#2D2A26] mb-4 md:mb-6">Thông tin liên hệ</h4>
                        <ul className="space-y-4 text-slate-600 text-sm inline-block text-left lg:block">
                            <li>
                                <strong className="text-[#A67C52] block mb-1">Email:</strong> 
                                therightmeal.site@gmail.com
                            </li>
                            <li>
                                <strong className="text-[#A67C52] block mb-1">Website:</strong> 
                                <a href="https://therightmeal.wixsite.com/therightmeal" target="_blank" className="hover:text-[#A67C52] transition-colors underline decoration-[#A67C52]/30 underline-offset-4 break-all">
                                    therightmeal.wixsite.com/therightmeal
                                </a>
                            </li>
                            <li>
                                <strong className="text-[#A67C52] block mb-1">Phone:</strong> 
                                <a href="tel:+84398902924" className="hover:text-[#A67C52] transition-colors">
                                    (+84) 398 902 924 (Minh Nguyên)
                                </a>
                            </li>
                            <li>
                                <strong className="text-[#A67C52] block mb-1">Địa chỉ:</strong> 
                                Số 2, Phạm Văn Đồng, Cầu Giấy, Hà Nội
                            </li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-4">
                        <div className="h-full min-h-[200px] md:min-h-[250px] w-full transition-all duration-700 border border-[#A67C52]/20 shadow-sm rounded-lg overflow-hidden">
                             {/* Đã cập nhật src Google Maps Embed chuẩn cho địa chỉ Số 2 Phạm Văn Đồng để hiển thị đẹp hơn */}
                             <iframe 
                                title="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6593414999996!2d105.7816!3d21.0463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab32dd484c53%3A0x4201b89c8bdfd968!2zMiBQaOG6oW0gVbSDbiDEkOG7k25nLCBNYWkgRDhu4sjaLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, minHeight: "250px" }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#A67C52]/20 pt-6 md:pt-8 text-center text-xs text-slate-500">
                    <p>© 2025 THE RIGHT MEAL. All rights reserved.</p>
                    <p className="mt-2">Created by Nhóm 60 - CNTT & TT ULIS</p>
                </div>
            </div>
        </footer>
    );
}