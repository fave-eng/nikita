(() => {
  const topics = Array.isArray(window.VOCABULARY_DATA) ? window.VOCABULARY_DATA : [];
  if (topics.some((topic) => topic.id === 'vocab-lesson-8-compound-adjectives')) return;

  topics.push({
    id: 'vocab-lesson-8-compound-adjectives',
    title: 'Compound adjectives: personality',
    label: 'Homework 8 · 14 compound adjectives',
    icon: '🧩',
    type: 'lesson',
    linkedLessonId: 'lesson-8',
    page: 'vocabulary.html?id=vocab-lesson-8-compound-adjectives',
    description: 'Useful B2.1 compound adjectives for describing personality and behaviour.',
    groups: [
      { id: 'personality', title: 'Personality', subtitle: 'Compound adjectives for people', icon: '👤' }
    ],
    words: [
      { id: "l9-01", uniqueKey: "absent-minded", en: "absent-minded", ru: "рассеянный", transcription: "/ˌæbsəntˈmaɪndɪd/", exampleEn: "I’m quite absent-minded, so I write everything down.", group: 'personality' },
      { id: "l9-02", uniqueKey: "bad-tempered", en: "bad-tempered", ru: "вспыльчивый; раздражительный", transcription: "/ˌbæd ˈtempəd/", exampleEn: "He can be bad-tempered first thing in the morning.", group: 'personality' },
      { id: "l9-03", uniqueKey: "big-headed", en: "big-headed", ru: "самодовольный; высокого мнения о себе", transcription: "/ˌbɪɡ ˈhedɪd/", exampleEn: "He sounded big-headed when he talked about his success.", group: 'personality' },
      { id: "l9-04", uniqueKey: "easy-going", en: "easy-going", ru: "спокойный; лёгкий в общении", transcription: "/ˌiːzi ˈɡəʊɪŋ/", exampleEn: "My parents are quite easy-going.", group: 'personality' },
      { id: "l9-05", uniqueKey: "good-tempered", en: "good-tempered", ru: "добродушный; невспыльчивый", transcription: "/ˌɡʊd ˈtempəd/", exampleEn: "Our teacher is extremely good-tempered.", group: 'personality' },
      { id: "l9-06", uniqueKey: "laid-back", en: "laid-back", ru: "расслабленный; невозмутимый", transcription: "/ˌleɪd ˈbæk/", exampleEn: "She’s very laid-back and rarely worries.", group: 'personality' },
      { id: "l9-07", uniqueKey: "narrow-minded", en: "narrow-minded", ru: "узколобый; нетерпимый к другим взглядам", transcription: "/ˌnærəʊ ˈmaɪndɪd/", exampleEn: "A narrow-minded person refuses to consider other views.", group: 'personality' },
      { id: "l9-08", uniqueKey: "open-minded", en: "open-minded", ru: "непредвзятый; открытый новым идеям", transcription: "/ˌəʊpən ˈmaɪndɪd/", exampleEn: "Travelling made him more open-minded.", group: 'personality' },
      { id: "l9-09", uniqueKey: "self-centred", en: "self-centred", ru: "эгоцентричный; думающий только о себе", transcription: "/ˌself ˈsentəd/", exampleEn: "He can be rather self-centred.", group: 'personality' },
      { id: "l9-10", uniqueKey: "strong-willed", en: "strong-willed", ru: "волевой; решительный", transcription: "/ˌstrɒŋ ˈwɪld/", exampleEn: "She is strong-willed and rarely changes her mind.", group: 'personality' },
      { id: "l9-11", uniqueKey: "tight-fisted", en: "tight-fisted", ru: "скупой; жадный", transcription: "/ˌtaɪt ˈfɪstɪd/", exampleEn: "He is too tight-fisted to pay for everyone.", group: 'personality' },
      { id: "l9-12", uniqueKey: "two-faced", en: "two-faced", ru: "двуличный", transcription: "/ˌtuː ˈfeɪst/", exampleEn: "I stopped trusting him because he was two-faced.", group: 'personality' },
      { id: "l9-13", uniqueKey: "well-balanced", en: "well-balanced", ru: "уравновешенный", transcription: "/ˌwel ˈbælənst/", exampleEn: "She seems sensible and well-balanced.", group: 'personality' },
      { id: "l9-14", uniqueKey: "well-behaved", en: "well-behaved", ru: "воспитанный; хорошо себя ведущий", transcription: "/ˌwel bɪˈheɪvd/", exampleEn: "Their children are always well-behaved.", group: 'personality' }
    ]
  });

  window.VOCABULARY_DATA = topics;
})();
