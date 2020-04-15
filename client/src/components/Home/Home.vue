<template>
    <div class='Home'>
        <header class='light'>
            <div class='links'>
                <span v-on:click='navigateHome'>Home</span>
                <span v-on:click='navigateDemo'>Demo</span>
            </div>

            <block-button :clickHandler='navigateLogin' displayText='Login' displayType='primary'></block-button>
        </header>
        

        <div class='information-blurb'>
            <img src='../../assets/checklist_light.png' alt='img of checklistify checklist page' />
            <h3>Track tasks in an uncluttered interface</h3>
        </div>

        <div class='information-blurb'>
            <img src='../../assets/landing_page_light.png' alt='img of checklistify checklists list' />
            <h3>Work offline with no hiccups</h3>
        </div>

        <div class='compare-blurb'>
            <span>
                <img alt='light mode' src='../../assets/landing_page_light.png' />
                <img alt='dark mode' src='../../assets/landing_page_dark.png'  />
            </span>
            <h3>Choose between dark and light themes</h3>
        </div>
            
    </div>
    
</template>

<style src='./Home.css'></style>

<script src='./Home.js'></script>