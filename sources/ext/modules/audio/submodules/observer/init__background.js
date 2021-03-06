sub.init__background = () => {

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//        console.log(request, sender, sendResponse);

        if (sender.id !== browser.runtime.id)
            return;

        if (request.action === sub.actions.set_key) {
            sub.audio_player_keys.push(request.key);
            sub.log('keys', sub.audio_player_keys);
        }
    });

    browser.runtime.onMessageExternal.addListener((
        request, sender, sendResponse
    ) => {
        // Существует ничтожно малая вероятность коллизии (примерно 1:(3*10^64))
        if (request.action === sub.actions.register) {
            const index = sub.audio_player_keys.indexOf(request.key);

            if (index >= 0) {
                let new_key = kk.generate_key(15);
                sub.audio_player_keys[index] = new_key;
                sendResponse(new_key);
            }

            return;
        }

        if (request.action === sub.actions.update) {
            if (sub.audio_player_keys.includes(request.key)) {
                if (!kk.is.o(request.info)) {
                    sub.error('Информация не передана');
                    return;
                }

                const info = request.info;

                if (!kk.is.s(info.performer) || !kk.is.s(info.title)) {
                    sub.error('Отсутсвует необходимая информация');
                    return;
                }

                const separator = mod.options.separator;

                info.performer = core.utils.filter.base(info.performer)
                info.title = core.utils.filter.base(info.title)

                if (ext.options.filters__trash) {
                    info.performer = core.utils.filter.trash(info.performer);
                    info.title = core.utils.filter.trash(info.title);
                }

                info.name = info.performer + ' ' + separator + ' ' + info.title;
//                sub.log(info);
                core.events.on_audio_play.dispatch(info);
            }

            return;
        }
    });
}
