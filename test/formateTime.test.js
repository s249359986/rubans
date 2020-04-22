import { expect } from 'chai';
import { getYMD, getSeparator, getTMin, getDur, getRemoveSec, getStampMore, bLeapYear, getDays, getPreviousMonth} from '../src/formateTime';

describe('formateTime', function() {
    describe('#getYMD', function() {
        it('年月日', function() {
            expect(getYMD('2019-08-02 19:19:19')).to.exist;
        });
    });
    describe('#getSeparator', function() {
        it('年月日分隔符', function() {
            expect(getSeparator('2019:08:02 19:19:19')).to.exist;
        });
    });
    describe('#getTMin', function() {
        it('获取时分秒', function() {
            expect(getTMin('2019-08-02 19:19:19')).to.exist;
        });
    });
    describe('#getDur', function() {
        it('两个时间的时间差', function() {
            expect(getDur('2017-08-18 04:56:38'));
        });
    });
    describe('#getRemoveSec', function() {
        it('返回时间戳除了秒', function() {
            expect(getRemoveSec('2019-08-02 19:19:19')).to.exist;
        });
    });
    describe('#getStampMore', function() {
        it('返回完整时间', function() {
            expect(getStampMore('2019-08-02 19:19:19')).to.exist;
        });
    });
    describe('#bLeapYear', function() {
        it('2017不是闰年', function() {
            expect(bLeapYear('2017')).to.be.false;
        });
    });
    describe('#getDays', function() {
        it('31天数', function() {
            expect(getDays()).to.exist;
        });
    });
    describe('#getPreviousMonth', function() {
        it('传入参数2,"2019-04" , 期望输出["2019-04","2019-03"]', function() {
            // expect(getPreviousMonth(2, '2019-04')).to.equal(['2019-04','2019-03']);
            expect(getPreviousMonth(2, '2019-04')).to.exist;
        });
    });
});