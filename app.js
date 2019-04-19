const
    express = require("express"),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", function (req, res) {
    res.render("index", { page: "index" });
});

app.get("/projects", function (req, res) {
    res.render("projects", { page: "projects" });
});

app.get("/success", function (req, res) {
    res.render("success", { page: "success" });
});

app.get("/why", function (req, res) {
    res.render("why", { page: "why" });
});

app.get("/contact", function (req, res) {
    res.render("contact", { page: "contact" });
});


app.post("/send/:id", function (req, res) {
    if (req.params.id == "contact") {
        var output = `
            From: ${req.body.name} - ${req.body.email}
            <br>
            <h4>Message:</h4>
            ${req.body.message}
            `;
        var subjectLine = "<Inquiry from STEM website>";
    } if (req.params.id == "modal") {
        let crossBoundary;
        req.body.crossBoundaryYes == "on" ? crossBoundary = "yes" : crossBoundary = "no";
        
        var output = `
            Applicant name: ${req.body.name}
            <br>
            Cross Boundary: ${crossBoundary}
            <br>
            PEN: ${req.body.PEN}
            <br>
            Birthdate: { MM: ${req.body.mm} DD: ${req.body.dd} YYYY: ${req.body.yyyy} }
            <br>
            Home Address: ${req.body.address}
            <br>
            Parent/Guardian: ${req.body.guardian}
            <br>
            Phone: ${req.body.num1} - ${req.body.num2} - ${req.body.num3}
            <br>
            Parent Email: ${req.body.parentEmail}
            <br>
            Student Email: ${req.body.studentEmail}
        `;
        var subjectLine = "<Application from STEM website>";
    }

    let transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
            user: "extremefuzziness@hotmail.com", // generated ethereal user
            pass: "CanFISHfly?" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Fred Foo 👻" <extremefuzziness@hotmail.com>', // sender address
        to: "nathanlu_@hotmail.com", // list of receivers
        subject: subjectLine, // Subject line
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        res.redirect("back");
    })
})

app.listen(process.env.PORT || 5000, function () {
    console.log("Server started");
});