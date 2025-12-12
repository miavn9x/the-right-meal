'use client';

import { motion } from 'framer-motion';
import {  Target, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

const contentData = [
  {
    id: "01",
    title: "Giới thiệu dự án",
    icon: Target,
    content: "Với lịch học dày đặc và quỹ thời gian hạn hẹp, nhiều sinh viên gặp khó khăn trong việc duy trì chế độ ăn uống hợp lý và kiểm soát chi tiêu hằng ngày. Các bữa ăn thường mang tính tạm thời, lựa chọn theo sự tiện lợi hơn là dinh dưỡng và mức chi phí phù hợp, từ đó ảnh hưởng đến sức khỏe và sinh hoạt.\n\nTừ thực tế đó, dự án “The Right Meal” được xây dựng nhằm hỗ trợ sinh viên ULIS lựa chọn những bữa ăn ngon-bổ-rẻ, đồng thời hình thành thói quen ăn uống lành mạnh và chi tiêu hợp lý trong đời sống học tập."
  },
  {
    id: "02",
    title: "Vấn đề đặt ra",
    icon: AlertCircle,
    content: "Việc ăn uống hợp lý là một yếu tố quan trọng ảnh hưởng đến sức khỏe, tinh thần và hiệu quả học tập của sinh viên. Tuy nhiên, trong điều kiện học tập bận rộn và chi phí sinh hoạt ngày càng cao, nhiều sinh viên gặp khó khăn trong việc cân bằng giữa dinh dưỡng, thời gian và ngân sách.\n\nTình trạng này đặt ra nhu cầu cấp thiết về các giải pháp hỗ trợ sinh viên xây dựng thói quen ăn uống khoa học, quản lý chi tiêu hiệu quả và duy trì sức khỏe lâu dài."
  },
  {
    id: "03",
    title: "Thực trạng ăn uống",
    icon: TrendingUp,
    content: "Qua khảo sát thực tế cho thấy nhiều sinh viên ULIS có thói quen ăn uống thiếu ổn định, phụ thuộc nhiều vào các lựa chọn nhanh – tiện do quỹ thời gian học tập hạn chế. Việc chưa biết cách lựa chọn bữa ăn phù hợp với ngân sách khiến sinh viên khó kiểm soát chi tiêu ăn uống hằng ngày. Lâu dần, thói quen này tác động tiêu cực đến cả sức khỏe và sinh hoạt cá nhân."
  },
  {
    id: "04",
    title: "Giải pháp của dự án",
    icon: Lightbulb,
    content: "Dự án “The Right Meal” hướng đến việc cung cấp những giải pháp thiết thực giúp sinh viên tiếp cận các bữa ăn hợp lý về dinh dưỡng, phù hợp về chi phí. Đồng thời, dự án hỗ trợ trang bị kiến thức về dinh dưỡng tiết kiệm và xây dựng thói quen ăn uống lành mạnh, bền vững. Qua đó, sinh viên có thể chủ động hơn trong việc quản lý chi tiêu và nâng cao chất lượng cuộc sống học tập."
  }
];

export default function About() {
  return (
    <section className="relative py-12 md:py-16 bg-[#F2F0E9] text-[#2D2A26] font-(--font-outfit) overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-white/50 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24 text-center max-w-5xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 border border-[#A67C52] rounded-full text-xs font-bold tracking-[0.2em] uppercase text-[#A67C52] mb-6">Our Vision & Mission</span>
          <h2 className="story-script-regular text-4xl sm:text-5xl md:text-7xl leading-tight text-[#2D2A26] mb-8">
            THE RIGHT MEAL<br />
            <span className="italic relative">
              Track Your Plate
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#A67C52]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span> <br className="hidden md:block" />
            Master Your Budget
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-32">
          {contentData.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative bg-[#EBE7DE] p-6 md:p-12 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-default"
            >
              {/* Decorative Number Background */}
              <div className="absolute -right-4 -bottom-8 font-(--font-playfair) text-[100px] sm:text-[140px] md:text-[180px] leading-none text-[#D6D3C9]/50 group-hover:text-[#C2B8A3]/50 transition-colors pointer-events-none select-none">
                {item.id}
              </div>

              {/* Icon & Title */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 mb-6 rounded-full bg-[#2D2A26] flex items-center justify-center text-[#F2F0E9] group-hover:bg-[#A67C52] group-hover:scale-110 transition-all duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-(--font-playfair) text-2xl sm:text-3xl text-[#2D2A26] mb-2 group-hover:text-[#A67C52] transition-colors">
                  {item.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#D6D3C9] group-hover:w-24 group-hover:bg-[#A67C52] transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-base md:text-lg leading-relaxed text-[#59554D] group-hover:text-[#2D2A26] transition-colors whitespace-pre-line text-justify">
                {item.content}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Video Gallery */}
        <div className="space-y-12 md:space-y-10">
            
          {/* 1. Project Intro Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
          >
             <div className="lg:w-1/3 text-center lg:text-left">
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#8C8678] mb-4 block">Introduction</span>
                <h3 className="font-(--font-playfair) text-3xl md:text-4xl lg:text-5xl text-[#2D2A26] mb-4 md:mb-6">
                 <span className='story-script-regular'>Câu chuyện</span> <br/>
                  <span className="italic text-[#A67C52]">The Right Meal</span>
                </h3>
                <p className="text-[#59554D] text-base md:text-lg mb-6 md:mb-8">
                  Khám phá hành trình và tâm huyết của đội ngũ chúng tôi trong việc xây dựng giải pháp dinh dưỡng cho sinh viên.
                </p>
             </div>
             
             <div className="w-full lg:w-2/3 aspect-video bg-[#EBE7DE] rounded-xl overflow-hidden shadow-2xl relative group">
                <video 
                  className="w-full h-full object-cover cursor-pointer" 
                  controls
                  preload="metadata"
                  poster="/ebook/anh nen vdeo.jpg"
                  onClick={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                >
                  <source src="/video/Introduction Video _ CNTT & TT _ Nhóm 60.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
             </div>
          </motion.div>

          {/* 2. Expert Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center"
          >
             <div className="lg:w-1/3 text-center lg:text-right">
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#8C8678] mb-4 block">Expert Perspective</span>
                <h3 className="font-(--font-playfair) text-3xl md:text-4xl lg:text-5xl text-[#2D2A26] mb-4 md:mb-6">
                   <span className='story-script-regular'>Góc nhìn<br/></span>
                  <span className="italic text-[#A67C52]">Chuyên gia</span>
                </h3>
                <p className="text-[#59554D] text-base md:text-lg mb-6 md:mb-8">
                   Chuyên gia dinh dưỡng nói gì về hiện trạng ăn uống của sinh viên hiện nay? Những lời khuyên bổ ích để cân bằng cuộc sống.
                </p>
             </div>
             
             <div className="w-full lg:w-2/3 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/ypEYiP3qRm0" 
                  title="Chuyên gia dinh dưỡng nói gì về hiện trạng ăn uống của sinh viên hiện nay?" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
