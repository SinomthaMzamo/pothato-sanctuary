import React, { useState, useEffect } from "react";
import {
  Heart,
  Book,
  Compass,
  Home,
  Settings,
  PenTool,
  // Sun,
  // Moon,
  // Cloud,
  Sparkles,
} from "lucide-react";

// Types
interface UserData {
  name: string;
  researchFocus: string;
  favoriteVerse: string;
  joinedDate: string;
  lastMood?: string;
  journalEntries: JournalEntry[];
  savedAffirmations: string[];
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

// Affirmations and content
const affirmations = {
  emotional: [
    "Your compassion for these creatures shows the depth of your humanity.",
    "Feeling conflicted means you're treating this work with the gravity it deserves.",
    "Every careful protocol you follow honors the sacrifice being made.",
    "Your gentle hands and troubled heart make you exactly the right person for this work.",
    "It's okay to grieve. It's okay to feel. This makes you a better scientist, not worse.",
  ],
  faith: [
    "God has entrusted you with seeking knowledge to heal His children.",
    "Your work participates in the divine call to be healers and restorers.",
    "Even Jesus spoke of a sparrow falling - God sees and knows each sacrifice.",
    "You are stewarding creation toward healing - this is holy work.",
    "Your prayers over this work matter. God hears each one.",
  ],
  purpose: [
    "Today's difficult experiment could unlock tomorrow's cure.",
    "You're standing on the shoulders of countless researchers who faced this same struggle.",
    "Every protocol you follow represents decades of ethical refinement.",
    "Your research could ease the suffering of millions.",
    "This temporary discomfort serves an eternal purpose of healing.",
  ],
};

const verses = [
  {
    text: "Whatever you do, work at it with all your heart, as working for the Lord",
    ref: "Colossians 3:23",
  },
  {
    text: "A righteous person cares for the needs of their animal",
    ref: "Proverbs 12:10",
  },
  { text: "The earth is the Lord's, and everything in it", ref: "Psalm 24:1" },
  {
    text: "For every animal of the forest is mine, and the cattle on a thousand hills",
    ref: "Psalm 50:10-11",
  },
  {
    text: "Look at the birds of the air... your heavenly Father feeds them",
    ref: "Matthew 6:26",
  },
];

const breathingExercises = [
  { name: "4-7-8 Calming", inhale: 4, hold: 7, exhale: 8 },
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4 },
  { name: "Gentle Wave", inhale: 3, hold: 2, exhale: 5 },
];

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<string>("home");
  const [currentMood, setCurrentMood] = useState<string>("");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load user data on mount
  useEffect(() => {
    const stored = localStorage.getItem("sanctuaryUserData");
    if (stored) {
      setUserData(JSON.parse(stored));
    } else {
      setShowOnboarding(true);
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("sanctuaryUserData", JSON.stringify(userData));
    }
  }, [userData]);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = userData?.name || "Friend";

    if (hour < 12) return `Good morning, ${name}`;
    if (hour < 17) return `Good afternoon, ${name}`;
    if (hour < 21) return `Good evening, ${name}`;
    return `Working late, ${name}?`;
  };

  // Onboarding Component
  const Onboarding = () => {
    const [formData, setFormData] = useState({
      name: "",
      researchFocus: "",
      favoriteVerse: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newUserData: UserData = {
        ...formData,
        joinedDate: new Date().toISOString(),
        journalEntries: [],
        savedAffirmations: [],
      };
      setUserData(newUserData);
      setShowOnboarding(false);
      setCurrentView("home");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Welcome to Your Sanctuary
            </h1>
            <p className="text-gray-600 mb-8">
              A peaceful space for reflection and support in your important work
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What should I call you?
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your research focus?
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  value={formData.researchFocus}
                  onChange={(e) =>
                    setFormData({ ...formData, researchFocus: e.target.value })
                  }
                  placeholder="e.g., Genetic markers in disease models"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  A verse or quote that strengthens you (optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  rows={3}
                  value={formData.favoriteVerse}
                  onChange={(e) =>
                    setFormData({ ...formData, favoriteVerse: e.target.value })
                  }
                  placeholder="Share a verse, quote, or phrase that gives you strength"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 rounded-lg font-medium hover:from-green-500 hover:to-blue-500 transition-all"
              >
                Enter Your Sanctuary
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Home Dashboard
  const HomeDashboard = () => {
    const moodEmojis = [
      { emoji: "😔", label: "Heavy", value: "heavy" },
      { emoji: "😟", label: "Anxious", value: "anxious" },
      { emoji: "😐", label: "Neutral", value: "neutral" },
      { emoji: "😌", label: "Peaceful", value: "peaceful" },
      { emoji: "💪", label: "Determined", value: "determined" },
    ];

    const handleMoodSelect = (mood: string) => {
      setCurrentMood(mood);
      setUserData((prev) => (prev ? { ...prev, lastMood: mood } : null));

      // Suggest appropriate content based on mood
      if (mood === "heavy" || mood === "anxious") {
        setCurrentView("heart");
      } else if (mood === "determined") {
        setCurrentView("purpose");
      }
    };

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            {getGreeting()} 🌿
          </h2>

          <p className="text-gray-600 mb-6">How are you feeling right now?</p>

          <div className="flex justify-around mb-6">
            {moodEmojis.map((item) => (
              <button
                key={item.value}
                onClick={() => handleMoodSelect(item.value)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  currentMood === item.value
                    ? "bg-green-100 scale-110"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="text-2xl mb-1">{item.emoji}</span>
                <span className="text-xs text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>

          {currentMood && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 italic">
                {currentMood === "heavy" &&
                  "It's okay to feel the weight of this work. Your sensitivity is a gift."}
                {currentMood === "anxious" &&
                  "Take a deep breath. You're doing important, difficult work with integrity."}
                {currentMood === "neutral" &&
                  "Sometimes steady is exactly where we need to be."}
                {currentMood === "peaceful" &&
                  "Wonderful! Carry this peace into your work today."}
                {currentMood === "determined" &&
                  "Your resolve honors both science and compassion."}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentView("quick-support")}
            className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-all"
          >
            <Sparkles className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium text-gray-800">Quick Support</h3>
            <p className="text-xs text-gray-600">Immediate help</p>
          </button>

          <button
            onClick={() => setCurrentView("journal")}
            className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-all"
          >
            <PenTool className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-800">Journal</h3>
            <p className="text-xs text-gray-600">Reflect & process</p>
          </button>
        </div>

        {/* Three Pillars */}
        <div className="space-y-4">
          <button
            onClick={() => setCurrentView("heart")}
            className="w-full bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4 text-left hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <Heart className="w-6 h-6 text-red-400 mb-2 inline-block mr-2" />
                <h3 className="inline font-medium text-gray-800">
                  Heart Space
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Emotional support & validation
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("faith")}
            className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 text-left hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <Book className="w-6 h-6 text-purple-400 mb-2 inline-block mr-2" />
                <h3 className="inline font-medium text-gray-800">
                  Faith & Purpose
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Spiritual wisdom & perspective
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("compass")}
            className="w-full bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 text-left hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <Compass className="w-6 h-6 text-green-400 mb-2 inline-block mr-2" />
                <h3 className="inline font-medium text-gray-800">
                  Ethical Compass
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Framework & purpose reminders
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  };

  // Heart Space Component
  const HeartSpace = () => {
    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    // const [selectedExercise, setSelectedExercise] = useState<
    //   (typeof breathingExercises)[0] | null
    // >(null);

    const startBreathing = (exercise: (typeof breathingExercises)[0]) => {
      // setSelectedExercise(exercise);
      setIsBreathing(true);

      // Breathing cycle
      const cycle = async () => {
        // Inhale
        setBreathPhase("Breathe in...");
        await new Promise((resolve) =>
          setTimeout(resolve, exercise.inhale * 1000)
        );

        // Hold
        setBreathPhase("Hold...");
        await new Promise((resolve) =>
          setTimeout(resolve, exercise.hold * 1000)
        );

        // Exhale
        setBreathPhase("Breathe out...");
        await new Promise((resolve) =>
          setTimeout(resolve, exercise.exhale * 1000)
        );

        setBreathPhase("");
        setIsBreathing(false);
      };

      cycle();
    };

    const saveAffirmation = (affirmation: string) => {
      if (userData && !userData.savedAffirmations.includes(affirmation)) {
        setUserData({
          ...userData,
          savedAffirmations: [...userData.savedAffirmations, affirmation],
        });
      }
    };

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">Heart Space</h2>
          </div>

          {/* Current Affirmation */}
          <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {affirmations.emotional[currentAffirmation]}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  saveAffirmation(affirmations.emotional[currentAffirmation])
                }
                className="text-sm text-red-400 hover:text-red-500"
              >
                💝 Save this
              </button>
              <button
                onClick={() =>
                  setCurrentAffirmation(
                    (prev) => (prev + 1) % affirmations.emotional.length
                  )
                }
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Breathing Exercises */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Breathing Exercises
            </h3>

            {isBreathing && breathPhase ? (
              <div className="bg-blue-50 rounded-xl p-8 text-center">
                <div className="text-3xl font-light text-blue-600 mb-4 animate-pulse">
                  {breathPhase}
                </div>
                <button
                  onClick={() => {
                    setIsBreathing(false);
                    setBreathPhase("");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Stop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {breathingExercises.map((exercise, idx) => (
                  <button
                    key={idx}
                    onClick={() => startBreathing(exercise)}
                    className="bg-gray-50 rounded-lg p-3 text-left hover:bg-gray-100 transition-all"
                  >
                    <h4 className="font-medium text-gray-800">
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {exercise.inhale}s in • {exercise.hold}s hold •{" "}
                      {exercise.exhale}s out
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gratitude Prompt */}
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2">
              Today's Gratitude
            </h4>
            <p className="text-sm text-gray-600">
              "I'm grateful that my research on{" "}
              {userData?.researchFocus || "genetic science"} could one day..."
            </p>
            <textarea
              className="w-full mt-2 p-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              rows={2}
              placeholder="Complete this thought..."
            />
          </div>
        </div>
      </div>
    );
  };

  // Faith & Purpose Component
  const FaithPurpose = () => {
    const [currentVerse, setCurrentVerse] = useState(0);
    const [showPrayer, setShowPrayer] = useState(false);

    const prayers = [
      "Lord, guide my hands to be instruments of knowledge and healing. Help me honor the sacrifice of these creatures by conducting my work with excellence and purpose. Amen.",
      "God, I struggle with the weight of this work. Grant me wisdom to see Your purpose in it, compassion to honor all life, and strength to continue when it's hard. Amen.",
      "Father, thank You for the opportunity to seek understanding of Your creation. Help me be a faithful steward of this knowledge and these lives entrusted to my care. Amen.",
    ];

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Book className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">
              Faith & Purpose
            </h2>
          </div>

          {/* Daily Verse */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-2 italic">
              "{verses[currentVerse].text}"
            </p>
            <p className="text-sm text-purple-600 mb-4">
              - {verses[currentVerse].ref}
            </p>
            <button
              onClick={() =>
                setCurrentVerse((prev) => (prev + 1) % verses.length)
              }
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Another verse →
            </button>
          </div>

          {/* Purpose Affirmations */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Remember Your Purpose
            </h3>
            <div className="space-y-3">
              {affirmations.faith.slice(0, 3).map((affirmation, idx) => (
                <div key={idx} className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{affirmation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prayer Section */}
          <div className="bg-indigo-50 rounded-xl p-4">
            <button
              onClick={() => setShowPrayer(!showPrayer)}
              className="w-full text-left"
            >
              <h4 className="font-medium text-gray-800 mb-2">
                {showPrayer ? "A Prayer for Your Work" : "Need a prayer? 🙏"}
              </h4>
            </button>

            {showPrayer && (
              <div className="mt-3">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {prayers[Math.floor(Math.random() * prayers.length)]}
                </p>
              </div>
            )}
          </div>

          {/* Scientists of Faith */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2">
              You're in Good Company
            </h4>
            <p className="text-sm text-gray-600">
              Francis Collins, director of NIH and Human Genome Project leader,
              wrote: "Science is not threatened by God; it is enhanced. God is
              not threatened by science; He made it all possible."
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Ethical Compass Component
  const EthicalCompass = () => {
    const ethicalPrinciples = [
      {
        title: "The 3Rs Framework",
        points: [
          "Replacement: Using alternatives when possible",
          "Reduction: Minimizing animal use",
          "Refinement: Minimizing suffering",
        ],
      },
      {
        title: "Your Impact",
        points: [
          "Your research could help develop treatments for genetic diseases",
          "Each experiment builds on decades of ethical refinement",
          "You follow strict protocols designed by ethicists and scientists together",
        ],
      },
      {
        title: "Historical Perspective",
        points: [
          "Insulin for diabetes came from this type of research",
          "Most cancer treatments were developed this way",
          "COVID vaccines built on decades of animal model research",
        ],
      },
    ];

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <Compass className="w-8 h-8 text-green-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">
              Ethical Compass
            </h2>
          </div>

          {/* Purpose Reminder */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">
              Why This Work Matters
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your research on {userData?.researchFocus || "genetic markers"} is
              part of humanity's effort to understand and heal. Every careful
              experiment, every protocol followed, every moment of discomfort
              you feel - these all honor the gravity and importance of this
              work.
            </p>
          </div>

          {/* Ethical Frameworks */}
          <div className="space-y-4 mb-6">
            {ethicalPrinciples.map((principle, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  {principle.title}
                </h4>
                <ul className="space-y-1">
                  {principle.points.map((point, pidx) => (
                    <li
                      key={pidx}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <span className="text-green-400 mr-2">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Daily Reflection */}
          <div className="bg-teal-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-2">Remember Today</h4>
            <p className="text-sm text-gray-700 italic">
              "The mouse in the lab and the child in the hospital bed are both
              part of creation's interconnected web. Your careful, compassionate
              work honors both."
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Journal Component
  const Journal = () => {
    const [newEntry, setNewEntry] = useState("");
    const [selectedMood, setSelectedMood] = useState("neutral");

    const addEntry = () => {
      if (newEntry.trim() && userData) {
        const entry: JournalEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          content: newEntry,
          mood: selectedMood,
        };

        setUserData({
          ...userData,
          journalEntries: [entry, ...userData.journalEntries],
        });
        setNewEntry("");
      }
    };

    const moodColors: Record<string, string> = {
      heavy: "bg-gray-100",
      anxious: "bg-yellow-50",
      neutral: "bg-blue-50",
      peaceful: "bg-green-50",
      determined: "bg-purple-50",
    };

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <PenTool className="w-8 h-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">Journal</h2>
          </div>

          {/* New Entry */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">
              Today's Reflection
            </h3>

            <div className="flex gap-2 mb-3">
              {["heavy", "anxious", "neutral", "peaceful", "determined"].map(
                (mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedMood === mood
                        ? "bg-blue-400 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {mood}
                  </button>
                )
              )}
            </div>

            <textarea
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={4}
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="What's on your heart today? This is just for you..."
            />

            <button
              onClick={addEntry}
              className="mt-3 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
              Save Entry
            </button>
          </div>

          {/* Past Entries */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Your Journey</h3>
            {userData?.journalEntries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className={`${moodColors[entry.mood]} rounded-lg p-3`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-500">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                    {entry.mood}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{entry.content}</p>
              </div>
            ))}

            {(!userData?.journalEntries ||
              userData.journalEntries.length === 0) && (
              <p className="text-sm text-gray-500 italic">
                Your journal entries will appear here. They're private and never
                leave your device.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Quick Support Component
  const QuickSupport = () => {
    const [selectedSupport, setSelectedSupport] = useState<string>("");

    const supportOptions = [
      {
        id: "before",
        icon: "🙏",
        title: "Before an Experiment",
        content:
          "Take a moment to center yourself. This work requires both scientific rigor and compassionate awareness. You bring both. Remember: every protocol you follow, every gentle handling, every moment of care - these honor the contribution being made. You are the right person to do this work with integrity.",
      },
      {
        id: "guilt",
        icon: "💔",
        title: "Feeling Guilty",
        content:
          "This feeling shows your humanity. It's not a weakness - it's proof that you're approaching this work with the gravity it deserves. You're not becoming callous or indifferent. Your guilt can coexist with the knowledge that this work serves a greater purpose. Both things can be true: this is hard AND this is important.",
      },
      {
        id: "overwhelmed",
        icon: "😰",
        title: "Feeling Overwhelmed",
        content:
          "Stop. Breathe. You don't have to carry the weight of all medical progress on your shoulders. You just have to do today's work with integrity. That's enough. You're part of a long chain of researchers, each doing their part. Rest in that shared responsibility.",
      },
      {
        id: "after",
        icon: "🕊️",
        title: "After a Difficult Day",
        content:
          "Today was hard, and you did it anyway. That took courage. Now it's time to release what you've carried. The work is done for today. You showed up with compassion and competence. Let yourself rest. Tomorrow will have its own challenges, but so will you have renewed strength to meet them.",
      },
    ];

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">Quick Support</h2>
          </div>

          <p className="text-gray-600 mb-6">What do you need right now?</p>

          <div className="space-y-3">
            {supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  setSelectedSupport(
                    selectedSupport === option.id ? "" : option.id
                  )
                }
                className="w-full text-left"
              >
                <div
                  className={`${
                    selectedSupport === option.id
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 shadow-md"
                      : "bg-gray-50 hover:bg-gray-100"
                  } rounded-xl p-4 transition-all`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{option.icon}</span>
                    <h3 className="font-medium text-gray-800">
                      {option.title}
                    </h3>
                  </div>

                  {selectedSupport === option.id && (
                    <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                      {option.content}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings Component
  const SettingsView = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      name: userData?.name || "",
      researchFocus: userData?.researchFocus || "",
      favoriteVerse: userData?.favoriteVerse || "",
    });

    const handleSave = () => {
      if (userData) {
        setUserData({
          ...userData,
          ...formData,
        });
        setEditMode(false);
      }
    };

    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Settings className="w-8 h-8 text-gray-400 mr-3" />
            <h2 className="text-2xl font-light text-gray-800">Settings</h2>
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Focus
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  value={formData.researchFocus}
                  onChange={(e) =>
                    setFormData({ ...formData, researchFocus: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favorite Verse/Quote
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  rows={3}
                  value={formData.favoriteVerse}
                  onChange={(e) =>
                    setFormData({ ...formData, favoriteVerse: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-400 text-white py-2 rounded-lg hover:bg-green-500"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{userData?.name}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Research Focus</p>
                <p className="font-medium">{userData?.researchFocus}</p>
              </div>

              {userData?.favoriteVerse && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Favorite Verse/Quote</p>
                  <p className="font-medium italic">{userData.favoriteVerse}</p>
                </div>
              )}

              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              >
                Edit Profile
              </button>

              {userData?.savedAffirmations &&
                userData.savedAffirmations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 mb-3">
                      Saved Affirmations
                    </h3>
                    <div className="space-y-2">
                      {userData.savedAffirmations.map((affirmation, idx) => (
                        <div key={idx} className="bg-purple-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">{affirmation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Joined{" "}
                  {userData
                    ? new Date(userData.joinedDate).toLocaleDateString()
                    : ""}
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  All data is stored locally on your device. Nothing is ever
                  sent to any server.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setCurrentView("home")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === "home" ? "text-green-500" : "text-gray-500"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setCurrentView("heart")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === "heart" ? "text-red-500" : "text-gray-500"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs mt-1">Heart</span>
            </button>

            <button
              onClick={() => setCurrentView("faith")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === "faith" ? "text-purple-500" : "text-gray-500"
              }`}
            >
              <Book className="w-5 h-5" />
              <span className="text-xs mt-1">Faith</span>
            </button>

            <button
              onClick={() => setCurrentView("compass")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === "compass" ? "text-green-500" : "text-gray-500"
              }`}
            >
              <Compass className="w-5 h-5" />
              <span className="text-xs mt-1">Ethics</span>
            </button>

            <button
              onClick={() => setCurrentView("settings")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                currentView === "settings" ? "text-gray-700" : "text-gray-500"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-light text-gray-800">
            Your Sanctuary 🌿
          </h1>
          <div className="flex gap-2">
            {currentView !== "quick-support" && (
              <button
                onClick={() => setCurrentView("quick-support")}
                className="p-2 bg-yellow-50 rounded-lg"
              >
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </button>
            )}
            {currentView !== "journal" && (
              <button
                onClick={() => setCurrentView("journal")}
                className="p-2 bg-blue-50 rounded-lg"
              >
                <PenTool className="w-5 h-5 text-blue-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        {currentView === "home" && <HomeDashboard />}
        {currentView === "heart" && <HeartSpace />}
        {currentView === "faith" && <FaithPurpose />}
        {currentView === "compass" && <EthicalCompass />}
        {currentView === "journal" && <Journal />}
        {currentView === "quick-support" && <QuickSupport />}
        {currentView === "settings" && <SettingsView />}
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default App;
