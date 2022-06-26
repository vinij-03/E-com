const data = require('./products.json');

let items = data.items;
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const {title}= item.fields;
    console.log(title);
}
