# Nikita English Space

Student: Nikita  
Level: B2.1  
Coursebook: Outcomes B2, 3rd edition

## Content

The project is a clean copy of the learning-site architecture with no active homework transferred from another student.

Published homework files should be added to `data/lessons/` as `lesson-1.json`, `lesson-2.json`, and so on, then listed in `data/lessons/index.json`.

Vocabulary topics go in `data/vocabulary-data.js`.

Grammar topics go in `data/grammar-data.js`.

All student-facing text should stay in English at B2.1 level.

## Telegram

The requested Telegram topic is:

`https://t.me/c/3975423890/4`

For Telegram Bot API / Supabase setup this means:

`chat_id = -1003975423890`

`message_thread_id = 4`

Run `supabase/telegram-notifications-nikita.sql` in Supabase SQL Editor. It creates or updates the `telegram_recipients` row for `student_id = 'nikita'`.

Reports do not include the student's name. New-homework notifications and completed-homework reports both end with a motivational phrase.
