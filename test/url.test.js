import { expect } from 'chai';
import { getParams} from '../src/url';

describe('url', function() {
    describe('#getParams', function() {
        it('返回值是个json对象 ', function() {
            expect(
                getParams(
                    'https://suyun.daojia.com/pages/new?name=L&return_url=/page/new'
                )
            ).to.exist;
        });
    });
});
