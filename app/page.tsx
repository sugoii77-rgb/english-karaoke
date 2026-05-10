"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { transcript } from "../data/transcript";

// ─── 단어 사전 ───────────────────────────────────────────────────────────────
const wordMeanings: Record<string, string> = {
  confidence: "자신감",
  confident: "자신감 있는",
  behavior: "행동",
  behaviors: "행동들",
  increase: "늘리다, 증가시키다",
  achieve: "성취하다, 이루다",
  achieved: "성취했다",
  courage: "용기",
  brave: "용감한",
  momentum: "추진력, 탄력",
  success: "성공",
  successful: "성공적인",
  career: "커리어, 경력",
  contribute: "기여하다",
  executive: "임원",
  athlete: "운동선수",
  performed: "수행했다, 해냈다",
  excellent: "훌륭한",
  excellence: "탁월함",
  nerves: "긴장",
  awkward: "어색한",
  conflict: "갈등",
  publish: "게시하다",
  podcast: "팟캐스트",
  critique: "비평하다",
  opinions: "의견들",
  metaphorically: "비유적으로",
  actually: "실제로",
  table: "테이블, 회의 자리",
  celebrate: "축하하다",
  celebrated: "축하했다",
  colleague: "동료",
  threatened: "위협받는",
  support: "지지하다",
  promotion: "승진",
  accomplishment: "성취",
  accomplishments: "성취들",
  constantly: "끊임없이",
  goals: "목표들",
  stress: "스트레스",
  reinforce: "강화하다",
  prior: "이전의",
  propel: "앞으로 밀고 나가다",
  shy: "수줍은",
  stranger: "낯선 사람",
  strangers: "낯선 사람들",
  homesick: "향수병이 난",
  disappointing: "실망스러운",
  pursue: "추구하다",
  dream: "꿈",
  attitudes: "태도들",
  research: "연구",
  associated: "관련된",
  differently: "다르게",
  sports: "스포츠",
  industry: "업계, 산업",
  female: "여성의",
  manager: "감독, 관리자",
  general: "전체의, 총괄의",
  sideline: "경기장 옆 라인",
  reporting: "리포팅, 현장 보도",
  televised: "TV로 방송된",
  basketball: "농구",
  familiar: "익숙한",
  headset: "헤드셋",
  tactic: "전략, 전술",
  uncomfortable: "불편한",
  conversation: "대화",
  uniform: "유니폼",
  wrong: "잘못된",
  color: "색상",
  title: "제목",
  upload: "업로드",
  button: "버튼",
  edits: "수정",
  listen: "듣다",
  world: "세상",
  seat: "자리",
  represents: "대표하다",
  baseball: "야구",
  room: "방",
  deal: "거래",
  ladder: "사다리",
  forward: "앞으로",
  accolades: "찬사, 칭찬",
  promoted: "승진했다",
  chief: "최고의, 수석의",
  marketing: "마케팅",
  officer: "임원",
  league: "리그",
  sincere: "진심 어린",
  congratulatory: "축하의",
  outreach: "연락, 다가감",
  bolster: "북돋우다, 강화하다",
  activity: "활동",
  performance: "성과, 수행",
  proud: "자랑스러운",
  born: "태어난",
  current: "현재의",
  immediately: "즉시",
  diminished: "줄어든, 약해진",
  meaningful: "의미 있는",
  highlight: "하이라이트",
  brain: "뇌",
  rewire: "다시 연결하다",
  worth: "가치 있는",
  risk: "위험, 리스크",
  score: "득점하다",
  runs: "득점 (야구)",
  times: "배, 곱",
  specific: "구체적인",
  decision: "결정",
  commit: "결심하다",
  committed: "결심한",
  pattern: "패턴, 습관",
  stuck: "막힌, 고착된",
  version: "버전",
  potential: "잠재력",
  natural: "타고난",
  talent: "재능",
  attempt: "시도하다",
  journal: "일기를 쓰다",
  journaling: "일기 쓰기",
  reflect: "반성하다, 돌아보다",
  reflection: "반성, 회고",
  negative: "부정적인",
  positive: "긍정적인",
  discomfort: "불편함",
  fear: "두려움",
  overcome: "극복하다",
  anxious: "불안한",
  anxiety: "불안",
  volunteer: "자원하다",
  volunteering: "자원봉사",
  speak: "말하다",
  public: "공개적인, 대중",
  speech: "연설",
  recognize: "인정하다, 알아보다",
  recognition: "인정, 인식",
  reward: "보상",
  habit: "습관",
  practice: "연습하다",
  practicing: "연습 중인",
  consistently: "일관되게",
  growth: "성장",
  mindset: "마음가짐",
  challenge: "도전",
  improve: "향상시키다",
  improvement: "향상",
  focus: "집중하다",
  progress: "진전, 발전",
  opportunity: "기회",
  professional: "전문적인",
};

// ─── 토익 문제 ────────────────────────────────────────────────────────────────
const toicQuestions = [
  {
    q: "According to Emily Jaenson, confidence is _____ built.",
    opts: ["naturally", "behaviorally", "accidentally", "randomly"],
    ans: 1,
    exp: "She says confidence is built through specific behaviors, not born naturally.",
  },
  {
    q: "The word 'bolster' in the talk is closest in meaning to:",
    opts: ["weaken", "measure", "strengthen", "ignore"],
    ans: 2,
    exp: "'Bolster' means to strengthen or support something.",
  },
  {
    q: "Which behavior does the speaker suggest to build confidence?",
    opts: [
      "Avoid uncomfortable situations",
      "Celebrate your accomplishments",
      "Work alone without feedback",
      "Focus only on failures",
    ],
    ans: 1,
    exp: "The speaker recommends celebrating your accomplishments as one of the six behaviors.",
  },
  {
    q: "The word 'momentum' is closest in meaning to:",
    opts: ["destination", "driving force", "direction", "distance"],
    ans: 1,
    exp: "'Momentum' means a driving force or continuing motion.",
  },
  {
    q: "Why does the speaker say you should support colleagues' promotions?",
    opts: [
      "To appear generous",
      "Because it is required by management",
      "Because supporting others reinforces your own confidence",
      "To receive recognition from executives",
    ],
    ans: 2,
    exp: "Supporting others builds your own confidence by reinforcing a generous, collaborative mindset.",
  },
  {
    q: "The word 'reinforce' is closest in meaning to:",
    opts: ["reduce", "replace", "strengthen", "report"],
    ans: 2,
    exp: "'Reinforce' means to make something stronger.",
  },
  {
    q: "What does the speaker recommend about talking to strangers?",
    opts: [
      "Avoid it to stay safe",
      "Do it only at professional events",
      "It is one way to practice building confidence",
      "It is not related to confidence",
    ],
    ans: 2,
    exp: "Talking to strangers is one of the six behaviors to build confidence.",
  },
  {
    q: "The phrase 'push through discomfort' means:",
    opts: [
      "Give up when things get hard",
      "Continue despite feeling uncomfortable",
      "Ask others to help you",
      "Avoid difficult situations",
    ],
    ans: 1,
    exp: "It means to continue doing something even when it feels uncomfortable.",
  },
  {
    q: "At the end, the speaker uses the metaphor of _____ to describe potential.",
    opts: ["basketball", "baseball", "tennis", "football"],
    ans: 1,
    exp: "She asks: 'How many runs could you score if you were 10 times more confident?' — a baseball metaphor.",
  },
  {
    q: "The word 'accolades' is closest in meaning to:",
    opts: ["criticisms", "failures", "awards and praise", "responsibilities"],
    ans: 2,
    exp: "'Accolades' means awards, praise, or special recognition.",
  },
];

// ─── 헬퍼 ─────────────────────────────────────────────────────────────────────
const cleanWord = (w: string) => w.replace(/["""'.?!,;:()\-]/g, "").trim();

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [myWords, setMyWords] = useState<string[]>([]);
  const [showMyWords, setShowMyWords] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [lesssonDone, setLessonDone] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const duration = useMemo(() => Math.max(...transcript.map((l) => l.end), 603), []);

  const currentIndex = useMemo(() => {
    const idx = transcript.findIndex((l) => currentTime >= l.start && currentTime < l.end);
    if (idx >= 0) return idx;
    let ni = 0;
    for (let i = 0; i < transcript.length; i++) {
      if (transcript[i].start <= currentTime) ni = i;
    }
    return ni;
  }, [currentTime]);

  const currentLine = transcript[currentIndex];

  // 재생 타이머
  useEffect(() => {
    if (!isPlaying) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          setLessonDone(true);
          return duration;
        }
        return Math.min(prev + 0.25, duration);
      });
    }, 250);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, duration]);

  // 현재 자막 자동 스크롤
  useEffect(() => {
    if (showTranscript) activeLineRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex, showTranscript]);

  // 로컬 단어장 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ek_mywords");
      if (saved) setMyWords(JSON.parse(saved));
    } catch {}
  }, []);

  const saveMyWords = (list: string[]) => {
    setMyWords(list);
    try { localStorage.setItem("ek_mywords", JSON.stringify(list)); } catch {}
  };

  const addToMyWords = (word: string) => {
    if (!myWords.includes(word)) saveMyWords([...myWords, word]);
  };

  const removeFromMyWords = (word: string) => saveMyWords(myWords.filter((w) => w !== word));

  // 단어 탭 처리
  const handleWordTap = (word: string) => {
    const clean = cleanWord(word);
    if (!clean) return;
    setSelectedWord(clean);
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(clean);
      utt.lang = "en-US";
      utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };

  const speak = (text: string, lang: "en-US" | "ko-KR") => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang;
    utt.rate = lang === "en-US" ? 0.82 : 0.95;
    window.speechSynthesis.speak(utt);
  };

  // 단어별 타이밍 계산
  const renderWords = (text: string, lineStart: number, lineEnd: number) => {
    const tokens = text.split(/(\s+)/);
    const words = tokens.filter((t) => t.trim() !== "");
    const totalChars = words.reduce((s, w) => s + w.length, 0);
    const lineDur = Math.max(lineEnd - lineStart, 1);

    let cumChars = 0;
    const timings = words.map((word) => {
      const wStart = lineStart + (cumChars / totalChars) * lineDur;
      cumChars += word.length;
      const wEnd = lineStart + (cumChars / totalChars) * lineDur;
      return { word, wStart, wEnd };
    });

    return timings.map(({ word, wStart, wEnd }, i) => {
      const isCurrent = currentTime >= wStart && currentTime < wEnd;
      const isPast = currentTime >= wEnd;
      return (
        <span key={i}>
          <button
            onPointerDown={() => handleWordTap(word)}
            style={{
              display: "inline",
              border: "none",
              background: isCurrent ? "rgba(250,204,21,0.22)" : "transparent",
              borderRadius: "5px",
              padding: "0 2px",
              margin: "0 1px",
              cursor: "pointer",
              font: "inherit",
              letterSpacing: "inherit",
              color: isCurrent
                ? "#facc15"
                : isPast
                ? "rgba(250,204,21,0.5)"
                : "rgba(255,255,255,0.92)",
              textShadow: isCurrent ? "0 0 20px rgba(250,204,21,0.85)" : "none",
              fontWeight: isCurrent ? 900 : "inherit",
              transition: "color 0.1s",
              lineHeight: "inherit",
            }}
          >
            {word}
          </button>
          {i < timings.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  // 토익 문제 처리
  const handleQuizAnswer = (optIdx: number) => {
    const next = [...quizAnswers, optIdx];
    setQuizAnswers(next);
    if (quizIdx + 1 >= toicQuestions.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(quizIdx + 1);
    }
  };

  const quizScore = quizAnswers.filter((a, i) => a === toicQuestions[i].ans).length;

  // ─── 렌더 ─────────────────────────────────────────────────────────────────
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(160deg,#040a14 0%,#0d1e35 55%,#061410 100%)",
        color: "white",
        fontFamily: "system-ui,-apple-system,sans-serif",
        display: "flex",
        flexDirection: "column",
        maxWidth: "480px",
        margin: "0 auto",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── 단어 팝업 ── */}
      {selectedWord && (
        <div
          onClick={() => setSelectedWord(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a2535",
              border: "1.5px solid rgba(250,204,21,0.45)",
              borderRadius: "24px",
              padding: "28px 22px",
              width: "100%",
              maxWidth: "340px",
              boxShadow: "0 12px 50px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>단어</div>
            <div style={{ fontSize: "38px", fontWeight: 900, marginBottom: "6px" }}>
              {selectedWord}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#d1fae5",
                fontWeight: 700,
                marginBottom: "18px",
                minHeight: "28px",
              }}
            >
              {wordMeanings[selectedWord.toLowerCase()]
                ? `🇰🇷 ${wordMeanings[selectedWord.toLowerCase()]}`
                : "📖 사전에 없는 단어"}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => speak(selectedWord, "en-US")}
                style={popBtn("#facc15", "#111")}
              >
                🔊 발음 듣기
              </button>

              {!wordMeanings[selectedWord.toLowerCase()] && !myWords.includes(selectedWord) && (
                <button
                  onClick={() => { addToMyWords(selectedWord); }}
                  style={popBtn("rgba(99,102,241,0.85)", "white")}
                >
                  📝 내 단어장에 추가
                </button>
              )}

              {myWords.includes(selectedWord) && (
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "rgba(99,102,241,0.15)",
                    color: "#a5b4fc",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  ✓ 내 단어장에 있어요
                </div>
              )}

              <button onClick={() => setSelectedWord(null)} style={popBtn("rgba(255,255,255,0.12)", "white")}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 토익 퀴즈 ── */}
      {quizActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#040a14",
            zIndex: 150,
            overflowY: "auto",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "20px" }}>📝 TOEIC 연습</h2>
            <button
              onClick={() => { setQuizActive(false); setQuizIdx(0); setQuizAnswers([]); setQuizDone(false); }}
              style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "24px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {!quizDone ? (
            <>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
                문제 {quizIdx + 1} / {toicQuestions.length}
              </div>
              {/* 진행 바 */}
              <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", marginBottom: "24px" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${((quizIdx) / toicQuestions.length) * 100}%`,
                    background: "#facc15",
                    borderRadius: "2px",
                    transition: "width 0.3s",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                  marginBottom: "24px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                }}
              >
                {toicQuestions[quizIdx].q}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                {toicQuestions[quizIdx].opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    style={{
                      padding: "16px 18px",
                      borderRadius: "14px",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.06)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "15px",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(250,204,21,0.15)",
                        color: "#facc15",
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "13px",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* 결과 화면 */
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "28px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "20px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontSize: "52px", marginBottom: "8px" }}>
                  {quizScore >= 8 ? "🏆" : quizScore >= 6 ? "⭐" : "💪"}
                </div>
                <div style={{ fontSize: "32px", fontWeight: 900, marginBottom: "4px" }}>
                  {quizScore} / {toicQuestions.length}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "15px" }}>
                  {quizScore >= 8 ? "완벽해! 최고야 👏" : quizScore >= 6 ? "잘했어! 조금만 더!" : "다시 도전해보자! 할 수 있어!"}
                </div>
              </div>

              {toicQuestions.map((q, i) => {
                const correct = quizAnswers[i] === q.ans;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: correct ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                      border: `1px solid ${correct ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                    }}
                  >
                    <div style={{ fontSize: "13px", color: correct ? "#86efac" : "#fca5a5", marginBottom: "4px", fontWeight: 700 }}>
                      {correct ? "✓ 정답" : "✗ 오답"} — Q{i + 1}
                    </div>
                    <div style={{ fontSize: "13px", color: "#e5e7eb", marginBottom: "4px" }}>{q.q}</div>
                    {!correct && (
                      <div style={{ fontSize: "12px", color: "#86efac" }}>
                        정답: ({String.fromCharCode(65 + q.ans)}) {q.opts[q.ans]}
                      </div>
                    )}
                    <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{q.exp}</div>
                  </div>
                );
              })}

              <button
                onClick={() => { setQuizIdx(0); setQuizAnswers([]); setQuizDone(false); }}
                style={{ padding: "16px", borderRadius: "14px", border: "none", background: "#facc15", color: "#111", fontWeight: 800, fontSize: "16px", cursor: "pointer" }}
              >
                다시 풀기
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── 내 단어장 ── */}
      {showMyWords && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 160,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setShowMyWords(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111c2b",
              borderRadius: "24px 24px 0 0",
              padding: "24px 20px",
              width: "100%",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>📝 내 단어장 ({myWords.length})</h3>
            {myWords.length === 0 ? (
              <div style={{ color: "#6b7280", fontSize: "14px", textAlign: "center", padding: "24px" }}>
                모르는 단어를 탭하면 여기 저장돼요!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {myWords.map((w) => (
                  <div
                    key={w}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "17px" }}>{w}</div>
                      <div style={{ fontSize: "13px", color: "#a7f3d0" }}>
                        {wordMeanings[w.toLowerCase()] || "사전에 없음 (직접 검색해봐!)"}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromMyWords(w)}
                      style={{ background: "none", border: "none", color: "#6b7280", fontSize: "20px", cursor: "pointer" }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 헤더 ── */}
      <header style={{ padding: "16px 18px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 900, letterSpacing: "0.04em" }}>
              🎵 English Karaoke
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#6b7280" }}>
              Six behaviors to increase confidence · Emily Jaenson
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setShowMyWords(true)}
              style={{
                background: myWords.length > 0 ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "10px",
                color: myWords.length > 0 ? "#a5b4fc" : "#9ca3af",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              📝 {myWords.length}
            </button>
            <a
              href="https://youtu.be/0Tk82hEHNnY"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "#9ca3af",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 10px",
                textDecoration: "none",
              }}
            >
              ▶ YT
            </a>
          </div>
        </div>
      </header>

      {/* ── 메인 디스플레이 ── */}
      <div
        style={{
          flex: 1,
          padding: "12px 18px 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "260px",
        }}
      >
        <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 700, marginBottom: "14px" }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div
          style={{
            fontSize: "clamp(20px, 5.5vw, 30px)",
            fontWeight: 800,
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            marginBottom: "14px",
            minHeight: "80px",
          }}
        >
          {currentLine
            ? renderWords(currentLine.text, currentLine.start, currentLine.end)
            : <span style={{ color: "#4b5563" }}>▶ 재생 버튼을 눌러 시작하세요</span>}
        </div>

        <div
          style={{
            fontSize: "clamp(15px, 4vw, 20px)",
            color: "#a7f3d0",
            fontWeight: 600,
            lineHeight: 1.5,
            minHeight: "48px",
          }}
        >
          {currentLine?.ko ?? ""}
        </div>
      </div>

      {/* ── 컨트롤 ── */}
      <div style={{ padding: "0 18px 16px", flexShrink: 0 }}>
        {/* 프로그레스 바 */}
        <input
          type="range"
          min={0}
          max={duration}
          step={0.25}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#facc15", marginBottom: "16px", cursor: "pointer" }}
        />

        {/* 메인 버튼 행 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "14px" }}>
          <button
            onClick={() => setCurrentTime((p) => Math.max(0, p - 10))}
            style={navBtn}
          >
            ◀◀{"\n"}10초
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              border: "none",
              background: isPlaying ? "#ef4444" : "#22c55e",
              color: "white",
              fontSize: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isPlaying ? "0 0 24px rgba(239,68,68,0.55)" : "0 0 24px rgba(34,197,94,0.55)",
              flexShrink: 0,
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={() => setCurrentTime((p) => Math.min(duration, p + 10))}
            style={navBtn}
          >
            10초{"\n"}▶▶
          </button>
        </div>

        {/* 보조 버튼 행 */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
            style={smBtn}
          >
            ↺ 처음
          </button>
          <button onClick={() => currentLine && speak(currentLine.text, "en-US")} style={smBtn}>
            🔊 영어
          </button>
          <button onClick={() => currentLine && speak(currentLine.ko, "ko-KR")} style={smBtn}>
            🔊 한국어
          </button>
          <button
            onClick={() => setShowTranscript((p) => !p)}
            style={{ ...smBtn, background: showTranscript ? "rgba(250,204,21,0.18)" : "rgba(255,255,255,0.1)" }}
          >
            📜 자막 {showTranscript ? "▲" : "▼"}
          </button>
        </div>

        {/* 수업 완료 후 토익 버튼 */}
        {(lesssonDone || currentTime > duration * 0.8) && (
          <button
            onClick={() => { setQuizActive(true); setQuizIdx(0); setQuizAnswers([]); setQuizDone(false); }}
            style={{
              marginTop: "12px",
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
              color: "white",
              fontWeight: 800,
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}
          >
            📝 TOEIC 문제 풀기 ({toicQuestions.length}문제)
          </button>
        )}
      </div>

      {/* ── 자막 패널 ── */}
      {showTranscript && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            maxHeight: "45vh",
            overflowY: "auto",
            background: "rgba(0,0,0,0.3)",
            padding: "10px 14px",
          }}
        >
          {transcript.map((line, i) => {
            const active = i === currentIndex;
            return (
              <div
                key={i}
                ref={active ? activeLineRef : null}
                onClick={() => setCurrentTime(line.start)}
                style={{
                  padding: "10px 12px",
                  borderRadius: "12px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  background: active ? "rgba(250,204,21,0.15)" : "transparent",
                  border: `1px solid ${active ? "rgba(250,204,21,0.35)" : "transparent"}`,
                }}
              >
                <div style={{ fontSize: "10px", color: active ? "#fde68a" : "#6b7280", marginBottom: "2px" }}>
                  {formatTime(line.start)}
                </div>
                <div style={{ fontSize: "14px", color: active ? "white" : "#d1d5db", fontWeight: active ? 700 : 400 }}>
                  {line.text}
                </div>
                <div style={{ fontSize: "12px", color: "#6ee7b7", marginTop: "2px" }}>
                  {line.ko}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

// ─── 버튼 스타일 ──────────────────────────────────────────────────────────────
const navBtn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontWeight: 700,
  fontSize: "13px",
  cursor: "pointer",
  whiteSpace: "pre-line",
  textAlign: "center",
  lineHeight: 1.3,
  minWidth: "64px",
};

const smBtn: React.CSSProperties = {
  flex: "1 1 auto",
  padding: "10px 8px",
  borderRadius: "10px",
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontWeight: 600,
  fontSize: "13px",
  cursor: "pointer",
  textAlign: "center",
};

function popBtn(bg: string, color: string): React.CSSProperties {
  return {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: bg,
    color,
    fontWeight: 800,
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  };
}
