<template>
    <div class='Home light'>
        <header class='light'>
            <div class='links'>
                <span v-on:click='() => navigateTo("/")'>Home</span>
                <span v-on:click='() => navigateTo("/demo")'>Demo</span>
            </div>

            <block-button :clickHandler='() => navigateTo("/login")' displayText='Login' displayType='primary'></block-button>
        </header>
        
        <div class='register-blurb light'>
            <span>
                <h3>Lightweight, unopinionated task management</h3>
                <p>Check-listify is a mobile friendly application that just works. If you're tired of dealing with complicated task management software, Check-listify presents a simpler alternative. </p>
            </span>
            <block-button displayText='Sign Up' displayType='secondary' :clickHandler='() => navigateTo("/register")'></block-button>
        </div>

        <div class='information-blurb'>
            <img src='../../assets/checklist_light.png' alt='img of checklistify checklist page' />
            <span>
                <h3>Track tasks in an uncluttered interface</h3>
                <p>Tasks appear in a list - modify and mark complete in an intutive manner. Interested? Try out our <b v-on:click='() => navigateTo("/demo")'>demo!</b></p>
            </span>
        </div>

        <div class='compare-blurb'>
            <span class='images'>
                <img alt='light mode' src='../../assets/landing_page_light.png' />
                <img alt='dark mode' src='../../assets/landing_page_dark.png'  />
            </span>
            <span>
                <h3>Choose between dark and light themes</h3>
                <p>Prefer working with a darker theme? Check-listify gives you that option.</p>
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

<style scoped src='./Home.css'></style>

<script src='./Home.js'></script>