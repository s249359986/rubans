import { expect } from 'chai';
import { bUndefined, bNull, bNaN, bNumber, bBooleanType, bStringType, bEmptyObject, bArray, bArrayLike, getTrim, callApp } from '../src/commonData';

describe('commonData', function() {
    describe('#bUndefined', function() {
        it('undefined返回true', function() {
            expect(bUndefined(undefined)).to.be.true;
        });
        it('Object不是undefined', function() {
            expect(bUndefined('Object')).to.be.false;
        });
    });
    describe('#bNull', function() {
        it('传入0不是Null', function() {
            expect(bNull('0')).to.not.be.ok;
        });
        it('传入undefined不是Null', function() {
            expect(bNull('undefined')).to.not.be.ok;
        });
        it('{a:1}是对象不是Null', function() {
            expect(bNull({a:1})).to.be.false;
        });
        it('null是Null', function() {
            expect(bNull(null)).to.be.true;
        });
    });
    describe('#bNaN', function() {
        it('0/0是NAN', function() {
            expect(bNaN(0/0)).to.be.true;
        });
        it('{0/1不是NAN', function() {
            expect(bNaN(0/1)).to.be.false;
        });
    });

    describe('#bNumber', function() {
        it('1是数字', function() {
            expect(bNumber(1)).to.be.true;
        });
        it('"1"不是数字', function() {
            expect(bNumber('1')).to.be.false;
        });
    });

    describe('#bBooleanType', function() {
        it('!0是true,布尔类型', function() {
            expect(bBooleanType(!0)).to.be.true;
        });
        it('1不是布尔类型', function() {
            expect(bBooleanType(1)).to.be.false;
        });
    });

    describe('#bStringType', function() {
        it('"lixiaodian"是字符串', function() {
            expect(bStringType('lixiaodian')).to.be.true;
        });
        it('[1, 2, 3]不是字符串', function() {
            expect(bStringType([1, 2, 3])).to.be.false;
        });
    });
    
    describe('#bEmptyObject', function() {
        it('{}是空对象', function() {
            expect(bEmptyObject(
                {}
            )).to.be.ok;
        });
        it('{a: 2}不是空对象', function() {
            expect(bEmptyObject(
                {a: 2}
            )).to.not.be.ok;
        });
    });

    describe('#bArray', function() {
        it('[1,2,3,4]是数组', function() {
            expect(bArray([1,2,3,4])).to.be.true;
        });
        it('{a:1, b:2, c:3, d:4}不是数组', function() {
            expect(bArray({a:1, b:2, c:3, d:4})).to.be.false;
        });
    });

    describe('#bArrayLike', function() {
        it('{\'1\':\'gg\',\'2\':\'love\',\'4\':\'meimei\',length:5}是类数组', function() {
            expect(bArrayLike({'1':'gg','2':'love','4':'meimei',length:5})).to.be.true;
        });
        it('{\'1\':2}不是数组', function() {
            expect(bArrayLike({'1':2})).to.be.false;
        });
    });

    describe('#getTrim', function() {
        it('aabbcc 清除了空格', function() {
            expect(getTrim('aabbcc   ')).to.equal('aabbcc');
        });
        it('   aaa  bbb  ccc   没有清除了空格', function() {
            expect(getTrim('   aaa  bbb  ccc  ')).to.not.equal('aaabbbccc');
        });
    });

    describe('#callApp', function() {
        it('传入字符串schema数字timeOut返回Promise对象 ', function() {
            expect(callApp('cmbmobilebank://',0).catch(()=>{
                return 'false'
            })).to.exist
        });
        it('传入字符串schema返回Promise对象 ', function() {
            expect(callApp('cmbmobilebank://').catch(()=>{
                return 'false'
            })).to.exist
        });
    });

});