<template>
    <div class='Account' v-bind:class='accountConfig.ThemeName'>
        <header class='light'>
            <block-icon-button :clickHandler='toChecklists' icon='keyboard_backspace'></block-icon-button>
            <h1>Account Settings</h1>
        </header>

        <block-select label='Color Theme' placeholder='Choose a color theme' :items='colorThemes' :selectedItem='selectedItem' :selectItem='selectItem'></block-select>
        <block-toggle displayName='Opacity' :toggle='() => editItem(accountConfig, "Opacity", !accountConfig.Opacity)' :isTrue='accountConfig.Opacity'></block-toggle>
        <block-toggle displayName='Line Through' :toggle='() => editItem(accountConfig, "LineThrough", !accountConfig.LineThrough)' :isTrue='accountConfig.LineThrough'></block-toggle>
    </div>
</template>

<style scoped src='./Account.css'></style>

<script src='./Account.js'></script>