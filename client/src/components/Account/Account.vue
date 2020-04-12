<template>
    <div>
        <h1>Account</h1>
        <p>Color Theme: {{accountConfig.ThemeId}}</p>
        <p v-on:click='editItem(accountConfig, "Opacity", !accountConfig.Opacity)'>Opacity: {{accountConfig.Opacity}}</p>
        <p v-on:click='editItem(accountConfig, "LineThrough", !accountConfig.LineThrough)'>Line Through: {{accountConfig.LineThrough}}</p>
    </div>
</template>

<script src='./Account.js'></script>