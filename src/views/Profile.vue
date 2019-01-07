<template>
    <div>
    <v-container>
        <ul v-for="(value, key) in user" :key="key">
            <li>{{ key }}: {{ value }}</li>
        </ul>
    </v-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
      ...mapGetters({
        'user':'auth/user'
      }),
    }
}
</script>
