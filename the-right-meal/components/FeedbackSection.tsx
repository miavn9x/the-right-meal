'use client';

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const feedbacks = [
    { 
        quote: "Mình thực sự bất ngờ vì The Right Meal giúp mình kiểm soát chi tiêu ăn uống dễ hơn rất nhiều. Trước đây mỗi tháng mình luôn tiêu vượt 2–3 trăm nghìn chỉ vì không ghi lại bữa ăn. Sau khi dùng web hơn 2 tuần, mình biết rõ bữa nào tốn nhiều nhất và điều chỉnh lại rất nhanh. Ngoài ra mục thực đơn mẫu theo tuần quá hữu ích, món dễ nấu mà vẫn đủ chất. Dự án sinh viên làm nhưng chất lượng rất chỉn chu!", 
        author: "Nguyễn Phương Thảo", 
        role: "K65",
        img: "./assets/reviews/1.png"
    },
    { 
        quote: "Điều mình thích nhất ở The Right Meal là phần gợi ý các quán ăn “healthy & budget” quanh trường. Nhờ vậy mình tìm được mấy quán ngon – rẻ mà trước giờ không biết luôn. Tính năng Review địa điểm rất thật và sát nhu cầu sinh viên. Rõ ràng website được xây dựng từ chính trải nghiệm của người học ULIS, không hề lý thuyết một chút nào.", 
        author: "Phạm Hữu Phước", 
        role: "K66",
        img: "./assets/reviews/2.png"
    },
    { 
        quote: "The Right Meal đúng là cứu tinh cho mình – một đứa không biết cân bằng dinh dưỡng và toàn ăn uống thất thường. Mục ‘Survival Meal’ có những mẹo đi chợ và chuẩn bị bữa ăn siêu tiết kiệm mà trước giờ mình chưa từng nghĩ tới. Sau 1 tháng dùng web, mình cảm thấy đỡ mệt mỏi hơn, ăn uống đều hơn, và còn tiết kiệm được kha khá. Rất đáng để sinh viên ULIS dùng thử!", 
        author: "Đàm Quang Chính", 
        role: "K64",
        img: "./assets/reviews/3.png"
    }
];

export default function FeedbackSection() {
    return (
        <section id="feedback" className="relative bg-linear-to-br from-[#F9F7F2] to-[#EBE7DE] py-16 md:py-24 overflow-hidden font-(--font-outfit)">
            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <div className="text-[20vw] font-black leading-none text-[#2D2A26]">ULIS</div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Magazine Header */}
                <div className="mb-12 md:mb-16">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="w-12 h-1 bg-[#A67C52]"></div>
                        <span className="text-[#A67C52] font-black uppercase tracking-widest text-xs">Phản Hồi Thực Tế</span>
                    </div>
                    <h2 className="story-script-regular text-4xl sm:text-5xl lg:text-6xl leading-tight md:leading-none max-w-5xl text-slate-900">
                        CỘNG ĐỒNG ULIS NÓI GÌ VỀ<br/>
                        <span className="text-[#A67C52]">THE RIGHT MEAL?</span>
                    </h2>
                </div>

                {/* Testimonials - Magazine Layout */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    {feedbacks.map((feedback, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-white text-slate-950 p-6 md:p-8 lg:p-10 relative group hover:-translate-y-2 transition-all duration-500 shadow-xl border border-[#EBE7DE] rounded-3xl"
                        >
                            <Quote className="w-8 h-8 md:w-12 md:h-12 text-[#A67C52]/20 mb-4 md:mb-6 group-hover:text-[#A67C52] transition-colors" />
                            <p className="text-base lg:text-lg italic leading-relaxed mb-6 md:mb-8 text-slate-600">
                                &quot;{feedback.quote}&quot;
                            </p>
                            
                            <div className="flex items-center gap-4 pt-6 border-t border-dashed border-[#D6D3C9]">
                                <div className="w-20 h-20  relative rounded-full overflow-hidden shrink-0 border-2 border-[#A67C52]">
                                     {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={feedback.img} alt={feedback.author} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="font-(--font-playfair) text-base md:text-lg text-slate-900">{feedback.author}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#A67C52]">{feedback.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
