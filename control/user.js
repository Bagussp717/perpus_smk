const db = require("../db");
const {TampilAdminId} =require("../control/page")

const RiwayatUser = (req,res) => {
    const username = req.params.username
    const isikueri = `SELECT * FROM siswa WHERE username = '${username}'`

    db.query( isikueri, (err, results) => {
        if(err){
            throw err;
        } else {
            res.set('Access-Control-Allow-Origin', '*')

            const queryHistoryUser = `SELECT pb.kode_transaksi, pb.no_induk, pb.nama_peminjam, pb.kode_buku, pb.judul_buku,
            pb.pengarang, pb.penerbit, pb.tahun_terbit, pb.jumlah_pinjam, pb.tanggal_pinjam,
            pb.tanggal_kembali, pe.jumlah_kembali FROM peminjam_buku pb LEFT JOIN pengembalian pe 
            ON pb.kode_transaksi = pe.kode_transaksi WHERE pb.nama_peminjam = "${results[0].nama}"`
        
            db.query(queryHistoryUser,(err, results) => {
                if(err){
                    throw err;
                } else {
                    res.set('Access-Control-Allow-Origin', '*')
                    res.send(results)
                }
            })
        }
    });

}

module.exports = {RiwayatUser}