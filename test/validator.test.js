import { expect } from 'chai';
import { bTel, bPhone, b58Phone, bMail, bIP, bIdCard, bRegisterUserName, bName, bCarNum, bPwd } from '../src/validator';

describe('validator', function() {
    describe('#bTel', function() {
        it('电话号码格式必须是3-4位区号接7-8位数字', function() {
            expect(bTel('010-8888888')).to.be.true;
        });
    });

    describe('#bPhone', function() {
        it('手机号必须是11位数字且是合法的运营商号段', function() {
            expect(bPhone('13611111111')).to.be.true;
        });
    });
  

    describe('#bMail', function() {
        it('123abc@test.com应该返回true', function() {
            expect(bMail('123abc@test.com')).to.be.true;
        });
    });

    describe('#bIP', function() {
        it('10.252.2.221应该返回true', function() {
            expect(bIP('10.252.2.221')).to.be.true;
        });
    });

    describe('#bIdCard', function() {
        it('如果30个字符身份证应该返回true', function() {
            expect(bIdCard('232326199311253846')).to.be.true;
        });
    });

    describe('#bName', function() {
        it('只支持20个汉字内应该返回true', function() {
            expect(bName(
                '李小点',
                '2',
                '20'
            )).to.be.true;
        });
    });
    
    describe('#bCarNum', function() {
        it('京A89819应该返回true', function() {
            expect(bCarNum('京A89819')).to.be.true;
        });
    });

    describe('#bPwd', function() {
        it('6-14位字符应该返回true', function() {
            expect(bPwd('224365')).to.be.true;
        });
    });

    describe('#bRegisterUserName', function() {
        it('l224365以字母开头的5-20个，可带数字、“_”、“.”的字串 ', function() {
            expect(bRegisterUserName('l224365')).to.be.true;
        });
    });

});
