import { expect } from 'chai';
import { getRealStringLenth, getRandom, formatMoney} from '../src/commonOther';

describe('commonOther', function() {
    describe('#getRealStringLenth', function() {
        it('中文中国返回长度是4', function() {
            expect(getRealStringLenth('中国')).to.equal(4);
        });
        it('英文china返回长度是5', function() {
            expect(getRealStringLenth('china')).to.equal(5);
        });
        it('数字12345返回长度是5', function() {
            expect(getRealStringLenth(12345)).to.equal(5);
        });
        it('混合返回长度是4', function() {
            expect(getRealStringLenth('中s1')).to.equal(4);
        });
    });

    describe('#getRandom', function() {
        it('传入字符串lixiaoyu返回NaN, ', function() {
            expect(getRandom('lixiaoyu')).to.be.NaN;
        });
        it('传入负数 undefined', function() {
            expect(getRandom(-10)).to.be.undefined;
        });
        it('传入数字正确, ', function() {
            expect(getRandom(4)).to.be.ok;
        });
        it('传入数字4得到小于等于4的结果 ', function() {
            expect(getRandom(4)).to.be.at.least(1); // expected 3 to be at least 5
            expect(getRandom(4)).to.be.at.below(5);
        });
    });

    describe('#formatMoney', function() {
        it('传入12345返回长度是12,345.00', function() {
            expect(formatMoney(12345, 2)).to.equal('12,345.00');
        });
    });

});
