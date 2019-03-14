<template>
<div>
    <Calendar :attendances="attendances"/>
    <el-button type="text" @click="getAttendances()">add</el-button>
</div>  
</template>
<script>
import Calendar from '@/components/Calendar.vue'
import {mapState} from 'vuex'
import {inspect} from 'util'
export default {
    data() {
        return {
            
        }
    },
    components: {
        Calendar
    },
    computed: {
        ...mapState([
            'attendances'
        ]),
    },
    watch: {
    },
    methods: {
        getAttendances () {
            this.$store.dispatch('attendances');
        }
    },
    mounted() {
        this.getAttendances();
    }
}
</script>
