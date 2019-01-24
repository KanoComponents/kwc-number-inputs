/* globals fixture, suite, test, assert */
import './kwc-dial-numpad.js';

const basic = fixture`
    <kwc-dial-numpad></kwc-dial-numpad>
`;

suite('kwc-dial-numpad', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-dial-numpad'));
    });
    test('instantiating the element with default property values works', () => {
        const el = basic();
        assert.equal(el.prefix, '');
        assert.equal(el.suffix, '');
    });
});
