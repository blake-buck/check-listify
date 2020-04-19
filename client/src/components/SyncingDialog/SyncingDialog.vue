<template>
    <div class='backdrop' v-if='isSyncing'>
        <div class='dialog'>
            <h3>Syncing with Database</h3>
            <i class='material-icons'>autorenew</i>
        </div>
    </div>
</template>

<style scoped>
    div.backdrop{
        position:fixed;
        top:0px;
        left:0px;
        width:100vw;
        height:100vh;
        display:flex;
        justify-content: center;
        align-items: center;
        background:rgba(0,0,0, 0.1);
    }
    div.dialog{
        width:100%;
        max-width:500px;
        background:gray;
        display:flex;
        flex-direction: column;
        align-items: center;
        padding:20px;
    }
    h3{
        font-size:1.5em;
        font-weight:bold;
        text-align: center;
    }
    i{
        font-size:150px;
        margin:20px;
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