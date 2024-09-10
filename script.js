const prices = {
    tea: 20,
    coffee: 50,
    samosa: 30,
    biscuit: 10
};

const quantities = {
    tea: 0,
    coffee: 0,
    samosa: 0,
    biscuit: 0
};

let currentItem = null; // To keep track of the item being edited

function updateItemsContainer() {
    const container = document.getElementById('items-container');
    container.innerHTML = ''; // Clear existing items
    for (const item in prices) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span>${item.charAt(0).toUpperCase() + item.slice(1)} - ₹<span id="price-${item}">${prices[item]}</span></span>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item}', 1)">+</button>
                <span id="quantity-${item}">${quantities[item]}</span>
                <button onclick="changeQuantity('${item}', -1)">-</button>
                <button class="edit-btn" onclick="editItem('${item}')">Edit</button>
            </div>
        `;
        container.appendChild(itemDiv);
    }
}

function changeQuantity(item, change) {
    if (quantities[item] + change >= 0) {
        quantities[item] += change;
        document.getElementById(`quantity-${item}`).textContent = quantities[item];
    }
}

function showTotal() {
    let total = 0;
    for (const item in quantities) {
        total += quantities[item] * prices[item];
    }
    document.getElementById('modalTotalAmount').textContent = `Total: ₹${total}`;
    document.getElementById('totalModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('totalModal').classList.add('hidden');
    resetAll(); // Reset all quantities when closing the modal
}

function resetAll() {
    for (const item in quantities) {
        quantities[item] = 0;
        document.getElementById(`quantity-${item}`).textContent = quantities[item];
    }
    document.getElementById('modalTotalAmount').textContent = 'Total: ₹0';
}

function showAddItemForm() {
    currentItem = null;
    document.getElementById('itemModalTitle').textContent = 'Add New Item';
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemSubmitBtn').textContent = 'Add Item';
    document.getElementById('itemModal').classList.remove('hidden');
}

function closeItemModal() {
    document.getElementById('itemModal').classList.add('hidden');
}

function editItem(item) {
    currentItem = item;
    document.getElementById('itemModalTitle').textContent = 'Edit Item';
    document.getElementById('itemName').value = item.charAt(0).toUpperCase() + item.slice(1);
    document.getElementById('itemPrice').value = prices[item];
    document.getElementById('itemSubmitBtn').textContent = 'Update Item';
    document.getElementById('itemModal').classList.remove('hidden');
}

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value.toLowerCase();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (currentItem) {
        // Update existing item
        delete prices[currentItem];
        delete quantities[currentItem];
        prices[itemName] = itemPrice;
        quantities[itemName] = 0;
    } else {
        // Add new item
        prices[itemName] = itemPrice;
        quantities[itemName] = 0;
    }
    
    updateItemsContainer();
    closeItemModal();
});

updateItemsContainer(); // Initialize the items on page load
