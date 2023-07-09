const select = document.querySelector("#users");
const tableElement = document.querySelector("#tbody");
const search = document.querySelector("#search");

let userTodos =[];
let userData = [];
let str ="";

const getUsers = () => {
  return axios.get('https://openapi.izmir.bel.tr/api/izsu/barajdurum');

};

window.addEventListener("load", async () => {
 const { data } = await getUsers();
console.log(data);
 userData ={data}.data; 
    data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.BarajKuyuAdi;
        option.textContent = user.BarajKuyuAdi;
        select.appendChild(option);
    });
});

const getTodos = async (BarajKuyuId) => {
    const todos = await axios.get(
        `https://openapi.izmir.bel.tr/api/izsu/barajdurum?id=${BarajKuyuId}`
        );
    userTodos = todos.data;
    return todos;
};

const makeList = (todos) => {
    tableElement.innerHTML = "";
    todos.forEach((todo) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        
        td.innerHTML ="<div class='row'><div class='col-sm-5'> <p class='mb-0'>Name:</p></div><div class='col-sm-7'>"+todo.BarajKuyuAdi+"</div></td>";
        td.innerHTML +="<div class='row'><div class='col-sm-5'> <p class='mb-0'>Water height:</p></div><div class='col-sm-7'>"+todo.SuYuksekligi+"</div></td>";
        td.innerHTML +="<div class='row'><div class='col-sm-5'> <p class='mb-0'>Volume of usable dam:</p></div><div class='col-sm-7'>"+todo.KullanılabilirGolSuHacmi+"'>"+todo.KullanılabilirGolSuHacmi+"</div></td>";
        td.innerHTML +="<div class='row'><div class='col-sm-5'> <p class='mb-0'>Enlem & Boylam:</p></div><div class='col-sm-7'><a href='https://www.google.com/maps/search/?api=1&query="+todo.Enlem+","+todo.Boylam+"' target='_blank'>"+todo.Enlem+"-"+todo.Boylam+"</a></div></td>";
        td.innerHTML +="<div class='row'><div class='col-sm-5'> <p class='mb-0'>Occupancy rate:</p></div><div class='col-sm-7'>%"+todo.DolulukOrani+"</div></td>";

        td.innerHTML +="</tr></table>";
       
        tr.appendChild(td);
        tr.appendChild(td2);
        
        tableElement.appendChild(tr);
    });
};

select.addEventListener("change", async (e) => {
    const { data } = await getTodos(e.target.value);

    makeList(data);
});

    if (str == "") {
      makeList(userTodos);
    } else {
      searchTodos(str);
    };
  
    const searchTodos = (str) => {
    const temp = userData.filter(o => {return (o.BarajKuyuAdi.includes(str))});

    makeList(temp);
  };

  search.addEventListener("input", (e) => {
    str = e.target.value;
  
    searchTodos(str);
  });


