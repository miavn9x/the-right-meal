"use client";

import Image from "next/image";

const membersRaw = [
  "23040547 - Võ Minh Ngọc.jpg",
  "23040926 - Vũ Thị Bảo Ngọc.jpg",
  "24040743 - Nguyễn Phương Thảo Nguyên.jpg",
  "24041588 - Phạm Thị Ngọc.jpg",
  "24041590 - Đoàn Minh Nguyên.jpg",
  "24042095 - Trương Ánh Ngọc.jpg",
  "25042225 - Phạm Thị Hà Ngọc.jpg"
];

const members = membersRaw.map(file => {
  const namePart = file.replace(".jpg", ""); 
  const [id, ...nameRest] = namePart.split(" - ");
  const name = nameRest.join(" - ");
  return {
    id,
    name,
    fullName: `${name} - ${id}`,
    img: `/anh thanh vien/ảnh thành viên/${file}`
  };
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#2D2A26] font-(--font-outfit)">
      {/* Tối ưu: px-4 trên mobile để sát lề hơn, space-y giảm trên mobile để đỡ phải cuộn quá nhiều */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-12 md:space-y-20">
        
        {/* MEMBERS SECTION */}
        <section>
            <h2 className="story-script-regular text-5xl md:text-7xl text-center text-[#2D2A26] mb-8 md:mb-12">
              Thành Viên
            </h2>
            {/* Tối ưu: gap-4 trên mobile để tiết kiệm diện tích, gap-8 trên PC để thoáng */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {members.map((m) => (
                    <div key={m.id} className="group relative overflow-hidden rounded-lg shadow-md">
                        {/* Aspect Ratio Container */}
                        <div className="relative aspect-3/4">
                             <Image 
                                src={m.img} 
                                alt={m.name} 
                                fill 
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                             />
                             
                             {/* Overlay: Gradient + Blur Background for Text */}
                             <div className="absolute inset-x-0 bottom-0 py-3 px-2 bg-black/60 backdrop-blur-md border-t border-white/20 transition-all duration-300 group-hover:bg-black/70">
                                <h3 className="text-center text-base md:text-lg text-white font-bold tracking-wide">
                                    {m.name} 
                                    <span className="block text-[10px] md:text-xs font-sans text-white/80 mt-1 uppercase tracking-widest">
                                      {m.id}
                                    </span>
                                </h3>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* NEWSLETTER & FEEDBACK SECTION (Split Layout) */}
        {/* Tối ưu: gap-6 trên mobile, gap-10 trên PC */}
        <div className="grid  gap-6 md:gap-10">
            
            {/* Newsletter */}
            {/* Tối ưu: p-6 trên mobile (tránh bị quá dày), p-12 trên PC giữ nguyên design */}
            <section className="bg-[#f6efe1] p-6 md:p-12 text-center flex flex-col items-center justify-center border border-[#f0e6c8]">
                <div className="w-12 h-1 bg-[#d9a07a] mb-6"></div>
                <h2 className="font-(--font-playfair) text-2xl md:text-4xl text-[#4b5861] mb-4 italic leading-tight">
                    Gặp ngay  The Right Meal nào!
                </h2>
                <p className="text-[#6b6b6b] mb-6 md:mb-8 text-sm md:text-base">
                  Đăng kí để nhận thông báo mới nhất từ  The Right Meal nhé!
                </p>
                
                <form action="mailto:therightmeal.site@gmail.com" method="POST" encType="text/plain" className="w-full max-w-md space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input 
                            name="Email"
                            type="email" 
                            placeholder="Email của bạn là..." 
                            aria-label="Nhập email của bạn"
                            className="flex-1 bg-transparent border-b border-[#bfb6a5] py-2 focus:outline-none focus:border-[#d9a07a] placeholder-[#9a8f7e] text-center md:text-left transition-colors"
                            required
                        />
                        {/* Tối ưu: Button trên mobile full width để dễ bấm */}
                        <button type="submit" className="w-full md:w-auto border border-[#d9a07a] text-[#b4633a] px-6 py-3 md:py-2 uppercase text-xs tracking-widest hover:bg-[#d9a07a] hover:text-white transition-colors cursor-pointer">
                            Nhắn ngay thôi
                        </button>
                    </div>
                </form>
            </section>

            {/* Feedback Form */}
            {/* Tối ưu: p-6 trên mobile, p-12 trên PC */}
            {/* <section className="bg-[#f6efe1] p-6 md:p-12 border border-[#f0e6c8]">
                <h2 className="font-(--font-playfair) text-2xl md:text-4xl text-[#4b5861] mb-2 leading-tight">
                    CLE-DIARY luôn sẵn sàng lắng nghe
                </h2>
                <p className="text-[#4b5861] text-base md:text-lg italic mb-6 md:mb-8">
                  nhận xét và góp ý của bạn ♡
                </p>

                <form action="mailto:therightmeal.site@gmail.com" method="POST" encType="text/plain" className="space-y-6">
                    <div>
                        <input 
                            name="Lời nhắn"
                            type="text" 
                            placeholder="Lời nhắn gửi của bạn..." 
                            aria-label="Nhập lời nhắn của bạn"
                            className="w-full bg-transparent border-b border-[#4b5861] py-3 focus:outline-none focus:border-black placeholder-[#6b6b6b] transition-colors"
                        />
                    </div>
                    <div className="text-right">
                         <button type="submit" className="inline-block border border-[#4b5861] text-[#4b5861] px-8 py-3 md:py-2 uppercase text-xs tracking-widest hover:bg-[#4b5861] hover:text-white transition-colors cursor-pointer">
                            Send it
                        </button>
                    </div>
                </form>
            </section> */}
        </div>

      </div>
    </main>
  );
}