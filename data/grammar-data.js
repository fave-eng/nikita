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
  },
  {
    id: 'grammar-lesson-4-adjectives-adverbs',
    order: 3,
    title: 'Adjectives and adverbs',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-4',
    page: 'grammar-topic.html?id=grammar-lesson-4-adjectives-adverbs',
    passScore: 100,
    overview: {
      lead: 'Adjectives describe people, things and situations. Adverbs usually describe actions, adjectives or other adverbs. The key is to identify what the word is describing.',
      keyRule: 'Use an adjective after linking verbs such as be, look, seem, feel and sound. Use an adverb to describe how an action happens, and use adverbs such as really, absolutely and terribly to modify adjectives.',
      subjects: ['adjective', 'adverb', 'linking verb + adjective', 'adverb + adjective', '-ly forms'],
      example: 'She looks tired. / She spoke quietly. / It was absolutely amazing.'
    },
    uses: [
      { icon: 'Adj', title: 'Describe a noun or state', text: 'Use an adjective to describe a person, thing or situation.', example: 'It was a dreadful film.' },
      { icon: 'Look', title: 'After linking verbs', text: 'Use an adjective after be, look, seem, feel, sound, smell and taste because the adjective describes the subject.', example: 'She looks sad. / The music sounds great.' },
      { icon: 'Adv', title: 'Describe an action', text: 'Use an adverb to describe how, when or how often an action happens.', example: 'Check your work carefully. / We hardly ever go out.' },
      { icon: 'Int', title: 'Modify an adjective', text: 'Adverbs can make an adjective stronger or weaker.', example: 'The show was absolutely amazing. / It was unusually chilly.' }
    ],
    forms: [
      { id: 'affirmative', icon: '+', title: 'Adjective', formula: 'linking verb + adjective', example: 'She looks tired. / The room feels cold.', translation: 'The adjective describes the subject.', note: 'Do not use an -ly adverb after look, feel, seem or sound when you describe the subject.' },
      { id: 'negative', icon: '→', title: 'Adverb', formula: 'verb + adverb', example: 'She answered calmly. / Look directly at the camera.', translation: 'The adverb describes the action.', note: 'Many adverbs are formed with adjective + -ly, but not all.' },
      { id: 'question', icon: '++', title: 'Adverb + adjective', formula: 'degree adverb + adjective', example: 'absolutely dreadful / terribly sad / unusually chilly', translation: 'The adverb changes the strength or meaning of the adjective.', note: 'Some combinations are much more natural than others, so learn common collocations as phrases.' },
      { id: 'short-answer', icon: '!', title: 'Irregular and confusing forms', formula: 'hard ≠ hardly; late ≠ lately', example: 'work hard / hardly ever; arrive late / lately = recently', translation: 'Some similar-looking forms have different meanings.', note: 'Good → well is irregular when well is an adverb: She sings well.' }
    ],
    contrast: {
      title: 'Adjective or adverb?',
      intro: 'Ask what the word describes: a noun or state, an action, or another adjective.',
      ordinary: { label: 'Adjective', verbs: 'be, look, seem, feel, sound', affirmative: 'She looks sad.', negative: 'The film was not interesting.', question: 'Does it sound strange?', rule: 'Use an adjective after a linking verb when it describes the subject.' },
      be: { label: 'Adverb', verbs: 'work, speak, check, arrive, look at', affirmative: 'She spoke quietly.', negative: 'He did not answer clearly.', question: 'Did you check it carefully?', rule: 'Use an adverb when it describes how an action happens.' }
    },
    questionBuilder: {
      title: 'How to choose the form',
      pattern: ['What does the word describe?', 'noun / state → adjective', 'action / adjective → adverb', 'check irregular forms'],
      example: 'She looks sad, but she spoke sadly about the news.',
      translation: 'The same root can need different forms depending on its job in the sentence.',
      note: 'Do not choose the form only because it “sounds right”; identify what it modifies.'
    },
    memoryRule: {
      title: 'Quick check',
      steps: [
        'After be, look, seem, feel and sound, use an adjective to describe the subject.',
        'To describe how someone does an action, use an adverb.',
        'To strengthen an adjective, use an adverb such as really, absolutely, terribly or unusually.',
        'Remember confusing pairs: hard / hardly and late / lately.',
        'Check spelling when adding -ly: easy → easily; terrible → terribly; true → truly.'
      ]
    },
    commonMistakes: [
      { wrong: 'She looks sadly.', right: 'She looks sad.', reason: 'After look, use an adjective to describe the subject.' },
      { wrong: 'Check your work careful.', right: 'Check your work carefully.', reason: 'The word describes how you check, so use an adverb.' },
      { wrong: 'He arrived lately.', right: 'He arrived late.', reason: 'Late means not on time; lately means recently.' },
      { wrong: 'I hardly worked for the exam.', right: 'I worked hard for the exam.', reason: 'Hard means with effort; hardly means almost not.' }
    ],
    quizExercises: [
      {
        title: 'Choose adjective or adverb',
        instructions: 'Choose the correct answer.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'Linking verb', prompt: 'The room feels ___.', options: ['cold', 'coldly'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Action', prompt: 'She explained the problem ___.', options: ['clear', 'clearly'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Linking verb', prompt: 'That idea sounds ___.', options: ['interesting', 'interestingly'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Action', prompt: 'Please read the instructions ___.', options: ['careful', 'carefully'], answer: 1 }
        ]
      },
      {
        title: 'Complete the form',
        instructions: 'Write the correct form of the word in brackets.',
        items: [
          { type: 'gaps', difficulty: 'Medium', skill: 'Adverb formation', prompt: 'Complete the sentence.', segments: ['The audience listened ', ' to the final song. (quiet)'], answers: ['quietly'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Adjective after look', prompt: 'Complete the sentence.', segments: ['He looked ', ' after the long journey. (tire)'], answers: ['tired'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Adverb formation', prompt: 'Complete the sentence.', segments: ['She answered the question ', '. (easy)'], answers: ['easily'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Degree adverb', prompt: 'Complete the sentence.', segments: ['The performance was ', ' good. (surprising)'], answers: ['surprisingly'] }
        ]
      },
      {
        title: 'Choose the correct meaning',
        instructions: 'Choose the form that fits the context.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Hard / hardly', prompt: 'I worked ___ all week to finish the project.', options: ['hard', 'hardly'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Late / lately', prompt: 'He arrived ___ and missed the opening song.', options: ['late', 'lately'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Hardly', prompt: 'We ___ ever watch television now.', options: ['hard', 'hardly'], answer: 1 },
          { type: 'select', difficulty: 'Challenge', skill: 'Lately', prompt: 'Have you seen any good films ___?', options: ['late', 'lately'], answer: 1 }
        ]
      },
      {
        title: 'Build complete sentences',
        instructions: 'Put the words in the correct order.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Adverb + adjective', prompt: 'film / was / absolutely / the / dreadful', tokens: ['The film', 'was', 'absolutely', 'dreadful'], answer: 'The film was absolutely dreadful.', acceptedAnswers: ['The film was absolutely dreadful', 'The film was absolutely dreadful.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Adverb of manner', prompt: 'camera / look / directly / the / at', tokens: ['Look', 'directly', 'at', 'the camera'], answer: 'Look directly at the camera.', acceptedAnswers: ['Look directly at the camera', 'Look directly at the camera.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Linking verb', prompt: 'looks / she / very / sad', tokens: ['She', 'looks', 'very', 'sad'], answer: 'She looks very sad.', acceptedAnswers: ['She looks very sad', 'She looks very sad.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Adverb + adjective', prompt: 'weather / unusually / the / chilly / is', tokens: ['The weather', 'is', 'unusually', 'chilly'], answer: 'The weather is unusually chilly.', acceptedAnswers: ['The weather is unusually chilly', 'The weather is unusually chilly.'] }
        ]
      }
    ]
  },
  {
    id: 'grammar-lesson-5-relative-clauses',
    order: 4,
    title: 'Relative clauses',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-5',
    page: 'grammar-topic.html?id=grammar-lesson-5-relative-clauses',
    passScore: 100,
    overview: {
      lead: 'Relative clauses add information about a person, thing, place, time or possession. They let you join ideas without repeating the same noun.',
      keyRule: 'Use defining relative clauses for essential information and non-defining relative clauses for extra information. Non-defining clauses are separated by commas and do not normally use that.',
      subjects: ['who', 'which', 'that', 'whose', 'where', 'when'],
      example: 'The area that we visited was beautiful. / Riga, which is on the Baltic Sea, has a historic centre.'
    },
    uses: [
      { icon: 'D', title: 'Defining clauses', text: 'Use a defining relative clause when the information identifies exactly which person or thing you mean.', example: 'The hotel that we booked was near the old town.' },
      { icon: 'ND', title: 'Non-defining clauses', text: 'Use commas when the relative clause gives extra information that is not needed to identify the noun.', example: 'The castle, which dates back to the 1500s, dominates the area.' },
      { icon: 'P', title: 'People and things', text: 'Use who for people and which for things. That can replace who or which in many defining clauses.', example: 'The guide who showed us around was excellent. / The building that we saw is a museum.' },
      { icon: 'O', title: 'Place, time and possession', text: 'Use where for places, when for times and whose for possession.', example: 'This is the street where I grew up. / 2019 was the year when I moved. / We met a woman whose family owns the hotel.' }
    ],
    forms: [
      { id: 'affirmative', icon: '+', title: 'Defining relative clause', formula: 'noun + who / which / that + clause', example: 'The café that opened last year is always busy.', translation: 'Essential information: which café?', note: 'No commas are used.' },
      { id: 'negative', icon: ',', title: 'Non-defining relative clause', formula: 'noun, who / which / whose + clause,', example: 'The museum, which is free on Sundays, closes at six.', translation: 'Extra information about an already identified noun.', note: 'Use commas. Do not normally use that.' },
      { id: 'question', icon: 'Ø', title: 'Omitting the relative pronoun', formula: 'noun + (who / which / that) + subject + verb', example: 'The hotel (that) we booked was expensive.', translation: 'The pronoun can be omitted when it is the object of the relative clause.', note: 'Do not omit it when it is the subject: The hotel that stands here ...' },
      { id: 'short-answer', icon: 'W', title: 'Where, when and whose', formula: 'place + where; time + when; person / thing + whose + noun', example: 'That is the square where the festival takes place. / I met a guide whose English was excellent.', translation: 'Use these forms for place, time and possession.', note: 'Whose is followed by a noun.' }
    ],
    contrast: {
      title: 'Defining or non-defining?',
      intro: 'The difference is whether the information is necessary to identify the noun.',
      ordinary: { label: 'Defining', verbs: 'who / which / that', affirmative: 'The streets that lead to the castle are narrow.', negative: 'The hotel that we booked was not central.', question: 'Which hotel? The one that we booked.', rule: 'Essential information; no commas.' },
      be: { label: 'Non-defining', verbs: 'who / which / whose', affirmative: 'The old town, which is very walkable, is full of cafés.', negative: 'Our hotel, which was not expensive, had a great view.', question: 'Extra information about an already identified noun.', rule: 'Use commas and do not normally use that.' }
    },
    questionBuilder: {
      title: 'Choose the connector',
      pattern: ['person → who', 'thing → which / that', 'place → where', 'time → when', 'possession → whose'],
      example: 'The district where we stayed was very lively.',
      translation: 'Choose the relative word by the meaning you need.',
      note: 'Then decide whether the information is defining or non-defining.'
    },
    memoryRule: {
      title: 'Quick check',
      steps: [
        'Is the information essential? Use a defining clause without commas.',
        'Is it extra information? Use commas and a non-defining clause.',
        'Person: who; thing: which; place: where; time: when; possession: whose.',
        'That is common in defining clauses, but not normally in non-defining clauses.',
        'You may omit who / which / that only when it is the object, not the subject.'
      ]
    },
    commonMistakes: [
      { wrong: 'The hotel, that we booked, was expensive.', right: 'The hotel, which we booked, was expensive.', reason: 'Do not normally use that in a non-defining relative clause.' },
      { wrong: 'The street which I grew up is nearby.', right: 'The street where I grew up is nearby.', reason: 'Use where for a place when it means “in that place”.' },
      { wrong: 'The guide whose showed us around was friendly.', right: 'The guide who showed us around was friendly.', reason: 'Use who for a person as the subject. Whose expresses possession.' },
      { wrong: 'The building built in 1890 which is now a museum is beautiful.', right: 'The building, which was built in 1890, is now a museum.', reason: 'Use commas when the clause gives extra information about an already identified noun.' }
    ],
    quizExercises: [
      {
        title: 'Choose the relative word',
        instructions: 'Choose the correct answer.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'People', prompt: 'The guide ___ showed us the cathedral was excellent.', options: ['who', 'where', 'when'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Things', prompt: 'The building ___ dominates the square is the town hall.', options: ['which', 'where', 'whose'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Places', prompt: 'That is the district ___ we stayed.', options: ['where', 'who', 'whose'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Possession', prompt: 'We met a local artist ___ studio is near the river.', options: ['whose', 'which', 'when'], answer: 0 }
        ]
      },
      {
        title: 'Complete the sentences',
        instructions: 'Write the missing relative word.',
        items: [
          { type: 'gaps', difficulty: 'Medium', skill: 'Defining person', prompt: 'Complete the sentence.', segments: ['The woman ', ' recommended the hotel lives nearby.'], answers: ['who'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Defining thing', prompt: 'Complete the sentence.', segments: ['The castle ', ' we visited is over 500 years old.'], answers: [['that', 'which']] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Place', prompt: 'Complete the sentence.', segments: ['This is the café ', ' we had breakfast.'], answers: ['where'] },
          { type: 'gaps', difficulty: 'Medium', skill: 'Time', prompt: 'Complete the sentence.', segments: ['Sunday is the day ', ' the market is busiest.'], answers: ['when'] }
        ]
      },
      {
        title: 'Defining or non-defining?',
        instructions: 'Choose the correct sentence.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Commas', prompt: 'Our hotel is already identified. Choose the correct sentence.', options: ['Our hotel, which overlooks the river, is very quiet.', 'Our hotel that overlooks the river is very quiet.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Defining', prompt: 'You need to identify which streets. Choose the correct sentence.', options: ['The streets that lead to the old town are pedestrianised.', 'The streets, that lead to the old town, are pedestrianised.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'That', prompt: 'Choose the natural non-defining clause.', options: ['The cathedral, which was renovated recently, is open again.', 'The cathedral, that was renovated recently, is open again.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Omission', prompt: 'Choose the sentence where the relative pronoun can be omitted.', options: ['The museum (that) we visited was free.', 'The museum (that) stands by the river is free.'], answer: 0 }
        ]
      },
      {
        title: 'Build complete sentences',
        instructions: 'Put the words in the correct order.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Where', prompt: 'district / where / we stayed / the / was very lively', tokens: ['The district', 'where', 'we stayed', 'was very lively'], answer: 'The district where we stayed was very lively.', acceptedAnswers: ['The district where we stayed was very lively', 'The district where we stayed was very lively.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Who', prompt: 'guide / who / showed us around / the / was excellent', tokens: ['The guide', 'who', 'showed us around', 'was excellent'], answer: 'The guide who showed us around was excellent.', acceptedAnswers: ['The guide who showed us around was excellent', 'The guide who showed us around was excellent.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Whose', prompt: 'artist / whose / work we saw / the / lives nearby', tokens: ['The artist', 'whose', 'work we saw', 'lives nearby'], answer: 'The artist whose work we saw lives nearby.', acceptedAnswers: ['The artist whose work we saw lives nearby', 'The artist whose work we saw lives nearby.'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Non-defining which', prompt: 'the castle / which dates back to 1550 / is now a museum', tokens: ['The castle,', 'which dates back to 1550,', 'is now a museum'], answer: 'The castle, which dates back to 1550, is now a museum.', acceptedAnswers: ['The castle, which dates back to 1550, is now a museum', 'The castle, which dates back to 1550, is now a museum.'] }
        ]
      }
    ]
  },
  {
    id: 'grammar-lesson-6-question-formation',
    order: 5,
    title: 'Question formation: advanced patterns',
    level: 'B2',
    status: 'available',
    linkedLessonId: 'lesson-6',
    page: 'grammar-topic.html?id=grammar-lesson-6-question-formation',
    passScore: 100,
    overview: {
      lead: 'At B2, question formation is not only about using do, does or did. You need to control subject and object questions, negative questions, questions ending in prepositions, and embedded questions where normal question inversion disappears.',
      keyRule: 'First identify the type of question. Direct object questions normally use inversion; subject questions do not. Embedded questions use statement word order after the introductory phrase.',
      subjects: ['subject vs object questions', 'negative questions', 'questions with prepositions', 'indirect / embedded questions', 'if / whether'],
      example: 'Who repaired your car? / Who did you call? / Could you tell me where the lift is?'
    },
    uses: [
      {
        icon: 'S/O',
        title: 'Subject vs object questions',
        text: 'If who or what is the subject of the verb, do not add do, does or did. If it is the object, use normal question inversion.',
        example: 'Who repaired your car? / Who did you talk to?'
      },
      {
        icon: '−?',
        title: 'Negative questions',
        text: 'Negative questions can express surprise, expectation or a request for confirmation. They normally use a contracted negative auxiliary before the subject.',
        example: 'Haven’t you done the homework? / Didn’t you tell him?'
      },
      {
        icon: 'P',
        title: 'Questions with prepositions',
        text: 'In neutral and conversational English, the preposition normally stays at the end of the question.',
        example: 'Who is Jack going out with? / What are you looking for?'
      },
      {
        icon: '↪',
        title: 'Indirect and embedded questions',
        text: 'After expressions such as Could you tell me, Do you know, I wonder, I’m not sure and Do you have any idea, use statement word order in the embedded clause.',
        example: 'Do you know what time the match starts? / I wonder where Natalie lives.'
      }
    ],
    forms: [
      {
        id: 'affirmative',
        icon: 'Who',
        title: 'Subject and object questions',
        formula: 'subject question: who / what + verb · object question: who / what + auxiliary + subject + verb',
        example: 'Who ate the chocolates? / Who did you invite?',
        translation: 'The grammar changes according to the role of who / what in the clause.',
        note: 'Do not add do / does / did when who or what is already the subject.'
      },
      {
        id: 'negative',
        icon: '−?',
        title: 'Negative questions',
        formula: 'negative auxiliary + subject + main verb',
        example: 'Haven’t you done the homework? / Why didn’t you tell me?',
        translation: 'Negative questions often show that the speaker expected something different.',
        note: 'The contracted form is the normal spoken pattern: Didn’t you ...? Haven’t they ...?'
      },
      {
        id: 'question',
        icon: 'Prep',
        title: 'Questions with prepositions',
        formula: 'question word + auxiliary + subject + verb + preposition',
        example: 'Who are you waiting for? / Who is she talking to?',
        translation: 'Leaving the preposition at the end is standard in ordinary spoken and written English.',
        note: 'Preposition + whom is much more formal: To whom were you speaking?'
      },
      {
        id: 'short-answer',
        icon: '↪',
        title: 'Embedded questions',
        formula: 'introductory phrase + question word / if / whether + subject + verb',
        example: 'Could you tell me where the lift is? / Do you know if there are any tickets left?',
        translation: 'Inside an embedded question, use statement word order.',
        note: 'Do not use do / does / did or subject–verb inversion inside the embedded clause.'
      }
    ],
    contrast: {
      title: 'The patterns that cause the most B2 mistakes',
      intro: 'The same question word can require different structures depending on its grammatical role and whether the question is direct or embedded.',
      ordinary: {
        label: 'Direct question',
        verbs: 'inversion when needed',
        affirmative: 'What time does the match start?',
        negative: 'Why didn’t you come?',
        question: 'Who did the manager talk to?',
        rule: 'Use direct-question word order unless the question word itself is the subject.'
      },
      be: {
        label: 'Embedded question',
        verbs: 'statement word order',
        affirmative: 'Do you know what time the match starts?',
        negative: 'I’m not sure why he didn’t come.',
        question: 'Could you tell me who the manager talked to?',
        rule: 'The introductory phrase may be a question, but the embedded clause is not inverted.'
      }
    },
    questionBuilder: {
      title: 'Choose the structure before you build the question',
      pattern: [
        'Is who / what the subject? → no do / does / did',
        'Is it a direct object question? → use inversion',
        'Is it negative? → negative auxiliary before the subject',
        'Is it embedded? → statement word order',
        'Is there a preposition? → normally leave it at the end'
      ],
      example: 'Who repaired your car? → Who did you speak to? → Could you tell me who you spoke to?',
      translation: 'The main skill is recognising which structure the question requires.',
      note: 'This is why translating word-for-word into English often produces the wrong word order.'
    },
    memoryRule: {
      title: 'B2 checklist',
      steps: [
        'Subject question: Who called? not Who did call?',
        'Object question: Who did you call?',
        'Negative question: Haven’t you finished? / Why didn’t you ask?',
        'Preposition: Who are you waiting for?',
        'Embedded question: Could you tell me where he lives? not where does he live?',
        'Yes / no embedded question: use if or whether.'
      ]
    },
    commonMistakes: [
      {
        wrong: 'What did happen at the meeting?',
        right: 'What happened at the meeting?',
        reason: 'What is the subject of happened, so did is not needed.'
      },
      {
        wrong: 'For who are you waiting?',
        right: 'Who are you waiting for?',
        reason: 'In normal English, the preposition usually stays at the end.'
      },
      {
        wrong: 'Could you tell me where is the lift?',
        right: 'Could you tell me where the lift is?',
        reason: 'Embedded questions use statement word order.'
      },
      {
        wrong: 'Do you know are there any tickets left?',
        right: 'Do you know if there are any tickets left?',
        reason: 'Use if or whether for an embedded yes / no question.'
      }
    ],
    quizExercises: [
      {
        title: 'Identify the correct B2 pattern',
        instructions: 'Choose the correct question.',
        items: [
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Subject question',
            prompt: 'You are asking who performed the action.',
            options: ['Who repaired your car?', 'Who did repair your car?'],
            answer: 0
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Object question',
            prompt: 'You are asking about the person Jack is dating.',
            options: ['Who is Jack going out with?', 'Who Jack is going out with?'],
            answer: 0
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Negative question',
            prompt: 'You expected the homework to be finished.',
            options: ['Haven’t you done the homework?', 'You haven’t done the homework?'],
            answer: 0
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Embedded question',
            prompt: 'Choose the correct embedded question.',
            options: ['Could you tell me where the lift is?', 'Could you tell me where is the lift?'],
            answer: 0
          }
        ]
      },
      {
        title: 'Complete the structure',
        instructions: 'Write the missing word or words.',
        items: [
          {
            type: 'gaps',
            difficulty: 'Medium',
            skill: 'Object question',
            prompt: 'Complete the question.',
            segments: ['Who ', ' the manager talking to now?'],
            answers: ['is']
          },
          {
            type: 'gaps',
            difficulty: 'Medium',
            skill: 'Negative question',
            prompt: 'Complete the question.',
            segments: ['Why ', ' you tell me the truth?'],
            answers: [["didn't", "didn’t"]]
          },
          {
            type: 'gaps',
            difficulty: 'Medium',
            skill: 'Embedded question',
            prompt: 'Complete the sentence.',
            segments: ['I wonder where Natalie ', '.'],
            answers: ['lives']
          },
          {
            type: 'gaps',
            difficulty: 'Medium',
            skill: 'Embedded yes/no question',
            prompt: 'Complete the question.',
            segments: ['Do you know ', ' there are any tickets left?'],
            answers: [['if', 'whether']]
          }
        ]
      },
      {
        title: 'Choose the meaning and word order',
        instructions: 'Choose the form that fits the context.',
        items: [
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Subject vs object',
            prompt: 'You want to know the person who ate the chocolates.',
            options: ['Who ate the chocolates?', 'Who did eat the chocolates?'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Embedded question',
            prompt: 'Complete: Do you have any idea ___ ?',
            options: ['what Jamie does for a living', 'what does Jamie do for a living'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Preposition',
            prompt: 'Choose the natural neutral-English question.',
            options: ['Who are you waiting for?', 'For whom are you waiting?'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Negative question',
            prompt: 'You are surprised that somebody did not tell you.',
            options: ['Why didn’t you tell me?', 'Why you didn’t tell me?'],
            answer: 0
          }
        ]
      },
      {
        title: 'Build advanced questions',
        instructions: 'Put the words in the correct order.',
        items: [
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Subject question',
            prompt: 'your car / who / repaired / for you',
            tokens: ['Who', 'repaired', 'your car', 'for you'],
            answer: 'Who repaired your car for you?',
            acceptedAnswers: ['Who repaired your car for you?', 'Who repaired your car for you']
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Question with preposition',
            prompt: 'Jack / who / going out / is / with',
            tokens: ['Who', 'is', 'Jack', 'going out', 'with'],
            answer: 'Who is Jack going out with?',
            acceptedAnswers: ['Who is Jack going out with?', 'Who is Jack going out with']
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Embedded question',
            prompt: 'could you tell me / where / the lift / is',
            tokens: ['Could you tell me', 'where', 'the lift', 'is'],
            answer: 'Could you tell me where the lift is?',
            acceptedAnswers: ['Could you tell me where the lift is?', 'Could you tell me where the lift is']
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Embedded yes/no question',
            prompt: 'do you know / if / any tickets / there are / left',
            tokens: ['Do you know', 'if', 'there are', 'any tickets', 'left'],
            answer: 'Do you know if there are any tickets left?',
            acceptedAnswers: ['Do you know if there are any tickets left?', 'Do you know if there are any tickets left']
          }
        ]
      }
    ]
  },
  {
    id: 'grammar-lesson-7-causative-have-get',
    order: 6,
    title: 'Causatives with have and get',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-7',
    page: 'grammar-topic.html?id=grammar-lesson-7-causative-have-get',
    passScore: 100,

    overview: {
      lead: 'These structures let you talk about arranging, persuading and making sure actions happen without simply saying that you personally do the action.',
      keyRule: 'Use have + person + base verb for arranging or instructing; get + person + to-infinitive when there is an idea of persuading, managing or arranging; get + thing + past participle when the result is more important than the person who does it.',
      subjects: ['have + person + base verb', 'get + person + to-infinitive', 'get + thing + past participle', 'agent vs result', 'causative meaning'],
      example: 'I’ll have Maya check it. / I got Maya to check it. / I got it checked.'
    },

    uses: [
      {
        icon: 'H',
        title: 'have someone do something',
        text: 'Use this when you arrange, ask or instruct a person to do something. The person is named and the next verb is the base form without to.',
        example: 'I’ll have Ben send the final file.'
      },
      {
        icon: 'G→',
        title: 'get someone to do something',
        text: 'Use this when you persuade, manage to convince, or arrange for a person to do something. The person is named and the next verb uses to.',
        example: 'I got Ben to stay for another hour.'
      },
      {
        icon: '✓',
        title: 'get something done',
        text: 'Use this when you focus on the completed result rather than the person doing the action. The object comes before the past participle.',
        example: 'We need to get the report checked today.'
      },
      {
        icon: '≠',
        title: 'The meaning changes with the structure',
        text: 'The three patterns can describe similar real-world situations, but they highlight different things: authority or arrangement, persuasion, or the final result.',
        example: 'I had Sara call him. / I got Sara to call him. / I got the call made before lunch.'
      }
    ],

    forms: [
      {
        id: 'affirmative',
        icon: 'H',
        title: 'have + person + base verb',
        formula: 'have + person + verb',
        example: 'The manager had the team revise the schedule.',
        translation: 'The manager arranged or instructed the team to do it.',
        note: 'Do not use to after the person: have the team revise, not have the team to revise.'
      },
      {
        id: 'negative',
        icon: 'G→',
        title: 'get + person + to-infinitive',
        formula: 'get + person + to + verb',
        example: 'We got the supplier to deliver it early.',
        translation: 'We persuaded or managed to arrange for the supplier to do it.',
        note: 'The to-infinitive is required here.'
      },
      {
        id: 'question',
        icon: '✓',
        title: 'get + thing + past participle',
        formula: 'get + object + past participle',
        example: 'I need to get the figures checked.',
        translation: 'The result is important; the person who checks them is not named.',
        note: 'The past participle describes what happens to the object: checked, repaired, translated, finished.'
      },
      {
        id: 'short-answer',
        icon: 'Focus',
        title: 'Choose by focus',
        formula: 'person + action OR object + result',
        example: 'Have Leo update it. / Get Leo to update it. / Get it updated.',
        translation: 'Choose the structure according to what you want to emphasize.',
        note: 'At B2, meaning and focus matter as much as the verb form.'
      }
    ],

    contrast: {
      title: 'What changes?',
      intro: 'The person or object after have/get tells you which pattern you are building.',
      ordinary: {
        label: 'Person is named',
        verbs: 'have + person + base verb / get + person + to-infinitive',
        affirmative: 'I had Zoe proofread it. / I got Zoe to proofread it.',
        negative: 'I didn’t have Zoe proofread it. / I couldn’t get Zoe to proofread it.',
        question: 'Can you have Zoe proofread it? / Can you get Zoe to proofread it?',
        rule: 'Have is more neutral for arranging or instructing; get often suggests extra effort, persuasion or successfully arranging something.'
      },
      be: {
        label: 'Result is central',
        verbs: 'get + object + past participle',
        affirmative: 'I got the report proofread.',
        negative: 'I didn’t get the report proofread.',
        question: 'Did you get the report proofread?',
        rule: 'The agent can be omitted because the important information is that the action was completed.'
      }
    },

    questionBuilder: {
      title: 'Build the right causative',
      pattern: [
        'Do I want to name the person? → yes: have/get + person',
        'Is it a neutral arrangement or instruction? → have + person + base verb',
        'Is there persuasion, effort or successful arranging? → get + person + to-infinitive',
        'Do I mainly care about the result? → get + object + past participle'
      ],
      example: 'I had Alex call them. → I got Alex to call them. → I got the call made.',
      translation: 'Start with the meaning you want, then choose the form.',
      note: 'Do not mechanically replace have with get: the verb pattern changes.'
    },

    memoryRule: {
      title: 'Three patterns to remember',
      steps: [
        'HAVE + PERSON + VERB: have Maya check it.',
        'GET + PERSON + TO + VERB: get Maya to check it.',
        'GET + THING + PAST PARTICIPLE: get it checked.',
        'After have + person, never add to.',
        'After get + person, to is required.',
        'After get + thing, use a past participle.'
      ]
    },

    commonMistakes: [
      {
        wrong: 'I had Sam to send the file.',
        right: 'I had Sam send the file.',
        reason: 'Have + person is followed by the base verb without to.'
      },
      {
        wrong: 'I got Sam send the file.',
        right: 'I got Sam to send the file.',
        reason: 'Get + person requires a to-infinitive.'
      },
      {
        wrong: 'I got the file to check.',
        right: 'I got the file checked.',
        reason: 'Get + thing takes a past participle when you mean that the action was completed.'
      },
      {
        wrong: 'I got my colleague checked the figures.',
        right: 'I got my colleague to check the figures.',
        reason: 'When a person is named after get, use to + verb.'
      }
    ],

    quizExercises: [
      {
        title: 'Meaning and focus',
        instructions: 'Choose the structure that best matches the situation.',
        items: [
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Arrangement',
            prompt: 'You are responsible for the project and assign the final check to Mia.',
            options: ['have someone do something', 'get someone to do something', 'get something done'],
            answer: 0
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Persuasion',
            prompt: 'A colleague initially refuses, but you persuade them to help.',
            options: ['have someone do something', 'get someone to do something', 'get something done'],
            answer: 1
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Result focus',
            prompt: 'The important point is that the laptop is repaired today.',
            options: ['have someone do something', 'get someone to do something', 'get something done'],
            answer: 2
          },
          {
            type: 'single',
            difficulty: 'Easy',
            skill: 'Instruction',
            prompt: 'A manager tells an assistant to move an appointment.',
            options: ['have someone do something', 'get someone to do something', 'get something done'],
            answer: 0
          }
        ]
      },

      {
        title: 'Complete the verb pattern',
        instructions: 'Choose the correct form.',
        items: [
          {
            type: 'select',
            difficulty: 'Medium',
            skill: 'Have + person',
            prompt: 'I’ll have Leo ___ the spreadsheet.',
            options: ['update', 'to update', 'updated'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Medium',
            skill: 'Get + person',
            prompt: 'We got the client ___ the revised date.',
            options: ['accept', 'to accept', 'accepted'],
            answer: 1
          },
          {
            type: 'select',
            difficulty: 'Medium',
            skill: 'Get + object',
            prompt: 'I need to get the contract ___ today.',
            options: ['sign', 'to sign', 'signed'],
            answer: 2
          },
          {
            type: 'select',
            difficulty: 'Medium',
            skill: 'Get + person',
            prompt: 'Can you get Noor ___ us the latest figures?',
            options: ['send', 'to send', 'sent'],
            answer: 1
          }
        ]
      },

      {
        title: 'Choose the natural sentence',
        instructions: 'Choose the sentence that expresses the situation correctly.',
        items: [
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Neutral arrangement',
            prompt: 'You arrange for your assistant to contact the venue.',
            options: ['I had my assistant contact the venue.', 'I had my assistant to contact the venue.'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Persuasion',
            prompt: 'You finally persuade a teammate to swap tasks.',
            options: ['I got my teammate to swap tasks.', 'I got my teammate swap tasks.'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Result focus',
            prompt: 'You arrange for the document to be translated.',
            options: ['I got the document translated.', 'I got the document to translate.'],
            answer: 0
          },
          {
            type: 'select',
            difficulty: 'Challenge',
            skill: 'Agent focus',
            prompt: 'You instruct an intern to collect the responses.',
            options: ['I had an intern collect the responses.', 'I got the responses collected by an intern.'],
            answer: 0
          }
        ]
      },

      {
        title: 'Build complete causative sentences',
        instructions: 'Put the parts in the correct order.',
        items: [
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Have + person',
            prompt: 'the final figures / I’ll / have / Maya / check',
            tokens: ['I’ll', 'have', 'Maya', 'check', 'the final figures'],
            answer: 'I’ll have Maya check the final figures.',
            acceptedAnswers: ['I’ll have Maya check the final figures.', "I'll have Maya check the final figures.", 'I’ll have Maya check the final figures', "I'll have Maya check the final figures"]
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Get + person',
            prompt: 'to stay / we / got / Dan / for another hour',
            tokens: ['We', 'got', 'Dan', 'to stay', 'for another hour'],
            answer: 'We got Dan to stay for another hour.',
            acceptedAnswers: ['We got Dan to stay for another hour.', 'We got Dan to stay for another hour']
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Get + object',
            prompt: 'before Friday / get / we need to / the draft / approved',
            tokens: ['We need to', 'get', 'the draft', 'approved', 'before Friday'],
            answer: 'We need to get the draft approved before Friday.',
            acceptedAnswers: ['We need to get the draft approved before Friday.', 'We need to get the draft approved before Friday']
          },
          {
            type: 'reorder',
            difficulty: 'Advanced',
            skill: 'Get + person',
            prompt: 'the supplier / to confirm / can you / get / the date',
            tokens: ['Can you', 'get', 'the supplier', 'to confirm', 'the date'],
            answer: 'Can you get the supplier to confirm the date?',
            acceptedAnswers: ['Can you get the supplier to confirm the date?', 'Can you get the supplier to confirm the date']
          }
        ]
      }
    ]
  },
  {
    id: 'grammar-lesson-8-auxiliary-verbs',
    order: 7,
    title: 'Auxiliary verbs: advanced use',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-8',
    page: 'grammar-topic.html?id=grammar-lesson-8-auxiliary-verbs',
    passScore: 100,

    overview: {
      lead: 'Auxiliary verbs do more than form tenses. At B2, they also replace repeated verb phrases, form question tags, show agreement, and add emphasis.',
      keyRule: 'Choose the auxiliary that belongs to the original verb phrase: be, have, do, or a modal. Then keep the tense and polarity consistent.',
      subjects: ['ellipsis', 'question tags', 'So / Neither', 'short contrasting replies', 'emphatic do'],
      example: 'I loved the film, but my wife didn’t. / You’re coming, aren’t you? / So am I.'
    },

    uses: [
      {
        icon: '…',
        title: 'Avoid repetition / Не повторяем сказуемое',
        text: 'An auxiliary can replace a verb phrase that is already clear from context. / Вспомогательный глагол может заменить уже понятную часть сказуемого.',
        example: 'My mum can drive, but my dad can’t.'
      },
      {
        icon: 'Tag',
        title: 'Question tags / Разделительные вопросы',
        text: 'A positive statement normally takes a negative tag; a negative statement takes a positive tag. / После утвердительной части обычно идёт отрицательный хвостик и наоборот.',
        example: 'You haven’t seen him, have you?'
      },
      {
        icon: '=',
        title: 'Agreement / Согласие',
        text: 'Use So + auxiliary + subject after an affirmative statement, and Neither/Nor + auxiliary + subject after a negative one. / Для согласия выбираем тот же вспомогательный глагол.',
        example: 'I can swim. — So can I. / I don’t smoke. — Neither do I.'
      },
      {
        icon: '!',
        title: 'Contrast and emphasis / Контраст и усиление',
        text: 'A stressed auxiliary can correct or contradict an idea: I did reply; I do like it. / Ударный вспомогательный глагол подчёркивает, что действие действительно произошло или утверждение верно.',
        example: 'You didn’t call. — I did call!'
      }
    ],

    forms: [
      {
        id: 'affirmative',
        icon: 'be',
        title: 'With be',
        formula: 'be → am / is / are / was / were',
        example: 'She isn’t tired, but I am. / You’re Australian, aren’t you?',
        translation: 'Use the same form of be that fits the subject and tense. / Сохраняем время и выбираем форму be по подлежащему.',
        note: 'Do not add do when be is already the verb.'
      },
      {
        id: 'negative',
        icon: 'have',
        title: 'With perfect forms',
        formula: 'have → have / has / had',
        example: 'I’ve seen it, but he hasn’t. / You haven’t finished, have you?',
        translation: 'The auxiliary have carries the perfect tense. / В Present/Past Perfect используется have/has/had.',
        note: 'Do not replace perfect have with do.'
      },
      {
        id: 'question',
        icon: 'do',
        title: 'With ordinary present/past verbs',
        formula: 'do / does / did',
        example: 'I love the sea. — So do I. / He didn’t go, and neither did I.',
        translation: 'If there is no other auxiliary, use do/does/did. / Если другого вспомогательного глагола нет, используем do/does/did.',
        note: 'The main verb is omitted because it is already understood.'
      },
      {
        id: 'short-answer',
        icon: 'modal',
        title: 'With modal verbs',
        formula: 'can / could / will / would / should / must …',
        example: 'I can swim. — So can I. / You’ll be there, won’t you?',
        translation: 'Repeat the modal, not do. / Повторяется модальный глагол, а не do.',
        note: 'The auxiliary in the response or tag must match the modal in the original statement.'
      }
    ],

    contrast: {
      title: 'How the auxiliary is chosen / Как выбрать auxiliary',
      intro: 'Look inside the original verb phrase. / Сначала найдите вспомогательный или модальный глагол в исходном предложении.',
      ordinary: {
        label: 'No auxiliary in the statement',
        verbs: 'present simple / past simple',
        affirmative: 'I like it. — So do I.',
        negative: 'I didn’t go. — Neither did I.',
        question: 'You like it, don’t you?',
        rule: 'Supply do / does / did.'
      },
      be: {
        label: 'Auxiliary/modal already present',
        verbs: 'be, have, can, will, would …',
        affirmative: 'I’m tired. — So am I.',
        negative: 'I haven’t been there. — Neither have I.',
        question: 'You can drive, can’t you?',
        rule: 'Repeat the auxiliary/modal already present.'
      }
    },

    questionBuilder: {
      title: 'Question tag algorithm / Алгоритм question tag',
      pattern: ['statement', 'find auxiliary', 'reverse polarity', 'use pronoun'],
      example: 'You haven’t had another argument with him, have you?',
      translation: 'Negative statement → positive tag; him is not the subject, so the tag refers to you.',
      note: 'The tag repeats the subject as a pronoun and normally uses the same tense/modal as the statement.'
    },

    memoryRule: {
      title: 'B2 checklist / Проверка',
      steps: [
        'Find be / have / a modal. If there is none, use do / does / did.',
        'To avoid repetition, keep only the auxiliary when the rest is understood.',
        'Question tag: reverse positive ↔ negative and use a pronoun.',
        'Agreement: So + auxiliary + subject; Neither/Nor + auxiliary + subject.',
        'To correct someone, stress the auxiliary: I did reply! / I do like it!'
      ]
    },

    commonMistakes: [
      {
        wrong: 'I can swim. — So do I.',
        right: 'I can swim. — So can I.',
        reason: 'The response must repeat the modal can.'
      },
      {
        wrong: 'You haven’t finished, haven’t you?',
        right: 'You haven’t finished, have you?',
        reason: 'A negative statement normally takes a positive question tag.'
      },
      {
        wrong: 'I loved it, but my wife didn’t loved it.',
        right: 'I loved it, but my wife didn’t.',
        reason: 'The auxiliary did already carries the tense and replaces the repeated verb phrase.'
      },
      {
        wrong: 'I don’t like it. — So don’t I.',
        right: 'I don’t like it. — Neither do I.',
        reason: 'Use Neither/Nor for agreement with a negative statement.'
      }
    ],

    quizExercises: [
      {
        title: 'Choose the auxiliary',
        instructions: 'Choose the correct completion.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'Modal', prompt: 'I can drive, but my brother ___.', options: ['can’t', 'doesn’t', 'isn’t'], answer: 0 },
          { type: 'single', difficulty: 'Easy', skill: 'Perfect', prompt: 'I’ve seen the film, but Ella ___.', options: ['doesn’t', 'hasn’t', 'isn’t'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Past simple', prompt: 'I went out, but Leo ___.', options: ['wasn’t', 'didn’t', 'hadn’t'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Be', prompt: 'She isn’t worried, but I ___.', options: ['do', 'am', 'have'], answer: 1 }
        ]
      },
      {
        title: 'Question tags',
        instructions: 'Choose the correct tag.',
        items: [
          { type: 'select', difficulty: 'Medium', skill: 'Present be', prompt: 'You’re from here, ___?', options: ['aren’t you', 'don’t you', 'are you'], answer: 0 },
          { type: 'select', difficulty: 'Medium', skill: 'Present perfect', prompt: 'You haven’t called him, ___?', options: ['haven’t you', 'have you', 'did you'], answer: 1 },
          { type: 'select', difficulty: 'Medium', skill: 'Future', prompt: 'You’ll be back before midnight, ___?', options: ['will you', 'won’t you', 'don’t you'], answer: 1 },
          { type: 'select', difficulty: 'Medium', skill: 'Modal', prompt: 'You couldn’t help me, ___?', options: ['could you', 'couldn’t you', 'did you'], answer: 0 }
        ]
      },
      {
        title: 'Agree naturally',
        instructions: 'Choose the natural response.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Affirmative agreement', prompt: 'I’m good at languages.', options: ['So am I.', 'So do I.', 'Neither am I.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Negative agreement', prompt: 'I didn’t go out last night.', options: ['Neither did I.', 'Neither was I.', 'So did I.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Modal agreement', prompt: 'I can swim quite well.', options: ['So do I.', 'So can I.', 'Neither can I.'], answer: 1 },
          { type: 'select', difficulty: 'Challenge', skill: 'Conditional/modal agreement', prompt: 'I’d like to travel more.', options: ['So would I.', 'So do I.', 'Neither would I.'], answer: 0 }
        ]
      },
      {
        title: 'Build the response',
        instructions: 'Put the parts in the correct order.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Negative agreement', prompt: 'neither / have / I', tokens: ['Neither', 'have', 'I'], answer: 'Neither have I.', acceptedAnswers: ['Neither have I.', 'Neither have I'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Question tag', prompt: 'you / aren’t / are / from here / ?', tokens: ['You', 'aren’t', 'from here', 'are you?'], answer: 'You aren’t from here, are you?', acceptedAnswers: ['You aren’t from here, are you?', "You aren't from here, are you?"] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Emphasis', prompt: 'do / I / like / it', tokens: ['I', 'do', 'like', 'it'], answer: 'I do like it.', acceptedAnswers: ['I do like it.', 'I do like it'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Ellipsis', prompt: 'my wife / didn’t / but / I loved the book', tokens: ['I loved the book', 'but', 'my wife', 'didn’t'], answer: 'I loved the book, but my wife didn’t.', acceptedAnswers: ['I loved the book, but my wife didn’t.', "I loved the book, but my wife didn't."] }
        ]
      }
    ]
  },
  {
    id: 'grammar-lesson-8-double-comparatives',
    order: 8,
    title: 'The …, the … + comparatives',
    level: 'B2.1',
    status: 'available',
    linkedLessonId: 'lesson-8',
    page: 'grammar-topic.html?id=grammar-lesson-8-double-comparatives',
    passScore: 100,

    overview: {
      lead: 'This pattern connects two changing situations: when one thing increases or decreases, another thing changes with it.',
      keyRule: 'Use the + comparative in both parts. The word the is part of the structure; it does not mean the definite article here.',
      subjects: ['the + comparative', 'paired change', 'more / less', '-er forms', 'comparative word order'],
      example: 'The earlier we leave, the better our chances are.'
    },

    uses: [
      {
        icon: '↗↗',
        title: 'Both things increase / Оба показателя растут',
        text: 'One increase is connected with another increase. / Чем больше одно, тем больше другое.',
        example: 'The more you practise, the more confident you become.'
      },
      {
        icon: '↗↘',
        title: 'One rises, one falls / Одно растёт, другое уменьшается',
        text: 'Use less or a comparative with the opposite meaning. / Во второй части можно использовать less или сравнительную форму противоположного значения.',
        example: 'The more expensive the area, the less space you get.'
      },
      {
        icon: 'Adj',
        title: 'Adjective comparison / С прилагательными',
        text: 'Short adjectives usually take -er; longer adjectives usually use more. / Короткие прилагательные обычно получают -er, длинные — more.',
        example: 'The bigger the house, the longer it takes to clean.'
      },
      {
        icon: 'Irreg',
        title: 'Irregular comparatives / Неправильные формы',
        text: 'Use the normal irregular comparative forms: good → better, bad → worse, far → farther/further. / Неправильные comparative forms сохраняются.',
        example: 'The earlier we set off, the better.'
      }
    ],

    forms: [
      {
        id: 'affirmative',
        icon: 'A→B',
        title: 'Full clauses',
        formula: 'the + comparative + subject + verb, the + comparative + subject + verb',
        example: 'The later you go to bed, the more difficult it is to get up.',
        translation: 'Both parts can contain a full clause. / В обеих частях может быть полноценное предложение.',
        note: 'Do not drop the second the.'
      },
      {
        id: 'negative',
        icon: 'N',
        title: 'Comparative + noun',
        formula: 'the + comparative adjective + noun + subject + verb …',
        example: 'The more interesting the class, the more likely students are to learn.',
        translation: 'A comparative adjective can directly modify a noun. / Comparative adjective может стоять перед существительным.',
        note: 'Keep the noun immediately after the comparative adjective when they form one phrase.'
      },
      {
        id: 'question',
        icon: 'more',
        title: 'More / less + adjective',
        formula: 'the more/less + adjective, the more/less + adjective',
        example: 'The more qualified the person, the higher the salary.',
        translation: 'Longer adjectives normally use more/less. / Длинные прилагательные образуют comparative через more/less.',
        note: 'Do not add -er to long adjectives such as qualified or difficult.'
      },
      {
        id: 'short-answer',
        icon: '-er',
        title: 'Short adjective comparatives',
        formula: 'the + adjective-er …, the + adjective-er …',
        example: 'The bigger your house, the longer it takes to clean.',
        translation: 'Short adjectives normally take -er. / Короткие прилагательные обычно получают окончание -er.',
        note: 'Remember spelling changes: big → bigger; early → earlier.'
      }
    ],

    contrast: {
      title: 'This is correlation, not a normal two-item comparison',
      intro: 'The structure means “as X changes, Y changes”. / Конструкция показывает связанность двух изменений.',
      ordinary: {
        label: 'Normal comparative',
        verbs: 'compare A and B',
        affirmative: 'This house is bigger than mine.',
        negative: 'This route is less difficult than the other one.',
        question: 'Is this option better than that one?',
        rule: 'Usually uses than to compare two things.'
      },
      be: {
        label: 'The …, the … pattern',
        verbs: 'connect two changing situations',
        affirmative: 'The bigger the house, the longer it takes to clean.',
        negative: 'The more you rush, the less accurate you become.',
        question: '—',
        rule: 'No than: each half begins with the + comparative.'
      }
    },

    questionBuilder: {
      title: 'Word order / Порядок слов',
      pattern: ['the + comparative', 'subject', 'verb', ',', 'the + comparative', 'subject', 'verb'],
      example: 'The farther north you travel, the colder it gets.',
      translation: 'Each half has its own comparative phrase and clause.',
      note: 'The comparative phrase comes before the subject in each half.'
    },

    memoryRule: {
      title: 'B2 checklist / Проверка',
      steps: [
        'Use the before both comparative phrases.',
        'Choose the normal comparative form: earlier, better, bigger, more difficult, more likely.',
        'Use more/less with long adjectives; use -er with many short adjectives.',
        'Do not use than in this structure.',
        'Read the sentence as “as X changes, Y changes”.'
      ]
    },

    commonMistakes: [
      {
        wrong: 'More you practise, better you get.',
        right: 'The more you practise, the better you get.',
        reason: 'Both comparative phrases require the.'
      },
      {
        wrong: 'The more late you go to bed, the more difficult it is.',
        right: 'The later you go to bed, the more difficult it is.',
        reason: 'Late is a short adjective/adverb, so use later.'
      },
      {
        wrong: 'The more qualified the person, the more high the salary.',
        right: 'The more qualified the person, the higher the salary.',
        reason: 'High forms the comparative higher.'
      },
      {
        wrong: 'The bigger your house than the longer it takes.',
        right: 'The bigger your house, the longer it takes.',
        reason: 'Do not use than in the paired-comparative structure.'
      }
    ],

    quizExercises: [
      {
        title: 'Choose the correct form',
        instructions: 'Choose the natural paired comparative.',
        items: [
          { type: 'single', difficulty: 'Easy', skill: 'Short adjective', prompt: 'The ___ you leave, the less traffic you’ll meet.', options: ['early', 'earlier', 'more early'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Irregular', prompt: 'The more you practise, the ___ you get.', options: ['good', 'better', 'more good'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Long adjective', prompt: 'The ___ the task, the longer it takes.', options: ['difficulter', 'more difficult', 'most difficult'], answer: 1 },
          { type: 'single', difficulty: 'Easy', skill: 'Spelling', prompt: 'The ___ the room, the more people we can invite.', options: ['biger', 'bigger', 'more big'], answer: 1 }
        ]
      },
      {
        title: 'Complete both halves',
        instructions: 'Choose the correct comparative in each gap.',
        items: [
          { type: 'select', difficulty: 'Medium', skill: 'Correlation', prompt: 'The ___ you drive, the ___ the journey becomes.', options: ['faster … shorter', 'fast … short', 'more fast … more short'], answer: 0 },
          { type: 'select', difficulty: 'Medium', skill: 'Long adjective', prompt: 'The ___ the explanation, the ___ people are to remember it.', options: ['clearer … more likely', 'more clear … likelier', 'clearest … most likely'], answer: 0 },
          { type: 'select', difficulty: 'Medium', skill: 'Opposite direction', prompt: 'The more you prepare, the ___ nervous you feel.', options: ['less', 'least', 'little'], answer: 0 },
          { type: 'select', difficulty: 'Medium', skill: 'Irregular', prompt: 'The ___ the weather gets, the ___ I feel.', options: ['worse … worse', 'badder … badder', 'more bad … more bad'], answer: 0 }
        ]
      },
      {
        title: 'Spot the B2 pattern',
        instructions: 'Choose the correct sentence.',
        items: [
          { type: 'select', difficulty: 'Challenge', skill: 'Double the', prompt: 'Choose the correct sentence.', options: ['The more I read, the more I understand.', 'More I read, more I understand.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'No than', prompt: 'Choose the correct sentence.', options: ['The later we leave, the busier the roads will be.', 'The later we leave than the busier the roads will be.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'Comparative noun phrase', prompt: 'Choose the correct sentence.', options: ['The bigger the class, the harder it is to concentrate.', 'The class bigger, the harder it is to concentrate.'], answer: 0 },
          { type: 'select', difficulty: 'Challenge', skill: 'More likely', prompt: 'Choose the correct sentence.', options: ['The more relevant the example, the more likely students are to remember it.', 'The relevanter the example, the likelier students are to remember it.'], answer: 0 }
        ]
      },
      {
        title: 'Build the sentence',
        instructions: 'Put the parts in the correct order.',
        items: [
          { type: 'reorder', difficulty: 'Advanced', skill: 'Word order', prompt: 'you practise / the more / the easier / it becomes', tokens: ['The more', 'you practise', 'the easier', 'it becomes'], answer: 'The more you practise, the easier it becomes.', acceptedAnswers: ['The more you practise, the easier it becomes.', 'The more you practise, the easier it becomes'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Short comparatives', prompt: 'we leave / the earlier / the quieter / the roads will be', tokens: ['The earlier', 'we leave', 'the quieter', 'the roads will be'], answer: 'The earlier we leave, the quieter the roads will be.', acceptedAnswers: ['The earlier we leave, the quieter the roads will be.', 'The earlier we leave, the quieter the roads will be'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'More/less', prompt: 'you worry / the more / you sleep / the less', tokens: ['The more', 'you worry', 'the less', 'you sleep'], answer: 'The more you worry, the less you sleep.', acceptedAnswers: ['The more you worry, the less you sleep.', 'The more you worry, the less you sleep'] },
          { type: 'reorder', difficulty: 'Advanced', skill: 'Comparative phrase', prompt: 'the candidate is / the more qualified / the higher / the salary', tokens: ['The more qualified', 'the candidate is', 'the higher', 'the salary'], answer: 'The more qualified the candidate is, the higher the salary.', acceptedAnswers: ['The more qualified the candidate is, the higher the salary.', 'The more qualified the candidate is, the higher the salary'] }
        ]
      }
    ]
  }
];

// Homework 10: one shared grammar catalogue, no per-lesson scripts.
window.GRAMMAR_DATA.push({
  "id": "grammar-lesson-10-present-perfect-simple-continuous",
  "order": 9,
  "title": "Present perfect simple vs present perfect continuous",
  "level": "B2.1",
  "status": "available",
  "linkedLessonId": "lesson-10",
  "page": "grammar-topic.html?id=grammar-lesson-10-present-perfect-simple-continuous",
  "passScore": 100,
  "overview": {
    "lead": "Оба времени связывают прошлое с настоящим, но смещают внимание: результат / факт против процесса и длительности.",
    "keyRule": "Present Perfect Simple: have/has + V3. Present Perfect Continuous: have/has + been + V-ing. Выбор зависит от смысла и типа глагола.",
    "subjects": [
      "результат и завершённость",
      "процесс и длительность",
      "for / since",
      "How many? / How long?",
      "stative verbs"
    ],
    "example": "I’ve written three emails. / I’ve been writing emails all morning."
  },
  "uses": [
    {
      "icon": "✓",
      "title": "Результат и количество",
      "text": "Simple показывает полученный результат, число завершённых действий или значимый факт.",
      "example": "I’ve taken two tablets today."
    },
    {
      "icon": "↔",
      "title": "Процесс и длительность",
      "text": "Continuous показывает, чем человек занимался в течение периода; действие могло закончиться только что.",
      "example": "I’ve been waiting for the doctor for an hour."
    },
    {
      "icon": "⏱",
      "title": "Продолжительность до настоящего момента",
      "text": "В некоторых контекстах обе формы возможны, но Continuous сильнее акцентирует процесс.",
      "example": "I’ve lived here for five years. / I’ve been living here for five years."
    },
    {
      "icon": "≠",
      "title": "Глаголы состояния",
      "text": "know, believe, own, have (в значении владеть) обычно употребляются в Simple, даже с How long.",
      "example": "I’ve known my doctor for years."
    }
  ],
  "forms": [
    {
      "id": "affirmative",
      "icon": "+",
      "title": "Утверждение",
      "formula": "S + have/has + V3  |  S + have/has been + V-ing",
      "example": "She has recovered. / She has been recovering since Monday.",
      "translation": "Simple: выздоровела; Continuous: процесс восстановления длится.",
      "note": "has — только с he/she/it; have — с I/you/we/they."
    },
    {
      "id": "negative",
      "icon": "−",
      "title": "Отрицание",
      "formula": "S + haven’t/hasn’t + V3  |  S + haven’t/hasn’t been + V-ing",
      "example": "I haven’t slept well. / I haven’t been sleeping well lately.",
      "translation": "Simple: не выспался / не спал хорошо; Continuous: проблемы со сном продолжаются.",
      "note": "Отрицание относится к have/has, а не к V3 или V-ing."
    },
    {
      "id": "question",
      "icon": "?",
      "title": "Вопрос",
      "formula": "Have/Has + S + V3?  |  Have/Has + S + been + V-ing?",
      "example": "Have you called the doctor? / Have you been coughing all day?",
      "translation": "Первый вопрос — о результате звонка, второй — о длительном действии.",
      "note": "В вопросе have/has ставится перед подлежащим."
    },
    {
      "id": "short-answer",
      "icon": "↗",
      "title": "Краткий ответ",
      "formula": "Yes, I have. / No, she hasn’t.",
      "example": "Have you been feeling better? — Yes, I have.",
      "translation": "Краткие ответы строятся одинаково для обеих форм.",
      "note": "В ответе повторяем have/has, не been и не основной глагол."
    }
  ],
  "contrast": {
    "title": "Главное различие: итог или процесс",
    "intro": "Употребление определяется коммуникативным акцентом.",
    "ordinary": {
      "label": "Present Perfect Simple",
      "verbs": "Итог • факт • сколько раз",
      "affirmative": "I’ve finished the report.",
      "negative": "I haven’t finished the report.",
      "question": "Have you finished the report?",
      "rule": "Подходит для результата и количества завершённых действий."
    },
    "be": {
      "label": "Present Perfect Continuous",
      "verbs": "Процесс • длительность • причина видимого результата",
      "affirmative": "I’ve been working all morning.",
      "negative": "I haven’t been working today.",
      "question": "Have you been working all morning?",
      "rule": "Подходит для процесса, который длится или длился до недавнего момента."
    }
  },
  "questionBuilder": {
    "title": "Формула Present Perfect Continuous",
    "pattern": [
      "Subject",
      "have / has",
      "been",
      "V-ing",
      "(for / since / lately)"
    ],
    "example": "She has been feeling dizzy since this morning.",
    "translation": "Она испытывает головокружение с самого утра.",
    "note": "Порядок: подлежащее → have/has → been → глагол с -ing."
  },
  "memoryRule": {
    "title": "Как выбрать время",
    "steps": [
      "Результат или число действий → Simple.",
      "Процесс или длительность → Continuous.",
      "Глагол состояния (know, own, have в значении владения) → обычно Simple.",
      "For + период; since + начальный момент.",
      "Проверить V3 в Simple и been + V-ing в Continuous."
    ]
  },
  "commonMistakes": [
    {
      "wrong": "I have been knowing him for years.",
      "right": "I have known him for years.",
      "reason": "Know — stative verb; обычно не используется в Continuous."
    },
    {
      "wrong": "She has been written three emails.",
      "right": "She has written three emails.",
      "reason": "Для законченного количества используем have/has + V3."
    },
    {
      "wrong": "I have waiting for an hour.",
      "right": "I have been waiting for an hour.",
      "reason": "Continuous требует been + V-ing."
    },
    {
      "wrong": "He has had a fever since three days.",
      "right": "He has had a fever for three days.",
      "reason": "For — период времени; since — точка отсчёта."
    }
  ],
  "quizExercises": [
    {
      "title": "Выбери подходящее время",
      "instructions": "Ориентируйся на результат или процесс.",
      "items": [
        {
          "type": "single",
          "difficulty": "Easy",
          "skill": "Количество",
          "prompt": "I ___ three emails this morning.",
          "options": [
            "have written",
            "have been writing",
            "write"
          ],
          "answer": 0
        },
        {
          "type": "single",
          "difficulty": "Easy",
          "skill": "Видимый результат процесса",
          "prompt": "Why are your hands dirty? — I ___ the car.",
          "options": [
            "have washed",
            "have been washing",
            "washed"
          ],
          "answer": 1
        },
        {
          "type": "single",
          "difficulty": "Easy",
          "skill": "Количество посещений",
          "prompt": "She ___ to the doctor twice this week.",
          "options": [
            "has been going",
            "has gone",
            "goes"
          ],
          "answer": 1
        },
        {
          "type": "single",
          "difficulty": "Easy",
          "skill": "Длительное действие",
          "prompt": "He looks exhausted because he ___ all night.",
          "options": [
            "has studied",
            "has been studying",
            "is studying"
          ],
          "answer": 1
        }
      ]
    },
    {
      "title": "Формы и ограничения",
      "instructions": "Обрати внимание на for/since, глаголы состояния и части составной формы.",
      "items": [
        {
          "type": "select",
          "difficulty": "Medium",
          "skill": "Since",
          "prompt": "I’ve known her ___ 2019.",
          "options": [
            "for",
            "since",
            "during"
          ],
          "answer": 1
        },
        {
          "type": "select",
          "difficulty": "Medium",
          "skill": "Have в значении состояния",
          "prompt": "She ___ this pain for two days.",
          "options": [
            "has had",
            "has been having",
            "have had"
          ],
          "answer": 0
        },
        {
          "type": "select",
          "difficulty": "Medium",
          "skill": "Continuous + been",
          "prompt": "Have you ___ coughing since yesterday?",
          "options": [
            "be",
            "been",
            "being"
          ],
          "answer": 1
        },
        {
          "type": "select",
          "difficulty": "Medium",
          "skill": "Формула",
          "prompt": "They ___ for their test results for three hours.",
          "options": [
            "have been waiting",
            "has been waiting",
            "have waiting"
          ],
          "answer": 0
        }
      ]
    },
    {
      "title": "Тонкие различия B2",
      "instructions": "Выбери фразу, которая соответствует контексту.",
      "items": [
        {
          "type": "select",
          "difficulty": "Challenge",
          "skill": "Результат",
          "prompt": "Which sentence emphasizes a completed result?",
          "options": [
            "I’ve been reading the report.",
            "I’ve read the report."
          ],
          "answer": 1
        },
        {
          "type": "select",
          "difficulty": "Challenge",
          "skill": "Количество",
          "prompt": "Which sentence answers “How many patients?”",
          "options": [
            "She has been seeing patients.",
            "She has seen eight patients."
          ],
          "answer": 1
        },
        {
          "type": "select",
          "difficulty": "Challenge",
          "skill": "Stative",
          "prompt": "Which sentence is normally correct with a stative verb?",
          "options": [
            "I’ve known him for years.",
            "I’ve been knowing him for years."
          ],
          "answer": 0
        },
        {
          "type": "select",
          "difficulty": "Challenge",
          "skill": "Длительность",
          "prompt": "A cough started at 9 a.m. and is still continuing.",
          "options": [
            "I have been coughing since 9 a.m.",
            "I have coughed three times since 9 a.m."
          ],
          "answer": 0
        }
      ]
    },
    {
      "title": "Собери предложение",
      "instructions": "Поставь части предложения в нужном порядке.",
      "items": [
        {
          "type": "reorder",
          "difficulty": "Advanced",
          "skill": "Word order",
          "prompt": "been / have / all day / feeling dizzy / I",
          "tokens": [
            "I",
            "have",
            "been",
            "feeling dizzy",
            "all day"
          ],
          "answer": "I have been feeling dizzy all day.",
          "acceptedAnswers": [
            "I have been feeling dizzy all day.",
            "I have been feeling dizzy all day"
          ]
        },
        {
          "type": "reorder",
          "difficulty": "Advanced",
          "skill": "Result",
          "prompt": "three times / the doctor / has / called / she",
          "tokens": [
            "She",
            "has",
            "called",
            "the doctor",
            "three times"
          ],
          "answer": "She has called the doctor three times.",
          "acceptedAnswers": [
            "She has called the doctor three times.",
            "She has called the doctor three times"
          ]
        },
        {
          "type": "reorder",
          "difficulty": "Advanced",
          "skill": "Duration",
          "prompt": "for two hours / waiting / been / we / have",
          "tokens": [
            "We",
            "have",
            "been",
            "waiting",
            "for two hours"
          ],
          "answer": "We have been waiting for two hours.",
          "acceptedAnswers": [
            "We have been waiting for two hours.",
            "We have been waiting for two hours"
          ]
        },
        {
          "type": "reorder",
          "difficulty": "Advanced",
          "skill": "Stative",
          "prompt": "he / has / for years / known / her",
          "tokens": [
            "He",
            "has",
            "known",
            "her",
            "for years"
          ],
          "answer": "He has known her for years.",
          "acceptedAnswers": [
            "He has known her for years.",
            "He has known her for years"
          ]
        }
      ]
    }
  ]
});
