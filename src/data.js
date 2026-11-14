// Kursinhalt: Überleben (Survival) -> A1 -> A2 -> B1
// Each pair is [German, English]. Drills: [question with ___, answer, options, englishHint]
const COURSE = [
// ───────────────────────── ÜBERLEBEN (Survival) ─────────────────────────
{ id:"s1", level:"S", title:["Hallo & Tschüss","Hello & bye"],
  goal:["Leute grüßen und dich verabschieden.","Greet people and say goodbye."],
  grammar:[
    ["„Hallo“ geht immer. Im Laden sagt man oft „Guten Tag“ oder „Moin“.","'Hallo' always works. In shops people often say 'Guten Tag' or 'Moin'."],
    ["„Du“ ist für Freunde. „Sie“ ist höflich: im Amt, beim Arzt, mit Fremden.","'du' is for friends. 'Sie' is polite: at offices, the doctor, with strangers."],
    ["In Berlin hörst du oft „Tach!“ (= Guten Tag) und „Schönen Tag noch!“.","In Berlin you often hear 'Tach!' (= good day) and 'Have a nice day!'."]],
  vocab:[["Hallo","hello"],["Guten Morgen","good morning"],["Guten Tag","good day / hello"],["Guten Abend","good evening"],["Tschüss","bye"],["Auf Wiedersehen","goodbye (formal)"],["Danke","thanks"],["Danke schön","thank you very much"],["Bitte","please / you're welcome"],["Entschuldigung","excuse me / sorry"],["Ja","yes"],["Nein","no"],["Schönen Tag noch!","have a nice day!"],["Gleichfalls","same to you"]],
  ex:[["Hallo! Guten Morgen!","Hello! Good morning!"],["Danke schön! – Bitte!","Thank you! – You're welcome!"],["Schönen Tag noch! – Danke, gleichfalls!","Have a nice day! – Thanks, you too!"],["Entschuldigung, ist hier frei?","Excuse me, is this seat free?"]],
  drills:[["Schönen Tag noch! – Danke, ___!","gleichfalls",["gleichfalls","bitte","hallo"],"Have a nice day! – Thanks, same to you!"],["Danke! – ___!","Bitte",["Bitte","Ja","Tschüss"],"Thanks! – You're welcome!"],["Am Abend sagt man: Guten ___!","Abend",["Abend","Morgen","Tag"],"In the evening you say: Good evening!"],["___, ist hier frei?","Entschuldigung",["Entschuldigung","Tschüss","Danke"],"Excuse me, is this free?"]],
  mission:["Sag heute an jeder Kasse „Hallo“ und „Tschüss, schönen Tag noch!“.","Today, say 'Hallo' and 'Tschüss, schönen Tag noch!' at every checkout."] },

{ id:"s2", level:"S", title:["Wie bitte?","Sorry, what?"],
  goal:["Sagen, dass du nicht verstehst, und um Hilfe bitten.","Say you don't understand and ask for help."],
  grammar:[
    ["Diese Sätze sind deine Rettung. Lerne sie zuerst!","These sentences are your lifeline. Learn them first!"],
    ["„Langsamer, bitte“ ist nicht unhöflich. Die meisten Leute helfen gern.","'Slower, please' is not rude. Most people are happy to help."],
    ["Bleib auf Deutsch, auch wenn jemand Englisch spricht: „Ich möchte Deutsch üben.“","Stay in German even if someone switches to English: 'I'd like to practise German.'"]],
  vocab:[["Wie bitte?","sorry, what? / pardon?"],["Ich verstehe nicht.","I don't understand."],["Noch einmal, bitte.","once more, please."],["Langsamer, bitte.","slower, please."],["Sprechen Sie Englisch?","do you speak English?"],["Ich lerne Deutsch.","I'm learning German."],["Ich spreche ein bisschen Deutsch.","I speak a little German."],["Was heißt das?","what does that mean?"],["Was heißt … auf Deutsch?","how do you say … in German?"],["Ich weiß nicht.","I don't know."],["Können Sie das wiederholen?","can you repeat that?"],["Ich möchte Deutsch üben.","I'd like to practise German."]],
  ex:[["Wie bitte? Langsamer, bitte.","Sorry? Slower, please."],["Ich lerne Deutsch. Noch einmal, bitte.","I'm learning German. Once more, please."],["Was heißt „receipt“ auf Deutsch?","How do you say 'receipt' in German?"],["Danke, aber ich möchte Deutsch üben.","Thanks, but I'd like to practise German."]],
  drills:[["Ich verstehe ___.","nicht",["nicht","nein","kein"],"I don't understand."],["___, bitte. (slower)","Langsamer",["Langsamer","Schneller","Lauter"],"Slower, please."],["Ich ___ ein bisschen Deutsch.","spreche",["spreche","sprichst","spricht"],"I speak a little German."],["Was ___ das?","heißt",["heißt","heiße","ist heißen"],"What does that mean?"]],
  mission:["Frag heute einmal: „Was heißt das auf Deutsch?“ – zeig dabei auf etwas.","Today ask once: 'What's that in German?' while pointing at something."] },

{ id:"s3", level:"S", title:["Zahlen & Preise","Numbers & prices"],
  goal:["Preise verstehen und Zahlen sagen.","Understand prices and say numbers."],
  grammar:[
    ["13 bis 19: Zahl + zehn → dreizehn, vierzehn. Achtung: sechzehn, siebzehn.","13 to 19: number + zehn. Careful: sechzehn, siebzehn."],
    ["21 bis 99 sagt man rückwärts: 21 = einundzwanzig („eins-und-zwanzig“).","21 to 99 are said backwards: 21 = 'one-and-twenty'."],
    ["Preise: 3,50 € = „drei Euro fünfzig“. 0,80 € = „achtzig Cent“.","Prices: €3.50 = 'three euro fifty'. €0.80 = 'eighty cents'."]],
  vocab:[["null","zero"],["eins","one"],["zwei","two"],["drei","three"],["vier","four"],["fünf","five"],["sechs","six"],["sieben","seven"],["acht","eight"],["neun","nine"],["zehn","ten"],["zwölf","twelve"],["zwanzig","twenty"],["dreißig","thirty"],["fünfzig","fifty"],["hundert","hundred"],["Was kostet das?","how much is that?"],["der Euro","euro"],["teuer","expensive"],["billig","cheap"]],
  ex:[["Was kostet das? – Zwei Euro fünfzig.","How much is that? – Two euros fifty."],["Das macht sieben Euro zwanzig.","That comes to seven euros twenty."],["Das ist zu teuer.","That's too expensive."],["Ich nehme zwei.","I'll take two."]],
  drills:[["21 = ___","einundzwanzig",["einundzwanzig","zwanzigeins","einszwanzig"],"twenty-one"],["16 = ___","sechzehn",["sechzehn","sechszehn","sechzig"],"sixteen"],["30 = ___","dreißig",["dreißig","dreizig","dreizehn"],"thirty"],["4,50 € = vier Euro ___","fünfzig",["fünfzig","fünfzehn","fünf"],"four euros fifty"]],
  mission:["Lies heute im Supermarkt fünf Preise laut (leise reicht!).","Read five prices aloud in the supermarket today (quietly is fine!)."] },

{ id:"s4", level:"S", title:["Bäckerei & Café","Bakery & café"],
  goal:["Essen und Getränke bestellen.","Order food and drinks."],
  grammar:[
    ["Bestellen: „Ich hätte gern …“ oder „Ich nehme …“. Am Ende: „bitte“.","To order: 'I'd like …' or 'I'll take …'. Add 'bitte' at the end."],
    ["„Einen“ für der-Wörter: einen Kaffee. „Ein“ für das-Wörter: ein Brötchen. „Eine“ für die-Wörter: eine Brezel.","'einen' for der-words, 'ein' for das-words, 'eine' for die-words."],
    ["Die Verkäuferin fragt: „Noch etwas?“ Du sagst: „Nein, danke. Das war's.“","The seller asks 'Anything else?' You say 'No thanks, that's all.'"]],
  vocab:[["der Kaffee","coffee"],["der Tee","tea"],["das Wasser","water"],["das Brötchen","bread roll"],["die Brezel","pretzel"],["der Kuchen","cake"],["das Croissant","croissant"],["Ich hätte gern …","I'd like …"],["Ich nehme …","I'll take …"],["zum Mitnehmen","to take away"],["zum Hieressen","to eat in"],["Noch etwas?","anything else?"],["Das war's.","that's all."],["mit Milch","with milk"],["ohne Zucker","without sugar"]],
  ex:[["Ich hätte gern zwei Brötchen, bitte.","I'd like two rolls, please."],["Einen Kaffee mit Milch, bitte.","A coffee with milk, please."],["Zum Mitnehmen oder zum Hieressen?","To take away or to eat in?"],["Noch etwas? – Nein, danke. Das war's.","Anything else? – No thanks, that's all."]],
  drills:[["Ich hätte ___ ein Croissant.","gern",["gern","gut","bitte"],"I'd like a croissant."],["___ Kaffee, bitte.","Einen",["Einen","Eine","Ein"],"A coffee, please."],["___ Brezel, bitte.","Eine",["Eine","Einen","Ein"],"A pretzel, please."],["Nein, danke. Das ___.","war's",["war's","ist's","hat's"],"No thanks, that's all."]],
  mission:["Bestell heute in einer Bäckerei komplett auf Deutsch.","Order at a bakery completely in German today."] },

{ id:"s5", level:"S", title:["Bezahlen","Paying"],
  goal:["An der Kasse bezahlen und Fragen verstehen.","Pay at the till and understand the questions."],
  grammar:[
    ["In Berlin ist Bargeld noch wichtig. Frag: „Kann ich mit Karte zahlen?“","Cash still matters in Berlin. Ask: 'Can I pay by card?'"],
    ["Typische Fragen an der Kasse: „Brauchen Sie eine Tüte?“, „Den Bon dazu?“","Typical till questions: 'Do you need a bag?', 'Want the receipt?'"],
    ["Trinkgeld: ca. 5–10 %. Sag den Betrag: „Machen Sie zwölf.“ oder „Stimmt so.“","Tip about 5–10%. Say the total: 'Make it twelve.' or 'Keep the change.'"]],
  vocab:[["bezahlen","to pay"],["die Karte","card"],["bar","in cash"],["das Bargeld","cash"],["Kann ich mit Karte zahlen?","can I pay by card?"],["Nur bar.","cash only."],["Das macht …","that comes to …"],["der Kassenbon","receipt"],["die Tüte","bag"],["Stimmt so.","keep the change."],["zusammen","together"],["getrennt","separately"],["das Pfand","bottle deposit"],["das Trinkgeld","tip"]],
  ex:[["Kann ich mit Karte zahlen?","Can I pay by card?"],["Zusammen oder getrennt? – Getrennt, bitte.","Together or separate? – Separate, please."],["Brauchen Sie eine Tüte? – Nein, danke.","Do you need a bag? – No, thanks."],["Das macht elf Euro. – Machen Sie zwölf.","That's eleven euros. – Make it twelve."]],
  drills:[["Kann ich mit ___ zahlen?","Karte",["Karte","Tüte","Pfand"],"Can I pay by card?"],["Zusammen oder ___?","getrennt",["getrennt","bar","teuer"],"Together or separately?"],["Brauchen Sie eine ___?","Tüte",["Tüte","Karte","Bon"],"Do you need a bag?"],["Hier sind zwanzig Euro. ___ so.","Stimmt",["Stimmt","Macht","Ist"],"Here's twenty. Keep the change."]],
  mission:["Bezahl heute und antworte auf die Frage nach Tüte oder Bon auf Deutsch.","Pay today and answer the bag/receipt question in German."] },

{ id:"s6", level:"S", title:["Supermarkt & Späti","Supermarket & corner shop"],
  goal:["Nach Produkten fragen und sie finden.","Ask for products and find them."],
  grammar:[
    ["„Wo finde ich …?“ oder „Wo ist …?“ – plus das Produkt.","'Where do I find …?' or 'Where is …?' plus the product."],
    ["„Haben Sie …?“ – die Antwort ist oft „Leider nicht“ oder „Da hinten“.","'Do you have …?' – answers are often 'Unfortunately not' or 'Back there'."],
    ["Pfandflaschen gibst du am Automaten zurück und bekommst einen Bon.","Return deposit bottles at the machine and get a voucher."]],
  vocab:[["der Supermarkt","supermarket"],["der Späti","late-night corner shop"],["Wo finde ich …?","where do I find …?"],["Haben Sie …?","do you have …?"],["Gibt es …?","is there … / are there …?"],["die Milch","milk"],["das Brot","bread"],["das Bier","beer"],["die Flasche","bottle"],["das Obst","fruit"],["das Gemüse","vegetables"],["da hinten","back there"],["hier vorne","here at the front"],["leider","unfortunately"],["ausverkauft","sold out"]],
  ex:[["Entschuldigung, wo finde ich die Milch?","Excuse me, where do I find the milk?"],["Haben Sie Hafermilch?","Do you have oat milk?"],["Die ist da hinten links.","It's back there on the left."],["Leider ausverkauft.","Unfortunately sold out."]],
  drills:[["Wo ___ ich das Brot?","finde",["finde","findest","findet"],"Where do I find the bread?"],["___ Sie Hafermilch?","Haben",["Haben","Hat","Habe"],"Do you have oat milk?"],["Das ist da ___ rechts.","hinten",["hinten","heute","hier"],"It's back there on the right."],["___ es hier Pfand?","Gibt",["Gibt","Hat","Ist"],"Is there a deposit here?"]],
  mission:["Frag im Supermarkt einmal: „Wo finde ich …?“","At the supermarket, ask once: 'Where do I find …?'"] },

{ id:"s7", level:"S", title:["Nach dem Weg fragen","Asking the way"],
  goal:["Den Weg fragen und Richtungen verstehen.","Ask the way and understand directions."],
  grammar:[
    ["Höflich starten: „Entschuldigung, wie komme ich zum/zur …?“","Start politely: 'Excuse me, how do I get to the …?'"],
    ["zum = zu dem (der/das-Wörter): zum Bahnhof. zur = zu der (die-Wörter): zur U-Bahn.","zum for der/das words, zur for die words."],
    ["Achte auf drei Wörter: links, rechts, geradeaus.","Listen for three words: left, right, straight on."]],
  vocab:[["Wie komme ich zum …?","how do I get to the …?"],["Wo ist …?","where is …?"],["links","left"],["rechts","right"],["geradeaus","straight ahead"],["die Ecke","corner"],["die Straße","street"],["die Ampel","traffic light"],["die U-Bahn","underground"],["die S-Bahn","city train"],["die Haltestelle","stop (bus/tram)"],["der Bahnhof","station"],["weit","far"],["in der Nähe","nearby"],["zu Fuß","on foot"]],
  ex:[["Entschuldigung, wie komme ich zur U-Bahn?","Excuse me, how do I get to the U-Bahn?"],["Geradeaus und dann an der Ampel links.","Straight on and then left at the lights."],["Ist das weit? – Nein, fünf Minuten zu Fuß.","Is it far? – No, five minutes on foot."],["Gibt es hier in der Nähe eine Apotheke?","Is there a pharmacy nearby?"]],
  drills:[["Wie komme ich ___ Bahnhof?","zum",["zum","zur","zu"],"How do I get to the station?"],["Wie komme ich ___ U-Bahn?","zur",["zur","zum","zu den"],"How do I get to the U-Bahn?"],["Gehen Sie ___ und dann rechts.","geradeaus",["geradeaus","weit","Ecke"],"Go straight on and then right."],["Ist das ___? – Nein, sehr nah.","weit",["weit","links","teuer"],"Is it far? – No, very close."]],
  mission:["Frag heute eine Person nach dem Weg – auch wenn du ihn kennst.","Ask someone the way today – even if you already know it."] },

{ id:"s8", level:"S", title:["Small Talk","Small talk"],
  goal:["Ein kurzes, freundliches Gespräch führen.","Have a short, friendly chat."],
  grammar:[
    ["Fragen mit W-Wort: Wo, Woher, Was, Wie – das Verb kommt direkt danach.","W-questions: where, where from, what, how – the verb comes right after."],
    ["„Seit“ + Zeit: Ich bin seit drei Monaten in Berlin.","'seit' + time: I've been in Berlin for three months."],
    ["Zum Schluss: „Schönes Wochenende!“ oder „Bis bald!“","To finish: 'Have a nice weekend!' or 'See you soon!'"]],
  vocab:[["Wie geht's?","how are you?"],["Gut, danke. Und dir?","good, thanks. And you?"],["Woher kommst du?","where are you from?"],["Ich komme aus …","I come from …"],["Ich wohne in …","I live in …"],["Was machst du?","what do you do?"],["Ich arbeite als …","I work as …"],["seit","since / for (time)"],["Wie lange?","how long?"],["schön","nice / beautiful"],["Schönes Wochenende!","have a nice weekend!"],["Bis bald!","see you soon!"],["Freut mich!","nice to meet you!"],["Ich heiße …","my name is …"]],
  ex:[["Hallo, ich heiße Lena. Und du?","Hi, I'm Lena. And you?"],["Ich wohne seit drei Monaten in Berlin.","I've been living in Berlin for three months."],["Was machst du beruflich?","What do you do for work?"],["Freut mich! Bis bald!","Nice to meet you! See you soon!"]],
  drills:[["___ kommst du?","Woher",["Woher","Wo","Wie"],"Where are you from?"],["Ich wohne ___ drei Monaten in Berlin.","seit",["seit","für","vor"],"I've lived in Berlin for three months."],["Wie ___'s?","geht",["geht","gehe","gehst"],"How are you?"],["Ich ___ Lena.","heiße",["heiße","heißt","heißen"],"My name is Lena."]],
  mission:["Sag heute einer Person (Nachbar, Kollegin, Barista) zwei Sätze über dich.","Today tell someone (neighbour, colleague, barista) two sentences about yourself."] },

// ───────────────────────── A1 ─────────────────────────
{ id:"a1-1", level:"A1", title:["sein: ich bin, du bist","to be"],
  goal:["Dich vorstellen mit „sein“.","Introduce yourself using 'to be'."],
  grammar:[
    ["sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.","to be: I am, you are, he/she/it is, we are, you (pl.) are, they/you (formal) are."],
    ["Fragen ohne W-Wort beginnen mit dem Verb: Bist du müde?","Yes/no questions start with the verb: Are you tired?"],
    ["„Sie“ (groß) = höflich „you“. „sie“ (klein) = „she“ oder „they“.","'Sie' (capital) = polite you. 'sie' (lower case) = she or they."]],
  vocab:[["ich","I"],["du","you (informal)"],["er","he"],["sie","she / they"],["es","it"],["wir","we"],["ihr","you (plural)"],["Sie","you (formal)"],["sein","to be"],["müde","tired"],["krank","ill"],["neu","new"],["hier","here"],["froh","glad"]],
  ex:[["Ich bin neu hier.","I'm new here."],["Bist du müde?","Are you tired?"],["Wir sind in Berlin.","We are in Berlin."],["Sind Sie Frau Weber?","Are you Ms Weber?"]],
  drills:[["Ich ___ müde.","bin",["bin","bist","ist"],"I am tired."],["Du ___ nett.","bist",["bist","bin","sind"],"You are nice."],["Wir ___ in Berlin.","sind",["sind","seid","ist"],"We are in Berlin."],["Ihr ___ spät.","seid",["seid","sind","bist"],"You (all) are late."]],
  mission:["Sag heute: „Ich bin neu hier“ oder „Ich bin müde“ zu jemandem.","Today say 'I'm new here' or 'I'm tired' to someone."] },

{ id:"a1-2", level:"A1", title:["Verben & Fragen","Verbs & questions"],
  goal:["Regelmäßige Verben im Präsens benutzen.","Use regular verbs in the present tense."],
  grammar:[
    ["Stamm + Endung: ich wohn-e, du wohn-st, er wohn-t, wir wohn-en, ihr wohn-t, sie wohn-en.","Stem + ending: I live, you live, he lives, we live…"],
    ["Das Verb steht immer auf Position 2: Heute arbeite ich.","The verb is always in position 2: Today I work."],
    ["Manche Verben ändern den Vokal: sprechen → du sprichst, er spricht; essen → du isst.","Some verbs change vowel: sprechen → du sprichst; essen → du isst."]],
  vocab:[["wohnen","to live"],["kommen","to come"],["arbeiten","to work"],["lernen","to learn"],["machen","to do / make"],["sprechen","to speak"],["trinken","to drink"],["essen","to eat"],["gehen","to go"],["was","what"],["wo","where"],["wer","who"],["wie","how"],["heute","today"]],
  ex:[["Ich lerne Deutsch.","I'm learning German."],["Wo arbeitest du?","Where do you work?"],["Heute arbeite ich nicht.","Today I'm not working."],["Er spricht gut Englisch.","He speaks English well."]],
  drills:[["Du ___ in Berlin.","wohnst",["wohnst","wohnt","wohne"],"You live in Berlin."],["Wir ___ Deutsch.","lernen",["lernen","lernt","lerne"],"We learn German."],["Er ___ bei Siemens.","arbeitet",["arbeitet","arbeit","arbeitest"],"He works at Siemens."],["Sie (she) ___ gut Deutsch.","spricht",["spricht","sprecht","sprichst"],"She speaks German well."]],
  mission:["Sag drei Sätze laut über deinen Tag: Ich arbeite… Ich esse… Ich gehe…","Say three sentences aloud about your day: I work… I eat… I go…"] },

{ id:"a1-3", level:"A1", title:["der, die, das","Articles"],
  goal:["Nomen mit Artikel lernen.","Learn nouns with their article."],
  grammar:[
    ["Jedes Nomen hat ein Genus: der (m), die (f), das (n). Plural: immer die.","Every noun has a gender: der, die, das. Plural is always die."],
    ["Lerne das Wort immer mit Artikel! Tipps: -ung, -heit, -keit → die; -chen → das.","Always learn the word with its article! Tips: -ung, -heit, -keit → die; -chen → das."],
    ["ein/eine = a. kein/keine = no, not a. Das ist kein Tisch.","ein/eine = a. kein/keine = not a."]],
  vocab:[["der Tisch","table"],["der Stuhl","chair"],["der Schlüssel","key"],["die Tür","door"],["die Lampe","lamp"],["die Tasche","bag"],["die Zeitung","newspaper"],["das Fenster","window"],["das Buch","book"],["das Handy","mobile phone"],["das Mädchen","girl"],["die Wohnung","flat"],["kein","no / not a"]],
  ex:[["Das ist ein Tisch.","That is a table."],["Das ist keine Lampe.","That is not a lamp."],["Wo ist der Schlüssel?","Where is the key?"],["Die Wohnung ist klein.","The flat is small."]],
  drills:[["___ Wohnung","Die",["Die","Der","Das"],"the flat"],["___ Handy","Das",["Das","Der","Die"],"the phone"],["Das ist ___ Stuhl.","ein",["ein","eine","einen"],"That is a chair."],["Das ist ___ Tasche, das ist ein Rucksack.","keine",["keine","kein","nicht"],"That's not a bag, it's a backpack."]],
  mission:["Klebe heute fünf Zettel mit Artikel + Wort in deiner Wohnung auf (der Tisch …).","Stick five notes with article + word around your flat today."] },

{ id:"a1-4", level:"A1", title:["Familie & haben","Family & to have"],
  goal:["Über Familie sprechen.","Talk about family."],
  grammar:[
    ["haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.","to have: I have, you have, he has…"],
    ["mein/dein (my/your). Bei die-Wörtern und Plural mit -e: meine Mutter, meine Eltern.","my/your. Add -e for die-words and plural."],
    ["sein = his, ihr = her, unser = our: sein Bruder, ihre Schwester.","sein = his, ihr = her, unser = our."]],
  vocab:[["die Familie","family"],["die Mutter","mother"],["der Vater","father"],["die Eltern","parents"],["der Bruder","brother"],["die Schwester","sister"],["die Geschwister","siblings"],["das Kind","child"],["der Sohn","son"],["die Tochter","daughter"],["der Partner","partner (m)"],["die Partnerin","partner (f)"],["verheiratet","married"],["ledig","single"]],
  ex:[["Ich habe einen Bruder.","I have a brother."],["Hast du Geschwister?","Do you have siblings?"],["Meine Schwester wohnt in München.","My sister lives in Munich."],["Seine Eltern sind sehr nett.","His parents are very nice."]],
  drills:[["Du ___ zwei Kinder.","hast",["hast","habt","hat"],"You have two children."],["Er ___ keine Zeit.","hat",["hat","hast","habe"],"He has no time."],["___ Mutter heißt Maria.","Meine",["Meine","Mein","Meinen"],"My mother is called Maria."],["Das ist ___ Bruder.","mein",["mein","meine","meinem"],"That is my brother."]],
  mission:["Zeig jemandem ein Foto und sag: „Das ist mein/meine …“","Show someone a photo and say 'This is my …'"] },

{ id:"a1-5", level:"A1", title:["Uhrzeit & Tage","Time & days"],
  goal:["Uhrzeit und Termine verstehen.","Understand times and appointments."],
  grammar:[
    ["Tage: am Montag. Uhrzeit: um 8 Uhr. Monate: im Mai.","Days: on Monday (am). Time: at 8 (um). Months: in May (im)."],
    ["Achtung: „halb neun“ = 8:30 (halb auf dem Weg zu neun).","Careful: 'halb neun' = 8:30 (half way to nine)."],
    ["Viertel nach drei = 3:15. Viertel vor vier = 3:45.","Quarter past three = 3:15. Quarter to four = 3:45."]],
  vocab:[["der Montag","Monday"],["der Dienstag","Tuesday"],["der Mittwoch","Wednesday"],["der Donnerstag","Thursday"],["der Freitag","Friday"],["der Samstag","Saturday"],["der Sonntag","Sunday"],["das Wochenende","weekend"],["Wie spät ist es?","what time is it?"],["halb","half (to)"],["Viertel nach","quarter past"],["Viertel vor","quarter to"],["morgen","tomorrow"],["die Uhr","clock / o'clock"]],
  ex:[["Wie spät ist es? – Es ist halb drei.","What time is it? – It's half past two."],["Der Kurs ist am Dienstag um 18 Uhr.","The course is on Tuesday at 6 pm."],["Am Wochenende habe ich frei.","I'm free at the weekend."],["Bis morgen!","See you tomorrow!"]],
  drills:[["8:30 = halb ___","neun",["neun","acht","zehn"],"half past eight"],["___ Montag","Am",["Am","Um","Im"],"on Monday"],["___ 10 Uhr","Um",["Um","Am","Im"],"at 10 o'clock"],["3:15 = Viertel ___ drei","nach",["nach","vor","halb"],"quarter past three"]],
  mission:["Frag heute jemanden: „Wie spät ist es?“","Ask someone today: 'What time is it?'"] },

{ id:"a1-6", level:"A1", title:["Mein Tag","My daily routine"],
  goal:["Trennbare Verben benutzen.","Use separable verbs."],
  grammar:[
    ["Trennbare Verben: Das Präfix geht ans Ende. aufstehen → Ich stehe um 7 Uhr auf.","Separable verbs: the prefix goes to the end."],
    ["einkaufen → Wir kaufen am Samstag ein. anrufen → Ich rufe dich an.","shop → We shop on Saturday. call → I'll call you."],
    ["Mit Modalverb bleibt das Verb zusammen: Ich muss früh aufstehen.","With a modal verb it stays together: I have to get up early."]],
  vocab:[["aufstehen","to get up"],["frühstücken","to have breakfast"],["anfangen","to start"],["einkaufen","to go shopping"],["anrufen","to call"],["fernsehen","to watch TV"],["mitkommen","to come along"],["aufräumen","to tidy up"],["kochen","to cook"],["schlafen","to sleep"],["morgens","in the morning"],["abends","in the evening"],["früh","early"],["spät","late"]],
  ex:[["Ich stehe um sieben Uhr auf.","I get up at seven."],["Rufst du mich morgen an?","Will you call me tomorrow?"],["Kommst du mit?","Are you coming along?"],["Der Film fängt um acht an.","The film starts at eight."]],
  drills:[["Ich stehe um 7 Uhr ___.","auf",["auf","an","ein"],"I get up at 7."],["Wir kaufen im Supermarkt ___.","ein",["ein","auf","mit"],"We shop at the supermarket."],["Der Kurs ___ um 9 Uhr an.","fängt",["fängt","anfängt","fangt"],"The course starts at 9."],["Ich ___ dich später an.","rufe",["rufe","anrufe","ruft"],"I'll call you later."]],
  mission:["Beschreib heute Abend laut deinen Tag in fünf Sätzen.","Tonight describe your day aloud in five sentences."] },

{ id:"a1-7", level:"A1", title:["Einkaufen: Akkusativ","Shopping: accusative"],
  goal:["Sagen, was du kaufst und brauchst.","Say what you buy and need."],
  grammar:[
    ["Das Objekt steht im Akkusativ. Nur maskulin ändert sich: der → den, ein → einen, kein → keinen.","The object takes the accusative. Only masculine changes."],
    ["die, das und Plural bleiben gleich: Ich kaufe die Milch, das Brot, die Eier.","die, das and plural stay the same."],
    ["Verben mit Akkusativ: haben, brauchen, kaufen, suchen, nehmen, möchten.","Verbs with accusative: have, need, buy, look for, take, would like."]],
  vocab:[["der Apfel","apple"],["die Banane","banana"],["der Käse","cheese"],["das Ei","egg"],["die Eier","eggs"],["die Tomate","tomato"],["die Kartoffel","potato"],["das Fleisch","meat"],["der Reis","rice"],["brauchen","to need"],["kaufen","to buy"],["suchen","to look for"],["nehmen","to take"],["die Kasse","checkout"]],
  ex:[["Ich brauche einen Apfel.","I need an apple."],["Haben Sie keinen Käse?","Don't you have any cheese?"],["Ich nehme die Tomaten.","I'll take the tomatoes."],["Ich suche den Reis.","I'm looking for the rice."]],
  drills:[["Ich kaufe ___ Käse.","den",["den","der","dem"],"I'm buying the cheese."],["Ich brauche ___ Apfel.","einen",["einen","ein","eine"],"I need an apple."],["Wir suchen ___ Kasse.","die",["die","den","der"],"We're looking for the checkout."],["Er hat ___ Bruder.","keinen",["keinen","kein","keine"],"He has no brother."]],
  mission:["Schreib deinen Einkaufszettel heute auf Deutsch – mit Artikel.","Write today's shopping list in German – with articles."] },

{ id:"a1-8", level:"A1", title:["können, müssen, wollen","Modal verbs"],
  goal:["Sagen, was du kannst, musst und willst.","Say what you can, must and want to do."],
  grammar:[
    ["Modalverb auf Position 2, Infinitiv am Ende: Ich kann heute nicht kommen.","Modal in position 2, infinitive at the end."],
    ["ich und er haben keine Endung: ich kann, er kann; ich muss, er muss; ich will.","I and he forms have no ending."],
    ["dürfen = erlaubt: Hier darf man nicht rauchen. sollen = jemand sagt es dir.","dürfen = allowed. sollen = someone tells you to."]],
  vocab:[["können","can"],["müssen","must / have to"],["wollen","to want"],["dürfen","may / be allowed"],["sollen","should / supposed to"],["helfen","to help"],["warten","to wait"],["parken","to park"],["rauchen","to smoke"],["leider","unfortunately"],["vielleicht","maybe"],["natürlich","of course"],["die Zeit","time"],["Kein Problem!","no problem!"]],
  ex:[["Kannst du mir helfen?","Can you help me?"],["Ich muss heute lange arbeiten.","I have to work late today."],["Hier darf man nicht parken.","You may not park here."],["Wir wollen nach Potsdam fahren.","We want to go to Potsdam."]],
  drills:[["Er ___ gut kochen.","kann",["kann","könnt","kannt"],"He can cook well."],["Du ___ warten.","musst",["musst","muss","müsst"],"You have to wait."],["Ich kann heute nicht ___.","kommen",["kommen","komme","kommt"],"I can't come today."],["Hier ___ man nicht rauchen.","darf",["darf","dürfen","darfst"],"You may not smoke here."]],
  mission:["Frag heute: „Können Sie mir helfen?“ (z. B. im Laden).","Ask today: 'Can you help me?' (e.g. in a shop)."] },

{ id:"a1-9", level:"A1", title:["Wohnung & Anmeldung","Flat & registration"],
  goal:["Über deine Wohnung sprechen und dich anmelden.","Talk about your flat and register your address."],
  grammar:[
    ["es gibt + Akkusativ = there is/are: Es gibt einen Balkon.","es gibt + accusative = there is/are."],
    ["Kaltmiete = ohne Heizung. Warmmiete = mit Heizung und Nebenkosten.","Cold rent = without heating. Warm rent = with heating and utilities."],
    ["Nach dem Umzug musst du dich beim Bürgeramt anmelden (innerhalb von 14 Tagen).","After moving you must register at the Bürgeramt (within 14 days)."]],
  vocab:[["das Zimmer","room"],["die Küche","kitchen"],["das Bad","bathroom"],["das Schlafzimmer","bedroom"],["der Balkon","balcony"],["die Miete","rent"],["die Kaution","deposit"],["der Vermieter","landlord"],["die WG","shared flat"],["die Anmeldung","address registration"],["das Bürgeramt","citizens' office"],["der Termin","appointment"],["der Ausweis","ID card"],["der Reisepass","passport"]],
  ex:[["Die Wohnung hat zwei Zimmer und einen Balkon.","The flat has two rooms and a balcony."],["Wie hoch ist die Kaution?","How much is the deposit?"],["Ich brauche einen Termin beim Bürgeramt.","I need an appointment at the citizens' office."],["Ich möchte mich anmelden.","I'd like to register my address."]],
  drills:[["Es gibt ___ Balkon.","einen",["einen","ein","eine"],"There is a balcony."],["Die Küche ___ klein.","ist",["ist","sind","hat"],"The kitchen is small."],["Ich brauche ___ Termin.","einen",["einen","ein","eine"],"I need an appointment."],["Wie hoch ist die ___?","Miete",["Miete","Zimmer","Bad"],"How high is the rent?"]],
  mission:["Beschreib laut deine Wohnung: Zimmer, Küche, Bad, Miete.","Describe your flat aloud: rooms, kitchen, bathroom, rent."] },

{ id:"a1-10", level:"A1", title:["Wetter & Freizeit","Weather & free time"],
  goal:["Über Hobbys und das Wetter reden.","Talk about hobbies and the weather."],
  grammar:[
    ["gern + Verb = like doing: Ich lese gern. Ich koche nicht gern.","gern + verb = like doing."],
    ["nicht verneint Verben und Adjektive; kein verneint Nomen: Ich habe kein Hobby.","nicht negates verbs/adjectives; kein negates nouns."],
    ["Wetter mit „es“: Es regnet. Es ist kalt. Es schneit.","Weather uses 'es': It's raining. It's cold."]],
  vocab:[["das Wetter","weather"],["die Sonne","sun"],["der Regen","rain"],["Es regnet.","it's raining."],["kalt","cold"],["warm","warm"],["gern","gladly / like to"],["lesen","to read"],["schwimmen","to swim"],["spazieren gehen","to go for a walk"],["Sport machen","to do sport"],["das Hobby","hobby"],["Musik hören","to listen to music"],["Freunde treffen","to meet friends"]],
  ex:[["Ich lese gern.","I like reading."],["Bei Regen bleibe ich zu Hause.","When it rains I stay at home."],["Am Sonntag gehen wir im Tempelhofer Feld spazieren.","On Sunday we go for a walk on Tempelhofer Feld."],["Heute ist es kalt.","It's cold today."]],
  drills:[["Ich schwimme ___. (I like swimming.)","gern",["gern","gut","viel"],"I like swimming."],["Ich habe ___ Zeit.","keine",["keine","nicht","kein"],"I have no time."],["Ich koche ___ gern.","nicht",["nicht","kein","keine"],"I don't like cooking."],["___ regnet.","Es",["Es","Er","Das"],"It's raining."]],
  mission:["Sag heute jemandem etwas über das Wetter: „Heute ist es …“","Say something about the weather to someone today."] },

// ───────────────────────── A2 ─────────────────────────
{ id:"a2-1", level:"A2", title:["Perfekt mit haben","Past with haben"],
  goal:["Über gestern und das Wochenende sprechen.","Talk about yesterday and the weekend."],
  grammar:[
    ["Gesprochene Vergangenheit: haben (Position 2) + Partizip (Ende). Ich habe Pizza gegessen.","Spoken past: haben + participle at the end."],
    ["Regelmäßig: ge + Stamm + t → gemacht, gekauft. Unregelmäßig: ge + … + en → gegessen, getrunken.","Regular: ge…t. Irregular: ge…en."],
    ["Kein ge- bei -ieren und be-/ver-/er-: telefoniert, bezahlt, verstanden.","No ge- for -ieren and be-/ver-/er- verbs."]],
  vocab:[["gemacht","done / made"],["gekauft","bought"],["gearbeitet","worked"],["gegessen","eaten"],["getrunken","drunk"],["gesehen","seen"],["geschrieben","written"],["gelesen","read"],["gesprochen","spoken"],["bezahlt","paid"],["verstanden","understood"],["gestern","yesterday"],["letzte Woche","last week"],["schon","already"]],
  ex:[["Was hast du am Wochenende gemacht?","What did you do at the weekend?"],["Ich habe einen Film gesehen.","I watched a film."],["Wir haben im Restaurant gegessen.","We ate at a restaurant."],["Hast du schon bezahlt?","Have you already paid?"]],
  drills:[["Ich habe Pizza ___.","gegessen",["gegessen","gegesst","essen"],"I ate pizza."],["Er hat viel ___.","gearbeitet",["gearbeitet","gearbeit","arbeitet"],"He worked a lot."],["Hast du die E-Mail ___?","geschrieben",["geschrieben","geschreibt","schreiben"],"Did you write the email?"],["Wir haben schon ___.","bezahlt",["bezahlt","gebezahlt","bezahlen"],"We've already paid."]],
  mission:["Erzähl heute jemandem, was du gestern gemacht hast (3 Sätze).","Tell someone today what you did yesterday (3 sentences)."] },

{ id:"a2-2", level:"A2", title:["Perfekt mit sein","Past with sein"],
  goal:["Bewegung und Veränderung in der Vergangenheit.","Movement and change in the past."],
  grammar:[
    ["Bewegung von A nach B oder Veränderung → sein: Ich bin nach Hause gegangen.","Movement A→B or change of state → sein."],
    ["Auch: sein → gewesen, bleiben → geblieben, passieren → passiert.","Also: been, stayed, happened."],
    ["Trennbare Verben: ge in der Mitte: aufstehen → aufgestanden.","Separable verbs: ge in the middle."]],
  vocab:[["gegangen","gone"],["gefahren","driven / travelled"],["gekommen","come"],["geflogen","flown"],["aufgestanden","got up"],["geblieben","stayed"],["gewesen","been"],["passiert","happened"],["umgezogen","moved (home)"],["angekommen","arrived"],["eingeschlafen","fallen asleep"],["gelaufen","run / walked"]],
  ex:[["Ich bin letztes Jahr nach Berlin gezogen.","I moved to Berlin last year."],["Wann bist du heute aufgestanden?","When did you get up today?"],["Wir sind mit dem Zug gefahren.","We went by train."],["Was ist passiert?","What happened?"]],
  drills:[["Ich ___ nach Hause gegangen.","bin",["bin","habe","ist"],"I went home."],["Er ___ lange geschlafen.","hat",["hat","ist","hast"],"He slept for a long time."],["Sie ___ zu Hause geblieben.","ist",["ist","hat","sind"],"She stayed at home."],["Wann ___ der Zug angekommen?","ist",["ist","hat","bin"],"When did the train arrive?"]],
  mission:["Erzähl, wie du heute zur Arbeit gekommen bist: „Ich bin … gefahren.“","Tell how you got to work today."] },

{ id:"a2-3", level:"A2", title:["Dativ","Dative"],
  goal:["Mit, bei, zu und „mir/dir“ richtig benutzen.","Use mit, bei, zu and mir/dir correctly."],
  grammar:[
    ["Dativ: der → dem, die → der, das → dem, Plural → den (+n).","Dative: der → dem, die → der, das → dem, plural → den."],
    ["Immer Dativ nach: aus, bei, mit, nach, seit, von, zu. zum = zu dem, zur = zu der, beim = bei dem.","Always dative after these prepositions."],
    ["Pronomen: mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen. Das gefällt mir.","Pronouns: me, you, him, her, us… I like that."]],
  vocab:[["geben","to give"],["schenken","to give (as a gift)"],["helfen","to help"],["danken","to thank"],["gehören","to belong to"],["gefallen","to please / like"],["schmecken","to taste"],["das Geschenk","present"],["der Nachbar","neighbour (m)"],["die Nachbarin","neighbour (f)"],["mir","(to) me"],["dir","(to) you"],["ihm","(to) him"],["mit","with"]],
  ex:[["Ich gebe dem Kind das Buch.","I give the child the book."],["Der Film gefällt mir.","I like the film."],["Ich wohne seit zwei Jahren in Berlin.","I've lived in Berlin for two years."],["Ich fahre mit dem Fahrrad zur Arbeit.","I cycle to work."]],
  drills:[["Ich helfe ___ Nachbarin.","der",["der","die","den"],"I help the neighbour."],["Das Essen schmeckt ___.","mir",["mir","mich","ich"],"I like the food."],["Ich gehe ___ Bäcker.","zum",["zum","zur","zu"],"I'm going to the baker's."],["Ich fahre mit ___ Bus.","dem",["dem","der","den"],"I go by bus."]],
  mission:["Sag heute „Das gefällt mir!“ oder „Das schmeckt mir!“ zu jemandem.","Say 'I like that!' or 'That tastes good!' to someone today."] },

{ id:"a2-4", level:"A2", title:["Beim Arzt","At the doctor"],
  goal:["Einen Termin machen und Symptome beschreiben.","Book an appointment and describe symptoms."],
  grammar:[
    ["Schmerzen: Mir tut der Kopf weh. Mir tun die Füße weh.","Pain: my head hurts. My feet hurt."],
    ["Oder mit -schmerzen: Ich habe Kopfschmerzen / Bauchschmerzen.","Or with '-ache': headache, stomach ache."],
    ["Krank bei der Arbeit? Ab dem 4. Tag brauchst du meist eine Krankschreibung (AU).","Off sick? From day 4 you usually need a sick note."]],
  vocab:[["der Arzt","doctor (m)"],["die Ärztin","doctor (f)"],["die Praxis","practice / surgery"],["die Krankenkasse","health insurance"],["krank","ill"],["gesund","healthy"],["das Fieber","fever"],["die Erkältung","cold"],["der Husten","cough"],["die Kopfschmerzen","headache"],["die Apotheke","pharmacy"],["das Rezept","prescription"],["die Krankschreibung","sick note"],["wehtun","to hurt"]],
  ex:[["Ich möchte einen Termin machen.","I'd like to make an appointment."],["Ich habe seit gestern Fieber.","I've had a fever since yesterday."],["Mir tut der Hals weh.","My throat hurts."],["Ich brauche eine Krankschreibung.","I need a sick note."]],
  drills:[["Mir ___ der Kopf weh.","tut",["tut","tun","tust"],"My head hurts."],["Mir tun die Füße ___.","weh",["weh","krank","Schmerz"],"My feet hurt."],["Ich habe ___ gestern Fieber.","seit",["seit","vor","für"],"I've had a fever since yesterday."],["___ tut der Rücken weh.","Mir",["Mir","Mich","Ich"],"My back hurts."]],
  mission:["Lies das Schild deiner Hausarztpraxis oder Apotheke und übersetze die Öffnungszeiten.","Read your GP's or pharmacy's sign and translate the opening hours."] },

{ id:"a2-5", level:"A2", title:["Wo oder wohin?","Where or where to?"],
  goal:["Wechselpräpositionen benutzen.","Use two-way prepositions."],
  grammar:[
    ["in, an, auf, über, unter, vor, hinter, neben, zwischen: Wohin? → Akkusativ. Wo? → Dativ.","Where to? → accusative. Where? → dative."],
    ["Ich lege das Buch auf den Tisch (wohin). Das Buch liegt auf dem Tisch (wo).","I put the book on the table / The book is on the table."],
    ["Verbpaare: legen/liegen, stellen/stehen, hängen/hängen. ins = in das, im = in dem, am = an dem.","Verb pairs: put/lie, put/stand, hang/hang."]],
  vocab:[["legen","to lay / put (flat)"],["liegen","to lie"],["stellen","to put (upright)"],["stehen","to stand"],["hängen","to hang"],["das Regal","shelf"],["der Schrank","cupboard"],["der Kühlschrank","fridge"],["die Wand","wall"],["das Bett","bed"],["neben","next to"],["zwischen","between"],["über","above"],["unter","under"]],
  ex:[["Ich gehe ins Kino.","I'm going to the cinema."],["Ich bin im Kino.","I'm at the cinema."],["Das Bild hängt an der Wand.","The picture is on the wall."],["Stell die Milch in den Kühlschrank.","Put the milk in the fridge."]],
  drills:[["Ich gehe ___ Park.","in den",["in den","im","in dem"],"I'm going to the park."],["Ich bin ___ Park.","im",["im","in den","ins"],"I'm in the park."],["Das Buch liegt auf ___ Tisch.","dem",["dem","den","der"],"The book is on the table."],["Ich lege das Buch auf ___ Tisch.","den",["den","dem","der"],"I put the book on the table."]],
  mission:["Räum heute auf und sag laut, wohin du alles stellst und legst.","Tidy up today and say aloud where you put everything."] },

{ id:"a2-6", level:"A2", title:["Kleidung & Adjektive","Clothes & adjectives"],
  goal:["Kleidung kaufen und beschreiben.","Buy and describe clothes."],
  grammar:[
    ["Nach der/die/das (Nominativ): -e: der rote Pullover, die rote Jacke, das rote Hemd.","After der/die/das: -e."],
    ["Nach ein zeigt das Adjektiv das Genus: ein roter Pullover, eine rote Jacke, ein rotes Hemd.","After ein the adjective shows the gender."],
    ["Akkusativ maskulin: den roten / einen roten. Dativ und Plural mit Artikel: fast immer -en.","Masculine accusative: -en. Dative and plural: almost always -en."]],
  vocab:[["die Kleidung","clothes"],["die Hose","trousers"],["das Hemd","shirt"],["die Jacke","jacket"],["der Pullover","jumper"],["die Schuhe","shoes"],["der Mantel","coat"],["schwarz","black"],["weiß","white"],["grau","grey"],["rot","red"],["die Größe","size"],["anprobieren","to try on"],["passen","to fit"]],
  ex:[["Ich suche eine warme Jacke.","I'm looking for a warm jacket."],["Kann ich die Hose anprobieren?","Can I try on the trousers?"],["Haben Sie das in Größe M?","Do you have this in size M?"],["Der schwarze Mantel passt mir nicht.","The black coat doesn't fit me."]],
  drills:[["ein schwarz___ Mantel","er",["er","e","es"],"a black coat"],["die warm___ Jacke","e",["e","en","er"],"the warm jacket"],["ein weiß___ Hemd","es",["es","er","e"],"a white shirt"],["Ich kaufe einen rot___ Pullover.","en",["en","er","e"],"I'm buying a red jumper."]],
  mission:["Beschreib heute laut, was du trägst: „Ich trage eine schwarze …“","Describe aloud what you're wearing today."] },

{ id:"a2-7", level:"A2", title:["Vergleichen","Comparing"],
  goal:["Dinge vergleichen.","Compare things."],
  grammar:[
    ["Komparativ: -er + als: billiger als. Superlativ: am -sten: am billigsten.","Comparative -er + than. Superlative am -sten."],
    ["Oft mit Umlaut: alt → älter, groß → größer, jung → jünger.","Often with umlaut."],
    ["Unregelmäßig: gut → besser → am besten; gern → lieber → am liebsten; viel → mehr → am meisten. Gleich: so … wie.","Irregular forms. Equal: as … as."]],
  vocab:[["schnell","fast"],["langsam","slow"],["laut","loud"],["leise","quiet"],["voll","full / crowded"],["ruhig","calm / quiet"],["besser","better"],["am besten","best"],["lieber","rather / prefer"],["am liebsten","most of all"],["mehr","more"],["als","than"],["so … wie","as … as"],["älter","older"]],
  ex:[["Das Fahrrad ist schneller als der Bus.","The bike is faster than the bus."],["Kreuzberg ist lauter als Pankow.","Kreuzberg is louder than Pankow."],["Ich trinke lieber Tee als Kaffee.","I prefer tea to coffee."],["Berlin ist nicht so teuer wie München.","Berlin isn't as expensive as Munich."]],
  drills:[["gut → ___","besser",["besser","guter","güter"],"good → better"],["Der Zug ist schneller ___ das Auto.","als",["als","wie","dann"],"The train is faster than the car."],["Er ist so groß ___ ich.","wie",["wie","als","so"],"He is as tall as me."],["Am ___ esse ich Pizza.","liebsten",["liebsten","lieber","gernsten"],"Most of all I like eating pizza."]],
  mission:["Vergleich laut zwei Berliner Bezirke oder zwei Cafés.","Compare two Berlin districts or two cafés aloud."] },

{ id:"a2-8", level:"A2", title:["weil, dass, wenn","Because, that, if"],
  goal:["Sätze verbinden und Gründe geben.","Connect sentences and give reasons."],
  grammar:[
    ["Im Nebensatz steht das Verb am Ende: …, weil ich in Berlin wohne.","In a subordinate clause the verb goes to the end."],
    ["Nebensatz zuerst → dann Verb: Wenn es regnet, bleibe ich zu Hause.","Subordinate clause first → verb comes next."],
    ["„denn“ ändert die Wortstellung nicht: …, denn ich wohne in Berlin.","'denn' doesn't move the verb."]],
  vocab:[["weil","because"],["dass","that"],["wenn","if / when"],["ob","whether"],["denn","because (no verb shift)"],["deshalb","that's why"],["glauben","to believe"],["denken","to think"],["wissen","to know (a fact)"],["hoffen","to hope"],["meinen","to mean / think"],["recht haben","to be right"]],
  ex:[["Ich komme nicht, weil ich krank bin.","I'm not coming because I'm ill."],["Ich glaube, dass er recht hat.","I think he's right."],["Wenn ich Zeit habe, rufe ich dich an.","If I have time, I'll call you."],["Weißt du, ob der Laden offen ist?","Do you know whether the shop is open?"]],
  drills:[["Ich komme nicht, weil ich keine Zeit ___.","habe",["habe","hab","hat"],"I'm not coming because I have no time."],["Wenn es regnet, ___ zu Hause.","bleibe ich",["bleibe ich","ich bleibe","bleiben ich"],"If it rains, I stay home."],["Ich weiß nicht, ___ er kommt.","ob",["ob","dass","weil"],"I don't know whether he's coming."],["Ich lerne Deutsch, ___ ich wohne in Berlin.","denn",["denn","weil","dass"],"I learn German because I live in Berlin."]],
  mission:["Sag heute einen Satz mit „weil“: „Ich lerne Deutsch, weil …“","Say one sentence with 'weil' today."] },

{ id:"a2-9", level:"A2", title:["Reflexive Verben","Reflexive verbs"],
  goal:["sich freuen, sich treffen & Co.","Look forward, meet up & co."],
  grammar:[
    ["Reflexivpronomen: mich, dich, sich, uns, euch, sich. Ich freue mich.","Reflexive pronouns: myself, yourself…"],
    ["freuen auf = Zukunft (look forward). freuen über = jetzt/vorbei (be glad about).","auf = future, über = present/past."],
    ["Mit Objekt oft Dativ: Ich wasche mir die Hände.","With an object often dative: I wash my hands."]],
  vocab:[["sich freuen auf","to look forward to"],["sich freuen über","to be glad about"],["sich treffen","to meet up"],["sich beeilen","to hurry"],["sich ausruhen","to rest"],["sich interessieren für","to be interested in"],["sich ärgern über","to be annoyed about"],["sich vorstellen","to introduce oneself"],["sich fühlen","to feel"],["sich erinnern an","to remember"],["sich entschuldigen","to apologise"],["sich anmelden","to register / sign up"]],
  ex:[["Ich freue mich auf das Wochenende.","I'm looking forward to the weekend."],["Wir treffen uns am Kottbusser Tor.","We're meeting at Kottbusser Tor."],["Beeil dich, die Bahn kommt!","Hurry, the train is coming!"],["Ich interessiere mich für Musik.","I'm interested in music."]],
  drills:[["Ich freue ___ auf den Urlaub.","mich",["mich","mir","sich"],"I'm looking forward to the holiday."],["Wir treffen ___ um acht.","uns",["uns","euch","sich"],"We're meeting at eight."],["Er fühlt ___ nicht gut.","sich",["sich","ihn","ihm"],"He doesn't feel well."],["Ich freue mich ___ das Wochenende.","auf",["auf","über","für"],"I'm looking forward to the weekend."]],
  mission:["Verabrede dich auf Deutsch: „Wollen wir uns am … treffen?“","Make plans in German: 'Shall we meet on …?'"] },

{ id:"a2-10", level:"A2", title:["war, hatte, konnte","Was, had, could"],
  goal:["Über früher sprechen.","Talk about the past."],
  grammar:[
    ["Bei sein, haben und Modalverben benutzt man auch im Gespräch das Präteritum.","With to be, to have and modals, the simple past is used in speech too."],
    ["ich war, du warst, er war, wir waren · ich hatte, du hattest, wir hatten","I was… I had…"],
    ["Modalverben: konnte, musste, wollte, durfte, sollte – ohne Umlaut!","Modals: could, had to, wanted, was allowed – no umlaut!"]],
  vocab:[["war","was"],["hatte","had"],["konnte","could"],["musste","had to"],["wollte","wanted to"],["durfte","was allowed to"],["es gab","there was / were"],["damals","back then"],["früher","in the past / used to"],["letztes Jahr","last year"],["vorgestern","the day before yesterday"],["die Kindheit","childhood"]],
  ex:[["Wo warst du gestern?","Where were you yesterday?"],["Ich hatte keine Zeit.","I had no time."],["Ich musste lange warten.","I had to wait a long time."],["Früher gab es hier einen Club.","There used to be a club here."]],
  drills:[["Gestern ___ ich krank.","war",["war","bin","wäre"],"Yesterday I was ill."],["Wir ___ keinen Termin.","hatten",["hatten","hatte","haben"],"We had no appointment."],["Du ___ nicht kommen?","konntest",["konntest","konnte","kannst"],"You couldn't come?"],["Früher ___ es hier einen Club.","gab",["gab","gibt","war"],"There used to be a club here."]],
  mission:["Erzähl jemandem, wo du vor Berlin gewohnt hast: „Früher war ich …“","Tell someone where you lived before Berlin."] },

// ───────────────────────── B1 ─────────────────────────
{ id:"b1-1", level:"B1", title:["Zukunft & Pläne","Future & plans"],
  goal:["Über Pläne und Vermutungen sprechen.","Talk about plans and predictions."],
  grammar:[
    ["Futur: werden + Infinitiv am Ende: Ich werde die Prüfung machen.","Future: werden + infinitive."],
    ["werden: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.","Forms of werden."],
    ["Oft reicht Präsens + Zeitangabe: Morgen fahre ich nach Hamburg. werden = auch „to become“.","Often present + time word is enough. werden also means 'to become'."]],
  vocab:[["werden","will / to become"],["der Plan","plan"],["planen","to plan"],["vorhaben","to intend / have planned"],["der Urlaub","holiday"],["nächste Woche","next week"],["nächstes Jahr","next year"],["bald","soon"],["irgendwann","someday"],["wahrscheinlich","probably"],["sicher","certainly / surely"],["die Zukunft","future"]],
  ex:[["Ich werde nächstes Jahr die B1-Prüfung machen.","I'll take the B1 exam next year."],["Es wird morgen regnen.","It will rain tomorrow."],["Was hast du am Wochenende vor?","What are you up to at the weekend?"],["Wir werden sehen.","We'll see."]],
  drills:[["Du ___ das schaffen.","wirst",["wirst","wird","werdest"],"You'll manage it."],["Es ___ morgen regnen.","wird",["wird","werde","wirst"],"It will rain tomorrow."],["Ich werde Deutsch ___.","lernen",["lernen","lerne","gelernt"],"I will learn German."],["Was hast du morgen ___?","vor",["vor","an","auf"],"What are you doing tomorrow?"]],
  mission:["Erzähl jemandem deine Pläne für das Wochenende.","Tell someone your plans for the weekend."] },

{ id:"b1-2", level:"B1", title:["Konjunktiv II","Would, could, if"],
  goal:["Höflich bitten, wünschen und Ratschläge geben.","Ask politely, wish and give advice."],
  grammar:[
    ["würde + Infinitiv: Ich würde gern reisen.","would + infinitive."],
    ["Kurzformen: wäre (sein), hätte (haben), könnte, müsste, sollte.","Short forms: would be, would have, could…"],
    ["Wenn ich Zeit hätte, würde ich mehr lesen. Höflich: Könnten Sie mir helfen?","If I had time, I'd read more. Polite: Could you help me?"]],
  vocab:[["würde","would"],["wäre","would be"],["hätte","would have"],["könnte","could"],["sollte","should"],["müsste","would have to"],["an deiner Stelle","in your place"],["Wenn ich du wäre …","if I were you …"],["der Wunsch","wish"],["der Rat","advice"],["eigentlich","actually"],["am liebsten","ideally / most of all"]],
  ex:[["Könnten Sie das bitte wiederholen?","Could you repeat that, please?"],["Ich hätte gern einen Tisch für zwei.","I'd like a table for two."],["Wenn ich mehr Geld hätte, würde ich umziehen.","If I had more money, I'd move."],["An deiner Stelle würde ich den Vermieter anrufen.","In your place I'd call the landlord."]],
  drills:[["Wenn ich Zeit ___, würde ich kommen.","hätte",["hätte","habe","hatte"],"If I had time, I'd come."],["___ Sie mir bitte helfen?","Könnten",["Könnten","Können","Konnten"],"Could you help me?"],["Ich ___ gern in Italien wohnen.","würde",["würde","werde","wurde"],"I'd like to live in Italy."],["Das ___ toll!","wäre",["wäre","war","ist"],"That would be great!"]],
  mission:["Benutz heute zweimal „Könnten Sie …?“ statt „Können Sie …?“","Use 'Könnten Sie …?' twice today instead of 'Können Sie …?'"] },

{ id:"b1-3", level:"B1", title:["Relativsätze","Relative clauses"],
  goal:["Personen und Dinge genauer beschreiben.","Describe people and things more precisely."],
  grammar:[
    ["Relativsatz: Verb am Ende. Das Pronomen hat das Genus des Nomens: der Mann, der …; die Frau, die …","Verb at the end; pronoun matches the noun's gender."],
    ["Der Fall kommt aus dem Relativsatz: der Mann, den ich kenne (Akk.), dem ich helfe (Dat.).","The case comes from the role in the clause."],
    ["Dativ Plural: denen. Mit Präposition: die Stadt, in der ich wohne.","Dative plural: denen. With preposition: the city in which I live."]],
  vocab:[["der Mensch","person / human"],["die Leute","people"],["der Ort","place"],["die Stadt","city"],["das Viertel","neighbourhood"],["der Laden","shop"],["der Kollege","colleague (m)"],["die Kollegin","colleague (f)"],["kennen","to know (someone)"],["empfehlen","to recommend"],["erwähnen","to mention"],["denen","whom / which (dat. pl.)"]],
  ex:[["Das ist der Kollege, der mir geholfen hat.","That's the colleague who helped me."],["Die Stadt, in der ich wohne, ist sehr grün.","The city I live in is very green."],["Das Café, das du empfohlen hast, war super.","The café you recommended was great."],["Die Leute, mit denen ich arbeite, sind nett.","The people I work with are nice."]],
  drills:[["Der Mann, ___ dort steht, ist mein Chef.","der",["der","den","dem"],"The man who is standing there is my boss."],["Die Frau, ___ ich kenne, heißt Lena.","die",["die","der","den"],"The woman I know is called Lena."],["Der Freund, ___ ich helfe, …","dem",["dem","den","der"],"The friend I'm helping …"],["Die Kollegen, mit ___ ich arbeite, …","denen",["denen","den","die"],"The colleagues I work with …"]],
  mission:["Beschreib einen Ort in Berlin mit einem Relativsatz: „Das ist ein Café, das …“","Describe a Berlin place with a relative clause."] },

{ id:"b1-4", level:"B1", title:["Passiv","Passive"],
  goal:["Amtsbriefe und Schilder verstehen.","Understand official letters and signs."],
  grammar:[
    ["Passiv: werden + Partizip II: Das Paket wird geliefert.","Passive: werden + participle."],
    ["Vergangenheit: wurde: Der Fernsehturm wurde 1969 gebaut.","Past: wurde."],
    ["Wer? von + Dativ: Der Brief wird vom Amt geschickt.","By whom? von + dative."]],
  vocab:[["geliefert","delivered"],["gebaut","built"],["repariert","repaired"],["geöffnet","opened"],["geschlossen","closed"],["bearbeitet","processed"],["verschickt","sent"],["abgeholt","picked up"],["der Antrag","application"],["das Formular","form"],["die Frist","deadline"],["der Bescheid","official notice / decision"]],
  ex:[["Hier wird nicht geraucht.","No smoking here."],["Ihr Antrag wird bearbeitet.","Your application is being processed."],["Das Paket wurde gestern geliefert.","The parcel was delivered yesterday."],["Der Laden wird um 20 Uhr geschlossen.","The shop is closed at 8 pm."]],
  drills:[["Das Paket ___ morgen geliefert.","wird",["wird","ist","hat"],"The parcel will be delivered tomorrow."],["Der Fernsehturm ___ 1969 gebaut.","wurde",["wurde","wird","würde"],"The TV tower was built in 1969."],["Die Heizung wird ___.","repariert",["repariert","reparieren","gerepariert"],"The heating is being repaired."],["Der Brief wurde ___ Amt geschickt.","vom",["vom","von","beim"],"The letter was sent by the office."]],
  mission:["Finde heute drei Passiv-Sätze auf Schildern oder in Briefen.","Find three passive sentences on signs or letters today."] },

{ id:"b1-5", level:"B1", title:["Erzählen: Präteritum","Storytelling: simple past"],
  goal:["Geschichten lesen und erzählen.","Read and tell stories."],
  grammar:[
    ["In Büchern und Nachrichten: Präteritum. Regelmäßig: Stamm + te: machte, wohnte, arbeitete.","Books and news use the simple past. Regular: stem + te."],
    ["Unregelmäßig: neuer Stamm, ich/er ohne Endung: gehen → ging, kommen → kam, sehen → sah.","Irregular: new stem, no ending for ich/er."],
    ["wir/sie: + en: wir gingen, sie kamen.","we/they: + en."]],
  vocab:[["ging","went"],["kam","came"],["sah","saw"],["fuhr","drove / went"],["fand","found"],["sagte","said"],["gab","gave"],["nahm","took"],["stand","stood"],["dachte","thought"],["wusste","knew"],["plötzlich","suddenly"]],
  ex:[["Es war einmal ein Mann, der in Berlin wohnte.","Once upon a time there was a man who lived in Berlin."],["Plötzlich kam ein Bus.","Suddenly a bus came."],["Sie nahm ihre Tasche und ging.","She took her bag and left."],["Ich dachte, du wusstest das.","I thought you knew that."]],
  drills:[["gehen → er ___","ging",["ging","gang","gehte"],"he went"],["kommen → wir ___","kamen",["kamen","kommten","kamt"],"we came"],["machen → sie ___","machte",["machte","mach","machtet"],"she made"],["fahren → ich ___","fuhr",["fuhr","fahrte","fuhrte"],"I drove"]],
  mission:["Lies heute einen kurzen Artikel (z. B. nachrichtenleicht.de) und markiere alle Präteritum-Verben.","Read a short article today (e.g. nachrichtenleicht.de) and mark all simple-past verbs."] },

{ id:"b1-6", level:"B1", title:["zu + Infinitiv","To + infinitive"],
  goal:["Absichten und Zwecke ausdrücken.","Express intentions and purposes."],
  grammar:[
    ["Viele Verben brauchen zu + Infinitiv am Ende: Ich versuche, mehr zu lesen.","Many verbs take zu + infinitive."],
    ["Trennbar: zu in der Mitte: anzurufen, einzukaufen.","Separable: zu in the middle."],
    ["Zweck: um … zu = in order to. Nach Modalverben kein zu!","Purpose: um … zu. No zu after modals!"]],
  vocab:[["versuchen","to try"],["vergessen","to forget"],["beginnen","to begin"],["aufhören","to stop"],["Lust haben","to feel like"],["es ist wichtig","it's important"],["es ist schwer","it's hard"],["um … zu","in order to"],["ohne … zu","without …ing"],["anstatt … zu","instead of …ing"],["die Gelegenheit","opportunity"],["sparen","to save (money)"]],
  ex:[["Ich habe vergessen, dich anzurufen.","I forgot to call you."],["Hast du Lust, ins Kino zu gehen?","Do you feel like going to the cinema?"],["Ich spare Geld, um zu reisen.","I'm saving money to travel."],["Es ist schwer, in Berlin eine Wohnung zu finden.","It's hard to find a flat in Berlin."]],
  drills:[["Ich versuche, pünktlich ___ sein.","zu",["zu","um","—"],"I try to be on time."],["Vergiss nicht, mich ___!","anzurufen",["anzurufen","zu anrufen","anrufen"],"Don't forget to call me!"],["Ich lerne, ___ die Prüfung zu bestehen.","um",["um","zu","für"],"I study in order to pass the exam."],["Ich kann gut ___.","kochen",["kochen","zu kochen","gekocht"],"I can cook well."]],
  mission:["Sag heute einen Satz mit „um … zu“: „Ich lerne Deutsch, um …“","Say a sentence with 'um … zu' today."] },

{ id:"b1-7", level:"B1", title:["Genitiv & wegen","Genitive & because of"],
  goal:["Gründe nennen wie in Nachrichten.","Give reasons like in the news."],
  grammar:[
    ["Genitiv: des (m/n, Nomen + -s/-es), der (f/Plural): das Auto des Mannes, die Wohnung der Freundin.","Genitive: des (+s), der."],
    ["Im Gespräch oft von + Dativ: das Auto von meinem Bruder.","In speech often von + dative."],
    ["Präpositionen: wegen, trotz, während, statt.","Prepositions: because of, despite, during, instead of."]],
  vocab:[["wegen","because of"],["trotz","despite"],["während","during"],["statt","instead of"],["innerhalb","within"],["außerhalb","outside of"],["der Streik","strike"],["die Baustelle","construction site"],["die Verspätung","delay"],["der Grund","reason"],["die Störung","disruption / fault"],["der Ersatzverkehr","replacement service"]],
  ex:[["Wegen des Streiks fährt heute keine S-Bahn.","Because of the strike, no S-Bahn is running today."],["Trotz des Regens sind wir spazieren gegangen.","Despite the rain we went for a walk."],["Während der Woche arbeite ich viel.","During the week I work a lot."],["Das ist das Fahrrad meines Bruders.","That's my brother's bike."]],
  drills:[["wegen ___ Wetters","des",["des","der","dem"],"because of the weather"],["trotz ___ Verspätung","der",["der","des","die"],"despite the delay"],["das Auto mein___ Vaters","es",["es","er","em"],"my father's car"],["___ der Baustelle ist die Straße gesperrt.","Wegen",["Wegen","Trotz","Statt"],"Because of the construction, the street is closed."]],
  mission:["Hör heute eine BVG- oder S-Bahn-Durchsage genau zu und schreib ein Wort auf.","Listen closely to a BVG/S-Bahn announcement today and write down one word."] },

{ id:"b1-8", level:"B1", title:["Arbeit & Bewerbung","Work & applying"],
  goal:["Über Arbeit sprechen und dich bewerben.","Talk about work and apply for jobs."],
  grammar:[
    ["Formeller Brief: „Sehr geehrte Damen und Herren, …“ – „Mit freundlichen Grüßen“.","Formal letter opening and closing."],
    ["Im Gespräch: Sie + Konjunktiv II: Ich würde gern mehr über das Team erfahren.","In interviews: Sie + polite forms."],
    ["Erfahrung: Ich habe drei Jahre als … gearbeitet. Ich arbeite seit … bei …","Experience: I worked as … for three years."]],
  vocab:[["die Stelle","position / job"],["die Bewerbung","application"],["sich bewerben","to apply"],["der Lebenslauf","CV"],["das Vorstellungsgespräch","job interview"],["der Arbeitsvertrag","employment contract"],["das Gehalt","salary"],["die Probezeit","probation period"],["die Kündigung","notice / dismissal"],["der Urlaubstag","day of leave"],["die Erfahrung","experience"],["Vollzeit / Teilzeit","full-time / part-time"]],
  ex:[["Ich habe mich auf die Stelle beworben.","I applied for the position."],["Die Probezeit dauert sechs Monate.","The probation period lasts six months."],["Wie viele Urlaubstage habe ich?","How many days of leave do I get?"],["Ich hätte eine Frage zum Gehalt.","I'd have a question about the salary."]],
  drills:[["Ich habe mich ___ die Stelle beworben.","auf",["auf","für","an"],"I applied for the position."],["Sehr ___ Damen und Herren,","geehrte",["geehrte","geehrter","ehrte"],"Dear Sir or Madam,"],["Mit freundlichen ___","Grüßen",["Grüßen","Grüße","Gruß"],"Kind regards"],["Ich ___ drei Jahre als Designer gearbeitet.","habe",["habe","bin","hatte"],"I worked as a designer for three years."]],
  mission:["Sprich mit einer Kollegin oder einem Kollegen fünf Minuten nur auf Deutsch.","Speak only German with a colleague for five minutes."] },

{ id:"b1-9", level:"B1", title:["Meinung & Argumente","Opinions & arguments"],
  goal:["Deine Meinung sagen und begründen.","Give and justify your opinion."],
  grammar:[
    ["Meinung: Meiner Meinung nach … / Ich finde, dass … / Ich bin der Meinung, dass …","Opinion phrases."],
    ["obwohl (Verb am Ende): Obwohl es regnet, gehe ich raus.","although (verb to the end)."],
    ["trotzdem, deshalb, außerdem auf Position 1 → Verb danach: Es regnet. Trotzdem gehe ich raus.","These adverbs in position 1 → verb comes next."]],
  vocab:[["obwohl","although"],["trotzdem","nevertheless"],["deshalb","therefore"],["außerdem","besides"],["einerseits","on the one hand"],["andererseits","on the other hand"],["meiner Meinung nach","in my opinion"],["der Vorteil","advantage"],["der Nachteil","disadvantage"],["zustimmen","to agree"],["widersprechen","to disagree"],["überzeugen","to convince"]],
  ex:[["Meiner Meinung nach ist Berlin teuer geworden.","In my opinion Berlin has become expensive."],["Obwohl ich müde war, bin ich zur Party gegangen.","Although I was tired, I went to the party."],["Es war spät, deshalb habe ich ein Taxi genommen.","It was late, so I took a taxi."],["Einerseits ist die Stadt laut, andererseits ist sie nie langweilig.","On one hand the city is loud, on the other it's never boring."]],
  drills:[["___ es regnet, gehe ich joggen.","Obwohl",["Obwohl","Trotzdem","Deshalb"],"Although it's raining, I go jogging."],["Es regnet. Trotzdem ___ joggen.","gehe ich",["gehe ich","ich gehe","ich gehe ich"],"It's raining. I go jogging anyway."],["Meiner Meinung ___ …","nach",["nach","von","zu"],"In my opinion …"],["Ich bin müde, ___ gehe ich ins Bett.","deshalb",["deshalb","obwohl","weil"],"I'm tired, so I'm going to bed."]],
  mission:["Sag heute deine Meinung zu etwas – mit „Ich finde, dass …“.","Give your opinion on something today with 'Ich finde, dass …'."] },

{ id:"b1-10", level:"B1", title:["Beschweren & telefonieren","Complaints & calls"],
  goal:["Probleme lösen am Telefon und im Laden.","Solve problems on the phone and in shops."],
  grammar:[
    ["Struktur: Situation → Problem → Bitte. Ich habe am Montag … bestellt. Leider … Könnten Sie …?","Structure: situation → problem → request."],
    ["Indirekte Fragen sind höflicher, Verb am Ende: Können Sie mir sagen, wann der Techniker kommt?","Indirect questions are politer; verb at the end."],
    ["Am Telefon: „Hier spricht …“, „Können Sie mich zurückrufen?“, „Ich warte auf Ihre Antwort.“","On the phone: 'This is …', 'Can you call me back?'"]],
  vocab:[["sich beschweren über","to complain about"],["die Beschwerde","complaint"],["der Kundenservice","customer service"],["die Rückerstattung","refund"],["umtauschen","to exchange"],["zurückgeben","to give back / return"],["kaputt","broken"],["funktionieren","to work / function"],["die Quittung","receipt"],["die Garantie","warranty"],["Bescheid sagen","to let someone know"],["zurückrufen","to call back"]],
  ex:[["Ich möchte mich über die Lieferung beschweren.","I'd like to complain about the delivery."],["Die Waschmaschine funktioniert leider nicht.","Unfortunately the washing machine isn't working."],["Könnten Sie mich bitte zurückrufen?","Could you call me back, please?"],["Können Sie mir sagen, wann das Paket kommt?","Can you tell me when the parcel will arrive?"]],
  drills:[["Können Sie mir sagen, wann der Techniker ___?","kommt",["kommt","kommen","kommt er"],"Can you tell me when the technician is coming?"],["Ich möchte mich ___ den Lärm beschweren.","über",["über","auf","für"],"I want to complain about the noise."],["Ich möchte die Jacke ___.","umtauschen",["umtauschen","tauschen um","umgetauscht"],"I'd like to exchange the jacket."],["Haben Sie die ___ noch?","Quittung",["Quittung","Garantie","Lieferung"],"Do you still have the receipt?"]],
  mission:["Ruf heute irgendwo an (Praxis, Laden) und frag etwas auf Deutsch.","Call somewhere today (practice, shop) and ask something in German."] }
];

const LEVELS = [
  { id:"S",  name:["Überleben","Survival"], sub:["Läden & Straße in 3–4 Wochen","Shops & street in 3–4 weeks"] },
  { id:"A1", name:["A1 · Anfänger","A1 · Beginner"], sub:["Die Grundlagen","The basics"] },
  { id:"A2", name:["A2 · Grundstufe","A2 · Elementary"], sub:["Alltag & Vergangenheit","Everyday life & the past"] },
  { id:"B1", name:["B1 · Mittelstufe","B1 · Intermediate"], sub:["Selbstständig sprechen","Speaking independently"] }
];

// Tutor role-plays (used by the in-browser model)
const SCENES = [
  { id:"baeckerei", title:["Bäckerei","Bakery"], level:"S", role:"Du bist Verkäuferin in einer Berliner Bäckerei. Du bist freundlich und sprichst einfach. Du verkaufst Brötchen, Brezeln, Croissants, Kuchen und Kaffee.", start:["Guten Morgen! Was darf's sein?","Good morning! What can I get you?"] },
  { id:"spaeti", title:["Späti","Corner shop"], level:"S", role:"Du arbeitest in einem Späti in Kreuzberg. Du bist entspannt, sagst kurze Sätze. Es gibt Getränke, Snacks, Zeitungen. Bier mit Pfand.", start:["Hallo! Kann ich helfen?","Hi! Can I help?"] },
  { id:"kasse", title:["Supermarkt-Kasse","Supermarket till"], level:"S", role:"Du bist Kassierer im Supermarkt. Du fragst nach Tüte, Bon, Karte oder bar, Payback. Sag Preise in Euro.", start:["Hallo. Brauchen Sie eine Tüte?","Hello. Do you need a bag?"] },
  { id:"weg", title:["Nach dem Weg fragen","Asking the way"], level:"S", role:"Du bist eine Passantin am Alexanderplatz. Der Lerner fragt nach dem Weg. Erkläre mit links, rechts, geradeaus, U-Bahn-Linien.", start:["Ja, bitte?","Yes?"] },
  { id:"smalltalk", title:["Small Talk","Small talk"], level:"S", role:"Du bist ein neuer Nachbar im Treppenhaus. Du bist neugierig und freundlich. Stell einfache Fragen: Woher? Seit wann in Berlin? Arbeit?", start:["Hallo! Sind Sie neu hier im Haus?","Hi! Are you new in the building?"] },
  { id:"arzt", title:["Arztpraxis","Doctor's office"], level:"A2", role:"Du bist an der Anmeldung einer Hausarztpraxis. Du fragst nach Versichertenkarte, Symptomen und gibst einen Termin.", start:["Praxis Dr. Schneider, guten Tag. Wie kann ich Ihnen helfen?","Dr Schneider's practice, hello. How can I help?"] },
  { id:"buergeramt", title:["Bürgeramt","Citizens' office"], level:"A2", role:"Du arbeitest im Bürgeramt. Es geht um die Anmeldung einer Wohnung. Du brauchst Ausweis, Wohnungsgeberbestätigung und Formular. Formell, Sie.", start:["Guten Tag. Ihren Termin und Ihren Ausweis, bitte.","Good day. Your appointment and ID, please."] },
  { id:"wg", title:["WG-Besichtigung","Flat-share viewing"], level:"A2", role:"Du wohnst in einer WG in Neukölln und suchst eine neue Mitbewohnerin oder einen neuen Mitbewohner. Du fragst nach Beruf, Hobbys, Putzplan. Du duzt.", start:["Hi, komm rein! Willst du einen Tee?","Hi, come in! Want some tea?"] },
  { id:"job", title:["Vorstellungsgespräch","Job interview"], level:"B1", role:"Du bist Personalerin in einer Berliner Firma. Du führst ein Vorstellungsgespräch auf B1-Niveau. Frag nach Erfahrung, Stärken, Gründen für die Bewerbung.", start:["Schön, dass Sie da sind. Erzählen Sie doch kurz etwas über sich.","Nice to have you here. Tell me a little about yourself."] },
  { id:"beschwerde", title:["Beschwerde","Complaint"], level:"B1", role:"Du arbeitest im Kundenservice eines Online-Shops. Der Kunde hat ein Problem mit einer Lieferung. Sei höflich, frag nach Bestellnummer, biete Lösungen.", start:["Kundenservice, mein Name ist Krause. Was kann ich für Sie tun?","Customer service, Krause speaking. What can I do for you?"] }
];
