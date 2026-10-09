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
  }
];
