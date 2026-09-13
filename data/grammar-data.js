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
  },
  {
    id: 'grammar-lesson-2-speculation',
    order: 2,
    title: 'Speculating about pictures',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-2',
    page: 'grammar-topic.html?id=grammar-lesson-2-speculation',
    passScore: 100,
    overview: {
      lead: 'Use these forms when you look at evidence and make a careful guess. They help you sound confident when the evidence is strong, and cautious when it is not.',
      keyRule: 'Choose the phrase by how certain you are: must for a strong conclusion; may, might or could for a possibility; seem, appear and look for an impression from what you can see.',
      subjects: ['must', 'may / might / could', 'seem / appear', 'look as if', 'could well'],
      example: 'They must be tourists. / It could well be France. / He looks as if he is lost in thought.'
    },
    uses: [
      { icon: 'Must', title: 'Strong conclusion', text: 'Use must + base verb when the evidence makes you feel almost certain.', example: 'The lights are off. They must be asleep.' },
      { icon: 'May', title: 'Possibility', text: 'Use may, might or could + base verb when something is possible but not certain.', example: 'It might be a museum.' },
      { icon: 'Seem', title: 'Visible impression', text: 'Use seem to and appear to when you describe what something suggests.', example: 'She appears to be upset.' },
      { icon: 'Look', title: 'What you can see', text: 'Use look as if / as though + clause, or look like + noun phrase.', example: 'They look as if they are celebrating. / It looks like a university canteen.' }
    ],
    forms: [
      { id: 'affirmative', icon: '+', title: 'Making a guess', formula: 'subject + must / may / might / could + base verb', example: 'He must live nearby. / They could be friends.', translation: 'A conclusion or possibility now.', note: 'After a modal verb, use the base form: must be, might live, could have.' },
      { id: 'negative', icon: '-', title: 'Negative guesses', formula: 'subject + cannot / may not / might not + base verb', example: 'It cannot be cheap. / She might not know the answer.', translation: 'A strong negative conclusion or a negative possibility.', note: 'Do not use must not to mean “I think this is impossible”; must not usually means “it is prohibited”.' },
      { id: 'question', icon: '?', title: 'Questions', formula: 'Do / Does + subject + seem to + verb ...?', example: 'Does he seem to be worried?', translation: 'Ask about an impression.', note: 'We usually make guesses as statements, not questions with must or might.' },
      { id: 'short-answer', icon: '✓', title: 'Seem, appear and look', formula: 'seem / appear + to + verb; look as if + clause; look like + noun', example: 'They seem to be waiting. / He looks as if he is tired. / It looks like rain.', translation: 'Different ways to describe evidence.', note: 'Use a clause after as if, but a noun or noun phrase after like.' }
    ],
    contrast: {
      title: 'How certain is the guess?',
      intro: 'The phrase changes the strength of the speaker’s conclusion.',
      ordinary: { label: 'Strong evidence', verbs: 'be, have, live', affirmative: 'It must be expensive.', negative: 'It cannot be cheap.', question: 'Does it seem expensive?', rule: 'Must and cannot show a strong conclusion from evidence.' },
      be: { label: 'Possible explanation', verbs: 'be, come from, belong to', affirmative: 'It may / might / could be Spain.', negative: 'It may not be Spain.', question: 'Does it look like Spain?', rule: 'May, might and could express possibility. Could well makes a possibility sound fairly likely.' }
    },
    questionBuilder: { title: 'Word order and form', pattern: ['subject', 'modal / seem / look', 'base verb or complement', '...'], example: 'She seems to be upset. / They might be waiting for a bus.', translation: 'A natural word order for a cautious conclusion.', note: 'Do not add to after must, may, might or could: It might be, not It might to be.' },
    memoryRule: { title: 'Quick check', steps: ['Strong evidence? Use must + base verb.', 'Only a possibility? Use may, might or could + base verb.', 'A likely possibility? Use could well + base verb.', 'An impression from appearance? Use seem to / appear to + verb.', 'A full clause after look? Use look as if / as though. A noun phrase? Use look like.'] },
    commonMistakes: [
      { wrong: 'He must to be tired.', right: 'He must be tired.', reason: 'Modal verbs are followed by the base form without to.' },
      { wrong: 'It mustn’t be France.', right: 'It cannot be France.', reason: 'Must not usually means prohibition, not an impossible conclusion.' },
      { wrong: 'They look as if tired.', right: 'They look as if they are tired.', reason: 'As if is followed by a clause with a subject and verb.' },
      { wrong: 'It looks as if a museum.', right: 'It looks like a museum.', reason: 'Use like before a noun phrase.' }
    ],
    quizExercises: [
      {
        title: 'Choose the meaning',
        instructions: 'Choose the correct answer.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'Strong conclusion', prompt: 'The ground is wet. It ___ have rained.', options: ['must', 'must to', 'is must'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Possibility', prompt: 'That building ___ be a gallery, but I am not sure.', options: ['might', 'might to', 'is might'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Appearance', prompt: 'She ___ to be listening carefully.', options: ['seems', 'seem', 'is seem'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Like and as if', prompt: 'It looks ___ a university canteen.', options: ['like', 'as if', 'to'], answer: 0 }
        ]
      },
      {
        title: 'Complete the sentences',
        instructions: 'Write one word in each gap.',
        items: [
          { type: 'gaps', difficulty: 'Medium', skill: 'Strong conclusion', prompt: 'Complete the sentence.', segments: ['They ', ' be waiting for a train; they are standing on the platform.'], answers: ['must'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Possibility', prompt: 'Complete the sentence.', segments: ['It could ', ' be Italy; the landscape is very similar.'], answers: ['well'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Appearance', prompt: 'Complete the sentence.', segments: ['He appears ', ' be lost in thought.'], answers: ['to'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'As if', prompt: 'Complete the sentence.', segments: ['They look as ', ' they are enjoying themselves.'], answers: ['if'] }
        ]
      },
      {
        title: 'Choose and transform',
        instructions: 'Choose the correct form or write the complete answer.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Impossible conclusion', prompt: 'Choose the best completion: The museum is closed, so it ___ be open to visitors.', options: ['cannot', 'must not', 'does not must'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Look like', prompt: 'Choose the best completion: From the uniforms, they ___ school students.', options: ['look like', 'look as if', 'appear'], answer: 0 },
          { type: 'text', difficulty: 'Challenge', skill: 'Strong conclusion', prompt: 'Complete: She / must / be / very pleased with herself.', answer: 'She must be very pleased with herself.', acceptedAnswers: ['She must be very pleased with herself', 'She must be very pleased with herself.'] },
          { type: 'text', difficulty: 'Challenge', skill: 'Appearance', prompt: 'Complete: I / get / impression / that / he / be / worried.', answer: 'I get the impression that he is worried.', acceptedAnswers: ['I get the impression that he is worried', 'I get the impression that he is worried.'] }
        ]
      },
      {
        title: 'Build complete sentences',
        instructions: 'Write a complete sentence. Use the word or phrase in brackets.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Could well', prompt: 'it / could well / be / his hometown', tokens: ['It', 'could well', 'be', 'his hometown'], answer: 'It could well be his hometown.', acceptedAnswers: ['It could well be his hometown', 'It could well be his hometown.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Look as if', prompt: 'they / look as if / they / have just got married', tokens: ['They', 'look as if', 'they', 'have just got married'], answer: 'They look as if they have just got married.', acceptedAnswers: ['They look as if they have just got married', 'They look as if they have just got married.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Seem to', prompt: 'everyone / seems to / be / queuing for something', tokens: ['Everyone', 'seems to', 'be', 'queuing for something'], answer: 'Everyone seems to be queuing for something.', acceptedAnswers: ['Everyone seems to be queuing for something', 'Everyone seems to be queuing for something.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Cannot', prompt: 'this / cannot / be / the right address', tokens: ['This', 'cannot', 'be', 'the right address'], answer: 'This cannot be the right address.', acceptedAnswers: ['This cannot be the right address', 'This cannot be the right address.'] }
        ]
      }
    ]
  }
];
