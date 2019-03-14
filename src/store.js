import Vue from 'vue'
import Vuex from 'vuex'
import attendanceApi from '@/assets/js/api/attendance';
Vue.use(Vuex);

const state = {
    attendances: []
};
const mutations = {
    attendances(state, data) {
        state.attendances.push(data);
    }
};
const actions = {
    async attendances({commit}) {
        let {data: {result}} = await attendanceApi.attendanceList();
        commit('attendances', result)
    }
};
export default new Vuex.Store({
    state, 
    mutations, 
    actions,
}) 