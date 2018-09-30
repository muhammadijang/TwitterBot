const T = require("./Twit.js");
const myUserName = require("../config").userName;
const timeOut = 1000*60*5;

const AutoDM = () => {
    const stream = T.stream("user");
    console.log("Memulai mengirim Direct Message!!!");
    stream.on("follow", SendMessage);
};

const SendMessage = user => {
    const { screen_name, name } = user.source;

    const obj = {
        screen_name,
        text: GenerateMessage(name)
    };

    if (screen_name != myUserName) {
        console.log("Yeaaah, Follower Baru!");
        setTimeout(() => {
            T.post("direct_messages/new", obj)
            .catch(err => {
                console.error("error", err.stack);
            })
            .then(result => {
                console.log(`Pesan berhasil dikirimkan ke ${screen_name} .`);
            });
        }, timeOut);
    }
};

const GenerateMessage = name => {
    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];
    const d = new hari();
    const namaHari = hari[d.getDay()];
    return `Hollaaa ${name} . Terima kasih sudah memfollow akun saya!\n Selamat Hari ${namaHari}`
};

module.exports = AutoDM;