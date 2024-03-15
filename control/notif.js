const db = require("../db");

const Notification = (req, res) => {
    db.query("SELECT * FROM `notifications` ORDER BY read_status ASC", (err, results) => {
        if (err) {
          throw err;
        } else {
          console.log("Data kueri buku : \n", results);
          res.set("Access-Control-Allow-Origin", "*");
          res.send(results);
        }
      });
}

const CountNotif = (req,res) => {
  const isikueri = `SELECT COUNT(read_status) AS Jumlah FROM notifications WHERE read_status = '0'`
  db.query(isikueri,(err, results) =>{
    if (err) {
      throw err;
    } else {
      console.log("Data kueri buku : \n", results);
      res.set("Access-Control-Allow-Origin", "*");
      res.send(results);
    }
  })
}
module.exports = {Notification, CountNotif}