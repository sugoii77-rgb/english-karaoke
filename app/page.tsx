"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { transcript } from "./transcript";

const YOUTUBE_URL = "https://youtu.be/IitIl2C3Iy8?si=NUdIR0jzbDQK0SXk";

// ─── 단어 사전 ───────────────────────────────────────────────────────────────
const wordMeanings: Record<string, string> = {
  a: "하나의, 어떤",
  about: "~에 대하여, 약",
  above: "위에, 이상",
  accept: "받아들이다",
  accomplishment: "성취",
  accomplishments: "성취들",
  achieve: "성취하다, 이루다",
  achieved: "성취했다",
  accolade: "찬사, 칭찬",
  accolades: "찬사, 칭찬들",
  activity: "활동",
  actually: "실제로",
  add: "더하다, 추가하다",
  adult: "성인",
  afraid: "두려워하는",
  after: "~후에",
  again: "다시",
  all: "모든",
  also: "또한",
  an: "하나의",
  and: "그리고",
  answer: "대답하다, 답",
  answers: "답들",
  anxious: "불안한",
  anxiety: "불안",
  any: "어떤, 아무",
  are: "~이다, 있다",
  around: "주변에, 약",
  ask: "묻다, 부탁하다",
  asked: "물었다, 부탁했다",
  associate: "관련시키다",
  associated: "관련된",
  at: "~에, ~에서",
  attempt: "시도하다",
  attitude: "태도",
  attitudes: "태도들",
  away: "떨어져, 멀리",
  awkward: "어색한",

  baseball: "야구",
  basketball: "농구",
  be: "~이다, 되다",
  because: "왜냐하면",
  become: "되다",
  became: "되었다",
  been: "~되어 왔다",
  before: "~전에",
  behavior: "행동",
  behaviors: "행동들",
  being: "존재, ~인 상태",
  believe: "믿다",
  big: "큰",
  bolster: "북돋우다, 강화하다",
  book: "책, 전화번호부",
  born: "태어난",
  brave: "용감한",
  brain: "뇌",
  brother: "형, 오빠, 남동생",
  build: "만들다, 쌓다",
  built: "쌓은, 만들어진",
  business: "사업, 업무",
  button: "버튼",
  by: "~에 의해",

  call: "전화, 전화하다",
  called: "전화했다, 불렀다",
  can: "할 수 있다",
  career: "경력, 커리어",
  celebrate: "축하하다",
  celebrated: "축하했다",
  challenge: "도전",
  chief: "최고의, 수석의",
  colleague: "동료",
  colleagues: "동료들",
  college: "대학",
  color: "색상",
  comfortable: "편안한",
  commit: "결심하다, 전념하다",
  committed: "결심한, 전념한",
  confidence: "자신감",
  confident: "자신감 있는",
  conflict: "갈등",
  congratulatory: "축하의",
  consistently: "일관되게",
  constantly: "끊임없이",
  contribute: "기여하다",
  conversation: "대화",
  could: "할 수 있었다, 할 수 있을 것이다",
  courage: "용기",
  create: "만들다",
  cried: "울었다",
  crying: "울고 있는",
  critique: "비평하다",
  current: "현재의",

  deal: "거래, 다루다",
  decision: "결정",
  differently: "다르게",
  diminished: "줄어든, 약해진",
  disappointing: "실망스러운",
  discomfort: "불편함",
  dorm: "기숙사",
  dream: "꿈",

  early: "이른, 초기의",
  earn: "얻다, 획득하다",
  edge: "가장자리",
  edits: "수정",
  excellent: "훌륭한",
  excellence: "탁월함",
  executive: "임원",
  executives: "임원들",
  example: "예시",
  examples: "예시들",

  family: "가족",
  familiar: "익숙한",
  fast: "빠른",
  fear: "두려움",
  female: "여성의",
  first: "첫 번째의",
  focus: "집중하다",
  forward: "앞으로",
  freshman: "신입생",
  friday: "금요일",
  from: "~로부터, ~에서",

  general: "전체의, 총괄의",
  get: "얻다, 되다",
  go: "가다",
  goals: "목표들",
  growth: "성장",

  habit: "습관",
  hand: "손",
  handed: "건네주었다",
  have: "가지다",
  headset: "헤드셋",
  high: "높은",
  highlight: "하이라이트",
  home: "집, 고향",
  homesick: "향수병이 난",
  host: "진행하다, 주최하다",

  i: "나",
  if: "만약",
  illinois: "일리노이",
  immediately: "즉시",
  improve: "향상시키다",
  improved: "향상되었다",
  improvement: "향상",
  in: "~안에, ~에서",
  increase: "늘리다, 증가시키다",
  industry: "업계, 산업",
  interview: "인터뷰하다",
  interviewed: "인터뷰했다",
  is: "~이다",
  it: "그것",

  journal: "일기를 쓰다",
  journaling: "일기 쓰기",
  just: "단지, 방금",

  ladder: "사다리",
  leadership: "리더십",
  league: "리그",
  like: "~처럼, 좋아하다",
  listen: "듣다",
  looked: "찾아봤다, 바라봤다",

  major: "전공, 주요한",
  manager: "감독, 관리자",
  marketing: "마케팅",
  meaningful: "의미 있는",
  metaphorically: "비유적으로",
  mindset: "마음가짐",
  mom: "엄마",
  momentum: "추진력, 탄력",
  more: "더 많은",
  most: "가장 많은",
  my: "나의",

  natural: "타고난, 자연스러운",
  necessary: "필요한",
  negative: "부정적인",
  nerves: "긴장",
  night: "밤",
  not: "아니다",
  notes: "메모",
  number: "번호, 숫자",

  of: "~의",
  officer: "임원",
  on: "~위에, ~에",
  one: "하나, 첫 번째",
  opinions: "의견들",
  opportunity: "기회",
  or: "또는",
  order: "주문하다",
  other: "다른",
  outreach: "연락, 다가감",
  over: "~이상, 넘어서",
  overcome: "극복하다",
  older: "나이가 더 많은",

  partake: "참여하다",
  party: "파티",
  partying: "파티에 참여하기, 놀기",
  pattern: "패턴, 습관",
  performance: "성과, 수행",
  performed: "수행했다, 해냈다",
  phone: "전화",
  pizza: "피자",
  place: "놓다, 걸다, 장소",
  podcast: "팟캐스트",
  positive: "긍정적인",
  potential: "잠재력",
  practice: "연습하다",
  practicing: "연습 중인",
  prior: "이전의",
  professional: "전문적인",
  progress: "진전, 발전",
  promotion: "승진",
  promptly: "즉시, 바로",
  propel: "앞으로 밀고 나가다",
  proud: "자랑스러운",
  public: "공개적인, 대중",
  publish: "게시하다",
  pursue: "추구하다",
  push: "밀다, 추진하다",

  recognize: "인정하다, 알아보다",
  recognition: "인정, 인식",
  reflect: "반성하다, 돌아보다",
  reflection: "반성, 회고",
  reinforce: "강화하다",
  reporting: "리포팅, 현장 보도",
  represents: "대표하다",
  research: "연구",
  reward: "보상",
  rewire: "다시 연결하다",
  risk: "위험, 리스크",
  room: "방",
  runs: "득점, 득점들",

  school: "학교",
  score: "득점하다",
  seat: "자리",
  several: "몇몇의",
  shy: "수줍은",
  sideline: "경기장 옆 라인",
  sincere: "진심 어린",
  skill: "능력, 기술",
  small: "작은",
  speak: "말하다",
  speech: "연설",
  spent: "보냈다",
  sport: "스포츠",
  sports: "스포츠",
  spot: "자리",
  started: "시작했다",
  stranger: "낯선 사람",
  strangers: "낯선 사람들",
  stress: "스트레스",
  stuck: "막힌, 고착된",
  success: "성공",
  successful: "성공적인",
  support: "지지하다",

  table: "테이블, 회의 자리",
  tactic: "전략, 전술",
  talent: "재능",
  talk: "말하다",
  team: "팀",
  televised: "TV로 방송된",
  that: "그것, ~라는 것",
  the: "그",
  their: "그들의",
  these: "이것들",
  they: "그들",
  threatened: "위협받는",
  through: "~을 통해",
  time: "시간, 때",
  times: "배, 시간들",
  title: "제목",
  to: "~로, ~에게",
  told: "말했다",
  too: "너무, 또한",
  top: "정상, 맨 위",
  town: "마을",

  uncomfortable: "불편한",
  uniform: "유니폼",
  university: "대학교",
  upload: "업로드",

  version: "버전",
  volunteer: "자원하다",
  volunteering: "자원봉사",

  wanted: "원했다",
  was: "~이었다",
  way: "방법, 길",
  weeks: "몇 주",
  when: "~할 때",
  where: "어디에, ~하는 곳",
  women: "여성들",
  world: "세상",
  worth: "가치 있는",
  wrong: "잘못된",
};

// ─── TOEIC 문제 ───────────────────────────────────────────────────────────────
const toeicQuestions = [
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

const cleanWord = (w: string) =>
  w
    .replace(/[“”"'.?!,;:()\-\[\]{}]/g, "")
    .replace(/’/g, "'")
    .trim();

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const getMeaning = (word: string) => {
  const raw = cleanWord(word).toLowerCase();
  const key = raw.split("'")[0];

  if (!key) return "📖 사전에 없는 단어";
  if (wordMeanings[key]) return wordMeanings[key];

  const candidates = new Set<string>();

  candidates.add(key);

  if (key.endsWith("ies") && key.length > 3) {
    candidates.add(`${key.slice(0, -3)}y`);
  }

  if (key.endsWith("ing") && key.length > 4) {
    const base = key.slice(0, -3);
    candidates.add(base);
    candidates.add(`${base}e`);

    // running -> run, sitting -> sit 같은 중복 자음 보정
    if (base.length >= 2 && base[base.length - 1] === base[base.length - 2]) {
      candidates.add(base.slice(0, -1));
    }
  }

  if (key.endsWith("ed") && key.length > 3) {
    const base = key.slice(0, -2);
    candidates.add(base);
    candidates.add(`${base}e`);

    // improved -> improve 같은 케이스
    if (key.endsWith("ied")) {
      candidates.add(`${key.slice(0, -3)}y`);
    }

    // stopped -> stop 같은 케이스
    if (base.length >= 2 && base[base.length - 1] === base[base.length - 2]) {
      candidates.add(base.slice(0, -1));
    }
  }

  if (key.endsWith("es") && key.length > 3) {
    candidates.add(key.slice(0, -2));
  }

  if (key.endsWith("s") && key.length > 2) {
    candidates.add(key.slice(0, -1));
  }

  for (const candidate of candidates) {
    if (wordMeanings[candidate]) return wordMeanings[candidate];
  }

  return "📖 사전에 없는 단어";
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [myWords, setMyWords] = useState<string[]>([]);
  const [showMyWords, setShowMyWords] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [lessonDone, setLessonDone] = useState(false);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const speechRunIdRef = useRef(0);

  const duration = useMemo(
    () => Math.max(...transcript.map((line) => line.end), 603),
    []
  );

  const currentIndex = useMemo(() => {
    const idx = transcript.findIndex(
      (line) => currentTime >= line.start && currentTime < line.end
    );

    if (idx >= 0) return idx;

    let nearest = 0;
    for (let i = 0; i < transcript.length; i++) {
      if (transcript[i].start <= currentTime) nearest = i;
    }
    return nearest;
  }, [currentTime]);

  const currentLine = transcript[currentIndex];

  useEffect(() => {
    activeLineRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentIndex]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ek_mywords");
      if (saved) setMyWords(JSON.parse(saved));
    } catch {}
  }, []);

  const saveMyWords = (list: string[]) => {
    setMyWords(list);
    try {
      localStorage.setItem("ek_mywords", JSON.stringify(list));
    } catch {}
  };

  const addToMyWords = (word: string) => {
    if (!myWords.includes(word)) {
      saveMyWords([...myWords, word]);
    }
  };

  const removeFromMyWords = (word: string) => {
    saveMyWords(myWords.filter((w) => w !== word));
  };

  const cancelSpeech = () => {
    speechRunIdRef.current += 1;
    setIsSpeaking(false);

    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string, lang: "en-US" | "ko-KR" = "en-US") => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === "en-US" ? 0.82 : 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 80);
  };

  const speakLine = (lineIndex: number, runId: number) => {
    if (typeof window === "undefined") return;

    const line = transcript[lineIndex];
    if (!line) return;

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    setCurrentTime(line.start);

    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      if (runId !== speechRunIdRef.current) return;

      setCurrentTime(line.end);

      const nextIndex = lineIndex + 1;

      if (nextIndex < transcript.length) {
        setTimeout(() => {
          if (runId !== speechRunIdRef.current) return;
          speakLine(nextIndex, runId);
        }, 250);
      } else {
        setIsSpeaking(false);
        setLessonDone(true);
        setCurrentTime(duration);
      }
    };

    utterance.onerror = () => {
      if (runId !== speechRunIdRef.current) return;
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleMainPlay = () => {
    if (isSpeaking) {
      cancelSpeech();
      return;
    }

    if (!currentLine) return;

    const runId = speechRunIdRef.current + 1;
    speechRunIdRef.current = runId;

    setIsSpeaking(true);
    speakLine(currentIndex, runId);
  };

  const handleSeek = (nextTime: number) => {
    cancelSpeech();
    const safe = Math.max(0, Math.min(duration, nextTime));
    setCurrentTime(safe);
  };

  const resetToStart = () => {
    cancelSpeech();
    setCurrentTime(0);
  };

  const handleWordTap = (word: string) => {
    const clean = cleanWord(word);
    if (!clean) return;

    setSelectedWord(clean);
    speakText(clean, "en-US");
  };

  const handleQuizAnswer = (optIdx: number) => {
    const next = [...quizAnswers, optIdx];
    setQuizAnswers(next);

    if (quizIdx + 1 >= toeicQuestions.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(quizIdx + 1);
    }
  };

  const quizScore = quizAnswers.filter(
    (answer, index) => answer === toeicQuestions[index].ans
  ).length;

  const renderWords = (text: string) => {
    const tokens = text.match(/\s+|\S+/g) ?? [];

    return tokens.map((token, index) => {
      if (/^\s+$/.test(token)) return <span key={index}>{token}</span>;

      return (
        <button
          key={index}
          onPointerDown={() => handleWordTap(token)}
          style={{
            display: "inline",
            border: "none",
            background: "transparent",
            borderRadius: "6px",
            padding: "0 2px",
            margin: "0 1px",
            cursor: "pointer",
            font: "inherit",
            letterSpacing: "inherit",
            color: "rgba(255,255,255,0.96)",
            textShadow: "none",
            fontWeight: "inherit",
            lineHeight: "inherit",
          }}
        >
          {token}
        </button>
      );
    });
  };

  return (
    <main
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(160deg,#040a14 0%,#0d1e35 55%,#061410 100%)",
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
            onClick={(event) => event.stopPropagation()}
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
            <div
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginBottom: "6px",
              }}
            >
              단어
            </div>

            <div
              style={{
                fontSize: "38px",
                fontWeight: 900,
                marginBottom: "6px",
              }}
            >
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
              {getMeaning(selectedWord).startsWith("📖")
                ? getMeaning(selectedWord)
                : `🇰🇷 ${getMeaning(selectedWord)}`}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => speakText(selectedWord, "en-US")}
                style={popBtn("#facc15", "#111")}
              >
                🔊 발음 듣기
              </button>

              {getMeaning(selectedWord).startsWith("📖") &&
                !myWords.includes(selectedWord) && (
                  <button
                    onClick={() => addToMyWords(selectedWord)}
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

              <button
                onClick={() => setSelectedWord(null)}
                style={popBtn("rgba(255,255,255,0.12)", "white")}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px" }}>📝 TOEIC 연습</h2>

            <button
              onClick={() => {
                setQuizActive(false);
                setQuizIdx(0);
                setQuizAnswers([]);
                setQuizDone(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#9ca3af",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {!quizDone ? (
            <>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "16px",
                }}
              >
                문제 {quizIdx + 1} / {toeicQuestions.length}
              </div>

              <div
                style={{
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(quizIdx / toeicQuestions.length) * 100}%`,
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
                {toeicQuestions[quizIdx].q}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {toeicQuestions[quizIdx].opts.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
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
                      {String.fromCharCode(65 + index)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
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

                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    marginBottom: "4px",
                  }}
                >
                  {quizScore} / {toeicQuestions.length}
                </div>

                <div style={{ color: "#9ca3af", fontSize: "15px" }}>
                  {quizScore >= 8
                    ? "완벽해! 최고야 👏"
                    : quizScore >= 6
                    ? "잘했어! 조금만 더!"
                    : "다시 도전해보자! 할 수 있어!"}
                </div>
              </div>

              {toeicQuestions.map((q, index) => {
                const correct = quizAnswers[index] === q.ans;

                return (
                  <div
                    key={index}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: correct
                        ? "rgba(34,197,94,0.1)"
                        : "rgba(239,68,68,0.1)",
                      border: `1px solid ${
                        correct
                          ? "rgba(34,197,94,0.3)"
                          : "rgba(239,68,68,0.3)"
                      }`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        color: correct ? "#86efac" : "#fca5a5",
                        marginBottom: "4px",
                        fontWeight: 700,
                      }}
                    >
                      {correct ? "✓ 정답" : "✗ 오답"} — Q{index + 1}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#e5e7eb",
                        marginBottom: "4px",
                      }}
                    >
                      {q.q}
                    </div>

                    {!correct && (
                      <div style={{ fontSize: "12px", color: "#86efac" }}>
                        정답: ({String.fromCharCode(65 + q.ans)}){" "}
                        {q.opts[q.ans]}
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginTop: "4px",
                      }}
                    >
                      {q.exp}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => {
                  setQuizIdx(0);
                  setQuizAnswers([]);
                  setQuizDone(false);
                }}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  border: "none",
                  background: "#facc15",
                  color: "#111",
                  fontWeight: 800,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                다시 풀기
              </button>
            </div>
          )}
        </div>
      )}

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
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "#111c2b",
              borderRadius: "24px 24px 0 0",
              padding: "24px 20px",
              width: "100%",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>
              📝 내 단어장 ({myWords.length})
            </h3>

            {myWords.length === 0 ? (
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  textAlign: "center",
                  padding: "24px",
                }}
              >
                모르는 단어를 탭하면 여기 저장돼요!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {myWords.map((word) => (
                  <div
                    key={word}
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
                      <div style={{ fontWeight: 700, fontSize: "17px" }}>
                        {word}
                      </div>
                      <div style={{ fontSize: "13px", color: "#a7f3d0" }}>
                        {getMeaning(word)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromMyWords(word)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6b7280",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
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

      <header style={{ padding: "16px 18px 8px", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "0.04em",
              }}
            >
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
                background:
                  myWords.length > 0
                    ? "rgba(99,102,241,0.25)"
                    : "rgba(255,255,255,0.08)",
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
              href={YOUTUBE_URL}
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
        <div
          style={{
            fontSize: "12px",
            color: "#60a5fa",
            fontWeight: 700,
            marginBottom: "14px",
          }}
        >
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
          {currentLine ? (
            renderWords(currentLine.text)
          ) : (
            <span style={{ color: "#4b5563" }}>
              ▶ 재생 버튼을 눌러 시작하세요
            </span>
          )}
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

      <div style={{ padding: "0 18px 16px", flexShrink: 0 }}>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.25}
          value={currentTime}
          onChange={(event) => handleSeek(Number(event.target.value))}
          style={{
            width: "100%",
            accentColor: "#facc15",
            marginBottom: "16px",
            cursor: "pointer",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "14px",
          }}
        >
          <button onClick={() => handleSeek(currentTime - 10)} style={navBtn}>
            ◀◀{"\n"}10초
          </button>

          <button
            onClick={toggleMainPlay}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              border: "none",
              background: isSpeaking ? "#ef4444" : "#22c55e",
              color: "white",
              fontSize: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isSpeaking
                ? "0 0 24px rgba(239,68,68,0.55)"
                : "0 0 24px rgba(34,197,94,0.55)",
              flexShrink: 0,
            }}
          >
            {isSpeaking ? "⏹" : "▶"}
          </button>

          <button onClick={() => handleSeek(currentTime + 10)} style={navBtn}>
            10초{"\n"}▶▶
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={resetToStart} style={smBtn}>
            ↺ 처음
          </button>

          <button
            onClick={() => currentLine && speakText(currentLine.text, "en-US")}
            style={smBtn}
          >
            🔊 현재 문장
          </button>

          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" style={linkBtn}>
            ▶ YouTube
          </a>
        </div>

        {(lessonDone || currentTime > duration * 0.8) && (
          <button
            onClick={() => {
              setQuizActive(true);
              setQuizIdx(0);
              setQuizAnswers([]);
              setQuizDone(false);
            }}
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
            📝 TOEIC 문제 풀기 ({toeicQuestions.length}문제)
          </button>
        )}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          maxHeight: "45vh",
          overflowY: "auto",
          background: "rgba(0,0,0,0.3)",
          padding: "10px 14px",
        }}
      >
        {transcript.map((line, index) => {
          const active = index === currentIndex;

          return (
            <div
              key={`${line.start}-${index}`}
              ref={active ? activeLineRef : null}
              onClick={() => handleSeek(line.start)}
              style={{
                padding: "10px 12px",
                borderRadius: "12px",
                marginBottom: "5px",
                cursor: "pointer",
                background: active ? "rgba(250,204,21,0.15)" : "transparent",
                border: `1px solid ${
                  active ? "rgba(250,204,21,0.35)" : "transparent"
                }`,
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: active ? "#fde68a" : "#6b7280",
                  marginBottom: "2px",
                }}
              >
                {formatTime(line.start)}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: active ? "white" : "#d1d5db",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {line.text}
              </div>

              <div style={{ fontSize: "12px", color: "#6ee7b7", marginTop: "2px" }}>
                {line.ko}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const navBtn: CSSProperties = {
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

const smBtn: CSSProperties = {
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

const linkBtn: CSSProperties = {
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
  textDecoration: "none",
};

function popBtn(bg: string, color: string): CSSProperties {
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