<template>
<div class='backdrop' v-if='isSyncing'>
    <div class='dialog' >
        <h3>Syncing with Database</h3>
        <i class='material-icons'>autorenew</i>
    </div>
</div>
</template>

<style scoped>
    div.backdrop{
        position:fixed;
        bottom:0px;
        left:0px;
        width:100%;
        background:rgba(0,0,0,0);
    }
    div.dialog{
        background:rgba(0,0,0, .7);
        color:white;
        display:flex;
        justify-content: center;
        align-items:center;
        max-width:500px;
        margin-left:auto;
        margin-right:auto;
        padding:5px;
    }
    h3{
        font-size:1.5em;
        font-weight:bold;
        margin-right:40px;
    }
    i{
        margin-left:40px;
        font-size:36px;
        animation:rotate 3s infinite;
    }

    @keyframes rotate{
        from {transform: rotate(0deg);}
        to   {transform: rotate(360deg);}
    }

</style>

<script>
export default {
    name:'SyncingDialog',
    computed:{
        isSyncing(){
            return this.$store.getters.getDatabaseSyncing
        }
    }
}
</script>