// Verb table: present [ich, du, er/sie/es, wir, ihr, sie/Sie], perfect (3rd person), simple past (3rd person)
const VERBS = [
  ["sein","to be",["bin","bist","ist","sind","seid","sind"],"ist gewesen","war","A1"],
  ["haben","to have",["habe","hast","hat","haben","habt","haben"],"hat gehabt","hatte","A1"],
  ["werden","to become / will",["werde","wirst","wird","werden","werdet","werden"],"ist geworden","wurde","A2"],
  ["können","can",["kann","kannst","kann","können","könnt","können"],"hat gekonnt","konnte","A1"],
  ["müssen","must",["muss","musst","muss","müssen","müsst","müssen"],"hat gemusst","musste","A1"],
  ["wollen","to want",["will","willst","will","wollen","wollt","wollen"],"hat gewollt","wollte","A1"],
  ["dürfen","may",["darf","darfst","darf","dürfen","dürft","dürfen"],"hat gedurft","durfte","A1"],
  ["möchten","would like",["möchte","möchtest","möchte","möchten","möchtet","möchten"],null,null,"A1"],
  ["gehen","to go",["gehe","gehst","geht","gehen","geht","gehen"],"ist gegangen","ging","A1"],
  ["kommen","to come",["komme","kommst","kommt","kommen","kommt","kommen"],"ist gekommen","kam","A1"],
  ["machen","to do / make",["mache","machst","macht","machen","macht","machen"],"hat gemacht","machte","A1"],
  ["arbeiten","to work",["arbeite","arbeitest","arbeitet","arbeiten","arbeitet","arbeiten"],"hat gearbeitet","arbeitete","A1"],
  ["wohnen","to live",["wohne","wohnst","wohnt","wohnen","wohnt","wohnen"],"hat gewohnt","wohnte","A1"],
  ["heißen","to be called",["heiße","heißt","heißt","heißen","heißt","heißen"],"hat geheißen","hieß","A1"],
  ["lernen","to learn",["lerne","lernst","lernt","lernen","lernt","lernen"],"hat gelernt","lernte","A1"],
  ["sprechen","to speak",["spreche","sprichst","spricht","sprechen","sprecht","sprechen"],"hat gesprochen","sprach","A1"],
  ["essen","to eat",["esse","isst","isst","essen","esst","essen"],"hat gegessen","aß","A1"],
  ["trinken","to drink",["trinke","trinkst","trinkt","trinken","trinkt","trinken"],"hat getrunken","trank","A1"],
  ["sehen","to see",["sehe","siehst","sieht","sehen","seht","sehen"],"hat gesehen","sah","A1"],
  ["fahren","to drive / go",["fahre","fährst","fährt","fahren","fahrt","fahren"],"ist gefahren","fuhr","A1"],
  ["nehmen","to take",["nehme","nimmst","nimmt","nehmen","nehmt","nehmen"],"hat genommen","nahm","A1"],
  ["geben","to give",["gebe","gibst","gibt","geben","gebt","geben"],"hat gegeben","gab","A2"],
  ["lesen","to read",["lese","liest","liest","lesen","lest","lesen"],"hat gelesen","las","A1"],
  ["schlafen","to sleep",["schlafe","schläfst","schläft","schlafen","schlaft","schlafen"],"hat geschlafen","schlief","A1"],
  ["wissen","to know",["weiß","weißt","weiß","wissen","wisst","wissen"],"hat gewusst","wusste","A2"],
  ["finden","to find",["finde","findest","findet","finden","findet","finden"],"hat gefunden","fand","A1"],
  ["bleiben","to stay",["bleibe","bleibst","bleibt","bleiben","bleibt","bleiben"],"ist geblieben","blieb","A2"],
  ["helfen","to help",["helfe","hilfst","hilft","helfen","helft","helfen"],"hat geholfen","half","A2"],
  ["aufstehen","to get up",["stehe auf","stehst auf","steht auf","stehen auf","steht auf","stehen auf"],"ist aufgestanden","stand auf","A1"],
  ["anrufen","to call",["rufe an","rufst an","ruft an","rufen an","ruft an","rufen an"],"hat angerufen","rief an","A1"],
  ["einkaufen","to shop",["kaufe ein","kaufst ein","kauft ein","kaufen ein","kauft ein","kaufen ein"],"hat eingekauft","kaufte ein","A1"]
];
const PRONOUNS = ["ich","du","er/sie/es","wir","ihr","sie/Sie"];

// Lessons whose drills train verb forms (the rest count as grammar)
const VERB_LESSONS = ["a1-1","a1-2","a1-4","a1-6","a1-8","a2-1","a2-2","a2-10","b1-1","b1-5"];

// Mock exams modelled on the Goethe/telc format (original texts, not official material)
// Listening items are spoken by the browser voice. Pass mark: 60 % (B1: 60 % in every module).
const MOCKS = {
 A1: {
  minutes:{hoeren:20,lesen:25,schreiben:20,sprechen:15},
  hoeren:[
   {say:"Achtung am Gleis drei: Der Regionalexpress nach Potsdam fährt heute nicht um vierzehn Uhr zehn, sondern um vierzehn Uhr vierzig.",q:["Wann fährt der Zug?","When does the train leave?"],o:["14:10","14:40","15:10"],a:1},
   {say:"Hallo Tom, hier ist Anna. Wir treffen uns morgen nicht im Café, sondern bei mir zu Hause. Bis morgen!",q:["Wo treffen sie sich?","Where are they meeting?"],o:["im Café","bei Anna","bei Tom"],a:1},
   {say:"Guten Tag. Das macht zusammen neun Euro achtzig.",q:["Wie viel kostet es?","How much is it?"],o:["9,80 €","8,90 €","19,80 €"],a:0},
   {say:"Die Praxis ist von Montag bis Freitag von acht bis zwölf Uhr geöffnet. Am Mittwoch haben wir auch nachmittags von fünfzehn bis achtzehn Uhr geöffnet.",q:["An welchem Tag ist die Praxis auch nachmittags offen?","Which day is the practice also open in the afternoon?"],o:["Montag","Mittwoch","Freitag"],a:1},
   {say:"Liebe Kunden, heute im Angebot: Äpfel, ein Kilo für nur einen Euro neunundneunzig.",q:["Was ist heute billig?","What is cheap today?"],o:["Bananen","Äpfel","Brot"],a:1},
   {say:"Entschuldigung, wo ist die Post? – Gehen Sie hier geradeaus und dann die zweite Straße rechts.",q:["Wie kommt man zur Post?","How do you get to the post office?"],o:["geradeaus, dann die erste Straße links","geradeaus, dann die zweite Straße rechts","rechts, dann geradeaus"],a:1},
   {say:"Mein Name ist Peter Schulz. Ich komme aus Hamburg, aber ich wohne seit fünf Jahren in Berlin.",q:["Wo wohnt Peter?","Where does Peter live?"],o:["in Hamburg","in Berlin","in München"],a:1},
   {say:"Hallo Frau Becker, hier ist Sam. Ich kann heute leider nicht zum Deutschkurs kommen. Ich bin krank.",q:["Warum kommt Sam nicht?","Why isn't Sam coming?"],o:["Sam arbeitet.","Sam ist krank.","Sam hat keine Zeit."],a:1}
  ],
  lesen:[
   {text:["Liebe Sara,\nam Samstag habe ich Geburtstag! Ich mache eine kleine Party bei mir zu Hause. Sie beginnt um 19 Uhr. Kannst du einen Salat mitbringen? Meine Adresse ist Oranienstraße 12.\nIch freue mich!\nViele Grüße, Jonas","Dear Sara, on Saturday it's my birthday! I'm having a small party at my place. It starts at 7 pm. Can you bring a salad? My address is Oranienstraße 12. Looking forward! Best, Jonas"],
    items:[["Die Party ist am Sonntag.",false],["Die Party ist bei Jonas zu Hause.",true],["Sara soll einen Kuchen mitbringen.",false],["Die Party beginnt am Abend.",true]]},
   {text:["Schilder in Berlin:\n① Bäckerei Krause – Mo–Sa 6–18 Uhr, So 7–12 Uhr\n② U8: Wegen Bauarbeiten zwischen Hermannplatz und Leinestraße Ersatzverkehr mit Bussen\n③ Deutschkurs A1: dienstags und donnerstags, 18–19.30 Uhr\n④ WG-Zimmer frei! 450 € warm, ab 1. Dezember. Nur Nichtraucher.","Signs in Berlin: ① Bakery Mon–Sat 6–18, Sun 7–12 ② U8: replacement buses between Hermannplatz and Leinestraße due to construction ③ German course A1: Tue and Thu 18–19.30 ④ Flat-share room free! €450 incl. bills, from 1 Dec. Non-smokers only."],
    items:[["① Am Sonntagnachmittag kann man hier Brot kaufen.",false],["② Zwischen Hermannplatz und Leinestraße fährt man mit dem Bus.",true],["③ Der Kurs ist zweimal pro Woche.",true],["④ Raucher können das Zimmer mieten.",false]]}
  ],
  schreiben:[
   {kind:"form", task:["Ihr Freund Ali Demir (32) aus der Türkei möchte sich für einen Sportkurs anmelden. Er wohnt in der Sonnenallee 45, 12045 Berlin. Er möchte am Wochenende trainieren und mit Karte bezahlen. Füllen Sie das Formular für ihn aus.","Your friend Ali Demir (32) from Turkey wants to sign up for a sports course. He lives at Sonnenallee 45, 12045 Berlin. He wants to train at the weekend and pay by card. Fill in the form for him."],
    fields:[["Alter","age","32"],["Herkunftsland","country of origin","Türkei"],["Postleitzahl","postcode","12045"],["Kurszeit (Wochentag / Wochenende)","course time (weekday / weekend)","Wochenende"],["Zahlung (bar / Karte)","payment (cash / card)","Karte"]]},
   {kind:"text", words:25, task:["Sie können morgen nicht zum Termin beim Friseur kommen. Schreiben Sie eine kurze E-Mail (ca. 30 Wörter): Warum kommen Sie nicht? Bitten Sie um einen neuen Termin. Wann haben Sie Zeit?","You can't make your hairdresser appointment tomorrow. Write a short email (~30 words): Why aren't you coming? Ask for a new appointment. When are you free?"],
    points:[["Anrede","greeting",["hallo","liebe","lieber","sehr geehrte","guten tag"]],["Grund","reason",["weil","krank","arbeiten","muss","leider","keine zeit"]],["neuer Termin","new appointment",["termin","neuen","verschieben"]],["Zeit","when",["montag","dienstag","mittwoch","donnerstag","freitag","samstag","uhr","nächste woche","zeit"]],["Gruß","sign-off",["grüße","gruß","tschüss","bis bald","viele grüße"]]]}
  ],
  sprechen:[
   {task:["Stellen Sie sich vor: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby.","Introduce yourself: name, age, country, where you live, languages, job, hobby."], words:25,
    points:[["Name","name",["heiße","name ist","ich bin"]],["Alter","age",["jahre alt","jahre"]],["Land","country",["komme aus"]],["Wohnort","home",["wohne"]],["Sprachen","languages",["spreche"]],["Beruf","job",["arbeite","beruf","bin student","bin entwickler","bin ingenieur"]],["Hobby","hobby",["gern","hobby","mag"]]]},
   {task:["Thema „Essen“, Karte „Frühstück“: Stellen Sie eine Frage und beantworten Sie sie selbst.","Topic 'food', card 'breakfast': ask a question, then answer it yourself."], words:10,
    points:[["Frage","question",["was","wann","wo","isst du","essen sie","trinkst du","frühstückst"]],["Frühstück","breakfast",["frühstück","frühstücke","morgens"]],["Antwort","answer",["ich esse","ich trinke","ich frühstücke","ich"]]]},
   {task:["Karte: „Fenster“ – Bitten Sie jemanden höflich um etwas.","Card: 'window' – politely ask someone for something."], words:5,
    points:[["höfliche Frage","polite question",["können sie","könnten sie","kannst du","würden sie"]],["bitte","please",["bitte"]],["Fenster","window",["fenster"]]]}
  ]
 },
 A2: {
  minutes:{hoeren:30,lesen:30,schreiben:30,sprechen:15},
  hoeren:[
   {say:"Liebe Fahrgäste, wegen einer Störung fährt die S-Bahn heute nur bis Ostkreuz. Bitte nehmen Sie ab Ostkreuz den Bus.",q:["Was müssen die Fahrgäste ab Ostkreuz machen?","What must passengers do from Ostkreuz?"],o:["den Bus nehmen","warten","zu Fuß gehen"],a:0},
   {say:"Hallo, hier ist Frau Weber vom Bürgeramt. Ihr Termin am Donnerstag muss leider ausfallen. Bitte rufen Sie uns an, um einen neuen Termin zu vereinbaren.",q:["Was soll man tun?","What should you do?"],o:["am Donnerstag kommen","anrufen","eine E-Mail schreiben"],a:1},
   {say:"Gestern war ich mit meiner Schwester im Kino. Der Film war leider langweilig, aber danach haben wir sehr gut gegessen.",q:["Was war gut?","What was good?"],o:["der Film","das Essen","das Kino"],a:1},
   {say:"Im Sportzentrum gibt es ab nächster Woche einen neuen Yogakurs. Er ist immer montags um neunzehn Uhr und kostet acht Euro pro Stunde. Für Studenten ist er billiger.",q:["Wer bezahlt weniger?","Who pays less?"],o:["Studenten","Kinder","Rentner"],a:0},
   {say:"Ich wohne jetzt seit drei Jahren in Neukölln. Früher habe ich in Mitte gewohnt, aber das war mir zu teuer.",q:["Warum ist die Person umgezogen?","Why did the person move?"],o:["Mitte war zu laut.","Mitte war zu teuer.","Die Wohnung war zu klein."],a:1},
   {say:"Das Wetter für Berlin: Am Vormittag scheint die Sonne, am Nachmittag gibt es Regen. Die Temperaturen liegen bei zwölf Grad.",q:["Wie ist das Wetter am Nachmittag?","What's the weather like in the afternoon?"],o:["sonnig","regnerisch","es schneit"],a:1},
   {say:"Kannst du mir bitte helfen? Ich ziehe am Samstag um und brauche jemanden mit einem Auto.",q:["Was braucht die Person?","What does the person need?"],o:["Hilfe beim Umzug","eine neue Wohnung","ein Fahrrad"],a:0},
   {say:"Mir tut seit zwei Tagen der Rücken weh. Ich glaube, ich habe zu lange am Computer gesessen.",q:["Was hat die Person?","What's wrong with the person?"],o:["Kopfschmerzen","Rückenschmerzen","Fieber"],a:1}
  ],
  lesen:[
   {text:["Hallo zusammen! Ich heiße Mehmet und wohne seit einem Jahr in Berlin. Am Anfang war alles schwer: Ich habe keine Wohnung gefunden und habe drei Monate bei einem Freund gewohnt. Jetzt habe ich ein Zimmer in einer WG im Wedding. Meine Mitbewohner sind sehr nett, aber die Küche ist immer schmutzig! Deshalb haben wir jetzt einen Putzplan. Am Wochenende spiele ich Fußball im Park. Kennt jemand einen guten Deutschkurs am Abend? Ich arbeite tagsüber.","Hi all! I'm Mehmet and I've lived in Berlin for a year. At first everything was hard: I didn't find a flat and lived with a friend for three months. Now I have a room in a flat-share in Wedding. My flatmates are very nice, but the kitchen is always dirty! So now we have a cleaning rota. At weekends I play football in the park. Does anyone know a good evening German course? I work during the day."],
    items:[["Mehmet hat sofort eine Wohnung gefunden.",false],["Er wohnt jetzt allein.",false],["In der WG gibt es ein Problem mit der Küche.",true],["Mehmet sucht einen Kurs am Abend.",true]]},
   {text:["Anzeigen:\nA) Café Lotte – täglich Frühstück bis 15 Uhr\nB) Bürgeramt Neukölln – Ausweis & Pass, Termine online buchen\nC) Radstation am Hauptbahnhof – Reparatur in einer Stunde\nD) Fundbüro der BVG – verlorene Sachen aus Bus und Bahn","Ads: A) Café – breakfast daily until 3 pm B) Citizens' office – ID & passport, book online C) Bike station – repair in an hour D) BVG lost & found – items lost on buses and trains"],
    choose:[["Sie möchten am Sonntag frühstücken gehen.",0],["Sie brauchen einen neuen Ausweis.",1],["Ihr Fahrrad ist kaputt.",2],["Sie haben Ihre Tasche in der U-Bahn vergessen.",3]], opts:["A","B","C","D"]}
  ],
  schreiben:[
   {kind:"text", words:20, task:["Sie sind im Bus und kommen 20 Minuten zu spät zu einem Treffen mit Ihrer Freundin. Schreiben Sie eine SMS (ca. 20–30 Wörter): Entschuldigen Sie sich. Warum kommen Sie später? Wo soll sie warten?","You're on the bus and will be 20 minutes late to meet your friend. Write a text (~20–30 words): Apologise. Why are you late? Where should she wait?"],
    points:[["Entschuldigung","apology",["entschuldigung","tut mir leid","sorry","leider"]],["Grund","reason",["bus","stau","verspätung","weil","bahn","denn"]],["Ort","where to wait",["warte","warten","café","im ","vor dem","vor der","bei "]]]},
   {kind:"text", words:35, task:["Ihr Kollege Jan hat Sie zu seinem Geburtstag eingeladen. Schreiben Sie eine E-Mail (ca. 40 Wörter): Bedanken Sie sich. Sagen Sie, dass Sie kommen. Fragen Sie, was Sie mitbringen sollen.","Your colleague Jan invited you to his birthday. Write an email (~40 words): Thank him. Say you're coming. Ask what to bring."],
    points:[["Anrede","greeting",["lieber","hallo","hi"]],["Dank","thanks",["danke","bedanke"]],["Zusage","you're coming",["komme","gern","gerne"]],["Frage","question",["mitbringen","bringen","soll ich"]],["Gruß","sign-off",["grüße","gruß","bis bald","bis dann"]]]}
  ],
  sprechen:[
   {task:["Frage: „Was haben Sie letztes Wochenende gemacht?“ Antworten Sie in 3–4 Sätzen.","Question: 'What did you do last weekend?' Answer in 3–4 sentences."], words:25,
    points:[["Zeit","time",["wochenende","samstag","sonntag","gestern"]],["Perfekt","past tense",["habe","bin"]],["Partizip","participle",["gemacht","gegangen","gegessen","getroffen","gesehen","gefahren","gespielt","gekocht","gelesen","geschlafen"]],["Detail","detail",["mit","weil","dann","danach"]]]},
   {task:["Erzählen Sie über Ihre Wohnung: Wie groß? Welche Zimmer? Was gefällt Ihnen, was nicht?","Talk about your flat: how big? which rooms? what do you like, what not?"], words:30,
    points:[["Wohnung","flat",["wohnung","zimmer"]],["Räume","rooms",["küche","bad","balkon","schlafzimmer"]],["Bewertung","opinion",["gefällt","schön","hell","klein","groß","laut","ruhig"]],["Begründung","reason",["weil","denn","aber"]]]},
   {task:["Sie wollen mit einem Freund ein Geschenk für eine Kollegin kaufen. Machen Sie einen Vorschlag und finden Sie einen Termin.","You and a friend want to buy a present for a colleague. Make a suggestion and find a time."], words:20,
    points:[["Vorschlag","suggestion",["wollen wir","können wir","sollen wir","wie wäre","lass uns"]],["Geschenk","present",["geschenk","kaufen","blumen","buch","gutschein"]],["Termin","time",["wann","uhr","samstag","morgen","nach der arbeit","zeit"]]]}
  ]
 },
 B1: {
  minutes:{hoeren:40,lesen:65,schreiben:60,sprechen:15},
  hoeren:[
   {say:"Sehr geehrte Fahrgäste, aufgrund eines Polizeieinsatzes ist die U7 zwischen Rathaus Neukölln und Hermannplatz unterbrochen. Wir bitten Sie, auf die Buslinie M41 auszuweichen.",q:["Was sollen die Fahrgäste tun?","What should passengers do?"],o:["den Bus M41 nehmen","die U8 nehmen","am Bahnsteig warten"],a:0},
   {say:"Guten Tag, hier spricht Herr Brandt von der Hausverwaltung. Am kommenden Dienstag wird zwischen acht und zwölf Uhr das Wasser abgestellt, weil die Leitungen repariert werden. Wir bitten um Ihr Verständnis.",q:["Warum gibt es am Dienstag kein Wasser?","Why is there no water on Tuesday?"],o:["Die Leitungen werden repariert.","Die Rechnung wurde nicht bezahlt.","Die Küche wird umgebaut."],a:0},
   {say:"Immer mehr Berlinerinnen und Berliner fahren mit dem Fahrrad zur Arbeit. Kritiker sagen jedoch, dass es noch zu wenige sichere Radwege gibt.",q:["Was kritisieren manche Menschen?","What do some people criticise?"],o:["zu teure Fahrkarten","zu wenige sichere Radwege","zu viele Fahrräder"],a:1},
   {say:"Hast du schon gehört? Lisa hat gekündigt. – Wirklich? Warum denn? – Sie hat eine Stelle in Hamburg bekommen, bei der sie viel mehr verdient.",q:["Warum hat Lisa gekündigt?","Why did Lisa quit?"],o:["Sie hatte Streit mit dem Chef.","Sie verdient in Hamburg mehr.","Ihr Partner wohnt in Hamburg."],a:1},
   {say:"Ich hätte meinen alten Job gern behalten, aber die Firma wurde verkauft und viele Stellen wurden gestrichen.",q:["Was ist passiert?","What happened?"],o:["Die Person hat selbst gekündigt.","Die Firma wurde verkauft und es gab weniger Stellen.","Die Firma ist umgezogen."],a:1},
   {say:"Obwohl das Wetter schlecht war, kamen am Wochenende Tausende Menschen zum Festival auf dem Tempelhofer Feld.",q:["Wie war das Wetter?","What was the weather like?"],o:["schlecht","sehr gut","heiß"],a:0},
   {say:"Wer sich in Berlin anmeldet, braucht eine Wohnungsgeberbestätigung vom Vermieter. Ohne dieses Dokument kann die Anmeldung nicht bearbeitet werden.",q:["Was braucht man für die Anmeldung?","What do you need to register?"],o:["eine Bestätigung vom Vermieter","einen Arbeitsvertrag","einen Kontoauszug"],a:0},
   {say:"Ich würde dir raten, den Vertrag nicht sofort zu unterschreiben. Lies ihn lieber in Ruhe durch und frag jemanden, der sich damit auskennt.",q:["Was rät die Person?","What does the person advise?"],o:["sofort unterschreiben","den Vertrag in Ruhe lesen","den Vertrag ablehnen"],a:1}
  ],
  lesen:[
   {text:["Reparieren statt wegwerfen\nIn vielen Berliner Kiezen gibt es inzwischen Repair-Cafés. Dort treffen sich einmal im Monat Menschen, die kaputte Dinge reparieren wollen – vom Toaster bis zur Jeans. Die Hilfe ist kostenlos, Spenden sind aber willkommen. Die Helferinnen und Helfer sind oft Rentner oder Studierende, die gern ihr Wissen teilen. „Es geht nicht nur ums Geld“, sagt Organisatorin Petra Lange, „sondern auch darum, die Nachbarn kennenzulernen.“ Nicht alles kann repariert werden: Bei manchen neuen Geräten fehlen Ersatzteile, oder man kann sie gar nicht öffnen. Trotzdem gelingt die Reparatur in etwa zwei von drei Fällen.","Repair instead of throwing away. Many Berlin neighbourhoods now have repair cafés. Once a month people meet there to fix broken things – from toasters to jeans. Help is free, but donations are welcome. Helpers are often pensioners or students who like to share their knowledge. 'It's not only about money,' says organiser Petra Lange, 'but also about getting to know the neighbours.' Not everything can be repaired: some new devices lack spare parts or can't be opened at all. Still, the repair succeeds in about two out of three cases."],
    items:[["Repair-Cafés gibt es jeden Tag.",false],["Man muss für die Hilfe nichts bezahlen.",true],["Für Petra Lange ist auch der Kontakt zu Nachbarn wichtig.",true],["Alle Geräte können repariert werden.",false],["Die meisten Reparaturen klappen.",true]]},
   {text:["Forum: Sollte man Autos in der Innenstadt verbieten?\nJana: Ich wohne direkt an einer großen Straße. Weniger Autos würden für mich weniger Lärm und bessere Luft bedeuten. Ich bin klar dafür.\nKlaus: Ich bin Handwerker und brauche mein Auto für die Arbeit. Ein Verbot wäre für mich eine Katastrophe.\nEmre: Grundsätzlich finde ich die Idee gut. Aber zuerst muss der Nahverkehr besser werden, sonst funktioniert das nicht.","Forum: should cars be banned in the city centre? Jana: I live right on a big road. Fewer cars would mean less noise and better air for me. I'm clearly for it. Klaus: I'm a tradesman and need my car for work. A ban would be a disaster for me. Emre: In principle I like the idea. But public transport has to improve first, otherwise it won't work."],
    choose:[["Wer ist ohne Bedingung für ein Verbot?",0],["Wer ist gegen ein Verbot?",1],["Wer ist dafür, aber nur unter einer Bedingung?",2]], opts:["Jana","Klaus","Emre"]}
  ],
  schreiben:[
   {kind:"text", words:70, task:["Sie sind vor Kurzem umgezogen. Schreiben Sie einer Freundin (ca. 80 Wörter): Beschreiben Sie Ihre neue Wohnung. Was ist besser als in der alten Wohnung? Laden Sie sie ein und schlagen Sie einen Termin vor.","You recently moved. Write to a friend (~80 words): Describe your new flat. What's better than the old one? Invite her and suggest a date."],
    points:[["Anrede","greeting",["liebe","lieber","hallo"]],["Beschreibung","description",["wohnung","zimmer","balkon","küche","hell"]],["Vergleich","comparison",["besser","größer","ruhiger","schöner","billiger"," als "]],["Einladung","invitation",["einladen","komm","besuch","besuchen","lust"]],["Termin","date",["samstag","sonntag","nächste","wochenende","uhr"]],["Gruß","sign-off",["grüße","gruß","bis bald"]]]},
   {kind:"text", words:60, task:["Im Online-Forum diskutiert man: „Sollten Kinder ein eigenes Handy haben?“ Schreiben Sie Ihre Meinung (ca. 80 Wörter).","In an online forum people are discussing: 'Should children have their own phone?' Write your opinion (~80 words)."],
    points:[["Meinung","opinion",["meinung","finde","denke","glaube"]],["Begründung","reason",["weil","denn","deshalb","da "]],["Gegenargument","counter-argument",["aber","obwohl","einerseits","andererseits","trotzdem"]],["Beispiel","example",["zum beispiel","z. b.","z.b.","beispielsweise"]]]},
   {kind:"text", words:35, task:["Sie können nächste Woche nicht am Kurs teilnehmen. Schreiben Sie Ihrer Kursleiterin Frau Meyer (ca. 40 Wörter). Entschuldigen Sie sich höflich und nennen Sie einen Grund.","You can't attend the course next week. Write to your teacher Ms Meyer (~40 words). Apologise politely and give a reason."],
    points:[["formelle Anrede","formal greeting",["sehr geehrte","liebe frau meyer"]],["Entschuldigung","apology",["leider","entschuldig","tut mir leid"]],["Grund","reason",["weil","da ","denn","krank","termin","dienstreise"]],["formeller Gruß","formal sign-off",["mit freundlichen grüßen","freundliche grüße","viele grüße"]]]}
  ],
  sprechen:[
   {task:["Eine Kollegin hat bald Geburtstag. Planen Sie mit einer Person zusammen eine Überraschung: Was? Wann? Wer bezahlt? (Sagen Sie Ihre Vorschläge.)","A colleague's birthday is coming. Plan a surprise with someone: what? when? who pays? (Say your suggestions.)"], words:40,
    points:[["Vorschlag","suggestion",["wie wäre","könnten wir","sollten wir","lass uns","ich schlage vor"]],["Idee","idea",["geschenk","kuchen","party","essen","blumen"]],["Zeit","time",["wann","uhr","freitag","pause","mittag"]],["Geld","money",["geld","euro","bezahlen","sammeln"]]]},
   {task:["Präsentation: „Wohnen in der Stadt oder auf dem Land?“ Erzählen Sie von Ihrer Erfahrung, nennen Sie Vor- und Nachteile und Ihre Meinung.","Presentation: 'City or countryside living?' Talk about your experience, pros and cons, and your opinion."], words:70,
    points:[["Erfahrung","experience",["früher","ich habe","ich wohne","erfahrung"]],["Vorteil","advantage",["vorteil"]],["Nachteil","disadvantage",["nachteil"]],["Stadt & Land","city & country",["stadt","land"]],["Meinung","opinion",["meinung nach","finde","denke"]],["Verbindung","connectors",["deshalb","obwohl","trotzdem","außerdem","einerseits"]]]},
   {task:["Frage nach Ihrer Präsentation: „Würden Sie gern auf dem Land leben?“ Antworten Sie und begründen Sie.","Question after your talk: 'Would you like to live in the countryside?' Answer and justify."], words:20,
    points:[["Konjunktiv","would",["würde","wäre","hätte"]],["Begründung","reason",["weil","denn","da "]],["Thema","topic",["land","stadt"]]]}
  ]
 }
};
