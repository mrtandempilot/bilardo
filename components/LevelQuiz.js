"use client";
import { useState } from "react";
import { Compass, ArrowRight, RotateCcw, Sparkles, Award } from "lucide-react";
import { branches, subscriptions, levelLabel, subLabel } from "@/lib/data";
import { pickPackage } from "@/lib/pick";

export default function LevelQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    branch: "",
    experience: "",
    weakness: "",
    commitment: ""
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: "branch",
      title: "Hangi bilardo branşına odaklanmak istiyorsun?",
      subtitle: "Eğitim programını seçeceğin disipline göre özelleştireceğiz.",
      options: [
        { label: "Amerikan Pool (8 & 9 Top)", desc: "Dinamik cebe sokma, renkli toplar ve masa temizleme", val: "amerikan", icon: "🎱" },
        { label: "3-Bant Karambol (Carom)", desc: "Saf geometri, üç bant elmas açıları ve stratejik vuruşlar", val: "ucbant", icon: "🔴" },
        { label: "Her İkisini de Merak Ediyorum", desc: "Temel mekaniği öğrenip iki branşı da denemek istiyorum", val: "her_ikisi", icon: "🎯" }
      ]
    },
    {
      id: "experience",
      title: "Masadaki mevcut deneyim düzeyin nedir?",
      subtitle: "Doğru basamaktan başlaman için oyun geçmişin önemli.",
      options: [
        { label: "Sıfır / İlk Kez Başlayacağım", desc: "Istakayı doğru tutmak ve temel duruşu öğrenmek istiyorum", val: "yeni", icon: "🌱" },
        { label: "Hobi Olarak Oynuyorum", desc: "Arkadaş maçlarında fena değilim ama teknik bilgim ve falsom eksik", val: "orta", icon: "⚡" },
        { label: "İleri Düzey / Turnuva Hedefim Var", desc: "Düzenli seri yapmak, diamond sistemlerini çözmek ve maç kazanmak", val: "ileri", icon: "🏆" }
      ]
    },
    {
      id: "weakness",
      title: "Seni oyunda en çok zorlayan problem nedir?",
      subtitle: "Derslerimizde bu zayıf halkanın üzerine gideceğiz.",
      options: [
        { label: "Düz Istaka Salınımı & Hedefi Kaçırma", desc: "Hedeflediğim noktaya topu göndermekte istikrarsızım", val: "mekanik", icon: "🎯" },
        { label: "Beyaz Top Kontrolü & Pozisyon Alamama", desc: "Topu cebe atıyorum ama bir sonraki topa çok kötü kalıyorum", val: "pozisyon", icon: "📐" },
        { label: "Bant Açıları, Falso & Kaçışlar", desc: "Falsonun topu nereye fırlatacağını kestiremiyorum", val: "aci", icon: "🔄" },
        { label: "Maç Baskısı & Heyecan Kontrolü", desc: "Tek başıma iyiyim ama maçta panikleyip basit hatalar yapıyorum", val: "psikoloji", icon: "🧠" }
      ]
    },
    {
      id: "commitment",
      title: "Haftalık ne kadar vakit ayırabilirsin?",
      subtitle: "Gelişim hızına göre en verimli ders periyodunu belirleyelim.",
      options: [
        { label: "Haftada 1 Gün (Hobi & Keyif)", desc: "Ritmimi kaybetmeden sindire sindire ilerlemek istiyorum", val: "hafta1", icon: "☕" },
        { label: "Haftada 2 Gün (Hızlı İlerleme)", desc: "Hızlıca seviye atlayıp turnuva seviyesine yaklaşmak istiyorum", val: "hafta2", icon: "🚀" },
        { label: "Yoğun Özel Kamp Programı", desc: "Kısa sürede tüm incelikleri baştan sona bitirmek istiyorum", val: "yogun", icon: "🔥" }
      ]
    }
  ];

  const handlePick = (val) => {
    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Testi bitir ve sonuç üret
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (ans) => {
    const brKey = ans.branch === "ucbant" ? "ucbant" : "amerikan";
    const br = branches[brKey];
    const lvlIndex = ans.experience === "yeni" ? 0 : ans.experience === "orta" ? 1 : 2;
    const lvl = br.levels[lvlIndex];
    const titles = ["Geleceğin Ustası (Başlangıç)", "Taktiksel Oyun Kurucu (Orta Düzey)", "Turnuva Adayı (İleri Düzey)"];

    // İleri seviye veya haftada 2+ gün → yoğun abonelik; diğerleri seviyeye uygun kurs
    const wantsSub = lvlIndex === 2 || ans.commitment === "hafta2";
    const sub = subscriptions.find((s) => s.popular) || subscriptions[subscriptions.length - 1];
    const recommendedPackage = wantsSub && lvlIndex > 0 ? subLabel(sub) : levelLabel(br, lvl);

    const adviceMap = {
      mekanik: "Odak noktamız: video kaydıyla omuz-çene hattı ve düz ıstaka salınımı.",
      pozisyon: "Odak noktamız: teğet çizgisi ve beyaz topu santimetrik durdurma drill’leri.",
      aci: "Odak noktamız: diamond açı okuma ve falsonun banttan sonraki etkisi.",
      psikoloji: "Odak noktamız: vuruş öncesi rutin ve maç simülasyonlarıyla baskı yönetimi.",
    };

    setResult({
      title: titles[lvlIndex],
      branchName: ans.branch === "her_ikisi" ? `${br.label} (ilk derste 3 bant da denenir)` : br.label,
      levelName: lvl.name,
      recommendedPackage,
      advice: adviceMap[ans.weakness] || adviceMap.mekanik,
    });
  };

  const resetTest = () => {
    setStep(0);
    setAnswers({ branch: "", experience: "", weakness: "", commitment: "" });
    setResult(null);
  };

  const applyPackage = () => {
    if (result) pickPackage(result.recommendedPackage);
  };

  return (
    <section id="test" className="section section-alt">
      <div className="wrap">
        <div className="section-head text-center">
          <div className="inline-badge">
            <Compass size={14} />
            <span>Kişiselleştirilmiş Yol Haritası</span>
          </div>
          <h2 className="section-title">
            Hangi Seviyedesin? <span className="text-gold">1 Dakikada Öğren</span>
          </h2>
          <p className="section-desc">
            4 basit soruyu yanıtla; oyun tarzına, hedeflerine ve eksiklerine göre en verimli ders programını anında çıkartalım.
          </p>
        </div>

        <div className="quiz-wrapper glass-panel">
          {!result ? (
            <div className="quiz-card">
              {/* Progress Indicator */}
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="quiz-step-header">
                <span className="step-count">Soru {step + 1} / {questions.length}</span>
                <span className="step-percent">%{Math.round(((step + 1) / questions.length) * 100)} Tamamlandı</span>
              </div>

              <h3 className="quiz-question-title">{questions[step].title}</h3>
              <p className="quiz-question-sub">{questions[step].subtitle}</p>

              <div className="quiz-options-list">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    className="quiz-opt-btn"
                    onClick={() => handlePick(opt.val)}
                  >
                    <span className="opt-emoji">{opt.icon}</span>
                    <div className="opt-info">
                      <strong className="opt-name">{opt.label}</strong>
                      <span className="opt-desc">{opt.desc}</span>
                    </div>
                    <ArrowRight size={18} className="opt-arrow" />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button className="quiz-back-btn" onClick={() => setStep(step - 1)}>
                  ← Önceki Soru
                </button>
              )}
            </div>
          ) : (
            /* Result Card */
            <div className="quiz-result-card">
              <div className="result-badge">
                <Sparkles size={16} />
                <span>Analiz Tamamlandı!</span>
              </div>

              <h3 className="result-profile-title">
                Profilin: <span className="text-gold">{result.title}</span>
              </h3>

              <div className="result-details-grid">
                <div className="res-stat-box">
                  <span className="res-label">Önerilen Branş:</span>
                  <strong className="res-val text-emerald">{result.branchName}</strong>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">İdeal Kurs Seviyesi:</span>
                  <strong className="res-val">{result.levelName}</strong>
                </div>
                <div className="res-stat-box">
                  <span className="res-label">Önerilen Paket:</span>
                  <strong className="res-val text-gold">{result.recommendedPackage}</strong>
                </div>
              </div>

              <div className="result-advice-banner">
                <Award size={20} className="text-gold" />
                <p><strong>Antrenör Özel Tavsiyesi:</strong> {result.advice}</p>
              </div>

              <div className="result-actions">
                <button className="btn-primary-lg" onClick={applyPackage}>
                  <span>Bu Paketi Rezervasyona Aktar</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary-link" onClick={resetTest}>
                  <RotateCcw size={16} />
                  <span>Testi Baştan Çöz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
