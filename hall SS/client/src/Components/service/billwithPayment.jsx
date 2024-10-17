import React from "react";
import jsPDF from "jspdf";

const Bill = ({
  customerId,
  name,
  address,
  mobile,
  nic,
  eventDate,
  guestCount,
  foodMenu,
  alcoholService,
  advancePayment,
  hallID,
}) => {
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`address: ${address}`, 10, 20);
    doc.text(`mobile: ${mobile}`, 10, 30);
    doc.text(`nic: ${nic}`, 10, 40);
    doc.text(`eventDate: ${eventDate}`, 10, 50);
    doc.text(`guestCount: ${guestCount}`, 10, 60);
    doc.text(`foodMenu: ${foodMenu}`, 10, 70);
    doc.text(`alcoholService: ${alcoholService}`, 10, 80);
    doc.text(`advancePayment: ${advancePayment}`, 10, 90);
    doc.text(`hallID: ${hallID}`, 10, 100);

    // Save the PDF
    doc.save("bill.pdf");
  };

  return (
    <div>
      {/* <h2>Booking Bill</h2>
      <p>customerId: {customerId}</p>
      <p>name: {name}</p>
      <p>address: {address}</p>
      <p>mobile: {mobile}</p>
      <p>nic: {nic}</p>
      <p>eventDate: {eventDate}</p>
      <p>guestCount: {guestCount}</p>
      <p>foodMenu: {foodMenu}</p>
      <p>alcoholService: {alcoholService}</p>
      <p>advancePayment: {advancePayment}</p>
      <p>hallID: {hallID}</p> */}

      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default Bill;
