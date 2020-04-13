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

        <form class='change-password' v-on:submit='changePassword'>
            <h3>Change Password</h3>
            <span v-if='form.displayMessage'>{{form.displayMessage}}</span>
            <block-input placeholder='Old Password' :value='form.oldPassword' :keyupHandler='($event) => changeForm($event, "oldPassword")' type='password'></block-input>
            <block-input placeholder='New Password' :value='form.newPassword' :keyupHandler='($event) => changeForm($event, "newPassword")' type='password'></block-input>
            <block-input placeholder='Confirm New Password' :value='form.confirmNewPassword' :keyupHandler='($event) => changeForm($event, "confirmNewPassword")' type='password'></block-input>
            <block-button displayText='Change Password'></block-button>
        </form>

        <div class='buttons'>
            <block-button displayText='Delete Account' displayType='attention' :clickHandler='toggleDeleteDialog'></block-button>
            <block-button displayText='Logout' displayType='warn' :clickHandler='logout'></block-button>
        </div>

        <ConfirmDialog v-if='deleteDialogOpen' :toggleDialog='toggleDeleteDialog' :deleteAccount='deleteAccount'></ConfirmDialog>
        
    </div>
</template>

<style scoped src='./Account.css'></style>

<script src='./Account.js'></script>