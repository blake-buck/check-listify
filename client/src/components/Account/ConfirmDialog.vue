<template>
    <div class='backdrop'>
        <div class='wrapper'>
            <div class='confirm-dialog'>
                <h1>Delete Account?</h1>
                <p>This action can't be reversed.</p>
                <span>
                    <block-button displayText='Cancel' :clickHandler='() => toggleDialog()'></block-button>
                    <block-button displayText='Delete' displayType='attention' :clickHandler='() => deleteAccount()'></block-button>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .backdrop{
        position:fixed;
        left:0px;
        top:0px;
        width:100vw;
        height:100vh;
        background:rgba(0,0,0, .5);
    }

    .wrapper{
        display:flex;
        justify-content: center;
        align-items: center;
        height:100%;
    }

    .confirm-dialog{
        width:100%;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        padding:10px;
        height:30%;
    }

    .dark .confirm-dialog{
        background:#2c2c2c;
    }

    h1{
        font-size:2em;
    }
    p{
        margin:5px;
        font-size:1.5em;
    }
    span{
        /* margin-top:auto; */
        display:flex;
        justify-content:flex-end;
        width:100%;
    }

    span button{
        padding:5px 10px;
        
        margin:5px;
        font-size:1.3em;
    }
</style>

<script>
export default {
    name:'ConfirmDialog',
    props:[
        'toggleDialog',
        'deleteAccount'
    ]
}
</script>