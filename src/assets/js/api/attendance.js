import axios from 'axios'
const baseUrl = 'http://mock.allhome.com.cn/mock/5c8767de2add03001024c363/calendar'

export default {
    attendanceList () {
        return axios(`${baseUrl}/index`)
    }
}