import jsPDF from 'jspdf';

export const generateInvoicePDF = (order, orderData) => {
    const doc = new jsPDF();

    // Set font sizes and styles
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 105, 20, { align: 'center' });

    // Restaurant info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Aahare Bangla Restaurant', 105, 35, { align: 'center' });
    doc.text('123 Food Street, Kolkata, India', 105, 42, { align: 'center' });
    doc.text('Phone: +91-1234567890', 105, 49, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Order details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Details:', 20, 65);

    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: ${orderData.orderId}`, 20, 72);
    doc.text(`Date: ${orderData.date}`, 20, 79);
    doc.text(`Time: ${orderData.time}`, 20, 86);

    // Line separator
    doc.line(20, 92, 190, 92);

    // Table headers
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 20, 100);
    doc.text('Qty', 120, 100);
    doc.text('Price', 145, 100);
    doc.text('Total', 170, 100);

    // Line under headers
    doc.line(20, 103, 190, 103);

    // Order items
    doc.setFont('helvetica', 'normal');
    let yPosition = 112;

    order.cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);

        // Handle long item names
        const itemName = item.name.length > 35 ? item.name.substring(0, 35) + '...' : item.name;

        doc.text(itemName, 20, yPosition);
        doc.text(item.quantity.toString(), 125, yPosition, { align: 'center' });
        doc.text(`$${item.price.toFixed(2)}`, 145, yPosition);
        doc.text(`$${itemTotal}`, 170, yPosition);

        yPosition += 8;

        // Add new page if needed
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // Line before total
    yPosition += 5;
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    // Subtotal, Tax, and Total
    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    const subtotal = order.getTotalPrice();
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    doc.text('Subtotal:', 140, yPosition);
    doc.text(`$${subtotal.toFixed(2)}`, 170, yPosition);

    yPosition += 7;
    doc.text('Tax (5%):', 140, yPosition);
    doc.text(`$${tax.toFixed(2)}`, 170, yPosition);

    yPosition += 7;
    doc.setLineWidth(0.3);
    doc.line(140, yPosition, 190, yPosition);

    yPosition += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 140, yPosition);
    doc.text(`$${total.toFixed(2)}`, 170, yPosition);

    // Footer
    yPosition += 15;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('Thank you for your order!', 105, yPosition, { align: 'center' });
    yPosition += 7;
    doc.text('We hope to serve you again soon.', 105, yPosition, { align: 'center' });

    // Save the PDF
    doc.save(`invoice-${orderData.orderId}.pdf`);
};