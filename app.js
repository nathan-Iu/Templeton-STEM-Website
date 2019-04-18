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
        var output =
            `
            From: ${req.body.name} - ${req.body.email}
            <br>
            <h4>Message:</h4>
            ${req.body.message}
            `;
        var subjectLine = "<Inquiry from STEM website>";
    } else if (req.params.id == "nav") {
        var output = "";
        var subjectLine = "";
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
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.redirect("back");
    })
})

app.listen(3000, function () {
    console.log("Server started");
});