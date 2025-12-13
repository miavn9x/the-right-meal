'use client';

import Image from "next/image";
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin, ThumbsUp, ThumbsDown, Info } from 'lucide-react';

const reviews = [
    { 
        name: "Nguyện Vegan", 
        detail: "Ẩm Thực Thuần Chay",
        rating: 4.5, 
        address: "Ngõ 199, Phố Trần Quốc Hoàn, P. Dịch Vọng, Cầu Giấy",
        price: "Chỉ từ 30.000 VND/ phần",
        desc: "Bữa ăn \"detox\" lý tưởng và cực kỳ tiết kiệm! Nguyện Vegan là lựa chọn thông minh cho những ngày bạn cần làm mới cơ thể, tránh thịt mỡ và tối ưu hóa chi tiêu.",
        pros: [
            "Thanh lọc cơ thể: Đồ ăn thuần chay, ít dầu mỡ, giàu chất xơ, giúp tiêu hóa nhẹ nhàng.",
            "Ngân sách tối ưu: Mức giá rất thân thiện với sinh viên, chỉ nhỉnh hơn Survival Meal 25K một chút."
        ],
        cons: [
            "Không no lâu: Hàm lượng đạm/chất béo thấp hơn đồ mặn.",
            "Thực đơn: Cần thời gian để làm quen nếu chưa quen ăn chay."
        ],
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
    },
    { 
        name: "Cơm Tấm Phùng", 
        detail: "Cơm Tấm & Bún Trộn",
        rating: 4.5, 
        address: "Số 6 B3 Ngõ 201, Phố Trần Quốc Hoàn, P. Dịch Vọng, Cầu Giấy",
        price: "35.000 - 50.000 VNĐ/suất",
        desc: "Lựa chọn chắc chắn cho những ngày cần bữa trưa no và ấm bụng. Nguồn năng lượng dự trữ tuyệt vời cho những buổi học hoặc làm thêm kéo dài.",
        pros: [
            "Đảm bảo no: Cơm tấm luôn là lựa chọn hàng đầu để nạp năng lượng.",
            "Hương vị truyền thống: Sườn nướng đậm đà. Thực đơn đa dạng có thêm Bún Trộn."
        ],
        cons: [
            "Ít rau xanh: Chủ yếu là đồ chua, cần chủ động ăn thêm rau.",
            "Mức giá sẽ nhỉnh hơn nếu gọi thêm topping hoặc đồ uống."
        ],
        img: "/assets/reviews/com-tamm.jpg"
    },
    { 
        name: "Bún Chả Hoa Châu", 
        detail: "Hương vị truyền thống",
        rating: 4.6, 
        address: "130 Đ. Xuân Thủy, Khu TT ĐH Sư phạm Hà Nội",
        price: "40.000 - 50.000 VNĐ/suất",
        desc: "Lựa chọn truyền thống không thể sai. Thịt nướng thơm lừng, nước chấm đậm đà, kết hợp rau sống tươi xanh tạo nên bữa ăn cân bằng hương vị.",
        pros: [
            "Đạm chất lượng cao: Chả và thịt nướng giúp no lâu.",
            "Giàu chất xơ: Luôn phục vụ kèm lượng lớn rau sống. Vị ngon chuẩn mực."
        ],
        cons: [
            "Lượng tinh bột cao: Bún là tinh bột chính.",
            "Chất béo từ thịt: Mỡ từ thịt nướng có thể không phù hợp chế độ ăn kiêng nghiêm ngặt."
        ],
        img: "/assets/reviews/bun-chao.webp"
    },
    { 
        name: "Bếp nhà Bul", 
        detail: "Điểm ăn sạch \"quốc dân\"",
        rating: 5.0, 
        address: "11 ngõ 32 Chùa Hà, P. Dịch Vọng, Cầu Giấy",
        price: "Chỉ từ 40.000 VNĐ/ phần",
        desc: "Sự cân bằng hoàn hảo giữa ngon, lành và tiết kiệm. Giúp bạn duy trì chế độ Healthy mà không quá áp lực về chi phí. Cơm gạo lứt mềm thơm, salad tôm...",
        pros: [
            "Cân bằng hoàn hảo: Đồ ăn ngon, gạo lứt thơm mềm, rau củ tươi.",
            "Thực đơn đa dạng. Dễ dàng order qua các ứng dụng."
        ],
        cons: [
            "Cần kiểm tra kỹ: Đôi khi chất lượng thịt có thể chưa đạt độ mềm hoàn hảo tùy món.",
            "Mức giá: Phù hợp cho những ngày \"tự thưởng\"."
        ],
        img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800"
    }
];



export default function ReviewSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeReview, setActiveReview] = useState<number | null>(null);

    const toggleReview = (index: number) => {
        setActiveReview(prev => prev === index ? null : index);
    };

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
        }
    };

    return (
        // Tối ưu: padding mobile py-12
        <section id="review" className="relative bg-[#F9F7F2] py-12 md:py-24 overflow-hidden font-(--font-outfit) text-[#2D2A26]">
            {/* Background Texture similar to Toolkit */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543353071-873f17a7a088?w=1920&q=80')" }}></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="block text-[#A67C52] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-3">Review & Blog</span>
                    {/* Tối ưu: text-3xl mobile */}
                    <h2 className="story-script-regular text-3xl md:text-6xl text-slate-900 mb-4 md:mb-6 uppercase leading-tight md:leading-normal">
                        Góc Ẩm Thực <span className="text-[#A67C52] italic">Ngon - Bổ - Rẻ</span><br />
                        Vòng Quanh ULIS
                    </h2>
                    {/* Tối ưu: text-base mobile */}
                    <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed px-2 md:px-0">
                        Không chỉ tự nấu, chúng tôi còn giúp bạn tìm được những bữa ăn &quot;cứu cánh&quot; hoàn hảo từ cộng đồng sinh viên.
                    </p>
                    <div className="w-16 md:w-24 h-1 bg-[#A67C52] mx-auto mt-6 md:mt-8 rounded-full"></div>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
                    
                    {/* Restaurant Reviews - Slider (Full Width) */}
                    <div className="lg:col-span-12">
                        <div className="flex items-end justify-between mb-6 md:mb-8">
                            {/* Tối ưu: text-2xl mobile */}
                            <h3 className="font-(--font-playfair) text-2xl md:text-3xl text-slate-900">
                                Top Quán Ăn <span className="text-[#A67C52] italic">Đề Xuất</span>
                            </h3>
                            <div className="hidden md:flex gap-2 md:gap-3">
                                <button onClick={() => scroll('left')} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52] hover:text-white transition-all flex items-center justify-center">
                                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5"/>
                                </button>
                                <button onClick={() => scroll('right')} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52] hover:text-white transition-all flex items-center justify-center">
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5"/>
                                </button>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-6 md:overflow-x-auto pb-0 md:pb-8 md:snap-x md:snap-mandatory cursor-grab active:cursor-grabbing scrollbar-hide w-full">
                            {reviews.map((shop, idx) => (
                                // Tối ưu: w-full cho mobile, min-w cho desktop
                                <div 
                                    key={idx} 
                                    onClick={() => toggleReview(idx)}
                                    className="w-full md:w-auto md:min-w-[400px] md:snap-start bg-white rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBE7DE] overflow-hidden group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                >
                                    {/* Image */}
                                    {/* Tối ưu: h-48 mobile */}
                                    <div className="h-48 md:h-56 relative overflow-hidden">
                                        <Image src={shop.img} alt={shop.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 300px, 400px"/>
                                        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm text-[#A67C52] px-2 py-1 md:px-3 rounded-full flex items-center gap-1 shadow-sm">
                                            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#A67C52]" />
                                            <span className="font-bold text-xs md:text-sm">{shop.rating}/5</span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-5 md:p-8">
                                        <div className="mb-3 md:mb-4">
                                            {/* Tối ưu: text-xl mobile */}
                                            <h4 className="font-(--font-playfair) text-xl md:text-2xl text-slate-900 mb-1">{shop.name}</h4>
                                            <p className="text-[#A67C52] text-xs md:text-sm font-bold uppercase tracking-wider">{shop.detail}</p>
                                        </div>
                                        
                                        <div className="flex items-start gap-2 text-xs md:text-sm text-slate-500 mb-2 md:mb-3">
                                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 mt-0.5 text-[#A67C52]" />
                                            <span>{shop.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-6">
                                            <Info className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-[#A67C52]" />
                                            <span>{shop.price}</span>
                                        </div>

                                        <p className="text-slate-600 leading-relaxed mb-4 md:mb-6 text-sm text-justify md:text-left">{shop.desc}</p>

                                        {/* Pros & Cons - Hover to Reveal OR Click to Reveal */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[600px] group-hover:opacity-100 ${activeReview === idx ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="space-y-4 pt-4 md:pt-6 border-t border-dashed border-[#D6D3C9]">
                                                <div>
                                                    <h5 className="flex items-center gap-2 font-bold text-[#27ae60] text-sm mb-1 md:mb-2">
                                                        <ThumbsUp className="w-3.5 h-3.5 md:w-4 md:h-4" /> Ưu điểm
                                                    </h5>
                                                    <ul className="text-sm text-slate-600 space-y-1 pl-6 list-disc marker:text-[#27ae60]">
                                                        {shop.pros.map((p, i) => (
                                                            <li key={i}>{p}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="flex items-center gap-2 font-bold text-[#c0392b] text-sm mb-1 md:mb-2">
                                                        <ThumbsDown className="w-3.5 h-3.5 md:w-4 md:h-4" /> Nhược điểm
                                                    </h5>
                                                    <ul className="text-sm text-slate-600 space-y-1 pl-6 list-disc marker:text-[#c0392b]">
                                                        {shop.cons.map((c, i) => (
                                                            <li key={i}>{c}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
}
