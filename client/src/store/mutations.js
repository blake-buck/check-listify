const SET_CHECKLISTS = 'SET_CHECKLISTS';
const M_ADD_CHECKLIST = 'M_ADD_CHECKLIST';
const M_UPDATE_CHECKLIST = 'M_UPDATE_CHECKLIST';
const M_DELETE_CHECKLIST = 'M_DELETE_CHECKLIST';

const SET_CHECKLIST_ITEMS = 'SET_CHECKLIST_ITEMS';
const M_ADD_CHECKLIST_ITEM = 'M_ADD_CHECKLIST_ITEM';
const M_UPDATE_CHECKLIST_ITEM = 'M_UPDATE_CHECKLIST_ITEM';
const M_DELETE_CHECKLIST_ITEM = 'M_DELETE_CHECKLIST_ITEM';

const SET_ACCOUNT_CONFIG = 'SET_ACCOUNT_CONFIG';
const M_UPDATE_ACCOUNT_CONFIG = 'M_UPDATE_ACCOUNT_CONFIG';

module.exports = {
    SET_CHECKLISTS,
    M_ADD_CHECKLIST,
    M_UPDATE_CHECKLIST,
    M_DELETE_CHECKLIST,

    SET_CHECKLIST_ITEMS,
    M_ADD_CHECKLIST_ITEM,
    M_UPDATE_CHECKLIST_ITEM,
    M_DELETE_CHECKLIST_ITEM,

    SET_ACCOUNT_CONFIG,
    M_UPDATE_ACCOUNT_CONFIG,

    mutations:{
        [SET_CHECKLISTS](state, checklists){
            state.checklists = [...checklists];
            state.checklistsLoaded = true;
        },
        [M_ADD_CHECKLIST](state, checklist){
            state.checklists = [...state.checklists, checklist];
        },
        [M_UPDATE_CHECKLIST](state, updatedList){
            state.checklists = state.checklists.map(checklist => {
                if(checklist.Id === updatedList.Id){
                    return updatedList;
                }
                return checklist;
            });
        },
        [M_DELETE_CHECKLIST](state, id){
            state.checklists = [...state.checklists.filter(checklist => checklist.Id !== id)];
        },



        [SET_CHECKLIST_ITEMS](state, items){
            state.items = [...items];
            state.itemsLoaded = true;
        },
        [M_ADD_CHECKLIST_ITEM](state, item){
            state.items = [...state.items, item];
        },
        [M_UPDATE_CHECKLIST_ITEM](state, updatedItem){
            state.items = state.items.map(item => {
                if(item.Id === updatedItem.Id){
                    return updatedItem;
                }
                return item;
            });
        },
        [M_DELETE_CHECKLIST_ITEM](state, id){
            state.items = state.items.filter(item => item.Id !== id);
        },

        [SET_ACCOUNT_CONFIG](state, config){
            state.accountConfig = accountConfigConversion(config);
            state.accountConfigLoaded = true;
        },

        [M_UPDATE_ACCOUNT_CONFIG](state, config){
            state.accountConfig = config;
        }
    }
}

function accountConfigConversion(config){
    for(let key in config){
        if(key === 'ThemeId'){
            switch(config[key]){
                case 1:
                    config['ThemeName'] = 'light';
                    break;

                case 2:
                    config['ThemeName'] = 'dark';
                    break;
                
                default:
                    config['ThemeName'] = 'light';
                    break;
            }
        }
        else{
            config[key] = config[key] ? true : false;
        }
    }

    return config;
}

// this code proves that I need to fix the capitilization of variables sooner rather than later
