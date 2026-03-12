# a-invest.pro — Инструкция для Claude

## Старт каждой сессии

1. Прочитать `_materials/tasklist.md` — таск-лист (единственный источник задач!)
2. Прочитать `_materials/content-guide.md` — контент-план, статусы дистрибуции, площадки
3. Вывести приветствие:

```
A-Invest / a-invest.pro

Прогресс:
- Статей написано: X / 100
- Дистрибуций выложено: Y статей

⚠ Невыложенные дистрибуции: [🗂 из content-guide.md]

Что делаем сегодня?
```

---

## Структура файлов
```
/
├── index.html           — главная страница
├── about.html           — о компании
├── blog.html            — список статей (добавлять карточки сюда)
├── express-ocenka.html  — лендинг «Экспресс-оценка бизнеса»
├── privacy.html         — политика обработки ПД (152-ФЗ)
├── blog/                — папка со статьями
├── Resources/           — изображения (photo.jpeg, logo.png, favicon.png, alexander.jpg, review-*.png)
├── js/                  — скрипты (nav.js, footer.js, related.js, blog-layout.js, send.php)
├── _template.html       — шаблон для новых статей (читать инструкцию внутри — ШАГ 1–5!)
├── _materials/          — рабочие материалы (в .gitignore)
│   ├── brief.md                — общая инфа о проекте
│   ├── content-guide.md        — контент-план + дистрибуция + трекер
│   ├── tg-posts.txt            — посты Telegram-канала
│   ├── konsol-pro-kak-prodat-biznes.md
│   ├── semantic-core.csv
│   └── clusters.csv
├── _distributions/      — файлы для площадок (в .gitignore)
│   └── SLUG/dzen.html, tenchat.txt, spark.html, telegraph.html
├── sitemap.xml
├── robots.txt
└── .htaccess
```

## Деплой
Работа локально → коммит → push в GitHub → Timeweb подтягивает.
Коммитить после каждой сессии. Не накапливать.

---

## Воркфрейм: написание новой статьи

### Шаг 1 — выбрать статью
`_materials/content-guide.md` → первая ⬜ с 🔴 приоритетом.

### Шаг 2 — подготовить материал
- Прочитать TG-посты по теме (`_materials/tg-posts.txt`)
- Выписать цифры, кейсы, формулировки Александра

### Шаг 3 — написать по шаблону
Скопировать `_template.html` → `blog/SLUG.html`. Следовать инструкции (ШАГ 1–5).

### Шаг 4 — чеклист публикации
- [ ] Файл: `blog/SLUG.html`
- [ ] **SEO:** canonical, og:url, schema @id, breadcrumbs — все `https://a-invest.pro/blog/SLUG.html` (с `.html`, без слеша!)
- [ ] Карточка в `blog.html`
- [ ] URL в `sitemap.xml`
- [ ] Перелинковка в 1–2 существующих статьях
- [ ] `js/related.js` — добавить статью в массив articles
- [ ] Статус в `_materials/content-guide.md` → ✅
- [ ] Список статей в `README.md` обновлён
- [ ] Коммит и пуш

### Шаг 5 — дистрибуция
Если статья есть в списке дистрибуции (`content-guide.md` → раздел «Дистрибуция»):
1. Создать `_distributions/SLUG/` с 4 файлами (dzen, tc, spark, tg)
2. Обновить трекер → `🗂`
3. Опубликовать: Telegraph → TenChat → Дзен → Spark (последним)
4. Обновить трекер → `✅` + URL

---

## Опубликованные статьи (13 шт.)
| Файл | Тема |
|------|------|
| `blog/kak-prodat-biznes-bystro.html` | Как продать бизнес быстро |
| `blog/kak-kupit-gotovyj-biznes.html` | Как купить готовый бизнес |
| `blog/kassovyj-razryv-kak-zakryt-za-3-dnya.html` | Кассовый разрыв: закрыть за 3 дня |
| `blog/strategiya-rosta-biznesa.html` | Стратегия роста бизнеса |
| `blog/kak-masshtabirovat-biznes.html` | Как масштабировать бизнес |
| `blog/chastnye-investicii-v-realnyj-sektor.html` | Частные инвестиции в реальный сектор |
| `blog/kak-ya-ne-prodal-biznes-za-27-mln.html` | Кейс: как я не продал бизнес за 27 млн |
| `blog/prodazha-biznesa.html` | Продажа бизнеса: полное руководство |
| `blog/kak-prodat-biznes.html` | Как продать бизнес: пошаговая инструкция |
| `blog/prodazha-gotovogo-biznesa.html` | Продажа готового бизнеса |
| `blog/ocenka-biznesa.html` | Оценка бизнеса |
| `blog/stoimost-biznesa.html` | Стоимость бизнеса |
| `blog/podgotovka-k-prodazhe.html` | Подготовка к продаже |

---

## Текущий план работы

### Контент
- **Цель:** 100 статей за 2–3 месяца
- **Темп:** 2 статьи за итерацию, 10 в неделю
- **Порядок:** сначала 🔴, затем 🟡 (по `content-guide.md`)
- Следующая: #14 `upakovka-biznesa`

### Дистрибуция
- **Параллельно** с написанием статей
- **4 площадки:** Дзен, TenChat, Spark, Telegraph
- **VC:** 1 статья в месяц (апрель — `kak-prodat-biznes`)
- **Habr:** ждём модерации `prodazha-biznesa` (проверить после 2026-03-18), потом решаем
- Всё в `_materials/content-guide.md`

### Типичная итерация
1. Написать 2 статьи (шаг 1–5)
2. Если есть бэклог дистрибуции — дистрибутить 2 статьи
3. Коммит + пуш

---

## Правила

### Общие
- README — живой документ. Обновлять при любых изменениях.
- При работе с Notion — сначала прочитать `notion.md`

### Spark.ru — регламент публикации
1. Claude пишет «залогинься в Spark»
2. Claude заполняет заголовок/текст/ключевые слова через JS
3. Claude зовёт пользователя нажать «Опубликовать»

### Задачи
Все задачи ведутся в `_materials/tasklist.md` — единый источник правды.
4 раздела: Закреплённые / Предстоящие / Отложенные (с датой) / Бэклог.
Выполненные — удалять. Рутину не добавлять. Новые задачи — сразу в tasklist.md.

### Регулярное обслуживание
При каждой новой статье:
- Обновить `llms.txt` (добавить статью в список)
- Обновить `sitemap.xml`

Раз в год (январь):
- Пройтись по всем статьям, обновить «Обновлено: ...» и `dateModified` в schema
- Проверить актуальность цифр и ссылок
