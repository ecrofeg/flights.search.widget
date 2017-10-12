<div style="text-align: center"><img width="200" src="http://mjolnir.com.ua/kcfinder/upload/images/logo.jpg"></div>

# Airlines Search Widget

## Установка виджета

Для работы виджета необходимо любым удобным способом подключить на страницу файлы из папки `dist`:
* файл стилизации виджета: `airlines.search.widget.min.css`
* файл с JavaScript-кодом виджета: `airlines.search.widget.min.js`
* в той же папке, где будет расположен файл стилизации, следует разместить папку `images`, необходимую для корректного отображения изображений

## Инициализация виджета на странице

При подключении файла `airlines.search.widget.min.js`, на странице становится доступен JavaScript-объект `AirlinesSearchWidget` с единственным методом `init`, запускающим инициализацию виджета:

```html
<div id="root"></div>
<link rel="stylesheet" href="airlines.search.widget.min.css">
<script src="airlines.search.widget.min.js"></script>
<script>
    AirlinesSearchWidget.init({
        baseURL: 'http://widget.mlsd.ru',
        rootElement: document.getElementById('root'),
        locale: 'ru'
    });
</script>
```

Также, пример инициализации виджета приведен в файле `/dist/index.html`.

## Конфигурация

В метод `init` передается объект конфигурации виджета. Возможные параметры конфигурации:

| Название параметра | Обязательный параметр | Тип значения | Значение по умолчанию | Описание |
| :- | :- | :- | :- | :- |
| **baseURL** | **да** | `string` | - | URL системы бронирования (необходим для редиректа на страницу поиска) |
| **nemoURL** | **да** | `string` | - | URL системы бронирования `Nemo.travel` (необходим для утилитарных запросов) |
| **rootElement** | **да** | `HTMLElement` | - | DOM-элемент в который будет встраиваться виджет |
| autoFocusArrivalAirport | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора аэропорта прилета, после выбора аэропорта вылета. |
| autoFocusReturnDate | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора обратной даты, после выбора даты вылета. |
| locale | - | `string` | `"en"` | Язык интерфейса |
| mode | - | `string` | `"NEMO"` | Название системы бронирования, с которой предстоит работать (`NEMO` или `WEBSKY`) |
| readOnlyAutocomplete | - | `boolean` | `false` | Запретить ввод текста в поля автокомплита аэропортов (активируется только если указан параметр `routingGrid`) |
| routingGrid | - | `string` | `null` | Двухбуквенный IATA-код авиакомпании. Если указан, автокомплит аэропортов переключается в режим поиска по маршрутной сетке авиакомпании. Также, при клике в поле автокомплита, отображаются все возможные пункты назначений авиакомпании. |
| verticalForm | - | `boolean` | `false` | Отображать ли принудительно вертикальную форму поиска, вместо горизонтальной. |

## Команды для разработки

* `npm run build` — генерирует минифицированные CSS и JavaScript пакеты в папку `/dist/`
* `npm run build-dev` — генерирует полноразмерные CSS и JavaScript пакеты, и Webpack начинает отслеживать изменения в файлах (`watch: true`)
* `npm run server` — запускает Express-сервер в корне проекта и сразу же открывает браузер на `http://localhost:5555`
* `npm run dev` — **использовать для разработки**: запускает Express-сервер, открывает браузер и запускает Webpack в `dev` режиме (аналогично `npm run server && npm run build-dev`)
