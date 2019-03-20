# Tietokantasovellus - Blogi

Tietokantasovellukseni tulee Medium-palvelun muotoinen klooni blogista. Kyseessä ei tule olemaan palvelu, jossa jokainen voi postaa oman bloginsa, vaan yksittäinen blogi samaan tyyliin.

## Ohjelman rakenne

Ohjelma tulee käsittämään kaksi osaa. Projektin tietokanta/serveri-puolta ohjaa Flaskilla toteutettu Python-backend. Backend keskustelee (todennäköisesti) Herokussa olevan kautta frontendin kanssa. Frontend-puoli, ei ole toteutettu Flaskin avulla, vaan erillisenä Typescript-applikaationa. Applikaatio toteutetaan fraktaalisena projekti-rakenteena, jota itse suosin. State-managementista projektissa vastaa tyypitetty Redux-tietovarasto. Kyseinen saattaa kuulostaa pieneltä overkilliltä, mutta totesin tämän hyväksi ajaksi päivittää oma rakentamani react/redux-boilerplaten tyypitetyksi typescript-versioksi.

Kyseisen projektirakenteen takia, ensimmäisellä viikolla oli vähän aikarajoitteita ehtiä tehdä kaikkia formeja päivittää tietoa valmiiksi. Vahva pohja on nyt tehty ja siitä on hyvä jatkaa ensi viikolle projektia.

Päivitän varmaan ensi viikosta lähtien projektin dokumentaation englanniksi, sillä kommentoin koodia aina englanniksi, joten pysyy yhtenäinen kieli.

## Lista ominaisuuksista:
- Pääsivu kaikista blogi-postauksista
- Kirjautuminen sisään, jotta voi lisätä blogi-postauksia (admin)
- Kirjautuminen sisään, jotta voi kommentoida blogipostauksiin (user)
- Blogipostauksen kirjoitus
- Blogipostauksen muokkaaminen
- Blogipostauksen lukeminen
- Blogipostauksen kommentointi
- Blogipostauksen poistaminen
- Blogipostauksen hakeminen, jollain hakukriteereillä
- Blogipostauksien kategorisointi
- Blogipostausten sorttaaminen kategorian tai ajan perusteella
- Jos ehtii niin jotain raportteja aktiivisimmin kommentoituja postauksia / aktiivisimpia käyttäjiä postaamaan / aktiivisimmiten kommentoidut kategoriat ym..
