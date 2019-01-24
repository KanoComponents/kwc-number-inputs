/* globals fixture, suite, test, assert */
import './kwc-slider-numpad.js';

const basic = fixture`
    <kwc-slider-numpad></kwc-slider-numpad>
`;

suite('kwc-slider-numpad', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-slider-numpad'));
    });
    test('instantiating the element with default property values works', () => {
        const el = basic();
        assert.equal(el.min, 0);
        assert.equal(el.max, 100);
    });
});
