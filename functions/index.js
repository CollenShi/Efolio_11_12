/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const sgMail = require("@sendgrid/mail");
const keyOne = "SG.4KYc157YTCGG_ERY3zS-";
const keyTwo = "Yw.8cCkxs2uYDOjkKsX5aJD95MoWHS6PmTnHxFDBPKFIYo";
sgMail.setApiKey(keyOne+keyTwo);

admin.initializeApp();
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books.");
    }
  });
});

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // get isbn and name from the request body
      const {isbn, name} = req.body;

      if (!isbn || !name) {
        return res.status(400).send("Missing 'isbn' or 'name' in request body");
      }

      // add a new book to the books collection
      const booksCollection = admin.firestore().collection("books");
      const newBookRef = await booksCollection.add({
        isbn: isbn,
        name: name,
      });

      // return the new book id
      res.status(201).send({bookId: newBookRef.id});
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book.");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = [];

      snapshot.forEach((doc) => {
        const bookData = doc.data();
        books.push({
          isbn: bookData.isbn,
          name: bookData.name,
        });
      });

      res.status(200).send({books});
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books.");
    }
  });
});

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {to, subject, text, attachment} = req.body;
      if (!to || !subject || !text) {
        return res.status(400).send("Missing Parameters");
      }

      const msg = {
        to,
        from: "xingchen.shi0915@gmail.com",
        subject,
        text,
        attachments: [],
      };

      if (attachment && attachment.content) {
        msg.attachments.push({
          content: attachment.content,
          filename: attachment.filename,
          type: attachment.type,
          disposition: "attachment",
        });
      }

      const result = await sgMail.send(msg);
      res.status(200).send({msg, result});
    } catch (error) {
      res.status(500).send({data: req.body, error: JSON.stringify(error)});
    }
  });
});

exports.allActivities = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const activityCollection = admin.firestore().collection("activity");
      const snapshot = await activityCollection.get();
      const activities = [];

      snapshot.forEach((doc) => {
        const activityData = doc.data();
        activities.push({
          name: activityData.name,
          type: activityData.type,
          location: activityData.location,
          capacity: activityData.capacity,
          date: activityData.date,
        });
      });

      res.status(200).send({activities});
    } catch (error) {
      console.error("Error fetching activities:", error.message);
      res.status(500).send("Error fetching activities.");
    }
  });
});

exports.allAppointment = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const appointmentCollection = admin.firestore().collection("appointment");
      const snapshot = await appointmentCollection.get();
      const appointments = [];
      snapshot.forEach((doc) => {
        const appointmentData = doc.data();
        appointments.push({
          name: appointmentData.name,
          age: appointmentData.age,
          gender: appointmentData.gender,
          Email: appointmentData.Email,
          date: appointmentData.date,
        });
      });

      res.status(200).send({appointments});
    } catch (error) {
      console.error("Error fetching activities:", error.message);
      res.status(500).send("Error fetching activities.");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
