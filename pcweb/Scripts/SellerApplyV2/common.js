/*买手注册 公共*/

function InitFillCountry() {
    $('#selectcountry').append("<option value='0'>USA</option>");               // 美国
    $('#selectcountry').append("<option value='1'>Japan</option>");             // 日本
    $('#selectcountry').append("<option value='2'>Korea</option>");             // 韩国
    $('#selectcountry').append("<option value='3'>Australia</option>");         // 澳大利亚
    $('#selectcountry').append("<option value='4'>NewZealand</option>");        // 新西兰
    $('#selectcountry').append("<option value='5'>England</option>");           // 英国
    $('#selectcountry').append("<option value='6'>Italy</option>");             // 意大利
    $('#selectcountry').append("<option value='7'>France</option>");            // 法国
    $('#selectcountry').append("<option value='8'>Germany</option>");           // 德国
    $('#selectcountry').append("<option value='9'>Czech</option>");             // 捷克
    $('#selectcountry').append("<option value='12'>Austria</option>");          // 奥地利
    $('#selectcountry').append("<option value='14'>Belgium</option>");          // 比利时
    $('#selectcountry').append("<option value='18'>Denmark</option>");          // 丹麦
    $('#selectcountry').append("<option value='20'>Finland</option>");          // 芬兰
    $('#selectcountry').append("<option value='21'>Greece</option>");           // 希腊
    $('#selectcountry').append("<option value='22'>Holland</option>");          // 荷兰
    $('#selectcountry').append("<option value='34'>Norway</option>");           // 挪威
    $('#selectcountry').append("<option value='35'>Poland</option>");           // 波兰
    $('#selectcountry').append("<option value='36'>Portugal</option>");         // 葡萄牙
    $('#selectcountry').append("<option value='38'>Russia</option>");           // 俄罗斯
    $('#selectcountry').append("<option value='43'>Spain</option>");            // 西班牙
    $('#selectcountry').append("<option value='44'>Sweden</option>");           // 瑞典
    $('#selectcountry').append("<option value='45'>Turkey</option>");           // 土耳其
    $('#selectcountry').append("<option value='47'>HongKong</option>");         // 香港
    $('#selectcountry').append("<option value='48'>Canada</option>");           // 加拿大
    $('#selectcountry').append("<option value='50'>Switzerland</option>");      // 瑞士
    $('#selectcountry').append("<option value='51'>Thailand</option>");         // 泰国
    $('#selectcountry').append("<option value='52'>Singapore</option>");        // 新加坡
    $('#selectcountry').append("<option value='53'>TAIWAN</option>");           // 台湾
    $('#selectcountry').append("<option value='54'>Arab</option>");             // 阿拉伯联合酋长国
}
//
function ChangeCountry(currentCountry)
{
    switch (currentCountry) {
        case "0":
            FillUsState();
            break;
        case "1":
            FillJapanState();
            break;
        case "2":
            FillKoreaState();
            break;
        case "3":
            FillAustrState();
            break;
        case "4":
            FillNewzlandState();
            break;
        case "5":
            FillEnState();
            break;
        case "6":
            FillItalyState();
            break;
        case "7":
            FillFranceState();
            break;
        case "8":
            FillGemState();
            break;
        case "9":
            FillCzechState();
            break;
        case "12":
            FillAustriaState();
            break;
        case "14":
            FillBelgiumState();
            break;
        case "18":
            FillDenmarkState();
            break;
        case "20":
            FillFinlandState();
            break;
        case "21":
            FillGreeceState();
            break;
        case "22":
            FillHollandState();
            break;
        case "23":
            FillHungaryState();
            break;
        case "34":
            FillNorwayState();
            break;
        case "35":
            FillPolandState();
            break;
        case "36":
            FillPortugalState();
            break;
        case "38":
            FillRussiaState();
            break;
        case "43":
            FillSpainState();
            break;
        case "44":
            FillSwedenState();
            break;
        case "45":
            FillTurkeyState();
            break;
        case "46":
            FillUkraineState();
            break;
        case "47":
            FillHongKongState();
            break;
        case "48":
            FillCanadaState();
            break;
        case "50":
            FillSchweiState();
            break;
        case "51":
            FillThailandState();
            break;
        case "52":
            FillSingaporeState();
            break;
        case "53":
            FillTaiwanState();
            break;
        case "54":
            FillArabState();
            break;
        default:
            InitSlStateOrCity();
            break;
    }
}
//填充州和城市选择
function InitSlStateOrCity() {
    $('#sState').empty();
    GetStateMLang();
}

// 香港
function FillHongKongState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Hong Kong Island'>Hong Kong Island</option>");
    $('#sState').append("<option value='Kowloon'>Kowloon</option>");
    $('#sState').append("<option value='New Territories'>New Territories</option>");
}

// 土耳其
function FillTurkeyState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Istanbul'>Istanbul</option>");
    $('#sState').append("<option value='Ankara'>Ankara</option>");
    $('#sState').append("<option value='Izmir'>Izmir</option>");
    $('#sState').append("<option value='Bursa'>Bursa</option>");
    $('#sState').append("<option value='Adana'>Adana</option>");
    $('#sState').append("<option value='Gaziantep'>Gaziantep</option>");
    $('#sState').append("<option value='Konya'>Konya</option>");
    $('#sState').append("<option value='Antalya'>Antalya</option>");
    $('#sState').append("<option value='Kayseri'>Kayseri</option>");
    $('#sState').append("<option value='Samsun'>Samsun</option>");
    $('#sState').append("<option value='Van'>Van</option>");
    $('#sState').append("<option value='Sivas'>Sivas</option>");
    $('#sState').append("<option value='Trabzon'>Trabzon</option>");
    $('#sState').append("<option value='Edirne'>Edirne</option>");
    $('#sState').append("<option value='Erzincan'>Erzincan</option>");
    $('#sState').append("<option value='Kars'>Kars</option>");
    $('#sState').append("<option value='Bergama'>Bergama</option>");
}

// 台湾
function FillTaiwanState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='TaipeiCity'>TaipeiCity</option>");
    $('#sState').append("<option value='NewTaipeiCity'>NewTaipeiCity</option>");
    $('#sState').append("<option value='TaichungCity'>TaichungCity</option>");
    $('#sState').append("<option value='TainanCity'>TainanCity</option>");
    $('#sState').append("<option value='KaohsiungCity'>KaohsiungCity</option>");
    $('#sState').append("<option value='TaoyuanCounty'>TaoyuanCounty</option>");
    $('#sState').append("<option value='HsinchuCounty'>HsinchuCounty</option>");
    $('#sState').append("<option value='MiaoliCounty'>MiaoliCounty</option>");
    $('#sState').append("<option value='ChanghuaCounty'>ChanghuaCounty</option>");
    $('#sState').append("<option value='NantouCounty'>NantouCounty</option>");
    $('#sState').append("<option value='YunlinCounty'>YunlinCounty</option>");
    $('#sState').append("<option value='ChiayiCounty'>ChiayiCounty</option>");
    $('#sState').append("<option value='PingtungCounty'>PingtungCounty</option>");
    $('#sState').append("<option value='YilanCounty'>YilanCounty</option>");
    $('#sState').append("<option value='HualienCounty'>HualienCounty</option>");
    $('#sState').append("<option value='TaitungCounty'>TaitungCounty</option>");
    $('#sState').append("<option value='PenghuCounty'>PenghuCounty</option>");
    $('#sState').append("<option value='KinmenCounty'>KinmenCounty</option>");
    $('#sState').append("<option value='LienchiangCounty'>LienchiangCounty</option>");
    $('#sState').append("<option value='KeelungCity'>KeelungCity</option>");
    $('#sState').append("<option value='HsinchuCity'>HsinchuCity</option>");
    $('#sState').append("<option value='ChiayiCity'>ChiayiCity</option>");
}

function FillDenmarkState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Region Hovedstaden'>Region Hovedstaden</option>");
    $('#sState').append("<option value='Region Midtjylland'>Region Midtjylland</option>");
    $('#sState').append("<option value='Region Nordjylland'>Region Nordjylland</option>");
    $('#sState').append("<option value='Region Sjælland'>Region Sjælland</option>");
    $('#sState').append("<option value='Region Syddanmark'>Region Syddanmark</option>");
}

function FillUsState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Alabama'>Alabama</option>");
    $('#sState').append("<option value='Alaska'>Alaska</option>");
    $('#sState').append("<option value='Arizona'>Arizona</option>");
    $('#sState').append("<option value='Arkansas'>Arkansas</option>");
    $('#sState').append("<option value='California'>California</option>");
    $('#sState').append("<option value='Colorado'>Colorado</option>");
    $('#sState').append("<option value='Connecticut'>Connecticut</option>");
    $('#sState').append("<option value='Delaware'>Delaware</option>");
    $('#sState').append("<option value='Florida'>Florida</option>");
    $('#sState').append("<option value='Georgia'>Georgia</option>");
    $('#sState').append("<option value='Hawaii'>Hawaii</option>");
    $('#sState').append("<option value='Idaho'>Idaho</option>");
    $('#sState').append("<option value='Illinois'>Illinois</option>");
    $('#sState').append("<option value='Indiana'>Indiana</option>");
    $('#sState').append("<option value='Iowa'>Iowa</option>");
    $('#sState').append("<option value='Kansas'>Kansas</option>");
    $('#sState').append("<option value='Kentucky'>Kentucky</option>");
    $('#sState').append("<option value='Louisiana'>Louisiana</option>");
    $('#sState').append("<option value='Maine'>Maine</option>");
    $('#sState').append("<option value='Maryland'>Maryland</option>");
    $('#sState').append("<option value='Massachusetts'>Massachusetts</option>");
    $('#sState').append("<option value='Michigan'>Michigan</option>");
    $('#sState').append("<option value='Minnesota'>Minnesota</option>");
    $('#sState').append("<option value='Mississippi'>Mississippi</option>");
    $('#sState').append("<option value='Missouri'>Missouri</option>");
    $('#sState').append("<option value='Montana'>Montana</option>");
    $('#sState').append("<option value='Nebraska'>Nebraska</option>");
    $('#sState').append("<option value='Nevada'>Nevada</option>");
    $('#sState').append("<option value='New Hampshire'>New Hampshire</option>");
    $('#sState').append("<option value='New Jersey'>New Jersey</option>");
    $('#sState').append("<option value='New Mexico'>New Mexico</option>");
    $('#sState').append("<option value='New York'>New York</option>");
    $('#sState').append("<option value='North Carolina'>North Carolina</option>");
    $('#sState').append("<option value='North Dakota'>North Dakota</option>");
    $('#sState').append("<option value='Ohio'>Ohio</option>");
    $('#sState').append("<option value='Oklahoma'>Oklahoma</option>");
    $('#sState').append("<option value='Oregon'>Oregon</option>");
    $('#sState').append("<option value='Pennsylvania'>Pennsylvania</option>");
    $('#sState').append("<option value='Rhode Island'>Rhode Island</option>");
    $('#sState').append("<option value='South Carolina'>South Carolina</option>");
    $('#sState').append("<option value='South Dakota'>South Dakota</option>");
    $('#sState').append("<option value='Tennessee'>Tennessee</option>");
    $('#sState').append("<option value='Texas'>Texas</option>");
    $('#sState').append("<option value='Utah'>Utah</option>");
    $('#sState').append("<option value='Vermont'>Vermont</option>");
    $('#sState').append("<option value='Virginia'>Virginia</option>");
    $('#sState').append("<option value='Washington'>Washington</option>");
    $('#sState').append("<option value='West Virginia'>West Virginia</option>");
    $('#sState').append("<option value='Wisconsin'>Wisconsin</option>");
    $('#sState').append("<option value='Wyoming'>Wyoming</option>");
}

function FillEnState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Antrim'>Antrim</option>");
    $('#sState').append("<option value='Armagh'>Armagh</option>");
    $('#sState').append("<option value='Avon'>Avon</option>");
    $('#sState').append("<option value='Bedfordshire'>Bedfordshire</option>");
    $('#sState').append("<option value='Berkshire'>Berkshire</option>");
    $('#sState').append("<option value='Borders'>Borders</option>");
    $('#sState').append("<option value='Buckinghamshire'>Buckinghamshire</option>");
    $('#sState').append("<option value='Cambrigeshire'>Cambrigeshire</option>");
    $('#sState').append("<option value='Central'>Central</option>");
    $('#sState').append("<option value='Cheshire'>Cheshire</option>");
    $('#sState').append("<option value='Cleveland'>Cleveland</option>");
    $('#sState').append("<option value='Clwyd'>Clwyd</option>");
    $('#sState').append("<option value='Cornwall'>Cornwall</option>");
    $('#sState').append("<option value='Cumbria'>Cumbria</option>");
    $('#sState').append("<option value='Derbyshire'>Derbyshire</option>");
    $('#sState').append("<option value='Devon'>Devon</option>");
    $('#sState').append("<option value='Dorset'>Dorset</option>");
    $('#sState').append("<option value='Down'>Down</option>");
    $('#sState').append("<option value='Dumfries and Galloway'>Dumfries and Galloway</option>");
    $('#sState').append("<option value='Durham'>Durham</option>");
    $('#sState').append("<option value='Dyfed'>Dyfed</option>");
    $('#sState').append("<option value='East Sussex'>East Sussex</option>");
    $('#sState').append("<option value='Essex'>Essex</option>");
    $('#sState').append("<option value='Fermanagh'>Fermanagh</option>");
    $('#sState').append("<option value='Fife'>Fife</option>");
    $('#sState').append("<option value='Glouscestershire'>Glouscestershire</option>");
    $('#sState').append("<option value='Grampian'>Grampian</option>");
    $('#sState').append("<option value='Greater Manchester'>Greater Manchester</option>");
    $('#sState').append("<option value='Gwent'>Gwent</option>");
    $('#sState').append("<option value='Gwynedd'>Gwynedd</option>");
    $('#sState').append("<option value='Hampshire'>Hampshire</option>");
    $('#sState').append("<option value='Hereford and Worcester'>Hereford and Worcester</option>");
    $('#sState').append("<option value='Hertfordshire'>Hertfordshire</option>");
    $('#sState').append("<option value='Highland'>Highland</option>");
    $('#sState').append("<option value='Humberside'>Humberside</option>");
    $('#sState').append("<option value='Isle of Wight'>Isle of Wight</option>");
    $('#sState').append("<option value='Kent'>Kent</option>");
    $('#sState').append("<option value='Lacashire'>Lacashire</option>");
    $('#sState').append("<option value='Leicestershire'>Leicestershire</option>");
    $('#sState').append("<option value='Linco1nshire'>Linco1nshire</option>");
    $('#sState').append("<option value='Londonderry'>Londonderry</option>");
    $('#sState').append("<option value='Lothian'>Lothian</option>");
    $('#sState').append("<option value='London'>London</option>");
    $('#sState').append("<option value='Merseyside'>Merseyside</option>");
    $('#sState').append("<option value='Mid Glamorgan'>Mid Glamorgan</option>");
    $('#sState').append("<option value='Norfolk'>Norfolk</option>");
    $('#sState').append("<option value='North Yorkshire'>North Yorkshire</option>");
    $('#sState').append("<option value='Northamptonshire'>Northamptonshire</option>");
    $('#sState').append("<option value='Northumberland'>Northumberland</option>");
    $('#sState').append("<option value='Nottinghamshire'>Nottinghamshire</option>");
    $('#sState').append("<option value='Orkney Islands'>Orkney Islands</option>");
    $('#sState').append("<option value='Oxfordshire'>Oxfordshire</option>");
    $('#sState').append("<option value='Powys'>Powys</option>");
    $('#sState').append("<option value='Shetland Islands'>Shetland Islands</option>");
    $('#sState').append("<option value='Shropshire'>Shropshire</option>");
    $('#sState').append("<option value='Somerset'>Somerset</option>");
    $('#sState').append("<option value='South Glamorgan'>South Glamorgan</option>");
    $('#sState').append("<option value='South Yorkshire'>South Yorkshire</option>");
    $('#sState').append("<option value='Staffordshire'>Staffordshire</option>");
    $('#sState').append("<option value='Strathclyde'>Strathclyde</option>");
    $('#sState').append("<option value='Suffolk'>Suffolk</option>");
    $('#sState').append("<option value='Surrey'>Surrey</option>");
    $('#sState').append("<option value='Tayside'>Tayside</option>");
    $('#sState').append("<option value='Tyne and Wear'>Tyne and Wear</option>");
    $('#sState').append("<option value='Tyrone'>Tyrone</option>");
    $('#sState').append("<option value='Warwickshire'>Warwickshire</option>");
    $('#sState').append("<option value='West Glamorgan'>West Glamorgan</option>");
    $('#sState').append("<option value='West Midlands'>West Midlands</option>");
    $('#sState').append("<option value='West Sussex'>West Sussex</option>");
    $('#sState').append("<option value='West Yorkshire'>West Yorkshire</option>");
    $('#sState').append("<option value='Western Islands'>Western Islands</option>");
    $('#sState').append("<option value='Wiltshire'>Wiltshire</option>");
}

function FillGemState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Baden-Württemberg'>Baden-Württemberg</option>");
    $('#sState').append("<option value='Bayern'>Bayern</option>");
    $('#sState').append("<option value='Berlin'>Berlin</option>");
    $('#sState').append("<option value='Brandenburg'>Brandenburg</option>");
    $('#sState').append("<option value='Bremen'>Bremen</option>");
    $('#sState').append("<option value='Hamburg'>Hamburg</option>");
    $('#sState').append("<option value='Hessen'>Hessen</option>");
    $('#sState').append("<option value='Mecklenburg-Vorpommern'>Mecklenburg-Vorpommern</option>");
    $('#sState').append("<option value='Niedersachsen'>Niedersachsen</option>");
    $('#sState').append("<option value='Nordrhein-Westfalen'>Nordrhein-Westfalen</option>");
    $('#sState').append("<option value='Rheinland-Pfalz'>Rheinland-Pfalz</option>");
    $('#sState').append("<option value='Saarland'>Saarland</option>");
    $('#sState').append("<option value='Sachsen'>Sachsen</option>");
    $('#sState').append("<option value='Sachsen-Anhalt'>Sachsen-Anhalt</option>");
    $('#sState').append("<option value='Schleswig-Holstein'>Schleswig-Holstein</option>");
    $('#sState').append("<option value='Thüringen'>Thüringen</option>");
}

function FillAustrState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='New South Wales'>New South Wales</option>");
    $('#sState').append("<option value='Queensland '>Queensland </option>");
    $('#sState').append("<option value='South Australia'>South Australia</option>");
    $('#sState').append("<option value='Tasmania'>Tasmania</option>");
    $('#sState').append("<option value='Victoria'>Victoria</option>");
    $('#sState').append("<option value='Western Australia'>Western Australia</option>");
    $('#sState').append("<option value='Australia Capital Territory'>Australia Capital Territory</option>");
    $('#sState').append("<option value='Northern Territory'>Northern Territory</option>");
}

function FillJapanState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Aichi-ken'>Aichi-ken</option>");
    $('#sState').append("<option value='Akita-ken'>Akita-ken</option>");
    $('#sState').append("<option value='Aomori-ken'>Aomori-ken</option>");
    $('#sState').append("<option value='Chiba-ken'>Chiba-ken</option>");
    $('#sState').append("<option value='Ehime-ken'>Ehime-ken</option>");
    $('#sState').append("<option value='Fukui-ken'>Fukui-ken</option>");
    $('#sState').append("<option value='Fukuoka-ken'>Fukuoka-ken</option>");
    $('#sState').append("<option value='Fukushima-ken'>Fukushima-ken</option>");
    $('#sState').append("<option value='Gifu-ken'>Gifu-ken</option>");
    $('#sState').append("<option value='Gunma-ken'>Gunma-ken</option>");
    $('#sState').append("<option value='Hiroshima'>Hiroshima</option>");
    $('#sState').append("<option value='Hokkaido'>Hokkaido</option>");
    $('#sState').append("<option value='Hyogo-ken'>Hyogo-ken</option>");
    $('#sState').append("<option value='Ibaraki-ken'>Ibaraki-ken</option>");
    $('#sState').append("<option value='Ishikawa-ken'>Ishikawa-ken</option>");
    $('#sState').append("<option value='Iwate-ken'>Iwate-ken</option>");
    $('#sState').append("<option value='Kagawa-ken'>Kagawa-ken</option>");
    $('#sState').append("<option value='Kagoshima-ken'>Kagoshima-ken</option>");
    $('#sState').append("<option value='Kanagawa-ken'>Kanagawa-ken</option>");
    $('#sState').append("<option value='Kochi-ken'>Kochi-ken</option>");
    $('#sState').append("<option value='Kumamoto-ken'>Kumamoto-ken</option>");
    $('#sState').append("<option value='Kyoto-fu'>Kyoto-fu</option>");
    $('#sState').append("<option value='Mie-ken'>Mie-ken</option>");
    $('#sState').append("<option value='Miyagi-ken'>Miyagi-ken</option>");
    $('#sState').append("<option value='Miyazaki-ken'>Miyazaki-ken</option>");
    $('#sState').append("<option value='Nagano-ken'>Nagano-ken</option>");
    $('#sState').append("<option value='Nagasaki-shi'>Nagasaki-shi</option>");
    $('#sState').append("<option value='Nara-ken'>Nara-ken</option>");
    $('#sState').append("<option value='Niigata-ken'>Niigata-ken</option>");
    $('#sState').append("<option value='Oita-ken'>Oita-ken</option>");
    $('#sState').append("<option value='Okayama-ken'>Okayama-ken</option>");
    $('#sState').append("<option value='Okinawa-ken'>Okinawa-ken</option>");
    $('#sState').append("<option value='Osaka-fu'>Osaka-fu</option>");
    $('#sState').append("<option value='Saga-ken'>Saga-ken</option>");
    $('#sState').append("<option value='Saitama-ken'>Saitama-ken</option>");
    $('#sState').append("<option value='Shiga-ken'>Shiga-ken</option>");
    $('#sState').append("<option value='Shimane-ken'>Shimane-ken</option>");
    $('#sState').append("<option value='Shizuoka-ken'>Shizuoka-ken</option>");
    $('#sState').append("<option value='Tochigi-ken'>Tochigi-ken</option>");
    $('#sState').append("<option value='Tokushima-ken'>Tokushima-ken</option>");
    $('#sState').append("<option value='Tokyo'>Tokyo</option>");
    $('#sState').append("<option value='Tottori-ken'>Tottori-ken</option>");
    $('#sState').append("<option value='Toyama-ken'>Toyama-ken</option>");
    $('#sState').append("<option value='Wakayama-ken'>Wakayama-ken</option>");
    $('#sState').append("<option value='Yamagata-ken'>Yamagata-ken</option>");
    $('#sState').append("<option value='Yamaguchi-ken'>Yamaguchi-ken</option>");
    $('#sState').append("<option value='Yamanashi-ken'>Yamanashi-ken</option>");
}

function FillNewzlandState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Auckland'>Auckland</option>");
    $('#sState').append("<option value='Bay of Plenty'>Bay of Plenty</option>");
    $('#sState').append("<option value='Canterbury'>Canterbury</option>");
    $('#sState').append("<option value='Chatham Islands'>Chatham Islands</option>");
    $('#sState').append("<option value='Gisborne'>Gisborne</option>");
    $('#sState').append("<option value='Hawke s Bay'>Hawke s Bay</option>");
    $('#sState').append("<option value='Manawatu-Wanganui'>Manawatu-Wanganui</option>");
    $('#sState').append("<option value='Marlborough'>Marlborough</option>");
    $('#sState').append("<option value='Nelson'>Nelson</option>");
    $('#sState').append("<option value='Northland'>Northland</option>");
    $('#sState').append("<option value='Otago'>Otago</option>");
    $('#sState').append("<option value='Southland'>Southland</option>");
    $('#sState').append("<option value='Taranaki'>Taranaki</option>");
    $('#sState').append("<option value='Tasman'>Tasman</option>");
    $('#sState').append("<option value='Waikato'>Waikato</option>");
    $('#sState').append("<option value='Wellington'>Wellington</option>");
    $('#sState').append("<option value='West Coast'>West Coast</option>");
}

function FillCanadaState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Alberta'>Alberta</option>");
    $('#sState').append("<option value='British Columbia'>British Columbia</option>");
    $('#sState').append("<option value='Manitoba'>Manitoba</option>");
    $('#sState').append("<option value='Newfoundland and Labrador'>Newfoundland and Labrador</option>");
    $('#sState').append("<option value='New Brunswick'>New Brunswick</option>");
    $('#sState').append("<option value='Nova Scotia'>Nova Scotia</option>");
    $('#sState').append("<option value='Ontario'>Ontario</option>");
    $('#sState').append("<option value='Prince Edward Island'>Prince Edward Island</option>");
    $('#sState').append("<option value='Quebec'>Quebec</option>");
    $('#sState').append("<option value='Saskatchewan'>Saskatchewan</option>");
    $('#sState').append("<option value='Nunavut'>Nunavut</option>");
    $('#sState').append("<option value='Northwest Territories'>Northwest Territories</option>");
    $('#sState').append("<option value='Yukon'>Yukon</option>");
}

function FillCzechState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Praha'>Praha</option>");
    $('#sState').append("<option value='Středočeský kraj'>Středočeský kraj</option>");
    $('#sState').append("<option value='Jihočeský kraj'>Jihočeský kraj</option>");
    $('#sState').append("<option value='Plzeňský kraj'>Plzeňský kraj</option>");
    $('#sState').append("<option value='Karlovarský kraj'>Karlovarský kraj</option>");
    $('#sState').append("<option value='Ústecký kraj'>Ústecký kraj</option>");
    $('#sState').append("<option value='Liberecký kraj'>Liberecký kraj</option>");
    $('#sState').append("<option value='Královéhradecký kraj'>Královéhradecký kraj</option>");
    $('#sState').append("<option value='Pardubický kraj'>Pardubický kraj</option>");
    $('#sState').append("<option value='Vysočina'>Vysočina</option>");
    $('#sState').append("<option value='Jihomoravský kraj'>Jihomoravský kraj</option>");
    $('#sState').append("<option value='Olomoucký kraj'>Olomoucký kraj</option>");
    $('#sState').append("<option value='Zlínský kraj'>Zlínský kraj</option>");
    $('#sState').append("<option value='Moravskoslezský kraj'>Moravskoslezský kraj</option>");
}

function FillHollandState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Groningen'>Groningen</option>");
    $('#sState').append("<option value='Friesland'>Friesland</option>");
    $('#sState').append("<option value='Drenthe'>Drenthe</option>");
    $('#sState').append("<option value='Overijssel'>Overijssel</option>");
    $('#sState').append("<option value='Flevoland'>Flevoland</option>");
    $('#sState').append("<option value='Gelderland'>Gelderland</option>");
    $('#sState').append("<option value='Utrecht'>Utrecht</option>");
    $('#sState').append("<option value='Noord Holland'>Noord Holland</option>");
    $('#sState').append("<option value='Zuid Holland'>Zuid Holland</option>");
    $('#sState').append("<option value='Zeeland'>Zeeland</option>");
    $('#sState').append("<option value='Noord Brabant'>Noord Brabant</option>");
    $('#sState').append("<option value='Limburg'>Limburg</option>");
}

function FillItalyState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Abruzzo'>Abruzzo</option>");
    $('#sState').append("<option value='Valle d Aosta'>Valle d Aosta</option>");
    $('#sState').append("<option value='Puglia'>Puglia</option>");
    $('#sState').append("<option value='Basilicata'>Basilicata</option>");
    $('#sState').append("<option value='Calabria'>Calabria</option>");
    $('#sState').append("<option value='Campania'>Campania</option>");
    $('#sState').append("<option value='Emilia-Romagna'>Emilia-Romagna</option>");
    $('#sState').append("<option value='Friuli-Venezia Giulia'>Friuli-Venezia Giulia</option>");
    $('#sState').append("<option value='Lazio'>Lazio</option>");
    $('#sState').append("<option value='Liguria'>Liguria</option>");
    $('#sState').append("<option value='Lombardia'>Lombardia</option>");
    $('#sState').append("<option value='Marche'>Marche</option>");
    $('#sState').append("<option value='Molise'>Molise</option>");
    $('#sState').append("<option value='Piemonte'>Piemonte</option>");
    $('#sState').append("<option value='Sardegna'>Sardegna</option>");
    $('#sState').append("<option value='Sicilia'>Sicilia</option>");
    $('#sState').append("<option value='Trentino-Alto Adige，Trentino-Südtirol'>Trentino-Alto Adige，Trentino-Südtirol</option>");
    $('#sState').append("<option value='Toscana'>Toscana</option>");
    $('#sState').append("<option value='Umbria'>Umbria</option>");
    $('#sState').append("<option value='Veneto'>Veneto</option>");
}

function FillKoreaState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Seoul'>Seoul</option>");
    $('#sState').append("<option value='Busan'>Busan</option>");
    $('#sState').append("<option value='Daegu'>Daegu</option>");
    $('#sState').append("<option value='Incheon'>Incheon</option>");
    $('#sState').append("<option value='Gwangju'>Gwangju</option>");
    $('#sState').append("<option value='Daejeon'>Daejeon</option>");
    $('#sState').append("<option value='Ulsan'>Ulsan</option>");
    $('#sState').append("<option value='Sejong'>Sejong</option>");
    $('#sState').append("<option value='Gyeonggi'>Gyeonggi</option>");
    $('#sState').append("<option value='Gangwon'>Gangwon</option>");
    $('#sState').append("<option value='North Chungcheong'>North Chungcheong</option>");
    $('#sState').append("<option value='South Chungcheong'>South Chungcheong</option>");
    $('#sState').append("<option value='North Jeolla'>North Jeolla</option>");
    $('#sState').append("<option value='South Jeolla'>South Jeolla</option>");
    $('#sState').append("<option value='North Gyeongsang'>North Gyeongsang</option>");
    $('#sState').append("<option value='South Gyeongsang'>South Gyeongsang</option>");
    $('#sState').append("<option value='Jeju'>Jeju</option>");
}

function FillSwedenState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Stockholm'>Stockholm</option>");
    $('#sState').append("<option value='Uppsala län'>Uppsala län</option>");
    $('#sState').append("<option value='Södermanlands län'>Södermanlands län</option>");
    $('#sState').append("<option value='Östergötlands län'>Östergötlands län</option>");
    $('#sState').append("<option value='Jönköpings län'>Jönköpings län</option>");
    $('#sState').append("<option value='Kronobergs län'>Kronobergs län</option>");
    $('#sState').append("<option value='Kalmar län'>Kalmar län</option>");
    $('#sState').append("<option value='Gotlands län'>Gotlands län</option>");
    $('#sState').append("<option value='Blekinge län'>Blekinge län</option>");
    $('#sState').append("<option value='Skåne län'>Skåne län</option>");
    $('#sState').append("<option value='Hallands län'>Hallands län</option>");
    $('#sState').append("<option value='Västra Götalands län'>Västra Götalands län</option>");
    $('#sState').append("<option value='Värmlands län'>Värmlands län</option>");
    $('#sState').append("<option value='Örebro län'>Örebro län</option>");
    $('#sState').append("<option value='Västmanlands län'>Västmanlands län</option>");
    $('#sState').append("<option value='Dalarna län'>Dalarna län</option>");
    $('#sState').append("<option value='Gävleborgs län'>Gävleborgs län</option>");
    $('#sState').append("<option value='Västernorrlands län'>Västernorrlands län</option>");
    $('#sState').append("<option value='Jämtlands län'>Jämtlands län</option>");
    $('#sState').append("<option value='Västerbottens län'>Västerbottens län</option>");
    $('#sState').append("<option value='Norrbottens län'>Norrbottens län</option>");
}

function FillFranceState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Île-de-France'>Île-de-France</option>");
    $('#sState').append("<option value='Champagne-Ardenne'>Champagne-Ardenne</option>");
    $('#sState').append("<option value='Picardie'>Picardie</option>");
    $('#sState').append("<option value='Haute-Normandie'>Haute-Normandie</option>");
    $('#sState').append("<option value='Centre'>Centre</option>");
    $('#sState').append("<option value='Basse-Normandie'>Basse-Normandie</option>");
    $('#sState').append("<option value='Bourgogne'>Bourgogne</option>");
    $('#sState').append("<option value='Nord-pas-de-Calais'>Nord-pas-de-Calais</option>");
    $('#sState').append("<option value='Lorraine'>Lorraine</option>");
    $('#sState').append("<option value='Alsace'>Alsace</option>");
    $('#sState').append("<option value='Franche-Comté'>Franche-Comté</option>");
    $('#sState').append("<option value='Pays de la Loire'>Pays de la Loire</option>");
    $('#sState').append("<option value='Bretagne'>Bretagne</option>");
    $('#sState').append("<option value='Poitou-Charentes'>Poitou-Charentes</option>");
    $('#sState').append("<option value='Aquitaine'>Aquitaine</option>");
    $('#sState').append("<option value='Midi-Pyrénées'>Midi-Pyrénées</option>");
    $('#sState').append("<option value='Limousin'>Limousin</option>");
    $('#sState').append("<option value='Rhône-Alpes'>Rhône-Alpes</option>");
    $('#sState').append("<option value='Auvergne'>Auvergne</option>");
    $('#sState').append("<option value='Languedoc-Roussillon'>Languedoc-Roussillon</option>");
    $('#sState').append("<option value='Provence-Alpes-Côte d Azur'>Provence-Alpes-Côte d Azur</option>");
    $('#sState').append("<option value='Corse'>Corse</option>");
    $('#sState').append("<option value='Guadeloupe'>Guadeloupe</option>");
    $('#sState').append("<option value='Martinique'>Martinique</option>");
    $('#sState').append("<option value='Guyane'>Guyane</option>");
    $('#sState').append("<option value='Réunion'>Réunion</option>");
}

function FillAustriaState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Eisenstadt'>Eisenstadt</option>");
    $('#sState').append("<option value='Klagenfurt am Wörthersee'>Klagenfurt am Wörthersee</option>");
    $('#sState').append("<option value='Sankt Pölten'>Sankt Pölten</option>");
    $('#sState').append("<option value='Linz'>Linz</option>");
    $('#sState').append("<option value='Salzburg'>Salzburg</option>");
    $('#sState').append("<option value='Graz'>Graz</option>");
    $('#sState').append("<option value='Innsbruck'>Innsbruck</option>");
    $('#sState').append("<option value='Bregenz'>Bregenz</option>");
    $('#sState').append("<option value='Wien'>Wien</option>");
}

function FillBelgiumState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Vlaams Gewest'>Vlaams Gewest</option>");
    $('#sState').append("<option value='Waals Gewest'>Waals Gewest</option>");
    $('#sState').append("<option value='Brussels Hoofdstedelijk Gewest'>Brussels Hoofdstedelijk Gewest</option>");
}

function FillNorwayState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Oslo'>Oslo</option>");
    $('#sState').append("<option value='Akershus'>Akershus</option>");
    $('#sState').append("<option value='Østfold'>Østfold</option>");
    $('#sState').append("<option value='Hedmark'>Hedmark</option>");
    $('#sState').append("<option value='Oppland'>Oppland</option>");
    $('#sState').append("<option value='Buskerud'>Buskerud</option>");
    $('#sState').append("<option value='Vestfold'>Vestfold</option>");
    $('#sState').append("<option value='Telemark'>Telemark</option>");
    $('#sState').append("<option value='Aust Agder'>Aust Agder</option>");
    $('#sState').append("<option value='Vest Agder'>Vest Agder</option>");
    $('#sState').append("<option value='Rogaland'>Rogaland</option>");
    $('#sState').append("<option value='Hordaland'>Hordaland</option>");
    $('#sState').append("<option value='Sogn og Fjordane'>Sogn og Fjordane</option>");
    $('#sState').append("<option value='Møre og Romsdal'>Møre og Romsdal</option>");
    $('#sState').append("<option value='Sør Trøndelag'>Sør Trøndelag</option>");
    $('#sState').append("<option value='Nord Trøndelag'>Nord Trøndelag</option>");
    $('#sState').append("<option value='Nordland'>Nordland</option>");
    $('#sState').append("<option value='Troms'>Troms</option>");
    $('#sState').append("<option value='Finnmark'>Finnmark</option>");
}

function FillPortugalState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Aveiro'>Aveiro</option>");
    $('#sState').append("<option value='Beja'>Beja</option>");
    $('#sState').append("<option value='Braga'>Braga</option>");
    $('#sState').append("<option value='Bragança'>Bragança</option>");
    $('#sState').append("<option value='Castelo Branco'>Castelo Branco</option>");
    $('#sState').append("<option value='Coimbra'>Coimbra</option>");
    $('#sState').append("<option value='Évora'>Évora</option>");
    $('#sState').append("<option value='Faro'>Faro</option>");
    $('#sState').append("<option value='Guarda'>Guarda</option>");
    $('#sState').append("<option value='Leiria'>Leiria</option>");
    $('#sState').append("<option value='Lisboa'>Lisboa</option>");
    $('#sState').append("<option value='Portalegre'>Portalegre</option>");
    $('#sState').append("<option value='Porto'>Porto</option>");
    $('#sState').append("<option value='Santarém'>Santarém</option>");
    $('#sState').append("<option value='Setubal'>Setubal</option>");
    $('#sState').append("<option value='Viana do Castelo'>Viana do Castelo</option>");
    $('#sState').append("<option value='Vila Real'>Vila Real</option>");
    $('#sState').append("<option value='Viseu'>Viseu</option>");
}

function FillFinlandState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Ahvenanmaa'>Ahvenanmaa</option>");
    $('#sState').append("<option value='Ahvenanmaa'>Ahvenanmaa</option>");
    $('#sState').append("<option value='Etelä Suomi'>Etelä Suomi</option>");
    $('#sState').append("<option value='Uusimaa'>Uusimaa</option>");
    $('#sState').append("<option value='Itä Uusimaa'>Itä Uusimaa</option>");
    $('#sState').append("<option value='Kanta Häme'>Kanta Häme</option>");
    $('#sState').append("<option value='päijät Häme'>päijät Häme</option>");
    $('#sState').append("<option value='Kymenlaakso'>Kymenlaakso</option>");
    $('#sState').append("<option value='Etelä Karjala'>Etelä Karjala</option>");
    $('#sState').append("<option value='Länsi Suomi'>Länsi Suomi</option>");
    $('#sState').append("<option value='Varsinais Suomi'>Varsinais Suomi</option>");
    $('#sState').append("<option value='Satakunta'>Satakunta</option>");
    $('#sState').append("<option value='Pirkanmaa'>Pirkanmaa</option>");
    $('#sState').append("<option value='Keski Suomi'>Keski Suomi</option>");
    $('#sState').append("<option value='Etelä Pohjanmaa'>Etelä Pohjanmaa</option>");
    $('#sState').append("<option value='Pohjanmaa'>Pohjanmaa</option>");
    $('#sState').append("<option value='Keski Pohjanmaa'>Keski Pohjanmaa</option>");
    $('#sState').append("<option value='Itä Suomi'>Itä Suomi</option>");
    $('#sState').append("<option value='Etelä Savo'>Etelä Savo</option>");
    $('#sState').append("<option value='Pohjois Savo'>Pohjois Savo</option>");
    $('#sState').append("<option value='Pohjois Karjala'>Pohjois Karjala</option>");
    $('#sState').append("<option value='Oulu'>Oulu</option>");
    $('#sState').append("<option value='Kainuu'>Kainuu</option>");
    $('#sState').append("<option value='Pohjois Pojanmaa'>Pohjois Pojanmaa</option>");
    $('#sState').append("<option value='Lappi'>Lappi</option>");
    $('#sState').append("<option value='Lappi'>Lappi</option>");
    $('#sState').append("<option value='Suomi'>Suomi</option>");
}

function FillRussiaState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Moscow'>Moscow</option>");
    $('#sState').append("<option value='St. Petersburg'>St. Petersburg</option>");
    $('#sState').append("<option value='New Siberia '>New Siberia </option>");
    $('#sState').append("<option value='Ekaterinburg'>Ekaterinburg</option>");
    $('#sState').append("<option value='Nizhniy Novgorod'>Nizhniy Novgorod</option>");
    $('#sState').append("<option value='Samara '>Samara </option>");
    $('#sState').append("<option value='Omsk'>Omsk</option>");
    $('#sState').append("<option value='Kazan'>Kazan</option>");
    $('#sState').append("<option value='Chelyabinsk'>Chelyabinsk</option>");
    $('#sState').append("<option value='Rostov-on-Don'>Rostov-on-Don</option>");
    $('#sState').append("<option value='Ufa'>Ufa</option>");
    $('#sState').append("<option value='Volgograd'>Volgograd</option>");
    $('#sState').append("<option value='Perm'>Perm</option>");
    $('#sState').append("<option value='Krasnoyarsk'>Krasnoyarsk</option>");
    $('#sState').append("<option value='Voronezh'>Voronezh</option>");
    $('#sState').append("<option value='Saratov'>Saratov</option>");
    $('#sState').append("<option value='Krasnodar'>Krasnodar</option>");
    $('#sState').append("<option value='Toljatti'>Toljatti</option>");
    $('#sState').append("<option value='Izhevsk'>Izhevsk</option>");
    $('#sState').append("<option value='Ulyanovsk'>Ulyanovsk</option>");
    $('#sState').append("<option value='Barnaul'>Barnaul</option>");
    $('#sState').append("<option value='Vladivostok'>Vladivostok</option>");
}

function FillSchweiState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Zürich Kant'>Zürich Kant</option>");
    $('#sState').append("<option value='Bourne'>Bourne</option>");
    $('#sState').append("<option value='Luzern'>Luzern</option>");
    $('#sState').append("<option value='Uri Kant'>Uri Kant</option>");
    $('#sState').append("<option value='Schwyz Kant'>Schwyz Kant</option>");
    $('#sState').append("<option value='Obwalden Half Cant'>Obwalden Half Cant</option>");
    $('#sState').append("<option value='Nidwalden Half Kant'>Nidwalden Half Kant</option>");
    $('#sState').append("<option value='Glarus Can'>Glarus Can</option>");
    $('#sState').append("<option value='Zug Kant'>Zug Kant</option>");
    $('#sState').append("<option value='Fribourg Canton de'>Fribourg Canton de</option>");
    $('#sState').append("<option value='Solothurn Kant'>Solothurn Kant</option>");
    $('#sState').append("<option value='Barzel city state'>Barzel city state</option>");
    $('#sState').append("<option value='Barzel country'>Barzel country</option>");
    $('#sState').append("<option value='Schaffhausen Kant'>Schaffhausen Kant</option>");
    $('#sState').append("<option value='Appenzell ausserrhon semi state'>Appenzell ausserrhon semi state</option>");
    $('#sState').append("<option value='Appenzell Innerrhoden Half Canton'>Appenzell Innerrhoden Half Canton</option>");
    $('#sState').append("<option value='Sankt Gallen Kant'>Sankt Gallen Kant</option>");
    $('#sState').append("<option value='Grischun'>Grischun</option>");
    $('#sState').append("<option value='Aargau Kanton'>Aargau Kanton</option>");
    $('#sState').append("<option value='Thurgau Kant'>Thurgau Kant</option>");
    $('#sState').append("<option value='Tessin Kant'>Tessin Kant</option>");
    $('#sState').append("<option value='Waadt Kant'>Waadt Kant</option>");
    $('#sState').append("<option value='Naters Valais'>Naters Valais</option>");
    $('#sState').append("<option value='Neuchâtel Cant De'>Neuchâtel Cant De</option>");
    $('#sState').append("<option value='Genève Canton'>Genève Canton</option>");
    $('#sState').append("<option value='Jura Canton de'>Jura Canton de</option>");

}

function FillThailandState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Chiang Mai'>Chiang Mai</option>");
    $('#sState').append("<option value='Chiang Rai'>Chiang Rai</option>");
    $('#sState').append("<option value='Kamphaeng Phet'>Kamphaeng Phet</option>");
    $('#sState').append("<option value='Lampang'>Lampang</option>");
    $('#sState').append("<option value='Lamphun'>Lamphun</option>");
    $('#sState').append("<option value='Mae Hong Son'>Mae Hong Son</option>");
    $('#sState').append("<option value='Nakhon Sawan'>Nakhon Sawan</option>");
    $('#sState').append("<option value='Nakhon Sawan'>Nakhon Sawan</option>");
    $('#sState').append("<option value='Phayao'>Phayao</option>");
    $('#sState').append("<option value='Phetchabun'>Phetchabun</option>");
    $('#sState').append("<option value='Phichit'>Phichit</option>");
    $('#sState').append("<option value='Phitsanulok'>Phitsanulok</option>");
    $('#sState').append("<option value='Phrae'>Phrae</option>");
    $('#sState').append("<option value='Sukhothai'>Sukhothai</option>");
    $('#sState').append("<option value='Tak'>Tak</option>");
    $('#sState').append("<option value='Uthai Thani'>Uthai Thani</option>");
    $('#sState').append("<option value='Uttaradit'>Uttaradit</option>");
    $('#sState').append("<option value='Amnat Charoen'>Amnat Charoen</option>");
    $('#sState').append("<option value='Buriram'>Buriram</option>");
    $('#sState').append("<option value='Chaiyaphum'>Chaiyaphum</option>");
    $('#sState').append("<option value='Kalasin'>Kalasin</option>");
    $('#sState').append("<option value='Khon Kaen'>Khon Kaen</option>");
    $('#sState').append("<option value='Loei'>Loei</option>");
    $('#sState').append("<option value='Maha Sarakham'>Maha Sarakham</option>");
    $('#sState').append("<option value='Mukdahan'>Mukdahan</option>");
    $('#sState').append("<option value='Nakhon Phanom'>Nakhon Phanom</option>");
    $('#sState').append("<option value='Nakhon Ratchasima'>Nakhon Ratchasima</option>");
    $('#sState').append("<option value='Nong Bua Lamphu'>Nong Bua Lamphu</option>");
    $('#sState').append("<option value='Nong Khai'>Nong Khai</option>");
    $('#sState').append("<option value='Roi Et'>Roi Et</option>");
    $('#sState').append("<option value='Sakon Nakhon'>Sakon Nakhon</option>");
    $('#sState').append("<option value='Si Sa Ket'>Si Sa Ket</option>");
    $('#sState').append("<option value='Surin'>Surin</option>");
    $('#sState').append("<option value='Ubon Ratchathani'>Ubon Ratchathani</option>");
    $('#sState').append("<option value='Udon Thani'>Udon Thani</option>");
    $('#sState').append("<option value='Yasothon'>Yasothon</option>");
    $('#sState').append("<option value='Bueng Kan'>Bueng Kan</option>");
    $('#sState').append("<option value='Chachoengsao'>Chachoengsao</option>");
    $('#sState').append("<option value='Chanthaburi'>Chanthaburi</option>");
    $('#sState').append("<option value='Chon Buri'>Chon Buri</option>");
    $('#sState').append("<option value='Prachin Buri'>Prachin Buri</option>");
    $('#sState').append("<option value='Rayong'>Rayong</option>");
    $('#sState').append("<option value='Sa Kaeo'>Sa Kaeo</option>");
    $('#sState').append("<option value='Trat'>Trat</option>");
    $('#sState').append("<option value='Ang Thong'>Ang Thong</option>");
    $('#sState').append("<option value='Phra Nakhon Si Ayutthaya'>Phra Nakhon Si Ayutthaya</option>");
    $('#sState').append("<option value='Bangkok'>Bangkok</option>");
    $('#sState').append("<option value='Chai Nat'>Chai Nat</option>");
    $('#sState').append("<option value='Kanchanaburi'>Kanchanaburi</option>");
    $('#sState').append("<option value='Lop Buri'>Lop Buri</option>");
    $('#sState').append("<option value='Nakhon Nayok'>Nakhon Nayok</option>");
    $('#sState').append("<option value='Nakhon Pathom'>Nakhon Pathom</option>");
    $('#sState').append("<option value='Nonthaburi'>Nonthaburi</option>");
    $('#sState').append("<option value='Pathum Thani'>Pathum Thani</option>");
    $('#sState').append("<option value='Phetchaburi'>Phetchaburi</option>");
    $('#sState').append("<option value='Phajubkirikun'>Phajubkirikun</option>");
    $('#sState').append("<option value='Ratchaburi'>Ratchaburi</option>");
    $('#sState').append("<option value='Samut Prakan'>Samut Prakan</option>");
    $('#sState').append("<option value='Samut Sakhon'>Samut Sakhon</option>");
    $('#sState').append("<option value='Samut Songkhram'>Samut Songkhram</option>");
    $('#sState').append("<option value='Saraburi'>Saraburi</option>");
    $('#sState').append("<option value='Sing Buri'>Sing Buri</option>");
    $('#sState').append("<option value='Suphan Buri'>Suphan Buri</option>");
    $('#sState').append("<option value='Chumphon'>Chumphon</option>");
    $('#sState').append("<option value='Krabi'>Krabi</option>");
    $('#sState').append("<option value='Narathiwat'>Narathiwat</option>");
    $('#sState').append("<option value='Nakhon Si Thammarat'>Nakhon Si Thammarat</option>");
    $('#sState').append("<option value='Pattani'>Pattani</option>");
    $('#sState').append("<option value='Pattani'>Pattani</option>");
    $('#sState').append("<option value='Phatthalung'>Phatthalung</option>");
    $('#sState').append("<option value='Phuket'>Phuket</option>");
    $('#sState').append("<option value='Ranong'>Ranong</option>");
    $('#sState').append("<option value='Satun'>Satun</option>");
    $('#sState').append("<option value='Songkhla'>Songkhla</option>");
    $('#sState').append("<option value='Surat Thani'>Surat Thani</option>");
    $('#sState').append("<option value='Trang'>Trang</option>");
    $('#sState').append("<option value='Yala'>Yala</option>");
}

function FillHungaryState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Bács-Kiskun Megye'>Bács-Kiskun Megye</option>");
    $('#sState').append("<option value='Baranya Megye'>Baranya Megye</option>");
    $('#sState').append("<option value='Békés Megye'>Békés Megye</option>");
    $('#sState').append("<option value='Borsod-Abaúj-Zemplén Megye'>Borsod-Abaúj-Zemplén Megye</option>");
    $('#sState').append("<option value='Csongrád Megye'>Csongrád Megye</option>");
    $('#sState').append("<option value='Fejér Megye'>Fejér Megye</option>");
    $('#sState').append("<option value='Jerry - Mo pine - Sopron state'>Jerry - Mo pine - Sopron state</option>");
    $('#sState').append("<option value='Hajdu-Bihar Megye'>Hajdu-Bihar Megye</option>");
    $('#sState').append("<option value='Heves Megye'>Heves Megye</option>");
    $('#sState').append("<option value='Gaz - hole - Szolnok, NACE'>Gaz - hole - Szolnok, NACE</option>");
    $('#sState').append("<option value='Komárom-Esztergom Megye'>Komárom-Esztergom Megye</option>");
    $('#sState').append("<option value='Nógrád Megye'>Nógrád Megye</option>");
    $('#sState').append("<option value='Pest Megye'>Pest Megye</option>");
    $('#sState').append("<option value='Somogy Megye'>Somogy Megye</option>");
    $('#sState').append("<option value='Sobol Chi Sauter, Bella of Connecticut'>Sobol Chi Sauter, Bella of Connecticut</option>");
    $('#sState').append("<option value='Tolna Megye'>Tolna Megye</option>");
    $('#sState').append("<option value='Vas Megye'>Vas Megye</option>");
    $('#sState').append("<option value='Veszprém Megye'>Veszprém Megye</option>");
    $('#sState').append("<option value='Zala Megye'>Zala Megye</option>");

}

function FillUkraineState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Kiev Oblast'>Kiev Oblast</option>");
    $('#sState').append("<option value='Vinnyts ka Oblast'>Vinnyts ka Oblast</option>");
    $('#sState').append("<option value='Volyns ka Oblast'>Volyns ka Oblast</option>");
    $('#sState').append("<option value='Dnipropetrovs ka Oblast'>Dnipropetrovs ka Oblast</option>");
    $('#sState').append("<option value='Donets ka Oblast'>Donets ka Oblast</option>");
    $('#sState').append("<option value='Zhytomyr ska Oblast'>Zhytomyr ska Oblast</option>");
    $('#sState').append("<option value='Transcarpathian Oblast'>Transcarpathian Oblast</option>");
    $('#sState').append("<option value='Zaporozhye state'>Zaporozhye state</option>");
    $('#sState').append("<option value='Ivano-Frankivs ka Oblast'>Ivano-Frankivs ka Oblast</option>");
    $('#sState').append("<option value='Kilo Vogler state'>Kilo Vogler state</option>");
    $('#sState').append("<option value='Luhansk Oblast'>Luhansk Oblast</option>");
    $('#sState').append("<option value='The state of Lviv'>The state of Lviv</option>");
    $('#sState').append("<option value='Mykolayiv Oblast'>Mykolayiv Oblast</option>");
    $('#sState').append("<option value='Odes ka Oblast'>Odes'ka Oblast</option>");
    $('#sState').append("<option value='Poltavs ka Oblast'>Poltavs'ka Oblast</option>");
    $('#sState').append("<option value='Rivne Oblast'>Rivne Oblast</option>");
    $('#sState').append("<option value='Sums ka Oblast'>Sums'ka Oblast</option>");
    $('#sState').append("<option value='Ternopil Oblast'>Ternopil Oblast</option>");
    $('#sState').append("<option value='Kharkivs ka Oblast'>Kharkivs'ka Oblast</option>");
    $('#sState').append("<option value='Khersons ka Oblast'>Khersons'ka Oblast</option>");
    $('#sState').append("<option value='Khmel nyts ka Oblast'>Khmel'nyts'ka Oblast</option>");
    $('#sState').append("<option value='Cherkas ka Oblast'>Cherkas'ka Oblast</option>");
    $('#sState').append("<option value='Chernivtsi Oblast'>Chernivtsi Oblast</option>");
    $('#sState').append("<option value='Chernihivska'>Chernihivska</option>");
    $('#sState').append("<option value='The Autonomous Republic of Crimea'>The Autonomous Republic of Crimea</option>");
    $('#sState').append("<option value='Kiev'>Kiev</option>");
    $('#sState').append("<option value='Sebastopol'>Sebastopol</option>");
}

function FillGreeceState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='East Macedonia and Thrace'>East Macedonia and Thrace</option>");
    $('#sState').append("<option value='In Macedonia'>In Macedonia</option>");
    $('#sState').append("<option value='West Macedonia'>West Macedonia</option>");
    $('#sState').append("<option value='Ip Ruth'>Ip Ruth</option>");
    $('#sState').append("<option value='Thessaly'>Thessaly</option>");
    $('#sState').append("<option value='Ioanians'>Ioanians</option>");
    $('#sState').append("<option value='Western Greece'>Western Greece</option>");
    $('#sState').append("<option value='In Greece'>In Greece</option>");
    $('#sState').append("<option value='Attica'>Attica</option>");
    $('#sState').append("<option value='The Peloponnesian'>The Peloponnesian</option>");
    $('#sState').append("<option value='North Aegean Sea'>North Aegean Sea</option>");
    $('#sState').append("<option value='The South Aegean Sea'>The South Aegean Sea</option>");
    $('#sState').append("<option value='Crete'>Crete</option>");
}

function FillSingaporeState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Little India'>Little India</option>");
    $('#sState').append("<option value='Kampong Glam'>Kampong Glam</option>");
    $('#sState').append("<option value='Marina Bay'>Marina Bay</option>");
    $('#sState').append("<option value='Sentosa'>Sentosa</option>");
    $('#sState').append("<option value='Orchard Road'>Orchard Road</option>");
    $('#sState').append("<option value='China Town'>China Town</option>");
}

function FillSpainState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Almería'>Almería</option>");
    $('#sState').append("<option value='Cádiz'>Cádiz</option>");
    $('#sState').append("<option value='Córdoba'>Córdoba</option>");
    $('#sState').append("<option value='Granada'>Granada</option>");
    $('#sState').append("<option value='Huelva'>Huelva</option>");
    $('#sState').append("<option value='Jaén'>Jaén</option>");
    $('#sState').append("<option value='Málaga'>Málaga</option>");
    $('#sState').append("<option value='Sevilla'>Sevilla</option>");
    $('#sState').append("<option value='Huesca'>Huesca</option>");
    $('#sState').append("<option value='Teruel'>Teruel</option>");
    $('#sState').append("<option value='Zaragoza'>Zaragoza</option>");
    $('#sState').append("<option value='Álava'>Álava</option>");
    $('#sState').append("<option value='Vizcaya'>Vizcaya</option>");
    $('#sState').append("<option value='Guipúzcoa'>Guipúzcoa</option>");
    $('#sState').append("<option value='Las Palmas'>Las Palmas</option>");
    $('#sState').append("<option value='Santa Cruz de Tenerife'>Santa Cruz de Tenerife</option>");
    $('#sState').append("<option value='Albacete'>Albacete</option>");
    $('#sState').append("<option value='Ciudad Real'>Ciudad Real</option>");
    $('#sState').append("<option value='Cuenca'>Cuenca</option>");
    $('#sState').append("<option value='Guadalajara'>Guadalajara</option>");
    $('#sState').append("<option value='Toledo'>Toledo</option>");
    $('#sState').append("<option value='Ávila'>Ávila</option>");
    $('#sState').append("<option value='Burgos'>Burgos</option>");
    $('#sState').append("<option value='León'>León</option>");
    $('#sState').append("<option value='Palencia'>Palencia</option>");
    $('#sState').append("<option value='Salamanca'>Salamanca</option>");
    $('#sState').append("<option value='Segovia'>Segovia</option>");
    $('#sState').append("<option value='Soria'>Soria</option>");
    $('#sState').append("<option value='Valladolid'>Valladolid</option>");
    $('#sState').append("<option value='Zamora'>Zamora</option>");
    $('#sState').append("<option value='Barcelona'>Barcelona</option>");
    $('#sState').append("<option value='Gerona'>Gerona</option>");
    $('#sState').append("<option value='Lérida'>Lérida</option>");
    $('#sState').append("<option value='Tarragona'>Tarragona</option>");
    $('#sState').append("<option value='Badajoz'>Badajoz</option>");
    $('#sState').append("<option value='Cáceres'>Cáceres</option>");
    $('#sState').append("<option value='Orense'>Orense</option>");
    $('#sState').append("<option value='Lugo'>Lugo</option>");
    $('#sState').append("<option value='Orense'>Orense</option>");
    $('#sState').append("<option value='Pontevedra'>Pontevedra</option>");
    $('#sState').append("<option value='Castellón'>Castellón</option>");
    $('#sState').append("<option value='Castellón'>Castellón</option>");
    $('#sState').append("<option value='Valencia'>Valencia</option>");
}

function FillPolandState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='województwo wielkopolskie'>województwo wielkopolskie</option>");
    $('#sState').append("<option value='województwo kujawsko-pomorskie'>województwo kujawsko-pomorskie</option>");
    $('#sState').append("<option value='województwo małopolskie'>województwo małopolskie</option>");
    $('#sState').append("<option value='województwo łódzkie'>województwo łódzkie</option>");
    $('#sState').append("<option value='województwo dolnośląskie'>województwo dolnośląskie</option>");
    $('#sState').append("<option value='województwo lubelskie'>województwo lubelskie</option>");
    $('#sState').append("<option value='województwo lubuskie'>województwo lubuskie</option>");
    $('#sState').append("<option value='województwo mazowieckie'>województwo mazowieckie</option>");
    $('#sState').append("<option value='województwo opolskie'>województwo opolskie</option>");
    $('#sState').append("<option value='województwo podlaskie'>województwo podlaskie</option>");
    $('#sState').append("<option value='województwo pomorskie'>województwo pomorskie</option>");
    $('#sState').append("<option value='województwo śląskie'>województwo śląskie</option>");
    $('#sState').append("<option value='województwo podkarpackie'>województwo podkarpackie</option>");
    $('#sState').append("<option value='województwo świętokrzyskie'>województwo świętokrzyskie</option>");
    $('#sState').append("<option value='województwo warmińsko-mazurskie'>województwo warmińsko-mazurskie</option>");
    $('#sState').append("<option value='województwo zachodniopomorskie'>województwo zachodniopomorskie</option>");
}

function FillArabState() {
    $('#sState').empty();
    GetStateMLang();
    $('#sState').append("<option value='Abu Dhabi'>Abu Dhabi</option>");
    $('#sState').append("<option value='Ajman'>Ajman</option>");
    $('#sState').append("<option value='Dubai'>Dubai</option>");
    $('#sState').append("<option value='Fujairah'>Fujairah</option>");
    $('#sState').append("<option value='Ras al-Khaimah'>Ras al-Khaimah</option>");
    $('#sState').append("<option value='Sharjah'>Sharjah</option>");
    $('#sState').append("<option value='Umm al-Qaiwain'>Umm al-Qaiwain</option>");
}

function FillOtherState() {
    InitSlStateOrCity();
    if (business_lang_flag) {
        $('#sState').append("<option value='Other'>Other</option>");
    }
    else {
        $('#sState').append("<option value='Other'>其他</option>");
    }
}
//
function GetStateMLang()
{
    if (business_lang_flag) {
        $('#sState').append("<option value='-1'>state/province/region</option>");
    }
    else {
        $('#sState').append("<option value='-1'>州/省/地區</option>");
    }
}

function initValidatePic(getCodeUrl) {
    $("#ConfirmImage").attr("src", getCodeUrl + "&t=" + Math.random());
}
function Val_Country01() {
    var curCountry = $('#selectcountry option:selected').val();
    if (curCountry == "-1") {
        if (business_lang_flag) { 
            $("#slCountry .mj_err").html("Please select the country of registration");
            $("#slCountry .mj_err").show();
        }
        else {
            $("#slCountry .mj_err").html("請選擇註冊國家");
            $("#slCountry .mj_err").show();
        }
        return false;
    } else {
        $("#slCountry .mj_err").hide();
        return true;
    }
}

function Val_State01() {
    var curState = $('#sState option:selected').val();
    if (curState == "-1") {
        if (business_lang_flag) {
            $("#slState").closest("p").find("span.mj_err").html("Please select the state/province/region");
            $("#slState").closest("p").find("span.mj_err").show();
        }
        else {
            $("#slState").closest("p").find("span.mj_err").html("請選擇州 /省/地區");
            $("#slState").closest("p").find("span.mj_err").show();
        }
        return false;
    } else {
        $("#slState").closest("p").find("span.mj_err").hide();
        return true;
    }
}