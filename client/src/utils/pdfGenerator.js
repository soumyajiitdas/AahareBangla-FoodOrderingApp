import jsPDF from "jspdf";

export const generateInvoicePDF = (order, orderData) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const MARGIN = 15;

    let y = 15;

    /* BASIC HELPERS */
    const center = (text, size = 12, style = "normal") => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        doc.text(text, pageWidth / 2, y, { align: "center" });
    };

    const left = (text, x, size = 10, style = "normal") => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        doc.text(text, x, y);
    };

    const right = (text, x, size = 10, style = "normal") => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        doc.text(text, x, y, { align: "right" });
    };

    const addLine = () => {
        doc.setLineWidth(0.3);
        doc.line(MARGIN, y, pageWidth - MARGIN, y);
    };

    const ensureSpace = () => {
        if (y > pageHeight - 25) {
            doc.addPage();
            y = 20;
        }
    };

    /* HEADER */

    center("TAX INVOICE", 18, "bold");
    y += 10;

    center("Aahare Bangla Restaurant", 16, "bold");
    y += 7;

    center("Authentic Bengali Cuisine", 10);
    y += 10;

    center("Banjetia, Berhampore, West Bengal - 742102", 9);
    y += 4;
    center("Phone: +91-1234567890 | Email: info@aaharebangla.com", 9);
    y += 4;
    center("GSTIN: 19XXXXX1234X1ZX", 9);

    y += 15;

    /* ORDER DETAILS */

    left("Order Details", MARGIN, 11, "bold");
    y += 7;

    left(`Order ID: ${orderData.orderId}`, MARGIN, 9); y += 5;
    left(`Date: ${orderData.date}`, MARGIN, 9); y += 5;
    left(`Time: ${orderData.time}`, MARGIN, 9); y += 12;

    /* TABLE HEADER */
    doc.setFillColor(240, 240, 240);
    doc.rect(MARGIN, y, pageWidth - MARGIN * 2, 9, "F");

    y += 6;
    left("Item", MARGIN + 2, 10, "bold");
    doc.text("Qty", 125, y, { align: "center" });
    right("Price", 155, 10, "bold");
    right("Amount", 185, 10, "bold");

    y += 8;

    /* ITEMS */
    order.cart.forEach((item) => {
        ensureSpace();

        const total = (item.price * item.quantity).toFixed(2);
        const name = item.name.length > 40 ? item.name.slice(0, 40) + "..." : item.name;

        left(name, MARGIN + 2, 9);
        doc.text(item.quantity.toString(), 125, y, { align: "center" });
        right(`Rs. ${item.price.toFixed(2)}`, 155, 9);
        right(`Rs. ${total}`, 185, 9, "bold");

        y += 8;
    });

    y += 3;
    addLine();
    y += 8;

    /* SUMMARY */

    const subtotal = order.getTotalPrice();
    const tax = subtotal * 0.05;
    const delivery = subtotal > 350 ? 0 : 50;
    const total = subtotal + tax + delivery;

    right("Subtotal:", 150); right(`Rs. ${subtotal.toFixed(2)}`, 185); y += 6;
    right("GST (5%):", 150); right(`Rs. ${tax.toFixed(2)}`, 185); y += 6;

    right("Delivery:", 150);
    right(delivery === 0 ? "FREE" : `Rs. ${delivery.toFixed(2)}`, 185);
    y += 10;

    doc.setFont("helvetica", "bold");
    right("Grand Total:", 150, 12);
    right(`Rs. ${total.toFixed(2)}`, 185, 13, "bold");

    y += 12;

    if (delivery === 0) {
        center("FREE delivery applied!", 10, "bold");
        y += 8;
    }

    ensureSpace();
    addLine();
    y += 10;

    /* FOOTER */

    center("Thank you for choosing Aahare Bangla!", 11, "bold");
    y += 5;

    center("We look forward to serving you again.", 9);

    /* Bottom Bar */
    doc.setFillColor(0, 0, 0);
    doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("https://aaharebangla.vercel.app", pageWidth / 2, pageHeight - 5, { align: "center" });

    /* Save */
    doc.save(`invoice-${orderData.orderId}.pdf`);
};
