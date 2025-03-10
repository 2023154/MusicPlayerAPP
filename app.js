// An array to store items
let items = [];

// Function to add an item
function addItem(item) {
    items.push(item);
    console.log(`Added: ${item}`);
}

// Function to remove an item by index
function removeItem(index) {
    if (index >= 0 && index < items.length) {
        const removed = items.splice(index, 1);
        console.log(`Removed: ${removed[0]}`);
    } else {
        console.log("Invalid index. No item removed.");
    }
}

// Function to edit an item at a given index
function editItem(index, newItem) {
    if (index >= 0 && index < items.length) {
        const oldItem = items[index];
        items[index] = newItem;
        console.log(`Edited: ${oldItem} changed to ${newItem}`);
    } else {
        console.log("Invalid index. No item edited.");
    }
}

// Example usage:
addItem("Apple");
addItem("Banana");
console.log("Items:", items);

removeItem(0);
console.log("Items after removal:", items);

editItem(0, "Orange");
console.log("Items after edit:", items);
