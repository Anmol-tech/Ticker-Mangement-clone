let filters = document.querySelectorAll(".filter");
let ticketContainer = document.querySelector(".tickets-content");

let filterColorCode = {
	blue: "#00a8ff",
	yellow: "#fbc531",
	green: "#4cd137",
	red: "#e74c3c",
};

let ticketContent = document.querySelector(".tickets-content");
let openButton = document.querySelector(".open-modal");
let closeButton = document.querySelector(".close-modal");
let activeModalFilter = "red";

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

for (let i = 0; i < filters.length; i++) {
	filters[i].addEventListener("click", changeColor);
}

function changeColor(e) {
	let filterColorClass = e.target.classList[1];
	// check same element is clicked

	if (e.target.classList.contains("active-filter")) {
		ticketContent.innerHTML = "";
		initTickets();
		e.target.classList.remove("active-filter");
		return;
	}

	// Remove active filter class if set to any element
	let activeFilter = document.querySelector(".active-filter");
	if (activeFilter) {
		currentFilterColor = filterColorCode[filterColorClass];
		activeFilter.classList.remove("active-filter");
	}
	e.target.classList.add("active-filter");
	filterTicket(filterColorClass);
}

function changeModalFilterColor(e) {
	// check same element is clicked
	let colorFilter = e.target.classList[1];
	if (e.target.classList.contains("active-filter")) {
		return;
	}

	// Remove active filter class if set to any element
	let activeFilter = document.querySelector(".modal-filter.active-filter");

	if (activeFilter) activeFilter.classList.remove("active-filter");

	activeModalFilter = colorFilter;

	e.target.classList.add("active-filter");
}

function openModal(event) {
	if (document.querySelector(".modal")) {
		return;
	}

	let modal = document.createElement("div");
	modal.classList.add("modal");
	modal.innerHTML = `<div class="modal-text" contenteditable="true" spellcheck="false" data-type = "false">Enter your text here</div>
							<div class="modal-filter-options">
								<div class="modal-filter blue"></div>
								<div class="modal-filter yellow"></div>
								<div class="modal-filter green"></div>
								<div class="modal-filter red active-filter"></div>
						</div>`;

	let textDiv = modal.querySelector(".modal-text");
	textDiv.addEventListener("keypress", function (e) {
		if (e.key == "Enter" && textDiv.getAttribute("data-type") == "true") {
			addTicket(e.target.textContent);
		}
		if (textDiv.getAttribute("data-type") == "true") {
			return;
		}

		e.target.textContent = "";
		e.target.setAttribute("data-type", "true");
	});
	let modalFilters = modal.querySelectorAll(".modal-filter");

	for (let i = 0; i < modalFilters.length; i++)
		modalFilters[i].addEventListener("click", changeModalFilterColor);

	ticketContent.append(modal);
}

function closeModal(event) {
	if (document.querySelector(".modal")) {
		document.querySelector(".modal").remove();

		return;
	}
}
function addTicket(text) {
	if (text === "") return;

	let id = uid();

	let ticket = document.createElement("div");
	ticket.classList.add("ticket");
	ticket.innerHTML = `<div id = "${id}"class="ticket-head ${activeModalFilter}"></div>
	<div class="ticket-content">
	<div class= "ticket-info">
	<div class="ticket-code">#${id}</div>
	<div class="ticket-delete"><i ticket-id = "${id}" class="fas fa-trash-alt "></i></div>
	</div>
		<div class="ticket-context-text">${text}</div>
	</div>`;

	ticketContent.append(ticket);
	ticket
		.querySelector(".ticket-head")
		.addEventListener("click", changeTicketFilter);
	ticket
		.querySelector(".ticket-delete")
		.addEventListener("click", (e) => deletTicket(e, ticket));
	// Save ticktes to local Storage
	let ticketObject = {
		ticketId: id,
		ticketText: text,
		ticketFilter: activeModalFilter,
	};

	let allTickets = JSON.parse(localStorage.getItem("allTickets"));
	allTickets.push(ticketObject);
	localStorage.setItem("allTickets", JSON.stringify(allTickets));

	closeModal();
	activeModalFilter = "red";
}

function changeTicketFilter(e) {
	let colorArr = ["blue", "yellow", "green", "red"];
	// console.log(e);
	let currFilter = e.target.classList[1];
	let idx = (colorArr.indexOf(currFilter) + 1) % 4;
	e.target.classList.remove(currFilter);
	e.target.classList.add(colorArr[idx]);

	// Update filter in local storage
	let id = e.target.id;
	let allTickets = JSON.parse(localStorage.getItem("allTickets"));

	for (let x = 0; x < allTickets.length; x++) {
		let ticketObject = allTickets[x];
		if (ticketObject.ticketId == id) {
			ticketObject.ticketFilter = colorArr[idx];

			break;
		}
	}
	localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

function deletTicket(e, ticket) {
	let ticketId = e.target.getAttribute("ticket-id");
	ticket.remove();
	let allTickets = JSON.parse(localStorage.getItem("allTickets"));
	allTickets = allTickets.filter((ticketObj) => {
		return ticketObj.ticketId != ticketId;
	});
	localStorage.setItem("allTickets", JSON.stringify(allTickets));
}
