const {
    mutations,
    SET_CHECKLISTS,
    M_ADD_CHECKLIST,
    M_UPDATE_CHECKLIST,
    M_DELETE_CHECKLIST,

    SET_CHECKLIST_ITEMS,
    M_ADD_CHECKLIST_ITEM,
    M_ADD_CHECKLIST_ITEM_GROUP,
    M_UPDATE_CHECKLIST_ITEM,
    M_DELETE_CHECKLIST_ITEM,

    SET_ACCOUNT_CONFIG,
    M_UPDATE_ACCOUNT_CONFIG,

    SET_DATABASE_SYNCING,
    SET_IS_DATABASE_SYNCED
} = require('../src/store/mutations');

test('SET_CHECKLISTS updates state.checklists', () => {
    const state = {
        checklists:[]
    }

    mutations[SET_CHECKLISTS](
        state, 
        [
            {Id:1, Title:'Placeholder'},
            {Id:2, Title:'Placeholder'},
            {Id:3, Title:'Placeholder'}
        ]
    )

    expect(state.checklists.length).toBe(3);
});

test('M_ADD_CHECKLIST adds an item to state.checklists', () => {
    const state = {
        checklists:[
            {Id:1, Title:'Placeholder'},
            {Id:2, Title:'Placeholder'},
            {Id:3, Title:'Placeholder'}
        ]
    }

    mutations[M_ADD_CHECKLIST](
        state, 
        {Id:4, Title:'Placeholder'}
    )

    expect(state.checklists.length).toBe(4);
});

test('M_UPDATE_CHECKLIST updates the value of an item in state.checklists', () => {
    const state = {
        checklists:[
            {Id:1, Title:'Placeholder'}
        ]
    }

    mutations[M_UPDATE_CHECKLIST](
        state,
        {Id:1, Title:'New Placeholder'}
    )

    expect(state.checklists[0].Title).toBe('New Placeholder')
})

test('M_DELETE_CHECKLIST removes an item from state.checklists', () => {
    const state = {
        checklists:[
            {Id:1, Title:'Placeholder'},
            {Id:2, Title:'Placeholder'}
        ]
    }

    mutations[M_DELETE_CHECKLIST](
        state,
        2
    )
    expect(state.checklists.length).toBe(1);
})

test('SET_CHECKLIST_ITEMS updates state.items', () => {
    const state = {
        items:[]
    }

    mutations[SET_CHECKLIST_ITEMS](
        state,
        [
            {Id:1, Name:'Placeholder'},
            {Id:2, Name:'PLACEHOLDER'},
            {Id:3, Name:'PLACE-HOLDER'}
        ]
    )

    expect(state.items.length).toBe(3);
})

test('M_ADD_CHECKLIST_ITEM adds an item to state.items', () => {
    const state = {
        items: [
            {Id:1, Name:'Placeholder'}
        ]
    }

    mutations[M_ADD_CHECKLIST_ITEM](
        state,
        {Id:2, Name:'Placeholder'}
    )

    expect(state.items.length).toBe(2);
})

test('M_ADD_CHECKLIST_ITEM_GROUP adds a group of items to state.items', () => {
    const state = {
        items: [
            {Id:1, Name:'Placeholder'}
        ]
    }

    mutations[M_ADD_CHECKLIST_ITEM_GROUP](
        state,
        [
            {Id:2, Name:'Placeholder'},
            {Id:3, Name:'Placeholder'}
        ]
    )

    expect(state.items.length).toBe(3);
})


test('M_UPDATE_CHECKLIST_ITEM updates an item in state.items', () => {
    const state = {
        items:[
            {Id:1, Name:'Placeholder'}
        ]
    }

    mutations[M_UPDATE_CHECKLIST_ITEM](
        state,
        {Id:1, Name:'New Placeholder'}
    );

    expect(state.items[0].Name).toBe('New Placeholder');
})

test('M_DELETE_CHECKLIST_ITEM removes an item from state.items', () => {
    const state = {
        items:[
            {Id:1, Name:'Placeholder'},
            {Id:2, Name:'Placeholder'}
        ]
    }

    mutations[M_DELETE_CHECKLIST_ITEM](
        state,
        2
    )

    expect(state.items.length).toBe(1);
});

test('SET_ACCOUNT_CONFIG sets state.accountConfig', () => {
    const state = {
        accountConfig:{}
    }

    mutations[SET_ACCOUNT_CONFIG](
        state,
        {ThemeId:1, Opacity:0}
    )

    expect(state.accountConfig.ThemeId).toBe(1);
    expect(state.accountConfig.Opacity).toBe(false);
})

test('M_UPDATE_ACCOUNT_CONFIG updates state.accountConfig', () => {
    const state = {
        accountConfig:{ThemeId:1}
    }

    mutations[M_UPDATE_ACCOUNT_CONFIG](
        state,
        {ThemeId:2}
    )

    expect(state.accountConfig.ThemeId).toBe(2);
})

test('SET_DATABASE_SYNCING updates state.databaseSyncing', () => {
    const state = {
        databaseSyncing:false
    }

    mutations[SET_DATABASE_SYNCING](
        state,
        true
    );

    expect(state.databaseSyncing).toBe(true);
});

test('SET_IS_DATABASE_SYNCED updates state.isDatabaseSynced', () => {
    const state = {
        isDatabaseSynced:false
    }

    mutations[SET_IS_DATABASE_SYNCED](
        state,
        true
    )

    expect(state.isDatabaseSynced).toBe(true);
})