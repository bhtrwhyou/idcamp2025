// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

// Menampung semua data pesanan
let orders = [];

// Menambah pesanan baru
function addOrder(customerName, items) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const newOrder = {
    id: generateUniqueId(),
    customerName,
    items,
    totalPrice,
    status: 'Menunggu'
  };

  orders.push(newOrder);
}

// Memperbarui status pesanan
function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
  }
}

// Menghitung total pendapatan dari pesanan yang sudah selesai
function calculateTotalRevenue() {
  return orders
    .filter(order => order.status === 'Selesai')
    .reduce((sum, order) => sum + order.totalPrice, 0);
}

// Menghapus pesanan berdasarkan id
function deleteOrder(id) {
  orders = orders.filter(order => order.id !== id);
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
