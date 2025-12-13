'use client';

import { motion } from 'framer-motion';
import { Target, AlertCircle, TrendingUp, Lightbulb, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Custom Video Player Component
interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
}

function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  // Mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls after 3 seconds
  const resetHideControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black rounded-xl overflow-hidden group"
      onMouseMove={resetHideControlsTimeout}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Center Play/Pause Button */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlay}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10" fill="white" />
          ) : (
            <Play className="w-10 h-10 ml-1" fill="white" />
          )}
        </motion.button>
      </div>

      <div 
        className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-white text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-[#A67C52] transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          {/* Center: Title */}
          <div className="flex-1 text-white text-sm font-medium truncate px-2">
            {title}
          </div>

          {/* Right: Volume & Fullscreen */}
          <div className="flex items-center gap-3">
            {/* Volume Control */}
            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="text-white hover:text-[#A67C52] transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#A67C52] transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-6 h-6" />
              ) : (
                <Maximize className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
             
             <div className="w-full lg:w-2/3 aspect-video bg-[#EBE7DE] rounded-xl overflow-hidden shadow-2xl relative">
                <VideoPlayer 
                  src="/video/Introduction Video _ CNTT & TT _ Nhóm 60.mp4"
                  poster="/ebook/anh nen vdeo.jpg"
                  title="Câu chuyện The Right Meal"
                />
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
