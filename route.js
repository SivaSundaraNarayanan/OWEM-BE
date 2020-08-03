const { Users, Registrations, Courses, Admins } = require("./models");

const prices = { 0: 0, 1: 499, 2: 749, 3: 1248, 4: 999 };
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

module.exports = function (app) {
  app.get("/", (_, res) => {
    return res.render("index");
  });

  app.get("/admin", async (req, res) => {
    const { adminID } = req.query;
    if (!(await validateNumber(adminID))) return res.status(404).send();

    const users = await Users.findAll({
      attributes: [
        "name",
        "age",
        "mail",
        "type",
        "phone",
        "institution",
        "department",
        "year",
        "referralID",
        "referredBy",
        "amount",
        "paid",
      ],
      include: [
        {
          model: Registrations,
          attributes: ["id"],
          include: {
            model: Courses,
            attributes: ["name", "price"],
          },
        },
        {
          model: Users,
          attributes: ["name", "age", "phone", "paid"],
          as: "references",
        },
        {
          model: Users,
          attributes: ["name", "age", "phone", "referralID"],
          as: "referrer",
        },
      ],
    });
    return res.render("users", {
      users,
    });
  });

  app
    .route("/payment")
    .get((_, res) => {
      return res.render("payment");
    })
    .post(async (req, res) => {
      const { referralID, adminID } = req.body;
      console.log(req.body);
      if (!(await validateNumber(adminID))) return res.status(401).send();
      await Users.update(
        {
          paid: true,
        },
        {
          where: {
            referralID,
          },
        }
      );
      res.status(200).send();
    });

  app.post("/admin", async (req, res) => {
    const { number } = req.body;

    await Admins.create({
      number,
    });

    res.status(201).send("Successfully created");
  });

  app.post("/register", async (req, res) => {
    const {
      name,
      age,
      mail,
      type,
      institution,
      department,
      year,
      phone,
      referredBy: r,
      courses = [],
    } = req.body;

    const amount = prices[courses.length];

    const referralID = await getReferralID();

    const referredBy = await getReferrer(r);

    const user = await Users.create(
      {
        name,
        age,
        mail,
        type,
        institution,
        department,
        phone,
        year,
        amount,
        referredBy,
        referralID,
        Registrations: courses.map((course) => ({ course })),
      },
      {
        include: Registrations,
      }
    );
    res.send(user);
  });

  async function getReferrer(referralID) {
    if (!referralID) return;
    const user = await Users.findOne({
      where: {
        referralID,
      },
    });
    return user ? user.id : null;
  }

  async function validateNumber(number) {
    if (!number) return;
    const admin = await Admins.findOne({
      where: {
        number,
      },
    });
    return Boolean(admin);
  }

  async function getReferralID() {
    var randomIndex, ReferralID, user;
    while (true) {
      (randomIndex = Math.floor(Math.random() * 10 + 1)),
        (randomDigit = Math.floor(1000 + Math.random() * 9000));

      ReferralID = `OWEM${randomDigit}${alphabet.substring(
        randomIndex,
        randomIndex + 1
      )}`;

      console.log(ReferralID);

      user = await Users.findOne({
        where: {
          ReferralID,
        },
      });
      if (!user) return ReferralID;
    }
  }
};
