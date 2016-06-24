Ext.define('ux.RangeDatefield', {
    extend : 'Ext.Container',
    xtype : 'rangedatefield',
    alternateClassName : 'rangedatefield',
    config : {
        minDate : null,
        maxDate : null,
        title : null,
        view : null,
        checkedEventName : null,
        textfield : null,
        style : 'background-color:white;',
        width : '100%',
        top : 0,
        height : 220,
        hideOnMaskTap : true,
        modal : true,
        layout : 'vbox',
        items : [{
            xtype : 'toolbar',
            docked : 'top',
            style : 'border-radius:0;',
            items : [{
                xtype : 'button',
                iconCls : 'arrow_left',
                handler : function(button) {
                    var me = button.getParent().getParent();
                    me.hide();
                }
            }, {
                xtype : 'button',
                iconCls : 'check',
                right : 0,
                top : 5,
                handler : function(button) {
                    var me = button.getParent().getParent();
                    var timeStr = me.returnValue();
                    var view = me.getView();
                    view.fireEvent(me.getCheckedEventName(), timeStr);
                    me.hide();
                }
            }]
        }, {
            html : '<table style="width:100%;font-size:0.8em;background-color:#6580a5;color:#fff;font-weight:bold;"><tr><td style="width:40%;">年</td><td style="width:30%;">月</td><td style="width:30%;">日</td></tr></table>',
            margin : '10 10 0 10'
        }, {
            layout : 'hbox',
            margin : '0 10 0 10',
            defaults : {
                usePicker : false
            },
            items : [{
                xtype : 'selectfield',
                itemId : 'rangedatefieldYear',
                width : '40%',
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
                            this.setValue(this.getOptions()[0].value);
                            return;
                        }
                        var me = selectfield.getParent().getParent();
console.log("year");
console.log(me)
                        var minDate = me.getMinDate();
                        var maxDate = me.getMaxDate();
                         
                        var MonthF = me.down("#rangedatefieldMonth");
                         
                        var months = [];
                        if(maxDate.getFullYear() == minDate.getFullYear()) {
                            for (var i = minDate.getMonth()+1; i <= maxDate.getMonth()+1; i++) {
                                months.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MonthF.setOptions(months);
                            return;
                        }
                        if(newValue == minDate.getFullYear()) {
                            for (var i = minDate.getMonth()+1; i <= 12; i++) {
                                months.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MonthF.setOptions(months);
                        } else if(newValue == maxDate.getFullYear()) {
                            for (var i = 1; i <= maxDate.getMonth()+1; i++) {
                                months.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MonthF.setOptions(months);
                        } else {
                            for (var i = 1; i <= 12; i++) {
                                months.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MonthF.setOptions(months);
                        }
MonthF.setValue(null);
                    }
                }
            }, {
                xtype : 'selectfield',
                itemId : 'rangedatefieldMonth',
                width : '30%',
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
console.log(newValue);
                            this.setValue(this.getOptions()[0].value);
console.log(this.getOptions()[0]);
console.log(this.getValue());
                            return;
                        }
                        var me = selectfield.getParent().getParent();
console.log("month");
console.log(me) 
                        var minDate = me.getMinDate();
                        var maxDate = me.getMaxDate();
                         
                        var YearF = me.down("#rangedatefieldYear");
                        var DayF = me.down("#rangedatefieldDay");
                         
                        var months = [];
                        var days = [];
                        var hours = [];
                        var mins = [];
                        var seconds = [];
                        if(maxDate.getFullYear() == minDate.getFullYear() && minDate.getMonth() == maxDate.getMonth()) {
                            for (var i = minDate.getDate(); i <= maxDate.getDate(); i++) {
                                days.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            DayF.setOptions(days);
                            return;
                        }
                        if(YearF.getValue() == minDate.getFullYear() && newValue == util.addZero(minDate.getMonth()+1)) {
                            var monthDayNum = me.getMonthDayNumByMonth(YearF.getValue(), newValue);
                            for (var i = minDate.getDate(); i <= monthDayNum; i++) {
                                days.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            DayF.setOptions(days);
                        } else if(YearF.getValue() == maxDate.getFullYear() && newValue == util.addZero(maxDate.getMonth()+1)) {
                            for (var i = 1; i <= maxDate.getDate(); i++) {
                                days.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            DayF.setOptions(days);
                        } else {
                            var monthDayNum = me.getMonthDayNumByMonth(YearF.getValue(), newValue);
                            for (var i = 1; i <= monthDayNum; i++) {
                                days.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            DayF.setOptions(days);
                        }
DayF.setValue(null);
                    }
                }
            }, {
                xtype : 'selectfield',
                itemId : 'rangedatefieldDay',
                width : '30%',
                right : 0,
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
                            this.setValue(this.getOptions()[0].value);
                            return;
                        }
                        var me = selectfield.getParent().getParent();
console.log("day");
console.log(me)     
                         
                        var minDate = me.getMinDate();
                        var maxDate = me.getMaxDate();
                         
                        var YearF = me.down("#rangedatefieldYear");
                        var MonthF = me.down("#rangedatefieldMonth");
                        var DayF = me.down("#rangedatefieldDay");
                        var HourF = me.down("#rangedatefieldHour");
                        var MinuteF = me.down("#rangedatefieldMinute");
                        var secondF = me.down("#rangedatefieldSecond");
                         
                        var months = [];
                        var days = [];
                        var hours = [];
                        var mins = [];
                        var seconds = [];
                        if(maxDate.getFullYear() == minDate.getFullYear() && minDate.getMonth() == maxDate.getMonth() && minDate.getDate() == maxDate.getDate()) {
                            for (var i = minDate.getHours(); i <= maxDate.getHours(); i++) {
                                hours.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            HourF.setOptions(hours);
                            return;
                        }
                        if(YearF.getValue() == minDate.getFullYear() && MonthF.getValue() ==util.addZero(minDate.getMonth()+1) && newValue == util.addZero(minDate.getDate())) {
                     
                            for (var i = minDate.getHours(); i <= 23; i++) {
                                hours.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            HourF.setOptions(hours);
                     
                        } else if(YearF.getValue() == maxDate.getFullYear() && MonthF.getValue() ==util.addZero(maxDate.getMonth()+1) && newValue == util.addZero(maxDate.getDate())) {
                     
                            for (var i = 0; i <= maxDate.getHours(); i++) {
                                hours.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            HourF.setOptions(hours);
                     
                        } else {
                            for (var i = 0; i <= 23; i++) {
                                hours.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            HourF.setOptions(hours);
                        }
HourF.setValue(null);
                    }
                }
            }]
        }, {
            html : '<table style="width:100%;font-size:0.8em;background-color:#6580a5;color:#fff;font-weight:bold;"><tr><td style="width:40%;">时</td><td style="width:30%;">分</td><td style="width:30%;">秒</td></tr></table>',
            margin : '10 10 0 10'
        }, {
            layout : 'hbox',
            margin : '0 10 0 10',
            defaults : {
                usePicker : false
            },
            items : [{
                xtype : 'selectfield',
                itemId : 'rangedatefieldHour',
                width : '40%',
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
                            this.setValue(this.getOptions()[0].value);
                            return;
                        }
                        var me = selectfield.getParent().getParent();
console.log("hour");
console.log(me)
                         
                        var minDate = me.getMinDate();
                        var maxDate = me.getMaxDate();
                         
                        var YearF = me.down("#rangedatefieldYear");
                        var MonthF = me.down("#rangedatefieldMonth");
                        var DayF = me.down("#rangedatefieldDay");
                        var HourF = me.down("#rangedatefieldHour");
                        var MinuteF = me.down("#rangedatefieldMinute");
                        var secondF = me.down("#rangedatefieldSecond");
                         
                        var months = [];
                        var days = [];
                        var hours = [];
                        var mins = [];
                        var seconds = [];
                        if(maxDate.getFullYear() == minDate.getFullYear() && minDate.getMonth() == maxDate.getMonth() && minDate.getDate() == maxDate.getDate() && util.addZero(minDate.getHours()) == util.addZero(maxDate.getHours())) {
                            for (var i = minDate.getMinutes(); i <= maxDate.getMinutes(); i++) {
                                mins.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MinuteF.setOptions(mins);
                            return;
                        }
                        if(YearF.getValue() == minDate.getFullYear() && MonthF.getValue() ==util.addZero(minDate.getMonth()+1) && DayF.getValue() == util.addZero(minDate.getDate()) && newValue == util.addZero(minDate.getHours())) {
                            for (var i = minDate.getMinutes(); i <= 59; i++) {
                                mins.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MinuteF.setOptions(mins);
                             
                        } else if(YearF.getValue() == maxDate.getFullYear() && MonthF.getValue() ==util.addZero(maxDate.getMonth()+1) && DayF.getValue() == util.addZero(maxDate.getDate()) && newValue == util.addZero(maxDate.getHours())) {
                            for (var i = 0; i <= maxDate.getMinutes(); i++) {
                                mins.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MinuteF.setOptions(mins);
                             
                        } else {
                            for (var i = 0; i <= 59; i++) {
                                mins.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            MinuteF.setOptions(mins);
                        }
MinuteF.setValue(null);
                    }
                }
            }, {
                xtype : 'selectfield',
                itemId : 'rangedatefieldMinute',
                width : '30%',
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
                            this.setValue(this.getOptions()[0].value);
                            return;
                        }
                        var me = selectfield.getParent().getParent();
console.log("minute");
console.log(me);    
                         
                        var minDate = me.getMinDate();
                        var maxDate = me.getMaxDate();
                         
                        var YearF = me.down("#rangedatefieldYear");
                        var MonthF = me.down("#rangedatefieldMonth");
                        var DayF = me.down("#rangedatefieldDay");
                        var HourF = me.down("#rangedatefieldHour");
                        var MinuteF = me.down("#rangedatefieldMinute");
                        var secondF = me.down("#rangedatefieldSecond");
                         
                        var months = [];
                        var days = [];
                        var hours = [];
                        var mins = [];
                        var seconds = [];
                        if(maxDate.getFullYear() == minDate.getFullYear() && minDate.getMonth() == maxDate.getMonth() && minDate.getDate() == maxDate.getDate() && util.addZero(minDate.getHours()) == util.addZero(maxDate.getHours()) && util.addZero(minDate.getMinutes()) == util.addZero(maxDate.getMinutes())) {
                            for (var i = minDate.getSeconds(); i <= maxDate.getSeconds(); i++) {
                                seconds.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            secondF.setOptions(seconds);
                            return;
                        }
                        if(YearF.getValue() == minDate.getFullYear() && MonthF.getValue() ==util.addZero(minDate.getMonth()+1) && DayF.getValue() == util.addZero(minDate.getDate()) && HourF.getValue() == util.addZero(minDate.getHours()) && newValue == util.addZero(minDate.getMinutes())) {
                            for (var i = minDate.getSeconds(); i <= 59; i++) {
                                seconds.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            secondF.setOptions(seconds);
                        } else if(YearF.getValue() == maxDate.getFullYear() && MonthF.getValue() ==util.addZero(maxDate.getMonth()+1) && DayF.getValue() == util.addZero(maxDate.getDate()) && HourF.getValue() == util.addZero(maxDate.getHours()) && newValue == util.addZero(maxDate.getMinutes())) {
                            for (var i = 0; i <= maxDate.getSeconds(); i++) {
                                seconds.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            secondF.setOptions(seconds);
                        } else {
                            for (var i = 0; i <= 59; i++) {
                                seconds.push({
                                    text : (i < 10 ? '0' : '') + i,
                                    value : (i < 10 ? '0' : '') + i
                                });
                            }
                            secondF.setOptions(seconds);
                        }
secondF.setValue(null);
                    }
                }
            }, {
                xtype : 'selectfield',
                itemId : 'rangedatefieldSecond',
                width : '30%',
                right : 0,
                listeners : {
                    change : function(selectfield, newValue, oldValue, eOpts) {
                        if(!newValue) {
                            this.setValue(this.getOptions()[0].value);
                            return;
                        }
                    }
                }
            }]
        }, {
            xtype : 'button',
            margin : 10,
            ui : 'decline',
            text : '清空',
            style : 'border-radius:0;',
            handler : function(button) {
                var me = button.getParent();
                me.clearValue();
            }
        }]
    },
    initialize : function() {
        this.callParent();
        this.setRange();
    },
    returnValue : function() {
        var timeStr = this.items.items[2].items.items[0].getValue() + '-' + this.items.items[2].items.items[1].getValue() + '-' + this.items.items[2].items.items[2].getValue() + ' ' + this.items.items[4].items.items[0].getValue() + ':' + this.items.items[4].items.items[1].getValue() + ':' + this.items.items[4].items.items[2].getValue();
        this.getTextfield().setValue(timeStr);
        return timeStr;
        this.hide();
    },
    hide : function() {
        util.clearPopView();
    },
    clearValue : function() {
        this.getTextfield().setValue('');
 
        this.hide();
    },
    setRange : function() {
        var minDate = this.getMinDate();
        var maxDate = this.getMaxDate();
console.log(minDate);
console.log(maxDate);       
         
        Ext.Viewport.getActiveItem().disable();
 
        var yearF = this.down("#rangedatefieldYear");
        var MonthF = this.down("#rangedatefieldMonth");
        var DayF = this.down("#rangedatefieldDay");
        var HourF = this.down("#rangedatefieldHour");
        var MinuteF = this.down("#rangedatefieldMinute");
        var secondF = this.down("#rangedatefieldSecond");
         
        var title = this.getTitle();
        this.items.items[0].setTitle(title);
        this.getTextfield().blur();
        var date = this.getTextfield().getValue();
        var year;
        var month;
        var day;
        var hour;
        var min;
        var second;
        if (date == '') {
            date = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        }
        year = date.substring(0, 4);
        month = date.substring(5, 7);
        day = date.substring(8, 10);
        hour = date.substring(11, 13);
        min = date.substring(14, 16);
        second = date.substring(17, 19);
        var years = [];
        for (var i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
            years.push({
                text : i,
                value : i
            });
        }
        yearF.setOptions(years);
         
        yearF.setValue(year);
 
        MonthF.setValue(month);
 
        DayF.setValue(day);
 
        HourF.setValue(hour);
 
        MinuteF.setValue(min);
         
        secondF.setValue(second);
    },
    getMonthDayNumByMonth : function(year, month) {
        var monthDayNum = 30;
        switch(month) {
        case "01" : 
            monthDayNum = 31;
        break;
        case "02" : //闰年29
            monthDayNum = 28;
        break;
        case "03" : 
            monthDayNum = 31;
        break;
        case "04" : 
            monthDayNum = 30;
        break;
        case "05" : 
            monthDayNum = 31;
        break;
        case "06" : 
            monthDayNum = 30;
        break;
        case "07" : 
            monthDayNum = 31;
        break;
        case "08" : 
            monthDayNum = 31;
        break;
        case "09" : 
            monthDayNum = 30;
        break;
        case "10" : 
            monthDayNum = 31;
        break;
        case "11" : 
            monthDayNum = 30;
        break;
        case "12" : 
            monthDayNum = 31;
        break;
        }
        if(util.isLeapYear(year)) {
            monthDayNum = 29;
        }
        return monthDayNum;
    },
    getAfterOneHourTimeByTime : function(date) {
        var dt = new Date(date);
        var ms = new Date(dt).getTime();
        return new Date(ms + 3600000);
    },
     
    addZero : function(num) {
        return num < 10 ? "0"+num : num;
    },
     
    isLeapYear : function(pYear) {
        if(!isNaN(parseInt(pYear))){
              if((pYear%4==0 && pYear%100!=0)||(pYear%100==0 && pYear%400==0)){
                  return true;
              }
        }
        return false;
    }
});

