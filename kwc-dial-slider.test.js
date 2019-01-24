/* globals fixture, suite, test, assert */
import './kwc-dial-slider.js';

const basic = fixture`
    <kwc-dial-slider></kwc-dial-slider>
`;

suite('kwc-dial-slider', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-dial-slider'));
    });
    test('instantiating the element with default property values works', () => {
        const el = basic();
        assert.equal(el.min, 0);
        assert.equal(el.max, 100);
        assert.equal(el.prefix, '');
        assert.equal(el.suffix, '');
    });
});
