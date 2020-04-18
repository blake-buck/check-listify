function initializeGlobalComponents(Vue){
    const BlockButton = require('../blocks/block-button');
    Vue.component('block-button', BlockButton.default);

    const BlockFab    = require('../blocks/block-fab');
    Vue.component('block-fab',    BlockFab.default);

    const BlockInput  = require('../blocks/block-input');
    Vue.component('block-input',  BlockInput.default);

    const BlockListItem = require('../blocks/block-list-item');
    Vue.component('block-list-item', BlockListItem.default);

    const BlockIconButton = require('../blocks/block-icon-button');
    Vue.component('block-icon-button', BlockIconButton.default);

    const BlockSelect = require('../blocks/block-select');
    Vue.component('block-select', BlockSelect.default);

    const BlockSelectItem = require('../blocks/block-select-item');
    Vue.component('block-select-item', BlockSelectItem.default);

    const BlockToggle = require('../blocks/block-toggle');
    Vue.component('block-toggle', BlockToggle.default);
}

module.exports = {
    initializeGlobalComponents
}