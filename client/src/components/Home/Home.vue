<template>
    <div class='Home light'>
        <header class='light'>
            <div class='links'>
                <span v-on:click='navigateHome'>Home</span>
                <span v-on:click='navigateDemo'>Demo</span>
            </div>

            <block-button :clickHandler='navigateLogin' displayText='Login' displayType='primary'></block-button>
        </header>
        
        <div class='register-blurb'>
            <span>
                <h3>Lightweight, unopinionated task management</h3>
                <p>Check-listify is a simpler way to manage your to-dos. No overcomplicated features, but instead a mobile friendly application that just works. </p>
            </span>
            <block-button displayText='Sign Up' displayType='secondary'></block-button>
        </div>

        <div class='information-blurb'>
            <img src='../../assets/checklist_light.png' alt='img of checklistify checklist page' />
            <span>
                <h3>Track tasks in an uncluttered interface</h3>
                <p>Tasks appear in a list - modify and mark complete in an intutive manner. Interested? Try out our <b v-on:click='navigateDemo'>demo!</b></p>
            </span>
        </div>

        <div class='compare-blurb'>
            <span class='images'>
                <img alt='light mode' src='../../assets/landing_page_light.png' />
                <img alt='dark mode' src='../../assets/landing_page_dark.png'  />
            </span>
            <span>
                <h3>Choose between dark and light themes</h3>
                <p>Prefer working with a darker theme? No problem at all!</p>
            </span>
        </div>

        <div class='information-blurb'>
            <img src='../../assets/landing_page_light.png' alt='img of checklistify checklists list' />
            <span>
                <h3>Work offline with no hiccups</h3>
                <p>Checklists and tasks added offline are automatically synced when you go back online.</p>
            </span>
        </div>
            
    </div>
    
</template>

<style src='./Home.css'></style>

<script src='./Home.js'></script>