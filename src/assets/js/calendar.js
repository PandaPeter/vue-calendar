/**
 * 日历类
 * author: 潘亚楠
 * 根据任意时间戳返回类似windows日历的二维数组 
 */
export default class Calendar {
    constructor(timestamp) {
        this._date = new Date(timestamp);
        this.timestamp = timestamp;//时间戳
        this.year = this._date.getFullYear();//年 （貌似用不到）
        this.month = this._date.getMonth(); //月 默认从0-11
        this.date = this._date.getDate();//日 1-31
        this.day = this._date.getDay();//星期 0-6 0表示星期天
        this.dayTimestamp = 1000 * 60 * 60 * 24; //每天的毫秒数
        this.firstDate = this._getFirstDate();//本月第一天
        this.lastDate = this._getLastDate();//本月最后一天
    }

    /**
     * 获取本月第一天的date对象
     */
    _getFirstDate() {
        let date = this.date,//日
            timestamp = this.timestamp;
        while(date--) {
            timestamp -= this.dayTimestamp;//循环减一天
            if (date == 1) break;
        }
        return new Date(timestamp);
    }

    /**
     * 获取这个月的最后一天的date对象
     */
    _getLastDate() {
        let timestamp = this.timestamp;
        while(true) {
            let tmpDate = new Date(timestamp), //当前循环的时间对象
                tmpMonth = tmpDate.getMonth(); //循环时间对象的月
            if (tmpMonth == this.month) {
                timestamp += this.dayTimestamp; //同月份加一天
            } else {
                timestamp -= this.dayTimestamp;//循环到下个月 则获取前一天
                break;
            }
        }
        return new Date(timestamp);
    }

    /**
     * 填充二维数组模拟日历
     * @return [
     *          [Date1, Date2, Date3....Date7],
     *          [Date1, Date2, Date3....Date7]  
     *         ]
     */
    getCalendar() {
          //顺时针上左->上右->下右->下左
        let {monday: firstMonday, sunday: firstSunday} = this._generatorMondaySunday(this.firstDate), //上左 上右
            {monday: lastMonday} = this._generatorMondaySunday(this.lastDate), //下左 下右
            weeks = [],
            startTimestamp = firstMonday.valueOf(), //第一周的周一时间戳
            tempTimestamp = startTimestamp + this.dayTimestamp * 7, //第二周的周一时间戳
            between = ((lastMonday.valueOf() - firstSunday.valueOf())/this.dayTimestamp -1) / 7; //最后一周和第一周中间隔了几周
            weeks.push(this._generatorWeek(startTimestamp));//第一周
        while(between) {
            //循环生成下一周
            weeks.push(this._generatorWeek(tempTimestamp));
            tempTimestamp = (tempTimestamp + this.dayTimestamp * 7);
            between--;
        }
        weeks.push(this._generatorWeek(lastMonday.valueOf())); // 最后一周
        return weeks;
    }

    /**
     * 
     * @param {Date} _date 
     * 生成一个日期对应本周的周一和周日
     * @return {Object} 
     */
    _generatorMondaySunday(_date) {
        let day = _date.getDay(),//星期
            tempTimestamp1,
            tempTimestamp2,
            timestamp = _date.valueOf();//参数的时间戳
        switch(day) {
            case 0: //周日
                tempTimestamp1 = timestamp - this.dayTimestamp * 6; //周一
                tempTimestamp2 = timestamp;
                break;
            case 1: //周一
                tempTimestamp1 = timestamp;
                tempTimestamp2 = timestamp + this.dayTimestamp * 6;
                break;
            case 2: 
                tempTimestamp1 = timestamp - this.dayTimestamp;
                tempTimestamp2 = timestamp + this.dayTimestamp * 5;
                break;
            case 3: 
                tempTimestamp1 = timestamp - this.dayTimestamp * 2;
                tempTimestamp2 = timestamp + this.dayTimestamp * 4;
                break;
            case 4: 
                tempTimestamp1 = tempTimestamp2 = timestamp + this.dayTimestamp * 3;
                break;
            case 5: 
                tempTimestamp1 = timestamp - this.dayTimestamp * 4;
                tempTimestamp2 = timestamp + this.dayTimestamp * 2;
                break;
            case 6: 
                tempTimestamp1 = timestamp - this.dayTimestamp * 5;
                tempTimestamp2 = timestamp + this.dayTimestamp;
                break;
        }

        return {monday: new Date(tempTimestamp1), sunday: new Date(tempTimestamp2)};
    }

    /**
     * 
     * @param {Number} timestamp 周一时间戳
     * @return {Array} 一周
     */
    _generatorWeek(timestamp) {
        let days = 7,
            arr = [];
        while(days) {
            arr.push(new Date(timestamp));
            timestamp += this.dayTimestamp;
            days--
        }
        return arr;
    }


    



}