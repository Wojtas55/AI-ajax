let data = null;
let url = 'https://localhost/ajax/polaczenia/firma.json';
//let url = 'http://edu.gplweb.pl/res/web-app-ajax/test.txt';

let getBundle = ()=>{
  console.log("Hello kitty");

  //stworzenie obiektu
  const xhr = new XMLHttpRequest();

  //ustawienie formatu danych odpowiedzi
  xhr.responseType = 'text'; //domyslny typ Text

  //formaty: {text,arraybufer,blob,document,json}

  // skonfigurowanie połączenia
  xhr.open('GET',url, async=true);
  xhr.send(); // "wysłanie" połączenia
  // GET - pobieranie: data = null
  // POST - wysyłanie: data = document.form[]
  console.log(xhr.respone);

  // ... nasłuchy zdarzeń (zmiany statusu połączenia)
  xhr.addEventListener( 'readystatechange', (e) => {
    if(xhr.readyStatee!==4){
      // komunikat dla użytkownika
      cosole.log(xhr.readyState);
      }
      if(xhr.readyState===4){
          if(xhr.status === 200){
            console.log("są kalesonki są");
            console.log(xhr.response);
          }
          if(xhr.status === 404){
            console.log("Brak zasobu");
          }
          if(xhr.status === 500){
            // możliwa wieksza awaria - odpuść "dzisiaj"
            console.log("Serwer odpadł");
          }
          if(xhr.status === 503){
            //spróbuj za kilka chwil
            console.log('Retry in... 3,2,1...');
          }
      }

    }, false);
  // nasłuchujemy obiekut XHR kiedy odbierze dokument : load
  xhr.addEventListener( 'load', (e) => {
    console.log(xhr.response);
    data = xhr.response;
    if(data!==null){
        let i = 1;
        let timeInt = 1000; // ms(1s)
        let t1 = setInterval( function(){
            if(i===data.length-1){
              clearInterval(t1);
            }
            insItem(i++,data[i-1]);
        }, timeInt);
        //data.forEach( item => insItem( i++, item));
        //setStatusBar();
    }
    }, false);
}

let insItem = (i, item)=>{
  let main = document.querySelector('#main');
  let tpl = document.querySelector('#rowTplt');
  let r2 = tpl.content.cloneNode(true);
  let rid = r2.querySelector('#row-');
      rid.id = rid.id+1 // <div id="rid-1"... -2 -2
  let cells = r2.querySelectorAll('p');
  cells[0].textContent = i;
  cells[1].textContent = item.imie;
  cells[2].textContent = item.nazwisko;
  cells[3].textContent = item.stanowisko;
  main.appendChild(r2);
  // addNavItem(i);
}

window.addEventListener('load',getBundle,false);
