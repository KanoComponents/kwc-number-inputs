/* globals fixture, suite, test, assert */
import { touchtrack } from './test/util.js';
import './kwc-dial.js';

const basic = fixture`
    <kwc-dial></kwc-dial>
`;

suite('kwc-dial', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-dial'));
    });
    test('instantiating the element with default property values works', () => {
        const el = basic();
        assert.equal(el.value, 0);
        assert.equal(el.prefix, null);
        assert.equal(el.suffix, null);
    });
    test('check knob moves on touch events', () => {
        const el = basic();
        let startX;
        let startY;
        let endX;
        let endY;
        el.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        el.addEventListener('touchend', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
        });
        touchtrack(el, 10, 10, 5);
        assert.equal(Math.abs(startX - endX), 10);
        assert.equal(Math.abs(startY - endY), 10);
    });
});
