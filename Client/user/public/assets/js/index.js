const totalUsers = document.getElementById('usersTotal');
const totalTickets = document.getElementById('ticketsTotal');
const tbody = document.getElementById('tbodyUser');
import { Data } from './modules/componentIndex.js';
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem("token");
  if(token == '' || token === undefined){
    window.location.href = "../../../../../Client/user/public/pages/login.html";
  }
  console.log(token);
  const number = await getTotalUsers();
  totalUsers.textContent = number;
  const tickets = await getTotalTickets();
  totalTickets.textContent = tickets;
  const data = await getUsers();
  data?.paginatedQuery.forEach((user) => {
    const { id, nombre, apellidos, rol, email } = user;
    Data(tbody, id, nombre, apellidos, rol, email)
  })
})


const getTotalUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:4000/v1/admin/get/usuarios",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return tickets?.result[0]?.count;
}

const getTotalTickets = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:4000/v1/admin/get/tickets",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return tickets?.result[0]?.count;
}


const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/v1/user/get?limite=9&desde=0",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.status == 404) {
      console.log("Error");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}