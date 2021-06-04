require('@testing-library/jest-dom');
require('@testing-library/jest-dom/extend-expect');

const fs = require('fs');
const path = require('path');
const { fireEvent, getByText } = require('@testing-library/dom');
const { JSDOM } = require('jsdom');

// get contents of the index.html file as string
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('p tag', () => {
    let dom;
    let container;

    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        container = dom.window.document.body
    });

    describe('When document loads', () => {
        it('should be rendered without text', () => {
            const paragraphTag = container.querySelector('#demo');
            expect(paragraphTag).toBeEmptyDOMElement();
        });
    });

    describe('When button clicked clicked', () => {
        let button;    
        beforeEach(() => {
            button = container.querySelector('button');
            // click on button
            fireEvent.click(button);
        })
        it('should populate p tag with text', () => {
            expect(getByText(container, 'Hello World')).toBeInTheDocument()
        });
    });
    
});