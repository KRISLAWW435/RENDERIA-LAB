import React, { useEffect, useRef, useState } from 'react';
import { CharacterData, BadgeItem } from '../types/avatar';
import { ASSETS, ROLES } from '../data/labData';
import { MascotPixel } from './MascotPixel';
import { playFanfareSound, playClickSound } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import {
  Download,
  Sparkles,
  RotateCcw,
  Loader2,
  Edit3,
  AlertCircle,
  User,
  Shield,
  Shirt,
  Glasses,
  Box,
  Palette,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

import certificateBg from '../assets/images/certificate.png';
import printImg from '../assets/images/print.png';
import signatureImg from '../assets/images/signature.png';

interface FinalAchievementProps {
  character: CharacterData;
  xp: number;
  badges: BadgeItem[];
  onRestart: () => void;
}

export const FinalAchievement: React.FC<FinalAchievementProps> = ({
  character,
  onRestart,
}) => {
  const containerWrapperRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [studentName, setStudentName] = useState('Юный дизайнер');
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const roleMeta = ROLES.find((r) => r.id === character.role) || ROLES[0];

  useEffect(() => {
    playFanfareSound();
    try {
      const shoot = confetti.create(undefined, { resize: true, useWorker: false });
      shoot({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B9F24D', '#62C9F5', '#FFB9D5', '#BDA7FF', '#FFD700'],
      });
    } catch {
      // Ignore if confetti is unavailable
    }
  }, []);

  // ResizeObserver on wrapper: scale = wrapper.clientWidth / 1792
  useEffect(() => {
    const wrapper = containerWrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      if (containerWrapperRef.current) {
        const s = containerWrapperRef.current.clientWidth / 1792;
        setScale(s);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const issueDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownloadPng = async () => {
    if (!certificateRef.current || isExporting) return;
    setIsExporting(true);
    setExportError(null);
    playClickSound();

    try {
      const element = certificateRef.current;

      // 1. Ensure all images inside the certificate and background are fully loaded and decoded
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = certificateBg;
      if (!bgImg.complete) {
        await new Promise<void>((resolve) => {
          bgImg.onload = () => resolve();
          bgImg.onerror = () => resolve();
        });
      }

      const images = Array.from(element.querySelectorAll('img'));
      await Promise.all(
        images.map(async (img) => {
          if (!img.crossOrigin) {
            img.crossOrigin = 'anonymous';
          }
          if (img.complete && img.naturalHeight !== 0) {
            try {
              await img.decode();
            } catch {
              // ignore decode error if already rendered
            }
            return;
          }
          await new Promise<void>((resolve) => {
            img.onload = async () => {
              try {
                await img.decode();
              } catch {
                // ignore
              }
              resolve();
            };
            img.onerror = () => resolve();
          });
        })
      );

      // 2. Wait 500ms before snapshot to guarantee DOM layout and rendering
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 3. Render with html2canvas (true 1792 x 2400 resolution)
      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: 1792,
        height: 2400,
        windowWidth: 1792,
        windowHeight: 2400,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.getElementById('certificate-container');
          if (clonedContainer) {
            clonedContainer.style.transform = 'none';
            clonedContainer.style.position = 'relative';
            clonedContainer.style.top = '0';
            clonedContainer.style.left = '0';
            clonedContainer.style.width = '1792px';
            clonedContainer.style.height = '2400px';
            if (clonedContainer.parentElement) {
              clonedContainer.parentElement.style.transform = 'none';
              clonedContainer.parentElement.style.width = '1792px';
              clonedContainer.parentElement.style.height = '2400px';
              clonedContainer.parentElement.style.maxWidth = '1792px';
              clonedContainer.parentElement.style.aspectRatio = 'auto';
            }
          }
        },
      });

      const dataUrl = canvas.toDataURL('image/png');

      // 4. Trigger download using dynamic <a> tag
      const link = document.createElement('a');
      link.download = 'RENDERIA_Certificate.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      playFanfareSound();
    } catch (err) {
      console.error('Ошибка при создании PNG сертификата:', err);
      setExportError(
        'Не удалось сформировать изображение сертификата. Пожалуйста, попробуйте еще раз.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const roleTitle =
    character.role === 'custom' && character.customRoleTitle
      ? character.customRoleTitle
      : roleMeta.title;

  const skillsData = [
    {
      name: '3D Моделирование',
      Icon: Box,
      barGradient: 'linear-gradient(90deg, #503CFA 0%, #62C9F5 100%)',
    },
    {
      name: 'Креативность',
      Icon: Palette,
      barGradient: 'linear-gradient(90deg, #F59E0B 0%, #F97316 100%)',
    },
    {
      name: 'Промпт-инжиниринг',
      Icon: Cpu,
      barGradient: 'linear-gradient(90deg, #06B6D4 0%, #503CFA 100%)',
    },
    {
      name: 'Концепт-арт',
      Icon: Layers,
      barGradient: 'linear-gradient(90deg, #84CC16 0%, #10B981 100%)',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Celebrating Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B9F24D] text-[#252735] font-black font-display text-sm uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4" />
          Официальный сертификат готов
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#252735] tracking-tight">
          Поздравляем с окончанием лаборатории!
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
          Ты успешно освоил все этапы создания игрового персонажа и готов применить навыки в реальном 3D-геймдеве!
        </p>
      </div>

      {/* Mascot Congratulations Box */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <MascotPixel
          mood="celebrate"
          speechText={`Поздравляю, юный дизайнер! Твой герой «${
            character.name || 'Герой'
          }» спроектирован по всем канонам 3D-геймдева. Скачай свой именной сертификат от RENDERIA & KIBERONE в оригинальном качестве 1792x2400!`}
          tip="Введи своё реальное имя в поле ниже, чтобы оно появилось на сертификате перед скачиванием."
        />
      </div>

      {/* Student Name Personalization Toolbar */}
      <div className="bg-white border-2 border-[#252735] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_4px_0_#252735]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#62C9F5] text-[#252735] border border-[#252735] flex items-center justify-center font-bold text-lg shrink-0">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
              Имя на сертификате
            </span>
            <span className="text-sm font-black text-[#252735]">
              Укажи своё имя и фамилию:
            </span>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Юный дизайнер"
            maxLength={32}
            className="px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-[#252735] focus:outline-hidden font-display font-bold text-base text-[#252735] w-full sm:w-72 bg-slate-50"
          />
        </div>
      </div>

      {/* Certificate Scaling Wrapper:
          width: 100%; max-width: 1792px; aspect-ratio: 1792 / 2400; position: relative; overflow: hidden; margin: 0 auto; */}
      <div className="w-full pb-6">
        <div
          ref={containerWrapperRef}
          style={{
            width: '100%',
            maxWidth: '1792px',
            aspectRatio: '1792 / 2400',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          {/* Inner Canvas:
              width: 1792px; height: 2400px; position: absolute; top: 0; left: 0; transform-origin: top left; transform: scale(${scale}); */}
          <div
            ref={certificateRef}
            id="certificate-container"
            style={{
              width: '1792px',
              height: '2400px',
              position: 'absolute',
              top: 0,
              left: 0,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              overflow: 'hidden',
              userSelect: 'none',
              boxShadow: 'none',
              border: 'none',
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* Background Image: No squishing, object-fit: cover */}
            <img
              src={certificateBg || ASSETS.certificatePng || '/certificate.png'}
              alt="Certificate Background"
              crossOrigin="anonymous"
              loading="eager"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />

            {/* Character Frame (Left Side):
                position: absolute; left: 205px; top: 614px; width: 682px; height: 809px; z-index: 10;
                background: transparent !important; border: none; */}
            <div
              style={{
                position: 'absolute',
                left: '205px',
                top: '614px',
                width: '682px',
                height: '809px',
                zIndex: 10,
                background: 'transparent',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Inner character image: width: 100%; height: 100%; object-fit: contain; */}
              <img
                src={character.generatedImageUrl || ASSETS.robloxSampleHero}
                alt="Концепт персонажа"
                crossOrigin="anonymous"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              />

              {/* Hero Name Badge at bottom of character frame */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  background: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: '20px',
                  boxShadow: '0 6px 0 #D1D5DB, 0 10px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid #FFFFFF',
                  padding: '12px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 11,
                }}
              >
                <Sparkles style={{ width: '22px', height: '22px', color: '#F59E0B' }} />
                <span
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 900,
                    fontSize: '22px',
                    color: '#0F172A',
                  }}
                >
                  «{character.name || 'Безымянный Герой'}»
                </span>
              </div>
            </div>

            {/* Text Cards Grid (Right Side):
                position: absolute; left: 927px; top: 614px; width: 660px; height: 809px; z-index: 10;
                display: grid; grid-template-columns: 1fr 1fr; gap: 20px; */}
            <div
              style={{
                position: 'absolute',
                left: '927px',
                top: '614px',
                width: '660px',
                height: '809px',
                zIndex: 10,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              {/* 1. Name Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '32px',
                  boxShadow: '0 10px 0 #D1D5DB, 0 16px 26px rgba(0, 0, 0, 0.12)',
                  border: '2px solid #FFFFFF',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '9999px',
                    background: '#503CFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(80, 60, 250, 0.35)',
                    marginBottom: '16px',
                  }}
                >
                  <User style={{ width: '46px', height: '46px', color: '#FFFFFF' }} />
                </div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748B',
                  }}
                >
                  ЮНЫЙ ДИЗАЙНЕР
                </span>
                <span
                  style={{
                    fontSize: '25px',
                    fontWeight: 900,
                    color: '#0F172A',
                    marginTop: '8px',
                    lineHeight: 1.25,
                    wordBreak: 'break-word',
                  }}
                >
                  {studentName.trim() || 'Юный дизайнер'}
                </span>
              </div>

              {/* 2. Role Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '32px',
                  boxShadow: '0 10px 0 #D1D5DB, 0 16px 26px rgba(0, 0, 0, 0.12)',
                  border: '2px solid #FFFFFF',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '9999px',
                    background: '#503CFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(80, 60, 250, 0.35)',
                    marginBottom: '16px',
                  }}
                >
                  <Shield style={{ width: '46px', height: '46px', color: '#FFFFFF' }} />
                </div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748B',
                  }}
                >
                  КЛАСС ГЕРОЯ
                </span>
                <span
                  style={{
                    fontSize: '25px',
                    fontWeight: 900,
                    color: '#0F172A',
                    marginTop: '8px',
                    lineHeight: 1.25,
                    wordBreak: 'break-word',
                  }}
                >
                  {roleTitle}
                </span>
              </div>

              {/* 3. Suit Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '32px',
                  boxShadow: '0 10px 0 #D1D5DB, 0 16px 26px rgba(0, 0, 0, 0.12)',
                  border: '2px solid #FFFFFF',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '9999px',
                    background: '#503CFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(80, 60, 250, 0.35)',
                    marginBottom: '16px',
                  }}
                >
                  <Shirt style={{ width: '46px', height: '46px', color: '#FFFFFF' }} />
                </div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748B',
                  }}
                >
                  КОСТЮМ
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#0F172A',
                    marginTop: '8px',
                    lineHeight: 1.25,
                    wordBreak: 'break-word',
                  }}
                >
                  {character.appearance?.outfit?.name || 'Базовый костюм'}
                </span>
              </div>

              {/* 4. Accessory Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '32px',
                  boxShadow: '0 10px 0 #D1D5DB, 0 16px 26px rgba(0, 0, 0, 0.12)',
                  border: '2px solid #FFFFFF',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '9999px',
                    background: '#503CFA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(80, 60, 250, 0.35)',
                    marginBottom: '16px',
                  }}
                >
                  <Glasses style={{ width: '46px', height: '46px', color: '#FFFFFF' }} />
                </div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748B',
                  }}
                >
                  АКСЕССУАР
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    color: '#0F172A',
                    marginTop: '8px',
                    lineHeight: 1.25,
                    wordBreak: 'break-word',
                  }}
                >
                  {character.appearance?.accessory?.name || 'Без аксессуара'}
                </span>
              </div>
            </div>

            {/* Skills & Competencies Section (Positioned absolutely below character and cards):
                position: absolute; left: 205px; top: 1480px; width: 1382px; */}
            <div
              style={{
                position: 'absolute',
                left: '205px',
                top: '1480px',
                width: '1382px',
                height: '370px',
                zIndex: 10,
                background: '#FFFFFF',
                borderRadius: '36px',
                boxShadow: '0 12px 0 #D1D5DB, 0 18px 30px rgba(0, 0, 0, 0.12)',
                border: '2px solid #FFFFFF',
                padding: '36px 44px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: '20px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#64748B',
                }}
              >
                <Award style={{ width: '28px', height: '28px', color: '#503CFA' }} />
                <span>ОСВОЕННЫЕ НАВЫКИ И КОМПЕТЕНЦИИ</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                {skillsData.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(248, 250, 252, 0.95)',
                      borderRadius: '24px',
                      border: '2px solid #E2E8F0',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '9999px',
                        background: '#503CFA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(80, 60, 250, 0.3)',
                      }}
                    >
                      <skill.Icon style={{ width: '32px', height: '32px', color: '#FFFFFF' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 900,
                            color: '#0F172A',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 900,
                            color: '#503CFA',
                          }}
                        >
                          100%
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '16px',
                          borderRadius: '9999px',
                          background: '#E2E8F0',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '9999px',
                            background: skill.barGradient,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Container (Date, Print, Signature):
                position: absolute; left: 205px; top: 2050px; width: 1382px; */}
            <div
              style={{
                position: 'absolute',
                left: '205px',
                top: '2050px',
                width: '1382px',
                height: '240px',
                zIndex: 10,
                background: '#FFFFFF',
                borderRadius: '36px',
                boxShadow: '0 12px 0 #D1D5DB, 0 18px 30px rgba(0, 0, 0, 0.12)',
                border: '2px solid #FFFFFF',
                padding: '24px 50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Left: ONLY Issue Date */}
              <div style={{ textAlign: 'left', minWidth: '320px' }}>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748B',
                    display: 'block',
                  }}
                >
                  ДАТА ВЫДАЧИ
                </span>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    color: '#0F172A',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  {issueDate}
                </span>
              </div>

              {/* Center: Official School Seal (print.png) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={printImg || '/print.png'}
                  alt="Печать школы"
                  crossOrigin="anonymous"
                  loading="eager"
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))',
                    userSelect: 'none',
                  }}
                />
              </div>

              {/* Right: Signature & RENDERIA & KIBERONE */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  textAlign: 'right',
                  minWidth: '320px',
                  gap: '8px',
                }}
              >
                <img
                  src={signatureImg || '/signature.png'}
                  alt="Подпись"
                  crossOrigin="anonymous"
                  loading="eager"
                  style={{
                    height: '96px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                    userSelect: 'none',
                  }}
                />
                <div
                  style={{
                    borderTop: '2px solid rgba(15, 23, 42, 0.25)',
                    width: '100%',
                    paddingTop: '8px',
                    textAlign: 'right',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: '24px',
                      color: '#0F172A',
                      letterSpacing: '0.05em',
                    }}
                  >
                    RENDERIA &amp; KIBERONE
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '17px',
                      color: '#64748B',
                    }}
                  >
                    Школа цифровых технологий
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Download PNG and Create New Hero */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="btn-3d-lime w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl font-display font-black text-lg cursor-pointer border-2 border-[#252735] shadow-[0_6px_0_#252735] transition-all hover:translate-y-[-2px]"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-[#252735]" />
              <span>Создаём изображение...</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6 text-[#252735]" />
              <span>⬇️ Скачать сертификат (PNG)</span>
            </>
          )}
        </button>

        <button
          onClick={onRestart}
          className="btn-3d-white w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4.5 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300 shadow-[0_4px_0_#cbd5e1] transition-all hover:translate-y-[-2px]"
        >
          <RotateCcw className="w-5 h-5 text-slate-700" />
          <span>Создать нового героя</span>
        </button>
      </div>

      {exportError && (
        <div className="max-w-md mx-auto p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{exportError}</span>
        </div>
      )}
    </div>
  );
};
