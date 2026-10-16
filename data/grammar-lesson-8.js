(() => {
  const topics = Array.isArray(window.GRAMMAR_DATA) ? window.GRAMMAR_DATA : [];

  const add = (topic) => {
    if (!topics.some((existing) => existing.id === topic.id)) topics.push(topic);
  };

  add({
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
  });

  add({
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
  });

  window.GRAMMAR_DATA = topics;
})();
