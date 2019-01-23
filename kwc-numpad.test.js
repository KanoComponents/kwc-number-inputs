/* globals fixture, suite, test, assert */
import './kwc-numpad.js';

const basic = fixture`
    <kwc-numpad></kwc-numpad>
`;

const limited = fixture`
    <kwc-numpad limited></kwc-numpad>
`;

suite('kwc-numpad', () =>{
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-numpad'));
    });
    test('instantiating the element with default property values works', () => {
        const el = basic();
        assert.equal(!el.resultOverride, false);
        assert.equal(el.value, 0);
        assert.equal(el.stringValue, '0');
        assert.equal(!el.limited, true);
    });
    test('click of button 1 gets value', (cb) => {
        const el = basic();
        const buttonOne = el.root.querySelector('button[value="1"]');

        buttonOne.addEventListener('click', (e) => {
            assert.equal(e.target.getAttribute('value'), 1);
            cb();
        });
        buttonOne.click();
    });
    test('output number shows 1 on click of button 1', (cb) => {
        const el = basic();
        const buttonOne = el.root.querySelector('button[value="1"]');

        buttonOne.addEventListener('click', () => {
            assert.equal(el.stringValue, '1');
            cb();
        });
        buttonOne.click();
    });
    test('output number shows 123 on click of buttons 1, 2, 3', () => {
        const el = basic();
        const buttonClicks = [1, 2, 3];
        buttonClicks.forEach((click) => {
            const button = el.root.querySelector(`button[value="${click}"]`);
            button.click();
        });
        assert.equal(el.stringValue, '123');
    });
    test('output number shows 12 on click of buttons 1, 2, 3, delete', () => {
        const el = basic();
        const buttonClicks = [1, 2, 3, 'backspace'];
        buttonClicks.forEach((click) => {
            const button = el.root.querySelector(`button[value="${click}"]`);
            button.click();
        });
        assert.equal(el.stringValue, '12');
    });
    test('output number shows 1.23 on click of buttons 1, ., 2, 3', () => {
        const el = basic();
        const buttonClicks = [1, '.', 2, 3];
        buttonClicks.forEach((click) => {
            const button = el.root.querySelector(`button[value="${click}"]`);
            button.click();
        });
        assert.equal(el.stringValue, '1.23');
    });
    test('output number shows -1.23 on click of buttons +/-, 1, ., 2, 3', () => {
        const el = basic();
        const buttonClicks = ['plus-minus', 1, '.', 2, 3];
        buttonClicks.forEach((click) => {
            const button = el.root.querySelector(`button[value="${click}"]`);
            button.click();
        });
        assert.equal(el.stringValue, '-1.23');
    });
    test('output number shows 432 on click of buttons 4, 6, delete, +/-, 3, 2, +/-', () => {
        const el = basic();
        const buttonClicks = [4, 6, 'backspace', 'plus-minus', 3, 2, 'plus-minus'];
        buttonClicks.forEach((click) => {
            const button = el.root.querySelector(`button[value="${click}"]`);
            button.click();
        });
        assert.equal(el.stringValue, '432');
    });
    test('instantiate limited', () => {
        const el = limited();
        assert(el instanceof customElements.get('kwc-numpad'));
    });
    test('instantiating limited the element with other properties with default values works', () => {
        const el = limited();
        assert.equal(!el.resultOverride, false);
        assert.equal(el.value, 0);
        assert.equal(el.stringValue, '0');
        assert.equal(!el.limited, false);
    });
});