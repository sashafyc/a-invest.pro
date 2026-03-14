(function(){
  var articles = [
    {slug:'prodazha-biznesa.html', tag:'Продажа бизнеса', title:'Продажа бизнеса: полное руководство', desc:'Как подготовить, оценить и продать бизнес — от первых шагов до закрытия сделки.'},
    {slug:'kak-prodat-biznes.html', tag:'Продажа бизнеса', title:'Как продать бизнес: пошаговая инструкция', desc:'От подготовки документов до закрытия сделки — пошаговый план действий продавца.'},
    {slug:'kak-prodat-biznes-bystro.html', tag:'Продажа бизнеса', title:'Как продать бизнес быстро', desc:'Что делать, чтобы сделка не растянулась на год — руководство для владельца.'},
    {slug:'prodazha-gotovogo-biznesa.html', tag:'Продажа бизнеса', title:'Продажа готового бизнеса: что важно знать', desc:'Что входит в сделку, как проходит передача и какие риски важно учесть.'},
    {slug:'ocenka-biznesa.html', tag:'Оценка бизнеса', title:'Оценка бизнеса: методы и реальная стоимость', desc:'Три метода оценки с примерами из реальных сделок.'},
    {slug:'stoimost-biznesa.html', tag:'Оценка бизнеса', title:'Сколько стоит бизнес: от чего зависит цена', desc:'Почему два бизнеса с одинаковой прибылью стоят по-разному.'},
    {slug:'podgotovka-k-prodazhe.html', tag:'Подготовка к продаже', title:'Подготовка бизнеса к продаже: чеклист', desc:'15 шагов, которые добавляют 20–40% к цене бизнеса.'},
    {slug:'upakovka-biznesa.html', tag:'Подготовка к продаже', title:'Упаковка бизнеса для продажи: что нужно инвестору', desc:'Что покупатель хочет увидеть: финансы, команда, процессы, активы. Примеры из реальных сделок.'},
    {slug:'kak-ya-ne-prodal-biznes-za-27-mln.html', tag:'Кейс', title:'Как я не продал бизнес за 27 млн', desc:'История сорванной сделки: 63 дня переговоров и 4 урока.'},
    {slug:'kassovyj-razryv-kak-zakryt-za-3-dnya.html', tag:'Кейс', title:'Кассовый разрыв: как закрыть за 3 дня', desc:'Кейс: онлайн-школа нашла 1,39 млн скрытых ресурсов внутри бизнеса.'},
    {slug:'kak-kupit-gotovyj-biznes.html', tag:'Покупка бизнеса', title:'Как купить готовый бизнес', desc:'Этапы, риски и что проверять при покупке бизнеса.'},
    {slug:'chastnye-investicii-v-realnyj-sektor.html', tag:'Инвестиции', title:'Частные инвестиции в реальный сектор', desc:'Стоит ли вкладывать в реальный бизнес и как это работает.'},
    {slug:'strategiya-rosta-biznesa.html', tag:'Стратегия', title:'Стратегическое планирование в бизнесе', desc:'Почему бизнес не растёт так быстро, как вы думали.'},
    {slug:'kak-masshtabirovat-biznes.html', tag:'Стратегия', title:'Как масштабировать бизнес', desc:'Рост с 300 тысяч до 10 млн в месяц — система, а не везение.'},
    {slug:'biznes-broker.html', tag:'Бизнес-брокер', title:'Бизнес-брокер: кто это и зачем нужен', desc:'Как работает брокер, где ищет покупателей, сколько стоит и когда без него не обойтись.'},
    {slug:'uslugi-brokera.html', tag:'Бизнес-брокер', title:'Услуги бизнес-брокера: что входит и сколько стоит', desc:'Полный цикл услуг: оценка, упаковка, поиск покупателей, переговоры, due diligence, закрытие.'},
    {slug:'due-diligence.html', tag:'Due Diligence', title:'Due diligence бизнеса: полный гайд', desc:'Комплексная проверка перед покупкой: финансы, юридика, операционка, налоги. Чеклист из 40+ сделок.'},
    {slug:'proverka-biznesa.html', tag:'Due Diligence', title:'Проверка бизнеса перед покупкой: чеклист', desc:'Чеклист из 25 пунктов по 5 направлениям: финансы, юридика, операционка, клиенты, команда.'},
    {slug:'kupit-biznes.html', tag:'Покупка бизнеса', title:'Как купить бизнес: с чего начать', desc:'Пошаговая инструкция покупателя: бюджет, поиск, проверка, переговоры, оформление сделки.'},
    {slug:'kupit-gotovyy-biznes.html', tag:'Покупка бизнеса', title:'Покупка готового бизнеса: этапы сделки', desc:'5 этапов покупки бизнеса: поиск, оценка, переговоры, оформление, передача. Из практики 40+ сделок.'},
    {slug:'nayti-investora.html', tag:'Инвестиции', title:'Как найти инвестора в бизнес', desc:'6 каналов поиска инвестора, подготовка предложения и типичные ошибки предпринимателей.'}
  ];

  var current = location.pathname.split('/').pop();
  var currentArticle = articles.find(function(a){ return a.slug === current; });
  var currentTag = currentArticle ? currentArticle.tag : '';
  var pool = articles.filter(function(a){ return a.slug !== current; });

  // Split into same-tag and other
  var sameTag = pool.filter(function(a){ return a.tag === currentTag; });
  var otherTag = pool.filter(function(a){ return a.tag !== currentTag; });

  // Shuffle each group
  function shuffle(arr){
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  shuffle(sameTag);
  shuffle(otherTag);

  // Pick: prioritize same tag, fill rest from others
  var pick = sameTag.concat(otherTag).slice(0, 3);

  var html = '';
  pick.forEach(function(a){
    html += '<a href="' + a.slug + '" class="rel-card" onclick="if(typeof ym!==\'undefined\')ym(85646347,\'reachGoal\',\'blog_related_click\')">' +
      '<span class="rel-tag">' + a.tag + '</span>' +
      '<div class="rel-title">' + a.title + '</div>' +
      '<p class="rel-desc">' + a.desc + '</p>' +
      '<span class="rel-btn">Читать полностью</span></a>';
  });

  html += '<a href="https://t.me/bizsaler" target="_blank" rel="noopener" class="rel-card rel-tg" onclick="if(typeof ym!==\'undefined\')ym(85646347,\'reachGoal\',\'blog_tg_click\')">' +
    '<span class="rel-tag">Telegram</span>' +
    '<div class="rel-title">Больше статей о продаже бизнеса и еженедельные отчёты</div>' +
    '<p class="rel-desc">Подписывайся на канал — там я рассказываю о внутренних процессах и показываю актуальные проекты.</p>' +
    '<span class="rel-tg-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg> Открыть канал</span>' +
    '</a>';

  var grid = document.querySelector('.related-grid');
  if(grid){
    grid.innerHTML = html;
  }
})();
