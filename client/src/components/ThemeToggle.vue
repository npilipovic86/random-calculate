<template>
    <div class="switch-wrapper">
        <label class="switcher">
          <input type="checkbox" :checked="(theme === 'light') ? 'checked' : false" @change="$emit('toggleTheme')" >
          <span class="switch-left">day</span>
          <span class="switch-right">ngt</span>
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ThemeToggle extends Vue {
 @Prop({type: String, default: ''}) theme: string
}
</script>
