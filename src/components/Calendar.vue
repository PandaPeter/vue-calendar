<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple">
                <el-container>
                    <el-header height="">
                        <h2>日历展示</h2>
                    </el-header>
                    <el-main height="">
                        
                        <div v-for="(calendar, index) in calendars" :key="index">
                            <h4>{{ formatDate(calendar._date) }}</h4>
                            <div class="week-container ">
                                <div v-for="(day, index) in WEEK" :key="index">
                                    <span class="date-item">{{ day }}</span>
                                </div>
                            </div>
                            <div class="week-container"  v-for="(week, i) in calendar.getCalendar()" :key="i">
                                <div v-for="(date, j) in week" :key="j">
                                    <span class="date-item" v-if="calendar.attendance[formatDate(date)]" style="color: red">{{ date.getDate()  }}</span>
                                    <span class="date-item" v-else>{{ date.getDate() }}</span>
                                </div>
                            </div>
                        </div>
                    </el-main>
                </el-container>
            </div>
            </el-col>
    </el-row>
</template>
<script>
import Calendar from '@/assets/js/calendar.js';
import moment from 'moment';
export default {
    props: ['attendances'],
    data() {
        return {
            WEEK: ['周一','周二','周三','周四','周五','周六','周日'],
            calendars: [
                
            ],
        }
    },
    computed: {
        
    },
    methods: {
        formatDate(_date) {
            return  moment(_date).format('YYYY-M-D');
        }
    },
    watch: {
        attendances(value) {
            let attendance = value[value.length - 1];
            let [key]  = Object.keys(attendance);
            let timestamp = moment(key).valueOf();
            let c = new Calendar(timestamp);
            c.attendance = attendance;
            this.calendars.push(c);
        }
    },
    mounted() {
        
    }

}
</script>
<style lang="scss" scoped>
.week-container{
    display: flex;
    justify-content: space-around;
    > div {
        height: 3em;
        width: 3em;
        text-align: center;
        line-height: 3em;
    }
}

</style>

