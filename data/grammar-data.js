/** Grammar path for Nikita. */
window.GRAMMAR_DATA = [
  {
    id: 'grammar-lesson-1-habits',
    order: 1,
    title: 'Habits: present and past',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-1',
    page: 'grammar-topic.html?id=grammar-lesson-1-habits',
    passScore: 100,
    overview: {
      lead: 'Use these forms to describe what is typical now, what was typical in the past, and how often something happens.',
      keyRule: 'Choose the form by asking one question first: is this a present habit, a past habit, or one completed past event?',
      subjects: ['present simple', 'tend to', 'used to', 'would', 'frequency expressions'],
      example: 'I tend to read before bed. We used to go to the cinema every week.'
    },
    uses: [
      { icon: 'Now', title: 'Present habits', text: 'Use the present simple for regular actions and typical behaviour.', example: 'I rarely watch live TV.' },
      { icon: 'Tend', title: 'Typical tendencies', text: 'Use tend to when something is generally true, but not necessarily every time.', example: 'She tends to avoid crowded places.' },
      { icon: 'Past', title: 'Past habits', text: 'Use used to for states or repeated actions that are no longer true.', example: 'I used to collect vinyl records.' },
      { icon: 'Would', title: 'Repeated past actions', text: 'Use would for repeated past actions, not for past states.', example: 'On Sundays, we would walk by the river.' }
    ],
    forms: [
      { id: 'affirmative', icon: '+', title: 'Present habit', formula: 'subject + present simple / tend to + verb', example: 'He goes out all the time. / He tends to stay in.', translation: 'A typical present action or tendency.', note: 'Tend to is followed by the base form: tend to go, not tend to goes.' },
      { id: 'negative', icon: '-', title: 'Negative habit', formula: 'subject + do not / does not + verb; subject + do not tend to + verb', example: 'I do not tend to read much fiction.', translation: 'A habit that is not typical.', note: 'After do, does, do not and does not, use the base form.' },
      { id: 'question', icon: '?', title: 'Questions about habits', formula: 'Do / Does + subject + verb ...? Did + subject + use to + verb ...?', example: 'Do you go to concerts much? Did you use to play tennis?', translation: 'Questions about regular actions now or in the past.', note: 'After did, use to stays in the base form.' },
      { id: 'short-answer', icon: '✓', title: 'Past habits', formula: 'subject + used to + verb / subject + would + verb', example: 'We used to live near the theatre. We would go there on Fridays.', translation: 'Repeated past action or past state.', note: 'Use would only for repeated actions. Use used to for states such as live, know and like.' }
    ],
    contrast: {
      title: 'Used to, would and past simple',
      intro: 'All three can refer to the past, but they do different jobs.',
      ordinary: { label: 'Past habit', verbs: 'live, go, play, visit', affirmative: 'I used to live there. / We would visit every summer.', negative: 'I did not use to live there.', question: 'Did you use to live there?', rule: 'Use used to for a past state or repeated action. Would is for repeated actions only.' },
      be: { label: 'One finished event', verbs: 'go, see, meet, buy', affirmative: 'I went to a concert yesterday.', negative: 'I did not go yesterday.', question: 'Did you go yesterday?', rule: 'Use the past simple for one completed event at a particular time.' }
    },
    questionBuilder: { title: 'Frequency and word order', pattern: ['subject', 'frequency expression', 'main verb', '...'], example: 'I hardly ever go out on weekdays.', translation: 'A present habit with a frequency expression.', note: 'Put usually, often, rarely and hardly ever before the main verb, but after be: She is usually busy.' },
    memoryRule: { title: 'Quick check', steps: ['Present routine? Use the present simple, often with rarely, usually or hardly ever.', 'General tendency? Use tend to + base verb.', 'Past state or repeated action which is no longer true? Use used to + base verb.', 'Repeated past action only? You can use would + base verb.', 'One finished event? Use the past simple.'] },
    commonMistakes: [
      { wrong: 'I tend go to concerts.', right: 'I tend to go to concerts.', reason: 'Tend is followed by to + the base form.' },
      { wrong: 'Did you used to go there?', right: 'Did you use to go there?', reason: 'Did already carries the past meaning.' },
      { wrong: 'We would live near the cinema.', right: 'We used to live near the cinema.', reason: 'Would is not used for past states such as live.' },
      { wrong: 'She does not tends to go out.', right: 'She does not tend to go out.', reason: 'After does not, use the base form.' }
    ],
    quizExercises: [
      {
        title: 'Choose the form',
        instructions: 'Choose the correct answer.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'Present habits', prompt: 'I ___ go to the cinema on weekdays.', options: ['rarely', 'used to', 'would'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Tend to', prompt: 'She tends ___ documentaries rather than reality TV.', options: ['watch', 'to watch', 'watching'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Past habits', prompt: 'We ___ spend every summer at the coast.', options: ['used to', 'use to', 'are used to'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Past event', prompt: 'I ___ a film at the cinema last night.', options: ['see', 'saw', 'used to see'], answer: 1 }
        ]
      },
      {
        title: 'Complete the sentences',
        instructions: 'Write one word in each gap.',
        items: [
          { type: 'gaps', difficulty: 'Medium', skill: 'Tend to', prompt: 'Complete the sentence.', segments: ['I tend ', ' listen to podcasts on my way to work.'], answers: ['to'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Past questions', prompt: 'Complete the question.', segments: ['Did you ', ' to collect anything as a child?'], answers: ['use'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Frequency', prompt: 'Complete the sentence.', segments: ['We ', ' ever eat out during the week.'], answers: ['hardly'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Past actions', prompt: 'Complete the sentence.', segments: ['Every Friday, my parents ', ' take us to the theatre.'], answers: ['would'] }
        ]
      },
      {
        title: 'Choose and transform',
        instructions: 'Choose the correct form or write the complete answer.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Past state', prompt: 'Choose the best completion: When I was younger, I ___ afraid of horror films.', options: ['would be', 'used to be', 'tend to be'], answer: 1 },
          { type: 'select', difficulty: 'Challenge', skill: 'Present tendency', prompt: 'Choose the best completion: He ___ prefer a book to a film adaptation.', options: ['tends to', 'used to', 'would'], answer: 0 },
          { type: 'text', difficulty: 'Challenge', skill: 'Negative past habit', prompt: 'Complete: I / not / use to / enjoy / classical music.', answer: 'I did not use to enjoy classical music.', acceptedAnswers: ['I did not use to enjoy classical music', "I didn't use to enjoy classical music"] },
          { type: 'text', difficulty: 'Challenge', skill: 'Past simple', prompt: 'Complete: We / not / go / out / yesterday.', answer: 'We did not go out yesterday.', acceptedAnswers: ['We did not go out yesterday', "We didn't go out yesterday"] }
        ]
      },
      {
        title: 'Build complete sentences',
        instructions: 'Write a complete sentence. Use the word or phrase in brackets.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Present habit', prompt: 'my brother / hardly ever / watch / live sport', tokens: ['my brother', 'hardly ever', 'watch', 'live sport'], answer: 'My brother hardly ever watches live sport.', acceptedAnswers: ['My brother hardly ever watches live sport', 'My brother hardly ever watches live sport.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Tendency', prompt: 'I / tend to / stay in / on Sunday evenings', tokens: ['I', 'tend to', 'stay in', 'on Sunday evenings'], answer: 'I tend to stay in on Sunday evenings.', acceptedAnswers: ['I tend to stay in on Sunday evenings', 'I tend to stay in on Sunday evenings.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Used to question', prompt: 'you / use to / go / to concerts / much?', tokens: ['you', 'use to', 'go', 'to concerts', 'much'], answer: 'Did you use to go to concerts much?', acceptedAnswers: ['Did you use to go to concerts much', 'Did you use to go to concerts much?'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Would', prompt: 'when we were children / we / would / play / outside / until dark', tokens: ['When we were children', 'we', 'would', 'play', 'outside', 'until dark'], answer: 'When we were children, we would play outside until dark.', acceptedAnswers: ['When we were children, we would play outside until dark', 'When we were children, we would play outside until dark.'] }
        ]
      }
    ]
  }
];
