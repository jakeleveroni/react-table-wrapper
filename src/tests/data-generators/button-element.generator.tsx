import React from 'react';
import * as casual from 'casual-browserify';

casual.define('button_elem', () => {
   return <button>Button</button>
});

export function generateRandomButton() {
    // @ts-ignore
    return casual.button_elem;
}
