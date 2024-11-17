const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const {Courier} = require('../models/courier.model');

const generateReport = async(req,res)=>{
 try {
     const doc = new PDFDocument();
     doc.pipe(fs.createWriteStream('report.pdf'));
   
     // Add some text to the PDF
     doc
       .fontSize(25)
       .text('Courier Management System Report', {
         align: 'center'
       });
   
     // Add a subheading
     doc
       .moveDown()
       .fontSize(16)
       .text('Generated on: ' + new Date().toLocaleString());
   
     // Add table-like content
     doc
       .moveDown()
       .fontSize(12)
       //.text('Sender Name    |    Sender Address:    |     Sender Contact   |     Recipient_name ');
   
     // Fetch Data from DB
     const couriers = await Courier.find();
   
     couriers.forEach(courier => {
      //doc.text(`${courier.sender_name} | ${courier.sender_address} | ${courier.sender_contact} | ${courier.recipient_name} `);
      doc.text(`Sender Name: ${courier.sender_name}`);
      doc.text(`Sender Address: ${courier.sender_address}`);
      doc.text(`Sender Contact: ${courier.sender_contact}`);
      doc.text(`Recipient Name: ${courier.recipient_name}`);
      doc.text(`Recipient Address: ${courier.recipient_address}`);
      doc.text(`trackingNumber: ${courier.trackingNumber}`);

      doc.moveDown(); // Add extra space after each courier's details

     });
   
     // Finalize the PDF and close the stream
     doc.end();
     const filePath = path.join(__dirname, '..','report.pdf');

     // Check if the file exists
     fs.access(filePath, fs.constants.F_OK, (err) => {
       if (err) {
         console.error('File not found:', err);
         return res.status(404).send('File not found');
       }
   
       // Use res.download() to send the file
       res.download(filePath, 'report.pdf', (err) => {
         if (err) {
           console.error('Error during download:', err);
           res.status(500).send('Error downloading the file');
         }
       });
     });
    
 } catch (error) {
    
 }
}

module.exports = {generateReport};

// Call the function to generate the report

