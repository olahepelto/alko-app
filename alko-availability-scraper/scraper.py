import bs4
import datetime
import os
import threading
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

#TODO GENERATE ALKO FILE


def mergeAllFiles():
	result_file = open("result.json","w")
	result_file.write("{\"1\":[],\"2\":[],\"3\":[],\"4\":[],\"5\":[],\"6\":[],\"7\":[],\"8\":[],\"9\":[],\"10\":[],")

	result = open("result.json","a")
	for filename in os.listdir('result'):
		file_contents = open("result/" + filename).read()
		
		ifcomma = ","
		if filename == os.listdir('result')[-1]:
			ifcomma = ""
		
		id = 5
		result_file.write(file_contents + ifcomma)
		
	result_file.write("}")
		

def dataToFileWithProductId(id):
	my_url = 'https://www.alko.fi/INTERSHOP/web/WFS/Alko-OnlineShop-Site/fi_FI/-/EUR/ViewProduct-Include?SKU=' + str(id) + '&amp;AppendStoreList=true&amp;AjaxRequestMarker=true#'
	uClient = uReq(my_url)
	page_html = uClient.read()
	uClient.close()

	page_soup = soup(page_html, "html.parser")
	stores = page_soup.findAll("span",{"class":"store-in-stock"})
	values = page_soup.findAll("span",{"class":"right"})

	filename = "result/" + str(id) + ".json"

	f = open(filename,"w")
	
	f.write("\"" + str(id) + "\":" + "[\n")
	for i in range(0,len(stores)):
		singleStore = stores[i].text
		singleValue = values[i+1].text
		
		ifcomma = ""
		if i < len(stores) - 1:
			ifcomma = ","

		alko_stores = ["Alko Turku Skanssi",
		"Alko Vantaa Koivukylä Citymarket",
		"Alko Paimio",
		"Alko Raasepori Karjaa",
		"Alko Lieksa",
		"Alko Turku Tampereentie",
		"Alko Vantaa Korso",
		"Alko Parainen keskusta",
		"Alko Raisio keskusta",
		"Alko Lieto",
		"Alko Parkano",
		"Alko Vantaa Myyrmäki Myyrmanni",
		"Alko Tuusula Hyrylä",
		"Alko Raisio Mylly",
		"Alko Liminka",
		"Alko Vaasa Asevelikylä Prisma",
		"Alko Rauma keskusta",
		"Alko Lohja keskusta Lohjantähti",
		"Alko Vantaa Pakkala Jumbo",
		"Alko Pello",
		"Alko Vaasa keskusta Citymarket",
		"Alko Rauma Äyhö",
		"Alko Lohja Ojamo",
		"Alko Vaasa Kivihaka Citymarket",
		"Alko Riihimäki Atomikortteli",
		"Alko Loimaa",
		"Alko Pieksämäki",
		"Alko Vantaa Tammisto Citymarket",
		"Alko Valkeakoski",
		"Alko Rovaniemi Eteläkeskus",
		"Alko Loviisa",
		"Alko Vantaa Hämeenkylä",
		"Alko Rovaniemi keskusta",
		"Alko Luumäki Taavetti",
		"Alko Rovaniemi Saarenkylä",
		"Alko Maarianhamina Sittkoff",
		"Alko Saarijärvi",
		"Alko Merikarvia",
		"Alko Pietarsaari",
		"Alko Vantaa Tikkurila",
		"Alko Salla",
		"Alko Mikkeli Graani",
		"Alko Salo Halikko",
		"Alko Mikkeli keskusta Stella",
		"Alko Salo Keskusta",
		"Alko Muhos",
		"Alko Salo Perniö",
		"Alko Muonio",
		"Alko Varkaus",
		"Alko Sastamala Vammala",
		"Alko Muurame",
		"Alko Vihti Nummela Citymarket",
		"Alko Savonlinna keskusta",
		"Alko Mynämäki",
		"Alko Virrat",
		"Alko Savonlinna Nojanmaa Prisma",
		"Alko Mäntsälä",
		"Alko Ylivieska",
		"Alko Seinäjoki keskusta K-Supermarket",
		"Alko Mänttä",
		"Alko Ylöjärvi",
		"Alko Seinäjoki Nurmo Prisma",
		"Alko Mäntyharju",
		"Alko Pirkkala Partola",
		"Alko Seinäjoki Pohja Minimani",
		"Alko Naantali",
		"Alko Pori Eteläväylä",
		"Alko Siilinjärvi",
		"Alko Nivala",
		"Alko Pori Itäkeskus Prisma",
		"Alko Sodankylä",
		"Alko Nokia",
		"Alko Pori keskusta Sokos",
		"Alko Sotkamo",
		"Alko Nurmes",
		"Alko Suomussalmi",
		"Alko Nurmijärvi Kirkonkylä",
		"Alko Suonenjoki",
		"Alko Nurmijärvi Klaukkala Citymarket",
		"Alko Sysmä",
		"Alko Närpiö",
		"Alko Säkylä",
		"Alko Pori Puuvilla",
		"Alko Orimattila",
		"Alko Taivalkoski",
		"Alko Orivesi",
		"Alko Tampere Hervanta Duo",
		"Alko Oulainen",
		"Alko Tampere Kaleva Prisma",
		"Alko Oulu Haukipudas",
		"Alko Tampere Koivistonkylä Prisma",
		"Alko Oulu Kaakkuri",
		"Alko Tampere Lielahti Citymarket",
		"Alko Oulu Keskusta Pekuri",
		"Alko Tampere Linnainmaa Prisma",
		"Alko Porvoo Näsi",
		"Alko Oulu Kiiminki",
		"Alko Tampere Puutarhakatu",
		"Alko Oulu Limingantulli",
		"Alko Tampere Ratina",
		"Alko Oulu Linnanmaa",
		"Alko Tampere Sokos",
		"Alko Oulu Raksila",
		"Alko Tampere Tammela",
		"Alko Oulu Välivainio",
		"Alko Tampere Turtola Citymarket",
		"Alko Outokumpu",
		"Alko Teuva",
		"Alko Padasjoki",
		"Alko Tornio",
		"Alko Turku Itäharju",
		"Alko Paltamo",
		"Alko Turku keskusta Stockmann",
		"Alko Turku keskusta Wiklund",
		"Alko Parikkala",
		"Alko Turku Länsikeskus Citymarket",
		"Alko Turku Manhattan",
		"Alko Pertunmaa Kuortti",
		"Alko Pihtipudas",
		"Alko Uusikaarlepyy",
		"Alko Pirkkala keskusta",
		"Alko Uusikaupunki",
		"Alko Vaala",
		"Alko Porvoo Tarmola",
		"Alko Raahe",
		"Alko Posio",
		"Alko Pudasjärvi",
		"Alko Pulkkila",
		"Alko Puolanka",
		"Alko Vantaa Pakkala Jumbo Stockmann",
		"Alko Puumala",
		"Alko Pyhäjärvi",
		"Alko Raasepori Tammisaari",
		"Alko Viitasaari",
		"Alko Ranua",
		"Alko Äänekoski Hirvaskangas",
		"Alko Äänekoski keskusta",
		"Alko Riihimäki Merkos",
		"Alko Ruovesi",
		"Alko Savonlinna Kerimäki",
		"Alko Sipoo Nikkilä",
		"Alko Somero",
		"Alko Tampere Stockmann",
		"Alko Turku Hirvensalo",
		"Alko Turku keskusta Kauppahalli",
		"Alko Turku Kupittaa",
		"Alko Ulvila",
		"Alko Urjala",
		"Alko Utsjoki Nuorgam",
		"Alko Ylitornio",
		"Alko Ähtäri",
		"Alko Espoo Kauklahti",
		"Alko Helsinki Arabianranta Arabia",
		"Alko Helsinki Kalasatama",
		"Alko Helsinki keskusta Arkadia",
		"Alko Helsinki keskusta Sokos",
		"Alko Helsinki Kontula",
		"Alko Hyvinkää Willa",
		"Alko Hämeenlinna Tiiriö",
		"Alko Joensuu Käpykangas Prisma",
		"Alko Jomala Maxinge Center",
		"Alko Karkkila",
		"Alko Lappeenranta Citymarket",
		"Alko Espoo Espoon keskus Entresse",
		"Alko Enontekiö Kilpisjärvi",
		"Alko Espoo Espoonlahti Pikkulaiva",
		"Alko Helsinki keskusta Eteläesplanadi",
		"Alko Helsinki keskusta Kamppi",
		"Alko Järvenpää Citymarket",
		"Alko Espoo Leppävaara Sello",
		"Alko Aura",
		"Alko Espoo Matinkylä Iso Omena",
		"Alko Eura",
		"Alko Helsinki keskusta Stockmann",
		"Alko Espoo Olari Prisma",
		"Alko Hanko",
		"Alko Heinola Citymarket",
		"Alko Helsinki Pikku Huopalahti",
		"Alko Heinola keskusta",
		"Alko Espoo Tapiola Ainoa",
		"Alko Forssa Prismakeskus",
		"Alko Helsinki Itä-Pasila",
		"Alko Helsinki Hakaniemi Ympyrätalo",
		"Alko Helsinki Itäkeskus Prisma",
		"Alko Imatra Mansikkala",
		"Alko Juuka",
		"Alko Kolari Ylläs Äkäslompolo",
		"Alko Helsinki Kruununhaka",
		"Alko Kuhmo",
		"Alko Kuhmoinen",
		"Alko Helsinki Töölöntori",
		"Alko Kuopio Haapaniemi",
		"Alko Helsinki Ullanlinna",
		"Alko Kuopio Petonen",
		"Alko Kauniainen",
		"Alko Kurikka",
		"Alko Kouvola keskusta",
		"Alko Kurikka Jalasjärvi",
		"Alko Kuopio keskusta Sokos",
		"Alko Kärkölä Järvelä",
		"Alko Lahti Nastola Rakokivi",
		"Alko Rantasalmi",
		"Alko Espoo Lähderanta",
		"Alko Helsinki Kasarmitori",
		"Alko Virolahti",
		"Alko Lahti Holma",
		"Alko Helsinki Kannelmäki Kaari",
		"Alko Alajärvi",
		"Alko Helsinki Munkkivuori",
		"Alko Hollola Salpakangas",
		"Alko Ilmajoki",
		"Alko Kangasniemi",
		"Alko Kemiönsaari Kemiö",
		"Alko Kiuruvesi",
		"Alko Kokemäki",
		"Alko Kokkola keskusta K-Supermarket",
		"Alko Kuopio Nilsiä",
		"Alko Lappajärvi",
		"Alko Lappeenranta keskusta Iso Kristiina",
		"Alko Loppi",
		"Alko Pielavesi",
		"Alko Hämeenlinna Goodman",
		"Alko Kuopio Matkus Shopping Center",
		"Alko Alavus keskusta",
		"Alko Hartola",
		"Alko Kouvola Korjala Prisma",
		"Alko Enontekiö Hetta",
		"Alko Helsinki Bulevardi",
		"Alko Alavus Tuuri",
		"Alko Forssa Kutomo",
		"Alko Helsinki Herttoniemi Megahertsi",
		"Alko Helsinki Itäkeskus Easton",
		"Alko Akaa Toijala",
		"Alko Espoo Mankkaa",
		"Alko Helsinki Mellunmäki",
		"Alko Helsinki Pakila",
		"Alko Huittinen",
		"Alko Espoo Niittykumpu",
		"Alko Ilomantsi",
		"Alko Asikkala Vääksy",
		"Alko Helsinki Malmi Nova",
		"Alko Helsinki Pitäjänmäki",
		"Alko Helsinki Ruoholahti",
		"Alko Helsinki Viikki Prisma",
		"Alko Kuopio Savilahti Prisma",
		"Alko Hamina",
		"Alko Helsinki Vuosaari Columbus",
		"Alko Lahti Sokos",
		"Alko Laihia",
		"Alko Lempäälä Ideapark",
		"Alko Hämeenkyrö",
		"Alko Helsinki keskusta Forum",
		"Alko Inari Ivalo",
		"Alko Janakkala Turenki",
		"Alko Helsinki Lauttasaari",
		"Alko Joensuu keskusta Sokos",
		"Alko Helsinki Konalan Portti",
		"Alko Eurajoki",
		"Alko Harjavalta",
		"Alko Joensuu Pilkko Citymarket",
		"Alko Helsinki Käpylä",
		"Alko Jyväskylä Keljo Keljon kauppakeskus",
		"Alko Haapajärvi",
		"Alko Jyväskylä keskusta Sokkari",
		"Alko Haapavesi",
		"Alko Jyväskylä Seppälä Citymarket",
		"Alko Kaarina",
		"Alko Kajaani Prisma",
		"Alko Hankasalmi",
		"Alko Kangasala Prisma",
		"Alko Järvenpää Prisma",
		"Alko Helsinki Wanha Kauppahalli",
		"Alko Helsinki Itäkeskus Itis Stockmann",
		"Alko Kauhajoki",
		"Alko Kerava Prisma",
		"Alko Kannus",
		"Alko Kirkkonummi Munkinmäki Prisma",
		"Alko Helsinki Kallio",
		"Alko Kokkola Kosila Prisma",
		"Alko Kemi",
		"Alko Heinävesi",
		"Alko Kotka Karhula Lidl",
		"Alko Kalajoki",
		"Alko Kotka Sutela Prisma",
		"Alko Kaustinen",
		"Alko Kouvola Valkeala",
		"Alko Jyväskylä Palokka Prisma",
		"Alko Kouvola Tervaskangas",
		"Alko Kittilä keskusta",
		"Alko Kuopio Päiväranta Citymarket",
		"Alko Lahti Laune",
		"Alko Kajaani keskusta Citymarket",
		"Alko Lahti Karisma",
		"Alko Kuusamo Ruka",
		"Alko Lappeenranta Leiri Prisma",
		"Alko Ikaalinen",
		"Alko Lempäälä keskusta",
		"Alko Lapua",
		"Alko Hämeenlinna Idänpää",
		"Alko Kangasala keskusta",
		"Alko Inkoo",
		"Alko Keminmaa",
		"Alko Hämeenlinna Lammi",
		"Alko Iisalmi",
		"Alko Kolari keskusta",
		"Alko Imatra Vuoksenniska",
		"Alko Kemijärvi",
		"Alko Juva",
		"Alko Joutsa",
		"Alko Kotka Pasaati",
		"Alko Jyväskylä Tourula Minimani",
		"Alko Jyväskylä Vaajakoski",
		"Alko Jämsä",
		"Alko Kaavi",
		"Alko Kristiinankaupunki",
		"Alko Sipoo Söderkulla",
		"Alko Kaarina Piikkiö",
		"Alko Kauhava Alahärmä",
		"Alko Kauhava keskusta",
		"Alko Kyyjärvi",
		"Alko Laitila",
		"Alko Kitee",
		"Alko Utsjoki Karigasniemi",
		"Alko Helsinki Taivallahti",
		"Alko Kempele",
		"Alko Keuruu",
		"Alko Kankaanpää",
		"Alko Kouvola Kuusankoski",
		"Alko Kittilä Levi",
		"Alko Hyrynsalmi",
		"Alko Kouvola Inkeroinen",
		"Alko Hämeenlinna Hauho",
		"Alko Kustavi",
		"Alko Lahti Renkomäki",
		"Alko Inari Saariselkä",
		"Alko Joensuu Eno",
		"Alko Laukaa",
		"Alko Sulkava",
		"Alko Kuusamo keskusta",
		"Alko Mikkeli Ristiina",
		"Alko Lahti Syke",
		"Alko Ii",
		"Alko Iitti Kausala",
		"Alko Kärsämäki",
		"Alko Lappeenranta Joutseno",
		"Alko Karstula",
		"Alko Lapinlahti",
		"Alko Kemiönsaari Dragsfjärd Taalintehdas",
		"Alko Leppävirta",
		"Alko Savitaipale",
		"Alko Kuopio Karttula",
		"Alko Parainen Nauvo",
		"Alko Pori Noormarkku",
		"Alko Hausjärvi Oitti",
		"Alko Liperi",
		"Alko Helsinki Mannerheimintie"]
		
		
		
		if singleStore not in alko_stores:
			print("New Alko found! " + singleStore)
			alko_stores.append(singleStore)
		
		f.write("{\"storeName\": \""+singleStore + "\", \"availability\": \"" + singleValue + "\"}" + ifcomma + "\n")
	f.write("\n]")
	f.close()

if not os.path.exists("result"):
    os.makedirs("result")
	
#Open ids list
id_filename = "alko_product_ids.txt";
#id_filename = "testing_ids.txt";

with open(id_filename) as f:
    content = f.readlines()
	
#Remove \n and other chars at end of line
content = [x.strip() for x in content]

i=0;
while(i < len(content)):
	create_amount = 50;
	if(len(content) < i + 50):
		create_amount = len(content) - i
	print(datetime.datetime.now().strftime('%e.%m.%Y %H:%M:%S') + " -- Rows Left: " + str(len(content) - i) + " Creating Threads: " + str(create_amount) + " Done: " + str(i))

	thread_list = []
	for thread_num in range(0, create_amount):
		thread_list.append(threading.Thread(target=dataToFileWithProductId, args=(content[i + thread_num],)))

	for thread_num in range(0, create_amount):
		thread_list[thread_num].start()

	for thread_num in range(0, create_amount):
		thread_list[thread_num].join()
	
	i += create_amount
	
mergeAllFiles()