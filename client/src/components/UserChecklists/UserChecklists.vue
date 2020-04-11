<template>
    <div class='UserChecklists'>
        <header class='light'>
            <block-icon-button :clickHandler='toAccountPage' icon='settings'></block-icon-button>
            <h1>Checklists</h1>
        </header>
        
        <div class='list-items'>
            <transition-group name='list'>
                <ListItem v-for='checklist in pinnedChecklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
                <ListItem v-for='checklist in checklists' :key='checklist.Id' v-bind:checklist='checklist'></ListItem>
            </transition-group>
            
            
            <transition name='fade'>
                <block-input :shouldAutofocus='true' v-if='displayChecklistTemplate' :blurHandler='blurChecklist' :keyupHandler='keyupChecklist' placeholder='Checklist title'></block-input>
            </transition>
        </div>
        <transition name='fade'>
            <block-fab v-if='!displayChecklistTemplate' :clickHandler='showChecklistTemplate' displayText='Add Checklist'></block-fab>
        </transition>
    </div>
</template>

<style scoped>

    .list-enter-active {
        transition: opacity 0.5s;
    }
    .list-leave-active{
        transition:all 0.5s;
        transform:translateX(60px);
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .fade-enter-active{
        transition: opacity .2s;
    }
    .fade-enter{
        opacity: 0;
    }
    @keyframes fadeIn{
        from {opacity: 0.1;}
        to   {opacity: 1;}
    }
    .UserChecklists{
        /* this gives extra breathing room so the fab doesn't obscure list items */
        padding-bottom:80px;
        animation:fadeIn 0.5s;
    }
    .list-items .ListItem:first-of-type{
        border-top:1px solid gray;
    }

    header{
        display:flex;
        
        align-items: center;
    }

    header h1{
        font-size:2.5em;
        padding:5px;
        margin:5px;
    }

    header.light{
        background:lightgray;
    }

</style>

<script src='./UserChecklists.js'></script>