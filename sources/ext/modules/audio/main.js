mod.dependencies = ['common'];

mod.defaults.options = {
    _: true,
    download_button: true,
    hide_hq_label: true,
    separator: core.utils.choose_a_locale({
        en: '–',
        ru: '—'
    }),
    track_numbers: false // TODO: Номера аудиозаписей в посте
}

mod.init__content = () => {
    if (mod.options._ !== true || !ext.mode)
        return;

    if (ext.mode === 2016) {
        core.events.on_mutation.addListener(mutation => {
            let elements = kk.d.querySelectorAll('.audio_row');

            if (elements.length > 0) {
                let item = mod.registry.update(elements);
            }

            each (kk.d.querySelectorAll('.audio_w_covers'), element => {
                element.classList.remove('audio_w_covers');
            });

            each (kk.d.querySelectorAll('.audio_pl_edit_box'), element => {
                element.classList.add('kzvk-audio-playlist-edit');
            });

        });
    }

    mod.on_loaded.dispatch();
}

mod.init__background = function() {
    if (mod.options._ !== true)
        return;

    mod.on_loaded.dispatch();
}

// TODO: удалять настройки, у которых нет значений по умолчанию? Чтобы не оставался мусор.

// TODO: Опробовать веб-компоненты;
// TODO: Скачивание блоками или всего плейлиста;

//FUTURE: Обнаружение аудиозаписей-клонов;
//FUTURE: Правильный фильтр, чтобы вместо flume не выдавал lumen;
//FUTURE: Фильтры: битрейт, продолжительность, размер файла;

//FUTURE: Определение URL и продолжительности аудиозаписи без информации в DOM (Как?);
//FUTURE: Кнопка в аудио-плеере;
//FUTURE: Пометка уже скачанных аудиозаписей;
