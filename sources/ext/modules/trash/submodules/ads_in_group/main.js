sub.init__content = () => {
    if (ext.mode === 2016) {
        core.events.on_mutation.addListener(() => {
            if (mod.options.ads_in_group) {
                //let area = ext.dom.content ? ext.dom.content : document;

                each ('.wall_module .wall_marked_as_ads', target => {
                    let block = kk.find_ancestor(target, '.page_block');
                    mod.drop(block);
                });
            }
        });
    }
}

//sub.init__background = () => {}
