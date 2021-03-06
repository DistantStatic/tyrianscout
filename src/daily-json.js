const rawDailies = [{
    "id": 79,
    "name": "Halloween Daily",
    "icon": "https://render.guildwars2.com/file/7148FBEFC0071191C91BFD37D1346BF70DA65403/602778.png",
    "active": false
}, {
    "id": 97,
    "name": "Daily PvE/PvP",
    "icon": "https://render.guildwars2.com/file/483E3939D1A7010BDEA2970FB27703CAAD5FBB0F/42684.png",
    "active": true
}, {
    "id": 88,
    "name": "Daily Fractals",
    "icon": "https://render.guildwars2.com/file/4A5834E40CDC6A0C44085B1F697565002D71CD47/1228226.png",
    "active": true
}, {
    "id": 98,
    "name": "Wintersday Daily",
    "icon": "https://render.guildwars2.com/file/C5CE0723E54B4B2F78A2E6E5496A04B54E7A65E6/602777.png",
    "active": false
}, {
    "id": 162,
    "name": "Daily Super Adventure Festival",
    "icon": "https://render.guildwars2.com/file/B3DA5159BA6318466403EA14A47F0760633C48C5/630734.png",
    "active": false
}, {
    "id": 201,
    "name": "Daily Lunar New Year",
    "icon": "https://render.guildwars2.com/file/BA6EB24DE85A3EB763E7BB5FBE0836022222A340/947482.png",
    "active": false
}, {
    "id": 207,
    "name": "Daily Sunken Treasure Hunter",
    "icon": "https://render.guildwars2.com/file/9380EEBE040AF400A2EFCC08175F4D9B6CB2F70A/1983619.png",
    "active": true
}, {
    "id": 213,
    "name": "Daily Festival of the Four Winds",
    "icon": "https://render.guildwars2.com/file/9BED5B1BC4DC043E72CA9A6F07704D4EF875655E/2015706.png",
    "active": false
}, {
    "id": 221,
    "name": "Daily Roller Beetle Racing",
    "icon": "https://render.guildwars2.com/file/A0271015180B52A3EC7A2F96A55F18DA7F95AD0E/2069928.png",
    "active": true
}, {
    "id": 234,
    "name": "Daily Grothmar Valley",
    "icon": "https://render.guildwars2.com/file/4A5AD2C0079107784C04EEEF04CB7911105AB240/2199969.png",
    "active": true
}, {
    "id": 238,
    "name": "Daily Living World Season 3",
    "icon": "https://render.guildwars2.com/file/09DE0653ABAE58F8A048BB7F73D62AD9FCB70F41/1677315.png",
    "active": true
}, {
    "id": 239,
    "name": "Daily Bjora Marches",
    "icon": "https://render.guildwars2.com/file/0AAD072E707AE02AE1B9984FD8BCE1A113E759B7/2221432.png",
    "active": true
}, {
    "id": 243,
    "name": "Daily Living World Season 4",
    "icon": "https://render.guildwars2.com/file/056C32B97B15F04E2BD6A660FC451946ED086040/1895981.png",
    "active": true
}, {
    "id": 250,
    "name": "Daily Strike Mission",
    "icon": "https://render.guildwars2.com/file/C34A20B86C73B0DCDC9401ECD22CE37C36B018A7/2271016.png",
    "active": true
}, {
    "id": 252,
    "name": "Daily Drizzlewood Coast",
    "icon": "https://render.guildwars2.com/file/2D305E1F34A7985BF572D40717062096E3BD58BA/2293615.png",
    "active": true
}, {
    "id": 264,
    "name": "Daily Champions",
    "icon": "https://render.guildwars2.com/file/245AA24CF4D3D529AAAB123CE5B9EBB0DF534F49/2352419.png",
    "active": true
}]

const Dailies = []

rawDailies.forEach(daily => {
    if (daily.active) {
        Dailies.push({
            id: daily.id,
            name: daily.name,
            icon: daily.icon
        })
    }
})

export default Dailies