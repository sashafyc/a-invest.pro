# Лог ошибок и решений при дистрибуции

> Обновлять при каждой итерации дистрибуции или сложном процессе.
> Цель: минимизация ошибок, ускорение работы, экономия токенов.

---

## Telegraph

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `Document is not focused` при `navigator.clipboard.write()` | JS вызван до того как страница получила фокус | Сначала кликнуть в страницу (computer click), ПОТОМ вызывать clipboard.write() |
| Cmd+V не вставляет в тело — плейсхолдер "Your story..." остаётся | Фокус не попал в body-элемент | Кликнуть прямо на текст плейсхолдера "Your story...", затем Cmd+V |
| `await` в JS tool вызывает SyntaxError | JS tool не поддерживает top-level await | Использовать `.then()` вместо `await` |
| URL остаётся сломанным после EDIT | Telegraph не меняет URL при редактировании — URL фиксируется при первом PUBLISH | Если первый publish создал мусорный URL (из-за слипшихся полей), НЕЛЬЗЯ исправить через EDIT. Нужно создать новую страницу с нуля |
| Title/Author/Body слипаются при вводе | Ввод title → клик в author → клик в body: контент первого поля «уезжает» в следующее | Вводить title, убедиться что курсор В title (скриншот), потом author, потом body. НЕ торопиться |

### Рабочий алгоритм Telegraph
1. Открыть `telegra.ph` → кликнуть "Your story..." → Title = `[data-placeholder="Title"]`
2. Author = `[data-placeholder="Your name"]` → ввести "Александр Неделюк"
3. Кликнуть в body `.ql-editor`
4. JS: `navigator.clipboard.write([new ClipboardItem({'text/html': new Blob([html], {type:'text/html'})})]).then(...)`
5. Кликнуть в body ещё раз (фокус!)
6. Cmd+V → проверить скриншотом
7. Кнопка PUBLISH → подтвердить

---

## TenChat

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `/post/create` возвращает 404 | Неверный URL | Правильный URL: `tenchat.ru/editor` (через кнопку "+") |
| Текст уходит не в body а в title | Фокус остался в title после ввода | Кликнуть ниже тулбара, в область body, ПЕРЕД набором текста |
| Title > 80 символов | TenChat лимит 80 символов | Укоротить заголовок заранее |
| Хэштег `#предпринимательство` автозаменяется на `#предпринимательствоспб` | TenChat показывает выпадающее меню автодополнения хэштегов и подставляет первый вариант | После ввода хэштегов нажать Escape ДО клика куда-либо, чтобы закрыть автодополнение |

### Рабочий алгоритм TenChat
1. Перейти на `tenchat.ru` → кнопка "+" → открывается `/editor`
2. Ввести заголовок (до 80 символов)
3. Кликнуть в body (ниже тулбара)
4. Тип: `type` action с текстом поста
5. Опубликовать

---

## Дзен

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `dzen.ru/editor` → открывает канал «Редактор», НЕ редактор статей | URL ведёт на чужой канал | **Всегда** начинать с `dzen.ru/a-invest.pro` → кнопка создания |
| `dzen.ru/editor/new` → 404 | Прямой URL не существует | Только через `dzen.ru/a-invest.pro` |
| `studio.dzen.ru` → ошибка / не грузится | Студия нестабильна | Использовать `dzen.ru/a-invest.pro` как точку входа |
| `/suite/editor/new-post` и аналоги → 404 | Дзен не поддерживает прямые URL для создания | Идти через `dzen.ru/a-invest.pro` → создать публикацию |
| Кнопка "Опубликовать" в модалке не кликается по координатам | Баннер Claude перекрывает нижнюю часть экрана | Использовать JS: `document.querySelectorAll('button')` → найти по тексту → `.click()` |
| `type` action вставляет текст без пробелов | Draft.js не обрабатывает пробелы из `type` корректно | Для заголовка: `document.execCommand('insertText', false, 'текст')` через JS (focus на editors[0]) |
| Буфер обмена (Cmd+V) вставляет в неверное поле | Фокус был не в body а в title или вне редактора | Кликнуть в body ПЕРЕД загрузкой буфера, затем ещё раз после загрузки |
| Белый экран после paste | Рендер Draft.js сломался | Перезагрузить страницу (navigate), черновик автосохранён |
| Paste через Cmd+V не вставляет в body (клик по координатам) | Фокус не попадает в body через обычный клик | Использовать JS: `editors[1].focus(); editors[1].click();` ПЕРЕД Cmd+V |
| Кнопка «Опубликовать» в модалке не кликается по координатам (баннер Claude) | Баннер перекрывает | Использовать JS: `buttons.filter(b => b.text === 'Опубликовать')[1].click()` — index [1] = кнопка в модалке |
| `await` в JS tool | Top-level await не поддерживается | `.then()` вместо `await` |

### Рабочий алгоритм Дзен
1. **Всегда** начинать с `dzen.ru/a-invest.pro` → кликнуть иконку карандаша справа от «Продвигать канал» → откроется `dzen.ru/profile/editor/a-invest.pro` (Дзен-студия) → кнопка «+» в хедере справа для создания публикации
2. **Заголовок через JS** (НЕ type action!):
   ```js
   const editors = document.querySelectorAll('.notranslate.public-DraftEditor-content');
   editors[0].focus();
   document.execCommand('insertText', false, 'Заголовок');
   ```
3. Кликнуть в body (editors[1] или координаты ниже заголовка)
4. Загрузить буфер:
   ```js
   navigator.clipboard.write([new ClipboardItem({'text/html': new Blob([html], {type:'text/html'})})]).then(...)
   ```
5. Кликнуть в body ещё раз (фокус!)
6. Cmd+V
7. Проверить скриншотом (прокрутить вверх!)
8. **Публикация через JS** (2 шага):
   - Первый клик: `buttons.find(b => b.text === 'Опубликовать').click()` — открывает модалку
   - Второй клик: найти кнопку с `rect.y > 600` и текстом "Опубликовать" → `.click()`

---

## Spark

| Ошибка | Причина | Решение |
|--------|---------|---------|
| Claude не может залогиниться | Auth через chrome-extension, сессия протухает при долгом простое | Пользователь логинится → Claude заполняет и публикует быстро в одном проходе |
| Сессия протухает между статьями | Долгий простой, навигация на 404-страницы (/post/create, /add) | НЕ переходить на несуществующие URL. Использовать только кнопку карандаша в хедере |
| `/post/create` и `/add` → 404 | Spark не поддерживает прямые URL для создания поста | Кнопка карандаша в хедере (зелёная) → открывает `/write/1/{id}` |
| Кнопка "Опубликовать" — не `<button>` | Это `<div class="post-form__submit">` | `document.querySelector('.post-form__submit').click()` |
| `.post-form__submit.click()` открывает новый пустой таб вместо публикации | JS click на этот div ведёт себя иначе чем реальный клик | Кликать по реальной кнопке «Опубликовать» внизу страницы через `computer left_click` по координатам, НЕ через JS |
| Spark разлогинивает пока Claude ищет кнопки и делает скриншоты | Сессия протухает за секунды | Заполнять ВСЁ одним JS вызовом (setVal + editor.render), потом СРАЗУ click Опубликовать — максимум 2 action'а после логина |

### Рабочий алгоритм Spark (МАКСИМАЛЬНАЯ СКОРОСТЬ — сессия протухает за секунды!)
1. Пользователь логинится на spark.ru → переключает на «личный блог» (или «А-Инвест» — чередование) → говорит «готово»
2. Кликнуть зелёный карандаш в хедере (~893, 27) → открывается `/write/1/{id}`
3. **СРАЗУ** один JS вызов — заполнить ВСЁ:
   ```js
   function setVal(el, value) {
     const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
     const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
     setter.call(el, value);
     el.dispatchEvent(new Event('input', { bubbles: true }));
     el.dispatchEvent(new Event('change', { bubbles: true }));
   }
   setVal(document.querySelector('input[name="title"]'), 'ЗАГОЛОВОК');
   setVal(document.querySelector('textarea[name="subtitle"]'), 'SUBTITLE');
   setVal(document.querySelector('input[name="tags"]'), 'теги через запятую');
   window.editor.render({blocks: [...]});
   ```
4. **СРАЗУ** scroll вниз → клик по кнопке «Опубликовать» (синяя кнопка внизу страницы, ~345, 293 от низа) — НЕ через JS `.click()`, а через `computer left_click`!
5. **НЕ делать лишних скриншотов** между шагами 2-4. Максимум 3 действия: карандаш → JS fill → scroll+click publish
6. **ВАЖНО:** `.post-form__submit.click()` через JS НЕ работает (открывает пустой таб). Только реальный клик по видимой кнопке «Опубликовать»

---

## Деплой (Timeweb)

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `rsync exit code 11` — unexpected end of file | Путь `~/a-invest.pro/public_html/` не существует на сервере | Правильный путь: `~/a-invest/public_html/` (без `.pro`) |
| `scp: dest open "a-invest.pro/public_html/blog/": No such file or directory` | Та же причина — неверный путь | `~/a-invest/public_html/` |

### Рабочий алгоритм деплоя (rsync)
```
cd "/Users/sashafyc/Desktop/A-INVEST/Сайт" && rsync -avz --delete -e "ssh -o ConnectTimeout=30 -o ServerAliveInterval=15" ./ cy95045@vh432.timeweb.ru:~/a-invest/public_html/
```
**ВАЖНО:** путь на сервере `~/a-invest/public_html/` — НЕ `~/a-invest.pro/`

---

## Общие правила
- **`type` action** — ненадёжна для кириллицы с пробелами в Draft.js/React → использовать `execCommand('insertText')` или clipboard
- **`await`** — не работает в JS tool → всегда `.then()`
- **Модальные кнопки** — всегда кликать через JS `.click()`, не по координатам (баннер Claude мешает)
- **После paste** — всегда делать скриншот для верификации
- **Порядок площадок:** Telegraph → TenChat → Дзен → VC → Habr → Spark (последним)
