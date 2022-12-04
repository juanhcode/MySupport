const totalUsers = document.getElementById('usersTotal');
const totalTickets = document.getElementById('ticketsTotal');
const tbody = document.getElementById('tbodyUser');
const camposUser = document.getElementById('totalUsers');
const camposTickets = document.getElementById('totalTickets');
const camposEmpleados = document.getElementById('totalEmpleado');
const camposAgentes = document.getElementById('totalAgente');
const camposSupervisores = document.getElementById('totalSupervisor');
const spinner = document.getElementById('spinner');
const tabla = document.getElementById('tabla');

import { Data } from './modules/componentIndex.js';
const token = localStorage.getItem("token");
document.addEventListener('DOMContentLoaded', async () => {
  /*
  if(token == '' || token === undefined){
    window.location.href = "../../../../../Client/user/public/pages/login.html";
  }*/
  const responseTotalUsers = await getTotalUsers();
  const responseTotalTickets = await getTotalTickets();
  const responseTotalEmpleados = await getTotalEmpleados();
  const responseTotalAgentes = await getTotalAgentes();
  const responseTotalSupervisores = await getTotalSupervisores();
  if(responseTotalUsers.response.status == 200){
    camposUser.innerHTML="";
    camposUser.innerHTML = `<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
        </path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Usuarios
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200" id="usersTotal">
      ${responseTotalUsers.tickets?.result[0]?.count}
      </p>
    </div>
  </div>`
  }
  if (responseTotalTickets.response.status == 200) {
    camposTickets.innerHTML="";
    camposTickets.innerHTML = `<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Tickets
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200" id="ticketsTotal">
      ${responseTotalTickets.tickets?.result[0]?.count}
      </p>
    </div>
  </div>`
  }
  if (responseTotalEmpleados.response.status == 200) {
    camposEmpleados.innerHTML="";
    camposEmpleados.innerHTML = `<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Empleados
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200" id="ticketsTotal">
      ${responseTotalEmpleados.tickets.result.length}
      </p>
    </div>
  </div>`
  }
  if (responseTotalAgentes.response.status == 200) {
    camposAgentes.innerHTML="";
    camposAgentes.innerHTML = `<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z">
        </path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Agentes
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        ${responseTotalAgentes.tickets.result.length}
      </p>
    </div>
  </div>`
  }
  if (responseTotalSupervisores.response.status == 200) {
    camposSupervisores.innerHTML="";
    camposSupervisores.innerHTML = `<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Supervisores
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
      ${responseTotalSupervisores.tickets.result.length}  
      </p>
    </div>
  </div>`
  }
  
  const data = await getUsers();
  data.data?.paginatedQuery.forEach((user) => {
    const { id, nombre, apellidos, rol, email } = user;
    Data(tbody, id, nombre, apellidos, rol, email)
  })
  if(data.response.status == 200){
    spinner.style.display = 'none';
    tabla.style.display="block";
  }
  console.log(await getTicketsPorArea());

})


const getTotalUsers = async () => {
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/usuarios",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return {
    tickets,
    response,
  };
}

const getTotalEmpleados = async ()=>{
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/empleados",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return {
    tickets,
    response,
  };
}

const getTotalAgentes = async ()=>{
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/agentes",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return {
    tickets,
    response,
  };
}

const getTotalSupervisores = async ()=>{
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/supervisores",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return {
    tickets,
    response,
  };
}

const getTotalTickets = async () => {
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/tickets",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return {
    tickets,
    response,
  };
}

const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://mysupport-production.up.railway.app/v1/user/get?limite=9&desde=0",
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
    return {
      data,
      response
    };
  } catch (error) {
    console.log(error);
  }
}