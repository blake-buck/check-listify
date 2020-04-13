<template>
    <div class='Account' v-bind:class='accountConfig.ThemeName'>
        <header class='light'>
            <block-icon-button :clickHandler='toChecklists' icon='keyboard_backspace'></block-icon-button>
            <h1>Account Settings</h1>
        </header>

        <div class='style-rules'>
            <h3>Style Rules</h3>
            <block-select label='Color Theme' placeholder='Choose a color theme' :items='colorThemes' :selectedItem='selectedItem' :selectItem='selectItem'></block-select>
            <block-toggle displayName='Opacity' :toggle='() => editItem(accountConfig, "Opacity", !accountConfig.Opacity)' :isTrue='accountConfig.Opacity'></block-toggle>
            <block-toggle displayName='Line Through' :toggle='() => editItem(accountConfig, "LineThrough", !accountConfig.LineThrough)' :isTrue='accountConfig.LineThrough'></block-toggle>
        </div>

        <div class='change-password'>
            <h3>Change Password</h3>
            <block-input placeholder='Old Password' type='password'></block-input>
            <block-input placeholder='New Password' type='password'></block-input>
            <block-input placeholder='Confirm New Password' type='password'></block-input>
            <block-button displayText='Change Password'></block-button>
        </div>

        <div class='buttons'>
            <block-button displayText='Delete Account' displayType='attention'></block-button>
            <block-button displayText='Logout' displayType='warn'></block-button>
        </div>
        
    </div>
</template>

<style scoped src='./Account.css'></style>

<script src='./Account.js'></script>