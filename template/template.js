const notifyTemp = {
    Email: {
        Pending: "Dear User, your order has been received.",
        dispatched: "Your order is on the way!",
        In_Transit: "Your order is in transit.",
        Out_For_Delivery: "Your order is out for delivery.",
        Delivered: "Your order has been delivered.",
        Cancelled: "Your order has been cancelled. We regret any inconvenience caused."
    },
    SMS: {
        Pending: "Dear User, your order has been received.",
        dispatched: "Your order is on the way!",
        In_Transit: "Your order is in transit.",
        Out_For_Delivery: "Your order is out for delivery.",
        Delivered: "Your order has been delivered.",
        Cancelled: "Your order has been cancelled. We regret any inconvenience caused."
    }
};

module.exports = notifyTemp;
